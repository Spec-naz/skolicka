// ŠKOLIČKA – řízení obrazovek a sezení.
import { DOMAINS, DOMAIN_BY_ID, SKILL_BY_ID, SCREEN_SKILLS } from './data/curriculum.js';
import { loadState, saveState, exportState, importStateFromFile, resetState } from './engine/storage.js';
import { recordAttempt, ensureSkill, skillOverview, dailyStats, applyCalibration, levelStats } from './engine/progress.js';
import { planSession, skillsForFreeChoice, recommend, suggestWorksheets } from './engine/recommender.js';
import { generateTask } from './tasks/generators.js';
import { makeRng } from './engine/rng.js';
import { runTask } from './ui/render.js';
import { configureAudio, speak, stopSpeech, sfx, hasCzechVoice } from './ui/audio.js';

const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const app = $('#app');
let state = loadState();
configureAudio(state.settings);
const AVATARS = ['🦊', '🐻', '🐸', '🦁', '🐼', '🦄', '🐯', '🐙', '🦖', '🚀'];
const STICKERS = ['🦊', '🐻', '🐸', '🦁', '🐼', '🦄', '🐯', '🐙', '🦖', '🐬', '🦋', '🐢', '🦉', '🐨', '🦒', '🐘', '🦜', '🐝', '🦔', '🐳', '🦩', '🐞', '🦚', '🐿️', '🦭', '🐧', '🦫', '🐲', '🦥', '🦦'];
const DAY = 86400000;
function save() { saveState(state); }
function ageText() { if (!state.child?.birthdate) return ''; const d = (Date.now() - new Date(state.child.birthdate).getTime()) / (365.25 * DAY); const y = Math.floor(d), m = Math.floor((d - y) * 12); return `${y} r. ${m} m.`; }

// ─────────────── ONBOARDING ───────────────
function screenOnboarding() {
  stopSpeech();
  app.innerHTML = `
  <section class="card onboarding">
    <h1>🏫 Školička</h1>
    <p class="lead">Hravé úkoly pro předškoláka – čísla, písmena, logika, paměť, tvary a svět kolem nás. Vše zůstává jen v tomto prohlížeči.</p>
    <form id="onb">
      <label>Jak se dítě jmenuje? <input name="name" required maxlength="20" placeholder="např. Matěj"></label>
      <label>Datum narození <input name="birthdate" type="date" required></label>
      <div class="avatars">${AVATARS.map((a, i) => `<label class="av"><input type="radio" name="avatar" value="${a}" ${i === 0 ? 'checked' : ''}><span>${a}</span></label>`).join('')}</div>
      <h3>Rychlé nastavení startu (zpřesní se samo během hraní)</h3>
      <label>Spolehlivě počítá do
        <select name="count"><option value="5">5</option><option value="10">10</option><option value="20" selected>20</option><option value="50">50</option><option value="100">100</option></select></label>
      <label>Písmena
        <select name="letters"><option value="nekolik">zná jen několik</option><option value="velka">zná většinu velkých tiskacích</option><option value="vsechna" selected>zná velká i některá malá</option></select></label>
      <label>Sčítání
        <select name="add"><option value="ne">zatím ne</option><option value="do5" selected>jednoduché příklady do 5 (2+2)</option><option value="do10">sčítá do 10</option></select></label>
      <button class="btn primary" type="submit">Začít</button>
    </form>
  </section>`;
  $('#onb').onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    state.child = { name: f.get('name').trim(), birthdate: f.get('birthdate'), avatar: f.get('avatar') };
    applyCalibration(state, { count: Number(f.get('count')), letters: f.get('letters'), add: f.get('add') });
    save(); screenHome();
  };
}

