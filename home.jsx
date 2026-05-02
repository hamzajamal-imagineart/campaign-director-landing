/* global React */
const { useState: useStateH } = React;
/* T, Icon are on window */

/* =========================================================
   ImagineArt Home — "What do you want to create?"
   Faithful clone of the imagine.art landing.
========================================================= */
const HomePage = () => {
  const [mode, setMode] = useStateH('image');
  const [chip, setChip] = useStateH('create');
  const T = window.T;
  const Icon = window.Icon;

  const tools = [
    { name: 'Seedance 2.0', icon: 'zap',      bg: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
    { name: 'Image',        icon: 'image',    bg: '#FF4D4D' },
    { name: 'Video',        icon: 'film',     bg: '#FB923C' },
    { name: 'Audio',        icon: 'music',    bg: 'linear-gradient(135deg,#A78BFA,#7C3AED)', badge: 'NEW' },
    { name: 'Workflow',     icon: 'workflow', bg: 'linear-gradient(135deg,#34D399,#10B981)' },
    { name: 'Edit',         icon: 'edit',     bg: 'linear-gradient(135deg,#C084FC,#8B5CF6)' },
    { name: 'Upscale',      icon: 'maximize', bg: 'linear-gradient(135deg,#22D3EE,#06B6D4)' },
    { name: 'Assist',       icon: 'spark',    bg: 'linear-gradient(135deg,#C4B5FD,#A78BFA)' },
    { name: 'AI Docs',      icon: 'clipboard',bg: 'linear-gradient(135deg,#60A5FA,#3B82F6)' },
    { name: 'Slides',       icon: 'layout',   bg: 'linear-gradient(135deg,#FCD34D,#F59E0B)' },
  ];

  const previews = [
    { name: 'GPT Image 2',   img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80' },
    { name: 'Seedance 2.0',  img: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=600&q=80' },
    { name: 'Create Image',  img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600&q=80' },
    { name: 'Text to Video', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80' },
    { name: 'Inpaint',       img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80' },
  ];

  return (
    <div style={{
      minHeight: 'calc(100vh - 56px)',
      padding: '0 28px 28px',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Centered hero */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 0',
      }}>
        <h1 style={{
          margin: 0, fontSize: 64, lineHeight: 1.1,
          fontWeight: 500, letterSpacing: '-0.02em', color: T.fg, textAlign: 'center',
        }}>
          What do you want to create?
        </h1>
        <p style={{
          margin: '14px 0 0', fontSize: 14, color: T.fg2, textAlign: 'center',
        }}>
          Type your prompt - turn ideas into stunning AI visuals instantly.
        </p>

        {/* Create / Apps / Workflows pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
          {[
            { id: 'create',    label: 'Create' },
            { id: 'apps',      label: 'Apps' },
            { id: 'workflows', label: 'Workflows', external: true },
          ].map(c => {
            const isActive = chip === c.id;
            return (
              <button key={c.id} onClick={() => setChip(c.id)} style={{
                height: 36, padding: '0 18px', borderRadius: 999,
                background: isActive ? 'rgba(138,63,252,0.18)' : 'transparent',
                color: isActive ? 'rgb(var(--primary-30))' : T.fg2,
                border: isActive ? '1px solid rgba(138,63,252,0.35)' : `1px solid ${T.border2}`,
                cursor: 'pointer', fontSize: 13, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {c.label}
                {c.external && <Icon name="arrowUpRight" size={13} color={isActive ? 'rgb(var(--primary-30))' : T.fg2}/>}
              </button>
            );
          })}
        </div>

        {/* Prompt input */}
        <div style={{
          width: '100%', maxWidth: 760, marginTop: 18,
          padding: 16, borderRadius: 18,
          background: T.elev,
          border: `1px solid ${T.border}`,
          boxShadow: '0 0 0 6px rgba(138,63,252,0.06), 0 0 32px rgba(138,63,252,0.10)',
        }}>
          <textarea
            placeholder="Write what you want to create..."
            style={{
              width: '100%', height: 56, border: 0, background: 'transparent',
              color: T.fg, fontSize: 14, resize: 'none', outline: 'none',
              fontFamily: 'inherit', padding: 4, boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <div style={{
              display: 'inline-flex', gap: 2, padding: 3, borderRadius: 999,
              background: T.surfS,
            }}>
              {[
                { id: 'image',  label: 'Image',  icon: 'image' },
                { id: 'video',  label: 'Video',  icon: 'film' },
                { id: 'assist', label: 'Assist', icon: 'spark' },
              ].map(m => {
                const isActive = mode === m.id;
                return (
                  <button key={m.id} onClick={() => setMode(m.id)} style={{
                    height: 28, padding: '0 12px', borderRadius: 999,
                    background: isActive ? T.bg : 'transparent',
                    color: isActive ? T.fg : T.fg2,
                    border: 0, cursor: 'pointer', fontSize: 12, fontWeight: 500,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                    <Icon name={m.icon} size={13}/>
                    {m.label}
                  </button>
                );
              })}
            </div>
            <div style={{ flex: 1 }}/>
            <button style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'transparent', border: 0, color: T.fg2, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="refresh" size={15}/>
            </button>
            <button style={{
              width: 36, height: 36, borderRadius: 999,
              background: 'rgb(var(--primary-50))', color: '#fff', border: 0, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="arrowUp" size={16} color="#fff"/>
            </button>
          </div>
        </div>

        {/* Tool icons row */}
        <div style={{ display: 'flex', gap: 28, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
          {tools.map((t, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              cursor: 'pointer', position: 'relative', minWidth: 60,
            }}>
              {t.badge && (
                <span style={{
                  position: 'absolute', top: -10, right: 0, fontSize: 8, fontWeight: 700,
                  padding: '2px 5px', borderRadius: 4,
                  background: 'rgb(var(--primary-50))', color: '#fff',
                  letterSpacing: '0.06em',
                }}>{t.badge}</span>
              )}
              <div style={{
                width: 52, height: 52, borderRadius: 13,
                background: t.bg, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={t.icon} size={26} color="#fff" sw={2}/>
              </div>
              <span style={{ fontSize: 11, color: T.fg2, fontWeight: 500 }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: promo card + preview cards */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <div style={{
          width: 360, padding: 22, borderRadius: 16,
          background: `
            radial-gradient(70% 120% at 0% 100%, rgba(138,63,252,0.18) 0%, rgba(138,63,252,0) 60%),
            linear-gradient(135deg, #2A2D3D 0%, #1B1E2C 100%)
          `,
          color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: 200, border: '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.005em' }}>
              What will you<br/>create today?
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 10, lineHeight: 1.5 }}>
              Bring your ideas to life with realistic<br/>images and videos in just a few clicks
            </div>
          </div>
          <button style={{
            alignSelf: 'flex-start', height: 36, padding: '0 16px', borderRadius: 999,
            background: 'rgb(var(--primary-50))', color: '#fff', border: 0, cursor: 'pointer',
            fontWeight: 500, fontSize: 13,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <Icon name="spark" size={15} color="#fff"/>
            Explore all tools
          </button>
        </div>

        {previews.map((p, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 16, overflow: 'hidden',
            background: T.elev, border: `1px solid ${T.border}`,
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            minHeight: 200,
          }}>
            <div style={{
              flex: 1, backgroundImage: `url(${p.img})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}/>
            <div style={{
              height: 44, padding: '0 14px', display: 'flex', alignItems: 'center',
              borderTop: `1px solid ${T.border}`,
            }}>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: T.fg }}>{p.name}</span>
              <div style={{ flex: 1 }}/>
              <Icon name="arrowRight" size={15} color={T.fg2}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.HomePage = HomePage;
