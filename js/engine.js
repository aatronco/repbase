import { workouts, source } from './program-data.js';
export { workouts, source };
export const positive = value => typeof value === 'number' && Number.isFinite(value) && value > 0 && value <= 2000;
export function roundLoad(value, increment = 2.5) {
  if (!positive(value) || !positive(increment) || increment > 25) return null;
  return Number((Math.floor(value / increment + 0.5 + 1e-10) * increment).toFixed(4));
}
export function estimate1RM(weight, reps) {
  if (!positive(weight) || !Number.isInteger(reps) || reps < 1 || reps > 10) return null;
  return reps === 1 ? weight : Number((weight * (1 + reps / 30)).toFixed(2));
}
export function session(week, day) {
  return workouts.find(w => w.week === Number(week) && w.day === Number(day));
}
export function prescribedLoad(prescription, profile, dailyRM = null, substitution = null) {
  if (!prescription) return null;
  let base;
  if (prescription.kind === 'daily') base = dailyRM;
  else if (prescription.kind === 'tm') base = substitution?.name ? substitution.tm : profile.maxes[prescription.maxCell]?.tm;
  else return null;
  return positive(base) ? roundLoad(base * prescription.percent, profile.increment) : null;
}
export function emptyState() {
  return { version: 1, profile: { name: 'André', increment: 2.5, startDate: '', maxes: Object.fromEntries(source.maxes.map(m => [m.cell, { tm: null, real1RM: null, estimated1RM: null, date: '', source: '' }])), substitutions: {} }, drafts: {}, history: [] };
}
export function repList(value) {
  if (typeof value !== 'string' || !/^\s*\d+(\s*,\s*\d+)*\s*$/.test(value)) return null;
  const numbers = value.split(',').map(Number);
  return numbers.length <= 30 && numbers.every(n => Number.isInteger(n) && n >= 1 && n <= 100) ? numbers : null;
}
export function mainSetCount(entry) {
  if (entry.kind === 'tm') return parseInt(entry.sets);
  if (entry.kind === 'mrs' || /MRS/.test(String(entry.sets))) return 1 + Number(String(entry.sets).replace('MRS', ''));
  return 1;
}
export function completedErrors(workout, records) {
  const errors = [];
  for (const e of workout.entries) {
    const record = records[e.id] || {};
    if (!positive(record.weight) || repList(record.reps)?.length !== mainSetCount(e)) errors.push(e.exercise + ': registra el peso y las repeticiones de cada serie.');
    if (e.backoff && (!positive(record.backoffWeight) || repList(record.backoffReps)?.length !== parseInt(e.backoff.sets))) errors.push(e.exercise + ': faltan las series posteriores.');

  }
  return [...new Set(errors)];
}
export function snapshot(state, workout, records, now = new Date().toISOString()) {
  return { id: globalThis.crypto.randomUUID(), week: workout.week, day: workout.day, completedAt: now, profile: structuredClone(state.profile), records: structuredClone(records), prescription: structuredClone(workout) };
}
export function validateState(value) {
  const fail = () => { throw new Error('El archivo no es una copia válida de André J&T 2.0.'); };
  if (!value || value.version !== 1 || !value.profile || !Array.isArray(value.history) || !value.drafts || typeof value.drafts !== 'object' || Array.isArray(value.drafts)) fail();
  const p = value.profile;
  if (typeof p.name !== 'string' || p.name.length > 80 || !positive(p.increment) || p.increment > 25 || typeof p.startDate !== 'string' || !p.maxes || !p.substitutions) fail();
  for (const m of source.maxes) {
    const v = p.maxes[m.cell];
    if (!v || !['tm', 'real1RM', 'estimated1RM'].every(k => v[k] === null || positive(v[k])) || typeof v.date !== 'string' || typeof v.source !== 'string' || v.source.length > 200) fail();
  }
  if (Object.keys(p.substitutions).length > 307) fail();
  for (const [key, s] of Object.entries(p.substitutions)) if (!workouts.some(w => w.entries.some(e => e.id === key)) || !s || typeof s.name !== 'string' || s.name.length > 100 || !(s.tm === null || positive(s.tm))) fail();
  const checkRecords = records => {
    if (!records || typeof records !== 'object' || Array.isArray(records) || Object.keys(records).length > 20) fail();
    for (const r of Object.values(records)) {
      if (!r || !['weight', 'backoffWeight'].every(k => r[k] === undefined || r[k] === null || positive(r[k])) || !['reps', 'backoffReps'].every(k => r[k] === undefined || (typeof r[k] === 'string' && r[k].length <= 200 && (r[k] === '' || /^[0-9,\s]*$/.test(r[k]))))) fail();
    }
  };
  if (value.history.length > 10000 || Object.keys(value.drafts).length > 48) fail();
  for (const [key, r] of Object.entries(value.drafts)) { if (!/^([1-9]|1[0-2])-[1-4]$/.test(key)) fail(); checkRecords(r); }
  for (const h of value.history) {
    if (!h || typeof h.id !== 'string' || typeof h.completedAt !== 'string' || !session(h.week, h.day)) fail();
    checkRecords(h.records);
    // Historical snapshots are data, never live settings or markup.
    if (!h.profile || !h.prescription || !Array.isArray(h.prescription.entries) || h.prescription.entries.length > 20) fail();
    validateState({ ...emptyState(), profile: h.profile });
    for (const e of h.prescription.entries) if (!e || typeof e.id !== 'string' || typeof e.exercise !== 'string' || typeof e.tier !== 'string') fail();
  }
  return value;
}
