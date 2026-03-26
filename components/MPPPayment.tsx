'use client'

import { useState } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseAbi } from 'viem'

// TIP-20 ABI with transferWithMessage for MPP
const TIP20_ABI = parseAbi([
  'function transferWithMessage(address recipient, uint256 amount, bytes calldata memo) external returns (bool)',
  'function balanceOf(address account) external view returns (uint256)',
])

interface MPPPaymentProps {
  recipient: `0x${string}`
  amount: string
  purpose: string
  onClose: () => void
  onSuccess: () => void
}

export function MPPPayment({ recipient, amount, purpose, onClose, onSuccess }: MPPPaymentProps) {
  const { isConnected, address } = useAccount()
  const { writeContract, isPending, error, data: hash } = useWriteContract()
  
  const [token, setToken] = useState('pathUSD')
  const [memo, setMemo] = useState(purpose)

  const TOKEN_ADDRESSES = {
    pathUSD: '0x20c0000000000000000000000000000000000000',
    alphaUSD: '0x20c0000000000000000000000000000000000001',
  }

  const handlePayment = async () => {
    if (!isConnected || !address || !recipient) return

    try {
      // Create memo bytes for tracking
      const memoBytes = `0x${Buffer.from(memo).toString('hex')}`
      const amountWei = BigInt(parseFloat(amount) * 1e18)

      await writeContract({
        address: TOKEN_ADDRESSES[token as keyof typeof TOKEN_ADDRESSES] as `0x${string}`,
        abi: TIP20_ABI,
        functionName: 'transferWithMessage',
        args: [recipient as `0x${string}`, amountWei, memoBytes as `0x${string}`],
      })

      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } catch (err) {
      console.error('MPP payment failed:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">💸 MPP Payment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm mb-4">
            {error instanceof Error ? error.message : 'Payment failed'}
          </div>
        )}

        {hash && (
          <div className="bg-green-50 border border-green-200 rounded p-3 text-green-700 text-sm mb-4">
            ✅ Payment sent! {hash.slice(0, 10)}...
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Recipient Agent</div>
            <div className="font-mono text-sm">{recipient.slice(0, 8)}...{recipient.slice(-6)}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Amount</div>
            <div className="text-2xl font-bold">{amount} {token}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Purpose (Memo)
            </label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="AI service payment, API call, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token
            </label>
            <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="pathUSD">pathUSD</option>
              <option value="alphaUSD">alphaUSD</option>
            </select>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded p-3">
            <p className="text-sm text-purple-800">
              <strong>🤖 MPP Features:</strong><br />
              • Machine-to-machine payments<br />
              • Built-in memo for tracking<br />
              • ~500ms finality<br />
              • Zero gas fees (sponsored)<br />
              • Perfect for AI agent payments
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={isPending || !isConnected}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Processing...' : !isConnected ? 'Connect Wallet' : 'Send Payment'}
          </button>
        </div>
      </div>
    </div>
  )
}
