# Terminal Portfolio Overhaul — Design Spec
**Date:** 2026-04-15
**Author:** Parsa Rostamzadeh
**Status:** Approved — ready for implementation

---

## 1. Vision

Replace the current glassmorphism/card-based portfolio with a full-immersion retro terminal experience. The visitor lands inside a Unix-style shell and navigates the portfolio entirely by typing commands. There are no nav links, no section cards, no scroll animations — just a blinking amber cursor and a prompt.

This is not a decorative terminal widget on top of a normal site. The terminal *is* the site.

---

## 2. Design Decisions (Locked)

| Decision | Choice |
|---|---|
| Style direction | Full immersion retro terminal (CLI only) |
| Navigation model | Fully interactive CLI — visitor types real commands |
| Color palette | Amber / Vintage CRT |
| Animation style | Character-by-character typewriter (~40ms/char) |
| Implementation approach | Full replacement of presentation layer |

---

## 3. Color Palette

| Role | Hex | Usage |
|---|---|---|
| Background | `#0d0800` | Terminal background (near-black with warm tint) |
| Page background | `#0a0a0f` | Root page behind terminal |
| Prompt | `#ffb300` | `paros@paderborn:~$` prompt, cursor |
| Command text | `#ffd54f` | User input, command names |
| Output | `#ff8f00` | Command output, values |
| Dim / decorative | `#3d2800` | Dividers, dim text, inactive labels |
| Highlight / white | `#ffffff` bold | Important values, headers |
| Border | `#1a1000` | Terminal container border |

CRT scanline overlay: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,179,0,0.018) 3px, rgba(255,179,0,0.018) 4px)` applied as `::before` pseudo-element on the terminal body.

---

## 4. Typography

- **Primary font:** Fira Code (Google Fonts, weights 400 + 700)
- **Fallback:** `'Courier New', monospace`
- **Font size:** 11px desktop, 12px mobile (minimum for readability)
- **Line height:** 1.75
- No serif or sans-serif fonts anywhere on the page

---

## 5. Terminal UI

### 5.1 Chrome

Every terminal has a macOS-style chrome bar:
- Three traffic-light dots: `#ff5f57` (red), `#febc2e` (yellow), `#28c840` (green)
- Tab title in dim amber monospace: e.g. `paros@paderborn — portfolio v2.0`

### 5.2 Prompt format

```
paros@paderborn:~$ _
```

- `paros@paderborn` in `#ffb300`
- `:~$` in `#3d2800`
- Input text in `#ffd54f`
- Blinking amber block cursor: 7×13px, `#ffb300`, 1s blink cycle

### 5.3 Viewport

- Terminal fills `100dvh` (not `100vh` — handles mobile keyboard push correctly)
- Output area scrolls inside the terminal container
- Outermost page background: `#0a0a0f`

---

## 6. Command Set

All commands read from existing `content/*.ts` data files — no data layer changes.

| Command | Output | Source |
|---|---|---|
| `help` | Lists all available commands with descriptions | Static |
| `neofetch` | ASCII art logo + name, role, institution, specialisation, email | Inline constants (no `about.ts` exists) |
| `about` | Multi-line bio text | Inline constants |
| `ls projects/` | Directory listing of all projects with one-line comments | `content/projects.ts` |
| `cat projects/<name>.md` | Full project detail: status, type, stack tags, description, GitHub link | `content/projects.ts` |
| `ls research/` | List of publications | `content/publications.ts` |
| `cat research/<slug>.md` | Full publication detail | `content/publications.ts` |
| `skills` | Skill tree with ASCII progress bars grouped by category | `content/skills.ts` |
| `history` | Experience timeline, newest first, with role/org/bullets | `content/experience.ts` |
| `contact` | vCard-format contact info + inline `send-mail` form | Static + `app/api/contact/` |
| `send-mail` | Interactive mail: Name → Subject → Body → y/n confirm → POST to API | `app/api/contact/` |
| `open github` | Opens `https://github.com/P4R0S` in new tab | Static |
| `clear` | Clears all output, resets to fresh prompt | Built-in |
| `crt off` / `crt on` | Toggles CRT scanline overlay | Built-in |

Tab completion: command names + project/research filenames.
Command history: ↑/↓ arrows navigate previous inputs.

---

## 7. Animation System

### 7.1 Boot sequence (first load only)

Runs once on first page visit (not on refresh). Sequence:
1. BIOS-style lines appear step-by-step (100–300ms gaps): `BIOS v2.4.1`, `RAM: OK`, `CPU: OK`, `Loading kernel modules...`
2. Welcome box: `PAROS-PORTFOLIO v2.0` + name + institution
3. Progress bar fills: `Loading profile: [████████████████████] 100%`
4. Divider line
5. Prompt appears: `paros@paderborn:~$`
6. `Last login:` line auto-types
7. Hint line: `Type \`help\` to see available commands. Tab to autocomplete.`

Stored in `sessionStorage` — if already seen this session, skip directly to prompt.

### 7.2 Command output

- Output types line-by-line at ~20ms per character (faster than input typewriter)
- Long outputs stream at full line speed without per-character delay
- User can press **Enter** at any time to skip remaining animation and show all output instantly
- After output completes, new prompt appears

