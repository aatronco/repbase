import { source } from './engine.js';
const percent = value => `${Number(value * 100).toLocaleString('es-CL', { maximumFractionDigits: 3 })}%`;

// Explanations are fixed educational text; the workout itself retains its live calculations.
export function workoutGuidance() {
  return {
    title: 'Cómo elegir tus pesos',
    definition: 'El RM del día es el peso que eliges hoy para las repeticiones indicadas, con buena técnica y 1–2 repeticiones en reserva.',
    steps: [
      'Calienta con series de aproximación: empieza con cargas cómodas y aumenta gradualmente, sin fatigarte antes de la serie objetivo.',
      'Elige una carga para las repeticiones indicadas y registra el peso y las repeticiones que realizaste.',
      'Para calcular una referencia propia, anota el peso y las repeticiones de una serie reciente y aplica las fórmulas del ejemplo.',
    ],
    next: 'El PR es una marca realizada; el 1RM y el 2RM estimados son cálculos. El TM es una referencia de entrenamiento que debes elegir y registrar. Las series posteriores usan la base indicada en cada ejercicio: TM o RM del día.',
    exampleLabel: 'Ejemplo de referencia · press de banca',
    example: [
      'Serie: 105 kg × 3 repeticiones. Estimación Epley del 1RM: 105 × (1 + 3 / 30) = 115,5 kg.',
      'Para estimar el 2RM con la misma fórmula: 115,5 ÷ (1 + 2 / 30) = 108,28 kg.',
      'Estos valores son estimaciones, no máximos probados. Si la serie fue submáxima, pueden subestimar tu capacidad. Usa el mismo procedimiento con tus propias marcas y elige tu TM de forma conservadora.',
    ],
  };
}
export function backoffBasis(entry, substitution) {
  const back = entry.backoff;
  if (!back) return '';
  if (back.kind === 'daily') return `${percent(back.percent)} del RM registrado hoy`;
  const lift = substitution?.name || source.maxes.find(m => m.cell === back.maxCell)?.label;
  return `${percent(back.percent)} del TM de ${lift}`;
}
