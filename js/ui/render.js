// Vykreslení úkolu a běh jedné mechaniky. runTask() vrací Promise<{ ok, ms, errors }>.
import { shapeSVG, partsSVG, figureSVG, polySVG, gridSVG, dotsSVG, tenFrameSVG, clockSVG } from './icons.js';
import { sfx, speak, stopSpeech, PRAISE, PRAISE_RETRY, ENCOURAGE, REVEAL } from './audio.js';
import { LETTER_SAY } from '../data/words.js';

const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const wait = (ms) => new Promise(r => setTimeout(r, ms));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function renderView(v) {
  if (!v) return '';
  switch (v.kind) {
    case 'emoji': return `<span class="emo ${v.size === 'big' ? 'emo-big' : ''}" ${v.px ? `style="font-size:${v.px}px"` : ''}>${v.value}</span>`;
    case 'text': return `<span class="txt ${v.big ? 'txt-big' : ''} ${v.letter ? 'txt-letter' : ''} ${v.label ? 'txt-label' : ''}">${esc(v.value)}</span>`;
    case 'emojiGroup': {
      const n = v.items.length; const cols = v.rows ? Math.ceil(n / v.rows) : (n > 6 ? 5 : n);
      if (v.scatter) return `<div class="egroup scatter ${v.small ? 'small' : ''}">${v.items.map((e, i) => `<span class="emo" style="left:${(i * 37 + 13) % 86}%;top:${(i * 53 + 7) % 80}%">${e}</span>`).join('')}</div>`;
      return `<div class="egroup ${v.small ? 'small' : ''}" style="grid-template-columns:repeat(${Math.min(cols, 10)},auto)">${v.items.map(e => `<span class="emo">${e}</span>`).join('')}</div>`;
    }
    case 'dots': return dotsSVG(v.n, v.layout, 170);
    case 'tenframe': return tenFrameSVG(v.n, { total: v.total || 10, showMissing: v.showMissing, size: 280 });
    case 'twogroups': return `<div class="row">${dotsSVG(v.a, 'dice', 130)}${v.b ? dotsSVG(v.b, 'dice', 130) : ''}</div>`;
    case 'sequence': return `<div class="seq">${v.items.map(x => `<span class="chip ${x === '?' ? 'chip-q' : ''}">${esc(x)}</span>`).join('')}</div>`;
    case 'equation': {
      const g = (n) => v.emoji ? `<div class="egroup small" style="grid-template-columns:repeat(${Math.max(1, Math.min(n, 5))},auto)">${Array(n).fill(`<span class="emo">${v.emoji}</span>`).join('')}</div>` : `<span class="txt txt-big">${n}</span>`;
      return `<div class="eq">${g(v.a)}<span class="op">${v.op}</span>${g(v.b)}<span class="op">=</span><span class="txt txt-big chip-q">?</span></div>`;
    }
    case 'partwhole': return `<div class="pw"><span class="badge">${v.total}</span><div class="egroup small" style="grid-template-columns:repeat(${Math.max(1, Math.min(v.visible, 5))},auto)">${Array(v.visible).fill(`<span class="emo">${v.emoji}</span>`).join('')}</div><span class="hand">🤚<span class="q">?</span></span></div>`;
    case 'emojiWord': return `<span class="ew ${v.small ? 'small' : ''}"><span class="emo">${v.emoji}</span>${v.hideWord ? '' : `<span class="ew-word">${esc(v.word)}</span>`}</span>`;
    case 'claps': return `<span class="claps">${Array(v.n).fill('👏').join('')}</span>`;
    case 'row': return `<div class="row">${v.items.map(renderView).join('')}</div>`;
    case 'analogy': return `<div class="analogy"><span class="emo">${v.a}</span><span class="arr">→</span><span class="emo">${v.b}</span><span class="sep"></span><span class="emo">${v.c}</span><span class="arr">→</span><span class="txt txt-big chip-q">?</span></div>`;
    case 'shape': return shapeSVG(v.shape, { color: v.color, size: v.big ? 150 : 90, rotate: v.rotate || 0 });
    case 'figure': return figureSVG(v, 96);
    case 'poly': return polySVG(v.cells, v.color, 96);
    case 'gridcells': return gridSVG(v.cells, v.color, 110);
    case 'halfgrid': return `<div class="halfgrid">${gridSVG(v.left, v.color, 130)}<span class="mirror"></span><span class="halfq">?</span></div>`;
    case 'parts': return partsSVG(v.parts, v.color, 56);
    case 'clock': return clockSVG(v.hour, 0, 200);
    case 'empty': return `<span class="empty"></span>`;
    default: return `<span>${esc(JSON.stringify(v))}</span>`;
  }
}

