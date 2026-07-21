import { requireEnv } from '../env';

/** Shape of the database configuration object. */
export interface DbConfig {
  /** Database connection string — required via `DATABASE_URL`. */
  url: string;
}

/** Typed database configuration object using lazy getters. */
export const dbConfig: DbConfig = {
  get url() {
    return requireEnv('DATABASE_URL');
  },
};
