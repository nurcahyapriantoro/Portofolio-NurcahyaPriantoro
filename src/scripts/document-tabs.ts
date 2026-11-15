/**
 * Accessible tab switcher for Portfolio Deck PDF vs Curriculum Vitae PDF.
 */
export function initDocumentTabs(): void {
  const container = document.querySelector<HTMLElement>('[data-doc-tabs]');
  if (!container) return;

  const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>('[data-doc-tab]'));
  const panels = Array.from(container.querySelectorAll<HTMLElement>('[data-doc-panel]'));
  if (!tabs.length || tabs.length !== panels.length) return;

  const activate = (targetKey: string, focusTab = false): void => {
    tabs.forEach((tab) => {
      const isSelected = tab.dataset.docTab === targetKey;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.tabIndex = isSelected ? 0 : -1;
      tab.classList.toggle('bg-white', isSelected);
      tab.classList.toggle('text-slate-900', isSelected);
      tab.classList.toggle('shadow-xs', isSelected);
      tab.classList.toggle('dark:bg-slate-900', isSelected);
      tab.classList.toggle('dark:text-white', isSelected);
      tab.classList.toggle('text-slate-600', !isSelected);
      tab.classList.toggle('dark:text-slate-400', !isSelected);
      if (isSelected && focusTab) tab.focus();
    });

    panels.forEach((panel) => {
      const match = panel.dataset.docPanel === targetKey;
      panel.classList.toggle('hidden', !match);
    });
  };

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      if (tab.dataset.docTab) activate(tab.dataset.docTab);
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const nextIdx =
        event.key === 'ArrowRight'
          ? (idx + 1) % tabs.length
          : (idx - 1 + tabs.length) % tabs.length;
      const nextKey = tabs[nextIdx]?.dataset.docTab;
      if (nextKey) activate(nextKey, true);
    });
  });
}
