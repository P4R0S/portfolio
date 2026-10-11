'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Hand-drawn style arrow that draws itself when scrolled into view, then nudges toward its
// target. `side` sweeps right (desktop, text → form); `down` curves downward (stacked layout).
const SHAPES = {
  side: {
    viewBox: '0 0 160 90',
    line: 'M8 18 C 30 70, 90 80, 148 52',
    head: 'M134 51 L148 52 L140 63.5',
    nudge: { x: [0, 6, 0] },
  },
  down: {
    viewBox: '0 0 60 80',
    line: 'M30 6 C 10 30, 50 45, 30 72',
    head: 'M41 67 L30 72 L31.4 60',
    nudge: { y: [0, 5, 0] },
  },
}

export function CurvedArrow({ variant, className }: { variant: 'side' | 'down'; className?: string }) {
  const reduce = useReducedMotion()
  const s = SHAPES[variant]
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.8 },
          transition: { pathLength: { duration: 0.9, delay, ease: 'easeInOut' as const }, opacity: { duration: 0.1, delay } },
        }

  return (
    <motion.svg
      viewBox={s.viewBox}
      fill="none"
      aria-hidden="true"
      className={cn('text-accent pointer-events-none', className)}
      animate={reduce ? undefined : s.nudge}
      transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2, delay: 1.4 }}
    >
      <motion.path d={s.line} stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...draw(0)} />
      <motion.path d={s.head} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...draw(0.8)} />
    </motion.svg>
  )
}
