# @holiveira/types

Shared TypeScript type definitions.

## Purpose

Utility types (DeepPartial, Nullable), React helpers (WithChildren, WithClassName), and domain types (IconProps). Architectural role: type-level foundation for all packages. Types-only — zero runtime code.

## Installation

```bash
pnpm add @holiveira/types
```

## Usage

```ts
import type { DeepPartial, WithChildren, IconProps } from '@holiveira/types';
```

## Public API

### utility/

| Export               | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `DeepPartial<T>`     | Recursively marks all properties of `T` as optional    |
| `Nullable<T>`        | `T \| null \| undefined`                               |
| `AsyncReturnType<T>` | Extracts the resolved return type of an async function |

### react/

| Export                   | Description                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `WithChildren`           | Adds an optional `children?: React.ReactNode` prop                  |
| `WithClassName`          | Adds an optional `className?: string` prop                          |
| `WithTestId`             | Adds an optional `testId?: string` prop (rendered as `data-testid`) |
| `InferComponentProps<T>` | Infers the props type of a component                                |
| `SetStateActionType<T>`  | Shorthand for `Dispatch<SetStateAction<T>>`                         |

### domain/

| Export      | Description                               |
| ----------- | ----------------------------------------- |
| `IconProps` | Props type for inline SVG icon components |

## Architecture Contract

**Dependency Level:** 0 — Core.

**Owns:** Shared type definitions, React prop type helpers, domain-specific type contracts.

**Does not own:** Runtime code, business logic types, or package-specific type implementations.

See `docs/architecture/contracts/types.md` for ownership and dependency boundaries.

## References

None — Level 0 package with no internal dependencies.
