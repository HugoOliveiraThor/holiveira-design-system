import type { DateInput, FormatMessageTimeOptions } from './types';
import { _defaultLocale } from './internal/locale';

export function formatMessageTime(
  timestamp: DateInput,
  options?: FormatMessageTimeOptions,
): string {
  const locale = options?.locale ?? _defaultLocale;
  const now = options?.now ?? Date.now();

  const messageDate =
    typeof timestamp === 'string' || typeof timestamp === 'number'
      ? new Date(timestamp)
      : timestamp;
  const nowDate = typeof now === 'number' ? new Date(now) : now;

  const diffInMinutes = Math.floor((nowDate.getTime() - messageDate.getTime()) / (60 * 1000));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 0) {
    if (diffInMinutes < 60) {
      return diffInMinutes === 0 ? 'just now' : `${diffInMinutes}m`;
    }
    return messageDate.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  if (diffInDays < 7) {
    return messageDate.toLocaleDateString(locale, { weekday: 'long' });
  }

  if (messageDate.getFullYear() === nowDate.getFullYear()) {
    return messageDate.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
    });
  }

  return messageDate.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
