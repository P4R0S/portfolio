# Terminal Portfolio Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the glassmorphism portfolio with a full-immersion retro terminal UI where visitors navigate via typed CLI commands.

**Architecture:** A single React context (`TerminalEngine`) owns all terminal state (output buffer, animation state, send-mail flow, CRT toggle). Commands are pure functions that return `OutputLine[]`. The `OutputRenderer` streams those lines character-by-character using a custom typewriter hook. The old section components and UI components are deleted entirely; only the `content/*.ts` data layer and `app/api/contact/` are kept.

**Tech Stack:** Next.js 16 App Router · Tailwind v4 · Framer Motion (typewriter only) · Fira Code font · Vitest (unit tests for pure lib functions) · Resend (existing contact API, unchanged)

---

## File Map

**Create:**
```
lib/terminal/types.ts
lib/terminal/parser.ts
lib/terminal/history.ts
lib/terminal/autocomplete.ts
lib/terminal/typewriter.ts
lib/terminal/commands/index.ts
lib/terminal/commands/system.ts
lib/terminal/commands/neofetch.ts
lib/terminal/commands/projects.ts
lib/terminal/commands/skills.ts
lib/terminal/commands/experience.ts
lib/terminal/commands/contact.ts
lib/terminal/commands/sendmail.ts
lib/terminal/commands/research.ts
components/terminal/TerminalEngine.tsx
components/terminal/Terminal.tsx
components/terminal/PromptInput.tsx
components/terminal/OutputRenderer.tsx
components/terminal/BootSequence.tsx
components/terminal/SoftkeyBar.tsx
lib/terminal/__tests__/parser.test.ts
lib/terminal/__tests__/history.test.ts
lib/terminal/__tests__/autocomplete.test.ts
vitest.config.ts
```

**Modify:**
```
app/globals.css           — full rewrite: amber palette tokens, CRT CSS, remove old tokens
app/layout.tsx            — Fira Code font, remove Navbar/Footer, new bg
app/page.tsx              — renders only <Terminal />
package.json              — add vitest + @vitejs/plugin-react
```

**Delete (Task 18):**
```
components/sections/Hero.tsx
components/sections/About.tsx
components/sections/Skills.tsx
components/sections/Projects.tsx
components/sections/Experience.tsx
components/sections/Publications.tsx
components/sections/BlogSection.tsx
components/sections/Contact.tsx
components/ui/Navbar.tsx
components/ui/Footer.tsx
components/ui/GlassCard.tsx
components/ui/GradientText.tsx
components/ui/SectionWrapper.tsx
```

**Keep unchanged:**
```
content/projects.ts
content/skills.ts
content/experience.ts
content/publications.ts
content/blog/
app/api/contact/route.ts
app/blog/
lib/blog.ts
lib/utils.ts
next.config.ts
```

---

## Task 1: Dev tooling + amber globals.css

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Modify: `app/globals.css` (full rewrite)

- [ ] **Step 1: Install vitest**

```bash
cd /path/to/portfolio
npm install --save-dev vitest @vitejs/plugin-react
```

- [ ] **Step 2: Create vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 3: Rewrite globals.css with amber palette**

Replace the entire contents of `app/globals.css` with:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Amber terminal palette */
  --color-term-bg: #0d0800;
  --color-page-bg: #0a0a0f;
  --color-amber-prompt: #ffb300;
  --color-amber-cmd: #ffd54f;
  --color-amber-out: #ff8f00;
  --color-amber-dim: #3d2800;
  --color-amber-border: #1a1000;
  --color-amber-chrome: #0a0600;

  /* Fonts */
  --font-mono: var(--font-fira-code), 'Courier New', monospace;

  /* Cursor blink */
  --animate-cursor-blink: cursor-blink 1s step-end infinite;

  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* Boot sequence appear */
  --animate-boot-appear: boot-appear 0.1s step-end forwards;
  @keyframes boot-appear {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

html {
  color-scheme: dark;
}

body {
  background-color: #0a0a0f;
  color: #ffd54f;
  font-family: var(--font-mono);
  overflow-x: hidden;
}

/* CRT scanline overlay — applied via .crt-enabled class on terminal container */
.crt-enabled {
  position: relative;
}
.crt-enabled::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(255, 179, 0, 0.018) 3px,
    rgba(255, 179, 0, 0.018) 4px
  );
  pointer-events: none;
  z-index: 10;
}

/* Reduced motion: disable all typewriter and boot animations */
@media (prefers-reduced-motion: reduce) {
  .typewriter-char { animation: none !important; opacity: 1 !important; }
  .boot-line { animation: none !important; opacity: 1 !important; }
}
```

- [ ] **Step 4: Verify CSS compiles**

```bash
npm run build 2>&1 | head -20
```

Expected: build may fail due to missing Terminal component (that's fine), but should not show CSS errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css vitest.config.ts package.json package-lock.json
git commit -m "feat: amber terminal palette + vitest setup"
```

---

## Task 2: Shared types + parser (TDD)

**Files:**
- Create: `lib/terminal/types.ts`
- Create: `lib/terminal/parser.ts`
- Create: `lib/terminal/__tests__/parser.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `lib/terminal/__tests__/parser.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { parse } from '../parser'

