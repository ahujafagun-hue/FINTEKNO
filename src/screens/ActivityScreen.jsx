import BrowserChrome from '../components/BrowserChrome';
import SidebarLogo from '../components/SidebarLogo';
import { useTab } from '../context/TabContext';

export default function ActivityScreen() {
  const { switchTab } = useTab();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/activity" />
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
          <div className="nav-item active" aria-current="page">
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
              <div className="app-title">Agent activity log</div>
              <div className="app-sub">Full audit trail — everything your agents did</div>
            </div>
          </div>
          <div className="app-body" style={{ maxWidth: 640 }}>
            <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, fontFamily: "'Space Mono',monospace" }}>Today</div>
            <div className="card" style={{ marginBottom: 14 }}>
              <div className="card-body" style={{ padding: '0 14px' }}>
                <div className="act-item">
                  <div className="act-dot" style={{ background: 'var(--green)' }} />
                  <div>
                    <div className="act-txt">
                      Applied to <strong style={{ color: 'var(--text)' }}>Groww — Data Analyst (Growth)</strong> · 91% ATS · Cover letter written
                    </div>
                    <div className="act-time">23 min ago · Apply Agent</div>
                  </div>
                </div>
                <div className="act-item">
                  <div className="act-dot" style={{ background: 'var(--blue)' }} />
                  <div>
                    <div className="act-txt">
                      Resume tailored for <strong style={{ color: 'var(--text)' }}>PhonePe — Business Analyst</strong> · 3 keywords inserted · ATS 87%
                    </div>
                    <div className="act-time">45 min ago · Resume Agent</div>
                  </div>
                </div>
                <div className="act-item">
                  <div className="act-dot" style={{ background: 'var(--red)' }} />
                  <div>
                    <div className="act-txt">
                      Flagged recruiter email from <strong style={{ color: 'var(--text)' }}>Swiggy HR</strong> · Interview invite · Confirm by tomorrow 5pm
                    </div>
                    <div className="act-time">1 hr ago · Comms Agent</div>
                  </div>
                </div>
                <div className="act-item">
                  <div className="act-dot" style={{ background: 'var(--text3)' }} />
                  <div>
                    <div className="act-txt">Scanned LinkedIn, Naukri, Indeed · 12 new matches above 75% · 2 ghost jobs filtered</div>
                    <div className="act-time">2 hrs ago · Discovery Agent</div>
                  </div>
                </div>
                <div className="act-item">
                  <div className="act-dot" style={{ background: 'var(--blue)' }} />
                  <div>
                    <div className="act-txt">
                      Resume tailored for <strong style={{ color: 'var(--text)' }}>Swiggy — Data Analyst Ops</strong> · ATS 84%
                    </div>
                    <div className="act-time">3 hrs ago · Resume Agent</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, fontFamily: "'Space Mono',monospace" }}>Yesterday</div>
            <div className="card">
              <div className="card-body" style={{ padding: '0 14px' }}>
                <div className="act-item">
                  <div className="act-dot" style={{ background: 'var(--green)' }} />
                  <div>
                    <div className="act-txt">
                      Applied to <strong style={{ color: 'var(--text)' }}>PhonePe — Business Analyst</strong> after your approval
                    </div>
                    <div className="act-time">Yesterday 6:20 PM · Apply Agent</div>
                  </div>
                </div>
                <div className="act-item">
                  <div className="act-dot" style={{ background: 'var(--amber)' }} />
                  <div>
                    <div className="act-txt">
                      Follow-up nudge generated for <strong style={{ color: 'var(--text)' }}>Flipkart</strong> — 11 days without response
                    </div>
                    <div className="act-time">Yesterday 3:00 PM · Comms Agent</div>
                  </div>
                </div>
                <div className="act-item">
                  <div className="act-dot" style={{ background: 'var(--text3)' }} />
                  <div>
                    <div className="act-txt">Scanned 4,100 listings · 9 new matches · 3 below threshold excluded</div>
                    <div className="act-time">Yesterday 7:00 AM · Discovery Agent</div>
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
