'use client'
import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExpandableTextProps {
  text: string
  className?: string
}

/** Clamps long text to three lines with a "Read more" toggle; the full text stays in the HTML. */
export function ExpandableText({ text, className }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false)
  const id = useId()

  return (
    <div>
      <p id={id} className={cn(className, !expanded && 'line-clamp-3')}>
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={id}
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-orange-400/90 hover:text-orange-300 transition-colors duration-200 cursor-pointer"
      >
        {expanded ? 'Show less' : 'Read more'}
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', expanded && 'rotate-180')} />
      </button>
    </div>
  )
}
