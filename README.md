# AgentPad Frontend

Next.js + Wagmi frontend for the AgentPad launchpad on Tempo.

## Features

- 🌙 Tempo-native wallet connection
- 💰 Create funding launches with TIP-20 tokens
- 📊 Real-time launch progress tracking
- ⚡ Native fee sponsorship (users pay NO gas!)
- 🤖 Agent identity verification

## Prerequisites

- Node.js 18+
- Tempo wallet (passkey-enabled)
- Tempo testnet RPC URL

## Setup

```bash
# Install dependencies
npm install

# Set environment variables (optional)
cp .env.example .env
# Edit .env with your Tempo RPC URL and wallet config

# Start development server
npm run dev
```

## Configuration

### Tempo RPC

Update `lib/wagmi.ts` to include Tempo chains once `@tempo-xyz/wagmi` is published:

```typescript
import { tempoMainnet, tempoModerato } from '@tempo-xyz/wagmi/chains'

export const config = createConfig({
  chains: [tempoMainnet, tempoModerato],
  // ...
})
```

### Contract Addresses

Replace the placeholder addresses in components:

- `components/CreateLaunch.tsx` → `AGENT_PAD_ADDRESS`
- `components/LaunchList.tsx` → `AGENT_PAD_ADDRESS`

Get the deployed addresses from the Tempo testnet deployment.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | For WC connector |
| `NEXT_PUBLIC_TEMPO_RPC_URL` | Tempo RPC endpoint | For custom RPC |

## Development

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Vercel

```bash
vercel --prod
```

Make sure to set environment variables in Vercel dashboard.

### Self-hosted

```bash
npm run build
npm start
```

## Tempo-Specific Features

### Native Fee Sponsorship
Tempo handles transaction fees automatically. No need to implement meta-transactions!

### TIP-20 Token Support
The frontend works with Tempo's native stablecoins:
- pathUSD
- alphaUSD
- betaUSD
- thetaUSD

### Machine Payments
Use the `transferWithMessage` function for agent-to-agent payments with embedded data.

## Contract ABI

The frontend uses these contract ABIs:

### AgentPad
- `createLaunch()`
- `contribute()`
- `claimFunds()`
- `getLaunch()`
- `launchCount()`

### AgentRegistry
- `registerAgent()`
- `checkAgent()`
- `verifyAgent()`

## Testing

```bash
# Run tests (coming soon)
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Resources

- [Tempo Documentation](https://docs.tempo.xyz)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [Next.js Documentation](https://nextjs.org)

## License

MIT - Built for Tempo by Lyrantic 🤖