// ─────────────── DOMŮ ───────────────
function screenHome() {
  stopSpeech();
  const c = state.child;
  const today = state.sessions.filter(s => Date.now() - s.start < DAY).length;
  app.innerHTML = `
  <header class="top">
    <div class="who"><span class="avatar">${c.avatar}</span><span class="name">${esc(c.name)}</span></div>
    <button class="gear" id="parent" title="Pro rodiče">⚙️</button>
  </header>
  <main class="home">
    <button class="big-btn play" id="play"><span class="ic">🎒</span><span>Dnešní dobrodružství</span><small>${state.settings.tasksPerSession} úkolů${today ? ` · dnes už ${today}×` : ''}</small></button>
    <div class="home-row">
      <button class="big-btn choose" id="choose"><span class="ic">🎯</span><span>Vyberu si sám</span></button>
      <button class="big-btn stickers" id="stickers"><span class="ic">⭐</span><span>Moje samolepky</span><small>${state.stickers.length}</small></button>
    </div>
  </main>
  ${!hasCzechVoice() ? '<p class="warn">⚠️ V prohlížeči není český hlas – zadání se nebudou číst nahlas. V macOS: Nastavení → Přístupnost → Předčítaný obsah → Hlasy → čeština (Zuzana).</p>' : ''}`;
  $('#play').onclick = () => { sfx.click(); startSession(planSession(state, state.settings.tasksPerSession), 'plan'); };
  $('#choose').onclick = () => { sfx.click(); screenChoose(); };
  $('#stickers').onclick = () => { sfx.click(); screenStickers(); };
  $('#parent').onclick = () => parentGate(screenParent);
  if (state.settings.autoSpeak) speak(`Ahoj ${c.name}! Co budeme dělat?`);
}

function screenStickers() {
  app.innerHTML = `<header class="top"><button class="back" id="back">◀</button><h2>Moje samolepky</h2><span></span></header>
  <main class="stickers-wall">${state.stickers.length ? state.stickers.map(s => `<span class="sticker">${s}</span>`).join('') : '<p class="lead">Za každé dokončené dobrodružství dostaneš samolepku.</p>'}</main>`;
  $('#back').onclick = screenHome;
}

// ─────────────── VOLNÝ VÝBĚR ───────────────
function screenChoose(domainId = null) {
  stopSpeech();
  if (!domainId) {
    app.innerHTML = `<header class="top"><button class="back" id="back">◀</button><h2>Co chceš dělat?</h2><span></span></header>
    <main class="grid-domains">${DOMAINS.filter(d => !d.printOnly).map(d => `<button class="dom" data-d="${d.id}" style="--c:${d.color}"><span class="ic">${d.emoji}</span><span>${d.name}</span></button>`).join('')}</main>`;
    $('#back').onclick = screenHome;
    app.querySelectorAll('.dom').forEach(b => b.onclick = () => { sfx.click(); speak(DOMAIN_BY_ID[b.dataset.d].name); screenChoose(b.dataset.d); });
    speak('Vyber si, co chceš dělat.');
    return;
  }
  const d = DOMAIN_BY_ID[domainId];
  const list = skillsForFreeChoice(state, domainId);
  app.innerHTML = `<header class="top"><button class="back" id="back">◀</button><h2>${d.emoji} ${d.name}</h2><span></span></header>
  <main class="grid-skills">${list.map(({ def, level, complete }) => `<button class="sk" data-s="${def.id}" style="--c:${d.color}"><span class="ic">${def.emoji}</span><span>${def.child || def.name}</span><span class="lv">${def.levels.map((_, i) => `<i class="${(state.skills[def.id]?.mastered || []).includes(i) ? 'on' : (i === level && !complete ? 'cur' : '')}"></i>`).join('')}</span></button>`).join('')}</main>`;
  $('#back').onclick = () => screenChoose();
  app.querySelectorAll('.sk').forEach(b => b.onclick = () => {
    sfx.click();
    const id = b.dataset.s; const s = ensureSkill(state, id);
    const def = SKILL_BY_ID[id];
    const complete = s.mastered.length >= def.levels.length;
    const level = complete ? def.levels.length - 1 : s.level;
    startSession(Array(5).fill(0).map(() => ({ skill: id, level, kind: complete ? 'review' : 'edge' })), 'free');
  });
}

