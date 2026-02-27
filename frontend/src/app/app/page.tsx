'use client'

import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { generateManga, type MangaResult } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

export default function AppPage() {
  const [prompt, setPrompt] = useState('')
  const [numPages, setNumPages] = useState(1)
  const [result, setResult] = useState<MangaResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGenerate() {
    if (!prompt.trim()) return

    try {
      setLoading(true)
      setError('')
      setResult(null)

      const data = await generateManga(prompt, numPages)
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Generation failed')
    } finally {
      setLoading(false)
    }
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
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Generator Card */}
        <div className="glass rounded-3xl p-8 sm:p-10 backdrop-blur-lg bg-black/30 border border-white/10 mb-8">
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            <span className="waifu-gradient">Manga Generator</span>
          </h2>
          <p className="text-gray-200 mb-8">Write your story. AI turns it into manga panels.</p>
          
          {/* Story Input */}
          <div className="mb-6">
            <label className="block text-gray-100 mb-3 font-bold text-sm uppercase tracking-wider">
              Your Story
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A lone samurai stands at sunset, hand on katana, eyes fierce with determination. The wind howls through the bamboo forest behind him..."
              className="w-full h-44 bg-black/40 border-2 border-white/10 rounded-2xl p-6 text-white placeholder:text-gray-500 text-lg focus:outline-none focus:border-waifu-pink/50 transition-colors resize-none backdrop-blur-md"
              disabled={loading}
              maxLength={8000}
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-400">{prompt.length} / 8000</span>
            </div>
          </div>

          {/* Number of Pages */}
          <div className="mb-8">
            <label className="block text-gray-100 mb-3 font-bold text-sm uppercase tracking-wider">
              Pages to Generate
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumPages(n)}
                  disabled={loading}
                  className={`w-14 h-14 rounded-xl font-black text-lg transition-all ${
                    numPages === n
                      ? 'bg-gradient-to-br from-waifu-red to-waifu-pink text-white shadow-waifu scale-110'
                      : 'bg-black/40 border border-white/10 text-gray-300 hover:border-waifu-pink/50 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="flex items-center text-sm text-gray-400 ml-2">
                {numPages === 1 ? 'Single panel' : `${numPages} pages`}
              </span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            className="w-full py-5 bg-gradient-to-r from-waifu-red to-waifu-pink hover:from-waifu-pink hover:to-waifu-coral text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] shadow-waifu disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating {numPages === 1 ? 'panel' : `${numPages} pages`}...
              </span>
            ) : (
              `Generate ${numPages === 1 ? 'Panel' : `${numPages} Pages`}`
            )}
          </button>

          {/* Error */}
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black">
                <span className="waifu-gradient">
                  {result.singleImage ? 'Your Panel' : `Your ${result.pages?.length} Pages`}
                </span>
              </h3>
              <button
                onClick={() => setResult(null)}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Clear
              </button>
            </div>

            {/* Single image result */}
            {result.singleImage && (
              <div className="relative rounded-2xl overflow-hidden border-2 border-waifu-pink/30">
                <img
                  src={result.singleImage}
                  alt="Generated manga panel"
                  className="w-full h-auto"
                />
                <a
                  href={result.singleImage}
                  download="manga-panel.png"
                  className="absolute bottom-4 right-4 px-6 py-2 bg-black/70 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-waifu-pink/30 transition-colors font-bold text-sm"
                >
                  Download
                </a>
              </div>
            )}

            {/* Multi-page result */}
            {result.pages && (
              <div className="space-y-6">
                {result.pages.map((pageDataUri, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden border-2 border-waifu-pink/30">
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-sm font-bold text-waifu-pink border border-waifu-pink/30">
                      Page {idx + 1}
                    </div>
                    <img
                      src={pageDataUri}
                      alt={`Manga page ${idx + 1}`}
                      className="w-full h-auto"
                    />
                    <a
                      href={pageDataUri}
                      download={`manga-page-${idx + 1}.png`}
                      className="absolute bottom-4 right-4 px-6 py-2 bg-black/70 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-waifu-pink/30 transition-colors font-bold text-sm"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
