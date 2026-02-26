'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function AnimatedCollage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient-bg opacity-30 animate-pulse" style={{ animationDuration: '10s' }} />

      {/* === TOP-LEFT corner piece === */}
      <div
        className="absolute -top-8 -left-8 w-[280px] h-[280px] animate-drift"
        style={{ opacity: 0.12 }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 75%)',
          }}
        >
          <Image src="/anime-1.png" alt="" fill className="object-cover" />
        </div>
      </div>

      {/* === TOP-RIGHT large feature === */}
      <div
        className="absolute -top-4 -right-4 w-[420px] h-[420px] animate-drift-alt"
        style={{ opacity: 0.14 }}
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse at top right, black 25%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top right, black 25%, transparent 70%)',
          }}
        >
          <Image src="/anime-hero.png" alt="" fill className="object-cover" />
        </div>
      </div>

      {/* === RIGHT-CENTER === */}
      <div
        className="absolute top-[45%] -right-12 w-[320px] h-[320px] animate-float-slow"
        style={{ opacity: 0.1 }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse at center right, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center right, black 20%, transparent 70%)',
          }}
        >
          <Image src="/characters-1.png" alt="" fill className="object-cover" />
        </div>
      </div>

      {/* === BOTTOM-RIGHT corner === */}
      <div
        className="absolute -bottom-8 -right-8 w-[360px] h-[360px] animate-drift"
        style={{ opacity: 0.13 }}
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse at bottom right, black 25%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 25%, transparent 70%)',
          }}
        >
          <Image src="/anime-4.png" alt="" fill className="object-cover" />
        </div>
      </div>

      {/* === BOTTOM-LEFT corner === */}
      <div
        className="absolute -bottom-6 -left-6 w-[260px] h-[260px] animate-drift-alt"
        style={{ opacity: 0.1 }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse at bottom left, black 25%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at bottom left, black 25%, transparent 70%)',
          }}
        >
          <Image src="/anime-3.png" alt="" fill className="object-cover" />
        </div>
      </div>

      {/* === LEFT-CENTER subtle === */}
      <div
        className="absolute top-[35%] -left-16 w-[240px] h-[240px] animate-float-slower"
        style={{ opacity: 0.08 }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse at center left, black 20%, transparent 65%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center left, black 20%, transparent 65%)',
          }}
        >
          <Image src="/anime-2.png" alt="" fill className="object-cover" />
        </div>
      </div>

      {/* Ambient light orbs - subtle glow effects */}
      <div className="absolute top-[15%] right-[30%] w-40 h-40 bg-waifu-pink/8 rounded-full blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[20%] w-48 h-48 bg-waifu-coral/6 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[55%] right-[20%] w-36 h-36 bg-waifu-purple/6 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Center-area darkening overlay - keeps the text area clean */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 35% 50%, rgba(10,10,10,0.85) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
