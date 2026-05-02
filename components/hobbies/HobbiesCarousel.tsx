'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { BookOpen, Film, Tv, Gamepad2, Music, Mic, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type HobbyCategory } from '@/content/hobbies'

const categoryIcons: Record<string, LucideIcon> = {
  books:    BookOpen,
  movies:   Film,
  series:   Tv,
  games:    Gamepad2,
  music:    Music,
  podcasts: Mic,
}

interface Props {
  category: HobbyCategory
}

export function HobbiesCarousel({ category }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dotsRef  = useRef<HTMLDivElement>(null)
  const infoRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current as HTMLDivElement
    const track  = trackRef.current as HTMLDivElement
    const dotsEl = dotsRef.current as HTMLDivElement
    const infoEl = infoRef.current as HTMLDivElement
    if (!wrap || !track || !dotsEl || !infoEl) return

    const items = Array.from(track.querySelectorAll<HTMLElement>('.hobby-item'))
    const dots  = Array.from(dotsEl.querySelectorAll<HTMLElement>('.hobby-dot'))
    const slots = Array.from(infoEl.querySelectorAll<HTMLElement>('.hobby-info-slot'))
    const GAP   = 8

    let currentIdx = -1
    let offset     = 0
    let rafId: number | null = null

    function easeOutQuint(t: number) {
      return 1 - Math.pow(1 - t, 5)
    }

    function offsetForIndex(i: number) {
      const wrapW = wrap.offsetWidth
      let left = 0
      for (let j = 0; j < i; j++) left += items[j].offsetWidth + GAP
      return -(left - (wrapW / 2 - items[i].offsetWidth / 2))
    }

    function nearestIndex(fromOffset: number) {
      let best = 0, bestDist = Infinity
      items.forEach((_, j) => {
        const dist = Math.abs(fromOffset - offsetForIndex(j))
        if (dist < bestDist) { bestDist = dist; best = j }
      })
      return best
    }

    function applyActive(i: number) {
      if (i === currentIdx) return
      currentIdx = i
      items.forEach((item, j) => {
        item.classList.toggle('active', j === i)
        item.style.transform = j === i ? 'scale(1.06)' : 'scale(0.86)'
      })
      dots.forEach((dot,  j) => dot.classList.toggle('active',  j === i))
      slots.forEach((slot, j) => slot.classList.toggle('active', j === i))
    }

    function moveTrack(x: number) {
      offset = x
      track.style.transform = `translateX(${x}px)`
    }

    function moveAndSync(x: number) {
      moveTrack(x)
      const wrapCenter = wrap.offsetWidth / 2
      let best = 0, bestDist = Infinity
      items.forEach((item, j) => {
        const c = item.offsetLeft + offset + item.offsetWidth / 2
        const dist = Math.abs(c - wrapCenter)
        if (dist < bestDist) { bestDist = dist; best = j }
      })
      applyActive(best)
    }

    function goTo(i: number, duration = 650) {
      if (rafId !== null) cancelAnimationFrame(rafId)
      const startOffset = offset
      const endOffset   = offsetForIndex(i)
      const startTime   = performance.now()
      applyActive(i)
      function tick(now: number) {
        const t = Math.min((now - startTime) / duration, 1)
        moveTrack(startOffset + (endOffset - startOffset) * easeOutQuint(t))
        if (t < 1) rafId = requestAnimationFrame(tick)
        else rafId = null
      }
      rafId = requestAnimationFrame(tick)
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i))
    })

    // ── Mouse drag ──
    let mouse: { startX: number; startOffset: number; lastX: number; lastT: number; vel: number } | null = null

    function onMouseDown(e: MouseEvent) {
      if (rafId !== null) cancelAnimationFrame(rafId)
      mouse = { startX: e.clientX, startOffset: offset, lastX: e.clientX, lastT: performance.now(), vel: 0 }
      track.style.cursor = 'grabbing'
      e.preventDefault()
    }

    function onMouseMove(e: MouseEvent) {
      if (!mouse) return
      const now = performance.now(), dt = now - mouse.lastT
      if (dt > 0) mouse.vel = (e.clientX - mouse.lastX) / dt
      mouse.lastX = e.clientX; mouse.lastT = now
      moveAndSync(mouse.startOffset + (e.clientX - mouse.startX))
    }

    function onMouseUp() {
      if (!mouse) return
      const vel = mouse.vel; mouse = null
      track.style.cursor = 'grab'
      goTo(nearestIndex(offset + vel * 150))
    }

    // ── Touch ──
    let touch: {
      startX: number; startY: number; startOffset: number
      lastX: number; lastT: number; vel: number; dir: 'h' | 'v' | null
    } | null = null

    function onTouchStart(e: TouchEvent) {
      if (rafId !== null) cancelAnimationFrame(rafId)
      touch = {
        startX: e.touches[0].clientX, startY: e.touches[0].clientY,
        startOffset: offset, lastX: e.touches[0].clientX,
        lastT: performance.now(), vel: 0, dir: null,
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!touch) return
      const dx = e.touches[0].clientX - touch.startX
      const dy = e.touches[0].clientY - touch.startY
      if (!touch.dir && (Math.abs(dx) > 5 || Math.abs(dy) > 5))
        touch.dir = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
      if (touch.dir === 'v') return
      e.preventDefault()
      const now = performance.now(), dt = now - touch.lastT
      if (dt > 0) touch.vel = (e.touches[0].clientX - touch.lastX) / dt
      touch.lastX = e.touches[0].clientX; touch.lastT = now
      moveAndSync(touch.startOffset + dx)
    }

    function onTouchEnd() {
      if (!touch) return
      const { vel, dir } = touch; touch = null
      if (dir === 'v') return
      goTo(nearestIndex(offset + vel * 150))
    }

    // ── Trackpad horizontal wheel ──
    let wheelAcc = 0
    let wheelTimer: ReturnType<typeof setTimeout> | null = null

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      if (rafId !== null) cancelAnimationFrame(rafId)
      wheelAcc += e.deltaX
      moveAndSync(offsetForIndex(Math.max(0, currentIdx)) - wheelAcc)
      if (wheelTimer) clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => { wheelAcc = 0; goTo(nearestIndex(offset)) }, 80)
    }

    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchmove', onTouchMove, { passive: false })
    track.addEventListener('touchend', onTouchEnd, { passive: true })
    wrap.addEventListener('wheel', onWheel, { passive: false })

    // double RAF ensures browser has completed layout before we measure offsetWidth
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const startIdx = Math.floor(items.length / 2)
      items.forEach(item => { item.style.transform = 'scale(0.86)'; item.style.willChange = 'transform, filter' })
      offset = offsetForIndex(startIdx)
      track.style.transform = `translateX(${offset}px)`
      applyActive(startIdx)
    }))

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (wheelTimer) clearTimeout(wheelTimer)
      track.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove', onTouchMove)
      track.removeEventListener('touchend', onTouchEnd)
      wrap.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div>
      {/* Track wrapper — no overflow-hidden so card shadows aren't clipped */}
      <div
        ref={wrapRef}
        className="relative py-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          className="flex items-center py-12 will-change-transform"
          style={{ gap: '8px', cursor: 'grab', userSelect: 'none', touchAction: 'pan-y' }}
        >
          {category.items.map((item, i) => (
            <div
              key={i}
              className={cn(
                'hobby-item flex-shrink-0',
                item.aspect === 'portrait' ? 'w-[260px]' : 'w-[290px]'
              )}
            >
              {/* Ambient bloom — behind the card */}
              <div
                className="hobby-bloom"
                style={{ background: item.dominantColor ?? '#1a1a2a' }}
              />

              {/* Glass card */}
              <div className="hobby-glass-card rounded-[20px] overflow-hidden">
                {/* Cover — full card height, label overlays at bottom */}
                <div
                  className={cn(
                    'relative w-full overflow-hidden rounded-[20px]',
                    item.aspect === 'portrait' ? 'h-[390px]' : 'h-[290px]'
                  )}
                >
                  {item.cover ? (
                    <Image src={item.cover} alt={item.title} fill className="object-cover" sizes="300px" unoptimized={item.animated} />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(160deg, #1c1c20, #2a2a2e)' }}
                    >
                      {(() => { const Icon = categoryIcons[category.id]; return Icon ? <Icon className="w-10 h-10 text-zinc-600" strokeWidth={1.25} /> : null })()}
                    </div>
                  )}

                  {/* Specular top-edge highlight */}
                  <div
                    style={{
                      position: 'absolute', top: 0, left: '8%', right: '8%',
                      height: '1px',
                      background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)',
                      zIndex: 4, pointerEvents: 'none',
                    }}
                  />
                  {/* Corner sheen */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%)',
                      zIndex: 3, pointerEvents: 'none', borderRadius: '20px 20px 0 0',
                    }}
                  />
                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, transparent 50%, rgba(0,0,0,0.3) 100%)', zIndex: 2 }}
                  />

                  {/* Liquid glass label */}
                  <div
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '10px 13px 13px',
                      backdropFilter: 'blur(20px) saturate(1.8) brightness(1.05)',
                      WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.05)',
                      background: 'rgba(8, 8, 10, 0.38)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.16)',
                      zIndex: 5,
                    }}
                  >
                    {/* Inner specular line on label */}
                    <div
                      style={{
                        position: 'absolute', top: 0, left: '10%', right: '10%',
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)',
                        pointerEvents: 'none',
                      }}
                    />
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div ref={dotsRef} className="flex justify-center gap-1.5 mt-1.5">
        {category.items.map((_, i) => (
          <div
            key={i}
            className="hobby-dot w-1 h-1 rounded-full cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>

      {/* Info bar — fixed height, zero layout shift */}
      <div ref={infoRef} className="relative mt-3" style={{ height: '56px' }}>
        {category.items.map((item, i) => (
          <div
            key={i}
            className="hobby-info-slot absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-6"
          >
            <div className="text-sm font-semibold text-zinc-200 text-center leading-snug">
              {item.title}
            </div>
            <div className="text-xs text-zinc-500 italic text-center leading-relaxed">
              <span className="text-orange-400 not-italic">&ldquo;</span>
              {item.note}
              <span className="text-orange-400 not-italic">&rdquo;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
