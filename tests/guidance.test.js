import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyState, session, workouts, mainSetCount } from '../js/engine.js';
import { workoutGuidance, backoffBasis } from '../js/workout-guidance.js';
test('week 1 10RM explanation keeps the RM attempt separate from TM-based backoffs', () => {
  const e = session(1, 1).entries[0]; const g = workoutGuidance(e, emptyState().profile);
  assert.match(g.definition, /10 repeticiones/); assert.match(g.definition, /1–2 repeticiones en reserva/);
  assert.match(g.steps[0], /aproximación/); assert.match(g.steps[2], /no cuentan/);
  assert.match(g.next, /70% del TM/); assert.match(g.next, /no se usa/);
  assert.match(g.example.join(' '), /100 × 70% = 70 kg/);
  assert.match(g.example.join(' '), /3 series de 6 a 70 kg/);
  assert.match(g.example.join(' '), /80 kg del RM se guardan/);
  assert.equal(backoffBasis(e), '70% del TM de Sentadilla');
});
test('week 7 changes the instructional calculation base to the same-day RM', () => {
  const e = session(7, 1).entries[0]; const p = emptyState().profile;
  p.maxes.AI4.tm = 200; // A high stored TM must never enter this example.
  const g = workoutGuidance(e, p);
  assert.match(g.definition, /6 repeticiones/); assert.match(g.next, /RM que acabas de registrar/);
  assert.match(g.example.join(' '), /80 × 85% = 68 kg/);
  assert.match(g.example.join(' '), /5 series de 3 a 67,5 kg/);
  assert.equal(backoffBasis(e), '85% del RM registrado hoy');
  p.increment = 5;
  assert.match(workoutGuidance(e, p).example.join(' '), /5 series de 3 a 70 kg/);
});
test('T2a remains TM-based in both blocks, including different exercise percentages', () => {
  for (const [week, percent, load] of [[1, 50, 50], [7, 70, 70]]) {
    const e = session(week, 1).entries[1]; const g = workoutGuidance(e, emptyState().profile);
    assert.match(g.definition, new RegExp(`${percent}% del TM`));
    assert.match(g.example.join(' '), new RegExp(`100 × ${percent}% = ${load} kg`));
  }
  const military = session(1, 4).entries[0];
  assert.equal(backoffBasis(military), '60% del TM de Press militar');
  assert.equal(backoffBasis(military, { name: 'Otra variante' }), '60% del TM de Otra variante');
});
test('MRS explanations count the first RM plus the source number of additional sets', () => {
  for (const e of [session(1, 1).entries[2], session(1, 4).entries[1], session(9, 4).entries[1]]) {
    const g = workoutGuidance(e, emptyState().profile);
    assert.match(g.next, new RegExp(`${parseInt(e.sets)} MRS`));
    assert.match(g.next, new RegExp(`${mainSetCount(e)} series en total`));
    assert.match(g.example.join(' '), /mism|mantendrías/);
  }
});
test('all 307 contextual guides preserve source data and profile/history', () => {
  const state = emptyState(); const before = JSON.stringify(state); const sourceBefore = JSON.stringify(workouts);
  for (const w of workouts) for (const e of w.entries) {
    const g = workoutGuidance(e, state.profile);
    assert.ok(g.definition && g.steps.length >= 2 && g.example.length);
    assert.match(g.exampleLabel, /ficticio/);
    assert.doesNotMatch(JSON.stringify(g), /NaN|undefined|Infinity|excel|suscrip/i);
  }
  assert.equal(JSON.stringify(state), before); assert.equal(JSON.stringify(workouts), sourceBefore);
});
