# Package Contract: @holiveira/auth

Level: 4 Category: Services

## Purpose

Authentication and authorization using Better Auth. Integrates with the database via `@holiveira/db`
(BetterAuth PrismaAdapter) and the Next.js application via middleware.

## Responsibilities

- Manage auth server config (BetterAuth instance)
- Manage auth client (auth-client.ts for browser-side)
- Provide session management utilities (`getSession`, `useSession`)
- Provide auth middleware for route protection (`createProxy`)
- Handle OAuth configuration (Google, GitHub)
- Provide RBAC primitives (roles, permissions, authorization)

## Allowed Dependencies

- `@holiveira/db` (L4) — PrismaAdapter for BetterAuth user/session storage

## Forbidden Dependencies

- `@holiveira/api` (L4) — auth is lower-level than API; API may depend on auth, not the reverse
- `@holiveira/config` (L0) — auth reads env vars natively via BETTER_AUTH_* / GOOGLE_* / GITHUB_*
- `@holiveira/primitives` (L2) — auth is server-side, not UI
- Any UI package
- Any application

## Public API

- `auth` (server instance)
- `authClient` (client instance)
- `signIn`, `signOut`, `signUp` (client-side auth actions)
- `useSession` (React hook returning current session and user)
- `getSession` (function to retrieve current session without a hook)
- `createProxy` (creates a configured Next.js proxy middleware for session-based route protection)
- `CreateProxyOptions` (configuration options for createProxy)
- `authorizationPlugins` (BetterAuth authorization plugins — admin + access control)
- `authorizationClient` (BetterAuth client authorization plugins)
- `roles` (role definitions for RBAC: viewer, editor, admin)
- `AppRole` (application role type: "viewer" | "editor" | "admin")

## Internal API

- `_validateSession`
- `_refreshToken`
- `_authMiddleware`
