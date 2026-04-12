import { apiFetch } from './client';

export function requestOtp({ email, intent }) {
  return apiFetch('/api/auth/otp/send', {
    method: 'POST',
    body: JSON.stringify({ email, intent }),
  });
}

export function verifyOtp({ email, code, intent, profile }) {
  const body = { email, code, intent };
  if (profile != null && intent === 'register') {
    body.profile = profile;
  }
  return apiFetch('/api/auth/otp/verify', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function fetchMe(token) {
  return apiFetch('/api/auth/me', { method: 'GET', token });
}

export function patchProfile(token, profile) {
  return apiFetch('/api/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify({ profile }),
    token,
  });
}
