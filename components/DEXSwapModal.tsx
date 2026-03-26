'use client'

import { useState } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseAbi } from 'viem'

// DEX ABI for swapping stablecoins
const DEX_ABI = parseAbi([
  'function swapExactAmountsIn(bytes[] calldata path, uint256[] calldata amountsIn, uint256 minAmountOut) external returns (uint256)',
  'function getQuote(bytes calldata baseToken, bytes calldata quoteToken) external view returns (uint256)',
])

const DEX_ADDRESS = '0xdec0000000000000000000000000000000000000' as const

interface DEXSwapModalProps {
  fromToken: string
  toToken: string
  amount: string
  onClose: () => void
  onSuccess: () => void
}

export function DEXSwapModal({ fromToken, toToken, amount, onClose, onSuccess }: DEXSwapModalProps) {
  const { isConnected, address } = useAccount()
  const { writeContract, isPending, error, data: hash } = useWriteContract()
  
  const [slippage, setSlippage] = useState('0.5')
  const [quote, setQuote] = useState<string | null>(null)

  const handleSwap = async () => {
    if (!isConnected || !address || !amount) return

    try {
      // Construct swap path (in Tempo's format) - cast to proper type
      const path = [fromToken, toToken] as readonly (`0x${string}`)[]
      const amountIn = BigInt(parseFloat(amount) * 1e18)
      const minAmountOut = BigInt(parseFloat(amount) * 1e18 * (1 - parseFloat(slippage) / 100))

      await writeContract({
        address: DEX_ADDRESS as `0x${string}`,
        abi: DEX_ABI,
        functionName: 'swapExactAmountsIn',
        args: [path, [amountIn], minAmountOut] as const,
      })

      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Swap failed:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Swap on Tempo DEX</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm mb-4">
            {error instanceof Error ? error.message : 'Swap failed'}
          </div>
        )}

        {hash && (
          <div className="bg-green-50 border border-green-200 rounded p-3 text-green-700 text-sm mb-4">
            ✅ Swap successful! {hash.slice(0, 10)}...
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">From</span>
              <span className="text-sm font-medium">{fromToken}</span>
            </div>
            <div className="text-2xl font-bold">{amount}</div>
          </div>

          <div className="flex justify-center">
            <div className="bg-blue-100 rounded-full p-2">
              ⬇️
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">To (estimated)</span>
              <span className="text-sm font-medium">{toToken}</span>
            </div>
            <div className="text-2xl font-bold">{quote || amount}</div>
            {quote && quote !== amount && (
              <div className="text-xs text-green-600 mt-1">
                Rate: 1 {fromToken} ≈ {(parseFloat(quote) / parseFloat(amount)).toFixed(4)} {toToken}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slippage Tolerance (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-blue-800">
              💡 <strong>Tempo DEX Features:</strong><br />
              - Instant settlement (~500ms)<br />
              - No gas fees (protocol sponsored)<br />
              - Deep liquidity from pathUSD pool<br />
              - Price-time priority orderbook
            </p>
          </div>

          <button
            onClick={handleSwap}
            disabled={isPending || !isConnected}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Swapping...' : !isConnected ? 'Connect Wallet' : 'Swap Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
