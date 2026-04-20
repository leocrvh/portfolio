(() => {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-project]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      let visible = 0;
      projectCards.forEach((card) => {
        const match = selected === 'all' || card.dataset.category === selected || card.dataset.tags?.includes(selected);
        card.dataset.hidden = String(!match);
        if (match) visible += 1;
      });
      const empty = document.querySelector('[data-empty-projects]');
      if (empty) empty.hidden = visible !== 0;
    });
  });

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImg = document.querySelector('[data-lightbox-image]');
  const triggers = document.querySelectorAll('[data-lightbox-trigger]');

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  triggers.forEach((el) => {
    el.addEventListener('click', () => openLightbox(el.dataset.lightboxTrigger, el.dataset.lightboxAlt || 'Aperçu projet'));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(el.dataset.lightboxTrigger, el.dataset.lightboxAlt || 'Aperçu projet');
      }
    });
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('[data-lightbox-close]')) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  const magnetics = document.querySelectorAll('.magnetic');
  magnetics.forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
})();
