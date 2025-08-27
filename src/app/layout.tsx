// src/app/layout.tsx
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

import '@/app/globals.css'
import { Providers } from '@/components/providers/Providers'
import { Toaster } from '@/components/ui/Toaster'

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Load Cal Sans for display headings (premium feel)
const calSans = localFont({
  src: '../styles/fonts/CalSans-SemiBold.woff2',
  display: 'swap',
  variable: '--font-cal',
})

export const metadata: Metadata = {
  title: {
    default: 'Chi Portal - Transform Within',
    template: '%s | Chi Portal',
  },
  description: 'Harmonize your inner self (Yin) and physical vitality (Yang) through guided transformation.',
  keywords: ['self-development', 'wellness', 'meditation', 'fitness', 'mindfulness', 'personal growth'],
  authors: [{ name: 'Chi Portal' }],
  creator: 'Chi Portal',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Chi Portal',
    title: 'Chi Portal - Transform Within',
    description: 'Harmonize your inner self and physical vitality',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chi Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chi Portal - Transform Within',
    description: 'Harmonize your inner self and physical vitality',
    creator: '@chiportal',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${calSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {/* Premium gradient background */}
          <div className="fixed inset-0 -z-10 h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/20 via-transparent to-transparent dark:from-primary-900/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent dark:from-purple-900/20" />
          </div>
          
          {/* Main content */}
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
          
          {/* Global UI components */}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}