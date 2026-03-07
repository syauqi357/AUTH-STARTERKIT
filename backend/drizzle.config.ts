import { defineConfig } from "drizzle-kit";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dialect: "mysql",
  out: "./src/db/migrations",
  schema: ["./src/db/schema", "./src/db/auth"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
