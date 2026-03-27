import { http, createConfig } from 'wagmi'
import { mainnet, base, tempo, tempoModerato } from 'wagmi/chains'
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors'
import { KeyManager, webAuthn } from 'wagmi/tempo'

/**
 * Wagmi Configuration for AgentPad
 * 
 * Supports:
 * 1. Passkey Authentication (WebAuthn) - Primary for Tempo
 * 2.Injected Wallets (MetaMask, Coinbase) - Fallback
 * 3. WalletConnect - For mobile/hardware wallets
 * 
 * Chains:
 * - Tempo Moderate (Testnet) - Default for development
 * - Tempo (Mainnet) - For production
 * - Base - For future multi-chain support
 * - Mainnet - For future multi-chain support
 */

export const config = createConfig({
  chains: [tempoModerato, tempo, base, mainnet],
  connectors: [
    // Primary: Passkey Authentication (WebAuthn) for Tempo
    webAuthn({
      keyManager: KeyManager.localStorage(),
      // For production, use:
      // keyManager: KeyManager.http({ baseUrl: process.env.NEXT_PUBLIC_KEY_MANAGER_URL! }),
    }),

    // Secondary: Standard Wallet Connectors
    injected({ target: 'metaMask' }),
    walletConnect({ 
      projectId: '85be66e6169307dc900bc2337d69d10a'
    }),
    metaMask(),
    coinbaseWallet({
      appName: 'AgentPad',
      appLogoUrl: 'https://agentpad.vercel.app/logo.png',
    }),
  ],
  transports: {
    [tempoModerato.id]: http('https://rpc.moderato.tempo.xyz'),
    [tempo.id]: http('https://rpc.tempo.xyz'),
    [base.id]: http(),
    [mainnet.id]: http(),
  },

  // Enable multi-injected provider discovery for wallet fallbacks
  multiInjectedProviderDiscovery: true,
})

// Type declaration for wagmi module augmentation
declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export default config
