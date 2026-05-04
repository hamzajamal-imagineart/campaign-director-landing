/* global React */
const { useState: useStateEW, useEffect: useEffectEW, useRef: useRefEW } = React;

/* =========================================================
   Explore Our Workflows — auto-scrolling marquee
   Self-contained: overflow clipped internally, no page side-effects.
========================================================= */

const EW_CDN = 'https://cdn-imagine.vyro.ai/imagine-frontend/assets/images/workflow';

const EW_TITLES = [
  'Lora - Rotate',
  'Wan Lora - Rotate',
  'ControlNet - Pose',
  'Inpaint - Refine',
  'Upscale - Enhance',
  'Img2Img - Transform',
  'LoRA - Style Transfer',
  'Depth - Composite',
];

const EW_ITEMS = Array.from({ length: 5 }, (_, i) => ({
  url: `${EW_CDN}/ex-${i + 1}.png`,
  title: EW_TITLES[i % EW_TITLES.length],
}));

const CARD_W  = 298;
const CARD_H  = 376;
const CARD_GAP = 16;
/* Two copies → animate translateX(0) to translateX(-50%) for a seamless loop */
const EW_ITEMS_2X = [...EW_ITEMS, ...EW_ITEMS];
const LOOP_DURATION = (EW_ITEMS.length * (CARD_W + CARD_GAP)) / 40; // 40 px/s

const EwCard = ({ item, index }) => {
  const [hover, setHover] = useStateEW(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => window.open('https://www.imagine.art/image', '_blank')}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open('https://www.imagine.art/image', '_blank');
        }
      }}
      style={{
        flexShrink: 0,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.80) 100%), url(${item.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 300ms ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 12,
        boxSizing: 'border-box',
      }}
    >
      <span style={{
        fontSize: 16, fontWeight: 500, color: '#fff',
        lineHeight: 1.3, letterSpacing: '-0.01em',
      }}>
        {EW_TITLES[index % EW_TITLES.length]}
      </span>
      <a
        href="https://www.imagine.art/flow"
        target="_blank"
        rel="noopener"
        onClick={(e) => e.stopPropagation()}
        style={{
          alignSelf: 'flex-start',
          padding: '10px 12px',
          borderRadius: 12,
          background: 'rgba(0,0,0,0.40)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
          textDecoration: 'none',
          lineHeight: 1,
        }}
      >
        Try Now
      </a>
    </div>
  );
};

const ExploreWorkflowsMarquee = ({ headingHidden = false }) => {
  const [paused, setPaused] = useStateEW(false);

  return (
    <div>
      {/* Section heading — hidden when used inside another section */}
      {!headingHidden && (
        <div style={{
          textAlign: 'center',
          padding: '0 clamp(16px, 6vw, 120px)',
          marginBottom: 48,
        }}>
          <h2 style={{
            margin: '0 auto',
            maxWidth: 780,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: '#fff',
          }}>
            Explore Our Workflows
          </h2>
          <p style={{
            margin: '14px auto 0',
            maxWidth: 600,
            fontSize: 16,
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.55)',
          }}>
            From multi-layer compositing to matte manipulation, ImagineArt keeps up
            with your creativity with all the editing tools you frequently use and rely on.
          </p>
        </div>
      )}

      {/*
        Clip boundary: this div is a normal block element (100% wide).
        overflow:hidden clips the track that extends beyond it.
        No width additions, no padding — zero horizontal bleed risk.
      */}
      <div
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{
          display: 'flex',
          gap: CARD_GAP,
          padding: `16px ${CARD_GAP}px 16px 0`,
          /* width:max-content extends beyond parent but is clipped above */
          width: 'max-content',
          animation: `ewScroll ${LOOP_DURATION}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}>
          {EW_ITEMS_2X.map((item, i) => (
            <EwCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ewScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

window.ExploreWorkflowsMarquee = ExploreWorkflowsMarquee;
