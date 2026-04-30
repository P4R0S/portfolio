# Hobbies Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `/hobbies` page with six horizontally-scrollable, momentum-based carousels (Books, Movies, Series, Games, Music, Podcasts) — linked from the navbar.

**Architecture:** Data lives in `content/hobbies.ts`. The page is a server component that maps categories to `HobbiesCarousel` client components. All carousel animation runs via direct DOM manipulation in a `useEffect` — never triggers React re-renders, so 60fps is achievable. CSS pseudo-elements for the shimmer line live in `globals.css`; everything else uses Tailwind utilities or inline styles.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, `cn()` from `lib/utils.ts`, no external carousel library.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `content/hobbies.ts` | Create | Data — 6 categories, typed items |
| `app/globals.css` | Modify | Add `.hobby-item` active shimmer + transition CSS |
| `components/hobbies/HobbiesCarousel.tsx` | Create | `'use client'` carousel — all DOM/animation logic |
| `app/hobbies/layout.tsx` | Create | Page metadata |
| `app/hobbies/page.tsx` | Create | Server page — renders hero + maps categories |
| `components/ui/Navbar.tsx` | Modify | Add "Hobbies" link |

---

## Task 1: Content data

**Files:**
- Create: `content/hobbies.ts`

- [ ] **Step 1: Create the file**

```ts
// content/hobbies.ts
export interface HobbyItem {
  title: string
  subtitle: string
  note: string
  cover?: string
  aspect: 'portrait' | 'square'
  tags?: string[]
}

export interface HobbyCategory {
  id: string
  label: string
  emoji: string
  items: HobbyItem[]
}

export const hobbies: HobbyCategory[] = [
  {
    id: 'books',
    label: 'Books',
    emoji: '📚',
    items: [
      { title: 'Gödel, Escher, Bach', subtitle: 'Douglas Hofstadter', note: 'The most mind-bending book I have ever read.', aspect: 'portrait' },
      { title: 'Thinking, Fast and Slow', subtitle: 'Daniel Kahneman', note: 'Made me aware of every cognitive shortcut I take.', aspect: 'portrait' },
      { title: 'The Pragmatic Programmer', subtitle: 'Hunt & Thomas', note: 'Changed how I think about software craftsmanship.', aspect: 'portrait' },
      { title: 'Dune', subtitle: 'Frank Herbert', note: 'World-building as philosophy.', aspect: 'portrait' },
      { title: 'The Design of Everyday Things', subtitle: 'Don Norman', note: 'I cannot look at a door handle the same way.', aspect: 'portrait' },
    ],
  },
  {
    id: 'movies',
    label: 'Movies',
    emoji: '🎬',
    items: [
      { title: 'Interstellar', subtitle: 'Nolan, 2014', note: 'Makes physics feel like poetry.', aspect: 'portrait' },
      { title: '2001: A Space Odyssey', subtitle: 'Kubrick, 1968', note: 'Still thinking about it years later.', aspect: 'portrait' },
      { title: 'The Matrix', subtitle: 'Wachowski, 1999', note: 'Rewired how I think about simulation.', aspect: 'portrait' },
      { title: 'Blade Runner 2049', subtitle: 'Villeneuve, 2017', note: 'The most beautiful film I have seen.', aspect: 'portrait' },
    ],
  },
  {
    id: 'series',
    label: 'Series',
    emoji: '📺',
    items: [
      { title: 'Breaking Bad', subtitle: 'Gilligan, 2008–2013', note: 'The perfect character arc.', aspect: 'portrait' },
      { title: 'Black Mirror', subtitle: 'Brooker, 2011–', note: 'Makes you think about technology differently.', aspect: 'portrait' },
      { title: 'Severance', subtitle: 'Stiller, 2022–', note: 'The most unsettling premise on television.', aspect: 'portrait' },
    ],
  },
  {
    id: 'games',
    label: 'Games',
    emoji: '🎮',
    items: [
      { title: 'The Witcher 3', subtitle: 'CD Projekt Red, 2015', note: 'Set the bar for open-world storytelling.', aspect: 'square' },
      { title: 'Portal 2', subtitle: 'Valve, 2011', note: 'The best puzzle design I have ever experienced.', aspect: 'square' },
      { title: 'Hollow Knight', subtitle: 'Team Cherry, 2017', note: 'Proved indie games can be masterpieces.', aspect: 'square' },
    ],
  },
  {
    id: 'music',
    label: 'Music',
    emoji: '🎵',
    items: [
      { title: 'OK Computer', subtitle: 'Radiohead', note: 'Soundtrack of late-night PhD sessions.', aspect: 'square' },
      { title: 'The Dark Side of the Moon', subtitle: 'Pink Floyd', note: 'Every listen reveals something new.', aspect: 'square' },
      { title: 'In Rainbows', subtitle: 'Radiohead', note: 'Perfect from start to finish.', aspect: 'square' },
      { title: 'Mezzanine', subtitle: 'Massive Attack', note: 'The right album for deep focus.', aspect: 'square' },
    ],
  },
  {
    id: 'podcasts',
    label: 'Podcasts',
    emoji: '🎙️',
    items: [
      { title: 'Lex Fridman Podcast', subtitle: 'Lex Fridman', note: 'Long-form conversations that make me think.', aspect: 'square' },
      { title: 'Huberman Lab', subtitle: 'Andrew Huberman', note: 'Changed how I structure my day.', aspect: 'square' },
      { title: '80,000 Hours', subtitle: 'Rob Wiblin', note: 'How to use your career to do the most good.', aspect: 'square' },
    ],
  },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -30`
