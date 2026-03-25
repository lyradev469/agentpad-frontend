import { WalletConnect } from '@/components/WalletConnect'
import { LaunchList } from '@/components/LaunchList'
import { CreateLaunch } from '@/components/CreateLaunch'
import { RegisterAgent } from '@/components/RegisterAgent'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

export default function Home() {
  const { isConnected, address } = useAccount()
  const [isAgent, setIsAgent] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user is a registered agent (simplified - would need proper contract read)
    if (isConnected && address) {
      // Placeholder: In production, check AgentRegistry contract
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

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">🌙 AgentPad</h1>
          <p className="text-gray-600">
            Tempo-Native Launchpad for AI Agents
          </p>
        </header>

        <WalletConnect />

        {isConnected && !isAgent && (
          <section className="mb-8">
            <RegisterAgent onSuccess={handleAgentRegistered} />
          </section>
        )}

        {isAgent === true && (
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Create Launch</h2>
              <CreateLaunch />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Active Launches</h2>
              <LaunchList />
            </section>
          </div>
        )}

        {!isConnected && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">
              Connect your Tempo wallet to explore launches
            </p>
          </div>
        )}

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
          </p>
        </footer>
      </div>
    </main>
  )
}
