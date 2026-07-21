export function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

export function assertDefined<T>(value: T, name?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(
      name
        ? `Expected "${name}" to be defined, but received ${typeof value}`
        : `Expected value to be defined, but received ${typeof value}`,
    );
  }
}
