'use client'

import Link from 'next/link'

export default function AppPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
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
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col py-0 sm:py-6 px-0 sm:px-6">
        <iframe
          src="/generator.html"
          className="w-full h-full min-h-[90vh] sm:min-h-[85vh] border-none bg-transparent"
          title="Manga Generator"
        />
      </div>
    </div>
  )
}
