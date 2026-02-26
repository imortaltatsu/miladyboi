import { Router } from 'express'
import { success } from '../lib/response.js'

export const healthRouter = Router()

healthRouter.get('/health', (req, res) => {
  success(res, {
    status: 'ok',
    timestamp: Date.now(),
    service: 'panelforge-backend'
  })
})
