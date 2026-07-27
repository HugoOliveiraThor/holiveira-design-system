# Package Contract: @holiveira/utils

Level: 1 Category: Foundation

## Purpose

Provide general-purpose, framework-agnostic utility functions reusable across all @holiveira
packages and consuming applications. Foundation-level "standard library" with zero framework
coupling.

## Responsibilities

- Class name merging (`cn()`)
- Number formatting (compact, standard)
- String manipulation (slugify)
- Object manipulation (pick, omit, merge)
- Type guards and runtime assertions (isDefined, isPlainObject, assertDefined)
- Timing utilities (debounce, throttle)

## Excluded Responsibilities (moved to @holiveira/i18n)

The following are locale-aware and belong in the i18n package, not utils:

- Date formatting (`formatDate`, `formatMessageTime`)
- Currency formatting (`formatCurrency`)

## Allowed Dependencies

- `@holiveira/types` (L0) — shared types
- `clsx` — class name construction
- `tailwind-merge` — Tailwind class merging
- `class-variance-authority` — component variant definitions

## Forbidden Dependencies

- `dayjs`, `date-fns`, or any date/time library
- Any framework package at Level ≥ 2
- Any application

## CSS / Class Composition Module

The following APIs are organized under a dedicated CSS/Class Composition module:

- `cn(...inputs)` — Tailwind class name merging
- `cva(base, config)` — class variant authority (re-exported)
- `VariantProps` — type companion to cva

## Public API

- `cn(...inputs)` — Tailwind class name merging
- `cva(base, config)` — class variant definitions for components
- `VariantProps<T>` — type utility for cva variants
- `slugify(value)` — string to URL-safe slug
- `compactFormat(value)` — compact number format (e.g. 1.5K)
- `standardFormat(value)` — standard decimal format (e.g. 1,234.56)
- `pick(obj, keys)` — pick properties from object
- `omit(obj, keys)` — omit properties from object
- `merge(target, source)` — shallow object merge
- `isDefined(value)` — non-null/undefined check
- `isPlainObject(value)` — plain object check
- `assertDefined(value, name)` — runtime assertion with error
- `debounce(fn, ms)` — debounced function wrapper
- `throttle(fn, ms)` — throttled function wrapper

## Internal API

None. All locale-aware helpers moved to @holiveira/i18n.
