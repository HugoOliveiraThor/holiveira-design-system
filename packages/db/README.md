# @ho-dev/db

Database client and adapter configuration.

## Purpose

Prisma client singleton with Neon/Pg adapter for PostgreSQL. Architectural role: database access
layer for the framework.

## Installation

```bash
pnpm add @ho-dev/db
```

Requires a configured `DATABASE_URL` environment variable and PostgreSQL instance.

## Usage

```ts
import { db } from '@ho-dev/db';

const users = await db.user.findMany();
const user = await db.user.findUnique({ where: { id } });
```

Generate the Prisma client after schema changes:

```bash
pnpm db:generate
```

## Public API

| Export         | Kind   | Description                      |
| -------------- | ------ | -------------------------------- |
| `db`           | object | Prisma client singleton instance |
| `PrismaClient` | type   | Prisma client type re-export     |

## Architecture Contract

**Dependency Level:** 4 — Services.

**Owns:** Database connection lifecycle, Prisma client singleton, adapter configuration (Neon/Pg).

**Does not own:** Database schema definitions (managed via Prisma migrations), business logic, data
validation, or connection pooling configuration.

See `docs/architecture/contracts/db.md` for ownership and dependency boundaries.

## References

- `@ho-dev/config` — database configuration
- `@ho-dev/auth` — consumer of db client
