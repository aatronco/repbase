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
const backup = () => download(storageFailed ? { recovery: true, raw: localStorage.getItem(STORAGE_KEY) } : state, 'andre-jt2-backup-' + new Date().toISOString().slice(0, 10) + '.json');
const kg = v => positive(v) ? v.toLocaleString('es-CL', { maximumFractionDigits: 3 }) + ' kg' : 'Sin definir';
const weightButton = (id, value, label = 'Peso') => `<label>${esc(label)}<button type="button" class="weight-button" data-pick="${esc(id)}" data-value="${value ?? ''}" aria-label="${esc(label)}: ${esc(kg(value))}">${kg(value)} <span>AJUSTAR ↕</span></button></label>`;
const repButtons = (id, field, count, text) => `<div class="rep-buttons">${Array.from({ length: count }, (_, i) => `<button type="button" class="secondary" data-pick="rep-${id}-${field}-${i}" data-value="${Number((text || '').split(',')[i]) || ''}" aria-label="Repeticiones serie ${i + 1}">S${i + 1}: ${esc((text || '').split(',')[i]?.trim() || '—')} ↕</button>`).join('')}</div>`;
const title = (eyebrow, heading, text = '') => `<p class="eyebrow">${eyebrow}</p><h1>${esc(heading)}</h1>${text ? `<p class="intro">${text}</p>` : ''}`;
function latest(w, d) { return state.history.filter(h => h.week === w && h.day === d).at(-1); }
function renderHome() {
  app.innerHTML = title('12 SEMANAS · 4 DÍAS · GZCL', 'Tu siguiente nivel, André.', 'Jacked & Tan 2.0, sesión por sesión. Define tus máximos de entrenamiento y registra el RM del día cuando el programa lo pida.') +
    (!Object.values(state.profile.maxes).some(m => positive(m.tm)) ? '<div class="notice">Empieza en <a href="#/setup">Mis marcas</a>. Los pesos están vacíos hasta que ingreses los tuyos. Puedes explorar todo el programa desde ahora.</div>' : '') +
    `<div class="weekbar"><div><p class="eyebrow">${week <= 6 ? 'BLOQUE 1 · BASE Y CAPACIDAD' : 'BLOQUE 2 · RM DEL DÍA'}</p><h2>${week === 6 || week === 12 ? 'Semana de pruebas' : 'Semana ' + week}</h2></div><label>Ver semana<select id="week">${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${week === i + 1 ? 'selected' : ''}>Semana ${i + 1}</option>`).join('')}</select></label></div><div class="grid">` +
    workouts.filter(w => w.week === week).map(w => `<a class="card session-link" href="#/workout/${week}/${w.day}"><div class="day-number">DÍA 0${w.day} · ${w.day % 2 ? 'TREN INFERIOR' : 'TREN SUPERIOR'}</div><h3>${esc(w.entries[0].exercise)}</h3><p class="muted">${w.entries[0].rm}RM del día · ${w.entries.length} ejercicios</p><span class="pill">${latest(week, w.day) ? 'Completada · ver registro' : Object.keys(state.drafts[week + '-' + w.day] || {}).length ? 'En curso' : 'Abrir sesión →'}</span></a>`).join('') + '</div><p class="muted">La plantilla conserva los cuatro días del Excel. El quinto día queda sin programar. Los descansos y sustituciones se ajustan a tu calendario.</p>';
  document.querySelector('#week').onchange = e => { week = Number(e.target.value); renderHome(); };
}
function setup() {
  const p = state.profile;
  app.innerHTML = title('CONFIGURACIÓN PERSONAL', 'Tus marcas. Tus cargas.', 'El TM de esta plantilla representa una <strong>2RM diaria estimada</strong>. Un PR de una repetición, una 1RM estimada y el TM se registran por separado. Solo el campo TM calcula los porcentajes.') +
    `<form id="setup"><div class="card"><div class="fields"><label>Nombre<input name="name" maxlength="80" value="${esc(p.name)}" required></label><label>Inicio del ciclo (opcional)<input name="startDate" type="date" value="${esc(p.startDate)}"></label></div><label>Salto de carga (kg)<select name="increment">${[0.5, 1, 1.25, 2.5, 5].map(n => `<option ${p.increment === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label><p class="muted">Redondeo al múltiplo más cercano. El Excel usa 2,5 kg. Los campos vacíos quedan sin calcular.</p></div>` +
    [1, 2].map(block => `<h2>Bloque ${block} · semanas ${block === 1 ? '1–6' : '7–12'}</h2>${block === 2 ? '<p class="muted">El Excel tiene TM independientes para este bloque. Después de la semana 6, revisa e ingresa los TM que usarás. Un test no cambia estos valores automáticamente.</p>' : ''}<div class="grid">` + source.maxes.filter(m => m.block === block).map(m => {
      const v = p.maxes[m.cell];
      return `<section class="card"><h3>${esc(m.label)}</h3>${weightButton('max-' + m.cell, v.tm, 'TM · 2RM diaria estimada (kg)')}<input type="hidden" name="${m.cell}-tm" value="${v.tm ?? ''}"><div class="fields"><label>PR · 1RM real (opcional)<input name="${m.cell}-real1RM" type="number" min="0.01" max="2000" step="any" value="${v.real1RM ?? ''}"></label><label>1RM estimada (opcional)<input name="${m.cell}-estimated1RM" type="number" min="0.01" max="2000" step="any" value="${v.estimated1RM ?? ''}"></label></div><label>Fecha de la marca<input name="${m.cell}-date" type="date" value="${esc(v.date)}"></label><label>Fuente o nota (opcional)<input name="${m.cell}-source" maxlength="200" value="${esc(v.source)}" placeholder="Ej.: 80 kg × 2, cómodo"></label><small>Referencia del Excel: ${m.cell}</small></section>`;
    }).join('') + '</div>').join('') +
    '<div class="actions"><button type="submit">Guardar marcas</button><button type="button" id="demo" class="secondary">Cargar ejemplo ficticio</button><button type="button" id="clear-maxes" class="secondary">Vaciar marcas</button></div><p class="muted">Guardar recalcula las sesiones pendientes. Las sesiones completadas conservan su propia copia de las marcas y cargas.</p></form>' +
    '<details class="card"><summary>Estimar una 1RM desde una serie reciente</summary><p class="muted">Epley: peso × (1 + reps / 30), para 2–10 reps. Es una estimación informativa; no se copia al TM.</p><form id="estimate" class="fields"><label>Peso (kg)<input name="weight" type="number" min="0.01" max="2000" step="any" required></label><label>Repeticiones<input name="reps" type="number" min="1" max="10" required></label><button>Calcular</button><output id="estimate-result" aria-live="polite"></output></form></details>' + backupPanel();
  const form = document.querySelector('#setup');
  bindPickers((id, value) => { const key = id.slice(4); form.elements[key + '-tm'].value = value ?? ''; const b = form.querySelector(`[data-pick="${id}"]`); b.dataset.value = value ?? ''; b.innerHTML = `${kg(value)} <span>AJUSTAR ↕</span>`; });
  form.onsubmit = e => {
    e.preventDefault(); const data = new FormData(form); const next = structuredClone(state);
    next.profile.name = data.get('name').trim() || 'André'; next.profile.startDate = data.get('startDate'); next.profile.increment = Number(data.get('increment'));
    for (const m of source.maxes) for (const key of ['tm', 'real1RM', 'estimated1RM', 'date', 'source']) { const v = data.get(m.cell + '-' + key); next.profile.maxes[m.cell][key] = ['date', 'source'].includes(key) ? v : v === '' ? null : Number(v); }
    try { validateState(next); state = next; if (persist()) tell('Marcas guardadas. Tus registros anteriores se conservaron.'); } catch (error) { tell(error.message); }
  };
  document.querySelector('#demo').onclick = () => {
    if (!confirm('Cargar valores FICTICIOS en el formulario. No son marcas de André. Se guardan solo con Guardar marcas.')) return;
    source.maxes.forEach((m, i) => { const value = [90, 60, 110, 35, 45, 70][i % 6]; form.elements[m.cell + '-tm'].value = value; form.elements[m.cell + '-source'].value = 'EJEMPLO FICTICIO · reemplazar antes de entrenar'; const b = form.querySelector(`[data-pick="max-${m.cell}"]`); b.dataset.value = value; b.innerHTML = `${kg(value)} <span>DEMO ↕</span>`; });
    tell('Ejemplo ficticio cargado en el formulario. Reemplaza las marcas antes de entrenar.');
  };
  document.querySelector('#clear-maxes').onclick = () => { if (!confirm('¿Vaciar los campos del formulario? Después pulsa Guardar marcas. El historial se conserva.')) return; for (const m of source.maxes) { for (const k of ['tm', 'real1RM', 'estimated1RM', 'date', 'source']) form.elements[m.cell + '-' + k].value = ''; const b = form.querySelector(`[data-pick="max-${m.cell}"]`); b.dataset.value = ''; b.innerHTML = 'Sin definir <span>AJUSTAR ↕</span>'; } };
  document.querySelector('#estimate').onsubmit = e => { e.preventDefault(); const d = new FormData(e.target); document.querySelector('#estimate-result').textContent = '1RM estimada: ' + kg(estimate1RM(Number(d.get('weight')), Number(d.get('reps')))); };
  bindBackup();
}
function backupPanel() {
  return '<section class="card"><h2>Tu copia de seguridad</h2><p class="muted">Los datos se guardan en este navegador, sin cuenta ni servidor. Exporta una copia para cambiar de dispositivo o protegerte al borrar los datos del navegador.</p><div class="actions"><button id="export" class="secondary">Descargar copia JSON</button><button id="reset" class="secondary">Reiniciar datos</button></div><label>Restaurar una copia JSON<input type="file" id="import" accept="application/json,.json"></label><small>Restaurar reemplaza los datos actuales. Se ofrece una copia antes del reemplazo.</small></section>';
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
  if (e.kind === 'mrs') return `Encuentra ${e.rm}RM + ${e.sets}`;
  return `Encuentra ${e.rm}RM${e.sets ? ' + ' + e.sets : ''}`;
}
function workoutView(w, forceDraft = false) {
  const key = w.week + '-' + w.day; const saved = latest(w.week, w.day); const readOnly = !!saved && !forceDraft && !state.drafts[key];
  const records = readOnly ? saved.records : (state.drafts[key] ||= {});
  const profile = readOnly ? saved.profile : state.profile;
  app.innerHTML = `<a class="back" href="#/home">← Programa</a>` + title(`SEMANA ${w.week} · DÍA ${w.day}${readOnly ? ' · REGISTRO GUARDADO' : ''}`, w.entries[0].exercise, readOnly ? 'Esta sesión conserva las marcas y cargas del momento en que la completaste.' : 'Registra tus series. Los cambios se guardan como borrador; completar crea un registro permanente.') +
    (Object.values(profile.maxes).some(m => /FICTICIO/.test(m.source)) ? '<div class="notice warning">DEMO: estás usando marcas ficticias. Reemplázalas en Mis marcas antes de entrenar.</div>' : '') +
    `<div class="notice">${w.week >= 7 && w.week <= 11 ? 'T1: los porcentajes se aplican al RM encontrado hoy. ' : ''}RM y MRS: deja 1–2 repeticiones en reserva. El signo + permite un AMRAP en la última serie si te encuentras bien.</div>` +
    w.entries.map(e => {
      const r = records[e.id] || {}; const sub = profile.substitutions[e.id]; const name = sub?.name || e.exercise; const load = prescribedLoad(e, profile, r.weight, sub); const backoff = prescribedLoad(e.backoff, profile, r.weight, sub);
      return `<article class="card t${String(e.tier)[0]}"><div class="tier">T${esc(e.tier)}</div><h2>${esc(name)}</h2><p class="prescription">${esc(prescriptionText(e, profile, r, sub))}</p>${e.kind === 'tm' ? `<p class="muted">${e.percent * 100}% del TM · ${esc(source.maxes.find(m => m.cell === e.maxCell)?.label)} · bloque ${w.week <= 6 ? 1 : 2}${load === null ? ' · falta definir TM' : ''}</p>` : `<p class="muted">${e.kind === 'mrs' || /MRS/.test(String(e.sets)) ? 'Primera serie: RM indicado. Después, las MRS indicadas con el mismo peso; las repeticiones pueden bajar.' : 'Trabaja hasta el RM indicado según tu rendimiento de hoy.'}</p>`}
        ${e.backoff ? `<div class="notice"><strong>Después del RM: ${e.backoff.sets} × ${e.backoff.reps} · <span data-backoff-label="${e.id}">${kg(backoff)}</span></strong><br>${e.backoff.percent * 100}% ${e.backoff.kind === 'daily' ? 'del RM de hoy' : 'del TM de inicio del bloque'}. ${String(e.backoff.sets).includes('+') ? 'Última serie AMRAP opcional.' : ''}</div>` : ''}
        ${readOnly ? `<p>Peso realizado: <strong>${kg(r.weight)}</strong><br>Repeticiones: ${esc(r.reps)}${e.backoff ? `<br>Series posteriores: ${kg(r.backoffWeight)} · ${esc(r.backoffReps)}` : ''}</p>` : `<div class="fields">${weightButton(e.id + '-weight', r.weight, e.kind === 'tm' ? 'Peso realizado (kg)' : 'RM de hoy · peso (kg)')}<label>Reps por serie · ${mainSetCount(e)} ${mainSetCount(e) === 1 ? 'serie' : 'series'}<input data-record="${e.id}" data-field="reps" value="${esc(r.reps)}" inputmode="text" placeholder="${mainSetCount(e) === 1 ? e.rm : '10, 8, 7, 6'}" aria-label="Repeticiones de ${esc(name)}"></label></div>${repButtons(e.id, 'reps', mainSetCount(e), r.reps)}${e.backoff ? `<div class="fields">${weightButton(e.id + '-backoffWeight', r.backoffWeight, 'Peso realizado · series posteriores')}<label>Reps de ${parseInt(e.backoff.sets)} series posteriores<input data-record="${e.id}" data-field="backoffReps" value="${esc(r.backoffReps)}" placeholder="${Array(parseInt(e.backoff.sets)).fill(e.backoff.reps).join(', ')}" aria-label="Repeticiones posteriores de ${esc(name)}"></label></div>${repButtons(e.id, 'backoffReps', parseInt(e.backoff.sets), r.backoffReps)}` : ''}`}
        <details><summary>Referencia y sustitución</summary><p class="muted">Excel: ${esc(e.source)} · ${esc(e.exercise)}. ${e.formula ? `<code>${esc(e.formula)}</code>` : ''}${e.backoff?.formula ? `<code>${esc(e.backoff.formula)}</code>` : ''}</p>${readOnly ? '' : `<label>Sustituir este ejercicio en esta sesión de la plantilla<input data-sub="${e.id}" maxlength="100" value="${esc(sub?.name)}" placeholder="Dejar vacío para usar el original"></label>${e.kind === 'tm' || e.backoff?.kind === 'tm' ? `<label>TM propio de la sustitución (kg)<input data-sub-tm="${e.id}" type="number" min="0.01" max="2000" step="any" value="${sub?.tm ?? ''}"></label><p class="muted">Una sustitución necesita su propio TM. No se reutiliza automáticamente el máximo del ejercicio original.</p>` : ''}`}</details></article>`;
    }).join('') + (w.notes.length ? `<details class="card"><summary>Notas de esta semana en el Excel</summary><ul>${w.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></details>` : '') +
    `<div id="session-errors" role="alert"></div><div class="actions">${readOnly ? '<button id="reopen" class="secondary">Registrar nueva revisión</button>' : '<button id="finish">Completar sesión</button><button id="save-draft" class="secondary">Guardar borrador</button>'}<button id="session-export" class="secondary">Descargar copia</button></div>`;
  document.querySelector('#session-export').onclick = backup;
  if (readOnly) { document.querySelector('#reopen').onclick = () => { if (!confirm('Crear un nuevo borrador con estos registros. La sesión anterior quedará en el historial.')) return; state.drafts[key] = structuredClone(saved.records); persist(); workoutView(w, true); }; return; }
  bindPickers((id, value) => {
    if (id.startsWith('rep-')) { const [, entryId, field, index] = id.match(/^rep-(.+)-(reps|backoffReps)-(\d+)$/); const r = records[entryId] ||= {}; const values = (r[field] || '').split(','); values[Number(index)] = value ?? ''; r[field] = values.join(','); persist(); workoutView(w, true); return; }
    const match = id.match(/^(.+)-(weight|backoffWeight)$/); const [, entryId, field] = match;
    (records[entryId] ||= {})[field] = value; persist(); workoutView(w, true);
  });
  app.querySelectorAll('[data-record]').forEach(el => el.onchange = () => { (records[el.dataset.record] ||= {})[el.dataset.field] = el.value; persist(); });
  app.querySelectorAll('[data-sub]').forEach(el => el.onchange = () => { const id = el.dataset.sub; const existing = profile.substitutions[id]; if (!confirm('Cambiar solo esta entrada de la plantilla. Los registros completados se conservan.')) { el.value = existing?.name || ''; return; } profile.substitutions[id] = { name: el.value.trim(), tm: null }; persist(); workoutView(w, true); });
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
  app.innerHTML = title('REGISTROS DEL CICLO', 'Lo que ya construiste.', 'Cada sesión conserva sus marcas, ejercicios y cargas. Cambiar un TM no reescribe lo que hiciste.') +
    `<section class="card">${state.history.length ? [...state.history].reverse().map(h => `<div class="history-entry"><h3>Semana ${h.week} · Día ${h.day}</h3><p class="muted">${esc(new Date(h.completedAt).toLocaleString('es-CL'))} · ${Object.keys(h.records).length} ejercicios registrados</p><button class="secondary" data-history="${esc(h.id)}">Ver esta revisión</button></div>`).join('') : '<p class="muted">Aún no hay sesiones completadas. Los borradores se muestran en Programa.</p>'}</section>` + backupPanel();
  app.querySelectorAll('[data-history]').forEach(b => b.onclick = () => {
    const h = state.history.find(h => h.id === b.dataset.history);
    app.innerHTML = '<a href="#/history" class="back" id="back-history">← Historial</a>' + title(`SEMANA ${h.week} · DÍA ${h.day}`, 'Registro de la sesión', esc(h.completedAt)) + h.prescription.entries.map(e => { const r = h.records[e.id] || {}; return `<section class="card"><p class="tier">T${esc(e.tier)}</p><h2>${esc(h.profile.substitutions?.[e.id]?.name || e.exercise)}</h2><p>${kg(r.weight)} · reps: ${esc(r.reps)}</p>${e.backoff ? `<p>Series posteriores: ${kg(r.backoffWeight)} · reps: ${esc(r.backoffReps)}</p>` : ''}</section>`; }).join('');
    document.querySelector('#back-history').onclick = e => { e.preventDefault(); history(); }; window.scrollTo(0, 0);
  }); bindBackup();
}
function guide() {
  app.innerHTML = title('GUÍA DEL PROGRAMA', 'Entrena con intención.', 'La estructura y las excepciones provienen de la hoja J&T2.0 KGS del Excel que compartió Alejandro.') +
    '<section class="card"><dl><dt>TM · máximo de entrenamiento</dt><dd>La hoja lo define como una 2RM diaria estimada. Los porcentajes del bloque 1 y de T2a usan el TM correspondiente. No uses automáticamente tu 1RM como TM.</dd><dt>RM del día</dt><dd>Encuentra el peso para las repeticiones indicadas. Regístralo en la sesión. En semanas 7–11, el trabajo posterior de T1 usa 85% o 90% de ese mismo peso.</dd><dt>MRS · series de máximas repeticiones</dt><dd>Encuentra el RM indicado y después realiza las MRS adicionales con ese peso. Deja 1–2 repeticiones en reserva. No se calcula su carga desde un PR.</dd><dt>+</dt><dd>La última serie permite un AMRAP si te encuentras bien. Es opcional. Mantén 1–2 repeticiones en reserva.</dd><dt>Descansos</dt><dd>T1: 3–5 minutos. T2: 2–3 minutos. Para los accesorios, la hoja imprime “T1: 60–90 segundos” en su última línea; el autor describe ese intervalo para T3.</dd><dt>Pruebas y segundo bloque</dt><dd>La semana 6 prueba los RM de T1 y descarga T2; T3 continúa según la hoja. La semana 12 vuelve a probar. Revisa manualmente los TM del segundo bloque después de las pruebas.</dd></dl></section>' +
    '<section class="card"><h2>Fidelidad al Excel</h2><p>Se conservan las 12 semanas, los cuatro días programados, la sentadilla frontal del primer bloque, el peso muerto del segundo, Sling Shot Bench adicional del día 4 y sus MRS, el T2a de piernas arriba con 4×10 en semanas 1–5 y los descansos por tier.</p><p>La app añade registro local, TM editables, redondeo configurable, sustituciones por sesión y copia JSON. El Excel usa múltiplos de 2,5 kg. La app no aplica subidas automáticas entre ciclos.</p><p>El nombre original de cada ejercicio permanece disponible en su referencia. Las sustituciones necesitan un TM propio cuando hay porcentajes.</p></section>' +
    `<section class="card"><h2>Fuente y autoría</h2><p>Jacked & Tan 2.0 por Cody Lefever (GZCL).</p><p><a href="${esc(source.url)}" target="_blank" rel="noopener">Excel compartido · J&T2.0 KGS</a></p><p><a href="https://swoleateveryheight.blogspot.com/2016/07/jacked-tan-20.html" target="_blank" rel="noopener">Artículo original del autor</a></p><p class="muted">Exportación verificada: ${source.exportedAt}. La app usa la hoja compartida cuando difiere de la explicación del artículo. Interfaz adaptada de Brute, sin sus datos personales.</p></section>`;
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
    const input = document.querySelector('#picker-number'); input.value = current; input.step = isReps ? '1' : 'any'; input.max = max;
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
    input.oninput = () => { clearTimeout(wheelTimer); };
    dialog.onclose = () => { clearTimeout(wheelTimer); if (dialog.returnValue !== 'confirm') return; const value = input.value === '' ? null : Number(input.value); if (value !== null && (!positive(value) || value > max || isReps && !Number.isInteger(value))) { tell(isReps ? 'Ingresa de 1 a 100 repeticiones.' : 'Ingresa un peso mayor que cero y hasta 2000 kg.'); return; } const scroll = window.scrollY; pickerCallback(value); window.scrollTo(0, scroll); };
  });
}
function route() {
  const [view = 'home', a, b] = location.hash.replace(/^#\//, '').split('/');
  document.querySelectorAll('nav a').forEach(link => { if (link.hash === '#/' + (view === 'workout' ? 'home' : view)) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  if (view === 'setup') setup(); else if (view === 'history') history(); else if (view === 'guide') guide(); else if (view === 'workout' && session(a, b)) { week = Number(a); workoutView(session(a, b)); } else renderHome();
  if (storageFailed) app.insertAdjacentHTML('afterbegin', '<div class="notice warning">No se pudieron leer los datos guardados. No se reemplazarán. Descarga tus datos anteriores desde Mis marcas antes de restaurar o reiniciar.</div>');
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route); route();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => tell('El modo sin conexión no está disponible en este navegador.'));
