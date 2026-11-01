import { workoutGuidance, backoffBasis } from './workout-guidance.js';
import { initTheme } from './theme.js';
import { initAmbience } from './ambience.js';
import { workouts, source, positive, session, prescribedLoad, emptyState, estimate1RM, snapshot, completedErrors, validateState, mainSetCount } from './engine.js';
import { readState, writeState, STORAGE_KEY } from './storage.js';
const app = document.querySelector('#app');
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let state;
let storageFailed = false;
try { state = readState(); } catch { storageFailed = true; state = emptyState(); }
let week = 1;
let pickerCallback = null;
let pickerStep = 2.5;
let wheelValues = [];
let wheelTimer;
function tell(message) {
  const s = document.querySelector('#status'); s.textContent = message; s.classList.add('visible');
  clearTimeout(tell.timer); tell.timer = setTimeout(() => s.classList.remove('visible'), 6000);
}
function persist() {
  if (storageFailed) { tell('No se guardó: descarga una copia antes de continuar. El almacenamiento anterior sigue protegido.'); return false; }
  try { writeState(state); return true; } catch { tell('No se pudo guardar. Descarga una copia de seguridad para conservar tus cambios.'); return false; }
}
function download(data, filename) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const backup = () => download(storageFailed ? { recovery: true, raw: localStorage.getItem(STORAGE_KEY) } : state, 'repbase-backup-' + new Date().toISOString().slice(0, 10) + '.json');
const kg = v => positive(v) ? v.toLocaleString('es-CL', { maximumFractionDigits: 3 }) + ' kg' : 'Sin definir';
const weightContent = (value, demo = false) => `<span class="weight-value">${esc(kg(value))}</span><span class="weight-action">${demo ? 'Ejemplo ficticio' : positive(value) ? 'Cambiar peso' : 'Ingresar peso'} <span aria-hidden="true">↕</span></span>`;
function updateWeightButton(button, value, demo = false) {
  button.dataset.value = value ?? '';
  button.innerHTML = weightContent(value, demo);
  button.setAttribute('aria-label', `${button.dataset.label}: ${kg(value)}`);
}
const weightButton = (id, value, label = 'Peso') => `<label>${esc(label)}<button type="button" class="weight-button" data-pick="${esc(id)}" data-label="${esc(label)}" data-value="${value ?? ''}" aria-label="${esc(label)}: ${esc(kg(value))}">${weightContent(value)}</button></label>`;
const repButtons = (id, field, count, text) => `<div class="rep-buttons" role="group" aria-label="Repeticiones de cada serie">${Array.from({ length: count }, (_, i) => {
  const reps = (text || '').split(',')[i]?.trim();
  return `<button type="button" class="rep-button secondary" data-pick="rep-${id}-${field}-${i}" data-value="${Number(reps) || ''}" aria-label="Serie ${i + 1}: ${esc(reps || 'sin registrar')} repeticiones"><span class="rep-series">Serie ${i + 1}</span><span class="rep-value">${esc(reps || '—')} <small>reps</small></span></button>`;
}).join('')}</div>`;
function guidancePanel(entry, profile) {
  const help = workoutGuidance(entry, profile);
  return `<p class="rm-definition">${esc(help.definition)}</p>${/MRS/.test(String(entry.sets)) ? `<p class="mrs-brief">Después, ${parseInt(entry.sets)} MRS: ${parseInt(entry.sets)} series adicionales con el mismo peso. Las repeticiones pueden bajar.</p>` : ''}<details class="exercise-help" data-help="${entry.id}"><summary>${esc(help.title)}</summary><div class="help-body"><ol>${help.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>${help.next ? `<p>${esc(help.next)}</p>` : ''}<div class="worked-example"><h3>${esc(help.exampleLabel)}</h3>${help.example.map(line => `<p>${esc(line)}</p>`).join('')}</div><a href="#/guide">Ver definiciones y método completo</a></div></details>`;
}
const title = (eyebrow, heading, text = '') => `<p class="eyebrow">${eyebrow}</p><h1>${esc(heading)}</h1>${text ? `<p class="intro">${text}</p>` : ''}`;
function latest(w, d) { return state.history.filter(h => h.week === w && h.day === d).at(-1); }
function renderHome() {
  app.innerHTML = title('REPBASE · JACKED & TAN 2.0', 'Programa', 'Selecciona una semana y un día.') +
    (!Object.values(state.profile.maxes).some(m => positive(m.tm)) ? '<div class="notice">Define los TM en <a href="#/setup">Mis marcas</a>. Los pesos están vacíos hasta que ingreses los tuyos.</div>' : '') +
    `<div class="weekbar"><div><p class="eyebrow">${week <= 6 ? 'BLOQUE 1 · BASE Y CAPACIDAD' : 'BLOQUE 2 · RM DEL DÍA'}</p><h2>${week === 6 || week === 12 ? 'Semana de pruebas' : 'Semana ' + week}</h2></div><label>Ver semana<select id="week">${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${week === i + 1 ? 'selected' : ''}>Semana ${i + 1}</option>`).join('')}</select></label></div><div class="grid">` +
    workouts.filter(w => w.week === week).map(w => `<a class="card session-link" href="#/workout/${week}/${w.day}"><div class="day-number">DÍA 0${w.day} · ${w.day % 2 ? 'TREN INFERIOR' : 'TREN SUPERIOR'}</div><h3>${esc(w.entries[0].exercise)}</h3><p class="muted">${w.entries[0].rm}RM del día · ${w.entries.length} ejercicios</p><span class="pill">${latest(week, w.day) ? 'Completada · ver registro' : Object.keys(state.drafts[week + '-' + w.day] || {}).length ? 'En curso' : 'Abrir sesión →'}</span></a>`).join('') + '</div><p class="muted">El programa tiene cuatro sesiones por semana.</p>';
  document.querySelector('#week').onchange = e => { week = Number(e.target.value); renderHome(); };
}
function setup() {
  const p = state.profile;
  app.innerHTML = title('CONFIGURACIÓN PERSONAL', 'Mis marcas', 'El TM es una <strong>2RM diaria estimada</strong> y calcula las cargas por porcentaje. El PR y la 1RM estimada se guardan por separado.') +
    `<form id="setup"><div class="card"><div class="fields"><label>Nombre<input name="name" maxlength="80" value="${esc(p.name)}" required></label><label>Inicio del ciclo (opcional)<input name="startDate" type="date" value="${esc(p.startDate)}"></label></div><label>Salto de carga (kg)<select name="increment">${[0.5, 1, 1.25, 2.5, 5].map(n => `<option ${p.increment === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label><p class="muted">Redondeo al múltiplo más cercano. Los campos vacíos quedan sin calcular.</p></div>` +
    [1, 2].map(block => `<h2>Bloque ${block} · semanas ${block === 1 ? '1–6' : '7–12'}</h2>${block === 2 ? '<p class="muted">Este bloque usa TM independientes. Después de la semana 6, revisa e ingresa los TM que usarás. Un test no cambia estos valores automáticamente.</p>' : ''}<div class="grid">` + source.maxes.filter(m => m.block === block).map(m => {
      const v = p.maxes[m.cell];
      return `<section class="card"><h3>${esc(m.label)}</h3>${weightButton('max-' + m.cell, v.tm, 'TM · 2RM diaria estimada (kg)')}<input type="hidden" name="${m.cell}-tm" value="${v.tm ?? ''}"><div class="fields"><label>PR · 1RM real (opcional)<input name="${m.cell}-real1RM" type="number" min="0.01" max="2000" step="any" value="${v.real1RM ?? ''}"></label><label>1RM estimada (opcional)<input name="${m.cell}-estimated1RM" type="number" min="0.01" max="2000" step="any" value="${v.estimated1RM ?? ''}"></label></div><label>Fecha de la marca<input name="${m.cell}-date" type="date" value="${esc(v.date)}"></label><label>Nota de la marca (opcional)<input name="${m.cell}-source" maxlength="200" value="${esc(v.source)}" placeholder="Ej.: 80 kg × 2, cómodo"></label></section>`;
    }).join('') + '</div>').join('') +
    '<div class="actions"><button type="submit">Guardar marcas</button><button type="button" id="demo" class="secondary">Cargar ejemplo ficticio</button><button type="button" id="clear-maxes" class="secondary danger-action">Vaciar marcas</button></div><p class="muted">Guardar recalcula las sesiones pendientes. Las sesiones completadas conservan su propia copia de las marcas y cargas.</p></form>' +
    '<details class="card"><summary>Estimar una 1RM desde una serie reciente</summary><p class="muted">Epley: peso × (1 + reps / 30), para 2–10 reps. Es una estimación informativa; no se copia al TM.</p><form id="estimate" class="fields"><label>Peso (kg)<input name="weight" type="number" min="0.01" max="2000" step="any" required></label><label>Repeticiones<input name="reps" type="number" min="1" max="10" required></label><button>Calcular</button><output id="estimate-result" aria-live="polite"></output></form></details>' + backupPanel();
  const form = document.querySelector('#setup');
  bindPickers((id, value) => { const key = id.slice(4); form.elements[key + '-tm'].value = value ?? ''; const b = form.querySelector(`[data-pick="${id}"]`); updateWeightButton(b, value); });
  form.onsubmit = e => {
    e.preventDefault(); const data = new FormData(form); const next = structuredClone(state);
    next.profile.name = data.get('name').trim() || 'Atleta'; next.profile.startDate = data.get('startDate'); next.profile.increment = Number(data.get('increment'));
    for (const m of source.maxes) for (const key of ['tm', 'real1RM', 'estimated1RM', 'date', 'source']) { const v = data.get(m.cell + '-' + key); next.profile.maxes[m.cell][key] = ['date', 'source'].includes(key) ? v : v === '' ? null : Number(v); }
    try { validateState(next); state = next; if (persist()) tell('Marcas guardadas. Tus registros anteriores se conservaron.'); } catch (error) { tell(error.message); }
  };
  document.querySelector('#demo').onclick = () => {
    if (!confirm('Cargar valores FICTICIOS en el formulario. No son marcas del atleta. Se guardan solo con Guardar marcas.')) return;
    source.maxes.forEach((m, i) => { const value = [90, 60, 110, 35, 45, 70][i % 6]; form.elements[m.cell + '-tm'].value = value; form.elements[m.cell + '-source'].value = 'EJEMPLO FICTICIO · reemplazar antes de entrenar'; const b = form.querySelector(`[data-pick="max-${m.cell}"]`); updateWeightButton(b, value, true); });
    tell('Ejemplo ficticio cargado en el formulario. Reemplaza las marcas antes de entrenar.');
  };
  document.querySelector('#clear-maxes').onclick = () => { if (!confirm('¿Vaciar los campos del formulario? Después pulsa Guardar marcas. El historial se conserva.')) return; for (const m of source.maxes) { for (const k of ['tm', 'real1RM', 'estimated1RM', 'date', 'source']) form.elements[m.cell + '-' + k].value = ''; const b = form.querySelector(`[data-pick="max-${m.cell}"]`); updateWeightButton(b, null); } };
  document.querySelector('#estimate').onsubmit = e => { e.preventDefault(); const d = new FormData(e.target); document.querySelector('#estimate-result').textContent = '1RM estimada: ' + kg(estimate1RM(Number(d.get('weight')), Number(d.get('reps')))); };
  bindBackup();
}
function backupPanel() {
  return '<section class="card"><h2>Copia de seguridad</h2><p class="muted">Los datos se guardan en este navegador, sin cuenta ni servidor. Exporta una copia para cambiar de dispositivo o protegerte al borrar los datos del navegador.</p><div class="actions"><button id="export" class="secondary">Descargar copia JSON</button><button id="reset" class="secondary danger-action">Reiniciar datos</button></div><label>Restaurar una copia JSON<input type="file" id="import" accept="application/json,.json"></label><small>Restaurar reemplaza los datos actuales. Se ofrece una copia antes del reemplazo.</small></section>';
}
function bindBackup() {
  document.querySelector('#export').onclick = backup;
  document.querySelector('#reset').onclick = () => { if (!confirm('Se descargarán tus datos actuales. Para borrar este ciclo se pedirá escribir BORRAR.')) return; backup(); if (prompt('Escribe BORRAR para reiniciar este navegador.') !== 'BORRAR') return; state = emptyState(); storageFailed = false; if (persist()) { route(); tell('Ciclo reiniciado.'); } };
  document.querySelector('#import').onchange = async e => {
    const file = e.target.files[0]; if (!file) return;
    try { if (file.size > 10 * 1024 * 1024) throw new Error('La copia supera los 10 MB.'); const next = validateState(JSON.parse(await file.text())); if (!confirm('¿Restaurar esta copia? Se descargará la copia actual antes de reemplazarla.')) return; backup(); state = next; storageFailed = false; if (persist()) { route(); tell('Copia restaurada.'); } } catch (error) { tell(error.message); }
  };
}
function prescriptionText(e, profile, record, sub) {
  if (e.kind === 'tm') return `${e.sets} × ${e.reps} · ${kg(prescribedLoad(e, profile, null, sub))}`;
  if (e.kind === 'mrs') return `${e.rm}RM + ${e.sets}`;
  return `${e.rm}RM del día${e.sets ? ' + ' + e.sets : ''}`;
}
function workoutView(w, forceDraft = false) {
  const openHelpIds = [...app.querySelectorAll('.exercise-help[open]')].map(d => d.dataset.help);
  const key = w.week + '-' + w.day; const saved = latest(w.week, w.day); const readOnly = !!saved && !forceDraft && !state.drafts[key];
  const records = readOnly ? saved.records : (state.drafts[key] ||= {});
  const profile = readOnly ? saved.profile : state.profile;
  const noteLabels = { 'T2 Rest': 'T2: descanso.', 'Week 7 T3 Rest All Days': 'T3: descanso durante esta semana.', 'T3 Rest': 'T3: descanso.', 'T2b & T2c Rest': 'T2b y T2c: descanso.', 'T3 Variety Option:': 'Las variantes de T2 y T3 pueden cambiarse en el segundo bloque.' };
  app.innerHTML = `<a class="back" href="#/home">← Programa</a>` + title(`SEMANA ${w.week} · DÍA ${w.day}${readOnly ? ' · REGISTRO GUARDADO' : ''}`, w.entries[0].exercise, readOnly ? 'Esta sesión conserva las marcas y cargas del momento en que la completaste.' : 'Los pesos y repeticiones se guardan como borrador. Completa la sesión al terminar.') +
    (Object.values(profile.maxes).some(m => /FICTICIO/.test(m.source)) ? '<div class="notice warning">DEMO: estás usando marcas ficticias. Reemplázalas en Mis marcas antes de entrenar.</div>' : '') +
    w.entries.map(e => {
      const r = records[e.id] || {}; const sub = profile.substitutions[e.id]; const name = sub?.name || e.exercise; const load = prescribedLoad(e, profile, r.weight, sub); const backoff = prescribedLoad(e.backoff, profile, r.weight, sub);
      return `<article class="card t${String(e.tier)[0]}"><div class="tier">T${esc(String(e.tier).replace(/\.0$/, ''))}</div><h2>${esc(name)}</h2><p class="prescription">${esc(prescriptionText(e, profile, r, sub))}</p>${e.kind === 'tm' ? `<p class="muted">Base: ${e.percent * 100}% del TM de ${esc(sub?.name || source.maxes.find(m => m.cell === e.maxCell)?.label)} · bloque ${w.week <= 6 ? 1 : 2}${load === null ? ' · ingresa el TM en Mis marcas' : ''}</p>` : ''}${guidancePanel(e, profile)}
        ${e.backoff ? `<div class="notice backoff-block"><span class="step-label">DESPUÉS DE LA SERIE RM</span><strong> ${parseInt(e.backoff.sets)} × ${e.backoff.reps} · <span data-backoff-label="${e.id}">${kg(backoff)}</span></strong>Base del cálculo: ${esc(backoffBasis(e, sub))}. ${String(e.backoff.sets).includes('+') ? 'Última serie AMRAP opcional.' : ''}</div>` : ''}
        ${readOnly ? `<p>Peso realizado: <strong>${kg(r.weight)}</strong><br>Repeticiones: ${esc(r.reps)}${e.backoff ? `<br>Series posteriores: ${kg(r.backoffWeight)} · ${esc(r.backoffReps)}` : ''}</p>` : `<div class="fields">${weightButton(e.id + '-weight', r.weight, e.kind === 'tm' ? 'Peso realizado (kg)' : `Peso de la serie de ${e.rm} (kg)`)}<label>${mainSetCount(e) === 1 ? 'Reps de la serie RM' : `Reps de las ${mainSetCount(e)} series`}<input data-record="${e.id}" data-field="reps" value="${esc(r.reps)}" inputmode="text" placeholder="${mainSetCount(e) === 1 ? e.rm : '10, 8, 7, 6'}" aria-label="Repeticiones de ${esc(name)}"></label></div>${repButtons(e.id, 'reps', mainSetCount(e), r.reps)}${e.backoff ? `<div class="fields">${weightButton(e.id + '-backoffWeight', r.backoffWeight, 'Peso realizado · series posteriores')}<label>Reps de ${parseInt(e.backoff.sets)} series posteriores<input data-record="${e.id}" data-field="backoffReps" value="${esc(r.backoffReps)}" placeholder="${Array(parseInt(e.backoff.sets)).fill(e.backoff.reps).join(', ')}" aria-label="Repeticiones posteriores de ${esc(name)}"></label></div>${repButtons(e.id, 'backoffReps', parseInt(e.backoff.sets), r.backoffReps)}` : ''}`}
        <details><summary>Sustitución de ejercicio</summary><p class="muted">Ejercicio original: ${esc(e.exercise)}.</p>${readOnly ? '' : `<label>Sustituir este ejercicio en esta sesión<input data-sub="${e.id}" maxlength="100" value="${esc(sub?.name)}" placeholder="Dejar vacío para usar el original"></label>${e.kind === 'tm' || e.backoff?.kind === 'tm' ? `<label>TM propio de la sustitución (kg)<input data-sub-tm="${e.id}" type="number" min="0.01" max="2000" step="any" value="${sub?.tm ?? ''}"></label><p class="muted">Una sustitución necesita su propio TM. No se reutiliza automáticamente el máximo del ejercicio original.</p>` : ''}`}</details></article>`;
    }).join('') + (w.notes.length ? `<details class="card"><summary>Notas de la semana</summary><ul>${w.notes.map(n => `<li>${esc(noteLabels[n] || n)}</li>`).join('')}</ul></details>` : '') +
    `<div id="session-errors" role="alert"></div><div class="actions session-actions">${readOnly ? '<button id="reopen" class="secondary">Registrar nueva revisión</button>' : '<button id="finish">Completar sesión</button><button id="save-draft" class="secondary">Guardar borrador</button>'}<button id="session-export" class="secondary text-action">Descargar copia</button></div>`;
  for (const id of openHelpIds) { const detail = app.querySelector(`[data-help="${id}"]`); if (detail) detail.open = true; }
  document.querySelector('#session-export').onclick = backup;
  if (readOnly) { document.querySelector('#reopen').onclick = () => { if (!confirm('Crear un nuevo borrador con estos registros. La sesión anterior quedará en el historial.')) return; state.drafts[key] = structuredClone(saved.records); persist(); workoutView(w, true); }; return; }
  bindPickers((id, value) => {
    if (id.startsWith('rep-')) { const [, entryId, field, index] = id.match(/^rep-(.+)-(reps|backoffReps)-(\d+)$/); const r = records[entryId] ||= {}; const values = (r[field] || '').split(','); values[Number(index)] = value ?? ''; r[field] = values.join(','); persist(); workoutView(w, true); return; }
    const match = id.match(/^(.+)-(weight|backoffWeight)$/); const [, entryId, field] = match;
    (records[entryId] ||= {})[field] = value; persist(); workoutView(w, true);
  });
  app.querySelectorAll('[data-record]').forEach(el => el.onchange = () => { (records[el.dataset.record] ||= {})[el.dataset.field] = el.value; persist(); });
  app.querySelectorAll('[data-sub]').forEach(el => el.onchange = () => { const id = el.dataset.sub; const existing = profile.substitutions[id]; if (!confirm('Cambiar solo este ejercicio en esta sesión. Los registros completados se conservan.')) { el.value = existing?.name || ''; return; } profile.substitutions[id] = { name: el.value.trim(), tm: null }; persist(); workoutView(w, true); });
  app.querySelectorAll('[data-sub-tm]').forEach(el => el.onchange = () => { const s = profile.substitutions[el.dataset.subTm]; if (!s?.name) { tell('Escribe primero el nombre de la sustitución.'); return; } const v = el.value === '' ? null : Number(el.value); if (v !== null && !positive(v)) { tell('Ingresa un TM válido.'); return; } s.tm = v; persist(); workoutView(w, true); });
  document.querySelector('#save-draft').onclick = () => { if (persist()) tell('Borrador guardado en este navegador.'); };
  document.querySelector('#finish').onclick = () => {
    const errors = completedErrors(w, records);
    if (errors.length) { document.querySelector('#session-errors').innerHTML = '<div class="notice warning">' + errors.map(esc).join('<br>') + '</div>'; document.querySelector('#session-errors').scrollIntoView({ block: 'center' }); return; }
    if (!confirm('¿Completar y guardar esta sesión? Las cargas quedarán congeladas en el historial.')) return;
    state.history.push(snapshot(state, w, records)); delete state.drafts[key];
    if (persist()) { workoutView(w); tell('Sesión completada.'); }
  };
}
function history() {
  app.innerHTML = title('REGISTROS DEL CICLO', 'Historial', 'Cada sesión conserva sus marcas, ejercicios y cargas. Cambiar un TM no modifica los registros completados.') +
    `<section class="card">${state.history.length ? [...state.history].reverse().map(h => `<div class="history-entry"><h3>Semana ${h.week} · Día ${h.day}</h3><p class="muted">${esc(new Date(h.completedAt).toLocaleString('es-CL'))} · ${Object.keys(h.records).length} ejercicios registrados</p><button class="secondary" data-history="${esc(h.id)}">Ver esta revisión</button></div>`).join('') : '<p class="muted">Aún no hay sesiones completadas. Los borradores se muestran en Programa.</p>'}</section>` + backupPanel();
  app.querySelectorAll('[data-history]').forEach(b => b.onclick = () => {
    const h = state.history.find(h => h.id === b.dataset.history);
    app.innerHTML = '<a href="#/history" class="back" id="back-history">← Historial</a>' + title(`SEMANA ${h.week} · DÍA ${h.day}`, 'Registro de la sesión', esc(h.completedAt)) + h.prescription.entries.map(e => { const r = h.records[e.id] || {}; return `<section class="card"><p class="tier">T${esc(String(e.tier).replace(/\.0$/, ''))}</p><h2>${esc(h.profile.substitutions?.[e.id]?.name || e.exercise)}</h2><p>${kg(r.weight)} · reps: ${esc(r.reps)}</p>${e.backoff ? `<p>Series posteriores: ${kg(r.backoffWeight)} · reps: ${esc(r.backoffReps)}</p>` : ''}</section>`; }).join('');
    document.querySelector('#back-history').onclick = e => { e.preventDefault(); history(); }; window.scrollTo(0, 0);
  }); bindBackup();
}
function guide() {
  app.innerHTML = title('JACKED & TAN 2.0', 'Guía del programa') +
    '<section class="card"><h2>Organización</h2><p>El programa dura 12 semanas, divididas en dos bloques de seis. Cada semana tiene cuatro sesiones: dos de tren inferior y dos de tren superior. Selecciona la semana y el día en Programa.</p><p>T1 identifica el trabajo principal; T2, los ejercicios complementarios; T3, los accesorios. Cada ejercicio muestra sus repeticiones, series y el tipo de carga que utiliza.</p></section>' +
    '<section class="card"><h2>Marcas y cargas</h2><dl><dt>TM · máximo de entrenamiento</dt><dd>Es una 2RM diaria estimada: una carga que representa tu capacidad para dos repeticiones en un día de entrenamiento. Ingresa el TM de cada ejercicio y bloque en Mis marcas. Los porcentajes que indican “del TM” usan ese valor.</dd><dt>PR · 1RM real</dt><dd>Es una marca de una repetición que hayas realizado. Es opcional y se guarda como información; no reemplaza el TM ni calcula automáticamente el RM del día.</dd><dt>1RM estimada</dt><dd>Es una aproximación calculada desde una serie de varias repeticiones. La calculadora de Mis marcas utiliza Epley. Su resultado es informativo y no se copia al TM.</dd><dt>RM del día</dt><dd>Es la carga exigente que puedes mover hoy para las repeticiones indicadas. Un 10RM del día pide una serie de diez repeticiones, terminando con 1–2 repeticiones en reserva y buena técnica. Calienta con aproximaciones graduales y pocas repeticiones antes de elegir esa carga; las aproximaciones no son series de trabajo. Registra los kilos reales y las repeticiones logradas. Ese dato no cambia tu PR ni tu TM.</dd><dt>Carga calculada y peso realizado</dt><dd>La carga calculada es la que corresponde al porcentaje indicado. El peso realizado es el que utilizaste y debes registrar. Si falta un TM o un RM necesario, la carga muestra “Sin definir”. Los pesos se redondean al múltiplo más cercano del salto de carga configurado.</dd></dl></section>' +
    '<section class="card"><h2>Series y repeticiones</h2><dl><dt>Series × repeticiones</dt><dd>4 × 10 significa cuatro series de diez repeticiones. Registra el peso utilizado y las repeticiones de cada serie con los selectores S1, S2, etc., o escribe la lista separada por comas.</dd><dt>MRS · series de máximas repeticiones</dt><dd>Primero encuentra el RM indicado y después completa las MRS adicionales con el mismo peso. Por ejemplo, 15RM + 3MRS significa una serie inicial de quince repeticiones y tres series adicionales. Las repeticiones pueden bajar entre series; deja 1–2 repeticiones en reserva.</dd><dt>Series posteriores al RM</dt><dd>Después de la serie RM, realiza las series posteriores indicadas. En T1, las semanas 1–5 usan un porcentaje del TM del primer bloque. Las semanas 7–11 usan el 85% o el 90% del RM encontrado ese día, según la sesión. T2a utiliza el TM del bloque correspondiente.</dd><dt>AMRAP opcional</dt><dd>Cuando se indica en la última serie, puedes superar las repeticiones previstas si te encuentras bien. Mantén 1–2 repeticiones en reserva. Si no haces el AMRAP, completa las repeticiones indicadas.</dd><dt>Descansos entre series</dt><dd>T1: 3–5 minutos. T2: 2–3 minutos. T3: 60–90 segundos. Si una categoría aparece en descanso, sus ejercicios no se realizan en esa sesión.</dd></dl></section>' +
    '<section class="card"><h2>Progresión y cambio de bloque</h2><p>Las repeticiones, los porcentajes y las series cambian según la semana. Sigue los objetivos que muestra cada sesión; registrar una serie no añade peso automáticamente a la siguiente.</p><p>La semana 6 incluye pruebas de T1 y descanso de T2; T3 mantiene las MRS indicadas. Antes de comenzar la semana 7, revisa e ingresa los TM del segundo bloque. Los resultados de las pruebas no se copian automáticamente a esos TM.</p><p>En el segundo bloque, el T1 del tercer día pasa de sentadilla frontal a peso muerto. La semana 7 descarga T3; la semana 11 descarga T2b y T2c. La semana 12 incluye nuevas pruebas y los descansos que indica cada sesión.</p><p>Las sustituciones se configuran desde cada ejercicio y afectan esa entrada de la sesión. Si la sustitución utiliza porcentajes, necesita su propio TM.</p></section>' +
    '<section class="card"><h2>Registro de sesiones</h2><p>Los cambios de pesos y repeticiones se guardan como borrador en este navegador. Completar sesión requiere registrar el peso y las repeticiones de todas las series indicadas, incluidas las MRS y las series posteriores al RM.</p><p>Una sesión completada conserva las cargas, marcas y ejercicios de ese momento. Cambiar un TM recalcula las sesiones pendientes y no modifica el historial. Registrar nueva revisión conserva la versión anterior.</p><p>Descarga una copia JSON desde Mis marcas o Historial para conservar los datos o trasladarlos a otro navegador. Restaurar una copia reemplaza los datos actuales y ofrece descargar primero una copia de seguridad.</p></section>' +
    '<section class="card"><h2>Autoría</h2><p>Jacked & Tan 2.0 es un programa de Cody Lefever (GZCL).</p><p><a href="https://swoleateveryheight.blogspot.com/2016/07/jacked-tan-20.html" target="_blank" rel="noopener">Artículo original de Cody Lefever</a></p></section>';
}
function bindPickers(callback) {
  app.querySelectorAll('[data-pick]').forEach(button => button.onclick = () => {
    pickerCallback = value => callback(button.dataset.pick, value); pickerStep = button.dataset.pick.startsWith('rep-') ? 1 : state.profile.increment;
    const isReps = button.dataset.pick.startsWith('rep-'); const max = isReps ? 100 : 2000; const unit = value => isReps ? value + ' reps' : kg(value);
    const current = positive(Number(button.dataset.value)) ? Number(button.dataset.value) : pickerStep;
    const dialog = document.querySelector('#picker'); const wheel = document.querySelector('#wheel');
    document.querySelector('#picker-title').textContent = button.closest('label')?.firstChild.textContent || button.getAttribute('aria-label');
    const start = Math.max(1, Math.floor(current / pickerStep) - 100); const end = Math.min(Math.floor(max / pickerStep), start + 240);
    wheelValues = Array.from({ length: end - start + 1 }, (_, i) => Number(((start + i) * pickerStep).toFixed(4)));
    wheel.innerHTML = wheelValues.map((v, i) => `<div role="option" id="option-${i}" aria-selected="false" data-wheel-index="${i}">${unit(v)}</div>`).join('');
    document.querySelector('#wheel').setAttribute('aria-label', isReps ? 'Selector de repeticiones' : 'Selector de peso');
    const input = document.querySelector('#picker-number'); input.value = current; input.step = isReps ? '1' : 'any'; input.max = max; input.min = isReps ? '1' : '0.0001';
    dialog.returnValue = 'cancel';
    dialog.oncancel = () => { dialog.returnValue = 'cancel'; };
    dialog.onkeydown = event => { if (event.key === 'Escape') { event.preventDefault(); dialog.close('cancel'); } };
    dialog.onclick = event => { if (event.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close('cancel'); };
    dialog.showModal();
    const index = wheelValues.reduce((best, v, i) => Math.abs(v - current) < Math.abs(wheelValues[best] - current) ? i : best, 0);
    function select(i, scroll = true) {
      i = Math.max(0, Math.min(wheelValues.length - 1, i));
      wheel.querySelectorAll('[role=option]').forEach((o, j) => o.setAttribute('aria-selected', String(i === j)));
      wheel.setAttribute('aria-activedescendant', 'option-' + i); input.value = wheelValues[i];
      if (scroll) wheel.scrollTop = i * 42;
    }
    wheel.onscroll = null; select(index); input.value = current; let userScrolling = false;
    wheel.onpointerdown = wheel.onwheel = () => { userScrolling = true; };
    wheel.onclick = event => { const option = event.target.closest('[data-wheel-index]'); if (option) select(Number(option.dataset.wheelIndex)); };
    wheel.onkeydown = event => { userScrolling = true; if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return; event.preventDefault(); let i = Math.round(wheel.scrollTop / 42); if (event.key === 'ArrowUp') i--; if (event.key === 'ArrowDown') i++; if (event.key === 'Home') i = 0; if (event.key === 'End') i = wheelValues.length - 1; select(i); };
    wheel.onscroll = () => { if (!userScrolling) return; clearTimeout(wheelTimer); wheelTimer = setTimeout(() => select(Math.round(wheel.scrollTop / 42), false), 100); };
    input.oninput = () => { userScrolling = false; clearTimeout(wheelTimer); };
    dialog.onclose = () => { clearTimeout(wheelTimer); if (dialog.returnValue !== 'confirm') return; const value = input.value === '' ? null : Number(input.value); if (value !== null && (!positive(value) || value > max || isReps && !Number.isInteger(value))) { tell(isReps ? 'Ingresa de 1 a 100 repeticiones.' : 'Ingresa un peso mayor que cero y hasta 2000 kg.'); return; } const scroll = window.scrollY; pickerCallback(value); window.scrollTo(0, scroll); app.querySelector(`[data-pick="${button.dataset.pick}"]`)?.focus({ preventScroll: true }); };
  });
}
function route() {
  const [view = 'home', a, b] = location.hash.replace(/^#\//, '').split('/');
  app.dataset.view = view;
  document.querySelectorAll('nav a').forEach(link => { if (link.hash === '#/' + (view === 'workout' ? 'home' : view)) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  if (view === 'setup') setup(); else if (view === 'history') history(); else if (view === 'guide') guide(); else if (view === 'workout' && session(a, b)) { week = Number(a); workoutView(session(a, b)); } else renderHome();
  if (storageFailed) app.insertAdjacentHTML('afterbegin', '<div class="notice warning">No se pudieron leer los datos guardados. No se reemplazarán. Descarga tus datos anteriores desde Mis marcas antes de restaurar o reiniciar.</div>');
  window.scrollTo(0, 0);
}
initTheme(); initAmbience();
window.addEventListener('hashchange', route); route();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => tell('El modo sin conexión no está disponible en este navegador.'));