// ─────────────── SEZENÍ ───────────────
let current = null;
async function startSession(plan, mode) {
  if (!plan.length) { speak('Dneska už není co dělat. Zkus si vybrat sám.'); return screenChoose(); }
  current = { plan, mode, idx: 0, correct: 0, start: Date.now(), events: [], byDomain: {}, aborted: false };
  const session = { start: current.start, end: null, tasks: 0, correct: 0, mode, byDomain: {} };
  state.sessions.push(session); save();
  runNext(session);
}
function sessionHeader() {
  const { plan, idx, correct } = current;
  return `<header class="top session-top"><button class="back" id="quit" title="Ukončit">✕</button>
    <div class="progress">${plan.map((p, i) => `<span class="dot ${i < idx ? (current.results?.[i] ? 'ok' : 'ko') : ''} ${i === idx ? 'cur' : ''}" title="${SKILL_BY_ID[p.skill].name}">${i < idx ? (current.results?.[i] ? '⭐' : '·') : ''}</span>`).join('')}</div>
    <span class="domtag">${DOMAIN_BY_ID[SKILL_BY_ID[plan[Math.min(idx, plan.length - 1)].skill].domain].emoji}</span></header>`;
}
async function runNext(session) {
  if (current.aborted) return;
  if (current.idx >= current.plan.length) return endSession(session);
  const item = current.plan[current.idx];
  const def = SKILL_BY_ID[item.skill];
  const level = Math.min(item.level, def.levels.length - 1);
  let task;
  try { task = generateTask(def, level, makeRng()); } catch (e) { console.error(e); current.idx++; return runNext(session); }
  app.innerHTML = sessionHeader() + `<main class="task" id="task"></main>`;
  $('#quit').onclick = () => { current.aborted = true; stopSpeech(); session.end = Date.now(); save(); screenHome(); };
  const res = await runTask(task, $('#task'), { autoSpeak: state.settings.autoSpeak });
  if (current.aborted) return;
  current.results = current.results || []; current.results.push(res.ok);
  const ev = recordAttempt(state, item.skill, level, res.ok, res.ms, item.kind === 'review');
  session.tasks++; if (res.ok) { session.correct++; current.correct++; }
  session.byDomain[def.domain] = (session.byDomain[def.domain] || 0) + 1;
  if (ev.type !== 'none') current.events.push({ ...ev, skill: item.skill });
  save();
  current.idx++;
  if (ev.type === 'mastered') await levelUpToast(def, ev);
  runNext(session);
}
function levelUpToast(def, ev) {
  return new Promise(r => {
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `<span class="ic">🏅</span><div><b>${esc(def.name)}</b><br>${ev.complete ? 'Všechny úrovně hotové!' : `Nová úroveň: ${esc(def.levels[ev.newLevel].label)}`}</div>`;
    app.appendChild(t); sfx.fanfare(); speak(ev.complete ? `Paráda! ${def.name} máš celé hotové.` : `Nová úroveň! ${def.name}.`);
    setTimeout(() => { t.remove(); r(); }, 2200);
  });
}
function endSession(session) {
  session.end = Date.now();
  const rng = makeRng();
  const pool = STICKERS.filter(s => !state.stickers.includes(s));
  const sticker = pool.length ? rng.pick(pool) : rng.pick(STICKERS);
  state.stickers.push(sticker); save();
  const acc = session.tasks ? Math.round(100 * session.correct / session.tasks) : 0;
  const mins = Math.max(1, Math.round((session.end - session.start) / 60000));
  app.innerHTML = `<main class="end">
    <div class="confetti">🎉</div>
    <h1>Hotovo, ${esc(state.child.name)}!</h1>
    <p class="lead">Dneska jsi udělal ${session.tasks} úkolů.</p>
    <div class="new-sticker"><span>Nová samolepka</span><span class="sticker big">${sticker}</span></div>
    ${current.events.filter(e => e.type === 'mastered').map(e => `<p class="ev">🏅 ${esc(SKILL_BY_ID[e.skill].name)} – nová úroveň</p>`).join('')}
    <div class="row-btns"><button class="btn primary" id="again">Ještě jednou</button><button class="btn" id="home">Domů</button></div>
    <p class="parent-note">Pro rodiče: ${acc} % správně na první pokus · ${mins} min · ${Object.entries(session.byDomain).map(([d, n]) => `${DOMAIN_BY_ID[d].emoji} ${n}`).join(' ')}</p>
  </main>`;
  sfx.fanfare(); speak(`Hotovo! Udělal jsi ${session.tasks} úkolů. Máš novou samolepku.`);
  $('#again').onclick = () => startSession(current.mode === 'free' ? current.plan.map(p => ({ ...p })) : planSession(state, state.settings.tasksPerSession), current.mode);
  $('#home').onclick = screenHome;
}

