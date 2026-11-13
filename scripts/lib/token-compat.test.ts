import { describe, expect, it } from 'vitest';

import { buildSnapshot, type TokenSurface } from './token-surface';
import { createTokenFixture, defaultSurface } from './test-fixtures/token-root';
import { runCheck, runSnapshot } from './token-compat';

function surface(css: Record<string, string>, ts: Record<string, string>): TokenSurface {
  return { css, ts };
}

function deps(live: TokenSurface) {
  return { collectSurface: async () => live };
}

const SNAPSHOT = buildSnapshot(defaultSurface(), {
  version: '0.2.0',
  generatedAt: '2026-11-13',
});

const TWO_TOKENS = surface(
  { '--color-primary': '#5750f1', '--color-stroke': '#e6ebf1' },
  { 'colors.primary': '#5750f1', 'colors.stroke': '#e6ebf1' },
);

describe('token compatibility', () => {
  it('passes and reports the compared counts', async () => {
    const fixture = createTokenFixture({
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const result = await runCheck(fixture.root, deps(TWO_TOKENS));
    expect(result.code).toBe(0);
    expect(result.lines.join('\n')).toContain('2 css variables, 2 typescript paths');
  });

  it('lists every added path', async () => {
    const fixture = createTokenFixture();
    const live = surface(
      { ...defaultSurface().css, '--color-brand': '#000000' },
      { ...defaultSurface().ts, 'colors.brand': '#000000' },
    );
    const result = await runCheck(fixture.root, deps(live));
    const text = result.lines.join('\n');
    expect(result.code).toBe(1);
    expect(text).toContain('added (css):');
    expect(text).toContain('--color-brand');
    expect(text).toContain('added (ts):');
    expect(text).toContain('colors.brand');
    expect(text).not.toContain('removed');
  });

  it('lists every removed path', async () => {
    const fixture = createTokenFixture({
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const result = await runCheck(fixture.root, deps(defaultSurface()));
    const text = result.lines.join('\n');
    expect(result.code).toBe(1);
    expect(text).toContain('removed (css):');
    expect(text).toContain('--color-stroke');
    expect(text).toContain('removed (ts):');
    expect(text).toContain('colors.stroke');
  });

  it('lists a value change with both values', async () => {
    const fixture = createTokenFixture();
    const live = surface({ '--color-primary': '#111111' }, { 'colors.primary': '#111111' });
    const result = await runCheck(fixture.root, deps(live));
    const text = result.lines.join('\n');
    expect(result.code).toBe(1);
    expect(text).toContain('value-changed (css):');
    expect(text).toContain('--color-primary: #5750f1 -> #111111');
  });

  it('instructs a version bump and snapshot regeneration for additions', async () => {
    const fixture = createTokenFixture();
    const live = surface(
      { ...defaultSurface().css, '--color-brand': '#000000' },
      defaultSurface().ts,
    );
    const result = await runCheck(fixture.root, deps(live));
    const text = result.lines.join('\n');
    expect(text).toContain('bump the @ho-dev/tokens version');
    expect(text).toContain('generate:tokens:snapshot');
  });

  it('states that a new ADS is required for breaking drift', async () => {
    const fixture = createTokenFixture({ snapshot: SNAPSHOT });
    const result = await runCheck(fixture.root, deps(surface({}, {})));
    expect(result.code).toBe(1);
    expect(result.lines.join('\n')).toContain('new ADS');
  });

  it('never writes the snapshot during a check', async () => {
    const fixture = createTokenFixture();
    const before = fixture.readSnapshotRaw();
    await runCheck(fixture.root, deps(surface({ '--color-primary': '#111111' }, {})));
    expect(fixture.readSnapshotRaw()).toBe(before);
  });

  it('fails as malformed when a section is missing', async () => {
    const fixture = createTokenFixture({
      snapshot:
        '{"format":1,"package":"@ho-dev/tokens","version":"0.2.0","generatedAt":"2026-11-13","approval":null,"css":{}}',
    });
    const result = await runCheck(fixture.root, deps(defaultSurface()));
    expect(result.code).toBe(2);
    expect(result.lines.join('\n')).toContain('malformed');
  });

  it('aborts a breaking change without approval', async () => {
    const fixture = createTokenFixture({
      version: '0.3.0',
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const before = fixture.readSnapshotRaw();
    const result = await runSnapshot(fixture.root, {}, deps(defaultSurface()));
    expect(result.code).toBe(1);
    expect(result.lines.join('\n')).toContain('without an approval');
    expect(fixture.readSnapshotRaw()).toBe(before);
  });

  it('aborts when the approval file does not exist', async () => {
    const fixture = createTokenFixture({
      version: '0.3.0',
      approvalFiles: [],
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const before = fixture.readSnapshotRaw();
    const result = await runSnapshot(fixture.root, { approval: 'ads-012' }, deps(defaultSurface()));
    expect(result.code).toBe(1);
    expect(result.lines.join('\n')).toContain('no matching');
    expect(fixture.readSnapshotRaw()).toBe(before);
  });

  it('aborts a breaking change without a breaking bump', async () => {
    const fixture = createTokenFixture({
      version: '0.2.1',
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const before = fixture.readSnapshotRaw();
    const result = await runSnapshot(fixture.root, { approval: 'ads-012' }, deps(defaultSurface()));
    expect(result.code).toBe(1);
    expect(result.lines.join('\n')).toContain('not a breaking bump');
    expect(fixture.readSnapshotRaw()).toBe(before);
  });

  it('aborts an additive change without a version bump', async () => {
    const fixture = createTokenFixture();
    const before = fixture.readSnapshotRaw();
    const live = surface(
      { ...defaultSurface().css, '--color-brand': '#000000' },
      defaultSurface().ts,
    );
    const result = await runSnapshot(fixture.root, {}, deps(live));
    expect(result.code).toBe(1);
    expect(result.lines.join('\n')).toContain('patch bump');
    expect(fixture.readSnapshotRaw()).toBe(before);
  });

  it('verifies the approval file before rewriting', async () => {
    const fixture = createTokenFixture({
      version: '0.3.0',
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const result = await runSnapshot(fixture.root, { approval: 'ads-012' }, deps(defaultSurface()));
    expect(result.code).toBe(0);
    const written = JSON.parse(fixture.readSnapshotRaw() ?? '{}') as {
      approval: string | null;
      version: string;
    };
    expect(written.approval).toBe('ads-012');
    expect(written.version).toBe('0.3.0');
  });

  it('fails as a version regression', async () => {
    const fixture = createTokenFixture({
      version: '0.2.0',
      snapshot: buildSnapshot(defaultSurface(), {
        version: '0.3.0',
        generatedAt: '2026-11-13',
      }),
    });
    const check = await runCheck(fixture.root, deps(defaultSurface()));
    expect(check.code).toBe(2);
    expect(check.lines.join('\n')).toContain('regression');
    const snapshot = await runSnapshot(fixture.root, {}, deps(defaultSurface()));
    expect(snapshot.code).toBe(2);
    expect(snapshot.lines.join('\n')).toContain('regression');
  });

  it('leaves the snapshot byte-identical when nothing changed', async () => {
    const fixture = createTokenFixture();
    const before = fixture.readSnapshotRaw();
    const first = await runSnapshot(fixture.root, {}, deps(defaultSurface()));
    const second = await runSnapshot(fixture.root, {}, deps(defaultSurface()));
    expect(first.code).toBe(0);
    expect(second.code).toBe(0);
    expect(second.lines.join('\n')).toContain('already current');
    expect(fixture.readSnapshotRaw()).toBe(before);
  });
});
