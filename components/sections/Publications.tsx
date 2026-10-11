import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { publications, SELF_AUTHOR, type ResearchArea } from '@/content/publications'
import { FileText, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ExpandableText } from '@/components/ui/ExpandableText'

const areaColors: Record<ResearchArea, string> = {
  ML: 'text-warm border-warm/30 bg-warm/10',
  Hardware: 'text-fg-soft border-line bg-surface',
  'Approximate Computing': 'text-accent-fg border-accent/30 bg-accent-tint',
  LLM: 'text-warm border-warm/30 bg-warm/10',
}

export function Publications() {
  const sorted = [...publications].sort((a, b) => b.year - a.year)

  return (
    <SectionWrapper id="publications">
      <div className="text-center mb-12">
        <p className="text-fg-3 text-xs tracking-widest uppercase mb-2">Research output</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          <GradientText>Publications</GradientText>
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {sorted.map((pub) => (
          <GlassCard key={pub.title} className="group p-6 md:p-8 transition-colors duration-300 hover:border-accent/30">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* The paper turns into a chip on hover: research that ends up in silicon */}
              <span aria-hidden="true" className="relative w-5 h-5 shrink-0 mt-0.5">
                <FileText className="absolute inset-0 w-5 h-5 text-fg-3 transition-all duration-300 group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-90" />
                <Cpu className="absolute inset-0 w-5 h-5 text-accent opacity-0 scale-50 -rotate-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={cn('text-[0.625rem] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full border', areaColors[pub.area])}>
                    {pub.area}
                  </span>
                  <span className="text-fg-3 text-xs">{pub.year}</span>
                  {pub.status === 'under-review' && (
                    <span className="flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full border border-line bg-surface text-fg-soft">
                      <span className="w-1.5 h-1.5 rounded-full bg-warm animate-pulse" />
                      Under review
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-semibold text-fg mb-1 leading-snug">
                  {pub.title}
                </h3>
                {pub.authors && (
                  <p className="text-fg-2 text-xs mb-1">
                    {pub.authors.map((a, i) => (
                      <span key={a}>
                        {a === SELF_AUTHOR ? <strong className="text-fg font-semibold">{a}</strong> : a}
                        {i < pub.authors!.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                )}
                <p className="text-warm-fg text-xs mb-3">
                  {pub.status === 'under-review'
                    ? `Submitted to ${pub.venue} ${pub.year} · awaiting acceptance`
                    : [pub.venue, pub.venueNote].filter(Boolean).join(' · ')}
                </p>
                <ExpandableText text={pub.abstract} className="text-fg-2 text-sm leading-relaxed" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  )
}
