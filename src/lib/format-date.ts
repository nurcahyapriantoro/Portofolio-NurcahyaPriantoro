const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonthYear(ym: string): string {
  if (ym === 'present') return 'Present';
  const [yearStr, monthStr] = ym.split('-');
  const monthIdx = Number(monthStr) - 1;
  if (!yearStr || Number.isNaN(monthIdx) || monthIdx < 0 || monthIdx > 11) {
    return ym;
  }
  return `${MONTHS[monthIdx]} ${yearStr}`;
}

export function formatDateRange(start: string, end: string): string {
  return `${formatMonthYear(start)} – ${formatMonthYear(end)}`;
}
