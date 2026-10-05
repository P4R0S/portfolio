/** Fixed ambient glows; colors come from the --glow-* theme tokens in globals.css. */
export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Top-right — hero zone warm orange */}
      <div className="absolute rounded-full"
        style={{
          width: '800px', height: '800px',
          top: '-20%', right: '-15%',
          background: 'radial-gradient(circle at center, var(--glow-tr-1) 0%, var(--glow-tr-2) 40%, transparent 70%)',
        }}
      />
      {/* Mid-left — about/skills zone amber */}
      <div className="absolute rounded-full"
        style={{
          width: '700px', height: '700px',
          top: '18%', left: '-15%',
          background: 'radial-gradient(circle at center, var(--glow-ml-1) 0%, var(--glow-ml-2) 40%, transparent 70%)',
        }}
      />
      {/* Center-right — projects zone orange */}
      <div className="absolute rounded-full"
        style={{
          width: '650px', height: '650px',
          top: '40%', right: '-10%',
          background: 'radial-gradient(circle at center, var(--glow-cr-1) 0%, var(--glow-cr-2) 40%, transparent 70%)',
        }}
      />
      {/* Mid-center — experience zone amber */}
      <div className="absolute rounded-full"
        style={{
          width: '600px', height: '600px',
          top: '58%', left: '20%',
          background: 'radial-gradient(circle at center, var(--glow-mc-1) 0%, var(--glow-mc-2) 40%, transparent 70%)',
        }}
      />
      {/* Bottom-left — zinc haze (sand in light mode) */}
      <div className="absolute rounded-full"
        style={{
          width: '600px', height: '600px',
          bottom: '-5%', left: '-10%',
          background: 'radial-gradient(circle at center, var(--glow-bl-1) 0%, var(--glow-bl-2) 40%, transparent 70%)',
        }}
      />
      {/* Bottom-right — faint orange */}
      <div className="absolute rounded-full"
        style={{
          width: '500px', height: '500px',
          bottom: '2%', right: '0%',
          background: 'radial-gradient(circle at center, var(--glow-br-1) 0%, var(--glow-br-2) 40%, transparent 70%)',
        }}
      />
    </div>
  )
}
