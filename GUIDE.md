# Your Portfolio — Simple Guide

## What Was Built

A personal portfolio website. When someone visits your site, they see a beautiful dark page with:

- Your name in big glowing gradient text
- Your job titles cycling automatically ("ML Engineer" → "LLM Researcher" → etc.)
- Sections scrolling down: About, Skills, Projects, Experience, Publications, Blog, Contact
- A contact form people can use to email you

---

## Where the Project Lives

```
/home/student/Documents/Design/portfolio/
```

Open this folder in Cursor — everything is inside it.

---

## How to Run It Locally (See It in Your Browser)

```bash
cd /home/student/Documents/Design/portfolio
npm run dev
```

Then open your browser and go to: **http://localhost:3000**

To stop it: press `Ctrl + C` in the terminal.

---

## The Files You Need to Change

These are the ONLY files you need to touch to make it yours. Everything else is already done.

---

### 1. Your Name, Title, and Bio
**File:** `components/sections/Hero.tsx`

Find these lines and change them:

```tsx
// Line ~40 — Your big name at the top
<GradientText>Your Name</GradientText>

// Line ~12 — The titles that cycle automatically
const roles = [
  'ML Engineer',         // ← change these to your actual titles
  'LLM Researcher',
  'Hardware Developer',
  'Approximate Computing Specialist',
]

// Line ~55 — The short sentence under your name
Building intelligent systems at the intersection of software, hardware, and machine learning.

// Line ~18-20 — The 3 stat numbers (projects, papers, years)
{ label: 'Projects Built', value: '20+' },
{ label: 'Papers Published', value: '5' },
{ label: 'Years of Exp.', value: '6+' },
```

---

### 2. Your Photo and CV
**Folder:** `public/`

- Replace `public/images/profile.jpg` with YOUR photo (any JPG/PNG, name it exactly `profile.jpg`)
- Put your CV PDF at `public/cv.pdf`

---

### 3. Your Bio Text
**File:** `components/sections/About.tsx`

Find the two paragraphs and replace with your real bio:

```tsx
// Around line ~45
<p className="text-slate-400 ...">
  I'm a computer engineer with deep roots in both software and hardware...
  ← REPLACE THIS WITH YOUR OWN BIO (2-3 sentences)
</p>
<p className="text-slate-400 ...">
  When I'm not designing circuits...
  ← REPLACE THIS TOO
</p>
```

Also change the 3 highlight cards if you want:
```tsx
const highlights = [
  {
    title: 'What I Do',
    body: 'I design and build systems...'  // ← change this
  },
  {
    title: 'What Drives Me',
    body: 'Efficiency. I obsess...'         // ← change this
  },
  {
    title: 'Current Focus',
    body: 'Hardware-aware quantization...' // ← change this
  },
]
```

---

### 4. Your Skills
**File:** `content/skills.ts`

This is a simple list. Add/remove skills in each category:

```ts
export const skillCategories = [
  {
    name: 'Languages',
    accent: 'violet',
    skills: ['Python', 'C', 'C++', 'VHDL', ...],  // ← edit this list
  },
  {
    name: 'ML / AI',
    accent: 'blue',
    skills: ['PyTorch', 'HuggingFace', ...],        // ← edit this list
  },
  {
    name: 'Hardware',
    accent: 'emerald',
    skills: ['FPGA', 'RTL Design', ...],            // ← edit this list
  },
  {
    name: 'Tools & Infra',
    accent: 'orange',
    skills: ['Git', 'Docker', 'Linux', ...],        // ← edit this list
  },
]
```

---

### 5. Your Projects
**File:** `content/projects.ts`

Each project looks like this. Edit the existing ones or add new ones:

```ts
{
  title: 'LLM Quantization Framework',      // ← project name
  description: 'Short 1-line description',  // ← shown on card
  longDescription: 'Longer description...',  // ← shown when hovering over card
  tech: ['Python', 'PyTorch', 'CUDA'],      // ← tech tags shown on card
  github: 'https://github.com/YOU/REPO',    // ← your GitHub link (or remove)
  demo: 'https://yoursite.com',             // ← live demo link (or remove)
  featured: true,                           // ← true = shown first with "Featured" badge
},
```

To add a new project, copy one block, paste it, and change the text.
To remove a project, delete the whole `{ ... },` block.

---

### 6. Your Work Experience & Education
**File:** `content/experience.ts`

Each job/degree looks like this:

```ts
{
  company: 'Your University / Lab',         // ← company or university name
  role: 'PhD Researcher',                   // ← your job title or degree
  startDate: '2022',                        // ← start year
  endDate: 'Present',                       // ← end year, or 'Present'
  bullets: [
    'What you did or achieved here.',       // ← bullet point 1
    'Another achievement.',                 // ← bullet point 2
    'A third point.',                       // ← bullet point 3
  ],
  type: 'education',                        // ← 'work' or 'education' (changes the icon)
},
```

---

### 7. Your Publications / Research Papers
**File:** `content/publications.ts`

Each paper looks like this:

```ts
{
  title: 'Full paper title here',
  venue: 'IEEE Transactions on Computers',  // ← conference or journal name
  year: 2024,
  area: 'Approximate Computing',            // ← must be one of: 'ML' | 'Hardware' | 'Approximate Computing' | 'LLM'
  abstract: 'What the paper is about...',   // ← 1-2 sentences
  pdfUrl: '/papers/your-paper.pdf',         // ← put the PDF in public/papers/ folder, or remove this line
  doi: 'https://doi.org/10.xxxx',           // ← DOI link, or remove this line
},
```

