'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#publications', label: 'Publications' },
  { href: '#blog', label: 'Blog' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300',
        'backdrop-blur-md border border-white/10',
        scrolled ? 'bg-[#0F172A]/80 shadow-xl shadow-black/20' : 'bg-white/5'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <a href="#" className="font-heading font-bold text-lg gradient-text cursor-pointer">
          PR
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 text-sm font-medium transition-colors duration-200 cursor-pointer"
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
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
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
