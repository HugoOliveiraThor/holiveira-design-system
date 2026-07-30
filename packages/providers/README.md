# @holiveira/providers

Provider composition utilities for flattening nested React context trees.

## Purpose

`ProviderComposer` nests an array of providers without deep tree wrapping, enabling applications to
define their provider stack as declarative data. Architectural role: provider composition
infrastructure.

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
| `ProviderComposerProps` | type      | Props for ProviderComposer (`{ providers, children }`) |
| `ProviderProps`         | type      | Standard `{ children }` interface for any provider     |
| `ProviderTree`          | type      | Ordered configuration array type                       |

## Peer Dependencies

| Package      | Version |
| ------------ | ------- |
| `react`      | ^19     |
| `typescript` | ^5      |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Provider composition pattern, provider nesting utility.

**Does not own:** Individual provider implementations (those live in their respective packages —
`@holiveira/theme`, `@holiveira/layouts`, `@holiveira/auth`), provider configuration, or provider
lifecycle.

Contract: `docs/architecture/contracts/providers.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/providers.md`

## License

MIT

## References

- `@holiveira/types` — shared type foundation
- `docs/architecture/provider-composition-pattern.md` — composition pattern documentation
