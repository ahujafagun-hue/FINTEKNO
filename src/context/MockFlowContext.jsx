import { createContext, useContext, useMemo, useState } from 'react';

const MockFlowContext = createContext(null);

export function MockFlowProvider({ children }) {
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    linkedin: true,
    gmail: true,
    naukri: false,
    indeed: false,
  });
  const [urgentInboxCount, setUrgentInboxCount] = useState(1);
  const [applicationsTotal, setApplicationsTotal] = useState(38);
  const [appliedStageCount, setAppliedStageCount] = useState(22);
  const [pendingApprovals, setPendingApprovals] = useState(3);
  const [lastAction, setLastAction] = useState('');

  const connectedCount = Object.values(connectedPlatforms).filter(Boolean).length;

  const connectPlatform = (platform) => {
    setConnectedPlatforms((prev) => {
      if (prev[platform]) return prev;
      return { ...prev, [platform]: true };
    });
    setLastAction(`${platform} connected`);
  };

  const clearUrgentInbox = (reason) => {
    setUrgentInboxCount(0);
    setLastAction(reason || 'Urgent inbox item cleared');
  };

  const submitApplication = () => {
    setApplicationsTotal((v) => v + 1);
    setAppliedStageCount((v) => v + 1);
    setPendingApprovals((v) => Math.max(0, v - 1));
    setLastAction('Application submitted');
  };

  const markAction = (label) => {
    setLastAction(label);
  };

  const value = useMemo(
    () => ({
      connectedPlatforms,
      connectedCount,
      urgentInboxCount,
      applicationsTotal,
      appliedStageCount,
      pendingApprovals,
      lastAction,
      connectPlatform,
      clearUrgentInbox,
      submitApplication,
      markAction,
    }),
    [connectedPlatforms, connectedCount, urgentInboxCount, applicationsTotal, appliedStageCount, pendingApprovals, lastAction],
  );

  return <MockFlowContext.Provider value={value}>{children}</MockFlowContext.Provider>;
}

export function useMockFlow() {
  const ctx = useContext(MockFlowContext);
  if (!ctx) throw new Error('useMockFlow must be used within MockFlowProvider');
  return ctx;
}