Expected: no errors referencing `content/hobbies.ts`

- [ ] **Step 3: Commit**

```bash
git add content/hobbies.ts
git commit -m "feat(hobbies): add content data for all six categories"
```

---

## Task 2: Global CSS for carousel shimmer

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append hobby-specific CSS at the end of `app/globals.css`**

Add this block after the existing `/* Utility classes */` section:

```css
/* ── Hobbies carousel ── */

/* Inactive card: blurred and desaturated */
.hobby-item {
  transition:
    transform 0.42s cubic-bezier(0.25, 1, 0.5, 1),
    opacity   0.42s cubic-bezier(0.25, 1, 0.5, 1),
    box-shadow 0.42s ease,
    border-color 0.42s ease,
    filter 0.42s ease;
  filter: blur(0.6px) saturate(0.7);
  position: relative;
}

/* Active card: sharp, glowing */
.hobby-item.active {
  filter: none;
  border-color: transparent !important;
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(251, 146, 60, 0.45),
    0 0 40px rgba(251, 146, 60, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

/* Shimmer line at top of active card */
.hobby-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  z-index: 2;
  background: linear-gradient(to right, transparent, rgba(251, 146, 60, 0.7), transparent);
  border-radius: 1px;
  pointer-events: none;
}

/* Info slot: hidden by default */
.hobby-info-slot {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.32s ease, transform 0.32s ease;
  pointer-events: none;
}

/* Active info slot: visible */
.hobby-info-slot.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Dot indicator */
.hobby-dot {
  transition: background 0.25s ease, width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hobby-dot.active {
  width: 22px !important;
  border-radius: 3px !important;
  background-color: #fb923c !important;
}
```

- [ ] **Step 2: Verify build still passes**

Run: `npm run build 2>&1 | tail -10`
Expected: `✓ Compiled successfully` (or equivalent — no CSS parse errors)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(hobbies): add carousel CSS (shimmer, transitions, active states)"
```

---

## Task 3: HobbiesCarousel client component

**Files:**
- Create: `components/hobbies/HobbiesCarousel.tsx`

- [ ] **Step 1: Create the component file**

```tsx
// components/hobbies/HobbiesCarousel.tsx
'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { type HobbyCategory } from '@/content/hobbies'

