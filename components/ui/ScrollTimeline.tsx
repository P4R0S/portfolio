'use client'
import { ReactNode, useRef } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * The Experience timeline's vertical line. A faint track runs the full height and the gradient
 * line fills in as the section scrolls past the middle of the screen.
 */
export function ScrollTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  // Smooths out wheel steps; reduced-motion users still get the fill, just without the spring
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-line" />
      <motion.div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px origin-top"
        style={{
          scaleY: fill,
          background: 'linear-gradient(to bottom in oklab, var(--tl-1), var(--tl-2), var(--tl-3))',
        }}
      />
      {children}
    </div>
  )
}

/** A timeline node that lights up once the line reaches it (the middle of the screen). */
export function TimelineDot({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const lit = useInView(ref, { margin: '0px 0px -50% 0px' })

  return (
    <div
      ref={ref}
      className={cn(
        'absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-bg border-2 flex items-center justify-center shrink-0 z-10',
        'transition-[border-color,box-shadow,color] duration-500',
        lit
          ? 'border-accent text-accent-fg shadow-[0_0_0_4px_var(--accent-tint),0_0_16px_var(--accent-tint-hover)]'
          : 'border-line text-fg-3'
      )}
    >
      {children}
    </div>
  )
}