---

### 8. Your Social Links and Email
These appear in the **Navbar**, **Footer**, and **Contact section**. Change them in 3 files:

**File 1:** `components/ui/Navbar.tsx`
```tsx
// The "YN" initials logo — change to yours
<a href="#">YN</a>  // ← change YN to your initials
```

**File 2:** `components/ui/Footer.tsx`
```tsx
const socials = [
  { href: 'https://github.com/yourusername', ... },     // ← your GitHub URL
  { href: 'https://linkedin.com/in/yourusername', ... }, // ← your LinkedIn URL
  { href: 'https://scholar.google.com/citations?user=YOURID', ... }, // ← your Google Scholar
  { href: 'https://twitter.com/yourusername', ... },    // ← your Twitter/X
  { href: 'mailto:you@example.com', ... },              // ← your email
]

// Also change your name at the bottom:
© {new Date().getFullYear()} Your Name.  // ← change "Your Name"
```

**File 3:** `components/sections/Contact.tsx`
```tsx
const socials = [
  { href: 'https://github.com/yourusername', ... },     // ← same links as Footer
  ...
]
```

---

### 9. Page Title (What Shows in Browser Tab)
**File:** `app/layout.tsx`

```tsx
export const metadata = {
  title: 'Your Name — ML Engineer & Developer',  // ← change this
  description: 'Computer engineer specializing in ML...',  // ← change this
}
```

---

### 10. Contact Form Email Destination
**File:** `app/api/contact/route.ts`

```ts
to: ['you@example.com'],  // ← change to YOUR real email address
```

Also: **File:** `.env.local`
```
RESEND_API_KEY=re_placeholder_replace_with_your_key
```
Replace `re_placeholder_replace_with_your_key` with a real key from https://resend.com (free account, no credit card).

---

### 11. Your Blog Posts
**Folder:** `content/blog/`

A blog post is a `.mdx` file (just a text file). The starter post is `hello-world.mdx`.

To write a new post, create a new file like `content/blog/my-first-post.mdx`:

```mdx
---
title: "Your Post Title"
date: "2026-04-15"
tags: ["ML", "hardware"]
excerpt: "One sentence summary of the post shown in the preview cards."
---

# Your Post Title

Write your post here in plain Markdown.

## A Section

Normal text, **bold text**, `code`, etc.
```

The post will automatically appear on your `/blog` page and in the home preview section.

---

## How to Deploy (Put It Online)

### Step 1: Create a GitHub account if you don't have one
Go to https://github.com

### Step 2: Create a new repository
- Click the `+` button → "New repository"
- Name it `portfolio`
- Keep it public
- Don't add README (your project already has one)

### Step 3: Push your code to GitHub
```bash
cd /home/student/Documents/Design/portfolio
git remote add origin https://github.com/YOURUSERNAME/portfolio.git
git push -u origin main
```
(Replace `YOURUSERNAME` with your actual GitHub username)

### Step 4: Deploy on Vercel (free)
1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Select your `portfolio` repository
4. Vercel auto-detects Next.js — just click **Deploy**
5. Add your environment variable:
   - Name: `RESEND_API_KEY`
   - Value: your key from https://resend.com
6. Done — you get a live URL like `yourname.vercel.app`

### Optional: Custom domain
If you have a domain (e.g. `yourname.com`), add it in Vercel → Project Settings → Domains.

---

## Quick Reference — Which File Controls What

| What you want to change | File to edit |
|---|---|
| Your name (big title) | `components/sections/Hero.tsx` |
| Job titles that cycle | `components/sections/Hero.tsx` |
| Stat numbers (20+, 5, 6+) | `components/sections/Hero.tsx` |
| Profile photo | `public/images/profile.jpg` |
| CV / Resume PDF | `public/cv.pdf` |
| Bio text | `components/sections/About.tsx` |
| Skills list | `content/skills.ts` |
| Projects | `content/projects.ts` |
| Work/Education timeline | `content/experience.ts` |
| Research papers | `content/publications.ts` |
| Blog posts | `content/blog/*.mdx` |
| Social links + email | `components/ui/Footer.tsx` + `components/sections/Contact.tsx` |
| Initials in navbar | `components/ui/Navbar.tsx` |
| Browser tab title | `app/layout.tsx` |
| Contact form destination email | `app/api/contact/route.ts` |
| Resend API key | `.env.local` |

---

## Things You Do NOT Need to Touch

- `components/ui/` — the design building blocks (GlassCard, etc.)
- `lib/` — helper functions
- `app/api/` — the contact form backend (only change the email address inside)
- `tailwind.config*` / `globals.css` — colors and design (already set up)
- `package.json` — dependencies (already installed)
- `next.config.ts` — Next.js settings (already configured)

---

## If Something Breaks

Run this to see what the error is:

```bash
cd /home/student/Documents/Design/portfolio
npm run build
```

The error message will tell you exactly which file and line number has the problem.

Common mistakes:
- Forgot a comma `,` between items in a list
- Deleted a `}` or `)`
- Used a research area that isn't exactly one of: `'ML'`, `'Hardware'`, `'Approximate Computing'`, `'LLM'`

---

*This guide covers everything. Start with your name, photo, and social links — those make the biggest difference immediately.*
