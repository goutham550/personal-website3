(function () {
  const htmlElement = document.documentElement;
  const THEME_KEY = "preferred-theme"; // 'light' | 'dark' | 'system'

  function inferSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'system') {
      htmlElement.removeAttribute('data-theme');
      return;
    }
    htmlElement.setAttribute('data-theme', theme);
  }

  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY) || 'system'; } catch { return 'system'; }
  }

  function storeTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
  }

  function cycleTheme(current) {
    // system -> light -> dark -> system
    if (current === 'system') return 'light';
    if (current === 'light') return 'dark';
    return 'system';
  }

  function initThemeToggle() {
    const button = document.getElementById('themeToggle');
    if (!button) return;

    let theme = getStoredTheme();
    applyTheme(theme);
    updateButtonLabel(button, theme);

    button.addEventListener('click', () => {
      theme = cycleTheme(theme);
      applyTheme(theme);
      updateButtonLabel(button, theme);
      storeTheme(theme);
    });

    // React to system theme changes when on 'system'
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', () => {
        if (getStoredTheme() === 'system') {
          applyTheme('system');
          updateButtonLabel(button, 'system');
        }
      });
    }
  }

  function updateButtonLabel(button, theme) {
    const resolved = theme === 'system' ? inferSystemTheme() : theme;
    const label = theme === 'system' ? 'System' : (resolved === 'dark' ? 'Dark' : 'Light');
    button.textContent = '🌓 ' + label;
    button.setAttribute('aria-label', 'Theme: ' + label + ' (click to change)');
    // Reflect menu expanded state (for small screens)
  }

  function initNavToggle() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) menu.setAttribute('aria-expanded', 'true');
      else menu.removeAttribute('aria-expanded');
    });

    // Close on navigation
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.removeAttribute('aria-expanded');
      }
    });
  }

  function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', id);
        }
      });
    });
  }

  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    const elements = [
      ...document.querySelectorAll('.section, .card, .hero-avatar, .hero-cta, .lead, h1')
    ];
    elements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    elements.forEach((el) => observer.observe(el));
  }

  // Init
  initThemeToggle();
  initNavToggle();
  initSmoothScroll();
  setYear();
  initScrollReveal();
})();


