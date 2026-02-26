import type { Request, Response, NextFunction } from 'express'
import { verifyPayment } from '../services/payment-verification.js'
import { paymentRequired } from '../lib/response.js'
import { GENERATION_COST } from 'shared'

const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS || ''
const BACKEND_ADDRESS = process.env.BACKEND_WALLET_ADDRESS || ''

export async function x402Middleware(req: Request, res: Response, next: NextFunction) {
  const { txHash } = req.body

  // If no txHash provided, return 402 with payment details
  if (!txHash) {
    return paymentRequired(res, {
      cost: GENERATION_COST,
      tokenAddress: TOKEN_ADDRESS,
      backendAddress: BACKEND_ADDRESS,
      chainId: 8453,
      message: 'Payment required to generate manga panel'
    })
  }

  // Verify payment transaction
  const verification = await verifyPayment(txHash)

  if (!verification.isValid) {
    return paymentRequired(res, {
      cost: GENERATION_COST,
      tokenAddress: TOKEN_ADDRESS,
      backendAddress: BACKEND_ADDRESS,
      chainId: 8453,
      message: 'Invalid or insufficient payment'
    })
  }

  // Attach payment info to request for use in route handler
  req.paymentInfo = verification

  next()
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      paymentInfo?: {
        isValid: boolean
        from?: string
        to?: string
        amount?: string
        timestamp?: number
      }
    }
  }
}
