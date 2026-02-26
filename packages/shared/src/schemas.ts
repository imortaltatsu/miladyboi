import { z } from 'zod'

// Generate panel request schema
export const GenerateRequestSchema = z.object({
  prompt: z.string().min(10).max(1000),
  txHash: z.string().optional(), // Transaction hash for payment
  style: z.enum(['shonen', 'seinen', 'shoujo', 'chibi']).optional().default('shonen')
})

// Generate panel response schema
export const GenerateResponseSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  panelUrl: z.string().optional(), // Image URL when implemented
  panelText: z.string(), // AI-generated narrative (MVP)
  style: z.string(),
  createdAt: z.number(),
  userAddress: z.string()
})

// History item schema
export const HistoryItemSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  panelText: z.string(),
  createdAt: z.number()
})

// Payment details schema (for 402 responses)
export const PaymentDetailsSchema = z.object({
  cost: z.string(), // Token amount (wei)
  tokenAddress: z.string(),
  backendAddress: z.string(),
  chainId: z.number()
})
