import type { GuideDoc } from '../../lib/docs-metadata/guides';

export const gettingStartedGuides: GuideDoc[] = [
  {
    slug: 'getting-started',
    section: 'Getting Started',
    title: 'Getting started',
    summary:
      'Sixteen public packages, a documented component catalogue and a Storybook; this page is the shortest path from an empty application to a themed screen.',
    order: 1,
    sections: [
      {
        id: 'what-ships',
        title: 'What the system ships',
        prose: [
          'The catalogue is split by dependency level. The foundation packages carry the design decisions: @ho-dev/tokens owns the raw values and @ho-dev/theme turns them into a light and dark theme. The component packages build screens from those foundations: @ho-dev/primitives, @ho-dev/forms, @ho-dev/ui, @ho-dev/charts, @ho-dev/layouts and @ho-dev/icons. The utility packages carry behaviour with no visual opinion: @ho-dev/utils, @ho-dev/hooks, @ho-dev/i18n, @ho-dev/providers, @ho-dev/types and @ho-dev/constants.',
          'The tooling packages, @ho-dev/config and @ho-dev/eslint, publish the environment configuration this repository uses. Every package page lists the version, the install state, the peer dependencies the package declares and the export inventory generated from its barrel.',
        ],
      },
      {
        id: 'first-screen',
        title: 'The first screen',
        prose: [
          'Install the package that owns the component you need, wrap the application in ThemeProvider from @ho-dev/theme, and import components from the package entry point. The snippet below is compiled by the documentation build, so the import and the component on this page are real code rather than a retyped sample.',
        ],
      },
      {
        id: 'read-next',
        title: 'Where to read next',
        prose: [
          'The installation guide covers the install state, peer dependencies and the workspace alternative. The theming guide covers the provider and the .dark class. Foundations explains tokens, styling and accessibility; Guides covers providers, forms, charts, layouts and icons; Architecture explains the package layers, dependency ownership and contracts.',
          'Storybook renders the stories against the same theme. Every package page links to it, and the component pages link to the story of the component they document.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/getting-started.tsx'],
    related: {
      packages: ['@ho-dev/primitives', '@ho-dev/theme', '@ho-dev/tokens'],
      components: ['Button'],
    },
    sources: [
      'docs/architecture/ads-011-documentation-platform.md',
      'docs/architecture/ads-010-release.md',
      'docs/superpowers/specs/dependency-ownership-architecture.md',
    ],
  },
  {
    slug: 'getting-started/installation',
    section: 'Getting Started',
    title: 'Installation',
    summary:
      'Every package installs on its own; each package page lists the version, the install state and the peer dependencies the application has to provide.',
    order: 2,
    sections: [
      {
        id: 'install-state',
        title: 'The install state',
        prose: [
          'Every package is currently on a 0.x version, so the portal reports the pre-release install state and shows the workspace dependency form instead of a pnpm add command. The package page renders that state from the generated registry, never from prose.',
          'ADS-010 fixes the path to a published version: independent semver per package through changesets, a Version PR, and consumer validation against the packed tarballs before publish. Until that path completes, a workspace link inside this repository is the supported way to consume a package.',
        ],
      },
      {
        id: 'peers',
        title: 'Peer dependencies',
        prose: [
          'A package declares what its consumer must provide as peer dependencies, and the set is specific to each package: the component packages declare react, @ho-dev/theme declares next-themes, @ho-dev/charts declares apexcharts and react-apexcharts, @ho-dev/forms declares react-hook-form, zod and flatpickr, and @ho-dev/tokens declares tailwindcss. The installation section of a package page lists the exact ranges read from its manifest.',
          'A dependency the package itself imports is a dependency of that package, not of the application. The dependency ownership spec records the rule: the import statement decides the owner, and the consumer provides only the peers.',
        ],
      },
      {
        id: 'entry-points',
        title: 'Import from the entry point',
        prose: [
          'Published packages ship dist/, and the public API is the package barrel. Import the package name, never a source path, and never a private package: @ho-dev/auth, @ho-dev/api, @ho-dev/db and @ho-dev/testing are not part of the published catalogue.',
          'The snippets in this portal follow the same boundary. The documentation gate fails a snippet that imports a private package or a packages/ source path.',
        ],
      },
      {
        id: 'verify',
        title: 'Verify the install',
        prose: [
          'Render one component inside the theme provider to prove that the peer dependencies resolve and the stylesheet loads. The snippet below imports two packages and renders both.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/installation.tsx'],
    related: {
      packages: ['@ho-dev/primitives', '@ho-dev/theme', '@ho-dev/tokens'],
      components: ['Button'],
    },
    sources: [
      'docs/architecture/ads-010-release.md',
      'docs/superpowers/specs/dependency-ownership-architecture.md',
      'docs/architecture/contracts/primitives.md',
    ],
  },
  {
    slug: 'getting-started/theming',
    section: 'Getting Started',
    title: 'Theming',
    summary:
      'ThemeProvider from @ho-dev/theme switches the whole application between light and dark by writing the .dark class on the root element, which every dark: utility in the component packages matches.',
    order: 3,
    sections: [
      {
        id: 'provider',
        title: 'Wrap the application once',
        prose: [
          'ThemeProvider is exported by @ho-dev/theme and wraps the next-themes provider with two defaults: attribute="class" and defaultTheme="light". Import it from @ho-dev/theme rather than from next-themes, and render it once above anything that reads the theme.',
          'useTheme, also exported by @ho-dev/theme, returns the active theme and the setter. The package re-exports it from next-themes so an application never declares next-themes itself.',
        ],
      },
      {
        id: 'dark-class',
        title: 'The .dark class contract',
        prose: [
          'With attribute="class" the active theme is a class on the html element: .dark while the dark theme is active, and no class while the light theme is active. The theme stylesheet declares the Tailwind variant as @custom-variant dark (&:where(.dark, .dark *)), so every dark: utility inside the subtree applies.',
          'This portal follows the same contract. Its root layout renders ThemeProvider with attribute="class", enables the system theme and stores the reader choice under its own storage key; the theme toggle and the theme guard in the shell read the same hook.',
        ],
      },
      {
        id: 'stylesheets',
        title: 'Stylesheets and tokens',
        prose: [
          'The provider does not define colors. The token package owns the values, and the theme stylesheet imports @ho-dev/tokens/tokens.css together with Tailwind v4 and the base styles and utilities the components use. Import @ho-dev/theme/theme.css once at the application root.',
          'An application that needs another starting point passes defaultTheme, and an application that follows the operating system passes defaultTheme="system" with enableSystem. The props are documented on the theme package page.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/theming.tsx'],
    related: {
      packages: ['@ho-dev/theme', '@ho-dev/tokens'],
      components: ['Button'],
    },
    sources: ['docs/architecture/contracts/theme.md', 'docs/architecture/contracts/tokens.md'],
  },
];
