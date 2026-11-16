/**
 * Canonical rendering for the generated metadata files.
 *
 * The same records must produce the same bytes on every machine and every run:
 * object keys are sorted recursively, arrays keep the order the builders chose,
 * and the file ends with a newline. No timestamps, no tool version, no paths.
 */
function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === 'object') {
    const source = value as Record<string, unknown>;
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(source).sort()) sorted[key] = sortKeys(source[key]);
    return sorted;
  }
  return value;
}

export function renderJson(value: unknown): string {
  return `${JSON.stringify(sortKeys(value), null, 2)}\n`;
}
