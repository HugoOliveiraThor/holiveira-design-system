export interface SetupTestEnvironmentOptions {
  mockResizeObserver?: boolean;
  mockIntersectionObserver?: boolean;
  mockMatchMedia?: boolean;
}

export function setupTestEnvironment(options?: SetupTestEnvironmentOptions) {
  const opts = {
    mockResizeObserver: options?.mockResizeObserver ?? true,
    mockIntersectionObserver: options?.mockIntersectionObserver ?? true,
    mockMatchMedia: options?.mockMatchMedia ?? true,
  };

  if (opts.mockResizeObserver) {
    class ResizeObserverMock {
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
    }
    globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  }

  if (opts.mockIntersectionObserver) {
    class IntersectionObserverMock {
      readonly root: Element | null = null;
      readonly rootMargin: string = '0px';
      readonly thresholds: ReadonlyArray<number> = [0];
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }
    globalThis.IntersectionObserver =
      IntersectionObserverMock as unknown as typeof IntersectionObserver;
  }

  if (opts.mockMatchMedia) {
    Object.defineProperty(globalThis, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  }
}
