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
          {copied ? <Icon name="check" size={12} color={T.btnDarkFg}/> : <Icon name="copy" size={12}/>}
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
   How it works — 3 steps
========================================================= */
const HowItWorks = () => {
  const steps = [
    {
      n: '01', icon: 'edit', title: 'Describe what you want',
      body: 'Paste the starter prompt into Codex with your idea. A sentence is fine — Codex will expand the brief if you only have one. Attach references when you have them.',
      meta: '~30 sec',
    },
    {
      n: '02', icon: 'github', title: 'Codex reads the repo',
      body: 'Sub-agents brainstorm, critique, and shape your campaign before any credits are spent. Bad ideas get caught here, not after generation.',
      meta: '1–2 min',
    },
    {
      n: '03', icon: 'workflow', title: 'Workflow built end-to-end',
      body: 'Computer Use opens Imagine.Art in your Chrome session. Codex builds the canvas, generates the motion, verifies the exports, and packages a review MP4.',
      meta: '5–15 min',
    },
  ];

  return (
    <div id="how-it-works" style={{ marginTop: 64 }}>
      <SectionHead
        eyebrow="How it works"
        title="From a sentence to a finished campaign — in three steps."
        sub="No nodes to wire by hand. The agent plans, generates, reviews, and packages the run."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{
            position: 'relative', padding: 24, borderRadius: 16,
            background: T.elev, border: `1px solid ${T.hair}`,
            display: 'flex', flexDirection: 'column', gap: 12,
            minHeight: 220,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: T.surfS, color: T.fg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={s.icon} size={17}/>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 500, letterSpacing: '0.04em',
                color: T.fg2,
              }}>Step {s.n}</div>
              <div style={{ flex: 1 }}/>
              <div style={{
                fontSize: 11, color: T.fg2, padding: '3px 8px',
                borderRadius: 999, background: 'transparent',
                border: `1px solid ${T.hairS}`,
              }}>{s.meta}</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.005em' }}>{s.title}</div>
            <div style={{ fontSize: 13, color: T.fg2, lineHeight: 1.55 }}>{s.body}</div>
          </div>
        ))}
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
    <div style={{ marginTop: 64 }}>
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
          playsInline
          loop
          onClick={toggle}
          onTimeUpdate={(e)=>localStorage.setItem('cd:vt', e.target.currentTime)}
          onLoadedMetadata={(e)=>{
            const t = parseFloat(localStorage.getItem('cd:vt')||'0');
            if (!isNaN(t)) e.target.currentTime = t;
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
        />
        {!playing && (
          <button onClick={toggle} style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.35))',
            border: 0, cursor: 'pointer',
          }}>
            <div style={{
              width: 76, height: 76, borderRadius: 999,
              background: 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
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
