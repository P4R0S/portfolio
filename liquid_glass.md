# Hobbies Section — Liquid Glass Card Redesign Spec

> **Goal:** Replace the current hobby card visual style in `HobbiesCarousel.tsx` with an Apple-inspired "Liquid Glass" treatment. The carousel interaction logic (drag, touch, wheel, dot navigation, active scaling) stays **100% untouched** — only the card visuals change.

---

## What "Liquid Glass" Means Here

Inspired by Apple's iOS 26 / visionOS design language:

1. **The glass label bleeds through the cover art** — a `backdrop-filter: blur()` panel sits at the bottom of the cover image, blurring and tinting through the artwork beneath it.
2. **Each card emits an ambient color bloom** — a soft, blurred `div` sits *behind* the card (negative z-index / absolute positioned) with a color that roughly matches the artwork's dominant hue. This gives a gentle glow on the dark background.
3. **A specular top-edge highlight** — a 1px-tall gradient bar along the very top of the card (`transparent → white/50% → transparent`) that simulates a glass surface catching light.
4. **No hard opaque background on the card body** — the text label area is pure frosted glass, not a solid block.

---

## Files to Edit

| File | Change |
|------|--------|
| `components/hobbies/HobbiesCarousel.tsx` | Card JSX + wrapper div structure |
| `app/globals.css` | `.hobby-item`, `.hobby-item.active` styles + new liquid glass classes |

**Do NOT touch** the `useEffect` carousel logic, dot/info-slot wiring, or any event listeners.

---

## Exact Visual Spec

### Card outer wrapper (replaces current `.hobby-item` inline styles)

The card is now a **relative-positioned wrapper** that holds:
1. The ambient bloom layer (behind)
2. The actual glass card (above)

```tsx
// Outer wrapper — needs `position: relative` and overflow: visible so bloom shows
<div
  key={i}
  className={cn(
    'hobby-item flex-shrink-0',
    item.aspect === 'portrait' ? 'w-[200px]' : 'w-[200px]'
  )}
  style={{ position: 'relative' }}
>
  {/* 1. Ambient bloom — sits behind the card */}
  <div
    className="hobby-bloom"
    style={{ background: item.dominantColor ?? '#1a1a2a' }}
  />

  {/* 2. The glass card */}
  <div className="hobby-glass-card">
    ...cover + glass label...
  </div>
</div>
```

### Ambient bloom layer

```css
.hobby-bloom {
  position: absolute;
  inset: -24px;
  border-radius: 50%;
  opacity: 0.35;
  filter: blur(28px);
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.hobby-item.active .hobby-bloom {
  opacity: 0.6;
}
```

### Glass card container

```css
.hobby-glass-card {
  position: relative;
  z-index: 1;
  border-radius: 20px;
  overflow: hidden;
  /* Subtle outer border — feels like the edge of glass */
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 8px 32px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.4s ease;
}

.hobby-item.active .hobby-glass-card {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.22),
    0 16px 48px rgba(0, 0, 0, 0.7);
}
```

### Cover image area

Same as current — `relative overflow-hidden rounded-t-[20px]`, with the image inside.

**Add one extra layer** over the image — the specular top-edge sheen:

```tsx
{/* Specular highlight — very top of card */}
<div
  style={{
    position: 'absolute',
    top: 0, left: '8%', right: '8%',
    height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)',
    zIndex: 4,
    pointerEvents: 'none',
  }}
/>
{/* Soft top-corner sheen */}
<div
  style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%)',
    zIndex: 3,
    pointerEvents: 'none',
    borderRadius: '20px 20px 0 0',
  }}
/>
```

### Liquid glass label (replaces the current card Body div)

This is the key change — the label panel uses `backdrop-filter` so it blurs through the image:

```tsx
<div
  style={{
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: '10px 13px 13px',
    backdropFilter: 'blur(20px) saturate(1.8) brightness(1.05)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.05)',
    background: 'rgba(8, 8, 10, 0.38)',
    borderTop: '1px solid rgba(255, 255, 255, 0.16)',
    borderRadius: '0 0 20px 20px',
  }}
>
  {/* Inner top specular line */}
  <div
    style={{
      position: 'absolute',
      top: 0, left: '10%', right: '10%',
      height: '1px',
      background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)',
      pointerEvents: 'none',
    }}
  />
  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
    {item.title}
  </div>
  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
    {item.subtitle}
  </div>
</div>
```

**Important:** The label is now `position: absolute` at the bottom of the cover div. So the cover div needs to be the full card height — remove the separate `<div className="card-a-body">` that previously sat outside the image. The image + the glass label both live inside one `overflow: hidden` container.

---

## Content Data Change — `dominantColor` field

To power the ambient bloom, each hobby item needs a `dominantColor` string. Add it to the `HobbyItem` interface in `content/hobbies.ts`:

```ts
export interface HobbyItem {
  // ... existing fields ...
  dominantColor?: string  // CSS color for the ambient bloom behind the card
}
```

