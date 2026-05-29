type DatabaseEnv = Record<string, string | undefined>;

const REQUIRED_DB_KEYS = ["DB_HOST", "DB_DATABASE", "DB_USERNAME"] as const;

function hasDatabaseParts(env: DatabaseEnv) {
  return Boolean(
    env.DB_CONNECTION ||
      env.DB_HOST ||
      env.DB_PORT ||
      env.DB_DATABASE ||
      env.DB_USERNAME ||
      env.DB_PASSWORD
  );
}

export function buildDatabaseUrlFromEnv(env: DatabaseEnv = process.env) {
  if (env.DATABASE_URL) {
    return env.DATABASE_URL;
  }

  if (!hasDatabaseParts(env)) {
    return undefined;
  }

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

  if (databaseUrl) {
    env.DATABASE_URL = databaseUrl;
    return databaseUrl;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing database environment variables. Set either DATABASE_URL or Laravel-style DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD."
    );
  }

  return undefined;
}
