'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import type { OutputLine } from '@/lib/terminal/types'
import { parse } from '@/lib/terminal/parser'
import { runCommand, COMMAND_NAMES, type CommandContext } from '@/lib/terminal/commands'
import { currentTheme, setTheme } from '@/components/ui/ThemeToggle'

const HINT = 'Type a command. Try `help`'

// Typewriter speed: one tick every TICK_MS; longer outputs print several characters per tick
// so a list never takes more than a second or two
const TICK_MS = 16
const charsPerTick = (lines: OutputLine[]) => {
  const total = lines.reduce((n, l) => n + l.text.length, 0)
  return Math.max(1, Math.ceil(total / 90))
}
/** Roughly how long typing `lines` takes, so side effects can wait for it */
const typingMs = (lines: OutputLine[]) => {
  const step = charsPerTick(lines)
  return lines.reduce((ms, l) => ms + Math.ceil(l.text.length / step) * TICK_MS, 0)
}

const WELCOME_LINES: OutputLine[] = [
  { text: 'Welcome. This terminal is interactive.', color: 'white', bold: true },
  { text: 'Use it to explore who I am and what I do.', color: 'output' },
  { text: 'Try `help`, `journey`, or `projects` to get started.', color: 'output' },
]
interface TermLine {
  input?: string
  lines: OutputLine[]
}

