import "dotenv/config";
import { defineConfig } from "prisma/config";
import { ensureDatabaseUrl } from "./src/lib/database-url";

const databaseUrl = ensureDatabaseUrl();

if (!databaseUrl) {
  throw new Error(
    "Missing database environment variables. Set DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env or Plesk."
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  engine: "classic",
  datasource: {
    url: databaseUrl
  },
  migrations: {
    seed: "tsx prisma/seed.ts"
  }
});
