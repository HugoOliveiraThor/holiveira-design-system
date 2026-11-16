import { describe, expect, it, vi } from 'vitest';

import { ensureBrowser } from './ensure-browser.mjs';

function logger() {
  return { error: vi.fn() };
}

describe('ensure-browser', () => {
  it('installs the browser only when it is missing', () => {
    const installed = vi.fn(() => 0);
    const present = ensureBrowser({
      executable: '/cache/chromium',
      exists: () => true,
      install: installed,
      log: logger(),
    });
    expect(present).toBe(0);
    expect(installed).not.toHaveBeenCalled();

    const log = logger();
    const missing = ensureBrowser({
      executable: '/cache/chromium',
      exists: () => false,
      install: () => 0,
      log,
    });
    expect(missing).toBe(0);
    expect(log.error).toHaveBeenCalledWith(expect.stringContaining('installing it now'));

    const failedLog = logger();
    const failed = ensureBrowser({
      executable: '/cache/chromium',
      exists: () => false,
      install: () => 1,
      log: failedLog,
    });
    expect(failed).toBe(1);
    expect(failedLog.error).toHaveBeenCalledWith(expect.stringContaining('install failed'));
  });
});
