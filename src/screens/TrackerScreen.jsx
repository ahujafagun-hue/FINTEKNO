import BrowserChrome from '../components/BrowserChrome';
import SidebarLogo from '../components/SidebarLogo';
import { useTab } from '../context/TabContext';
import { useMockFlow } from '../context/MockFlowContext';

export default function TrackerScreen() {
  const { switchTab } = useTab();
  const { applicationsTotal, appliedStageCount, pendingApprovals } = useMockFlow();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/tracker" />
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
            Apply <span className="nav-badge">{pendingApprovals}</span>
          </div>
          <div className="nav-item active" aria-current="page">
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
              <div className="app-title">Application pipeline</div>
              <div className="app-sub">{applicationsTotal} total · 8 active · 2 interviews</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn-ghost-sm">
                + Log manually
              </button>
              <button type="button" className="btn-ghost-sm">
                Export
              </button>
            </div>
          </div>
          <div className="app-body">
            <div className="pipe-grid" role="list" aria-label="Application stages">
              <div className="pipe-col" role="listitem">
                <div className="pipe-col-hdr">
                  Applied <span className="pipe-cnt">{appliedStageCount}</span>
                </div>
                <div className="pipe-card">
                  <div className="pipe-card-title">Data Analyst</div>
                  <div className="pipe-card-co">Groww</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="pipe-card-date">Today · 91%</div>
                    <span className="chip chip-green" style={{ fontSize: 8, padding: '1px 5px' }}>
                      NEW
                    </span>
                  </div>
                </div>
                <div className="pipe-card">
                  <div className="pipe-card-title">Business Analyst</div>
                  <div className="pipe-card-co">PhonePe</div>
                  <div className="pipe-card-date">Yesterday · 87%</div>
                </div>
                <div className="pipe-card">
                  <div className="pipe-card-title">Data Analyst</div>
                  <div className="pipe-card-co">Meesho</div>
                  <div className="pipe-card-date">2 days · 82%</div>
                </div>
                <div className="pipe-card" style={{ opacity: 0.4 }}>
                  <div className="pipe-card-title">+19 more</div>
                </div>
              </div>
              <div className="pipe-col" role="listitem">
                <div className="pipe-col-hdr">
                  Under review <span className="pipe-cnt">8</span>
                </div>
                <div className="pipe-card" style={{ borderLeft: '2px solid var(--amber)' }}>
                  <div className="pipe-card-title">Data Analyst Risk</div>
                  <div className="pipe-card-co">Razorpay</div>
                  <div className="pipe-card-date">Viewed 4 days ago</div>
                  <div style={{ marginTop: 4 }}>
                    <span className="chip chip-amber" style={{ fontSize: 8 }}>
                      Follow-up ready
                    </span>
                  </div>
                </div>
                <div className="pipe-card">
                  <div className="pipe-card-title">BA — Partnerships</div>
                  <div className="pipe-card-co">CRED</div>
                  <div className="pipe-card-date">Viewed 2 days ago</div>
                </div>
                <div className="pipe-card">
                  <div className="pipe-card-title">Data Analyst</div>
                  <div className="pipe-card-co">Zepto</div>
                  <div className="pipe-card-date">Viewed 1 day ago</div>
                </div>
                <div className="pipe-card" style={{ opacity: 0.4 }}>
                  <div className="pipe-card-title">+5 more</div>
                </div>
              </div>
              <div className="pipe-col" role="listitem">
                <div className="pipe-col-hdr">
                  Interviews{' '}
                  <span className="pipe-cnt" style={{ background: 'var(--green)', color: '#000' }}>
                    2
                  </span>
                </div>
                <div className="pipe-card" style={{ borderLeft: '2px solid var(--red)' }}>
                  <div className="pipe-card-title">Product Analyst</div>
                  <div className="pipe-card-co">Swiggy</div>
                  <div className="pipe-card-date">Thu 10 Apr · Technical</div>
                  <div style={{ marginTop: 4 }}>
                    <span className="chip chip-red" style={{ fontSize: 8 }}>
                      Confirm today
                    </span>
                  </div>
                </div>
                <div className="pipe-card" style={{ borderLeft: '2px solid var(--green)' }}>
                  <div className="pipe-card-title">Data Analyst</div>
                  <div className="pipe-card-co">Flipkart</div>
                  <div className="pipe-card-date">Fri 11 Apr · HR</div>
                  <div style={{ marginTop: 4 }}>
                    <span className="chip chip-green" style={{ fontSize: 8 }}>
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
              <div className="pipe-col" role="listitem">
                <div className="pipe-col-hdr">
                  Offers <span className="pipe-cnt">0</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', padding: '20px 8px', lineHeight: 1.6, fontFamily: "'Space Mono',monospace" }}>
                  Offers will appear here. Keep applying.
                </div>
              </div>
              <div className="pipe-col" role="listitem">
                <div className="pipe-col-hdr">
                  Rejected <span className="pipe-cnt">6</span>
                </div>
                <div className="pipe-card" style={{ opacity: 0.55 }}>
                  <div className="pipe-card-title">Data Analyst</div>
                  <div className="pipe-card-co">Flipkart (prev)</div>
                  <div className="pipe-card-date">ATS: 58%</div>
                </div>
                <div className="pipe-card" style={{ opacity: 0.55 }}>
                  <div className="pipe-card-title">SDE Intern</div>
                  <div className="pipe-card-co">Amazon</div>
                  <div className="pipe-card-date">Profile mismatch</div>
                </div>
                <div className="pipe-card" style={{ opacity: 0.35 }}>
                  <div className="pipe-card-title">+4 more</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