// ─────────────── RODIČ ───────────────
function parentGate(then) {
  const a = 3 + Math.floor(Math.random() * 6), b = 4 + Math.floor(Math.random() * 6);
  const dlg = document.createElement('div'); dlg.className = 'gate';
  dlg.innerHTML = `<div class="card small"><h3>Pro rodiče</h3><p>Kolik je ${a} × ${b}?</p><form><input type="number" autofocus required><button class="btn primary">OK</button><button type="button" class="btn" id="g-cancel">Zpět</button></form></div>`;
  app.appendChild(dlg);
  const inp = $('input', dlg); inp.focus();
  $('form', dlg).onsubmit = (e) => { e.preventDefault(); if (Number(inp.value) === a * b) { dlg.remove(); then(); } else { inp.value = ''; inp.placeholder = 'Zkuste znovu'; } };
  $('#g-cancel', dlg).onclick = () => dlg.remove();
}
function screenParent(tab = 'prehled') {
  stopSpeech();
  const tabs = [['prehled', 'Přehled'], ['dovednosti', 'Dovednosti'], ['doporuceni', 'Doporučení'], ['listy', 'Pracovní listy'], ['nastaveni', 'Nastavení']];
  app.innerHTML = `<header class="top"><button class="back" id="back">◀</button><h2>Rodičovská sekce</h2><span></span></header>
  <nav class="tabs">${tabs.map(([id, n]) => `<button class="tab ${id === tab ? 'on' : ''}" data-t="${id}">${n}</button>`).join('')}</nav>
  <main class="parent" id="ptab"></main>`;
  $('#back').onclick = screenHome;
  app.querySelectorAll('.tab').forEach(b => b.onclick = () => screenParent(b.dataset.t));
  ({ prehled: tabOverview, dovednosti: tabSkills, doporuceni: tabRecs, listy: tabWorksheets, nastaveni: tabSettings })[tab]($('#ptab'));
}
function tabOverview(el) {
  const ov = skillOverview(state);
  const daily = dailyStats(state, 14);
  const maxN = Math.max(1, ...daily.map(d => d.n));
  const totalAttempts = state.log.length, totalOk = state.log.filter(l => l.ok).length;
  const week = state.log.filter(l => Date.now() - l.t < 7 * DAY);
  const minutesWeek = state.sessions.filter(s => Date.now() - s.start < 7 * DAY).reduce((a, s) => a + ((s.end || s.start) - s.start), 0) / 60000;
  const domRows = DOMAINS.filter(d => !d.printOnly).map(d => {
    const skills = ov.filter(s => s.domain === d.id);
    const levels = skills.reduce((a, s) => a + s.total, 0), done = skills.reduce((a, s) => a + s.mastered, 0);
    const logs = week.filter(l => SKILL_BY_ID[l.skill].domain === d.id);
    const acc = logs.length ? Math.round(100 * logs.filter(l => l.ok).length / logs.length) : null;
    return `<tr><td>${d.emoji} ${d.name}</td><td><div class="bar"><i style="width:${levels ? 100 * done / levels : 0}%;background:${d.color}"></i></div><small>${done}/${levels} úrovní</small></td><td>${logs.length}</td><td>${acc === null ? '–' : acc + ' %'}</td></tr>`;
  }).join('');
  el.innerHTML = `
  <div class="kpis">
    <div class="kpi"><b>${esc(state.child.name)}</b><small>${ageText()}</small></div>
    <div class="kpi"><b>${state.sessions.length}</b><small>sezení celkem</small></div>
    <div class="kpi"><b>${totalAttempts}</b><small>úkolů · ${totalAttempts ? Math.round(100 * totalOk / totalAttempts) : 0} % správně</small></div>
    <div class="kpi"><b>${Math.round(minutesWeek)} min</b><small>u obrazovky za 7 dní</small></div>
    <div class="kpi"><b>${ov.reduce((a, s) => a + s.mastered, 0)}</b><small>zvládnutých úrovní z ${ov.reduce((a, s) => a + s.total, 0)}</small></div>
  </div>
  <h3>Posledních 14 dní</h3>
  <div class="chart">${daily.map(d => `<div class="col" title="${d.date}: ${d.n} úkolů, ${d.ok} správně"><div class="c-bar" style="height:${100 * d.n / maxN}%"><div class="c-ok" style="height:${d.n ? 100 * d.ok / d.n : 0}%"></div></div><small>${d.date.slice(8)}.</small></div>`).join('')}</div>
  <p class="hint">Výška sloupce = počet úkolů, tmavá část = správně na první pokus. Cíl je 75–85 % – pod tím aplikace sníží úroveň, nad tím zvedne.</p>
  <h3>Oblasti</h3>
  <table class="tbl"><thead><tr><th>Oblast</th><th>Pokrok</th><th>Úkolů (7 dní)</th><th>Úspěšnost (7 dní)</th></tr></thead><tbody>${domRows}</tbody></table>`;
}
function tabSkills(el) {
  const ov = skillOverview(state);
  const fmtDate = (t) => t ? new Date(t).toLocaleDateString('cs-CZ') : '–';
  el.innerHTML = DOMAINS.filter(d => !d.printOnly).map(d => `
    <h3>${d.emoji} ${d.name}</h3>
    <table class="tbl skills"><thead><tr><th>Dovednost</th><th>Úrovně</th><th>Aktuální</th><th>Úspěšnost</th><th>Naposledy</th><th></th></tr></thead><tbody>
    ${ov.filter(s => s.domain === d.id).map(s => {
      const def = SKILL_BY_ID[s.id];
      return `<tr class="${s.unlocked ? '' : 'locked'} ${s.struggling ? 'strug' : ''}">
        <td><b>${esc(s.name)}</b><br><small>${esc(def.desc)}</small>${s.struggling ? '<br><small class="tag">zatím těžké</small>' : ''}${!s.unlocked ? `<br><small class="tag">odemkne se po: ${Object.entries(def.prereq).map(([p, l]) => `${SKILL_BY_ID[p].name} (${l}. úr.)`).join(', ')}</small>` : ''}</td>
        <td><span class="lv">${def.levels.map((lv, i) => `<i class="${(state.skills[s.id]?.mastered || []).includes(i) ? 'on' : (i === s.level && !s.complete ? 'cur' : '')}" title="${esc(lv.label)}"></i>`).join('')}</span></td>
        <td>${s.complete ? '✅ vše' : esc(s.levelLabel)}</td>
        <td>${s.acc === null ? '–' : `${Math.round(s.acc * 100)} % <small>(${s.windowN})</small>`}</td>
        <td>${fmtDate(s.lastPracticed)}</td>
        <td class="nowrap"><button class="mini" data-a="down" data-s="${s.id}" title="Úroveň dolů">−</button><button class="mini" data-a="up" data-s="${s.id}" title="Úroveň výš">+</button></td></tr>`;
    }).join('')}</tbody></table>`).join('') + `<p class="hint">Tlačítka ± ručně posunou aktuální úroveň (např. když víte, že dítě něco už umí). Řádky „Ruka a tužka“ jsou jen k tisku – viz Pracovní listy.</p>`;
  el.querySelectorAll('.mini').forEach(b => b.onclick = () => {
    const s = ensureSkill(state, b.dataset.s); const def = SKILL_BY_ID[b.dataset.s];
    if (b.dataset.a === 'up') { if (!s.mastered.includes(s.level)) s.mastered.push(s.level); s.mastered.sort((a, c) => a - c); s.level = Math.min(s.level + 1, def.levels.length - 1); }
    else { s.level = Math.max(0, s.level - 1); s.mastered = s.mastered.filter(l => l < s.level); s.struggling = false; }
    s.history[s.level] = []; save(); screenParent('dovednosti');
  });
}
function tabRecs(el) {
  const recs = recommend(state);
  el.innerHTML = `<div class="recs">${recs.map(r => `<div class="rec p${r.prio}"><span class="ic">${r.icon}</span><div><b>${esc(r.title)}</b><p>${esc(r.text)}</p></div></div>`).join('')}</div>
  <h3>Jak aplikace rozhoduje</h3>
  <ul class="hint">
    <li><b>Zvládnuto</b> = alespoň 8 pokusů na úrovni s úspěšností ≥ 80 %, nebo 5 správně po sobě (rychlá kalibrace). Úroveň se posune výš.</li>
    <li><b>Příliš těžké</b> = z posledních 6 pokusů max. 2 správně → úroveň o jednu dolů; na nejnižší úrovni se dovednost označí jako „zatím těžké“ a doporučí se offline aktivita.</li>
    <li><b>Opakování</b> zvládnutých úrovní po 2, 4, 8, 16 a 30 dnech (rozložené učení).</li>
    <li><b>Plán sezení</b> ≈ 60 % aktivních úrovní, 25 % opakování, 15 % nových dovedností; oblasti se prokládají a málo hrané oblasti dostávají přednost.</li>
  </ul>`;
}
function tabWorksheets(el) {
  const sug = suggestWorksheets(state);
  const base = location.pathname.replace(/index\.html$/, '');
  const recent = state.worksheets.slice(-10).reverse();
  el.innerHTML = `
  <p>Pracovní listy se generují podle aktuální úrovně dítěte (černobílý tisk, A4). Výsledek po vyplnění zapište níže – započítá se do doporučení.</p>
  <p><a class="btn primary" href="${base}print/index.html" target="_blank">🖨️ Otevřít generátor pracovních listů</a></p>
  <h3>Doporučené teď</h3>
  <ul class="ws-list">${sug.map(s => `<li><a href="${base}print/index.html#${s.type}:${encodeURIComponent(JSON.stringify(s.params))}" target="_blank"><b>${esc(WS_NAMES[s.type] || s.type)}</b></a> – ${esc(s.why)}</li>`).join('')}</ul>
  <h3>Zapsat vyplněný list</h3>
  <form id="wsf" class="inline">
    <select name="type">${Object.entries(WS_NAMES).map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select>
    <select name="result"><option value="sam">zvládl sám</option><option value="pomoc">s pomocí</option><option value="tezke">bylo to těžké</option></select>
    <input name="note" placeholder="poznámka (volitelné)">
    <button class="btn">Uložit</button>
  </form>
  ${recent.length ? `<h3>Poslední listy</h3><table class="tbl"><tbody>${recent.map(w => `<tr><td>${new Date(w.date).toLocaleDateString('cs-CZ')}</td><td>${esc(WS_NAMES[w.type] || w.type)}</td><td>${{ sam: '✅ sám', pomoc: '🤝 s pomocí', tezke: '🧡 těžké' }[w.result]}</td><td><small>${esc(w.note || '')}</small></td></tr>`).join('')}</tbody></table>` : ''}`;
  $('#wsf').onsubmit = (e) => { e.preventDefault(); const f = new FormData(e.target); state.worksheets.push({ id: Date.now(), type: f.get('type'), result: f.get('result'), note: f.get('note'), date: new Date().toISOString() }); const sk = WS_SKILL[f.get('type')]; if (sk) { const s = ensureSkill(state, sk); s.lastPracticed = Date.now(); if (f.get('result') === 'sam') { s.mastered.includes(s.level) || s.mastered.push(s.level); s.level = Math.min(s.level + 1, SKILL_BY_ID[sk].levels.length - 1); } } save(); screenParent('listy'); };
}
export const WS_NAMES = { spojovacka: 'Spojovačka čísel', pocitej: 'Spočítej a napiš', scitani: 'Sčítání s obrázky', domecky: 'Rozklady čísel (domečky)', rada: 'Doplň číselnou řadu', porovnej: 'Kde je víc', najdipismeno: 'Najdi písmeno', obtah: 'Obtahování číslic a písmen', prvnihlaska: 'První hláska', vzory: 'Pokračuj ve vzoru', labyrint: 'Labyrint', cary: 'Čáry a vlnovky', mrizka: 'Dokresli zrcadlově', sudoku: 'Obrázkové sudoku', conepatri: 'Co nepatří' };
const WS_SKILL = { spojovacka: 'spojovacka', labyrint: 'labyrint', cary: 'cary', obtah: 'obtah', mrizka: 'mrizka' };

