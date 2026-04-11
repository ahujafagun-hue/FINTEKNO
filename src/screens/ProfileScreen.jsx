import BrowserChrome from '../components/BrowserChrome';
import SidebarLogo from '../components/SidebarLogo';
import TagSel from '../components/TagSel';
import Toggle from '../components/Toggle';
import { useTab } from '../context/TabContext';

export default function ProfileScreen() {
  const { switchTab } = useTab();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/profile" />
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
          <div className="nav-item" onClick={() => switchTab('apply')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('apply')}>
            Apply <span className="nav-badge">3</span>
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
          <div className="nav-item active" aria-current="page">
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
              <div className="app-title">Profile settings</div>
              <div className="app-sub">Powers all four agents — keep it current</div>
            </div>
            <button type="button" className="btn-solid" style={{ padding: '7px 14px', fontSize: 11 }}>
              Save changes
            </button>
          </div>
          <div className="app-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div className="card" style={{ marginBottom: 14 }}>
                  <div className="card-hdr">
                    <div className="card-title">Personal info</div>
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          border: '1px solid var(--border2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16,
                          fontWeight: 700,
                          color: 'var(--text)',
                          fontFamily: "'Space Mono',monospace",
                        }}
                      >
                        AR
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>Aryan Rathi</div>
                        <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>
                          aryan.rathi@email.com · +91 98765 43210
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11, fontFamily: "'Space Mono',monospace" }}>
                      <div>
                        <div className="form-label" style={{ fontSize: 9 }}>
                          City
                        </div>
                        <div style={{ color: 'var(--text2)' }}>New Delhi</div>
                      </div>
                      <div>
                        <div className="form-label" style={{ fontSize: 9 }}>
                          Relocation
                        </div>
                        <div style={{ color: 'var(--text2)' }}>Open (anywhere)</div>
                      </div>
                      <div>
                        <div className="form-label" style={{ fontSize: 9 }}>
                          LinkedIn
                        </div>
                        <div style={{ color: 'var(--blue)' }}>linkedin.com/in/aryanrathi</div>
                      </div>
                      <div>
                        <div className="form-label" style={{ fontSize: 9 }}>
                          Portfolio
                        </div>
                        <div style={{ color: 'var(--blue)' }}>aryanrathi.notion.site</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card" style={{ marginBottom: 14 }}>
                  <div className="card-hdr">
                    <div className="card-title">Education</div>
                  </div>
                  <div className="card-body">
                    <div style={{ fontSize: 13, fontWeight: 500 }}>B.Tech — Computer Science</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'Space Mono',monospace", marginTop: 3 }}>DTU · 2021–2025 · 8.2 CGPA</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-hdr">
                    <div className="card-title">Platforms</div>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 11 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 18, height: 18, background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: "'Space Mono',monospace" }}>in</div>
                        LinkedIn
                      </div>
                      <span style={{ color: 'var(--green)', fontFamily: "'Space Mono',monospace" }}>Connected</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 18, height: 18, background: '#D44638', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: "'Space Mono',monospace" }}>G</div>
                        Gmail
                      </div>
                      <span style={{ color: 'var(--green)', fontFamily: "'Space Mono',monospace" }}>Read-only</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 18, height: 18, background: '#CC2222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: "'Space Mono',monospace" }}>N</div>
                        Naukri
                      </div>
                      <span style={{ color: 'var(--amber)', fontFamily: "'Space Mono',monospace", cursor: 'pointer' }}>Connect →</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card" style={{ marginBottom: 14 }}>
                  <div className="card-hdr">
                    <div className="card-title">Job preferences</div>
                    <span className="chip chip-blue" style={{ fontSize: 8 }}>
                      Discovery uses
                    </span>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <div className="form-label">Target roles</div>
                      <div style={{ marginTop: 4 }}>
                        <TagSel defaultOn style={{ fontSize: 10 }}>
                          Data Analyst
                        </TagSel>
                        <TagSel defaultOn style={{ fontSize: 10 }}>
                          Business Analyst
                        </TagSel>
                        <TagSel style={{ fontSize: 10 }}>+ Add</TagSel>
                      </div>
                    </div>
                    <div>
                      <div className="form-label">Work mode</div>
                      <div style={{ marginTop: 4 }}>
                        <TagSel defaultOn style={{ fontSize: 10 }}>
                          Hybrid
                        </TagSel>
                        <TagSel defaultOn style={{ fontSize: 10 }}>
                          Remote
                        </TagSel>
                        <TagSel style={{ fontSize: 10 }}>On-site</TagSel>
                      </div>
                    </div>
                    <div>
                      <div className="form-label">Salary</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: "'Space Mono',monospace", marginTop: 4 }}>₹ 6 – 12 LPA</div>
                    </div>
                  </div>
                </div>
                <div className="card" style={{ marginBottom: 14 }}>
                  <div className="card-hdr">
                    <div className="card-title">Resume</div>
                    <span className="chip chip-red" style={{ fontSize: 8 }}>
                      Resume agent uses
                    </span>
                  </div>
                  <div className="card-body">
                    <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 24, height: 24, background: 'var(--bg)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <rect x="1.5" y="1" width="8" height="9" rx="1" stroke="var(--text2)" strokeWidth="1" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 500 }}>Aryan_Resume_2025.pdf</div>
                        <div style={{ fontSize: 10, color: 'var(--blue)', fontFamily: "'Space Mono',monospace" }}>Base · ATS: 74% · 23 skills</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'Space Mono',monospace", marginBottom: 8 }}>9 tailored versions this month</div>
                    <button type="button" className="btn-ghost-sm" style={{ fontSize: 10 }}>
                      Replace resume
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-hdr">
                    <div className="card-title">Agent settings</div>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 11 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text2)' }}>Require approval before submit</span>
                      <Toggle defaultOn />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text2)' }}>Daily job digest</span>
                      <Toggle defaultOn />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text2)' }}>Email monitoring (read-only)</span>
                      <Toggle defaultOn />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text2)' }}>Follow-up nudges</span>
                      <Toggle defaultOn />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
