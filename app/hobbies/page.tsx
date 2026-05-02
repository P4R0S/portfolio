import { hobbies } from '@/content/hobbies'
import { HobbiesCarousel } from '@/components/hobbies/HobbiesCarousel'
import { BackgroundLayer } from '@/components/ui/BackgroundLayer'
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
    <div className="min-h-screen bg-[#18181b]">
      <BackgroundLayer />

      <div className="relative z-10 pt-24 pb-28">

        {/* Hero — constrained */}
        <div className="max-w-[1000px] mx-auto px-7 mb-20">
          <div
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-orange-400 mb-4 px-3 py-1 rounded-full border border-orange-400/20"
            style={{ background: 'rgba(251,146,60,0.08)' }}
          >
            ✦ Beyond the code
          </div>
          <h1
            className="font-heading font-extrabold leading-[1.04] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #fafafa 0%, #a1a1aa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hobbies &amp;{' '}
            </span>
            <br />
            <span className="gradient-text">Interests</span>
          </h1>
          <p className="text-zinc-500 text-base leading-[1.75] max-w-[520px]">
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-orange-400/20"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(251,146,60,0.05))',
                    boxShadow: '0 0 16px rgba(251,146,60,0.08)',
                  }}
                >
                  {(() => { const Icon = categoryIcons[category.id]; return Icon ? <Icon className="w-5 h-5 text-orange-400" /> : null })()}
                </div>
                <span className="font-heading font-bold text-[22px] text-white tracking-tight">
                  {category.label}
                </span>
                <span className="text-xs text-zinc-600 font-medium ml-1">
                  drag to explore
                </span>
                <span
                  className="ml-auto text-[11px] text-zinc-600 border border-white/[0.07] px-2.5 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {category.items.length} favorites
                </span>
              </div>

              {/* Gradient divider */}
              <div
                className="mb-6 h-px"
                style={{ background: 'linear-gradient(to right, rgba(251,146,60,0.3), rgba(251,146,60,0.05))' }}
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
