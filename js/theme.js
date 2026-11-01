export const THEMES = [
  { id: 'cyberpunk', label: '🌆 Cyberpunk', track: 'Neon circuit', style: 'Synth ambiental' },
  { id: 'kawaii', label: '🎀 Kawaii', track: 'Sugar pixels', style: 'Pop de campanas' },
  { id: 'matrix', label: '🟢 Matrix', track: 'Terminal pulse', style: 'Techno industrial' },
  { id: 'brasil', label: '🇧🇷 Brasil', track: 'Sol de treino', style: 'Samba instrumental' },
  { id: 'croissant', label: '🥐 Croissant', track: 'Miettes de dimanche', style: 'Vals musette · 3/4' },
];
export const THEME_KEY = 'repbase-theme';
export function getTheme(storage = localStorage) {
  try { const saved = storage.getItem(THEME_KEY); return THEMES.some(t => t.id === saved) ? saved : 'cyberpunk'; } catch { return 'cyberpunk'; }
}
export function initTheme() {
  const select = document.querySelector('#theme-select');
  select.innerHTML = THEMES.map(t => `<option value="${t.id}">${t.label}</option>`).join('');
  const apply = id => { document.body.dataset.theme = id; select.value = id; document.dispatchEvent(new CustomEvent('repbase-theme-change', { detail: { theme: id } })); };
  apply(getTheme());
  select.addEventListener('change', () => { try { localStorage.setItem(THEME_KEY, select.value); } catch { /* Theme remains usable if storage is unavailable. */ } apply(select.value); });
}
