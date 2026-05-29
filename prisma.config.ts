import "dotenv/config";
import { defineConfig } from "prisma/config";
import { ensureDatabaseUrl } from "./src/lib/database-url";

ensureDatabaseUrl();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts"
  }
});
