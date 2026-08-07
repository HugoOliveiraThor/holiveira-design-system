# @ho-dev/testing

Test utilities and render helpers.

## Purpose

Custom render with provider wrapping, mock utilities for router, session, media queries, and custom
matchers. Architectural role: testing infrastructure for framework consumers.

## Installation

```bash
pnpm add @ho-dev/testing
```

## Usage

```tsx
import { renderWithProviders, mockRouter } from '@ho-dev/testing';
import { MyComponent } from './MyComponent';

it('renders with providers', () => {
  renderWithProviders(<MyComponent />);
});

it('works with mocked router', () => {
  mockRouter('/dashboard');
  renderWithProviders(<MyComponent />);
});
```

## Public API

| Export                     | Kind     | Description                      |
| -------------------------- | -------- | -------------------------------- |
| `setupTestEnvironment`     | function | Global test environment setup    |
| `renderWithProviders`      | function | Custom render wrapping providers |
| `toBeWithinRange`          | function | Custom Jest/Vitest matcher       |
| `mockRouter`               | function | Next.js router mock              |
| `mockSearchParams`         | function | URL search params mock           |
| `mockSession`              | function | Auth session mock                |
| `createMockSession`        | function | Session factory                  |
| `mockHeaders`              | function | Request headers mock             |
| `mockResizeObserver`       | function | ResizeObserver mock              |
| `mockIntersectionObserver` | function | IntersectionObserver mock        |
| `mockMatchMedia`           | function | matchMedia mock                  |
| `createMockPointerEvent`   | function | PointerEvent factory             |
| `generateTestId`           | function | Test ID generator                |
| `waitForAnimation`         | function | Animation frame waiter           |

## Architecture Contract

**Dependency Level:** 5 — Platform.

**Owns:** Test infrastructure, provider composition for test renders, mock utilities, custom
matchers.

**Does not own:** Test runner configuration, coverage thresholds, application test suites, or test
data factories.

See `docs/architecture/contracts/testing.md` for ownership and dependency boundaries.

## References

- `@ho-dev/providers` — provider composition patterns
- `@ho-dev/theme` — theme provider for test renders
