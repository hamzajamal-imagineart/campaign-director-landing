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
      borderRadius: 16, overflow: 'hidden',
      background: T.elev, border: `1px solid ${T.hair}`,
      display: 'flex', flexDirection: 'column',
      transition: 'transform 240ms cubic-bezier(0.16,1,0.3,1), box-shadow 240ms',
      transform: hover ? 'translateY(-2px)' : 'none',
      boxShadow: hover ? '0 8px 24px rgba(20,16,40,0.06)' : 'none',
    }}>
      <div style={{
        height: 160, position: 'relative', overflow: 'hidden',
        background: ex.bg,
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.45) 100%), url(${ex.img})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '5px 10px', borderRadius: 999,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
          color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name={ex.icon} size={11} color="#fff"/>
          {ex.chip}
        </div>
      </div>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{ex.title}</div>
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
    borderRadius: 12, border: `1px solid ${T.hair}`,
    background: T.elev, overflow: 'hidden',
  }}>
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
      padding: '16px 18px', background: 'transparent', border: 0, cursor: 'pointer',
      color: T.fg, fontSize: 14, fontWeight: 500, textAlign: 'left',
    }}>
      <span style={{ flex: 1 }}>{q}</span>
      <Icon name="chevronDown" size={16} style={{
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
  const [open, setOpen] = useState(0);
  const items = [
    {
      q: 'Do I need to be technical to use this?',
      a: 'No. If you can paste a sentence into Codex and attach a photo, you can run a campaign. The repo handles all of the production logic — node selection, generation order, cost checks, and final assembly.',
    },
    {
      q: 'Why only Codex?',
      a: 'Workflow canvases need reliable browser, clipboard, download, and file-verification control. Codex with Computer Use is the only agent today that handles those interactions consistently. We will open this up to other agents as their tools mature.',
    },
    {
      q: 'What if I only have an idea, not a brand kit?',
      a: 'A sentence is fine. Codex will expand the brief, propose directions, and ask sub-agents to critique before spending credits. Files only make the result sharper.',
    },
    {
      q: 'Will it spend my credits without asking?',
      a: 'No. Before any generation, Codex checks the right node, verifies the cost, and stops if anything is unclear. You can also run an audit-only pass that never spends credits — just point it at an existing workflow and ask for notes.',
    },
    {
      q: 'What does "finished" mean?',
      a: 'A finished run gives you five things you can check: a campaign direction and shot plan, a built Imagine.Art workflow, generated motion clips (not stills, not previews), a review MP4, and QC notes plus a shot-source manifest.',
    },
    {
      q: 'What if something goes wrong?',
      a: "Codex returns a clear blocker — login required, missing Computer Use, subagents unavailable, export failure, or insufficient credits — instead of pretending the campaign is done. You'll know exactly what to fix.",
    },
  ];
  return (
    <div style={{ marginTop: 64 }}>
      <SectionHead
        eyebrow="FAQ"
        title="Common questions, answered."
      />
      <div style={{ display: 'grid', gap: 8, maxWidth: 820 }}>
        {items.map((it, i) => (
          <FAQItem key={i} q={it.q} a={it.a} open={open===i} onClick={()=>setOpen(open===i?-1:i)}/>
        ))}
      </div>
    </div>
  );
};

/* =========================================================
   Final CTA
========================================================= */
const FinalCTA = ({ onLaunch }) => (
  <div className="dot-grid" style={{
    marginTop: 64, marginBottom: 24,
    position: 'relative', overflow: 'hidden',
    borderRadius: 20,
    background: `
      radial-gradient(80% 140% at 100% 100%, rgba(138,63,252,0.32) 0%, rgba(138,63,252,0.10) 35%, rgba(0,0,0,0) 60%),
      linear-gradient(135deg, #3B1F75 0%, #2A1656 50%, #1A0F33 100%)
    `,
    border: `1px solid rgba(255,255,255,0.08)`,
    padding: '40px 36px',
    display: 'flex', alignItems: 'center', gap: 24,
  }}>
    <div aria-hidden style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
      backgroundSize: '14px 14px',
      maskImage: 'linear-gradient(315deg, rgba(0,0,0,0.5), rgba(0,0,0,0))',
      WebkitMaskImage: 'linear-gradient(315deg, rgba(0,0,0,0.5), rgba(0,0,0,0))',
    }}/>
    <div style={{ flex: 1, position: 'relative' }}>
      <h2 style={{
        margin: 0, fontSize: 28, lineHeight: '36px',
        fontWeight: 700, letterSpacing: '-0.005em', color: T.fg,
      }}>
        Direct your first campaign.
      </h2>
      <p style={{ margin: '8px 0 0', fontSize: 14, color: T.fg2, maxWidth: 540, lineHeight: 1.55 }}>
        It takes a sentence and a few attachments. Codex does the rest. The first run is the one
        you'll learn the most from — pick something simple.
      </p>
    </div>
    <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
      <a href="https://github.com/Vyro-ai/imagine-campaign-director" target="_blank" rel="noreferrer" style={{
        height: 40, padding: '0 18px', borderRadius: 999,
        background: T.btnDark, color: T.btnDarkFg, border: 0,
        cursor: 'pointer', fontSize: 13.5, fontWeight: 500, textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        <Icon name="github" size={14} color={T.btnDarkFg}/> View repo
      </a>
    </div>
  </div>
);

window.Examples = Examples;
window.FAQ = FAQ;
window.FinalCTA = FinalCTA;
