import { z } from 'zod'
import { GenerateRequestSchema, GenerateResponseSchema, HistoryItemSchema } from './schemas.js'

// Infer types from Zod schemas
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>
export type GenerateResponse = z.infer<typeof GenerateResponseSchema>
export type HistoryItem = z.infer<typeof HistoryItemSchema>

// API Response envelope
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  details?: unknown
}

// Generation status
export enum GenerationStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// Payment verification result
export interface PaymentVerification {
  isValid: boolean
  from?: string
  to?: string
  amount?: string
  timestamp?: number
}
