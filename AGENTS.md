# Portfolio agent guide

## Scope
- This is a Next.js App Router portfolio site. Treat the code in `app/`, `components/`, `content/`, and `lib/` as the source of truth.
- Some design docs exist under `design-system/`, but current implementation details in the app win when they differ.

## Architecture
- `app/layout.tsx` sets the global shell: fonts, metadata, `BackgroundLayer`, `Navbar`, `Footer`, and the shared dark theme.
- `app/page.tsx` composes the home page from section components in `components/sections/`, and computes the hero stats from `content/` server-side (passed to `Hero` as a prop).
- Content is data-driven:
  - `content/projects.ts`, `content/experience.ts`, `content/publications.ts`, `content/hobbies.ts`
  - Skills lists live in `components/sections/Skills.tsx`; the terminal's `skills` output in `HeroTerminal.tsx` should be kept in sync with them.
  - Publications have an optional `status: 'under-review'` (shown as a badge, excluded from the "Papers Published" stat). Publications intentionally carry no PDF/DOI links.
- Routes: `/`, `/hobbies`, plus `app/not-found.tsx` (branded 404). The CV page was removed; CV buttons open `ComingSoonModal`.
- The contact flow is client form → `app/api/contact/route.ts` → Resend email delivery (honeypot field `website`, length limits mirrored on both sides; needs `RESEND_API_KEY`).
- SEO: `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`; absolute URLs come from `lib/site.ts` (`SITE_URL`, else Vercel's production URL).

## Conventions
- Use the `@/` path alias from `tsconfig.json`.
- Keep components server-side by default; add `'use client'` only for interactivity (`Hero`, `Contact`, `Navbar`, `SectionWrapper`, `HeroTerminal`, `ComingSoonModal`, `ExpandableText`, `NotFoundTerminal`, `HobbiesCarousel`).
- Reuse shared UI primitives instead of re-creating them: `GlassCard`, `GradientText`, `SectionWrapper`, `BackgroundLayer`, `Logo` (the chip monogram), `ExpandableText`.
- `BackgroundLayer` is rendered once in the root layout; pages should not add their own or paint an opaque background over it.
- Tailwind v4 + `cn` from `lib/utils.ts` are the standard styling helpers; the site palette is charcoal + orange from `app/globals.css`.
- There is no blog (removed deliberately); don't reintroduce MDX/blog tooling.
- Keep anchor IDs aligned with the navbar links (`about`, `skills`, `projects`, `experience`, `publications`, `contact`).

## Workflow
- Dev: `npm run dev`
- Validate: `npm run build` and `npm run lint`
- Serve production build: `npm run start`
- There is no dedicated test runner in `package.json`; build + lint are the main checks.
- Before framework-level changes, consult the matching Next.js docs under `node_modules/next/dist/docs/` because this repo uses Next 16.x conventions.

## Key files
- `app/layout.tsx`, `app/page.tsx`
- `app/api/contact/route.ts`
- `components/sections/Hero.tsx`, `About.tsx`, `Projects.tsx`, `Experience.tsx`, `Publications.tsx`, `Contact.tsx`
- `app/not-found.tsx`, `app/hobbies/page.tsx`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/site.ts`
- `components/ui/Navbar.tsx`, `Footer.tsx`, `Logo.tsx`, `GlassCard.tsx`, `SectionWrapper.tsx`, `GradientText.tsx`, `BackgroundLayer.tsx`, `ComingSoonModal.tsx`, `ExpandableText.tsx`, `NotFoundTerminal.tsx`
- `components/terminal/HeroTerminal.tsx`, `lib/terminal/*`, `content/*`
