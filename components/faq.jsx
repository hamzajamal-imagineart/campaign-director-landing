"use client";

import { useState } from 'react';
import { T, Icon } from '@/components/primitives';
import { SectionHead } from '@/components/section-head';

const FAQItem = ({ q, a, open, onClick, isLast }) => (
  <div style={{
    borderBottom: isLast ? 'none' : `1px solid ${T.hair}`,
  }}>
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 16,
      padding: '22px 0', background: 'transparent', border: 0, cursor: 'pointer',
      color: T.fg, fontSize: 15, fontWeight: 500, textAlign: 'left',
    }}>
      <span style={{ flex: 1 }}>{q}</span>
      <Icon name="chevronDown" size={16} color={open ? '#A57BFE' : T.fg2} style={{
        flexShrink: 0,
        transform: open ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1)',
      }}/>
    </button>
    <div style={{
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      transition: 'grid-template-rows 300ms cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{ overflow: 'hidden', minHeight: 0 }}>
        <div style={{
          paddingBottom: 22, fontSize: 14, color: T.fg2, lineHeight: 1.7,
        }}>{a}</div>
      </div>
    </div>
  </div>
);

export const FAQ = () => {
  const [open, setOpen] = useState(-1);
  const items = [
    {
      q: 'Why Codex specifically?',
      a: 'Building a real canvas needs reliable browser, clipboard, and download control. Codex with Computer Use is the only agent today that handles all three consistently. Other agents are coming as their tooling matures.',
    },
    {
      q: 'Will this burn through my credits?',
      a: 'No. Sub-agents plan and critique before any generation runs, and every node has a cost check. You can also run an audit-only pass that touches nothing, just reads your existing canvas and reports back.',
    },
    {
      q: 'What if my brief is half-baked?',
      a: 'A sentence is enough. Codex expands the brief, proposes directions, and asks sub-agents to critique before any credits are spent. References sharpen the result but they are optional.',
    },
    {
      q: "What does a 'finished' campaign include?",
      a: 'Five things you can check: a campaign direction with shot plan, the built Imagine.Art canvas, generated motion clips (not stills), a review MP4, and QC notes with a shot-source manifest.',
    },
    {
      q: 'What if it gets stuck?',
      a: "It surfaces the blocker: login required, missing Computer Use, sub-agent failure, export error, low credits. And stops. You get a clear next step, not a half-finished run pretending to be done.",
    },
  ];
  return (
    <div id="faq">
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <SectionHead
          title="Frequently asked questions"
        />
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', borderTop: `1px solid ${T.hair}` }}>
        {items.map((it, i) => (
          <FAQItem
            key={i} q={it.q} a={it.a}
            open={open===i}
            isLast={i === items.length - 1}
            onClick={()=>setOpen(open===i?-1:i)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
