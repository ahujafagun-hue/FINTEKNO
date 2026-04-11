import BrowserChrome from '../components/BrowserChrome';
import { useTab } from '../context/TabContext';

export default function OnboardConnect() {
  const { switchTab } = useTab();

  return (
    <>
      <BrowserChrome url="app.fintekno.ai/onboarding/connect" />
      <div className="ob-layout">
        <div className="ob-left">
          <div className="ob-prog" role="progressbar" aria-valuenow={83} aria-valuemin={0} aria-valuemax={100} aria-label="Step 5 of 6">
            <div className="ob-seg done" />
            <div className="ob-seg done" />
            <div className="ob-seg done" />
            <div className="ob-seg done" />
            <div className="ob-seg active" />
            <div className="ob-seg" />
          </div>
          <div className="ob-step-lbl">Step 5 / 6</div>
          <h2 className="ob-title">
            Connect your
            <br />
            platforms.
          </h2>
          <p className="ob-sub">
            Connecting LinkedIn and Gmail is what makes FINTEKNO AI work. The Apply Agent submits on your behalf. The Comms Agent catches every recruiter message.
          </p>
          <div className="ob-promise">
            <div className="ob-promise-title">Privacy promise</div>
            <p className="ob-promise-text">
              Read-only Gmail access. We never store emails. We never read personal conversations — only job-related communications. Disconnect any time.
            </p>
          </div>
        </div>
        <div className="ob-right">
          <div className="ob-form-title">Connect platforms</div>
          <p className="ob-form-sub">Connect once. Agents handle everything from here.</p>
          <div className="connect-card done" aria-label="LinkedIn connected">
            <div
              style={{
                width: 34,
                height: 34,
                background: '#0A66C2',
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                color: '#fff',
                flexShrink: 0,
                fontFamily: "'Space Mono',monospace",
              }}
              aria-hidden="true"
            >
              in
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>LinkedIn</div>
              <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: "'Space Mono',monospace" }}>Connected · Easy Apply enabled</div>
            </div>
            <div style={{ color: 'var(--green)', fontFamily: "'Space Mono',monospace", fontWeight: 700 }} aria-hidden="true">
              ✓
            </div>
          </div>
          <div className="connect-card done" aria-label="Gmail connected">
            <div
              style={{
                width: 34,
                height: 34,
                background: '#D44638',
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                color: '#fff',
                flexShrink: 0,
                fontFamily: "'Space Mono',monospace",
              }}
              aria-hidden="true"
            >
              G
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>Gmail</div>
              <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: "'Space Mono',monospace" }}>Connected · Read-only · Comms active</div>
            </div>
            <div style={{ color: 'var(--green)', fontFamily: "'Space Mono',monospace", fontWeight: 700 }} aria-hidden="true">
              ✓
            </div>
          </div>
          <div className="connect-card" aria-label="Naukri not connected">
            <div
              style={{
                width: 34,
                height: 34,
                background: '#CC2222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 12,
                color: '#fff',
                flexShrink: 0,
                fontFamily: "'Space Mono',monospace",
              }}
              aria-hidden="true"
            >
              N
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>Naukri.com</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Apply to 70M+ India listings</div>
            </div>
            <button type="button" className="btn-ghost-sm">
              Connect
            </button>
          </div>
          <div className="connect-card" aria-label="Indeed India not connected">
            <div
              style={{
                width: 34,
                height: 34,
                background: '#003A9B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 12,
                color: '#fff',
                flexShrink: 0,
                fontFamily: "'Space Mono',monospace",
              }}
              aria-hidden="true"
            >
              id
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>Indeed India</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Access 50,000+ active postings</div>
            </div>
            <button type="button" className="btn-ghost-sm">
              Connect
            </button>
          </div>
          <div className="connected-status" role="status">
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, fontFamily: "'Space Mono',monospace" }}>2 / 4 platforms connected</div>
            <div style={{ fontSize: 11, color: 'var(--text2)' }}>Discovery Agent scanning LinkedIn + Gmail. Add Naukri for 3× more coverage.</div>
          </div>
          <button type="button" className="btn-green" style={{ width: '100%', padding: 12, fontSize: 12, textAlign: 'center', marginTop: 14, display: 'block' }} onClick={() => switchTab('home')}>
            Activate all agents → Dashboard
          </button>
        </div>
      </div>
    </>
  );
}
