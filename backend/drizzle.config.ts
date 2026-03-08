import { defineConfig } from "drizzle-kit";
// import mysql from "mysql2/promise";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: ["./src/db/schema", "./src/db/auth"],
  dbCredentials: {
    url: process.env.DATABASE_URL_PG!,
  },
});
