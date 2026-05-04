/* global React */
const { useState, useRef, useEffect } = React;
const { T, Icon, SectionHead } = window;

// Robust copy that works inside sandboxed iframes (where navigator.clipboard
// often fails silently without an allow="clipboard-write" attribute).
const copyText = (text) => {
  let ok = false;
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    ok = document.execCommand('copy');
    document.body.removeChild(ta);
  } catch (e) { ok = false; }
  if (!ok && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(()=>{});
    ok = true;
  }
  return ok;
};
window.copyText = copyText;

/* =========================================================
   Examples — what you can build (gallery)
========================================================= */
const EXAMPLES = [
  {
    id: 'product',
    title: 'Minimal product float',
    category: 'E-commerce',
    accent: null,   // null = muted white
    meta: [
      { label: 'Format',  value: '9:16, 1:1' },
      { label: 'Output',  value: 'Loop ready, Shadow pass' },
      { label: 'Style',   value: 'Minimal, Clean' },
    ],
    prompt: `Create a minimal floating product video for an ecommerce launch. Clean white background, soft shadows, slow rotation with subtle depth. Output: 9:16 and 1:1 crops ready for Instagram and TikTok.`,
    video: 'assets/examples/ec-template-minimal-float.mp4',
  },
  {
    id: 'editorial',
    title: 'Editorial ecommerce clean',
    category: 'Fashion',
    accent: '#A57BFE',  // purple highlight
    meta: [
      { label: 'Format',  value: 'Hero banner, Social set' },
      { label: 'Output',  value: 'Type treatment, Cut-down' },
      { label: 'Style',   value: 'High-end, Structured' },
    ],
    prompt: `Editorial-style ecommerce campaign. Clean layout, strong typography, model in neutral wardrobe. Vibe: high-end fashion meets everyday utility. Deliver a full social set and a hero banner.`,
    video: 'assets/examples/ec-template-editorial-clean.mp4',
  },
  {
    id: 'film',
    title: 'Cinematic time jump',
    category: 'Short film',
    accent: null,
    meta: [
      { label: 'Format',  value: '60s cut, 15s teaser' },
      { label: 'Output',  value: 'Score, Color grade' },
      { label: 'Style',   value: 'Cinematic, Dramatic' },
    ],
    prompt: `Cinematic short film with a time-jump narrative. Multiple eras, consistent protagonist, dramatic lighting transitions. Score with tension and release. Final deliverable: 60-second cut and 15-second teaser.`,
    video: 'assets/examples/time-jump.mp4',
  },
  {
    id: 'marketing',
    title: 'Full marketing campaign',
    category: 'Paid social',
    accent: null,
    meta: [
      { label: 'Format',  value: '6s, 15s, 30s' },
      { label: 'Output',  value: 'Captions, Branded outro' },
      { label: 'Style',   value: 'Performance, Direct' },
    ],
    prompt: `End-to-end marketing video campaign. Hook in the first 3 seconds, clear value prop, branded outro. Optimised for paid social. Deliver three length variants: 6s, 15s, 30s.`,
    video: 'assets/examples/mkt-video-campaign-2.mp4',
  },
];

