import type { SearchRecord } from '../../lib/docs-metadata/types';

export const MAX_RESULTS = 20;

/** Case-insensitive substring filter over the documented fields. */
export function filterRecords(records: SearchRecord[], query: string): SearchRecord[] {
  const term = query.trim().toLowerCase();
  if (term.length === 0) return records.slice(0, MAX_RESULTS);
  return records
    .filter(
      (record) =>
        record.title.toLowerCase().includes(term) ||
        record.package.toLowerCase().includes(term) ||
        record.category.toLowerCase().includes(term) ||
        record.keywords.some((keyword) => keyword.includes(term)),
    )
    .slice(0, MAX_RESULTS);
}
