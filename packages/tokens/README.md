# @holiveira/tokens

Raw design token definitions.

## Purpose

Color palette, container dimensions, breakpoints, typography scale, and shadows. Architectural role: single source of truth for visual primitives.

## Installation

```bash
pnpm add @holiveira/tokens
```

## Usage

```css
@import '@holiveira/tokens/tokens.css';
```

```ts
import { colors, containers, breakpoints } from '@holiveira/tokens';
```

## Public API

| Export        | Type              | Description                                    |
| ------------- | ----------------- | ---------------------------------------------- |
| `colors`      | const object (59) | Color palette — named color tokens             |
| `ColorKey`    | type              | Union type of all color token keys             |
| `containers`  | const object (30) | Container dimension tokens (rem values)        |
| `breakpoints` | const object (3)  | Custom media query breakpoints                 |
| `Breakpoint`  | type              | Union type of all breakpoint keys              |
| `fontFamily`  | const object (1)  | Font stack definitions (Satoshi)               |
| `text`        | const object (9)  | Typography scale (fontSize + lineHeight pairs) |
| `shadows`     | const object (25) | Box-shadow token definitions                   |
| `TokenValue`  | type              | Generic string type for design token values    |

**CSS:** `@import "@holiveira/tokens/tokens.css"` provides all tokens as CSS custom properties via a Tailwind v4 `@theme` block (colors, containers, typography, shadows, animations, z-index, and more).

## Architecture Contract

**Dependency Level:** 1 — Foundation.

**Owns:** Raw token definitions, CSS custom property generation via `tokens.css`, design token type definitions.

**Does not own:** Theme logic (delegated to `@holiveira/theme`), component styling, or Tailwind CSS configuration.

See `docs/architecture/contracts/tokens.md` for ownership and dependency boundaries.

## References

None — Foundation level token source.
