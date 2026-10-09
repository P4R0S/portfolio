'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
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

  const hrefFor = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`
  const contactHref = isHome ? '#contact' : '/#contact'

  return (
    <nav
      className={cn(
        'fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300',
        'backdrop-blur-md border border-line',
        scrolled ? 'bg-[var(--nav-scrolled)] shadow-xl shadow-(color:--nav-shadow)' : 'bg-nav-idle'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo — always goes home */}
        <Link href="/" aria-label="Home" className="cursor-pointer transition-transform duration-200 hover:scale-105">
          <Logo className="w-[34px] h-[34px]" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {anchorLinks.map((link) => (
            <a
              key={link.anchor}
              href={hrefFor(link.anchor)}
              className="text-sm text-fg-2 hover:text-fg transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/hobbies"
            className={cn(
              'text-sm transition-colors duration-200 cursor-pointer',
              pathname === '/hobbies'
                ? 'text-fg font-medium'
                : 'text-fg-2 hover:text-fg'
            )}
          >
            Hobbies
          </Link>
          <Link
            href="/cv"
            className={cn(
              'text-sm transition-colors duration-200 cursor-pointer',
              pathname === '/cv' ? 'text-fg font-medium' : 'text-fg-2 hover:text-fg'
            )}
          >
            CV
          </Link>
          <a
            href={contactHref}
            className="px-4 py-2 rounded-xl bg-accent-tint border border-accent/30 text-accent-fg hover:bg-accent-tint-hover text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-fg-2 hover:text-fg transition-colors duration-200 cursor-pointer"
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
