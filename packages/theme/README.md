# @holiveira/theme

Design tokens and theme system.

## Purpose

ThemeProvider wrapping next-themes for dark mode support, useTheme hook for theme access. Architectural role: theme infrastructure bridging design tokens to runtime.

## Installation

```bash
pnpm add @holiveira/theme
```

Requires `next-themes` and `@holiveira/tokens`.

## Usage

```tsx
import { ThemeProvider, useTheme } from '@holiveira/theme';

function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle</button>;
}
```

## Public API

| Export               | Kind      | Description                                                 |
| -------------------- | --------- | ----------------------------------------------------------- |
| `ThemeProvider`      | component | Wraps next-themes ThemeProvider with design system defaults |
| `ThemeProviderProps` | type      | ThemeProvider configuration props                           |
| `useTheme`           | hook      | Re-exported from next-themes for theme state access         |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Theme provider implementation, dark mode integration, theme context, default theme configuration.

**Does not own:** Design token definitions (delegated to `@holiveira/tokens`), component-level theming, Tailwind CSS configuration, or theme switching UI.

See `docs/architecture/contracts/theme.md` for ownership and dependency boundaries.

## References

- `@holiveira/tokens` — design token source
- `@holiveira/types` — shared type definitions
