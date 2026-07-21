# @holiveira/i18n

Internationalization utilities.

## Purpose

Date, currency, and message time formatting with locale-aware patterns. Architectural role: provides i18n formatting primitives for the framework.

## Installation

```bash
pnpm add @holiveira/i18n
```

## Usage

```ts
import { formatDate, formatCurrency } from '@holiveira/i18n';

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
| `formatMessageTime`        | function | Message timestamp formatting     |
| `Locale`                   | type     | Supported locale type            |
| `DateInput`                | type     | Input types for date formatting  |
| `FormatDateOptions`        | type     | Date format options              |
| `FormatCurrencyOptions`    | type     | Currency format options          |
| `FormatMessageTimeOptions` | type     | Message time format options      |

## Architecture Contract

**Dependency Level:** 1 — Foundation.

**Owns:** Formatting utilities, locale type definitions, i18n formatting patterns.

**Does not own:** Translation file management, language switching UI, message catalogs, or locale detection.

See `docs/architecture/contracts/i18n.md` for ownership and dependency boundaries.

## References

- `@holiveira/types` — shared type foundation