export function HeroTerminal() {
  const [blocks, setBlocks] = useState<TermLine[]>([])
  const [animatingLines, setAnimatingLines] = useState<OutputLine[] | null>(null)
  const [visibleText, setVisibleText] = useState('')
  const [currentLine, setCurrentLine] = useState(0)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<string[]>([])
  const historyIdx = useRef(-1)
  const rafRef = useRef<number>(0)
  const charIdx = useRef(0)
  const stepRef = useRef(1)
  const router = useRouter()

  // What commands can do besides printing (scroll, open pages, switch theme)
  const ctx = useMemo<CommandContext>(() => ({
    scrollTo: (id) => {
      if (id === 'top') window.scrollTo({ top: 0 })
      else document.getElementById(id)?.scrollIntoView()
    },
    navigate: (href) => router.push(href),
    openUrl: (url) => window.open(url, '_blank', 'noopener,noreferrer'),
    getTheme: currentTheme,
    setTheme,
  }), [router])

  // Auto-type welcome message once on mount, after entrance animation
  useEffect(() => {
    const t = setTimeout(() => {
      setAnimatingLines(WELCOME_LINES)
      setCurrentLine(0)
      setVisibleText('')
    }, 1300)
    return () => clearTimeout(t)
  }, [])

  // Typewriter for one line at a time
  useEffect(() => {
    // State updates below are deferred to a timer (never synchronous in the effect body)
    // to avoid cascading renders.
    if (!animatingLines || currentLine >= animatingLines.length) {
      if (animatingLines && currentLine >= animatingLines.length) {
        const t = window.setTimeout(() => {
          setBlocks(prev => [...prev, { lines: animatingLines }])
          setAnimatingLines(null)
          setCurrentLine(0)
          setVisibleText('')
        }, 0)
        return () => clearTimeout(t)
      }
      return
    }

    const line = animatingLines[currentLine]
    if (line.blank || !line.text) {
      const t = window.setTimeout(() => setCurrentLine(n => n + 1), 0)
      return () => clearTimeout(t)
    }

    charIdx.current = 0
    const text = line.text
    stepRef.current = charsPerTick(animatingLines)

    const tick = () => {
      charIdx.current += stepRef.current
      setVisibleText(text.slice(0, charIdx.current))
      if (charIdx.current < text.length) {
        rafRef.current = window.setTimeout(tick, TICK_MS)
      } else {
        setCurrentLine(n => n + 1)
        setVisibleText('')
      }
    }
    rafRef.current = window.setTimeout(tick, TICK_MS)
    return () => clearTimeout(rafRef.current)
  }, [animatingLines, currentLine])

  // Scroll only inside the terminal body — never touch the page scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [blocks, animatingLines, visibleText])

  const submit = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return

    historyRef.current.unshift(trimmed)
    historyIdx.current = -1
    setInput('')

    const { command, args } = parse(trimmed)
    const result = runCommand(command, args, ctx)

    if (result.clear) {
      setBlocks([])
      setAnimatingLines(null)
      return
    }

    // A new command finishes the previous output instantly instead of dropping it,
    // then echoes the typed input and types out the new output
    const unfinished = animatingLines
    setBlocks(prev => [
      ...prev,
      ...(unfinished ? [{ lines: unfinished }] : []),
      { input: trimmed, lines: [] },
    ])
    setAnimatingLines(result.lines)
    setCurrentLine(0)
    setVisibleText('')
    // Side effects (scroll, open a page) wait until the output has been typed
    if (result.after) window.setTimeout(result.after, typingMs(result.lines) + 150)
  }, [input, ctx, animatingLines])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { submit(); return }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx.current + 1, historyRef.current.length - 1)
      historyIdx.current = next
      setInput(historyRef.current[next] ?? '')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = historyIdx.current - 1
      historyIdx.current = next
      setInput(next < 0 ? '' : historyRef.current[next] ?? '')
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const match = COMMAND_NAMES.find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  // Colors are --term-* tokens (globals.css): the amber CRT in dark mode, "Paper Ember" in light
  const colorClass = (color?: string) => ({
    prompt: 'text-[var(--term-prompt)]',
    cmd: 'text-[var(--term-cmd)]',
    output: 'text-[var(--term-out)]',
    muted: 'text-[var(--term-hint)]',
    dim: 'text-[var(--term-dim)]',
    white: 'text-[var(--term-head)]',
    plain: 'text-[var(--term-cmd)]',
  }[color ?? 'plain'] ?? 'text-[var(--term-cmd)]')

  return (
    /* Entrance: fade + slide from right */
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
      className="w-full max-w-[23.75rem] cursor-text relative"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Float loop — outside the tilt, so the animated layer only moves the already-tilted terminal */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      >
      {/* Static 3D tilt — plain div so Framer Motion doesn't override it */}
      <div
        style={{
          transform: 'perspective(900px) rotateY(-10deg) rotateX(2deg) rotate(3deg) skewX(-2deg)',
        }}
      >
        {/* CRT scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-xl"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, var(--term-scan) 3px, var(--term-scan) 4px)',
          }}
        />

        {/* Window */}
        <div
          className="rounded-xl overflow-hidden border border-[var(--term-border)]"
          style={{
            background: 'var(--term-bg)',
            // Drop shadows live here as box-shadow, not as a `filter` on the tilted wrapper:
            // a filter can force the whole terminal into a bitmap before the 3D tilt, softening the text.
            boxShadow: 'var(--term-shadow)',
          }}
        >
          {/* Chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--term-rule)]" style={{ background: 'var(--term-chrome)' }}>
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.6)]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.5)]" />
            <span className="ml-3 font-mono text-[0.5625rem] text-[var(--term-title)] tracking-wide">paros@paderborn — portfolio v2.0</span>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            className="p-4 font-mono text-[0.6875rem] leading-[1.85] max-h-[16.25rem] overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Hint */}
            <div className="text-[var(--term-hint)] mb-1">{HINT}</div>

            {/* Completed blocks */}
            {blocks.map((block, i) => (
              <div key={i} className="mt-1">
                {block.input && (
                  <div>
                    <span className="text-[var(--term-prompt)]">paros@paderborn</span>
                    <span className="text-[var(--term-sep)]">:~$ </span>
                    <span className="text-[var(--term-cmd)]">{block.input}</span>
                  </div>
                )}
                {block.lines.map((line, j) => (
                  line.blank
                    ? <div key={j} className="h-[0.8em]" />
                    : <div key={j} className={`${colorClass(line.color)} ${line.bold ? 'font-bold' : ''} whitespace-pre-wrap`}>{line.text}</div>
                ))}
              </div>
            ))}

            {/* Animating block */}
            {animatingLines && (
              <div className="mt-1">
                {animatingLines.slice(0, currentLine).map((line, i) => (
                  line.blank
                    ? <div key={i} className="h-[0.8em]" />
                    : <div key={i} className={`${colorClass(line.color)} ${line.bold ? 'font-bold' : ''} whitespace-pre-wrap`}>{line.text}</div>
                ))}
                {currentLine < animatingLines.length && (
                  <div className={`${colorClass(animatingLines[currentLine]?.color)} ${animatingLines[currentLine]?.bold ? 'font-bold' : ''}`}>
                    {visibleText}
                  </div>
                )}
              </div>
            )}

            {/* Prompt */}
            <div className="flex items-center mt-1">
              <span className="text-[var(--term-prompt)]">paros@paderborn</span>
              <span className="text-[var(--term-sep)]">:~$ </span>
              <span className="text-[var(--term-cmd)]">{input}</span>
              <span className="inline-block w-[0.4375rem] h-[0.8125rem] bg-[var(--term-cursor)] ml-px rounded-[1px] animate-[cursor-blink_1s_step-end_infinite]" />
            </div>
          </div>
        </div>
      </div>
      </motion.div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        aria-label="Terminal input"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </motion.div>
  )
}
