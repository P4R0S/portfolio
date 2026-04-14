import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { SiGooglescholar } from 'react-icons/si'
import { Mail, ArrowUp } from 'lucide-react'

const socials = [
  { href: 'https://github.com/yourusername', label: 'GitHub', icon: FaGithub },
  { href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', icon: FaLinkedin },
  { href: 'https://scholar.google.com/citations?user=YOURID', label: 'Google Scholar', icon: SiGooglescholar },
  { href: 'https://twitter.com/yourusername', label: 'Twitter / X', icon: FaXTwitter },
  { href: 'mailto:you@example.com', label: 'Email', icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <p className="text-slate-600 text-xs hidden md:block">
          Built with Next.js + Tailwind
        </p>

        <a
          href="#"
          aria-label="Back to top"
          className="text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </a>
      </div>
    </footer>
  )
}
