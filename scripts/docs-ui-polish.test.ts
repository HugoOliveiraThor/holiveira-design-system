import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const REPORTS = join(ROOT, 'docs', 'reports');
const EVIDENCE_DIR = join(REPORTS, 'docs-ui-polish');
const SCREEN_DIR = join(EVIDENCE_DIR, 'screens');
const PROBE_PATH = join(EVIDENCE_DIR, 'probe.json');
const REPORT_PATH = join(REPORTS, 'docs-ui-polish-2026-11-17.md');
const CAPTURE_SCRIPT = join(ROOT, 'apps', 'docs', 'scripts', 'capture-polish-screens.mjs');

/** The three widths and two themes the phase report has to evidence. */
const WIDTHS = [1440, 768, 390] as const;
const THEMES = ['light', 'dark'] as const;

const PAGES = ['landing', 'component'] as const;
const PREFIXES = ['', 'before-'] as const;

const SCREENS = PREFIXES.flatMap((prefix) =>
  PAGES.flatMap((page) =>
    WIDTHS.flatMap((width) =>
      THEMES.map((theme) => ({
        name: `${prefix}${page}-${width}-${theme}.png`,
        page,
        width,
        theme,
      })),
    ),
  ),
);

/**
 * Mean RGB brightness of a PNG, 0-255. Playwright writes 8-bit RGBA, so an
 * unfiltered scanline is a fixed stride; decoding here lets the test prove the
 * dark capture is actually dark instead of trusting the filename.
 */
function meanBrightness(path: string): number {
  const buffer = readFileSync(path);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  const bitDepth = buffer[24];
  const colorType = buffer[25];
  expect(bitDepth, `${path} bit depth`).toBe(8);
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
  expect(channels, `${path} color type`).toBeGreaterThan(0);

  const chunks: Buffer[] = [];
  let offset = 8;
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('latin1', offset + 4, offset + 8);
    const start = offset + 8;
    if (type === 'IDAT') chunks.push(buffer.subarray(start, start + length));
    offset = start + length + 4;
  }

  const raw = inflateSync(Buffer.concat(chunks));
  const stride = width * channels;
  let previous = Buffer.alloc(stride);
  let position = 0;
  let sum = 0;
  let samples = 0;

  for (let row = 0; row < height; row += 1) {
    const filter = raw[position];
    position += 1;
    const current = Buffer.from(raw.subarray(position, position + stride));
    position += stride;
    for (let index = 0; index < stride; index += 1) {
      const left = index >= channels ? current[index - channels] : 0;
      const up = previous[index];
      const corner = index >= channels ? previous[index - channels] : 0;
      if (filter === 1) current[index] = (current[index] + left) & 255;
      else if (filter === 2) current[index] = (current[index] + up) & 255;
      else if (filter === 3) current[index] = (current[index] + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) {
        const estimate = left + up - corner;
        const dl = Math.abs(estimate - left);
        const du = Math.abs(estimate - up);
        const dc = Math.abs(estimate - corner);
        const nearest = dl <= du && dl <= dc ? left : du <= dc ? up : corner;
        current[index] = (current[index] + nearest) & 255;
      }
    }
    for (let pixel = 0; pixel < width; pixel += 1) {
      const base = pixel * channels;
      sum += current[base] + current[base + 1] + current[base + 2];
      samples += 3;
    }
    previous = current;
  }

  return sum / samples;
}

/** The width a PNG declares in its IHDR chunk. */
function pngWidth(path: string): number {
  const header = readFileSync(path).subarray(0, 24);
  expect(header.subarray(1, 4).toString('latin1'), `${path} is not a PNG`).toBe('PNG');
  return header.readUInt32BE(16);
}

/**
 * `docs/reports` is not versioned by this repository, like `.specs`. The phase
 * gate runs where `capture-polish-screens.mjs` wrote the evidence, so the
 * artifact assertions execute there; a checkout that never captured it has
 * nothing to read and skips them instead of failing on files git never carries.
 * The capture script itself is versioned and always checked.
 */
