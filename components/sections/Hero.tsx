'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientText } from '@/components/ui/GradientText'

const roles = [
  'ML Engineer',
  'LLM Researcher',
  'Hardware Developer',
  'Approximate Computing Specialist',
]

const stats = [
  { label: 'Projects Built', value: '10' },
  { label: 'Papers Published', value: '1' },
  { label: 'Years of Exp.', value: '3' },
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
      {/* Orb blobs */}
      <div
        className="absolute top-1/4 right-[10%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-violet-600/20 blur-3xl animate-orb-1 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-[5%] w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-600/20 blur-3xl animate-orb-2 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-slate-500 text-xs tracking-[0.25em] uppercase mb-6">
            Welcome — I build things that matter
          </p>

          <h1
            className="font-heading font-bold leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <GradientText>Parsa Rostamzadeh</GradientText>
          </h1>

          {/* Animated role switcher */}
          <div className="h-10 flex items-center justify-center mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="text-xl md:text-2xl text-slate-300 font-medium font-heading"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Building intelligent systems at the intersection of software, hardware, and machine learning.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors duration-200 cursor-pointer w-full sm:w-auto justify-center"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 text-slate-300 hover:text-white font-medium transition-colors duration-200 cursor-pointer w-full sm:w-auto justify-center"
            >
              Download CV <Download className="w-4 h-4" />
            </a>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="p-4 text-center">
                <div className="text-2xl font-bold font-heading text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 leading-tight">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-300 transition-colors duration-200 cursor-pointer animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  )
}
