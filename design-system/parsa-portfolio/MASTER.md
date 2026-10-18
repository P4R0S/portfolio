# Design System: Parsa Rostamzadeh Portfolio

The visual language of [p4ros.de](https://www.p4ros.de): a researcher's portfolio at the meeting point of
machine learning and hardware. The code is the source of truth. Token values live in `app/globals.css`,
and the working conventions are in `AGENTS.md`. This file explains the system and the reasons behind it.
If it disagrees with the code, the code wins; update this file.

## Principles

1. **Warm and technical.** Charcoal and paper neutrals, with an ember-orange accent. The subject (circuits,
   signals, neural networks) supplies the imagery; there is no generic tech decoration.
2. **One accent, used sparingly.** Orange marks what matters: the primary action, the current state, a signal.
   Amber is its supporting color. Slate carries everything structural.
3. **Two equal themes.** Dark is the default; light ("Paper & Ember") is a full theme, not an inverted copy.
   Every color is a token with a value for each theme.
4. **Motion that means something.** Animations respond to the visitor or show how something works.
   No ambient decoration.
5. **Accessible by default.** Text contrast is at least 4.5:1 in both themes, focus rings are visible,
   reduced motion is respected, and the layout works from 375px to 1920px.

## Color

Components use semantic utilities (`bg-bg`, `text-fg-2`, `border-line`, …) or `var(--token)` in inline
styles. They never use raw palette classes or hex values.

| Role | Token | Dark | Light |
| --- | --- | --- | --- |
| Page background | `--bg` | `#18181b` | `#faf8f5` |
| Primary text | `--fg` | `#fafafa` | `#18181b` |
| Body text | `--fg-soft` / `--fg-2` | slate-300 / slate-400 | `#3f3f46` / `#52525b` |
| Captions, slate structure | `--fg-3` | `#7c8ca2` | `#6b6b74` |
| Cards, inputs (translucent) | `--surface` | white 5% | white 78% |
| Solid cards | `--raised` / `--raised-2` | `#27272a` / `#3f3f46` | `#ffffff` / `#f2eee8` |
| Hairlines | `--line` | white 10% | `#e7e2da` |
| Accent: icons, borders, tints | `--accent` | orange-400 | `#ea580c` |
| Accent: text | `--accent-fg` | orange-400 | `#c2410c` (passes AA) |
| Accent fill behind text | `--accent-tint` | orange 10% | `#fff4ec` |
| Supporting accent | `--warm` | amber-400 | `#b45309` |
| Solid orange button | `--cta` / `--cta-fg` | `#fb923c` / `#18181b` | `#c2410c` / `#ffffff` |
| Solid neutral button | `--btn` / `--btn-fg` | `#27272a` / `#fafafa` | `#18181b` / `#fafafa` |
| Form fields | `--field` / `--field-line` | black 22% / white 16% | `#ffffff` / `#d4ccc1` |
| Errors | `--danger` / `--danger-tint` | red-400 / red 10% | `#b91c1c` / `#fef2f2` |

Rules:
- Use `--accent-fg` for orange **text** and `--accent` for icons, borders and fills. Don't put opacity
  modifiers on text colors, because they break the contrast guarantees.
- Only one solid orange (`bg-cta`) element per view: the most important action.
- The **CV sheet** has its own `--cv-*` palette (paper, ink, burgundy `#8b2e2e`) and looks the same in both
  themes, like a printed page.
- The hero terminal has its own `--term-*` palette: an amber CRT in dark mode and "Paper Ember" (brown ink
  on warm paper, burnt-orange prompt) in light mode.
- These intentionally look the same in both themes: the 404 terminal, the CV sheet, the logo's chip body,
  and the hobby cover labels.

## Typography

| Use | Family | Notes |
| --- | --- | --- |
| Headings, numbers | Space Grotesk (`font-heading`) | 300–700; bold for section titles |
| Body, UI | DM Sans (`font-body`) | 400, 500, 700 (600 falls back to 700) |
| CV sheet | Crimson Pro, Commissioner | variable fonts, loaded only on `/cv` |
| Terminals | system monospace | |

- Section headers: a small uppercase caption in `text-fg-3`, then a heading with `GradientText` on the
  key words.
- Body copy is `text-sm` to `text-base` with `leading-relaxed`, in `text-fg-2`.

## Sizing and layout

- **Fluid scale.** The root font size is 16px up to a 1280px-wide window and grows to 24px at 1920px,
  so a 1080p screen shows the layout as if zoomed to 150%. Size everything in `rem`. Use `px` only for
  hairlines.
- Content width is `max-w-6xl`. Sections use `SectionWrapper` (`py-24`, fades up once on entry).
- Radius scale: `rounded-full` (pills, dots) · `rounded-lg` (small icons) · `rounded-xl` (buttons, inputs)
  · `rounded-2xl` (glass cards) · `rounded-[1.25rem]` (hobby covers) · `rounded-[2rem]` (Skills bento cards).
  Nested elements must use the same unit as their parent so the curves match.

## Components

| Component | Use |
| --- | --- |
| `GlassCard` | Translucent card (`bg-surface`, `border-line`, `rounded-2xl`, backdrop blur) for most content |
| `GradientText` | Orange gradient on heading words |
| `SectionWrapper` | Section spacing and the one-time entrance |
| `BackgroundLayer` | Global glow background, rendered once in the root layout |
| `Logo` | The chip monogram |
| `ExpandableText` | Long abstracts with "Read more" |
| `SectionDivider` | Animated motif between home sections (`trace`, `wave`, `timeline`, `network`, `approx`) |
| `CurvedArrow` | Hand-drawn arrow that points from the contact intro to the form |
| `ScrollTimeline` / `TimelineDot` | Experience timeline that fills as you scroll |

Buttons:
- **Primary action:** `bg-cta text-cta-fg hover:bg-cta-hover`, `rounded-xl`, semibold.
- **Neutral solid:** `bg-btn text-btn-fg hover:bg-btn-hover`.
- **Accent outline:** `bg-accent-tint border-accent/30 text-accent-fg`, as used by the navbar's Contact link.

Forms: `bg-field border-field-line rounded-xl`. Labels go above the fields. Placeholders give hints and
never repeat the label. Errors appear inline under the field (`text-danger`, `aria-describedby`), and a
2px focus outline with offset is shown on every control.

## Motion

- Decorative animations are **SVG strokes** in slate (`--fg-3`) with an amber or orange signal.
  Each one is drawn from the subject: PCB traces, waveforms, neural networks, quantized signals.
- An animation draws in **once** when scrolled into view. Loops run **only while visible**.
- Motion that responds to the visitor is preferred: hover traces on project cards, the navbar scrollspy
  underline, the scroll-filled timeline, and the checkmark on the send button.
- **Reduced motion:** framer-motion uses `MotionConfig reducedMotion="user"` plus `useReducedMotion()`
  for drawn strokes. CSS keyframes are shortened by the global `prefers-reduced-motion` rule.
  Everything must still look complete when it doesn't move.
- Avoid fade-and-slide entrances on every element, animated backgrounds, and layout-shifting hovers.

## Checklist before shipping UI

- [ ] Colors come from tokens and work in **both** themes
- [ ] Sizes in `rem`; nested radii match
- [ ] Text contrast is at least 4.5:1; focus is visible; every control is reachable by keyboard
- [ ] Reduced motion leaves a complete, still result
- [ ] Checked at 375px, 768px, 1280px and 1920px, with no horizontal scroll
- [ ] `npm run lint` and `npm run build` pass
