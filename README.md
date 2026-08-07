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

## Quick Start

```bash
pnpm add @ho-dev/primitives @ho-dev/theme
```

```tsx
import { ThemeProvider } from '@ho-dev/theme';
import { Button } from '@ho-dev/primitives';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Get Started</Button>
    </ThemeProvider>
  );
}
```

## What is Holiveira

Holiveira is a composable, engineering-first Design System for professional web applications. It is
a monorepo of independent npm packages under the `@ho-dev/*` namespace — install only what you use,
nothing more.

The project is React-first and Next.js-optimized, with built-in professional application
infrastructure: authentication, authorization with RBAC, forms with validation, charting, theming
with dark mode, and application layouts.

Every decision is documented in specifications, ADRs, and contracts. Public APIs are governed by
explicit rules. Standards are intentional, not accidental. Holiveira is not defined by feature count
— it is defined by engineering quality.

Holiveira is not a template, a starter kit, or a copy-paste component library. It is a long-term
engineering investment designed for a 10+ year lifecycle.

## Ecosystem

### Public Packages

| Package              | Description                                              | Category    |
| -------------------- | -------------------------------------------------------- | ----------- |
| `@ho-dev/types`      | Shared TypeScript type definitions                       | Core        |
| `@ho-dev/config`     | Application configuration utilities                      | Core        |
| `@ho-dev/constants`  | Shared constants and route definitions                   | Core        |
| `@ho-dev/tokens`     | Design token definitions and raw values                  | Foundation  |
| `@ho-dev/utils`      | Utility functions (cn, cva, format, guards)              | Foundation  |
| `@ho-dev/i18n`       | Locale-aware formatting using native Intl APIs           | Foundation  |
| `@ho-dev/eslint`     | ESLint configuration presets                             | Foundation  |
| `@ho-dev/providers`  | Provider composition utility                             | Foundation  |
| `@ho-dev/hooks`      | React hooks (clickOutside, isMobile, focusTrap)          | Primitives  |
| `@ho-dev/icons`      | Tree-shakeable SVG icon components                       | Primitives  |
| `@ho-dev/primitives` | Accessible UI primitives (Button, Table, Dropdown, etc.) | Primitives  |
| `@ho-dev/theme`      | Theme provider with dark mode support                    | Composition |
| `@ho-dev/forms`      | Form system with react-hook-form + Zod validation        | Composition |
| `@ho-dev/charts`     | Chart components wrapping ApexCharts                     | Composition |
| `@ho-dev/layouts`    | Application shell components (Sidebar, Header)           | Composition |
| `@ho-dev/ui`         | Composite UI components (Breadcrumb, Card)               | Composition |

### Private Packages

| Package           | Description                                   |
| ----------------- | --------------------------------------------- |
| `@ho-dev/auth`    | Authentication and authorization (BetterAuth) |
| `@ho-dev/api`     | Typed fetch-based API client                  |
| `@ho-dev/db`      | Prisma ORM client singleton                   |
| `@ho-dev/testing` | Shared testing infrastructure                 |

## Architecture

Holiveira follows a five-level dependency hierarchy. Lower levels never import from higher levels.
Every dependency has a documented owner. Every architectural decision has a written rationale.

```
Core (Level 0)
  └── Foundation (Level 1)
        └── Primitives (Level 2)
              └── Composition (Level 3)
                    └── Services (Level 4)
```

- **Core** — Type definitions and configuration. Zero runtime dependencies.
- **Foundation** — Utility packages, design tokens, ESLint presets, i18n formatters.
- **Primitives** — Atomic components (Button, Table) and hooks. Building blocks for all higher-level
  components.
- **Composition** — Composite components and application shells (Forms, Charts, Layouts, Theme).
- **Services** — Backend infrastructure (Auth, API client, Database). Private packages.

See [docs/architecture/](docs/architecture/) for specifications, ADRs, and package contracts.

## Development

### Requirements

- **Node.js** 22+
- **pnpm** 11+
- **PostgreSQL** (for Prisma-generated code; `DATABASE_URL` env var required)

### Setup

```bash
git clone https://github.com/HugoOliveiraThor/holiveira-design-system.git
cd holiveira-design-system
pnpm install
cp .env.example .env
pnpm run db:generate
```

### Commands

| Command                  | Purpose                                            |
| ------------------------ | -------------------------------------------------- |
| `pnpm run all-checks`    | Complete repository validation (all quality gates) |
| `pnpm run dev:storybook` | Start Storybook development server                 |
| `pnpm run build`         | Build all packages                                 |
| `pnpm run test`          | Run test suite                                     |
| `pnpm run typecheck`     | TypeScript compilation check                       |
| `pnpm run format:check`  | Prettier compliance check                          |
| `pnpm run lint`          | ESLint check                                       |

### Toolchain

- **Turbo** — Orchestrates builds with dependency-aware caching. All packages compile via `tsc`.
- **pnpm** — Workspace management with `workspace:*` protocol for inter-package dependencies.
- **Storybook** — Interactive component development and documentation at
  [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system).
- **Changesets** — Independent per-package versioning. Run `pnpm changeset` to record changes.
- **Vitest** — Test runner with jsdom environment and Testing Library integration.

## Releases

Holiveira uses [Changesets](https://github.com/changesets/changesets) for independent per-package
semantic versioning. Each package has its own MAJOR.MINOR.PATCH — a breaking change in
`@ho-dev/charts` does not force a major bump in `@ho-dev/types`.

The release pipeline is fully automated:

1. Contributors run `pnpm changeset` to record changes
2. A Version PR is automatically created when changesets accumulate on `main`
3. Merging the PR triggers quality gates → consumer validation → npm publish
4. All packages carry npm provenance attestation

Releases follow a graduated path: `beta` → `rc` → `latest` (GA).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, coding standards, and the changeset
workflow.

## Community

- [Issues](https://github.com/HugoOliveiraThor/holiveira-design-system/issues) — Bug reports and
  feature requests
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system) — Interactive component
  documentation
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md) — Reporting vulnerabilities

## License

[MIT](LICENSE)
