import { randomInt } from 'crypto';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import { authJwt } from '../middleware/authJwt.js';
import { sendOtpEmail } from '../mail/otpMail.js';

const router = Router();

const SALT_ROUNDS = 10;
const OTP_EXPIRY_MS = 10 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 8;
const SEND_COOLDOWN_MS = 60 * 1000;
const SEND_HOURLY_MAX = 12;

/** @type {Map<string, number>} */
const lastSendAt = new Map();
/** @type {Map<string, { count: number, reset: number }>} */
const hourlySend = new Map();

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  );
}

function sanitizeUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    profile: row.profile || {},
    created_at: row.created_at,
  };
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const t = email.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) && t.length <= 320;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function genSixDigitCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, '0');
}

function sendThrottle(email) {
  const now = Date.now();
  const last = lastSendAt.get(email);
  if (last && now - last < SEND_COOLDOWN_MS) {
    const retryAfterSec = Math.ceil((SEND_COOLDOWN_MS - (now - last)) / 1000);
    return { ok: false, retryAfterSec };
  }

  let bucket = hourlySend.get(email);
  if (!bucket || now > bucket.reset) {
    bucket = { count: 0, reset: now + 60 * 60 * 1000 };
    hourlySend.set(email, bucket);
  }
  if (bucket.count >= SEND_HOURLY_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.reset - now) / 1000) || 3600 };
  }

  return { ok: true };
}

function recordSend(email) {
  lastSendAt.set(email, Date.now());
  const bucket = hourlySend.get(email);
  if (bucket) bucket.count += 1;
}

router.post('/otp/send', async (req, res) => {
  try {
    const { email, intent } = req.body || {};
    if (intent !== 'login' && intent !== 'register') {
      return res.status(400).json({ error: 'intent must be login or register' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    const emailNorm = normalizeEmail(email);

    const { rows: existing } = await pool.query(`SELECT id FROM users WHERE email = $1`, [emailNorm]);
    const hasAccount = existing.length > 0;

    if (intent === 'register' && hasAccount) {
      return res.status(409).json({ error: 'An account with this email already exists. Sign in instead.' });
    }
    if (intent === 'login' && !hasAccount) {
      return res.status(404).json({ error: 'No account for this email. Create an account first.' });
    }

    const throttle = sendThrottle(emailNorm);
    if (!throttle.ok) {
      return res.status(429).json({
        error: 'Too many requests. Try again later.',
        retryAfterSec: throttle.retryAfterSec,
      });
    }

    await pool.query(
      `DELETE FROM email_otp_challenges
       WHERE email = $1 AND intent = $2 AND consumed_at IS NULL`,
      [emailNorm, intent],
    );

    const code = genSixDigitCode();
    const code_hash = await bcrypt.hash(code, SALT_ROUNDS);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    await pool.query(
      `INSERT INTO email_otp_challenges (email, intent, code_hash, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [emailNorm, intent, code_hash, expiresAt],
    );

    try {
      await sendOtpEmail({ to: emailNorm, code });
    } catch (e) {
      console.error('sendOtpEmail failed', e);
      await pool.query(`DELETE FROM email_otp_challenges WHERE email = $1 AND intent = $2 AND consumed_at IS NULL`, [
        emailNorm,
        intent,
      ]);
      return res.status(502).json({ error: 'Could not send email. Check SMTP configuration.' });
    }

    recordSend(emailNorm);
    return res.json({ ok: true, dev: !process.env.SMTP_HOST });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to send code' });
  }
});

router.post('/otp/verify', async (req, res) => {
  try {
    const { email, code, intent, profile = {} } = req.body || {};
    if (intent !== 'login' && intent !== 'register') {
      return res.status(400).json({ error: 'intent must be login or register' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    const rawCode = typeof code === 'string' ? code.replace(/\s/g, '') : '';
    if (!/^\d{6}$/.test(rawCode)) {
      return res.status(400).json({ error: 'Enter the 6-digit code from your email' });
    }

    const emailNorm = normalizeEmail(email);

    const { rows } = await pool.query(
      `SELECT id, code_hash, attempts, expires_at, consumed_at
       FROM email_otp_challenges
       WHERE email = $1 AND intent = $2
       ORDER BY created_at DESC
       LIMIT 1`,
      [emailNorm, intent],
    );

    const challenge = rows[0];
    if (!challenge || challenge.consumed_at) {
      return res.status(400).json({ error: 'No active code. Request a new one.' });
    }
    if (new Date(challenge.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Code expired. Request a new one.' });
    }
    if (challenge.attempts >= MAX_OTP_ATTEMPTS) {
      return res.status(429).json({ error: 'Too many attempts. Request a new code.' });
    }

    const ok = await bcrypt.compare(rawCode, challenge.code_hash);
    if (!ok) {
      await pool.query(`UPDATE email_otp_challenges SET attempts = attempts + 1 WHERE id = $1`, [challenge.id]);
      return res.status(401).json({ error: 'Invalid code' });
    }

    await pool.query(`UPDATE email_otp_challenges SET consumed_at = NOW() WHERE id = $1`, [challenge.id]);

    if (intent === 'register') {
      const dup = await pool.query(`SELECT id FROM users WHERE email = $1`, [emailNorm]);
      if (dup.rows.length) {
        return res.status(409).json({ error: 'An account with this email already exists' });
      }
      const ins = await pool.query(
        `INSERT INTO users (email, password_hash, profile)
         VALUES ($1, NULL, $2::jsonb)
         RETURNING id, email, profile, created_at`,
        [emailNorm, JSON.stringify(profile && typeof profile === 'object' ? profile : {})],
      );
      const user = ins.rows[0];
      const token = signToken(user);
      return res.status(201).json({ token, user: sanitizeUser(user) });
    }

    const result = await pool.query(
      `SELECT id, email, profile, created_at FROM users WHERE email = $1`,
      [emailNorm],
    );
    const row = result.rows[0];
    if (!row) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const token = signToken(row);
    return res.json({ token, user: sanitizeUser(row) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Verification failed' });
  }
});

router.get('/me', authJwt, async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, email, profile, created_at FROM users WHERE id = $1`, [req.userId]);
    const row = result.rows[0];
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user: sanitizeUser(row) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to load user' });
  }
});

router.patch('/profile', authJwt, async (req, res) => {
  try {
    const { profile } = req.body || {};
    if (profile == null || typeof profile !== 'object') {
      return res.status(400).json({ error: 'profile object is required' });
    }
    const result = await pool.query(
      `UPDATE users SET profile = profile || $2::jsonb, updated_at = NOW()
       WHERE id = $1
       RETURNING id, email, profile, created_at`,
      [req.userId, JSON.stringify(profile)],
    );
    const row = result.rows[0];
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user: sanitizeUser(row) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
