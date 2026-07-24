import { renderHook } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useClickOutside } from './index';

describe('useClickOutside', () => {
  const mockRef = { current: document.createElement('div') };
  let callback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    callback = vi.fn();
    document.body.appendChild(mockRef.current);
  });

  afterEach(() => {
    document.body.removeChild(mockRef.current);
  });

  it('returns a ref object', () => {
    const { result } = renderHook(() => useClickOutside(callback));
    expect(result.current).toBeDefined();
    expect('current' in result.current).toBe(true);
  });

  it('does not call callback when clicking inside the element', () => {
    renderHook(() => useClickOutside(callback));
    const clickEvent = new MouseEvent('mousedown', { bubbles: true });
    mockRef.current.dispatchEvent(clickEvent);
    expect(callback).not.toHaveBeenCalled();
  });

  it('does not call callback for keyboard events', () => {
    renderHook(() => useClickOutside(callback));
    const keyboardEvent = new KeyboardEvent('keydown');
    document.dispatchEvent(keyboardEvent);
    expect(callback).not.toHaveBeenCalled();
  });
});
