type DatabaseEnv = Record<string, string | undefined>;

const REQUIRED_DB_KEYS = ["DB_HOST", "DB_DATABASE", "DB_USERNAME"] as const;

export function buildDatabaseUrlFromEnv(env: DatabaseEnv = process.env) {
  const connection = env.DB_CONNECTION || "mysql";
  if (connection !== "mysql") {
    throw new Error("DB_CONNECTION must be mysql because this Prisma schema uses MySQL.");
  }

  const missingKeys = REQUIRED_DB_KEYS.filter((key) => !env[key]);
  if (missingKeys.length > 0) {
    throw new Error(`Missing database environment variables: ${missingKeys.join(", ")}`);
  }

  const host = env.DB_HOST!;
  const port = env.DB_PORT || "3306";
  const database = encodeURIComponent(env.DB_DATABASE!);
  const username = encodeURIComponent(env.DB_USERNAME!);
  const password = encodeURIComponent(env.DB_PASSWORD || "");

  return `${connection}://${username}:${password}@${host}:${port}/${database}`;
}

export function ensureDatabaseUrl(env: DatabaseEnv = process.env) {
  const databaseUrl = buildDatabaseUrlFromEnv(env);
  env.PRISMA_DB_URL = databaseUrl;

  return databaseUrl;
}
