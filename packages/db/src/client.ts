import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from './generated/client';

declare global {
  var prisma: PrismaClient | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const db =
  globalThis.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
