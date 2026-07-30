# @holiveira/types

Shared TypeScript type definitions.

## Purpose

Utility types (DeepPartial, Nullable, AsyncReturnType), React helpers (WithChildren, WithClassName,
WithTestId, InferComponentProps, SetStateActionType), and domain types (IconProps). Architectural
role: type-level foundation for all packages. Types-only — zero runtime code.

## Installation

```bash
pnpm add @holiveira/types
```

## Architecture Contract

**Dependency Level:** 0 — Core. **Owns:** Shared type definitions, React prop type helpers,
domain-specific type contracts. **Does not own:** Runtime code, business logic types, or
package-specific type implementations. Contract: `docs/architecture/contracts/types.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/types.md`

## License

MIT
