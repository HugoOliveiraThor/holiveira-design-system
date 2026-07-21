import { expect } from 'vitest';

export interface ToBeWithinRangeMatcher {
  toBeWithinRange: (min: number, max: number) => void;
}

export function toBeWithinRange(
  received: number,
  min: number,
  max: number,
): { pass: boolean; message: () => string } {
  const pass = received >= min && received <= max;
  return {
    pass,
    message: () =>
      pass
        ? `expected ${received} not to be within range [${min}, ${max}]`
        : `expected ${received} to be within range [${min}, ${max}]`,
  };
}

expect.extend({ toBeWithinRange });
