'use client'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence, animate, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientText } from '@/components/ui/GradientText'
import { HeroTerminal } from '@/components/terminal/HeroTerminal'
import Link from 'next/link'

const roles = [
  'Graduate Research Assistant',
  'Hardware-aware ML',
  'Approximate Computing',
  'FPGA & VLSI Design',
]

export interface HeroStat {
  label: string
  value: string
}

// Counts up from 0 once on load. The real number is in the server HTML; the reset to 0 happens
// before the first paint, while the hero is still fading in, so there's no visible jump.
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    const target = Number(value)
    if (!el || reduce || !Number.isFinite(target)) return
    el.textContent = '0'
    const controls = animate(0, target, {
      duration: 1.2,
      delay: 0.35,
      ease: 'easeOut',
      onUpdate: (v) => { el.textContent = String(Math.round(v)) },
    })
    return () => { controls.stop(); el.textContent = value }
  }, [value, reduce])

  return <span ref={ref}>{value}</span>
}

function ScrollCue() {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 16 44" fill="none" aria-hidden="true" className="w-[1rem] h-[2.75rem] overflow-visible">
      <path d="M8 2 V34" stroke="var(--fg-3)" strokeOpacity={0.5} strokeWidth={1.5} strokeLinecap="round" />
      <path
        d="M3 31 L8 37 L13 31"
        stroke="var(--fg-3)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-[stroke] duration-200 group-hover:[stroke:var(--accent)]"
      />
      {!reduce && (
        <motion.circle
          cx={8}
          r={2.5}
          fill="var(--warm)"
          style={{ filter: 'drop-shadow(0 0 4px var(--warm))' }}
          initial={{ cy: 2, opacity: 0 }}
          animate={{ cy: [2, 32], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, ease: 'easeIn', repeat: Infinity, repeatDelay: 0.6, delay: 1.2 }}
        />
      )}
    </svg>
  )
}

/** `stats` are computed server-side from `content/` (see app/page.tsx). */
export function Hero({ stats }: { stats: HeroStat[] }) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      {/* Orb blobs */}
      <div
        className="absolute top-1/4 right-[10%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-[var(--orb-1)] blur-3xl animate-orb-1 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-[5%] w-64 h-64 md:w-80 md:h-80 rounded-full bg-[var(--orb-2)] blur-3xl animate-orb-2 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left column */}
          {/* CSS entrance (not framer-motion): it starts at first paint instead of after
              hydration, so the heading (the LCP element) isn't held invisible until JS loads */}
          <div
            className="flex-1 text-center lg:text-left"
            style={{ animation: 'fadeUp 0.7s ease-out both' }}
          >
            <p className="text-fg-3 text-xs tracking-[0.25em] uppercase mb-4">
              Welcome — I build things that matter
            </p>

            <h1
              className="font-heading font-bold leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)' }}
            >
              <GradientText>Parsa Rostamzadeh</GradientText>
            </h1>

            {/* Animated role switcher */}
            <div className="h-10 flex items-center lg:justify-start justify-center mb-5 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="text-xl md:text-2xl text-fg-soft font-medium font-heading"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="text-fg-2 text-base md:text-lg max-w-xl lg:mx-0 mx-auto mb-7 leading-relaxed">
              Building intelligent systems at the intersection of software, hardware, and machine learning.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-7">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-btn hover:bg-btn-hover text-btn-fg font-medium transition-colors duration-200 cursor-pointer w-full sm:w-auto justify-center"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/cv"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 hover:border-accent/60 text-fg-soft hover:text-accent-fg font-medium transition-colors duration-200 cursor-pointer w-full sm:w-auto justify-center"
              >
                View CV <Download className="w-4 h-4" />
              </Link>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 max-w-sm lg:mx-0 mx-auto">
              {stats.map((stat) => (
                <GlassCard key={stat.label} className="p-3 text-center">
                  <div className="text-2xl font-bold font-heading text-fg tabular-nums">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-xs text-fg-3 mt-1 leading-tight">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right column — terminal widget. Desktop only (lg+), where it sits beside the intro;
              on phones/tablets it would stack below the hero content, so it's hidden there. */}
          <div className="hidden lg:flex flex-1 justify-end">
            <HeroTerminal />
          </div>

        </div>
      </div>

      {/* Scroll indicator: a short signal trace with a pulse running down toward About */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="group absolute bottom-6 left-1/2 -translate-x-1/2 p-2 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-accent"
      >
        <ScrollCue />
      </a>

    </section>
  )
}
