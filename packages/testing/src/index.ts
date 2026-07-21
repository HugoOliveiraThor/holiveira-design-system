export { setupTestEnvironment } from './setup';
export type { SetupTestEnvironmentOptions } from './setup';

export { renderWithProviders } from './render';
export type { ProviderConfig, RenderWithProvidersOptions } from './types';

export { toBeWithinRange } from './matchers';
export type { ToBeWithinRangeMatcher } from './matchers';

export { mockRouter, mockSearchParams } from './mocks/router';
export type { MockRouter, MockSearchParams } from './mocks/router';

export { mockSession, createMockSession } from './mocks/session';
export type { MockSession } from './mocks/session';
export type { MockSessionOptions } from './types';

export { mockHeaders } from './mocks/headers';
export type { MockHeaders } from './mocks/headers';

export {
  mockResizeObserver,
  mockIntersectionObserver,
  mockMatchMedia,
  createMockPointerEvent,
} from './mocks/browser';

export { generateTestId } from './ids';

export { waitForAnimation } from './async';

export type { MockPointerEvent, MockClipboardEvent } from './types';
