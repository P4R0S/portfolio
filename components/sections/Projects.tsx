import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { projects } from '@/content/projects'
import { ExternalLink, Lock } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'

const featured = projects.filter((p) => p.featured)
const rest = projects.filter((p) => !p.featured)
const displayed = [...featured, ...rest]

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <p className="text-fg-3 text-xs tracking-widest uppercase mb-2">What I&apos;ve built</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            <GradientText>Projects</GradientText>
          </h2>
        </div>
        <a
          href="https://github.com/P4R0S"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-fg-2 hover:text-fg-max transition-colors duration-200 cursor-pointer"
        >
          <FaGithub className="w-4 h-4" /> View all on GitHub
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayed.map((project) => (
          <div key={project.title} className="group relative">
            <GlassCard hover={!!project.github} className="h-full p-6 flex flex-col">
              {project.featured && (
                <span className="text-[10px] font-medium uppercase tracking-widest text-accent-fg border border-accent/30 rounded-full px-2 py-0.5 self-start mb-3">
                  Featured
                </span>
              )}
              <h3 className="font-heading font-semibold text-fg-max mb-2 leading-snug">
                {project.github ? (
                  // Stretched link: its ::after covers the whole card, so the card is one click target
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-accent/60"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="text-fg-2 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-surface border border-line text-fg-2"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs">
                {project.github ? (
                  <span className="flex items-center gap-1.5 text-fg-3 group-hover:text-accent-fg transition-colors duration-200">
                    <FaGithub className="w-4 h-4" /> View code
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-fg-4">
                    <Lock className="w-3.5 h-3.5" /> Private repository
                  </span>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="relative z-10 text-fg-3 hover:text-fg-max transition-colors duration-200 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </GlassCard>

            {/* Hover overlay with long description */}
            <div className="absolute inset-0 rounded-2xl bg-bg/95 backdrop-blur-sm border border-accent/20 p-6 flex items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-fg-soft text-sm leading-relaxed">{project.longDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
