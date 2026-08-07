# Package Contract: @ho-dev/constants

Level: 0 Category: Core

## Purpose

Provide shared constants, route definitions, query keys, and magic strings used across packages.

## Responsibilities

- Define route paths and patterns
- Define TanStack Query key factories
- Define localStorage/sessionStorage keys
- Define event names and action types
- Define numeric/string constants used across packages

## Allowed Dependencies

- (none)

## Forbidden Dependencies

- Any package or application

## Public API

| Export                | Type         | Description                                   |
| --------------------- | ------------ | --------------------------------------------- |
| `ROUTES`              | const object | Object tree of all route paths (13 paths)     |
| `ROUTE_PATTERNS`      | const object | RegExp + path array for route matching        |
| `queryKeyFactory`     | function     | Generic TanStack Query key factory            |
| `STORAGE_KEYS`        | const object | localStorage/sessionStorage key constants     |
| `EVENTS`              | const object | Custom event name constants (currently empty) |
| `PAGE_SIZE`           | 10           | Default pagination page size                  |
| `DEBOUNCE_MS`         | 300          | Default debounce delay (ms)                   |
| `TOAST_DURATION`      | 5000         | Default toast display duration (ms)           |
| `MOBILE_BREAKPOINT`   | 850          | Mobile breakpoint in px                       |
| `MAX_FILE_SIZE`       | 1048576      | Max file upload size in bytes (1MB)           |
| `MIN_PASSWORD_LENGTH` | 8            | Minimum password length                       |

## Internal API

- (none — constants are inherently public)
