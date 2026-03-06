import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { username } from "better-auth/plugins";
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

    // forgot password flow, you need to implement how to send reset password email to users
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: {
        email: string;
      };
      url: string;
    }) => {
      // send email using your email provider
      console.log(`Send email to ${user.email} : ${url}`);
    },
  },
  plugins: [username()],
});
