# @ho-dev/providers

Provider composition utilities for flattening nested React context trees.

## Purpose

`ProviderComposer` nests an ordered `ProviderTree` without deep tree wrapping, enabling applications
to define their provider stack as declarative data. The providers themselves live in the package
that owns their domain, such as `ThemeProvider` in `@ho-dev/theme` and `SidebarProvider` in
`@ho-dev/layouts`. Architectural role: provider composition infrastructure.

## Installation

```bash
pnpm add @ho-dev/providers
```

## Usage

```tsx
import { SidebarProvider } from '@ho-dev/layouts';
import { ProviderComposer, type ProviderTree } from '@ho-dev/providers';
import { ThemeProvider } from '@ho-dev/theme';

import type { ReactNode } from 'react';

const tree: ProviderTree = [
  [ThemeProvider, { defaultTheme: 'light' }],
  [SidebarProvider, { defaultCollapsed: false }],
];

function AppProviders({ children }: { children: ReactNode }) {
  return <ProviderComposer tree={tree}>{children}</ProviderComposer>;
}
```

## Public API

| Export                  | Kind      | Description                                            |
| ----------------------- | --------- | ------------------------------------------------------ |
| `ProviderComposer`      | component | Nests an array of providers without deep tree wrapping |
| `ProviderComposerProps` | type      | Props for ProviderComposer (`{ tree, children }`)      |
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
`@ho-dev/theme`, `@ho-dev/layouts`, `@ho-dev/auth`), provider configuration, or provider lifecycle.

Contract: `docs/architecture/contracts/providers.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [Playground](https://HugoOliveiraThor.github.io/holiveira-design-system/playground/) — Full
  product screens composed from the packages
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/providers.md`

## License

MIT

## References

- `@ho-dev/types` — shared type foundation
- `docs/architecture/contracts/providers.md` — contract and provider ordering
