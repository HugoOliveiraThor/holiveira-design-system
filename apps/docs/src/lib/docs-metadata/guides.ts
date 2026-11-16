/**
 * Guide content model and validator.
 *
 * A guide record holds only editorial prose: the route it is served on, the
 * section it belongs to, its summary, its ordered prose blocks, the snippets it
 * shows and the pages it relates to. Every fact a guide states about a package
 * comes from the tracked documents the record cites, never from the validator.
 *
 * The gate validates structure and links: an empty field, a route outside the
 * twelve ADS-011 routes, a section that disagrees with the route, a repeated
 * order or slug, a snippet outside the examples directory, a relation to a
 * package or component that does not exist, or a source outside `docs/` is an
 * error that names the guide and the field.
 */
import { GUIDE_ROUTES } from './coverage';
import { MetadataError } from './registry';

/** The four sections ADS-011 §5.7 groups the twelve guide routes under. */
export const GUIDE_SECTIONS = ['Getting Started', 'Foundations', 'Guides', 'Architecture'] as const;

export type GuideSection = (typeof GUIDE_SECTIONS)[number];

/** One prose block of a guide, anchored by its id. */
export interface GuideSectionBlock {
  id: string;
  title: string;
  prose: string[];
}

/** The pages and components a guide recommends next. */
export interface GuideRelated {
  packages: string[];
  components: string[];
}

/** One guide route's editorial content. */
export interface GuideDoc {
  slug: string;
  section: GuideSection;
  title: string;
  summary: string;
  order: number;
  sections: GuideSectionBlock[];
  snippets: string[];
  related: GuideRelated;
  sources: string[];
}

/** Every snippet the portal shows lives under this directory. */
export const GUIDE_SNIPPET_DIR = 'apps/docs/src/examples/guides/';

/** Every guide source is a tracked document under here. */
export const GUIDE_SOURCE_DIR = 'docs/';

const GUIDE_SOURCE_EXTENSIONS = ['.md'];

/** The section a route belongs to, or `undefined` for a route outside the set. */
export function guideSectionOfRoute(route: string): GuideSection | undefined {
  if (route === 'getting-started' || route.startsWith('getting-started/')) return 'Getting Started';
  if (route.startsWith('foundations/')) return 'Foundations';
  if (route.startsWith('guides/')) return 'Guides';
  if (route === 'architecture') return 'Architecture';
  return undefined;
}

export interface GuideValidationContext {
  packages: readonly string[];
  componentExports: readonly { package: string; exportName: string }[];
  routes?: readonly string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requireText(value: unknown, field: string, guide: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new MetadataError(`guide ${guide} has an empty ${field}`);
  }
  return value;
}

function requireList(value: unknown, field: string, guide: string): unknown[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new MetadataError(`guide ${guide} has an empty ${field}`);
  }
  return value;
}

function requireObject(value: unknown, field: string, guide: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new MetadataError(`guide ${guide} has an empty ${field}`);
  }
  return value;
}

function validateSections(value: unknown, slug: string): GuideSectionBlock[] {
  const entries = requireList(value, 'sections', slug);
  const seen = new Set<string>();
  return entries.map((entry) => {
    const block = requireObject(entry, 'section', slug);
    const id = requireText(block.id, 'section id', slug);
    if (seen.has(id)) {
      throw new MetadataError(`guide ${slug} has two sections with id ${id}`);
    }
    seen.add(id);
    const title = requireText(block.title, `title of section ${id}`, slug);
    const prose: string[] = [];
    for (const paragraph of requireList(block.prose, `prose of section ${id}`, slug)) {
      prose.push(requireText(paragraph, `prose in section ${id}`, slug));
    }
    return { id, title, prose };
  });
}

function validateSnippets(value: unknown, slug: string): string[] {
  const entries = requireList(value, 'snippets', slug);
  return entries.map((entry) => {
    const path = requireText(entry, 'snippet path', slug);
    if (!path.startsWith(GUIDE_SNIPPET_DIR) || !path.endsWith('.tsx')) {
      throw new MetadataError(
        `guide ${slug} names snippet ${path}, which is not a .tsx file under ${GUIDE_SNIPPET_DIR}`,
      );
    }
    return path;
  });
}

