import BrowserChrome from '../components/BrowserChrome';
import SidebarLogo from '../components/SidebarLogo';
import { useTab } from '../context/TabContext';

export default function JobsFeed() {
  const { switchTab } = useTab();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/jobs" />
      <div className="app-layout">
        <nav className="sidebar" aria-label="App navigation">
          <SidebarLogo />
          <div className="nav-grp">Main</div>
          <div className="nav-item" onClick={() => switchTab('home')} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('home')}>
            Home
          </div>
          <div className="nav-item active" aria-current="page">
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
            <div>
              <div className="app-title">Job discovery</div>
              <div className="app-sub">12 new matches · 4,300 listings scanned · 2 ghost jobs filtered</div>
            </div>
            <span className="chip chip-green">Discovery: Active</span>
          </div>
          <div className="app-body">
            <div className="search-row" role="search">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <circle cx="5.5" cy="5.5" r="3.5" stroke="var(--text3)" strokeWidth="1.2" />
                <path d="M9 9l1.5 1.5" stroke="var(--text3)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input className="search-input" placeholder="Search roles, skills, companies..." aria-label="Search jobs" />
              <button type="button" className="btn-ghost-sm">
                Location
              </button>
              <button type="button" className="btn-ghost-sm">
                Role
              </button>
              <button type="button" className="btn-ghost-sm">
                Salary
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              <button type="button" className="btn-solid" style={{ padding: '5px 12px', fontSize: 10 }}>
                All (12)
              </button>
              <button type="button" className="btn-ghost-sm">
                90%+ match
              </button>
              <button type="button" className="btn-ghost-sm">
                New today
              </button>
              <button type="button" className="btn-ghost-sm">
                Easy Apply
              </button>
              <button type="button" className="btn-ghost-sm">
                Remote
              </button>
            </div>
            <div role="list" aria-label="Job listings">
              <div
                className="job-card sel"
                onClick={() => switchTab('jobdetail')}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('jobdetail')}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <div className="co-logo" style={{ background: '#1a5f1a' }}>
                    G
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="job-title-txt">Data Analyst — Growth</div>
                    <div className="job-co">Groww · Bangalore · Hybrid · ₹8–14 LPA</div>
                  </div>
                  <div className="match-high">91%</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8, lineHeight: 1.55 }}>
                  Analyse product funnels for Groww&apos;s 4M+ user base. Work directly with the growth team on key metrics.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="job-tag">SQL</span>
                  <span className="job-tag">Python</span>
                  <span className="job-tag">Data Viz</span>
                  <span className="job-tag">0–2 yrs</span>
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
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && switchTab('jobdetail')}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <div className="co-logo" style={{ background: '#7a2000' }}>
                    Ph
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="job-title-txt">Business Analyst</div>
                    <div className="job-co">PhonePe · Pune · On-site · ₹6–10 LPA</div>
                  </div>
                  <div className="match-high">87%</div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="job-tag">SQL</span>
                  <span className="job-tag">Python</span>
                  <span className="job-tag">Fintech</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>1 day ago</span>
                  <button type="button" className="btn-solid" style={{ padding: '5px 10px', fontSize: 10 }} onClick={(e) => e.stopPropagation()}>
                    Apply →
                  </button>
                </div>
              </div>
              <div className="job-card" role="listitem" tabIndex={0}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <div className="co-logo" style={{ background: '#5a3000' }}>
                    Sw
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="job-title-txt">Data Analyst — Operations</div>
                    <div className="job-co">Swiggy · Bangalore · Hybrid · ₹7–12 LPA</div>
                  </div>
                  <div className="match-high">84%</div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="job-tag">SQL</span>
                  <span className="job-tag">Excel</span>
                  <span className="job-tag">Tableau</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>3 days ago</span>
                  <button type="button" className="btn-solid" style={{ padding: '5px 10px', fontSize: 10 }}>
                    Apply →
                  </button>
                </div>
              </div>
              <div className="job-card" role="listitem" tabIndex={0}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <div className="co-logo" style={{ background: '#002060' }}>
                    Rz
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="job-title-txt">Data Analyst — Risk</div>
                    <div className="job-co">Razorpay · Remote · ₹8–13 LPA</div>
                  </div>
                  <div className="match-high">82%</div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="job-tag">Python</span>
                  <span className="job-tag">SQL</span>
                  <span className="job-tag">Risk</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>4 days ago</span>
                  <button type="button" className="btn-solid" style={{ padding: '5px 10px', fontSize: 10 }}>
                    Apply →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
