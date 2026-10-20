'use client'
import { useSyncExternalStore } from 'react'

// Each line appears in turn, as if typed, after the chip's glitch (keyframes in globals.css)
const lineIn = (delay: number) => ({ animation: `line-in 0.01s linear ${delay}s both` })

// The 404 page is prerendered once without a path, so read the real one only on the client
// (an empty server snapshot avoids a hydration mismatch); the lines are still hidden by then.
const noSubscribe = () => () => {}

/** Terminal echoing the path the visitor tried to open. */
export function NotFoundTerminal() {
  const pathname = useSyncExternalStore(noSubscribe, () => window.location.pathname, () => '')

  return (
    <div
      className="w-full max-w-lg rounded-xl overflow-hidden border border-[rgba(255,179,0,0.28)] text-left"
      style={{
        background: 'rgba(13,8,0,0.96)',
        boxShadow: '0 2px 0 rgba(255,179,0,0.15) inset, 0 24px 48px rgba(0,0,0,0.6), 0 0 40px rgba(255,140,0,0.08)',
      }}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(255,179,0,0.14)]" style={{ background: 'rgba(8,4,0,0.98)' }}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[0.6875rem] text-[#a36e07] tracking-wide">paros@paderborn — zsh</span>
      </div>
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[0.8125rem] leading-relaxed">
        <div className="break-all" style={lineIn(0.5)}>
          <span className="text-[#ffb300]">paros@paderborn</span>
          <span className="text-[#bfbfbd]">:~$ </span>
          <span className="text-[#ffd54f]">cd {pathname}</span>
        </div>
        <div className="text-[#ff8f00] break-all" style={lineIn(1.1)}>cd: no such file or directory: {pathname}</div>
        <div className="mt-1" style={lineIn(1.7)}>
          <span className="text-[#ffb300]">paros@paderborn</span>
          <span className="text-[#bfbfbd]">:~$ </span>
          <span className="text-[#ffd54f]">cd ~</span>
          <span className="inline-block w-[0.5rem] h-[0.9375rem] bg-[#ffb300] ml-1 rounded-[1px] align-[-3px] animate-[cursor-blink_1s_step-end_infinite]" />
        </div>
      </div>
    </div>
  )
}
