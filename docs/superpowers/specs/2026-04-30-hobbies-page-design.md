# Hobbies Page — Design Spec
Date: 2026-04-30

## Overview
A dedicated `/hobbies` page added to the portfolio. A personal, visually rich showcase of curated favorites across six categories. Linked from the navbar between Projects and CV.

## URL & Navigation
- Route: `/hobbies`
- Navbar label: "Hobbies" — inserted between "Publications" and the CV link
- No anchor on the homepage (this is a standalone page, like `/cv`)

## Categories
Six categories, each rendered as its own horizontal carousel section:
1. 📚 Books
2. 🎬 Movies
3. 📺 Series
4. 🎮 Games
5. 🎵 Music
6. 🎙️ Podcasts

## Content Model
File: `content/hobbies.ts`

```ts
export interface HobbyItem {
  title: string       // display title
  subtitle: string    // author / director / artist / studio / host
  note: string        // personal one-liner (shown in info bar)
  cover?: string      // image URL (optional — falls back to emoji placeholder)
  aspect: 'portrait' | 'square'  // 2:3 for books/movies/series, 1:1 for music/podcasts/games
  tags?: string[]     // optional genre/year tags (future use)
}

export interface HobbyCategory {
  id: string
  label: string
  emoji: string
  items: HobbyItem[]
}

export const hobbies: HobbyCategory[] = [ ... ]
```

Aspect ratios by category:
- Books, Movies, Series → `portrait` (2:3)
- Music, Podcasts, Games → `square` (1:1)

Images: manual `cover` URL for now. API integration (TMDB, Open Library, Spotify) is a future enhancement — the data shape already supports it via the `cover` field.

## Page Layout

### Hero
- Eyebrow: pill badge — `✦ Beyond the code` — orange tint background
- Title: two-line — "Hobbies &" in white-to-grey gradient, "Interests" in orange gradient
- Subtitle: short personal tagline

### Category Sections
Each category:
```
[icon badge]  [Category Name]   drag to explore   [N favorites]
──────────────────────────────────────── (gradient divider)
[ carousel ]
[ dot indicators ]
[ info bar — fixed 56px height ]
```

### Carousel Behaviour
- Pure JS-driven — NO CSS scroll-snap (causes jank)
- `transform: translateX` on the track element
- `easeOutExpo` easing function for snap animation (duration: 400ms)
- Momentum drag: velocity tracked during drag, projected landing point on release
- Active card detection: `item.offsetLeft + offset + item.offsetWidth/2` vs `wrap.offsetWidth/2`
- Touch: direction detection (horizontal vs vertical) before `preventDefault` — vertical swipes pass to page scroll freely
- Trackpad: intercepts horizontal `wheel` deltaX only; vertical deltaY passes to page
- `touch-action: pan-y` on the carousel element

### Card Design
```
┌──────────────────┐
│                  │  ← cover art (portrait 2:3 or square 1:1)
│   [cover art]    │  ← vignette overlay (radial-gradient top)
│                  │  ← orange gradient at bottom on active
└──────────────────┘  ← shimmer line at top edge on active only
│ Card Title       │  ← brightens on active
│ subtitle         │  ← brightens on active
└──────────────────┘
```

Active card:
- `transform: scale(1)`, inactive: `scale(0.76)`
- Inactive: `filter: blur(0.6px) saturate(0.7)` — soft/desaturated
- Active: `filter: none`
- Active box-shadow: deep drop + orange ring + ambient glow + inner highlight
- Active card body: orange-tinted top border
- Shimmer line: thin `linear-gradient` stripe at top of active card

### Info Bar
- Fixed `56px` height — never changes, no layout shift
- All slots pre-rendered and absolutely stacked
- Active slot: `opacity: 1, translateY(0)` — others: `opacity: 0, translateY(8px)`
- Title + italic note with typographic orange `"` `"` quote marks via CSS pseudo-elements

### Dots
- Spring easing on width: `cubic-bezier(0.34,1.56,0.64,1)` 
- Active dot: `width: 22px` pill, orange
- Inactive: `4px` circle, dim

## Visual Design

### Palette
Matches portfolio exactly — `#0c0c0f` page background, orange accents from `globals.css`.

### Category Header Divider
Gradient border: `linear-gradient(to right, rgba(251,146,60,0.3), rgba(251,146,60,0.05))` — full orange on left, fades to transparent.

### Ambient Orbs
Two animated blurred orbs matching homepage `BackgroundLayer` — top-right and bottom-left.

### Animations
- `SectionWrapper`-style `fadeUp` on each category section (staggered `animation-delay`)
- Orbs: same `orb-1` / `orb-2` keyframes from `globals.css`

## Implementation Files
| File | Purpose |
|------|---------|
| `content/hobbies.ts` | Data — all 6 categories and their items |
| `app/hobbies/page.tsx` | Page component (server component) |
| `app/hobbies/layout.tsx` | Optional metadata layout |
| `components/hobbies/HobbiesCarousel.tsx` | `'use client'` — carousel logic |
| `components/hobbies/HobbyCard.tsx` | Individual card (server or client) |
| `components/ui/Navbar.tsx` | Add "Hobbies" link |

## What's Deferred
- Real cover image APIs (TMDB, Open Library, Spotify) — data shape ready, implementation later
- Photography section — separate spec
- Mobile swipe arrow indicators — nice to have
