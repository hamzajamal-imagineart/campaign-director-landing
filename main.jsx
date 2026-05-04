/* global React, ReactDOM */
const { useState, useEffect } = React;
const { T, Icon, Sidebar, TopBar, HomePage, Hero, CodexCallout, HowItWorks, VideoBlock, Examples, FAQ, FinalCTA, LaunchModal, CampaignTweaks, Reveal } = window;

/* hex → "r g b" triple for CSS var values like "138 63 252" */
const hexToRGB = (hex) => {
  const h = hex.replace('#', '');
  const n = h.length === 3
    ? h.split('').map(c => parseInt(c + c, 16))
    : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  return n.join(' ');
};

/* =========================================================
   "Build your perfect Workflow" hero — the imagine.art Workflows
   page header. Always visible above the tabs row.
========================================================= */
const WorkflowsHero = () => {
  const tiles = [
    { x: 8,   y: 18,  img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&q=80' },
    { x: 120, y: 6,   img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=300&q=80' },
    { x: 232, y: 36,  img: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=300&q=80' },
  ];
  return (
    <div className="dot-grid" style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: 20,
      background: `
        radial-gradient(70% 130% at 20% 20%, rgba(138,63,252,0.35) 0%, rgba(138,63,252,0) 60%),
        linear-gradient(135deg, #1A0F33 0%, #2A1656 55%, #4B1F8E 100%)
      `,
      border: `1px solid rgba(255,255,255,0.06)`,
      padding: '32px 36px',
      display: 'flex', alignItems: 'center', gap: 24,
    }}>
      <div style={{ flex: 1, position: 'relative', maxWidth: 520 }}>
        <h1 style={{
          margin: 0, fontSize: 32, lineHeight: '38px', fontWeight: 700,
          letterSpacing: '-0.005em', color: '#fff',
        }}>
          Build your perfect Workflow
        </h1>
        <p style={{
          margin: '10px 0 22px', fontSize: 13.5, lineHeight: '20px',
          color: 'rgba(255,255,255,0.72)', maxWidth: 440,
        }}>
          Create a node-based workflow that connects tools and models for
          repeatable creative pipelines.
        </p>
        <button style={{
          height: 38, padding: '0 18px', borderRadius: 999,
          background: T.btnDark, color: T.btnDarkFg, border: 0,
          fontWeight: 500, fontSize: 13, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="plus" size={15} color={T.btnDarkFg}/> Create New Workflow
        </button>
      </div>

      <div style={{ flexShrink: 0, position: 'relative', width: 360, height: 180 }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="wf-line" x1="0" x2="1">
              <stop offset="0" stopColor="#FFADE8"/>
              <stop offset="1" stopColor="#8A3FFC"/>
            </linearGradient>
          </defs>
          <path d="M 96 80 C 130 50, 150 28, 180 50" stroke="url(#wf-line)" strokeWidth="1.5" fill="none" strokeDasharray="4 5" strokeLinecap="round"/>
          <path d="M 208 60 C 240 80, 260 100, 290 110" stroke="url(#wf-line)" strokeWidth="1.5" fill="none" strokeDasharray="4 5" strokeLinecap="round"/>
        </svg>
        {tiles.map((t, i) => (
          <div key={i} style={{
            position: 'absolute', left: t.x, top: t.y,
            width: 96, height: 96, borderRadius: 14, overflow: 'hidden',
            border: '1.5px solid rgba(255,255,255,0.18)',
            backgroundImage: `url(${t.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
            boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
          }}/>
        ))}
      </div>
    </div>
  );
};

/* =========================================================
   Page tabs (My Workflows / Discover)
========================================================= */
const Tabs = ({ active, onChange }) => {
  const items = [
    { id: 'mine', label: 'My Workflows' },
    { id: 'discover', label: 'Discover' },
  ];
  return (
    <div style={{
      display: 'inline-flex', gap: 4, padding: 0,
    }}>
      {items.map(it => {
        const isActive = active === it.id;
        return (
          <button key={it.id} onClick={()=>onChange(it.id)} style={{
            height: 32, padding: '0 16px', borderRadius: 999,
            background: isActive ? T.btnDark : 'transparent',
            color: isActive ? T.btnDarkFg : T.fg2,
            border: 0, cursor: 'pointer', fontSize: 12.5, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'all 160ms',
          }}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
};

/* =========================================================
   Recent workflows (kept compact, hidden when on Director tab)
========================================================= */
const RecentWorkflows = () => {
  const items = [
    { name: 'Pink Studio',         author: 'Aisha M',   time: '24 mins ago', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80' },
    { name: 'Mountain mood',       author: 'Shoaib U',  time: '40 mins ago', img: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=400&q=80' },
    { name: 'Cinematic Scenes 2.0',author: 'Bilal K',   time: '42 mins ago', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80' },
    { name: 'Workspace lifestyle', author: 'Muhammad',  time: '43 mins ago', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80' },
    { name: 'Interior Design',     author: 'Hamza T',   time: '1 hr ago',    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80' },
    { name: 'Yes to Yikes',        author: 'Asjad R',   time: '2 hrs ago',   img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
    { name: 'Untitled Workflow',   author: 'Aroosa S',  time: '3 hrs ago',   img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80' },
    { name: 'Untitled Workflow',   author: 'Hussain A', time: '4 hrs ago',   img: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80' },
    { name: 'Untitled Workflow',   author: 'Zara N',    time: 'yesterday',   img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80' },
  ];
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Recent Workflows</h3>
        <div style={{ flex: 1 }}/>
        <div style={{
          height: 32, width: 220, padding: '0 12px', borderRadius: 9,
          background: T.surfS, border: `1px solid ${T.border}`,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: T.fg3,
        }}>
          <Icon name="search" size={13}/> Search...
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        <button style={{
          height: 168, borderRadius: 14, border: `2px dashed ${T.border2}`,
          background: T.bg, color: T.fg2, cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 999, background: T.surfS,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${T.border2}`,
          }}><Icon name="plus" size={18}/></div>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Create new workflow</span>
        </button>
        {items.map((it, i) => (
          <div key={i} style={{
            borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
            border: `1px solid ${T.border}`, background: T.elev,
          }}>
            <div style={{
              height: 122, backgroundImage: `url(${it.img})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}/>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{it.name}</div>
              <div style={{ fontSize: 11, color: T.fg2, marginTop: 2 }}>
                Created by {it.author} · Edited {it.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================
   App
========================================================= */
const App = () => {
  const [tweaks, setTweak] = window.useTweaks(window.CAMPAIGN_TWEAK_DEFAULTS);

  useEffect(() => {
    const triple = hexToRGB(tweaks.accentColor);
    document.documentElement.style.setProperty('--fill-brand', triple);
    document.documentElement.style.setProperty('--fill-brand-hover', triple);
    document.documentElement.style.setProperty('--border-brand', triple);
  }, [tweaks.accentColor]);

  const SectionHead = window.SectionHead;
  const cx  = { maxWidth: 1240, margin: '0 auto', padding: '0 clamp(24px, 4vw, 56px)', boxSizing: 'border-box' };
  const sec = { padding: '120px 0' };
  const secLg = { padding: '160px 0 140px' };

  return (
    <div style={{ minHeight: '100vh', background: T.bg }}>
      {/* Hero: full-bleed */}
      <Hero headline={tweaks.headline} accent={tweaks.headlineAccent} animateGraph={tweaks.animateGraph}/>

      <div style={cx}>
        {tweaks.showVideo && <div style={sec}><Reveal><VideoBlock/></Reveal></div>}
        <div style={sec}><Reveal><window.SentenceNetwork/></Reveal></div>
        <div style={sec}><Reveal><HowItWorks/></Reveal></div>
      </div>

      {/* Real Outputs: marquee */}
      <div style={{ padding: '120px 0 0' }}>
        <Reveal>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(24px, 4vw, 56px)', boxSizing: 'border-box' }}>
            <SectionHead
              eyebrow="Real outputs"
              title="Every format. From one sentence."
              sub="UGC reels, brand templates, cinematic shorts. Every frame from a single natural-English brief."
            />
          </div>
          <window.ExploreWorkflowsMarquee headingHidden/>
        </Reveal>
      </div>

      <div style={cx}>
        <div style={sec}><Reveal><Examples columns={tweaks.examplesColumns}/></Reveal></div>
        <div style={sec}><Reveal><CodexCallout/></Reveal></div>
        {tweaks.showFAQ && <div style={sec}><Reveal><FAQ/></Reveal></div>}
        <div style={secLg}><Reveal><FinalCTA/></Reveal></div>
      </div>

      <CampaignTweaks tweaks={tweaks} setTweak={setTweak}/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
