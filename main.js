// ═══════════════════════════════════════════════════
//   LEO CARVALHO — PORTFOLIO  |  Shared JS
// ═══════════════════════════════════════════════════

// ── Theme Toggle ────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('lc-theme') || 'light';
html.dataset.theme = savedTheme;

themeBtn && themeBtn.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
  localStorage.setItem('lc-theme', next);
});

// ── Active nav link ──────────────────────────────────
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Mobile Menu ──────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('mobileOverlay');

function openMobileMenu() {
  burger && burger.classList.add('open');
  mobileMenu && mobileMenu.classList.add('open');
  overlay && overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobile() {
  burger && burger.classList.remove('open');
  mobileMenu && mobileMenu.classList.remove('open');
  overlay && overlay.classList.remove('open');
  document.body.style.overflow = '';
}
burger && burger.addEventListener('click', () => {
  mobileMenu && mobileMenu.classList.contains('open') ? closeMobile() : openMobileMenu();
});
overlay && overlay.addEventListener('click', closeMobile);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });

// ── Scroll Animations ────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Nav scroll shadow ────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 4px 24px var(--shadow)' : '';
}, { passive: true });
