"use client";

import React from 'react';
import { T, useReveal } from '@/components/primitives';

export const SectionHead = ({ eyebrow, title, sub, fg, fg2 }) => {
  const [ref, revealed] = useReveal();
  const words = title.split(' ');
  const headFg  = fg  || T.fg;
  const headFg2 = fg2 || T.fg2;

  return (
    <div style={{ marginBottom: 40 }} ref={ref}>
      {eyebrow && (
        <div style={{
          fontSize: 10.5, fontWeight: 600, letterSpacing: '1.8px',
          textTransform: 'uppercase', color: headFg2, marginBottom: 10,
        }}>{eyebrow}</div>
      )}
      <h2 style={{
        margin: 0, fontSize: 'clamp(28px, 3.2vw, 40px)', lineHeight: 1.1,
        fontWeight: 600, letterSpacing: '-0.02em', color: headFg,
      }}>
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span style={{
              display: 'inline-block',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(8px)',
              transition: revealed
                ? `opacity 800ms ease ${i * 110}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`
                : 'none',
            }}>
              {word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </h2>
      {sub && (
        <p style={{ margin: '12px 0 0', fontSize: 18, color: headFg2, maxWidth: 640, lineHeight: 1.7, fontWeight: 400 }}>
          {sub}
        </p>
      )}
    </div>
  );
};

export default SectionHead;
