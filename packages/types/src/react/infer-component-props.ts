/**
 * Infers the props type of a React component.
 *
 * Useful when you need to reference a component's props without
 * hard-coding the type, especially with `typeof` and generic wrappers.
 *
 * @example
 * ```tsx
 * const Button = (props: { variant: "primary" | "secondary" }) => null;
 * type ButtonProps = InferComponentProps<typeof Button>;
 * // { variant: "primary" | "secondary" }
 * ```
 */
export type InferComponentProps<T> =
  T extends React.ComponentType<infer P> ? P : Record<string, unknown>;
