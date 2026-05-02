/**
 * navbar.js — Shared ImagineArt navbar component
 * Usage: <header id="site-nav"></header>  then  <script src="navbar.js"></script>
 */
(function () {
  // ── Inject CSS ──────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = `
  /* ─── ImagineArt Shared Navbar CSS ─────────────────────── */
  .navbar {
    width: 100%;
    padding: 16px 0;
    position: fixed;
    top: 0; left: 0; right: 0; z-index: 100;
    transition: padding 0.3s ease;
  }
  .navbar-inner {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 10px clamp(40px, 12vw, 220px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 16px;
    background: transparent;
    border: 1px solid transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transition: background 0.5s cubic-bezier(0.4,0,0.2,1),
                border-color 0.5s cubic-bezier(0.4,0,0.2,1),
                box-shadow 0.5s cubic-bezier(0.4,0,0.2,1),
                backdrop-filter 0.5s cubic-bezier(0.4,0,0.2,1),
                max-width 0.55s cubic-bezier(0.4,0,0.2,1),
                padding 0.55s cubic-bezier(0.4,0,0.2,1);
  }
  .navbar.scrolled { padding: 10px 0; }
  .navbar.scrolled .navbar-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 8px 12px;
    background: rgba(255,255,255,0.82);
    backdrop-filter: saturate(200%) blur(24px);
    -webkit-backdrop-filter: saturate(200%) blur(24px);
    border-color: rgba(255,255,255,0.9);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.04), 0 4px 6px rgba(0,0,0,0.03), 0 12px 48px rgba(0,0,0,0.1);
  }
  .logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; overflow: visible; line-height: 0; }
  .logo-white { display: block; }
  .logo-dark { display: none; }
  .navbar.scrolled .logo-white { display: none; }
  .navbar.scrolled .logo-dark { display: block; }
  .nav-links { display: flex; align-items: center; gap: 2px; }
  .nav-link { display: flex; align-items: center; justify-content: center; padding: 6px 14px; border-radius: 8px; font-size: 14px; font-weight: 500; letter-spacing: 0.14px; color: rgba(15,15,15,0.75); text-decoration: none; white-space: nowrap; transition: color 0.15s, background 0.15s; }
  .nav-link:hover { color: #0f0f0f; background: rgba(15,15,15,0.05); }
  .nav-dropdown { position: relative; }
  .nav-dropdown-trigger { cursor: pointer; border: none; background: none; font-family: inherit; gap: 5px; }
  .nav-dropdown-trigger svg { transition: transform 0.2s ease; flex-shrink: 0; }
  .nav-dropdown:hover .nav-dropdown-trigger svg { transform: rotate(180deg); }
  .nav-dropdown-menu { position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(-6px); background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; box-shadow: 0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06); padding: 6px; min-width: 200px; opacity: 0; pointer-events: none; transition: opacity 0.18s ease, transform 0.18s ease; z-index: 200; }
  .nav-dropdown-menu::before { content: ''; position: absolute; top: -10px; left: 0; right: 0; height: 10px; }
  .nav-dropdown:hover .nav-dropdown-menu { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
  .nav-dropdown-item { display: flex; align-items: center; padding: 9px 14px; border-radius: 8px; font-size: 13.5px; font-weight: 500; color: #0f0f0f; text-decoration: none; transition: background 0.12s, color 0.12s; white-space: nowrap; }
  .nav-dropdown-item:hover { background: #f0f0f0; color: #0f0f0f; }
  .nav-dropdown-item.current { color: #0f0f0f; background: #f0f0f0; }
  .navbar:not(.scrolled) .nav-dropdown-trigger { color: rgba(255,255,255,0.75); }
  .navbar:not(.scrolled) .nav-dropdown-trigger:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .nav-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
  .navbar-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 34px; padding: 0 14px; border-radius: 9px; font-size: 13.5px; font-weight: 500; letter-spacing: 0.14px; white-space: nowrap; cursor: pointer; border: none; text-decoration: none; transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease, color 0.15s; font-family: inherit; }
  .navbar-btn-ghost { background: transparent; color: rgba(15,15,15,0.7); }
  .navbar-btn-ghost:hover { background: rgba(15,15,15,0.06); color: #0f0f0f; }
  .navbar:not(.scrolled) .navbar-btn-ghost { color: rgba(255,255,255,0.75); }
  .navbar:not(.scrolled) .navbar-btn-ghost:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .navbar-btn-dark { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.25); box-shadow: none; }
  .navbar-btn-dark:hover { background: rgba(255,255,255,0.18); }
  .navbar.scrolled .navbar-btn-dark { background: #111; border-color: transparent; color: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.15); }
  .navbar.scrolled .navbar-btn-dark:hover { background: #222; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
  .navbar:not(.scrolled) .nav-link { color: rgba(255,255,255,0.75); }
  .navbar:not(.scrolled) .nav-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .navbar.scrolled .nav-link { color: rgba(15,15,15,0.75); }
  .navbar.scrolled .nav-link:hover { color: #0f0f0f; background: rgba(15,15,15,0.05); }

  /* ─── Hamburger ───────────────────────────────────────── */
  .nav-hamburger {
    display: none;
    align-items: center; justify-content: center;
    width: 38px; height: 38px; border-radius: 10px;
    background: transparent; border: none; cursor: pointer;
    color: #fff; transition: background 0.15s; padding: 0; flex-shrink: 0;
  }
  .nav-hamburger:hover { background: rgba(255,255,255,0.1); }
  .navbar.scrolled .nav-hamburger { color: #0f0f0f; }
  .navbar.scrolled .nav-hamburger:hover { background: rgba(0,0,0,0.06); }
  .nav-hamburger .bar {
    display: block; width: 18px; height: 1.5px;
    background: currentColor; border-radius: 2px;
    transition: transform 0.25s ease, opacity 0.2s ease;
    transform-origin: center;
  }
  .nav-hamburger .bars { display: flex; flex-direction: column; gap: 5px; }
  .nav-hamburger.open .bar:nth-child(1) { transform: translateY(3.25px) rotate(45deg); }
  .nav-hamburger.open .bar:nth-child(2) { transform: translateY(-3.25px) rotate(-45deg); }

  /* ─── Mobile menu — full-screen dark overlay ─────────── */
  @keyframes mobileMenuIn {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .nav-mobile-menu {
    display: none;
    position: fixed; inset: 0; z-index: 101;
    background: #0a0a0a;
    flex-direction: column;
  }
  .nav-mobile-menu.open {
    display: flex;
    animation: mobileMenuIn 0.22s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  /* Top bar inside overlay */
  .nav-mobile-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 24px; flex-shrink: 0;
  }
  .nav-mobile-close {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.6); padding: 4px;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.15s;
  }
  .nav-mobile-close:hover { color: #fff; }
  /* Vertically centered body */
  .nav-mobile-body {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding-bottom: 40px;
  }
  .nav-mobile-inner {
    display: flex; flex-direction: column;
    align-items: center; gap: 4px;
  }
  .nav-mobile-link {
    display: block; text-align: center;
    padding: 10px 32px; border-radius: 10px;
    font-size: 22px; font-weight: 300; letter-spacing: -0.2px;
    color: rgba(255,255,255,0.55); text-decoration: none;
    transition: color 0.15s, background 0.15s;
  }
  .nav-mobile-link:hover { color: #fff; background: rgba(255,255,255,0.05); }
  .nav-mobile-divider {
    display: block;
    height: 1px; background: rgba(255,255,255,0.08);
    width: calc(100% - 48px); margin: 16px 0;
  }
  .nav-mobile-actions {
    padding: 0 24px; display: flex; justify-content: center;
  }
  .nav-mobile-actions .navbar-btn {
    height: 44px; padding: 0 32px; font-size: 14px;
    font-weight: 500; border-radius: 14px;
  }
  .nav-mobile-actions .navbar-btn-dark { background: #fff; color: #0f0f0f; border: none; }
  .nav-mobile-actions .navbar-btn-dark:hover { background: #e8e8e8; }

  /* ─── Responsive breakpoint ──────────────────────────── */
  @media (max-width: 820px) {
    .nav-links { display: none; }
    .nav-actions { display: none; }
    .nav-hamburger { display: flex; }
    .navbar-inner { padding: 10px 20px; }
    .navbar.scrolled { padding: 8px 0; }
  }
`;
  document.head.appendChild(style);

  // ── Build HTML ──────────────────────────────────────────
  var path = window.location.pathname;
  var isArch = path.indexOf('architecture') !== -1;
  var isEcom = path.indexOf('ecommerce') !== -1;
  var isMkt  = path.indexOf('marketing') !== -1;
  var logoHref = (isArch || isEcom || isMkt) ? './index.html' : '/';
  var archCurrent = isArch ? ' current' : '';
  var ecomCurrent = isEcom ? ' current' : '';
  var mktCurrent  = isMkt  ? ' current' : '';

  var html = `
  <header class="navbar" id="site-navbar">
    <div class="navbar-inner">
      <a href="${logoHref}" class="logo">
        <img class="logo-white" src="./assets/logo-imagine-white.svg" alt="ImagineArt Workflows" width="158" height="39">
        <img class="logo-dark" src="./assets/logo-imagine-black.svg" alt="ImagineArt Workflows" width="158" height="39">
      </a>
      <nav class="nav-links">
        <a href="#walkthrough" class="nav-link">Walkthrough</a>
        <a href="#what-it-does" class="nav-link">What it does</a>
        <a href="#how-it-works" class="nav-link">How it works</a>
        <a href="#examples" class="nav-link">Examples</a>
        <a href="#faq" class="nav-link">FAQ</a>
      </nav>
      <div class="nav-actions">
        <a href="#" class="navbar-btn navbar-btn-dark">Get Started</a>
      </div>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
        <span class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
        </span>
      </button>
    </div>
  </header>
  <div class="nav-mobile-menu" id="nav-mobile-menu">
    <div class="nav-mobile-topbar">
      <a href="${logoHref}" class="logo">
        <img class="logo-white" src="./assets/logo-imagine-white.svg" alt="ImagineArt Workflows" width="130" height="32" style="display:block;">
      </a>
      <button class="nav-mobile-close" id="nav-mobile-close" aria-label="Close menu">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="nav-mobile-body">
      <div class="nav-mobile-inner" id="nav-mobile-inner">
        <a href="#walkthrough" class="nav-mobile-link">Walkthrough</a>
        <a href="#what-it-does" class="nav-mobile-link">What it does</a>
        <a href="#how-it-works" class="nav-mobile-link">How it works</a>
        <a href="#examples" class="nav-mobile-link">Examples</a>
        <a href="#faq" class="nav-mobile-link">FAQ</a>
      </div>
      <div class="nav-mobile-divider"></div>
      <div class="nav-mobile-actions">
        <a href="https://www.imagine.art/flow" target="_blank" rel="noopener" class="navbar-btn navbar-btn-dark">Get Started →</a>
      </div>
    </div>
  </div>`;

  var mount = document.getElementById('site-nav');
  if (!mount) return;
  mount.outerHTML = html;

  // ── Scroll behavior ────────────────────────────────────
  var navbar = document.getElementById('site-navbar');
  if (!navbar) return;
  function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Hamburger / close toggle ───────────────────────────
  var hamburger  = document.getElementById('nav-hamburger');
  var closeBtn   = document.getElementById('nav-mobile-close');
  var mobileMenu = document.getElementById('nav-mobile-menu');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }

  if (hamburger)  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  if (closeBtn)   closeBtn.addEventListener('click', closeMenu);
  if (mobileMenu) mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
})();
