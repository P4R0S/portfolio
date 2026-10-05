import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Publications } from '@/components/sections/Publications'
import { BlogSection } from '@/components/sections/BlogSection'
import { Contact } from '@/components/sections/Contact'
import { projects } from '@/content/projects'
import { publications } from '@/content/publications'
import { experience } from '@/content/experience'

// Derived from content so the hero never drifts out of date (evaluated at build time).
const firstWorkYear = Math.min(
  ...experience.filter((e) => e.type === 'work').map((e) => Number(e.startDate))
)
const heroStats = [
  { label: 'Projects', value: String(projects.length) },
  { label: 'Papers Published', value: String(publications.filter((p) => p.status !== 'under-review').length) },
  { label: 'Years of Exp.', value: String(new Date().getFullYear() - firstWorkYear) },
]

export default function Home() {
  return (
    <>
      <Hero stats={heroStats} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Publications />
      <BlogSection />
      <Contact />
    </>
  )
}
