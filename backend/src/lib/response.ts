import { Response } from 'express'
import type { ApiResponse } from 'shared'

export function success<T>(res: Response, data: T, status = 200): Response {
  return res.status(status).json({
    success: true,
    data
  } as ApiResponse<T>)
}

export function error(res: Response, message: string, status = 400, details?: unknown): Response {
  return res.status(status).json({
    success: false,
    error: message,
    details
  } as ApiResponse)
}

export function paymentRequired(res: Response, details: unknown): Response {
  return res.status(402).json({
    success: false,
    error: 'Payment Required',
    details
  } as ApiResponse)
}