interface Props {
  category: HobbyCategory
}

export function HobbiesCarousel({ category }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dotsRef  = useRef<HTMLDivElement>(null)
  const infoRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap  = wrapRef.current
    const track = trackRef.current
    const dotsEl = dotsRef.current
    const infoEl  = infoRef.current
    if (!wrap || !track || !dotsEl || !infoEl) return

    const items = Array.from(track.querySelectorAll<HTMLElement>('.hobby-item'))
    const dots  = Array.from(dotsEl.querySelectorAll<HTMLElement>('.hobby-dot'))
    const slots = Array.from(infoEl.querySelectorAll<HTMLElement>('.hobby-info-slot'))
    const GAP   = 16

    let currentIdx = -1
    let offset     = 0
    let rafId: number | null = null

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    function offsetForIndex(i: number) {
      const wrapW = wrap.offsetWidth
      let left = 0
      for (let j = 0; j < i; j++) left += items[j].offsetWidth + GAP
      return -(left - (wrapW / 2 - items[i].offsetWidth / 2))
    }

    function nearestIndex(fromOffset: number) {
      let best = 0, bestDist = Infinity
      items.forEach((_, j) => {
        const dist = Math.abs(fromOffset - offsetForIndex(j))
        if (dist < bestDist) { bestDist = dist; best = j }
      })
      return best
    }

    function applyActive(i: number) {
      if (i === currentIdx) return
      currentIdx = i
      items.forEach((item, j) => item.classList.toggle('active', j === i))
      dots.forEach((dot,  j) => dot.classList.toggle('active',  j === i))
      slots.forEach((slot, j) => slot.classList.toggle('active', j === i))
    }

    function moveTrack(x: number) {
      offset = x
      track.style.transform = `translateX(${x}px)`
    }

    function moveAndSync(x: number) {
      moveTrack(x)
      const wrapCenter = wrap.offsetWidth / 2
      let best = 0, bestDist = Infinity
      items.forEach((item, j) => {
        const c = item.offsetLeft + offset + item.offsetWidth / 2
        const dist = Math.abs(c - wrapCenter)
        if (dist < bestDist) { bestDist = dist; best = j }
      })
      applyActive(best)
    }

    function goTo(i: number, duration = 400) {
      if (rafId !== null) cancelAnimationFrame(rafId)
      const startOffset = offset
      const endOffset   = offsetForIndex(i)
      const startTime   = performance.now()
      applyActive(i)
      function tick(now: number) {
        const t = Math.min((now - startTime) / duration, 1)
        moveTrack(startOffset + (endOffset - startOffset) * easeOutExpo(t))
        if (t < 1) rafId = requestAnimationFrame(tick)
        else rafId = null
      }
      rafId = requestAnimationFrame(tick)
    }

    // Dot click handlers
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i))
    })

    // ── Mouse drag ──
    let mouse: { startX: number; startOffset: number; lastX: number; lastT: number; vel: number } | null = null

    function onMouseDown(e: MouseEvent) {
      if (rafId !== null) cancelAnimationFrame(rafId)
      mouse = { startX: e.clientX, startOffset: offset, lastX: e.clientX, lastT: performance.now(), vel: 0 }
      track.style.cursor = 'grabbing'
      e.preventDefault()
    }

    function onMouseMove(e: MouseEvent) {
      if (!mouse) return
      const now = performance.now(), dt = now - mouse.lastT
      if (dt > 0) mouse.vel = (e.clientX - mouse.lastX) / dt
      mouse.lastX = e.clientX; mouse.lastT = now
      moveAndSync(mouse.startOffset + (e.clientX - mouse.startX))
    }

    function onMouseUp() {
      if (!mouse) return
      const vel = mouse.vel; mouse = null
      track.style.cursor = 'grab'
      goTo(nearestIndex(offset + vel * 150))
    }

    // ── Touch ──
    let touch: {
      startX: number; startY: number; startOffset: number
      lastX: number; lastT: number; vel: number; dir: 'h' | 'v' | null
    } | null = null

    function onTouchStart(e: TouchEvent) {
      if (rafId !== null) cancelAnimationFrame(rafId)
      touch = {
        startX: e.touches[0].clientX, startY: e.touches[0].clientY,
        startOffset: offset, lastX: e.touches[0].clientX,
        lastT: performance.now(), vel: 0, dir: null,
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!touch) return
      const dx = e.touches[0].clientX - touch.startX
      const dy = e.touches[0].clientY - touch.startY
      if (!touch.dir && (Math.abs(dx) > 5 || Math.abs(dy) > 5))
        touch.dir = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
      if (touch.dir === 'v') return
      e.preventDefault()
      const now = performance.now(), dt = now - touch.lastT
      if (dt > 0) touch.vel = (e.touches[0].clientX - touch.lastX) / dt
      touch.lastX = e.touches[0].clientX; touch.lastT = now
      moveAndSync(touch.startOffset + dx)
    }

    function onTouchEnd() {
      if (!touch) return
      const { vel, dir } = touch; touch = null
      if (dir === 'v') return
      goTo(nearestIndex(offset + vel * 150))
    }

    // ── Trackpad horizontal wheel ──
    let wheelAcc = 0
    let wheelTimer: ReturnType<typeof setTimeout> | null = null

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      if (rafId !== null) cancelAnimationFrame(rafId)
      wheelAcc += e.deltaX
      moveAndSync(offsetForIndex(Math.max(0, currentIdx)) - wheelAcc)
      if (wheelTimer) clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => { wheelAcc = 0; goTo(nearestIndex(offset)) }, 80)
    }

    // Register listeners
    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchmove', onTouchMove, { passive: false })
    track.addEventListener('touchend', onTouchEnd, { passive: true })
    wrap.addEventListener('wheel', onWheel, { passive: false })

    // Initialise to first item
    requestAnimationFrame(() => {
      offset = offsetForIndex(0)
      track.style.transform = `translateX(${offset}px)`
      applyActive(0)
    })

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (wheelTimer) clearTimeout(wheelTimer)
      track.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove', onTouchMove)
      track.removeEventListener('touchend', onTouchEnd)
      wrap.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div>
      {/* Track wrapper — masks edges */}
      <div
        ref={wrapRef}
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          className="flex items-center py-8 will-change-transform"
          style={{ gap: '16px', cursor: 'grab', userSelect: 'none', touchAction: 'pan-y' }}
        >
          {category.items.map((item, i) => (
            <div
              key={i}
              className={cn(
                'hobby-item flex-shrink-0 rounded-2xl overflow-hidden',
                'bg-white/[0.03] border border-white/[0.07]',
                item.aspect === 'portrait' ? 'w-[155px]' : 'w-[178px]'
              )}
            >
              {/* Cover */}
              <div
                className={cn(
                  'relative w-full overflow-hidden',
                  item.aspect === 'portrait' ? 'h-[233px]' : 'h-[178px]'
                )}
              >
                {item.cover ? (
                  <Image src={item.cover} alt={item.title} fill className="object-cover" sizes="200px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[50px]"
                    style={{ background: 'linear-gradient(160deg, #18181b, #27272a)' }}>
                    {category.emoji}
                  </div>
                )}
                {/* Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, transparent 50%, rgba(0,0,0,0.3) 100%)' }}
                />
              </div>

              {/* Body */}
              <div
                className="px-3 py-2.5 border-t border-white/[0.05]"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)' }}
              >
                <div className="text-xs font-semibold text-zinc-300 truncate leading-snug mb-0.5">
                  {item.title}
                </div>
                <div className="text-[10px] text-zinc-600 truncate font-medium">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div ref={dotsRef} className="flex justify-center gap-1.5 mt-1.5">
        {category.items.map((_, i) => (
          <div
            key={i}
            className="hobby-dot w-1 h-1 rounded-full cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>

      {/* Info bar — fixed height, zero layout shift */}
      <div ref={infoRef} className="relative mt-3" style={{ height: '56px' }}>
        {category.items.map((item, i) => (
          <div
            key={i}
            className="hobby-info-slot absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-6"
          >
            <div className="text-sm font-semibold text-zinc-200 text-center leading-snug">
              {item.title}
            </div>
            <div
              className="text-xs text-zinc-500 italic text-center leading-relaxed"
              style={{}}
            >
              <span className="text-orange-400 not-italic">&ldquo;</span>
              {item.note}
              <span className="text-orange-400 not-italic">&rdquo;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npm run build 2>&1 | grep -E "(error|Error)" | head -20`
Expected: no errors in `components/hobbies/HobbiesCarousel.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/hobbies/HobbiesCarousel.tsx
git commit -m "feat(hobbies): add HobbiesCarousel client component"
```

---

## Task 4: Page and layout

**Files:**
- Create: `app/hobbies/layout.tsx`
- Create: `app/hobbies/page.tsx`

- [ ] **Step 1: Create the layout**

```tsx
// app/hobbies/layout.tsx
export const metadata = {
  title: 'Hobbies — Parsa Rostamzadeh',
  description: 'Books, movies, series, games, music, and podcasts — a curated collection of favorites.',
}

export default function HobbiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 2: Create the page**

```tsx
// app/hobbies/page.tsx
import { hobbies } from '@/content/hobbies'
import { HobbiesCarousel } from '@/components/hobbies/HobbiesCarousel'
import { BackgroundLayer } from '@/components/ui/BackgroundLayer'

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0f]">
      <BackgroundLayer />

      <div className="relative z-10 max-w-[1000px] mx-auto px-7 pt-16 pb-28">

        {/* Hero */}
        <div className="mb-20">
          <div
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-orange-400 mb-4 px-3 py-1 rounded-full border border-orange-400/20"
            style={{ background: 'rgba(251,146,60,0.08)' }}
          >
            ✦ Beyond the code
          </div>
          <h1 className="font-heading font-extrabold leading-[1.04] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #fafafa 0%, #a1a1aa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hobbies &amp;{' '}
            </span>
            <br />
            <span className="gradient-text">Interests</span>
          </h1>
          <p className="text-zinc-500 text-base leading-[1.75] max-w-[520px]">
            There&apos;s a person behind the research. Here&apos;s what I read, watch,
            play, and listen to — a curated collection of things that shaped how I think.
          </p>
        </div>

        {/* Category sections */}
        {hobbies.map((category, idx) => (
          <div
            key={category.id}
            className="mb-20"
            style={{
              animation: `fadeUp 0.55s cubic-bezier(0.25,1,0.5,1) both`,
              animationDelay: `${idx * 0.08}s`,
            }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-orange-400/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(251,146,60,0.05))',
                  boxShadow: '0 0 16px rgba(251,146,60,0.08)',
                }}
              >
                {category.emoji}
              </div>
              <span className="font-heading font-bold text-[22px] text-white tracking-tight">
                {category.label}
              </span>
              <span className="text-xs text-zinc-600 font-medium ml-1">
                drag to explore
              </span>
              <span
                className="ml-auto text-[11px] text-zinc-600 border border-white/[0.07] px-2.5 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                {category.items.length} favorites
              </span>
            </div>

            {/* Gradient divider */}
            <div
              className="mb-6 h-px"
              style={{ background: 'linear-gradient(to right, rgba(251,146,60,0.3), rgba(251,146,60,0.05))' }}
            />

            <HobbiesCarousel category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify `BackgroundLayer` is importable at this path**

Run: `cat components/ui/BackgroundLayer.tsx | head -5`
Expected: file exists and exports `BackgroundLayer`

If the file does not export `BackgroundLayer` as a named export, replace the import and usage with this inline equivalent instead:

```tsx
// Replace <BackgroundLayer /> with:
<div className="fixed inset-0 pointer-events-none z-0">
  <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.055] blur-[100px]"
    style={{ background: '#fb923c', animation: 'orb-1 12s ease-in-out infinite' }} />
  <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
    style={{ background: '#f97316', animation: 'orb-2 15s ease-in-out infinite' }} />
</div>
```

- [ ] **Step 4: Add `fadeUp` keyframe to `globals.css`** (if not already present)

Check with: `grep -n "fadeUp" app/globals.css`

If not found, append to `app/globals.css`:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 5: Build and verify**

Run: `npm run build 2>&1 | tail -15`
Expected: build succeeds, route `/hobbies` appears in output

- [ ] **Step 6: Commit**

```bash
git add app/hobbies/layout.tsx app/hobbies/page.tsx app/globals.css
git commit -m "feat(hobbies): add /hobbies page and layout"
```

---

## Task 5: Add Hobbies link to Navbar

**Files:**
- Modify: `components/ui/Navbar.tsx`

- [ ] **Step 1: Open the file and locate `anchorLinks`**

The current array in `components/ui/Navbar.tsx` is:

```ts
const anchorLinks = [
  { anchor: 'about',        label: 'About' },
  { anchor: 'skills',       label: 'Skills' },
  { anchor: 'projects',     label: 'Projects' },
  { anchor: 'experience',   label: 'Experience' },
  { anchor: 'publications', label: 'Publications' },
  { anchor: 'blog',         label: 'Blog' },
]
```

- [ ] **Step 2: Add the Hobbies page link**

`/hobbies` is a separate page (not an anchor), so it must be rendered as a `<Link>` like the CV link — not as an anchor. Find the desktop links block and add a Hobbies `<Link>` after the CV `<Link>`:

In the **desktop links** `<div>` (around line 47), add this after the loop over `anchorLinks` and before the CV `<Link>`:

```tsx
<Link
  href="/hobbies"
  className={cn(
    'text-sm transition-colors duration-200 cursor-pointer',
    pathname === '/hobbies'
      ? 'text-white font-medium'
      : 'text-slate-400 hover:text-white'
  )}
>
  Hobbies
</Link>
```

In the **mobile menu** `<div>` (around line 88), add this after the loop over `anchorLinks` and before the CV `<Link>`:

```tsx
<Link
  href="/hobbies"
  onClick={() => setOpen(false)}
  className={cn(
    'py-1 transition-colors duration-200 cursor-pointer',
    pathname === '/hobbies' ? 'text-white font-medium' : 'text-slate-300 hover:text-white'
  )}
>
  Hobbies
</Link>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -10`
Expected: no errors; `/hobbies` listed as a static route

- [ ] **Step 4: Smoke test — start dev server and check the page**

Run: `npm run dev`

Open browser at `http://localhost:3000/hobbies` and verify:
- Navbar shows "Hobbies" link, active when on `/hobbies`
- Hero renders with gradient title
- All 6 category sections render
- Carousel drags smoothly; active card scales up
- Dots update on drag; info bar shows title + quoted note
- Page scrolls freely while dragging carousels
- Horizontal trackpad swipe on a carousel does not scroll the page

- [ ] **Step 5: Commit**

```bash
git add components/ui/Navbar.tsx
git commit -m "feat(hobbies): add Hobbies link to navbar"
```

---

## Task 6: Lint + final build validation

**Files:** none (validation only)

- [ ] **Step 1: Run lint**

Run: `npm run lint 2>&1 | grep -E "(error|warning)" | head -20`
Expected: no errors. Warnings about `any` or unused vars are ok if pre-existing.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: `✓ Compiled successfully`. Route table includes `/hobbies`.

- [ ] **Step 3: Commit lint fixes if any**

If lint produced errors, fix them, then:

```bash
git add -p
git commit -m "fix(hobbies): resolve lint errors"
```
