/**
 * The guide routes the portal serves.
 *
 * ADS-011 §5.7/§5.8 fixes twelve routes. The list is the contract between the
 * gate, the shell and the static export: `generateStaticParams` has a path for
 * every route before its content lands, and the gate rejects a record whose
 * slug is not one of these. It lives apart from the coverage gate so the query
 * layer can read it without pulling the gate's `node:fs` dependency along.
 */
export const GUIDE_ROUTES = [
  'getting-started',
  'getting-started/installation',
  'getting-started/theming',
  'foundations/tokens',
  'foundations/styling',
  'foundations/accessibility',
  'guides/providers',
  'guides/forms',
  'guides/charts',
  'guides/layouts',
  'guides/icons',
  'architecture',
] as const;

/** The route segments of one guide family, in ADS-011 order. */
export function guideRouteSegments(family: string): string[] {
  return GUIDE_ROUTES.filter((route) => route.startsWith(`${family}/`)).map((route) =>
    route.slice(family.length + 1),
  );
}
