import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resume.js';
import oauthRoutes from './routes/oauth.js';

const app = express();
const port = Number(process.env.PORT) || 3001;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'fintekno-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/oauth', oauthRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required');
    process.exit(1);
  }
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 16) {
    console.error('JWT_SECRET must be set and at least 16 characters');
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`FINTEKNO API listening on http://localhost:${port}`);
    console.log('(Run `npm run migrate` in server/ if the database is new.)');
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

process.on('SIGTERM', () => pool.end());
