import { defineConfig } from "drizzle-kit";
// import mysql from "mysql2/promise";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

// dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env

export default defineConfig({
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: ["./src/db/schema", "./src/db/auth"],
  dbCredentials: {
    url: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
});
