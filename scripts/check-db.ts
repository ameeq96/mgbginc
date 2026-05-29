import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { ensureDatabaseUrl } from "../src/lib/database-url";

const datasourceUrl = ensureDatabaseUrl();
const prisma = new PrismaClient({ datasourceUrl });

async function main() {
  console.log("Database config being used:");
  console.log(`DB_CONNECTION=${process.env.DB_CONNECTION || "mysql"}`);
  console.log(`DB_HOST=${process.env.DB_HOST || ""}`);
  console.log(`DB_PORT=${process.env.DB_PORT || "3306"}`);
  console.log(`DB_DATABASE=${process.env.DB_DATABASE || ""}`);
  console.log(`DB_USERNAME=${process.env.DB_USERNAME || ""}`);
  console.log(`DB_PASSWORD=${process.env.DB_PASSWORD ? "[set]" : "[empty]"}`);

  await prisma.$queryRaw`SELECT 1`;
  console.log("Database connection OK.");
}

main()
  .catch((error) => {
    console.error("Database connection failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
