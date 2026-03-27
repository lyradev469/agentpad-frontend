'use client'

import { useState } from 'react'
import { useWriteContract, useAccount } from 'wagmi'
import { parseAbi } from 'viem'
import { validateSponsorshipEligibility, generateSponsorshipNonce } from '@/lib/feePayer'

const AGENT_PAD_ADDRESS = '0xd5291AB2181dcD04CEF3039dA52ec4880aC642D4' as const

const TIP20_TOKENS = {
  pathUSD: '0x20c0000000000000000000000000000000000000',
  alphaUSD: '0x20c0000000000000000000000000000000000001',
  betaUSD: '0x20c0000000000000000000000000000000000002',
  thetaUSD: '0x20c0000000000000000000000000000000000003',
}

const abi = parseAbi([
  'function createLaunch(address tip20Token, uint256 targetAmount, uint256 minContribution, uint256 maxContribution, uint256 vestingPeriod, uint256 durationSeconds) returns (uint256)',
])

export function CreateLaunch() {
  const { isConnected, address } = useAccount()
  const { writeContract, isPending, error, data: hash } = useWriteContract()
  
  const [token, setToken] = useState<'pathUSD' | 'alphaUSD' | 'betaUSD' | 'thetaUSD'>('pathUSD')
  const [target, setTarget] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [duration, setDuration] = useState('7')
  const [vesting, setVesting] = useState('30')
  const [enableSponsorship, setEnableSponsorship] = useState(true)
  const [sponsorshipStatus, setSponsorshipStatus] = useState<'idle' | 'validating' | 'enabled' | 'disabled'>('idle')

  const selectedTokenAddress: `0x${string}` = TIP20_TOKENS[token] as `0x${string}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first')
      return
    }

    try {
      if (enableSponsorship) {
        setSponsorshipStatus('validating')
        const { eligible } = await validateSponsorshipEligibility(address, address)
        
        if (eligible) {
          setSponsorshipStatus('enabled')
          const nonce = await generateSponsorshipNonce(address)
          console.log('Fee sponsorship enabled, nonce:', nonce)
        } else {
          setSponsorshipStatus('disabled')
        }
      }

      await writeContract({
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

      setTimeout(() => {
        setTarget('')
        setMin('')
        setMax('')
        setSponsorshipStatus('idle')
      }, 2000)
    } catch (err) {
      console.error('Failed to create launch:', err)
      setSponsorshipStatus('idle')
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm">
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      )}

      {/* Token Selection with Help - IMPROVED */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-gray-900">
            Select Stablecoin
            <span className="ml-2 text-xs font-normal text-gray-500">(TIP-20)</span>
          </label>
        </div>
        
        <div className="relative">
          <select
            value={token}
            onChange={(e) => setToken(e.target.value as 'pathUSD' | 'alphaUSD' | 'betaUSD' | 'thetaUSD')}
            className="w-full px-4 py-3 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-medium text-gray-900"
          >
            <option value="pathUSD">pathUSD (Primary - Deepest Liquidity)</option>
            <option value="alphaUSD">alphaUSD (Testnet)</option>
            <option value="betaUSD">betaUSD (Testnet)</option>
            <option value="thetaUSD">thetaUSD (Testnet)</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Help Text Box - NEW */}
        <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-lg">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Why pathUSD?</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                Primary stablecoin on Tempo with the deepest liquidity pools. Used as base pair in enshrined DEX.
                Best choice for maximum visibility and trader trust. Testnet tokens (alpha/beta/theta) are for development only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Target Amount with Info - IMPROVED */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-gray-900">
            Target Amount
          </label>
          <span className="text-xs text-gray-500">Recommended: $1K - $100K</span>
        </div>
        <input
          type="number"
          step="0.01"
          required
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-mono text-gray-900"
          placeholder="10000"
        />
        <p className="text-xs text-gray-600 mt-2">
          Total {token} you want to raise from contributors
        </p>
      </div>

      {/* Contribution Limits with Tooltips - IMPROVED */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">
          Contribution Limits
        </label>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-semibold text-gray-700">Minimum</label>
              <div className="group relative cursor-help">
                <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">?</span>
                <div className="absolute right-0 bottom-8 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-10">
                  <p className="text-xs text-gray-700">
                    Too low (&lt;$10) = many small TXs. Recommended: $10-$50 for balanced gas efficiency.
                  </p>
                </div>
              </div>
            </div>
            <input
              type="number"
              step="0.01"
              required
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-mono text-sm"
              placeholder="10"
            />
            <p className="text-xs text-gray-500 mt-1">{token} per contributor</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-semibold text-gray-700">Maximum</label>
              <div className="group relative cursor-help">
                <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">?</span>
                <div className="absolute right-0 bottom-8 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-10">
                  <p className="text-xs text-gray-700">
                    Prevent whale dominance. Recommended: 5-10% of target to ensure community distribution.
                  </p>
                </div>
              </div>
            </div>
            <input
              type="number"
              step="0.01"
              required
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-mono text-sm"
              placeholder="1000"
            />
            <p className="text-xs text-gray-500 mt-1">{token} per contributor</p>
          </div>
        </div>
      </div>

      {/* Duration & Vesting - IMPROVED */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">
          Timeline
        </label>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-semibold text-gray-700">Duration</label>
              <div className="group relative cursor-help">
                <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">?</span>
                <div className="absolute right-0 bottom-8 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-10">
                  <p className="text-xs text-gray-700">
                    3-7 days for quick raises. 14-30 days for marketing-heavy campaigns. Tempo finality: ~500ms.
                  </p>
                </div>
              </div>
            </div>
            <input
              type="number"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-mono text-sm"
              placeholder="7"
            />
            <p className="text-xs text-gray-500 mt-1">Days to raise funds</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-semibold text-gray-700">Vesting</label>
              <div className="group relative cursor-help">
                <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">?</span>
                <div className="absolute right-0 bottom-8 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-10">
                  <p className="text-xs text-gray-700">
                    Prevent immediate dumps. 30-90 days recommended. Built-in on Tempo protocol (no extra contract).
                  </p>
                </div>
              </div>
            </div>
            <input
              type="number"
              required
              value={vesting}
              onChange={(e) => setVesting(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-mono text-sm"
              placeholder="30"
            />
            <p className="text-xs text-gray-500 mt-1">Days to unlock tokens</p>
          </div>
        </div>
      </div>

      {/* Fee Sponsorship Toggle - IMPROVED */}
      {isConnected && address && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSponsorship}
                    onChange={(e) => setEnableSponsorship(e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-blue-900">
                    Enable Zero Gas for Contributors
                  </span>
                </label>
                <p className="text-xs text-blue-700 mt-1 ml-8">
                  Tempo Fee Sponsorship pays all gas fees. Contributors only need stablecoins!
                </p>
              </div>
            </div>
            {sponsorshipStatus === 'validating' && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
            )}
            {sponsorshipStatus === 'enabled' && (
              <span className="text-green-600 text-sm font-medium">✓ Active</span>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending || !target || !min || !max || !duration || !vesting}
        className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            Creating Launch...
          </span>
        ) : (
          '🚀 Launch Token'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
        <span className="text-green-600">⚡</span>
        All transactions on Tempo: ~500ms finality, zero gas fees
      </p>
    </form>
  )
}
