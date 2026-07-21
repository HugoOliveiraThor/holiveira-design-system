/** @public — BetterAuth server instance configured with email/password, Google OAuth, and Prisma adapter */
export { auth } from './auth';

/** @public — BetterAuth React client with additional field inference */
export { authClient } from './auth-client';

/** @public — Client-side sign-in function */
export { signIn } from './auth-client';

/** @public — Client-side sign-out function */
export { signOut } from './auth-client';

/** @public — Client-side sign-up function */
export { signUp } from './auth-client';

/** @public — React hook returning current session and user */
export { useSession } from './auth-client';

/** @public — Function to retrieve current session without a hook */
export { getSession } from './auth-client';

/** @public — Creates a configured Next.js proxy middleware for session-based route protection */
export { createProxy } from './proxy';

/** @public — Configuration options for createProxy */
export type { CreateProxyOptions } from './proxy';

/** @public — BetterAuth authorization plugins (admin + access control). NOT active in `auth` by default — must be uncommented in `auth.ts`. */
export { authorizationPlugins } from './authorization';

/** @public — BetterAuth client authorization plugins */
export { authorizationClient } from './authorization';

/** @public — Role definitions for RBAC: viewer, editor, admin */
export { roles } from './permissions';

/** @public — Application role type: "viewer" | "editor" | "admin" */
export type { AppRole } from './permissions';
