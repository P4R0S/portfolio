export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Top-right — hero zone warm orange */}
      <div className="absolute rounded-full"
        style={{
          width: '800px', height: '800px',
          top: '-20%', right: '-15%',
          background: 'radial-gradient(circle at center, rgba(251,146,60,0.12) 0%, rgba(251,146,60,0.04) 40%, transparent 70%)',
        }}
      />
      {/* Mid-left — about/skills zone amber */}
      <div className="absolute rounded-full"
        style={{
          width: '700px', height: '700px',
          top: '18%', left: '-15%',
          background: 'radial-gradient(circle at center, rgba(251,191,36,0.09) 0%, rgba(251,191,36,0.03) 40%, transparent 70%)',
        }}
      />
      {/* Center-right — projects zone orange */}
      <div className="absolute rounded-full"
        style={{
          width: '650px', height: '650px',
          top: '40%', right: '-10%',
          background: 'radial-gradient(circle at center, rgba(251,146,60,0.08) 0%, rgba(251,146,60,0.02) 40%, transparent 70%)',
        }}
      />
      {/* Mid-center — experience zone amber */}
      <div className="absolute rounded-full"
        style={{
          width: '600px', height: '600px',
          top: '58%', left: '20%',
          background: 'radial-gradient(circle at center, rgba(251,191,36,0.06) 0%, rgba(251,191,36,0.02) 40%, transparent 70%)',
        }}
      />
      {/* Bottom-left — zinc */}
      <div className="absolute rounded-full"
        style={{
          width: '600px', height: '600px',
          bottom: '-5%', left: '-10%',
          background: 'radial-gradient(circle at center, rgba(82,82,91,0.18) 0%, rgba(82,82,91,0.05) 40%, transparent 70%)',
        }}
      />
      {/* Bottom-right — faint orange */}
      <div className="absolute rounded-full"
        style={{
          width: '500px', height: '500px',
          bottom: '2%', right: '0%',
          background: 'radial-gradient(circle at center, rgba(251,146,60,0.07) 0%, rgba(251,146,60,0.02) 40%, transparent 70%)',
        }}
      />
    </div>
  )
}
