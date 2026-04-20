import { useRef, useState } from 'react';
import BrowserChrome from '../components/BrowserChrome';
import TagSel from '../components/TagSel';
import { useTab } from '../context/TabContext';

export default function OnboardProfile() {
  const { switchTab } = useTab();
  const fileInputRef = useRef(null);
  const [resumeFileName, setResumeFileName] = useState('Aryan_Resume_2025.pdf');

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const onUploadKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFilePicker();
    }
  };

  const onResumeFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFileName(file.name);
  };

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
        <div className="ob-right">
          <div className="ob-form-title">Skills & preferences</div>
          <p className="ob-form-sub">Parsed from your resume — edit anything that&apos;s wrong.</p>
          <div style={{ marginBottom: 14 }}>
            <div className="form-label">Experience level</div>
            <div>
              <TagSel defaultOn>Fresher (0–1 yr)</TagSel>
              <TagSel>1–3 years</TagSel>
              <TagSel>3–5 years</TagSel>
              <TagSel>5+ years</TagSel>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div className="form-label">Target roles</div>
            <div>
              <TagSel defaultOn>Data Analyst</TagSel>
              <TagSel defaultOn>Business Analyst</TagSel>
              <TagSel>Software Engineer</TagSel>
              <TagSel>Product Manager</TagSel>
              <TagSel>Marketing</TagSel>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div className="form-label">Top skills</div>
            <div>
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
              <div>
                <TagSel defaultOn>Hybrid</TagSel>
                <TagSel>Remote</TagSel>
                <TagSel>On-site</TagSel>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label">Expected salary (LPA)</div>
              <input className="form-input" defaultValue="₹ 6 – 12 LPA" aria-label="Expected salary in LPA" />
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={onResumeFileSelected} />
          <button type="button" className="upload-area" aria-label="Upload resume PDF or DOCX" onClick={openFilePicker} onKeyDown={onUploadKeyDown}>
            <div style={{ fontSize: 20, marginBottom: 7, color: 'var(--text3)' }} aria-hidden="true">
              ↑
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>Upload your resume</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>PDF or DOCX · Max 5MB · Skills parsed automatically</div>
          </button>
          <div className="uploaded-file" aria-label="Resume uploaded successfully">
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
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{resumeFileName}</div>
              <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: "'Space Mono',monospace" }}>Parsed · 23 skills · ATS: 74%</div>
            </div>
            <div
              style={{ width: 16, height: 16, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              aria-hidden="true"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4L3 5.5L6.5 2" stroke="#000" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <button type="button" className="btn-solid" style={{ width: '100%', padding: 12, fontSize: 12, textAlign: 'center', justifyContent: 'center' }} onClick={() => switchTab('onboard2')}>
            Continue → Connect platforms
          </button>
        </div>
      </div>
    </>
  );
}
