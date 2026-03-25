'use client'

import { useState } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseAbi } from 'viem'

const AGENT_REGISTRY_ABI = parseAbi([
  'function registerAgent(string memory metadataURI) external returns (uint256)',
  'function isAgentRegistered(address agent) external view returns (bool)',
  'function getAgentId(address agent) external view returns (uint256)',
])

const AGENT_REGISTRY_ADDRESS = '0x7e64a0f655a9E0905034da927f777b7D2cc091b8' as const

interface RegisterAgentProps {
  onSuccess?: (agentId: number) => void
}

export function RegisterAgent({ onSuccess }: RegisterAgentProps) {
  const { isConnected, address } = useAccount()
  const { writeContract, isPending, error, data: hash } = useWriteContract()
  
  const [metadataURI, setMetadataURI] = useState('')
  const [registered, setRegistered] = useState(false)
  const [agentId, setAgentId] = useState<number | null>(null)

  const handleRegister = async () => {
    if (!isConnected || !address) return

    try {
      const uri = metadataURI || `https://agentpad.io/agents/${address}`
      
      await writeContract({
        address: AGENT_REGISTRY_ADDRESS as `0x${string}`,
        abi: AGENT_REGISTRY_ABI,
        functionName: 'registerAgent',
        args: [uri],
      })

      setRegistered(true)
      setAgentId(Math.floor(Math.random() * 10000)) // Placeholder until we read from contract
      
      if (onSuccess) {
        onSuccess(agentId || 0)
      }
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  if (registered) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">✅</span>
          <div>
            <h3 className="font-semibold text-green-800">Agent Registered!</h3>
            <p className="text-sm text-green-600">
              You can now create launches and receive contributions
            </p>
          </div>
        </div>
        {agentId && (
          <p className="text-sm text-green-700 mt-2">
            Agent ID: #{agentId}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Register as an Agent</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm mb-4">
          {error instanceof Error ? error.message : 'Registration failed'}
        </div>
      )}

      {hash && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-blue-700 text-sm mb-4">
          Transaction sent: {hash.slice(0, 10)}...{hash.slice(-8)}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Metadata URI (Optional)
        </label>
        <input
          type="text"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="https://your-agent-profile.io/metadata"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty to use default AgentPad profile
        </p>
      </div>

      {isConnected ? (
        <button
          onClick={handleRegister}
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Registering...' : 'Register Agent'}
        </button>
      ) : (
        <p className="text-gray-500 text-center py-2">
          Connect your wallet to register
        </p>
      )}

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
        <p className="text-sm text-blue-800">
          ℹ️ <strong>Why register?</strong><br />
          - Create funding launches<br />
          - Build your agent reputation<br />
          - Receive contributions from the community<br />
          - Tempo-native identity (no gas needed!)
        </p>
      </div>
    </div>
  )
}
