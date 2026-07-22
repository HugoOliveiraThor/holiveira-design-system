import { vi } from 'vitest';

import type { MockPointerEvent } from '../types';

export function mockResizeObserver() {
  return vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

export function mockIntersectionObserver() {
  return vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn().mockReturnValue([]),
  }));
}

export function mockMatchMedia(matches?: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches: matches ?? false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn().mockReturnValue(false),
  }));
}

export function createMockPointerEvent(overrides?: Partial<MockPointerEvent>): MockPointerEvent {
  return {
    pointerType: 'mouse',
    clientX: 0,
    clientY: 0,
    button: 0,
    target: null,
    currentTarget: null,
    preventDefault: () => {},
    stopPropagation: () => {},
    ...overrides,
  };
}
