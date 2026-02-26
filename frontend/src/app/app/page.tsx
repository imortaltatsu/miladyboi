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

      writeContract({
        address: TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [BACKEND_ADDRESS, parseEther('10')],
      })
    } catch (err: any) {
      setError(err.message || 'Transaction failed')
      setLoading(false)
    }
  }

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

  if (txConfirmed && !result && !error && loading) {
    callBackend()
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 leather opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-display text-embossed tracking-wider">
            FORGE
          </h1>
          <div className="flex items-center gap-6">
            {balance && (
              <div className="leather px-6 py-3 rounded-xl border-2 border-white/20 depth-shadow">
                <span className="text-white/60 text-sm font-body">Balance: </span>
                <span className="font-bold text-xl text-white">
                  {(Number(balance) / 1e18).toFixed(2)}
                </span>
                <span className="text-white/80 ml-2">PANEL</span>
              </div>
            )}
            <div className="glossy">
              <ConnectButton />
            </div>
          </div>
        </div>

        {/* Main Generator Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-skeuo p-10 mb-8">
            <h2 className="text-3xl font-display mb-6 tracking-wide text-white">
              Craft Your Manga Panel
            </h2>
            
            <div className="mb-6">
              <label className="block text-white/80 mb-3 font-body text-lg">
                Describe your scene
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A lone samurai stands at sunset, hand on katana, eyes fierce with determination..."
                className="w-full h-40 paper rounded-xl p-6 text-gray-900 placeholder:text-gray-500 font-body text-lg border-4 border-white/30 focus:outline-none focus:border-manga-pink transition-colors depth-shadow"
                disabled={!isConnected || loading}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!isConnected || !prompt || loading}
              className="w-full py-6 btn-embossed text-white font-display text-2xl tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'FORGING...' : 'FORGE PANEL (10 PANEL)'}
            </button>

            {!isConnected && (
              <p className="text-center text-white/60 mt-6 font-body italic">
                Connect your wallet to begin forging
              </p>
            )}

            {error && (
              <div className="mt-6 p-6 bg-red-900/30 border-2 border-red-500/50 rounded-xl backdrop-blur-sm">
                <p className="text-red-300 font-body">{error}</p>
              </div>
            )}
          </div>

          {/* Result Display */}
          {result && (
            <div className="glass-skeuo p-10">
              <h3 className="text-2xl font-display mb-6 text-embossed tracking-wide">
                YOUR FORGED PANEL
              </h3>
              
              <div className="paper p-8 rounded-2xl border-4 border-manga-pink/50 depth-shadow mb-6">
                <p className="text-xl leading-relaxed text-gray-900 font-body italic">
                  {result.panelText}
                </p>
              </div>

              <div className="space-y-2 text-white/60 font-body">
                <p><span className="text-white/80">Prompt:</span> {result.prompt}</p>
                <p><span className="text-white/80">Style:</span> {result.style}</p>
                <p><span className="text-white/80">Forged:</span> {new Date(result.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
