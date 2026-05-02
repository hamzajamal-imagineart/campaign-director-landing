/* global React */
const { useState: useStateSN, useEffect: useEffectSN } = React;

/* =========================================================
   Workflow Gallery — real (or fallback) Imagine.Art canvas
   screenshots paired with the brief that generated them.
   The canvas is the wow; the sentence is the proof of how
   little the user had to write.
========================================================= */

/* Tiny Unsplash thumbnails used inside the fallback canvas
   nodes when assets/workflow-*.png isn't present yet. */
const TH = (id) => `https://images.unsplash.com/photo-${id}?w=240&q=80`;

const SN_EXAMPLES = [
  {
    id: 'cyber-fairy',
    label: 'Cyber-fairy headphones',
    sentence: 'Cinematic product story for our cyber-fairy headphones — pink cybernetic glass, character integration, vertical-first.',
    stats: { nodes: 12, edges: 16, minutes: 12, subagents: 5 },
    file: 'assets/workflow-cyber-fairy.png',
    fallback: {
      nodes: [
        { id: 'in',  kind: 'input',  x: 6,  y: 50, w: 12, img: TH('1551782450-a2132b4ba21d'), label: 'product.png' },
        { id: 'p1',  kind: 'prompt', x: 23, y: 18, w: 15, label: 'Copilot 1', model: 'GPT-5.1',
          text: 'SHOT: clean product truth for the cyber-fairy headphones — pink chrome, soft glass wings.' },
        { id: 'p2',  kind: 'prompt', x: 23, y: 50, w: 15, label: 'Copilot 2', model: 'GPT-5.1',
          text: 'SHOT: hero render — extreme chrome detail, pink wing reflections, monotones.' },
        { id: 'p3',  kind: 'prompt', x: 23, y: 82, w: 15, label: 'Copilot 3', model: 'GPT-5.1',
          text: 'SHOT: character reveal as music activates. SUBJECT: pink hair, soft hoodie, neon room.' },
        { id: 'g1',  kind: 'image',  x: 43, y: 18, w: 12, img: TH('1604644401890-0bd678c83788'), label: 'Image 1', model: 'GPT Image 2' },
        { id: 'g2',  kind: 'image',  x: 43, y: 50, w: 12, img: TH('1503342217505-b0a15ec3261c'), label: 'Image 2', model: 'Nano Banana' },
        { id: 'g3',  kind: 'image',  x: 43, y: 82, w: 12, img: TH('1573496359142-b8d87734a5a2'), label: 'Image 3', model: 'GPT Image 2' },
        { id: 'g4',  kind: 'image',  x: 62, y: 34, w: 12, img: TH('1493612276216-ee3925520721'), label: 'Image 4', model: 'GPT Image 2' },
        { id: 'g5',  kind: 'image',  x: 62, y: 66, w: 12, img: TH('1539109136881-3be0616acf4b'), label: 'Image 5', model: 'Nano Banana Pro' },
        { id: 'g6',  kind: 'image',  x: 80, y: 34, w: 12, img: TH('1542291026-7eec264c27ff'), label: 'Image 6', model: 'GPT Image 2' },
        { id: 'g7',  kind: 'image',  x: 80, y: 66, w: 12, img: TH('1488161628813-04466f872be2'), label: 'Image 7', model: 'GPT Image 2' },
        { id: 'fin', kind: 'video',  x: 95, y: 50, w: 13, img: TH('1493612276216-ee3925520721'), label: 'Video 1', model: 'Seedance 2.0', highlight: true, caption: '15s · vertical · cyber-fairy reveal' },
      ],
      edges: [
        ['in','p1'], ['in','p2'], ['in','p3'],
        ['p1','g1'], ['p2','g2'], ['p3','g3'],
        ['g1','g4'], ['g2','g4'], ['g2','g5'], ['g3','g5'],
        ['g4','g6'], ['g5','g7'], ['g4','g7'], ['g5','g6'],
        ['g6','fin'], ['g7','fin'],
      ],
    },
  },

  {
    id: 'coffee-brand',
    label: 'Specialty roaster brand kit',
    sentence: 'Brand identity kit for a small specialty coffee roaster. Warm, minimal, Scandinavian.',
    stats: { nodes: 14, edges: 18, minutes: 9, subagents: 4 },
    file: 'assets/workflow-coffee-brand.png',
    fallback: {
      nodes: [
        { id: 'br',  kind: 'prompt', x: 6,  y: 50, w: 14, label: 'Brief', model: 'Director',
          text: 'Build a brand identity kit for a small specialty coffee roaster. Warm, minimal, Scandinavian.' },
        { id: 'vc',  kind: 'prompt', x: 24, y: 14, w: 12, label: 'Voice',  model: 'GPT-5.1', text: 'Calm, ingredient-led, sentence-case copy.' },
        { id: 'mb',  kind: 'image',  x: 24, y: 38, w: 12, img: TH('1502672260266-1c1ef2d93688'), label: 'Mood' },
        { id: 'pl',  kind: 'image',  x: 24, y: 62, w: 12, img: TH('1559496417-e7f25cb247f3'), label: 'Palette' },
        { id: 'tp',  kind: 'prompt', x: 24, y: 86, w: 12, label: 'Type', text: 'Söhne · Söhne Mono · Lyon Display.' },
        { id: 'lA',  kind: 'image',  x: 43, y: 18, w: 11, img: TH('1559496417-e7f25cb247f3'), label: 'Logo A', model: 'GPT Image 2' },
        { id: 'lB',  kind: 'image',  x: 43, y: 42, w: 11, img: TH('1483985988355-763728e1935b'), label: 'Logo B', model: 'GPT Image 2' },
        { id: 'lC',  kind: 'image',  x: 43, y: 66, w: 11, img: TH('1622483767028-3f66f32aef97'), label: 'Logo C', model: 'GPT Image 2' },
        { id: 't1',  kind: 'image',  x: 62, y: 14, w: 11, img: TH('1559496417-e7f25cb247f3'), label: 'Square ×4' },
        { id: 't2',  kind: 'image',  x: 62, y: 38, w: 11, img: TH('1502672260266-1c1ef2d93688'), label: 'Story ×3' },
        { id: 't3',  kind: 'image',  x: 62, y: 62, w: 11, img: TH('1483985988355-763728e1935b'), label: 'Banner ×2' },
        { id: 't4',  kind: 'image',  x: 62, y: 86, w: 11, img: TH('1622483767028-3f66f32aef97'), label: 'Print ×1' },
        { id: 'pk',  kind: 'video',  x: 86, y: 50, w: 14, img: TH('1559496417-e7f25cb247f3'), label: 'Brand pack', model: 'Final', highlight: true, caption: 'Logo · palette · type · 10 templates' },
      ],
      edges: [
        ['br','vc'], ['br','mb'], ['br','pl'], ['br','tp'],
        ['vc','lA'], ['mb','lB'], ['pl','lB'], ['pl','lC'], ['tp','lC'],
        ['lA','t1'], ['lB','t2'], ['lC','t3'], ['lC','t4'],
        ['t1','pk'], ['t2','pk'], ['t3','pk'], ['t4','pk'],
      ],
    },
  },

  {
    id: 'fashion-film',
    label: 'Luxury fashion film',
    sentence: '30-second luxury fashion film. Rain, black glass, chrome.',
    stats: { nodes: 16, edges: 19, minutes: 14, subagents: 6 },
    file: 'assets/workflow-fashion-film.png',
    fallback: {
      nodes: [
        { id: 'br',  kind: 'prompt', x: 5,  y: 50, w: 13, label: 'Brief', model: 'Director',
          text: '30-second luxury fashion film. Rain, black glass, chrome.' },
        { id: 'pl',  kind: 'prompt', x: 21, y: 26, w: 11, label: 'Shot plan', text: '8 clips · continuity locked.' },
        { id: 'wd',  kind: 'image',  x: 21, y: 50, w: 11, img: TH('1490481651871-ab68de25d43d'), label: 'Wardrobe' },
        { id: 'cn',  kind: 'image',  x: 21, y: 74, w: 11, img: TH('1517677208171-0bc6725a3e60'), label: 'Continuity' },
        { id: 'c1',  kind: 'image',  x: 38, y: 12, w: 10, img: TH('1488161628813-04466f872be2'), label: 'Clip 1', model: 'Sora' },
        { id: 'c2',  kind: 'image',  x: 38, y: 32, w: 10, img: TH('1469854523086-cc02fe5d8800'), label: 'Clip 2', model: 'Seedance' },
        { id: 'c3',  kind: 'image',  x: 38, y: 52, w: 10, img: TH('1535930891776-0c2dfb7fda1a'), label: 'Clip 3', model: 'Sora' },
        { id: 'c4',  kind: 'image',  x: 38, y: 72, w: 10, img: TH('1490481651871-ab68de25d43d'), label: 'Clip 4', model: 'Seedance' },
        { id: 'c5',  kind: 'image',  x: 38, y: 92, w: 10, img: TH('1517677208171-0bc6725a3e60'), label: 'Clip 5', model: 'Sora' },
        { id: 'c6',  kind: 'image',  x: 56, y: 24, w: 10, img: TH('1488161628813-04466f872be2'), label: 'Clip 6', model: 'Sora' },
        { id: 'c7',  kind: 'image',  x: 56, y: 50, w: 10, img: TH('1535930891776-0c2dfb7fda1a'), label: 'Clip 7', model: 'Sora' },
        { id: 'c8',  kind: 'image',  x: 56, y: 76, w: 10, img: TH('1517677208171-0bc6725a3e60'), label: 'Clip 8', model: 'Sora' },
        { id: 'gr',  kind: 'prompt', x: 73, y: 30, w: 11, label: 'Color grade', text: 'Crushed blacks · cool teal highlights.' },
        { id: 'qc',  kind: 'prompt', x: 73, y: 54, w: 11, label: 'QC pass',     text: 'Continuity, faces, tone consistency.' },
        { id: 'hr',  kind: 'image',  x: 73, y: 78, w: 11, img: TH('1488161628813-04466f872be2'), label: 'Hero frame' },
        { id: 'fin', kind: 'video',  x: 92, y: 50, w: 13, img: TH('1535930891776-0c2dfb7fda1a'), label: 'Final cut', model: 'Edit · 30s', highlight: true, caption: '30s · 16:9 · graded master' },
      ],
      edges: [
        ['br','pl'], ['br','wd'], ['br','cn'],
        ['pl','c1'], ['pl','c2'], ['pl','c3'], ['pl','c4'], ['pl','c5'],
        ['c1','c6'], ['c2','c6'], ['c3','c7'], ['c4','c7'], ['c5','c8'],
        ['c6','gr'], ['c7','qc'], ['c8','hr'],
        ['gr','fin'], ['qc','fin'], ['hr','fin'],
      ],
    },
  },

  {
    id: 'audit',
    label: 'Workflow audit',
    sentence: "Audit my existing workflow. No credits — just tell me what's broken.",
    stats: { nodes: 6, edges: 6, minutes: 3, subagents: 2 },
    file: 'assets/workflow-audit.png',
    fallback: {
      nodes: [
        { id: 'br',  kind: 'prompt', x: 8,  y: 50, w: 17, label: 'Brief', model: 'Director', text: 'Audit my existing workflow. No credits.' },
        { id: 'rd',  kind: 'prompt', x: 32, y: 50, w: 17, label: 'Read canvas', model: 'Computer Use', text: 'Inspect every node, log all parameters.' },
        { id: 'co',  kind: 'prompt', x: 56, y: 22, w: 14, label: 'Cost flags', text: '3 nodes flagged. ~110 cr saved.' },
        { id: 'gp',  kind: 'prompt', x: 56, y: 50, w: 14, label: 'Gap report', text: '2 missing inputs. 1 unconnected.' },
        { id: 'fx',  kind: 'prompt', x: 56, y: 78, w: 14, label: 'Fix list',   text: 'Reconnect output #4 → grade.' },
        { id: 'fin', kind: 'prompt', x: 86, y: 50, w: 16, label: 'Audit report', model: 'Final', highlight: true, text: '6 fixes · 0 credits used.' },
      ],
      edges: [
        ['br','rd'],
        ['rd','co'], ['rd','gp'], ['rd','fx'],
        ['co','fin'], ['gp','fin'], ['fx','fin'],
      ],
    },
  },
];

