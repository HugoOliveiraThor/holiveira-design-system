import { adminClient } from 'better-auth/client/plugins';
import { admin } from 'better-auth/plugins';

import { roles } from './permissions';

export const authorizationPlugins: Array<ReturnType<typeof admin>> = [
  admin({
    ac: undefined as never,
    roles,
    defaultRole: 'viewer',
    adminRole: 'admin',
  }),
];

export const authorizationClient: Array<ReturnType<typeof adminClient>> = [adminClient()];
