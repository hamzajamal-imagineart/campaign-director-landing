/* global React */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;
/* T, Icon, SectionHead are on window; TILE_IMAGES too */

/* =========================================================
   Showcase marquee — two rows of mixed-shape tiles with
   format-tag chips, scrolling in opposite directions.
========================================================= */

const ROW_HEIGHT = 220;
const SHAPE_W = { portrait: 124, square: 220, landscape: 360 };

const MarqueeTile = ({ tile }) => {
  const w = SHAPE_W[tile.shape];
  const [hover, setHover] = useStateS(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        width: w, height: ROW_HEIGHT, flexShrink: 0,
        position: 'relative',
        borderRadius: 14, overflow: 'hidden',
        border: hover ? '1px solid rgba(167,123,254,0.45)' : '1px solid rgba(255,255,255,0.08)',
        backgroundImage: `url(${tile.src})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        boxShadow: hover
          ? '0 18px 40px rgba(0,0,0,0.5), 0 0 28px rgba(138,63,252,0.18)'
          : '0 12px 30px rgba(0,0,0,0.4)',
        transform: hover ? 'scale(1.03)' : 'scale(1)',
        filter: hover ? 'brightness(1.08)' : 'brightness(1)',
        transition: 'transform 320ms cubic-bezier(0.16,1,0.3,1), filter 240ms, box-shadow 240ms, border-color 240ms',
      }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.55) 100%)',
      }}/>
      <div style={{
        position: 'absolute', top: 10, left: 10,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 9px', borderRadius: 999,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.10)',
        color: '#fff', fontSize: 10, fontWeight: 600,
        letterSpacing: '0.02em',
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: 999,
          background: tile.shape === 'portrait' ? '#FF85DD' : tile.shape === 'square' ? '#FEBC2E' : '#42BE65',
        }}/>
        {tile.chip}
      </div>
    </div>
  );
};

const Marquee = ({ tiles, speed = 80, reverse = false }) => {
  const [paused, setPaused] = useStateS(false);
  return (
    <div
      onMouseEnter={()=>setPaused(true)}
      onMouseLeave={()=>setPaused(false)}
      style={{
        position: 'relative', overflow: 'hidden', maskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div style={{
        display: 'flex', gap: 14, width: 'max-content', alignItems: 'center',
        animation: `${reverse ? 'marqueeRight' : 'marqueeLeft'} ${speed}s linear infinite`,
        animationPlayState: paused ? 'paused' : 'running',
      }}>
        {[...tiles, ...tiles].map((tile, i) => (
          <MarqueeTile key={i} tile={tile}/>
        ))}
      </div>
    </div>
  );
};

const PHOTO = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=85`;

/* Curated mix biased toward UGC reels, cyber/cinematic product, fashion film,
   and beauty editorial — looks like Imagine.Art generations, not stock. */
const ROW_A_TILES = [
  { src: PHOTO('1488161628813-04466f872be2', 540), shape: 'portrait',  chip: '9:16 · UGC reel' },
  { src: PHOTO('1551782450-a2132b4ba21d', 540), shape: 'square',    chip: '1:1 · Pink hero' },
  { src: PHOTO('1493612276216-ee3925520721', 720), shape: 'landscape', chip: '16:9 · Cinematic cut' },
  { src: PHOTO('1573496359142-b8d87734a5a2', 540), shape: 'portrait',  chip: '9:16 · Beauty UGC' },
  { src: PHOTO('1604644401890-0bd678c83788', 540), shape: 'square',    chip: '1:1 · Beauty hero' },
  { src: PHOTO('1469854523086-cc02fe5d8800', 720), shape: 'landscape', chip: '16:9 · Auto film' },
  { src: PHOTO('1517649763962-0c623066013b', 540), shape: 'portrait',  chip: '9:16 · Sport story' },
  { src: PHOTO('1542291026-7eec264c27ff', 540), shape: 'square',    chip: '1:1 · Product hero' },
  { src: PHOTO('1535930891776-0c2dfb7fda1a', 720), shape: 'landscape', chip: '16:9 · Mood cut' },
  { src: PHOTO('1503342217505-b0a15ec3261c', 540), shape: 'portrait',  chip: '9:16 · UGC try-on' },
  { src: PHOTO('1559496417-e7f25cb247f3', 540), shape: 'square',    chip: '1:1 · Brand template' },
  { src: PHOTO('1483985988355-763728e1935b', 720), shape: 'landscape', chip: '16:9 · Food cinema' },
];

const ROW_B_TILES = [
  { src: PHOTO('1486718448742-163732cd1544', 720), shape: 'landscape', chip: '16:9 · Architectural' },
  { src: PHOTO('1539109136881-3be0616acf4b', 540), shape: 'portrait',  chip: '9:16 · Editorial UGC' },
  { src: PHOTO('1622483767028-3f66f32aef97', 540), shape: 'square',    chip: '1:1 · Cold brew' },
  { src: PHOTO('1604017011826-d3b4c23f8914', 720), shape: 'landscape', chip: '16:9 · Moody product' },
  { src: PHOTO('1490481651871-ab68de25d43d', 540), shape: 'portrait',  chip: '9:16 · Fashion story' },
  { src: PHOTO('1561948955-570b270e7c36', 540), shape: 'square',    chip: '1:1 · Detail hero' },
  { src: PHOTO('1492707892479-7bc8d5a4ee93', 720), shape: 'landscape', chip: '16:9 · Geometry' },
  { src: PHOTO('1517677208171-0bc6725a3e60', 540), shape: 'portrait',  chip: '9:16 · Dark portrait' },
  { src: PHOTO('1502672260266-1c1ef2d93688', 540), shape: 'square',    chip: '1:1 · Interior brand' },
  { src: PHOTO('1469334031218-e382a71b716b', 720), shape: 'landscape', chip: '16:9 · Editorial film' },
  { src: PHOTO('1530736559799-3f7e7d23fcef', 540), shape: 'portrait',  chip: '9:16 · Product reel' },
  { src: PHOTO('1504593811423-6dd665756598', 720), shape: 'landscape', chip: '16:9 · Beverage cinema' },
];

const P = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

const COLS = [
  [
    { src: P('1488161628813-04466f872be2', 700), ratio: '3/4',  label: 'UGC · 9:16' },
    { src: P('1551782450-a2132b4ba21d',   700), ratio: '1/1',  label: 'Brand · 1:1' },
    { src: P('1469854523086-cc02fe5d8800', 700), ratio: '16/9', label: 'Film · 16:9' },
  ],
  [
    { src: P('1493612276216-ee3925520721', 700), ratio: '16/9', label: 'Cinema · 16:9' },
    { src: P('1573496359142-b8d87734a5a2', 700), ratio: '3/4',  label: 'Beauty · 9:16' },
    { src: P('1604644401890-0bd678c83788', 700), ratio: '1/1',  label: 'Hero · 1:1' },
  ],
  [
    { src: P('1517649763962-0c623066013b', 700), ratio: '3/4',  label: 'Sport · 9:16' },
    { src: P('1542291026-7eec264c27ff',   700), ratio: '1/1',  label: 'Product · 1:1' },
    { src: P('1539109136881-3be0616acf4b', 700), ratio: '3/4',  label: 'Editorial · 9:16' },
  ],
  [
    { src: P('1490481651871-ab68de25d43d', 700), ratio: '3/4',  label: 'Fashion · 9:16' },
    { src: P('1486718448742-163732cd1544', 700), ratio: '16/9', label: 'Arch · 16:9' },
    { src: P('1530736559799-3f7e7d23fcef', 700), ratio: '3/4',  label: 'Campaign · 9:16' },
  ],
];

const STAGGER = [0, 80, 40, 120];

const ShowcaseCol = ({ images, offset }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: offset }}>
      {images.map((img, i) => (
        <ShowcaseCard key={i} img={img}/>
      ))}
    </div>
  );
};

