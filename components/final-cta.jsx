"use client";

import { Icon } from '@/components/primitives';

export const FinalCTA = () => (
  <div style={{
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 480,
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end',
    padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 72px)',
  }}>
    {/* Background video */}
    <video
      autoPlay muted loop playsInline
      src="/assets/home-card-bottom-3.mp4"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%', objectFit: 'cover',
        zIndex: 0,
      }}
    />

    {/* Dark overlay — gradient from bottom so text stays readable */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1,
      background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.30) 100%)',
    }}/>

    {/* Content */}
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
      <div style={{ maxWidth: 560 }}>
        <p style={{
          margin: '0 0 6px',
          fontSize: 11, fontWeight: 600, letterSpacing: '1.8px',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
        }}>Get started</p>
        <h2 style={{
          margin: '0 0 20px',
          fontSize: 'clamp(32px, 3.8vw, 52px)',
          lineHeight: 1.08, fontWeight: 600,
          letterSpacing: '-0.025em', color: '#fff',
        }}>
          Direct your first campaign.
        </h2>
        <p style={{
          margin: 0, fontSize: 17, fontWeight: 400,
          color: 'rgba(255,255,255,0.55)', lineHeight: 1.75,
        }}>
          One sentence. A few attachments. Codex handles the rest —
          planning, generating, reviewing, and packaging the run end-to-end.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <a
          href="#walkthrough"
          style={{
            height: 44, padding: '0 24px', borderRadius: 999,
            background: '#fff', color: '#0a0a0a',
            fontSize: 14, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            textDecoration: 'none',
          }}>
          Watch demo
        </a>
        <a
          href="https://github.com/Vyro-ai/imagine-campaign-director"
          target="_blank" rel="noreferrer"
          style={{
            height: 44, padding: '0 24px', borderRadius: 999,
            background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(255,255,255,0.18)',
            fontSize: 14, fontWeight: 400,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            textDecoration: 'none',
            backdropFilter: 'blur(8px)',
          }}>
          <Icon name="github" size={14} color="rgba(255,255,255,0.75)"/> View on GitHub
        </a>
      </div>
    </div>
  </div>
);

export default FinalCTA;
