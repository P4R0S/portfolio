import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { experience } from '@/content/experience'
import { Briefcase, GraduationCap } from 'lucide-react'
import { ScrollTimeline, TimelineDot } from '@/components/ui/ScrollTimeline'

// Most recent first
const sorted = [...experience].sort((a, b) => Number(b.startDate) - Number(a.startDate))

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="text-center mb-12">
        <p className="text-fg-3 text-xs tracking-widest uppercase mb-2">My journey</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          Experience & <GradientText>Education</GradientText>
        </h2>
      </div>

      {/* Timeline line fills in as you scroll; each dot lights up when the line reaches it */}
      <ScrollTimeline>

        <div className="flex flex-col gap-10">
          {sorted.map((item, i) => {
            const isLeft = i % 2 === 0
            const Icon = item.type === 'education' ? GraduationCap : Briefcase

            return (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <TimelineDot>
                  <Icon className="w-3.5 h-3.5" />
                </TimelineDot>

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
                  <GlassCard className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-heading font-semibold text-fg text-sm leading-snug">
                          {item.role}
                        </h3>
                        <p className="text-accent-fg text-xs mt-0.5">{item.company}</p>
                      </div>
                      <span className="text-fg-3 text-xs whitespace-nowrap shrink-0">
                        {item.startDate} – {item.endDate}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {item.bullets.map((bullet, bi) => (
                        <li key={bi} className="text-fg-2 text-xs leading-relaxed flex gap-2">
                          <span className="text-accent-fg/60 mt-1 shrink-0">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollTimeline>
    </SectionWrapper>
  )
}
