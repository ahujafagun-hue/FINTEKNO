import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';

const SKILL_KEYWORDS = [
  'python',
  'sql',
  'javascript',
  'typescript',
  'react',
  'node',
  'java',
  'aws',
  'docker',
  'kubernetes',
  'excel',
  'tableau',
  'power bi',
  'machine learning',
  'data analysis',
  'c++',
  'go',
  'mongodb',
  'postgresql',
  'git',
  'html',
  'css',
  'django',
  'flask',
  'spark',
  'tensorflow',
  'pytorch',
  'nlp',
  'statistics',
  'pandas',
  'numpy',
  'scikit',
  'marketing',
  'sales',
  'agile',
  'scrum',
];

/**
 * @param {Buffer} buffer
 * @param {string} mime
 */
export async function extractText(buffer, mime) {
  const m = (mime || '').toLowerCase();
  if (m === 'application/pdf' || m.endsWith('/pdf')) {
    const parser = new PDFParse({ data: buffer });
    try {
      const data = await parser.getText();
      return (data?.text || '').trim();
    } finally {
      await parser.destroy();
    }
  }
  if (
    m === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    m.includes('wordprocessingml') ||
    m.includes('msword')
  ) {
    const { value } = await mammoth.extractRawText({ buffer });
    return (value || '').trim();
  }
  throw new Error('Only PDF and DOCX resumes are supported');
}

function fallbackFromText(text) {
  const lower = text.toLowerCase();
  const skills = [];
  for (const k of SKILL_KEYWORDS) {
    if (lower.includes(k)) skills.push(k.replace(/\b\w/g, (c) => c.toUpperCase()));
  }
  const uniq = [...new Set(skills)].slice(0, 30);
  const skillCount = uniq.length > 0 ? uniq.length : Math.min(35, Math.max(5, Math.floor(text.length / 900)));
  const atsScore = Math.min(92, 38 + skillCount * 2 + Math.min(20, Math.floor(text.length / 2500)));
  return {
    skillCount,
    atsScore,
    skills: uniq.length ? uniq : ['Communication', 'Problem solving', 'Team collaboration'].slice(0, skillCount),
    targetRoles: ['Data Analyst', 'Business Analyst'],
    experienceLevel: 'fresher',
    salaryHint: null,
    source: 'heuristic',
  };
}

/**
 * @param {string} text
 */
export async function inferResumeMetadata(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return { ...fallbackFromText(' '), skillCount: 0, atsScore: 0, skills: [], source: 'empty' };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const fb = fallbackFromText(trimmed);
    return { ...fb, source: 'heuristic' };
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const excerpt = trimmed.slice(0, 14000);

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You extract recruiting metadata from raw resume text. Reply with a single JSON object only. Keys: skillCount (number), atsScore (integer 0-100, estimated ATS keyword/format strength), skills (array of strings, max 30), targetRoles (array, max 5), experienceLevel (one of: fresher, early, mid, senior), salaryHint (string or null).',
        },
        { role: 'user', content: excerpt },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('OpenAI resume parse failed:', res.status, errText);
    const fb = fallbackFromText(trimmed);
    return { ...fb, source: 'heuristic', openaiError: true };
  }

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (!raw || typeof raw !== 'string') {
    const fb = fallbackFromText(trimmed);
    return { ...fb, source: 'heuristic' };
  }

  try {
    const parsed = JSON.parse(raw);
    const skillCount = Math.min(99, Math.max(0, Number(parsed.skillCount) || parsed.skills?.length || 0));
    const atsScore = Math.min(100, Math.max(0, Number(parsed.atsScore) || 0));
    const skills = Array.isArray(parsed.skills) ? parsed.skills.map(String).slice(0, 30) : [];
    const targetRoles = Array.isArray(parsed.targetRoles) ? parsed.targetRoles.map(String).slice(0, 5) : [];
    return {
      skillCount: skillCount || skills.length,
      atsScore: atsScore || 65,
      skills,
      targetRoles,
      experienceLevel: typeof parsed.experienceLevel === 'string' ? parsed.experienceLevel : 'fresher',
      salaryHint: parsed.salaryHint ?? null,
      source: 'openai',
    };
  } catch {
    const fb = fallbackFromText(trimmed);
    return { ...fb, source: 'heuristic' };
  }
}
