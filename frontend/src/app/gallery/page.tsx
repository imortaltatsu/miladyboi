'use client'

import { useEffect, useState } from 'react'
import { getGallery } from '@/lib/api'
import Link from 'next/link'

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGallery().then(res => {
      setGallery(res.data.generations)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

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
            <Link href="/app" className="px-6 py-2 bg-gradient-to-r from-waifu-red to-waifu-pink text-white font-bold rounded-xl hover:scale-105 transition-all shadow-waifu text-sm">
              Generate
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black">
              <span className="waifu-gradient">Public Gallery</span>
            </h2>
            <p className="text-gray-200 mt-2">Community-generated panels</p>
          </div>
          <Link href="/" className="glass px-6 py-2 rounded-xl hover:bg-white/10 transition-colors text-gray-100">
            &larr; Back
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-8 h-8 border-2 border-waifu-pink/30 border-t-waifu-pink rounded-full animate-spin" />
          </div>
        ) : gallery.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center backdrop-blur-lg bg-black/30">
            <p className="text-gray-200 text-lg mb-4">No panels generated yet.</p>
            <Link href="/app" className="text-waifu-pink font-bold hover:underline">
              Be the first to create one
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="glass rounded-2xl p-6 hover:border-waifu-pink/30 transition-all backdrop-blur-lg bg-black/30">
                <div className="bg-black/40 p-4 rounded-xl border border-waifu-purple/30 mb-4">
                  <p className="text-sm leading-relaxed text-gray-100">{item.panelText}</p>
                </div>
                <p className="text-xs text-gray-300">By {item.userAddress.slice(0, 6)}...{item.userAddress.slice(-4)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
