// Generátory úkolů. Každý vrací datový popis úkolu, který vykreslí js/ui/render.js.
// Tvar úkolu: { mechanic, prompt (mluvené zadání), show (zadání k zobrazení, volitelné), stimulus (view), options: [{id, view, say?}], answer, ... }
import { WORDS, SIMPLE_WORDS, ALPHABET, LETTER_SAY, CONFUSABLE, CATEGORIES, ANALOGIES, ANALOGY_POOL, STORIES, RIDDLES, RIDDLE_POOL, OPPOSITES, ANIMAL_HOMES, ANIMAL_FOOD, DAY_PARTS, SEASONS, WEEKDAYS, byWord } from '../data/words.js';
import { numberDistractors } from '../engine/rng.js';

export const COUNT_EMOJI = ['🍎', '⭐', '🐟', '🎈', '🍓', '🐞', '🚗', '🌼', '🧸', '🍪', '🐥', '🦋'];
export const SHAPES = {
  circle: 'kruh', square: 'čtverec', triangle: 'trojúhelník', rectangle: 'obdélník', oval: 'ovál', star: 'hvězda', heart: 'srdce', diamond: 'kosočtverec', hexagon: 'šestiúhelník', pentagon: 'pětiúhelník',
};
export const SHAPE_SETS = { basic: ['circle', 'square', 'triangle'], more: ['circle', 'square', 'triangle', 'rectangle', 'oval', 'star', 'heart'], all: Object.keys(SHAPES) };
export const CORNERS = { circle: 0, oval: 0, triangle: 3, square: 4, rectangle: 4, diamond: 4, pentagon: 5, hexagon: 6, star: 10, heart: 1 };
export const COLORS = [
  { id: 'red', hex: '#e53935', n: 'červený', n2: 'červené' }, { id: 'blue', hex: '#1e88e5', n: 'modrý', n2: 'modré' }, { id: 'green', hex: '#43a047', n: 'zelený', n2: 'zelené' },
  { id: 'yellow', hex: '#fdd835', n: 'žlutý', n2: 'žluté' }, { id: 'orange', hex: '#fb8c00', n: 'oranžový', n2: 'oranžové' }, { id: 'purple', hex: '#8e24aa', n: 'fialový', n2: 'fialové' },
];
const num = (v) => ({ kind: 'text', value: String(v) });
const emo = (e, size) => ({ kind: 'emoji', value: e, size });
const opts = (rng, arr) => rng.shuffle(arr).map((o, i) => ({ id: o.id ?? `o${i}`, ...o }));
const numOptions = (rng, correct, count, lo, hi) => {
  const ds = numberDistractors(rng, correct, count, lo, hi);
  return rng.shuffle([correct, ...ds]).map(v => ({ id: String(v), view: num(v) }));
};
const word = (w) => byWord(w);
const say = (t) => t;

