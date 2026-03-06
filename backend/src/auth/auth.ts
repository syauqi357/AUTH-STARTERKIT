import {betterAuth} from "better-auth";
import {drizzleAdapter} from "@better-auth/drizzle-adapter";

// import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
// import { createPool } from "mysql2/promise";
// import {drizzle} from "drizzle-orm/mysql2";
// import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { DATABASE_SET as db } from "../db/index.ts";
import * as schema from "../db/auth/auth-schema.ts";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.FRONTEND_URL!],
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username()
],
});
