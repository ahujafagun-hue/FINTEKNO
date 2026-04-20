import { useCallback, useEffect, useRef, useState } from 'react';
import BrowserChrome from '../components/BrowserChrome';
import TagSel from '../components/TagSel';
import { useAuth } from '../context/AuthContext';
import { useTab } from '../context/TabContext';

function collectProfile(root) {
  if (!root) return {};
  const groups = ['experience', 'targetRoles', 'skills', 'workMode'];
  const out = {};
  groups.forEach((g) => {
    const el = root.querySelector(`[data-profile-group="${g}"]`);
    if (!el) return;
    out[g] = [...el.querySelectorAll('.tag-sel.on')].map((n) => n.textContent.trim());
  });
  const salaryInput = root.querySelector('[data-profile-salary]');
  out.salaryRange = salaryInput?.value ?? '';
  return out;
}

export default function OnboardProfile() {
  const { switchTab, authIntent } = useTab();
  const { verifyOtp, requestOtp, loadMe, user } = useAuth();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDevHint, setOtpDevHint] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendAfter, setResendAfter] = useState(0);
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [lastParsed, setLastParsed] = useState(null);

  const resumeMeta = lastParsed || user?.profile?.resume;

  useEffect(() => {
    setOtp('');
    setOtpSent(false);
    setOtpDevHint(false);
    setResendAfter(0);
  }, [email]);

  useEffect(() => {
    if (resendAfter <= 0) return undefined;
    const t = setInterval(() => setResendAfter((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendAfter]);

  const onSendOtp = useCallback(async () => {
    setAuthError('');
    const em = email.trim();
    if (!em) {
      setAuthError('Enter your email.');
      return;
    }
    const intent = authIntent === 'login' ? 'login' : 'register';
    try {
      setSendingOtp(true);
      const r = await requestOtp(em, intent);
      setOtpSent(true);
      setOtpDevHint(!!r.dev);
      setResendAfter(60);
    } catch (e) {
      setAuthError(e.message || 'Could not send code');
    } finally {
      setSendingOtp(false);
    }
  }, [authIntent, email, requestOtp]);

  const onPickFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileChange = useCallback((e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      setAuthError('Resume must be 5MB or smaller.');
      return;
    }
    setAuthError('');
    setResumeFile(f);
    setLastParsed(null);
  }, []);

  const onContinue = useCallback(async () => {
    setAuthError('');
    const em = email.trim();
    const code = otp.replace(/\s/g, '');
    if (!em) {
      setAuthError('Enter your email.');
      return;
    }
    if (!otpSent) {
      setAuthError('Send a verification code to your email first.');
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setAuthError('Enter the 6-digit code from your email.');
      return;
    }

    const intent = authIntent === 'login' ? 'login' : 'register';

    try {
      setSubmitting(true);
      const profile = intent === 'register' ? collectProfile(formRef.current) : undefined;
      await verifyOtp(em, code, intent, profile);
      if (resumeFile) {
        const fakeAts = Math.min(94, Math.max(72, 72 + Math.floor(resumeFile.name.length % 22)));
        setLastParsed({
          filename: resumeFile.name,
          skillCount: 23,
          atsScore: fakeAts,
        });
      }
      await loadMe();
      if (intent === 'login') {
        switchTab('home');
      } else {
        switchTab('onboard2');
      }
    } catch (e) {
      setAuthError(e.message || 'Request failed');
    } finally {
      setSubmitting(false);
    }
  }, [authIntent, email, otp, otpSent, verifyOtp, loadMe, resumeFile, switchTab]);

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/onboarding" />
      <div className="ob-layout">
        <div className="ob-left">
          <div className="ob-prog" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} aria-label="Step 3 of 6">
            <div className="ob-seg done" />
            <div className="ob-seg done" />
            <div className="ob-seg active" />
            <div className="ob-seg" />
            <div className="ob-seg" />
            <div className="ob-seg" />
          </div>
          <div className="ob-step-lbl">Step 3 / 6</div>
          <h2 className="ob-title">
            Tell us what you&apos;re
            <br />
            looking for.
          </h2>
          <p className="ob-sub">The more precisely you set this, the better your agents perform. Takes under 4 minutes.</p>
          <div className="ob-promise">
            <div className="ob-promise-title">Why we ask</div>
            <p className="ob-promise-text">
              Your preferences directly train your Discovery Agent. Better preferences = better matches. We never share this data with employers without your permission.
            </p>
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text2)' }}>
              <div className="pill-dot" style={{ background: 'var(--blue)' }} aria-hidden="true" />
              Discovery agent — activating after this step
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text2)' }}>
              <div className="pill-dot" style={{ background: 'var(--red)' }} aria-hidden="true" />
              Resume agent — activating after this step
            </div>
          </div>
        </div>
        <div className="ob-right" ref={formRef}>
          <div className="ob-form-title">Skills & preferences</div>
          <p className="ob-form-sub">Parsed from your resume — edit anything that&apos;s wrong.</p>

          <div className="form-group">
            <div className="form-label">Email</div>
            <input id="auth-email" name="email" type="email" autoComplete="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          </div>
          <div className="form-group">
            <div className="form-label">Verification code</div>
            <input
              id="auth-otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="form-input"
              placeholder="6-digit code"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              aria-label="One-time verification code"
            />
          </div>
          <button
            type="button"
            className="btn-ghost-sm"
            style={{ width: '100%', marginBottom: 12, padding: '10px 12px' }}
            disabled={sendingOtp || resendAfter > 0}
            onClick={onSendOtp}
          >
            {sendingOtp ? 'Sending…' : otpSent ? (resendAfter > 0 ? `Resend code (${resendAfter}s)` : 'Resend code') : 'Send verification code'}
          </button>
          {otpSent ? (
            <p style={{ fontSize: 11, color: 'var(--text2)', marginTop: -6, marginBottom: 12 }}>
              Check your inbox for a 6-digit code (and spam). Code expires in 10 minutes.
            </p>
          ) : null}
          {otpDevHint ? (
            <p style={{ fontSize: 11, color: 'var(--amber)', marginTop: -8, marginBottom: 12 }}>
              Development mode: the code is also printed in the API server console when SMTP is not configured.
            </p>
          ) : null}

          <div style={{ marginBottom: 14 }}>
            <div className="form-label">Experience level</div>
            <div data-profile-group="experience">
              <TagSel defaultOn>Fresher (0–1 yr)</TagSel>
              <TagSel>1–3 years</TagSel>
              <TagSel>3–5 years</TagSel>
              <TagSel>5+ years</TagSel>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div className="form-label">Target roles</div>
            <div data-profile-group="targetRoles">
              <TagSel defaultOn>Data Analyst</TagSel>
              <TagSel defaultOn>Business Analyst</TagSel>
              <TagSel>Software Engineer</TagSel>
              <TagSel>Product Manager</TagSel>
              <TagSel>Marketing</TagSel>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div className="form-label">Top skills</div>
            <div data-profile-group="skills">
              <TagSel defaultOn>Python</TagSel>
              <TagSel defaultOn>SQL</TagSel>
              <TagSel defaultOn>Data Analysis</TagSel>
              <TagSel>React</TagSel>
              <TagSel>ML</TagSel>
              <TagSel>Excel</TagSel>
            </div>
          </div>
          <div className="form-row">
            <div>
              <div className="form-label">Work mode</div>
              <div data-profile-group="workMode">
                <TagSel defaultOn>Hybrid</TagSel>
                <TagSel>Remote</TagSel>
                <TagSel>On-site</TagSel>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label">Expected salary (LPA)</div>
              <input className="form-input" data-profile-salary defaultValue="₹ 6 – 12 LPA" aria-label="Expected salary in LPA" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />
          <div
            className="upload-area"
            role="button"
            tabIndex={0}
            aria-label="Upload resume PDF or DOCX"
            onClick={onPickFile}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPickFile();
              }
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 7, color: 'var(--text3)' }} aria-hidden="true">
              ↑
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>Upload your resume</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>PDF or DOCX · Max 5MB · Skills parsed automatically</div>
          </div>
          <div className="uploaded-file" aria-label={resumeMeta ? 'Resume parsed' : resumeFile ? 'Resume selected' : 'Resume status'}>
            <div
              style={{
                width: 26,
                height: 26,
                background: 'var(--bg3)',
                border: '1px solid var(--border2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="2" y="1" width="9" height="11" rx="1.2" stroke="var(--text2)" strokeWidth="1.1" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>
                {resumeFile?.name || resumeMeta?.filename || 'No file selected yet'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: "'Space Mono',monospace" }}>
                {resumeMeta
                  ? `Parsed · ${resumeMeta.skillCount} skills · ATS: ${resumeMeta.atsScore}%`
                  : resumeFile
                    ? 'Selected · will parse after you continue'
                    : 'Optional — add a resume for smarter defaults'}
              </div>
            </div>
            <div
              style={{
                width: 16,
                height: 16,
                background: resumeMeta ? 'var(--green)' : 'var(--border2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {resumeMeta && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke="#000" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>

          {authError ? (
            <div className="alert alert-red" role="alert" style={{ marginBottom: 14 }}>
              <div className="alert-icon" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4" stroke="var(--red)" strokeWidth="1" />
                  <path d="M6 4v2.5M6 8.2h.01" stroke="var(--red)" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="alert-title" style={{ color: 'var(--red)' }}>
                  Couldn&apos;t complete sign-in
                </div>
                <div className="alert-text">{authError}</div>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            className="btn-solid"
            style={{ width: '100%', padding: 12, fontSize: 12, textAlign: 'center', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
            disabled={submitting}
            onClick={onContinue}
          >
            Continue → Connect platforms
          </button>
        </div>
      </div>
    </>
  );
}
