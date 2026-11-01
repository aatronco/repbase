// Original composition: “Miettes de dimanche”. A 16-bar musette waltz in 3/4.
// Written for Repbase; no borrowed melody, lyrics, samples or recordings.
export const CROISSANT_TITLE = 'Miettes de dimanche';
export const CROISSANT_BPM = 108;
export const CROISSANT_BEATS = 3;
export const CROISSANT_BARS = 16;
export const CROISSANT_STEPS_PER_BAR = 12;
export const CROISSANT_STEPS = CROISSANT_BARS * CROISSANT_STEPS_PER_BAR;
const harmony = [
  { bass: 50, chord: [62, 65, 69] }, { bass: 57, chord: [61, 64, 67] },
  { bass: 50, chord: [62, 65, 69] }, { bass: 55, chord: [62, 67, 70] },
  { bass: 48, chord: [60, 64, 67] }, { bass: 53, chord: [60, 65, 69] },
  { bass: 52, chord: [62, 67, 70] }, { bass: 57, chord: [61, 64, 67] },
  { bass: 50, chord: [62, 65, 69] }, { bass: 53, chord: [60, 65, 69] },
  { bass: 55, chord: [62, 67, 70] }, { bass: 57, chord: [61, 64, 67] },
  { bass: 58, chord: [62, 65, 70] }, { bass: 55, chord: [62, 67, 70] },
  { bass: 57, chord: [61, 64, 67] }, { bass: 50, chord: [62, 65, 69] },
];
// [sixteenth position, MIDI pitch, length in sixteenths]. Unequal phrases and
// pauses keep the loop conversational rather than a nonstop arpeggio.
const melody = [
  [[0,69,2.7],[3,74,1.7],[5,77,2.4],[8,76,1.7],[10,74,1.6]],
  [[0,73,3.3],[4,76,1.5],[6,79,2.4],[9,76,2.2]],
  [[0,77,3.2],[4,76,1.6],[6,74,3.4]],
  [[1,70,2.3],[4,74,1.7],[6,79,2.8],[10,77,1.3]],
  [[0,76,2.6],[3,72,1.6],[5,71,1.5],[8,72,3.1]],
  [[0,69,2.4],[3,72,1.7],[6,77,4.6]],
  [[0,76,1.6],[2,74,1.6],[5,70,2.5],[8,67,2.8]],
  [[0,69,3.3],[4,73,1.7],[7,76,3.5]],
  [[0,81,2.5],[3,77,1.7],[6,74,1.6],[8,76,3]],
  [[0,77,3.3],[4,81,1.6],[7,79,1.6],[9,77,2.2]],
  [[0,79,2.4],[3,74,1.6],[6,70,3.5]],
  [[1,73,1.5],[3,76,2.3],[6,79,1.5],[9,76,2]],
  [[0,77,2.4],[3,74,1.6],[5,70,2.4],[8,74,3]],
  [[0,79,3.2],[4,77,1.6],[6,74,4.4]],
  [[0,76,2.3],[3,73,1.5],[6,69,3.2]],
  [[0,74,7.2],[9,69,1.4],[11,73,0.8]],
];
export function buildCroissantScore() {
  const notes = [];
  const add = (instrument, at, note, duration, velocity) => notes.push({ instrument, at, note, duration: Math.min(duration, CROISSANT_STEPS - at), velocity });
  for (let bar = 0; bar < CROISSANT_BARS; bar++) {
    const at = bar * CROISSANT_STEPS_PER_BAR;
    const h = harmony[bar];
    add('bass', at, h.bass, 2.8, 68);
    // Bass on beat one, short accordion chord on beats two and three.
    for (const beat of [4, 8]) for (const note of h.chord) add('chord', at + beat, note, 2.1, beat === 4 ? 42 : 36);
    for (const [step, note, duration] of melody[bar]) add('accordion', at + step, note, duration, 70);
  }
  return notes.sort((a, b) => a.at - b.at);
}
export const CROISSANT_SCORE = buildCroissantScore();
export const CROISSANT_BY_STEP = Array.from({ length: CROISSANT_STEPS }, () => []);
for (const event of CROISSANT_SCORE) CROISSANT_BY_STEP[Math.floor(event.at)].push(event);