/* ---------- Single node renderer used inside the fallback canvas ---------- */
const CanvasNode = ({ node }) => {
  const Icon = window.Icon;
  const baseStyle = {
    position: 'absolute',
    left: `${node.x}%`, top: `${node.y}%`,
    transform: 'translate(-50%, -50%)',
    width: `${node.w}%`,
    minWidth: 84, maxWidth: 180,
    background: '#1A1A1A',
    border: `1px solid ${node.highlight ? 'rgba(167,123,254,0.45)' : 'rgba(255,255,255,0.06)'}`,
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: node.highlight
      ? '0 0 0 1px rgba(167,123,254,0.18), 0 0 22px rgba(138,63,252,0.16)'
      : '0 2px 8px rgba(0,0,0,0.4)',
    zIndex: node.highlight ? 3 : 2,
  };
  const headerStyle = {
    height: 16,
    padding: '0 6px',
    display: 'flex', alignItems: 'center', gap: 4,
    fontSize: 8, color: 'rgba(255,255,255,0.55)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    background: 'rgba(255,255,255,0.025)',
    letterSpacing: '0.01em',
  };

  const isMedia = node.kind === 'input' || node.kind === 'image' || node.kind === 'video';
  const dotColor = node.kind === 'video' ? '#FF5F57' : node.kind === 'input' ? '#FEBC2E' : '#A57BFE';

  if (isMedia) {
    return (
      <div style={baseStyle}>
        <div style={headerStyle}>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: dotColor }}/>
          <span style={{ fontWeight: 500 }}>{node.label}</span>
          <span style={{ flex: 1 }}/>
          {node.model && <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)' }}>{node.model}</span>}
        </div>
        <div style={{
          width: '100%',
          aspectRatio: node.kind === 'video' ? '9/16' : '1',
          backgroundImage: node.img ? `url(${node.img})` : 'none',
          backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundColor: '#0A0A0A',
        }}/>
        {node.caption && (
          <div style={{
            padding: '4px 6px',
            fontSize: 7.5, lineHeight: 1.35,
            color: 'rgba(255,255,255,0.55)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}>{node.caption}</div>
        )}
      </div>
    );
  }

  return (
    <div style={baseStyle}>
      <div style={headerStyle}>
        <span style={{ width: 4, height: 4, borderRadius: 999, background: dotColor }}/>
        <span style={{ fontWeight: 500 }}>{node.label || 'Copilot'}</span>
        <span style={{ flex: 1 }}/>
        {node.model && <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)' }}>{node.model}</span>}
      </div>
      <div style={{
        padding: '6px 7px',
        fontSize: 7.5, lineHeight: 1.4,
        color: 'rgba(255,255,255,0.6)',
      }}>{node.text}</div>
    </div>
  );
};

