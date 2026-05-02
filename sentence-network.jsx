/* global React */
const { useState: useStateSN, useEffect: useEffectSN, useRef: useRefSN } = React;

/* =========================================================
   "What it does" — a single real Imagine.Art canvas paired
   with the brief that generated it. The whole point of this
   section is one wow: one sentence → this canvas.
========================================================= */

const SN_WORKFLOW = {
  id: 'rabbit',
  label: 'Rabbit headphones · vertical campaign',
  sentence: 'Cinematic product story for our rabbit headphones. Pink chrome, kawaii character, vertical-first.',
  stats: { nodes: 9, edges: 14, minutes: 11, subagents: 4 },
  file: 'assets/workflow-rabbit.png',
  flowUrl: 'https://www.imagine.art/flow/ebdc3fd5-1825-4cd9-b78a-530c9ef36922',
};

/* ---------- Count-up hook (animates a number from 0 → end) ---------- */
const useCountUp = (end, opts) => {
  const { duration = 1400, delay = 0, start = false } = opts || {};
  const [val, setVal] = useStateSN(0);
  useEffectSN(() => {
    if (!start) return;
    let raf;
    let t0 = null;
    const startMs = performance.now() + delay;
    const tick = (t) => {
      if (t < startMs) { raf = requestAnimationFrame(tick); return; }
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, delay, start]);
  return val;
};

/* ---------- Sentence card (left) — word-stagger on the brief ---------- */
const StaggeredSentence = ({ text, visible }) => {
  const words = text.split(/(\s+)/); // keep whitespace tokens
  return (
    <>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(8px)',
              animation: visible
                ? `revealUp 520ms cubic-bezier(0.16,1,0.3,1) ${i * 18}ms forwards`
                : 'none',
            }}
          >{w}</span>
        );
      })}
    </>
  );
};

