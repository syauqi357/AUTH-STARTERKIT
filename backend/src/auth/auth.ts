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
    provider: "pg",
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
        html: `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
                <h2
		              style="font-size: 24px; font-weight: 600; color: #1a1a1a; text-align: center; margin: 0 0 12px;"
	              >
		              Reset your password
	              </h2>
	              <p
		              style="font-size: 14px; color: #6b6b6b; text-align: center; margin: 0 0 24px; line-height: 1.6;"
	              >
		              Click the link below to reset your password. This link expires in 1 hour.
	              </p>
	              <div style="text-align: center; margin: 0 0 24px;">
		              <a
			              href="${url}"
			              style="display: inline-block; background-color: #1a1a1a; color: #ffffff; font-size: 13px; font-weight: 500; text-decoration: none; padding: 12px 28px;"
	                >
			              Reset Password
		              </a>
	              </div>
              	<p style="font-size: 12px; color: #aeaeae; text-align: center; margin: 0;">
		              If you didn't request this, you can safely ignore this email.
	              </p>
              </div>
`,
      });
      // console log for demonstration, you should replace it with actual email sending code
      // console.log(`Send email to ${user.email} : ${url}`);
    },
  },
  plugins: [username()],
});
