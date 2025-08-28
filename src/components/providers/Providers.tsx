'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import { AuthProvider } from '../providers/AuthProvider'
import { ToastProvider } from '../providers/ToastProvider'

type Props = { children: ReactNode }

/**
 * v3: ChakraProvider takes `value` (system), not `theme`.
 * next-themes handles dark/light by toggling the `class` on <html>.
 */
export function Providers({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="chi-portal-theme"
    >
      <ChakraProvider value={defaultSystem}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </ChakraProvider>
    </ThemeProvider>
  )
}