const CanvasFallback = ({ config }) => {
  const nodeMap = {};
  config.nodes.forEach(n => { nodeMap[n.id] = n; });

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#0A0A0A',
      overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}/>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', overflow: 'visible',
      }}>
        {config.edges.map(([from, to], i) => {
          const a = nodeMap[from], b = nodeMap[to];
          if (!a || !b) return null;
          const cx = a.x + (b.x - a.x) * 0.5;
          const path = `M ${a.x} ${a.y} C ${cx} ${a.y}, ${cx} ${b.y}, ${b.x} ${b.y}`;
          return (
            <path key={i} d={path}
              stroke="#D4A858" strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
              fill="none" strokeLinecap="round"
              opacity="0.55"
              style={{
                animation: `edgeFade 600ms ease-out ${(i * 30) + 280}ms both`,
              }}
            />
          );
        })}
      </svg>
      {config.nodes.map((n, i) => (
        <div key={n.id} style={{
          opacity: 0,
          animation: `fadeIn 380ms cubic-bezier(0.16,1,0.3,1) ${i * 50 + 80}ms forwards`,
        }}>
          <CanvasNode node={n}/>
        </div>
      ))}
    </div>
  );
};

/* ---------- Right panel: real PNG with onError fallback ---------- */
const CanvasPanel = ({ example }) => {
  const T = window.T;
  const [errored, setErrored] = useStateSN(false);

  /* If the user later drops in assets/workflow-*.png, useEffect will reset
     the error state when example changes so we re-attempt loading. */
  useEffectSN(() => { setErrored(false); }, [example.id]);

  return (
    <div style={{
      position: 'relative', borderRadius: 16, overflow: 'hidden',
      background: '#0A0A0A', border: `1px solid ${T.hair}`,
      minHeight: 580, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 34, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: `1px solid ${T.hair}`, fontSize: 11, color: T.fg2,
        background: 'rgba(255,255,255,0.02)',
        flexShrink: 0,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: '#FEBC2E' }}/>
        <span style={{ fontWeight: 500 }}>Imagine.Art canvas</span>
        <span style={{ flex: 1 }}/>
        <span style={{
          fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
          fontSize: 10, color: 'rgba(255,255,255,0.35)',
        }}>
          {example.id}.workflow.json
        </span>
      </div>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }} key={example.id}>
        {!errored && (
          <img
            src={example.file}
            alt={example.label}
            onError={() => setErrored(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              animation: 'fadeIn 320ms ease-out',
            }}
          />
        )}
        {errored && <CanvasFallback config={example.fallback}/>}

        {/* Scan-line sweep on every example switch (re-keyed on example.id) */}
        <div aria-hidden style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(167,123,254,0.55) 50%, transparent 100%)',
          boxShadow: '0 0 14px rgba(167,123,254,0.40)',
          pointerEvents: 'none',
          animation: 'scanLine 1.2s ease-out',
        }}/>

        {/* Stats pill bottom-left */}
        <div style={{
          position: 'absolute', left: 14, bottom: 14,
          padding: '6px 11px', borderRadius: 999,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.10)',
          color: '#fff', fontSize: 11, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          letterSpacing: '-0.005em',
        }}>
          <span>{example.stats.nodes} nodes</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{example.stats.edges} connections</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{example.stats.minutes} min</span>
        </div>
      </div>
    </div>
  );
};

