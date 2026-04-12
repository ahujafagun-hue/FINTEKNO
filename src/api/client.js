const API_BASE = import.meta.env.VITE_API_BASE || '';

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE) return p;
  return `${API_BASE.replace(/\/$/, '')}${p}`;
}

export async function apiFetch(path, options = {}) {
  const { token, headers = {}, ...rest } = options;
  const h = new Headers(headers);
  if (token) {
    h.set('Authorization', `Bearer ${token}`);
  }
  if (!h.has('Content-Type') && rest.body && typeof rest.body === 'string') {
    h.set('Content-Type', 'application/json');
  }
  const res = await fetch(apiUrl(path), { ...rest, headers: h });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: text || 'Invalid response' };
  }
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
