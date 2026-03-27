'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPublicClient, http, parseAbi } from 'viem'
import { ContributeModal } from './ContributeModal'
import { Rocket, TrendingUp, DollarSign, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AGENT_PAD_ADDRESS = '0xd5291AB2181dcD04CEF3039dA52ec4880aC642D4' as const

// TEMPO RPC - created inside useEffect
const RPC_URL = 'https://rpc.moderato.tempo.xyz'

const abi = parseAbi([
  'function launchCount() view returns (uint256)',
  'function getLaunch(uint256) view returns (address agent, address tip20Token, uint256 targetAmount, uint256 minContribution, uint256 maxContribution, uint256 raisedAmount, uint256 vestingPeriod, uint256 deadline, bool active, bool claimed, uint256 contributionCount)',
])

interface Launch {
  id: number
  agent: `0x${string}`
  tip20Token: `0x${string}`
  targetAmount: string
  minContribution: string
  maxContribution: string
  raisedAmount: string
  vestingPeriod: string
  deadline: string
  active: boolean
  claimed: boolean
  contributionCount: string
}

interface NetworkStats {
  totalRaised: string
  totalLaunches: number
  totalContributors: string
}

function formatAmount(amount: string): string {
  return (BigInt(amount) / BigInt(1e18)).toString()
}

function getProgress(amount: string, target: string): number {
  if (target === '0') return 0
  const amt = BigInt(amount)
  const tgt = BigInt(target)
  return Math.min(100, Math.round(Number((amt * 100n) / tgt)))
}

export function LaunchList() {
  const [launchCount, setLaunchCount] = useState<bigint | null>(null)
  const [loadingCount, setLoadingCount] = useState(true)
  const [launches, setLaunches] = useState<Launch[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null)
  const [stats, setStats] = useState<NetworkStats | null>(null)

  const handleCloseModal = useCallback(() => setSelectedLaunch(null), [])
  const handleSuccessModal = useCallback(() => {
    window.location.reload()
  }, [])

  useEffect(() => {
    const client = createPublicClient({
      transport: http(RPC_URL),
    })

    const fetchStats = async () => {
      try {
        const count = await client.readContract({
          address: AGENT_PAD_ADDRESS,
          abi,
          functionName: 'launchCount',
        })
        
        setLaunchCount(count as bigint)
        
        // Calculate aggregate stats
        let totalRaised = BigInt(0)
        let totalContributors = BigInt(0)
        let activeLaunches = 0

        for (let i = 1; i <= Number(count); i++) {
          const data = await client.readContract({
            address: AGENT_PAD_ADDRESS,
            abi,
            functionName: 'getLaunch',
            args: [BigInt(i)],
          }) as any

          if (data && data[8]) {
            activeLaunches++
            totalRaised += data[5] as bigint
            totalContributors += data[10] as bigint
          }
        }

        setStats({
          totalRaised: (Number(totalRaised) / 1e18).toFixed(2),
          totalLaunches: activeLaunches,
          totalContributors: totalContributors.toString(),
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoadingCount(false)
      }
    }

    fetchStats()
  }, [])

  useEffect(() => {
    if (!launchCount || loadingCount) return

    const fetchLaunches = async () => {
      setLoading(true)
      const activeLaunches: Launch[] = []
      const client = createPublicClient({
        transport: http(RPC_URL),
      })

      for (let i = 1; i <= Number(launchCount); i++) {
        try {
          const data = await client.readContract({
            address: AGENT_PAD_ADDRESS,
            abi,
            functionName: 'getLaunch',
            args: [BigInt(i)],
          }) as any

          if (data && data[8]) {
            activeLaunches.push({
              id: i,
              agent: data[0] as `0x${string}`,
              tip20Token: data[1] as `0x${string}`,
              targetAmount: data[2].toString(),
              minContribution: data[3].toString(),
              maxContribution: data[4].toString(),
              raisedAmount: data[5].toString(),
              vestingPeriod: data[6].toString(),
              deadline: data[7].toString(),
              active: data[8] as boolean,
              claimed: data[9] as boolean,
              contributionCount: data[10].toString(),
            })
          }
        } catch (error) {
          console.error(`Failed to fetch launch ${i}:`, error)
        }
      }

      setLaunches(activeLaunches)
      setLoading(false)
    }

    fetchLaunches()
  }, [launchCount, loadingCount])

  // Stats Bar - NEW
  if (stats && !loading && launches.length === 0 && launchCount) {
    return (
      <div className="space-y-6">
        {/* Network Stats Bar */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-1">${stats.totalRaised}K</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <DollarSign className="h-4 w-4" /> Total Raised
            </div>
          </div>
          <div className="text-center border-l border-gray-300">
            <div className="text-3xl font-bold text-black mb-1">{stats.totalLaunches}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Rocket className="h-4 w-4" /> Active Launches
            </div>
          </div>
          <div className="text-center border-l border-gray-300">
            <div className="text-3xl font-bold text-black mb-1">{stats.totalContributors}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Users className="h-4 w-4" /> Contributors
            </div>
          </div>
        </div>

        {/* Empty State - IMPROVED */}
        <div className="text-center py-16 bg-white border-2 border-black rounded-xl">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-violet-600 rounded-full flex items-center justify-center">
            <Rocket className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-semibold mb-3">Be the First to Launch!</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start your token journey on Tempo. Zero gas fees for contributors, 
            ~500ms settlement, and built-in fee sponsorship.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/">
              <Button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                Create Launch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Stats Bar (always show)
  if (stats && launchCount && !loadingCount) {
    return (
      <div className="space-y-6">
        {/* Network Stats Bar */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-1">${stats.totalRaised}K</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <DollarSign className="h-4 w-4" /> Total Raised
            </div>
          </div>
          <div className="text-center border-l border-gray-300">
            <div className="text-3xl font-bold text-black mb-1">{stats.totalLaunches}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Rocket className="h-4 w-4" /> Active Launches
            </div>
          </div>
          <div className="text-center border-l border-gray-300">
            <div className="text-3xl font-bold text-black mb-1">{stats.totalContributors}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Users className="h-4 w-4" /> Contributors
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mx-auto mb-4" />
            <p className="text-gray-600">Loading launches...</p>
          </div>
        )}

        {/* Empty State (no active launches) */}
        {!loading && launches.length === 0 && (
          <div className="text-center py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Rocket className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Active Launches</h3>
            <p className="text-gray-500 mb-6">Be the first to launch your token on AgentPad</p>
            <a href="/">
              <Button className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">
                Launch Token
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        )}

        {/* Launch Cards with Progress Bars - NEW VISUAL PROGRESS */}
        {!loading && launches.length > 0 && (
          <div className="space-y-4">
            {launches.map((launch) => {
              const progress = getProgress(launch.raisedAmount, launch.targetAmount)
              const timeLeft = Math.max(0, Number(launch.deadline) - Math.floor(Date.now() / 1000))
              const daysLeft = Math.ceil(timeLeft / 86400)

              return (
                <div
                  key={launch.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-black transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-1">Launch #{launch.id}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Agent: {launch.agent.slice(0, 6)}...{launch.agent.slice(-4)}
                      </p>
                      {/* TOKEN BADGE */}
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                        {launch.tip20Token === '0x20c0000000000000000000000000000000000000' ? 'pathUSD' :
                         launch.tip20Token === '0x20c0000000000000000000000000000000000001' ? 'alphaUSD' :
                         launch.tip20Token === '0x20c0000000000000000000000000000000000002' ? 'betaUSD' : 'thetaUSD'}
                      </span>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      progress >= 100
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {progress >= 100 ? '✅ Complete' : '🚀 Active'}
                    </span>
                  </div>

                  {/* VISUAL PROGRESS BAR - NEW */}
                  <div className="mb-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">
                        ${formatAmount(launch.raisedAmount)} / ${formatAmount(launch.targetAmount)}
                      </span>
                      <span className="font-bold text-black">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className={`h-4 rounded-full transition-all duration-500 ${
                          progress >= 100 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : 'bg-gradient-to-r from-amber-500 to-orange-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Min/Max</div>
                      <div className="font-semibold text-black">
                        ${formatAmount(launch.minContribution)} - ${formatAmount(launch.maxContribution)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Vesting</div>
                      <div className="font-semibold text-black">{launch.vestingPeriod} days</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Time Left</div>
                      <div className="font-semibold text-black">{daysLeft} days</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setSelectedLaunch(launch)}
                      className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Contribute
                    </Button>
                    <Button className="px-6 py-3 border-2 border-black rounded-lg font-medium hover:bg-gray-50 transition">
                      Details
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Modals */}
        {selectedLaunch && (
          <ContributeModal
            launchId={selectedLaunch.id}
            agentAddress={selectedLaunch.agent}
            onClose={handleCloseModal}
            onSuccess={handleSuccessModal}
          />
        )}
      </div>
    )
  }

  // Initial loading
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mx-auto mb-4" />
      <p className="text-gray-600">Initializing...</p>
    </div>
  )
}
