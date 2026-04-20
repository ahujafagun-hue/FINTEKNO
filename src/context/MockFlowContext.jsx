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
  const [savedJobs, setSavedJobs] = useState({ growwDataAnalyst: false });
  const [savedDrafts, setSavedDrafts] = useState({ growwApplyForm: false });
  const [applyFormDraft, setApplyFormDraft] = useState({
    formFields: {
      fullName: 'Aryan Rathi',
      email: 'aryan.rathi@email.com',
      phone: '+91 98765 43210',
      city: 'New Delhi',
      education: 'B.Tech DTU · 2025 · 8.2 CGPA',
      experience: 'Fresher (0–1 yr)',
      resume: 'Aryan_Resume_Groww_Tailored.pdf · 91% ATS',
      coverLetter:
        "I'm a final-year B.Tech student at DTU with strong skills in Python, SQL, and data visualisation. I've built dashboards during my internship at XYZ Corp. I'm excited by Groww's data-driven approach...",
    },
    essayAnswer:
      "I've been a Groww user for 2 years and I'm passionate about making financial tools accessible. The Growth team's focus on funnel analytics aligns directly with the work I want to do...",
  });
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

  const toggleSavedJob = (jobKey) => {
    setSavedJobs((prev) => {
      const nextVal = !prev[jobKey];
      setLastAction(nextVal ? 'Job saved' : 'Job unsaved');
      return { ...prev, [jobKey]: nextVal };
    });
  };

  const toggleSavedDraft = (draftKey) => {
    setSavedDrafts((prev) => {
      const nextVal = !prev[draftKey];
      setLastAction(nextVal ? 'Draft saved for later' : 'Draft resumed');
      return { ...prev, [draftKey]: nextVal };
    });
  };

  const saveApplyFormDraft = ({ formFields, essayAnswer }) => {
    setApplyFormDraft({ formFields, essayAnswer });
    setSavedDrafts((prev) => ({ ...prev, growwApplyForm: true }));
    setLastAction('Apply form changes saved');
  };

  const value = useMemo(
    () => ({
      connectedPlatforms,
      connectedCount,
      urgentInboxCount,
      applicationsTotal,
      appliedStageCount,
      pendingApprovals,
      savedJobs,
      savedDrafts,
      applyFormDraft,
      lastAction,
      connectPlatform,
      clearUrgentInbox,
      submitApplication,
      markAction,
      toggleSavedJob,
      toggleSavedDraft,
      saveApplyFormDraft,
    }),
    [connectedPlatforms, connectedCount, urgentInboxCount, applicationsTotal, appliedStageCount, pendingApprovals, savedJobs, savedDrafts, applyFormDraft, lastAction],
  );

  return <MockFlowContext.Provider value={value}>{children}</MockFlowContext.Provider>;
}

export function useMockFlow() {
  const ctx = useContext(MockFlowContext);
  if (!ctx) throw new Error('useMockFlow must be used within MockFlowProvider');
  return ctx;
}
