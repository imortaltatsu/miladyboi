# CLAUDE.md

Instructions for Claude Code when working with PanelForge.

## Communication

**Be concise.** Minimize tokens, maximize clarity. Use fragments, bullets, technical shorthand.

## Project Overview

**PanelForge** - AI manga panel generator with Web3 micropayments. Users connect wallet, pay with custom ERC20 token, input story prompts → receive generated manga panels.

**Core principle**: Clean separation of concerns. Frontend handles UI + Web3 interactions. Backend handles payment verification + AI generation. x402 middleware enforces crypto-only payments.

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 14 (App Router), React, TypeScript |
| **Styling** | TailwindCSS, framer-motion |
| **Web3** | wagmi, viem, RainbowKit |
| **Backend** | Express.js, TypeScript |
| **Payments** | x402 middleware, on-chain verification |
| **AI** | Anthropic Claude API |
| **Deploy** | Vercel (both frontend & backend) |

## Project Structure

```
panelforge/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                # Landing page
│   │   │   ├── app/
│   │   │   │   ├── page.tsx            # Generator interface
│   │   │   │   ├── history/            # User history
│   │   │   │   └── gallery/            # Public gallery
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── landing/                # Landing components
│   │   │   ├── app/                    # App components
│   │   │   └── ui/                     # Shared UI primitives
│   │   ├── lib/
│   │   │   ├── wagmi.ts               # Wallet configuration
│   │   │   ├── contracts.ts           # Token ABI + address
│   │   │   └── api.ts                 # Backend API client
│   │   └── hooks/
│   │       ├── useTokenBalance.ts
│   │       ├── useTokenApproval.ts
│   │       └── useGeneratePanel.ts
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── index.ts                    # Express app factory
│   │   ├── server.ts                   # Dev server
│   │   ├── routes/
│   │   │   ├── generate.ts             # POST /api/generate (x402 protected)
│   │   │   ├── history.ts              # GET /api/history/:address
│   │   │   └── health.ts               # GET /health
│   │   ├── middleware/
│   │   │   ├── x402.ts                 # HTTP 402 payment verification
│   │   │   ├── cors.ts
│   │   │   └── error-handler.ts
│   │   ├── services/
│   │   │   ├── payment-verification.ts # On-chain tx validation
│   │   │   ├── panel-generation.ts     # AI generation logic
│   │   │   └── storage.ts              # In-memory store (MVP)
│   │   └── lib/
│   │       ├── web3.ts                 # Viem client setup
│   │       └── response.ts             # Response helpers
│   └── api/
│       └── index.ts                    # Vercel serverless entry
│
└── packages/shared/
    └── src/
        ├── types.ts                     # Shared TypeScript types
        └── schemas.ts                   # Zod validation schemas
```

## Key Patterns

### Frontend

- **App Router** - Use server components where possible, client components for interactivity
- **Web3 Hooks** - All wallet interactions via wagmi hooks
- **State Management** - React hooks + Context for global state (wallet, balance)
- **Styling** - Tailwind utility classes, custom theme in `tailwind.config.ts`
- **Animations** - framer-motion for page transitions, button states

### Backend

- **Express Middleware Chain** - CORS → x402 → route handlers → error handler
- **x402 Flow** - Intercept requests, verify tx on-chain, proceed if valid
- **On-chain Verification** - Use viem to read token transfer events
- **Response Format** - Consistent JSON: `{ success: true, data }` or `{ success: false, error }`

### x402 Middleware

```typescript
// Simplified flow
async function x402Middleware(req, res, next) {
  const { txHash } = req.body

  if (!txHash) {
    return res.status(402).json({
      error: 'Payment Required',
      details: { cost: GENERATION_COST, token: TOKEN_ADDRESS }
    })
  }

  const isValid = await verifyPayment(txHash)
  if (!isValid) {
    return res.status(402).json({ error: 'Invalid payment' })
  }

  next()
}
```

## Development Commands

```bash
# Install
pnpm install

# Dev (runs both frontend & backend)
pnpm dev

# Dev individual
pnpm --filter frontend dev      # http://localhost:3000
pnpm --filter backend dev       # http://localhost:4000

# Build
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## Environment Setup

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
NEXT_PUBLIC_TOKEN_ADDRESS=0x... (will be provided)
NEXT_PUBLIC_BACKEND_ADDRESS=0x... (will be provided)
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
```

### Backend (.env)
```
PORT=4000
NODE_ENV=development
ANTHROPIC_API_KEY=sk-ant-...
BACKEND_WALLET_ADDRESS=0x...
TOKEN_ADDRESS=0x...
GENERATION_COST=10000000000000000000  # 10 tokens (18 decimals)
RPC_URL=https://mainnet.base.org
```

## Design System

### Colors (Tailwind config)
```js
colors: {
  manga: {
    purple: '#9C27B0',
    pink: '#E91E63',
    cyan: '#00BCD4',
    blue: '#3B82F6',
  },
  neon: {
    pink: '#FF006E',
    orange: '#FF6B00',
    green: '#00FF88',
  }
}
```

### Typography
- **Display**: Bold, manga-inspired (Bangers, Komika)
- **Body**: Inter, DM Sans
- **Mono**: JetBrains Mono

### Components
- **Glassmorphic Cards**: `backdrop-blur-xl bg-white/5 border border-white/10`
- **Gradient Buttons**: `bg-gradient-to-r from-manga-purple to-manga-pink`
- **Manga Panels**: Comic-style borders with drop shadows

## Key Gotchas

- **Token decimals**: Always use 18 decimals (standard ERC20)
- **Chain ID**: Base = 8453
- **Vercel serverless**: No WebSockets in production (use polling for updates)
- **x402 verification**: Cache verified txHashes to prevent replay attacks
- **Wallet state**: Handle disconnections gracefully
- **Loading states**: Always show loading for async operations (wallet tx, API calls)
- **Error handling**: Display user-friendly messages for Web3 errors

## Updating This File

Only update for fundamental changes:
- New core features
- Architecture shifts
- Critical patterns/gotchas

Stay concise.
