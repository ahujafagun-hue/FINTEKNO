export default function SidebarLogo() {
  return (
    <div className="sidebar-logo">
      <div className="sidebar-mark" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="3" stroke="#fff" strokeWidth="1" />
          <path d="M3.5 5l1.2 1.2L6.5 3.5" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="sidebar-brand">FINTEKNO AI</span>
    </div>
  );
}
