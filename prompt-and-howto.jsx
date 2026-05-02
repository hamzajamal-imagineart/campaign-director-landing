/* global React */
const { useState, useEffect, useRef } = React;
const { T, Icon } = window;

/* =========================================================
   Section header
========================================================= */
const SectionHead = ({ eyebrow, title, sub }) => (
  <div style={{ marginBottom: 22 }}>
    {eyebrow && (
      <div style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.04em',
        color: T.fg2, marginBottom: 6,
      }}>{eyebrow}</div>
    )}
    <h2 style={{
      margin: 0, fontSize: 22, lineHeight: '30px',
      fontWeight: 600, letterSpacing: '-0.005em', color: T.fg,
    }}>{title}</h2>
    {sub && (
      <p style={{ margin: '6px 0 0', fontSize: 13.5, color: T.fg2, maxWidth: 640, lineHeight: 1.55 }}>
        {sub}
      </p>
    )}
  </div>
);

/* =========================================================
   The "starter prompt" block — copy in one click
========================================================= */
const PromptBlock = () => {
  const [copied, setCopied] = useState(false);
  const text = `Use @Computer Use / sub-agent swarms and this repo:
https://github.com/Vyro-ai/imagine-campaign-director

to create <your idea here>`;

  const onCopy = () => {
    (window.copyText || ((t)=>navigator.clipboard?.writeText(t)))(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${T.hair}`,
      background: T.elev,
    }}>
      <div style={{
        height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${T.hair}`,
      }}>
        <div style={{
          fontSize: 12.5, color: T.fg, fontWeight: 500, display: 'inline-flex',
          alignItems: 'center', gap: 8,
        }}>
          <Icon name="terminal" size={13}/>
          Paste into Codex
        </div>
        <div style={{ flex: 1 }}/>
        <button onClick={onCopy} style={{
          height: 30, padding: '0 14px', borderRadius: 999,
          background: copied ? T.btnDark : 'transparent',
          color: copied ? T.btnDarkFg : T.fg,
          border: copied ? 0 : `1px solid ${T.hairS}`,
          cursor: 'pointer', fontSize: 12, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          transition: 'all 200ms',
        }}>
          {copied ? <Icon name="check" size={13} color={T.btnDarkFg}/> : <Icon name="copy" size={13}/>}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{
        margin: 0, padding: '22px 22px',
        fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace',
        fontSize: 13.5, lineHeight: '24px', color: T.fg,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      }}>
{`Use `}<span style={{ color: T.fg, fontWeight: 600 }}>@Computer Use / sub-agent swarms</span>{` and this repo:
`}<span style={{ color: T.fg, textDecoration: 'underline', textUnderlineOffset: 3 }}>https://github.com/Vyro-ai/imagine-campaign-director</span>{`

to create `}<span style={{
          background: 'rgba(138,63,252,0.10)', color: 'rgb(var(--primary-70))', padding: '1px 8px',
          borderRadius: 6, fontWeight: 500,
        }}>{`<your idea here>`}</span>
      </pre>
      <div style={{
        padding: '14px 22px', borderTop: `1px solid ${T.hair}`,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 12.5, color: T.fg2,
      }}>
        <Icon name="paperclip" size={13}/>
        Attach product photos, brand kits, mood boards, or reference videos along with the prompt. The repo's execution rules handle the rest.
      </div>
    </div>
  );
};

/* =========================================================
   How it works — compact horizontal strip (no illustrations)
========================================================= */
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

const HowItWorks = () => {
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
    <div id="how-it-works" style={{ marginTop: 64 }}>
      <SectionHead
        eyebrow="How it works"
        title="Paste, plan, run."
        sub="The repo handles every node — you don't wire a single edge."
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

/* =========================================================
   40-second walkthrough video
========================================================= */
const VideoBlock = () => {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <div id="walkthrough" style={{ marginTop: 64 }}>
      <SectionHead
        eyebrow="Walkthrough"
        title="See it run in 40 seconds."
        sub="A real Codex session: starting the prompt, building the Imagine.Art workflow, and receiving the finished campaign video."
      />
      <div style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: 16, border: `1px solid ${T.hair}`,
        background: '#000', aspectRatio: '16/9',
      }}>
        <video
          ref={ref}
          src="assets/walkthrough.mp4"
          poster="assets/walkthrough-poster.jpg"
          playsInline
          loop
          preload="none"
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
  );
};

window.PromptBlock = PromptBlock;
window.HowItWorks = HowItWorks;
window.VideoBlock = VideoBlock;
window.SectionHead = SectionHead;
