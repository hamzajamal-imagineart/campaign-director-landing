/* global React */
const { useState, useEffect, useRef } = React;
const { T, Icon } = window;

/* =========================================================
   Curated pool of campaign-aesthetic imagery
========================================================= */
const TILE_IMAGES = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=420&q=80',
  'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=420&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=420&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=420&q=80',
  'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=420&q=80',
  'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=420&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=420&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=420&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=420&q=80',
  'https://images.unsplash.com/photo-1502720433255-614171a1835e?w=420&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=420&q=80',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=420&q=80',
  'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=420&q=80',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=420&q=80',
  'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=420&q=80',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=420&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=420&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=420&q=80',
  'https://images.unsplash.com/photo-1530736559799-3f7e7d23fcef?w=420&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=420&q=80',
  'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=420&q=80',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=420&q=80',
  'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=420&q=80',
  'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=420&q=80',
];
window.TILE_IMAGES = TILE_IMAGES;

/* =========================================================
   Tile wall — fixed grid, each tile slowly ken-burns
   and a few cells crossfade between two images
========================================================= */
const HeroTileWall = () => {
  const cols = 6, rows = 4;
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const img = TILE_IMAGES[i % TILE_IMAGES.length];
      const altImg = TILE_IMAGES[(i + 7) % TILE_IMAGES.length];
      const swapping = (i % 5 === 2);
      tiles.push({ r, c, img, altImg, swapping, delay: (i % 7) * 0.6, dur: 14 + (i % 5) });
    }
  }
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: '-3%', display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: 8, padding: 8, opacity: 0.28,
      filter: 'grayscale(0.55) brightness(0.65)',
    }}>
      {tiles.map((t, i) => (
        <div key={i} style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 14,
          background: '#0F0F0F',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${t.img})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            animation: `kenBurns ${t.dur}s ease-in-out ${t.delay}s infinite alternate${t.swapping ? `, tileFade 9s ease-in-out ${t.delay}s infinite` : ''}`,
          }}/>
          {t.swapping && (
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${t.altImg})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              animation: `kenBurns ${t.dur}s ease-in-out ${t.delay}s infinite alternate, tileFadeAlt 9s ease-in-out ${t.delay}s infinite`,
            }}/>
          )}
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   Floating result card — corner ornaments
========================================================= */
const FloatingResultCard = ({ x, y, image, title, sub, status, statusColor, delay = 0, rotate = 0 }) => (
  <div style={{
    position: 'absolute', ...positionFromXY(x, y),
    width: 220, padding: 10, borderRadius: 14,
    background: 'rgba(20,15,35,0.78)', backdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
    transform: `rotate(${rotate}deg)`,
    animation: `float 6s ease-in-out ${delay}s infinite`,
    zIndex: 3,
  }}>
    <div style={{
      height: 120, borderRadius: 9, overflow: 'hidden',
      backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center',
      marginBottom: 10,
    }}/>
    <div style={{ fontSize: 12.5, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{title}</div>
    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{sub}</div>
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 10.5, fontWeight: 600, color: statusColor,
      padding: '3px 8px', borderRadius: 999,
      background: `${statusColor}22`, border: `1px solid ${statusColor}55`,
      letterSpacing: '0.04em', textTransform: 'uppercase',
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: 999, background: statusColor,
      }}/>
      {status}
    </div>
  </div>
);

const positionFromXY = (x, y) => {
  const out = {};
  if (x.startsWith('L')) out.left = x.slice(1) + 'px';
  else                   out.right = x.slice(1) + 'px';
  if (y.startsWith('T')) out.top = y.slice(1) + 'px';
  else                   out.bottom = y.slice(1) + 'px';
  return out;
};

/* =========================================================
   The real starter prompt — the artifact users copy.
   Sentence is static; the <your idea here> placeholder cycles.
========================================================= */
const HERO_IDEAS = [
  'a 15-second vertical launch ad for cold brew',
  'a brand identity kit for a coffee roaster',
  'a 30-second luxury fashion film',
  'an audit of my existing workflow',
];

const STARTER_PROMPT_TEXT = `Use @Computer Use / sub-agent swarms and this repo:
https://github.com/Vyro-ai/imagine-campaign-director

to create <your idea here>`;