const ExampleCard = ({ ex }) => {
  const [hover, setHover]   = useState(false);
  const [copied, setCopied] = useState(false);
  const onCopy = () => { window.copyText(ex.prompt); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const accent = ex.accent || 'rgba(255,255,255,0.35)';

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 3, overflow: 'hidden',
        background: '#0c0c0c',
        border: `1px solid ${hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
        display: 'flex', flexDirection: 'column',
        transition: 'transform 360ms cubic-bezier(0.16,1,0.3,1), box-shadow 360ms, border-color 280ms',
        transform: hover ? 'translateY(-5px)' : 'none',
        boxShadow: hover ? '0 28px 56px rgba(0,0,0,0.55)' : '0 2px 10px rgba(0,0,0,0.3)',
      }}
    >
      {/* ── Video ── */}
      <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0, height: 220 }}>
        <video
          src={ex.video} autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 900ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
          background: 'linear-gradient(to bottom, transparent, rgba(12,12,12,0.65))',
          pointerEvents: 'none',
        }}/>
      </div>

      {/* ── Info strip ── */}
      <div style={{ padding: '17px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Title + ↗ button */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 9 }}>
          <div style={{
            fontSize: 15, fontWeight: 700, color: '#fff',
            letterSpacing: '0.02em', lineHeight: 1.2,
            textTransform: 'uppercase', flex: 1, paddingRight: 8,
          }}>
            {ex.title}
          </div>
          <button
            onClick={onCopy} title="Copy prompt"
            style={{
              flexShrink: 0, width: 28, height: 28, marginTop: 1,
              background: hover ? 'rgba(255,255,255,0.08)' : 'transparent',
              border: `1px solid ${hover ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.09)'}`,
              borderRadius: 5, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 200ms, border-color 200ms', fontFamily: 'inherit',
            }}
          >
            {copied
              ? <Icon name="check"        size={12} color="rgba(255,255,255,0.75)"/>
              : <Icon name="arrowUpRight" size={12} color="rgba(255,255,255,0.45)"/>
            }
          </button>
        </div>

        {/* Category dot + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 13 }}>
          <span style={{ width: 5, height: 5, borderRadius: 1, flexShrink: 0, background: accent }}/>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: accent,
          }}>{ex.category}</span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 13 }}/>

        {/* Prompt text — fades out at bottom */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden', maxHeight: '5.6em' }}>
          <p style={{
            margin: 0,
            fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace',
            fontSize: 11, lineHeight: 1.7, color: 'rgba(255,255,255,0.38)',
            letterSpacing: '0.01em',
          }}>
            {ex.prompt}
          </p>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '2.2em',
            background: 'linear-gradient(to bottom, transparent, #0c0c0c)',
            pointerEvents: 'none',
          }}/>
        </div>

        {/* Copy prompt button */}
        <button
          onClick={onCopy}
          style={{
            marginTop: 14,
            height: 32, borderRadius: 5,
            background: 'transparent',
            color: copied ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.32)',
            border: `1px solid ${copied ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.09)'}`,
            cursor: 'pointer', fontSize: 10, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            transition: 'color 200ms, border-color 200ms', fontFamily: 'inherit',
            letterSpacing: '0.10em', textTransform: 'uppercase',
          }}
        >
          <Icon
            name={copied ? 'check' : 'copy'} size={11}
            color={copied ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.32)'}
          />
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
    </div>
  );
};

const Examples = ({ columns = 4 }) => (
  <div id="examples" style={{ marginTop: 0 }}>
    <SectionHead
      eyebrow="What you can build"
      title="Four briefs to start with."
      sub="Plain creative briefs. Copy one, paste it after the starter prompt, swap the brand, and you have a working campaign request."
    />
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 2 }}>
      {EXAMPLES.map(ex => <ExampleCard key={ex.id} ex={ex}/>)}
    </div>
  </div>
);

/* =========================================================
   FAQ
========================================================= */
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

const FAQ = () => {
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

/* =========================================================
   Final CTA
========================================================= */
const FinalCTA = () => (
  <div style={{
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(255,255,255,0.03)',
    padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 72px)',
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 32,
  }}>
    {/* Top rule */}
    <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.18)' }}/>

    {/* Copy */}
    <div style={{ maxWidth: 560 }}>
      <p style={{
        margin: '0 0 6px',
        fontSize: 11, fontWeight: 600, letterSpacing: '1.8px',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
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
        color: 'rgba(255,255,255,0.45)', lineHeight: 1.75,
      }}>
        One sentence. A few attachments. Codex handles the rest —
        planning, generating, reviewing, and packaging the run end-to-end.
      </p>
    </div>

    {/* Actions */}
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <a
        href="https://cal.com/imagine-art/campaign-director"
        target="_blank" rel="noreferrer"
        style={{
          height: 44, padding: '0 24px', borderRadius: 999,
          background: '#fff', color: '#0a0a0a',
          fontSize: 14, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          textDecoration: 'none',
        }}>
        Book a demo
      </a>
      <a
        href="https://github.com/Vyro-ai/imagine-campaign-director"
        target="_blank" rel="noreferrer"
        style={{
          height: 44, padding: '0 24px', borderRadius: 999,
          background: 'transparent', color: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          fontSize: 14, fontWeight: 400,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          textDecoration: 'none',
        }}>
        <Icon name="github" size={14} color="rgba(255,255,255,0.6)"/> View on GitHub
      </a>
    </div>
  </div>
);

window.Examples = Examples;
window.FAQ = FAQ;
window.FinalCTA = FinalCTA;
