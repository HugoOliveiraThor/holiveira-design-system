import type { GuideDoc } from '../../lib/docs-metadata/guides';

export const foundationGuides: GuideDoc[] = [
  {
    slug: 'foundations/tokens',
    section: 'Foundations',
    title: 'Design tokens',
    summary:
      '@ho-dev/tokens is the single source of truth for colors, containers, breakpoints, typography, shadows, dimensions and animations, exported both as CSS custom properties and as TypeScript objects.',
    order: 4,
    sections: [
      {
        id: 'surface',
        title: 'The two surfaces',
        prose: [
          'The package publishes CSS custom properties through @ho-dev/tokens/tokens.css: the color, container, text, shadow, breakpoint, font, min-width, aspect and animate families. It publishes the same values as TypeScript objects through its barrel: colors, containers, breakpoints, fontFamily, text, shadows, minWidth, aspectRatio and animate.',
          'The component packages style themselves with the Tailwind utilities these custom properties generate, so a component and a token move together. The category table below is generated from the recorded exports of the package; no category is typed into this page by hand.',
        ],
      },
      {
        id: 'keys',
        title: 'TypeScript keys follow the CSS names',
        prose: [
          'A TypeScript key is the CSS suffix after the token prefix, with CSS escapes resolved: the container token for 2.5 is containers["2_5"], the aspect-ratio token whose CSS name contains a slash is aspectRatio["4/3"], and the slow spin animation is animate["spin-1_5"].',
          'The typography scale keeps its fontSize and lineHeight fields, so text["heading-6"] is an object rather than a single string. The ColorKey, Breakpoint and TokenValue types name the key space for consumers that need it.',
        ],
      },
      {
        id: 'compatibility',
        title: 'Tokens are a compatibility contract',
        prose: [
          'Token names and values are protected. The tokens gate compares the live surface with packages/tokens/tokens.snapshot.json and fails on an addition, a removal or a changed value; a removal or a changed value is breaking and needs an ARB-approved ADS before the snapshot is recorded.',
          'The same rule reaches this portal: the tokens guide reads its categories from generated metadata and never lists them by hand, so a token change cannot leave the documentation behind.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/tokens.tsx'],
    related: {
      packages: ['@ho-dev/tokens', '@ho-dev/theme'],
      components: ['Button'],
    },
    sources: ['docs/architecture/contracts/tokens.md'],
  },
  {
    slug: 'foundations/styling',
    section: 'Foundations',
    title: 'Styling and Tailwind',
    summary:
      'The packages style themselves with Tailwind CSS v4 utilities generated from the token layer; cn merges conflicting classes and cva declares variants, both from @ho-dev/utils.',
    order: 5,
    sections: [
      {
        id: 'tailwind',
        title: 'Tailwind enters through the theme stylesheet',
        prose: [
          'Tailwind CSS v4 arrives through the @import tailwindcss rule in @ho-dev/theme/theme.css, which also imports @ho-dev/tokens/tokens.css and declares the dark variant. Import that stylesheet once at the application root; the components assume its utilities and base styles are present.',
          'The stylesheet ships custom utilities such as no-scrollbar and custom-scrollbar together with border and body defaults, so a consuming application starts from the same baseline as this portal.',
        ],
      },
      {
        id: 'cn',
        title: 'cn composes and merges',
        prose: [
          'cn(...inputs) wraps clsx and tailwind-merge. It composes conditional classes and keeps the last conflicting utility, which is why a component accepts className and lets the caller override its own spacing or color.',
          'The component packages style themselves through cn. The utilities package owns clsx, tailwind-merge and class-variance-authority, so those libraries are not application dependencies.',
        ],
      },
      {
        id: 'cva',
        title: 'cva declares variants',
        prose: [
          'cva(base, config) declares the variants of a component next to it, and VariantProps derives the prop type from that declaration. Both are exported by @ho-dev/utils, and the primitives package builds the Button variants on top of them.',
        ],
      },
      {
        id: 'motion',
        title: 'Motion and reduced motion',
        prose: [
          'Every animation respects prefers-reduced-motion. ADS-008 makes the motion-safe: prefix on animation utilities an invariant, and this portal repeats the rule in its global stylesheet so a reduced-motion reader sees no transition.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/styling.tsx'],
    related: {
      packages: ['@ho-dev/utils', '@ho-dev/theme', '@ho-dev/tokens'],
      components: ['Badge'],
    },
    sources: [
      'docs/architecture/contracts/utils.md',
      'docs/architecture/contracts/theme.md',
      'docs/architecture/ads-008-accessibility-excellence.md',
      'docs/superpowers/specs/dependency-ownership-architecture.md',
    ],
  },
  {
    slug: 'foundations/accessibility',
    section: 'Foundations',
    title: 'Accessibility',
    summary:
      'The design system targets WCAG 2.2 Level AA at the component level: components self-declare their ARIA, every interactive component is keyboard accessible, and accessibility is tested rather than inspected.',
    order: 6,
    sections: [
      {
        id: 'target',
        title: 'The target and who owns what',
        prose: [
          'ADS-008 targets WCAG 2.2 Level AA at the component level. A component guarantees that it is accessible when it is used correctly; the application guarantees landmark structure, page titles and focus order across components.',
        ],
      },
      {
        id: 'aria',
        title: 'Components self-declare ARIA',
        prose: [
          'A component renders the ARIA it needs, so the consumer does not have to know it. Dropdown declares role="menu", aria-expanded and aria-haspopup; Sidebar declares its navigation label and hides itself with aria-hidden and inert while collapsed; Breadcrumb marks the current page with aria-current.',
          'When a consumer needs to override an attribute, the component props extend the native HTML attributes so aria-* passes through. The rule from ADS-008 is that a component self-declares and the consumer extends, never rebuilds.',
        ],
      },
      {
        id: 'keyboard',
        title: 'Keyboard and focus',
        prose: [
          'Every interactive component is keyboard accessible: Enter for an action, Escape to close, arrow keys to move inside a composite widget. Focus traps and focus restoration live in @ho-dev/hooks as useFocusTrap and useFocusRestore and are reused by Dropdown and MultiSelect.',
          'Field moves focus to the first control of the field when an error appears, and associates the label, the description and the error message with that control through the control id and aria-describedby.',
        ],
      },
      {
        id: 'testing',
        title: 'Tested, not inspected',
        prose: [
          'Axe-core runs on the component tests, and this portal runs axe on every component page in both themes. Keyboard behaviour is tested programmatically. The Storybook accessibility addon stays informational, and CI never depends on a human looking at it.',
        ],
      },
      {
        id: 'rules',
        title: 'Rules that survive review',
        prose: [
          'Prefer native semantics over custom ARIA, never put aria-hidden on a focusable element, never replace a button with a div, and keep a visible focus indicator. Color is never the only carrier of information, and motion respects prefers-reduced-motion.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/accessibility.tsx'],
    related: {
      packages: ['@ho-dev/hooks', '@ho-dev/primitives', '@ho-dev/forms'],
      components: ['Dropdown'],
    },
    sources: [
      'docs/architecture/ads-008-accessibility-excellence.md',
      'docs/architecture/contracts/hooks.md',
    ],
  },
];
