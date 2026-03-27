import { createConfig, http } from 'wagmi'
import { tempo, tempoModerato } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo'

/**
 * Wagmi Configuration with Passkey Support
 * 
 * This configuration enables WebAuthn passkey authentication for Tempo blockchain.
 * Key features:
 * - Domain-bound passkeys (secure against phishing)
 * - LocalStorage key manager (for development/demo)
 * - Remote key manager recommended for production
 * - Explicit disabling of injected wallet detection
 * 
 * Production Note:
 * Replace KeyManager.localStorage() with KeyManager.http() for server-side key storage
 * to enable cross-device sync and recovery.
 * 
 * @see https://docs.tempo.xyz/guide/use-accounts/embed-passkeys
 * @see https://wagmi.sh/tempo
 */

// Import the webAuthn connector from Wagmi's Tempo module
// This enables WebAuthn-based authentication (passkeys)

export const config = createConfig({
  chains: [tempoModerato], // Use 'tempo' for mainnet, 'tempoModerato' for testnet
  
  connectors: [
    webAuthn({
      // KeyManager.localStorage() stores passkeys in browser's localStorage
      // ⚠️ NOT suitable for production - keys are device-specific
      // 
      // For production, use:
      // KeyManager.http({ baseUrl: 'https://your-server.com/api/keys' })
      keyManager: KeyManager.localStorage(),
      
      // Optional: Custom Relying Party ID (defaults to window.location.hostname)
      // rpId: 'yourdomain.com',
      
      // Optional: Custom user verification requirement
      // userVerification: 'preferred', // 'required' | 'preferred' | 'discouraged'
    }),
  ],
  
  // Prevent auto-detection of injected wallets (MetaMask, etc.)
  // This ensures passkeys are the primary/auth method
  multiInjectedProviderDiscovery: false,
  
  transports: {
    [tempoModerato.id]: http('https://rpc.moderato.tempo.xyz'),
  },
})

/**
 * Alternative: ProductionConfig with Remote Key Manager
 * 
 * Uncomment and use this for production deployments:
 * 
 ```typescript
export const productionConfig = createConfig({
  chains: [tempo], // Mainnet
  connectors: [
    webAuthn({
      keyManager: KeyManager.http({
        baseUrl: process.env.NEXT_PUBLIC_KEY_MANAGER_URL!,
        fetchOptions: {
          headers: {
            'X-API-Key': process.env.NEXT_PUBLIC_KEY_MANAGER_API_KEY!,
          },
        },
      }),
    }),
  ],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
 ```
 */

// Export chain configuration for type safety
export type AppConfig = typeof config

export default config
