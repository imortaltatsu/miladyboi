'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function AppPage() {
  const [story, setStory] = useState('')
  const [selectedPages, setSelectedPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mangaData, setMangaData] = useState<{ type: 'pages' | 'iframe'; data: any[] | string } | null>(null)

  const API_URL = 'https://mangaapi.miladyboi.fun/generate-manga-dev'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!story.trim()) return

    setError(null)
    setIsLoading(true)
    setMangaData(null)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          story: story.trim(),
          num_pages: selectedPages
        })
      })

      if (!response.ok) {
        const errText = await response.text()
        let errorMsg = 'Failed to generate manga.'
        try {
          const errJson = JSON.parse(errText)
          errorMsg = errJson.detail || errorMsg
          if (Array.isArray(errorMsg)) errorMsg = errorMsg[0].msg
        } catch (parseErr) { }
        throw new Error(errorMsg)
      }

      const contentType = response.headers.get('content-type') || ''

      if (contentType.includes('image/')) {
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)
        setMangaData({ type: 'pages', data: [{ src: objectUrl, isObjectUrl: true }] })
      } else if (contentType.includes('text/html')) {
        const htmlContent = await response.text()
        setMangaData({ type: 'iframe', data: htmlContent })
      } else {
        const data = await response.json()
        if (data.pages && Array.isArray(data.pages)) {
          setMangaData({ type: 'pages', data: data.pages.map((p: string) => ({ src: p, isObjectUrl: false })) })
        } else if (data.image) {
          setMangaData({ type: 'pages', data: [{ src: data.image, isObjectUrl: false }] })
        } else {
          throw new Error("Unknown response format from API")
        }
      }
    } catch (err: any) {
      console.error('Generation error:', err)
      setError(err.message || 'An unexpected error occurred during generation.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMangaData(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Determine grid layout structure
  const numPages = mangaData?.type === 'pages' ? (mangaData.data as any[]).length : 0
  let gridClass = 'grid gap-2 sm:gap-4 w-full justify-center auto-rows-fr grid-cols-1'
  if (numPages === 2 || numPages === 4) {
    gridClass = 'grid gap-2 sm:gap-4 w-full justify-center auto-rows-fr grid-cols-2'
  } else if (numPages === 3) {
    gridClass = 'grid gap-2 sm:gap-4 w-full justify-center auto-rows-fr grid-cols-1 sm:grid-cols-3'
  } else if (numPages > 4) {
    gridClass = 'grid gap-2 sm:gap-4 w-full justify-center auto-rows-fr grid-cols-2 sm:grid-cols-3'
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col text-white pb-12">
      <style dangerouslySetInnerHTML={{
        __html: `
        .glass {
            backdrop-filter: blur(12px);
            background-color: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .waifu-gradient {
            background: linear-gradient(135deg, #FF4081 0%, #FF6E88 50%, #B968C7 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .btn-gradient {
            background: linear-gradient(to right, #FF1744, #FF4081);
        }
        .btn-gradient:hover {
            background: linear-gradient(to right, #FF4081, #FF6E88);
        }
        .shadow-waifu {
            box-shadow: 0 0 20px rgba(255, 64, 129, 0.4);
        }
        .loader {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 3px solid white;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .progress-bar-anim {
            animation: loadingBar 45s ease-in-out forwards;
        }
        @keyframes loadingBar {
            0% { width: 5%; }
            20% { width: 30%; }
            50% { width: 50%; }
            80% { width: 85%; }
            95% { width: 95%; }
            100% { width: 99%; }
        }
      `}} />

      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient-bg opacity-20" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/20 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black waifu-gradient tracking-tight">Milady Manga</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col pt-8 px-4 sm:px-6">

        {/* Form Section */}
        {!isLoading && !mangaData && (
          <div className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-2 waifu-gradient">Manga Generator</h2>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">Write your story. AI turns it into manga panels.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Story Input */}
              <div>
                <label className="block text-gray-200 mb-2 font-bold text-xs uppercase tracking-wider">Your Story</label>
                <textarea
                  required
                  maxLength={8000}
                  placeholder="A lone samurai stands at sunset, hand on katana, eyes fierce with determination..."
                  className="w-full h-32 bg-black/40 border-2 border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-500 text-base focus:outline-none focus:border-[#FF4081]/50 transition-colors resize-y glass"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                />
              </div>

              {/* Pages Selection */}
              <div>
                <label className="block text-gray-200 mb-2 font-bold text-xs uppercase tracking-wider">Pages</label>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setSelectedPages(page)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-black transition-all ${selectedPages === page
                        ? 'bg-gradient-to-br from-[#FF1744] to-[#FF4081] text-white shadow-waifu'
                        : 'bg-black/40 border border-white/10 text-gray-300 hover:border-[#FF4081]/50 hover:text-white'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-900/40 border border-red-500/50 rounded-xl">
                  <p className="text-red-200 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 btn-gradient text-white font-black text-lg rounded-2xl transition-all shadow-waifu relative overflow-hidden flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{selectedPages === 1 ? 'Generate Panel' : 'Generate Pages'}</span>
                {isLoading && <div className="loader"></div>}
              </button>
            </form>
          </div>
        )}

        {/* Progress Tracker */}
        {isLoading && (
          <div className="glass rounded-3xl p-6 sm:p-8 text-center space-y-4">
            <div className="inline-block p-4 bg-black/40 rounded-full mb-2 border border-white/10">
              <div className="loader w-8 h-8 !border-[4px]"></div>
            </div>
            <h3 className="text-xl font-bold waifu-gradient">Crafting your manga...</h3>
            <p className="text-gray-300 text-sm">Please wait. High-quality generation takes approximately <strong className="text-white">40-50 seconds</strong> per page.</p>
            <div className="mt-6 w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
              <div className="h-full btn-gradient w-1/3 progress-bar-anim rounded-full"></div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {mangaData && !isLoading && (
          <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-2xl font-black waifu-gradient">Your Manga</h3>
              <button
                onClick={handleReset}
                className="text-sm text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10"
              >
                Generate Another
              </button>
            </div>

            {mangaData.type === 'iframe' ? (
              <div className="w-full bg-white rounded-xl overflow-hidden min-h-[500px]">
                <iframe
                  srcDoc={(mangaData.data as string).replace(/"/g, '&quot;')}
                  className="w-full h-[800px] border-none bg-white"
                  title="Generated Manga HTML"
                />
              </div>
            ) : (
              <div className={gridClass}>
                {(mangaData.data as any[]).map((page, idx) => {
                  const labelText = numPages === 1 ? 'Manga Panel' : `Page ${idx + 1}`
                  const shareText = encodeURIComponent("Check out the manga I generated on Milady Manga! 🌸📚\n\nCreate your own:");
                  const shareUrl = encodeURIComponent("https://miladymanga.fun");
                  const twitterHref = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

                  return (
                    <div key={idx} className="group relative rounded-lg overflow-hidden bg-black/50 aspect-[3/4] flex items-center justify-center">
                      <img
                        src={page.src}
                        alt={labelText}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />

                      {/* Action buttons on float/hover */}
                      <div className="absolute bottom-2 left-2 right-2 flex flex-row gap-2 z-10 w-[calc(100%-16px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <a
                          href={twitterHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ pointerEvents: 'auto' }}
                          className="flex-1 sm:flex-none justify-center px-4 py-2 bg-[#1DA1F2]/90 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-[#1DA1F2] transition-colors font-bold text-xs sm:text-sm flex items-center gap-1 backdrop-filter"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.964H5.078z" />
                          </svg>
                          <span className="hidden sm:inline">Share</span>
                        </a>
                        <a
                          href={page.src}
                          download={page.isObjectUrl ? 'manga-panel.png' : 'manga-page.png'}
                          style={{ pointerEvents: 'auto' }}
                          className="flex-1 sm:flex-none text-center px-4 py-2 bg-black/80 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-waifu-pink/30 hover:bg-[#FF4081]/50 transition-colors font-bold text-xs sm:text-sm backdrop-filter"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
