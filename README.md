# Holiveira

> Build professional applications on a foundation designed to last.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Why Holiveira Exists

Holiveira was born from repeatedly rebuilding the same architectural foundation across multiple
real-world professional applications. Project structure, authentication, layouts, forms, design
tokens, themes, infrastructure, development standards, and governance were recreated from scratch
each time. The project exists to capture those engineering decisions into a reusable platform so
every new project starts from architecture instead of boilerplate.

Historically, the project's package architecture was extracted from a NextAdmin application — a
Next.js admin dashboard template. That origin gave Holiveira its practical focus: every package,
component, and pattern comes from real-world use, not idealized demos.

## Quick Start

**Note:** Holiveira is in pre-alpha. Packages are not yet published to npm. To explore components
locally, see the Getting Started section below.

```bash
pnpm add @holiveira/primitives @holiveira/theme
```

```tsx
import { ThemeProvider } from '@holiveira/theme';
import { Button } from '@holiveira/primitives';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary" label="Get Started" />
    </ThemeProvider>
  );
}
```

## What is Holiveira

Holiveira is a composable, engineering-first Design System for professional web applications. It is
a monorepo of independent npm packages under the `@holiveira/*` namespace — install only what you
use, nothing more.

The project is React-first and Next.js-optimized, with built-in professional application
infrastructure: authentication, authorization with RBAC, forms with validation, charting, theming
with dark mode, and application layouts.

Every decision is documented in specifications, ADRs, and contracts. Public APIs are governed by
explicit rules. Standards are intentional, not accidental. Holiveira is not defined by feature count
— it is defined by engineering quality.

Holiveira is not a template, a starter kit, or a copy-paste component library. It is a long-term
engineering investment designed for a 10+ year lifecycle.

## Ecosystem

**Core** — `@holiveira/config` (centralized configuration for all packages), `@holiveira/constants`
(shared constants, route definitions, and magic strings), `@holiveira/types` (shared TypeScript
types used across all framework packages)

**Foundation** — `@holiveira/i18n` (locale-aware formatting utilities using native `Intl` APIs),
`@holiveira/tokens` (single source of truth for all visual primitives), `@holiveira/utils`
(general-purpose, framework-agnostic utility functions)

**Primitives** — `@holiveira/hooks` (framework-agnostic React hooks for common patterns),
`@holiveira/icons` (consistent, tree-shakeable icon system with accessible SVG icon components),
`@holiveira/primitives` (atomic, accessible UI primitives as the building blocks for all
higher-level components)

**Composition** — `@holiveira/charts` (chart component primitives abstracting the underlying
charting library), `@holiveira/forms` (form system integrating React Hook Form + Zod validation with
themed form components), `@holiveira/layouts` (page-level layout components for dashboard and
application shells), `@holiveira/providers` (provider composition utility to flatten a provider tree
into a single React tree), `@holiveira/theme` (runtime theme system that consumes Design Tokens and
exposes theme context to all components), `@holiveira/ui` (composite UI components that combine
multiple primitives into ready-to-use patterns)

**Services** — `@holiveira/api` (typed fetch-based API client with error handling, timeout, and
retry), `@holiveira/auth` (authentication and authorization using Better Auth), `@holiveira/db`
(Prisma ORM client singleton for database access)

**Platform** — `@holiveira/testing` (shared testing infrastructure for all packages)

## Getting Started

To explore Holiveira locally before packages are published:

```bash
git clone https://github.com/holiveira/design-system.git
cd design-system
pnpm install
pnpm turbo storybook
```

Wrap your application with the theme provider:

```tsx
import { ThemeProvider } from '@holiveira/theme';

export default function Layout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

Explore all components interactively in [Storybook](apps/storybook/).

## Architecture

Holiveira follows a five-level dependency hierarchy: Core, Foundation, Primitives, Composition,
Services, and Platform. Lower levels never import from higher levels. Every dependency has a
documented owner. Every architectural decision has a written rationale.

## Contributing

Contributions are welcome.

## License

[MIT](LICENSE)
