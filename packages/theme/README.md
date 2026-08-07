# @ho-dev/theme

Design tokens and theme system.

## Purpose

ThemeProvider wrapping next-themes for dark mode support, useTheme hook for theme access, and
theme.css with base styles and custom utilities. Architectural role: theme infrastructure bridging
design tokens to runtime — the single source of truth for light/dark mode across the design system.

## Installation

```bash
pnpm add @ho-dev/theme
```

Requires `next-themes` and `@ho-dev/tokens`.

## Usage

```tsx
import { ThemeProvider, useTheme } from '@ho-dev/theme';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle to {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
}
```

Import theme CSS in your app root:

```css
@import '@ho-dev/theme/theme.css';
```

## Public API

| Export               | Kind      | Description                                                           |
| -------------------- | --------- | --------------------------------------------------------------------- |
| `ThemeProvider`      | component | Wraps next-themes with `attribute="class"` and `defaultTheme="light"` |
| `ThemeProviderProps` | type      | ThemeProvider configuration props                                     |
| `useTheme`           | hook      | Re-exported from next-themes for theme state access                   |

**CSS:** `@ho-dev/theme/theme.css` — base styles, border compatibility, and custom utilities.

## Peer Dependencies

| Package       | Version |
| ------------- | ------- |
| `next-themes` | ^0.4.0  |
| `react`       | ^19.0.0 |
| `react-dom`   | ^19.0.0 |
| `typescript`  | ^5.0.0  |

## Bundle Size

| Budget                      | Limit | Enforcement |
| --------------------------- | ----- | ----------- |
| Tree-shaken (ThemeProvider) | 5 KB  | Warn        |
| Full package                | 5 KB  | Warn        |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Theme provider implementation, dark mode integration, theme context, default theme
configuration.

**Does not own:** Design token definitions (delegated to `@ho-dev/tokens`), component-level theming,
Tailwind CSS configuration, or theme switching UI (consumed by `@ho-dev/layouts`).

See `docs/architecture/contracts/theme.md` for ownership and dependency boundaries.

## Documentation

- **Storybook:**
  https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/utilities-theme
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- **Contract:** `docs/architecture/contracts/theme.md`

## License

MIT — see [LICENSE](../../LICENSE).

## References

- `@ho-dev/tokens` — design token source
- `@ho-dev/types` — shared type definitions
