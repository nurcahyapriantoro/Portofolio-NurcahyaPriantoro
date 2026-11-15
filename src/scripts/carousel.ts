export function initCarousels(): void {
  const roots = document.querySelectorAll<HTMLElement>('[data-carousel]');
  if (!roots.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  roots.forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const slides = root.querySelectorAll<HTMLElement>('[data-carousel-slide]');
    const prevBtn = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const nextBtn = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
    const dots = root.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]');
    const counter = root.querySelector<HTMLElement>('[data-carousel-counter]');

    const total = slides.length;
    if (!track || total <= 1) return;

    let current = 0;
    let timerId: number | undefined;
    let touchStartX = 0;

    const render = (): void => {
      track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
      dots.forEach((dot, idx) => {
        const active = idx === current;
        dot.setAttribute('aria-current', active ? 'true' : 'false');
        dot.classList.toggle('bg-white', active);
        dot.classList.toggle('w-5', active);
        dot.classList.toggle('bg-white/50', !active);
        dot.classList.toggle('w-2', !active);
      });
      if (counter) {
        counter.textContent = `${current + 1} / ${total}`;
      }
    };

    const goTo = (index: number): void => {
      current = (index + total) % total;
      render();
    };

    const stopAutoplay = (): void => {
      if (timerId !== undefined) {
        window.clearInterval(timerId);
        timerId = undefined;
      }
    };

    const startAutoplay = (): void => {
      if (prefersReducedMotion || document.hidden) return;
      stopAutoplay();
      timerId = window.setInterval(() => goTo(current + 1), 5000);
    };

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => goTo(idx));
    });

    root.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(current - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(current + 1);
      }
    });

    root.addEventListener(
      'touchstart',
      (event) => {
        const touch = event.touches[0];
        if (touch) touchStartX = touch.clientX;
        stopAutoplay();
      },
      { passive: true },
    );

    root.addEventListener(
      'touchend',
      (event) => {
        const touch = event.changedTouches[0];
        if (!touch) return;
        const delta = touch.clientX - touchStartX;
        if (Math.abs(delta) > 40) {
          goTo(delta < 0 ? current + 1 : current - 1);
        }
        startAutoplay();
      },
      { passive: true },
    );

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', startAutoplay);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    render();
    startAutoplay();
  });
}
