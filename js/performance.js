(() => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '180px 0px' });
    lazyImages.forEach((img) => io.observe(img));
  }

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!status) return;
    status.className = 'form-status';
    status.textContent = 'Envoi en cours…';
    const endpoint = form.getAttribute('action');
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Erreur serveur');
      form.reset();
      status.classList.add('ok');
      status.textContent = 'Message envoyé avec succès.';
    } catch (_err) {
      status.classList.add('err');
      status.textContent = 'Impossible d’envoyer maintenant. Utilisez le mail direct juste en dessous.';
    }
  });
})();
