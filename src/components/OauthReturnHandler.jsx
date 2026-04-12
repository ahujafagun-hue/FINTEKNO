import { useEffect } from 'react';
import { useTab } from '../context/TabContext';

/** Normalizes URL after Google/LinkedIn OAuth redirect back to the app. */
export default function OauthReturnHandler() {
  const { switchTab } = useTab();

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const oauth = p.get('oauth');
    const err = p.get('oauth_error');
    if (oauth === 'google' || oauth === 'linkedin') {
      switchTab('onboard2');
    }
    if (oauth || err) {
      p.delete('oauth');
      p.delete('oauth_error');
      const q = p.toString();
      window.history.replaceState({}, '', `${window.location.pathname}${q ? `?${q}` : ''}${window.location.hash}`);
    }
  }, [switchTab]);

  return null;
}
