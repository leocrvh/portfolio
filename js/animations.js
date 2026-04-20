(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

    revealItems.forEach((el) => io.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  const hero = document.querySelector('[data-parallax]');
  if (hero && !reduced) {
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const end = Number(el.dataset.counter || 0);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const steps = 32;
    const inc = end / steps;
    const tick = () => {
      current += inc;
      if (current >= end) {
        el.textContent = `${end}${suffix}`;
        return;
      }
      el.textContent = `${Math.floor(current)}${suffix}`;
      requestAnimationFrame(tick);
    };
    tick();
  };

  if (counters.length && 'IntersectionObserver' in window) {
    const ioCounter = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((el) => ioCounter.observe(el));
  }
})();
