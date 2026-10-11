'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Animated motifs that sit in the gap between home-page sections, one per gap, each drawn from
// the ML × hardware subject: a PCB trace, logic-analyzer waveforms, a timeline, a small neural
// network, and a sine wave with its quantized (approximate) staircase.
// They take no layout space (absolutely centered on the boundary), only animate while on
// screen, and render as static drawings when the visitor prefers reduced motion.

type Variant = 'trace' | 'wave' | 'timeline' | 'network' | 'approx'

const SLATE = 'var(--fg-3)'
const AMBER = 'var(--warm)'
const ORANGE = 'var(--accent)'
const BG = 'var(--bg)'

const SIZES: Record<Variant, string> = {
  trace: 'w-[20rem]',
  wave: 'w-[18rem]',
  timeline: 'w-[2.5rem]',
  network: 'w-[13rem]',
  approx: 'w-[18rem]',
}

export function SectionDivider({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-40px' })
  const reduce = useReducedMotion() ?? false
  const Motif = MOTIFS[variant]

  return (
    <div aria-hidden="true" data-divider={variant} className="relative h-0 print:hidden">
      <div
        ref={ref}
        className={cn('absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 max-w-[80vw]', SIZES[variant])}
      >
        <Motif play={inView && !reduce} drawn={inView || reduce} />
      </div>
    </div>
  )
}

interface MotifProps {
  /** Loop animations run only while visible */
  play: boolean
  /** Draw-in has happened (or is skipped for reduced motion) */
  drawn: boolean
}

// Draw a stroke in once, the first time it scrolls into view
function drawIn(drawn: boolean, delay = 0, duration = 1) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: drawn ? { pathLength: 1, opacity: 1 } : undefined,
    transition: { pathLength: { duration, delay, ease: 'easeInOut' as const }, opacity: { duration: 0.15, delay } },
  }
}

/* About → Skills: a PCB trace between two vias with a signal pulse running along it */
function Trace({ play, drawn }: MotifProps) {
  const d = 'M10 34 H96 L114 16 H206 L224 34 H310'
  return (
    <svg viewBox="0 0 320 50" fill="none" className="w-full overflow-visible">
      <motion.path d={d} stroke={SLATE} strokeOpacity={0.55} strokeWidth={1.5} strokeLinejoin="round" {...drawIn(drawn, 0, 1.2)} />
      {play && (
        <motion.path
          d={d}
          pathLength={1}
          stroke={AMBER}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="0.1 1.1"
          style={{ filter: 'drop-shadow(0 0 4px var(--warm))' }}
          initial={{ strokeDashoffset: 0.1 }}
          animate={{ strokeDashoffset: -1 }}
          transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.9, delay: 1.2 }}
        />
      )}
      {[10, 310].map((x) => (
        <circle key={x} cx={x} cy={34} r={4.5} fill={BG} stroke={SLATE} strokeWidth={1.5} />
      ))}
      <circle cx={10} cy={34} r={1.5} fill={AMBER} />
      <circle cx={310} cy={34} r={1.5} fill={AMBER} />
    </svg>
  )
}

/* Skills → Projects: logic-analyzer view, a clock and a data line, with a sweeping cursor */
function Wave({ play, drawn }: MotifProps) {
  let clock = 'M0 22'
  for (let x = 0; x < 300; x += 30) clock += ` H${x + 15} V8 H${x + 30} V22`
  const edges = [0, 45, 75, 150, 210, 255, 300]
  let data = 'M0 50'
  edges.slice(1).forEach((x, i) => {
    const prev = i % 2 === 0 ? 50 : 36
    const next = i % 2 === 0 ? 36 : 50
    data += ` H${x - 3} L${x} ${x === 300 ? prev : next}`
  })
  return (
    <svg viewBox="0 0 300 60" fill="none" className="w-full overflow-visible">
      <motion.path d={clock} stroke={SLATE} strokeOpacity={0.6} strokeWidth={1.5} strokeLinejoin="round" {...drawIn(drawn, 0, 1.4)} />
      <motion.path d={data} stroke={ORANGE} strokeWidth={1.75} strokeLinejoin="round" {...drawIn(drawn, 0.3, 1.4)} />
      {play && (
        <motion.line
          x1={0} x2={0} y1={0} y2={60}
          stroke={AMBER}
          strokeWidth={1.5}
          strokeDasharray="3 3"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [0, 300], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, ease: 'linear', repeat: Infinity, repeatDelay: 1.2, delay: 1.6 }}
        />
      )}
    </svg>
  )
}

