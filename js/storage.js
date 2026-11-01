import { emptyState, validateState } from './engine.js';
export const STORAGE_KEY = 'andre-jt2-v1';
export function readState(storage = localStorage) {
  const raw = storage.getItem(STORAGE_KEY);
  return raw ? validateState(JSON.parse(raw)) : emptyState();
}
export function writeState(state, storage = localStorage) {
  validateState(state);
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}
