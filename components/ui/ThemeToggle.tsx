'use client'
import { useEffect, useLayoutEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLOR: Record<Theme, string> = { light: '#faf8f5', dark: '#18181b' }

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.content = THEME_COLOR[theme]
  })
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function storedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

/**
 * Light/dark switch. The initial theme is set before paint by the inline script in
 * app/layout.tsx; this button only flips `data-theme` and remembers the choice. Both icons
 * are rendered and swapped with CSS, so there is no theme-dependent React state (and no
 * hydration mismatch).
 */
export function ThemeToggle({ className }: { className?: string }) {
  // Re-assert the theme before paint once React has committed. The inline script sets it
  // first, but a client re-render of <html> (e.g. after a hydration fallback) drops the
  // attribute, and Next inserts the theme-color <meta> tags after the script has run.
  useLayoutEffect(() => {
    applyTheme(storedTheme() ?? systemTheme())
  }, [])

  // With no saved choice, keep following the OS setting while the page is open
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (!storedTheme()) applyTheme(systemTheme())
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage unavailable (private mode): the switch still works for this page view
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={cn(
        'w-9 h-9 inline-flex items-center justify-center rounded-xl border border-line bg-surface',
        'text-fg-2 hover:text-fg hover:border-accent/40 transition-colors duration-200 cursor-pointer',
        className
      )}
    >
      {/* Dark theme shows the sun (switch to light); light theme shows the moon */}
      <Sun className="w-4 h-4 light:hidden" aria-hidden="true" />
      <Moon className="w-4 h-4 hidden light:block" aria-hidden="true" />
    </button>
  )
}
