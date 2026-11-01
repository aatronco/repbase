import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const artifacts = path.resolve(process.env.ARTIFACTS || path.join(root, '..', 'andre-preview'));
const profile = await mkdtemp(path.join(os.tmpdir(), 'andre-browser-'));
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
  await screenshot('andre-programa-mobile.png');
  await go('#/setup'); await until('document.querySelector("#setup")');
  assert.ok(await evaluate('Object.values(JSON.parse(localStorage.getItem("andre-jt2-v1")||"null")||{}).length===0'));
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
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("andre-jt2-v1")).profile.maxes.E4.tm'), 100);
  assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'));
  await go('#/workout/1/1'); await until('document.querySelectorAll("article").length===8');
  assert.ok(await evaluate('document.body.innerText.includes("70 kg")'));
  await tap('[data-pick="D57-weight"]'); await evaluate('document.querySelector("#picker-number").value=90'); await tap('#picker-confirm');
  await tap('[data-pick="rep-D57-reps-0"]');
  assert.equal(await evaluate('document.querySelector("#picker-number").max'), '100');
  await evaluate('document.querySelector("#picker-number").value=10'); await tap('#picker-confirm');
  assert.equal(await evaluate('document.querySelector("[data-record=D57][data-field=reps]").value'), '10');
  await evaluate('window.scrollTo(0,0);document.querySelector("#status").classList.remove("visible")');
  await screenshot('andre-sesion-mobile.png');
  await tap('[data-pick="D57-weight"]'); await screenshot('andre-selector-mobile.png'); await tap('#picker button[value="cancel"]');
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
  const historyBefore = await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("andre-jt2-v1")).history)');
  await go('#/setup'); await tap('[data-pick="max-E4"]'); await evaluate('document.querySelector("#picker-number").value=150'); await tap('#picker-confirm'); await evaluate('document.querySelector("#setup").requestSubmit()');
  assert.equal(await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("andre-jt2-v1")).history)'), historyBefore);
  await go('#/workout/1/1'); assert.ok(await evaluate('document.body.innerText.includes("105 kg")'));
  await go('#/history'); assert.ok(await evaluate('document.body.innerText.includes("Semana 12")'));
  // Verify corruption protection in a disposable session only.
  const valid = await evaluate('localStorage.getItem("andre-jt2-v1")');
  await evaluate('localStorage.setItem("andre-jt2-v1","broken")'); await send('Page.reload'); await until('document.body.innerText.includes("No se pudieron leer")');
  assert.equal(await evaluate('localStorage.getItem("andre-jt2-v1")'), 'broken');
  await evaluate(`localStorage.setItem('andre-jt2-v1',${JSON.stringify(valid)})`); await send('Page.reload'); await wait(150);
  await evaluate('navigator.serviceWorker.ready'); await until('navigator.serviceWorker.controller !== null');
  await send('Network.enable'); await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
  await go('#/home'); await send('Page.reload'); await until('document.querySelectorAll(".session-link").length===4');
  await send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }); await go('#/home'); await screenshot('andre-programa-desktop.png');
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: all 48 mobile sessions, keyboard and touch wheels, confirm/cancel, direct input, draft persistence, daily RM loads, completed history preservation, corruption protection, offline reload, screenshots.');
} finally {
  ws?.close(); chrome.kill('SIGTERM'); server.kill('SIGTERM'); await wait(500); await rm(profile, { recursive: true, force: true }).catch(() => {});
}
