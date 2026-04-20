import BrowserChrome from '../components/BrowserChrome';
import SidebarLogo from '../components/SidebarLogo';
import { useTab } from '../context/TabContext';
import { useMockFlow } from '../context/MockFlowContext';

export default function JobDetail() {
  const { switchTab } = useTab();
  const { savedJobs, toggleSavedJob } = useMockFlow();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/jobs/groww-data-analyst" />
      <div className="app-layout">
        <nav className="sidebar" aria-label="App navigation">
          <SidebarLogo />
          <div className="nav-grp">Main</div>
          <div className="nav-item" onClick={() => switchTab('home')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('home')}>
            Home
          </div>
          <div className="nav-item active" onClick={() => switchTab('jobs')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('jobs')}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button type="button" className="btn-ghost-sm" onClick={() => switchTab('jobs')}>
                ← Back
              </button>
              <div>
                <div className="app-title">Groww — Data Analyst</div>
                <div className="app-sub">Bangalore · Hybrid · ₹8–14 LPA · 2 days ago</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-ghost-sm" onClick={() => toggleSavedJob('growwDataAnalyst')}>
                {savedJobs.growwDataAnalyst ? 'Saved' : 'Save'}
              </button>
              <button type="button" className="btn-green" style={{ padding: '7px 16px', fontSize: 11 }} onClick={() => switchTab('apply')}>
                Apply with FINTEKNO AI →
              </button>
            </div>
          </div>
          <div className="app-body">
            <div className="split">
              <div>
                <div className="card" style={{ marginBottom: 14 }}>
                  <div className="card-hdr">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="co-logo" style={{ background: '#1a5f1a', width: 40, height: 40, fontSize: 14 }}>
                        G
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Data Analyst — Growth</div>
                        <div className="job-co">Groww · Bangalore</div>
                      </div>
                    </div>
                    <div className="match-high" style={{ fontSize: 14 }}>
                      91%
                    </div>
                  </div>
                  <div className="card-body">
                    <div style={{ marginBottom: 14 }}>
                      <span className="job-tag">SQL</span>
                      <span className="job-tag">Python</span>
                      <span className="job-tag">Data Viz</span>
                      <span className="job-tag">0–2 yrs</span>
                      <span className="job-tag">Fresher OK</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>
                      <p style={{ marginBottom: 10 }}>
                        We&apos;re looking for a curious, data-driven analyst to join Groww&apos;s Growth team. You&apos;ll work on product funnels, analyse user behaviour, and help drive decisions affecting 4M+ investors.
                      </p>
                      <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 7, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>What you&apos;ll do</p>
                      <ul style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12, fontSize: 12 }}>
                        <li>Build dashboards tracking product KPIs using SQL and Python</li>
                        <li>Analyse A/B tests and user cohorts for growth initiatives</li>
                        <li>Work cross-functionally with Product, Engineering, and Marketing</li>
                        <li>Present findings directly to senior leadership</li>
                      </ul>
                      <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 7, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Requirements</p>
                      <ul style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12 }}>
                        <li>Strong SQL — complex queries comfortably</li>
                        <li>Python (pandas, numpy) for data manipulation</li>
                        <li>Any visualisation tool (Tableau, Power BI, Looker)</li>
                        <li>0–2 years experience. Freshers welcome.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-hdr">
                    <div className="card-title">ATS analysis</div>
                    <span className="chip chip-green" style={{ fontSize: 9 }}>
                      91% after tailoring
                    </span>
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                      <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--green)', fontFamily: "'Space Mono',monospace" }} aria-label="91% ATS match">
                        91%
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>match after tailoring</span>
                    </div>
                    <div className="ats-bar">
                      <div className="ats-fill" style={{ width: '91%', background: 'var(--green)' }} />
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7, fontFamily: "'Space Mono',monospace" }}>Keywords</div>
                      <span className="kw-tag kw-present">SQL</span>
                      <span className="kw-tag kw-present">Python</span>
                      <span className="kw-tag kw-present">Pandas</span>
                      <span className="kw-tag kw-present">Dashboard</span>
                      <span className="kw-tag kw-missing">Tableau</span>
                      <span className="kw-tag kw-missing">A/B Testing</span>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7, fontFamily: "'Space Mono',monospace" }}>Resume diff</div>
                      <div className="diff-grid">
                        <div className="diff-col">
                          <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 7, fontFamily: "'Space Mono',monospace" }}>Original</div>
                          Conducted <span className="diff-rem">data research</span> and built <span className="diff-rem">reports</span>
                        </div>
                        <div className="diff-col">
                          <div style={{ fontSize: 9, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 7, fontFamily: "'Space Mono',monospace" }}>Tailored</div>
                          Conducted <span className="diff-add">SQL-based analysis</span> and built <span className="diff-add">Tableau dashboards</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div className="card-hdr">
                    <div className="card-title">Apply with FINTEKNO AI</div>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <div style={{ width: 14, height: 14, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1 3.5L2.5 5L6 1.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      Resume tailored — 91% ATS
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <div style={{ width: 14, height: 14, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1 3.5L2.5 5L6 1.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      11 form fields pre-filled
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <div style={{ width: 14, height: 14, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1 3.5L2.5 5L6 1.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      Cover letter written
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <div style={{ width: 14, height: 14, background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 8, fontWeight: 700, color: '#000' }}>
                        !
                      </div>
                      <span style={{ color: 'var(--amber)' }}>1 open essay — review needed</span>
                    </div>
                    <button type="button" className="btn-green" style={{ width: '100%', padding: 10, fontSize: 11 }} onClick={() => switchTab('apply')}>
                      Review & submit →
                    </button>
                    <button type="button" className="btn-ghost-sm" style={{ width: '100%', padding: 9 }} onClick={() => toggleSavedJob('growwDataAnalyst')}>
                      {savedJobs.growwDataAnalyst ? 'Saved for later' : 'Save for later'}
                    </button>
                  </div>
                </div>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div className="card-hdr">
                    <div className="card-title">Role signals</div>
                  </div>
                  <div className="card-body" style={{ fontSize: 11, display: 'flex', flexDirection: 'column', gap: 8, fontFamily: "'Space Mono',monospace" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Applicants</span>
                      <span>18 (low)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Ghost risk</span>
                      <span style={{ color: 'var(--green)' }}>Very low</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Avg reply</span>
                      <span>5–7 days</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Salary</span>
                      <span>₹8–14 LPA</span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-hdr">
                    <div className="card-title">Similar matches</div>
                  </div>
                  <div className="card-body" style={{ padding: 8 }}>
                    <div className="job-card" style={{ marginBottom: 4, padding: 9 }}>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>Data Analyst · Zepto</div>
                      <div className="job-co">Mumbai · 80%</div>
                    </div>
                    <div className="job-card" style={{ marginBottom: 0, padding: 9 }}>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>BA · Meesho</div>
                      <div className="job-co">Remote · 76%</div>
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
