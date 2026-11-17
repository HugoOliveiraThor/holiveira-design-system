import '@testing-library/jest-dom/vitest';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it, vi } from 'vitest';

const fontFactory = vi.hoisted(() =>
  vi.fn(() => ({ className: 'satoshi-class', variable: 'font-satoshi-variable' })),
);

vi.mock('next/font/local', () => ({ default: fontFactory }));

import { satoshi, satoshiConfig } from './satoshi';

describe('satoshi font', () => {
  it('loads Satoshi through next/font with a metric fallback', () => {
    expect(fontFactory).toHaveBeenCalledTimes(1);
    expect(fontFactory).toHaveBeenCalledWith(satoshiConfig);
    expect(satoshiConfig).toMatchObject({
      src: './Satoshi-Variable.woff2',
      weight: '300 900',
      style: 'normal',
      display: 'swap',
      variable: '--font-satoshi',
      adjustFontFallback: 'Arial',
      preload: true,
    });
    expect(satoshiConfig.fallback).toEqual(['ui-sans-serif', 'system-ui', 'sans-serif']);
    expect(satoshi.variable).toBe('font-satoshi-variable');

    const asset = join(process.cwd(), 'apps', 'docs', 'src', 'fonts', 'Satoshi-Variable.woff2');
    expect(readFileSync(asset).subarray(0, 4).toString('latin1')).toBe('wOF2');
    const license = join(process.cwd(), 'apps', 'docs', 'src', 'fonts', 'LICENSE-Satoshi.txt');
    expect(readFileSync(license, 'utf8')).toMatch(/ITF Free Font License/);
  });
});
