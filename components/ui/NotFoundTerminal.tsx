'use client'
import { usePathname } from 'next/navigation'

/** Static terminal echoing the path the visitor tried to open. */
export function NotFoundTerminal() {
  const pathname = usePathname() ?? '/'

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
        <span className="ml-3 font-mono text-[11px] text-[#a36e07] tracking-wide">paros@paderborn — zsh</span>
      </div>
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed">
        <div className="break-all">
          <span className="text-[#ffb300]">paros@paderborn</span>
          <span className="text-[#bfbfbd]">:~$ </span>
          <span className="text-[#ffd54f]">cd {pathname}</span>
        </div>
        <div className="text-[#ff8f00] break-all">cd: no such file or directory: {pathname}</div>
        <div className="mt-1">
          <span className="text-[#ffb300]">paros@paderborn</span>
          <span className="text-[#bfbfbd]">:~$ </span>
          <span className="text-[#ffd54f]">cd ~</span>
          <span className="inline-block w-[8px] h-[15px] bg-[#ffb300] ml-1 rounded-[1px] align-[-3px] animate-[cursor-blink_1s_step-end_infinite]" />
        </div>
      </div>
    </div>
  )
}
