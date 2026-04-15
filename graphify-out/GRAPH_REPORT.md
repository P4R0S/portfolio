# Graph Report - .  (2026-04-15)

## Corpus Check
- Corpus is ~10,761 words - fits in a single context window. You may not need a graph.

## Summary
- 81 nodes · 58 edges · 31 communities detected
- Extraction: 74% EXTRACTED · 26% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Portfolio Sections & Layout|Portfolio Sections & Layout]]
- [[_COMMUNITY_Next.js & Deployment Config|Next.js & Deployment Config]]
- [[_COMMUNITY_Content Data & Page Sections|Content Data & Page Sections]]
- [[_COMMUNITY_Contact & Communication|Contact & Communication]]
- [[_COMMUNITY_Hero & Identity|Hero & Identity]]
- [[_COMMUNITY_Blog Post Page|Blog Post Page]]
- [[_COMMUNITY_Blog Data Layer|Blog Data Layer]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Contact API Route|Contact API Route]]
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_Experience Component|Experience Component]]
- [[_COMMUNITY_Skills Component|Skills Component]]
- [[_COMMUNITY_Contact Form Logic|Contact Form Logic]]
- [[_COMMUNITY_Gradient Text UI|Gradient Text UI]]
- [[_COMMUNITY_Section Wrapper UI|Section Wrapper UI]]
- [[_COMMUNITY_Navbar Component|Navbar Component]]
- [[_COMMUNITY_Glass Card UI|Glass Card UI]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_TypeScript Env Defs|TypeScript Env Defs]]
- [[_COMMUNITY_Blog List Page|Blog List Page]]
- [[_COMMUNITY_Publications Data|Publications Data]]
- [[_COMMUNITY_Projects Data|Projects Data]]
- [[_COMMUNITY_Skills Data|Skills Data]]
- [[_COMMUNITY_Experience Data|Experience Data]]
- [[_COMMUNITY_Hero Section File|Hero Section File]]
- [[_COMMUNITY_Blog Section Preview|Blog Section Preview]]
- [[_COMMUNITY_About Section File|About Section File]]
- [[_COMMUNITY_Projects Section File|Projects Section File]]
- [[_COMMUNITY_Publications Section File|Publications Section File]]
- [[_COMMUNITY_Footer Component File|Footer Component File]]

