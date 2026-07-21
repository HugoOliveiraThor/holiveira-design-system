/**
 * Augments a component with an optional `testId` prop.
 *
 * Consumers pass `testId` and the component renders it as `data-testid`.
 *
 * @example
 * ```tsx
 * type Props = WithTestId;
 * // <div data-testid={testId} />
 * ```
 */
export type WithTestId = {
  testId?: string;
};
