import { mainSetCount, prescribedLoad, roundLoad, source } from './engine.js';
const number = value => Number(value).toLocaleString('es-CL', { maximumFractionDigits: 3 });
const kg = value => `${number(value)} kg`;
const percent = value => `${number(value * 100)}%`;
export function workoutGuidance(entry, profile) {
  const sets = mainSetCount(entry);
  const rm = entry.rm;
  const mrs = /MRS/.test(String(entry.sets));
  const result = { title: '', definition: '', steps: [], next: '', example: [], exampleLabel: 'Ejemplo ficticio · no es una carga recomendada' };
  if (entry.kind === 'tm') {
    result.title = 'Cómo calcular y registrar estas series';
    result.definition = `${entry.sets} series de ${entry.reps} repeticiones con el ${percent(entry.percent)} del TM indicado.`;
    result.steps = ['Consulta la carga calculada. Si aparece “Sin definir”, ingresa el TM de este ejercicio y bloque en Mis marcas.', `Después del calentamiento, completa las ${entry.sets} series indicadas. Registra el peso realmente utilizado y las repeticiones de cada una.`];
    const fake = structuredClone(profile);
    fake.maxes[entry.maxCell].tm = 100;
    const load = prescribedLoad(entry, fake);
    result.example = [`Con un TM ficticio de 100 kg: 100 × ${percent(entry.percent)} = ${kg(100 * entry.percent)}. Con un salto de ${kg(profile.increment)}, la carga es ${kg(load)}.`, `El objetivo de esta sesión sería ${entry.sets} × ${entry.reps} a ${kg(load)}. El peso realizado se registra por separado.`];
    return result;
  }
  result.title = `Cómo encontrar y registrar mi ${rm}RM`;
  result.definition = `${rm}RM del día: una serie exigente de ${rm} ${rm === 1 ? 'repetición' : 'repeticiones'} con una carga que puedas controlar hoy, dejando 1–2 repeticiones en reserva.`;
  result.steps = [
    'Calienta y realiza series de aproximación: empieza con una carga cómoda y aumenta gradualmente, con pocas repeticiones para no fatigarte antes de la serie objetivo.',
    `Elige el peso para una serie de ${rm} ${rm === 1 ? 'repetición' : 'repeticiones'} a partir de tus aproximaciones y sesiones recientes. Al terminar, deberías poder hacer solo 1–2 repeticiones más con buena técnica; no busques el fallo.`,
    `Registra los kilos de esa serie y las repeticiones que realmente hiciste. Las aproximaciones no cuentan como series de trabajo.`,
  ];
  result.next = 'El RM del día puede cambiar con la fatiga. Tu PR de una repetición y el TM son marcas distintas y no se modifican al registrar esta serie.';
  if (mrs) {
    const additional = parseInt(entry.sets);
    result.next += ` Después haz ${additional} MRS: ${additional} ${additional === 1 ? 'serie adicional' : 'series adicionales'} con ese mismo peso, dejando 1–2 repeticiones en reserva. Registra ${sets} series en total; la primera es el ${rm}RM.`;
    result.next += String(entry.tier).startsWith('1') ? ' Descanso T1: 3–5 minutos.' : ' Descansa 30–60 segundos entre la serie inicial y las MRS, y entre cada MRS.';
    const reps = Array.from({ length: sets }, (_, i) => Math.max(1, rm - i * 2));
    result.example = [`Si la primera serie fuera ${rm} repeticiones con 20 kg, mantendrías esos 20 kg para las ${additional} MRS.`, `Un registro ilustrativo de las ${sets} series sería: ${reps.join(', ')} repeticiones. Es normal que bajen con la fatiga; no son objetivos fijos para las MRS.`];
  } else if (entry.backoff) {
    const back = entry.backoff;
    const count = parseInt(back.sets);
    const fakeBase = back.kind === 'daily' ? 80 : 100;
    const load = roundLoad(fakeBase * back.percent, profile.increment);
    const base = back.kind === 'daily' ? 'RM que acabas de registrar' : 'TM de este bloque';
    result.next += ` Después: ${count} series de ${back.reps} al ${percent(back.percent)} del ${base}.`;
    if (back.kind === 'tm') result.next += ' El peso de tu RM del día no se usa para calcular estas series.';
    const calculation = `${number(fakeBase)} × ${percent(back.percent)} = ${kg(fakeBase * back.percent)}; redondeado al salto de ${kg(profile.increment)}: ${kg(load)}.`;
    result.example = back.kind === 'daily'
      ? [`Si hoy hicieras ${rm} repeticiones con 80 kg, esos 80 kg serían la base de las series posteriores.`, calculation, `Registrarías 80 kg y ${rm} en la serie RM; después, ${count} series de ${back.reps} a ${kg(load)}, anotando sus repeticiones reales.`]
      : [`Supón un TM de 100 kg y una serie de ${rm}RM realizada con 80 kg. Las series posteriores usan el TM de 100 kg.`, calculation, `Registrarías 80 kg y ${rm} en la serie RM; después, ${count} series de ${back.reps} a ${kg(load)}. Los 80 kg del RM se guardan, pero no entran en este cálculo.`];
    if (String(back.sets).includes('+')) result.example.push('Solo la última serie permite un AMRAP opcional, manteniendo 1–2 repeticiones en reserva.');
  } else {
    result.example = [`Si realizaras ${rm} ${rm === 1 ? 'repetición' : 'repeticiones'} con 80 kg, registrarías 80 kg y ${rm}. Esta entrada no añade series posteriores.`];
  }
  return result;
}
export function backoffBasis(entry, substitution) {
  const back = entry.backoff;
  if (!back) return '';
  if (back.kind === 'daily') return `${percent(back.percent)} del RM registrado hoy`;
  const lift = substitution?.name || source.maxes.find(m => m.cell === back.maxCell)?.label;
  return `${percent(back.percent)} del TM de ${lift}`;
}
