export function generateTestId(...parts: string[]): string {
  return parts.join('-');
}
