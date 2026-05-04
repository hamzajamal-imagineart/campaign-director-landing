/* global React */
const { useState, useEffect } = React;

/* =========================================================
   Hero — Mac frame + starfield aesthetic
========================================================= */

const TILE_IMAGES = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=420&q=80',
  'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=420&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=420&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=420&q=80',
  'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=420&q=80',
];
window.TILE_IMAGES = TILE_IMAGES;
window.HeroTileWall = () => null;

/* Stable star positions — generated once at module load */
const STARS = Array.from({ length: 110 }, (_, i) => {
  const seed = i * 2654435761;
  return {
    x: ((seed * 1234567) % 10000) / 100,
    y: ((seed * 9876543) % 10000) / 100,
    r: i % 7 === 0 ? 1.4 : 0.8,
    o: 0.1 + ((seed % 100) / 100) * 0.45,
  };
});

/* ── Cycling prompt ideas ───────────────────────────────── */
const HERO_IDEAS = [
  'a 15-second vertical launch ad for cold brew',
  'a brand identity kit for a coffee roaster',
  'a 30-second luxury fashion film',
  'an audit of my existing workflow',
];
const STARTER_PROMPT_TEXT = `Use @Computer Use / sub-agent swarms and this repo:
https://github.com/Vyro-ai/imagine-campaign-director

to create <your idea here>`;

/* ── Starter prompt ─────────────────────────────────────── */
const HeroStarterPrompt = () => {
  const { Icon } = window;
  const [ideaIdx, setIdeaIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIdeaIdx((i) => (i + 1) % HERO_IDEAS.length), 3500);
    return () => clearTimeout(t);
  }, [ideaIdx]);

  const onCopy = () => {
    (window.copyText || ((t) => navigator.clipboard?.writeText(t)))(STARTER_PROMPT_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{
      width: '100%',
      borderRadius: 14,
      overflow: 'hidden',
      background: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.10)',
      animation: 'revealUp 900ms cubic-bezier(0.16,1,0.3,1) 700ms both',
    }}>
      <div style={{
        height: 40, padding: '0 16px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <Icon name="terminal" size={12} color="rgba(255,255,255,0.35)"/>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
        }}>Paste into Codex</span>
        <span style={{ flex: 1 }}/>
        <button onClick={onCopy} style={{
          height: 26, padding: '0 12px', borderRadius: 8,
          background: 'transparent',
          color: copied ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)',
          border: '1px solid rgba(255,255,255,0.10)',
          cursor: 'pointer', fontSize: 11, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          transition: 'color 200ms, border-color 200ms',
          fontFamily: 'inherit',
        }}>
          <Icon name={copied ? 'check' : 'copy'} size={11} color={copied ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)'}/>
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <div style={{
        padding: '18px 20px 20px',
        fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace',
        fontSize: 13, lineHeight: '22px',
        color: 'rgba(255,255,255,0.65)',
      }}>
        Use{' '}
        <span style={{ color: '#fff', fontWeight: 700 }}>@Computer Use / sub-agent swarms</span>
        {' '}and this repo:<br/>
        <span style={{
          color: '#A57BFE',
          textDecoration: 'underline',
          textDecorationColor: 'rgba(167,123,254,0.3)',
          textUnderlineOffset: 3,
        }}>
          https://github.com/Vyro-ai/imagine-campaign-director
        </span>
        <br/><br/>
        to create{' '}
        <span key={ideaIdx} style={{
          background: 'rgba(138,63,252,0.16)',
          color: '#C4A8FF',
          padding: '2px 9px', borderRadius: 6,
          border: '1px solid rgba(167,123,254,0.22)',
          display: 'inline-block',
          animation: 'fadeIn 500ms ease-out',
        }}>
          {HERO_IDEAS[ideaIdx]}
        </span>
      </div>
    </div>
  );
};

/* ── CTA button ─────────────────────────────────────────── */
const HeroCTA = ({ href, onClick, children, primary = false }) => {
  const [hover, setHover] = useState(false);
  const Tag = href ? 'a' : 'button';
  const props = href ? { href, target: '_blank', rel: 'noreferrer' } : { onClick };
  return (
    <Tag
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: 44, padding: '0 24px', borderRadius: 999,
        background: primary ? '#fff' : 'rgba(255,255,255,0.07)',
        color: primary ? '#0a0a0a' : 'rgba(255,255,255,0.75)',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.13)',
        fontWeight: 600, fontSize: 14, cursor: 'pointer',
        textDecoration: 'none', fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 7,
        transition: 'transform 200ms ease, background 150ms, color 150ms, box-shadow 150ms',
        transform: hover ? 'translateY(-1px)' : 'none',
        boxShadow: primary && hover ? '0 8px 24px rgba(255,255,255,0.15)' : 'none',
        ...(primary && hover ? { background: '#f0f0f0' } : {}),
        ...(!primary && hover ? { color: '#fff', borderColor: 'rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.10)' } : {}),
      }}
    >
      {children}
    </Tag>
  );
};

