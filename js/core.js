(() => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('lc-theme');
  root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');

  const toggle = document.querySelector('[data-theme-toggle]');
  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('lc-theme', next);
  });

  const header = document.querySelector('.site-header');
  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 10);
    const doc = document.documentElement;
    const progress = document.querySelector('[data-scroll-progress]');
    if (progress) {
      const total = doc.scrollHeight - doc.clientHeight;
      progress.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobile = document.querySelector('[data-mobile-menu]');
  menuBtn?.addEventListener('click', () => {
    const isOpen = mobile?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  document.getElementById('year')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));

  const blob = document.querySelector('.cursor-blob');
  const sections = document.querySelectorAll('[data-cursor-track]');
  sections.forEach((section) => {
    section.addEventListener('pointermove', (e) => {
      if (!blob) return;
      blob.style.setProperty('--cx', `${e.clientX}px`);
      blob.style.setProperty('--cy', `${e.clientY}px`);
    });
  });
})();
