# Package Contract: @holiveira/db

Level: 4 Category: Services

## Purpose

Provide the Prisma ORM client singleton for database access. Intentionally minimal — no repository
pattern, no transaction helpers, no configuration layer. Prisma reads `DATABASE_URL` from the
environment natively.

## Responsibilities

- Manage Prisma schema and client generation
- Provide a shared Prisma client singleton with PrismaPg adapter for Neon/PostgreSQL
- Re-export `PrismaClient` type for consumer use

## Allowed Dependencies

- None (Prisma runtime deps are external, not @holiveira/\*)

## Forbidden Dependencies

- Any @holiveira/\* package — db is a leaf service with zero framework dependencies
- Any UI package
- Any application

## Public API

- `db` (Prisma client singleton)
- `PrismaClient` (type, re-exported from generated client)

## Internal API

- `client.ts` — singleton instantiation with PrismaPg adapter
- `generated/` — Prisma-generated client code
