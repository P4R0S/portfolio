'use client'
import { MotionConfig } from 'framer-motion'

/**
 * Makes every framer-motion animation honor the OS "reduce motion" setting (transforms are
 * skipped, fades kept). The CSS rule in globals.css only covers CSS animations.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
