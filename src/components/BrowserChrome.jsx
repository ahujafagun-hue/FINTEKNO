export default function BrowserChrome({ url }) {
  return (
    <div className="bc" aria-hidden="true">
      <div className="bc-dots">
        <div className="bc-dot" style={{ background: '#FF5F57' }} />
        <div className="bc-dot" style={{ background: '#FFBD2E' }} />
        <div className="bc-dot" style={{ background: '#28C840' }} />
      </div>
      <div className="bc-bar">🔒 {url}</div>
    </div>
  );
}
