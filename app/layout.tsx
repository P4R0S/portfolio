import type { Metadata } from 'next'
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
      <body className="bg-[#18181b] text-[#fafafa] antialiased">
        <BackgroundLayer />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
