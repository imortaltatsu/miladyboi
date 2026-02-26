import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { corsMiddleware } from './middleware/cors.js'
import { errorHandler } from './middleware/error-handler.js'
import { healthRouter } from './routes/health.js'
import { generateRouter } from './routes/generate.js'
import { historyRouter } from './routes/history.js'
import authRouter from './routes/auth.js'

export function createApp() {
  const app = express()

  // Security & logging
  app.use(helmet())
  app.use(morgan('dev'))

  // CORS
  app.use(corsMiddleware)

  // Body parsing
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Routes
  app.use(healthRouter)
  app.use('/api/auth', authRouter)
  app.use(generateRouter)
  app.use(historyRouter)

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Not found'
    })
  })

  // Error handler (must be last)
  app.use(errorHandler)

  return app
}
