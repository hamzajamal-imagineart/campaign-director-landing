/* global React, ReactDOM */
const { useState, useEffect } = React;
const { T, Icon, Sidebar, TopBar, Hero, CodexCallout, PromptBlock, HowItWorks, VideoBlock, Examples, FAQ, FinalCTA, LaunchModal, CampaignTweaks } = window;

/* hex → "r g b" triple for CSS var values like "138 63 252" */
const hexToRGB = (hex) => {
  const h = hex.replace('#', '');
  const n = h.length === 3
    ? h.split('').map(c => parseInt(c + c, 16))
    : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  return n.join(' ');
};

/* =========================================================
   Page tabs (My Workflows / Discover / Campaign Director)
========================================================= */
const Tabs = ({ active, onChange, directorLabel, badge }) => {
  const items = [
    { id: 'director', label: directorLabel, badge: badge || null },
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
            {it.badge && (
              <span style={{
                fontSize: 9, fontWeight: 600, letterSpacing: '0.04em',
                padding: '2px 6px', borderRadius: 999,
                background: isActive ? 'rgba(255,255,255,0.18)' : 'rgba(138,63,252,0.12)',
                color: isActive ? T.btnDarkFg : 'rgb(var(--primary-70))',
              }}>{it.badge}</span>
            )}
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
    { name: 'Lipstick close-up', author: 'Aisha M', time: '24 mins ago', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80' },
    { name: 'Mountain mood',     author: 'Shoaib U', time: '40 mins ago', img: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=400&q=80' },
    { name: 'Workspace lifestyle', author: 'Muhammad', time: '43 mins ago', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80' },
    { name: 'Interior Design',   author: 'Hamza T', time: '1 hr ago',   img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80' },
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
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
  const [tab, setTab] = useState('director');
  const [tweaks, setTweak] = window.useTweaks(window.CAMPAIGN_TWEAK_DEFAULTS);

  /* Apply accent color globally by overriding CSS vars that T.brand reads */
  useEffect(() => {
    const triple = hexToRGB(tweaks.accentColor);
    document.documentElement.style.setProperty('--fill-brand', triple);
    document.documentElement.style.setProperty('--fill-brand-hover', triple);
    document.documentElement.style.setProperty('--border-brand', triple);
  }, [tweaks.accentColor]);



  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: T.bg }}>
      <Sidebar active="workflows" onNav={()=>{}}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar/>

        <main style={{
          flex: 1, padding: '28px 28px 48px',
          maxWidth: 1180, width: '100%', margin: '0 auto',
          boxSizing: 'border-box',
        }}>
          {/* Page header row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18,
          }}>
            <div>
              <div style={{ fontSize: 12, color: T.fg2, marginBottom: 4, fontWeight: 500, letterSpacing: '0.02em' }}>
                Workflows
              </div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '0.005em' }}>
                {tab === 'director' ? tweaks.tabName : 'Workflows'}
              </h1>
            </div>
            <div style={{ flex: 1 }}/>
            <Tabs active={tab} onChange={setTab} directorLabel={tweaks.tabName} badge={tweaks.newBadge}/>
          </div>

          {tab === 'director' && (
            <>
              <Hero headline={tweaks.headline} accent={tweaks.headlineAccent} animateGraph={tweaks.animateGraph}/>
              <CodexCallout/>

              <div style={{ marginTop: 64 }}>
                <window.SectionHead
                  eyebrow="The starter prompt"
                  title="One prompt. That's the whole interface."
                  sub="Paste this into Codex with your idea. Attach any references you have. The repo's execution rules handle the rest."
                />
                <PromptBlock/>
              </div>

              <HowItWorks/>
              {tweaks.showVideo && <VideoBlock/>}
              <Examples columns={tweaks.examplesColumns}/>
              {tweaks.showFAQ && <FAQ/>}
              <FinalCTA/>
            </>
          )}

          {tab === 'mine' && <RecentWorkflows/>}
          {tab === 'discover' && (
            <div style={{
              padding: 64, borderRadius: 16, background: T.elev,
              border: `1px solid ${T.border}`, textAlign: 'center', color: T.fg2,
            }}>
              <Icon name="globe" size={32} color={T.fg3}/>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 12, color: T.fg }}>Discover community workflows</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>Coming soon — fork community-built campaigns and remix.</div>
            </div>
          )}
        </main>
      </div>

      <CampaignTweaks tweaks={tweaks} setTweak={setTweak}/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
