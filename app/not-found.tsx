import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Mail } from 'lucide-react'
import { NotFoundTerminal } from '@/components/ui/NotFoundTerminal'

export const metadata: Metadata = {
  title: 'Page not found — Parsa Rostamzadeh',
  description: 'The page you are looking for does not exist.',
}

const quickLinks = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#publications', label: 'Publications' },
  { href: '/hobbies', label: 'Hobbies' },
]

/** The logo's chip, holding the middle "0" — one pin on the right is broken. */
function BrokenChip() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="w-[clamp(4.5rem,13vw,8.25rem)] h-[clamp(4.5rem,13vw,8.25rem)] shrink-0"
    >
      <path
        d="M17 3.5v5M24 3.5v5M31 3.5v5M17 39.5v5M24 39.5v5M31 39.5v5M3.5 17h5M3.5 24h5M3.5 31h5M39.5 17h5M39.5 31h5"
        style={{ stroke: 'var(--accent-hex)' }}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* the broken pin */}
      <path d="M40 24h1.4M43.4 24h1.6" style={{ stroke: 'var(--accent-hex)' }} strokeOpacity="0.35" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="9" y="9" width="30" height="30" rx="6" fill="#232326" style={{ stroke: 'var(--accent-hex)' }} strokeWidth="2.4" />
      <circle cx="14.6" cy="14.6" r="1.6" style={{ fill: 'var(--accent-hex)' }} />
      <text x="24" y="30.5" textAnchor="middle" className="font-heading" fontWeight="700" fontSize="17" fill="#fafafa">
        0
      </text>
    </svg>
  )
}

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        <p className="text-accent-fg/80 text-xs tracking-[0.25em] uppercase mb-6">
          Error 404 · Route not found
        </p>

        <div
          className="flex items-center gap-[clamp(0.25rem,1.5vw,0.75rem)] font-heading font-bold leading-none mb-8"
          style={{ fontSize: 'clamp(5rem, 15vw, 9.5rem)' }}
          role="img"
          aria-label="404"
        >
          <span className="gradient-text" aria-hidden="true">4</span>
          <BrokenChip />
          <span className="gradient-text" aria-hidden="true">4</span>
        </div>

        <h1 className="font-heading font-bold text-2xl md:text-3xl text-fg-max mb-3">
          This page never made it to silicon.
        </h1>
        <p className="text-fg-2 text-sm md:text-base leading-relaxed max-w-md mb-10">
          The link may be mistyped, or the page has moved. Everything else is still wired up.
        </p>

        <NotFoundTerminal />

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 w-full sm:w-auto">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 hover:border-accent/50 text-accent-fg font-medium transition-colors duration-200 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <Link
            href="/#contact"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-raised hover:bg-raised-2 text-fg font-medium transition-colors duration-200 w-full sm:w-auto"
          >
            <Mail className="w-4 h-4" /> Get in touch
          </Link>
        </div>

        <nav aria-label="Popular pages" className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <span className="text-fg-4">Or jump to</span>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-fg-2 hover:text-fg-max transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
