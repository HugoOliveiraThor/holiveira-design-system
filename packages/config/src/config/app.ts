import { requireEnv } from '../env';

/** Shape of the application-level configuration object. */
export interface AppConfig {
  /** Application name (defaults to "Holiveira"). */
  name: string;
  /** Public-facing URL — required via `NEXT_PUBLIC_APP_URL`. */
  url: string;
  /** Current runtime environment (`development`, `production`, `test`). */
  env: string;
}

/** Typed application configuration object using lazy getters. */
export const appConfig: AppConfig = {
  get name() {
    return process.env.NEXT_PUBLIC_APP_NAME ?? 'Holiveira';
  },
  get url() {
    return requireEnv('NEXT_PUBLIC_APP_URL');
  },
  get env() {
    return process.env.NODE_ENV ?? 'development';
  },
};