// ─────────── ČÍSLA ───────────
export const generators = {
  countChoose(p, rng) {
    const n = rng.int(Math.max(1, Math.floor(p.max / 2) - 1), p.max);
    const e = rng.pick(COUNT_EMOJI);
    return { mechanic: 'choice', prompt: say('Spočítej, kolik toho je, a klikni na správné číslo.'),
      stimulus: { kind: 'emojiGroup', items: Array(n).fill(e), scatter: !!p.scatter, rows: p.rows || (n > 10 ? 2 : 1) },
      options: numOptions(rng, n, 3, Math.max(0, n - 4), Math.min(p.max + 2, n + 4)), answer: String(n) };
  },
  subitize(p, rng) {
    const n = rng.int(1, p.max);
    let stim;
    if (p.layout === 'dice') stim = { kind: 'dots', n, layout: 'dice' };
    else if (p.layout === 'tenframe') stim = { kind: 'tenframe', n };
    else if (p.layout === 'twogroups') { const a = rng.int(1, Math.min(5, n - 1 > 0 ? n - 1 : 1)); stim = { kind: 'twogroups', a: Math.min(a, n), b: n - Math.min(a, n) }; }
    else stim = { kind: 'dots', n, layout: 'random' };
    return { mechanic: 'flash', flashMs: p.ms, prompt: say('Podívej se rychle. Kolik teček jsi viděl?'),
      stimulus: stim, options: numOptions(rng, n, 3, Math.max(1, n - 3), Math.min(p.max, n + 3)), answer: String(n) };
  },
  numeralPick(p, rng) {
    const lo = p.min ?? 0, hi = p.max;
    const n = rng.int(lo, hi);
    const near = hi > 20 ? 10 : 3;
    const ds = numberDistractors(rng, n, p.options - 1, lo, hi, near);
    // u čísel nad 10 přidej záměnu číslic (12 ↔ 21)
    if (n >= 12 && n <= 98 && String(n)[0] !== String(n)[1]) { const sw = Number(String(n).split('').reverse().join('')); if (sw >= lo && sw <= hi && !ds.includes(sw)) ds[0] = sw; }
    return { mechanic: 'choice', prompt: say(`Najdi číslo ${n}.`), show: '🔊', options: rng.shuffle([n, ...ds]).map(v => ({ id: String(v), view: num(v) })), answer: String(n), repeatable: true };
  },
  numeralToQuantity(p, rng) {
    const n = rng.int(1, p.max);
    const e = rng.pick(COUNT_EMOJI);
    const ds = numberDistractors(rng, n, 2, 1, p.max, 2);
    return { mechanic: 'choice', prompt: say(`Tady je číslo ${n}. Kde je přesně ${n} obrázků?`), stimulus: { kind: 'text', value: String(n), big: true },
      options: opts(rng, [n, ...ds].map(v => ({ id: String(v), view: { kind: 'emojiGroup', items: Array(v).fill(e), small: true } }))), answer: String(n) };
  },
  tapInOrder(p, rng) {
    const items = Array.from({ length: p.max }, (_, i) => i + 1);
    return { mechanic: 'order', prompt: say(`Klikej na čísla popořadě od jedničky do ${p.max}.`), options: rng.shuffle(items).map(v => ({ id: String(v), view: num(v) })), answer: items.map(String), speakOnTap: true };
  },
  sequenceMissing(p, rng) {
    const step = p.step || 1;
    const maxStart = p.max - step * (p.len - 1);
    const start = step === 1 ? rng.int(1, Math.max(1, maxStart)) : step * rng.int(1, Math.floor(maxStart / step));
    const seq = Array.from({ length: p.len }, (_, i) => start + i * step);
    const idx = rng.int(1, p.len - 2);
    const missing = seq[idx];
    const ds = step === 1 ? numberDistractors(rng, missing, 3, Math.max(1, missing - 4), missing + 4, 2) : rng.shuffle([missing - step, missing + step, missing + 2 * step, missing - 2 * step].filter(x => x > 0 && x !== missing && x <= p.max + step)).slice(0, 3);
    return { mechanic: 'choice', prompt: say('Které číslo v řadě chybí?'), stimulus: { kind: 'sequence', items: seq.map((v, i) => i === idx ? '?' : String(v)) },
      options: rng.shuffle([missing, ...ds]).map(v => ({ id: String(v), view: num(v) })), answer: String(missing) };
  },
  neighbor(p, rng) {
    const after = rng.chance(0.5);
    const n = rng.int(2, p.max - 1);
    const ans = after ? n + 1 : n - 1;
    const ds = rng.shuffle([after ? n - 1 : n + 1, n + 2, n - 2, n + 10, n - 10].filter(x => x >= 0 && x <= p.max && x !== ans && x !== n)).slice(0, 3);
    return { mechanic: 'choice', prompt: say(after ? `Které číslo je hned za číslem ${n}?` : `Které číslo je hned před číslem ${n}?`), stimulus: { kind: 'sequence', items: after ? [String(n), '?'] : ['?', String(n)] },
      options: rng.shuffle([ans, ...ds]).map(v => ({ id: String(v), view: num(v) })), answer: String(ans) };
  },
  compareGroups(p, rng) {
    let a = rng.int(1, p.max), b = rng.int(1, p.max);
    while (b === a) b = rng.int(1, p.max);
    const more = rng.chance(0.5);
    const e1 = rng.pick(COUNT_EMOJI); let e2 = rng.pick(COUNT_EMOJI); while (e2 === e1) e2 = rng.pick(COUNT_EMOJI);
    const ans = more ? (a > b ? 'a' : 'b') : (a < b ? 'a' : 'b');
    return { mechanic: 'choice', prompt: say(more ? 'Kde je víc?' : 'Kde je míň?'), options: [
      { id: 'a', view: { kind: 'emojiGroup', items: Array(a).fill(e1), small: true } }, { id: 'b', view: { kind: 'emojiGroup', items: Array(b).fill(e2), small: true } },
    ], answer: ans, wide: true };
  },
  compareNumbers(p, rng) {
    let a = rng.int(1, p.max), b = rng.int(1, p.max);
    while (b === a) b = rng.int(1, p.max);
    const more = rng.chance(0.6);
    return { mechanic: 'choice', prompt: say(more ? 'Které číslo je větší?' : 'Které číslo je menší?'), options: [{ id: 'a', view: num(a) }, { id: 'b', view: num(b) }], answer: more ? (a > b ? 'a' : 'b') : (a < b ? 'a' : 'b') };
  },
  addition(p, rng) {
    let a, b;
    if (p.noCarry) { a = rng.int(10, 18); b = rng.int(1, 19 - a); if (rng.chance(0.5)) [a, b] = [b, a]; }
    else { a = rng.int(1, p.max - 1); b = rng.int(1, p.max - a); }
    const sum = a + b;
    const e = rng.pick(COUNT_EMOJI);
    return { mechanic: 'choice', prompt: say(`Kolik je ${a} plus ${b}?`), stimulus: { kind: 'equation', a, b, op: '+', emoji: p.pictures ? e : null },
      options: numOptions(rng, sum, 3, Math.max(0, sum - 3), sum + 3), answer: String(sum) };
  },
  missingAddend(p, rng) {
    const a = rng.int(1, p.total - 1);
    const ans = p.total - a;
    return { mechanic: 'choice', prompt: say(`Kolik ještě chybí do ${p.total}? ${a} a kolik je ${p.total}?`), stimulus: { kind: 'tenframe', n: a, total: p.total, showMissing: true },
      options: numOptions(rng, ans, 3, 1, p.total), answer: String(ans) };
  },
  subtraction(p, rng) {
    const a = rng.int(2, p.max), b = rng.int(1, a - 1 || 1);
    const e = rng.pick(COUNT_EMOJI);
    return { mechanic: 'choice', prompt: say(`Kolik je ${a} minus ${b}? Bylo ${a}, ${b} ubereme.`), stimulus: { kind: 'equation', a, b, op: '−', emoji: p.pictures ? e : null },
      options: numOptions(rng, a - b, 3, 0, a), answer: String(a - b) };
  },
  partWhole(p, rng) {
    const total = p.total || rng.pick(p.totals);
    const visible = rng.int(1, total - 1);
    const hidden = total - visible;
    const e = rng.pick(COUNT_EMOJI);
    return { mechanic: 'choice', prompt: say(`Je tu celkem ${total}. ${visible === 1 ? 'Jeden vidíš' : `${visible} vidíš`}. Kolik se schovalo pod ruku?`),
      stimulus: { kind: 'partwhole', total, visible, emoji: e }, options: numOptions(rng, hidden, 3, 0, total), answer: String(hidden) };
  },

  // ─────────── PÍSMENA ───────────
  letterPick(p, rng) {
    let pool = ALPHABET;
    const target = rng.pick(pool);
    let ds;
    if (p.confusable) {
      const grp = CONFUSABLE.find(g => g.includes(target.toLowerCase()));
      ds = grp ? grp.filter(x => x !== target.toLowerCase()).map(x => x.toUpperCase()).filter(x => ALPHABET.includes(x)) : [];
    } else ds = [];
    const rest = rng.shuffle(pool.filter(l => l !== target && !ds.includes(l)));
    while (ds.length < p.options - 1) ds.push(rest.pop());
    const show = (l) => p.lower ? l.toLowerCase() : l;
    return { mechanic: 'choice', prompt: say(`Najdi písmeno ${LETTER_SAY[target]}.`), show: '🔊', repeatable: true,
      options: rng.shuffle([target, ...ds]).map(l => ({ id: l, view: { kind: 'text', value: show(l), letter: true } })), answer: target };
  },
  letterPair(p, rng) {
    const target = rng.pick(ALPHABET);
    const ds = rng.sample(ALPHABET.filter(l => l !== target), p.options - 1);
    return { mechanic: 'choice', prompt: say('Tohle je velké písmeno. Najdi stejné malé písmeno.'), stimulus: { kind: 'text', value: target, big: true, letter: true },
      options: rng.shuffle([target, ...ds]).map(l => ({ id: l, view: { kind: 'text', value: l.toLowerCase(), letter: true } })), answer: target };
  },
  firstSound(p, rng) {
    const pool = WORDS.filter(w => w.first);
    const target = rng.pick(pool);
    const ds = rng.sample(pool.filter(w => w.first !== target.first), p.options - 1);
    return { mechanic: 'choice', prompt: say(`Který obrázek začíná na ${LETTER_SAY[target.first]}?`), stimulus: { kind: 'text', value: target.first, big: true, letter: true },
      options: rng.shuffle([target, ...ds]).map(w => ({ id: w.w, view: emo(w.e), say: w.w.toLowerCase() })), answer: target.w, speakOptions: true };
  },
  firstLetter(p, rng) {
    const pool = WORDS.filter(w => w.first);
    const target = rng.pick(pool);
    let ds = [];
    if (p.hard) { const grp = CONFUSABLE.find(g => g.includes(target.first.toLowerCase())); if (grp) ds = grp.map(x => x.toUpperCase()).filter(x => x !== target.first && ALPHABET.includes(x)); }
    const rest = rng.shuffle(ALPHABET.filter(l => l !== target.first && !ds.includes(l)));
    while (ds.length < p.options - 1) ds.push(rest.pop());
    return { mechanic: 'choice', prompt: say(`Jakým písmenem začíná slovo ${target.w.toLowerCase()}?`), stimulus: { kind: 'emojiWord', emoji: target.e, word: target.w.toLowerCase(), hideWord: true },
      options: rng.shuffle([target.first, ...ds]).map(l => ({ id: l, view: { kind: 'text', value: l, letter: true } })), answer: target.first };
  },
  lastLetter(p, rng) {
    const pool = WORDS.filter(w => w.last);
    const target = rng.pick(pool);
    const ds = rng.sample(ALPHABET.filter(l => l !== target.last && l !== target.first), p.options - 1);
    return { mechanic: 'choice', prompt: say(`Jakou hláskou končí slovo ${target.w.toLowerCase()}? ${target.w.toLowerCase()}…`), stimulus: { kind: 'emojiWord', emoji: target.e, word: target.w.toLowerCase(), hideWord: true },
      options: rng.shuffle([target.last, ...ds]).map(l => ({ id: l, view: { kind: 'text', value: l, letter: true } })), answer: target.last };
  },
  syllables(p, rng) {
    const pool = WORDS.filter(w => w.syl && w.syl <= p.max);
    const target = rng.pick(pool);
    const choices = Array.from({ length: Math.max(3, p.max) }, (_, i) => i + 1);
    return { mechanic: 'choice', prompt: say(`Vytleskej slovo ${target.w.toLowerCase()}. Kolik má slabik?`), stimulus: { kind: 'emojiWord', emoji: target.e, word: target.w.toLowerCase() },
      options: choices.map(v => ({ id: String(v), view: { kind: 'claps', n: v } })), answer: String(target.syl) };
  },
  rhyme(p, rng) {
    const withRh = WORDS.filter(w => w.rh);
    const groups = [...new Set(withRh.map(w => w.rh))].filter(g => withRh.filter(w => w.rh === g).length >= 2);
    const g = rng.pick(groups);
    const [target, ans] = rng.sample(withRh.filter(w => w.rh === g), 2);
    const ds = rng.sample(WORDS.filter(w => w.rh !== g), p.options - 1);
    return { mechanic: 'choice', prompt: say(`Co se rýmuje se slovem ${target.w.toLowerCase()}?`), stimulus: { kind: 'emojiWord', emoji: target.e, word: target.w.toLowerCase() },
      options: rng.shuffle([ans, ...ds]).map(w => ({ id: w.w, view: { kind: 'emojiWord', emoji: w.e, word: w.w.toLowerCase(), small: true }, say: w.w.toLowerCase() })), answer: ans.w, speakOptions: true };
  },
  buildWord(p, rng) {
    const cands = SIMPLE_WORDS.filter(w => w.length <= p.maxLen && w.length >= 2 && byWord(w));
    const w = rng.pick(cands);
    const info = byWord(w);
    const letters = w.split('');
    const extra = rng.sample(ALPHABET.filter(l => !letters.includes(l)), letters.length <= 3 ? 1 : 2);
    return { mechanic: 'build', show: 'Slož slovo.', prompt: say(`Slož slovo ${w.toLowerCase()}. ${letters.map(l => LETTER_SAY[l] || l).join(', ')}.`), stimulus: { kind: 'emojiWord', emoji: info.e, word: w.toLowerCase(), hideWord: true },
      tiles: rng.shuffle([...letters, ...extra]).map((l, i) => ({ id: `t${i}`, letter: l })), answer: letters, repeatable: true };
  },
  readWord(p, rng) {
    const cands = SIMPLE_WORDS.filter(w => w.length <= p.maxLen && byWord(w));
    const w = rng.pick(cands);
    const info = byWord(w);
    const ds = rng.sample(WORDS.filter(x => x.w !== w && x.first !== info.first), p.options - 1);
    return { mechanic: 'choice', prompt: say('Přečti slovo a najdi k němu obrázek.'), stimulus: { kind: 'text', value: w, big: true, letter: true },
      options: rng.shuffle([info, ...ds]).map(x => ({ id: x.w, view: emo(x.e) })), answer: w };
  },
  oddCategory(p, rng) {
    const cats = Object.keys(CATEGORIES).filter(c => WORDS.filter(w => w.cat === c).length >= 4);
    const c = rng.pick(cats);
    const same = rng.sample(WORDS.filter(w => w.cat === c), p.n - 1);
    const odd = rng.pick(WORDS.filter(w => w.cat !== c && w.cat !== 'ostatni' && w.cat !== 'pohadka'));
    return { mechanic: 'choice', prompt: say(`Co sem nepatří? Všechno ostatní jsou ${CATEGORIES[c]}.`), options: rng.shuffle([odd, ...same]).map(w => ({ id: w.w, view: emo(w.e), say: w.w.toLowerCase() })), answer: odd.w, speakOptions: true };
  },
  selectCategory(p, rng) {
    if (p.category === 'zive') {
      const yes = rng.sample(WORDS.filter(w => w.zive), 3), no = rng.sample(WORDS.filter(w => !w.zive && w.cat !== 'priroda'), p.n - 3);
      return { mechanic: 'multi', prompt: say('Vyber všechno, co je živé – co roste, dýchá nebo se hýbe samo.'), options: rng.shuffle([...yes, ...no]).map(w => ({ id: w.w, view: emo(w.e) })), answer: yes.map(w => w.w) };
    }
    const cats = ['zvire', 'jidlo', 'doprava'];
    const c = rng.pick(cats);
    const k = rng.int(2, 3);
    const yes = rng.sample(WORDS.filter(w => w.cat === c), k), no = rng.sample(WORDS.filter(w => w.cat !== c && w.cat !== 'ostatni'), p.n - k);
    return { mechanic: 'multi', prompt: say(`Vyber všechno, co jsou ${CATEGORIES[c]}. Až budeš mít všechno, klikni na fajfku.`), options: rng.shuffle([...yes, ...no]).map(w => ({ id: w.w, view: emo(w.e) })), answer: yes.map(w => w.w) };
  },
  opposites(p, rng) {
    const pair = rng.pick(OPPOSITES);
    const flip = rng.chance(0.5);
    const from = flip ? { e: pair.b, n: pair.bn } : { e: pair.a, n: pair.an };
    const to = flip ? { e: pair.a, n: pair.an } : { e: pair.b, n: pair.bn };
    const ds = rng.sample(OPPOSITES.filter(o => o !== pair).flatMap(o => [o.a, o.b]), p.options - 1);
    return { mechanic: 'choice', prompt: say(`Tohle je ${from.n}. Co je přesně naopak?`), stimulus: emo(from.e, 'big'), options: rng.shuffle([to.e, ...ds]).map(e => ({ id: e, view: emo(e) })), answer: to.e };
  },

  // ─────────── LOGIKA ───────────
  patternNext(p, rng) {
    const useEmoji = rng.chance(0.4);
    const pool = useEmoji ? rng.sample(['🍎', '⭐', '🐟', '🌼', '🚗', '🧸', '🎈', '🍓'], 3) : null;
    const shapes = rng.sample(Object.keys(SHAPES).slice(0, 5), 3), colors = rng.sample(COLORS, 3);
    const sym = (i) => useEmoji ? emo(pool[i]) : { kind: 'shape', shape: shapes[i], color: colors[i].hex };
    let unit, len;
    if (p.type === 'AB') { unit = [0, 1]; len = 6; }
    else if (p.type === 'AAB') { unit = rng.chance(0.5) ? [0, 0, 1] : [0, 1, 1]; len = 7; }
    else if (p.type === 'ABC') { unit = [0, 1, 2]; len = 7; }
    else { // rostoucí: skupiny 1,2,3,…
      const e = useEmoji ? pool[0] : null;
      const groups = [1, 2, 3, 4];
      const items = groups.slice(0, 3).map(n => ({ kind: 'emojiGroup', items: Array(n).fill(e || '⭐'), small: true }));
      const ds = [2, 3, 5].map(n => ({ kind: 'emojiGroup', items: Array(n).fill(e || '⭐'), small: true }));
      return { mechanic: 'choice', prompt: say('Podívej se, jak to roste. Co bude dál?'), stimulus: { kind: 'row', items: [...items, { kind: 'text', value: '?' }] },
        options: rng.shuffle([{ id: 'ok', view: { kind: 'emojiGroup', items: Array(4).fill(e || '⭐'), small: true } }, { id: 'd1', view: ds[0] }, { id: 'd2', view: ds[2] }]), answer: 'ok' };
    }
    const seq = Array.from({ length: len }, (_, i) => unit[i % unit.length]);
    const next = unit[len % unit.length];
    const distract = [0, 1, 2].filter(i => i !== next).slice(0, 2);
    return { mechanic: 'choice', prompt: say('Podívej se na řadu. Co bude dál?'), stimulus: { kind: 'row', items: [...seq.map(sym), { kind: 'text', value: '?' }] },
      options: rng.shuffle([{ id: 'ok', view: sym(next) }, ...distract.map((i, k) => ({ id: `d${k}`, view: sym(i) }))]), answer: 'ok' };
  },
  sortBy(p, rng) {
    const shapes = ['circle', 'square', 'triangle', 'star'];
    const colors = rng.sample(COLORS, 3);
    const items = [];
    for (let i = 0; i < 8; i++) items.push({ shape: rng.pick(shapes), color: rng.pick(colors) });
    let prompt, pred;
    if (p.by === 'color') { const c = rng.pick(colors); items[0] = { shape: rng.pick(shapes), color: c }; items[1] = { shape: rng.pick(shapes), color: c }; prompt = `Vyber všechno, co je ${c.n2}. Pak klikni na fajfku.`; pred = it => it.color === c; }
    else if (p.by === 'shape') { const s = rng.pick(shapes); items[0].shape = s; items[1].shape = s; prompt = `Vyber všechny tvary, které jsou ${SHAPES[s]}. Pak klikni na fajfku.`; pred = it => it.shape === s; }
    else { const s = rng.pick(shapes), c = rng.pick(colors); items[0] = { shape: s, color: c }; items[1] = { shape: s, color: c }; items[2] = { shape: s, color: rng.pick(colors.filter(x => x !== c)) }; items[3] = { shape: rng.pick(shapes.filter(x => x !== s)), color: c }; prompt = `Vyber jen ${c.n2} tvary ${SHAPES[s]}. Pak klikni na fajfku.`; pred = it => it.shape === s && it.color === c; }
    const shuffled = rng.shuffle(items).map((it, i) => ({ id: `i${i}`, it }));
    return { mechanic: 'multi', prompt: say(prompt), options: shuffled.map(o => ({ id: o.id, view: { kind: 'shape', shape: o.it.shape, color: o.it.color.hex } })), answer: shuffled.filter(o => pred(o.it)).map(o => o.id) };
  },
  orderBySize(p, rng) {
    const e = rng.pick(['🐘', '🌳', '🏠', '⭐', '🐟', '🎈', '🍎', '🧸']);
    const sizes = [28, 44, 60, 80, 104].slice(5 - p.n);
    const items = sizes.map((s, i) => ({ id: `s${i}`, view: { kind: 'emoji', value: e, px: s } }));
    return { mechanic: 'order', prompt: say('Klikej od nejmenšího po největší.'), options: rng.shuffle(items), answer: items.map(i => i.id) };
  },
  analogy(p, rng) {
    const a = rng.pick(ANALOGIES);
    const ds = rng.sample(ANALOGY_POOL.filter(x => x !== a.d), p.options - 1);
    return { mechanic: 'choice', prompt: say(a.say), stimulus: { kind: 'analogy', a: a.a, b: a.b, c: a.c }, options: rng.shuffle([a.d, ...ds]).map(e => ({ id: e, view: emo(e) })), answer: a.d };
  },
  orderStory(p, rng) {
    const st = rng.pick(STORIES.filter(s => s.seq.length >= p.n));
    const seq = st.seq.slice(0, p.n);
    const items = seq.map((e, i) => ({ id: `k${i}`, view: emo(e) }));
    return { mechanic: 'order', prompt: say(`${st.say} Klikej na obrázky popořadě: co bylo první, co potom.`), options: rng.shuffle(items), answer: items.map(i => i.id) };
  },
  sudoku(p, rng) {
    const syms = rng.sample(['🍎', '⭐', '🐟', '🌼', '🚗', '🧸', '🎈', '🍓'], 4);
    const base = [[0, 1, 2, 3], [2, 3, 0, 1], [1, 0, 3, 2], [3, 2, 1, 0]];
    const perm = rng.shuffle([0, 1, 2, 3]);
    const rows = rng.shuffle([0, 1]).flatMap(b => rng.shuffle([2 * b, 2 * b + 1]));
    const cols = rng.shuffle([0, 1]).flatMap(b => rng.shuffle([2 * b, 2 * b + 1]));
    const grid = rows.map(r => cols.map(c => perm[base[r][c]]));
    const cells = grid.flat().map((v, i) => ({ i, v }));
    const missing = rng.sample(cells, p.missing).map(c => c.i);
    return { mechanic: 'fill', prompt: say('Doplň obrázky tak, aby v každém řádku i sloupci byl každý obrázek jen jednou.'),
      grid: grid.flat().map((v, i) => ({ sym: syms[v], hidden: missing.includes(i) })), size: 4, palette: syms, answer: Object.fromEntries(missing.map(i => [i, syms[grid.flat()[i]]])) };
  },
  riddle(p, rng) {
    const r = rng.pick(RIDDLES);
    const clues = r.clues.slice(0, p.clues).join(' ');
    const ds = rng.sample(RIDDLE_POOL.filter(x => x !== r.e), p.options - 1);
    return { mechanic: 'choice', prompt: say(`Hádej: ${clues} Co to je?`), show: clues, options: rng.shuffle([r.e, ...ds]).map(e => ({ id: e, view: emo(e) })), answer: r.e, repeatable: true };
  },

  // ─────────── PAMĚŤ A POZORNOST ───────────
  memoryGrid(p, rng) {
    const syms = rng.sample(['🍎', '⭐', '🐟', '🌼', '🚗', '🧸', '🎈', '🍓', '🐸', '🦋', '🍌', '🚂'], p.pairs);
    const cards = rng.shuffle(syms.flatMap(s => [s, s])).map((s, i) => ({ id: `c${i}`, sym: s }));
    return { mechanic: 'memory', prompt: say('Hledej dvojice stejných obrázků. Otáčej vždy dvě karty.'), cards, pairs: p.pairs };
  },
  simon(p, rng) {
    const seq = Array.from({ length: p.len }, () => rng.int(0, 3));
    return { mechanic: 'simon', prompt: say('Dívej se a poslouchej, pak to zopakuj ve stejném pořadí.'), seq };
  },
  goNoGo(p, rng) {
    const target = rng.pick(['🐟', '🐸', '🐥', '🦋']);
    const others = ['🐟', '🐸', '🐥', '🦋', '🐢', '🐌', '🐝', '🐞'].filter(x => x !== target);
    const trials = Array.from({ length: p.trials }, (_, i) => i < Math.round(p.trials * 0.6) ? target : rng.pick(others));
    return { mechanic: 'gonogo', prompt: say(p.reverse ? `Pozor, obráceně: klikni na každé zvířátko, ale když se objeví ${nameOf(target)}, NEklikej!` : `Klikni jen když se objeví ${nameOf(target)}. Na ostatní zvířátka neklikej.`),
      target, trials: rng.shuffle(trials), ms: p.ms, reverse: !!p.reverse };
  },
  whatsMissing(p, rng) {
    const pool = ['🍎', '⭐', '🐟', '🌼', '🚗', '🧸', '🎈', '🍓', '🐸', '🦋', '🍌', '🚂', '🔑', '👟', '🎸'];
    const shown = rng.sample(pool, p.n);
    const gone = rng.pick(shown);
    const after = shown.filter(x => x !== gone);
    const ds = rng.sample(pool.filter(x => !shown.includes(x)), 2);
    return { mechanic: 'flash', flashMs: p.ms, prompt: say('Dobře si prohlédni, co tu je. Pak jedna věc zmizí.'), afterPrompt: 'Co zmizelo?',
      stimulus: { kind: 'row', items: shown.map(e => emo(e)) }, after: { kind: 'row', items: rng.shuffle(after).map(e => emo(e)) },
      options: rng.shuffle([gone, ...ds]).map(e => ({ id: e, view: emo(e) })), answer: gone };
  },
  findSame(p, rng) {
    const shape = rng.pick(['house', 'flag', 'cup', 'arrow']);
    const color = rng.pick(COLORS), color2 = rng.pick(COLORS.filter(c => c !== color));
    const base = { kind: 'figure', shape, color: color.hex, detail: rng.pick(['l', 'r']), dot: rng.pick(['t', 'b']) };
    const variants = [];
    if (p.diff === 'color') variants.push({ ...base, color: color2.hex }, { ...base, color: rng.pick(COLORS.filter(c => c !== color && c !== color2)).hex }, { ...base, color: color2.hex, dot: base.dot === 't' ? 'b' : 't' });
    else if (p.diff === 'detail') variants.push({ ...base, dot: base.dot === 't' ? 'b' : 't' }, { ...base, detail: base.detail === 'l' ? 'r' : 'l', dot: base.dot === 't' ? 'b' : 't' }, { ...base, color: color2.hex });
    else variants.push({ ...base, mirror: true }, { ...base, mirror: true, dot: base.dot === 't' ? 'b' : 't' }, { ...base, rotate: 180 });
    const options = rng.shuffle([{ id: 'ok', view: base }, ...variants.slice(0, p.options - 1).map((v, i) => ({ id: `d${i}`, view: v }))]);
    return { mechanic: 'choice', prompt: say('Najdi obrázek, který je úplně stejný jako ten nahoře.'), stimulus: base, options, answer: 'ok' };
  },

  // ─────────── TVARY A PROSTOR ───────────
  shapePick(p, rng) {
    const set = SHAPE_SETS[p.set];
    const target = rng.pick(set);
    const ds = rng.sample(set.filter(s => s !== target), p.options - 1);
    return { mechanic: 'choice', prompt: say(`Najdi tvar ${SHAPES[target]}.`), show: '🔊', repeatable: true,
      options: rng.shuffle([target, ...ds]).map(s => ({ id: s, view: { kind: 'shape', shape: s, color: rng.pick(COLORS).hex, rotate: p.rotate ? rng.int(0, 359) : 0 } })), answer: target };
  },
  countCorners(p, rng) {
    const s = rng.pick(['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'diamond', 'circle']);
    const n = CORNERS[s];
    const ds = rng.sample([0, 3, 4, 5, 6].filter(x => x !== n), 3);
    return { mechanic: 'choice', prompt: say(`Kolik rohů má tento tvar? Spočítej špičky.`), stimulus: { kind: 'shape', shape: s, color: rng.pick(COLORS).hex, big: true, corners: true },
      options: rng.shuffle([n, ...ds]).map(v => ({ id: String(v), view: num(v) })), answer: String(n) };
  },
  symmetryPick(p, rng) {
    const s = p.size;
    const left = Array.from({ length: s }, () => Array.from({ length: s }, () => rng.chance(0.5) ? 1 : 0));
    if (!left.flat().some(x => x)) left[0][0] = 1;
    const mirror = (half) => half.map(row => row.slice().reverse());
    const right = mirror(left);
    const flipCells = (grid, k) => { const g = grid.map(r => r.slice()); for (let i = 0; i < k; i++) { const r = rng.int(0, s - 1), c = rng.int(0, s - 1); g[r][c] = 1 - g[r][c]; } return g; };
    const dis = [];
    const seen = new Set([JSON.stringify(right)]);
    let guard = 0;
    while (dis.length < p.options - 1 && guard++ < 30) { const d = flipCells(right, rng.int(1, 2)); const key = JSON.stringify(d); if (!seen.has(key)) { seen.add(key); dis.push(d); } }
    const color = rng.pick(COLORS).hex;
    return { mechanic: 'choice', prompt: say('Obrázek má být stejný jako v zrcadle. Která polovina patří napravo?'), stimulus: { kind: 'halfgrid', left, color },
      options: rng.shuffle([{ id: 'ok', view: { kind: 'gridcells', cells: right, color } }, ...dis.map((d, i) => ({ id: `d${i}`, view: { kind: 'gridcells', cells: d, color } }))]), answer: 'ok' };
  },
  positionPick(p, rng) {
    const animals = rng.sample(['🐱', '🐶', '🐰', '🐸', '🐥', '🐢', '🦊', '🐭'], 8);
    const center = rng.pick(['🏠', '🌳', '🪑', '📦']);
    const names = { '🐱': 'kočka', '🐶': 'pes', '🐰': 'zajíc', '🐸': 'žába', '🐥': 'kuře', '🐢': 'želva', '🦊': 'liška', '🐭': 'myš' };
    const centerName = { '🏠': 'domečkem', '🌳': 'stromem', '🪑': 'židlí', '📦': 'krabicí' }[center];
    // pozice v mřížce 3×3 (index 4 = střed)
    const posSets = { vertical: { 1: 'nad', 7: 'pod' }, horizontal: { 3: 'vlevo od', 5: 'vpravo od' }, grid: { 0: 'vlevo nahoře od', 2: 'vpravo nahoře od', 6: 'vlevo dole od', 8: 'vpravo dole od', 1: 'nad', 7: 'pod', 3: 'vlevo od', 5: 'vpravo od' } };
    const set = posSets[p.set];
    const fill = p.set === 'grid' ? [0, 1, 2, 3, 5, 6, 7, 8] : p.set === 'vertical' ? [1, 7, 3, 5] : [3, 5, 1, 7];
    const cells = Array(9).fill(null);
    fill.forEach((pos, i) => cells[pos] = animals[i]);
    cells[4] = center;
    const targetPos = Number(rng.pick(Object.keys(set)));
    const ans = cells[targetPos];
    return { mechanic: 'choice', layout: 'grid3', prompt: say(`Kde je zvířátko, které je ${set[targetPos]} ${centerName}? Klikni na něj.`),
      options: cells.map((e, i) => ({ id: `p${i}`, view: e ? emo(e) : { kind: 'empty' }, disabled: !e || i === 4 })), answer: `p${targetPos}` };
  },
  rotationPick(p, rng) {
    const polys = [[[0, 0], [1, 0], [2, 0], [2, 1]], [[0, 0], [0, 1], [1, 1], [1, 2]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]], [[0, 0], [1, 0], [2, 0], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 2], [1, 0]]];
    const rot = (cells) => norm(cells.map(([x, y]) => [-y, x]));
    const mir = (cells) => norm(cells.map(([x, y]) => [-x, y]));
    function norm(cells) { const mx = Math.min(...cells.map(c => c[0])), my = Math.min(...cells.map(c => c[1])); return cells.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[0] - b[0] || a[1] - b[1]); }
    const key = (c) => JSON.stringify(norm(c));
    const allRot = (c) => { const out = [norm(c)]; for (let i = 0; i < 3; i++) out.push(rot(out[out.length - 1])); return out; };
    const idx = rng.int(0, polys.length - 1);
    const base = norm(polys[idx]);
    const rots = allRot(base);
    const correct = rng.pick(rots.slice(1));
    const color = rng.pick(COLORS).hex;
    const distractors = [];
    const baseKeys = new Set(rots.map(key));
    if (p.mirrorDistractor) { const m = rng.pick(allRot(mir(base))); if (!baseKeys.has(key(m))) distractors.push(m); }
    const others = rng.shuffle(polys.filter((_, i) => i !== idx));
    for (const o of others) { if (distractors.length >= p.options - 1) break; distractors.push(rng.pick(allRot(o))); }
    return { mechanic: 'choice', prompt: say('Který obrázek je ten samý jako nahoře, jen otočený?'), stimulus: { kind: 'poly', cells: base, color },
      options: rng.shuffle([{ id: 'ok', view: { kind: 'poly', cells: correct, color } }, ...distractors.slice(0, p.options - 1).map((d, i) => ({ id: `d${i}`, view: { kind: 'poly', cells: d, color } }))]), answer: 'ok' };
  },
  composePick(p, rng) {
    const comps = [
      { target: 'square', parts: ['tri-l', 'tri-r'], name: 'čtverec' }, { target: 'rectangle', parts: ['sq', 'sq'], name: 'obdélník' }, { target: 'circle', parts: ['semi-l', 'semi-r'], name: 'kruh' },
      { target: 'square', parts: ['rect-v', 'rect-v'], name: 'čtverec' }, { target: 'triangle', parts: ['tri-s', 'tri-s'], name: 'velký trojúhelník' }, { target: 'hexagon', parts: ['trap', 'trap'], name: 'šestiúhelník' },
    ];
    const c = rng.pick(comps);
    const ds = rng.sample(comps.filter(x => x.name !== c.name && JSON.stringify(x.parts) !== JSON.stringify(c.parts)), p.options - 1);
    const color = rng.pick(COLORS).hex;
    return { mechanic: 'choice', prompt: say(`Ze kterých dvou dílů složíš tento tvar – ${c.name}?`), stimulus: { kind: 'shape', shape: c.target, color, big: true },
      options: rng.shuffle([{ id: 'ok', view: { kind: 'parts', parts: c.parts, color } }, ...ds.map((d, i) => ({ id: `d${i}`, view: { kind: 'parts', parts: d.parts, color } }))]), answer: 'ok' };
  },

  // ─────────── SVĚT ───────────
  dayParts(p, rng) {
    const part = rng.pick(DAY_PARTS);
    const act = rng.pick(part.acts);
    return { mechanic: 'choice', prompt: say(`Kdy ${act.say}? Ráno, v poledne, večer, nebo v noci?`), stimulus: emo(act.e, 'big'),
      options: DAY_PARTS.map(d => ({ id: d.id, view: { kind: 'emojiWord', emoji: d.e, word: d.n, small: true }, say: d.n })), answer: part.id, speakOptions: true };
  },
  seasons(p, rng) {
    const s = rng.pick(SEASONS);
    const it = rng.pick(s.items);
    return { mechanic: 'choice', prompt: say(`Ve kterém ročním období ${it.say}?`), stimulus: emo(it.e, 'big'),
      options: SEASONS.map(x => ({ id: x.id, view: { kind: 'emojiWord', emoji: x.e, word: x.n, small: true }, say: x.n })), answer: s.id, speakOptions: true };
  },
  weekdays(p, rng) {
    const items = WEEKDAYS.map((d, i) => ({ id: `d${i}`, view: { kind: 'text', value: d, label: true }, say: d }));
    return { mechanic: 'order', prompt: say('Klikej na dny v týdnu popořadě. Začni pondělím.'), options: rng.shuffle(items), answer: items.map(i => i.id), speakOnTap: true };
  },
  animalHome(p, rng) {
    const a = rng.pick(ANIMAL_HOMES);
    const ds = rng.sample(ANIMAL_HOMES.filter(x => x !== a && x.h !== a.h), 2);
    return { mechanic: 'choice', prompt: say('Kde toto zvíře žije?'), stimulus: emo(a.a, 'big'), options: rng.shuffle([a, ...ds]).map(x => ({ id: x.h, view: emo(x.h), say: x.hn })), answer: a.h, speakOptions: true };
  },
  animalBaby(p, rng) { return generators.animalFood(p, rng); },
  animalFood(p, rng) {
    const a = rng.pick(ANIMAL_FOOD);
    const ds = rng.sample(ANIMAL_FOOD.filter(x => x !== a && x.f !== a.f), 2);
    return { mechanic: 'choice', prompt: say('Co má toto zvíře nejradši k jídlu?'), stimulus: emo(a.a, 'big'), options: rng.shuffle([a, ...ds]).map(x => ({ id: x.f, view: emo(x.f), say: x.fn })), answer: a.f, speakOptions: true };
  },
  clockPick(p, rng) {
    const h = rng.int(1, p.max);
    const ds = numberDistractors(rng, h, p.options - 1, 1, 12, 3);
    return { mechanic: 'choice', prompt: say('Kolik je hodin? Podívej se na malou ručičku.'), stimulus: { kind: 'clock', hour: h },
      options: rng.shuffle([h, ...ds]).map(v => ({ id: String(v), view: num(v) })), answer: String(h) };
  },
};

function nameOf(e) { return { '🐟': 'ryba', '🐸': 'žába', '🐥': 'kuře', '🦋': 'motýl' }[e] || 'zvířátko'; }

export function generateTask(skillDef, levelIdx, rng) {
  const lvl = skillDef.levels[levelIdx];
  const gen = generators[lvl.gen];
  if (!gen) throw new Error(`Chybí generátor ${lvl.gen}`);
  const t = gen(lvl.params || {}, rng);
  return { ...t, skill: skillDef.id, level: levelIdx, gen: lvl.gen };
}
