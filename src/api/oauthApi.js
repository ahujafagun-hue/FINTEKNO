import { apiFetch } from './client';

export function fetchOAuthStatus(token) {
  return apiFetch('/api/oauth/status', { method: 'GET', token });
}

export function prepareGoogleOAuth(token) {
  return apiFetch('/api/oauth/google/prepare', { method: 'POST', token });
}

export function prepareLinkedInOAuth(token) {
  return apiFetch('/api/oauth/linkedin/prepare', { method: 'POST', token });
}
