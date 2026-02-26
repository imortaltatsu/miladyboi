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
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Public Gallery</h1>
          <Link href="/" className="glass px-6 py-2 rounded-lg hover:bg-white/10">
            ← Back
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-200">Loading gallery...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="glass p-6 rounded-xl hover:bg-white/10 transition-colors">
                <div className="bg-white/5 p-4 rounded-lg border-2 border-manga-purple/50 mb-4">
                  <p className="text-sm leading-relaxed">{item.panelText}</p>
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
