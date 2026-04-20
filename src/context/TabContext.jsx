import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const TabContext = createContext(null);

export function TabProvider({ children }) {
  const [tab, setTab] = useState('landing');

  const switchTab = useCallback((id) => {
    setTab(id);
    requestAnimationFrame(() => {
      document.getElementById(`screen-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const value = useMemo(() => ({ tab, switchTab }), [tab, switchTab]);

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('useTab must be used within TabProvider');
  return ctx;
}