### 7.3 User input

- Characters appear immediately as typed (no animation on input)
- Blinking cursor animates continuously

### 7.4 prefers-reduced-motion

When `prefers-reduced-motion: reduce` is set:
- All typewriter and boot animations are disabled
- All output appears instantly
- Blinking cursor still animates (respects OS pref — this is still considered safe)

---

## 8. Mobile Handling

### 8.1 Softkey bar

A fixed bar at the bottom of the screen with 6 tap-to-run buttons:
`neofetch` | `ls projects/` | `skills` | `history` | `contact` | `clear`

Tapping a button injects the command into the input and submits it — equivalent to typing it. Visible only on touch devices (or always, as it doesn't hurt desktop either).

### 8.2 Keyboard / viewport

- `100dvh` prevents content disappearing under the software keyboard
- Terminal output scroll: `-webkit-overflow-scrolling: touch` for momentum scroll on iOS
- Font size: 12px minimum on mobile (up from 11px desktop)
- No horizontal scroll — all output wraps

### 8.3 Tab completion on mobile

Tab key unavailable on most mobile keyboards. Softkey bar replaces this need — no broken UX.

---

## 9. SEO & Accessibility

- A hidden `<main>` element with `aria-hidden="false"` contains pre-rendered text of all content (name, projects, skills, bio)
- Screen readers can navigate this content without interacting with the terminal
- The terminal itself gets `role="application"` with descriptive `aria-label`
- Color contrast: amber on near-black passes WCAG AA for large text; `#ffb300` on `#0d0800` = ~7.5:1 ratio
- All interactive elements keyboard-accessible (the terminal input is always focused)

---

## 10. Architecture

### 10.1 New components

```
components/terminal/
  Terminal.tsx          — Root container, layout, CRT overlay
  TerminalEngine.tsx    — React context: history, output buffer, running state
  PromptInput.tsx       — Input line with cursor, handles keydown
  OutputRenderer.tsx    — Streams command result lines with typewriter
  BootSequence.tsx      — First-load boot animation
  SoftkeyBar.tsx        — Mobile tap-to-run buttons

lib/terminal/
  parser.ts             — Maps input string → { command, args }
  autocomplete.ts       — Tab completion logic
  history.ts            — Command history (↑/↓)
  typewriter.ts         — Typewriter animation utilities
  commands/
    index.ts            — Command registry
    neofetch.ts
    projects.ts
    research.ts
    skills.ts
    experience.ts       — history command (named experience.ts to avoid clash with lib/terminal/history.ts)
    contact.ts
    sendmail.ts
    system.ts           — help, clear, open, crt
```

### 10.2 Deleted

All existing section components:
- `components/sections/Hero.tsx`
- `components/sections/About.tsx`
- `components/sections/Projects.tsx`
- `components/sections/Skills.tsx`
- `components/sections/Experience.tsx`
- `components/sections/Publications.tsx`
- `components/sections/Contact.tsx`
- `components/sections/Blog.tsx`
- `components/ui/Navbar.tsx`
- `components/ui/Footer.tsx`

### 10.3 Kept unchanged

- `content/projects.ts`
- `content/skills.ts`
- `content/experience.ts`
- `content/publications.ts`
- `content/blog/*.mdx`
- `app/api/contact/route.ts`
- `next.config.ts`
- Tailwind v4 config
- Vercel deployment config

### 10.4 Modified

- `app/layout.tsx` — stripped to minimal shell, amber background, Fira Code font
- `app/page.tsx` — renders only `<Terminal />`, wrapped in `<TerminalEngine>`
- `app/globals.css` — CRT scanline CSS, amber palette tokens, remove old design tokens

---

## 11. Contact Flow

The `contact` command shows vCard-format info. The `send-mail` command (or typing `send-mail` at the prompt) starts an interactive inline form:

```
send-mail> From (your name): _
send-mail> Subject: _
send-mail> Message: _
send-mail> Send? [y/n]: _
```

On `y`: POSTs to `app/api/contact/route.ts` (existing endpoint, unchanged). Shows `Message sent. 250 OK.` on success or an error line on failure.

---

## 12. Implementation Phases

| Phase | What | Key files |
|---|---|---|
| 1 | Shell scaffold — layout, palette, CRT | `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `Terminal.tsx`, `TerminalEngine.tsx` |
| 2 | Input layer — prompt, cursor, history, tab | `PromptInput.tsx`, `lib/terminal/history.ts`, `lib/terminal/autocomplete.ts` |
| 3 | Parser + output renderer + typewriter | `lib/terminal/parser.ts`, `OutputRenderer.tsx`, `lib/terminal/typewriter.ts` |
| 4 | All commands wired to content | `lib/terminal/commands/`, reads from `content/*.ts` |
| 5 | Boot sequence + mobile + polish | `BootSequence.tsx`, `SoftkeyBar.tsx`, `prefers-reduced-motion`, `crt` toggle |

---

## 13. Out of Scope

- Blog post display (future: `cat blog/<slug>.md` command could be added)
- Dark/light mode toggle (terminal is always dark)
- Internationalization
- Any changes to the data layer (`content/*.ts`)
- Any changes to the contact API route
