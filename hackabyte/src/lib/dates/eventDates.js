export function parseEventDate(value) {
  if (!value) return null;

  if (typeof value === 'object' && typeof value.toDate === 'function') {
    return value.toDate();
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string') {
    const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
      const year = Number(dateOnlyMatch[1]);
      const month = Number(dateOnlyMatch[2]);
      const day = Number(dateOnlyMatch[3]);
      return new Date(year, month - 1, day);
    }
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function toDateOnly(value) {
  const parsedDate = parseEventDate(value);
  if (!parsedDate) return null;

  return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
}

export function formatEventDate(value, locale = 'en-US', options = {}) {
  const parsedDate = parseEventDate(value);
  if (!parsedDate) return 'TBD';

  const resolvedOptions = Object.keys(options).length > 0
    ? options
    : { year: 'numeric', month: 'short', day: 'numeric' };

  return parsedDate.toLocaleDateString(locale, resolvedOptions);
}

export function formatEventDateRange(startValue, endValue, locale = 'en-US', options = {}) {
  const startDate = parseEventDate(startValue);
  const endDate = parseEventDate(endValue);

  if (!startDate) return 'TBD';

  const resolvedOptions = Object.keys(options).length > 0
    ? options
    : { year: 'numeric', month: 'short', day: 'numeric' };

  const startLabel = startDate.toLocaleDateString(locale, resolvedOptions);

  if (!endDate || toDateOnly(startDate)?.getTime() === toDateOnly(endDate)?.getTime()) {
    return startLabel;
  }

  const endLabel = endDate.toLocaleDateString(locale, resolvedOptions);
  return `${startLabel} - ${endLabel}`;
}