/* ── Bottom ticker — scrolls inside the bottom notch ───── */
const TICKER_ITEMS = [
  { icon: 'terminal', text: 'Codex with Computer Use' },
  { icon: 'github',   text: 'Vyro-ai/imagine-campaign-director' },
  { icon: 'shield',   text: 'No credits spent on planning' },
  { icon: 'zap',      text: 'Sub-agent swarms handle execution' },
  { icon: 'layers',   text: 'Every format from one brief' },
  { icon: 'check',    text: 'Plan → Generate → Review → Package' },
  { icon: 'terminal', text: 'Codex with Computer Use' },
  { icon: 'github',   text: 'Vyro-ai/imagine-campaign-director' },
  { icon: 'shield',   text: 'No credits spent on planning' },
  { icon: 'zap',      text: 'Sub-agent swarms handle execution' },
  { icon: 'layers',   text: 'Every format from one brief' },
  { icon: 'check',    text: 'Plan → Generate → Review → Package' },
];

const HeroTicker = () => {
  const { Icon } = window;
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 70, zIndex: 9, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <style>{`
        @keyframes heroTickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{
        display: 'flex', gap: 48, alignItems: 'center',
        width: 'max-content',
        animation: 'heroTickerScroll 22s linear infinite',
      }}>
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500,
            whiteSpace: 'nowrap',
          }}>
            <Icon name={item.icon} size={13} color="rgba(255,255,255,0.40)"/>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── Gradient bars background ───────────────────────────── */
const GradientBars = ({
  numBars = 13,
  gradientFrom = 'rgba(180, 180, 190, 0.18)',
  gradientTo = 'transparent',
  animationDuration = 2.5,
}) => {
  const calcHeight = (i, total) => {
    const pos = i / (total - 1);
    const dist = Math.abs(pos - 0.5);
    return 25 + 75 * Math.pow(dist * 2, 1.2);
  };
  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0%   { transform: scaleY(var(--bar-scale)); }
          100% { transform: scaleY(calc(var(--bar-scale) * 0.65)); }
        }
      `}</style>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0,
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
          {Array.from({ length: numBars }).map((_, i) => {
            const h = calcHeight(i, numBars);
            return (
              <div key={i} style={{
                flex: `1 0 calc(100% / ${numBars})`,
                maxWidth: `calc(100% / ${numBars})`,
                height: '100%',
                background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
                transformOrigin: 'bottom',
                animation: `pulseBar ${animationDuration}s ease-in-out ${i * 0.12}s infinite alternate`,
                '--bar-scale': h / 100,
              }}/>
            );
          })}
        </div>
      </div>
    </>
  );
};

