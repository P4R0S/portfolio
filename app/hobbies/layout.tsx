import type { Metadata } from 'next'
import { ogBase } from '@/lib/site'

const description = 'Books, movies, series, games, music, and podcasts — a curated collection of favorites.'

export const metadata: Metadata = {
  title: 'Hobbies',
  description,
  alternates: { canonical: '/hobbies' },
  openGraph: { ...ogBase, title: 'Hobbies — Parsa Rostamzadeh', description, url: '/hobbies' },
}

export default function HobbiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
