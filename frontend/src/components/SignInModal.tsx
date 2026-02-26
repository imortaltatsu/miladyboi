'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useAuthContext } from '@/contexts/AuthContext'

export function SignInModal() {
  const { isConnected } = useAccount()
  const { isAuthenticated, isLoading, error, signIn } = useAuthContext()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal if wallet is connected but not authenticated
    if (isConnected && !isAuthenticated && !isLoading) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [isConnected, isAuthenticated, isLoading])

  async function handleSignIn() {
    const success = await signIn()
    if (success) {
      setShowModal(false)
    }
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative max-w-xl w-full backdrop-blur-xl bg-black/60 rounded-3xl p-6 border-2 border-waifu-pink/50 shadow-waifu">
        <div className="absolute inset-0 bg-gradient-to-br from-waifu-pink/10 to-waifu-purple/10 rounded-3xl pointer-events-none" />

        <div className="relative flex flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-black waifu-gradient mb-2">Sign In Required</h2>
            <p className="text-gray-100 text-sm">
              Sign a message to authenticate your wallet and start generating.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 shrink-0">
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-waifu-red to-waifu-pink hover:from-waifu-pink hover:to-waifu-coral text-white font-black text-base rounded-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-waifu whitespace-nowrap"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign Message
                  <span>&rarr;</span>
                </span>
              )}
            </button>
            <span className="text-xs text-gray-200">
              This signature is <span className="text-waifu-pink font-bold">free</span> and won't cost gas.
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border-2 border-red-500/50 rounded-2xl text-red-300 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
