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
        'backdrop-blur-md bg-surface border border-line rounded-2xl',
        hover && [
          'transition-all duration-200 cursor-pointer',
          'hover:-translate-y-1 hover:border-accent/30',
          'hover:shadow-lg hover:shadow-accent/10',
        ],
        className
      )}
    >
      {children}
    </div>
  )
}
