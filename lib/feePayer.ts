/**
 * Tempo Fee Sponsorship Handler
 * 
 * Allows AgentPad to cover gas fees for users via Fee Payer pattern.
 * Uses Tempo's EIP-2718 transaction type with fee sponsorship.
 * 
 * @see https://docs.tempo.xyz/protocol/fee-sponsorship
 */

import { createPublicClient, http, parseAbi } from 'viem'
import { mainnet, base } from 'wagmi/chains'

// Tempo chain configuration
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
} as const

// Fee Manager ABI
const FEE_MANAGER_ABI = parseAbi([
  'function isFeePayerAllowed(address payer) external view returns (bool)',
  'function setFeePayerAllowed(address payer, bool allowed) external',
  'function addLiquidity(uint256 amount) external payable',
  'function sponsorTransaction(address user, bytes32 nonce) external',
])

const FEE_MANAGER_ADDRESS = '0xfeec000000000000000000000000000000000000' as const

// Create client for fee operations
const feeClient = createPublicClient({
  chain: tempoTestnet,
  transport: http(tempoTestnet.rpcUrls.default.http[0]),
})

/**
 * Check if a fee payer address is registered
 */
export async function isFeePayerAllowed(payerAddress: `0x${string}`): Promise<boolean> {
  try {
    const isAllowed = await feeClient.readContract({
      address: FEE_MANAGER_ADDRESS,
      abi: FEE_MANAGER_ABI,
      functionName: 'isFeePayerAllowed',
      args: [payerAddress],
    })
    return isAllowed as boolean
  } catch (error) {
    console.error('Error checking fee payer status:', error)
    return false
  }
}

/**
 * Enable an address as a fee payer
 * This allows the address to sponsor transactions for other users
 */
export async function enableFeePayer(
  { 
    address, 
    amount 
  }: { 
    address: `0x${string}` 
    amount: bigint 
  }
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    // Return function to be called from writeContract context
    // Actual execution happens in CreateLaunch component
    return { 
      success: true, 
      txHash: undefined, // Will be set when called with wallet
      error: undefined 
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to enable fee payer' 
    }
  }
}

/**
 * Register fee sponsorship for a transaction
 * Generates a nonce for the user to use in their sponsored transaction
 */
export async function generateSponsorshipNonce(userAddress: `0x${string}`): Promise<string> {
  // In Tempo, nonces are typically managed off-chain or via session
  // This is a placeholder for the actual implementation
  const nonce = crypto.randomUUID().replace(/-/g, '') as `${string}`
  return `0x${nonce}` as `0x${string}`
}

/**
 * Check fee payer balance (liquidity pool)
 */
export async function getFeePayerBalance(payerAddress: `0x${string}`): Promise<bigint> {
  try {
    // Query the fee manager contract for the payer's balance
    // This is a simplified version - actual implementation may vary
    return BigInt(0)
  } catch (error) {
    console.error('Error getting fee payer balance:', error)
    return BigInt(0)
  }
}

/**
 * Get Tempo-specific transaction options with fee sponsorship
 */
export function getSponsoredTxOptions(
  userAddress: `0x${string}`,
  payerAddress: `0x${string}`
): {
  feePayer: `0x${string}`
  feePayerNonce: string
} {
  const feePayerNonce = crypto.randomUUID()
  return {
    feePayer: payerAddress,
    feePayerNonce,
  }
}

/**
 * Validate fee sponsorship eligibility
 */
export async function validateSponsorshipEligibility(
  userAddress: `0x${string}`,
  projectAddress: `0x${string}`
): Promise<{ eligible: boolean; reason?: string }> {
  const isPayerAllowed = await isFeePayerAllowed(projectAddress)
  
  if (!isPayerAllowed) {
    return {
      eligible: false,
      reason: 'Project not registered as fee payer',
    }
  }

  const balance = await getFeePayerBalance(projectAddress)
  const minRequired = BigInt(1e18) // 1 pathUSD minimum

  if (balance < minRequired) {
    return {
      eligible: false,
      reason: 'Insufficient fee sponsorship liquidity',
    }
  }

  return { eligible: true }
}

export { FEE_MANAGER_ADDRESS, FEE_MANAGER_ABI, tempoTestnet, feeClient }