describe('parse', () => {
  it('handles bare command', () => {
    expect(parse('help')).toEqual({ command: 'help', args: [] })
  })

  it('handles command with path arg', () => {
    expect(parse('ls projects/')).toEqual({ command: 'ls', args: ['projects/'] })
  })

  it('handles cat with filename', () => {
    expect(parse('cat projects/CLAS.md')).toEqual({
      command: 'cat',
      args: ['projects/CLAS.md'],
    })
  })

  it('handles two-word command', () => {
    expect(parse('open github')).toEqual({ command: 'open', args: ['github'] })
  })

  it('handles crt toggle', () => {
    expect(parse('crt off')).toEqual({ command: 'crt', args: ['off'] })
  })

  it('trims whitespace', () => {
    expect(parse('  help  ')).toEqual({ command: 'help', args: [] })
  })

  it('empty string returns empty command', () => {
    expect(parse('')).toEqual({ command: '', args: [] })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run lib/terminal/__tests__/parser.test.ts
```

Expected: FAIL — `Cannot find module '../parser'`

- [ ] **Step 3: Create shared types**

Create `lib/terminal/types.ts`:
```ts
export type OutputColor =
  | 'prompt'   // #ffb300 — prompt text
  | 'cmd'      // #ffd54f — command / user input
  | 'output'   // #ff8f00 — standard output
  | 'dim'      // #3d2800 — separators, decorative
  | 'white'    // #ffffff bold — headers, emphasis
  | 'plain'    // default amber

export interface OutputLine {
  text: string
  color?: OutputColor
  bold?: boolean
  /** If true, render as a blank spacer line */
  blank?: boolean
}

export interface ParsedCommand {
  command: string
  args: string[]
}

export type SendMailStep = 'name' | 'email' | 'message' | 'confirm'

export interface SendMailState {
  step: SendMailStep
  name?: string
  email?: string
  message?: string
}
```

- [ ] **Step 4: Implement parser**

Create `lib/terminal/parser.ts`:
```ts
import type { ParsedCommand } from './types'

export function parse(input: string): ParsedCommand {
  const trimmed = input.trim()
  if (!trimmed) return { command: '', args: [] }
  const parts = trimmed.split(/\s+/)
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1),
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx vitest run lib/terminal/__tests__/parser.test.ts
```

Expected: PASS — all 7 tests green

- [ ] **Step 6: Commit**

```bash
git add lib/terminal/types.ts lib/terminal/parser.ts lib/terminal/__tests__/parser.test.ts
git commit -m "feat: terminal types + parser (TDD)"
```

---

## Task 3: Command history ring buffer (TDD)

**Files:**
- Create: `lib/terminal/history.ts`
- Create: `lib/terminal/__tests__/history.test.ts`

- [ ] **Step 1: Write failing tests**

Create `lib/terminal/__tests__/history.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { createHistory } from '../history'

describe('createHistory', () => {
  it('starts empty with index -1', () => {
    const h = createHistory()
    expect(h.getAll()).toEqual([])
    expect(h.navigate('up')).toBe(null)
  })

  it('push adds entries and navigating up returns newest first', () => {
    const h = createHistory()
    h.push('help')
    h.push('ls projects/')
    expect(h.navigate('up')).toBe('ls projects/')
    expect(h.navigate('up')).toBe('help')
    expect(h.navigate('up')).toBe('help') // clamp at oldest
  })

  it('navigate down after up returns newer entry', () => {
    const h = createHistory()
    h.push('help')
    h.push('skills')
    h.navigate('up') // skills
    h.navigate('up') // help
    expect(h.navigate('down')).toBe('skills')
    expect(h.navigate('down')).toBe(null) // past newest → null (clear input)
  })

  it('reset clears navigation index', () => {
    const h = createHistory()
    h.push('help')
    h.navigate('up')
    h.reset()
    expect(h.navigate('down')).toBe(null)
  })

  it('does not push duplicate of most recent entry', () => {
    const h = createHistory()
    h.push('help')
    h.push('help')
    expect(h.getAll()).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run lib/terminal/__tests__/history.test.ts
```

Expected: FAIL — `Cannot find module '../history'`

- [ ] **Step 3: Implement history**

Create `lib/terminal/history.ts`:
```ts
export interface HistoryManager {
  push: (entry: string) => void
  navigate: (direction: 'up' | 'down') => string | null
  reset: () => void
  getAll: () => string[]
}

export function createHistory(): HistoryManager {
  const entries: string[] = []
  let index = -1 // -1 means "at current input"

  return {
    push(entry: string) {
      if (!entry.trim()) return
      if (entries[0] === entry) return // deduplicate most recent
      entries.unshift(entry)
      index = -1
    },

    navigate(direction: 'up' | 'down'): string | null {
      if (entries.length === 0) return null
      if (direction === 'up') {
        index = Math.min(index + 1, entries.length - 1)
        return entries[index]
      } else {
        index = index - 1
        if (index < 0) {
          index = -1
          return null // signal to clear input
        }
        return entries[index]
      }
    },

    reset() {
      index = -1
    },

    getAll() {
      return [...entries]
    },
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run lib/terminal/__tests__/history.test.ts
```

Expected: PASS — all 5 tests green

- [ ] **Step 5: Commit**

```bash
git add lib/terminal/history.ts lib/terminal/__tests__/history.test.ts
git commit -m "feat: command history ring buffer (TDD)"
```

---

## Task 4: Autocomplete (TDD)

**Files:**
- Create: `lib/terminal/autocomplete.ts`
- Create: `lib/terminal/__tests__/autocomplete.test.ts`

- [ ] **Step 1: Write failing tests**

Create `lib/terminal/__tests__/autocomplete.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { complete } from '../autocomplete'

describe('complete', () => {
  it('completes a command prefix', () => {
    expect(complete('ne')).toBe('neofetch')
  })

  it('completes ls prefix', () => {
    expect(complete('ls pro')).toBe('ls projects/')
  })

  it('completes cat with project filename', () => {
    expect(complete('cat projects/CL')).toBe('cat projects/CLAS.md')
  })

  it('completes cat with research filename', () => {
    expect(complete('cat research/approx')).toBe('cat research/approx-nn-2024.md')
  })

  it('returns null when no match', () => {
    expect(complete('zzz')).toBe(null)
  })

  it('returns null for empty input', () => {
    expect(complete('')).toBe(null)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run lib/terminal/__tests__/autocomplete.test.ts
```

Expected: FAIL — `Cannot find module '../autocomplete'`

- [ ] **Step 3: Implement autocomplete**

Create `lib/terminal/autocomplete.ts`:
```ts
const COMMANDS = [
  'help',
  'neofetch',
  'about',
  'ls projects/',
  'ls research/',
  'skills',
  'history',
  'contact',
  'send-mail',
  'open github',
  'clear',
  'crt off',
  'crt on',
]

const PROJECT_FILES = [
  'CLAS.md',
  'BLASYS.md',
  'Partioning.md',
  'PubMed_GNN.md',
  'Reservoir.md',
  'Neural_Scratch.md',
  'CIRCA_evo.md',
]

const RESEARCH_FILES = [
  'approx-nn-2024.md',
  'hw-quant-llm-2024.md',
  'approx-mult-fpga-2023.md',
  'survey-approx-ml-2023.md',
  'sparse-attn-2023.md',
]

export function complete(input: string): string | null {
  if (!input.trim()) return null

  // cat projects/<prefix>
  const projectCatMatch = input.match(/^cat projects\/(.*)$/)
  if (projectCatMatch) {
    const prefix = projectCatMatch[1]
    const match = PROJECT_FILES.find((f) =>
      f.toLowerCase().startsWith(prefix.toLowerCase())
    )
    return match ? `cat projects/${match}` : null
  }

  // cat research/<prefix>
  const researchCatMatch = input.match(/^cat research\/(.*)$/)
  if (researchCatMatch) {
    const prefix = researchCatMatch[1]
    const match = RESEARCH_FILES.find((f) =>
      f.toLowerCase().startsWith(prefix.toLowerCase())
    )
    return match ? `cat research/${match}` : null
  }

  // top-level command completion
  const lower = input.toLowerCase()
  const match = COMMANDS.find((c) => c.toLowerCase().startsWith(lower))
  return match ?? null
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run lib/terminal/__tests__/autocomplete.test.ts
```

Expected: PASS — all 6 tests green

- [ ] **Step 5: Run all tests**

```bash
npx vitest run
```

Expected: All tests pass (parser + history + autocomplete = 18 tests)

- [ ] **Step 6: Commit**

```bash
git add lib/terminal/autocomplete.ts lib/terminal/__tests__/autocomplete.test.ts
git commit -m "feat: tab autocomplete for commands and filenames (TDD)"
```

---

## Task 5: Typewriter hook

**Files:**
- Create: `lib/terminal/typewriter.ts`

The typewriter hook takes an array of `OutputLine[]` and streams them character-by-character. It uses `requestAnimationFrame` (not `setInterval`) for smooth timing, respects `prefers-reduced-motion`, and exposes a `skip()` method to show all content instantly.

- [ ] **Step 1: Create typewriter hook**

Create `lib/terminal/typewriter.ts`:
```ts
import { useState, useEffect, useRef, useCallback } from 'react'
import type { OutputLine } from './types'

interface TypewriterState {
  /** Lines fully or partially revealed */
  visibleLines: OutputLine[]
  /** Index of line currently being typed */
  currentLineIndex: number
  /** Character index within current line */
  currentCharIndex: number
  done: boolean
}

interface UseTypewriterReturn {
  visibleLines: OutputLine[]
  done: boolean
  skip: () => void
}

const CHAR_DELAY_MS = 20

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useTypewriter(
  lines: OutputLine[],
  enabled: boolean
): UseTypewriterReturn {
  const [state, setState] = useState<TypewriterState>({
    visibleLines: [],
    currentLineIndex: 0,
    currentCharIndex: 0,
    done: false,
  })

  const skipRef = useRef(false)
  const linesRef = useRef(lines)
  linesRef.current = lines

  const skip = useCallback(() => {
    skipRef.current = true
    setState({
      visibleLines: linesRef.current,
      currentLineIndex: linesRef.current.length,
      currentCharIndex: 0,
      done: true,
    })
  }, [])

  useEffect(() => {
    if (!enabled || lines.length === 0) {
      setState({ visibleLines: lines, currentLineIndex: lines.length, currentCharIndex: 0, done: true })
      return
    }

    // Reduced motion: show everything immediately
    if (prefersReducedMotion()) {
      setState({ visibleLines: lines, currentLineIndex: lines.length, currentCharIndex: 0, done: true })
      return
    }

    skipRef.current = false
    setState({ visibleLines: [], currentLineIndex: 0, currentCharIndex: 0, done: false })

    let lineIdx = 0
    let charIdx = 0
    let lastTime = 0
    let rafId: number

    function tick(timestamp: number) {
      if (skipRef.current) return

      if (lineIdx >= lines.length) {
        setState((s) => ({ ...s, done: true }))
        return
      }

      if (timestamp - lastTime < CHAR_DELAY_MS) {
        rafId = requestAnimationFrame(tick)
        return
      }
      lastTime = timestamp

      const currentLine = lines[lineIdx]

      // Blank lines and lines with no text advance instantly
      if (currentLine.blank || currentLine.text.length === 0) {
        setState((prev) => ({
          ...prev,
          visibleLines: [...lines.slice(0, lineIdx + 1)],
          currentLineIndex: lineIdx + 1,
          currentCharIndex: 0,
        }))
        lineIdx++
        charIdx = 0
        rafId = requestAnimationFrame(tick)
        return
      }

      charIdx++

      if (charIdx >= currentLine.text.length) {
        // Line complete — advance to next
        setState((prev) => ({
          ...prev,
          visibleLines: lines.slice(0, lineIdx + 1),
          currentLineIndex: lineIdx + 1,
          currentCharIndex: 0,
        }))
        lineIdx++
        charIdx = 0
      } else {
        // Partial line
        const partialLine: OutputLine = {
          ...currentLine,
          text: currentLine.text.slice(0, charIdx),
        }
        setState((prev) => ({
          ...prev,
          visibleLines: [...lines.slice(0, lineIdx), partialLine],
          currentCharIndex: charIdx,
        }))
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [lines, enabled])

  return { visibleLines: state.visibleLines, done: state.done, skip }
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors (or only errors from unwritten components, not from typewriter.ts itself)

- [ ] **Step 3: Commit**

```bash
git add lib/terminal/typewriter.ts
git commit -m "feat: useTypewriter hook with reduced-motion support"
```

---

## Task 6: TerminalEngine context

**Files:**
- Create: `components/terminal/TerminalEngine.tsx`

This is the central React context. It holds: output history, animation state, CRT toggle, send-mail state, and exposes `execCommand`, `skipAnimation`, `appendOutput`.

- [ ] **Step 1: Create TerminalEngine**

Create `components/terminal/TerminalEngine.tsx`:
```tsx
'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from 'react'
import type { OutputLine, SendMailState } from '@/lib/terminal/types'
import { createHistory, type HistoryManager } from '@/lib/terminal/history'

interface TerminalContextType {
  /** All output blocks — each block is one command's output */
  outputBlocks: { input: string; lines: OutputLine[] }[]
  /** Currently animating lines (null when idle) */
  animatingLines: OutputLine[] | null
  crtEnabled: boolean
  sendMailState: SendMailState | null
  historyManager: HistoryManager
  execCommand: (input: string) => void
  skipAnimation: () => void
  setCrtEnabled: (v: boolean) => void
  setSendMailState: (s: SendMailState | null) => void
  /** Append lines to the current animating block (used by sendmail multi-step) */
  appendToOutput: (lines: OutputLine[]) => void
  /** Called by OutputRenderer when animation for current block completes */
  onAnimationComplete: () => void
}

const TerminalContext = createContext<TerminalContextType | null>(null)

export function useTerminal(): TerminalContextType {
  const ctx = useContext(TerminalContext)
  if (!ctx) throw new Error('useTerminal must be used inside TerminalEngine')
  return ctx
}

// Commands are registered lazily to avoid circular imports
type CommandFn = (args: string[], ctx: TerminalContextType) => OutputLine[] | Promise<OutputLine[]>
const commandRegistry = new Map<string, CommandFn>()

export function registerCommand(name: string, fn: CommandFn) {
  commandRegistry.set(name, fn)
}

export function TerminalEngine({ children }: { children: ReactNode }) {
  const [outputBlocks, setOutputBlocks] = useState<{ input: string; lines: OutputLine[] }[]>([])
  const [animatingLines, setAnimatingLines] = useState<OutputLine[] | null>(null)
  const [crtEnabled, setCrtEnabled] = useState(true)
  const [sendMailState, setSendMailState] = useState<SendMailState | null>(null)
  const historyManager = useRef(createHistory()).current
  const queueRef = useRef<{ input: string; lines: OutputLine[] }[]>([])
  const isAnimating = useRef(false)

  const flushQueue = useCallback(() => {
    if (isAnimating.current || queueRef.current.length === 0) return
    const next = queueRef.current.shift()!
    isAnimating.current = true
    setOutputBlocks((prev) => [...prev, { input: next.input, lines: [] }])
    setAnimatingLines(next.lines)
  }, [])

  const onAnimationComplete = useCallback(() => {
    // Move animating lines into the last outputBlock as completed
    setOutputBlocks((prev) => {
      const updated = [...prev]
      const last = updated[updated.length - 1]
      if (last && animatingLines) {
        updated[updated.length - 1] = { ...last, lines: animatingLines }
      }
      return updated
    })
    setAnimatingLines(null)
    isAnimating.current = false
    flushQueue()
  }, [animatingLines, flushQueue])

  const appendToOutput = useCallback((lines: OutputLine[]) => {
    setAnimatingLines((prev) => (prev ? [...prev, ...lines] : lines))
  }, [])

  const skipAnimation = useCallback(() => {
    // OutputRenderer calls skip() on its typewriter; we just need to flush
    // The typewriter's skip() updates visibleLines instantly; onAnimationComplete handles the rest
  }, [])

  const execCommand = useCallback(
    async (input: string) => {
      const trimmed = input.trim()
      if (!trimmed) return

      historyManager.push(trimmed)

      // Dynamically import parse to avoid issues with SSR
      const { parse } = await import('@/lib/terminal/parser')
      const { command, args } = parse(trimmed)

      const handler = commandRegistry.get(command)
      if (!handler) {
        const lines: OutputLine[] = [
          { text: `command not found: ${command}`, color: 'output' },
          { text: `Type \`help\` to see available commands.`, color: 'dim' },
        ]
        queueRef.current.push({ input: trimmed, lines })
        flushQueue()
        return
      }

      // Create a context snapshot for the command
      const ctx = {
        outputBlocks,
        animatingLines,
        crtEnabled,
        sendMailState,
        historyManager,
        execCommand,
        skipAnimation,
        setCrtEnabled,
        setSendMailState,
        appendToOutput,
        onAnimationComplete,
      }

      const lines = await Promise.resolve(handler(args, ctx))
      queueRef.current.push({ input: trimmed, lines })
      flushQueue()
    },
    [outputBlocks, animatingLines, crtEnabled, sendMailState, historyManager, flushQueue, appendToOutput, onAnimationComplete, skipAnimation]
  )

  const value: TerminalContextType = {
    outputBlocks,
    animatingLines,
    crtEnabled,
    sendMailState,
    historyManager,
    execCommand,
    skipAnimation,
    setCrtEnabled,
    setSendMailState,
    appendToOutput,
    onAnimationComplete,
  }

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "TerminalEngine" | head -10
```

Expected: No errors from TerminalEngine.tsx

- [ ] **Step 3: Commit**

```bash
git add components/terminal/TerminalEngine.tsx
git commit -m "feat: TerminalEngine React context with command queue"
```

---

## Task 7: Terminal container + layout + page

**Files:**
- Create: `components/terminal/Terminal.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Terminal.tsx**

Create `components/terminal/Terminal.tsx`:
```tsx
'use client'

import { useTerminal } from './TerminalEngine'
import { OutputRenderer } from './OutputRenderer'
import { PromptInput } from './PromptInput'
import { BootSequence } from './BootSequence'
import { SoftkeyBar } from './SoftkeyBar'

export function Terminal() {
  const { outputBlocks, animatingLines, crtEnabled, onAnimationComplete } = useTerminal()

  return (
    <div className="flex flex-col h-dvh bg-[#0a0a0f] overflow-hidden">
      {/* Terminal window */}
      <div className="flex flex-col flex-1 overflow-hidden m-0 md:m-4 md:rounded-xl border border-[#1a1000] bg-[#0d0800]">
        {/* Chrome bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0a0600] border-b border-[#1a1000] shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] text-[#3d2800]">
            paros@paderborn — portfolio v2.0 — amber
          </span>
        </div>

        {/* Output area */}
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-[11px] md:text-[12px] leading-relaxed ${
            crtEnabled ? 'crt-enabled' : ''
          }`}
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <BootSequence />

          {/* Completed output blocks */}
          {outputBlocks.map((block, i) => (
            <div key={i} className="mb-1">
              {/* Echo the command */}
              <div>
                <span className="text-[#ffb300]">paros@paderborn</span>
                <span className="text-[#3d2800]">:~$ </span>
                <span className="text-[#ffd54f]">{block.input}</span>
              </div>
              {block.lines.map((line, j) => (
                <OutputLine key={j} line={line} />
              ))}
            </div>
          ))}

          {/* Currently animating block */}
          {animatingLines && (
            <OutputRenderer
              lines={animatingLines}
              onComplete={onAnimationComplete}
            />
          )}

          {/* Prompt input */}
          {!animatingLines && <PromptInput />}
        </div>
      </div>

      {/* Mobile softkey bar */}
      <SoftkeyBar />
    </div>
  )
}

function OutputLine({ line }: { line: import('@/lib/terminal/types').OutputLine }) {
  if (line.blank) return <div className="h-[1.75em]" />

  const colorClass = {
    prompt: 'text-[#ffb300]',
    cmd: 'text-[#ffd54f]',
    output: 'text-[#ff8f00]',
    dim: 'text-[#3d2800]',
    white: 'text-white font-bold',
    plain: 'text-[#ffd54f]',
  }[line.color ?? 'plain']

  return (
    <div className={`${colorClass} ${line.bold ? 'font-bold' : ''} whitespace-pre-wrap break-all`}>
      {line.text}
    </div>
  )
}
```

- [ ] **Step 2: Update app/layout.tsx**

Replace the entire file:
```tsx
import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import './globals.css'

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Parsa Rostamzadeh — Approximate Computing Researcher',
  description:
    'Computer engineer at Paderborn University. Approximate computing, FPGA neural network optimization, graph neural networks, XAI.',
  keywords: ['Approximate Computing', 'FPGA', 'Hardware ML', 'GNN', 'XAI', 'Paderborn University'],
  openGraph: {
    title: 'Parsa Rostamzadeh — Approximate Computing Researcher',
    description: 'Computer engineer specializing in approximate computing and hardware-aware ML.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body className="bg-[#0a0a0f] text-[#ffd54f] antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Update app/page.tsx**

Replace the entire file:
```tsx
import { TerminalEngine } from '@/components/terminal/TerminalEngine'
import { Terminal } from '@/components/terminal/Terminal'

export default function Home() {
  return (
    <TerminalEngine>
      <Terminal />
    </TerminalEngine>
  )
}
```

- [ ] **Step 4: Verify build compiles (even with stubs needed)**

At this point `BootSequence`, `OutputRenderer`, `PromptInput`, `SoftkeyBar` don't exist yet. Create stub files to unblock the build:

```bash
mkdir -p components/terminal

# BootSequence stub
cat > components/terminal/BootSequence.tsx << 'EOF'
export function BootSequence() { return null }
EOF

# OutputRenderer stub
cat > components/terminal/OutputRenderer.tsx << 'EOF'
import type { OutputLine } from '@/lib/terminal/types'
export function OutputRenderer({ lines, onComplete }: { lines: OutputLine[]; onComplete: () => void }) {
  return null
}
EOF

# PromptInput stub
cat > components/terminal/PromptInput.tsx << 'EOF'
export function PromptInput() { return null }
EOF

# SoftkeyBar stub
cat > components/terminal/SoftkeyBar.tsx << 'EOF'
export function SoftkeyBar() { return null }
EOF
```

- [ ] **Step 5: Build check**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds (stubs prevent missing module errors)

- [ ] **Step 6: Commit**

```bash
git add components/terminal/Terminal.tsx components/terminal/BootSequence.tsx \
        components/terminal/OutputRenderer.tsx components/terminal/PromptInput.tsx \
        components/terminal/SoftkeyBar.tsx app/layout.tsx app/page.tsx
git commit -m "feat: Terminal container + layout wired to TerminalEngine"
```

---

## Task 8: PromptInput

**Files:**
- Modify: `components/terminal/PromptInput.tsx` (replace stub)

The prompt input handles: free typing, Enter to submit, ↑/↓ history, Tab autocomplete, and multi-step send-mail mode.

- [ ] **Step 1: Replace stub with full implementation**

Replace `components/terminal/PromptInput.tsx`:
```tsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTerminal } from './TerminalEngine'
import { complete } from '@/lib/terminal/autocomplete'

export function PromptInput() {
  const { execCommand, historyManager, sendMailState, setSendMailState, appendToOutput } = useTerminal()
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus on mount and keep focus
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        const trimmed = value.trim()
        setValue('')
        historyManager.reset()

        if (sendMailState) {
          // Multi-step send-mail flow handled by sendmail command
          const { advanceSendMail } = await import('@/lib/terminal/commands/sendmail')
          await advanceSendMail(trimmed, sendMailState, { setSendMailState, appendToOutput, execCommand })
          return
        }

        execCommand(trimmed)
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = historyManager.navigate('up')
        if (prev !== null) setValue(prev)
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = historyManager.navigate('down')
        setValue(next ?? '')
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        const completed = complete(value)
        if (completed) setValue(completed)
        return
      }
    },
    [value, historyManager, sendMailState, setSendMailState, appendToOutput, execCommand]
  )

  const promptPrefix = sendMailState
    ? 'send-mail'
    : 'paros@paderborn'

  const promptSuffix = sendMailState ? '> ' : ':~$ '

  return (
    <div className="flex items-center font-mono text-[11px] md:text-[12px] mt-1">
      <span className="text-[#ffb300] shrink-0">{promptPrefix}</span>
      <span className="text-[#3d2800] shrink-0">{promptSuffix}</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 opacity-0 w-full cursor-default"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
        <span className="text-[#ffd54f]">{value}</span>
        <span className="inline-block w-[7px] h-[13px] bg-[#ffb300] align-bottom animate-[cursor-blink_1s_step-end_infinite]" />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify no TS errors**

```bash
npx tsc --noEmit 2>&1 | grep "PromptInput" | head -5
```

Expected: No errors (sendmail module not yet created; that's OK — it's a dynamic import)

- [ ] **Step 3: Commit**

```bash
git add components/terminal/PromptInput.tsx
git commit -m "feat: PromptInput with history, tab-complete, send-mail mode"
```

---

## Task 9: OutputRenderer

**Files:**
- Modify: `components/terminal/OutputRenderer.tsx` (replace stub)

- [ ] **Step 1: Replace stub with full implementation**

Replace `components/terminal/OutputRenderer.tsx`:
```tsx
'use client'

import { useEffect } from 'react'
import { useTypewriter } from '@/lib/terminal/typewriter'
import type { OutputLine } from '@/lib/terminal/types'
import { useTerminal } from './TerminalEngine'

interface OutputRendererProps {
  lines: OutputLine[]
  onComplete: () => void
}

const COLOR_CLASS: Record<string, string> = {
  prompt: 'text-[#ffb300]',
  cmd: 'text-[#ffd54f]',
  output: 'text-[#ff8f00]',
  dim: 'text-[#3d2800]',
  white: 'text-white font-bold',
  plain: 'text-[#ffd54f]',
}

export function OutputRenderer({ lines, onComplete }: OutputRendererProps) {
  const { skipAnimation } = useTerminal()
  const { visibleLines, done, skip } = useTypewriter(lines, true)

  // When animation completes, notify parent
  useEffect(() => {
    if (done) {
      onComplete()
    }
  }, [done, onComplete])

  // Expose skip to TerminalEngine via keydown — listen for Enter
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' && !done) {
        e.preventDefault()
        skip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [done, skip])

  return (
    <div className="mb-1">
      {visibleLines.map((line, i) => {
        if (line.blank) return <div key={i} className="h-[1.75em]" />
        const colorClass = COLOR_CLASS[line.color ?? 'plain']
        return (
          <div
            key={i}
            className={`${colorClass} ${line.bold ? 'font-bold' : ''} whitespace-pre-wrap break-all`}
          >
            {line.text}
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Verify no TS errors**

```bash
npx tsc --noEmit 2>&1 | grep "OutputRenderer" | head -5
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/terminal/OutputRenderer.tsx
git commit -m "feat: OutputRenderer with typewriter animation and Enter-to-skip"
```

---

## Task 10: Command registry + system commands

**Files:**
- Create: `lib/terminal/commands/index.ts`
- Create: `lib/terminal/commands/system.ts`

System commands: `help`, `clear`, `open`, `crt`.

- [ ] **Step 1: Create command registry**

Create `lib/terminal/commands/index.ts`:
```ts
import type { TerminalContextType } from '@/components/terminal/TerminalEngine'
import type { OutputLine } from '../types'

export type CommandHandler = (
  args: string[],
  ctx: TerminalContextType
) => OutputLine[] | Promise<OutputLine[]>

// Registry is populated by each command module calling registerCommand
// Commands are loaded lazily in TerminalEngine.execCommand

export { registerCommand } from '@/components/terminal/TerminalEngine'
```

Create `lib/terminal/commands/system.ts`:
```ts
import type { OutputLine } from '../types'
import { registerCommand } from '@/components/terminal/TerminalEngine'

const HELP_LINES: OutputLine[] = [
  { text: 'Available commands:', color: 'white', bold: true },
  { text: '─────────────────────────────────────────────────────', color: 'dim' },
  { text: '  neofetch          # system info card (start here)', color: 'cmd' },
  { text: '  about             # who I am', color: 'cmd' },
  { text: '  ls projects/      # list all projects', color: 'cmd' },
  { text: '  cat projects/<n>  # open a project (tab to complete)', color: 'cmd' },
  { text: '  ls research/      # list publications', color: 'cmd' },
  { text: '  cat research/<n>  # open a publication', color: 'cmd' },
  { text: '  skills            # skill tree', color: 'cmd' },
  { text: '  history           # experience timeline', color: 'cmd' },
  { text: '  contact           # reach me', color: 'cmd' },
  { text: '  send-mail         # send me a message', color: 'cmd' },
  { text: '  open github       # open github.com/P4R0S', color: 'cmd' },
  { text: '  clear             # clear terminal', color: 'cmd' },
  { text: '  crt off / crt on  # toggle scanlines', color: 'cmd' },
  { text: '─────────────────────────────────────────────────────', color: 'dim' },
  { text: '  Tab: autocomplete  ↑/↓: command history', color: 'dim' },
]

registerCommand('help', () => HELP_LINES)

registerCommand('clear', (_args, ctx) => {
  // Clear is handled specially — it resets output blocks
  // We signal via a special line marker
  return [{ text: '__CLEAR__', color: 'dim' }]
})

registerCommand('open', (args) => {
  if (args[0] === 'github') {
    if (typeof window !== 'undefined') {
      window.open('https://github.com/P4R0S', '_blank', 'noopener,noreferrer')
    }
    return [{ text: 'Opening github.com/P4R0S …', color: 'output' }]
  }
  return [{ text: `open: unknown target '${args[0] ?? ''}'`, color: 'output' }]
})

registerCommand('crt', (args, ctx) => {
  const val = args[0]?.toLowerCase()
  if (val === 'off') {
    ctx.setCrtEnabled(false)
    return [{ text: 'CRT scanlines disabled.', color: 'dim' }]
  }
  if (val === 'on') {
    ctx.setCrtEnabled(true)
    return [{ text: 'CRT scanlines enabled.', color: 'dim' }]
  }
  return [{ text: 'Usage: crt off | crt on', color: 'output' }]
})
```

> **Note on `clear`:** In `Terminal.tsx`, update the output-rendering logic to check for the `__CLEAR__` sentinel and reset `outputBlocks` to `[]` when found. Add this inside `onAnimationComplete` in `TerminalEngine.tsx`:
> ```ts
> // After animation completes, check for clear sentinel
> if (animatingLines?.some(l => l.text === '__CLEAR__')) {
>   setOutputBlocks([])
> } else {
>   setOutputBlocks(prev => [...prev, { input: currentInput, lines: animatingLines ?? [] }])
> }
> ```
> Track `currentInput` as a ref in TerminalEngine.

- [ ] **Step 2: Update TerminalEngine to track currentInput and handle __CLEAR__**

Modify `components/terminal/TerminalEngine.tsx` — add `currentInputRef` and update `flushQueue` and `onAnimationComplete`:

In `TerminalEngine`, add after `const queueRef = ...`:
```ts
const currentInputRef = useRef('')
```

In `flushQueue`, after `setAnimatingLines(next.lines)`, add:
```ts
currentInputRef.current = next.input
```

Replace the `onAnimationComplete` callback with:
```ts
const onAnimationComplete = useCallback(() => {
  const isClear = animatingLines?.some((l) => l.text === '__CLEAR__')
  if (isClear) {
    setOutputBlocks([])
  } else {
    setOutputBlocks((prev) => {
      // Replace the last block (which was added with empty lines) with completed lines
      const updated = [...prev]
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          input: currentInputRef.current,
          lines: animatingLines ?? [],
        }
      }
      return updated
    })
  }
  setAnimatingLines(null)
  isAnimating.current = false
  flushQueue()
}, [animatingLines, flushQueue])
```

Also update `execCommand` — before pushing to `queueRef`, do NOT pre-add empty block:
```ts
// Remove this line from execCommand:
// setOutputBlocks((prev) => [...prev, { input: trimmed, lines: [] }])
// The block is added with lines in onAnimationComplete instead
```

And in `flushQueue`, update to add an empty placeholder block when starting animation:
```ts
const flushQueue = useCallback(() => {
  if (isAnimating.current || queueRef.current.length === 0) return
  const next = queueRef.current.shift()!
  isAnimating.current = true
  currentInputRef.current = next.input
  setOutputBlocks((prev) => [...prev, { input: next.input, lines: [] }])
  setAnimatingLines(next.lines)
}, [])
```

- [ ] **Step 3: Load system commands in page.tsx**

System commands must be imported (for their side-effect of calling `registerCommand`). Update `app/page.tsx`:
```tsx
import '@/lib/terminal/commands/system'
import { TerminalEngine } from '@/components/terminal/TerminalEngine'
import { Terminal } from '@/components/terminal/Terminal'

export default function Home() {
  return (
    <TerminalEngine>
      <Terminal />
    </TerminalEngine>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | tail -10
```

Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add lib/terminal/commands/system.ts lib/terminal/commands/index.ts \
        components/terminal/TerminalEngine.tsx app/page.tsx
git commit -m "feat: command registry + system commands (help, clear, open, crt)"
```

---

## Task 11: neofetch + about commands

**Files:**
- Create: `lib/terminal/commands/neofetch.ts`

- [ ] **Step 1: Create neofetch + about command**

Create `lib/terminal/commands/neofetch.ts`:
```ts
import type { OutputLine } from '../types'
import { registerCommand } from '@/components/terminal/TerminalEngine'

const ASCII_ART = [
  '    ▄▄▄▄▄    ',
  '  ▄█████████▄',
  ' ███ PAROS ███',
  '  ▀█████████▀',
  '    ▀▀▀▀▀    ',
]

const INFO_LINES = [
  { key: 'name', value: 'Parsa Rostamzadeh' },
  { key: 'role', value: 'Approximate Computing Researcher' },
  { key: 'inst', value: 'Paderborn University' },
  { key: 'spec', value: 'FPGA · Hardware ML · GNN · XAI' },
  { key: 'mail', value: 'paros.pr@gmail.com' },
  { key: 'gh  ', value: 'github.com/P4R0S' },
]

function neofetchOutput(): OutputLine[] {
  const lines: OutputLine[] = [{ blank: true, text: '' }]
  const maxRows = Math.max(ASCII_ART.length, INFO_LINES.length)

  for (let i = 0; i < maxRows; i++) {
    const art = ASCII_ART[i] ?? '             '
    const info = INFO_LINES[i]
    const text = info
      ? `${art}  ${info.key}: ${info.value}`
      : art
    lines.push({ text, color: i === 2 ? 'output' : 'dim' })
  }
  lines.push({ blank: true, text: '' })
  return lines
}

registerCommand('neofetch', () => neofetchOutput())

const ABOUT_LINES: OutputLine[] = [
  { blank: true, text: '' },
  { text: '┌─ about.txt ─────────────────────────────────────────────┐', color: 'dim' },
  { text: '│', color: 'dim' },
  { text: '│  I\'m a computer engineer at Paderborn University with a', color: 'output' },
  { text: '│  focus on approximate computing, hardware-aware machine  ', color: 'output' },
  { text: '│  learning, and FPGA-based neural network optimization.   ', color: 'output' },
  { text: '│', color: 'dim' },
  { text: '│  My work spans the full stack from circuit synthesis to   ', color: 'output' },
  { text: '│  graph neural networks — finding accuracy–area trade-offs ', color: 'output' },
  { text: '│  that make AI viable on constrained hardware.            ', color: 'output' },
  { text: '│', color: 'dim' },
  { text: '└─────────────────────────────────────────────────────────┘', color: 'dim' },
  { blank: true, text: '' },
]

registerCommand('about', () => ABOUT_LINES)
```

- [ ] **Step 2: Register in page.tsx**

Add to imports in `app/page.tsx`:
```tsx
import '@/lib/terminal/commands/system'
import '@/lib/terminal/commands/neofetch'
```

- [ ] **Step 3: Commit**

```bash
git add lib/terminal/commands/neofetch.ts app/page.tsx
git commit -m "feat: neofetch and about commands"
```

---

## Task 12: Projects commands

**Files:**
- Create: `lib/terminal/commands/projects.ts`

- [ ] **Step 1: Create projects command**

Create `lib/terminal/commands/projects.ts`:
```ts
import type { OutputLine } from '../types'
import { registerCommand } from '@/components/terminal/TerminalEngine'
import { projects } from '@/content/projects'

// Map slug → project (order must match autocomplete.ts PROJECT_FILES)
const SLUG_MAP: Record<string, number> = {
  'CLAS.md': 0,
  'BLASYS.md': 1,
  'Partioning.md': 2,
  'PubMed_GNN.md': 3,
  'Reservoir.md': 4,
  'Neural_Scratch.md': 5,
  'CIRCA_evo.md': 6,
}

const SLUGS = [
  { slug: 'CLAS', comment: '# cross-layer approx synthesis' },
  { slug: 'BLASYS', comment: '# NN approximation pipeline' },
  { slug: 'Partioning', comment: '# spectral partitioning' },
  { slug: 'PubMed_GNN', comment: '# graph attention + xai' },
  { slug: 'Reservoir', comment: '# ESN quantization' },
  { slug: 'Neural_Scratch', comment: '# numpy-only neural net' },
  { slug: 'CIRCA_evo', comment: '# approx circuit generation' },
]

function lsProjects(): OutputLine[] {
  const lines: OutputLine[] = [
    { blank: true, text: '' },
    { text: `total ${SLUGS.length} items`, color: 'dim' },
    { text: '─────────────────────────────────────────────────────────', color: 'dim' },
  ]
  for (const { slug, comment } of SLUGS) {
    lines.push({
      text: `drwxr-xr-x  ${slug.padEnd(20)}${comment}`,
      color: 'output',
    })
  }
  lines.push({ text: '─────────────────────────────────────────────────────────', color: 'dim' })
  lines.push({ text: 'Use `cat projects/<name>.md` to read any project', color: 'dim' })
  lines.push({ blank: true, text: '' })
  return lines
}

function catProject(filename: string): OutputLine[] {
  const idx = SLUG_MAP[filename]
  if (idx === undefined) {
    return [
      { text: `cat: projects/${filename}: No such file`, color: 'output' },
      { text: 'Run `ls projects/` to see available projects.', color: 'dim' },
    ]
  }
  const p = projects[idx]
  if (!p) {
    return [{ text: `cat: projects/${filename}: No such file`, color: 'output' }]
  }

  const techTags = p.tech.map((t) => `[${t}]`).join(' ')
  const lines: OutputLine[] = [
    { blank: true, text: '' },
    { text: `═══ ${p.title} ═══`, color: 'white', bold: true },
    { text: `status  ${p.featured ? '[ACTIVE]' : '[ARCHIVED]'}`, color: 'output' },
    { text: `stack   ${techTags}`, color: 'output' },
    { blank: true, text: '' },
    { text: p.longDescription, color: 'output' },
  ]
  if (p.github) {
    lines.push({ blank: true, text: '' })
    lines.push({ text: `github  ${p.github}`, color: 'cmd' })
  }
  if (p.demo) {
    lines.push({ text: `demo    ${p.demo}`, color: 'cmd' })
  }
  lines.push({ blank: true, text: '' })
  return lines
}

registerCommand('ls', (args) => {
  if (args[0] === 'projects/' || args[0] === 'projects') return lsProjects()
  if (args[0] === 'research/' || args[0] === 'research') {
    // Handled by research command module
    return [{ text: 'Use `ls research/` (also try the research command module)', color: 'dim' }]
  }
  return [{ text: `ls: ${args[0] ?? ''}: No such directory`, color: 'output' }]
})

registerCommand('cat', (args) => {
  const path = args[0] ?? ''
  if (path.startsWith('projects/')) {
    const filename = path.replace('projects/', '')
    return catProject(filename)
  }
  if (path.startsWith('research/')) {
    // Research command will override this — but handle gracefully
    return [{ text: `cat: ${path}: handled by research module`, color: 'dim' }]
  }
  return [{ text: `cat: ${path}: No such file`, color: 'output' }]
})
```

> **Note:** The `ls` and `cat` commands are registered here. The research module will NOT re-register them — instead the research module augments the `cat` handler. See Task 16 for how `cat research/` is handled.

- [ ] **Step 2: Register in page.tsx**

```tsx
import '@/lib/terminal/commands/projects'
```

- [ ] **Step 3: Commit**

```bash
git add lib/terminal/commands/projects.ts app/page.tsx
git commit -m "feat: ls projects/ and cat projects/<name>.md commands"
```

---

## Task 13: Skills + experience commands

**Files:**
- Create: `lib/terminal/commands/skills.ts`
- Create: `lib/terminal/commands/experience.ts`

- [ ] **Step 1: Create skills command**

Create `lib/terminal/commands/skills.ts`:
```ts
import type { OutputLine } from '../types'
import { registerCommand } from '@/components/terminal/TerminalEngine'
import { skillCategories } from '@/content/skills'

registerCommand('skills', () => {
  const lines: OutputLine[] = [
    { blank: true, text: '' },
    { text: '─────────────────────────────────────────────────────────', color: 'dim' },
  ]

  for (const category of skillCategories) {
    lines.push({ text: `[ ${category.name} ]`, color: 'white', bold: true })
    for (const skill of category.skills) {
      lines.push({ text: `  ${skill}`, color: 'output' })
    }
    lines.push({ blank: true, text: '' })
  }

  lines.push({ text: '─────────────────────────────────────────────────────────', color: 'dim' })
  lines.push({ blank: true, text: '' })
  return lines
})
```

- [ ] **Step 2: Create experience (history) command**

Create `lib/terminal/commands/experience.ts`:
```ts
import type { OutputLine } from '../types'
import { registerCommand } from '@/components/terminal/TerminalEngine'
import { experience } from '@/content/experience'

registerCommand('history', () => {
  const sorted = [...experience].sort((a, b) => {
    // Sort newest first by startDate descending
    return parseInt(b.startDate) - parseInt(a.startDate)
  })

  const lines: OutputLine[] = [
    { blank: true, text: '' },
    { text: '[ experience timeline — newest first ]', color: 'dim' },
    { text: '──────────────────────────────────────────────────────────', color: 'dim' },
    { blank: true, text: '' },
  ]

  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i]
    lines.push({
      text: `${item.startDate} → ${item.endDate}`,
      color: 'dim',
    })
    lines.push({
      text: `${item.role}  @  ${item.company}`,
      color: 'white',
      bold: true,
    })
    for (const bullet of item.bullets) {
      lines.push({ text: `  ▸ ${bullet}`, color: 'output' })
    }
    if (i < sorted.length - 1) {
      lines.push({ text: '  │', color: 'dim' })
    }
    lines.push({ blank: true, text: '' })
  }

  return lines
})
```

- [ ] **Step 3: Register in page.tsx**

```tsx
import '@/lib/terminal/commands/skills'
import '@/lib/terminal/commands/experience'
```

- [ ] **Step 4: Commit**

```bash
git add lib/terminal/commands/skills.ts lib/terminal/commands/experience.ts app/page.tsx
git commit -m "feat: skills and history (experience) commands"
```

---

## Task 14: Contact + send-mail commands

**Files:**
- Create: `lib/terminal/commands/contact.ts`
- Create: `lib/terminal/commands/sendmail.ts`

The send-mail command starts a multi-step interactive form. `PromptInput` checks `sendMailState` and calls `advanceSendMail` on each Enter press instead of `execCommand`.

- [ ] **Step 1: Create contact command**

Create `lib/terminal/commands/contact.ts`:
```ts
import type { OutputLine } from '../types'
import { registerCommand } from '@/components/terminal/TerminalEngine'

const CONTACT_LINES: OutputLine[] = [
  { blank: true, text: '' },
  { text: 'BEGIN:VCARD', color: 'dim' },
  { text: 'FN      Parsa Rostamzadeh', color: 'output' },
  { text: 'EMAIL   paros.pr@gmail.com', color: 'output' },
  { text: 'URL     github.com/P4R0S', color: 'output' },
  { text: 'LINKEDIN paros_1999', color: 'output' },
  { text: 'ORG     Paderborn University', color: 'output' },
  { text: 'END:VCARD', color: 'dim' },
  { blank: true, text: '' },
  { text: 'Or type `send-mail` to send a message directly.', color: 'dim' },
  { blank: true, text: '' },
]

registerCommand('contact', () => CONTACT_LINES)
```

- [ ] **Step 2: Create send-mail command**

Create `lib/terminal/commands/sendmail.ts`:
```ts
import type { OutputLine, SendMailState } from '../types'
import { registerCommand } from '@/components/terminal/TerminalEngine'
import type { TerminalContextType } from '@/components/terminal/TerminalEngine'

// Called by TerminalEngine when user types `send-mail`
registerCommand('send-mail', (_args, ctx) => {
  ctx.setSendMailState({ step: 'name' })
  return [
    { blank: true, text: '' },
    { text: '[ composing message ]', color: 'dim' },
    { text: 'To:   paros.pr@gmail.com', color: 'output' },
    { blank: true, text: '' },
    { text: 'Your name:', color: 'output' },
  ]
})

// Called by PromptInput on each Enter press during send-mail flow
export async function advanceSendMail(
  value: string,
  state: SendMailState,
  ctx: Pick<TerminalContextType, 'setSendMailState' | 'appendToOutput' | 'execCommand'>
): Promise<void> {
  const { setSendMailState, appendToOutput } = ctx

  if (state.step === 'name') {
    const name = value.trim() || 'Anonymous'
    setSendMailState({ step: 'email', name })
    appendToOutput([
      { text: `  ${name}`, color: 'cmd' },
      { blank: true, text: '' },
      { text: 'Your email (for reply):', color: 'output' },
    ])
    return
  }

  if (state.step === 'email') {
    const email = value.trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      appendToOutput([{ text: '  Invalid email — try again:', color: 'output' }])
      return
    }
    setSendMailState({ step: 'message', name: state.name, email })
    appendToOutput([
      { text: `  ${email}`, color: 'cmd' },
      { blank: true, text: '' },
      { text: 'Message:', color: 'output' },
    ])
    return
  }

  if (state.step === 'message') {
    const message = value.trim()
    if (!message) {
      appendToOutput([{ text: '  Message cannot be empty. Try again:', color: 'output' }])
      return
    }
    setSendMailState({ step: 'confirm', name: state.name, email: state.email, message })
    appendToOutput([
      { text: `  ${message}`, color: 'cmd' },
      { blank: true, text: '' },
      { text: '───────────────────────────────────────', color: 'dim' },
      { text: `From:    ${state.name}`, color: 'output' },
      { text: `Email:   ${state.email}`, color: 'output' },
      { text: `Message: ${message}`, color: 'output' },
      { text: '───────────────────────────────────────', color: 'dim' },
      { blank: true, text: '' },
      { text: 'Send? [y/n]', color: 'output' },
    ])
    return
  }

  if (state.step === 'confirm') {
    const answer = value.trim().toLowerCase()
    if (answer === 'n' || answer === 'no') {
      setSendMailState(null)
      appendToOutput([
        { text: '  Cancelled.', color: 'dim' },
        { blank: true, text: '' },
      ])
      return
    }
    if (answer !== 'y' && answer !== 'yes') {
      appendToOutput([{ text: '  Type y to send or n to cancel:', color: 'output' }])
      return
    }

    // Send
    appendToOutput([{ text: '  Sending…', color: 'dim' }])
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          message: state.message,
        }),
      })
      if (res.ok) {
        appendToOutput([
          { text: '  Message sent. 250 OK.', color: 'white', bold: true },
          { blank: true, text: '' },
        ])
      } else {
        const data = await res.json().catch(() => ({}))
        appendToOutput([
          { text: `  Error: ${data.error ?? 'Unknown error'}`, color: 'output' },
          { blank: true, text: '' },
        ])
      }
    } catch {
      appendToOutput([
        { text: '  Network error. Please email paros.pr@gmail.com directly.', color: 'output' },
        { blank: true, text: '' },
      ])
    }
    setSendMailState(null)
  }
}
```

- [ ] **Step 3: Register in page.tsx**

```tsx
import '@/lib/terminal/commands/contact'
import '@/lib/terminal/commands/sendmail'
```

- [ ] **Step 4: Commit**

```bash
git add lib/terminal/commands/contact.ts lib/terminal/commands/sendmail.ts app/page.tsx
git commit -m "feat: contact vcard + send-mail multi-step form"
```

---

## Task 15: Research commands

**Files:**
- Create: `lib/terminal/commands/research.ts`

The `ls` and `cat` commands are already registered by the projects module. We need to extend their behavior for `research/` paths. The cleanest approach: override the `cat` command registration for `research/` paths by extending the registry logic.

Since `registerCommand` overwrites previous handlers, we'll instead handle research inside the projects command `cat` handler by detecting the `research/` prefix. Modify `projects.ts`:

- [ ] **Step 1: Create research module**

Create `lib/terminal/commands/research.ts`:
```ts
import type { OutputLine } from '../types'
import { publications } from '@/content/publications'

// Slug → publication index
const SLUG_MAP: Record<string, number> = {
  'approx-nn-2024.md': 0,
  'hw-quant-llm-2024.md': 1,
  'approx-mult-fpga-2023.md': 2,
  'survey-approx-ml-2023.md': 3,
  'sparse-attn-2023.md': 4,
}

const SLUGS = Object.keys(SLUG_MAP)

export function lsResearch(): OutputLine[] {
  const lines: OutputLine[] = [
    { blank: true, text: '' },
    { text: `total ${SLUGS.length} publications`, color: 'dim' },
    { text: '──────────────────────────────────────────────────────────', color: 'dim' },
  ]
  for (const slug of SLUGS) {
    const idx = SLUG_MAP[slug]
    const pub = publications[idx]
    lines.push({
      text: `-rw-r--r--  ${slug.padEnd(28)}${pub?.year ?? ''}`,
      color: 'output',
    })
  }
  lines.push({ text: '──────────────────────────────────────────────────────────', color: 'dim' })
  lines.push({ text: 'Use `cat research/<slug>.md` to read any paper', color: 'dim' })
  lines.push({ blank: true, text: '' })
  return lines
}

export function catResearch(filename: string): OutputLine[] {
  const idx = SLUG_MAP[filename]
  if (idx === undefined) {
    return [
      { text: `cat: research/${filename}: No such file`, color: 'output' },
      { text: 'Run `ls research/` to see available papers.', color: 'dim' },
    ]
  }
  const pub = publications[idx]
  if (!pub) return [{ text: `cat: research/${filename}: Not found`, color: 'output' }]

  const lines: OutputLine[] = [
    { blank: true, text: '' },
    { text: `═══ ${pub.title} ═══`, color: 'white', bold: true },
    { text: `venue   ${pub.venue}`, color: 'output' },
    { text: `year    ${pub.year}`, color: 'output' },
    { text: `area    ${pub.area}`, color: 'output' },
    { blank: true, text: '' },
    { text: pub.abstract, color: 'output' },
  ]
  if (pub.doi) {
    lines.push({ blank: true, text: '' })
    lines.push({ text: `doi     ${pub.doi}`, color: 'cmd' })
  }
  if (pub.pdfUrl) {
    lines.push({ text: `pdf     ${pub.pdfUrl}`, color: 'cmd' })
  }
  lines.push({ blank: true, text: '' })
  return lines
}
```

- [ ] **Step 2: Update projects.ts to delegate research/ paths**

In `lib/terminal/commands/projects.ts`, replace the `ls` and `cat` registrations:

```ts
import { lsResearch, catResearch } from './research'

registerCommand('ls', (args) => {
  if (args[0] === 'projects/' || args[0] === 'projects') return lsProjects()
  if (args[0] === 'research/' || args[0] === 'research') return lsResearch()
  return [{ text: `ls: ${args[0] ?? ''}: No such directory`, color: 'output' }]
})

registerCommand('cat', (args) => {
  const path = args[0] ?? ''
  if (path.startsWith('projects/')) {
    return catProject(path.replace('projects/', ''))
  }
  if (path.startsWith('research/')) {
    return catResearch(path.replace('research/', ''))
  }
  return [{ text: `cat: ${path}: No such file`, color: 'output' }]
})
```

Remove the old `research/` placeholder handling.

- [ ] **Step 3: Register in page.tsx**

Research is imported by projects.ts automatically (no extra import needed in page.tsx since projects.ts imports it).

- [ ] **Step 4: Commit**

```bash
git add lib/terminal/commands/research.ts lib/terminal/commands/projects.ts
git commit -m "feat: ls research/ and cat research/<slug>.md commands"
```

---

## Task 16: Boot sequence

**Files:**
- Modify: `components/terminal/BootSequence.tsx` (replace stub)

The boot sequence runs once per session (tracked in `sessionStorage`). It types out BIOS-style lines, then a welcome box, then a progress bar, then lands at the prompt.

- [ ] **Step 1: Replace BootSequence stub**

Replace `components/terminal/BootSequence.tsx`:
```tsx
'use client'

import { useState, useEffect } from 'react'

const BOOT_LINES = [
  { text: 'BIOS v2.4.1 — Initializing...', delay: 100 },
  { text: 'RAM: 32768MB OK  CPU: 16-core OK', delay: 400 },
  { text: 'Loading kernel modules... DONE', delay: 700 },
  { text: '────────────────────────────────────────', delay: 1000 },
  { text: 'Welcome to PAROS-PORTFOLIO v2.0', delay: 1300, bright: true },
  { text: 'Authenticated: Parsa Rostamzadeh', delay: 1600, bright: true },
]

const BOOT_DONE_DELAY = 2000
const HINT_DELAY = 2800

export function BootSequence() {
  const [booted, setBooted] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [showBar, setShowBar] = useState(false)
  const [barWidth, setBarWidth] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // Skip boot if already done this session
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('booted') === 'true') {
      setBooted(true)
      return
    }

    // Check reduced motion
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      setVisibleCount(BOOT_LINES.length)
      setShowBar(true)
      setBarWidth(100)
      setShowPrompt(true)
      setShowHint(true)
      sessionStorage.setItem('booted', 'true')
      return
    }

    // Schedule each boot line
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleCount((n) => Math.max(n, i + 1)), line.delay)
    })

    // Progress bar
    setTimeout(() => setShowBar(true), BOOT_DONE_DELAY)
    setTimeout(() => setBarWidth(100), BOOT_DONE_DELAY + 50)

    // Prompt
    setTimeout(() => {
      setShowPrompt(true)
    }, BOOT_DONE_DELAY + 1300)

    // Hint
    setTimeout(() => {
      setShowHint(true)
      sessionStorage.setItem('booted', 'true')
    }, HINT_DELAY + 1000)
  }, [])

  if (booted) return null

  return (
    <div className="mb-4 font-mono text-[11px] md:text-[12px] leading-relaxed boot-line">
      {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
        <div
          key={i}
          className={line.bright ? 'text-[#ff8f00]' : 'text-[#3d2800]'}
        >
          {line.text}
        </div>
      ))}

      {showBar && (
        <div className="text-[#ff8f00] mt-1">
          {'Loading profile: ['}
          <span
            className="text-[#ffb300] inline-block overflow-hidden whitespace-nowrap transition-all duration-1000"
            style={{ maxWidth: `${barWidth}%`, width: '140px' }}
          >
            {'████████████████████'}
          </span>
          {'] 100%'}
        </div>
      )}

      {showPrompt && (
        <>
          <div className="text-[#3d2800] mt-1">
            {'────────────────────────────────────────'}
          </div>
          <div className="mt-1">
            <span className="text-[#ff8f00]">
              Last login: {new Date().toDateString()} from visitor@internet
            </span>
          </div>
        </>
      )}

      {showHint && (
        <div className="text-[#3d2800] mt-1">
          Type `help` to see available commands. Tab to autocomplete.
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify no TS errors**

```bash
npx tsc --noEmit 2>&1 | grep "BootSequence" | head -5
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/terminal/BootSequence.tsx
git commit -m "feat: boot sequence with sessionStorage skip and reduced-motion support"
```

---

## Task 17: Softkey bar + SEO

**Files:**
- Modify: `components/terminal/SoftkeyBar.tsx` (replace stub)
- Modify: `components/terminal/Terminal.tsx` (add hidden SEO main)

- [ ] **Step 1: Replace SoftkeyBar stub**

Replace `components/terminal/SoftkeyBar.tsx`:
```tsx
'use client'

import { useTerminal } from './TerminalEngine'

const SOFTKEYS = [
  { label: 'neofetch', cmd: 'neofetch' },
  { label: 'ls projects/', cmd: 'ls projects/' },
  { label: 'skills', cmd: 'skills' },
  { label: 'history', cmd: 'history' },
  { label: 'contact', cmd: 'contact' },
  { label: 'clear', cmd: 'clear' },
]

export function SoftkeyBar() {
  const { execCommand } = useTerminal()

  return (
    <div className="flex flex-wrap gap-1.5 px-3 py-2 bg-[#0a0600] border-t border-[#1a1000] shrink-0 md:hidden">
      {SOFTKEYS.map(({ label, cmd }) => (
        <button
          key={cmd}
          onClick={() => execCommand(cmd)}
          className="font-mono text-[10px] text-[#ff8f00] bg-[#1a1000] border border-[#3d2800] px-2 py-1 rounded cursor-pointer active:bg-[#3d2800] active:text-[#ffb300]"
          aria-label={`Run command: ${cmd}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Add SEO hidden main to Terminal.tsx**

In `components/terminal/Terminal.tsx`, add a hidden `<main>` element before the terminal window div. This content is visible to search engines and screen readers but hidden from sighted users:

```tsx
{/* Hidden SEO content for search engines and screen readers */}
<main
  className="sr-only"
  aria-label="Portfolio content — use the terminal above to navigate"
>
  <h1>Parsa Rostamzadeh — Approximate Computing Researcher</h1>
  <p>
    Computer engineer at Paderborn University. Specializing in approximate
    computing, FPGA-based neural network optimization, graph neural networks,
    and explainable AI.
  </p>
  <h2>Projects</h2>
  <ul>
    {/* This renders server-side — import projects at top of file */}
  </ul>
</main>
```

Full update to `Terminal.tsx` — add the import and the `<main>` block:

At the top of `Terminal.tsx`, add:
```tsx
import { projects } from '@/content/projects'
import { skillCategories } from '@/content/skills'
```

Inside the returned JSX, before `<div className="flex flex-col h-dvh ...">`:
```tsx
<main className="sr-only" aria-label="Portfolio — navigate via the terminal">
  <h1>Parsa Rostamzadeh — Approximate Computing Researcher at Paderborn University</h1>
  <p>Specializing in approximate computing, FPGA-based neural network optimization, GNN, XAI.</p>
  <h2>Projects</h2>
  <ul>
    {projects.map((p) => (
      <li key={p.title}><strong>{p.title}</strong>: {p.description}</li>
    ))}
  </ul>
  <h2>Skills</h2>
  <ul>
    {skillCategories.map((cat) => (
      <li key={cat.name}>{cat.name}: {cat.skills.join(', ')}</li>
    ))}
  </ul>
  <h2>Contact</h2>
  <p>Email: paros.pr@gmail.com | GitHub: github.com/P4R0S | LinkedIn: paros_1999</p>
</main>
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -10
```

Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add components/terminal/SoftkeyBar.tsx components/terminal/Terminal.tsx
git commit -m "feat: softkey bar (mobile) + hidden SEO main"
```

---

## Task 18: Final assembly + cleanup

**Files:**
- Modify: `app/page.tsx` (all command imports)
- Delete: all old section and UI components

- [ ] **Step 1: Final page.tsx with all command imports**

Replace `app/page.tsx` with the final version:
```tsx
// Register all terminal commands (side-effect imports)
import '@/lib/terminal/commands/system'
import '@/lib/terminal/commands/neofetch'
import '@/lib/terminal/commands/projects'   // also registers ls + cat + imports research
import '@/lib/terminal/commands/skills'
import '@/lib/terminal/commands/experience'
import '@/lib/terminal/commands/contact'
import '@/lib/terminal/commands/sendmail'

import { TerminalEngine } from '@/components/terminal/TerminalEngine'
import { Terminal } from '@/components/terminal/Terminal'

export default function Home() {
  return (
    <TerminalEngine>
      <Terminal />
    </TerminalEngine>
  )
}
```

- [ ] **Step 2: Delete old components**

```bash
rm -rf components/sections
rm -f components/ui/Navbar.tsx
rm -f components/ui/Footer.tsx
rm -f components/ui/GlassCard.tsx
rm -f components/ui/GradientText.tsx
rm -f components/ui/SectionWrapper.tsx
rmdir components/ui 2>/dev/null || true
```

- [ ] **Step 3: Final build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds with no errors. Note any warnings.

- [ ] **Step 4: Run all tests**

```bash
npx vitest run
```

Expected: All 18+ tests pass.

- [ ] **Step 5: Start dev server and manually verify**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Boot sequence plays on first load
- `help` lists all commands
- `neofetch` shows the info card
- `ls projects/` lists 7 projects
- `cat projects/CLAS.md` shows CLAS project
- `skills` shows skill categories
- `history` shows experience timeline
- `contact` shows vCard
- `send-mail` starts the interactive form
- `crt off` removes scanlines, `crt on` restores them
- `clear` clears the terminal
- Tab completion works for commands and filenames
- ↑/↓ navigates command history
- Refreshing skips boot sequence (sessionStorage)
- Mobile: softkey bar appears, tapping runs commands

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git add -u   # stage deleted files
git commit -m "feat: complete terminal portfolio — delete old components, final assembly"
```

---

## Self-Review Against Spec

**Spec coverage check:**
- ✅ §3 Color palette — all 6 amber colors used throughout
- ✅ §4 Typography — Fira Code via next/font/google
- ✅ §5 Terminal UI — chrome, prompt format, 100dvh
- ✅ §6 All commands — help, neofetch, about, ls projects/, cat, ls research/, cat research/, skills, history, contact, send-mail, open github, clear, crt off/on
- ✅ §6 Tab completion — autocomplete.ts covers commands + project + research filenames
- ✅ §6 ↑/↓ history — history.ts ring buffer
- ✅ §7.1 Boot sequence — BootSequence.tsx with sessionStorage skip
- ✅ §7.2 Command output typewriter — OutputRenderer + useTypewriter at 20ms/char
- ✅ §7.4 prefers-reduced-motion — typewriter.ts + BootSequence both check it
- ✅ §8 Mobile softkey bar — SoftkeyBar.tsx, hidden on md+ screens
- ✅ §8 100dvh — Terminal.tsx uses `h-dvh`
- ✅ §9 SEO hidden main — added to Terminal.tsx
- ✅ §9 WCAG contrast — amber (#ffb300) on #0d0800 ~7.5:1
- ✅ §10 Architecture — all files created as planned
- ✅ §10.2 Deleted components — all old sections and UI components removed
- ✅ §11 Contact flow — send-mail multi-step with y/n confirm → POST /api/contact
- ✅ §12 5 phases — implemented as 18 granular tasks

**No gaps found.**
