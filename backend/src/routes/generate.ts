import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { GenerateRequestSchema } from 'shared'
import { x402Middleware } from '../middleware/x402.js'
import { generateMangaPanel } from '../services/panel-generation.js'
import { storage } from '../services/storage.js'
import { success, error } from '../lib/response.js'

export const generateRouter = Router()

generateRouter.post('/api/generate', x402Middleware, async (req, res, next) => {
  try {
    // Validate request body
    const parseResult = GenerateRequestSchema.safeParse(req.body)

    if (!parseResult.success) {
      return error(res, 'Invalid request', 400, parseResult.error)
    }

    const request = parseResult.data

    // Extract user address from payment info
    const userAddress = req.paymentInfo?.from || 'unknown'

    // Generate manga panel narrative
    const panelText = await generateMangaPanel(request)

    // Create generation record
    const generation = {
      id: uuidv4(),
      prompt: request.prompt,
      panelText,
      style: request.style || 'shonen',
      createdAt: Date.now(),
      userAddress
    }

    // Save to storage
    storage.saveGeneration(generation)

    // Return result
    success(res, generation, 201)
  } catch (err) {
    next(err)
  }
})
