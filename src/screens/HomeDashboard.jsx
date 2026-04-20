import BrowserChrome from '../components/BrowserChrome';
import SidebarLogo from '../components/SidebarLogo';
import { useTab } from '../context/TabContext';
import { useMockFlow } from '../context/MockFlowContext';

export default function HomeDashboard() {
  const { switchTab } = useTab();
  const { applicationsTotal, pendingApprovals, urgentInboxCount } = useMockFlow();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/home" />
      <div className="app-layout">
        <nav className="sidebar" aria-label="App navigation">
          <SidebarLogo />
          <div className="nav-grp">Main</div>
          <div className="nav-item active" aria-current="page">
            Home
          </div>
          <div className="nav-item" onClick={() => switchTab('jobs')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('jobs')}>
            Jobs <span className="nav-badge" aria-label="12 new">12</span>
          </div>
          <div className="nav-item" onClick={() => switchTab('apply')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('apply')}>
            Apply <span className="nav-badge" aria-label={`${pendingApprovals} pending`}>{pendingApprovals}</span>
          </div>
          <div className="nav-item" onClick={() => switchTab('tracker')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('tracker')}>
            Tracker
          </div>
          <div className="nav-item" onClick={() => switchTab('inbox')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('inbox')}>
            Inbox <span className="nav-badge nav-badge-amber" aria-label={`${urgentInboxCount} urgent`}>{urgentInboxCount}</span>
          </div>
          <div className="nav-grp">Agents</div>
          <div className="nav-item" onClick={() => switchTab('activity')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('activity')}>
            Activity log
          </div>
          <div className="nav-item" onClick={() => switchTab('profile')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('profile')}>
            Profile
          </div>
          <div className="sidebar-foot">
            <div className="user-pill" tabIndex={0} role="button" aria-label="User: Aryan Rathi">
              <div className="user-av" aria-hidden="true">
                AR
              </div>
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
              <div className="app-title">Good morning, Aryan</div>
              <div className="app-sub">Wed 4 Apr 2026 · Agents ran 23 min ago</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-ghost-sm">
                Agent settings
              </button>
              <button type="button" className="btn-solid" style={{ padding: '7px 14px', fontSize: 11 }} onClick={() => switchTab('jobs')}>
                View 12 new matches →
              </button>
            </div>
          </div>
          <div className="app-body">
            <div className="kpi-row" role="list" aria-label="Today's summary">
              <div className="kpi-card" role="listitem">
                <div className="kpi-val" style={{ color: 'var(--blue)' }} aria-label="12 new matches">
                  12
                </div>
                <div className="kpi-lbl">New matches today</div>
                <div className="kpi-delta delta-up">↑ +4 vs yesterday</div>
              </div>
              <div className="kpi-card" role="listitem">
                <div className="kpi-val" style={{ color: 'var(--green)' }} aria-label={`${applicationsTotal} applications`}>
                  {applicationsTotal}
                </div>
                <div className="kpi-lbl">Total applications</div>
                <div className="kpi-delta delta-up">↑ +6 this week</div>
              </div>
              <div className="kpi-card" role="listitem">
                <div className="kpi-val" style={{ color: 'var(--amber)' }} aria-label={`${pendingApprovals} awaiting approval`}>
                  {pendingApprovals}
                </div>
                <div className="kpi-lbl">Awaiting approval</div>
                <div className="kpi-delta delta-warn">Action needed</div>
              </div>
              <div className="kpi-card" role="listitem">
                <div className="kpi-val" style={{ color: 'var(--red)' }} aria-label={`${urgentInboxCount} urgent message`}>
                  {urgentInboxCount}
                </div>
                <div className="kpi-lbl">Urgent message</div>
                <div className="kpi-delta delta-red">Respond today</div>
              </div>
            </div>
            <div className="split">
              <div>
                <div className="card" style={{ marginBottom: 14 }}>
                  <div className="card-hdr">
                    <div className="card-title">Needs attention</div>
                    <span className="chip chip-red">3 items</span>
                  </div>
                  <div className="card-body" style={{ padding: 10 }}>
                    <div className="alert alert-red" role="alert">
                      <div className="alert-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 3.5l4 3.2 4-3.2" stroke="var(--red)" strokeWidth="1" strokeLinecap="round" />
                          <rect x="1.5" y="2.5" width="9" height="7" rx="1.2" stroke="var(--red)" strokeWidth="1" />
                        </svg>
                      </div>
                      <div>
                        <div className="alert-title" style={{ color: 'var(--red)' }}>
                          Interview invite — Swiggy · Product Analyst
                        </div>
                        <div className="alert-text">
                          Swiggy HR invited you for a technical round. Confirm by <strong style={{ color: 'var(--text)' }}>tomorrow, 5pm</strong>.
                        </div>
                        <div className="alert-actions">
                          <button type="button" className="alert-btn alert-btn-solid" onClick={() => switchTab('inbox')}>
                            Review & reply
                          </button>
                          <button type="button" className="alert-btn alert-btn-ghost">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="alert alert-blue">
                      <div className="alert-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <rect x="1.5" y="1.5" width="9" height="9" rx="1.2" stroke="var(--blue)" strokeWidth="1" />
                          <path d="M3.5 6h5M6 3.5v5" stroke="var(--blue)" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="alert-title" style={{ color: 'var(--blue)' }}>Razorpay application ready — awaiting approval</div>
                        <div className="alert-text">ATS 84%. All 11 fields pre-filled. Review and submit in 60s.</div>
                        <div className="alert-actions">
                          <button type="button" className="alert-btn alert-btn-solid" onClick={() => switchTab('apply')}>
                            Review & submit
                          </button>
                          <button type="button" className="alert-btn alert-btn-ghost">
                            Not now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="alert alert-amber">
                      <div className="alert-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <circle cx="6" cy="6" r="4" stroke="var(--amber)" strokeWidth="1" />
                          <path d="M6 4v2.5L7.5 8" stroke="var(--amber)" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="alert-title" style={{ color: 'var(--amber)' }}>Follow-up nudge — Flipkart · 11 days ago</div>
                        <div className="alert-text">They viewed your profile 4 days ago. A short follow-up often helps at this stage.</div>
                        <div className="alert-actions">
                          <button type="button" className="alert-btn" style={{ background: 'var(--amber)', color: '#000', fontSize: 10, padding: '4px 10px', cursor: 'pointer' }}>
                            Send follow-up
                          </button>
                          <button type="button" className="alert-btn alert-btn-ghost">
                            Skip
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-hdr">
                    <div className="card-title">Top matches today</div>
                    <button type="button" className="btn-solid" style={{ padding: '5px 12px', fontSize: 10 }} onClick={() => switchTab('jobs')}>
                      See all 12 →
                    </button>
                  </div>
                  <div className="card-body" style={{ padding: 10 }}>
                    <div
                      className="job-card sel"
                      onClick={() => switchTab('jobdetail')}
                      tabIndex={0}
                      role="button"
                      aria-label="Groww Data Analyst 91 percent match"
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('jobdetail')}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                        <div className="co-logo" style={{ background: '#1a5f1a' }} aria-hidden="true">
                          G
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="job-title-txt">Data Analyst — Growth</div>
                          <div className="job-co">Groww · Bangalore · Hybrid</div>
                        </div>
                        <div className="match-high" aria-label="91% match">
                          91%
                        </div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span className="job-tag">SQL</span>
                        <span className="job-tag">Python</span>
                        <span className="job-tag">Data Viz</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>2 days ago · Actively hiring</span>
                        <button
                          type="button"
                          className="btn-solid"
                          style={{ padding: '5px 10px', fontSize: 10 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            switchTab('jobdetail');
                          }}
                        >
                          Apply →
                        </button>
                      </div>
                    </div>
                    <div
                      className="job-card"
                      onClick={() => switchTab('jobdetail')}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('jobdetail')}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                        <div className="co-logo" style={{ background: '#7a2000' }} aria-hidden="true">
                          Ph
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="job-title-txt">Business Analyst</div>
                          <div className="job-co">PhonePe · Pune · On-site</div>
                        </div>
                        <div className="match-high">87%</div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span className="job-tag">SQL</span>
                        <span className="job-tag">Fintech</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>1 day ago</span>
                        <button type="button" className="btn-solid" style={{ padding: '5px 10px', fontSize: 10 }} onClick={(e) => e.stopPropagation()}>
                          Apply →
                        </button>
                      </div>
                    </div>
                    <div className="job-card" tabIndex={0} role="button">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                        <div className="co-logo" style={{ background: '#3a2070' }} aria-hidden="true">
                          Cr
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="job-title-txt">BA — Partnerships</div>
                          <div className="job-co">CRED · Bangalore · Hybrid</div>
                        </div>
                        <div className="match-med" aria-label="78% match">
                          78%
                        </div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span className="job-tag">Excel</span>
                        <span className="job-tag">SQL</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>3 days ago</span>
                        <button type="button" className="btn-solid" style={{ padding: '5px 10px', fontSize: 10 }}>
                          Apply →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div className="card-hdr">
                    <div className="card-title">Agent status</div>
                    <span className="chip chip-green" style={{ fontSize: 9 }}>
                      All active
                    </span>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 11 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div className="pill-dot" style={{ background: 'var(--blue)' }} />
                        Discovery
                      </div>
                      <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--text3)' }}>12 new today</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div className="pill-dot" style={{ background: 'var(--green)' }} />
                        Resume
                      </div>
                      <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--text3)' }}>9 tailored</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div className="pill-dot" style={{ background: 'var(--amber)' }} />
                        Apply
                      </div>
                      <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--amber)' }}>3 awaiting</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div className="pill-dot" style={{ background: 'var(--red)' }} />
                        Comms
                      </div>
                      <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--red)' }}>1 urgent</span>
                    </div>
                  </div>
                </div>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div className="card-hdr">
                    <div className="card-title">This week</div>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 11 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: 'var(--text2)' }}>Applications</span>
                        <span style={{ fontFamily: "'Space Mono',monospace" }}>38/50</span>
                      </div>
                      <div className="ats-bar">
                        <div className="ats-fill" style={{ width: '76%', background: 'var(--blue)' }} />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: 'var(--text2)' }}>Avg ATS score</span>
                        <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--green)' }}>87%</span>
                      </div>
                      <div className="ats-bar">
                        <div className="ats-fill" style={{ width: '87%', background: 'var(--green)' }} />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: 'var(--text2)' }}>Response rate</span>
                        <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--amber)' }}>18%</span>
                      </div>
                      <div className="ats-bar">
                        <div className="ats-fill" style={{ width: '18%', background: 'var(--amber)' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-hdr">
                    <div className="card-title">Recent activity</div>
                  </div>
                  <div className="card-body" style={{ padding: '10px 14px' }}>
                    <div className="act-item">
                      <div className="act-dot" style={{ background: 'var(--green)' }} />
                      <div>
                        <div className="act-txt">Applied to Groww — Data Analyst (91%)</div>
                        <div className="act-time">23 min ago · Apply Agent</div>
                      </div>
                    </div>
                    <div className="act-item">
                      <div className="act-dot" style={{ background: 'var(--blue)' }} />
                      <div>
                        <div className="act-txt">Resume tailored for PhonePe — ATS 87%</div>
                        <div className="act-time">45 min ago · Resume Agent</div>
                      </div>
                    </div>
                    <div className="act-item">
                      <div className="act-dot" style={{ background: 'var(--red)' }} />
                      <div>
                        <div className="act-txt">Swiggy interview invite flagged</div>
                        <div className="act-time">1 hr ago · Comms Agent</div>
                      </div>
                    </div>
                    <div className="act-item">
                      <div className="act-dot" style={{ background: 'var(--text3)' }} />
                      <div>
                        <div className="act-txt">12 new matches discovered</div>
                        <div className="act-time">2 hrs ago · Discovery Agent</div>
                      </div>
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
