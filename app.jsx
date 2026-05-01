/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* =========================================================
   Tokens & primitives
========================================================= */
const T = {
  bg: 'rgb(var(--background))',
  surfP: 'rgb(var(--surface-primary))',
  surfS: 'rgb(var(--surface-secondary))',
  elev: 'rgb(var(--surface-elevated))',
  brand: 'rgb(var(--fill-brand))',
  brandHover: 'rgb(var(--fill-brand-hover))',
  brandTonal: 'rgb(var(--fill-brand-secondary))',
  brandText: 'rgb(var(--content-brand))',
  fg: 'rgb(var(--content-primary))',
  fg2: 'rgb(var(--content-secondary))',
  fg3: 'rgb(var(--content-tertiary))',
  inv: 'rgb(var(--content-primary-inverse))',
  border: 'rgb(var(--border-primary))',
  border2: 'rgb(var(--border-secondary))',
  border3: 'rgb(var(--border-tertiary))',
  surfBrand: 'rgb(var(--surface-brand))',
  warn: 'rgb(var(--content-warning))',
  warnSurf: 'rgb(var(--surface-warning))',
  /* ImagineArt-site CTA: near-black pill, used everywhere primary actions live */
  btnDark: 'rgb(var(--btn-primary-bg))',
  btnDarkHover: 'rgb(var(--btn-primary-bg-hover))',
  btnDarkFg: 'rgb(var(--btn-primary-fg))',
  /* Soft hairlines */
  hair: 'rgb(var(--hairline))',
  hairS: 'rgb(var(--hairline-strong))',
};

const Icon = ({ name, size = 18, sw = 1.6, color = 'currentColor', style, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={color} strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, ...style }} className={className}
    dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }}
  />
);

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  film: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 7.5h4M3 12h18M3 16.5h4M17 7.5h4M17 16.5h4"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
  workflow: '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h3a3 3 0 0 1 3 3v3"/><path d="M15 18H9"/>',
  apps: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  helpCircle: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  terminal: '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8 12 3 7 8"/><path d="M12 3v12"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.99 8.8l-8.46 8.46a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  spark: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  chrome: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  package: '<path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.27 6.96 8.73 5.05 8.73-5.05"/><path d="M12 22.08V12"/>',
  checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  dot: '<circle cx="12" cy="12" r="3" fill="currentColor"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
  type: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
  pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
};

/* =========================================================
   Sidebar (matches the screenshot)
========================================================= */
const SidebarItem = ({ icon, label, active, onClick, indent }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 10,
    height: 34, padding: indent ? '0 10px 0 14px' : '0 10px',
    borderRadius: 10,
    background: active ? T.brandTonal : 'transparent',
    color: active ? T.brandText : T.fg,
    border: 0, cursor: 'pointer', textAlign: 'left',
    fontSize: 13, fontWeight: 500, letterSpacing: '0.01em',
    width: '100%',
  }}>
    <Icon name={icon} size={16} />
    <span>{label}</span>
  </button>
);

const SidebarSection = ({ title, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 14 }}>
    <div style={{
      fontSize: 11, fontWeight: 500, color: T.fg3, padding: '0 10px 6px',
      letterSpacing: '0.04em', textTransform: 'uppercase',
    }}>{title}</div>
    {children}
  </div>
);

