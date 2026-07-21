/** Application route path constants organized by domain. */
export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
  },
  DASHBOARD: '/',
  CALENDAR: '/calendar',
  PROFILE: '/profile',
  FORMS: {
    ELEMENTS: '/forms/form-elements',
    LAYOUT: '/forms/form-layout',
  },
  TABLES: '/tables',
  SETTINGS: '/pages/settings',
  CHARTS: {
    BASIC: '/charts/basic-chart',
  },
  UI_ELEMENTS: {
    ALERTS: '/ui-elements/alerts',
    BUTTONS: '/ui-elements/buttons',
  },
} as const;

/** Route matching patterns for auth guards and redirect logic. */
export const ROUTE_PATTERNS = {
  /** Matches any path under `/auth/`. */
  AUTH: /^\/auth\//,
  /** Exact paths considered auth-only. */
  AUTH_ONLY: ['/auth/sign-in', '/auth/sign-up'] as const,
} as const;
