import test from 'node:test';
import assert from 'node:assert/strict';
import { THEMES, THEME_KEY, getTheme } from '../js/theme.js';
import { CROISSANT_SCORE, CROISSANT_BY_STEP, CROISSANT_STEPS, CROISSANT_STEPS_PER_BAR, CROISSANT_BARS, CROISSANT_BEATS, CROISSANT_BPM } from '../js/croissant-score.js';
import { CyberpunkAudio } from '../js/audio-engine.js';
test('Brute themes are retained with one original Croissant addition', () => {
  assert.deepEqual(THEMES.map(t => t.id), ['cyberpunk', 'kawaii', 'matrix', 'brasil', 'croissant']);
  for (const t of THEMES) { assert.ok(t.track); assert.ok(t.style); assert.equal(getTheme({ getItem: key => key === THEME_KEY ? t.id : null }), t.id); }
  assert.equal(getTheme({ getItem: () => 'unknown' }), 'cyberpunk');
  assert.equal(getTheme({ getItem: () => { throw new Error('unavailable'); } }), 'cyberpunk');
});
test('original Croissant score keeps a full bounded 3/4 waltz with bass and accordion', () => {
  assert.equal(CROISSANT_BEATS, 3); assert.equal(CROISSANT_STEPS_PER_BAR, 12);
  assert.equal(CROISSANT_STEPS, CROISSANT_BARS * 12); assert.equal(CROISSANT_BPM, 108);
  assert.equal(CROISSANT_BY_STEP.flat().length, CROISSANT_SCORE.length);
  assert.ok(CROISSANT_SCORE.length > 150);
  for (const n of CROISSANT_SCORE) {
    assert.ok(n.at >= 0 && n.at < CROISSANT_STEPS);
    assert.ok(n.duration > 0 && n.at + n.duration <= CROISSANT_STEPS);
    assert.ok(Number.isInteger(n.note) && n.note >= 36 && n.note <= 96);
    assert.ok(n.velocity > 0 && n.velocity <= 127);
  }
  for (let bar = 0; bar < CROISSANT_BARS; bar++) {
    assert.ok(CROISSANT_BY_STEP[bar * 12].some(n => n.instrument === 'bass'));
    for (const step of [4, 8]) assert.equal(CROISSANT_BY_STEP[bar * 12 + step].filter(n => n.instrument === 'chord').length, 3);
  }
});
test('all voices are idle without creating browser audio and clamp their volume', () => {
  for (const theme of THEMES) {
    const player = new CyberpunkAudio({ voice: theme.id });
    assert.equal(player.ctx, null); assert.equal(player.playing, false);
    assert.equal(player.STEPS, theme.id === 'croissant' ? 12 : 16);
    player.setVolume(2); assert.equal(player.volume, 0.4);
    player.setVolume(-2); assert.equal(player.volume, 0);
    player.setVolume('bad'); assert.equal(player.volume, 0);
    player.dispose(); assert.equal(player.ctx, null);
  }
});