const Sidebar = ({ active, onNav }) => (
  <aside style={{
    width: 220, flexShrink: 0, alignSelf: 'flex-start',
    background: T.elev, borderRight: `1px solid ${T.border}`,
    padding: '14px 10px', display: 'flex', flexDirection: 'column',
    height: '100vh', position: 'sticky', top: 0, overflow: 'auto',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 12px' }}>
      <img src="assets/imagine-logo.svg" width="26" height="26" alt="ImagineArt" />
      <div style={{ fontFamily: "'Lemon Milk','Google Sans Flex',sans-serif", fontWeight: 500, letterSpacing: '0.02em', fontSize: 14 }}>
        ImagineArt
      </div>
      <button style={{
        marginLeft: 'auto', width: 24, height: 24, borderRadius: 6,
        background: 'transparent', border: 0, color: T.fg2, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name="layout" size={14}/></button>
    </div>

    <SidebarItem icon="home" label="Home" active={active==='home'} onClick={()=>onNav('home')} />
    <SidebarItem icon="folder" label="Assets" active={active==='assets'} onClick={()=>onNav('assets')} />
    <SidebarItem icon="search" label="Search" active={active==='search'} onClick={()=>onNav('search')} />

    <SidebarSection title="Tools">
      <SidebarItem icon="image" label="Image" />
      <SidebarItem icon="film" label="Video" />
      <SidebarItem icon="music" label="Audio" />
      <SidebarItem icon="workflow" label="Workflows" active={active==='workflows'} onClick={()=>onNav('workflows')} />
      <SidebarItem icon="edit" label="Edit" />
      <SidebarItem icon="maximize" label="Upscale" />
      <SidebarItem icon="film" label="Film studio" />
    </SidebarSection>

    <SidebarSection title="Apps">
      <SidebarItem icon="apps" label="All Tools" />
      <SidebarItem icon="layers" label="Apps" />
      <SidebarItem icon="users" label="Community" />
      <SidebarItem icon="message" label="Chatly" />
    </SidebarSection>

    <div style={{ flex: 1 }} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 0' }}>
      <SidebarItem icon="helpCircle" label="Help" />
      <SidebarItem icon="settings" label="Settings" />
    </div>
  </aside>
);

/* =========================================================
   Top app bar
========================================================= */
const TopBar = () => (
  <header style={{
    height: 56, flexShrink: 0, background: T.bg,
    borderBottom: `1px solid ${T.border}`,
    display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px',
  }}>
    <button style={{
      height: 32, padding: '0 10px', borderRadius: 8, background: T.surfS,
      border: `1px solid ${T.border}`, color: T.fg, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500,
    }}>
      <Icon name="users" size={14}/>
      All team creations
      <Icon name="chevronDown" size={14}/>
    </button>
    <div style={{ flex: 1 }} />
    <button style={{
      width: 36, height: 36, borderRadius: 10, background: 'transparent',
      border: 0, color: T.fg, cursor: 'pointer', display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center',
    }}><Icon name="search" size={18}/></button>
    <button style={btnGhost}>Contact Sales</button>
    <button style={btnUpgrade}>
      <Icon name="zap" size={14}/>
      Upgrade
    </button>
    <button style={btnTeam}>
      <span style={{
        width: 18, height: 18, borderRadius: 5,
        background: 'linear-gradient(135deg,#8A3FFC,#FF85DD)',
      }}/>
      ImagineArt (...)
      <Icon name="chevronDown" size={12}/>
    </button>
    <button style={iconGhost}><Icon name="bell" size={18}/></button>
    <div style={{
      width: 30, height: 30, borderRadius: 999,
      background: 'linear-gradient(135deg,#8A3FFC,#FF85DD)',
      color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 600, fontSize: 12,
    }}>H</div>
  </header>
);

const btnGhost = {
  height: 32, padding: '0 12px', borderRadius: 9,
  background: 'transparent', border: `1px solid ${T.border2}`, color: T.fg,
  cursor: 'pointer', fontSize: 13, fontWeight: 500,
};
const btnUpgrade = {
  height: 32, padding: '0 12px', borderRadius: 9,
  background: T.brandTonal, border: 0, color: T.brandText,
  cursor: 'pointer', fontSize: 13, fontWeight: 500,
  display: 'inline-flex', alignItems: 'center', gap: 6,
};
const btnTeam = {
  height: 32, padding: '0 10px', borderRadius: 9,
  background: T.surfS, border: `1px solid ${T.border}`, color: T.fg,
  cursor: 'pointer', fontSize: 13, fontWeight: 500,
  display: 'inline-flex', alignItems: 'center', gap: 8,
};
const iconGhost = {
  width: 36, height: 36, borderRadius: 10, background: 'transparent',
  border: 0, color: T.fg, cursor: 'pointer', display: 'inline-flex',
  alignItems: 'center', justifyContent: 'center',
};

window.T = T; window.Icon = Icon;
window.Sidebar = Sidebar; window.TopBar = TopBar;
