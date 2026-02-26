import { Router } from 'express'
import { storage } from '../services/storage.js'
import { success, error } from '../lib/response.js'

export const historyRouter = Router()

// Get user's generation history
historyRouter.get('/api/history/:address', (req, res) => {
  const { address } = req.params

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    error(res, 'Invalid address')
    return
  }

  const history = storage.getUserHistory(address)

  success(res, {
    address,
    generations: history,
    count: history.length
  })
})

// Get public gallery (all generations)
historyRouter.get('/api/gallery', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 50
  const gallery = storage.getAllGenerations(limit)

  success(res, {
    generations: gallery,
    count: gallery.length
  })
})
