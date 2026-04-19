import { Crimson_Pro, Commissioner } from 'next/font/google'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-crimson-pro',
  display: 'swap',
})

const commissioner = Commissioner({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
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
