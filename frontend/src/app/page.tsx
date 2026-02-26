import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-manga-purple/20 via-black to-manga-pink/20" />
      
      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl">
          <h1 className="text-7xl md:text-9xl font-bold gradient-text animate-float">
            PanelForge
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300">
            Transform Your Stories into <span className="gradient-text font-bold">Manga Panels</span>
          </p>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            AI-powered manga generation with Web3 micropayments. 
            Connect your wallet, pay with tokens, and bring your stories to life.
          </p>
          
          <div className="flex gap-4 justify-center pt-8">
            <Link
              href="/app"
              className="px-8 py-4 bg-gradient-manga text-white font-bold text-lg rounded-lg hover:scale-105 transition-transform neon-glow"
            >
              Launch App →
            </Link>
            
            <Link
              href="/gallery"
              className="px-8 py-4 glass text-white font-bold text-lg rounded-lg hover:scale-105 transition-transform"
            >
              View Gallery
            </Link>
          </div>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full">
          <FeatureCard 
            icon="🎨"
            title="AI-Powered"
            description="Advanced AI transforms your text into vivid manga narratives"
          />
          <FeatureCard 
            icon="💎"
            title="Web3 Native"
            description="Pay seamlessly with custom ERC20 tokens"
          />
          <FeatureCard 
            icon="⚡"
            title="Instant"
            description="Generate panels in seconds, no waiting"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="glass p-6 rounded-xl hover:bg-white/10 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
