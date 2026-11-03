import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyState, session, prescribedLoad } from '../js/engine.js';
import { workoutGuidance, backoffBasis } from '../js/workout-guidance.js';
test('fixed guidance explains how to estimate without claiming tested maxes', () => {
  const text = JSON.stringify(workoutGuidance());
  assert.match(text, /105 kg/); assert.match(text, /115,5 kg/); assert.match(text, /108,28 kg/);
  assert.match(text, /submáxima/); assert.match(text, /no máximos probados/);
  assert.deepEqual(workoutGuidance(session(1, 1).entries[0], emptyState().profile), workoutGuidance(session(7, 1).entries[0], emptyState().profile));
});
test('workout loads remain dynamic and use their prescribed bases', () => {
  const p = emptyState().profile; p.maxes.E4.tm = 100;
  const first = session(1, 1).entries[0]; const second = session(7, 1).entries[0];
  assert.equal(prescribedLoad(first.backoff, p, 80), 70);
  assert.equal(prescribedLoad(second.backoff, p, 80), 67.5);
  assert.match(backoffBasis(first), /TM/); assert.match(backoffBasis(second), /RM registrado hoy/);
});
