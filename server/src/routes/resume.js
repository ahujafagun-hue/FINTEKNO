import { Router } from 'express';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import multer from 'multer';
import { pool } from '../db.js';
import { authJwt } from '../middleware/authJwt.js';
import { extractText, inferResumeMetadata } from '../resumeParser.js';

const router = Router();

const MAX_BYTES = 5 * 1024 * 1024;
const uploadRoot = path.join(process.cwd(), 'uploads');
fsSync.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadRoot);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safe = ['.pdf', '.docx'].includes(ext) ? ext : '.bin';
    cb(null, `${req.userId}-${Date.now()}-${randomBytes(8).toString('hex')}${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (!ok) {
      cb(new Error('Only PDF or DOCX files are allowed'));
      return;
    }
    cb(null, true);
  },
});

router.post('/upload', authJwt, (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File must be 5MB or smaller' });
    }
    if (err && err.message === 'Only PDF or DOCX files are allowed') {
      return res.status(400).json({ error: err.message });
    }
    if (err) return next(err);
    next();
  });
}, async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'resume file is required (PDF or DOCX)' });
  }

  let buffer;
  try {
    buffer = await fs.readFile(file.path);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to read upload' });
  }

  let text;
  try {
    text = await extractText(buffer, file.mimetype);
  } catch (e) {
    await fs.unlink(file.path).catch(() => {});
    return res.status(400).json({ error: e.message || 'Could not read resume' });
  }

  let parsed;
  try {
    parsed = await inferResumeMetadata(text);
  } catch (e) {
    console.error(e);
    await fs.unlink(file.path).catch(() => {});
    return res.status(500).json({ error: 'Could not analyse resume' });
  }

  const profileResume = {
    filename: file.originalname,
    skillCount: parsed.skillCount,
    atsScore: parsed.atsScore,
    skills: parsed.skills,
    targetRoles: parsed.targetRoles,
    experienceLevel: parsed.experienceLevel,
    salaryHint: parsed.salaryHint,
    parseSource: parsed.source,
    parsedAt: new Date().toISOString(),
  };

  try {
    await pool.query(
      `INSERT INTO user_resumes (user_id, original_filename, storage_filename, mime, byte_size, parsed)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb)`,
      [
        req.userId,
        file.originalname,
        file.filename,
        file.mimetype,
        file.size,
        JSON.stringify({ ...parsed, textLength: text.length }),
      ],
    );

    await pool.query(
      `UPDATE users SET profile = profile || $2::jsonb, updated_at = NOW() WHERE id = $1`,
      [req.userId, JSON.stringify({ resume: profileResume })],
    );
  } catch (e) {
    console.error(e);
    await fs.unlink(file.path).catch(() => {});
    return res.status(500).json({ error: 'Failed to save resume' });
  }

  return res.json({
    resume: profileResume,
  });
});

export default router;
