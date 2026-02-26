import 'dotenv/config'
import { createApp } from './index.js'

const PORT = process.env.PORT || 4000

const app = createApp()

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})
