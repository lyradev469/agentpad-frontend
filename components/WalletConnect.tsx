'use client'

import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { useState } from 'react'

export function WalletConnect() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [error, setError] = useState<string | null>(null)

  if (isConnected && address) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-800 font-medium">Connected to Tempo</p>
            <p className="text-green-600 text-sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>
          <button
            onClick={() => {
              disconnect()
              setError(null)
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Disconnect
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-blue-900">
        Connect Your Tempo Wallet
      </h3>
      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-3">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={async () => {
              try {
                setError(null)
                await connect({ connector })
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to connect')
              }
            }}
            className="px-4 py-3 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 transition text-blue-700 font-medium"
          >
            {connector.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-blue-600 mt-4">
        Don't have a Tempo wallet?{' '}
        <a 
          href="https://wallet.tempo.xyz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-blue-800"
        >
          Create one here
        </a>
      </p>
    </div>
  )
}
