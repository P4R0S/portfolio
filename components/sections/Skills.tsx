import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { skillCategories } from '@/content/skills'
import { cn } from '@/lib/utils'

const accentMap: Record<string, string> = {
  violet: 'border-violet-500/30 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20',
  blue: 'border-blue-500/30 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20',
  emerald: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20',
  orange: 'border-orange-500/30 text-orange-300 bg-orange-500/10 hover:bg-orange-500/20',
}

const headerAccentMap: Record<string, string> = {
  violet: 'text-violet-400',
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  orange: 'text-orange-400',
}

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-12">
        <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">What I work with</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          Skills & <GradientText>Tech Stack</GradientText>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {skillCategories.map((category) => (
          <GlassCard key={category.name} className="p-6">
            <h3 className={cn('font-heading font-semibold text-sm uppercase tracking-widest mb-4', headerAccentMap[category.accent])}>
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    'px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-200 cursor-default',
                    accentMap[category.accent]
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  )
}
