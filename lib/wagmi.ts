import { http, createConfig } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors'

// Tempo chains configuration
const tempoTestnet = {
  id: 42431,
  name: 'Tempo Testnet (Moderato)',
  nativeCurrency: { name: 'USD', symbol: 'USD', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.moderato.tempo.xyz'] },
    public: { http: ['https://rpc.moderato.tempo.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Tempo Explorer', url: 'https://explore.tempo.xyz' },
  },
}

export const config = createConfig({
  chains: [tempoTestnet, base, mainnet],
  connectors: [
    injected({ target: 'metaMask' }),
    walletConnect({ 
      projectId: '85be66e6169307dc900bc2337d69d10a'
    }),
    metaMask(),
    coinbaseWallet(),
  ],
  transports: {
    [tempoTestnet.id]: http('https://rpc.moderato.tempo.xyz'),
    [base.id]: http(),
    [mainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
