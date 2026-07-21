import { admin } from "better-auth/plugins";
import { adminClient } from "better-auth/client/plugins";
import { roles } from "./permissions";

export const authorizationPlugins = [
  admin({
    ac: undefined as never,
    roles,
    defaultRole: "viewer",
    adminRole: "admin",
  }),
];

export const authorizationClient = [adminClient()];
