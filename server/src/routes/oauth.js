import { Router } from 'express';
import { randomBytes } from 'crypto';
import { pool } from '../db.js';
import { authJwt } from '../middleware/authJwt.js';

const router = Router();

function appOrigin() {
  return (process.env.APP_ORIGIN || 'http://localhost:5173').replace(/\/$/, '');
}

router.get('/status', authJwt, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT provider, meta, expires_at FROM oauth_connections WHERE user_id = $1`,
      [req.userId],
    );
    const connected = new Set(rows.map((r) => r.provider));
    const li = connected.has('linkedin');
    const g = connected.has('google');

    res.json({
      linkedin: { connected: li },
      google: { connected: g },
      naukri: {
        supported: false,
        connected: false,
        message:
          'Naukri does not offer a public OAuth flow for third-party apps to access your job seeker account. Applications stay on Naukri.',
      },
      indeed: {
        supported: false,
        connected: false,
        message:
          'Indeed job seeker “connect” APIs are restricted; production integrations usually require Indeed partnership or official APIs.',
      },
      connectedCount: [li, g].filter(Boolean).length,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load connections' });
  }
});

async function createState(userId, provider) {
  const state = randomBytes(24).toString('hex');
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await pool.query(
    `INSERT INTO oauth_states (state, user_id, provider, expires_at) VALUES ($1, $2, $3, $4)`,
    [state, userId, provider, expiresAt],
  );
  return state;
}

router.post('/google/prepare', authJwt, async (req, res) => {
  const id = process.env.GOOGLE_CLIENT_ID;
  const redirect = process.env.GOOGLE_REDIRECT_URI;
  if (!id || !redirect) {
    return res.status(503).json({ error: 'Google OAuth is not configured (GOOGLE_CLIENT_ID / GOOGLE_REDIRECT_URI)' });
  }
  try {
    const state = await createState(req.userId, 'google');
    const params = new URLSearchParams({
      client_id: id,
      redirect_uri: redirect,
      response_type: 'code',
      scope: ['openid', 'email', 'https://www.googleapis.com/auth/gmail.readonly'].join(' '),
      state,
      access_type: 'offline',
      prompt: 'consent',
    });
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    res.json({ url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not start Google connection' });
  }
});

router.get('/google/callback', async (req, res) => {
  const origin = appOrigin();
  const { code, state, error } = req.query;
  if (error) {
    return res.redirect(`${origin}/?oauth_error=google`);
  }
  if (!code || !state || typeof state !== 'string') {
    return res.redirect(`${origin}/?oauth_error=google`);
  }

  const secret = process.env.GOOGLE_CLIENT_SECRET;
  const id = process.env.GOOGLE_CLIENT_ID;
  const redirect = process.env.GOOGLE_REDIRECT_URI;
  if (!secret || !id || !redirect) {
    return res.redirect(`${origin}/?oauth_error=google_config`);
  }

  try {
    const { rows } = await pool.query(
      `SELECT user_id, expires_at FROM oauth_states WHERE state = $1 AND provider = 'google'`,
      [state],
    );
    const row = rows[0];
    if (!row || new Date(row.expires_at) < new Date()) {
      return res.redirect(`${origin}/?oauth_error=google_state`);
    }

    await pool.query(`DELETE FROM oauth_states WHERE state = $1`, [state]);

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(code),
        client_id: id,
        client_secret: secret,
        redirect_uri: redirect,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenRes.json();
    if (!tokenRes.ok || !tokens.access_token) {
      console.error('Google token exchange failed', tokens);
      return res.redirect(`${origin}/?oauth_error=google_token`);
    }

    const expiresIn = Number(tokens.expires_in) || 3600;
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    await pool.query(
      `INSERT INTO oauth_connections (user_id, provider, access_token, refresh_token, expires_at, meta)
       VALUES ($1, 'google', $2, $3, $4, $5::jsonb)
       ON CONFLICT (user_id, provider) DO UPDATE SET
         access_token = EXCLUDED.access_token,
         refresh_token = COALESCE(EXCLUDED.refresh_token, oauth_connections.refresh_token),
         expires_at = EXCLUDED.expires_at,
         meta = oauth_connections.meta || EXCLUDED.meta,
         updated_at = NOW()`,
      [
        row.user_id,
        tokens.access_token,
        tokens.refresh_token || null,
        expiresAt,
        JSON.stringify({ scope: tokens.scope || null }),
      ],
    );

    return res.redirect(`${origin}/?oauth=google`);
  } catch (e) {
    console.error(e);
    return res.redirect(`${origin}/?oauth_error=google`);
  }
});

router.post('/linkedin/prepare', authJwt, async (req, res) => {
  const id = process.env.LINKEDIN_CLIENT_ID;
  const redirect = process.env.LINKEDIN_REDIRECT_URI;
  if (!id || !redirect) {
    return res.status(503).json({
      error: 'LinkedIn OAuth is not configured (LINKEDIN_CLIENT_ID / LINKEDIN_REDIRECT_URI)',
    });
  }
  try {
    const state = await createState(req.userId, 'linkedin');
    const scope = process.env.LINKEDIN_SCOPES || 'openid profile email';
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: id,
      redirect_uri: redirect,
      state,
      scope,
    });
    const url = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
    res.json({ url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not start LinkedIn connection' });
  }
});

router.get('/linkedin/callback', async (req, res) => {
  const origin = appOrigin();
  const { code, state, error } = req.query;
  if (error) {
    return res.redirect(`${origin}/?oauth_error=linkedin`);
  }
  if (!code || !state || typeof state !== 'string') {
    return res.redirect(`${origin}/?oauth_error=linkedin`);
  }

  const secret = process.env.LINKEDIN_CLIENT_SECRET;
  const id = process.env.LINKEDIN_CLIENT_ID;
  const redirect = process.env.LINKEDIN_REDIRECT_URI;
  if (!secret || !id || !redirect) {
    return res.redirect(`${origin}/?oauth_error=linkedin_config`);
  }

  try {
    const { rows } = await pool.query(
      `SELECT user_id, expires_at FROM oauth_states WHERE state = $1 AND provider = 'linkedin'`,
      [state],
    );
    const row = rows[0];
    if (!row || new Date(row.expires_at) < new Date()) {
      return res.redirect(`${origin}/?oauth_error=linkedin_state`);
    }

    await pool.query(`DELETE FROM oauth_states WHERE state = $1`, [state]);

    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: String(code),
        client_id: id,
        client_secret: secret,
        redirect_uri: redirect,
      }),
    });

    const tokens = await tokenRes.json();
    if (!tokenRes.ok || !tokens.access_token) {
      console.error('LinkedIn token exchange failed', tokens);
      return res.redirect(`${origin}/?oauth_error=linkedin_token`);
    }

    const expiresIn = Number(tokens.expires_in) || 3600;
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    await pool.query(
      `INSERT INTO oauth_connections (user_id, provider, access_token, refresh_token, expires_at, meta)
       VALUES ($1, 'linkedin', $2, $3, $4, $5::jsonb)
       ON CONFLICT (user_id, provider) DO UPDATE SET
         access_token = EXCLUDED.access_token,
         refresh_token = COALESCE(EXCLUDED.refresh_token, oauth_connections.refresh_token),
         expires_at = EXCLUDED.expires_at,
         meta = oauth_connections.meta || EXCLUDED.meta,
         updated_at = NOW()`,
      [row.user_id, tokens.access_token, tokens.refresh_token || null, expiresAt, JSON.stringify({})],
    );

    return res.redirect(`${origin}/?oauth=linkedin`);
  } catch (e) {
    console.error(e);
    return res.redirect(`${origin}/?oauth_error=linkedin`);
  }
});

export default router;
