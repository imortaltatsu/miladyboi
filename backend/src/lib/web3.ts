import { createPublicClient, http, type PublicClient } from 'viem'
import { base } from 'viem/chains'

let publicClient: PublicClient | null = null

export function getPublicClient(): PublicClient {
  if (!publicClient) {
    publicClient = createPublicClient({
      chain: base,
      transport: http(process.env.RPC_URL || 'https://mainnet.base.org')
    })
  }
  return publicClient
}

// ERC20 Token ABI (minimal - just transfer event)
export const ERC20_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const
