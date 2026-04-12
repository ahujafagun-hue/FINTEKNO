/**
 * Pool config for local Postgres or Neon (https://neon.tech).
 * Neon URLs use TLS; the dashboard string usually includes ?sslmode=require.
 */
export function getPoolConfig() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is required');
  }

  const useSsl =
    process.env.DATABASE_SSL === 'true' ||
    process.env.DATABASE_SSL === 'require' ||
    /\.neon\.tech\b/i.test(connectionString) ||
    /[?&]sslmode=require\b/i.test(connectionString);

  /** @type {import('pg').PoolConfig} */
  const config = {
    connectionString,
    max: Number(process.env.PG_POOL_MAX || 10),
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS || 30000),
    connectionTimeoutMillis: Number(process.env.PG_CONNECTION_TIMEOUT_MS || 10000),
  };

  if (useSsl) {
    config.ssl = { rejectUnauthorized: true };
  }

  return config;
}

/** Parse host for logging (no credentials). */
export function safeDbLabel(connectionString) {
  try {
    const u = new URL(connectionString);
    return u.hostname || 'database';
  } catch {
    return 'database';
  }
}
