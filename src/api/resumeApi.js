import { apiUrl } from './client';

/**
 * @param {string} token
 * @param {File} file
 */
export async function uploadResume(token, file) {
  const form = new FormData();
  form.append('resume', file);
  const res = await fetch(apiUrl('/api/resume/upload'), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: text || 'Invalid response' };
  }
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || 'Upload failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
