# Holiveira

> Build professional applications on a foundation designed to last.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Why Holiveira Exists

Holiveira was born from repeatedly rebuilding the same architectural foundation across multiple real-world professional applications. Project structure, authentication, layouts, forms, design tokens, themes, infrastructure, development standards, and governance were recreated from scratch each time.

The project exists to capture those engineering decisions into a reusable platform so every new project starts from architecture instead of boilerplate.

Historically, the project's package architecture was extracted from a NextAdmin application — a Next.js admin dashboard template. That origin gave Holiveira its practical focus: every package, component, and pattern comes from real-world use, not idealized demos.

## Quick Start

```bash
pnpm add @holiveira/ui @holiveira/theme
```

```tsx
import { ThemeProvider } from "@holiveira/theme"
import { Button } from "@holiveira/primitives"

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Get Started</Button>
    </ThemeProvider>
  )
}
```

## What is Holiveira

Holiveira is a composable, engineering-first Design System for professional web applications. It is a monorepo of independent npm packages under the `@holiveira/*` namespace — install only what you use, nothing more.

The project is React-first and Next.js-optimized, with built-in professional application infrastructure: authentication, authorization with RBAC, forms with validation, charting, theming with dark mode, and application layouts.

Every decision is documented in specifications, ADRs, and contracts. Public APIs are governed by explicit rules. Standards are intentional, not accidental. Holiveira is not defined by feature count — it is defined by engineering quality.

Holiveira is not a template, a starter kit, or a copy-paste component library. It is a long-term engineering investment designed for a 10+ year lifecycle.

## Ecosystem

**Core** — `@holiveira/types`, `@holiveira/config`, `@holiveira/constants`

**Foundation** — `@holiveira/tokens`, `@holiveira/utils`, `@holiveira/i18n`

**Primitives** — `@holiveira/hooks`, `@holiveira/icons`, `@holiveira/primitives`

**Composition** — `@holiveira/theme`, `@holiveira/ui`, `@holiveira/layouts`, `@holiveira/forms`, `@holiveira/charts`, `@holiveira/providers`

**Services** — `@holiveira/db`, `@holiveira/api`, `@holiveira/auth`

**Platform** — `@holiveira/testing`

Each package has a clear, single responsibility and documented dependency boundaries. Install only the packages you need.

## Getting Started

Install the packages you need:

```bash
pnpm add @holiveira/ui @holiveira/primitives @holiveira/theme
```

Wrap your application with the theme provider:

```tsx
import { ThemeProvider } from "@holiveira/theme"

export default function Layout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
```

Import and use components:

```tsx
import { Button } from "@holiveira/primitives"
import { Card } from "@holiveira/ui"
```

For authentication, forms, charts, and layouts, see the individual package documentation.

Explore all components interactively in [Storybook](apps/storybook/).

## Architecture

Holiveira follows a disciplined per-package monorepo architecture with five dependency levels. Lower levels never import from higher levels. Every dependency has a documented owner. Every architectural decision has a written rationale.

See [Architecture Documentation](docs/architecture/master-blueprint.md) for the full design.

## Contributing

Contributions are welcome. See [Engineering Standards](docs/architecture/master-blueprint.md) for the development workflow, architecture conventions, and quality gates.

## License

MIT
