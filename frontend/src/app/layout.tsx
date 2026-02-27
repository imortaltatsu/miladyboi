import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { AnimatedCollage } from '@/components/AnimatedCollage'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Milady Manga - AI Manga Generator',
  description: 'AI-powered manga panel generation. Transform your ideas into anime art instantly.',
  keywords: ['manga generator', 'anime ai', 'milady', 'waifu', 'ai art generator', 'comic creator'],
  authors: [{ name: 'Milady Manga Team' }],
  creator: 'Milady Manga',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://miladymanga.fun',
    title: 'Milady Manga - AI Manga Generator',
    description: 'Transform your ideas into anime art instantly. Create stunning manga panels with AI.',
    siteName: 'Milady Manga',
    images: [
      {
        url: '/hero-anime.png',
        width: 1200,
        height: 630,
        alt: 'Milady Manga Manga Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milady Manga - AI Manga Generator',
    description: 'Transform your ideas into anime art instantly. Create stunning manga panels with AI.',
    images: ['/hero-anime.png'],
    creator: '@miladymangafun',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AnimatedCollage />
          {children}
        </Providers>
      </body>
    </html>
  )
}
