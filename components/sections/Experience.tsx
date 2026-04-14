import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { experience } from '@/content/experience'
import { Briefcase, GraduationCap } from 'lucide-react'

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="text-center mb-12">
        <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">My journey</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl">
          Experience & <GradientText>Education</GradientText>
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-blue-500 to-emerald-500 md:-translate-x-px" />

        <div className="flex flex-col gap-10">
          {experience.map((item, i) => {
            const isLeft = i % 2 === 0
            const Icon = item.type === 'education' ? GraduationCap : Briefcase

            return (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0F172A] border-2 border-violet-500 flex items-center justify-center shrink-0 z-10">
                  <Icon className="w-3.5 h-3.5 text-violet-400" />
                </div>

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
                  <GlassCard className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-heading font-semibold text-white text-sm leading-snug">
                          {item.role}
                        </h3>
                        <p className="text-violet-400 text-xs mt-0.5">{item.company}</p>
                      </div>
                      <span className="text-slate-500 text-xs whitespace-nowrap shrink-0">
                        {item.startDate} – {item.endDate}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {item.bullets.map((bullet, bi) => (
                        <li key={bi} className="text-slate-400 text-xs leading-relaxed flex gap-2">
                          <span className="text-violet-500 mt-1 shrink-0">▸</span>
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
      </div>
    </SectionWrapper>
  )
}
