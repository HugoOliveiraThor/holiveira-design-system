# Package Contract: @holiveira/types

Level: 0 Category: Core

## Purpose

Provide shared TypeScript types used across all framework packages.

## Responsibilities

- Define utility types (DeepPartial, Nullable, AsyncReturnType)
- Define React pattern types (WithChildren, WithClassName, WithTestId, InferComponentProps,
  SetStateActionType)
- Define domain types (IconProps)

## Allowed Dependencies

- (none)

## Forbidden Dependencies

- Any package or application

## Public API

### Utility

| Export               | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `DeepPartial<T>`     | Recursively marks all properties of `T` as optional    |
| `Nullable<T>`        | `T \| null \| undefined`                               |
| `AsyncReturnType<T>` | Extracts the resolved return type of an async function |

### React

| Export                   | Description                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `WithChildren`           | Adds an optional `children?: React.ReactNode` prop                  |
| `WithClassName`          | Adds an optional `className?: string` prop                          |
| `WithTestId`             | Adds an optional `testId?: string` prop (rendered as `data-testid`) |
| `InferComponentProps<T>` | Infers the props type of a React component                          |
| `SetStateActionType<T>`  | Shorthand for `Dispatch<SetStateAction<T>>`                         |

### Domain

| Export      | Description                               |
| ----------- | ----------------------------------------- |
| `IconProps` | Props type for inline SVG icon components |

## Internal API

- (none — types package has no runtime code)

## Deferred Types

The following types were specified in the original architecture but are **deferred** until their
consuming packages (Data, API) are extracted in Steps 16-17:

| Type              | Status   | Consumer        |
| ----------------- | -------- | --------------- |
| `Pagination`      | Deferred | @holiveira/data |
| `Sort`            | Deferred | @holiveira/data |
| `Filter`          | Deferred | @holiveira/data |
| `PageResponse<T>` | Deferred | @holiveira/api  |
| `DataStatus`      | Deferred | @holiveira/data |
| `OrderDirection`  | Deferred | @holiveira/data |
| `ViewMode`        | Deferred | @holiveira/ui   |
