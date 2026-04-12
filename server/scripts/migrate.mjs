#!/usr/bin/env node
/**
 * Runs SQL files in server/migrations/ once each, in lexical order.
 * Tracked in schema_migrations(name).
 */
import '../src/loadEnv.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { getPoolConfig, safeDbLabel } from '../src/poolConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

const { Pool } = pg;

async function ensureMigrationsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function appliedNames(client) {
  const { rows } = await client.query(`SELECT name FROM schema_migrations ORDER BY name`);
  return new Set(rows.map((r) => r.name));
}

async function main() {
  const pool = new Pool(getPoolConfig());
  const cs = process.env.DATABASE_URL || '';
  console.log(`Migrations → ${safeDbLabel(cs)}`);

  const client = await pool.connect();
  try {
    await ensureMigrationsTable(client);

    const done = await appliedNames(client);
    const files = (await fs.readdir(MIGRATIONS_DIR))
      .filter((f) => f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('No migration files found in migrations/');
      return;
    }

    for (const file of files) {
      if (done.has(file)) {
        console.log(`  skip (already applied) ${file}`);
        continue;
      }

      const full = path.join(MIGRATIONS_DIR, file);
      const sql = await fs.readFile(full, 'utf8');

      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query(`INSERT INTO schema_migrations (name) VALUES ($1)`, [file]);
        await client.query('COMMIT');
        console.log(`  applied ${file}`);
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      }
    }

    console.log('Migrations complete.');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
