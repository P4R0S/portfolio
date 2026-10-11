/** The site's public address (custom domain, registered at INWX, served by Vercel). */
export const PRODUCTION_URL = 'https://www.p4ros.de'

/**
 * Absolute base URL of the site, for metadata, sitemap and robots.
 * Priority: SITE_URL override, then the custom domain on Vercel builds, then local dev.
 */
export const siteUrl =
  process.env.SITE_URL ?? (process.env.VERCEL ? PRODUCTION_URL : 'http://localhost:3000')
