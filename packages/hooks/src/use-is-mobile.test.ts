import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useIsMobile } from './index';

describe('useIsMobile', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('returns false on a desktop-sized viewport', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true on a mobile-sized viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 800,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('adds an event listener for viewport changes', () => {
    const addEventListener = vi.fn();
    globalThis.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      media: '',
      addEventListener,
      removeEventListener: vi.fn(),
    });

    renderHook(() => useIsMobile());
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListener = vi.fn();
    globalThis.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      media: '',
      addEventListener: vi.fn(),
      removeEventListener,
    });

    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    expect(removeEventListener).toHaveBeenCalled();
  });
});
