import { getPublicClient, ERC20_ABI } from '../lib/web3.js'
import { GENERATION_COST } from 'shared'
import type { PaymentVerification } from 'shared'

const BACKEND_ADDRESS = process.env.BACKEND_WALLET_ADDRESS?.toLowerCase() || ''
const TOKEN_ADDRESS = (process.env.TOKEN_ADDRESS?.toLowerCase() || '') as `0x${string}`

// Cache verified txHashes to prevent replay attacks
const verifiedTxs = new Set<string>()

export async function verifyPayment(txHash: string): Promise<PaymentVerification> {
  try {
    // Prevent replay attacks
    if (verifiedTxs.has(txHash)) {
      return { isValid: false }
    }

    const client = getPublicClient()

    // Get transaction receipt
    const receipt = await client.getTransactionReceipt({ hash: txHash as `0x${string}` })

    if (!receipt || receipt.status !== 'success') {
      return { isValid: false }
    }

    // Find Transfer event in logs
    const transferLog = receipt.logs.find(
      log =>
        log.address.toLowerCase() === TOKEN_ADDRESS &&
        log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' // Transfer event signature
    )

    if (!transferLog) {
      return { isValid: false }
    }

    // Decode Transfer event
    const from = `0x${transferLog.topics[1]?.slice(26)}` // Remove padding
    const to = `0x${transferLog.topics[2]?.slice(26)}`
    const amount = BigInt(transferLog.data)

    // Verify transfer is to backend address with correct amount
    const isValid =
      to.toLowerCase() === BACKEND_ADDRESS &&
      amount >= BigInt(GENERATION_COST)

    if (isValid) {
      // Mark as verified
      verifiedTxs.add(txHash)
    }

    return {
      isValid,
      from,
      to,
      amount: amount.toString(),
      timestamp: Date.now()
    }
  } catch (err) {
    console.error('Payment verification error:', err)
    return { isValid: false }
  }
}
