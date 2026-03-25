'use client'

import { useState } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseAbi } from 'viem'

const TIP20_ABI = parseAbi([
  'function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)',
  'function approve(address spender, uint256 amount) external returns (bool)',
])

const AGENT_PAD_ABI = parseAbi([
  'function contribute(uint256 launchId) external payable',
])

interface ContributeModalProps {
  launchId: number
  agentAddress: string
  onClose: () => void
  onSuccess: () => void
}

export function ContributeModal({ launchId, agentAddress, onClose, onSuccess }: ContributeModalProps) {
  const { isConnected, address } = useAccount()
  const { writeContract, isPending, error } = useWriteContract()
  
  const [contributionAmount, setContributionAmount] = useState('')
  const [step, setStep] = useState<'input' | 'approve' | 'contribute'>('input')
  const [txHash, setTxHash] = useState<string | null>(null)

  const AGENT_PAD_ADDRESS = '0xd5291AB2181dcD04CEF3039dA52ec4880aC642D4'
  const TIP20_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000001' // pathUSD

  const handleApprove = async () => {
    if (!isConnected || !address) return
    
    try {
      setStep('approve')
      const amount = BigInt(parseFloat(contributionAmount) * 1e18)
      
      await writeContract({
        address: TIP20_TOKEN_ADDRESS as `0x${string}`,
        abi: TIP20_ABI,
        functionName: 'approve',
        args: [AGENT_PAD_ADDRESS as `0x${string}`, amount],
      })
      
      // In Tempo, after approve succeeds, auto-proceed to contribute
      setTimeout(() => handleContribute(), 2000)
    } catch (err) {
      console.error('Approval failed:', err)
      setStep('input')
    }
  }

  const handleContribute = async () => {
    if (!isConnected || !address) return
    
    try {
      setStep('contribute')
      
      await writeContract({
        address: AGENT_PAD_ADDRESS as `0x${string}`,
        abi: AGENT_PAD_ABI,
        functionName: 'contribute',
        args: [BigInt(launchId)],
      })
      
      setTxHash('success')
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Contribution failed:', err)
      setStep('approve')
    }
  }

  if (txHash) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Contribution Successful!
            </h3>
            <p className="text-gray-600 mb-4">
              Your contribution has been recorded on Tempo
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Contribute to Launch #{launchId}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm mb-4">
            {error instanceof Error ? error.message : 'Transaction failed'}
          </div>
        )}

        {step === 'input' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contribution Amount (tokens)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Tempo Feature:</strong> No gas fees! The protocol sponsors your transaction.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={!contributionAmount || isPending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending ? 'Processing...' : 'Contribute'}
              </button>
            </div>
          </>
        )}

        {step === 'approve' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Approving token transfer...</p>
          </div>
        )}

        {step === 'contribute' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Submitting contribution...</p>
          </div>
        )}
      </div>
    </div>
  )
}
