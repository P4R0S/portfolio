'use client'
import { useState, useRef, FormEvent, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { GlassCard } from '@/components/ui/GlassCard'
import { CurvedArrow } from '@/components/ui/CurvedArrow'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

// 'sent' is the brief checkmark on the button before the thank-you screen
type Status = 'idle' | 'loading' | 'sent' | 'success' | 'error'
type FieldName = 'name' | 'email' | 'message'
type Errors = Partial<Record<FieldName, string>>

// Same pattern as app/api/contact/route.ts
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(field: FieldName, value: string): string | undefined {
  const v = value.trim()
  if (field === 'name' && !v) return 'Enter your name.'
  if (field === 'email') {
    if (!v) return 'Enter your email address so I can reply.'
    if (!EMAIL_RE.test(v)) return 'Enter a valid email address, like you@company.com.'
  }
  if (field === 'message' && !v) return 'Write a message.'
}

const FIELDS: FieldName[] = ['name', 'email', 'message']

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const inputClass = (invalid: boolean) =>
  cn(
    'w-full bg-field border rounded-xl px-4 py-2.5 text-sm text-fg placeholder:text-fg-3 transition-colors duration-200',
    'focus:outline-2 focus:outline-offset-2',
    invalid ? 'border-danger focus:outline-danger' : 'border-field-line hover:border-accent/40 focus:outline-accent'
  )

function Field({
  id,
  label,
  error,
  children,
}: {
  id: FieldName
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-fg-soft mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  // `extra` is a honeypot: hidden from people, but bots tend to fill it in.
  // Deliberately non-semantic so browser autofill / password managers leave it empty.
  const [form, setForm] = useState({ name: '', email: '', message: '', extra: '' })
  // What was last sent, for the confirmation and the "edit" path
  const [sent, setSent] = useState<typeof form | null>(null)
  const reduce = useReducedMotion()
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  function update(field: FieldName, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    // Once a field shows an error, re-check it as the visitor types so it clears when fixed
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(field, value) }))
  }

  function blur(field: FieldName) {
    // Don't nag about a field the visitor tabbed through without typing
    if (!form[field] && !errors[field]) return
    setErrors((e) => ({ ...e, [field]: validate(field, form[field]) }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const next: Errors = {}
    for (const f of FIELDS) next[f] = validate(f, form[f])
    setErrors(next)
    const firstInvalid = FIELDS.find((f) => next[f])
    if (firstInvalid) {
      const target = { name: nameRef, email: emailRef, message: messageRef }[firstInvalid]
      target.current?.focus()
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      // An upstream failure (e.g. a platform timeout page) may not be JSON
      const data: { error?: string } = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrorMsg(data.error ?? 'The message could not be sent. Try again in a few minutes.')
        setStatus('error')
      } else {
        setSent(form)
        setStatus('sent')
        setTimeout(() => {
          setStatus('success')
          setForm({ name: '', email: '', message: '', extra: '' })
        }, reduce ? 0 : 1100)
      }
    } catch {
      setErrorMsg('The message could not be sent. Check your connection and try again.')
      setStatus('error')
    }
  }

  function editSent() {
    if (sent) setForm(sent)
    setStatus('idle')
  }

  const ariaFor = (field: FieldName) => ({
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })

  const firstName = sent?.name.trim().split(/\s+/)[0]

  return (
    <SectionWrapper id="contact">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-20 items-center">

        {/* Left — heading + contact links */}
        <div className="relative flex-1 lg:max-w-sm">
          <p className="text-fg-3 text-xs tracking-widest uppercase mb-2">Get in touch</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-5">
            Let&apos;s <GradientText>Work<br />Together</GradientText>
          </h2>
          <p className="text-fg-2 text-sm leading-relaxed mb-8">
            Open to research collaborations, full-time roles, and interesting side projects. Feel free to reach out.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:paros.pr@gmail.com"
              className={cn('flex items-center gap-3 text-fg-2 hover:text-fg transition-colors duration-200 group rounded-lg', focusRing)}
            >
              <span className="w-8 h-8 rounded-lg bg-surface border border-line flex items-center justify-center group-hover:border-accent/40 transition-colors duration-200">
                <Mail className="w-4 h-4" />
              </span>
              <span className="text-sm">paros.pr@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/parsa-rostamzadeh"
              target="_blank"
              rel="noopener noreferrer"
              className={cn('flex items-center gap-3 text-fg-2 hover:text-fg transition-colors duration-200 group rounded-lg', focusRing)}
            >
              <span className="w-8 h-8 rounded-lg bg-surface border border-line flex items-center justify-center group-hover:border-accent/40 transition-colors duration-200">
                <FaLinkedin className="w-4 h-4" />
              </span>
              <span className="text-sm">linkedin.com/in/parsa-rostamzadeh</span>
            </a>
          </div>
          <CurvedArrow variant="side" className="hidden lg:block absolute -right-[4rem] -bottom-[5.5rem] w-[9rem]" />
        </div>

        <CurvedArrow variant="down" className="lg:hidden w-[3rem] mt-6" />

        {/* Right — form */}
        <GlassCard className="flex-1 w-full p-6 sm:p-8">
          {status === 'success' && sent ? (
            <div className="text-center py-8" role="status">
              <CheckCircle className="w-10 h-10 text-accent mx-auto mb-4" aria-hidden="true" />
              <p className="font-heading text-xl font-semibold text-fg mb-2">Thanks, {firstName}.</p>
              <p className="text-fg-2 text-sm leading-relaxed">
                Your message is on its way. I&apos;ll reply to
                <br />
                <span className="text-fg font-medium break-all">{sent.email.trim()}</span>
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                <button
                  onClick={editSent}
                  className={cn('text-accent-fg hover:text-accent-fg-hover font-medium transition-colors duration-200 cursor-pointer rounded', focusRing)}
                >
                  Wrong address? Edit your message
                </button>
                <button
                  onClick={() => { setSent(null); setStatus('idle') }}
                  className={cn('text-fg-2 hover:text-fg transition-colors duration-200 cursor-pointer rounded', focusRing)}
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  ref={nameRef}
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  onBlur={() => blur('name')}
                  placeholder="Ada Lovelace"
                  className={inputClass(!!errors.name)}
                  {...ariaFor('name')}
                />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  onBlur={() => blur('email')}
                  placeholder="you@company.com"
                  className={inputClass(!!errors.email)}
                  {...ariaFor('email')}
                />
              </Field>
              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  ref={messageRef}
                  id="message"
                  required
                  maxLength={5000}
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  onBlur={() => blur('message')}
                  placeholder="What would you like to talk about?"
                  className={cn(inputClass(!!errors.message), 'resize-none')}
                  {...ariaFor('message')}
                />
              </Field>

              <div aria-hidden="true" className="absolute -left-[10000px] w-px h-px overflow-hidden">
                <label htmlFor="contact-extra">Leave this field empty</label>
                <input
                  id="contact-extra"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.extra}
                  onChange={(e) => setForm({ ...form, extra: e.target.value })}
                />
              </div>

              {status === 'error' && (
                <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-danger/40 bg-danger-tint px-4 py-3 text-sm text-danger">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    {errorMsg}{' '}
                    <a href="mailto:paros.pr@gmail.com" className="underline underline-offset-2">
                      Or email me directly.
                    </a>
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || status === 'sent'}
                className={cn(
                  'mt-1 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cta text-cta-fg hover:bg-cta-hover font-semibold transition-colors duration-200 cursor-pointer',
                  'disabled:opacity-70 disabled:cursor-not-allowed',
                  focusRing
                )}
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending&hellip;</>
                ) : status === 'sent' ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
                      <motion.path
                        d="M5 12.5 L10 17.5 L19 7"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                      />
                    </svg>
                    Sent
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
        </GlassCard>

      </div>
    </SectionWrapper>
  )
}
