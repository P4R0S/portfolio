import { Crimson_Pro, Commissioner } from 'next/font/google'

// Variable fonts loaded without a fixed weight list: Google then serves plain font URLs.
// (Fixed weights return `/l/font?kit=…&…` URLs that break Turbopack's dev font loader.)
const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap',
})

const commissioner = Commissioner({
  subsets: ['latin'],
  variable: '--font-commissioner',
  display: 'swap',
})

export const metadata = {
  title: 'CV — Parsa Rostamzadeh',
  description: 'Curriculum Vitae of MohammadParsa RostamzadehKhameneh',
}

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${crimsonPro.variable} ${commissioner.variable}`}>
      {children}
    </div>
  )
}
