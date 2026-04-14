import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Your Name — ML Engineer & Developer',
  description:
    'Computer engineer specializing in ML, LLM, approximate computing, and hardware design.',
  keywords: ['ML Engineer', 'LLM', 'Approximate Computing', 'Hardware', 'Portfolio'],
  openGraph: {
    title: 'Your Name — ML Engineer & Developer',
    description: 'Computer engineer specializing in ML, LLM, approximate computing, and hardware.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="bg-[#0F172A] text-[#F8FAFC] antialiased">
        {children}
      </body>
    </html>
  )
}
