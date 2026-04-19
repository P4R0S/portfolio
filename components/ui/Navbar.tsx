'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const anchorLinks = [
  { anchor: 'about', label: 'About' },
  { anchor: 'skills', label: 'Skills' },
  { anchor: 'projects', label: 'Projects' },
  { anchor: 'experience', label: 'Experience' },
  { anchor: 'publications', label: 'Publications' },
  { anchor: 'blog', label: 'Blog' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const hrefFor = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`
  const contactHref = isHome ? '#contact' : '/#contact'

  return (
    <nav
      className={cn(
        'fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300',
        'backdrop-blur-md border border-white/10',
        scrolled ? 'bg-[#18181b]/50 shadow-xl shadow-black/20' : 'bg-white/3'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo — always goes home */}
        <Link href="/" className="font-heading font-bold text-lg gradient-text cursor-pointer">
          PR
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {anchorLinks.map((link) => (
            <a
              key={link.anchor}
              href={hrefFor(link.anchor)}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/cv"
            className={cn(
              'text-sm transition-colors duration-200 cursor-pointer',
              pathname === '/cv'
                ? 'text-white font-medium'
                : 'text-slate-400 hover:text-white'
            )}
          >
            CV
          </Link>
          <a
            href={contactHref}
            className="px-4 py-2 rounded-xl bg-orange-400/10 border border-orange-400/30 text-orange-400 hover:bg-orange-400/20 text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {anchorLinks.map((link) => (
            <a
              key={link.anchor}
              href={hrefFor(link.anchor)}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer py-1"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/cv"
            onClick={() => setOpen(false)}
            className={cn(
              'py-1 transition-colors duration-200 cursor-pointer',
              pathname === '/cv' ? 'text-white font-medium' : 'text-slate-300 hover:text-white'
            )}
          >
            CV
          </Link>
          <a
            href={contactHref}
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium text-center cursor-pointer"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  )
}
