"use client";

import { useState } from 'react';
import { T, Icon } from '@/components/primitives';
import { SectionHead } from '@/components/section-head';

const HowItWorksStep = ({ step, isLast }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        padding: '20px 22px',
        borderRight: !isLast ? `1px solid ${T.hair}` : 'none',
        display: 'flex', flexDirection: 'column', gap: 10,
        transition: 'background 240ms, transform 240ms',
        background: hover ? 'rgba(255,255,255,0.025)' : 'transparent',
        transform: hover ? 'translateY(-1px)' : 'none',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          position: 'relative', width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Slowly rotating conic-gradient ring */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, borderRadius: 999,
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(167,123,254,0.55) 25%, transparent 55%, transparent 100%)',
            animation: 'rotateRing 7s linear infinite',
            mask: 'radial-gradient(circle, transparent 60%, #000 62%)',
            WebkitMask: 'radial-gradient(circle, transparent 60%, #000 62%)',
          }}/>
          <div style={{
            position: 'relative', zIndex: 1,
            width: 28, height: 28, borderRadius: 999,
            background: 'rgba(255,255,255,0.06)', color: T.fg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${T.hair}`,
            fontSize: 11.5, fontWeight: 600, letterSpacing: '-0.005em',
          }}>{step.n}</div>
        </div>
        <Icon name={step.icon} size={15} color={T.fg2}/>
        <div style={{ flex: 1 }}/>
        <div style={{
          fontSize: 11, color: T.fg2, padding: '2px 9px',
          borderRadius: 999,
          border: `1px solid ${T.hairS}`,
        }}>{step.meta}</div>
      </div>
      <div style={{
        fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em',
        color: T.fg,
      }}>{step.title}</div>
      <div style={{
        fontSize: 12.5, color: T.fg2, lineHeight: 1.55,
      }}>{step.body}</div>
    </div>
  );
};

export const HowItWorks = () => {
  const steps = [
    {
      n: '01', icon: 'edit', title: 'Paste the starter prompt',
      body: 'Drop the prompt into Codex with your idea. Attach references if you have them.',
      meta: '~30s',
    },
    {
      n: '02', icon: 'github', title: 'Sub-agents plan the run',
      body: 'The repo critiques, costs, and shapes your campaign before any credits are spent.',
      meta: '1–2 min',
    },
    {
      n: '03', icon: 'workflow', title: 'Canvas built end-to-end',
      body: 'Computer Use opens Imagine.Art, wires the workflow, generates motion, and packages a review MP4.',
      meta: '5–15 min',
    },
  ];

  return (
    <div id="how-it-works">
      <SectionHead
        eyebrow="How it works"
        title="Paste, plan, run."
        sub="The repo handles every node. You don't wire a single edge."
      />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderRadius: 14, overflow: 'hidden',
        background: T.elev, border: `1px solid ${T.hair}`,
      }}>
        {steps.map((s, i) => <HowItWorksStep key={s.n} step={s} isLast={i === steps.length - 1}/>)}
      </div>
    </div>
  );
};

export default HowItWorks;
