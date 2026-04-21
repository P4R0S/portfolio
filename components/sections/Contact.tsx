'use client'
import { useState, FormEvent } from 'react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'

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
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Left — heading + contact links */}
        <div className="flex-1 lg:max-w-sm">
          <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-5">
            Let&apos;s <GradientText>Work<br />Together</GradientText>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Open to research collaborations, full-time roles, and interesting side projects. Feel free to reach out.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:paros.pr@gmail.com"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200 group"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-orange-400/40 transition-colors duration-200">
                <Mail className="w-4 h-4" />
              </span>
              <span className="text-sm">paros.pr@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/parsa-rostamzadeh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200 group"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-orange-400/40 transition-colors duration-200">
                <FaLinkedin className="w-4 h-4" />
              </span>
              <span className="text-sm">linkedin.com/in/parsa-rostamzadeh</span>
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex-1 w-full">
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle className="w-10 h-10 text-orange-400 mx-auto mb-3" />
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-400/50 transition-colors duration-200"
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-400/50 transition-colors duration-200"
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
                  placeholder="Your Message ..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-400/50 transition-colors duration-200 resize-none"
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
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange-400/10 border border-orange-400/30 hover:bg-orange-400/20 hover:border-orange-400/50 disabled:opacity-60 disabled:cursor-not-allowed text-orange-400 font-medium transition-colors duration-200 cursor-pointer"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending&hellip;</>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </SectionWrapper>
  )
}
