/* global React */
const { useState, useEffect, useRef } = React;

/* =========================================================
   Hero — editorial split layout, Awwwards-grade
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
  'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=420&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=420&q=80',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=420&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=420&q=80',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=420&q=80',
  'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=420&q=80',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=420&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=420&q=80',
  'https://images.unsplash.com/photo-1530736559799-3f7e7d23fcef?w=420&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=420&q=80',
  'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=420&q=80',
];
window.TILE_IMAGES = TILE_IMAGES;

/* kept for external references */
window.HeroTileWall = () => null;

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

/* ── Starter prompt block ───────────────────────────────── */
const HeroStarterPrompt = () => {
  const { Icon } = window;
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
      width: '100%', maxWidth: 560,
      borderRadius: 14, overflow: 'hidden',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.09)',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
      animation: 'revealUp 900ms cubic-bezier(0.16,1,0.3,1) 820ms both',
    }}>
      <div style={{
        height: 36, padding: '0 14px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Icon name="terminal" size={12} color="rgba(255,255,255,0.4)"/>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Paste into Codex
        </span>
        <span style={{ flex: 1 }}/>
        <button onClick={onCopy} style={{
          height: 24, padding: '0 12px', borderRadius: 999,
          background: copied ? 'rgba(255,255,255,0.12)' : 'transparent',
          color: copied ? '#fff' : 'rgba(255,255,255,0.45)',
          border: '1px solid rgba(255,255,255,0.10)',
          cursor: 'pointer', fontSize: 10.5, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          transition: 'all 200ms',
          fontFamily: 'inherit',
        }}>
          <Icon name={copied ? 'check' : 'copy'} size={11} color={copied ? '#fff' : 'rgba(255,255,255,0.45)'}/>
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <div style={{
        padding: '18px 20px',
        fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace',
        fontSize: 12.5, lineHeight: '22px', color: 'rgba(255,255,255,0.75)',
      }}>
        Use <span style={{ color: '#fff', fontWeight: 700 }}>@Computer Use / sub-agent swarms</span> and this repo:
        <br/>
        <span style={{
          color: 'rgba(167,123,254,0.85)',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
          textDecorationColor: 'rgba(167,123,254,0.35)',
        }}>
          https://github.com/Vyro-ai/imagine-campaign-director
        </span>
        <br/><br/>
        to create{' '}
        <span key={ideaIdx} style={{
          background: 'rgba(138,63,252,0.18)',
          color: '#C4A8FF',
          padding: '1px 8px', borderRadius: 5,
          border: '1px solid rgba(167,123,254,0.25)',
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
        position: 'relative', overflow: 'hidden',
        height: 42, padding: '0 20px',
        borderRadius: 10,
        background: primary ? '#fff' : 'transparent',
        color: primary ? '#0a0a0a' : 'rgba(255,255,255,0.75)',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.15)',
        fontWeight: 500, fontSize: 13.5,
        cursor: 'pointer', textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 7,
        transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1), background 200ms, color 200ms, border-color 200ms',
        transform: hover ? 'translateY(-1px)' : 'none',
        ...(primary && hover ? { background: '#e8e8e8' } : {}),
        ...(!primary && hover ? { color: '#fff', borderColor: 'rgba(255,255,255,0.35)' } : {}),
        fontFamily: 'inherit',
      }}
    >
      {children}
      {hover && (
        <span aria-hidden style={{
          position: 'absolute', inset: 0,
          background: primary
            ? 'linear-gradient(90deg, transparent 0%, rgba(138,63,252,0.10) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
          animation: 'shimmerSweep 700ms ease-out',
          pointerEvents: 'none',
        }}/>
      )}
    </Tag>
  );
};

