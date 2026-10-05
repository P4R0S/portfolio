import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Keep in sync with the maxLength attributes in components/sections/Contact.tsx
const LIMITS = { name: 100, email: 254, message: 5000 } as const

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  try {
    const { name, email, message, website } = body

    // Honeypot: real visitors never see or fill this field. Pretend success so bots don't adapt.
    if (website) {
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

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json({ error: 'Failed to send message. Try again later.' }, { status: 500 })
    }
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['paros.pr@gmail.com'],
      replyTo: clean.email,
      subject: `Portfolio contact from ${subjectName}`,
      text: `From: ${clean.name} <${clean.email}>\n\n${clean.message}`,
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
