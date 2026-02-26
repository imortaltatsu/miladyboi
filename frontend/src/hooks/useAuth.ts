'use client'

import { useState, useEffect } from 'react'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  credits: number
}

// Build a SIWE message string manually — no need for the siwe package
function createSiweMessage({
  domain,
  address,
  statement,
  uri,
  version,
  chainId,
  nonce,
}: {
  domain: string
  address: string
  statement: string
  uri: string
  version: string
  chainId: number
  nonce: string
}): string {
  const issuedAt = new Date().toISOString()
  return `${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: ${version}
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}`
}

export function useAuth() {
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    error: null,
    credits: 0,
  })

  // Check if user has valid session
  useEffect(() => {
    if (isConnected && address) {
      checkSession()
    } else {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null,
        credits: 0,
      })
    }
  }, [isConnected, address])

  async function checkSession() {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setAuthState(prev => ({ ...prev, isAuthenticated: false }))
        return
      }

      // Verify session with backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null,
          credits: data.credits || 0,
        })
      } else {
        localStorage.removeItem('auth_token')
        setAuthState(prev => ({ ...prev, isAuthenticated: false }))
      }
    } catch (error) {
      console.error('Session check failed:', error)
      setAuthState(prev => ({ ...prev, isAuthenticated: false }))
    }
  }

  async function signIn() {
    if (!address) {
      setAuthState(prev => ({ ...prev, error: 'No wallet connected' }))
      return
    }

    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

      // Get nonce from backend
      const nonceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/nonce?address=${address}`)
      const { nonce } = await nonceResponse.json()

      // Create SIWE message using plain string format
      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to Milady Waifu',
        uri: window.location.origin,
        version: '1',
        chainId: 8453, // Base
        nonce,
      })

      // Sign message
      const signature = await signMessageAsync({
        message,
      })

      // Verify signature with backend
      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-signature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          signature,
          address,
        }),
      })

      if (!verifyResponse.ok) {
        throw new Error('Signature verification failed')
      }

      const { token, credits } = await verifyResponse.json()

      // Store token
      localStorage.setItem('auth_token', token)

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        error: null,
        credits: credits || 0,
      })

      return true
    } catch (error: any) {
      console.error('Sign in failed:', error)
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: error.message || 'Failed to sign in',
        credits: 0,
      })
      return false
    }
  }

  function signOut() {
    localStorage.removeItem('auth_token')
    disconnect()
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      credits: 0,
    })
  }

  async function refreshCredits() {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/credits`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const { credits } = await response.json()
        setAuthState(prev => ({ ...prev, credits }))
      }
    } catch (error) {
      console.error('Failed to refresh credits:', error)
    }
  }

  return {
    ...authState,
    signIn,
    signOut,
    refreshCredits,
  }
}
