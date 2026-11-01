import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const artifacts = path.resolve(process.env.ARTIFACTS || path.join(root, '..', 'repbase-preview'));
const profile = await mkdtemp(path.join(os.tmpdir(), 'repbase-browser-'));
const server = spawn('/usr/bin/python3', ['-m', 'http.server', '8787', '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore' });
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=9237', '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });
let ws; const errors = []; const wait = ms => new Promise(r => setTimeout(r, ms));
try {
  let targets;
  for (let i = 0; i < 100; i++) { try { targets = await (await fetch('http://127.0.0.1:9237/json')).json(); break; } catch { await wait(100); } }
  assert.ok(targets, 'Chrome debugging startup');
  ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.addEventListener('open', r, { once: true }); ws.addEventListener('error', j, { once: true }); });
  let nextId = 0; const pending = new Map();
  ws.addEventListener('message', event => { const m = JSON.parse(event.data); if (m.id) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result); } if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text); });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, userGesture: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails)); return r.result.value; };
  const until = async expression => { for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await wait(50); } throw new Error('Timeout: ' + expression); };
  const tap = async selector => { const point = await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`); await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] }); await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await wait(50); };
  const go = async hash => { await evaluate(`location.hash=${JSON.stringify(hash)}`); await wait(80); };
  const screenshot = async name => writeFile(path.join(artifacts, name), Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
  await mkdir(artifacts, { recursive: true });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send('Page.navigate', { url: 'http://127.0.0.1:8787/#/home' }); await until('document.querySelectorAll(".session-link").length===4');
  assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'));
  assert.ok(await evaluate('document.body.innerText.includes("pesos están vacíos")'));
  await screenshot('repbase-programa-mobile.png');
  await go('#/setup'); await until('document.querySelector("#setup")');
  assert.ok(await evaluate('Object.values(JSON.parse(localStorage.getItem("jacked-and-tan-v1")||"null")||{}).length===0'));
  await tap('[data-pick="max-E4"]'); await until('document.querySelector("#picker").open');
  await evaluate('document.querySelector("#picker-number").value=100');
  await tap('#picker button[value="cancel"]');
  assert.equal(await evaluate('document.querySelector("[name=E4-tm]").value'), '');
  await tap('[data-pick="max-E4"]');
  await evaluate('document.querySelector("#wheel").focus()');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown' });
  assert.ok(await evaluate('document.querySelector("#wheel [aria-selected=true]") !== null'));
  await evaluate('document.querySelector("#picker-number").value=100'); await tap('#picker-confirm');
  assert.equal(await evaluate('document.querySelector("[name=E4-tm]").value'), '100');
  await evaluate('document.querySelector("#setup").requestSubmit()');
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("jacked-and-tan-v1")).profile.maxes.E4.tm'), 100);
  assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'));
  await go('#/workout/1/1'); await until('document.querySelectorAll("article").length===8');
  assert.ok(await evaluate('document.body.innerText.includes("70 kg")'));
  await tap('[data-pick="D57-weight"]'); await evaluate('document.querySelector("#picker-number").value=90'); await tap('#picker-confirm');
  await tap('[data-pick="rep-D57-reps-0"]');
  assert.equal(await evaluate('document.querySelector("#picker-number").max'), '100');
  await evaluate('document.querySelector("#picker-number").value=10'); await tap('#picker-confirm');
  assert.equal(await evaluate('document.querySelector("[data-record=D57][data-field=reps]").value'), '10');
  await evaluate('window.scrollTo(0,0);document.querySelector("#status").classList.remove("visible")');
  await screenshot('repbase-sesion-mobile.png');
  await tap('[data-pick="D57-weight"]'); await screenshot('repbase-selector-mobile.png'); await tap('#picker button[value="cancel"]');
  // Same-day RM changes live backoffs; cancellation never commits.
  await go('#/workout/7/1');
  assert.ok(await evaluate('document.querySelector("[data-backoff-label=AH57]").textContent.includes("Sin definir")'));
  await tap('[data-pick="AH57-weight"]'); await evaluate('document.querySelector("#picker-number").value=100'); await tap('#picker-confirm');
  assert.equal(await evaluate('document.querySelector("[data-backoff-label=AH57]").textContent'), '85 kg');
  await tap('[data-pick="AH57-weight"]'); await evaluate('document.querySelector("#picker-number").value=120'); await tap('#picker button[value="cancel"]');
  assert.equal(await evaluate('document.querySelector("[data-backoff-label=AH57]").textContent'), '85 kg');
  // Exercise all 48 views and their responsive details.
  for (let week = 1; week <= 12; week++) for (let day = 1; day <= 4; day++) { await go(`#/workout/${week}/${day}`); assert.ok(await evaluate('document.querySelectorAll("article").length>0')); await evaluate('document.querySelectorAll("details").forEach(d=>d.open=true)'); assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `${week}/${day} overflow`); }
  // Finish a minimal source test session through actual UI, then change TM.
  await go('#/workout/12/1');
  await tap('[data-pick="BG57-weight"]'); await evaluate('document.querySelector("#picker-number").value=110'); await tap('#picker-confirm');
  await evaluate('document.querySelector("[data-record=BG57][data-field=reps]").value="1";document.querySelector("[data-record=BG57][data-field=reps]").dispatchEvent(new Event("change"))');
  await send('Page.handleJavaScriptDialog', { accept: true }).catch(() => {});
  await evaluate('window.confirm=()=>true; document.querySelector("#finish").click()');
  await until('document.querySelector("#reopen")');
  const historyBefore = await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("jacked-and-tan-v1")).history)');
  await go('#/setup'); await tap('[data-pick="max-E4"]'); await evaluate('document.querySelector("#picker-number").value=150'); await tap('#picker-confirm'); await evaluate('document.querySelector("#setup").requestSubmit()');
  assert.equal(await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("jacked-and-tan-v1")).history)'), historyBefore);
  await go('#/workout/1/1'); assert.ok(await evaluate('document.body.innerText.includes("105 kg")'));
  await go('#/history'); assert.ok(await evaluate('document.body.innerText.includes("Semana 12")'));
  // Verify corruption protection in a disposable session only.
  const valid = await evaluate('localStorage.getItem("jacked-and-tan-v1")');
  await evaluate('localStorage.setItem("jacked-and-tan-v1","broken")'); await send('Page.reload'); await until('document.body.innerText.includes("No se pudieron leer")');
  assert.equal(await evaluate('localStorage.getItem("jacked-and-tan-v1")'), 'broken');
  await evaluate(`localStorage.setItem('jacked-and-tan-v1',${JSON.stringify(valid)})`); await send('Page.reload'); await wait(150);
  await evaluate('navigator.serviceWorker.ready'); await until('navigator.serviceWorker.controller !== null');
  await send('Network.enable'); await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
  await go('#/home'); await send('Page.reload'); await until('document.querySelectorAll(".session-link").length===4');
  await send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }); await go('#/home'); await screenshot('repbase-programa-desktop.png');
  // All five palettes retain readable text and controls at mobile width.
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(`window.__audioContexts=[];window.__OriginalAudioContext=window.AudioContext;window.AudioContext=class extends window.__OriginalAudioContext{constructor(...args){super(...args);window.__audioContexts.push(this);}}`);
  assert.equal(await evaluate('window.__audioContexts.length'), 0, 'no autoplay or context before play');
  const themeIds = ['cyberpunk','kawaii','matrix','brasil','croissant'];
  for (const theme of themeIds) {
    await evaluate(`document.querySelector('#theme-select').value=${JSON.stringify(theme)};document.querySelector('#theme-select').dispatchEvent(new Event('change'))`);
    assert.equal(await evaluate('document.body.dataset.theme'), theme);
    assert.equal(await evaluate('document.querySelector("#music-toggle").getAttribute("aria-pressed")'), 'false');
    await go('#/workout/1/4');
    assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'), theme + ' mobile workout');
    const contrast = await evaluate(`(()=>{
      const rgb=s=>s.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
      const lum=s=>{const c=rgb(s);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
      const ratio=(a,b)=>{a=lum(a);b=lum(b);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
      const card=getComputedStyle(document.querySelector('article'));
      const muted=getComputedStyle(document.querySelector('article .muted'));
      const input=getComputedStyle(document.querySelector('article input'));
      const button=getComputedStyle(document.querySelector('#music-toggle'));
      return {body:ratio(card.color,card.backgroundColor),muted:ratio(muted.color,card.backgroundColor),input:ratio(input.color,input.backgroundColor),button:ratio(button.color,button.backgroundColor)};
    })()`);
    for (const [label, value] of Object.entries(contrast)) assert.ok(value>=4.5, `${theme}/${label}: ${value}`);
    await tap('[data-pick="D93-weight"]');
    assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'), theme + ' dialog');
    await tap('#picker button[value="cancel"]');
    await tap('#music-toggle'); await until('document.querySelector("#music-toggle").getAttribute("aria-pressed")==="true"');
    assert.equal(await evaluate('window.__audioContexts.at(-1).state'), 'running');
    await evaluate('document.querySelector("#music-volume").value=12;document.querySelector("#music-volume").dispatchEvent(new Event("input"))');
    assert.equal(await evaluate('document.querySelector("#volume-value").textContent'), '12%');
    await tap('#music-mute'); assert.equal(await evaluate('document.querySelector("#music-mute").getAttribute("aria-pressed")'), 'true');
    await tap('#music-mute');
    const contexts = await evaluate('window.__audioContexts.length');
    await go('#/home');
    assert.equal(await evaluate('window.__audioContexts.length'), contexts);
    assert.equal(await evaluate('document.querySelector("#music-toggle").getAttribute("aria-pressed")'), 'true');
    await tap('#music-toggle'); await until('window.__audioContexts.at(-1).state==="closed"');
    await evaluate('window.scrollTo(0,0);document.querySelector("#status").classList.remove("visible")');
    await screenshot(`repbase-${theme}-mobile.png`);
  }
  // Changing the theme while playing stops its old context and never autoplays.
  await tap('#music-toggle');
  await evaluate('document.querySelector("#theme-select").value="matrix";document.querySelector("#theme-select").dispatchEvent(new Event("change"))');
  await until('window.__audioContexts.at(-1).state==="closed"');
  assert.equal(await evaluate('document.querySelector("#music-toggle").getAttribute("aria-pressed")'), 'false');
  await evaluate('document.querySelector("#theme-select").value="croissant";document.querySelector("#theme-select").dispatchEvent(new Event("change"))');
  await send('Page.reload'); await until('document.body.dataset.theme==="croissant"');
  assert.equal(await evaluate('document.querySelector("#music-toggle").getAttribute("aria-pressed")'), 'false');
  assert.equal(await evaluate('document.querySelector("#music-volume").value'), '12');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await tap('#music-toggle');
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".equalizer i")).animationName'), 'none');
  await tap('#music-toggle');
  // Render the original score independently to confirm real non-clipping audio.
  const rendered = await evaluate(`(async()=>{
    const {scheduleCroissant}=await import('./js/croissant-audio.js');
    const {CROISSANT_STEPS,CROISSANT_BPM}=await import('./js/croissant-score.js');
    const sd=60/CROISSANT_BPM/4;const context=new OfflineAudioContext(1,Math.ceil((CROISSANT_STEPS*sd+1)*22050),22050);
    for(let step=0;step<CROISSANT_STEPS;step++)scheduleCroissant(context,context.destination,step*sd,step,sd);
    const buffer=await context.startRendering();const data=buffer.getChannelData(0);let squares=0,peak=0;
    for(const sample of data){squares+=sample*sample;peak=Math.max(peak,Math.abs(sample));}
    return {rms:Math.sqrt(squares/data.length),peak,duration:buffer.duration};
  })()`);
  assert.ok(rendered.rms>.005 && rendered.peak<.99, JSON.stringify(rendered));
  await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
  await send('Page.reload'); await until('document.body.dataset.theme==="croissant"');
  await tap('#music-toggle'); await until('document.querySelector("#music-toggle").getAttribute("aria-pressed")==="true"');
  await tap('#music-toggle');
  await send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: all 48 mobile sessions, keyboard and touch wheels, confirm/cancel, direct input, draft persistence, daily RM loads, completed history preservation, corruption protection, offline reload, five themes, contrast, original rendered waltz, music controls, no autoplay, reduced motion, screenshots.');
} finally {
  ws?.close(); chrome.kill('SIGTERM'); server.kill('SIGTERM'); await wait(500); await rm(profile, { recursive: true, force: true }).catch(() => {});
}