const SentenceCard = ({ workflow, revealed }) => {
  const T = window.T;
  const minutes = useCountUp(workflow.stats.minutes, { duration: 900, delay: 200, start: revealed });
  const subagents = useCountUp(workflow.stats.subagents, { duration: 700, delay: 360, start: revealed });

  return (
    <div style={{
      position: 'relative', borderRadius: 17, padding: 1,
      background: 'linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(167,123,254,0.30) 50%, rgba(255,255,255,0.06) 100%)',
      backgroundSize: '220% 100%',
      animation: 'borderDrift 9s ease-in-out infinite',
    }}>
      <div style={{
        position: 'relative', padding: '32px 30px', borderRadius: 16,
        background: T.elev,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
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
            The brief
          </div>
          <div style={{
            fontSize: 28, lineHeight: 1.32, fontWeight: 500,
            letterSpacing: '-0.012em', color: T.fg,
            fontFamily: "'Lora', 'Iowan Old Style', Georgia, serif",
          }}>
            <span style={{
              fontSize: 50, lineHeight: 0,
              verticalAlign: '-0.18em', marginRight: 4,
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #A57BFE 0%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>“</span>
            <StaggeredSentence text={workflow.sentence} visible={revealed}/>
            <span style={{
              fontSize: 50, lineHeight: 0,
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
            <span><strong style={{ color: T.fg, fontWeight: 600 }}>{minutes} min</strong> end-to-end</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span><strong style={{ color: T.fg, fontWeight: 600 }}>{subagents} sub-agents</strong></span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span><strong style={{ color: T.fg, fontWeight: 600 }}>0 manual edits</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Canvas panel (right) — live-time build of the screenshot ---------- */
const BUILD_DURATION = 3400;     // total canvas-build animation
const BUILD_DELAY    = 400;      // wait briefly after the section reveals before starting
const POST_BUILD_GAP = 200;      // small grace period before "Ready" + chrome glints

const CanvasPanel = ({ workflow, revealed }) => {
  const T = window.T;
  const Icon = window.Icon;
  const [built, setBuilt] = useStateSN(false);

  /* Numbers tick during build, finish around the same time it does */
  const nodes   = useCountUp(workflow.stats.nodes,   { duration: 1800, delay: BUILD_DELAY + 600,  start: revealed });
  const edges   = useCountUp(workflow.stats.edges,   { duration: 2200, delay: BUILD_DELAY + 800,  start: revealed });
  const minutes = useCountUp(workflow.stats.minutes, { duration: 1400, delay: BUILD_DELAY + 1400, start: revealed });

  useEffectSN(() => {
    if (!revealed) return;
    const t = setTimeout(() => setBuilt(true), BUILD_DELAY + BUILD_DURATION + POST_BUILD_GAP);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <div style={{
      position: 'relative', borderRadius: 16, overflow: 'hidden',
      background: '#0A0A0A', border: `1px solid ${T.hair}`,
      minHeight: 580, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 36, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: `1px solid ${T.hair}`, fontSize: 11, color: T.fg2,
        background: 'rgba(255,255,255,0.02)',
        flexShrink: 0,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: 999,
          background: built ? '#42BE65' : '#FEBC2E',
          boxShadow: built ? '0 0 10px rgba(66,190,101,0.55)' : '0 0 10px rgba(254,188,46,0.55)',
          animation: built ? 'none' : 'dotPulse 1.2s ease-in-out infinite',
          transition: 'background 320ms ease, box-shadow 320ms ease',
        }}/>
        <span style={{ fontWeight: 500, color: T.fg2 }}>
          {built ? 'Imagine.Art canvas — ready' : (
            <span style={{ animation: 'statusBlink 1.6s ease-in-out infinite' }}>
              Building canvas…
            </span>
          )}
        </span>
        <span style={{ flex: 1 }}/>
        <a
          href={workflow.flowUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: T.fg2, textDecoration: 'none',
            fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
            fontSize: 10.5,
            transition: 'color 200ms',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = T.fg}
          onMouseLeave={(e) => e.currentTarget.style.color = T.fg2}
        >
          imagine.art/flow/{workflow.id}
          <Icon name="arrowUpRight" size={11}/>
        </a>
      </div>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', background: '#000' }}>
        {/* Subtle dot grid behind the canvas to match Imagine.Art's editor */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}/>

        {/* Image is clipped to a 0-width strip on the left, then `liveBuild`
            wipes the clip-path open over BUILD_DURATION. Looks like the canvas
            is being rendered live, not pasted in. */}
        <img
          src={workflow.file}
          alt={workflow.label}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center',
            clipPath: 'inset(0 100% 0 0)',
            animation: revealed
              ? `liveBuild ${BUILD_DURATION}ms cubic-bezier(0.7, 0, 0.3, 1) ${BUILD_DELAY}ms forwards`
              : 'none',
          }}
        />

        {/* Vertical scan line — travels along the wipe leading edge */}
        {revealed && (
          <div aria-hidden style={{
            position: 'absolute', top: 0, bottom: 0,
            width: 2, left: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(167,123,254,0.85) 50%, transparent 100%)',
            boxShadow: '0 0 28px 4px rgba(167,123,254,0.50), 0 0 14px 2px rgba(255,255,255,0.18)',
            pointerEvents: 'none', zIndex: 2,
            animation: `liveScan ${BUILD_DURATION}ms cubic-bezier(0.7, 0, 0.3, 1) ${BUILD_DELAY}ms forwards`,
          }}/>
        )}

        {/* Subtle inner vignette so stats pill reads cleanly */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)',
          pointerEvents: 'none',
        }}/>

        {/* Live progress pill in the canvas (bottom-center during build,
            fades out once built) */}
        {revealed && !built && (
          <div style={{
            position: 'absolute', left: '50%', top: 14,
            transform: 'translateX(-50%)',
            padding: '5px 12px', borderRadius: 999,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(167,123,254,0.40)',
            color: '#fff', fontSize: 11, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            letterSpacing: '-0.005em',
            zIndex: 3,
            animation: 'fadeIn 300ms ease-out',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 999, background: '#A57BFE',
              animation: 'dotPulse 1.1s ease-in-out infinite',
            }}/>
            Codex is wiring nodes…
          </div>
        )}

        {/* Stats pill bottom-left — appears when build completes */}
        <div style={{
          position: 'absolute', left: 14, bottom: 14,
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.10)',
          color: '#fff', fontSize: 11, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          letterSpacing: '-0.005em',
          opacity: built ? 1 : 0,
          transform: built ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 480ms ease-out, transform 480ms cubic-bezier(0.16,1,0.3,1)',
        }}>
          <span>{nodes} nodes</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{edges} connections</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{minutes} min</span>
        </div>

        {/* Open-in-imagine.art pill bottom-right — appears when build completes */}
        <a
          href={workflow.flowUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            position: 'absolute', right: 14, bottom: 14,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.94)',
            color: '#171717', fontSize: 11.5, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            textDecoration: 'none',
            letterSpacing: '-0.005em',
            border: '1px solid rgba(0,0,0,0.05)',
            opacity: built ? 1 : 0,
            transform: built ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 480ms ease-out 100ms, transform 480ms cubic-bezier(0.16,1,0.3,1) 100ms',
            pointerEvents: built ? 'auto' : 'none',
          }}
          onMouseEnter={(e) => { if (built) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { if (built) e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Open the live canvas
          <Icon name="arrowUpRight" size={12} color="#171717"/>
        </a>
      </div>
    </div>
  );
};

/* ---------- Section ---------- */
const SentenceNetwork = () => {
  const SectionHead = window.SectionHead;
  const useReveal = window.useReveal;
  const [revRef, revealed] = useReveal();

  return (
    <div ref={revRef} style={{ marginTop: 64 }}>
      <SectionHead
        eyebrow="What it does"
        title="One sentence. The whole canvas."
        sub="Below is a real Imagine.Art canvas — built end-to-end from the brief on the left. Click the canvas to open the live workflow."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16 }}>
        <SentenceCard workflow={SN_WORKFLOW} revealed={revealed}/>
        <CanvasPanel workflow={SN_WORKFLOW} revealed={revealed}/>
      </div>
    </div>
  );
};

window.SentenceNetwork = SentenceNetwork;
window.WorkflowGallery = SentenceNetwork;
