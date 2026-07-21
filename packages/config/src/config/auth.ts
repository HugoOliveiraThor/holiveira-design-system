import { requireEnv } from "../env"

/** Shape of the authentication configuration object. */
export interface AuthConfig {
  /** Better Auth secret — required via `BETTER_AUTH_SECRET`. */
  secret: string
  /** Better Auth URL — required via `BETTER_AUTH_URL`. */
  url: string
  /** Google OAuth client ID — required via `GOOGLE_CLIENT_ID`. */
  googleClientId: string
  /** Google OAuth client secret — required via `GOOGLE_CLIENT_SECRET`. */
  googleClientSecret: string
  /** Demo user email for development purposes. */
  demoUserMail?: string
  /** Demo user password for development purposes. */
  demoUserPass?: string
}

/** Typed authentication configuration object using lazy getters. */
export const authConfig: AuthConfig = {
  get secret() {
    return requireEnv("BETTER_AUTH_SECRET")
  },
  get url() {
    return requireEnv("BETTER_AUTH_URL")
  },
  get googleClientId() {
    return requireEnv("GOOGLE_CLIENT_ID")
  },
  get googleClientSecret() {
    return requireEnv("GOOGLE_CLIENT_SECRET")
  },
  get demoUserMail() {
    return process.env.NEXT_PUBLIC_DEMO_USER_MAIL
  },
  get demoUserPass() {
    return process.env.NEXT_PUBLIC_DEMO_USER_PASS
  },
}
