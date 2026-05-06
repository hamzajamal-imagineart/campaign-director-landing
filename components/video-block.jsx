"use client";

import { useState, useEffect, useRef } from 'react';
import { T, Icon } from '@/components/primitives';
import { SectionHead } from '@/components/section-head';

export const VideoBlock = ({ light = false }) => {
  const fg  = light ? '#0f0f0f' : T.fg;
  const fg2 = light ? 'rgba(0,0,0,0.5)' : T.fg2;
  const videoRef  = useRef(null);
  const sectionRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [prog, setProg]       = useState(0);

  const toggle = () => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current; if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - top) / (vh + height * 0.4)));
      setProg(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scale = 0.82 + 0.18 * prog;

  return (
    <div id="walkthrough" ref={sectionRef}>
      <SectionHead
        eyebrow="Walkthrough"
        title="See it run in 40 seconds."
        sub="A real Codex session: starting the prompt, building the Imagine.Art workflow, and receiving the finished campaign video."
        fg={fg} fg2={fg2}
      />
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}>
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 16, border: `1px solid rgba(255,255,255,0.12)`,
            background: '#000', aspectRatio: '16/9',
          }}>
            <video
              ref={videoRef}
              src="/assets/walkthrough.mp4"
              poster="/assets/walkthrough-poster.jpg"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onClick={toggle}
              style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            />
            {!playing && (
              <button onClick={toggle} style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'radial-gradient(60% 70% at 50% 50%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.35) 100%)',
                border: 0, cursor: 'pointer',
              }}>
                <div style={{
                  position: 'relative',
                  width: 80, height: 80, borderRadius: 999,
                  background: 'rgba(255,255,255,0.96)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 16px 44px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
                  animation: 'glowPulse 3s ease-in-out infinite',
                }}>
                  <Icon name="play" size={28} color="#000"/>
                </div>
              </button>
            )}
            <div style={{
              position: 'absolute', left: 16, bottom: 16,
              padding: '6px 12px', borderRadius: 999,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              color: '#fff', fontSize: 12, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#FF5F57' }}/>
              getting-started-walkthrough.mp4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