describe.runIf(existsSync(EVIDENCE_DIR))('docs ui polish evidence', () => {
  it('captures the landing and component screens', { timeout: 60_000 }, () => {
    expect(existsSync(SCREEN_DIR), SCREEN_DIR).toBe(true);
    const files = readdirSync(SCREEN_DIR).filter((file) => file.endsWith('.png'));
    expect(files.sort()).toEqual(SCREENS.map((screen) => screen.name).sort());

    for (const screen of SCREENS) {
      const path = join(SCREEN_DIR, screen.name);
      expect(statSync(path).size, screen.name).toBeGreaterThan(0);
      expect(pngWidth(path), screen.name).toBe(screen.width);
    }

    // A swapped or mis-themed pair must fail: dark is materially darker.
    for (const prefix of PREFIXES) {
      for (const page of PAGES) {
        for (const width of WIDTHS) {
          const light = meanBrightness(join(SCREEN_DIR, `${prefix}${page}-${width}-light.png`));
          const dark = meanBrightness(join(SCREEN_DIR, `${prefix}${page}-${width}-dark.png`));
          expect(dark, `${prefix}${page}-${width}`).toBeLessThan(light - 20);
        }
      }
    }
  });

  it('records the computed font, palette and overflow', { timeout: 60_000 }, () => {
    expect(existsSync(PROBE_PATH), PROBE_PATH).toBe(true);
    const probe = JSON.parse(readFileSync(PROBE_PATH, 'utf8')) as {
      capturedAt: string;
      basePath: string;
      pages: Record<
        string,
        {
          url: string;
          fontFamily: string;
          palette: Record<string, string>;
          darkPalette?: Record<string, string>;
          overflowAt390: { viewport: number; scrollWidth: number; overflows: boolean };
        }
      >;
    };

    expect(probe.basePath).toBe('/holiveira-design-system/docs');
    expect(new Date(probe.capturedAt).toString()).not.toBe('Invalid Date');
    expect(Object.keys(probe.pages).sort()).toEqual(['component', 'landing']);

    for (const [name, page] of Object.entries(probe.pages)) {
      expect(page.fontFamily.split(',')[0].trim().toLowerCase(), name).toContain('satoshi');
      for (const role of [
        '--portal-canvas',
        '--portal-surface',
        '--portal-border',
        '--portal-ink',
        '--portal-body',
        '--portal-primary',
      ]) {
        expect(page.palette[role], `${name} ${role}`).toBeTruthy();
      }
      expect(page.overflowAt390.overflows, name).toBe(false);
      expect(page.overflowAt390.viewport, name).toBe(390);
      expect(page.overflowAt390.scrollWidth, name).toBeLessThanOrEqual(page.overflowAt390.viewport);
    }

    const landing = probe.pages.landing;
    expect(landing.darkPalette?.['--portal-canvas']).toBeTruthy();
    expect(landing.darkPalette?.['--portal-canvas']).not.toBe(landing.palette['--portal-canvas']);
    expect(landing.url).toBe('/holiveira-design-system/docs/');
    expect(probe.pages.component.url).toBe('/holiveira-design-system/docs/components/button/');
  });

  it('records the approval before the merge', () => {
    expect(existsSync(REPORT_PATH), REPORT_PATH).toBe(true);
    const report = readFileSync(REPORT_PATH, 'utf8');

    expect(report).toMatch(/publish only after the maintainer approves/i);
    expect(report).toMatch(/approval gate/i);
    for (const screen of SCREENS) {
      expect(report, screen.name).toContain(`screens/${screen.name}`);
    }
    expect(report).toMatch(/probe\.json/);
  });

  it('ships the capture script that produces the evidence', () => {
    expect(existsSync(CAPTURE_SCRIPT), CAPTURE_SCRIPT).toBe(true);
    const script = readFileSync(CAPTURE_SCRIPT, 'utf8');
    expect(script).toContain('${PREFIX}${target.name}-${width}-${theme}.png');
    expect(script).toContain('probe.json');
    expect(script).toContain('document.fonts.ready');
  });
});
