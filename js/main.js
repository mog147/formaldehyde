/* ─────────────────────────────────────────
   FORMALDEHYDE · main.js
   ───────────────────────────────────────── */

// Image Slider
(function () {
  document.querySelectorAll('.case-slider').forEach(function (slider) {
    const track  = slider.querySelector('.slider-track');
    const imgs   = track.querySelectorAll('img');
    const count  = slider.querySelector('.slider-count');
    const prev   = slider.querySelector('.slider-btn.prev');
    const next   = slider.querySelector('.slider-btn.next');
    const total  = imgs.length;
    let current  = 0;

    function go(n) {
      current = Math.max(0, Math.min(n, total - 1));
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      if (count) count.textContent = (current + 1) + ' / ' + total;
      if (prev)  prev.disabled  = current === 0;
      if (next)  next.disabled  = current === total - 1;
    }

    if (prev) prev.addEventListener('click', function () { go(current - 1); });
    if (next) next.addEventListener('click', function () { go(current + 1); });

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1);
    });

    go(0);
  });
})();

// Reveal on scroll
(function () {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for list items
          const delay = entry.target.closest('.catalog-entry') ? i * 40 : 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();
