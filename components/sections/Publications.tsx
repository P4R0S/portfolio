import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { publications, type ResearchArea } from '@/content/publications'
import { FileText, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const areaColors: Record<ResearchArea, string> = {
  ML: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  Hardware: 'text-zinc-300 border-zinc-500/30 bg-zinc-500/10',
  'Approximate Computing': 'text-orange-400 border-orange-400/30 bg-orange-400/10',
  LLM: 'text-amber-300 border-amber-300/30 bg-amber-300/10',
}

export function Publications() {
  const sorted = [...publications].sort((a, b) => b.year - a.year)

  return (
    <SectionWrapper id="publications">
      <div className="text-center mb-12">
        <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">Research output</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          <GradientText>Publications</GradientText>
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {sorted.map((pub) => (
          <GlassCard key={pub.title} hover className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <FileText className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={cn('text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full border', areaColors[pub.area])}>
                    {pub.area}
                  </span>
                  <span className="text-slate-600 text-xs">{pub.year}</span>
                </div>
                <h3 className="font-heading font-semibold text-white mb-1 leading-snug">
                  {pub.title}
                </h3>
                <p className="text-amber-400/70 text-xs mb-3">{pub.venue}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{pub.abstract}</p>
                <div className="flex items-center gap-4">
                  {pub.pdfUrl && (
                    <a
                      href={pub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" /> PDF
                    </a>
                  )}
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> DOI
                    </a>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  )
}
