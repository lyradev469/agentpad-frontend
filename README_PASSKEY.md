# Passkey Authentication for AgentPad

## Quick Start

### 1. Install Tempo Wagmi SDK
```bash
npm install @tempo-xyz/wagmi
# or
pnpm add @tempo-xyz/wagmi
```

### 2. Update `next.config.js` (if needed)
No special configuration required. The WebAuthn connector works natively.

### 3. Use the Components
```tsx
import { config } from '@/config/wagmi-passkey'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

### 4. Test Passkey Authentication
Visit `http://localhost:3000` and click "Sign Up with Passkey". Approve the biometric prompt in your browser.

---

## Troubleshooting

### Error: "WebAuthn not supported"
- Ensure you're using a modern browser (Chrome 67+, Firefox 67+, Safari 17.2+).
- Check that the page is served over HTTPS (required for WebAuthn in production).

### Key Lost After Browser Clear
- Dev mode uses `localStorage`. For production, migrate to `KeyManager.http()` with remote storage.

### Passkey Cannot Sync Across Devices
- LocalStorage keys are device-specific. Use remote key manager for cross-device sync.

### No Biometric Prompt Appears
- Ensure the device has passkeys set up in system settings.
- Some browsers allow PIN as fallback if biometrics unavailable.

---

## Production Deployment Checklist

- [ ] Replace `KeyManager.localStorage()` with `KeyManager.http()`
- [ ] Set up remote key storage backend
- [ ] Configure `rpId` (relying party ID) for your domain
- [ ] Enable HTTPS on production server
- [ ] Test passkey creation on multiple browsers/devices
- [ ] Implement account recovery mechanism
- [ ] Add fallback option for users without WebAuthn support

---

For full documentation, see `PASSKEY_IMPLEMENTATION.md` and [Tempo Official Docs](https://docs.tempo.xyz/guide/use-accounts/embed-passkeys).
