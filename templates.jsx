/* global React */
const { useState: useStateTpl, useRef: useRefTpl } = React;

/* =========================================================
   Templates — horizontal auto-scrolling marquee
   9:16 video cards, hover to play + lift
========================================================= */

const TEMPLATES = [
  { id: 'minimal-float',    label: 'Minimal Float',     video: 'assets/examples/ec-template-minimal-float.mp4' },
  { id: 'editorial-clean',  label: 'Editorial Clean',   video: 'assets/examples/ec-template-editorial-clean.mp4' },
  { id: 'studio-dark',      label: 'Studio Dark',       video: 'assets/examples/ec-template-studio-dark.mp4' },
  { id: 'luxury-marble',    label: 'Luxury Marble',     video: 'assets/examples/ec-template-luxury-marble.mp4' },
  { id: 'ambient-glow',     label: 'Ambient Glow',      video: 'assets/examples/ec-template-ambient-glow.mp4' },
  { id: 'bold-color',       label: 'Bold Color',        video: 'assets/examples/ec-template-bold-color.mp4' },
  { id: 'lifestyle-scene',  label: 'Lifestyle Scene',   video: 'assets/examples/ec-template-lifestyle-scene.mp4' },
  { id: 'outdoor-natural',  label: 'Outdoor Natural',   video: 'assets/examples/ec-template-outdoor-natural.mp4' },
  { id: 'bag-color',        label: 'Bag Color',         video: 'assets/examples/ec-template-bag-color.mp4' },
];

const TPL_CARD_W  = 400;
const TPL_CARD_H  = 500;   /* ~4:5 — portrait but less towering */
const TPL_GAP     = 20;

/* Two copies for seamless loop */
const TEMPLATES_2X = [...TEMPLATES, ...TEMPLATES];
/* Speed: 40 px/s */
const TPL_DURATION = (TEMPLATES.length * (TPL_CARD_W + TPL_GAP)) / 40;

const TemplateCard = ({ tpl }) => {
  const [hover, setHover] = useStateTpl(false);
  const videoRef = useRefTpl(null);

  const onEnter = () => setHover(true);
  const onLeave = () => setHover(false);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        flexShrink: 0,
        position: 'relative',
        width: TPL_CARD_W,
        height: TPL_CARD_H,
        borderRadius: 14,
        overflow: 'hidden',
        background: '#111',
        cursor: 'pointer',
        transform: hover ? 'translateY(-6px) scale(1.02)' : 'none',
        transition: 'transform 320ms cubic-bezier(0.16,1,0.3,1), box-shadow 320ms',
        boxShadow: hover ? '0 28px 52px rgba(0,0,0,0.55)' : '0 2px 10px rgba(0,0,0,0.35)',
      }}
    >
      <video
        ref={videoRef}
        src={tpl.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: hover ? 1 : 0.82,
          transition: 'opacity 300ms ease',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.72) 100%)',
        pointerEvents: 'none',
      }}/>

      {/* Label */}
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: 12, fontWeight: 500, color: '#fff',
          letterSpacing: '0.01em',
          opacity: hover ? 1 : 0.75,
          transition: 'opacity 200ms',
        }}>{tpl.label}</span>

        {hover && (
          <span style={{
            fontSize: 10.5, fontWeight: 500,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            animation: 'fadeIn 200ms ease',
          }}>Use →</span>
        )}
      </div>
    </div>
  );
};

const Templates = ({ headingHidden = false }) => {
  const { SectionHead } = window;
  const [paused, setPaused] = useStateTpl(false);

  return (
    <div id="templates">
      {!headingHidden && (
        <SectionHead
          eyebrow="Templates"
          title="Start from a template."
          sub="Nine ready-to-run ecommerce templates. Pick one, swap your product, and Campaign Director handles the rest."
        />
      )}

      {/* Clip boundary */}
      <div
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{
          display: 'flex',
          gap: TPL_GAP,
          padding: `16px ${TPL_GAP}px 16px 0`,
          width: 'max-content',
          animation: `tplScroll ${TPL_DURATION}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}>
          {TEMPLATES_2X.map((tpl, i) => (
            <TemplateCard key={i} tpl={tpl} aria-hidden={i >= TEMPLATES.length}/>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tplScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

window.Templates = Templates;
