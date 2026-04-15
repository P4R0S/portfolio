'use client'
import { useState, FormEvent } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

const socials = [
  { href: 'https://github.com/P4R0S', label: 'GitHub', icon: FaGithub },
  { href: 'https://linkedin.com/in/paros_1999', label: 'LinkedIn', icon: FaLinkedin },
  { href: 'mailto:paros.pr@gmail.com', label: 'Email', icon: Mail },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="contact">
      <div className="text-center mb-12">
        <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">Get in touch</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          Let&apos;s <GradientText>Work Together</GradientText>
        </h2>
        <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
          Open to research collaborations, full-time roles, and interesting side projects.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <GlassCard className="p-6 md:p-8 mb-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-white font-medium mb-1">Message sent!</p>
              <p className="text-slate-400 text-sm">I&apos;ll get back to you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-xs text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-xs text-slate-400 mb-1.5">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-slate-400 mb-1.5">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-slate-400 mb-1.5">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What's on your mind?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200 resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors duration-200 cursor-pointer"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending&hellip;</>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </GlassCard>

        {/* Social links */}
        <div className="flex items-center justify-center gap-5">
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
      </div>
    </SectionWrapper>
  )
}
