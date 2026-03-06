import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { username } from "better-auth/plugins";
import { DATABASE_SET as db } from "../db/index.ts";
import * as schema from "../db/auth/auth-schema.ts";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: user.email,
        subject: "Reset your password",
        html: `<h2>Reset your password</h2>
      <p>Click the link below to reset your password. This link expires in 1 hour.</p>
      <a href="${url}">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>`,
      });
      // console log for demonstration, you should replace it with actual email sending code
      console.log(`Send email to ${user.email} : ${url}`);
    },
  },
  plugins: [username()],
});
