# Package Contract: @ho-dev/testing

Level: 5 Category: Platform

## Purpose

Provide shared testing infrastructure for all @ho-dev/\* packages and the monolith application:
Vitest environment setup, generic React Testing Library render wrapper, custom matchers, Next.js
mocks, browser API mocks, and test utilities.

## Responsibilities

- Provide Vitest environment setup (browser API mocks for jsdom)
- Provide generic `renderWithProviders` that accepts providers as parameters (zero framework
  coupling)
- Provide custom Vitest matchers (`toBeWithinRange`)
- Provide Next.js navigation mocks (`mockRouter`, `mockSearchParams`)
- Provide Next.js headers mock (`mockHeaders`)
- Provide BetterAuth session mocks (`mockSession`, `createMockSession`)
- Provide browser API mocks (`mockResizeObserver`, `mockIntersectionObserver`, `mockMatchMedia`,
  `createMockPointerEvent`)
- Provide test ID generation (`generateTestId`)
- Provide async test helpers (`waitForAnimation`)
- Provide shared test types (`ProviderConfig`, `RenderWithProvidersOptions`, `MockSessionOptions`,
  `MockPointerEvent`, `MockClipboardEvent`, `SetupTestEnvironmentOptions`, `ToBeWithinRangeMatcher`,
  `MockRouter`, `MockSearchParams`, `MockSession`, `MockHeaders`)

## Non-Responsibilities

- Test files / test suites — live in consumer packages
- Database fixtures / seeds — cannot depend on @ho-dev/db
- API mocks — cannot depend on @ho-dev/api
- Playwright fixtures — deferred until first real E2E test exists
- `toHaveNoA11yViolations` — deferred until first real a11y test exists
- Jest configuration — Vitest is the standard, no Jest ever
- Coverage configuration — per-package concern
- Business-specific mock factories (e.g., `mockAdminUser`) — app-level concern
- Default exports — all exports are named
- `"use client"` directive — pure functions only

## Allowed Dependencies

- `@ho-dev/types` (L0) — shared types (optional, likely unused)
- `@ho-dev/utils` (L1) — test helpers (optional, likely unused)

## Forbidden Dependencies

All other @ho-dev/\* packages (theme, layouts, auth, api, db, primitives, ui, forms, charts,
providers, hooks, icons, i18n, tokens, config, constants).

## Entry Point

Single entry: `@ho-dev/testing`

- No sub-path exports (`/jest`, `/playwright`, `/shared` are NOT created)
- Sub-paths may be added later as non-breaking additive changes when justified

## Public API (26 exports)

### Environment

- `setupTestEnvironment` — Configures global browser API mocks for jsdom
- `SetupTestEnvironmentOptions` — Options type for setupTestEnvironment

### Render

- `renderWithProviders` — Generic wrapper factory
- `ProviderConfig` — Type for the providers configuration object
- `RenderWithProvidersOptions` — Extended render options type

### Matchers

- `toBeWithinRange` — Custom Vitest matcher: `expect(value).toBeWithinRange(min, max)`
- `ToBeWithinRangeMatcher` — Matcher type for toBeWithinRange

### Mocks — Router

- `mockRouter` — Creates a Vitest mock of Next.js `useRouter` return value
- `MockRouter` — Type for the mock router
- `mockSearchParams` — Creates a Vitest mock of Next.js `useSearchParams` return value
- `MockSearchParams` — Type for the mock search params

### Mocks — Session

- `mockSession` — Static mock BetterAuth session object (guest/default state)
- `MockSession` — Type for the mock session
- `createMockSession` — Factory for creating mock sessions
- `MockSessionOptions` — Options type for `createMockSession`

### Mocks — Headers

- `mockHeaders` — Creates a Vitest mock of Next.js `headers()` return value
- `MockHeaders` — Type for the mock headers

### Mocks — Browser

- `mockResizeObserver` — Mocks `window.ResizeObserver` with `vi.fn()`
- `mockIntersectionObserver` — Mocks `window.IntersectionObserver` with `vi.fn()`
- `mockMatchMedia` — Mocks `window.matchMedia` with `vi.fn()`
- `createMockPointerEvent` — Creates a plain object matching PointerEvent shape for tests
- `MockPointerEvent` — Type for the mock pointer event
- `MockClipboardEvent` — Type for the mock clipboard event

### Utilities

- `generateTestId` — Deterministic test ID generator
- `waitForAnimation` — Async helper that advances Vitest fake timers by a duration

## Testing Strategy

- Vitest only (no Jest, no Playwright in v0.1.0)
- All framework dependencies (vitest, @testing-library/react, @testing-library/jest-dom) are
  peerDependencies
- Consumer brings their own test runner and jsdom/happy-dom environment
