'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPublicClient, http, parseAbi } from 'viem'
import { ContributeModal } from './ContributeModal'

const AGENT_PAD_ADDRESS = '0xd5291AB2181dcD04CEF3039dA52ec4880aC642D4' as const

// Simple client for reading contract data
const client = createPublicClient({
  transport: http('https://rpc.moderato.tempo.xyz'),
})

const abi = parseAbi([
  'function launchCount() view returns (uint256)',
  'function getLaunch(uint256) view returns (address agent, address tip20Token, uint256 targetAmount, uint256 minContribution, uint256 maxContribution, uint256 raisedAmount, uint256 vestingPeriod, uint256 deadline, bool active, bool claimed, uint256 contributionCount)',
])

interface Launch {
  id: number
  agent: `0x${string}`
  tip20Token: `0x${string}`
  targetAmount: string  // Changed from bigint to string for serialization
  minContribution: string
  maxContribution: string
  raisedAmount: string
  vestingPeriod: string
  deadline: string
  active: boolean
  claimed: boolean
  contributionCount: string
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
  // Use only custom client for reading (skip useReadContract to avoid serialization issues)
  const [totalCount, setTotalCount] = useState<bigint | null>(null)
  const [loadingCount, setLoadingCount] = useState(true)
  const [launches, setLaunches] = useState<Launch[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null)

  // Wrap callbacks with useCallback to prevent re-creation on each render
  const handleCloseModal = useCallback(() => setSelectedLaunch(null), [])
  const handleSuccessModal = useCallback(() => {
    window.location.reload()
  }, [])

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoadingCount(true)
        const count = await client.readContract({
          address: AGENT_PAD_ADDRESS,
          abi,
          functionName: 'launchCount',
        })
        setTotalCount(count as bigint)
      } catch (error) {
        console.error('Failed to fetch launch count:', error)
      } finally {
        setLoadingCount(false)
      }
    }
    fetchCount()
  }, [])

  useEffect(() => {
    if (!totalCount || loadingCount) return

    const fetchLaunches = async () => {
      setLoading(true)
      const activeLaunches: Launch[] = []

      for (let i = 1; i <= Number(totalCount); i++) {
        try {
          const data = await client.readContract({
            address: AGENT_PAD_ADDRESS,
            abi,
            functionName: 'getLaunch',
            args: [BigInt(i)],
          })

          if (data && data[8]) { // active = true
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
  }, [totalCount, loadingCount])

  if (loading || loadingCount) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p>Loading launches...</p>
      </div>
    )
  }

  if (launches.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No active launches yet</p>
        <p className="text-sm text-gray-400 mt-1">Be the first to create one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {launches.map((launch) => {
        const progress = getProgress(launch.raisedAmount, launch.targetAmount)
        const timeLeft = Math.max(0, Number(launch.deadline) - Math.floor(Date.now() / 1000))
        const daysLeft = Math.ceil(timeLeft / 86400)

        return (
          <div key={launch.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Launch #{launch.id}
                </h3>
                <p className="text-sm text-gray-500">
                  Agent: {launch.agent.slice(0, 6)}...{launch.agent.slice(-4)}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                progress >= 100 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {progress >= 100 ? 'Completed' : 'Active'}
              </span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  {formatAmount(launch.raisedAmount)} / {formatAmount(launch.targetAmount)} tokens
                </span>
                <span className="font-medium text-gray-900">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    progress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{launch.contributionCount} contributions</span>
              <span>{daysLeft} days left</span>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedLaunch(launch)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Contribute
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Details
              </button>
            </div>
          </div>
        )
      })}
      
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