Then add it to each item. Here are suggested values (dark, desaturated versions of the artwork palette — too bright looks garish):

**Books:**
```ts
{ title: 'Beyond Good and Evil',    dominantColor: '#5a3a20', ... }
{ title: 'Thus Spoke Zarathustra',  dominantColor: '#2a3a5a', ... }
{ title: 'The Metamorphosis',        dominantColor: '#1a2e1a', ... }
{ title: "Man's Search for Meaning", dominantColor: '#4a2a18', ... }
{ title: 'White Nights',             dominantColor: '#1a2a4a', ... }
{ title: 'How Emotions Are Made',    dominantColor: '#3a2040', ... }
```

**Movies:**
```ts
{ title: 'Interstellar',             dominantColor: '#1a2a3a', ... }
{ title: 'Her',                      dominantColor: '#4a2010', ... }
{ title: 'There Will Be Blood',      dominantColor: '#2a1810', ... }
{ title: 'Zodiac',                   dominantColor: '#18182a', ... }
{ title: 'Taxi Driver',              dominantColor: '#2a1010', ... }
{ title: 'Nocturnal Animals',        dominantColor: '#2a1a28', ... }
{ title: 'Manchester by the Sea',    dominantColor: '#102030', ... }
{ title: 'Scarface',                 dominantColor: '#1a2810', ... }
{ title: 'Memories of a Murder',     dominantColor: '#181818', ... }
{ title: 'Blade Runner 2049',        dominantColor: '#101828', ... }
```

**Series:**
```ts
{ title: 'Breaking Bad',             dominantColor: '#282808', ... }
{ title: 'True Detective',           dominantColor: '#0a1a0a', ... }
{ title: 'The Leftovers',            dominantColor: '#181828', ... }
{ title: 'Black Mirror',             dominantColor: '#101010', ... }
{ title: 'Sherlock',                 dominantColor: '#101828', ... }
{ title: 'Severance',                dominantColor: '#101020', ... }
{ title: 'From',                     dominantColor: '#201010', ... }
{ title: 'Stranger Things',          dominantColor: '#200a30', ... }
```

**Games:**
```ts
{ title: 'The Last of Us Part II',   dominantColor: '#0a200a', ... }
{ title: 'Red Dead Redemption 2',    dominantColor: '#281808', ... }
{ title: 'God of War',               dominantColor: '#300808', ... }
{ title: 'Detroit: Become Human',    dominantColor: '#102030', ... }
{ title: 'The Witcher 3',            dominantColor: '#0a1a10', ... }
{ title: 'BioShock Remastered',      dominantColor: '#081828', ... }
{ title: 'Inmost',                   dominantColor: '#180820', ... }
```

**Music (square aspect):**
```ts
{ title: 'Amnesia',                  dominantColor: '#0a0a1a', ... }
{ title: 'Regret',                   dominantColor: '#1a0808', ... }
{ title: 'Chamber of Reflection',    dominantColor: '#081818', ... }
// ... etc
```

**Podcasts (square aspect):**
```ts
{ title: 'Huberman Lab',             dominantColor: '#081808', ... }
{ title: 'Jafekri',                  dominantColor: '#180818', ... }
// ... etc
```

---

## globals.css Changes

### Remove from `.hobby-item.active`:
```css
/* Remove this — no longer needed, card handles its own border */
0 0 0 1px rgba(251, 146, 60, 0.35)
```

### Keep everything else in `.hobby-item` / `.hobby-item.active` — the scale transform, filter, box-shadow depth.

### Update the active glow to be softer:
```css
.hobby-item.active {
  filter: none;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.4),
    0 16px 40px rgba(0, 0, 0, 0.6);
  /* Remove the orange ring — the bloom provides the accent color now */
}
```

### Remove `.hobby-item.active::before` (the old specular bar) — it's now inside the card JSX.

---

## Summary Checklist for Claude Code

- [ ] Add `dominantColor?: string` to `HobbyItem` interface in `content/hobbies.ts`
- [ ] Add `dominantColor` values to every item in `content/hobbies.ts` (see values above)
- [ ] In `HobbiesCarousel.tsx`, wrap each card in a relative container that holds the bloom `div` + glass card `div`
- [ ] Replace the card body (solid bg) with an `absolute`-positioned glass label using `backdropFilter`
- [ ] Add specular top-edge sheen layers (1px gradient bar + corner gradient) inside the cover area
- [ ] Add `.hobby-bloom` CSS to `globals.css`
- [ ] Add `.hobby-glass-card` CSS to `globals.css`
- [ ] Update `.hobby-item.active` in `globals.css` — remove orange ring, keep depth shadow
- [ ] Remove `.hobby-item.active::before` from `globals.css`
- [ ] **Do not touch** the carousel `useEffect` logic at all

---

## Visual Reference

The reference HTML prototype lives at:
`Hobbies Card Explorations.html` → **Option 02 — Liquid Glass** section

The key CSS classes to study are `.card-b`, `.card-b-glow`, `.card-b-glass`, `.card-b-glass::before` in that file.
