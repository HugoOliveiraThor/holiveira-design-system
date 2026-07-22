'use client';

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import type { ReactAuthClient } from 'better-auth/react';

import { auth } from './auth';

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

type AuthClient = ReactAuthClient<any>;
export const signIn: AuthClient['signIn'] = authClient.signIn;
export const signOut: AuthClient['signOut'] = authClient.signOut;
export const signUp: AuthClient['signUp'] = authClient.signUp;
export const useSession: AuthClient['useSession'] = authClient.useSession;
export const getSession: AuthClient['getSession'] = authClient.getSession;
