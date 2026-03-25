'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { createPublicClient, http } from 'viem'

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.moderato.tempo.xyz'

const client = createPublicClient({
  transport: http(RPC_URL),
})

export default function HealthCheck() {
  const { isConnected } = useAccount()
  const [status, setStatus] = useState<'checking' | 'healthy' | 'unhealthy'>('checking')
  const [latency, setLatency] = useState(0)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const start = Date.now()
        await client.getBlockNumber()
        const end = Date.now()
        
        setLatency(end - start)
        setStatus('healthy')
      } catch (error) {
        console.error('Health check failed:', error)
        setStatus('unhealthy')
      }
    }

    const interval = setInterval(checkHealth, 30000)
    checkHealth()

    return () => clearInterval(interval)
  }, [])

  if (!isConnected) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg p-3 shadow-lg z-50">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${
          status === 'healthy' ? 'bg-green-500' : 
          status === 'unhealthy' ? 'bg-red-500' : 'bg-yellow-500'
        }`} />
        <span className="text-sm font-medium">
          {status === 'healthy' ? '✅ Tempo Healthy' : 
           status === 'unhealthy' ? '❌ Tempo Unhealthy' : '⏳ Checking...'}
        </span>
        {status === 'healthy' && (
          <span className="text-xs text-gray-500">
            ({latency}ms)
          </span>
        )}
      </div>
    </div>
  )
}
