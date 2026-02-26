import { Router } from 'express'
import { verifyMessage } from 'viem'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const router = Router()

// In-memory storage (replace with database in production)
const nonces = new Map<string, string>()
const sessions = new Map<string, { address: string; credits: number }>()

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-in-production'

// Generate nonce for SIWE
router.get('/nonce', (req, res) => {
  const { address } = req.query

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Address required' })
  }

  const nonce = crypto.randomBytes(16).toString('hex')
  nonces.set(address.toLowerCase(), nonce)

  // Clean up old nonces after 5 minutes
  setTimeout(() => {
    nonces.delete(address.toLowerCase())
  }, 5 * 60 * 1000)

  res.json({ nonce })
})

// Verify signature and create session
router.post('/verify-signature', async (req, res) => {
  try {
    const { message, signature, address } = req.body

    if (!message || !signature || !address) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const normalizedAddress = address.toLowerCase()

    // Verify the signature
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    })

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    // Check nonce (basic replay protection)
    const storedNonce = nonces.get(normalizedAddress)
    if (!storedNonce || !message.includes(storedNonce)) {
      return res.status(401).json({ error: 'Invalid or expired nonce' })
    }

    // Remove used nonce
    nonces.delete(normalizedAddress)

    // Get or create user credits
    let session = sessions.get(normalizedAddress)
    if (!session) {
      session = {
        address: normalizedAddress,
        credits: 0, // Start with 0 credits
      }
      sessions.set(normalizedAddress, session)
    }

    // Generate JWT
    const token = jwt.sign(
      { address: normalizedAddress },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      credits: session.credits,
      address: normalizedAddress,
    })
  } catch (error) {
    console.error('Signature verification error:', error)
    res.status(500).json({ error: 'Verification failed' })
  }
})

// Verify JWT token
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { address: string }
    const session = sessions.get(decoded.address)

    if (!session) {
      return res.status(401).json({ error: 'Session not found' })
    }

    res.json({
      address: session.address,
      credits: session.credits,
    })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Get credits
router.get('/credits', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { address: string }
    const session = sessions.get(decoded.address)

    if (!session) {
      return res.status(401).json({ error: 'Session not found' })
    }

    res.json({ credits: session.credits })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Add credits (called after USDC payment)
router.post('/add-credits', async (req, res) => {
  try {
    const { address, amount, txHash } = req.body

    if (!address || !amount || !txHash) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const normalizedAddress = address.toLowerCase()

    // TODO: Verify USDC payment transaction on-chain
    // TODO: Perform USDC to WAIFU swap
    // For now, just add credits

    let session = sessions.get(normalizedAddress)
    if (!session) {
      session = {
        address: normalizedAddress,
        credits: 0,
      }
      sessions.set(normalizedAddress, session)
    }

    session.credits += amount

    res.json({
      credits: session.credits,
      txHash,
    })
  } catch (error) {
    console.error('Add credits error:', error)
    res.status(500).json({ error: 'Failed to add credits' })
  }
})

// Deduct credits (called when generating)
export function deductCredits(address: string, amount: number): boolean {
  const normalizedAddress = address.toLowerCase()
  const session = sessions.get(normalizedAddress)

  if (!session || session.credits < amount) {
    return false
  }

  session.credits -= amount
  return true
}

export default router
