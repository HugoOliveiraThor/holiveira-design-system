# @ho-dev/i18n

Locale-aware formatting utilities using native Intl APIs.

## Purpose

Date, currency, and message time formatting with locale-aware patterns. Pure functions only — no
global state, no providers, no singleton configuration. Architectural role: provides i18n formatting
primitives for the framework.

## Installation

```bash
pnpm add @ho-dev/i18n
```

## Usage

```ts
import { formatDate, formatCurrency } from '@ho-dev/i18n';

formatDate('2026-07-21', { locale: 'pt-BR' });
// "21/07/2026"

formatCurrency(1500, { currency: 'BRL', locale: 'pt-BR' });
// "R$ 1.500,00"
```

## Public API

| Export                     | Kind     | Description                      |
| -------------------------- | -------- | -------------------------------- |
| `formatDate`               | function | Locale-aware date formatting     |
| `formatCurrency`           | function | Locale-aware currency formatting |
| `formatMessageTime`        | function | Human-readable message timestamp |
| `Locale`                   | type     | Supported locale type            |
| `DateInput`                | type     | Input types for date formatting  |
| `FormatDateOptions`        | type     | Date format options              |
| `FormatCurrencyOptions`    | type     | Currency format options          |
| `FormatMessageTimeOptions` | type     | Message time format options      |

## Peer Dependencies

| Package      | Version |
| ------------ | ------- |
| `typescript` | ^5      |

## Architecture Contract

**Dependency Level:** 1 — Foundation.

**Owns:** Formatting utilities, locale type definitions, i18n formatting patterns.

**Does not own:** Translation file management, language switching UI, message catalogs, locale
detection, or any i18n library integration.

Contract: `docs/architecture/contracts/i18n.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/i18n.md`

## License

MIT

## References

- `@ho-dev/types` — shared type foundation
- `@ho-dev/utils` — numeric formatting moved from utils to i18n
