import type { Metadata } from 'next'

/** The site's public address (custom domain, registered at INWX, served by Vercel). */
export const PRODUCTION_URL = 'https://www.p4ros.de'

/**
 * Absolute base URL of the site, for metadata, sitemap and robots.
 * Priority: SITE_URL override, then the custom domain on Vercel builds, then local dev.
 */
export const siteUrl =
  process.env.SITE_URL ?? (process.env.VERCEL ? PRODUCTION_URL : 'http://localhost:3000')

/** Open Graph fields shared by every page; each page adds its own title, description and url. */
export const ogBase: NonNullable<Metadata['openGraph']> = {
  siteName: 'Parsa Rostamzadeh',
  locale: 'en_US',
  type: 'website',
  // A page that sets its own `openGraph` stops inheriting app/opengraph-image.tsx, so name it here
  images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Parsa Rostamzadeh — Graduate Research Assistant · ML × Hardware' }],
}
