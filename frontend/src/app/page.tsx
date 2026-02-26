'use client'

import Link from 'next/link'
import { MangaCanvas3D } from '@/components/landing/MangaCanvas3D'

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with mesh gradient */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Leather texture overlay */}
      <div className="absolute inset-0 leather opacity-10 pointer-events-none" />
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        {/* Logo/Title with embossed effect */}
        <div className="text-center mb-12">
          <h1 className="text-8xl md:text-[12rem] font-display text-embossed tracking-wider mb-4 leading-none">
            PANELFORGE
          </h1>
          <div className="h-2 w-64 mx-auto metallic rounded-full" />
        </div>

        {/* 3D Interactive Manga Panels */}
        <div className="mb-16">
          <MangaCanvas3D />
        </div>

        {/* Tagline */}
        <div className="text-center mb-16">
          <p className="text-3xl md:text-4xl font-serif italic text-white/90 mb-4">
            Transform Stories into Living Art
          </p>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-body">
            AI-powered manga panel generation meets Web3. 
            Craft your narrative, pay with tokens, and witness your story materialize 
            in stunning manga form.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center mb-24 flex-wrap">
          <Link
            href="/app"
            className="px-10 py-5 btn-embossed text-white font-bold text-xl tracking-wide glossy relative"
          >
            Launch Forge
          </Link>
          
          <Link
            href="/gallery"
            className="px-10 py-5 btn-crystal text-white font-bold text-xl tracking-wide"
          >
            View Gallery
          </Link>
        </div>

        {/* Feature Cards with skeuomorphic design */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          <FeatureCard
            icon="🎨"
            title="AI Artistry"
            description="Advanced neural networks transform your narrative into vivid manga-style descriptions. Every panel tells your story with dramatic flair."
            accent="manga-purple"
          />
          <FeatureCard
            icon="💎"
            title="Web3 Native"
            description="Seamless crypto payments via custom ERC20 tokens. Your wallet is your passport to unlimited creative power."
            accent="manga-cyan"
          />
          <FeatureCard
            icon="⚡"
            title="Instant Creation"
            description="No waiting, no queues. Connect, pay, and generate. Your manga panels materialize in seconds."
            accent="manga-pink"
          />
        </div>

        {/* Tech Stack Showcase */}
        <div className="glass-skeuo p-12 max-w-5xl mx-auto mb-24">
          <h2 className="text-4xl font-display text-center mb-8 text-embossed">
            FORGED WITH PRECISION
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TechBadge label="Next.js" />
            <TechBadge label="Three.js" />
            <TechBadge label="Anthropic AI" />
            <TechBadge label="Base Network" />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-12 text-white/50 font-body">
          <p>© 2026 PanelForge. Crafted with passion and precision.</p>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  accent 
}: { 
  icon: string
  title: string
  description: string
  accent: string
}) {
  return (
    <div className="glass-skeuo p-8 hover:scale-105 transition-transform duration-300 depth-shadow">
      <div className="paper rounded-2xl p-6 mb-6 flex items-center justify-center">
        <span className="text-6xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-display mb-4 tracking-wide text-white">
        {title}
      </h3>
      <p className="text-white/80 font-body leading-relaxed">
        {description}
      </p>
      <div className={`h-1 w-20 bg-gradient-manga rounded-full mt-6`} />
    </div>
  )
}

function TechBadge({ label }: { label: string }) {
  return (
    <div className="leather px-6 py-4 rounded-xl text-center border-2 border-white/10 depth-shadow">
      <span className="text-lg font-bold text-white/90 tracking-wide">
        {label}
      </span>
    </div>
  )
}
