import { CyberpunkAudio } from './audio-engine.js';
import { getTheme, THEMES } from './theme.js';
const VOLUME_KEY = 'repbase-volume';
const MUTE_KEY = 'repbase-muted';
export function initAmbience() {
  const button = document.querySelector('#music-toggle');
  const mute = document.querySelector('#music-mute');
  const volume = document.querySelector('#music-volume');
  const status = document.querySelector('#music-status');
  const volumeValue = document.querySelector('#volume-value');
  let muted = false;
  let remembered = 18;
  try { const saved = localStorage.getItem(VOLUME_KEY); if (saved !== null && Number.isFinite(Number(saved))) remembered = Math.max(0, Math.min(40, Number(saved))); muted = localStorage.getItem(MUTE_KEY) === 'true'; } catch { /* No audio depends on persistent storage. */ }
  volume.value = remembered;
  let player = new CyberpunkAudio({ voice: getTheme() });
  let generation = 0;
  const setLevel = () => player.setVolume(muted ? 0 : Number(volume.value) / 100);
  const remember = () => { try { localStorage.setItem(VOLUME_KEY, volume.value); localStorage.setItem(MUTE_KEY, String(muted)); } catch { /* Optional preferences only. */ } };
  function update() {
    const theme = THEMES.find(t => t.id === player.voice);
    button.textContent = player.playing ? '■ Detener música' : '▶ Reproducir música';
    button.setAttribute('aria-pressed', String(player.playing));
    mute.textContent = muted ? 'Activar sonido' : 'Silenciar'; mute.setAttribute('aria-pressed', String(muted));
    volumeValue.textContent = volume.value + '%';
    status.textContent = `${theme.track} · ${theme.style}${player.playing ? muted || Number(volume.value) === 0 ? ' · silenciado' : ' · reproduciendo' : ' · detenido'}`;
    document.querySelector('#ambience').classList.toggle('is-playing', player.playing && !muted && Number(volume.value) > 0);
  }
  function stop() { generation++; const voice = player.voice; player.dispose(); player = new CyberpunkAudio({ voice }); setLevel(); update(); }
  button.addEventListener('click', async () => {
    if (player.playing) { stop(); return; }
    button.disabled = true; const attempt = ++generation; const starting = player;
    try { setLevel(); await starting.start(); if (document.hidden || attempt !== generation) starting.dispose(); }
    catch { stop(); status.textContent = 'Audio no disponible en este navegador. La sesión sigue funcionando.'; }
    finally { button.disabled = false; if (attempt === generation) update(); }
  });
  volume.addEventListener('input', () => { setLevel(); remember(); update(); });
  mute.addEventListener('click', () => { muted = !muted; setLevel(); remember(); update(); });
  document.addEventListener('repbase-theme-change', e => { stop(); player.dispose(); player = new CyberpunkAudio({ voice: e.detail.theme }); setLevel(); update(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', stop);
  setLevel(); update(); // Playback is deliberately never restored on load.
}
