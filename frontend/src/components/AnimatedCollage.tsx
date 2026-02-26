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

      {/* === LARGE BLURRED CENTER IMAGE === */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10">
        <Image
          src="/anime-hero.png"
          alt=""
          fill
          className="object-cover blur-2xl scale-125"
        />
      </div>

      {/* Top-left: Floating character */}
      <div className="absolute -top-10 -left-10 w-80 h-80 opacity-15 animate-drift">
        <Image
          src="/anime-1.png"
          alt=""
          fill
          className="object-contain rotate-12"
        />
      </div>

      {/* Top-right: Hero characters */}
      <div className="absolute -top-20 right-0 w-96 h-96 opacity-20 animate-drift-alt">
        <Image
          src="/anime-hero.png"
          alt=""
          fill
          className="object-contain -rotate-6"
        />
      </div>

      {/* Middle-left: Anime group */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 opacity-10 animate-float-slow">
        <Image
          src="/anime-2.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Middle-right: Characters */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 opacity-15 animate-float-slower">
        <Image
          src="/characters-1.png"
          alt=""
          fill
          className="object-contain rotate-6"
        />
      </div>

      {/* Bottom-left: Anime character */}
      <div className="absolute bottom-10 left-10 w-64 h-64 opacity-12 animate-drift">
        <Image
          src="/anime-3.png"
          alt=""
          fill
          className="object-contain -rotate-12"
        />
      </div>

      {/* Bottom-right: Group shot */}
      <div className="absolute -bottom-10 -right-10 w-96 h-96 opacity-18 animate-drift-alt">
        <Image
          src="/anime-4.png"
          alt=""
          fill
          className="object-contain rotate-3"
        />
      </div>

      {/* Center floating element */}
      <div className="absolute top-1/4 left-1/3 w-56 h-56 opacity-8 animate-float">
        <Image
          src="/characters-2.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Pink orbs */}
      <div className="absolute top-40 right-1/3 w-32 h-32 bg-waifu-pink/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-waifu-coral/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-waifu-purple/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </div>
  )
}
