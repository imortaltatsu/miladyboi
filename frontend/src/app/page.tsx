import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden relative">

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black waifu-gradient tracking-tight">Milady Waifu</h1>
          </div>
          <Link
            href="/app"
            className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-waifu-red to-waifu-pink hover:from-waifu-red-dark hover:to-waifu-red text-white font-black text-sm sm:text-base rounded-xl transition-all hover:scale-105 shadow-waifu"
          >
            Launch App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-[95vh] flex items-center overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24 z-10 w-full">
          {/* Main Hero Content */}
          <div className="max-w-4xl backdrop-blur-sm bg-black/20 p-8 sm:p-12 rounded-3xl border border-white/5">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-waifu-pink/20 border border-waifu-pink/40 rounded-full mb-6 backdrop-blur-md">
              <span className="w-2 h-2 bg-waifu-pink rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-waifu-pink">AI-Powered Manga Generation</span>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
              <span className="waifu-gradient text-shadow-waifu block mb-2 animate-float" style={{ animationDuration: '4s' }}>Your Waifu,</span>
              <span className="text-white block mb-2">Your</span>
              <span className="waifu-gradient text-shadow-waifu block animate-float" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>Story</span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 max-w-2xl leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-xl">
              Create AI-generated anime panels from your imagination.
              <br className="hidden sm:block" />
              <span className="text-waifu-coral font-bold">Transform your ideas into manga panels.</span>
              <br className="hidden sm:block" />
              Pay with crypto. <span className="text-waifu-pink font-black">Generate instantly.</span>
            </p>

            <div className="flex gap-4 items-center flex-wrap mb-8">
              <Link
                href="/app"
                className="group px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-waifu-red to-waifu-pink hover:from-waifu-pink hover:to-waifu-coral text-white font-black text-lg sm:text-xl rounded-2xl transition-all hover:scale-110 shadow-waifu relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Generate Waifu
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </Link>

              <Link
                href="/gallery"
                className="px-8 sm:px-12 py-4 sm:py-5 border-2 border-waifu-pink/50 hover:border-waifu-pink hover:bg-waifu-pink/20 text-white font-bold text-lg sm:text-xl rounded-2xl transition-all hover:scale-105 backdrop-blur-md bg-black/20"
              >
                Gallery
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-4 flex-wrap">
              <div className="glass px-6 py-3 rounded-xl hover:scale-110 transition-transform cursor-default backdrop-blur-md bg-black/30 animate-float" style={{ animationDuration: '3s' }}>
                <span className="text-2xl font-black text-waifu-pink">9000+</span>
                <span className="text-sm text-gray-200 ml-2">Panels Generated</span>
              </div>
              <div className="glass px-6 py-3 rounded-xl hover:scale-110 transition-transform cursor-default backdrop-blur-md bg-black/30 animate-float" style={{ animationDuration: '3.5s', animationDelay: '0.2s' }}>
                <span className="text-2xl font-black text-waifu-coral">{"<5s"}</span>
                <span className="text-sm text-gray-200 ml-2">Gen Time</span>
              </div>
              <div className="glass px-6 py-3 rounded-xl hover:scale-110 transition-transform cursor-default backdrop-blur-md bg-black/30 animate-float" style={{ animationDuration: '4s', animationDelay: '0.4s' }}>
                <span className="text-2xl font-black waifu-gradient">&infin;</span>
                <span className="text-sm text-gray-200 ml-2">Possibilities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="backdrop-blur-md bg-black/10 rounded-3xl p-8 sm:p-12 border border-white/10">
            <h3 className="text-4xl sm:text-6xl font-black text-center mb-4">
              <span className="waifu-gradient">How It Works</span>
            </h3>
            <p className="text-center text-gray-200 text-lg mb-16">
              <span className="text-waifu-pink font-bold">Three simple steps</span>
            </p>

            <div className="grid sm:grid-cols-3 gap-8 mb-16">
              <StepCard
                number="1"
                title="Connect Wallet"
                description="Connect any EVM-compatible wallet. MetaMask, Rainbow, or WalletConnect."
              />
              <StepCard
                number="2"
                title="Write Your Prompt"
                description="Describe the scene you want to see. Be detailed and creative with your vision."
              />
              <StepCard
                number="3"
                title="Get Your Panel"
                description="AI generates your manga panel in seconds. Download and share your creation."
              />
            </div>

            {/* Why Milady Waifu */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl sm:text-5xl font-black text-center mb-16">
                Why <span className="waifu-gradient">Milady Waifu</span>?
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  title="Claude AI Power"
                  description="State-of-the-art AI crafts your panels with precision and style. Every panel is uniquely crafted."
                />
                <FeatureCard
                  title="Full Web3"
                  description="Pay with tokens on Base. On-chain verification. Your wallet, your creations. Fully decentralized."
                />
                <FeatureCard
                  title="Instant Results"
                  description="No queues. No waiting. Connect, prompt, generate. That simple. That fast."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-waifu-pink/10 to-waifu-purple/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl p-12 border-2 border-waifu-pink/30">
            <h3 className="text-4xl sm:text-6xl font-black mb-6 animate-float" style={{ animationDuration: '4s' }}>
              Ready to <span className="waifu-gradient">Create</span>?
            </h3>
            <p className="text-xl text-gray-100 mb-8">
              Your story awaits. Start generating manga panels now.
            </p>
            <Link
              href="/app"
              className="group inline-block px-12 py-5 bg-gradient-to-r from-waifu-red to-waifu-pink hover:from-waifu-pink hover:to-waifu-coral text-white font-black text-xl rounded-2xl transition-all hover:scale-110 shadow-waifu relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Generating
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-12 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl font-black waifu-gradient">Milady Waifu</span>
          </div>
          <p className="text-gray-200 mb-6">
            Built for creators.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Powered by <span className="text-waifu-coral font-bold">Claude AI</span> + <span className="text-waifu-pink font-bold">Base</span>.
          </p>
          <div className="flex gap-8 justify-center text-sm text-gray-300">
            <a href="#" className="hover:text-waifu-pink transition-colors font-medium">Twitter</a>
            <a href="#" className="hover:text-waifu-coral transition-colors font-medium">Discord</a>
            <a href="#" className="hover:text-waifu-purple transition-colors font-medium">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass rounded-3xl p-8 hover:border-waifu-pink/50 transition-all hover:transform hover:scale-105 group backdrop-blur-lg bg-black/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-waifu-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-waifu-red to-waifu-pink rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
          <div className="w-5 h-5 bg-white/90 rounded-sm" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-black mb-4 text-white group-hover:text-waifu-pink transition-colors">{title}</h3>
        <p className="text-gray-100 leading-relaxed text-base">{description}</p>
      </div>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="glass rounded-3xl p-8 text-center hover:border-waifu-coral/50 transition-all group backdrop-blur-lg bg-black/30 hover:bg-black/40">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-waifu-red to-waifu-pink rounded-2xl flex items-center justify-center text-4xl font-black mx-auto shadow-waifu group-hover:scale-110 group-hover:rotate-6 transition-all">
          {number}
        </div>
      </div>
      <h4 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-waifu-coral transition-colors">{title}</h4>
      <p className="text-gray-100 text-sm sm:text-base leading-relaxed">{description}</p>
    </div>
  )
}
