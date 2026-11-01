import { emptyState, validateState } from './engine.js';
// Stable program-data namespace: branding changes must not reset saved training.
export const STORAGE_KEY = 'jacked-and-tan-v1';
export function readState(storage = localStorage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw) return validateState(JSON.parse(raw));
  // Recognize the earlier schema by its complete structure, without depending
  // on an old brand name. Leave the original entry intact as a recovery copy.
  const candidates = [];
  for (let i = 0; i < (storage.length || 0); i++) {
    const key = storage.key(i);
    if (key === STORAGE_KEY) continue;
    try {
      const state = validateState(JSON.parse(storage.getItem(key)));
      if (Object.keys(state.profile.maxes).length === 12) candidates.push(state);
    } catch { /* Other applications and invalid entries do not participate. */ }
  }
  if (candidates.length > 1) throw new Error('Hay varias copias anteriores. Restaura la copia que quieras usar.');
  if (candidates.length === 1) {
    const migrated = candidates[0];
    storage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  }
  return emptyState();
}
export function writeState(state, storage = localStorage) {
  validateState(state);
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}
