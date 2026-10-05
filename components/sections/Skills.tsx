import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { Brain, Cpu, Code2, Wrench } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

const mlAiTags = [
  'PyTorch', 'Graph Neural Networks', 'PyTorch Geometric',
  'XAI', 'NumPy', 'SciPy', 'scikit-learn', 'NetworkX',
]

const hardwareItems = [
  'FPGA', 'RTL Design', 'Circuit Design', 'Standard Cell Design (VLSI)',
  'Xilinx Vivado', 'Yosys / ABC', 'LSOracle', 'Icarus Verilog', 'BLASYS',
]

const languages = ['Python', 'C / C++', 'Verilog', 'Bash', 'TypeScript', 'JavaScript']

const toolTags = [
  'Linux', 'Git', 'Docker', 'HPC / SLURM', 'Jupyter', 'LaTeX',
  'Synopsys Design Compiler', 'Cadence Innovus', 'QuestaSim',
]

// ── Sub-components ────────────────────────────────────────────────────────────

function CardNumber({ children, color }: { children: string; color: string }) {
  return (
    <span className={`font-bold leading-none select-none ${color}`} style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
      {children}
    </span>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <SectionWrapper id="skills">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-fg-3 text-xs tracking-widest uppercase mb-2">What I work with</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          Skills & <GradientText>Tech Stack</GradientText>
        </h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* ── 01 ML / AI — large top-left card ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_20px_40px_var(--card-shadow)]
                     md:col-span-8 md:row-start-1"
          style={{ background: 'var(--raised)' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(160deg, color-mix(in srgb, var(--accent-hex) 8%, transparent) 0%, transparent 100%)' }}
          />

          <div className="relative flex flex-col gap-12">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <Brain className="w-7 h-7 text-accent-fg" />
                <h3 className="font-bold text-[30px] leading-9 text-fg">ML / AI</h3>
              </div>
              <CardNumber color="text-[color-mix(in_srgb,var(--accent-hex)_20%,transparent)]">01</CardNumber>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {mlAiTags.map((tag) => (
                <span
                  key={tag}
                  className="px-[17px] py-[7px] rounded-full text-[12px] font-medium text-fg"
                  style={{ background: 'var(--raised-2)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 02 Hardware — tall right card (spans both rows) ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_20px_40px_var(--card-shadow)]
                     md:col-span-4 md:row-start-1 md:row-span-2"
          style={{ background: 'var(--raised)' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--accent-hex) 5%, transparent), transparent)' }}
          />

          <div className="relative flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <Cpu className="w-7 h-7 text-accent-fg-hover" />
                <h3 className="font-bold text-[30px] leading-9 text-fg">Hardware</h3>
              </div>
              <CardNumber color="text-[color-mix(in_srgb,var(--accent-hex)_20%,transparent)]">02</CardNumber>
            </div>

            {/* Description */}
            <p className="text-[14px] leading-relaxed font-light text-[#a1a1aa]">
              Synthesis and verification at the gate-level,
              optimizing for specific silicon constraints.
            </p>

            {/* List */}
            <ul className="flex flex-col gap-3">
              {hardwareItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-[14px] font-medium text-fg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 03 Languages — bottom-left card ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_20px_40px_var(--card-shadow)]
                     md:col-span-4 md:row-start-2"
          style={{ background: 'var(--raised)' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(210deg, color-mix(in srgb, var(--accent-hex) 7%, transparent) 0%, transparent 100%)' }}
          />

          <div className="relative flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <Code2 className="w-7 h-7 text-accent-fg" />
                <h3 className="font-bold text-[24px] leading-8 text-fg">Languages</h3>
              </div>
              <CardNumber color="text-[color-mix(in_srgb,var(--accent-hex)_20%,transparent)]">03</CardNumber>
            </div>

            {/* 2-col language grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {languages.map((lang) => (
                <span key={lang} className="text-[13px] text-[#d4d4d8] font-mono">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 04 Tools & Infra — bottom-middle card ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_20px_40px_var(--card-shadow)]
                     md:col-span-4 md:row-start-2"
          style={{ background: 'var(--raised)' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(150deg, color-mix(in srgb, var(--accent-hex) 6%, transparent) 0%, transparent 100%)' }}
          />

          <div className="relative flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <Wrench className="w-7 h-7 text-accent-fg" />
                <h3 className="font-bold text-[24px] leading-8 text-fg">Tools &amp; Infra</h3>
              </div>
              <CardNumber color="text-[color-mix(in_srgb,var(--accent-hex)_20%,transparent)]">04</CardNumber>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {toolTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-2xl text-[12px] font-medium text-fg"
                  style={{ background: 'var(--raised-2)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
