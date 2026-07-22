import { _defaultLocale } from './internal/locale';
import type { DateInput, FormatDateOptions } from './types';

export function formatDate(date: DateInput, options?: FormatDateOptions): string {
  const { locale, ...intlOptions } = options ?? {};
  const resolvedLocale = locale ?? _defaultLocale;
  const resolvedDate = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  const hasOptions = Object.keys(intlOptions).length > 0;
  if (!hasOptions) {
    return resolvedDate.toLocaleDateString(resolvedLocale);
  }

  return new Intl.DateTimeFormat(resolvedLocale, intlOptions).format(resolvedDate);
}
