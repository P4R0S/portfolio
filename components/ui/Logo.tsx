import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

/** "PR" monogram set in a chip package — pins on four sides, pin-1 marker top-left. */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Parsa Rostamzadeh"
      className={cn('w-8 h-8', className)}
    >
      <path
        d="M17 3.5v5M24 3.5v5M31 3.5v5M17 39.5v5M24 39.5v5M31 39.5v5M3.5 17h5M3.5 24h5M3.5 31h5M39.5 17h5M39.5 24h5M39.5 31h5"
        stroke="#fb923c"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect x="9" y="9" width="30" height="30" rx="6" fill="#232326" stroke="#fb923c" strokeWidth="2.4" />
      <circle cx="14.6" cy="14.6" r="1.6" fill="#fb923c" />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        className="font-heading"
        fontWeight="700"
        fontSize="13.5"
        letterSpacing="-0.4"
        fill="#fafafa"
      >
        PR
      </text>
    </svg>
  )
}
