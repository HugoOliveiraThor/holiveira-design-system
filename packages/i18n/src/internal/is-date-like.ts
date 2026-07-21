export function _isDateLike(value: unknown): value is Date | string | number {
  if (value instanceof Date) return !isNaN(value.getTime());
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return !isNaN(parsed.getTime());
  }
  return false;
}
