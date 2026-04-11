import BrowserChrome from '../components/BrowserChrome';
import SidebarLogo from '../components/SidebarLogo';
import { useTab } from '../context/TabContext';

export default function InboxScreen() {
  const { switchTab } = useTab();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/inbox" />
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
          <div className="nav-item active" aria-current="page">
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
              <div className="app-title">Recruiter inbox</div>
              <div className="app-sub">Comms agent · read-only Gmail · 1 urgent</div>
            </div>
            <span className="chip chip-green" style={{ padding: '7px 12px' }}>
              Comms: Active
            </span>
          </div>
          <div className="app-body" style={{ maxWidth: 680 }}>
            <article className="email-card" aria-label="Urgent: Swiggy interview invite">
              <div className="email-hdr">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: '#5a0000',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Space Mono',monospace",
                    color: 'var(--text)',
                    flexShrink: 0,
                  }}
                >
                  SW
                </div>
                <div style={{ flex: 1 }}>
                  <div className="email-from">Priya Sharma · Swiggy HR</div>
                  <div className="email-subj">Interview invite — Product Analyst (Technical Round)</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>Today 9:41 AM</div>
                  <span className="chip chip-red" style={{ marginTop: 5, fontSize: 9 }}>
                    Urgent
                  </span>
                </div>
              </div>
              <div className="email-body">
                Hi Aryan,
                <br />
                <br />
                Thank you for applying for the Product Analyst role. We&apos;d love to invite you for a technical interview.
                <br />
                <br />
                Available slots:
                <br />
                · Thursday 10 Apr · 11 AM–12 PM
                <br />
                · Thursday 10 Apr · 3–4 PM
                <br />
                · Friday 11 Apr · 10–11 AM
                <br />
                <br />
                Please confirm by <strong>tomorrow 5 PM.</strong>
              </div>
              <div className="email-reply">
                <div className="email-reply-label">Comms agent — suggested reply</div>
                <div className="email-reply-text">
                  Hi Priya,
                  <br />
                  <br />
                  Thank you for the invitation! I&apos;m available on Thursday 10 April at 11 AM–12 PM. Please let me know if you need anything else.
                  <br />
                  <br />
                  Looking forward to it!
                  <br />
                  <br />
                  Best,
                  <br />
                  Aryan Rathi
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, padding: '8px 16px 14px' }}>
                <button type="button" className="btn-solid" style={{ padding: '6px 14px', fontSize: 10 }}>
                  Send this reply
                </button>
                <button type="button" className="btn-ghost-sm">
                  Edit first
                </button>
                <button type="button" className="btn-ghost-sm">
                  Dismiss
                </button>
              </div>
            </article>
            <article className="email-card">
              <div className="email-hdr">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: '#001a40',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Space Mono',monospace",
                    color: 'var(--text)',
                    flexShrink: 0,
                  }}
                >
                  FK
                </div>
                <div style={{ flex: 1 }}>
                  <div className="email-from">Flipkart Talent Team</div>
                  <div className="email-subj">Application update — Data Analyst</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>Yesterday</div>
                  <span className="chip chip-green" style={{ marginTop: 5, fontSize: 9 }}>
                    Positive
                  </span>
                </div>
              </div>
              <div className="email-body" style={{ color: 'var(--text3)' }}>
                Your application has moved forward to the HR interview stage. Details shortly.
              </div>
            </article>
            <article className="email-card">
              <div className="email-hdr">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: '#001040',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Space Mono',monospace",
                    color: 'var(--text)',
                    flexShrink: 0,
                  }}
                >
                  Rz
                </div>
                <div style={{ flex: 1 }}>
                  <div className="email-from">Razorpay Hiring</div>
                  <div className="email-subj">Thank you for applying — Data Analyst Risk</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>2 days ago</div>
                  <span className="chip chip-grey" style={{ marginTop: 5, fontSize: 9 }}>
                    Update
                  </span>
                </div>
              </div>
              <div className="email-body" style={{ color: 'var(--text3)' }}>
                We appreciate your interest but are moving forward with other candidates. We&apos;ll keep your profile on file.
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}
