import { useEffect, useRef, useState } from 'react';
import { useTab, TabProvider } from './context/TabContext';
import TabNav from './components/TabNav';
import Landing from './screens/Landing';
import OnboardProfile from './screens/OnboardProfile';
import OnboardConnect from './screens/OnboardConnect';
import HomeDashboard from './screens/HomeDashboard';
import JobsFeed from './screens/JobsFeed';
import JobDetail from './screens/JobDetail';
import ApplyScreen from './screens/ApplyScreen';
import TrackerScreen from './screens/TrackerScreen';
import InboxScreen from './screens/InboxScreen';
import ActivityScreen from './screens/ActivityScreen';
import ProfileScreen from './screens/ProfileScreen';
import { MockFlowProvider, useMockFlow } from './context/MockFlowContext';
import './fintekno.css';

function Screens() {
  const { tab } = useTab();

  const screenClass = (id) => `screen${tab === id ? ' active' : ''}`;

  return (
    <div className="screens">
      <div className={screenClass('landing')} id="screen-landing">
        <Landing />
      </div>
      <div className={screenClass('onboard1')} id="screen-onboard1">
        <OnboardProfile />
      </div>
      <div className={screenClass('onboard2')} id="screen-onboard2">
        <OnboardConnect />
      </div>
      <div className={screenClass('home')} id="screen-home">
        <HomeDashboard />
      </div>
      <div className={screenClass('jobs')} id="screen-jobs">
        <JobsFeed />
      </div>
      <div className={screenClass('jobdetail')} id="screen-jobdetail">
        <JobDetail />
      </div>
      <div className={screenClass('apply')} id="screen-apply">
        <ApplyScreen />
      </div>
      <div className={screenClass('tracker')} id="screen-tracker">
        <TrackerScreen />
      </div>
      <div className={screenClass('inbox')} id="screen-inbox">
        <InboxScreen />
      </div>
      <div className={screenClass('activity')} id="screen-activity">
        <ActivityScreen />
      </div>
      <div className={screenClass('profile')} id="screen-profile">
        <ProfileScreen />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MockFlowProvider>
      <AppBody />
    </MockFlowProvider>
  );
}

function AppBody() {
  const { markAction, lastAction } = useMockFlow();
  const [mockMessage, setMockMessage] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    const onGlobalButtonClick = (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const label = (btn.textContent || 'Action').trim().split(/\s+/).join(' ').slice(0, 80);
      setMockMessage(`${label} (mock)`);
      markAction(label);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setMockMessage(''), 1400);
    };

    document.addEventListener('click', onGlobalButtonClick);
    return () => {
      document.removeEventListener('click', onGlobalButtonClick);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <TabProvider>
      <h1 className="sr-only">FINTEKNO AI — AI Job Agents for Indian Freshers and Students</h1>
      <TabNav />
      <Screens />
      {lastAction ? (
        <div
          style={{
            position: 'fixed',
            left: 16,
            bottom: 16,
            zIndex: 9999,
            background: 'var(--bg2)',
            border: '1px solid var(--border2)',
            color: 'var(--green)',
            padding: '8px 12px',
            fontSize: 11,
            fontFamily: "'Space Mono',monospace",
          }}
        >
          Flow: {lastAction}
        </div>
      ) : null}
      {mockMessage ? (
        <div
          style={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            zIndex: 9999,
            background: 'var(--bg2)',
            border: '1px solid var(--border2)',
            color: 'var(--text2)',
            padding: '8px 12px',
            fontSize: 11,
            fontFamily: "'Space Mono',monospace",
          }}
        >
          {mockMessage}
        </div>
      ) : null}
    </TabProvider>
  );
}
