import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool(process.env.DATABASE_URL!);

export const DATABASE_SET = drizzle(db);