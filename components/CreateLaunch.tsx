'use client'

import { useState } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { createPublicClient, http, parseAbi, zeroAddress } from 'viem'

const AGENT_PAD_ADDRESS = '0xd5291AB2181dcD04CEF3039dA52ec4880aC642D4' as const

// TIP-20 Token addresses on Tempo Moderato
const TIP20_TOKENS = {
  pathUSD: '0x0000000000000000000000000000000000000001', // Replace with actual address
  alphaUSD: '0x0000000000000000000000000000000000000002', // Replace with actual address
}

const abi = parseAbi([
  'function createLaunch(address tip20Token, uint256 targetAmount, uint256 minContribution, uint256 maxContribution, uint256 vestingPeriod, uint256 durationSeconds) returns (uint256)',
])

const client = createPublicClient({
  transport: http('https://rpc.moderato.tempo.xyz'),
})

export function CreateLaunch() {
  const { isConnected, address } = useAccount()
  const { writeContract, isPending, error, data: hash } = useWriteContract()
  
  const [token, setToken] = useState<'pathUSD' | 'alphaUSD'>('pathUSD')
  const [target, setTarget] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [duration, setDuration] = useState('7')
  const [vesting, setVesting] = useState('30')

  const selectedTokenAddress = TIP20_TOKENS[token]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first')
      return
    }

    try {
      writeContract({
        address: AGENT_PAD_ADDRESS,
        abi,
        functionName: 'createLaunch',
        args: [
          selectedTokenAddress,
          BigInt(parseFloat(target) * 1e18),
          BigInt(parseFloat(min) * 1e18),
          BigInt(parseFloat(max) * 1e18),
          BigInt(parseInt(vesting) * 24 * 60 * 60),
          BigInt(parseInt(duration) * 24 * 60 * 60),
        ],
      })
    } catch (err) {
      console.error('Failed to create launch:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      alert(`Failed to create launch: ${errorMessage}`)
    }
  }

  if (hash) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          ✅ Launch Created!
        </h3>
        <p className="text-green-600 text-sm mb-4">
          Transaction: {hash.slice(0, 10)}...{hash.slice(-8)}
        </p>
        <a
          href={`https://explore.tempo.xyz/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 underline text-sm"
        >
          View on Tempo Explorer
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm">
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          TIP-20 Token
        </label>
        <select
          value={token}
          onChange={(e) => setToken(e.target.value as 'pathUSD' | 'alphaUSD')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="pathUSD">pathUSD</option>
          <option value="alphaUSD">alphaUSD</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Select the stablecoin for this launch
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Amount (tokens)
        </label>
        <input
          type="number"
          step="0.01"
          required
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="10000"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Contribution
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Contribution
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (days)
          </label>
          <input
            type="number"
            required
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="7"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vesting (days)
          </label>
          <input
            type="number"
            required
            value={vesting}
            onChange={(e) => setVesting(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="30"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending || !isConnected}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Creating Launch...' : !isConnected ? 'Connect Wallet First' : 'Create Launch'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Tempo handles gas fees automatically. You don't pay for transactions!
      </p>
    </form>
  )
}
