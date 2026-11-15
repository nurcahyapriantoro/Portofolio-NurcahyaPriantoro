/**
 * Lightweight IntersectionObserver scroll-reveal for below-the-fold sections.
 * Leaves the Hero untouched so first paint is instant with zero opening splash.
 */
export function initScrollReveal(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section')).slice(1);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -32px 0px' },
  );

  const foldY = window.innerHeight * 0.92;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < foldY) return;
    section.classList.add('reveal-ready');
    observer.observe(section);
  });
}
