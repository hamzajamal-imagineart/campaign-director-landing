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
    icon: 'package',
    title: 'Product launch campaign',
    chip: 'Most popular',
    desc: 'Hero shot, three social variants, post-ready 1:1 / 9:16 / 16:9 crops, and a 15-second vertical ad — all from one product photo.',
    prompt: `15-second vertical launch ad for this canned drink. Use the product photo and brand kit. Vibe: moody late-night convenience-store cinema. Avoid sports-drink cliches and fake labels.`,
    deliverables: ['Hero image', '3 social variants', '15s vertical ad', 'Crop set'],
    bg: 'linear-gradient(135deg,#1a1330,#3a1f6b)',
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80',
  },
  {
    id: 'brand',
    icon: 'palette',
    title: 'Brand identity kit',
    chip: 'Great first run',
    desc: 'Logo variants on light and dark, a six-stop color palette, type pairing, and ten on-brand social templates ready to drop into a calendar.',
    prompt: `Build a brand identity kit for a small specialty coffee roaster called North Beam. Warm minimal Scandinavian feel. Logo, palette, and 10 social templates.`,
    deliverables: ['Logo set', 'Palette', 'Type pairing', '10 templates'],
    bg: 'linear-gradient(135deg,#2b1c10,#6a3d1f)',
    img: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&q=80',
  },
  {
    id: 'fashion',
    icon: 'spark',
    title: 'Fashion film',
    chip: 'Cinematic',
    desc: 'A 30-second luxury fashion film with consistent model and wardrobe across shots — rain, black glass, chrome, and a strong final hero image.',
    prompt: `30-second luxury fashion film. Mood: rain, black glass, chrome, restrained performance, strong final hero image. Keep model and wardrobe consistent.`,
    deliverables: ['Shot plan', '8 motion clips', 'Final cut MP4', 'QC notes'],
    bg: 'linear-gradient(135deg,#0a0a0a,#3a3a3a)',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
  },
  {
    id: 'audit',
    icon: 'shield',
    title: 'Existing workflow audit',
    chip: 'No credits spent',
    desc: 'A read-only review of a workflow you already started. Spot what’s missing, what could waste credits, and what to fix before the next run.',
    prompt: `Audit this Imagine.Art workflow. Do not launch anything. Tell me what is missing, what might waste credits, what assets are not connected, and what needs to be fixed before generation continues.`,
    deliverables: ['Gap report', 'Cost flags', 'Fix list', 'No credits used'],
    bg: 'linear-gradient(135deg,#102a1a,#1f5a3d)',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
  },
];

const ExampleCard = ({ ex }) => {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    window.copyText(ex.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
      borderRadius: 18, overflow: 'hidden',
      background: T.elev, border: `1px solid ${T.hair}`,
      display: 'flex', flexDirection: 'column',
      transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1), box-shadow 280ms, border-color 280ms',
      transform: hover ? 'translateY(-3px)' : 'none',
      boxShadow: hover ? '0 18px 48px rgba(0,0,0,0.35)' : '0 1px 2px rgba(0,0,0,0.15)',
      borderColor: hover ? 'rgba(167,123,254,0.35)' : T.hair,
    }}>
      <div style={{
        height: 220, position: 'relative', overflow: 'hidden',
        background: ex.bg,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.65) 100%), url(${ex.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
        }}/>
        <div style={{
          position: 'absolute', top: 14, left: 14,
          padding: '5px 10px', borderRadius: 999,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <Icon name={ex.icon} size={13} color="#fff"/>
          {ex.chip}
        </div>
        <div style={{
          position: 'absolute', left: 16, right: 16, bottom: 14,
          color: '#fff',
        }}>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.005em' }}>{ex.title}</div>
        </div>
      </div>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ fontSize: 13, color: T.fg2, lineHeight: 1.55, flex: 1 }}>{ex.desc}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {ex.deliverables.map(d => (
            <span key={d} style={{
              fontSize: 11, fontWeight: 500, padding: '3px 8px',
              borderRadius: 999, background: T.surfS, color: T.fg2,
              border: `1px solid ${T.hair}`,
            }}>{d}</span>
          ))}
        </div>
        <div style={{
          marginTop: 6, padding: 12, borderRadius: 10,
          background: T.bg, border: `1px solid ${T.hair}`,
          fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace',
          fontSize: 12, lineHeight: 1.55, color: T.fg2,
          maxHeight: 96, overflow: 'hidden', position: 'relative',
        }}>
          {ex.prompt}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 32,
            background: `linear-gradient(180deg, transparent, ${T.bg})`,
            pointerEvents: 'none',
          }}/>
        </div>
        <button onClick={onCopy} style={{
          height: 36, borderRadius: 999,
          background: copied ? T.btnDark : 'transparent',
          color: copied ? T.btnDarkFg : T.fg,
          border: copied ? 0 : `1px solid ${T.hairS}`,
          cursor: 'pointer', fontSize: 13, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 200ms',
        }}>
          {copied ? <Icon name="check" size={13} color={T.btnDarkFg}/> : <Icon name="copy" size={13}/>}
          {copied ? 'Prompt copied' : 'Copy prompt'}
        </button>
      </div>
    </div>
  );
};

