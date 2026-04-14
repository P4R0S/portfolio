import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { projects } from '@/content/projects'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'

const featured = projects.filter((p) => p.featured)
const rest = projects.filter((p) => !p.featured)
const displayed = [...featured, ...rest]

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">What I&apos;ve built</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            <GradientText>Projects</GradientText>
          </h2>
        </div>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <FaGithub className="w-4 h-4" /> View all on GitHub
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayed.map((project) => (
          <div key={project.title} className="group relative">
            <GlassCard hover className="h-full p-6 flex flex-col">
              {project.featured && (
                <span className="text-[10px] font-medium uppercase tracking-widest text-violet-400 border border-violet-500/30 rounded-full px-2 py-0.5 self-start mb-3">
                  Featured
                </span>
              )}
              <h3 className="font-heading font-semibold text-white mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                    className="text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </GlassCard>

            {/* Hover overlay with long description */}
            <div className="absolute inset-0 rounded-2xl bg-[#0F172A]/95 backdrop-blur-sm border border-violet-500/30 p-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-slate-300 text-sm leading-relaxed">{project.longDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
