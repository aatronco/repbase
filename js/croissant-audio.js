import { CROISSANT_BY_STEP, CROISSANT_STEPS } from './croissant-score.js';
function note(ctx, output, start, pitch, duration, level, accordion) {
  const envelope = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const frequency = 440 * 2 ** ((pitch - 69) / 12);
  filter.type = 'lowpass'; filter.frequency.value = accordion ? 1900 : 700; filter.Q.value = 0.5;
  envelope.gain.setValueAtTime(0, start);
  envelope.gain.linearRampToValueAtTime(level, start + Math.min(0.03, duration / 4));
  envelope.gain.setValueAtTime(level * 0.8, start + duration * 0.7);
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  filter.connect(envelope); envelope.connect(output);
  const voices = accordion ? [-5, 5] : [0];
  for (const cents of voices) {
    const oscillator = ctx.createOscillator();
    oscillator.type = accordion ? 'sawtooth' : 'triangle';
    oscillator.frequency.value = frequency; oscillator.detune.value = cents;
    oscillator.connect(filter); oscillator.start(start); oscillator.stop(start + duration + 0.01);
  }
  if (accordion) {
    const vibrato = ctx.createOscillator(); const depth = ctx.createGain();
    vibrato.frequency.value = 5.1; depth.gain.value = 7;
    vibrato.connect(depth); depth.connect(filter.frequency);
    vibrato.start(start); vibrato.stop(start + duration + 0.01);
  }
}
export function scheduleCroissant(ctx, output, time, step, stepDuration) {
  const position = step % CROISSANT_STEPS;
  for (const event of CROISSANT_BY_STEP[position]) {
    const start = time + (event.at - position) * stepDuration;
    const level = event.velocity / 127 * (event.instrument === 'accordion' ? 0.12 : event.instrument === 'chord' ? 0.045 : 0.25);
    note(ctx, output, start, event.note, Math.max(0.04, event.duration * stepDuration), level, event.instrument !== 'bass');
  }
}
