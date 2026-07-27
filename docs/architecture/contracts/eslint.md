# Package Contract: @holiveira/eslint

Level: 5 Category: Platform

## Purpose

Provide shared ESLint configuration presets for all @holiveira/\* packages and external consumers.
Owns the ESLint dependency domain — every ESLint plugin and parser required by its public presets is
declared and versioned by this package.

## Public API

| Export         | Type               | Description                                                                                                   |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `configBase`   | Flat config array  | TypeScript + import ordering + naming convention rules. Applies to `.ts`, `.mts`, `.cts` files.               |
| `configReact`  | Flat config array  | Strict superset of `configBase`. Adds React + React Hooks + JSX accessibility rules. Applies to `.tsx` files. |
| Future presets | Flat config arrays | Node, Vitest, Storybook, or technology-specific configs added over time via ADS amendment.                    |

Only configuration presets are part of the stable public API. Internal rule modules and utilities
are never exported.

## Responsibilities

- Provide `configBase` preset: TypeScript parser (`@typescript-eslint/parser`), TypeScript plugin
  (`@typescript-eslint/eslint-plugin`), import ordering rules (`eslint-plugin-import`), naming
  convention rules
- Provide `configReact` preset: extends `configBase` with React rules (`eslint-plugin-react`), React
  Hooks rules (`eslint-plugin-react-hooks`), JSX accessibility rules (`eslint-plugin-jsx-a11y`), and
  `react` setting (version detect)
- Maintain compatibility among every runtime dependency required by its public presets
- Declare and own every ESLint parser and plugin used by its presets as `dependencies`

## Non-Responsibilities

- Does not own the ESLint engine (CLI) — consumers provide `eslint` themselves
- Does not define file selection, ignore patterns, or orchestration — these belong to the consumer's
  root config
- No dependency on any other @holiveira/\* package in either direction
- No per-package ESLint configuration — the repository has exactly one config at root

## Non-Responsibilities (eslint-plugin-n / eslint-plugin-vitest)

These presets do not exist yet. They are not currently missing or deferred — they will enter the
public API when a future ADS amendment authorizes them.

## Allowed Dependencies

- `eslint` (peerDependency `>=9.0.0`)
- ESLint parser implementations (`@typescript-eslint/parser`)
- ESLint plugin packages (`@typescript-eslint/eslint-plugin`, `eslint-plugin-import`,
  `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`)
- Shared implementation utilities (e.g., `deepmerge` for config composition, if needed — currently
  unused)

## Forbidden Dependencies

- React runtime (`react`, `react-dom`)
- Next.js
- Storybook
- Testing frameworks (Vitest, Jest, etc.)
- Build framework coupling (Vite, webpack, turbopack)
- Any other @holiveira/\* package

## Entry Point

Single entry: `@holiveira/eslint`

- No sub-path exports (`/rules`, `/configs`) are created
- Sub-paths may be added later as non-breaking additive changes when justified

## Public API (2 exports)

### Base

- `configBase` — Flat config array: TypeScript parser + import ordering + naming conventions +
  reportUnusedDisableDirectives

### React

- `configReact` — Flat config array: strict superset of `configBase` with React, React Hooks, JSX
  a11y rules added

## Internal Architecture

### Layers

| Layer               | Responsibility                                   | Visibility                  |
| ------------------- | ------------------------------------------------ | --------------------------- |
| Configuration layer | Composes public presets from rule modules        | Public — exported by barrel |
| Rule layer          | Defines individual rule configurations by domain | Internal                    |

### Rule Modules

- `src/rules/typescript.ts` — TypeScript parser + plugin registration
- `src/rules/imports.ts` — Import ordering rules
- `src/rules/naming.ts` — Naming convention rules
- `src/rules/react.ts` — React JSX rules (recommended + overrides)
- `src/rules/hooks.ts` — React Hooks rules (recommended)
- `src/rules/a11y.ts` — JSX accessibility rules

### Preset Composition

```
configBase (root)
  ├── typescriptConfig
  ├── importsConfig
  └── namingConfig + linterOptions

configReact (extends configBase)
  ├── configBase (spread)
  ├── reactConfig
  ├── hooksConfig
  └── a11yConfig
```

## Ownership Boundaries

- **Owns**: ESLint dependency domain — every plugin and parser required by public presets
- **Does not own**: ESLint engine (CLI), file selection, ignore patterns, orchestration
- **Repository role**: all ESLint-related dependencies that would otherwise be phantom
- **Consumer role**: provides ready-to-use configurations that work after
  `npm install @holiveira/eslint`

## Publishing Contract

- Parser and plugin references use imported objects. String references are forbidden — they resolve
  from the consumer's context and fail under strict package managers.
- TypeScript declaration files included.
- Zero source imports required by consumers.
- Stable public entry points (`configBase`, `configReact`).

## Versioning Semantics

| Change                                                | Severity                                    |
| ----------------------------------------------------- | ------------------------------------------- |
| Adding a new preset                                   | Minor                                       |
| Adding a rule to an existing preset (new enforcement) | Minor (opt-in via upgrade)                  |
| Changing rule severity (warn → error, off → warn)     | Minor or Major depending on consumer impact |
| Changing parser behavior                              | Major                                       |
| Removing or renaming a preset                         | Major                                       |
| Disabling or weakening an existing rule               | Major                                       |

Breaking changes follow the same Changesets + semver process as all @holiveira/\* packages.

## Repository Integration

Root `eslint.config.mjs`:

- Imports presets from `@holiveira/eslint` public API
- Defines file selection (which files receive which preset)
- Defines ignore patterns
- Exports the final flat configuration array
- Never owns lint rules

**Monorepo integration note:** The repository root declares `@holiveira/eslint` in `devDependencies`
(`workspace:*`). This is required for the root `eslint.config.mjs` to import the package via Node.js
module resolution (pnpm requires explicit workspace dependency declarations). This is an
ARB-approved exception to ADS-003 §8.5. It does not violate the domain ownership principle — the
root owns orchestration, not plugins or parsers.

## Testing Strategy

- Preset composition invariant: `configReact` is a strict superset of `configBase` (verified by code
  review)
- No automated tests in v0.1.0 — behavioral validation through `npm run lint` on the repository
  itself
- Consumer simulation tests may be added later
