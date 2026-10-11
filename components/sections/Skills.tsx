import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { Brain, Cpu, Code2, Wrench } from 'lucide-react'
import * as motion from 'framer-motion/client'

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

// The big card number draws itself as an outline when scrolled into view, then fills in
function CardNumber({ children }: { children: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden="true"
      className="select-none shrink-0 overflow-visible"
      style={{ width: 'clamp(4.5rem, 9vw, 9rem)' }}
    >
      <motion.text
        x="120"
        y="68"
        textAnchor="end"
        className="font-heading"
        fontWeight={700}
        fontSize="84"
        stroke="var(--accent-hex)"
        strokeWidth={1.25}
        strokeDasharray={420}
        initial={{ strokeDashoffset: 420, fillOpacity: 0, strokeOpacity: 0.7 }}
        whileInView={{ strokeDashoffset: 0, fillOpacity: 0.2, strokeOpacity: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          strokeDashoffset: { duration: 1.6, ease: 'easeInOut' },
          fillOpacity: { duration: 0.6, delay: 1.3 },
          strokeOpacity: { duration: 0.6, delay: 1.5 },
        }}
        style={{ fill: 'var(--accent-hex)' }}
      >
        {children}
      </motion.text>
    </svg>
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
          className="relative overflow-hidden rounded-[2rem] p-8 shadow-[0_20px_40px_var(--card-shadow)]
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
                <h3 className="font-bold text-[1.875rem] leading-9 text-fg">ML / AI</h3>
              </div>
              <CardNumber>01</CardNumber>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {mlAiTags.map((tag) => (
                <span
                  key={tag}
                  className="px-[1.0625rem] py-[0.4375rem] rounded-full text-[0.75rem] font-medium text-fg"
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
          className="relative overflow-hidden rounded-[2rem] p-8 shadow-[0_20px_40px_var(--card-shadow)]
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
                <h3 className="font-bold text-[1.875rem] leading-9 text-fg">Hardware</h3>
              </div>
              <CardNumber>02</CardNumber>
            </div>

            {/* Description */}
            <p className="text-[0.875rem] leading-relaxed font-light text-fg-2">
              Synthesis and verification at the gate-level,
              optimizing for specific silicon constraints.
            </p>

            {/* List */}
            <ul className="flex flex-col gap-3">
              {hardwareItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-[0.875rem] font-medium text-fg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 03 Languages — bottom-left card ── */}
        <div
          className="relative overflow-hidden rounded-[2rem] p-8 shadow-[0_20px_40px_var(--card-shadow)]
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
                <h3 className="font-bold text-[1.5rem] leading-8 text-fg">Languages</h3>
              </div>
              <CardNumber>03</CardNumber>
            </div>

            {/* 2-col language grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {languages.map((lang) => (
                <span key={lang} className="text-[0.8125rem] text-fg-soft font-mono">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 04 Tools & Infra — bottom-middle card ── */}
        <div
          className="relative overflow-hidden rounded-[2rem] p-8 shadow-[0_20px_40px_var(--card-shadow)]
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
                <h3 className="font-bold text-[1.5rem] leading-8 text-fg">Tools &amp; Infra</h3>
              </div>
              <CardNumber>04</CardNumber>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {toolTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-2xl text-[0.75rem] font-medium text-fg"
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
