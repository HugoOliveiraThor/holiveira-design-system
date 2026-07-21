/**
 * Creates a typed TanStack Query key factory for a given domain.
 *
 * Provides standard key shapes for cache invalidation:
 * - `all` — invalidate everything under the domain
 * - `lists` — invalidate all list-type queries
 * - `list(filters)` — specific list with filters
 * - `details` — invalidate all detail queries
 * - `detail(id)` — specific entity
 */
export function queryKeyFactory(baseKey: string) {
  return {
    all: [baseKey] as const,
    lists: [baseKey, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [baseKey, "list", filters ?? {}] as const,
    details: [baseKey, "detail"] as const,
    detail: (id: string | number) =>
      [baseKey, "detail", id] as const,
  }
}
