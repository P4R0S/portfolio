'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const anchorLinks = [
  { anchor: 'about', label: 'About' },
  { anchor: 'skills', label: 'Skills' },
  { anchor: 'projects', label: 'Projects' },
  { anchor: 'experience', label: 'Experience' },
  { anchor: 'publications', label: 'Publications' },
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

  // Scrollspy: which home section is under the upper-middle of the screen
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!isHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) setActive(id)
          // Scrolled back up past the active section's top (e.g. into the hero): clear it
          else if (entry.boundingClientRect.top > 0) setActive((cur) => (cur === id ? null : cur))
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    for (const id of [...anchorLinks.map((l) => l.anchor), 'contact']) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [isHome])
  const current = isHome ? active : null

  const hrefFor = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`
  const contactHref = isHome ? '#contact' : '/#contact'

  return (
    <nav
      className={cn(
        // Same width as the page content (sections: px-4/6/8 around max-w-6xl)
        'fixed top-4 inset-x-4 sm:inset-x-6 lg:inset-x-8 mx-auto max-w-6xl z-50 rounded-2xl transition-all duration-300 print:hidden',
        'backdrop-blur-md border border-line',
        scrolled ? 'bg-[var(--nav-scrolled)] shadow-xl shadow-(color:--nav-shadow)' : 'bg-nav-idle'
      )}
    >
      <div className="px-4 sm:px-6 flex md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 items-center justify-between h-14">
        {/* Logo — always goes home */}
        <Link href="/" aria-label="Home" className="justify-self-start cursor-pointer transition-transform duration-200 hover:scale-105">
          <Logo className="w-[2.125rem] h-[2.125rem]" />
        </Link>

        {/* Desktop links (centered) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {anchorLinks.map((link) => (
            <a
              key={link.anchor}
              href={hrefFor(link.anchor)}
              aria-current={current === link.anchor ? 'location' : undefined}
              className={cn(
                'relative py-1 text-sm font-medium transition-colors duration-200 cursor-pointer',
                current === link.anchor ? 'text-fg' : 'text-fg-2 hover:text-fg'
              )}
            >
              {link.label}
              {current === link.anchor && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
          <Link
            href="/hobbies"
            className={cn(
              'text-sm font-medium transition-colors duration-200 cursor-pointer',
              pathname === '/hobbies'
                ? 'text-fg font-semibold'
                : 'text-fg-2 hover:text-fg'
            )}
          >
            Hobbies
          </Link>
          <Link
            href="/cv"
            className={cn(
              'text-sm font-medium transition-colors duration-200 cursor-pointer',
              pathname === '/cv' ? 'text-fg font-semibold' : 'text-fg-2 hover:text-fg'
            )}
          >
            CV
          </Link>
        </div>

        {/* Desktop actions (right) */}
        <div className="hidden md:flex items-center justify-self-end gap-3 lg:gap-4">
          <span className="w-px h-5 bg-surface-strong" aria-hidden="true" />
          <div className="flex items-center gap-1.5">
            <a
              href={contactHref}
              className="px-4 py-2 rounded-xl bg-accent-tint border border-accent/30 text-accent-fg hover:bg-accent-tint-hover text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              Contact
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="p-2 -m-2 text-fg-2 hover:text-fg transition-colors duration-200 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-line px-4 py-4 flex flex-col gap-3">
          {anchorLinks.map((link) => (
            <a
              key={link.anchor}
              href={hrefFor(link.anchor)}
              onClick={() => setOpen(false)}
              className="text-fg-soft hover:text-fg transition-colors duration-200 cursor-pointer py-1"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/hobbies"
            onClick={() => setOpen(false)}
            className={cn(
              'py-1 transition-colors duration-200 cursor-pointer',
              pathname === '/hobbies' ? 'text-fg font-medium' : 'text-fg-soft hover:text-fg'
            )}
          >
            Hobbies
          </Link>
          <Link
            href="/cv"
            onClick={() => setOpen(false)}
            className={cn(
              'py-1 transition-colors duration-200 cursor-pointer',
              pathname === '/cv' ? 'text-fg font-medium' : 'text-fg-soft hover:text-fg'
            )}
          >
            CV
          </Link>
          <a
            href={contactHref}
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-xl bg-accent-tint border border-accent/30 text-accent-fg hover:bg-accent-tint-hover text-sm font-medium text-center cursor-pointer"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  )
}
