'use client'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { Brain, Cpu, Code2, Wrench } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

const mlAiTags = [
  'PyTorch', 'Graph Neural Networks', 'PyTorch Geometric',
  'XAI', 'NumPy', 'SciPy', 'scikit-learn', 'NetworkX',
]

const hardwareItems = [
  'FPGA', 'RTL Design', 'Xilinx Vivado',
  'Yosys / ABC', 'LSOracle', 'Icarus Verilog', 'BLASYS',
]

const languages = ['Python', 'C / C++', 'Verilog', 'Bash', 'TypeScript', 'JavaScript']

const toolTags = ['LINUX', 'GIT', 'DOCKER', 'HPC / SLURM', 'JUPYTER', 'LATEX']

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
        <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">What I work with</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          Skills & <GradientText>Tech Stack</GradientText>
        </h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* ── 01 ML / AI — large top-left card ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                     md:col-span-8 md:row-start-1"
          style={{ background: '#222a3d' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(160deg, rgba(124,58,237,0.12) 0%, transparent 100%)' }}
          />

          <div className="relative flex flex-col gap-12">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <Brain className="w-7 h-7 text-violet-400" />
                <h3 className="font-bold text-[30px] leading-9 text-[#dae2fd]">ML / AI</h3>
              </div>
              <CardNumber color="text-[rgba(210,187,255,0.2)]">01</CardNumber>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {mlAiTags.map((tag) => (
                <span
                  key={tag}
                  className="px-[17px] py-[7px] rounded-full text-[12px] font-medium text-[#e6ecff]"
                  style={{ background: '#0566d9' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 02 Hardware — tall right card (spans both rows) ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                     md:col-span-4 md:row-start-1 md:row-span-2"
          style={{ background: '#222a3d' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,118,80,0.06), transparent)' }}
          />

          <div className="relative flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <Cpu className="w-7 h-7 text-emerald-400" />
                <h3 className="font-bold text-[30px] leading-9 text-[#dae2fd]">Hardware</h3>
              </div>
              <CardNumber color="text-[rgba(78,222,163,0.2)]">02</CardNumber>
            </div>

            {/* Description */}
            <p className="text-[14px] leading-relaxed font-light text-[#ccc3d8]">
              Synthesis and verification at the gate-level,
              optimizing for specific silicon constraints.
            </p>

            {/* List */}
            <ul className="flex flex-col gap-3">
              {hardwareItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] shrink-0" />
                  <span className="text-[14px] font-medium text-[#dae2fd]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 03 Languages — bottom-left card ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                     md:col-span-4 md:row-start-2"
          style={{ background: '#222a3d' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(210deg, rgba(5,102,217,0.1) 0%, transparent 100%)' }}
          />

          <div className="relative flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <Code2 className="w-7 h-7 text-blue-400" />
                <h3 className="font-bold text-[24px] leading-8 text-[#dae2fd]">Languages</h3>
              </div>
              <CardNumber color="text-[rgba(173,198,255,0.2)]">03</CardNumber>
            </div>

            {/* 2-col language grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {languages.map((lang) => (
                <span key={lang} className="text-[12px] text-[rgba(218,226,253,0.8)] font-mono">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 04 Tools & Infra — bottom-middle card ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                     md:col-span-4 md:row-start-2"
          style={{ background: '#222a3d' }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(150deg, rgba(74,68,85,0.12) 0%, transparent 100%)' }}
          />

          <div className="relative flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <Wrench className="w-7 h-7 text-slate-400" />
                <h3 className="font-bold text-[24px] leading-8 text-[#dae2fd]">Tools &amp; Infra</h3>
              </div>
              <CardNumber color="text-[rgba(204,195,216,0.1)]">04</CardNumber>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {toolTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-2xl text-[10px] tracking-[-0.5px] uppercase text-[#dae2fd]"
                  style={{ background: '#2d3449' }}
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