const Examples = ({ columns = 2 }) => (
  <div style={{ marginTop: 64 }}>
    <SectionHead
      eyebrow="What you can build"
      title="Four briefs to start with."
      sub="Plain creative briefs — copy one, paste it after the starter prompt, swap the brand, and you have a working campaign request."
    />
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 16 }}>
      {EXAMPLES.map(ex => <ExampleCard key={ex.id} ex={ex}/>)}
    </div>
  </div>
);

/* =========================================================
   FAQ
========================================================= */
const FAQItem = ({ q, a, open, onClick }) => (
  <div style={{
    position: 'relative',
    borderRadius: 12, border: `1px solid ${open ? 'rgba(167,123,254,0.30)' : T.hair}`,
    background: T.elev, overflow: 'hidden',
    transition: 'border-color 240ms, background 240ms',
  }}>
    {/* Left accent bar visible when open */}
    <div aria-hidden style={{
      position: 'absolute', top: 0, bottom: 0, left: 0,
      width: open ? 2 : 0, background: '#A57BFE',
      transition: 'width 240ms cubic-bezier(0.16,1,0.3,1)',
    }}/>
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
      padding: '16px 18px', background: 'transparent', border: 0, cursor: 'pointer',
      color: T.fg, fontSize: 14, fontWeight: 500, textAlign: 'left',
    }}>
      <span style={{ flex: 1 }}>{q}</span>
      <Icon name="chevronDown" size={15} style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 200ms',
      }}/>
    </button>
    <div style={{
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      transition: 'grid-template-rows 280ms cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{ overflow: 'hidden', minHeight: 0 }}>
        <div style={{
          padding: '0 18px 18px', fontSize: 13, color: T.fg2, lineHeight: 1.65,
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
      a: 'No. Sub-agents plan and critique before any generation runs, and every node has a cost check. You can also run an audit-only pass that touches nothing — just reads your existing canvas and reports back.',
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
      a: "It surfaces the blocker — login required, missing Computer Use, sub-agent failure, export error, low credits — and stops. You get a clear next step, not a half-finished run pretending to be done.",
    },
  ];
  const left = items.slice(0, 3);
  const right = items.slice(3);
  return (
    <div style={{ marginTop: 64 }}>
      <SectionHead
        eyebrow="FAQ"
        title="Quick answers."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          {left.map((it, i) => (
            <FAQItem key={i} q={it.q} a={it.a} open={open===i} onClick={()=>setOpen(open===i?-1:i)}/>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {right.map((it, i) => {
            const idx = i + left.length;
            return (
              <FAQItem key={idx} q={it.q} a={it.a} open={open===idx} onClick={()=>setOpen(open===idx?-1:idx)}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Final CTA
========================================================= */
const CTAParticle = ({ left, delay, duration, size, drift }) => (
  <span aria-hidden style={{
    position: 'absolute',
    left: `${left}%`, bottom: -6,
    width: size, height: size, borderRadius: 999,
    background: 'rgba(167,123,254,0.65)',
    boxShadow: '0 0 8px rgba(167,123,254,0.55)',
    animation: `particleFloat ${duration}s ease-in-out ${delay}s infinite`,
    pointerEvents: 'none',
    ['--drift']: `${drift}px`,
  }}/>
);

const FinalCTA = ({ onLaunch }) => {
  const [hover, setHover] = useState(false);
  return (
    <div style={{
      marginTop: 64, marginBottom: 24,
      position: 'relative', overflow: 'hidden',
      borderRadius: 20,
      background: 'linear-gradient(135deg, #161616 0%, #0E0E0E 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '46px 38px',
      display: 'flex', alignItems: 'center', gap: 24,
    }}>
      {/* Slowly rotating corner glow */}
      <div aria-hidden style={{
        position: 'absolute', right: -200, bottom: -200,
        width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(138,63,252,0.30) 0%, rgba(138,63,252,0.08) 40%, rgba(138,63,252,0) 70%)',
        animation: 'rotateRing 30s linear infinite',
        pointerEvents: 'none',
        transformOrigin: 'center',
      }}/>

      {/* Subtle dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        maskImage: 'linear-gradient(315deg, rgba(0,0,0,0.4), rgba(0,0,0,0))',
        WebkitMaskImage: 'linear-gradient(315deg, rgba(0,0,0,0.4), rgba(0,0,0,0))',
      }}/>

      {/* Floating particles */}
      <CTAParticle left={8}  delay={0}    duration={9}  size={3} drift={20}/>
      <CTAParticle left={22} delay={1.2}  duration={11} size={2} drift={-15}/>
      <CTAParticle left={36} delay={2.5}  duration={10} size={3} drift={10}/>
      <CTAParticle left={50} delay={0.6}  duration={12} size={2} drift={-25}/>
      <CTAParticle left={64} delay={3.1}  duration={9}  size={3} drift={15}/>
      <CTAParticle left={78} delay={1.8}  duration={11} size={2} drift={-10}/>
      <CTAParticle left={90} delay={4}    duration={10} size={3} drift={20}/>

      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <h2 style={{
          margin: 0, fontSize: 32, lineHeight: '40px',
          fontWeight: 700, letterSpacing: '-0.01em',
          background: 'linear-gradient(120deg, #FFFFFF 0%, #C4A8FF 35%, #FFFFFF 70%, #C4A8FF 100%)',
          backgroundSize: '220% 100%',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'metallicSheen 8s ease-in-out infinite',
        }}>
          Direct your first campaign.
        </h2>
        <p style={{ margin: '10px 0 0', fontSize: 14, color: T.fg2, maxWidth: 540, lineHeight: 1.6 }}>
          It takes a sentence and a few attachments. Codex does the rest. The first run is the one
          you'll learn the most from — pick something simple.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 1 }}>
        <a
          href="https://github.com/Vyro-ai/imagine-campaign-director"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={()=>setHover(true)}
          onMouseLeave={()=>setHover(false)}
          style={{
            position: 'relative', overflow: 'hidden',
            height: 44, padding: '0 22px', borderRadius: 999,
            background: T.btnDark, color: T.btnDarkFg, border: 0,
            cursor: 'pointer', fontSize: 14, fontWeight: 600, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 16px 36px rgba(0,0,0,0.40)',
            transform: hover ? 'translateY(-1px)' : 'none',
            transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1)',
          }}>
          <Icon name="github" size={15} color={T.btnDarkFg}/> View repo
          {hover && (
            <span aria-hidden style={{
              position: 'absolute', top: 0, left: 0, height: '100%', width: '40%',
              background: 'linear-gradient(90deg, transparent, rgba(138,63,252,0.22), transparent)',
              animation: 'shimmerSweep 850ms ease-out',
              pointerEvents: 'none',
            }}/>
          )}
        </a>
      </div>
    </div>
  );
};

window.Examples = Examples;
window.FAQ = FAQ;
window.FinalCTA = FinalCTA;
