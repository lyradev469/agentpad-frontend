'use client'

import { useState } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseAbi } from 'viem'

// Fee Manager ABI for sponsorship
const FEE_MANAGER_ABI = parseAbi([
  'function setFeePayerAllowed(address payer, bool allowed) external',
  'function isFeePayerAllowed(address payer) external view returns (bool)',
  'function addLiquidity(uint256 amount) external payable',
])

const FEE_MANAGER_ADDRESS = '0xfeec000000000000000000000000000000000000' as const

interface FeeSponsorshipPanelProps {
  onSponsorshipEnabled?: () => void
}

export function FeeSponsorshipPanel({ onSponsorshipEnabled }: FeeSponsorshipPanelProps) {
  const { isConnected, address } = useAccount()
  const { writeContract, isPending } = useWriteContract()
  
  const [sponsorshipAmount, setSponsorshipAmount] = useState('100')
  const [isSetup, setIsSetup] = useState(false)

  const handleEnableSponsorship = async () => {
    if (!isConnected || !address) return

    try {
      // Enable this address as a fee payer
      await writeContract({
        address: FEE_MANAGER_ADDRESS as `0x${string}`,
        abi: FEE_MANAGER_ABI,
        functionName: 'setFeePayerAllowed',
        args: [address as `0x${string}`, true],
      })

      // Add liquidity to fee pool
      const amount = BigInt(parseFloat(sponsorshipAmount) * 1e18)
      await writeContract({
        address: FEE_MANAGER_ADDRESS as `0x${string}`,
        abi: FEE_MANAGER_ABI,
        functionName: 'addLiquidity',
        args: [amount],
      })

      setIsSetup(true)
      if (onSponsorshipEnabled) {
        onSponsorshipEnabled()
      }
    } catch (err) {
      console.error('Fee sponsorship setup failed:', err)
    }
  }

  if (isSetup) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <h3 className="font-semibold text-green-800">Fee Sponsorship Enabled!</h3>
            <p className="text-sm text-green-600">
              You can now sponsor gas fees for users. Amount: {sponsorshipAmount} pathUSD
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">🚀 Enable Fee Sponsorship</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sponsorship Pool Amount (pathUSD)
          </label>
          <input
            type="number"
            value={sponsorshipAmount}
            onChange={(e) => setSponsorshipAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="100"
          />
          <p className="text-xs text-gray-500 mt-1">
            These funds will be used to pay gas fees for users
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <p className="text-sm text-blue-800">
            <strong>Why enable sponsorship?</strong><br />
            • Provide zero-gas UX for your users<br />
            • Boost conversion rates (no friction)<br />
            • Tempo makes it easy with native support<br />
            • Perfect for agent deployments & launches
          </p>
        </div>

        {isConnected ? (
          <button
            onClick={handleEnableSponsorship}
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Setting up...' : 'Enable Fee Sponsorship'}
          </button>
        ) : (
          <p className="text-gray-500 text-center py-2">
            Connect your wallet to enable sponsorship
          </p>
        )}
      </div>
    </div>
  )
}