/* ── Starfield ──────────────────────────────────────────── */
const StarField = () => (
  <div aria-hidden style={{
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
  }}>
    {STARS.map((s, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${s.x}%`, top: `${s.y}%`,
        width: s.r * 2, height: s.r * 2,
        borderRadius: '50%',
        background: '#fff',
        opacity: s.o,
      }}/>
    ))}
  </div>
);

/* ── Hero ───────────────────────────────────────────────── */
const Hero = ({ headline = 'Direct your campaign.', accent = 'Codex does the rest.' }) => {
  const { Icon } = window;
  return (
    /* Page-level wrapper: black bg, inset the frame */
    <div style={{ background: '#000', padding: `clamp(16px, 2.5vw, 32px) clamp(12px, 2vw, 32px)`, position: 'relative' }}>

      {/* ── Logo pill — sits on the frame's top edge, outside the frame ── */}
      <div style={{
        position: 'absolute',
        top: 'clamp(16px, 2.5vw, 32px)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 112, height: 46,
        background: '#000',
        borderRadius: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 20,
      }}>
        <img
          src="assets/imagine-logo.svg"
          width={18} height={18}
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.85, display: 'block' }}
          alt="ImagineArt"
        />
      </div>

      {/* ── Mac frame ── */}
      <div style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #1a1c24 0%, #141618 60%, #111214 100%)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 80px rgba(255,255,255,0.04)',
        minHeight: '90vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        isolation: 'isolate',
      }}>

        {/* ── Top wave notch — tight center notch, flat on the sides ── */}
        <svg
          viewBox="0 0 1000 80" preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 80, zIndex: 10, pointerEvents: 'none', display: 'block' }}
        >
          <path d="M 0 0 L 330 0 C 370 0 400 10 428 26 C 450 40 466 58 484 68 C 490 72 494 74 500 74 C 506 74 510 72 516 68 C 534 58 550 40 572 26 C 600 10 630 0 670 0 L 1000 0 Z" fill="#000"/>
        </svg>

        {/* ── Bottom wave notch — wider arch, flat on the sides ── */}
        <svg
          viewBox="0 0 1000 80" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 80, zIndex: 10, pointerEvents: 'none', display: 'block' }}
        >
          <path d="M 0 80 L 260 80 C 310 80 360 72 400 56 C 432 42 456 22 478 10 C 486 6 492 4 500 4 C 508 4 514 6 522 10 C 544 22 568 42 600 56 C 640 72 690 80 740 80 L 1000 80 Z" fill="#000"/>
        </svg>

        <GradientBars/>
        <StarField/>

        {/* Right-side ambient glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '55%', height: '80%',
          background: 'radial-gradient(ellipse 60% 70% at 100% 20%, rgba(50,50,75,0.35) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1,
        }}/>

        {/* Center purple glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '35%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 450,
          background: 'radial-gradient(ellipse, rgba(110,45,210,0.14) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 1,
          filter: 'blur(36px)',
        }}/>

        {/* ── Content ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 1040,
          padding: '96px clamp(24px, 5vw, 100px) 96px',
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
        }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            marginBottom: 36, borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.10)',
            overflow: 'hidden',
            animation: 'revealUp 800ms cubic-bezier(0.16,1,0.3,1) 0ms both',
          }}>
            <span style={{
              padding: '5px 11px',
              background: 'rgba(138,63,252,0.85)',
              color: '#fff',
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.05em',
            }}>NEW</span>
            <span style={{
              padding: '5px 14px',
              fontSize: 12, fontWeight: 500,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.01em',
            }}>Campaign Director · Powered by Codex</span>
          </div>

          {/* Headline — display-sm from type scale: max 60px, weight 800 */}
          <div style={{ animation: 'revealUp 1000ms cubic-bezier(0.16,1,0.3,1) 120ms both' }}>
            <h1 style={{
              margin: '0 0 4px',
              fontSize: 'clamp(32px, 4.2vw, 60px)',
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
            }}>
              {headline}
            </h1>
          </div>

          {/* Accent line — same scale, gradient fill */}
          <div style={{ animation: 'revealUp 1000ms cubic-bezier(0.16,1,0.3,1) 200ms both', marginBottom: 24 }}>
            <div style={{
              fontSize: 'clamp(32px, 4.2vw, 60px)',
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-sans)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, #C4A8FF 50%, #9B6EFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {accent}
            </div>
          </div>

          {/* Sub — body-lg from type scale */}
          <p style={{
            margin: '0 0 40px',
            fontSize: 16, lineHeight: 1.65, fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 480,
            fontFamily: 'var(--font-sans)',
            animation: 'revealUp 900ms cubic-bezier(0.16,1,0.3,1) 300ms both',
          }}>
            Turn one sentence into a finished Imagine.Art campaign.
            Sub-agent swarms plan, generate, review, and package the run.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 12, alignItems: 'center',
            justifyContent: 'center', marginBottom: 56,
            animation: 'revealUp 900ms cubic-bezier(0.16,1,0.3,1) 380ms both',
          }}>
            <HeroCTA href="https://cal.com/imagine-art/campaign-director" primary>
              Book a demo
            </HeroCTA>
            <HeroCTA href="https://github.com/Vyro-ai/imagine-campaign-director">
              Get Started →
            </HeroCTA>
          </div>

          {/* Prompt block */}
          <div style={{ width: '100%', maxWidth: 620 }}>
            <HeroStarterPrompt/>
          </div>

        </div>

        <HeroTicker/>

      </div>
    </div>
  );
};

/* ── CodexCallout ───────────────────────────────────────── */
const CodexCallout = () => {
  const { T, Icon } = window;
  return (
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
          Codex with Computer Use handles that today. You'll need a Codex workspace with Computer
          Use enabled, Google Chrome open, and an Imagine.Art session signed in.
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
};

window.Hero = Hero;
window.CodexCallout = CodexCallout;
window.HeroTileWall = () => null;
