import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await fetch('https://rpc.moderato.tempo.xyz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_blockNumber',
        params: [],
      }),
      timeout: 5000,
    })

    const data = await response.json()

    if (data.result) {
      const blockNumber = parseInt(data.result, 16)
      const timestamp = Date.now()

      return res.status(200).json({
        status: 'healthy',
        blockNumber,
        timestamp,
        latency: timestamp % 1000, // Just a simple indicator
      })
    }

    return res.status(500).json({ status: 'unknown', error: 'No block number' })
  } catch (error) {
    return res.status(503).json({ 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
}
