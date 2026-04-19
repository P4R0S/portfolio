# Portfolio agent guide

## Scope
- This is a Next.js App Router portfolio site. Treat the code in `app/`, `components/`, `content/`, and `lib/` as the source of truth.
- Some design docs exist under `design-system/`, but current implementation details in the app win when they differ.

## Architecture
- `app/layout.tsx` sets the global shell: fonts, metadata, `BackgroundLayer`, `Navbar`, `Footer`, and the shared dark theme.
- `app/page.tsx` composes the home page from section components in `components/sections/`.
- Content is data-driven:
  - `content/projects.ts`, `content/experience.ts`, `content/publications.ts`, `content/skills.ts`
  - blog posts live in `content/blog/*.mdx` and are parsed by `lib/blog.ts`
- The contact flow is client form → `app/api/contact/route.ts` → Resend email delivery.
- The CV route is isolated in `app/cv/` and uses `public/cv.pdf` plus `public/images/CV_pic.png`.

## Conventions
- Use the `@/` path alias from `tsconfig.json`.
- Keep components server-side by default; add `'use client'` only for interactivity (`Hero`, `Contact`, `Navbar`, `SectionWrapper`, `HeroTerminal`).
- Reuse shared UI primitives instead of re-creating them: `GlassCard`, `GradientText`, `SectionWrapper`, `BackgroundLayer`.
- Tailwind v4 + `cn` from `lib/utils.ts` are the standard styling helpers; the site palette is charcoal + orange from `app/globals.css`.
- Blog frontmatter follows `title`, `date`, `tags`, `excerpt`; `/blog` and `/blog/[slug]` render posts from that folder.
- Keep anchor IDs aligned with the navbar links (`about`, `skills`, `projects`, `experience`, `publications`, `blog`, `contact`).

## Workflow
- Dev: `npm run dev`
- Validate: `npm run build` and `npm run lint`
- Serve production build: `npm run start`
- There is no dedicated test runner in `package.json`; build + lint are the main checks.
- Before framework-level changes, consult the matching Next.js docs under `node_modules/next/dist/docs/` because this repo uses Next 16.x conventions.

## Key files
- `app/layout.tsx`, `app/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- `app/api/contact/route.ts`, `app/cv/layout.tsx`, `app/cv/page.tsx`
- `components/sections/Hero.tsx`, `About.tsx`, `Projects.tsx`, `Experience.tsx`, `Publications.tsx`, `BlogSection.tsx`, `Contact.tsx`
- `components/ui/Navbar.tsx`, `Footer.tsx`, `GlassCard.tsx`, `SectionWrapper.tsx`, `GradientText.tsx`, `BackgroundLayer.tsx`
- `components/terminal/HeroTerminal.tsx`, `lib/blog.ts`, `lib/terminal/*`, `content/*`