function validateRelated(
  value: unknown,
  slug: string,
  context: GuideValidationContext,
): GuideRelated {
  const related = requireObject(value, 'related', slug);
  const packageNames = new Set(context.packages);
  const componentNames = new Set(context.componentExports.map((entry) => entry.exportName));
  const packages = Array.isArray(related.packages)
    ? related.packages.map((entry: unknown) => {
        const name = requireText(entry, 'related package', slug);
        if (!packageNames.has(name)) {
          throw new MetadataError(`guide ${slug} relates to package ${name}, which does not exist`);
        }
        return name;
      })
    : [];
  const components = Array.isArray(related.components)
    ? related.components.map((entry: unknown) => {
        const name = requireText(entry, 'related component', slug);
        if (!componentNames.has(name)) {
          throw new MetadataError(
            `guide ${slug} relates to component ${name}, which does not exist`,
          );
        }
        return name;
      })
    : [];
  return { packages, components };
}

function validateSources(value: unknown, slug: string): string[] {
  const entries = requireList(value, 'sources', slug);
  return entries.map((entry) => {
    const path = requireText(entry, 'source', slug);
    if (
      !path.startsWith(GUIDE_SOURCE_DIR) ||
      !GUIDE_SOURCE_EXTENSIONS.some((ext) => path.endsWith(ext))
    ) {
      throw new MetadataError(
        `guide ${slug} names source ${path}, which is not a tracked document under ${GUIDE_SOURCE_DIR}`,
      );
    }
    return path;
  });
}

/**
 * Validate the guide records and return them sorted by order. The slack the
 * records carry is editorial; this function only proves that every field and
 * every link resolves, and that the set itself is well formed.
 */
export function validateGuideDocs(value: unknown, context: GuideValidationContext): GuideDoc[] {
  if (!Array.isArray(value)) {
    throw new MetadataError('guide content is malformed: expected an array of records');
  }
  const routes = context.routes ?? GUIDE_ROUTES;
  const routeSet = new Set(routes);
  const slugs = new Set<string>();
  const orders = new Map<number, string>();
  const docs: GuideDoc[] = [];

  for (const entry of value) {
    if (!isRecord(entry)) {
      throw new MetadataError('guide content is malformed: record is not an object');
    }
    const slug = entry.slug;
    if (typeof slug !== 'string' || slug.length === 0) {
      throw new MetadataError('guide content is malformed: record has no slug');
    }
    if (!routeSet.has(slug)) {
      throw new MetadataError(`guide ${slug} is not one of the twelve guide routes`);
    }
    if (slugs.has(slug)) {
      throw new MetadataError(`guide content has two records for ${slug}`);
    }
    slugs.add(slug);

    const section = entry.section;
    if (typeof section !== 'string' || !GUIDE_SECTIONS.includes(section as GuideSection)) {
      throw new MetadataError(
        `guide ${slug} has an unknown section ${String(section)}; expected one of ${GUIDE_SECTIONS.join(', ')}`,
      );
    }
    const routeSection = guideSectionOfRoute(slug);
    if (routeSection !== section) {
      throw new MetadataError(
        `guide ${slug} is in section ${section}, but its route belongs to ${routeSection}`,
      );
    }

    const order = entry.order;
    if (typeof order !== 'number' || !Number.isInteger(order) || order < 1) {
      throw new MetadataError(`guide ${slug} has an empty order`);
    }
    const previousSlug = orders.get(order);
    if (previousSlug !== undefined) {
      throw new MetadataError(`guides ${previousSlug} and ${slug} share the order ${order}`);
    }
    orders.set(order, slug);

    docs.push({
      slug,
      section: section as GuideSection,
      title: requireText(entry.title, 'title', slug),
      summary: requireText(entry.summary, 'summary', slug),
      order,
      sections: validateSections(entry.sections, slug),
      snippets: validateSnippets(entry.snippets, slug),
      related: validateRelated(entry.related, slug, context),
      sources: validateSources(entry.sources, slug),
    });
  }

  return docs.sort((a, b) => a.order - b.order);
}
