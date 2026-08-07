# @ho-dev/eslint

ESLint configuration presets.

## Purpose

Provides `configBase` (TypeScript + import ordering + naming convention rules) and `configReact`
(extends `configBase` with React, React Hooks, and JSX A11y rules). Architectural role: owns the
ESLint dependency domain — every ESLint plugin and parser used by its presets is declared and
versioned by this package.

## Installation

```bash
pnpm add @ho-dev/eslint
```

## Architecture Contract

**Dependency Level:** 1 — Foundation. **Owns:** ESLint presets and all plugin/parser dependencies,
language-specific rule conventions. **Does not own:** ESLint engine (CLI) — consumers provide
`eslint`. File selection, ignore patterns, and orchestration belong to the consumer's root config.
Contract: `docs/architecture/contracts/eslint.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/eslint.md`

## License

MIT
