/**
 * Absolute base URL of the site, for metadata, sitemap and robots.
 * Priority: SITE_URL (set it in Vercel once a custom domain is attached),
 * then Vercel's production URL (provided automatically at build time), then local dev.
 */
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
