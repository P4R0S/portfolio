import Image from 'next/image'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { Cpu, Zap, Target } from 'lucide-react'

const highlights = [
  {
    icon: Cpu,
    title: 'What I Do',
    body: 'I design and build systems at the boundary of ML, hardware, and software — from FPGA accelerators to LLM pipelines.',
    color: 'text-violet-400',
  },
  {
    icon: Zap,
    title: 'What Drives Me',
    body: 'Efficiency. I obsess over squeezing maximum performance from constrained hardware — approximate computing is my playground.',
    color: 'text-blue-400',
  },
  {
    icon: Target,
    title: 'Current Focus',
    body: 'Hardware-aware quantization of LLMs for edge deployment, and exploring approximate arithmetic for next-gen AI accelerators.',
    color: 'text-emerald-400',
  },
]

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="text-center mb-12">
        <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">Get to know me</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          About <GradientText>Me</GradientText>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left: photo + bio */}
        <GlassCard className="p-6 md:p-8">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-white/10 mb-6 mx-auto md:mx-0">
            <Image
              src="/images/profile.jpg"
              alt="Your Name profile photo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h3 className="font-heading font-semibold text-xl text-white mb-3">
            Computer Engineer & Researcher
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm mb-4">
            I&apos;m a computer engineer with deep roots in both software and hardware. My work sits at the intersection of machine learning, approximate computing, and digital design — I care about making intelligent systems fast, small, and power-efficient.
          </p>
          <p className="text-slate-400 leading-relaxed text-sm">
            When I&apos;m not designing circuits or fine-tuning LLMs, I write about approximate computing and publish research on making AI work in the real world — not just on expensive data-center GPUs.
          </p>
        </GlassCard>

        {/* Right: highlight cards */}
        <div className="flex flex-col gap-4">
          {highlights.map(({ icon: Icon, title, body, color }) => (
            <GlassCard key={title} hover className="p-5 flex gap-4 items-start">
              <div className={`mt-0.5 shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-white mb-1">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