/* ── Right visual panel ─────────────────────────────────── */
const PANEL_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=90&auto=format&fit=crop', top: '0%',   height: '52%',  delay: 0 },
  { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=90&auto=format&fit=crop', top: '49%',  height: '28%',  delay: 120 },
  { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=90&auto=format&fit=crop', top: '74%',  height: '30%',  delay: 240 },
];

const HeroRightPanel = () => (
  <div aria-hidden style={{
    position: 'absolute', top: 0, right: 0, bottom: 0,
    width: 'clamp(340px, 44%, 640px)',
    zIndex: 1, overflow: 'hidden',
  }}>
    {/* Image stack */}
    {PANEL_IMAGES.map((img, i) => (
      <div key={i} style={{
        position: 'absolute', left: 0, right: 0,
        top: img.top, height: img.height,
        backgroundImage: `url(${img.src})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        animation: `revealUp 1200ms cubic-bezier(0.16,1,0.3,1) ${img.delay}ms both`,
        filter: 'brightness(0.72) saturate(0.9)',
      }}/>
    ))}
    {/* Thin gaps between image blocks */}
    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: '#080808', zIndex: 2 }}/>
    <div style={{ position: 'absolute', top: '73%', left: 0, right: 0, height: 3, background: '#080808', zIndex: 2 }}/>
    {/* Left-to-right gradient fade — blends into page background */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 3,
      background: 'linear-gradient(90deg, #080808 0%, rgba(8,8,8,0.75) 25%, rgba(8,8,8,0.12) 65%, rgba(8,8,8,0) 100%)',
    }}/>
    {/* Top + bottom fades */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 3,
      background: 'linear-gradient(180deg, #080808 0%, transparent 12%, transparent 85%, #080808 100%)',
    }}/>
    {/* Subtle format labels */}
    {[
      { label: '9:16 · Fashion story', top: '5%', delay: 600 },
      { label: '9:16 · Beauty UGC',    top: '52%', delay: 720 },
      { label: '16:9 · Cinematic cut', top: '76%', delay: 840 },
    ].map((tag, i) => (
      <div key={i} style={{
        position: 'absolute', right: 18, top: tag.top, zIndex: 4,
        padding: '4px 10px', borderRadius: 999,
        background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.10)',
        fontSize: 9.5, fontWeight: 600, letterSpacing: '1.5px',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
        animation: `revealUp 800ms cubic-bezier(0.16,1,0.3,1) ${tag.delay}ms both`,
      }}>
        {tag.label}
      </div>
    ))}
  </div>
);

/* ── Line-by-line stagger reveal ────────────────────────── */
const HeroLine = ({ children, delay, style = {} }) => (
  <div style={{
    overflow: 'hidden',
    display: 'block',
  }}>
    <div style={{
      animation: `revealUp 1000ms cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
      ...style,
    }}>
      {children}
    </div>
  </div>
);

/* ── Hero ───────────────────────────────────────────────── */
const Hero = ({ headline = 'Direct your campaign.', accent = 'Codex does the rest.' }) => {
  const { Icon } = window;

  const headlineLines = headline.includes('\n')
    ? headline.split('\n')
    : headline.length > 22
      ? [headline.slice(0, headline.lastIndexOf(' ', 22)), headline.slice(headline.lastIndexOf(' ', 22) + 1)]
      : [headline];

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
      background: '#080808',
      isolation: 'isolate',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>

      {/* Film grain */}
      <svg aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        width: '100%', height: '100%', pointerEvents: 'none',
        opacity: 0.055, mixBlendMode: 'overlay',
      }}>
        <filter id="hGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#hGrain)"/>
      </svg>

      {/* Subtle bottom-left glow */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-20%', left: '-10%',
        width: 600, height: 600, borderRadius: 999, zIndex: 1,
        background: 'radial-gradient(circle, rgba(138,63,252,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(60px)',
      }}/>

      {/* Right image panel */}
      <HeroRightPanel/>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1240, margin: '0 auto',
        padding: '140px clamp(24px, 4vw, 56px) 100px',
        width: '100%', boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: 640 }}>

          {/* Eyebrow */}
          <HeroLine delay={0}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: 36,
            }}>
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.3)' }}/>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
              }}>
                Campaign Director · Powered by Codex
              </span>
            </div>
          </HeroLine>

          {/* Headline lines */}
          {headlineLines.map((line, i) => (
            <HeroLine key={i} delay={80 + i * 120}>
              <h1 style={{
                margin: 0,
                fontSize: 'clamp(52px, 7vw, 96px)',
                lineHeight: 1.0,
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: '#fff',
                display: 'block',
              }}>
                {line}
              </h1>
            </HeroLine>
          ))}

          {/* Accent line */}
          <HeroLine delay={80 + headlineLines.length * 120 + 40}>
            <div style={{
              fontSize: 'clamp(52px, 7vw, 96px)',
              lineHeight: 1.0,
              fontWeight: 600,
              letterSpacing: '-0.035em',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, #C4A8FF 60%, #A57BFE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
              marginBottom: 36,
            }}>
              {accent}
            </div>
          </HeroLine>

          {/* Subtext */}
          <HeroLine delay={420}>
            <p style={{
              margin: '0 0 36px',
              fontSize: 17, lineHeight: 1.7, fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 480,
            }}>
              Turn one sentence into a finished Imagine.Art campaign.
              Sub-agent swarms plan, generate, review, and package the run.
            </p>
          </HeroLine>

          {/* CTAs */}
          <HeroLine delay={500}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
              <HeroCTA href="https://github.com/Vyro-ai/imagine-campaign-director" primary>
                <Icon name="github" size={14} color="#0a0a0a"/>
                View on GitHub
              </HeroCTA>
              <HeroCTA onClick={() => document.getElementById('walkthrough')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                <Icon name="play" size={13} color="rgba(255,255,255,0.75)"/>
                Watch demo
              </HeroCTA>
            </div>
          </HeroLine>

          {/* Prompt block */}
          <HeroStarterPrompt/>

          {/* Trust strip */}
          <div style={{
            marginTop: 28,
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
            animation: 'revealUp 800ms cubic-bezier(0.16,1,0.3,1) 960ms both',
          }}>
            {[
              { icon: 'terminal', text: 'Codex with Computer Use' },
              { icon: 'github',   text: 'Vyro-ai/imagine-campaign-director' },
              { icon: 'shield',   text: 'No credits spent on planning' },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.18)', flexShrink: 0 }}/>}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 11.5, color: 'rgba(255,255,255,0.35)', fontWeight: 500,
                }}>
                  <Icon name={item.icon} size={12} color="rgba(255,255,255,0.35)"/>
                  {item.text}
                </span>
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        animation: 'revealUp 800ms cubic-bezier(0.16,1,0.3,1) 1100ms both',
      }}>
        <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 36, background: 'linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0))',
        }}/>
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
