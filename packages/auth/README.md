# @ho-dev/auth

Authentication and RBAC infrastructure.

## Purpose

Server-side BetterAuth instance with Prisma adapter, React client bindings, session management, and
role-based authorization. Architectural role: provides auth primitives for the entire framework.

## Installation

```bash
pnpm add @ho-dev/auth
```

Requires `next`, `react`, and a configured `@ho-dev/db` instance.

## Usage

```ts
// Server-side
import { auth } from '@ho-dev/auth';
const session = await auth.api.getSession({ headers });

// Client-side
import { authClient, useSession } from '@ho-dev/auth';
const { data: session } = useSession();

// Middleware protection
import { createProxy } from '@ho-dev/auth';
export default createProxy({ auth, config: { publicRoutes: ['/sign-in'] } });
```

## Public API

| Export                 | Kind     | Description                       |
| ---------------------- | -------- | --------------------------------- |
| `auth`                 | function | BetterAuth server instance        |
| `authClient`           | object   | BetterAuth React client           |
| `signIn`               | function | Sign-in handler                   |
| `signOut`              | function | Sign-out handler                  |
| `signUp`               | function | Sign-up handler                   |
| `useSession`           | hook     | React session hook                |
| `getSession`           | function | Server session getter             |
| `createProxy`          | function | Next.js middleware factory        |
| `authorizationPlugins` | object   | RBAC server plugins               |
| `authorizationClient`  | object   | RBAC client helpers               |
| `roles`                | object   | Role definitions                  |
| `AppRole`              | type     | `"viewer" \| "editor" \| "admin"` |

## Architecture Contract

**Dependency Level:** 4 — Services.

**Owns:** Auth configuration, session management, RBAC plugins and role definitions, middleware
proxy.

**Does not own:** Auth UI components (sign-in/sign-up pages), OAuth provider credentials, user
profile data, or database schema (delegated to `@ho-dev/db`).

See `docs/architecture/contracts/auth.md` for ownership and dependency boundaries.

## References

- `@ho-dev/db` — Prisma adapter dependency
- `@ho-dev/config` — auth configuration
- `@ho-dev/types` — shared type foundation