function tabSettings(el) {
  const s = state.settings;
  el.innerHTML = `
  <form id="setf" class="settings">
    <label><input type="checkbox" name="speech" ${s.speech ? 'checked' : ''}> Číst zadání nahlas (český hlas)</label>
    <label><input type="checkbox" name="autoSpeak" ${s.autoSpeak ? 'checked' : ''}> Číst automaticky při zobrazení úkolu</label>
    <label><input type="checkbox" name="sound" ${s.sound ? 'checked' : ''}> Zvuky</label>
    <label>Úkolů v jednom dobrodružství <select name="tasksPerSession">${[6, 8, 10, 12, 15].map(n => `<option ${n === s.tasksPerSession ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
    <h3>Dítě</h3>
    <label>Jméno <input name="name" value="${esc(state.child.name)}"></label>
    <label>Datum narození <input type="date" name="birthdate" value="${esc(state.child.birthdate)}"></label>
    <div class="avatars">${AVATARS.map(a => `<label class="av"><input type="radio" name="avatar" value="${a}" ${a === state.child.avatar ? 'checked' : ''}><span>${a}</span></label>`).join('')}</div>
    <button class="btn primary">Uložit</button>
  </form>
  <h3>Data</h3>
  <p class="row-btns"><button class="btn" id="exp">⬇️ Exportovat zálohu (JSON)</button><label class="btn">⬆️ Načíst zálohu <input type="file" id="imp" accept="application/json" hidden></label><button class="btn danger" id="reset">Smazat vše</button></p>
  <p class="hint">Vše je uloženo jen v tomto prohlížeči (localStorage). Záloha se hodí při změně počítače nebo prohlížeče. Verze dat: ${state.version}, od ${new Date(state.createdAt).toLocaleDateString('cs-CZ')}.</p>
  <h3>O aplikaci</h3>
  <p class="hint">Školička vychází z rešerše 120+ zdrojů (raná matematika, gramotnost, exekutivní funkce, nadané děti, digitální učení, RVP PV). Souhrn: <code>research/RESEARCH.md</code>, pedagogický koncept: <code>research/KONCEPT.md</code>.</p>`;
  $('#setf').onsubmit = (e) => { e.preventDefault(); const f = new FormData(e.target); state.settings = { ...s, speech: f.has('speech'), autoSpeak: f.has('autoSpeak'), sound: f.has('sound'), tasksPerSession: Number(f.get('tasksPerSession')) }; state.child = { ...state.child, name: f.get('name').trim() || state.child.name, birthdate: f.get('birthdate'), avatar: f.get('avatar') }; configureAudio(state.settings); save(); screenParent('nastaveni'); };
  $('#exp').onclick = () => exportState(state);
  $('#imp').onchange = async (e) => { try { state = await importStateFromFile(e.target.files[0]); configureAudio(state.settings); save(); screenParent('prehled'); } catch (err) { alert('Import se nepodařil: ' + err.message); } };
  $('#reset').onclick = () => { if (confirm('Opravdu smazat všechen pokrok a nastavení? Nejde to vrátit.')) { resetState(); state = loadState(); screenOnboarding(); } };
}

// ─────────────── START ───────────────
window.addEventListener('beforeunload', () => { if (current && !current.aborted) { const s = state.sessions[state.sessions.length - 1]; if (s && !s.end) s.end = Date.now(); save(); } });
if (!state.child) screenOnboarding(); else screenHome();
// Pro ladění v konzoli
window.skolicka = { get state() { return state; }, save, planSession: () => planSession(state), overview: () => skillOverview(state) };
