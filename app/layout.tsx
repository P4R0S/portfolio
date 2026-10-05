import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { BackgroundLayer } from '@/components/ui/BackgroundLayer'
import { siteUrl } from '@/lib/site'

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
  metadataBase: new URL(siteUrl),
  title: 'Parsa Rostamzadeh — Research Assistant · ML × Hardware',
  description:
    'Computer engineer specializing in approximate computing, hardware-aware ML, FPGA neural network optimization, and graph neural networks.',
  keywords: ['Approximate Computing', 'Hardware-aware ML', 'FPGA', 'VLSI', 'Research Assistant', 'Portfolio', 'Paderborn University'],
  openGraph: {
    title: 'Parsa Rostamzadeh — Research Assistant · ML × Hardware',
    description: 'Computer engineer specializing in approximate computing, hardware-aware ML, and FPGA neural network optimization.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
}

// Runs before first paint: apply the saved theme, else the OS preference. Without JS the
// page stays on the dark default from globals.css. Keep in sync with ThemeToggle.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;var c=t==='light'?'#faf8f5':'#18181b';var f=function(){document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.content=c})};f();document.addEventListener('DOMContentLoaded',f)}catch(e){}})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg text-fg antialiased">
        <BackgroundLayer />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
