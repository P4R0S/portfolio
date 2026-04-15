'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { OutputLine } from '@/lib/terminal/types'
import { parse } from '@/lib/terminal/parser'

const HINT = 'Type a command. Try `help`'
const COMMANDS = ['help', 'whoami', 'skills', 'open github', 'clear']

function getOutput(command: string, args: string[]): OutputLine[] | null {
  const full = [command, ...args].join(' ')

  if (full === 'help') {
    return [
      { text: 'Available commands:', color: 'white', bold: true },
      { text: '  whoami      — who is this person?', color: 'output' },
      { text: '  skills      — technical skills by category', color: 'output' },
      { text: '  open github — open github.com/P4R0S', color: 'output' },
      { text: '  clear       — clear the terminal', color: 'output' },
      { text: '  help        — show this message', color: 'output' },
    ]
  }

  if (full === 'whoami') {
    return [
      { text: 'Parsa Rostamzadeh', color: 'white', bold: true },
      { text: 'PhD Researcher — ML Systems & Approximate Computing', color: 'output' },
      { text: 'Paderborn University · github.com/P4R0S', color: 'output' },
    ]
  }

  if (full === 'skills') {
    return [
      { text: '──────────────────────────────', color: 'dim' },
      { text: '[ Languages ]', color: 'white', bold: true },
      { text: '  Python · C · C++ · Verilog · TypeScript', color: 'output' },
      { text: '[ ML / AI ]', color: 'white', bold: true },
      { text: '  PyTorch · GNN · XAI · scikit-learn', color: 'output' },
      { text: '[ Hardware ]', color: 'white', bold: true },
      { text: '  FPGA · RTL Design · Approx. Circuits', color: 'output' },
      { text: '[ Tools ]', color: 'white', bold: true },
      { text: '  Git · Linux · Docker · HPC/SLURM', color: 'output' },
      { text: '──────────────────────────────', color: 'dim' },
    ]
  }

  if (command === 'open' && args[0] === 'github') {
    window.open('https://github.com/P4R0S', '_blank', 'noopener,noreferrer')
    return [{ text: 'Opening github.com/P4R0S...', color: 'dim' }]
  }

  if (full === 'clear') {
    return null // special case handled by caller
  }

  return [
    { text: `command not found: ${full}`, color: 'output' },
    { text: 'Try `help` to see available commands.', color: 'dim' },
  ]
}

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
  const bottomRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<string[]>([])
  const historyIdx = useRef(-1)
  const rafRef = useRef<number>(0)
  const charIdx = useRef(0)

  // Typewriter for one line at a time
  useEffect(() => {
    if (!animatingLines || currentLine >= animatingLines.length) {
      if (animatingLines && currentLine >= animatingLines.length) {
        setBlocks(prev => [...prev, { lines: animatingLines }])
        setAnimatingLines(null)
        setCurrentLine(0)
        setVisibleText('')
      }
      return
    }

    const line = animatingLines[currentLine]
    if (line.blank || !line.text) {
      setCurrentLine(n => n + 1)
      return
    }

    charIdx.current = 0
    const text = line.text

    const tick = () => {
      charIdx.current++
      setVisibleText(text.slice(0, charIdx.current))
      if (charIdx.current < text.length) {
        rafRef.current = window.setTimeout(tick, 20)
      } else {
        setCurrentLine(n => n + 1)
        setVisibleText('')
      }
    }
    rafRef.current = window.setTimeout(tick, 20)
    return () => clearTimeout(rafRef.current)
  }, [animatingLines, currentLine])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [blocks, animatingLines, visibleText])

  const submit = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return

    historyRef.current.unshift(trimmed)
    historyIdx.current = -1
    setInput('')

    const { command, args } = parse(trimmed)

    if ([command, ...args].join(' ') === 'clear') {
      setBlocks([])
      setAnimatingLines(null)
      return
    }

    const lines = getOutput(command, args) ?? []
    // Prepend a block with the typed input echo
    setBlocks(prev => [...prev, { input: trimmed, lines: [] }])
    setAnimatingLines(lines)
    setCurrentLine(0)
    setVisibleText('')
  }, [input])

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
      const match = COMMANDS.find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  const colorClass = (color?: string) => ({
    prompt: 'text-[#ffb300]',
    cmd: 'text-[#ffd54f]',
    output: 'text-[#ff8f00]',
    dim: 'text-[#3d2800]',
    white: 'text-white',
    plain: 'text-[#ffd54f]',
  }[color ?? 'plain'] ?? 'text-[#ffd54f]')

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      className="w-full max-w-[300px] cursor-text relative"
      style={{ transform: 'rotate(2deg)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-xl"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,179,0,0.015) 3px, rgba(255,179,0,0.015) 4px)',
        }}
      />

      {/* Window */}
      <div
        className="rounded-xl overflow-hidden border border-[rgba(255,179,0,0.22)]"
        style={{
          background: 'rgba(13,8,0,0.94)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,179,0,0.07), 0 0 30px rgba(255,140,0,0.06)',
        }}
      >
        {/* Chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[rgba(255,179,0,0.12)]" style={{ background: 'rgba(10,6,0,0.95)' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[8px] text-[#3d2800]">paros@paderborn — portfolio v2.0</span>
        </div>

        {/* Body */}
        <div className="p-3 font-mono text-[9px] leading-[1.9] max-h-[220px] overflow-y-auto">
          {/* Hint */}
          <div className="text-[#3d2800]">{HINT}</div>

          {/* Completed blocks */}
          {blocks.map((block, i) => (
            <div key={i}>
              {block.input && (
                <div>
                  <span className="text-[#ffb300]">paros@paderborn</span>
                  <span className="text-[#3d2800]">:~$ </span>
                  <span className="text-[#ffd54f]">{block.input}</span>
                </div>
              )}
              {block.lines.map((line, j) => (
                line.blank
                  ? <div key={j} className="h-[1em]" />
                  : <div key={j} className={`${colorClass(line.color)} ${line.bold ? 'font-bold' : ''} whitespace-pre-wrap`}>{line.text}</div>
              ))}
            </div>
          ))}

          {/* Animating block */}
          {animatingLines && (
            <div>
              {animatingLines.slice(0, currentLine).map((line, i) => (
                line.blank
                  ? <div key={i} className="h-[1em]" />
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
          <div className="flex items-center mt-0.5">
            <span className="text-[#ffb300]">paros@paderborn</span>
            <span className="text-[#3d2800]">:~$ </span>
            <span className="text-[#ffd54f]">{input}</span>
            <span className="inline-block w-[6px] h-[11px] bg-[#ffb300] ml-px animate-[cursor-blink_1s_step-end_infinite]" />
          </div>

          <div ref={bottomRef} />
        </div>
      </div>

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
