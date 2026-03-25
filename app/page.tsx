'use client'

import { WalletConnect } from '@/components/WalletConnect'
import { LaunchList } from '@/components/LaunchList'
import { CreateLaunch } from '@/components/CreateLaunch'
import { RegisterAgent } from '@/components/RegisterAgent'
import { FeeSponsorshipPanel } from '@/components/FeeSponsorshipPanel'
import { DEXSwapModal } from '@/components/DEXSwapModal'
import { MPPPayment } from '@/components/MPPPayment'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

export default function Home() {
  const { isConnected, address } = useAccount()
  const [isAgent, setIsAgent] = useState<boolean | null>(null)
  const [showSponsorship, setShowSponsorship] = useState(false)
  const [showSwap, setShowSwap] = useState(false)
  const [swapData, setSwapData] = useState<any>(null)

  useEffect(() => {
    if (isConnected && address) {
      const stored = localStorage.getItem(`agent-${address}`)
      setIsAgent(stored === 'true')
    } else {
      setIsAgent(null)
    }
  }, [isConnected, address])

  const handleAgentRegistered = (agentId: number) => {
    setIsAgent(true)
    if (address) {
      localStorage.setItem(`agent-${address}`, 'true')
    }
  }

  const handleFeeSponsorshipEnabled = () => {
    setShowSponsorship(false)
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">🌙 AgentPad</h1>
          <p className="text-gray-600">
            Tempo-Native Launchpad for AI Agents & Machine Payments
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              ⛓️ Zero Gas Fees
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              💸 MPP Payments
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              🔄 DEX Swap
            </span>
          </div>
        </header>

        <WalletConnect />

        {/* Advanced Features Panel */}
        {isConnected && showSponsorship && (
          <section className="mb-8">
            <FeeSponsorshipPanel onSponsorshipEnabled={handleFeeSponsorshipEnabled} />
          </section>
        )}

        {/* Agent Registration */}
        {isConnected && !isAgent && (
          <section className="mb-8">
            <RegisterAgent onSuccess={handleAgentRegistered} />
          </section>
        )}

        {/* Admin/Agent Features */}
        {isAgent === true && isConnected && (
          <div className="mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowSponsorship(!showSponsorship)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
              >
                <div className="text-3xl mb-2">💰</div>
                <div className="font-semibold">Fee Sponsorship</div>
                <div className="text-sm opacity-90">Sponsor gas for users</div>
              </button>

              <button
                onClick={() => setShowSwap(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg hover:from-green-600 hover:to-green-700 transition"
              >
                <div className="text-3xl mb-2">🔄</div>
                <div className="font-semibold">DEX Swap</div>
                <div className="text-sm opacity-90">Swap stablecoins</div>
              </button>

              <button
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition"
                onClick={() => alert('MPP payments coming soon!')}
              >
                <div className="text-3xl mb-2">🤖</div>
                <div className="font-semibold">MPP Payments</div>
                <div className="text-sm opacity-90">Machine payments</div>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {isAgent === true ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Create Launch</h2>
              <CreateLaunch />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Active Launches</h2>
              <LaunchList />
            </section>
          </div>
        ) : (
          !isConnected && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4 text-lg">
                Connect your Tempo wallet to explore launches
              </p>
              <p className="text-sm text-gray-500">
                Features: Zero gas fees • MPP payments • DEX swaps
              </p>
            </div>
          )
        )}

        {/* DEX Swap Modal */}
        {showSwap && swapData && (
          <DEXSwapModal
            fromToken={swapData.from}
            toToken={swapData.to}
            amount={swapData.amount}
            onClose={() => setShowSwap(false)}
            onSuccess={() => setShowSwap(false)}
          />
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          <p>Built for Tempo by Lyrantic 🤖</p>
          <p className="text-sm mt-2">
            <a href="https://docs.tempo.xyz" className="hover:underline">
              Tempo Docs
            </a>
            {' • '}
            <a href="https://explore.tempo.xyz" className="hover:underline">
              Tempo Explorer
            </a>
            {' • '}
            <a href="https://wallet.tempo.xyz" className="hover:underline">
              Tempo Wallet
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
