/** Extracts the resolved return type of an async function. */
export type AsyncReturnType<T extends (...args: never) => Promise<unknown>> =
  T extends (...args: never) => Promise<infer R> ? R : never;
