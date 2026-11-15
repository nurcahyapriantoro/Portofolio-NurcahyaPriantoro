export function initCertFilter(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-cert-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-cert-group]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-cert-filter') ?? 'all';

      buttons.forEach((b) => {
        const active = b === btn;
        b.setAttribute('aria-pressed', String(active));
        b.classList.toggle('bg-blue-600', active);
        b.classList.toggle('text-white', active);
        b.classList.toggle('border-blue-600', active);
        b.classList.toggle('bg-white', !active);
        b.classList.toggle('text-slate-700', !active);
        b.classList.toggle('border-slate-200', !active);
        b.classList.toggle('dark:bg-slate-900', !active);
        b.classList.toggle('dark:text-slate-300', !active);
        b.classList.toggle('dark:border-slate-700', !active);
      });

      cards.forEach((card) => {
        const cardGroup = card.getAttribute('data-cert-group');
        const show = group === 'all' || cardGroup === group;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}
