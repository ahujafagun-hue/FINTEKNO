import { useTab } from '../context/TabContext';

const TABS = [
  { id: 'landing', label: 'Landing' },
  { id: 'onboard1', label: 'Onboard — Profile' },
  { id: 'onboard2', label: 'Onboard — Connect' },
  { id: 'home', label: 'Dashboard' },
  { id: 'jobs', label: 'Job feed' },
  { id: 'jobdetail', label: 'Job detail' },
  { id: 'apply', label: 'Apply' },
  { id: 'tracker', label: 'Tracker' },
  { id: 'inbox', label: 'Inbox' },
  { id: 'activity', label: 'Activity' },
  { id: 'profile', label: 'Profile' },
];

export default function TabNav() {
  const { tab, switchTab } = useTab();

  return (
    <nav className="tab-nav" role="tablist" aria-label="Prototype sections">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`tab${tab === t.id ? ' active' : ''}`}
          role="tab"
          aria-selected={tab === t.id}
          onClick={() => switchTab(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