function speakPrompt(task) {
  let t = task.prompt;
  if (task.speakOptions) t += ' ' + task.options.filter(o => o.say).map(o => o.say).join(', ') + '.';
  speak(t);
}

export function runTask(task, root, { autoSpeak = true } = {}) {
  return new Promise((resolve) => {
    const t0 = { v: null };
    let errors = 0, done = false;
    root.innerHTML = `
      <div class="task-head">
        <button class="btn-speak" title="Přečíst znovu">🔊</button>
        <div class="prompt">${task.show ? (task.show === '🔊' ? '' : esc(task.show)) : esc(task.prompt)}</div>
      </div>
      <div class="stimulus"></div>
      <div class="options ${task.layout === 'grid3' ? 'grid3' : ''} ${task.wide ? 'wide' : ''}"></div>
      <div class="feedback"></div>`;
    const stim = root.querySelector('.stimulus'), optsEl = root.querySelector('.options'), fb = root.querySelector('.feedback'), promptEl = root.querySelector('.prompt');
    root.querySelector('.btn-speak').onclick = () => speakPrompt(task);
    if (task.show !== '🔊' && !task.show) promptEl.classList.add('small');
    if (task.show === '🔊') promptEl.innerHTML = `<span class="big-hint">👂</span>`;
    const finish = async (ok, msg) => {
      if (done) return; done = true;
      const ms = Date.now() - (t0.v || Date.now());
      if (msg) { fb.textContent = msg; }
      await wait(ok ? 1100 : 1700);
      resolve({ ok, ms, errors });
    };
    const start = () => { t0.v = Date.now(); if (autoSpeak) speakPrompt(task); };
    const onCorrect = (el) => { el && el.classList.add('correct'); sfx.correct(); const m = errors ? pick(PRAISE_RETRY) : pick(PRAISE); speak(m); fb.textContent = m; finish(errors === 0); };
    const onWrong = (el, revealEl) => {
      errors++; sfx.wrong(); el && el.classList.add('wrong');
      if (errors >= 2 && revealEl) { revealEl.classList.add('correct', 'reveal'); const m = pick(REVEAL); speak(m); fb.textContent = m; finish(false); return true; }
      const m = pick(ENCOURAGE); speak(m); fb.textContent = m; return false;
    };

    const renderOptions = (options, onClick) => {
      optsEl.innerHTML = options.map(o => `<button class="opt ${o.disabled ? 'opt-disabled' : ''}" data-id="${esc(o.id)}" ${o.disabled ? 'disabled' : ''}>${renderView(o.view)}</button>`).join('');
      optsEl.querySelectorAll('.opt').forEach(b => b.onclick = () => { if (done || b.disabled) return; onClick(b, b.dataset.id); });
    };

    // ───── mechaniky ─────
    if (task.mechanic === 'choice' || task.mechanic === 'flash') {
      const showChoice = () => {
        renderOptions(task.options, (b, id) => {
          if (id === task.answer) { onCorrect(b); return; }
          b.disabled = true;
          const correctEl = optsEl.querySelector(`.opt[data-id="${CSS.escape(task.answer)}"]`);
          onWrong(b, correctEl);
        });
      };
      if (task.mechanic === 'choice') { stim.innerHTML = renderView(task.stimulus); showChoice(); start(); }
      else {
        stim.innerHTML = renderView(task.stimulus);
        optsEl.innerHTML = `<div class="watch">👀</div>`;
        start();
        setTimeout(() => {
          stim.innerHTML = task.after ? renderView(task.after) : `<div class="cover">❔</div>`;
          if (task.afterPrompt) { promptEl.textContent = task.afterPrompt; promptEl.classList.remove('small'); speak(task.afterPrompt); }
          t0.v = Date.now();
          showChoice();
        }, task.flashMs + (autoSpeak ? 900 : 0));
      }
      return;
    }

    if (task.mechanic === 'multi') {
      const selected = new Set();
      stim.innerHTML = renderView(task.stimulus);
      renderOptions(task.options, (b, id) => { sfx.click(); if (selected.has(id)) { selected.delete(id); b.classList.remove('sel'); } else { selected.add(id); b.classList.add('sel'); } });
      const confirm = document.createElement('button'); confirm.className = 'btn-confirm'; confirm.textContent = '✔';
      fb.after(confirm);
      confirm.onclick = () => {
        if (done) return;
        const want = new Set(task.answer);
        const okNow = selected.size === want.size && [...selected].every(x => want.has(x));
        if (okNow) { optsEl.querySelectorAll('.sel').forEach(e => e.classList.add('correct')); confirm.remove(); onCorrect(null); return; }
        errors++; sfx.wrong();
        if (errors >= 2) {
          optsEl.querySelectorAll('.opt').forEach(e => { e.classList.remove('sel', 'wrong'); if (want.has(e.dataset.id)) e.classList.add('correct', 'reveal'); });
          confirm.remove(); const m = pick(REVEAL); speak(m); fb.textContent = m; finish(false); return;
        }
        const extra = [...selected].filter(x => !want.has(x)).length, missing = [...want].filter(x => !selected.has(x)).length;
        const m = extra && missing ? 'Něco přebývá a něco chybí. Zkontroluj to ještě jednou.' : extra ? 'Něco tam nepatří. Podívej se znovu.' : 'Ještě něco chybí. Hledej dál.';
        speak(m); fb.textContent = m;
        optsEl.querySelectorAll('.sel').forEach(e => { if (!want.has(e.dataset.id)) { e.classList.add('wrong'); setTimeout(() => e.classList.remove('wrong'), 700); } });
      };
      start();
      return;
    }

    if (task.mechanic === 'order') {
      let idx = 0; const n = task.answer.length;
      stim.innerHTML = renderView(task.stimulus);
      renderOptions(task.options, (b, id) => {
        const opt = task.options.find(o => o.id === id);
        if (id === task.answer[idx]) {
          idx++; b.disabled = true; b.classList.add('done'); b.insertAdjacentHTML('beforeend', `<span class="ord">${idx}</span>`);
          if (task.speakOnTap && opt?.say) speak(opt.say, { interrupt: true }); else if (task.speakOnTap) speak(String(opt.view.value)); else sfx.click();
          if (idx >= n) { const ok = errors <= Math.floor(n / 4); sfx.correct(); const m = ok ? (errors ? pick(PRAISE_RETRY) : pick(PRAISE)) : 'Hotovo. Příště to půjde ještě líp.'; setTimeout(() => speak(m), task.speakOnTap ? 700 : 0); fb.textContent = m; finish(ok); }
        } else {
          errors++; sfx.wrong(); b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 600);
          if (task.speakOnTap && opt?.say) speak(opt.say + '. To ještě ne.'); else speak(pick(ENCOURAGE));
          if (errors >= 4) { // ukázat zbytek
            for (let i = idx; i < n; i++) { const el = optsEl.querySelector(`.opt[data-id="${CSS.escape(task.answer[i])}"]`); el.disabled = true; el.classList.add('correct', 'reveal'); el.insertAdjacentHTML('beforeend', `<span class="ord">${i + 1}</span>`); }
            const m = pick(REVEAL); speak(m); fb.textContent = m; finish(false);
          }
        }
      });
      start();
      return;
    }

    if (task.mechanic === 'build') {
      let idx = 0;
      stim.innerHTML = renderView(task.stimulus) + `<div class="slots">${task.answer.map(() => `<span class="slot"></span>`).join('')}</div>`;
      const slots = stim.querySelectorAll('.slot');
      optsEl.innerHTML = task.tiles.map(t => `<button class="opt tile" data-id="${t.id}" data-l="${t.letter}"><span class="txt txt-letter">${t.letter}</span></button>`).join('');
      optsEl.querySelectorAll('.tile').forEach(b => b.onclick = () => {
        if (done || b.disabled) return;
        const l = b.dataset.l;
        if (l === task.answer[idx]) {
          slots[idx].textContent = l; slots[idx].classList.add('filled'); b.disabled = true; b.classList.add('done'); idx++; speak(LETTER_SAY[l] || l, { interrupt: true });
          if (idx >= task.answer.length) { const w = task.answer.join(''); setTimeout(() => { sfx.correct(); const m = `${w.toLowerCase()}! ${errors ? pick(PRAISE_RETRY) : pick(PRAISE)}`; speak(m); fb.textContent = m; finish(errors === 0); }, 500); }
        } else {
          errors++; sfx.wrong(); b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 600);
          if (errors >= 3) { for (let i = idx; i < task.answer.length; i++) { slots[i].textContent = task.answer[i]; slots[i].classList.add('filled', 'reveal'); } optsEl.querySelectorAll('.tile').forEach(t => t.disabled = true); const m = `Správně je ${task.answer.join('').toLowerCase()}. ${pick(REVEAL)}`; speak(m); fb.textContent = m; finish(false); }
          else speak(`Hledej ${LETTER_SAY[task.answer[idx]] || task.answer[idx]}.`);
        }
      });
      start();
      return;
    }

    if (task.mechanic === 'fill') {
      let selCell = null;
      const total = Object.keys(task.answer).length; let filled = 0;
      stim.innerHTML = `<div class="sgrid" style="grid-template-columns:repeat(${task.size},1fr)">${task.grid.map((c, i) => c.hidden ? `<button class="scell hidden" data-i="${i}">?</button>` : `<span class="scell">${c.sym}</span>`).join('')}</div>`;
      optsEl.innerHTML = task.palette.map(s => `<button class="opt pal" data-s="${s}"><span class="emo">${s}</span></button>`).join('');
      const cells = [...stim.querySelectorAll('.scell.hidden')];
      const selectCell = (c) => { cells.forEach(x => x.classList.remove('sel')); selCell = c; c.classList.add('sel'); sfx.click(); };
      cells.forEach(c => c.onclick = () => { if (done || c.classList.contains('filled')) return; selectCell(c); });
      if (cells.length) selectCell(cells[0]);
      optsEl.querySelectorAll('.pal').forEach(b => b.onclick = () => {
        if (done || !selCell) { speak('Nejdřív klikni na prázdné políčko.'); return; }
        const i = Number(selCell.dataset.i), s = b.dataset.s;
        if (task.answer[i] === s) {
          selCell.textContent = s; selCell.classList.add('filled'); selCell.classList.remove('sel'); filled++; sfx.flip();
          const next = cells.find(c => !c.classList.contains('filled')); if (next) selectCell(next); else selCell = null;
          if (filled >= total) { const m = errors ? pick(PRAISE_RETRY) : pick(PRAISE); sfx.correct(); speak(m); fb.textContent = m; finish(errors === 0); }
        } else {
          errors++; sfx.wrong(); selCell.classList.add('wrong'); setTimeout(() => selCell && selCell.classList.remove('wrong'), 600);
          if (errors >= 3) { cells.forEach(c => { if (!c.classList.contains('filled')) { c.textContent = task.answer[Number(c.dataset.i)]; c.classList.add('filled', 'reveal'); } }); const m = pick(REVEAL); speak(m); fb.textContent = m; finish(false); }
          else speak('Tenhle obrázek už v řádku nebo sloupci je. Zkus jiný.');
        }
      });
      start();
      return;
    }

    if (task.mechanic === 'memory') {
      let open = [], matched = 0, misses = 0, lock = false;
      const cols = task.cards.length <= 8 ? 4 : 4;
      optsEl.innerHTML = `<div class="mgrid" style="grid-template-columns:repeat(${cols},1fr)">${task.cards.map(c => `<button class="card" data-id="${c.id}"><span class="front">${c.sym}</span><span class="back">❓</span></button>`).join('')}</div>`;
      optsEl.querySelectorAll('.card').forEach(b => b.onclick = async () => {
        if (done || lock || b.classList.contains('open') || b.classList.contains('matched')) return;
        b.classList.add('open'); sfx.flip(); open.push(b);
        if (open.length === 2) {
          lock = true;
          const [a, c] = open; const sa = task.cards.find(x => x.id === a.dataset.id).sym, sc = task.cards.find(x => x.id === c.dataset.id).sym;
          await wait(700);
          if (sa === sc) { a.classList.add('matched'); c.classList.add('matched'); matched++; sfx.correct(); if (matched >= task.pairs) { const ok = misses <= task.pairs; const m = ok ? pick(PRAISE) : 'Všechny dvojice jsou nalezené. Příště si zkus pamatovat, kde co leží.'; speak(m); fb.textContent = m; finish(ok); } }
          else { misses++; a.classList.remove('open'); c.classList.remove('open'); }
          open = []; lock = false;
        }
      });
      start();
      return;
    }

    if (task.mechanic === 'simon') {
      const COLS = ['#e53935', '#1e88e5', '#43a047', '#fdd835'];
      let input = [], attempts = 0, accepting = false;
      optsEl.innerHTML = `<div class="simon">${COLS.map((c, i) => `<button class="pad" data-i="${i}" style="background:${c}"></button>`).join('')}</div>`;
      const pads = [...optsEl.querySelectorAll('.pad')];
      const play = async () => { accepting = false; await wait(600); for (const i of task.seq) { pads[i].classList.add('lit'); sfx.note(i); await wait(520); pads[i].classList.remove('lit'); await wait(220); } accepting = true; fb.textContent = 'Teď ty!'; speak('Teď ty.'); };
      pads.forEach(p => p.onclick = () => {
        if (done || !accepting) return;
        const i = Number(p.dataset.i); sfx.note(i); p.classList.add('lit'); setTimeout(() => p.classList.remove('lit'), 250);
        input.push(i);
        const k = input.length - 1;
        if (input[k] !== task.seq[k]) {
          attempts++; errors++; accepting = false; sfx.wrong(); input = [];
          if (attempts >= 2) { const m = pick(REVEAL); speak(m); fb.textContent = m; finish(false); return; }
          fb.textContent = 'Ještě jednou, dívej se.'; speak('Ještě jednou. Dívej se.', { onend: play }); setTimeout(() => { if (!accepting && !done) play(); }, 2500);
        } else if (input.length === task.seq.length) { const m = attempts ? pick(PRAISE_RETRY) : pick(PRAISE); sfx.correct(); speak(m); fb.textContent = m; finish(attempts === 0); }
      });
      start(); setTimeout(play, autoSpeak ? 2500 : 300);
      return;
    }

    if (task.mechanic === 'gonogo') {
      let i = 0, correct = 0, responded = false, running = false;
      stim.innerHTML = `<button class="gng">${task.target}</button><div class="gng-hint">${task.reverse ? 'NE ' : ''}${task.target}</div>`;
      const btn = stim.querySelector('.gng');
      const isGo = (s) => task.reverse ? s !== task.target : s === task.target;
      const next = async () => {
        if (i >= task.trials.length) {
          const acc = correct / task.trials.length; const ok = acc >= 0.8; errors = task.trials.length - correct;
          const m = ok ? pick(PRAISE) : 'Hotovo. Bylo to rychlé, příště se víc soustřeď.'; sfx.correct(); speak(m); fb.textContent = m; finish(ok); return;
        }
        const s = task.trials[i]; responded = false; btn.textContent = s; btn.classList.add('show'); sfx.tick();
        await wait(task.ms);
        if (done) return;
        btn.classList.remove('show'); btn.textContent = '';
        if (!responded && !isGo(s)) { correct++; } else if (!responded && isGo(s)) { fb.textContent = 'Tady ses měl kliknout.'; }
        i++; await wait(450); fb.textContent = ''; next();
      };
      btn.onclick = () => { if (done || responded || !btn.classList.contains('show')) return; responded = true; const s = task.trials[i]; if (isGo(s)) { correct++; sfx.click(); btn.classList.add('hit'); setTimeout(() => btn.classList.remove('hit'), 200); } else { sfx.wrong(); btn.classList.add('miss'); setTimeout(() => btn.classList.remove('miss'), 300); } };
      start(); setTimeout(() => { running = true; next(); }, autoSpeak ? 4500 : 500);
      return;
    }

    stim.innerHTML = `<p>Neznámá mechanika: ${esc(task.mechanic)}</p>`; finish(false);
  });
}