/* Projects → Experience: a short vertical timeline whose nodes light up in order, heading down */
function Timeline({ play, drawn }: MotifProps) {
  const ys = [22, 60, 98]
  return (
    <svg viewBox="0 0 40 120" fill="none" className="w-full overflow-visible">
      <motion.path d="M20 0 V120" stroke={SLATE} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="2 6" strokeLinecap="round" {...drawIn(drawn, 0, 0.9)} />
      {ys.map((y, i) => (
        <g key={y}>
          <circle cx={20} cy={y} r={6} fill={BG} stroke={SLATE} strokeWidth={1.5} />
          <motion.circle
            cx={20}
            cy={y}
            r={3}
            fill={AMBER}
            style={{ filter: 'drop-shadow(0 0 3px var(--warm))' }}
            initial={{ opacity: drawn && !play ? 1 : 0 }}
            animate={play ? { opacity: [0, 1, 1, 0] } : { opacity: drawn ? 1 : 0 }}
            transition={play ? { duration: 2.4, times: [0, 0.15, 0.7, 1], repeat: Infinity, repeatDelay: 0.6, delay: 0.9 + i * 0.4 } : { duration: 0.3 }}
          />
        </g>
      ))}
    </svg>
  )
}

/* Experience → Publications: a 3-4-2 network running a forward pass, layer by layer */
function Network({ play, drawn }: MotifProps) {
  const layers = [
    { x: 20, ys: [20, 45, 70] },
    { x: 105, ys: [9, 33, 57, 81] },
    { x: 190, ys: [32, 58] },
  ]
  const edges = (a: number) =>
    layers[a].ys.flatMap((y1) => layers[a + 1].ys.map((y2) => `M${layers[a].x} ${y1} L${layers[a + 1].x} ${y2}`)).join(' ')
  const cycle = { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
  return (
    <svg viewBox="0 0 210 90" fill="none" className="w-full overflow-visible">
      {[0, 1].map((a) => (
        <g key={a}>
          <motion.path d={edges(a)} stroke={SLATE} strokeOpacity={0.3} strokeWidth={1} {...drawIn(drawn, a * 0.3, 0.8)} />
          {play && (
            <motion.path
              d={edges(a)}
              stroke={ORANGE}
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ ...cycle, times: [0, 0.2, 0.45], delay: 1.2 + 0.25 + a * 0.5 }}
            />
          )}
        </g>
      ))}
      {layers.map((l, li) =>
        l.ys.map((y) => (
          <g key={`${li}-${y}`}>
            <circle cx={l.x} cy={y} r={5} fill={BG} stroke={SLATE} strokeWidth={1.5} />
            {play && (
              <motion.circle
                cx={l.x}
                cy={y}
                r={3}
                fill={ORANGE}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ ...cycle, times: [0, 0.15, 0.5], delay: 1.2 + li * 0.5 }}
              />
            )}
          </g>
        ))
      )}
    </svg>
  )
}

/* Publications → Contact: a sine wave and its quantized staircase, approximate computing in one picture */
function Approx({ play, drawn }: MotifProps) {
  const W = 300, MID = 35, AMP = 24, PERIOD = 150, STEP = 20, LEVEL = 12
  const f = (x: number) => MID - AMP * Math.sin((2 * Math.PI * x) / PERIOD)
  let sine = `M0 ${f(0).toFixed(1)}`
  for (let x = 5; x <= W; x += 5) sine += ` L${x} ${f(x).toFixed(1)}`
  const q = (x: number) => MID + Math.round((f(x + STEP / 2) - MID) / LEVEL) * LEVEL
  let steps = `M0 ${q(0)}`
  for (let x = 0; x < W; x += STEP) steps += ` V${q(x)} H${x + STEP}`
  return (
    <svg viewBox="0 0 300 70" fill="none" className="w-full overflow-visible">
      <motion.path d={sine} stroke={SLATE} strokeOpacity={0.6} strokeWidth={1.5} strokeDasharray="1 4" strokeLinecap="round" {...drawIn(drawn, 0, 1.2)} />
      <motion.path d={steps} stroke={AMBER} strokeWidth={1.75} strokeLinejoin="round" {...drawIn(drawn, 0.6, 1.6)} />
      {play && (
        <motion.circle
          r={3.5}
          fill={ORANGE}
          style={{ offsetPath: `path('${sine}')`, filter: 'drop-shadow(0 0 4px var(--accent))' }}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4, ease: 'linear', repeat: Infinity, delay: 2.2 }}
        />
      )}
    </svg>
  )
}

const MOTIFS: Record<Variant, (p: MotifProps) => React.ReactElement> = {
  trace: Trace,
  wave: Wave,
  timeline: Timeline,
  network: Network,
  approx: Approx,
}
