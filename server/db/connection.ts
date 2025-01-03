import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing environment variables for database connection");
}
const pool = mysql.createPool(databaseUrl);

const MySQL = drizzle(pool);

export default MySQL;
