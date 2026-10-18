import type { OutputLine } from './types'
import { projects } from '@/content/projects'
import { publications } from '@/content/publications'
import { experience } from '@/content/experience'

/** Side effects a command can trigger, provided by the terminal component */
export interface CommandContext {
  scrollTo: (id: string) => void
  navigate: (href: string) => void
  openUrl: (url: string) => void
  getTheme: () => 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export interface CommandResult {
  lines: OutputLine[]
  /** Wipe the screen instead of printing */
  clear?: boolean
  /** Runs once the output has been printed (scrolling, opening a page, …) */
  after?: () => void
}

// Home-page sections, in page order. Keep in sync with the anchor IDs and the navbar.
export const SECTIONS = ['about', 'skills', 'projects', 'experience', 'publications', 'contact']
export const PAGES = ['cv', 'hobbies']

/** Top-level command names, for Tab completion */
export const COMMAND_NAMES = ['help', 'whoami', 'journey', 'skills', 'ls', 'cd', 'projects', 'open', 'papers', 'cv', 'theme', 'clear']

const out = (text: string): OutputLine => ({ text, color: 'output' })
const head = (text: string): OutputLine => ({ text, color: 'white', bold: true })
const muted = (text: string): OutputLine => ({ text, color: 'muted' })
const rule = (): OutputLine => ({ text: RULE, color: 'dim' })
const RULE = '──────────────────────────────'

/** Shorten to fit the narrow terminal (about 44 columns) */
const fit = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1)}…` : text)

function help(): CommandResult {
  return {
    lines: [
      head('About me'),
      out('  whoami        who is this person?'),
      out('  journey       my path so far'),
      out('  skills        technical skills by category'),
      head('Explore'),
      out('  ls            list sections and pages'),
      out('  cd <name>     jump to a section or page'),
      out('  projects      list projects'),
      out('  open <n>      open project n on GitHub'),
      out('  papers        list publications'),
      out('  cv            open my CV'),
      head('Terminal'),
      out('  theme <mode>  switch to light or dark'),
      out('  clear         clear the screen'),
    ],
  }
}

function whoami(): CommandResult {
  return {
    lines: [
      head('Parsa Rostamzadeh'),
      out('Graduate Research Assistant — Approximate Computing'),
      out('Paderborn University · github.com/P4R0S'),
    ],
  }
}

function journey(): CommandResult {
  // Newest first, from content/experience.ts (the same data as the Experience section)
  const sorted = [...experience].sort((a, b) => Number(b.startDate) - Number(a.startDate))
  // Keep organisation names on one line in the narrow terminal
  const org = (name: string) => (name.length > 44 ? name.replace('University', 'Univ.') : name)
  return {
    lines: [
      ...sorted.flatMap((e) => [
        { text: `● ${e.startDate} — ${e.endDate === 'Present' ? 'now' : e.endDate}`, color: 'prompt' as const },
        head(`  ${e.role}`),
        out(`  ${fit(org(e.company), 44)}`),
      ]),
      muted('Details: `cd experience` · full CV: `cv`'),
    ],
  }
}

function skills(): CommandResult {
  return {
    lines: [
      rule(),
      head('[ Languages ]'),
      out('  Python · C/C++ · Verilog · Bash'),
      out('  TypeScript · JavaScript'),
      head('[ ML / AI ]'),
      out('  PyTorch · GNN · XAI · scikit-learn'),
      head('[ Hardware ]'),
      out('  FPGA · RTL · Circuit Design · VLSI'),
      out('  Approximate Circuits · Yosys / ABC'),
      head('[ EDA ]'),
      out('  Design Compiler · Innovus · QuestaSim'),
      out('  Xilinx Vivado · Icarus Verilog'),
      head('[ Tools ]'),
      out('  Git · Linux · Docker · HPC/SLURM'),
      rule(),
    ],
  }
}

function ls(): CommandResult {
  return {
    lines: [
      head('sections/'),
      out(`  ${SECTIONS.slice(0, 3).map((s) => `${s}/`).join('  ')}`),
      out(`  ${SECTIONS.slice(3).map((s) => `${s}/`).join('  ')}`),
      head('pages/'),
      out(`  ${PAGES.map((p) => `${p}/`).join('  ')}`),
      muted('Try `cd projects` or `cd cv`.'),
    ],
  }
}

function cd(ctx: CommandContext, target?: string): CommandResult {
  const name = (target ?? '~').replace(/^[~.]?\/+/, '').replace(/\/+$/, '').toLowerCase()

  if (name === '' || name === '~' || name === '..') {
    return { lines: [muted('→ ~')], after: () => ctx.scrollTo('top') }
  }
  if (SECTIONS.includes(name)) {
    return { lines: [muted(`→ ~/${name}`)], after: () => ctx.scrollTo(name) }
  }
  if (PAGES.includes(name)) {
    return { lines: [muted(`Opening /${name}…`)], after: () => ctx.navigate(`/${name}`) }
  }
  return {
    lines: [out(`cd: no such directory: ${target}`), muted('Try `ls` to see where you can go.')],
  }
}

function listProjects(): CommandResult {
  return {
    lines: [
      ...projects.map((p, i) =>
        out(`${String(i + 1).padStart(2)}  ${p.featured ? '★' : ' '} ${fit(p.title, 38)}`)
      ),
      muted('★ featured · `open <n>` to view the code'),
    ],
  }
}

function open(ctx: CommandContext, arg?: string): CommandResult {
  if (arg === 'github') {
    return {
      lines: [muted('Opening github.com/P4R0S…')],
      after: () => ctx.openUrl('https://github.com/P4R0S'),
    }
  }
  if (arg === 'cv') return cd(ctx, 'cv')

  const n = Number(arg)
  const project = Number.isInteger(n) ? projects[n - 1] : undefined
  if (!project) {
    return {
      lines: [
        out(arg ? `open: no project ${arg}` : 'usage: open <n> | open github'),
        muted(`Projects are numbered 1–${projects.length}. Try \`projects\`.`),
      ],
    }
  }
  if (!project.github) {
    return { lines: [out(`${project.title}`), muted('This repository is private.')] }
  }
  const url = project.github
  return {
    lines: [muted(`Opening ${url.replace('https://', '')}…`)],
    after: () => ctx.openUrl(url),
  }
}

