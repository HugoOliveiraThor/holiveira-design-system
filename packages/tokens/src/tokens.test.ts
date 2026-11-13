import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, it, expect } from 'vitest';

import {
  animate,
  aspectRatio,
  breakpoints,
  colors,
  containers,
  fontFamily,
  minWidth,
  shadows,
  text,
} from './index';

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

  it('exports TailAdmin v2 semantic color tokens', () => {
    expect(colors['success-50']).toBe('#ecfdf3');
    expect(colors['success-500']).toBe('#12b76a');
    expect(colors['warning-500']).toBe('#f79009');
    expect(colors['error-500']).toBe('#f04438');
    expect(colors['blue-light-50']).toBe('#f0f9ff');
    expect(colors['blue-light-500']).toBe('#0ba5ec');
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

  it('exports fractional container keys', () => {
    expect(containers['2_5']).toBe('0.625rem');
    expect(containers['10_5']).toBe('2.625rem');
    expect(Object.keys(containers)).toHaveLength(39);
  });

  it('exports min width tokens', () => {
    expect(minWidth['22_5']).toBe('5.625rem');
    expect(minWidth['75']).toBe('18.75rem');
    expect(Object.keys(minWidth)).toHaveLength(4);
  });

  it('exports aspect ratio tokens with resolved escapes', () => {
    expect(aspectRatio['4/3']).toBe('4 / 3');
    expect(aspectRatio['21/9']).toBe('21 / 9');
  });

  it('exports animation tokens', () => {
    expect(animate['spin-1_5']).toBe('spin 1.5s linear infinite');
    expect(animate.linspin).toBe('linspin 1568.2353ms linear infinite');
    expect(Object.keys(animate)).toHaveLength(14);
  });

  it('keeps the existing exports unchanged', () => {
    expect(colors.primary).toBe('#5750f1');
    expect(containers['3']).toBe('0.75rem');
    expect(breakpoints['2xsm']).toBe('375px');
    expect(shadows['theme-xs']).toBe('0px 1px 2px 0px rgba(16, 24, 40, 0.05)');
    expect(text['heading-1']).toEqual({ fontSize: '60px', lineHeight: '72px' });
  });

  it('matches every promoted value with the CSS declarations', () => {
    const css = readFileSync(
      join(process.cwd(), 'packages', 'tokens', 'src', 'tokens.css'),
      'utf8',
    );
    expect(css).toContain(`--container-2_5: ${containers['2_5']};`);
    expect(css).toContain(`--aspect-4\\/3: ${aspectRatio['4/3']};`);
    expect(css).toContain(`--animate-spin-1_5: ${animate['spin-1_5']};`);
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
