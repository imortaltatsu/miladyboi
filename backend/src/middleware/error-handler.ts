import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { error } from '../lib/response.js'

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err)

  // Zod validation errors
  if (err.name === 'ZodError') {
    return error(res, 'Validation error', 400, err)
  }

  // Generic error
  const message = err.message || 'Internal server error'
  const status = (err as any).status || 500

  return error(res, message, status)
}
