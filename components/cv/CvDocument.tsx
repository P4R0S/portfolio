'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { publications, type Publication } from '@/content/publications'
import {
  cvContact, cvEducation, cvLanguages, cvName, cvOtherJobs, cvResearchAssistant, cvSkills, cvSummary,
  type CvJob,
} from '@/content/cv'

const serif = { fontFamily: 'var(--font-crimson-pro), serif' }
const sans = (weight: number) => ({ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: weight })

// Published papers first, then submissions under review
const papers: Publication[] = [...publications].sort(
  (a, b) => Number(a.status === 'under-review') - Number(b.status === 'under-review') || b.year - a.year
)

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true },
})

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b pb-1 mb-2.5" style={{ borderColor: 'var(--cv-accent)' }}>
      <p className="text-[14px] font-semibold tracking-[2.8px] uppercase" style={{ ...serif, color: 'var(--cv-side-ink)' }}>
        {children}
      </p>
    </div>
  )
}

function MainHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b pb-1 mb-5" style={{ borderColor: 'var(--cv-rule)' }}>
      <h2 className="text-[16px] font-semibold tracking-[2.4px] uppercase" style={{ ...serif, color: 'var(--cv-ink)' }}>
        {children}
      </h2>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="text-[8px] mt-1.5 shrink-0" style={{ color: 'var(--cv-accent)' }} aria-hidden="true">●</span>
      <span className="text-[14px] leading-snug" style={{ ...sans(300), color: 'var(--cv-ink-soft)' }}>{children}</span>
    </li>
  )
}

function StatusPill({ paper }: { paper: Publication }) {
  if (paper.status !== 'under-review') return null
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-px text-[10.5px] uppercase tracking-[1px]"
      style={{ ...sans(500), color: 'var(--cv-accent)', borderColor: 'color-mix(in srgb, var(--cv-accent) 40%, transparent)' }}
    >
      Under review
    </span>
  )
}

function venueLabel(p: Publication) {
  return `${p.venueShort ?? p.venue} ${p.year}`
}

/** Publications, after Professional Experience */
function PublicationsSection({ delay }: { delay: number }) {
  return (
    <motion.section {...reveal(delay)}>
      <MainHeading>Publications</MainHeading>
      <ol className="flex flex-col gap-5">
        {papers.map((p) => (
          <li key={p.title} className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[14px]" style={{ ...sans(500), color: 'var(--cv-accent)' }}>{venueLabel(p)}</span>
              <StatusPill paper={p} />
            </div>
            <h3 className="text-[17px] leading-snug" style={{ ...serif, fontWeight: 600, color: 'var(--cv-ink)' }}>
              {p.title}
            </h3>
            <p className="text-[13px]" style={{ ...sans(300), color: 'var(--cv-muted)' }}>
              {p.status === 'under-review' ? `Submitted to ${p.venue}` : p.venue}
            </p>
          </li>
        ))}
      </ol>
    </motion.section>
  )
}

function Job({ job }: { job: CvJob }) {
  return (
    <div className="relative">
      <div className="absolute -left-[27px] top-2 w-3 h-3 rounded-full" style={{ background: 'var(--cv-accent)' }} />
      <div className="flex flex-col gap-0.5 mb-2">
        <h3 className="text-[20px] leading-tight" style={{ ...serif, fontWeight: 600, color: 'var(--cv-ink)' }}>
          {job.role}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3">
          <span className="text-[14px]" style={{ ...sans(500), color: 'var(--cv-accent)' }}>{job.company}</span>
          <span className="text-[13px]" style={{ ...sans(400), color: 'var(--cv-muted)' }}>{job.period}</span>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5">
        {job.bullets.map((b) => <Bullet key={b}>{b}</Bullet>)}
      </ul>
    </div>
  )
}

function ExperienceSection({ delay }: { delay: number }) {
  return (
    <motion.section {...reveal(delay)}>
      <MainHeading>Professional Experience</MainHeading>
      <div className="flex flex-col gap-7 border-l-2 pl-5 relative" style={{ borderColor: 'var(--cv-rule)' }}>
        <Job job={cvResearchAssistant} />
        {cvOtherJobs.map((job) => <Job key={job.role} job={job} />)}
      </div>
    </motion.section>
  )
}

