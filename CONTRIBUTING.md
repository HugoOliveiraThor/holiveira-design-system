# Contributing to Holiveira

## Development Setup

```bash
git clone https://github.com/HugoOliveiraThor/holiveira-design-system.git
cd holiveira-design-system
pnpm install
cp .env.example .env
pnpm run db:generate
```

### Requirements

- Node.js 22+
- pnpm 11+
- PostgreSQL (for Prisma-generated code; `DATABASE_URL` env var required)

### Running Quality Gates

```bash
pnpm run all-checks
```

This runs the complete validation pipeline: formatting, linting, type checking, builds, tests,
bundle size checks, export validation, and dependency checks.

### Development Servers

```bash
pnpm run dev:storybook    # Storybook on localhost:6006
pnpm run test:watch       # Vitest in watch mode
```

## Repository Structure

```
packages/    — 19 design system packages (source of truth)
apps/        — Consumer applications (Storybook, consumer-test)
docs/        — Architecture documentation, specifications, contracts
```

## Coding Standards

- **File names**: kebab-case (`button.tsx`, `use-click-outside.ts`)
- **Components**: PascalCase, matching file name (`Button` in `button.tsx`)
- **Hooks**: `use` prefix (`useClickOutside`)
- **Exports**: Named exports only — no `export default`
- **Imports**: `@ho-dev/*` first, then external, then relative

### Conventions by Domain

| Package              | Convention                                |
| -------------------- | ----------------------------------------- |
| `@ho-dev/primitives` | cva variants, forwardRef, a11y attributes |
| `@ho-dev/forms`      | react-hook-form integration, Zod schemas  |
| `@ho-dev/hooks`      | Return ref + callback pattern             |

## Making Changes

### Architecture Governance

Holiveira follows [SPEC-GOVERNANCE-001](docs/superpowers/specs/architecture-governance-workflow.md).
All changes must follow the mandatory workflow:

```
Implementation → Reports → Architecture Audit → ARB Approval → Next Stage
```

Architecture changes (new specs, public API changes, dependency ownership changes) require
Architecture Review Board (ARB) approval.

### Changeset Workflow

Every change that affects a published package requires a changeset:

```bash
pnpm changeset
```

Select the affected packages and choose the bump type:

- **patch** — Bug fixes, documentation, non-public-internal changes
- **minor** — New features, non-breaking API additions
- **major** — Breaking changes to public API

Changesets are version-controlled and accumulate until a Version PR is created automatically.

### Before Submitting

1. Run `pnpm run all-checks` — all gates must pass
2. Add a changeset if the change affects published packages
3. Update package contracts if public API changed
4. Update the technical debt registry if needed

## Dependency Ownership

Every third-party dependency has exactly one Holiveira owner package. Consumer packages depend on
the Holiveira package, never on the third-party library directly.

| Third-party              | Owner            |
| ------------------------ | ---------------- |
| next-themes              | `@ho-dev/theme`  |
| class-variance-authority | `@ho-dev/utils`  |
| react-hook-form          | `@ho-dev/forms`  |
| apexcharts               | `@ho-dev/charts` |

See [ADS-003b](docs/superpowers/specs/dependency-ownership-architecture.md) for the full
architecture.

## Documentation

- [Architecture](docs/architecture/) — Specifications, ADRs, contracts
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system) — Interactive component
  docs
- [Security Policy](SECURITY.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
