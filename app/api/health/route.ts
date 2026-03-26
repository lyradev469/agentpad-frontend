import { NextResponse } from 'next/server'

export async function GET() {
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
    })

    const data = await response.json()

    if (data.result) {
      const blockNumber = parseInt(data.result, 16)
      const timestamp = Date.now()

      return NextResponse.json({
        status: 'healthy',
        blockNumber,
        timestamp,
      })
    }

    return NextResponse.json({ status: 'unknown', error: 'No block number' }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 503 })
  }
}
