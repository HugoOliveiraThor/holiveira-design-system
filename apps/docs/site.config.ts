export const SITE_ORIGIN = 'https://hugoliveirathor.github.io';

/** The GitHub Pages project path; the docs app and Storybook share it. */
export const PROJECT_PATH = '/holiveira-design-system';

export const DOCS_BASE_PATH = `${PROJECT_PATH}/docs`;

export const docsSite = {
  title: 'Holiveira Documentation Platform',
  description: 'Official documentation for the Holiveira Design System packages.',
  status: 'pre-release' as const,
  storybookUrl: `${SITE_ORIGIN}${PROJECT_PATH}/`,
  playgroundUrl: `${SITE_ORIGIN}${PROJECT_PATH}/playground/`,
  repositoryUrl: 'https://github.com/HugoOliveiraThor/holiveira-design-system',
};
