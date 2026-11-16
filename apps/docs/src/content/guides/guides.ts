import type { GuideDoc } from '../../lib/docs-metadata/guides';

export const guideFamilyGuides: GuideDoc[] = [
  {
    slug: 'guides/providers',
    section: 'Guides',
    title: 'Provider composition',
    summary:
      'ProviderComposer from @ho-dev/providers flattens an ordered provider tree into one React element, so an application declares its provider stack as data instead of deeply nested JSX.',
    order: 7,
    sections: [
      {
        id: 'independent',
        title: 'A provider owns one domain',
        prose: [
          'A provider in this system accepts children as its only required prop, wraps them without swallowing or mutating them, and owns one domain. The package contract turns that into a rule: providers are independently removable, so removing one from the stack never requires a change to another.',
        ],
      },
      {
        id: 'composer',
        title: 'The tree, not the nesting',
        prose: [
          'ProviderComposer takes a tree of provider and options pairs and reduces it into a single element. Index 0 is the outermost provider: ThemeProvider wraps SidebarProvider, which wraps the children. The composer respects the order it is given and never reorders.',
          'The type of the tree is public: ProviderTree is the ordered array of provider components, ProviderProps is the children-only contract every provider must accept, and ProviderComposerProps is the props interface of the composer.',
        ],
      },
      {
        id: 'ownership',
        title: 'Which package owns which provider',
        prose: [
          'The composition utility owns no domain; each concrete provider belongs to the package that owns its domain. ThemeProvider comes from @ho-dev/theme and SidebarProvider from @ho-dev/layouts, and an application imports both directly. The package page lists the exports and their derived kinds.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/providers.tsx'],
    related: {
      packages: ['@ho-dev/providers', '@ho-dev/theme', '@ho-dev/layouts'],
      components: ['ProviderComposer'],
    },
    sources: [
      'docs/architecture/contracts/providers.md',
      'docs/architecture/provider-composition-pattern.md',
      'docs/superpowers/specs/dependency-ownership-architecture.md',
    ],
  },
  {
    slug: 'guides/forms',
    section: 'Guides',
    title: 'Forms and validation',
    summary:
      '@ho-dev/forms composes a form from Form, Field, Label, Description, ErrorMessage and Submit, and re-exports the react-hook-form hooks and the zod resolver an application needs for validation.',
    order: 8,
    sections: [
      {
        id: 'composition',
        title: 'One field, every part',
        prose: [
          'Form wraps a native form element, disables browser validation and prevents the default submit before it calls onSubmit. Field owns the vertical stack: it renders the label, clones the control to inject its id, aria-describedby and aria-invalid, then renders the description and the error message.',
          'Submit wraps the primitives Button with type="submit", so a form has one submit control with the design system styling and keyboard behaviour.',
        ],
      },
      {
        id: 'messages',
        title: 'Errors are announced',
        prose: [
          'ErrorMessage renders nothing while there is no error; with an error it publishes role="alert" and aria-live="polite". Field moves focus to the first control of the field when an error appears, so a keyboard user lands on the field a screen reader has just announced.',
        ],
      },
      {
        id: 'rhf',
        title: 'React Hook Form and Zod',
        prose: [
          'The package re-exports useForm, useController and useFormContext from react-hook-form together with their types, and it exports zodResolver for schema validation. An application therefore does not declare react-hook-form or zod itself: both are peer dependencies of @ho-dev/forms.',
        ],
      },
      {
        id: 'widgets',
        title: 'Widgets and styles',
        prose: [
          'MultiSelect and DatePicker are the two compound widgets. DatePicker wraps flatpickr and needs its stylesheet, @ho-dev/forms/date-picker-styles.css, imported once by the application.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/forms.tsx'],
    related: {
      packages: ['@ho-dev/forms', '@ho-dev/primitives'],
      components: ['Form', 'Field'],
    },
    sources: [
      'docs/architecture/contracts/forms.md',
      'docs/architecture/ads-008-accessibility-excellence.md',
    ],
  },
  {
    slug: 'guides/charts',
    section: 'Guides',
    title: 'Charts',
    summary:
      '@ho-dev/charts exposes BarChart, AreaChart and PieChart, typed over ChartSeries, theme-aware and already wrapped in lazy loading with a ChartSkeleton fallback.',
    order: 9,
    sections: [
      {
        id: 'surface',
        title: 'Three charts, two types',
        prose: [
          'The package exports BarChart, AreaChart and PieChart, the ChartSkeleton placeholder, and the ChartSeries and ChartDataPoint types. A series carries a name and a list of x and y points; PieChart takes a numeric series with a label list instead.',
          'The six accompanying prop types are part of the public API, and ApexCharts types stay inside the package: an application never imports from apexcharts to type a chart.',
        ],
      },
      {
        id: 'lazy',
        title: 'Lazy by default',
        prose: [
          'Each chart is exported through a lazy wrapper: the component renders inside Suspense with ChartSkeleton as its fallback. A consumer imports AreaChart and gets the lazy behaviour, so there is no next/dynamic call to add on the application side.',
        ],
      },
      {
        id: 'theme',
        title: 'Theme and accessibility',
        prose: [
          'The charts read the design system theme and apply its colors, so light and dark switch without a second configuration. The package owns apexcharts and react-apexcharts as peer dependencies, and the consumer provides them.',
          'A chart needs a label: AreaChart renders role="img" with the label as its accessible name and renders the optional description as screen-reader text, so a chart drawn by a third-party library still has a name. Import @ho-dev/charts/chart-styles.css for the ApexCharts overrides.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/charts.tsx'],
    related: {
      packages: ['@ho-dev/charts', '@ho-dev/theme'],
      components: ['AreaChart'],
    },
    sources: ['docs/architecture/contracts/charts.md', 'docs/architecture/contracts/theme.md'],
  },
  {
    slug: 'guides/layouts',
    section: 'Guides',
    title: 'Application layouts',
    summary:
      '@ho-dev/layouts provides the application shell: SidebarProvider owns the collapsed and mobile state, Sidebar and Header compose it, and HeaderToggle and HeaderActions are the header slots.',
    order: 10,
    sections: [
      {
        id: 'shell',
        title: 'The shell and its state',
        prose: [
          'SidebarProvider owns one piece of state, collapsed on desktop and open on mobile, and exposes it through useSidebarContext. Sidebar reads that state to show or hide the navigation, and HeaderToggle toggles the mobile drawer.',
        ],
      },
      {
        id: 'accessibility',
        title: 'The shell keeps the accessibility',
        prose: [
          'Sidebar is a labeled navigation landmark that hides itself with aria-hidden and inert while collapsed, so its links leave the tab order. HeaderToggle publishes aria-expanded and carries a screen-reader-only label. The consumer supplies the navigation items and their roles.',
        ],
      },
      {
        id: 'auth',
        title: 'Authentication layouts',
        prose: [
          'The package also ships AuthLayout and four authentication screens: SignInForm, SignUpForm, PasswordResetForm and TwoStepVerificationForm. They are documented through this guide, and the package page lists each export with its source file and story.',
        ],
      },
      {
        id: 'responsive',
        title: 'Responsive behaviour stays with the consumer',
        prose: [
          'The layout does not decide the responsive behaviour of an application: the consumer composes it, and @ho-dev/hooks provides useIsMobile for the same breakpoint the shell uses.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/layouts.tsx'],
    related: {
      packages: ['@ho-dev/layouts', '@ho-dev/hooks', '@ho-dev/theme'],
      components: ['Sidebar', 'Header'],
    },
    sources: [
      'docs/architecture/contracts/layouts.md',
      'docs/architecture/ads-008-accessibility-excellence.md',
    ],
  },
  {
    slug: 'guides/icons',
    section: 'Guides',
    title: 'Icons',
    summary:
      '@ho-dev/icons ships one tree-shakeable SVG component per icon, each inheriting currentColor and rendering aria-hidden unless a title gives it meaning.',
    order: 11,
    sections: [
      {
        id: 'surface',
        title: 'One component per icon',
        prose: [
          'Every icon is a forwardRef SVG component with a fixed viewBox and the shared IconWrapper underneath. The component accepts the standard SVG props plus size and title, inherits currentColor so the parent color reaches it, and is tree-shakeable because each icon is its own module.',
        ],
      },
      {
        id: 'a11y',
        title: 'Decorative by default',
        prose: [
          'IconWrapper renders aria-hidden and role="presentation" when no title is given, which is the right default for an icon that decorates a label. Pass title when the icon carries meaning on its own: it then renders role="img" with an accessible name. A control that shows only an icon needs its own label.',
        ],
      },
      {
        id: 'families',
        title: 'What the set covers',
        prose: [
          'The set covers navigation (chevrons, arrows, menu, close), status (alert, check, dot), actions (trash, pencil, download, upload, preview), and product screens (home, user, settings, chart, authentication). The package page lists every export from the barrel with its source file and story.',
        ],
      },
      {
        id: 'consumers',
        title: 'Icons inside the component packages',
        prose: [
          'Alert, Dropdown, Checkbox and Select import from @ho-dev/icons, as do the authentication layouts, so the components already carry the icons their states need. Applications add an icon package when they compose their own controls, not to restyle a component that ships one.',
        ],
      },
    ],
    snippets: ['apps/docs/src/examples/guides/icons.tsx'],
    related: {
      packages: ['@ho-dev/icons', '@ho-dev/primitives', '@ho-dev/layouts'],
      components: ['Alert'],
    },
    sources: [
      'docs/architecture/contracts/icons.md',
      'docs/architecture/ads-008-accessibility-excellence.md',
    ],
  },
];