const HeroStarterPrompt = () => {
  const [ideaIdx, setIdeaIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIdeaIdx((ideaIdx + 1) % HERO_IDEAS.length), 3500);
    return () => clearTimeout(t);
  }, [ideaIdx]);

  const onCopy = () => {
    (window.copyText || ((t) => navigator.clipboard?.writeText(t)))(STARTER_PROMPT_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{
      width: '100%', maxWidth: 720,
      borderRadius: 18, overflow: 'hidden',
      background: 'rgba(20,15,35,0.72)', backdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.12), 0 0 0 6px rgba(138,63,252,0.06), 0 0 32px rgba(138,63,252,0.10)',
    }}>
      <div style={{
        height: 38, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Icon name="terminal" size={13} color="rgba(255,255,255,0.65)"/>
        <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Paste into Codex</span>
        <span style={{ flex: 1 }}/>
        <button onClick={onCopy} style={{
          height: 28, padding: '0 14px', borderRadius: 999,
          background: copied ? '#fff' : 'rgba(255,255,255,0.10)',
          color: copied ? '#171717' : '#fff',
          border: copied ? 0 : '1px solid rgba(255,255,255,0.14)',
          cursor: 'pointer', fontSize: 11.5, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          transition: 'all 200ms',
        }}>
          {copied
            ? <Icon name="check" size={13} color="#171717"/>
            : <Icon name="copy" size={13} color="#fff"/>}
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <div style={{
        padding: '22px 24px', textAlign: 'left',
        fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace',
        fontSize: 14, lineHeight: '24px', color: '#fff',
      }}>
        Use <span style={{ fontWeight: 700 }}>@Computer Use / sub-agent swarms</span> and this repo:
        <br/>
        <span style={{
          color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3,
          textDecorationColor: 'rgba(167,123,254,0.5)',
        }}>
          https://github.com/Vyro-ai/imagine-campaign-director
        </span>
        <br/><br/>
        to create{' '}
        <span key={ideaIdx} style={{
          background: 'rgba(138,63,252,0.20)',
          color: '#D8C5FF',
          padding: '2px 9px', borderRadius: 6, fontWeight: 500,
          border: '1px solid rgba(167,123,254,0.30)',
          display: 'inline-block',
          animation: 'fadeIn 600ms ease-out',
        }}>
          {HERO_IDEAS[ideaIdx]}
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   Hero — the new cinematic landing block
========================================================= */
const ShimmerCTA = ({ href, onClick, children, primary = false }) => {
  const [hover, setHover] = useState(false);
  const baseStyle = {
    position: 'relative', overflow: 'hidden',
    height: 44, padding: '0 22px', borderRadius: 999,
    background: primary ? '#fff' : 'rgba(255,255,255,0.08)',
    color: primary ? '#171717' : '#fff',
    border: primary ? 0 : '1px solid rgba(255,255,255,0.18)',
    fontWeight: primary ? 600 : 500, fontSize: 14, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 8,
    textDecoration: 'none',
    backdropFilter: primary ? 'none' : 'blur(8px)',
    boxShadow: primary ? '0 12px 30px rgba(255,255,255,0.10)' : 'none',
    transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1)',
    transform: hover ? 'translateY(-1px)' : 'none',
  };
  const Tag = href ? 'a' : 'button';
  const props = href ? { href, target: '_blank', rel: 'noreferrer' } : { onClick };
  return (
    <Tag {...props} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={baseStyle}>
      {children}
      {hover && (
        <span aria-hidden style={{
          position: 'absolute', top: 0, left: 0, height: '100%', width: '40%',
          background: primary
            ? 'linear-gradient(90deg, transparent, rgba(138,63,252,0.18), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
          animation: 'shimmerSweep 850ms ease-out',
          pointerEvents: 'none',
        }}/>
      )}
    </Tag>
  );
};

const StaggerWords = ({ text, startDelay = 0, style = {} }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span style={{
            display: 'inline-block',
            animation: `revealUp 950ms cubic-bezier(0.16,1,0.3,1) ${startDelay + i * 110}ms both`,
            ...style,
          }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </>
  );
};

const Hero = ({ headline = 'Direct your campaign.', accent = 'Codex builds the workflow.' }) => {
  return (
  <div
    style={{
    position: 'relative', overflow: 'hidden',
    borderRadius: 24,
    minHeight: 720,
    background: '#0A0A0A',
    border: '1px solid rgba(255,255,255,0.06)',
    isolation: 'isolate',
  }}>
    {/* Tile wall background */}
    <HeroTileWall/>

    {/* Aurora drift — very subtle edge accent */}
    <div aria-hidden style={{
      position: 'absolute', inset: '-10% -5%', zIndex: 1, pointerEvents: 'none',
      background: 'linear-gradient(90deg, rgba(138,63,252,0.10) 0%, rgba(255,133,221,0.06) 35%, rgba(255,184,119,0.05) 65%, rgba(138,63,252,0.10) 100%)',
      backgroundSize: '300% 100%',
      mixBlendMode: 'screen',
      filter: 'blur(80px)',
      animation: 'auroraDrift 38s ease-in-out infinite',
      opacity: 0.7,
    }}/>

    {/* Strong center-dark vignette so text reads crisply */}
    <div aria-hidden style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      background: `
        radial-gradient(65% 80% at 50% 48%, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0.60) 50%, rgba(8,8,8,0.10) 100%),
        linear-gradient(180deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.40) 50%, rgba(8,8,8,0.75) 100%)
      `,
    }}/>

    {/* Film grain — subtle SVG noise overlay */}
    <svg aria-hidden style={{
      position: 'absolute', inset: 0, zIndex: 1,
      width: '100%', height: '100%', pointerEvents: 'none',
      opacity: 0.06, mixBlendMode: 'overlay',
    }}>
      <filter id="heroGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#heroGrain)"/>
    </svg>

    {/* Centered content */}
    <div style={{
      position: 'relative', zIndex: 2,
      padding: '120px 60px 100px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    }}>
      {/* Headline */}
      <h1 style={{
        margin: 0, fontSize: 'clamp(42px, 5vw, 64px)', lineHeight: 1.06,
        fontWeight: 600, letterSpacing: '-0.03em', color: '#fff',
        maxWidth: 880,
      }}>
        <StaggerWords text={headline} startDelay={100}/>
        <br/>
        <StaggerWords
          text={accent}
          startDelay={100 + headline.split(' ').length * 100 + 40}
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #C4A8FF 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        />
      </h1>

      <p style={{
        margin: '24px 0 32px', fontSize: 18, lineHeight: 1.7, fontWeight: 400,
        color: 'rgba(255,255,255,0.72)', maxWidth: 580,
      }}>
        Turn one sentence into a finished Imagine.Art campaign.
        Sub-agent swarms plan, generate, review, and package the run. No nodes to wire by hand.
      </p>

      {/* The real starter prompt — copyable */}
      <HeroStarterPrompt/>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginTop: 28 }}>
        <ShimmerCTA href="https://github.com/Vyro-ai/imagine-campaign-director" primary>
          <Icon name="github" size={15} color="#171717"/>
          View on GitHub
        </ShimmerCTA>
        <ShimmerCTA onClick={()=>document.getElementById('walkthrough')?.scrollIntoView({behavior:'smooth', block:'start'})}>
          <Icon name="play" size={13} color="#fff"/>
          Watch 40-second demo
        </ShimmerCTA>
      </div>

      {/* Trust strip */}
      <div style={{
        marginTop: 36, display: 'flex', alignItems: 'center', gap: 22,
        fontSize: 12, color: 'rgba(255,255,255,0.55)', flexWrap: 'wrap', justifyContent: 'center',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="terminal" size={13} color="rgba(255,255,255,0.55)"/>
          Codex with Computer Use
        </span>
        <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.25)' }}/>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="github" size={13} color="rgba(255,255,255,0.55)"/>
          Vyro-ai/imagine-campaign-director
        </span>
        <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.25)' }}/>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="shield" size={13} color="rgba(255,255,255,0.55)"/>
          No credits spent on planning
        </span>
      </div>
    </div>
  </div>
  );
};

