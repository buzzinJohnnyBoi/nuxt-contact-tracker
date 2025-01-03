import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Missing environment variables for database connection");
}

export default defineConfig({
  dialect: "mysql",
  dbCredentials: {
    url: databaseUrl,
  },
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
});
