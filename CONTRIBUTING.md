# Contributing to HO Design System

## Development Setup

```bash
git clone https://github.com/HugoOliveiraThor/holiveira-design-system.git
cd holiveira-design-system
pnpm install
cp .env.example .env
pnpm run db:generate
```

### Requirements

- Node.js 24 (see `.nvmrc`; packages declare `engines.node >= 22`)
- pnpm 11.3.0 (see `packageManager`)
- PostgreSQL (for Prisma-generated code; `DATABASE_URL` env var required)

### Running Quality Gates

```bash
pnpm run all-checks
```

This runs the complete validation pipeline: formatting, linting, documentation links, type checking,
builds, tests, bundle size checks, publish readiness, license scan, export validation, and
dependency checks.

### Development Servers

```bash
pnpm run dev              # Storybook on :6006 and Playground on :3000
pnpm run dev:storybook    # Storybook only
pnpm run test:watch       # Vitest in watch mode
```

## Repository Structure

```
packages/    — 20 design system packages (16 public, 4 private)
apps/        — Storybook, playground, and consumer-test
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

HO Design System follows SPEC-GOVERNANCE-001 (internal governance specification). All changes must
follow the mandatory workflow:

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

Changesets are committed with the change and accumulate on `main`. When a release is due, a
maintainer runs `pnpm changeset version`, which applies the bumps and updates the per-package
`CHANGELOG.md` files, then dispatches the manual **Publish** workflow. There is no automated Version
PR — the release is intentionally gated by a human.

Product-level history is tracked in the root [CHANGELOG.md](CHANGELOG.md).

### Before Submitting

1. Run `pnpm run all-checks` — all gates must pass
2. Add a changeset if the change affects published packages
3. Update package contracts if public API changed
4. Update the technical debt registry if needed

## Dependency Ownership

Every third-party dependency has exactly one HO Design System owner package. Consumer packages
depend on the HO Design System package, never on the third-party library directly.

| Third-party              | Owner            |
| ------------------------ | ---------------- |
| next-themes              | `@ho-dev/theme`  |
| class-variance-authority | `@ho-dev/utils`  |
| react-hook-form          | `@ho-dev/forms`  |
| apexcharts               | `@ho-dev/charts` |

See ADS-003b (dependency ownership architecture) for the full architecture.

## Documentation

- [Architecture](docs/architecture/) — Specifications, ADRs, contracts
- [Storybook](https://hugooliveirathor.github.io/holiveira-design-system/) — Interactive component
  docs
- [Playground](https://hugooliveirathor.github.io/holiveira-design-system/playground/) — Full
  product screens composed from the packages
- [Changelog](CHANGELOG.md) — Release history
- [Security Policy](SECURITY.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