const ShowcaseCard = ({ img }) => {
  const [hover, setHover] = useStateS(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', borderRadius: 14, overflow: 'hidden',
        aspectRatio: img.ratio,
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <img
        src={img.src}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <span style={{
        position: 'absolute', bottom: 10, left: 10,
        background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(8px)',
        padding: '3px 9px', borderRadius: 999,
        fontSize: 10.5, fontWeight: 600, letterSpacing: '1.4px',
        color: 'rgba(255,255,255,0.82)', textTransform: 'uppercase',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>{img.label}</span>
    </div>
  );
};

const BENTO_CARDS = [
  { src: PHOTO('1490481651871-ab68de25d43d', 800), format: '9:16', label: 'Fashion story',
    gridColumn: '1 / 5', gridRow: '1 / 3' },
  { src: PHOTO('1469854523086-cc02fe5d8800', 900), format: '16:9', label: 'Cinematic cut',
    gridColumn: '5 / 13', gridRow: '1 / 2' },
  { src: PHOTO('1622483767028-3f66f32aef97', 600), format: '1:1', label: 'Brand template',
    gridColumn: '5 / 9', gridRow: '2 / 3' },
  { src: PHOTO('1573496359142-b8d87734a5a2', 600), format: '9:16', label: 'Beauty UGC',
    gridColumn: '9 / 13', gridRow: '2 / 3' },
  { src: PHOTO('1604017011826-d3b4c23f8914', 900), format: '16:9', label: 'Moody product',
    gridColumn: '1 / 6', gridRow: '3 / 4' },
  { src: PHOTO('1517649763962-0c623066013b', 600), format: '9:16', label: 'Sport story',
    gridColumn: '6 / 10', gridRow: '3 / 4' },
  { src: PHOTO('1502672260266-1c1ef2d93688', 600), format: '1:1', label: 'Interior brand',
    gridColumn: '10 / 13', gridRow: '3 / 4' },
];

const BentoCard = ({ card }) => {
  const [hover, setHover] = useStateS(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: card.gridColumn, gridRow: card.gridRow,
        position: 'relative', overflow: 'hidden',
        borderRadius: 14,
        border: `1px solid ${hover ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 350ms',
      }}
    >
      <img
        src={card.src}
        loading="lazy"
        alt={card.label}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          filter: hover ? 'brightness(0.90)' : 'brightness(0.72)',
          transition: 'transform 700ms cubic-bezier(0.16,1,0.3,1), filter 400ms ease',
        }}
      />
      {/* dot grid overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        opacity: hover ? 0.18 : 0,
        transition: 'opacity 500ms ease',
        pointerEvents: 'none',
      }}/>
      {/* bottom gradient for label readability */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.12) 38%, transparent 60%)',
        pointerEvents: 'none',
      }}/>
      {/* stacked corner label */}
      <div style={{
        position: 'absolute', bottom: 16, left: 16,
        display: 'flex', flexDirection: 'column', gap: 3,
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 600, letterSpacing: '1.6px',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)',
        }}>{card.format}</span>
        <span style={{
          fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em',
          color: 'rgba(255,255,255,0.88)',
        }}>{card.label}</span>
      </div>
    </div>
  );
};

const ShowcaseStrip = () => {
  const T = window.T;
  const SectionHead = window.SectionHead;
  const cx = { maxWidth: 1240, margin: '0 auto', padding: '0 clamp(24px, 4vw, 56px)', boxSizing: 'border-box' };

  return (
    <div style={cx}>
      <SectionHead
        eyebrow="Real outputs"
        title="Every format. From one sentence."
        sub="UGC reels, brand templates, cinematic shorts. Every frame from a single natural-English brief."
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: '280px 240px 220px',
        gap: 10,
        paddingBottom: 120,
      }}>
        {BENTO_CARDS.map((card, i) => <BentoCard key={i} card={card}/>)}
      </div>
    </div>
  );
};

/* =========================================================
   Animated stats — count up when scrolled into view
========================================================= */
const useCountUp = (end, { duration = 1800, decimals = 0 } = {}) => {
  const [val, setVal] = useStateS(0);
  const ref = useRefS(null);
  const startedRef = useRefS(false);

  useEffectS(() => {
    if (!ref.current || startedRef.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !startedRef.current) {
        startedRef.current = true;
        let t0 = null;
        const factor = Math.pow(10, decimals);
        const tick = (t) => {
          if (t0 === null) t0 = t;
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(end * factor * eased) / factor);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration, decimals]);

  return [val, ref];
};

const StatCard = ({ end, decimals = 0, prefix = '', suffix = '', label, sub, icon }) => {
  const [val, ref] = useCountUp(end, { decimals });
  const T = window.T;
  const Icon = window.Icon;
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return (
    <div ref={ref} style={{
      flex: 1, padding: '28px 24px', borderRadius: 18,
      background: T.elev,
      border: `1px solid ${T.hair}`,
      display: 'flex', flexDirection: 'column', gap: 8,
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: 999,
        background: 'radial-gradient(closest-side, rgba(138,63,252,0.18), rgba(138,63,252,0))',
        pointerEvents: 'none',
      }}/>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: 'rgba(138,63,252,0.18)',
        color: '#A57BFE',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={15} color="#A57BFE"/>
      </div>
      <div style={{
        fontSize: 44, lineHeight: 1.05, fontWeight: 600,
        letterSpacing: '-0.02em', color: T.fg,
        background: 'linear-gradient(135deg, #fff 0%, #C4A8FF 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {prefix}{display}{suffix}
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 500, color: T.fg }}>{label}</div>
      <div style={{ fontSize: 12, color: T.fg2, lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
};

const Stats = () => {
  const T = window.T;
  return (
    <div style={{ marginTop: 64 }}>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <StatCard
          icon="zap" end={94} suffix="%"
          label="First-run success"
          sub="Codex sub-agents catch bad briefs before any credit is spent."
        />
        <StatCard
          icon="package" end={12} suffix=" min"
          label="Avg. campaign time"
          sub="From sentence to packaged review MP4, including motion clips."
        />
        <StatCard
          icon="layers" end={2400}
          label="Workflows built"
          sub="Real Imagine.Art canvases assembled by the agent. No manual node wiring."
        />
        <StatCard
          icon="shield" end={0} suffix="¢"
          label="Credit waste on audits"
          sub="Audit-only runs review existing workflows without touching generation."
        />
      </div>
    </div>
  );
};

window.ShowcaseStrip = ShowcaseStrip;
window.Stats = Stats;
