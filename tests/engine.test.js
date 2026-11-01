import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { workouts, source, positive, roundLoad, estimate1RM, session, prescribedLoad, emptyState, snapshot, completedErrors, validateState, mainSetCount, repList } from '../js/engine.js';
import { readState, writeState, STORAGE_KEY } from '../js/storage.js';
const cells = JSON.parse(readFileSync(new URL('../source/jt-kgs-cells.json', import.meta.url))).cells;
const fixture = JSON.parse(readFileSync(new URL('./excel-fixture.json', import.meta.url)));
const profile = emptyState().profile;
for (const [key, value] of Object.entries(fixture.maxes)) profile.maxes[key].tm = value;
const resolve = address => typeof cells[address] === 'string' && /^=[A-Z]+\d+$/.test(cells[address]) ? resolve(cells[address].slice(1)) : cells[address];
function col(n) { let out = ''; while (n) { n--; out = String.fromCharCode(65 + n % 26) + out; n = Math.floor(n / 26); } return out; }
test('source identity and every exercise, RM, rep and set matches the shared KGS sheet', () => {
  assert.equal(source.sheet, 'J&T2.0 KGS'); assert.match(source.url, /14ke22ZVdepbuSPrOI2ssNbxll9T8utr4co7OVv9W6oI/);
  assert.equal(workouts.length, 48);
  for (const w of workouts) {
    const firstCol = 4 + (w.week - 1) * 5;
    for (const e of w.entries) {
      const row = Number(e.source.match(/\d+/)[0]);
      assert.equal(e.exercise, resolve(e.source), e.source);
      assert.equal(e.reps, cells[col(firstCol + 2) + row] ?? null, e.source + ' reps');
      assert.equal(e.sets, cells[col(firstCol + 3) + row] ?? null, e.source + ' sets');
      const weight = cells[e.weightSource];
      if (e.kind === 'tm') { assert.equal(e.formula, weight); assert.equal(e.percent, resolve(weight.match(/\*([A-Z]+\d+)/)[1])); }
      if (e.kind === 'rm') assert.equal(weight, `Find ${e.rm}RM`);
      if (e.kind === 'mrs') { assert.equal(weight, '?'); assert.equal(e.rm, e.reps); assert.equal(e.sets, '3MRS'); }
      if (e.backoff) {
        assert.equal(e.backoff.reps, cells[col(firstCol + 2) + (row + 1)]);
        assert.equal(e.backoff.sets, cells[col(firstCol + 3) + (row + 1)]);
        if (e.backoff.kind === 'daily') assert.equal(e.backoff.percent, cells[e.backoff.source]);
        else assert.equal(e.backoff.formula, cells[e.backoff.source]);
      }
    }
    // Independently account for every row with exercise + weight prescription.
    const [start, end] = [[57, 66], [69, 78], [81, 90], [93, 104]][w.day - 1];
    const ids = [];
    for (let row = start; row <= end; row++) {
      const id = col(firstCol) + row; const name = resolve(id); const weight = cells[col(firstCol + 1) + row];
      if (typeof name === 'string' && name && !['RM:', 'AMRAP:', '1RM:', 'MRS:'].includes(name) && (weight === '?' || typeof weight === 'string' && /^=MROUND|^Find \d+RM/.test(weight))) ids.push(id);
    }
    assert.deepEqual(w.entries.map(e => e.id), ids, `week ${w.week} day ${w.day}`);
  }
});
test('all 60 source formula cached controls match nearest 2.5 kg calculation', () => {
  assert.equal(fixture.loads.length, 60);
  for (const f of fixture.loads) {
    const e = session(f.week, f.day).entries.find(e => e.id === f.id);
    assert.equal(prescribedLoad(f.backoff ? e.backoff : e, profile), f.expected, JSON.stringify(f));
  }
});
test('every formula responds to future TM edits, missing TM and increments', () => {
  for (const w of workouts) for (const e of w.entries) for (const p of [e, e.backoff].filter(x => x?.kind === 'tm')) {
    const local = emptyState().profile;
    assert.equal(prescribedLoad(p, local), null);
    local.maxes[p.maxCell].tm = 103.75;
    assert.equal(prescribedLoad(p, local), Math.round(103.75 * p.percent / 2.5) * 2.5);
    local.increment = 1.25; local.maxes[p.maxCell].tm = 117.5;
    assert.equal(prescribedLoad(p, local), Math.round(117.5 * p.percent / 1.25) * 1.25);
  }
});
test('specific source exceptions remain intact', () => {
  assert.equal(session(1, 3).entries[0].exercise, 'Front Squat');
  assert.equal(session(1, 3).entries[0].backoff.maxCell, 'O5');
  assert.equal(session(7, 3).entries[0].exercise, 'Deadlift');
  for (let week = 1; week <= 5; week++) { const e = session(week, 4).entries.find(e => e.kind === 'tm'); assert.equal(e.reps, 10); assert.equal(e.sets, 4); }
  assert.equal(session(4, 4).entries[0].backoff.percent, 0.775);
  assert.equal(session(7, 4).entries[1].rm, 7);
  assert.equal(session(7, 4).entries[1].sets, '4MRS');
  assert.equal(session(9, 4).entries[1].sets, '1MRS');
  assert.equal(session(6, 1).entries.filter(e => e.kind === 'mrs').length, 4);
  assert.equal(session(7, 1).entries.some(e => e.tier.startsWith('3')), false);
  assert.equal(session(11, 1).entries.some(e => e.tier.startsWith('2b') || e.tier.startsWith('2c')), false);
  assert.equal(session(12, 1).entries.length, 1);
});
test('daily RM is required for block 2 backoffs, never replaced with a PR', () => {
  for (let week = 7; week <= 11; week++) for (let day = 1; day <= 4; day++) {
    const back = session(week, day).entries[0].backoff;
    assert.equal(back.kind, 'daily'); assert.equal(prescribedLoad(back, profile), null);
    assert.equal(prescribedLoad(back, profile, 100), week <= 9 ? 85 : 90);
    assert.equal(prescribedLoad(back, profile, 110), week <= 9 ? 92.5 : 100);
  }
  for (const w of workouts) for (const e of w.entries.filter(e => e.kind === 'mrs')) assert.equal(prescribedLoad(e, profile, 100), null);
});
test('rounding, invalid data and 1RM estimation boundaries', () => {
  assert.equal(roundLoad(101.25), 102.5); assert.equal(roundLoad(101.2499), 100); assert.equal(roundLoad(102.5, 1.25), 102.5);
  for (const v of [null, undefined, '', 0, -1, Infinity, NaN, '100']) assert.equal(roundLoad(v), null);
  assert.equal(roundLoad(100, 0), null); assert.equal(roundLoad(100, 26), null);
  assert.equal(estimate1RM(100, 1), 100); assert.equal(estimate1RM(100, 10), 133.33); assert.equal(estimate1RM(100, 11), null);
});
test('fresh profile has no real defaults, substitutions require their own TM', () => {
  const s = emptyState(); assert.equal(validateState(s), s);
  assert.ok(Object.values(s.profile.maxes).every(m => m.tm === null && m.real1RM === null && m.estimated1RM === null));
  const e = session(1, 1).entries[0].backoff;
  assert.equal(prescribedLoad(e, profile, 100, { name: 'Other squat', tm: null }), null);
  assert.equal(prescribedLoad(e, profile, 100, { name: 'Other squat', tm: 100 }), 70);
});
test('snapshots and old revisions survive later profile, draft and substitution changes', () => {
  const s = emptyState(); const w = session(1, 1); const records = { D57: { weight: 100, reps: '10', backoffWeight: 70, backoffReps: '6,6,8' } };
  s.profile.maxes.E4.tm = 100; const saved = snapshot(s, w, records); s.history.push(saved);
  const before = JSON.stringify(saved); s.profile.maxes.E4.tm = 150; s.profile.substitutions.D57 = { name: 'Other', tm: 200 }; records.D57.weight = 120;
  s.history.push(snapshot(s, w, records)); assert.equal(JSON.stringify(s.history[0]), before); assert.equal(s.history[0].records.D57.weight, 100);
  assert.equal(s.history[0].profile.maxes.E4.tm, 100); assert.equal(s.history.length, 2);
});
test('completion requires every actual set including MRS and backoffs', () => {
  for (const w of workouts) {
    const records = Object.fromEntries(w.entries.map(e => [e.id, { weight: 50, reps: Array(mainSetCount(e)).fill(e.rm || e.reps).join(','), ...(e.backoff ? { backoffWeight: 40, backoffReps: Array(parseInt(e.backoff.sets)).fill(e.backoff.reps).join(',') } : {}) }]));
    assert.deepEqual(completedErrors(w, records), [], `${w.week}/${w.day}`);
    delete records[w.entries[0].id].weight; assert.ok(completedErrors(w, records).length);
  }
  assert.equal(repList('1,0'), null); assert.equal(repList('1,NaN'), null); assert.deepEqual(repList('10, 8, 6'), [10, 8, 6]);
});
test('storage namespace isolation, malformed import protection, and history round trip', () => {
  const map = new Map([['brute-logs', 'untouched']]); const storage = { getItem: k => map.get(k), setItem: (k, v) => map.set(k, v) };
  const s = emptyState(); writeState(s, storage); assert.deepEqual(readState(storage), s); assert.equal(map.get('brute-logs'), 'untouched'); assert.equal(STORAGE_KEY, 'andre-jt2-v1');
  for (const mutate of [s => s.profile.increment = 0, s => s.profile.maxes.E4.tm = -20, s => s.version = 2, s => s.history = {}, s => s.drafts['7-1'] = { AH57: { weight: 'evil' } }]) { const invalid = emptyState(); mutate(invalid); assert.throws(() => validateState(invalid)); }
});
