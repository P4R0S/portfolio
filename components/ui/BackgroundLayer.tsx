/** Fixed ambient glows; colors come from the --glow-* theme tokens in globals.css. */
export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 print:hidden" aria-hidden="true">
      {/* Top-right — hero zone warm orange */}
      <div className="absolute rounded-full"
        style={{
          width: '50rem', height: '50rem',
          top: '-20%', right: '-15%',
          background: 'radial-gradient(circle at center, var(--glow-tr-1) 0%, var(--glow-tr-2) 40%, transparent 70%)',
        }}
      />
      {/* Mid-left — about/skills zone amber */}
      <div className="absolute rounded-full"
        style={{
          width: '43.75rem', height: '43.75rem',
          top: '18%', left: '-15%',
          background: 'radial-gradient(circle at center, var(--glow-ml-1) 0%, var(--glow-ml-2) 40%, transparent 70%)',
        }}
      />
      {/* Center-right — projects zone orange */}
      <div className="absolute rounded-full"
        style={{
          width: '40.625rem', height: '40.625rem',
          top: '40%', right: '-10%',
          background: 'radial-gradient(circle at center, var(--glow-cr-1) 0%, var(--glow-cr-2) 40%, transparent 70%)',
        }}
      />
      {/* Mid-center — experience zone amber */}
      <div className="absolute rounded-full"
        style={{
          width: '37.5rem', height: '37.5rem',
          top: '58%', left: '20%',
          background: 'radial-gradient(circle at center, var(--glow-mc-1) 0%, var(--glow-mc-2) 40%, transparent 70%)',
        }}
      />
      {/* Bottom-left — zinc haze (sand in light mode) */}
      <div className="absolute rounded-full"
        style={{
          width: '37.5rem', height: '37.5rem',
          bottom: '-5%', left: '-10%',
          background: 'radial-gradient(circle at center, var(--glow-bl-1) 0%, var(--glow-bl-2) 40%, transparent 70%)',
        }}
      />
      {/* Bottom-right — faint orange */}
      <div className="absolute rounded-full"
        style={{
          width: '31.25rem', height: '31.25rem',
          bottom: '2%', right: '0%',
          background: 'radial-gradient(circle at center, var(--glow-br-1) 0%, var(--glow-br-2) 40%, transparent 70%)',
        }}
      />
    </div>
  )
}
