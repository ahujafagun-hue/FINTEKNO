import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const TOKEN_KEY = 'fintekno_token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (!t) return null;
    return {
      id: 'mock-user-1',
      email: 'aryan.rathi@email.com',
      profile: {
        resume: null,
      },
    };
  });
  const [loading, setLoading] = useState(false);

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
    setUser((prev) => prev || { id: 'mock-user-1', email: 'aryan.rathi@email.com', profile: { resume: null } });
    setLoading(false);
  }, [setToken]);

  const requestOtp = useCallback(async (email, intent) => {
    return {
      ok: true,
      dev: true,
      message: 'Mock OTP sent',
      code: '123456',
      email,
      intent,
    };
  }, []);

  const verifyOtp = useCallback(
    async (email, code, intent, profile) => {
      const data = {
        token: 'mock-token-123',
        user: {
          id: 'mock-user-1',
          email,
          profile: {
            ...(profile || {}),
            resume: null,
          },
        },
      };
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
