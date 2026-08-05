import { describe, it, expect } from 'vitest';

import { colors, breakpoints, containers, fontFamily, text, shadows } from './index';

describe('tokens', () => {
  it('exports colors as a record of strings', () => {
    expect(typeof colors.primary).toBe('string');
    expect(colors.primary).toBe('#5750f1');
  });

  it('exports dark color tokens', () => {
    expect(colors.dark).toBe('#111928');
    expect(colors['dark-2']).toBe('#1f2a37');
  });

  it('exports semantic color tokens', () => {
    expect(colors.green).toBe('#22ad5c');
    expect(colors.red).toBe('#f23030');
  });

  it('exports breakpoints in px', () => {
    expect(breakpoints['2xsm']).toBe('375px');
    expect(breakpoints.xsm).toBe('425px');
    expect(breakpoints['3xl']).toBe('2000px');
  });

  it('exports container tokens as rem values', () => {
    expect(containers['3']).toBe('0.75rem');
    expect(containers['4']).toBe('1rem');
  });

  it('exports font family as a string', () => {
    expect(typeof fontFamily.sans).toBe('string');
    expect(fontFamily.sans).toContain('Satoshi');
  });

  it('exports text tokens with fontSize and lineHeight', () => {
    expect(text['heading-1'].fontSize).toBe('60px');
    expect(text['heading-1'].lineHeight).toBe('72px');
  });

  it('exports shadow tokens as CSS box-shadow strings', () => {
    expect(typeof shadows['1']).toBe('string');
    expect(shadows['1']).toContain('0px');
    expect(typeof shadows.default).toBe('string');
  });

  it('exports the theme-xs shadow token', () => {
    expect(shadows['theme-xs']).toBe('0px 1px 2px 0px rgba(16, 24, 40, 0.05)');
  });

  it('uses TypeScript const assertion for type safety', () => {
    expect(typeof colors.primary).toBe('string');
  });
});
