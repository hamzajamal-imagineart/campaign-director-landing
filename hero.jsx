/* global React */
const { useState, useEffect, useRef } = React;
const { T, Icon } = window;

/* =========================================================
   Animated node graph (replaces the existing hero illustration)
   Auto-draws on a loop: 4 nodes pop in, lines connect.
========================================================= */
const NodeGraph = ({ animate = true }) => {
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!animate) { setStep(6); return; }
    const t = setInterval(() => {
      setStep(s => {
        if (s >= 6) { setKey(k => k + 1); return 0; }
        return s + 1;
      });
    }, 700);
    return () => clearInterval(t);
  }, []);

  // 4 generated frames (replace with project assets if available)
  const tiles = [
    { x: 18,  y: 30, label: 'Brief',     img: 'https://images.unsplash.com/photo-1587613864521-9ef8dfe5e333?w=400&q=80' },
    { x: 165, y: 18, label: 'Variants',  img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80' },
    { x: 165, y: 165, label: 'Crops',    img: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400&q=80' },
    { x: 320, y: 90,  label: 'Campaign', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  ];

  const Tile = ({ i }) => {
    const t = tiles[i];
    const visible = step >= i + 1;
    return (
      <div key={`${key}-${i}`} style={{
        position: 'absolute', left: t.x, top: t.y,
        width: 116, height: 116, borderRadius: 14,
        overflow: 'hidden',
        border: `1.5px solid ${T.border2}`,
        background: T.elev,
        boxShadow: '0 12px 28px rgba(20,16,40,0.18)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(8px)',
        transition: 'opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{
          height: 86, background: `linear-gradient(135deg,#8A3FFC22,#FF85DD22)`,
          backgroundImage: `url(${t.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
        }}/>
        <div style={{
          height: 30, padding: '0 10px', display: 'flex', alignItems: 'center',
          fontSize: 11, fontWeight: 600, color: T.fg, letterSpacing: '0.02em',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999, background: T.brand, marginRight: 6,
          }}/>
          {t.label}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      position: 'relative', width: 460, height: 300,
    }}>
      {/* connecting lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="line-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#8A3FFC"/>
            <stop offset="1" stopColor="#FF85DD"/>
          </linearGradient>
        </defs>
        {[
          { from: [134, 88],  to: [165, 76],  v: 5 },
          { from: [134, 88],  to: [165, 223], v: 5 },
          { from: [281, 76],  to: [320, 148], v: 6 },
          { from: [281, 223], to: [320, 148], v: 6 },
        ].map((l, i) => (
          <path key={`${key}-l${i}`} d={`M ${l.from[0]} ${l.from[1]} C ${(l.from[0]+l.to[0])/2} ${l.from[1]}, ${(l.from[0]+l.to[0])/2} ${l.to[1]}, ${l.to[0]} ${l.to[1]}`}
            stroke="url(#line-grad)" strokeWidth="2" fill="none" strokeLinecap="round"
            strokeDasharray="200" strokeDashoffset={step >= l.v ? 0 : 200}
            style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.16,1,0.3,1)' }}
          />
        ))}
      </svg>
      {[0,1,2,3].map(i => <Tile key={i} i={i}/>)}
    </div>
  );
};

/* =========================================================
   Hero — restructured Workflows page header
========================================================= */
const Hero = ({ onLaunch, headline = 'Direct your campaign.', accent = 'Codex builds the workflow.', animateGraph = true }) => (
  <div className="dot-grid" style={{
    position: 'relative', overflow: 'hidden',
    borderRadius: 20,
    background: `
      radial-gradient(80% 140% at 0% 0%, rgba(138,63,252,0.32) 0%, rgba(138,63,252,0.10) 35%, rgba(0,0,0,0) 60%),
      linear-gradient(135deg, #1A0F33 0%, #2A1656 50%, #3B1F75 100%)
    `,
    border: `1px solid rgba(255,255,255,0.08)`,
    padding: '40px 40px',
    display: 'flex', alignItems: 'center', gap: 24,
  }}>
    {/* dotted overlay layered on top of gradient */}
    <div aria-hidden style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
      backgroundSize: '14px 14px',
      maskImage: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0))',
      WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0))',
    }}/>

    <div style={{ flex: 1, position: 'relative', maxWidth: 540 }}>
      <h1 style={{
        margin: 0, fontSize: 40, lineHeight: '46px',
        fontWeight: 700, letterSpacing: '-0.01em', color: T.fg,
      }}>
        {headline}
        {accent ? (<><br/><span style={{ color: T.fg2, fontWeight: 500 }}>{accent}</span></>) : null}
      </h1>
      <p style={{
        margin: '14px 0 24px', fontSize: 14, lineHeight: '22px',
        color: T.fg2, maxWidth: 460,
      }}>
        Turn a product photo, brand kit, or a single sentence into a complete Imagine.Art
        workflow — planned, generated, reviewed, and packaged by an AI agent. No nodes to wire by hand.
      </p>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <a href="https://github.com/Vyro-ai/imagine-campaign-director" target="_blank" rel="noreferrer" style={{
          height: 40, padding: '0 18px', borderRadius: 999,
          background: T.btnDark, color: T.btnDarkFg, border: 0,
          fontWeight: 500, fontSize: 13.5, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          textDecoration: 'none',
        }}>
          <Icon name="github" size={14} color={T.btnDarkFg}/>
          View on GitHub
        </a>
        <button onClick={()=>document.getElementById('walkthrough').scrollIntoView({behavior:'smooth', block:'start'})} style={{
          height: 40, padding: '0 14px', borderRadius: 999,
          background: 'transparent', color: T.fg, border: 0,
          fontWeight: 500, fontSize: 13, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="play" size={12}/> Watch 40-second walkthrough
        </button>
      </div>

      <div style={{
        marginTop: 22, display: 'flex', alignItems: 'center', gap: 16,
        fontSize: 12, color: T.fg2,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="terminal" size={13}/> Codex-only beta
        </span>
        <span style={{ width: 1, height: 12, background: T.hairS }}/>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="github" size={13}/> Vyro-ai/imagine-campaign-director
        </span>
      </div>
    </div>

    <div style={{ flexShrink: 0, position: 'relative' }}>
      <NodeGraph animate={animateGraph}/>
    </div>
  </div>
);

/* =========================================================
   Codex requirement callout — visible on landing
========================================================= */
const CodexCallout = () => (
  <div style={{
    marginTop: 16,
    display: 'flex', alignItems: 'flex-start', gap: 14,
    padding: '14px 18px', borderRadius: 14,
    background: T.elev,
    border: `1px solid ${T.hair}`,
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: 10,
      background: T.surfS, color: T.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon name="alert" size={16}/>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 2 }}>
        Currently Codex-only — and that's intentional.
      </div>
      <div style={{ fontSize: 12.5, color: T.fg2, lineHeight: 1.55 }}>
        Building real workflow canvases needs reliable browser, clipboard, and download control.
        Codex with Computer Use handles that today; other agents don't yet. You'll need a Codex
        workspace with Computer Use enabled, Google Chrome open, and an Imagine.Art session signed in.
      </div>
    </div>
    <a href="https://developers.openai.com/codex/app/computer-use" target="_blank" rel="noreferrer" style={{
      flexShrink: 0, height: 30, padding: '0 14px', borderRadius: 999,
      background: T.btnDark, color: T.btnDarkFg, border: 0,
      cursor: 'pointer', fontSize: 12, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', gap: 6,
      textDecoration: 'none',
    }}>
      Enable Computer Use
      <Icon name="external" size={11} color={T.btnDarkFg}/>
    </a>
  </div>
);

window.Hero = Hero;
window.CodexCallout = CodexCallout;
window.NodeGraph = NodeGraph;
