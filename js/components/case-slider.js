class CaseSlider extends HTMLElement {
  connectedCallback() {
    const img1 = this.getAttribute('img1');
    const img2 = this.getAttribute('img2');
    const title = this.getAttribute('title');
    const rootPath = this.getAttribute('root-path') || '..';

    this.innerHTML = `
      <div class="case-slider reveal">
        <div class="slider-track">
          <img src="${rootPath}/img/gallery/${img1}" alt="${title}">
          <img src="${rootPath}/img/gallery/${img2}" alt="${title} 制作過程">
        </div>
        <div class="slider-ui">
          <button class="slider-btn prev" aria-label="前へ">←</button>
          <span class="slider-count">1 / 2</span>
          <button class="slider-btn next" aria-label="次へ">→</button>
        </div>
      </div>
    `;

    this.initSlider();
  }

  initSlider() {
    const track = this.querySelector('.slider-track');
    const imgs = track.querySelectorAll('img');
    const countLabel = this.querySelector('.slider-count');
    const prevBtn = this.querySelector('.slider-btn.prev');
    const nextBtn = this.querySelector('.slider-btn.next');
    const total = imgs.length;
    let current = 0;

    const go = (n) => {
      current = Math.max(0, Math.min(n, total - 1));
      track.style.transform = `translateX(-${current * 100}%)`;
      if (countLabel) countLabel.textContent = `${current + 1} / ${total}`;
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === total - 1;
    };

    if (prevBtn) prevBtn.addEventListener('click', () => go(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => go(current + 1));

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1);
    });

    go(0);
  }
}

customElements.define('case-slider', CaseSlider);
