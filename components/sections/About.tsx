import Image from 'next/image'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { Cpu, Zap, Target } from 'lucide-react'

const highlights = [
  {
    icon: Cpu,
    title: 'What I Do',
    body: 'I build approximate computing pipelines and hardware-aware ML systems — from FPGA-deployed neural networks to cross-layer circuit synthesis.',
    color: 'text-violet-400',
  },
  {
    icon: Zap,
    title: 'What Drives Me',
    body: 'Making neural networks smaller and faster without breaking them. Approximate computing lets me trade a little accuracy for a lot of efficiency — and I find that trade fascinating.',
    color: 'text-blue-400',
  },
  {
    icon: Target,
    title: 'Current Focus',
    body: 'Cross-layer approximate synthesis for FPGA-deployed neural networks — profiling sensitivity, generating approximate neuron variants, and exploring Pareto-optimal area-accuracy trade-offs.',
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
              alt="Parsa Rostamzadeh profile photo"
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          </div>
          <h3 className="font-heading font-semibold text-xl text-white mb-3">
            Computer Engineer & Researcher
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm mb-4">
            I&apos;m a computer engineer at Paderborn University with a focus on approximate computing, hardware-aware machine learning, and FPGA-based neural network optimization. My research centers on making deep learning deployable on resource-constrained hardware — without sacrificing more accuracy than necessary.
          </p>
          <p className="text-slate-400 leading-relaxed text-sm">
            I build end-to-end pipelines that span the full stack: from quantization-aware training and circuit synthesis to multi-objective design space exploration. When I&apos;m not optimizing circuits, I work on graph neural networks and explainability — understanding not just what models predict, but why.
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
