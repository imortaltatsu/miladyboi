'use client'

import Link from 'next/link'

export default function GalleryPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient-bg opacity-20" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black waifu-gradient tracking-tight">Milady Waifu</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/app" className="px-6 py-2 bg-gradient-to-r from-waifu-red to-waifu-pink text-white font-bold rounded-xl hover:scale-105 transition-all shadow-waifu text-sm">
              Generate
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h2 className="text-4xl font-black">
            <span className="waifu-gradient">Gallery</span>
          </h2>
          <p className="text-gray-200 mt-2">Community-generated manga panels</p>
        </div>

        <div className="glass rounded-3xl p-12 text-center backdrop-blur-lg bg-black/30">
          <div className="w-16 h-16 bg-gradient-to-br from-waifu-red to-waifu-pink rounded-2xl flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-white/90 rounded-sm" />
          </div>
          <p className="text-gray-100 text-xl font-bold mb-2">Coming Soon</p>
          <p className="text-gray-300 mb-6">Gallery will display community-generated panels. Start creating now.</p>
          <Link
            href="/app"
            className="inline-block px-8 py-3 bg-gradient-to-r from-waifu-red to-waifu-pink text-white font-black rounded-xl hover:scale-105 transition-all shadow-waifu"
          >
            Generate Your First Panel
          </Link>
        </div>
      </div>
    </div>
  )
}
