'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseEther } from 'viem'
import { TOKEN_ADDRESS, BACKEND_ADDRESS, ERC20_ABI } from '@/lib/contracts'
import { generatePanel } from '@/lib/api'
import Link from 'next/link'

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
    <div className="min-h-screen bg-waifu-bg relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient-bg opacity-20" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black waifu-gradient tracking-tight">Milady Waifu</h1>
          </Link>
          <div className="flex items-center gap-4">
            {balance && (
              <div className="glass px-4 py-2 rounded-xl backdrop-blur-md bg-black/30">
                <span className="text-gray-300 text-sm">Balance: </span>
                <span className="font-bold text-lg text-white">
                  {(Number(balance) / 1e18).toFixed(2)}
                </span>
                <span className="text-waifu-pink ml-1 font-bold">PANEL</span>
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Generator Card */}
        <div className="glass rounded-3xl p-8 sm:p-10 backdrop-blur-lg bg-black/30 border border-white/10 mb-8">
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            <span className="waifu-gradient">Panel Generator</span>
          </h2>
          <p className="text-gray-200 mb-8">Describe your scene in detail. Create something unique.</p>
          
          <div className="mb-6">
            <label className="block text-gray-100 mb-3 font-bold text-sm uppercase tracking-wider">
              Your Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A lone samurai stands at sunset, hand on katana, eyes fierce with determination..."
              className="w-full h-40 bg-black/40 border-2 border-white/10 rounded-2xl p-6 text-white placeholder:text-gray-400 text-lg focus:outline-none focus:border-waifu-pink/50 transition-colors resize-none backdrop-blur-md"
              disabled={!isConnected || loading}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!isConnected || !prompt || loading}
            className="w-full py-5 bg-gradient-to-r from-waifu-red to-waifu-pink hover:from-waifu-pink hover:to-waifu-coral text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] shadow-waifu disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              `Generate Panel (10 PANEL)`
            )}
          </button>

          {!isConnected && (
            <p className="text-center text-gray-300 mt-6">
              Connect your wallet to start generating.
            </p>
          )}

          {error && (
            <div className="mt-6 p-6 bg-red-900/30 border border-red-500/40 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold">!</span>
                </div>
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Result Display */}
        {result && (
          <div className="glass rounded-3xl p-8 sm:p-10 backdrop-blur-lg bg-black/30 border border-white/10">
            <h3 className="text-2xl font-black mb-6">
              <span className="waifu-gradient">Your Panel</span>
            </h3>
            
            <div className="bg-black/40 p-8 rounded-2xl border-2 border-waifu-pink/30 mb-6">
              <p className="text-xl leading-relaxed text-gray-100 italic">
                {result.panelText}
              </p>
            </div>

            <div className="space-y-2 text-gray-300 text-sm">
              <p><span className="text-gray-100 font-bold">Prompt:</span> {result.prompt}</p>
              <p><span className="text-gray-100 font-bold">Style:</span> {result.style}</p>
              <p><span className="text-gray-100 font-bold">Created:</span> {new Date(result.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
