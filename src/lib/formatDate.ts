// Date formatting — YYYY/MM/DD (English system per LEF standard).
// All user-facing dates in the system must use these helpers.

function parseDate(date: Date | string): Date {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    // Parse ISO date-only strings as local time to avoid UTC offset shifting the day.
    const [y, m, day] = date.split("-").map(Number);
    return new Date(y, m - 1, day);
  }
  return typeof date === "string" ? new Date(date) : date;
}

export function formatDate(date: Date | string): string {
  const d = parseDate(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

export function formatDateTime(date: Date | string): string {
  const d = parseDate(date);
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${formatDate(d)} ${h}:${min}`;
}
