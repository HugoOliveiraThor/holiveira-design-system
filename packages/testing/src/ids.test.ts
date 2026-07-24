import { describe, it, expect } from 'vitest';

import { generateTestId } from './index';

describe('generateTestId', () => {
  it('joins parts with hyphens', () => {
    expect(generateTestId('button', 'submit')).toBe('button-submit');
  });

  it('handles a single part', () => {
    expect(generateTestId('button')).toBe('button');
  });

  it('handles multiple parts', () => {
    expect(generateTestId('form', 'field', 'input')).toBe('form-field-input');
  });
});