/* =========================================================
   Codex requirement callout
========================================================= */
const CodexCallout = () => (
  <div style={{
    marginTop: 18,
    display: 'flex', alignItems: 'flex-start', gap: 14,
    padding: '16px 20px', borderRadius: 14,
    background: T.elev,
    border: `1px solid ${T.hair}`,
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: 10,
      background: T.surfS, color: T.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon name="alert" size={16}/>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 2 }}>
        Currently Codex-only. That's intentional.
      </div>
      <div style={{ fontSize: 12.5, color: T.fg2, lineHeight: 1.55 }}>
        Building real workflow canvases needs reliable browser, clipboard, and download control.
        Codex with Computer Use handles that today; other agents don't yet. You'll need a Codex
        workspace with Computer Use enabled, Google Chrome open, and an Imagine.Art session signed in.
      </div>
    </div>
    <a href="https://developers.openai.com/codex/app/computer-use" target="_blank" rel="noreferrer" style={{
      flexShrink: 0, height: 30, padding: '0 14px', borderRadius: 999,
      background: T.btnDark, color: T.btnDarkFg, border: 0,
      cursor: 'pointer', fontSize: 12, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', gap: 6,
      textDecoration: 'none',
    }}>
      Enable Computer Use
      <Icon name="arrowUpRight" size={13} color={T.btnDarkFg}/>
    </a>
  </div>
);

window.Hero = Hero;
window.CodexCallout = CodexCallout;
window.HeroTileWall = HeroTileWall;
