import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl',
        hover && [
          'transition-all duration-200 cursor-pointer',
          'hover:-translate-y-1 hover:border-orange-400/30',
          'hover:shadow-lg hover:shadow-orange-400/10',
        ],
        className
      )}
    >
      {children}
    </div>
  )
}
