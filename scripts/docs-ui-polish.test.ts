import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
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

const SCREENS = PAGES.flatMap((page) =>
  WIDTHS.flatMap((width) =>
    THEMES.map((theme) => ({ name: `${page}-${width}-${theme}.png`, width, theme })),
  ),
);

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
  it('captures the landing and component screens', () => {
    expect(existsSync(SCREEN_DIR), SCREEN_DIR).toBe(true);
    const files = readdirSync(SCREEN_DIR).filter((file) => file.endsWith('.png'));
    expect(files.sort()).toEqual(SCREENS.map((screen) => screen.name).sort());

    for (const screen of SCREENS) {
      const path = join(SCREEN_DIR, screen.name);
      expect(statSync(path).size, screen.name).toBeGreaterThan(0);
      expect(pngWidth(path), screen.name).toBe(screen.width);
    }
  });

  it('records the computed font, palette and overflow', () => {
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
      expect(page.fontFamily, name).toMatch(/Satoshi/);
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
    expect(script).toContain('${target.name}-${width}-${theme}.png');
    expect(script).toContain('probe.json');
    expect(script).toContain('document.fonts.ready');
  });
});
