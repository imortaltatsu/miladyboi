'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseEther } from 'viem'
import { TOKEN_ADDRESS, BACKEND_ADDRESS, ERC20_ABI } from '@/lib/contracts'
import { generatePanel } from '@/lib/api'

export default function AppPage() {
  const { address, isConnected } = useAccount()
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { writeContract, data: txHash } = useWriteContract()
  const { isSuccess: txConfirmed } = useWaitForTransactionReceipt({ hash: txHash })

  // Read token balance
  const { data: balance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  async function handleGenerate() {
    if (!prompt || !address) return

    try {
      setLoading(true)
      setError('')
      setResult(null)

      // Step 1: Transfer tokens to backend
      writeContract({
        address: TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [BACKEND_ADDRESS, parseEther('10')],
      })

      // Wait for tx confirmation (handled by useWaitForTransactionReceipt)
    } catch (err: any) {
      setError(err.message || 'Transaction failed')
      setLoading(false)
    }
  }

  // Once tx is confirmed, call backend API
  async function callBackend() {
    if (!txHash || !txConfirmed) return

    try {
      const response = await generatePanel(prompt, txHash, 'shonen')
      
      if (response.success) {
        setResult(response.data)
        setPrompt('')
      } else {
        setError(response.error || 'Generation failed')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate panel')
    } finally {
      setLoading(false)
    }
  }

  // Trigger backend call when tx is confirmed
  if (txConfirmed && !result && !error && loading) {
    callBackend()
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold gradient-text">PanelForge</h1>
          <div className="flex items-center gap-4">
            {balance && (
              <div className="glass px-4 py-2 rounded-lg">
                <span className="text-gray-400">Balance: </span>
                <span className="font-bold gradient-text">
                  {(Number(balance) / 1e18).toFixed(2)} PANEL
                </span>
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Main Generator */}
      <div className="max-w-3xl mx-auto">
        <div className="glass p-8 rounded-2xl space-y-6">
          <h2 className="text-2xl font-bold">Generate Manga Panel</h2>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Describe your manga scene
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A lone samurai stands at sunset, hand on katana, eyes fierce..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-manga-pink"
              disabled={!isConnected || loading}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!isConnected || !prompt || loading}
            className="w-full py-4 bg-gradient-manga text-white font-bold text-lg rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
          >
            {loading ? 'Generating...' : 'Generate Panel (10 PANEL)'}
          </button>

          {!isConnected && (
            <p className="text-center text-gray-400">
              Connect your wallet to start generating
            </p>
          )}

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-8 glass p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 gradient-text">Your Manga Panel</h3>
            
            <div className="bg-white/5 p-6 rounded-lg border-4 border-manga-pink/50">
              <p className="text-lg leading-relaxed">{result.panelText}</p>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p>Prompt: {result.prompt}</p>
              <p>Style: {result.style}</p>
              <p>Created: {new Date(result.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
