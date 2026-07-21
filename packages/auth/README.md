# @holiveira/auth

Authentication and RBAC infrastructure.

## Purpose

Server-side BetterAuth instance with Prisma adapter, React client bindings, session management, and
role-based authorization. Architectural role: provides auth primitives for the entire framework.

## Installation

```bash
pnpm add @holiveira/auth
```

Requires `next`, `react`, and a configured `@holiveira/db` instance.

## Usage

```ts
// Server-side
import { auth } from '@holiveira/auth';
const session = await auth.api.getSession({ headers });

// Client-side
import { authClient, useSession } from '@holiveira/auth';
const { data: session } = useSession();

// Middleware protection
import { createProxy } from '@holiveira/auth';
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
profile data, or database schema (delegated to `@holiveira/db`).

See `docs/architecture/contracts/auth.md` for ownership and dependency boundaries.

## References

- `@holiveira/db` — Prisma adapter dependency
- `@holiveira/config` — auth configuration
- `@holiveira/types` — shared type foundation
