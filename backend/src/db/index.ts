import { drizzle } from "drizzle-orm/node-postgres";
// import mysql from "mysql2/promise";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
   connectionString: process.env.DATABASE_URL_PG
});

export const DATABASE_SET = drizzle(pool);
