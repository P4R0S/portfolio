import { ImageResponse } from 'next/og'

export const alt = 'Parsa Rostamzadeh — Research Assistant · ML × Hardware'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Link-preview card (LinkedIn, Slack, X…). Uses the bundled default font; the logo is
// drawn with paths because <text> isn't supported by the image renderer.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#18181b',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(251,146,60,0.28) 0%, rgba(251,146,60,0) 45%), radial-gradient(circle at 10% 95%, rgba(82,82,91,0.35) 0%, rgba(82,82,91,0) 40%)',
          color: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <svg width="112" height="112" viewBox="0 0 48 48" fill="none">
            <path
              d="M17 3.5v5M24 3.5v5M31 3.5v5M17 39.5v5M24 39.5v5M31 39.5v5M3.5 17h5M3.5 24h5M3.5 31h5M39.5 17h5M39.5 24h5M39.5 31h5"
              stroke="#fb923c"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <rect x="9" y="9" width="30" height="30" rx="6" fill="#232326" stroke="#fb923c" strokeWidth="2.6" />
            <path
              d="M14.5 32V16h4.25a4 4 0 0 1 0 8H14.5M26 32V16h4.25a4 4 0 0 1 0 8H26M30 24l4 8"
              stroke="#fafafa"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#a1a1aa', textTransform: 'uppercase' }}>
            Paderborn University
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 84, letterSpacing: -2, lineHeight: 1 }}>Parsa Rostamzadeh</div>
          <div style={{ display: 'flex', fontSize: 40, color: '#fb923c' }}>Research Assistant · ML × Hardware</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#a1a1aa' }}>
          <div style={{ display: 'flex', width: 40, height: 3, backgroundColor: '#fb923c' }} />
          <div style={{ display: 'flex' }}>Approximate computing · Hardware-aware ML · FPGA &amp; VLSI</div>
        </div>
      </div>
    ),
    size
  )
}
