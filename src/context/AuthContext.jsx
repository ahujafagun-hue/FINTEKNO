import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/authApi';

const TOKEN_KEY = 'fintekno_token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  const setToken = useCallback((t) => {
    setTokenState(t);
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  }, []);

  const loadMe = useCallback(async () => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (!t) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { user: u } = await authApi.fetchMe(t);
      setUser(u);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setToken]);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  const requestOtp = useCallback(async (email, intent) => {
    return authApi.requestOtp({ email, intent });
  }, []);

  const verifyOtp = useCallback(
    async (email, code, intent, profile) => {
      const data = await authApi.verifyOtp({ email, code, intent, profile });
      setToken(data.token);
      setUser(data.user);
      return data;
    },
    [setToken],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, [setToken]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      requestOtp,
      verifyOtp,
      logout,
      loadMe,
      isAuthenticated: !!user && !!token,
    }),
    [token, user, loading, requestOtp, verifyOtp, logout, loadMe],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
