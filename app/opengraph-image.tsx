import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const barHeights = [38, 55, 42, 70, 52, 83, 48, 91, 62, 75, 58, 88, 66, 78, 95, 72, 85, 60, 77, 90]

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          padding: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top gradient accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
            display: 'flex',
          }}
        />

        {/* Subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            opacity: 0.04,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderBottom: '1px solid #ffffff',
                display: 'flex',
              }}
            />
          ))}
        </div>

        {/* Decorative right-side glow */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '52px 80px 48px',
          }}
        >
          {/* Category badge */}
          <div style={{ display: 'flex', marginBottom: 40 }}>
            <div
              style={{
                display: 'flex',
                gap: 10,
              }}
            >
              {['IT Backend', 'AI Research', 'US Market'].map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    padding: '5px 14px',
                    borderRadius: 999,
                    border: '1px solid rgba(99,102,241,0.35)',
                    backgroundColor: 'rgba(99,102,241,0.08)',
                  }}
                >
                  <span style={{ color: '#a5b4fc', fontSize: 13, fontWeight: 500 }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main title */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 18 }}>
            <span
              style={{
                fontSize: 96,
                fontWeight: 800,
                color: '#f8fafc',
                letterSpacing: '-3px',
                lineHeight: 1,
              }}
            >
              Add
            </span>
            <span
              style={{
                fontSize: 96,
                fontWeight: 800,
                color: '#3b82f6',
                letterSpacing: '-3px',
                lineHeight: 1,
              }}
            >
              Insight
            </span>
          </div>

          {/* Tagline */}
          <div style={{ display: 'flex', marginBottom: 'auto' }}>
            <span
              style={{
                fontSize: 22,
                color: '#64748b',
                fontWeight: 400,
                letterSpacing: '0.3px',
                lineHeight: 1.5,
              }}
            >
              Real-time insights for IT Backend · AI Research · US Stock Market
            </span>
          </div>

          {/* Bottom section: chart bars + domain */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            {/* Mini chart bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 64 }}>
              {barHeights.map((h, i) => {
                const color =
                  i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'
                return (
                  <div
                    key={i}
                    style={{
                      width: 14,
                      height: `${h}%`,
                      backgroundColor: color,
                      borderRadius: '3px 3px 0 0',
                      opacity: 0.7,
                      display: 'flex',
                    }}
                  />
                )
              })}
            </div>

            {/* Bottom-right domain indicator */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    display: 'flex',
                  }}
                />
                <span style={{ color: '#475569', fontSize: 13 }}>addinsight.vercel.app</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#IT', '#AI', '#Stock'].map((t) => (
                  <span key={t} style={{ color: '#334155', fontSize: 12 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
