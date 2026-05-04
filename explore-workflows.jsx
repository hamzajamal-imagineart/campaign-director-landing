/* global React */
const { useState: useStateEW, useEffect: useEffectEW, useRef: useRefEW } = React;

/* =========================================================
   Explore Our Workflows — marquee carousel
   Ported from ExploreWorkflowsMarquee.jsx (Next.js → plain React)
========================================================= */

const CDN = 'https://cdn-imagine.vyro.ai/imagine-frontend/assets/images/workflow';

const TITLES = [
  'Lora - Rotate',
  'Wan Lora - Rotate',
  'ControlNet - Pose',
  'Inpaint - Refine',
  'Upscale - Enhance',
  'Img2Img - Transform',
  'LoRA - Style Transfer',
  'Depth - Composite',
];

const ITEMS = Array.from({ length: 5 }, (_, i) => ({
  url: `${CDN}/ex-${i + 1}.png`,
  title: TITLES[i % TITLES.length],
}));

const CARD_W = 298;
const CARD_H = 376;
const CARD_GAP = 16;

const WorkflowCard = ({ item, index }) => {
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
        width: CARD_W, height: CARD_H, flexShrink: 0,
        borderRadius: 16, overflow: 'hidden',
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.80) 100%), url(${item.url})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        cursor: 'pointer',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 300ms ease',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 12, boxSizing: 'border-box',
      }}
    >
      <span style={{
        fontSize: 16, fontWeight: 500, color: '#fff',
        lineHeight: 1.3, letterSpacing: '-0.01em',
      }}>
        {TITLES[index % TITLES.length]}
      </span>
      <a
        href="https://www.imagine.art/flow"
        target="_blank"
        rel="noopener"
        onClick={(e) => e.stopPropagation()}
        style={{
          alignSelf: 'flex-start',
          padding: '10px 12px', borderRadius: 12,
          background: 'rgba(0,0,0,0.40)',
          color: '#fff', fontSize: 14, fontWeight: 500,
          textDecoration: 'none', lineHeight: 1,
        }}
      >
        Try Now
      </a>
    </div>
  );
};

const ExploreWorkflowsMarquee = ({ headingHidden = false }) => {
  const trackRef = useRefEW(null);
  const [copies, setCopies] = useStateEW(4);
  const [paused, setPaused] = useStateEW(false);

  const setWidth = ITEMS.length * (CARD_W + CARD_GAP);
  const speed = 40; // px/sec, matches original
  const duration = setWidth / speed;

  useEffectEW(() => {
    const update = () => {
      if (!trackRef.current) return;
      const vw = trackRef.current.parentElement?.clientWidth || window.innerWidth;
      setCopies(Math.max(2, Math.ceil((2 * vw) / setWidth) + 1));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [setWidth]);

  const allCards = Array.from({ length: copies }, () => ITEMS).flat();

  return (
    <div style={{ padding: '120px 0' }}>
      {/* Heading */}
      {!headingHidden && (
        <div style={{ textAlign: 'center', padding: '0 clamp(16px, 6vw, 120px)', marginBottom: 48 }}>
          <h2 style={{
            margin: '0 auto', maxWidth: 780,
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600,
            letterSpacing: '-0.025em', lineHeight: 1.15,
            color: '#fff',
          }}>
            Explore Our Workflows
          </h2>
          <p style={{
            margin: '14px auto 0', maxWidth: 600,
            fontSize: 16, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.55)',
          }}>
            From multi-layer compositing to matte manipulation, ImagineArt keeps up with your creativity with all the editing tools you frequently use and rely on.
          </p>
        </div>
      )}

      {/* Marquee */}
      <div
        style={{ width: '100%', overflow: 'hidden', minHeight: CARD_H + 32 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: CARD_GAP,
            paddingTop: 16, paddingBottom: 16, paddingRight: CARD_GAP,
            width: 'max-content',
            animation: `ewMarquee ${duration * copies / copies}s linear infinite`,
            animationDuration: `${duration}s`,
            animationPlayState: paused ? 'paused' : 'running',
            /* We animate one full set width */
            ['--loop-w']: setWidth + 'px',
          }}
        >
          {allCards.map((item, i) => (
            <WorkflowCard key={i} item={item} index={i}/>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ewMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * var(--loop-w))); }
        }
      `}</style>
    </div>
  );
};

window.ExploreWorkflowsMarquee = ExploreWorkflowsMarquee;