## God Nodes (most connected - your core abstractions)
1. `Personal Portfolio Website` - 14 edges
2. `Contact Section` - 4 edges
3. `Next.js Project (create-next-app)` - 4 edges
4. `Vercel Deployment Platform` - 4 edges
5. `Hero Section` - 3 edges
6. `Next.js Framework` - 3 edges
7. `Blog Content (MDX files)` - 3 edges
8. `Rationale: Content files separated from component files to ease customization` - 3 edges
9. `Next.js Agent Rules` - 2 edges
10. `Breaking Changes Warning for Next.js` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Globe / World Icon (SVG)` --conceptually_related_to--> `Personal Portfolio Website`  [INFERRED]
  public/globe.svg → GUIDE.md
- `Browser Window / App Icon (SVG)` --conceptually_related_to--> `Personal Portfolio Website`  [INFERRED]
  public/window.svg → GUIDE.md
- `Vercel Deployment Platform` --semantically_similar_to--> `Vercel Deployment`  [INFERRED] [semantically similar]
  README.md → GUIDE.md
- `Next.js Logo (SVG)` --conceptually_related_to--> `Next.js Framework`  [INFERRED]
  public/next.svg → GUIDE.md
- `Document / File Icon (SVG)` --conceptually_related_to--> `Blog Content (MDX files)`  [INFERRED]
  public/file.svg → GUIDE.md

## Hyperedges (group relationships)
- **Contact Form Pipeline: Component, API Route, and Resend Email** — guide_component_contact_tsx, guide_api_contact_route, guide_resend_email [EXTRACTED 1.00]
- **Social Links shared across Navbar, Footer, and Contact** — guide_component_navbar_tsx, guide_component_footer_tsx, guide_component_contact_tsx [EXTRACTED 1.00]
- **Next.js + Vercel + Geist Font Deployment Stack** — readme_nextjs_project, readme_vercel_platform, readme_geist_font [EXTRACTED 1.00]

## Communities

### Community 0 - "Portfolio Sections & Layout"
Cohesion: 0.15
Nodes (13): About Section, App Layout (layout.tsx), Blog Section, About Component (About.tsx), Navbar Component (Navbar.tsx), Blog Content (MDX files), Publications Content (publications.ts), Personal Portfolio Website (+5 more)

### Community 1 - "Next.js & Deployment Config"
Cohesion: 0.22
Nodes (10): Breaking Changes Warning for Next.js, Next.js Agent Rules, AGENTS.md Reference in CLAUDE.md, Next.js Framework, Vercel Deployment, Geist Font (Vercel), Next.js Project (create-next-app), Vercel Deployment Platform (+2 more)

### Community 2 - "Content Data & Page Sections"
Cohesion: 0.29
Nodes (7): Experience Content (experience.ts), Projects Content (projects.ts), Skills Content (skills.ts), Experience and Education Section, Projects Section, Rationale: Content files separated from component files to ease customization, Skills Section

### Community 3 - "Contact & Communication"
Cohesion: 0.33
Nodes (6): Contact API Route (route.ts), Contact Component (Contact.tsx), Footer Component (Footer.tsx), Contact Section, Environment Variables (.env.local), Resend Email API Integration

### Community 4 - "Hero & Identity"
Cohesion: 0.5
Nodes (4): Hero Component (Hero.tsx), Hero Section, Profile Photo (profile.jpg), Portfolio Owner Profile Photo — Young man with glasses and beard taking a mirror selfie with iPhone

### Community 5 - "Blog Post Page"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "Blog Data Layer"
Cohesion: 0.67
Nodes (0): 

### Community 7 - "Home Page"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Root Layout"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Contact API Route"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Utility Functions"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Experience Component"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Skills Component"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Contact Form Logic"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Gradient Text UI"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Section Wrapper UI"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Navbar Component"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Glass Card UI"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Next.js Config"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "TypeScript Env Defs"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Blog List Page"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Publications Data"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Projects Data"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Skills Data"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Experience Data"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Hero Section File"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Blog Section Preview"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "About Section File"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Projects Section File"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Publications Section File"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Footer Component File"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **16 isolated node(s):** `Hero Component (Hero.tsx)`, `About Component (About.tsx)`, `Publications Content (publications.ts)`, `Navbar Component (Navbar.tsx)`, `Footer Component (Footer.tsx)` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Home Page`** (2 nodes): `page.tsx`, `Home()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Layout`** (2 nodes): `layout.tsx`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact API Route`** (2 nodes): `route.ts`, `POST()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utility Functions`** (2 nodes): `utils.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Experience Component`** (2 nodes): `Experience.tsx`, `Experience()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Skills Component`** (2 nodes): `Skills.tsx`, `Skills()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Form Logic`** (2 nodes): `Contact.tsx`, `handleSubmit()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Gradient Text UI`** (2 nodes): `GradientText.tsx`, `GradientText()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Section Wrapper UI`** (2 nodes): `SectionWrapper.tsx`, `SectionWrapper()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navbar Component`** (2 nodes): `Navbar.tsx`, `handler()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Glass Card UI`** (2 nodes): `GlassCard.tsx`, `GlassCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `TypeScript Env Defs`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Blog List Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Publications Data`** (1 nodes): `publications.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Projects Data`** (1 nodes): `projects.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Skills Data`** (1 nodes): `skills.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Experience Data`** (1 nodes): `experience.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Section File`** (1 nodes): `Hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Blog Section Preview`** (1 nodes): `BlogSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Section File`** (1 nodes): `About.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Projects Section File`** (1 nodes): `Projects.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Publications Section File`** (1 nodes): `Publications.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Footer Component File`** (1 nodes): `Footer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Personal Portfolio Website` connect `Portfolio Sections & Layout` to `Next.js & Deployment Config`, `Content Data & Page Sections`, `Contact & Communication`, `Hero & Identity`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Why does `Contact Section` connect `Contact & Communication` to `Portfolio Sections & Layout`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `Next.js Framework` connect `Next.js & Deployment Config` to `Portfolio Sections & Layout`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Personal Portfolio Website` (e.g. with `Globe / World Icon (SVG)` and `Browser Window / App Icon (SVG)`) actually correct?**
  _`Personal Portfolio Website` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Next.js Project (create-next-app)` (e.g. with `Next.js Framework` and `Breaking Changes Warning for Next.js`) actually correct?**
  _`Next.js Project (create-next-app)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Vercel Deployment Platform` (e.g. with `Vercel Deployment` and `Geist Font (Vercel)`) actually correct?**
  _`Vercel Deployment Platform` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Hero Component (Hero.tsx)`, `About Component (About.tsx)`, `Publications Content (publications.ts)` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._