const STORAGE_KEY = 'color-theme';

function applyTheme(isDark: boolean): void {
  document.documentElement.classList.toggle('dark', isDark);
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-pressed', String(isDark));
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

export function initThemeToggle(): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(isDark);

  btn.addEventListener('click', () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    localStorage.setItem(STORAGE_KEY, nextDark ? 'dark' : 'light');
    applyTheme(nextDark);
  });
}
