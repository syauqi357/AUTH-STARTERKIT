import { drizzle } from "drizzle-orm/mysql2";

const DATABASE_SET = drizzle(process.env.DATABASE_URL!);

export { DATABASE_SET };