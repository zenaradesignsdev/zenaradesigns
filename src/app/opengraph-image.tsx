import { ImageResponse } from 'next/og';

// Social platforms expect a 1200x630 landscape card. The site previously fell
// back to web-app-manifest-512x512.png — a square app icon — so every shared
// link rendered as a small logo tile instead of a preview card.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Zenara Designs — web design for Markham and the GTA';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #000000 0%, #0d3b45 50%, #1a1033 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            letterSpacing: 14,
            color: '#67e8f9',
            fontWeight: 600,
          }}
        >
          ZENARA DESIGNS
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontSize: 82,
            lineHeight: 1.05,
            color: '#ffffff',
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          Web design for Markham
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 82,
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: -2,
            color: '#a78bfa',
          }}
        >
          &amp; the GTA.
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 32,
            color: 'rgba(255,255,255,0.72)',
          }}
        >
          Fixed pricing · Direct developer access · Live in 1–2 weeks
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            height: 8,
            width: 260,
            borderRadius: 8,
            background: 'linear-gradient(90deg, #22d3ee 0%, #a78bfa 100%)',
          }}
        />
      </div>
    ),
    size
  );
}
