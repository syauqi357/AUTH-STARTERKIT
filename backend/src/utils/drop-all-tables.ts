import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL!);

console.log("🔌 Connected to database");

const [tables] = await connection.execute<mysql.RowDataPacket[]>(`
  SELECT table_name 
  FROM information_schema.tables 
  WHERE table_schema = DATABASE()
`);

if (tables.length === 0) {
  console.log("✅ No tables found, nothing to drop");
  await connection.end();
  process.exit(0);
}

await connection.execute("SET FOREIGN_KEY_CHECKS = 0");

for (const row of tables) {
  const tableName = row.table_name;
  await connection.execute(`DROP TABLE IF EXISTS \`${tableName}\``);
  console.log(`🗑️  Dropped table: ${tableName}`);
}

await connection.execute("SET FOREIGN_KEY_CHECKS = 1");

console.log("✅ All tables dropped successfully");

await connection.end();
process.exit(0);
