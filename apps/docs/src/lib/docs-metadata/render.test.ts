import { describe, expect, it } from 'vitest';

import { renderJson } from './render';

describe('renderJson', () => {
  it('renders deterministic bytes', () => {
    const first = renderJson({
      packages: { b: { version: '0.2.1', exports: ['z', 'a'] }, a: { version: '0.1.0' } },
      count: 2,
    });
    const second = renderJson({
      count: 2,
      packages: { a: { version: '0.1.0' }, b: { exports: ['z', 'a'], version: '0.2.1' } },
    });
    expect(first).toBe(second);
    expect(first.endsWith('\n')).toBe(true);

    const parsed = JSON.parse(first) as { packages: Record<string, unknown> };
    expect(Object.keys(parsed.packages)).toEqual(['a', 'b']);
  });

  it('keeps array order chosen by the builders', () => {
    expect(renderJson({ exports: ['a', 'z'] })).toBe(
      '{\n  "exports": [\n    "a",\n    "z"\n  ]\n}\n',
    );
  });
});
