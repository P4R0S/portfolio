# Parsa Rostamzadeh — Portfolio

Personal portfolio of **Parsa Rostamzadeh**, Research Assistant at Paderborn University working on
approximate computing, hardware-aware machine learning, and FPGA / VLSI design.

Built with Next.js (App Router) and deployed on Vercel.

## Features

- **Single-page home** — Hero, About, Skills, Projects, Experience, Publications, and Contact sections.
- **Interactive terminal** in the hero (`help`, `whoami`, `skills`, `open github`, `clear`) with
  command history and Tab completion.
- **Hobbies page** (`/hobbies`) — draggable carousels of books, movies, series, games, music, and podcasts.
- **Contact form** — sends email through [Resend](https://resend.com), with server-side validation
  and a honeypot spam filter.
- **Branded 404 page**, chip-monogram logo and favicon set, generated link-preview image,
  `sitemap.xml`, and `robots.txt`.
- Responsive from phone to desktop; CSS animations respect `prefers-reduced-motion`.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4, `clsx` + `tailwind-merge` (`cn` helper) |
| Motion | Framer Motion |
| Icons | Lucide, React Icons |
| Email | Resend |
| Fonts | Space Grotesk (headings), DM Sans (body) via `next/font` |

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run lint     # ESLint
npm run build    # production build (also type-checks)
npm run start    # serve the production build
```

There is no separate test suite; `npm run lint` and `npm run build` are the checks to run before pushing.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the contact form | API key used by `app/api/contact/route.ts` |
| `SITE_URL` | No | Absolute site URL (e.g. `https://example.com`) for metadata, sitemap, and robots. On Vercel it falls back to the production deployment URL automatically. |

Locally, put them in `.env.local` (git-ignored). On Vercel, set them under **Project → Settings → Environment Variables**.

## Project structure

```
app/
  layout.tsx            Global shell: fonts, metadata, background, navbar, footer
  page.tsx              Home page; computes hero stats from content/
  hobbies/              /hobbies page
  not-found.tsx         Branded 404
  api/contact/route.ts  Contact form endpoint (Resend)
  icon.svg, favicon.ico, apple-icon.png, opengraph-image.tsx, sitemap.ts, robots.ts
components/
  sections/             Home page sections (Hero, About, Skills, Projects, ...)
  ui/                   Shared UI (Navbar, Footer, Logo, GlassCard, SectionWrapper, ...)
  terminal/             Interactive hero terminal
  hobbies/              Hobbies carousel
content/                Site data: projects, experience, publications, hobbies
lib/                    Helpers (cn, site URL, terminal parser)
public/images/          Profile photo and hobby cover images
```

## Editing content

Most content is plain data, so updates rarely need component changes:

| What | Where |
| --- | --- |
| Projects | `content/projects.ts` — set `featured: true` to pin a project; omit `github` for private repos |
| Experience & education | `content/experience.ts` — shown newest first automatically; use `endDate: 'Present'` for ongoing roles |
| Publications | `content/publications.ts` — add `status: 'under-review'` for submissions; remove it once accepted |
| Hobbies | `content/hobbies.ts` (cover images in `public/images/hobbies/`) |
| Skills | `components/sections/Skills.tsx` (keep the terminal's `skills` output in `components/terminal/HeroTerminal.tsx` in sync) |

The hero stats (projects, published papers, years of experience) are derived from these files at build time.

## Deployment

Pushing to `main` triggers a Vercel production deployment. Make sure `RESEND_API_KEY` is configured
in the Vercel project for the contact form to deliver mail.
