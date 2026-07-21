'use client';

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import type { ReactAuthClient } from 'better-auth/react';
import { auth } from './auth';

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

type _Client = ReactAuthClient<any>;
export const signIn: _Client['signIn'] = authClient.signIn;
export const signOut: _Client['signOut'] = authClient.signOut;
export const signUp: _Client['signUp'] = authClient.signUp;
export const useSession: _Client['useSession'] = authClient.useSession;
export const getSession: _Client['getSession'] = authClient.getSession;
