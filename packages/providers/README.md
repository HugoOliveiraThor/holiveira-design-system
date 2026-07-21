# @holiveira/providers

React provider composition utilities.

## Purpose

ProviderComposer for nesting multiple providers without deep nesting in component trees. Architectural role: provider composition infrastructure.

## Installation

```bash
pnpm add @holiveira/providers
```

## Usage

```tsx
import { ProviderComposer } from '@holiveira/providers';

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProviderComposer providers={[<ThemeProvider />, <SidebarProvider />, <AuthProvider />]}>
      {children}
    </ProviderComposer>
  );
}
```

## Public API

| Export                  | Kind      | Description                                            |
| ----------------------- | --------- | ------------------------------------------------------ |
| `ProviderComposer`      | component | Nests an array of providers without deep tree wrapping |
| `ProviderComposerProps` | type      | Props for ProviderComposer                             |
| `ProviderProps`         | type      | Provider element type                                  |
| `ProviderTree`          | type      | Provider tree structure type                           |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Provider composition pattern, provider nesting utility.

**Does not own:** Individual provider implementations (those live in their respective packages — `@holiveira/theme`, `@holiveira/layouts`, `@holiveira/auth`), provider configuration, or provider lifecycle.

See `docs/architecture/contracts/providers.md` for ownership and dependency boundaries.

## References

- `@holiveira/types` — shared type foundation
