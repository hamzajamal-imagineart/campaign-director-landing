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

/* ── Scattered particle field — generated once at module load ── */
const SCATTER_PTS = (() => {
  const rng = (() => { let s = 987654321; return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; }; })();
  return Array.from({ length: 780 }, () => ({
    nx:           rng(),                          // normalised x  0..1
    ny:           rng(),                          // normalised y  0..1
    size:         0.3 + rng() * 1.15,
    alpha:        0.06 + rng() * 0.42,
    wanderAngle:  rng() * Math.PI * 2,
    wanderSpeed:  0.06 + rng() * 0.12,           // px/frame
    wanderTurn:   (rng() - 0.5) * 0.022,         // how fast direction rotates
  }));
})();

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
        padding: '22px 24px 26px',
        fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace',
        fontSize: 14, lineHeight: '24px',
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
          background: 'rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.75)',
          padding: '2px 9px', borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.12)',
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

/* ── Bottom notch points — left / right of the arch ────── */
const LEFT_POINTS  = ['Computer Use', 'Sub-agent swarms', 'Parallel execution', 'Auto packaging'];
const RIGHT_POINTS = ['Every format', 'Open source', 'One brief → campaign', 'No manual steps'];

const Dot = () => (
  <span aria-hidden style={{
    display: 'inline-block', width: 2, height: 2, borderRadius: '50%',
    background: 'rgba(255,255,255,0.18)', margin: '0 10px', flexShrink: 0,
  }}/>
);

const HeroNotchPoints = () => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 38, zIndex: 11,
    display: 'flex', alignItems: 'center',
    pointerEvents: 'none',
  }}>
    {/* Left side */}
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center',
      justifyContent: 'flex-end', paddingRight: '2%',
      overflow: 'hidden',
    }}>
      {LEFT_POINTS.map((item, i) => (
        <React.Fragment key={i}>
          <span style={{
            fontSize: 10, color: 'rgba(255,255,255,0.32)', fontWeight: 500,
            letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>{item}</span>
          {i < LEFT_POINTS.length - 1 && <Dot/>}
        </React.Fragment>
      ))}
    </div>
    {/* Arch opening spacer — 27.4% matches x=363→637 in the 1000-unit viewBox */}
    <div style={{ flex: '0 0 27.4%' }}/>
    {/* Right side */}
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center',
      justifyContent: 'flex-start', paddingLeft: '2%',
      overflow: 'hidden',
    }}>
      {RIGHT_POINTS.map((item, i) => (
        <React.Fragment key={i}>
          <span style={{
            fontSize: 10, color: 'rgba(255,255,255,0.32)', fontWeight: 500,
            letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>{item}</span>
          {i < RIGHT_POINTS.length - 1 && <Dot/>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

/* ── Gradient bars background ───────────────────────────── */
const GradientBars = ({
  numBars = 13,
  gradientFrom = 'rgba(100, 100, 115, 0.22)',
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

/* ── Scattered particle field ───────────────────────────── */
const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let raf;

    // Initialise mutable x/y from normalised positions
    let pts = [];
    const init = () => {
      const W = canvas.width  = canvas.offsetWidth;
      const H = canvas.height = canvas.offsetHeight;
      pts = SCATTER_PTS.map(p => ({
        ...p,
        x: p.nx * W,
        y: p.ny * H,
      }));
    };
    init();

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W; canvas.height = H;
        pts.forEach(p => { p.x = p.nx * W; p.y = p.ny * H; });
      }
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Gently rotate wander direction each frame
        p.wanderAngle += p.wanderTurn + (Math.random() - 0.5) * 0.006;
        p.x += Math.cos(p.wanderAngle) * p.wanderSpeed;
        p.y += Math.sin(p.wanderAngle) * p.wanderSpeed * 0.55; // flatten vertically

        // Seamless wrap
        if (p.x < -2)    p.x += W + 4;
        if (p.x > W + 2) p.x -= W + 4;
        if (p.y < -2)    p.y += H + 4;
        if (p.y > H + 2) p.y -= H + 4;

        // Crisp dot — no blur, no glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha.toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      pts.forEach(p => { p.x = p.nx * W; p.y = p.ny * H; });
    });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, display: 'block',
    }}/>
  );
};

/* ── Expanding notch navbar ─────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

const LEFT_NAV = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Templates',    href: '#templates'    },
  { label: 'Examples',     href: '#examples'     },
];
const RIGHT_NAV = [
  { label: 'FAQ',    href: '#faq'                                              },
  { label: 'GitHub', href: 'https://github.com/Vyro-ai/imagine-campaign-director', external: true },
];

const NotchNav = () => {
  const [scrollY, setScrollY]     = useState(0);
  const [logoHover, setLogoHover] = useState(false);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const TRIGGER = 120;
  const raw = logoHover ? 1 : Math.min(1, scrollY / TRIGGER);
  const p   = ease(raw);

  // Expanded width matches the section containers: maxWidth 1240, padding clamp(24px,4vw,56px)
  const sidePad    = Math.min(56, Math.max(24, window.innerWidth * 0.04));
  const containerW = Math.min(1240, window.innerWidth - sidePad * 2);
  const notchTop   = Math.min(32, Math.max(16, window.innerWidth * 0.025));
  const width      = lerp(140, containerW, p);
  const height     = lerp(36, 58, p);
  const top        = lerp(notchTop, 12, p);
  const br         = lerp(10, 12, p);
  const bgAlpha    = lerp(0, 0.82, p);
  const navAlpha   = Math.max(0, (raw - 0.5) / 0.5);

  const isHoverTrigger = logoHover && scrollY < TRIGGER;
  const tr = isHoverTrigger
    ? 'width 480ms cubic-bezier(0.16,1,0.3,1), height 400ms cubic-bezier(0.16,1,0.3,1), top 400ms cubic-bezier(0.16,1,0.3,1), background 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease'
    : 'none';

  return (
    <div style={{
      position: 'fixed',
      top, left: '50%',
      transform: 'translateX(-50%)',
      width, height,
      zIndex: 200,
      background: `rgba(7,5,13,${bgAlpha})`,
      backdropFilter: raw > 0.05 ? `blur(20px) saturate(180%)` : 'none',
      WebkitBackdropFilter: raw > 0.05 ? `blur(20px) saturate(180%)` : 'none',
      borderRadius: br,
      border: raw > 0.05 ? `1px solid rgba(255,255,255,${lerp(0, 0.10, p)})` : 'none',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
      pointerEvents: raw > 0.5 ? 'auto' : 'none',
      transition: tr,
      willChange: 'width, top',
    }}>
      {/* Left nav links */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'flex-end', gap: 2,
        paddingRight: 36, opacity: navAlpha,
        pointerEvents: navAlpha > 0.8 ? 'auto' : 'none',
      }}>
        {LEFT_NAV.map(l => (
          <a key={l.label} href={l.href} style={{
            padding: '6px 20px', borderRadius: 8,
            fontSize: 15, fontWeight: 400,
            color: 'rgba(255,255,255,0.65)',
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>{l.label}</a>
        ))}
      </div>

      {/* Logo — centered, hover triggers expand */}
      <div
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
        style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 44, height: 44, cursor: 'pointer',
        }}>
        <img src="assets/logo-icon.svg" width={28} height={28}
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }}
          alt="ImagineArt"/>
      </div>

      {/* Right nav links + CTA */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'flex-start', gap: 2,
        paddingLeft: 36, opacity: navAlpha,
        pointerEvents: navAlpha > 0.8 ? 'auto' : 'none',
      }}>
        {RIGHT_NAV.map(l => (
          <a key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})} style={{
            padding: '6px 20px', borderRadius: 8,
            fontSize: 15, fontWeight: 400,
            color: 'rgba(255,255,255,0.65)',
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>{l.label}</a>
        ))}
        <a href="https://cal.com/imagine-art/campaign-director"
          target="_blank" rel="noreferrer"
          style={{
            marginLeft: 12, height: 34, padding: '0 20px', borderRadius: 999,
            background: '#fff', color: '#0a0a0a',
            fontSize: 14, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center',
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
          Book a demo
        </a>
      </div>
    </div>
  );
};

