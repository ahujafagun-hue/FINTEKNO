import BrowserChrome from '../components/BrowserChrome';
import SidebarLogo from '../components/SidebarLogo';
import { useTab } from '../context/TabContext';
import { useMockFlow } from '../context/MockFlowContext';

export default function ApplyScreen() {
  const { switchTab } = useTab();
  const { pendingApprovals, submitApplication } = useMockFlow();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/apply/groww" />
      <div className="app-layout">
        <nav className="sidebar" aria-label="App navigation">
          <SidebarLogo />
          <div className="nav-grp">Main</div>
          <div className="nav-item" onClick={() => switchTab('home')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('home')}>
            Home
          </div>
          <div className="nav-item" onClick={() => switchTab('jobs')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('jobs')}>
            Jobs <span className="nav-badge">12</span>
          </div>
          <div className="nav-item active" aria-current="page">
            Apply <span className="nav-badge">{pendingApprovals}</span>
          </div>
          <div className="nav-item" onClick={() => switchTab('tracker')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('tracker')}>
            Tracker
          </div>
          <div className="nav-item" onClick={() => switchTab('inbox')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('inbox')}>
            Inbox <span className="nav-badge nav-badge-amber">1</span>
          </div>
          <div className="nav-grp">Agents</div>
          <div className="nav-item" onClick={() => switchTab('activity')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('activity')}>
            Activity log
          </div>
          <div className="nav-item" onClick={() => switchTab('profile')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('profile')}>
            Profile
          </div>
          <div className="sidebar-foot">
            <div className="user-pill">
              <div className="user-av">AR</div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500 }}>Aryan Rathi</div>
                <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>Data Analyst</div>
              </div>
            </div>
          </div>
        </nav>
        <main className="app-main">
          <div className="app-header">
            <div>
              <div className="app-title">Review & submit — Groww</div>
              <div className="app-sub">Apply Agent pre-filled 10 of 11 fields · 1 needs your input</div>
            </div>
            <span className="chip chip-amber">{pendingApprovals > 0 ? '1 item needs input' : 'All forms reviewed'}</span>
          </div>
          <div className="app-body">
            <div className="split">
              <div>
                <div className="alert alert-green" style={{ marginBottom: 14 }} role="status">
                  <div className="alert-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.5 2.5L10 3" stroke="var(--green)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="alert-title" style={{ color: 'var(--green)' }}>Agent filled 10 of 11 fields automatically</div>
                    <div className="alert-text">Review everything below. Nothing is sent until you confirm.</div>
                  </div>
                </div>
                <div className="form-preview" style={{ marginBottom: 14 }}>
                  <div className="form-preview-hdr">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1.5" y="1" width="9" height="10" rx="1" stroke="var(--text2)" strokeWidth="1" />
                    </svg>{' '}
                    Groww · Data Analyst form{' '}
                    <span className="chip chip-green" style={{ fontSize: 9 }}>
                      91% ATS
                    </span>
                  </div>
                  <div className="form-preview-body">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                      <div>
                        <div className="ff-label">
                          Full name <span className="badge-auto">auto</span>
                        </div>
                        <div className="ff-val">Aryan Rathi</div>
                      </div>
                      <div>
                        <div className="ff-label">
                          Email <span className="badge-auto">auto</span>
                        </div>
                        <div className="ff-val">aryan.rathi@email.com</div>
                      </div>
                      <div>
                        <div className="ff-label">
                          Phone <span className="badge-auto">auto</span>
                        </div>
                        <div className="ff-val">+91 98765 43210</div>
                      </div>
                      <div>
                        <div className="ff-label">
                          City <span className="badge-auto">auto</span>
                        </div>
                        <div className="ff-val">New Delhi</div>
                      </div>
                      <div>
                        <div className="ff-label">
                          Education <span className="badge-auto">auto</span>
                        </div>
                        <div className="ff-val">B.Tech DTU · 2025 · 8.2 CGPA</div>
                      </div>
                      <div>
                        <div className="ff-label">
                          Experience <span className="badge-auto">auto</span>
                        </div>
                        <div className="ff-val">Fresher (0–1 yr)</div>
                      </div>
                    </div>
                    <div>
                      <div className="ff-label">
                        Resume <span className="badge-auto">auto</span>
                      </div>
                      <div className="ff-val">Aryan_Resume_Groww_Tailored.pdf · 91% ATS</div>
                    </div>
                    <div>
                      <div className="ff-label">
                        Cover letter <span className="badge-auto">auto</span>
                      </div>
                      <div className="ff-val" style={{ fontSize: 11, lineHeight: 1.7 }}>
                        I&apos;m a final-year B.Tech student at DTU with strong skills in Python, SQL, and data visualisation. I&apos;ve built dashboards during my internship at XYZ Corp. I&apos;m excited by Groww&apos;s data-driven approach...
                      </div>
                    </div>
                    <div>
                      <div className="ff-label">
                        Why Groww? <span className="badge-manual">needs input</span>
                      </div>
                      <div className="ff-needs">
                        <strong style={{ display: 'block', marginBottom: 5, fontSize: 12 }}>This open question needs your personal answer.</strong>
                        <em style={{ fontStyle: 'italic', fontSize: 11 }}>
                          &quot;I&apos;ve been a Groww user for 2 years and I&apos;m passionate about making financial tools accessible. The Growth team&apos;s focus on funnel analytics aligns directly with the work I want to do...&quot;
                        </em>
                        <br />
                        <button type="button" className="btn-solid" style={{ marginTop: 8, padding: '5px 12px', fontSize: 10 }}>
                          Edit this answer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div className="card-hdr">
                    <div className="card-title">Checklist</div>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 11 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1 3.5L2.5 5L6 1.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      All personal fields filled
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1 3.5L2.5 5L6 1.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      Tailored resume (91% ATS)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1 3.5L2.5 5L6 1.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      Cover letter generated
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 8, fontWeight: 700, color: '#000' }}>
                        !
                      </div>
                      <span style={{ color: 'var(--amber)' }}>Open essay needs input</span>
                    </div>
                  </div>
                </div>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div className="card-hdr">
                    <div className="card-title">After you submit</div>
                  </div>
                  <div className="card-body" style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div>→ Application logged to tracker</div>
                    <div>→ Comms agent monitors for response</div>
                    <div>→ Follow-up nudge in 10 days if no reply</div>
                    <div>→ ATS feedback stored for future roles</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-green"
                  style={{ width: '100%', padding: 11, fontSize: 11, marginBottom: 8 }}
                  onClick={() => {
                    submitApplication();
                    switchTab('tracker');
                  }}
                >
                  Submit application
                </button>
                <button type="button" className="btn-ghost-sm" style={{ width: '100%', padding: 9, fontSize: 11 }}>
                  Save & finish later
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
