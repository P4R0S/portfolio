import { hobbies } from '@/content/hobbies'
import { HobbiesCarousel } from '@/components/hobbies/HobbiesCarousel'
import { BookOpen, Film, Tv, Gamepad2, Music, Mic, type LucideIcon } from 'lucide-react'

const categoryIcons: Record<string, LucideIcon> = {
  books:    BookOpen,
  movies:   Film,
  series:   Tv,
  games:    Gamepad2,
  music:    Music,
  podcasts: Mic,
}

export default function HobbiesPage() {
  return (
    // overflow-x-clip: the carousels run past the screen edges by design; without this the
    // page itself grows wider than the viewport on phones (and pushes the navbar menu off-screen).
    // `clip` (not `hidden`) creates no scroll container, so card shadows above/below stay visible.
    <div className="min-h-screen overflow-x-clip">
      <div className="relative z-10 pt-24 pb-28">

        {/* Hero — constrained */}
        <div className="max-w-[1000px] mx-auto px-7 mb-20">
          <div
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent-fg mb-4 px-3 py-1 rounded-full border border-accent/20"
            style={{ background: 'color-mix(in srgb, var(--accent-hex) 8%, transparent)' }}
          >
            ✦ Beyond the code
          </div>
          <h1
            className="font-heading font-extrabold leading-[1.04] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, var(--fg) 0%, var(--fg-2) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hobbies &amp;{' '}
            </span>
            <br />
            <span className="gradient-text">Interests</span>
          </h1>
          <p className="text-fg-3 text-base leading-[1.75] max-w-[520px]">
            There&apos;s a person behind the research. Here&apos;s what I read, watch,
            play, and listen to — a curated collection of things that shaped how I think.
          </p>
        </div>

        {/* Category sections */}
        {hobbies.map((category, idx) => (
          <div
            key={category.id}
            className="mb-20"
            style={{
              animation: `fadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both`,
              animationDelay: `${idx * 0.08}s`,
            }}
          >
            {/* Category header — constrained */}
            <div className="max-w-[1000px] mx-auto px-7">
              <div className="flex items-center gap-3.5 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-accent/20"
                  style={{
                    background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-hex) 15%, transparent), color-mix(in srgb, var(--accent-hex) 5%, transparent))',
                    boxShadow: '0 0 16px color-mix(in srgb, var(--accent-hex) 8%, transparent)',
                  }}
                >
                  {(() => { const Icon = categoryIcons[category.id]; return Icon ? <Icon className="w-5 h-5 text-accent-fg" /> : null })()}
                </div>
                <span className="font-heading font-bold text-[22px] text-fg tracking-tight">
                  {category.label}
                </span>
                <span className="text-xs text-fg-3 font-medium ml-1">
                  drag to explore
                </span>
                <span
                  className="ml-auto text-[11px] text-fg-3 border border-line px-2.5 py-0.5 rounded-full font-medium"
                  style={{ background: 'var(--nav-idle)' }}
                >
                  {category.items.length} favorites
                </span>
              </div>

              {/* Gradient divider */}
              <div
                className="mb-6 h-px"
                style={{ background: 'linear-gradient(to right, color-mix(in srgb, var(--accent-hex) 30%, transparent), color-mix(in srgb, var(--accent-hex) 5%, transparent))' }}
              />
            </div>

            {/* Carousel — full viewport width */}
            <HobbiesCarousel category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}
