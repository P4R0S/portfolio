import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactEmailHtml } from '@/lib/email/contactEmail'
import { PRODUCTION_URL } from '@/lib/site'

// Keep in sync with the maxLength attributes in components/sections/Contact.tsx
const LIMITS = { name: 100, email: 254, message: 5000 } as const

// Sender address. Resend's shared test sender only delivers to the account owner, so once
// p4ros.de is verified in Resend, set CONTACT_FROM (e.g. `Portfolio Contact <contact@p4ros.de>`).
const FROM = process.env.CONTACT_FROM ?? 'Portfolio Contact <onboarding@resend.dev>'

// Per-IP rate limit: at most MAX_SENDS messages per WINDOW_MS. Held in memory, so it's
// per server instance and resets on cold starts. That's enough to stop a script from
// burning the Resend quota or flooding the inbox from one address.
const WINDOW_MS = 10 * 60 * 1000
const MAX_SENDS = 3
const sends = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (sends.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_SENDS) {
    sends.set(ip, recent)
    return true
  }
  recent.push(now)
  sends.set(ip, recent)
  // Keep the map from growing without bound
  if (sends.size > 1000) {
    for (const [key, times] of sends) {
      if (times.every((t) => now - t >= WINDOW_MS)) sends.delete(key)
    }
  }
  return false
}

// Vercel sets these headers itself (client values are overwritten), so they can be trusted there
function clientIp(req: NextRequest) {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  try {
    const { name, email, message, extra } = body

    // Honeypot: real visitors never see or fill this field. Pretend success so bots don't adapt.
    if (extra) {
      return NextResponse.json({ success: true })
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const clean = { name: name.trim(), email: email.trim(), message: message.trim() }

    if (!clean.name || !clean.email || !clean.message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (
      clean.name.length > LIMITS.name ||
      clean.email.length > LIMITS.email ||
      clean.message.length > LIMITS.message
    ) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Strip line breaks so the visitor's name can't shape the subject line
    const subjectName = clean.name.replace(/[\r\n]+/g, ' ')

    // Counted only for valid submissions, so typos don't use up a visitor's attempts
    if (rateLimited(clientIp(req))) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later or email me directly.' },
        { status: 429 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json({ error: 'Failed to send message. Try again later.' }, { status: 500 })
    }
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: FROM,
      to: ['paros.pr@gmail.com'],
      replyTo: clean.email,
      subject: `Portfolio contact from ${subjectName}`,
      text: `From: ${clean.name} <${clean.email}>\n\n${clean.message}`,
      html: contactEmailHtml({ ...clean, siteUrl: PRODUCTION_URL }),
    })

    // Resend reports failures in the return value rather than throwing
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message. Try again later.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send message. Try again later.' }, { status: 500 })
  }
}
