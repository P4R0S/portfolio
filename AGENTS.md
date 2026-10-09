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
- Routes: `/`, `/cv`, `/hobbies`, plus `app/not-found.tsx` (branded 404).
- CV (`/cv`): `components/cv/CvDocument.tsx` renders `content/cv.ts` (summary, contact, skills, roles, education) plus publications from `content/publications.ts` (`venueShort` gives the short venue label). The CV sheet uses its own `--cv-*` tokens and looks the same in both themes, like a printed page; only the page around it follows the theme. Its fonts (Crimson Pro, Commissioner) are loaded in `app/cv/layout.tsx` as variable fonts without a weight list, because fixed weights break Turbopack's dev font loader.
- The contact flow is client form → `app/api/contact/route.ts` → Resend email delivery (honeypot field `extra`, length limits mirrored on both sides; needs `RESEND_API_KEY`).
- SEO: `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`; absolute URLs come from `lib/site.ts` (`SITE_URL`, else Vercel's production URL).

## Conventions
- Use the `@/` path alias from `tsconfig.json`.
- Keep components server-side by default; add `'use client'` only for interactivity (`Hero`, `Contact`, `Navbar`, `SectionWrapper`, `HeroTerminal`, `ExpandableText`, `NotFoundTerminal`, `HobbiesCarousel`, `ThemeToggle`, `CvDocument`).
- Reuse shared UI primitives instead of re-creating them: `GlassCard`, `GradientText`, `SectionWrapper`, `BackgroundLayer`, `Logo` (the chip monogram), `ExpandableText`.
- `BackgroundLayer` is rendered once in the root layout; pages should not add their own or paint an opaque background over it.
- Tailwind v4 + `cn` from `lib/utils.ts` are the standard styling helpers.
- Theming: two themes, dark (default, bare `:root`) and light (`:root[data-theme="light"]`), both defined as CSS variables in `app/globals.css` and exposed as utilities via `@theme inline` (`bg-bg`, `bg-surface`, `bg-raised`, `bg-btn`, `text-fg`, `text-fg-soft`, `text-fg-2`, `text-fg-3`, `text-accent-fg`, `border-line`, `bg-accent/10`, `text-warm`, `text-danger`, …). Inline styles use `var(--…)`. Never add raw palette classes (`text-slate-400`, `bg-white/5`, `text-orange-400`) or hex colors in components; add/extend a token with both a dark and a light value instead.
- Use `--accent-fg` for orange text (passes contrast in light mode) and `--accent` for icons, borders and tints. Don't put opacity modifiers on text colors.
- The initial theme is set before paint by the inline script in `app/layout.tsx` (saved choice in `localStorage.theme`, else OS preference); `components/ui/ThemeToggle.tsx` switches it. Use the `light:` variant only for one-offs a token can't express.
- Look the same in both themes on purpose: `HeroTerminal`, `NotFoundTerminal`, the CV sheet, the logo's chip body, and the hobby cover labels.
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
- `app/cv/*`, `components/cv/*`, `content/cv.ts`
- `app/not-found.tsx`, `app/hobbies/page.tsx`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/site.ts`
- `components/ui/Navbar.tsx`, `Footer.tsx`, `Logo.tsx`, `GlassCard.tsx`, `SectionWrapper.tsx`, `GradientText.tsx`, `BackgroundLayer.tsx`, `ExpandableText.tsx`, `NotFoundTerminal.tsx`, `ThemeToggle.tsx`
- `components/terminal/HeroTerminal.tsx`, `lib/terminal/*`, `content/*`
