# Hero Terminal Widget — Design Spec

**Date:** 2026-04-15
**Status:** Approved — ready for implementation planning

---

## Overview

Add a floating, interactive terminal widget to the right column of the Hero section. The main glassmorphism portfolio design (on `main` branch) stays as the primary experience. The terminal widget is an accent — a personality statement that technically-minded visitors can interact with.

The full-page terminal (on `terminal-overhaul` branch) is preserved but not used as the primary UI.

---

## Layout

**Desktop:** Two-column hero
- **Left column** (flex 1.1): existing content — eyebrow text, name, animated role switcher, description, CTA buttons, stat cards. Unchanged.
- **Right column** (flex 1): `<HeroTerminal />` component, centered vertically.

**Mobile:** Single column — terminal stacks below the left column content. Tilt removed on mobile. Hidden on screens smaller than `sm` (375px) if it causes layout issues.

**Hero section change:** `Hero.tsx` restructures from centered single-column to a flex two-column layout. The existing left-column content is wrapped in a `<div>` — no other changes to that content.

---

## Terminal Widget Visual Design

- **Background:** `rgba(13, 8, 0, 0.94)` — near-black with amber undertone
- **Border:** `1px solid rgba(255, 179, 0, 0.22)` — amber, subtle
- **Border radius:** `12px`
- **Transform:** `rotate(2deg)` — slight clockwise tilt for "floating window" feel. Removed on mobile.
- **Box shadow:** `0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,179,0,0.07), 0 0 30px rgba(255,140,0,0.06)` — deep shadow + faint amber glow
- **Scanlines:** `::before` pseudo-element with `repeating-linear-gradient` at 4px intervals, `rgba(255,179,0,0.015)` — subtle CRT texture on the widget only
- **Width:** 100% of right column, max ~300px

**Chrome bar:**
- Background: `rgba(10, 6, 0, 0.95)`
- Traffic light dots: `#ff5f57`, `#febc2e`, `#28c840`
- Title: `paros@paderborn — portfolio v2.0` in `#3d2800`

**Text palette (Fira Code or Courier New fallback):**
- Prompt: `#ffb300`
- Command text: `#ffd54f`
- Output: `#ff8f00`
- Dim/decorative: `#3d2800`
- Headers/bright: `white`

**Font size:** `9px` body lines, `8px` chrome title

---

## Entry State (on load)

Silent — no auto-typing. The terminal loads showing:

```
Type a command. Try `help`
paros@paderborn:~$ █
```

The cursor blinks. No animation until the user types.

**Framer Motion entrance:** When the hero section enters the viewport (`whileInView`), the terminal widget slides in from the right (`x: 40 → 0`) with a fade (`opacity: 0 → 1`), `duration: 0.6s`, `ease: easeOut`, `delay: 0.3s` (after the left column has settled).

---

## Commands (4 total)

### `help`
```
Available commands:
  whoami      — who is this person?
  skills      — technical skills by category
  open github — open github.com/P4R0S
  help        — show this message
  clear       — clear the terminal
```

### `whoami`
```
Parsa Rostamzadeh
PhD Researcher — ML Systems & Approximate Computing
Paderborn University · github.com/P4R0S
```

### `skills`
```
──────────────────────────────────────
[ Languages ]
  Python · C · C++ · Verilog · TypeScript
[ ML / AI ]
  PyTorch · GNN · XAI · scikit-learn
[ Hardware ]
  FPGA · RTL Design · Approx. Circuits
[ Tools ]
  Git · Linux · Docker · HPC/SLURM
──────────────────────────────────────
```

### `open github`
Opens `https://github.com/P4R0S` in a new tab. Outputs:
```
Opening github.com/P4R0S...
```

### `clear`
Clears all output, resets to initial hint state.

**Unknown command:**
```
command not found: <cmd>
Try `help` to see available commands.
```

---

## Interaction

- **Click anywhere in widget** → focuses the hidden `<input>` element
- **Enter** → submit command
- **ArrowUp / ArrowDown** → navigate local command history (simple array, no ring buffer needed for 4 commands)
- **Tab** → autocomplete from `['help', 'whoami', 'skills', 'open github', 'clear']`
- **Output animation:** Each output line types character-by-character at 20ms/char using `requestAnimationFrame`. Blank/separator lines appear instantly.

---

## Architecture

**Files:**
```
components/terminal/HeroTerminal.tsx   — self-contained widget component (new)
lib/terminal/types.ts                  — cherry-picked from terminal-overhaul branch
lib/terminal/parser.ts                 — cherry-picked from terminal-overhaul branch
```

**Modify:**
```
components/sections/Hero.tsx           — restructure to two-column, add <HeroTerminal />
```

**`HeroTerminal.tsx` internals:**
- `'use client'` directive
- State: `lines: OutputLine[]`, `input: string`, `isAnimating: boolean`
- Refs: `inputRef` (hidden input for focus), `bottomRef` (scroll-to-bottom), `historyRef` (string array + index)
- 4 inline command handlers returning `OutputLine[]`
- Inline typewriter using `requestAnimationFrame` at 20ms/char
- Framer Motion `motion.div` with `whileInView` entrance animation

**No shared context, no command registry, no external hooks.** Everything lives inside `HeroTerminal.tsx`.

**Cherry-picking from `terminal-overhaul`:**
```bash
git checkout terminal-overhaul -- lib/terminal/types.ts lib/terminal/parser.ts
```

---

## What is NOT in scope

- send-mail form
- Boot sequence
- Research / projects cat commands
- CRT toggle
- Softkey bar
- Any navigation outside the hero section
- Any changes to the glassmorphism sections (About, Projects, Skills, etc.)
