import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { Mail, ArrowUp } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

const socials = [
  { href: 'https://github.com/P4R0S', label: 'GitHub', icon: FaGithub },
  { href: 'https://linkedin.com/in/parsa-rostamzadeh', label: 'LinkedIn', icon: FaLinkedin },
  { href: 'mailto:paros.pr@gmail.com', label: 'Email', icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-line py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-3">
          <Logo className="w-7 h-7" decorative />
          <div className="flex flex-col leading-tight text-center md:text-left">
            <span className="font-heading font-semibold text-sm text-fg">Parsa Rostamzadeh</span>
            <span className="text-xs text-fg-3">© {new Date().getFullYear()} · Paderborn, Germany</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-fg-3 hover:text-fg transition-colors duration-200 cursor-pointer"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
          <span className="w-px h-5 bg-surface-strong mx-1" aria-hidden="true" />
          <a
            href="#"
            aria-label="Back to top"
            className="text-fg-3 hover:text-fg transition-colors duration-200 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
