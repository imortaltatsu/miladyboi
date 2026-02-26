import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

// Use Base Sepolia for testnet, Base for mainnet
const chains = process.env.NEXT_PUBLIC_CHAIN_ID === '84532'
  ? [baseSepolia, base] as const
  : [base, baseSepolia] as const

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    walletConnect({
      projectId,
      showQrModal: true,
    }),
    coinbaseWallet({
      appName: 'Milady Waifu',
      appLogoUrl: '/logo.png',
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
