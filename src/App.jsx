import { AuthProvider } from './context/AuthContext';
import { useTab, TabProvider } from './context/TabContext';
import OauthReturnHandler from './components/OauthReturnHandler';
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
    <TabProvider>
      <OauthReturnHandler />
      <AuthProvider>
        <h1 className="sr-only">FINTEKNO AI — AI Job Agents for Indian Freshers and Students</h1>
        <TabNav />
        <Screens />
      </AuthProvider>
    </TabProvider>
  );
}