/* ── Hero ───────────────────────────────────────────────── */
const Hero = ({ headline = 'Direct your campaign.', accent = 'Codex does the rest.' }) => {
  const { Icon } = window;
  return (
    <div style={{ background: '#000', padding: `clamp(16px, 2.5vw, 32px) clamp(12px, 2vw, 32px)`, position: 'relative' }}>

      <NotchNav/>

      {/* Static logo in notch at scroll=0 — hidden once NotchNav takes over */}
      <div style={{
        position: 'absolute',
        top: 'calc(clamp(16px, 2.5vw, 32px) + 12px)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <img src="assets/logo-icon.svg" width={30} height={30}
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }}
          alt="ImagineArt"/>
      </div>

      {/* ── Mac frame ── */}
      <div style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #131317 0%, #0f0f13 60%, #0b0b0f 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 0 80px rgba(0,0,0,0.5)',
        minHeight: '90vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        isolation: 'isolate',
      }}>


        {/* ── Top wave notch ── */}
        <svg viewBox="0 0 1000 80" preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 80, zIndex: 10, pointerEvents: 'none', display: 'block' }}>
          <path d="M 0 0 L 437 0 A 11 14 0 0 1 448 14 L 448 24 A 11 14 0 0 0 459 38 L 541 38 A 11 14 0 0 0 552 24 L 552 14 A 11 14 0 0 1 563 0 L 1000 0 Z" fill="#000"/>
        </svg>

        {/* ── Bottom wave notch ── */}
        <svg viewBox="0 0 1000 80" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 80, zIndex: 10, pointerEvents: 'none', display: 'block' }}>
          <path d="M 0 80 L 363 80 A 11 14 0 0 0 374 66 L 374 56 A 11 14 0 0 1 385 42 L 615 42 A 11 14 0 0 1 626 56 L 626 66 A 11 14 0 0 0 637 80 L 1000 80 Z" fill="#000"/>
        </svg>

        <GradientBars/>
        <StarField/>


        {/* ── Content ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 1040,
          padding: '96px clamp(24px, 5vw, 100px) 96px',
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
        }}>

          {/* Headline — display-sm from type scale: max 60px, weight 800 */}
          <div style={{ animation: 'revealUp 1000ms cubic-bezier(0.16,1,0.3,1) 120ms both' }}>
            <h1 style={{
              margin: '0 0 4px',
              fontSize: 'clamp(32px, 4.2vw, 60px)',
              lineHeight: 1.08,
              fontWeight: 400,
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
            margin: '0 0 24px',
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
            justifyContent: 'center', marginBottom: 28,
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
          <div style={{ width: '100%', maxWidth: 780, textAlign: 'left' }}>
            <HeroStarterPrompt/>
          </div>

        </div>

        <HeroNotchPoints/>

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