/* ---------- Sentence card (left) ---------- */
const SentenceCard = ({ example, idx, total }) => {
  const T = window.T;
  return (
    <div style={{
      position: 'relative', borderRadius: 17, padding: 1,
      background: 'linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(167,123,254,0.30) 50%, rgba(255,255,255,0.06) 100%)',
      backgroundSize: '220% 100%',
      animation: 'borderDrift 9s ease-in-out infinite',
    }}>
      <div key={example.id} style={{
        position: 'relative', padding: '32px 30px', borderRadius: 16,
        background: T.elev,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        animation: 'fadeIn 320ms ease-out',
        minHeight: 578,
      }}>
        <div>
          <div style={{
            fontSize: 11, fontWeight: 600, color: T.fg2, letterSpacing: '0.10em',
            textTransform: 'uppercase', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 999, background: '#A57BFE',
              animation: 'dotPulse 2s ease-in-out infinite',
            }}/>
            The brief · {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <div style={{
            fontSize: 26, lineHeight: 1.34, fontWeight: 500,
            letterSpacing: '-0.012em', color: T.fg,
            fontFamily: "'Lora', 'Iowan Old Style', Georgia, serif",
          }}>
            <span style={{
              fontSize: 48, lineHeight: 0,
              verticalAlign: '-0.18em', marginRight: 4,
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #A57BFE 0%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>“</span>
            {example.sentence}
            <span style={{
              fontSize: 48, lineHeight: 0,
              verticalAlign: '-0.18em', marginLeft: 2,
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #A57BFE 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>”</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
          <div style={{
            fontSize: 11, color: T.fg2, letterSpacing: '0.04em',
            textTransform: 'uppercase', fontWeight: 600,
          }}>
            → Codex generates
          </div>
          <div style={{ fontSize: 14, color: T.fg, lineHeight: 1.55 }}>
            A complete Imagine.Art canvas — every node, every connection, every export — built
            end-to-end without you wiring a single edge.
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginTop: 6, paddingTop: 14,
            borderTop: `1px solid ${T.hair}`,
            fontSize: 12, color: T.fg2,
            flexWrap: 'wrap',
          }}>
            <span><strong style={{ color: T.fg, fontWeight: 600 }}>{example.stats.minutes} min</strong> end-to-end</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span><strong style={{ color: T.fg, fontWeight: 600 }}>{example.stats.subagents} sub-agents</strong></span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span><strong style={{ color: T.fg, fontWeight: 600 }}>0 manual edits</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Section ---------- */
const SentenceNetwork = () => {
  const [idx, setIdx] = useStateSN(0);
  const T = window.T;
  const SectionHead = window.SectionHead;

  useEffectSN(() => {
    const t = setTimeout(() => setIdx((idx + 1) % SN_EXAMPLES.length), 8000);
    return () => clearTimeout(t);
  }, [idx]);

  const ex = SN_EXAMPLES[idx];

  return (
    <div style={{ marginTop: 64 }}>
      <SectionHead
        eyebrow="What it does"
        title="One sentence. The whole canvas."
        sub="Each of these is a real Imagine.Art canvas — built end-to-end from the brief on the left."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16 }}>
        <SentenceCard example={ex} idx={idx} total={SN_EXAMPLES.length}/>
        <CanvasPanel example={ex}/>
      </div>

      {/* Labeled tabs */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 0, marginTop: 22,
        borderBottom: `1px solid ${T.hair}`,
      }}>
        {SN_EXAMPLES.map((e, i) => {
          const isActive = i === idx;
          return (
            <button key={e.id} onClick={() => setIdx(i)} style={{
              padding: '12px 22px', marginBottom: -1,
              background: 'transparent', border: 0, cursor: 'pointer',
              color: isActive ? T.fg : T.fg2,
              fontSize: 12.5, fontWeight: isActive ? 600 : 500,
              borderBottom: `2px solid ${isActive ? T.fg : 'transparent'}`,
              transition: 'all 200ms',
              letterSpacing: '-0.005em',
            }}>{e.label}</button>
          );
        })}
      </div>
    </div>
  );
};

window.SentenceNetwork = SentenceNetwork;
window.WorkflowGallery = SentenceNetwork;
