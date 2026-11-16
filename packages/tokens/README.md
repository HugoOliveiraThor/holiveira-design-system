# @ho-dev/tokens

Design tokens.

## Purpose

Color palette, container dimensions, breakpoints, font family, typography scale, and shadows.
Architectural role: single source of truth for visual primitives. CSS tokens available via
`@ho-dev/tokens/tokens.css`.

## Installation

```bash
pnpm add @ho-dev/tokens
```

## Public API

| Export        | Kind   | Description                        |
| ------------- | ------ | ---------------------------------- |
| `colors`      | object | Colour palette keyed by CSS suffix |
| `containers`  | object | Container width scale              |
| `breakpoints` | object | Responsive breakpoints             |
| `fontFamily`  | object | Font stacks                        |
| `text`        | object | Typography scale                   |
| `shadows`     | object | Shadow scale                       |
| `minWidth`    | object | Minimum width scale                |
| `aspectRatio` | object | Aspect ratio scale                 |
| `animate`     | object | Animation scale                    |
| `TokenValue`  | type   | Token value union                  |
| `ColorKey`    | type   | Colour key union                   |
| `Breakpoint`  | type   | Breakpoint key union               |

## Architecture Contract

**Dependency Level:** 1 — Foundation. **Owns:** Raw token definitions, CSS custom property
generation via tokens.css, design token type definitions. **Does not own:** Theme logic (delegated
to @ho-dev/theme), component styling, Tailwind CSS configuration. Contract:
`docs/architecture/contracts/tokens.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [Playground](https://HugoOliveiraThor.github.io/holiveira-design-system/playground/) — Full
  product screens composed from the packages
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/tokens.md`

## License

MIT
