// src/components/providers/ThemeProvider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

/**
 * Theme provider wrapper for next-themes
 * Handles dark/light mode switching with system preference support
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}