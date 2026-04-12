import nodemailer from 'nodemailer';

/**
 * Sends a one-time code. If SMTP is not configured, logs to stdout (dev only).
 */
export async function sendOtpEmail({ to, code }) {
  const from = process.env.MAIL_FROM || 'FINTEKNO <noreply@localhost>';
  const subject = process.env.MAIL_OTP_SUBJECT || 'Your FINTEKNO verification code';

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const text = `Your verification code is: ${code}\n\nIt expires in 10 minutes. If you didn't request this, you can ignore this email.`;
  const html = `<p>Your verification code is:</p><p style="font-size:22px;font-weight:700;letter-spacing:0.2em;">${code}</p><p style="color:#666;font-size:13px;">It expires in 10 minutes. If you didn't request this, you can ignore this email.</p>`;

  if (!host) {
    console.warn(`[otp] SMTP not configured — code for ${to}: ${code}`);
    return { dev: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: port || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: user && pass ? { user, pass } : undefined,
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return { dev: false };
}
