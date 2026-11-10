/** Deployed Storybook site these screens document their components in. */
export const STORYBOOK_BASE = 'https://hugooliveirathor.github.io/holiveira-design-system';

/** Storybook title each route illustrates, read from the real story files. */
export const PAGE_STORY_TITLES: Record<string, string> = {
  '/': 'Patterns/Sidebar + Breadcrumb',
  '/forms': 'Patterns/Form + Validation',
  '/orders': 'Patterns/Tables/Data Table 1',
  '/settings': 'Design Tokens/Shadows',
  '/login': 'Layouts/SignInForm',
};

/** Name of the story to open inside each title. */
const PAGE_STORY_NAMES: Record<string, string> = {
  '/': 'layout',
  '/forms': 'example',
  '/orders': 'default',
  '/settings': 'cards',
  '/login': 'default',
};

/** Storybook's ID for a story title: lowercased, non-alphanumerics collapsed to one hyphen. */
export function storyId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Resolves a route to its deployed Storybook entry. */
export function storybookHref(path: string): string {
  const title = PAGE_STORY_TITLES[path];

  if (!title) {
    return `${STORYBOOK_BASE}/?path=/docs/getting-started--docs`;
  }

  return `${STORYBOOK_BASE}/?path=/story/${storyId(title)}--${PAGE_STORY_NAMES[path]}`;
}