function papers(): CommandResult {
  const sorted = [...publications].sort((a, b) => b.year - a.year)
  return {
    lines: [
      ...sorted.flatMap((p) => [
        head(fit(p.title.split(':')[0], 44)),
        out(
          `  ${p.venueShort ?? p.venue} ${p.year}` +
            (p.status === 'under-review' ? ' · under review' : ' · published')
        ),
      ]),
      muted('Full abstracts: `cd publications`'),
    ],
  }
}

function theme(ctx: CommandContext, mode?: string): CommandResult {
  if (mode === 'light' || mode === 'dark') {
    if (ctx.getTheme() === mode) return { lines: [muted(`Already in ${mode} mode.`)] }
    return { lines: [muted(`Switching to ${mode} mode…`)], after: () => ctx.setTheme(mode) }
  }
  return {
    lines: [out(`Current theme: ${ctx.getTheme()}`), muted('usage: theme light | theme dark')],
  }
}

export function runCommand(command: string, args: string[], ctx: CommandContext): CommandResult {
  switch (command) {
    case 'help':
      return help()
    case 'whoami':
      return whoami()
    case 'journey':
      return journey()
    case 'skills':
      return skills()
    case 'ls':
      return ls()
    case 'cd':
      return cd(ctx, args[0])
    case 'projects':
      return listProjects()
    case 'open':
      return open(ctx, args[0])
    case 'papers':
    case 'publications':
      return papers()
    case 'cv':
      return cd(ctx, 'cv')
    case 'theme':
      return theme(ctx, args[0]?.toLowerCase())
    case 'clear':
      return { lines: [], clear: true }
    default:
      return {
        lines: [
          out(`command not found: ${[command, ...args].join(' ')}`),
          muted('Try `help` to see available commands.'),
        ],
      }
  }
}