function EducationSection({ delay }: { delay: number }) {
  return (
    <motion.section {...reveal(delay)}>
      <MainHeading>Education</MainHeading>
      <div className="flex flex-col gap-5">
        {cvEducation.map((edu) => (
          <div key={edu.degree}>
            <h3 className="text-[18px] leading-tight mb-1" style={{ ...serif, fontWeight: 600, color: 'var(--cv-ink)' }}>
              {edu.degree}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 mb-0.5">
              <span className="text-[13px]" style={{ color: 'var(--cv-subtle)' }} aria-hidden="true">•</span>
              <span className="text-[14px]" style={{ ...sans(400), color: 'var(--cv-ink-soft)' }}>{edu.school}</span>
              <span className="text-[13px]" style={{ ...sans(400), color: 'var(--cv-muted)' }}>{edu.period}</span>
            </div>
            <p className="text-[13px] pl-4" style={{ ...sans(300), color: 'var(--cv-muted)' }}>{edu.note}</p>
            {edu.highlights && (
              <ul className="flex flex-col gap-1 mt-2 pl-4">
                {edu.highlights.map((h) => <Bullet key={h}>{h}</Bullet>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  )
}

export function CvDocument() {
  return (
    <div
      className="w-full max-w-5xl relative overflow-hidden flex flex-col md:flex-row border shadow-[0px_25px_50px_0px_rgba(0,0,0,0.35)]"
      style={{ borderColor: 'var(--cv-ink-soft)' }}
    >
      {/* Corner brackets */}
      {['top-0 left-0 border-l-[3px] border-t-[3px]', 'top-0 right-0 border-r-[3px] border-t-[3px]',
        'bottom-0 left-0 border-l-[3px] border-b-[3px]', 'bottom-0 right-0 border-r-[3px] border-b-[3px]'].map((pos) => (
        <div key={pos} className={`absolute ${pos} w-16 h-16 z-10 pointer-events-none`} style={{ borderColor: 'var(--cv-accent)' }} />
      ))}

      {/* ── SIDEBAR ── (below md it stacks under the main column, so the name comes first) */}
      <motion.aside
        className="w-full md:w-[280px] shrink-0 flex flex-col gap-6 pt-10 px-8 pb-10"
        style={{ background: 'linear-gradient(180deg, var(--cv-side-from) 0%, var(--cv-side-to) 100%)' }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex justify-center">
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-2" style={{ borderColor: 'color-mix(in srgb, var(--cv-accent) 40%, transparent)' }}>
            <Image src="/images/CV_pic.png" alt="Parsa Rostamzadeh" width={180} height={180} className="object-cover w-full h-full" priority />
          </div>
        </div>

        <motion.div {...reveal(0.1)}>
          <SidebarHeading>Contact</SidebarHeading>
          <dl className="flex flex-col gap-3">
            {cvContact.map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5">
                <dt className="text-[11px] tracking-[0.56px] uppercase" style={{ ...sans(400), color: 'var(--cv-side-muted)' }}>{row.label}</dt>
                <dd className="text-[13px] leading-snug break-all" style={{ ...sans(300), color: 'var(--cv-side-ink)' }}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div {...reveal(0.2)}>
          <SidebarHeading>Languages</SidebarHeading>
          <div className="flex flex-col gap-3">
            {cvLanguages.map((lang) => (
              <div key={lang.name}>
                <p className="text-[13px] leading-snug" style={{ ...sans(400), color: 'var(--cv-side-ink)' }}>{lang.name}</p>
                <p className="text-[11px] leading-snug" style={{ ...sans(300), color: 'var(--cv-side-muted)' }}>{lang.level}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal(0.3)}>
          <SidebarHeading>Skills</SidebarHeading>
          <div className="flex flex-col gap-4">
            {cvSkills.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] tracking-[0.56px] uppercase mb-1" style={{ ...sans(400), color: 'var(--cv-side-muted)' }}>{group.label}</p>
                {/* Comma-separated text: reads like a document, prints cleanly, ATS-friendly.
                    Each name is nowrap so lines only break between skills. */}
                <ul className="text-[12.5px] leading-[1.75]" style={{ ...sans(300), color: 'var(--cv-side-ink)' }}>
                  {group.items.map((skill, i) => (
                    <li key={skill} className="inline">
                      <span className="whitespace-nowrap">{skill}</span>
                      {i < group.items.length - 1 && (
                        <span style={{ color: 'var(--cv-side-muted)' }}>{', '}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.aside>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        className="order-first md:order-none flex-1 min-w-0 flex flex-col gap-6 pt-10 md:pt-14 px-6 sm:px-10 md:px-14 pb-14"
        style={{ background: 'var(--cv-paper)' }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="border-b-2 pb-3" style={{ borderColor: 'var(--cv-accent)' }}>
          <h1 className="leading-tight tracking-tight" style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', color: 'var(--cv-ink)' }}>
            {cvName.first}<br />{cvName.last}
          </h1>
        </div>

        <motion.section {...reveal(0.1)}>
          <MainHeading>Professional Summary</MainHeading>
          <p className="text-[15px] leading-relaxed" style={{ ...sans(300), color: 'var(--cv-ink-soft)' }}>{cvSummary}</p>
        </motion.section>

        <ExperienceSection delay={0.15} />
        <PublicationsSection delay={0.18} />
        <EducationSection delay={0.2} />
      </motion.div>
    </div>
  )
}
