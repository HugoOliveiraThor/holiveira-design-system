# Package Contract: @holiveira/providers

Level: 3 Category: Composition

## Provider Independence Principle

**Providers must be independently removable.**

Removing one provider from the tree must never require modifications to another provider. Each
provider owns its domain exclusively. No provider depends on the presence, absence, or internal
state of another provider.

This principle guarantees:

- Apps can add/remove providers without cascading changes
- Providers can be tested in isolation
- The provider tree is a flat composition, not a dependency chain

## Provider Definition

A **provider** in the @holiveira framework is a React component that:

1. Accepts `{ children: ReactNode }` as its only required prop
2. Provides context or behavior to its entire descendant tree
3. Wraps `children` in its return value — never mutates or swallows them
4. Owns one domain and one domain only (single responsibility)
5. Must be independently removable per the Provider Independence Principle

A **provider composition utility** (this package) does not own any domain. It provides the machinery
to flatten provider trees, enabling applications to define their provider stack as declarative data
rather than deeply nested JSX.

## Provider Ownership Table

Every concrete provider belongs to the package that owns its underlying domain. @holiveira/providers
owns **none** of them.

| Provider              | Owner Package        | Step | Domain                                | Status       |
| --------------------- | -------------------- | ---- | ------------------------------------- | ------------ |
| `ThemeProvider`       | `@holiveira/theme`   | 9    | Theme switching (dark/light mode)     | ✅ Extracted |
| `SidebarProvider`     | `@holiveira/layouts` | 13   | Sidebar open/close state              | ✅ Extracted |
| `useSidebarContext`   | `@holiveira/layouts` | 13   | Sidebar context consumer              | ✅ Extracted |
| `AuthProvider`        | `@holiveira/auth`    | 18   | Authentication session + user state   | ⏳ Pending   |
| `ApiProvider`         | `@holiveira/api`     | 17   | API client configuration + caching    | ⏳ Pending   |
| `I18nProvider`        | `@holiveira/i18n`    | 6\*  | Translation scope / locale            | ⏳ Future    |
| `QueryClientProvider` | Application layer    | —    | Third-party (TanStack Query)          | App-owned    |
| `AppProviders`        | Application layer    | —    | App-specific provider composition     | App-owned    |
| `Toaster`             | Application layer    | —    | Toast notifications (sonner)          | App-owned    |
| `ErrorBoundary`       | Application layer    | —    | Error boundary (react-error-boundary) | App-owned    |

\* i18n currently formatting-only; provider deferred until translation support is added.

## Responsibilities

- Provide `ProviderComposer` — flatten a `ProviderTree` into a single React tree
- Provide `ProviderComposerProps` — props interface for ProviderComposer
- Provide `ProviderProps` type — standard `{ children }` interface
- Provide `ProviderTree` type — ordered configuration array

## Public API

- `ProviderComposer` — flattens a ProviderTree into a single React element
- `ProviderComposerProps` — props interface for ProviderComposer
- `ProviderProps` — standard `{ children }` interface for any provider
- `ProviderTree` — ordered configuration array type

## ProviderTree Ordering

The ProviderTree is ordered from **outermost** (index 0) to **innermost** (last index):

```
[ThemeProvider]       // index 0 — outermost (CSS variable scope)
  [SidebarProvider]   // index 1 — layout context
    [AuthProvider]    // index 2 — auth context
      [ApiProvider]   // index 3 — data fetching (may read auth)
        <App />       // children — application content
```

Ordering is the application's responsibility. The ProviderComposer respects the given order — it
never reorders. Validation of ordering constraints (`_validateProviderTree`) is deferred until auth
and api packages exist.

## Internal API

- `_composeProviders` — `reduceRight`-based implementation of ProviderComposer
- `_validateProviderTree` — runtime validation (deferred: duplicate detection, ordering rules)

## Allowed Dependencies

- `@holiveira/types` (L0) — shared contract types

## Forbidden Dependencies

- `@holiveira/theme` (L3) — owns ThemeProvider, not providers
- `@holiveira/hooks` (L2) — owns hooks, not providers
- `@holiveira/layouts` (L3) — owns SidebarProvider, not providers
- `@holiveira/auth` (L4) — owns AuthProvider, not providers
- `@holiveira/api` (L4) — owns ApiProvider, not providers
- `@holiveira/data` (L4) — data layer, not a provider concern
- Any application — apps compose providers; framework doesn't depend on apps

## Migration Sources

None — new utility. The monolith's `src/app/providers.tsx` stays in the application layer.

## Migration Note

`ThemeProvider` has been consolidated into `@holiveira/theme`. Applications must import it from
`@holiveira/theme`, not `@holiveira/providers`.

`SidebarProvider` and `useSidebarContext` have been extracted to `@holiveira/layouts` (Step 13).

## See Also

- `docs/architecture/provider-ownership.md` — ownership registry with third-party providers
- `docs/architecture/dependency-rules.json` — machine-readable dependency validation
- `docs/superpowers/specs/2026-07-19-monorepo-architecture-design.md` — architecture principles
