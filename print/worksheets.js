// Generátory pracovních listů (SVG v mm, A4 na výšku, černobílé).
import { LINE_ICONS, LINE_ICON_NAMES, SHAPE_PATHS } from '../js/ui/icons.js';
import { makeRng } from '../js/engine/rng.js';
import { ALPHABET } from '../js/data/words.js';

const W = 180, H = 236; // využitelná plocha v mm
const ICON_WORDS = { apple: 'JABLKO', star: 'HVĚZDA', heart: 'SRDCE', fish: 'RYBA', car: 'AUTO', house: 'DŮM', tree: 'STROM', sun: 'SLUNCE', flower: 'KVĚTINA', balloon: 'BALÓN', boat: 'LOĎ', cup: 'HRNEK', ball: 'MÍČ', umbrella: 'DEŠTNÍK', cat: 'KOČKA', key: 'KLÍČ', mushroom: 'HOUBA', butterfly: 'MOTÝL', snail: 'ŠNEK' };
const ICON_CATS = { zvirata: ['fish', 'cat', 'butterfly', 'snail'], priroda: ['tree', 'sun', 'flower', 'mushroom'], doprava: ['car', 'boat'], veci: ['cup', 'ball', 'umbrella', 'key', 'balloon', 'house'] };
const icon = (name, x, y, s, sw = 2.5) => `<g transform="translate(${x},${y}) scale(${s / 100})"><g fill="none" stroke="#000" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round">${LINE_ICONS[name]}</g></g>`;
const shape = (name, x, y, s, fill = 'none') => `<g transform="translate(${x},${y}) scale(${s / 100})"><g fill="${fill}" stroke="#000" stroke-width="3" stroke-linejoin="round">${SHAPE_PATHS[name]()}</g></g>`;
const txt = (x, y, t, size = 6, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" font-family="Arial, Helvetica, sans-serif" font-weight="700" ${extra}>${t}</text>`;
const box = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#000" stroke-width=".5" rx="1.5" ${extra}/>`;
const svg = (body) => `<svg class="ws" viewBox="0 0 ${W} ${H}" width="${W}mm" height="${H}mm" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

// Spojovačka: obrys obrázku převzorkovaný na n bodů.
const OUTLINES = {
  hvezda: () => Array.from({ length: 10 }, (_, i) => { const r = i % 2 ? 32 : 70; const a = -Math.PI / 2 + i * Math.PI / 5; return [90 + r * Math.cos(a), 110 + r * Math.sin(a)]; }),
  domek: () => [[90, 30], [150, 80], [135, 80], [135, 170], [105, 170], [105, 130], [75, 130], [75, 170], [45, 170], [45, 80], [30, 80]],
  ryba: () => [[20, 110], [45, 70], [90, 55], [130, 70], [150, 90], [170, 70], [165, 110], [170, 150], [150, 130], [130, 150], [90, 165], [45, 150]],
  raketa: () => [[90, 25], [112, 60], [118, 110], [140, 150], [140, 175], [112, 160], [100, 185], [80, 185], [68, 160], [40, 175], [40, 150], [62, 110], [68, 60]],
  lod: () => [[20, 140], [160, 140], [140, 175], [40, 175], [20, 140], [90, 140], [90, 40], [140, 120], [90, 120]],
  srdce: () => { const pts = []; for (let i = 0; i < 24; i++) { const t = i / 24 * 2 * Math.PI; pts.push([90 + 16 * Math.pow(Math.sin(t), 3) * 4, 100 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 4]); } return pts; },
};
function resample(poly, n) {
  const pts = poly.concat([poly[0]]);
  const segs = []; let total = 0;
  for (let i = 0; i < pts.length - 1; i++) { const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); segs.push(d); total += d; }
  const out = []; let want = 0, acc = 0, si = 0;
  for (let k = 0; k < n; k++) { want = k * total / n; while (si < segs.length - 1 && acc + segs[si] < want) { acc += segs[si]; si++; } const t = segs[si] ? (want - acc) / segs[si] : 0; out.push([pts[si][0] + (pts[si + 1][0] - pts[si][0]) * t, pts[si][1] + (pts[si + 1][1] - pts[si][1]) * t]); }
  return out;
}

export const WORKSHEETS = {
  spojovacka: { name: 'Spojovačka čísel', skill: 'spojovacka', gen(p, rng) {
    const name = rng.pick(Object.keys(OUTLINES)); const n = p.n || 10;
    const pts = resample(OUTLINES[name](), n);
    const body = pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#000"/>` + txt(x + 2.5, y - 2, i + 1, 5.5)).join('');
    return { instr: `Spoj body od 1 do ${n} popořadě. Co vzniklo?`, parent: 'Dítě říká čísla nahlas, při zaseknutí napovězte „co je po …?“.', svg: svg(body + `<rect x="10" y="195" width="160" height="32" fill="none" stroke="#000" stroke-width=".4" stroke-dasharray="2,2"/>` + txt(14, 203, 'Vznikl: ______________________', 6)) };
  } },
  pocitej: { name: 'Spočítej a napiš', skill: 'pocitani', gen(p, rng) {
    const max = p.max || 8; let body = '';
    for (let r = 0; r < 6; r++) { const n = rng.int(Math.max(1, max - 6), max), ic = rng.pick(LINE_ICON_NAMES); const y = 8 + r * 37; const cols = n > 6 ? Math.ceil(n / 2) : n; for (let i = 0; i < n; i++) body += icon(ic, 6 + (i % cols) * 17, y + Math.floor(i / cols) * 16, 15); body += box(150, y + 4, 24, 24) + txt(146, y + 30, '', 4); }
    return { instr: 'Spočítej obrázky v řádku a do rámečku napiš číslo.', parent: 'Pokud číslici ještě nepíše, napište ji tečkovaně a nechte obtáhnout.', svg: svg(body) };
  } },
  scitani: { name: 'Sčítání s obrázky', skill: 'scitani', gen(p, rng) {
    const max = p.max || 5; let body = '';
    for (let i = 0; i < 8; i++) { const a = rng.int(1, max - 1), b = rng.int(1, max - a); const col = i % 2, row = Math.floor(i / 2); const x0 = col * 90, y = 10 + row * 56; const ic = rng.pick(LINE_ICON_NAMES);
      if (p.pictures) { for (let k = 0; k < a; k++) body += icon(ic, x0 + 4 + k * 11, y, 10, 3); for (let k = 0; k < b; k++) body += icon(ic, x0 + 4 + (a + 1) * 11 + k * 11, y, 10, 3); body += txt(x0 + 4 + a * 11 + 2, y + 8, '+', 8); }
      body += txt(x0 + 10, y + 32, `${a} + ${b} =`, 11) + box(x0 + 52, y + 18, 20, 20); }
    return { instr: 'Spočítej a napiš výsledek.', parent: 'Nechte dítě říct nahlas, jak na to přišlo („počítal jsem dál od čtyř“).', svg: svg(body) };
  } },
  domecky: { name: 'Rozklady čísel (domečky)', skill: 'rozklad', gen(p, rng) {
    const totals = p.totals || [5, 6]; let body = '';
    totals.slice(0, 4).forEach((t, i) => { const x = 10 + (i % 2) * 90, y = 10 + Math.floor(i / 2) * 112; body += `<polygon points="${x + 35},${y} ${x + 70},${y + 22} ${x},${y + 22}" fill="none" stroke="#000" stroke-width=".7"/>` + txt(x + 31, y + 18, t, 9);
      const parts = rng.shuffle(Array.from({ length: t + 1 }, (_, k) => k)).slice(0, 5);
      parts.forEach((a, r) => { const yy = y + 22 + r * 16; body += box(x, yy, 35, 16) + box(x + 35, yy, 35, 16); const left = rng.chance(0.5); body += txt(x + (left ? 14 : 49), yy + 12, a, 8); }); });
    return { instr: 'Do každého patra domečku doplň číslo tak, aby obě čísla dohromady dala číslo na střeše.', parent: 'Rozklad čísla je klíč ke sčítání zpaměti. Pomůžou knoflíky: 5 knoflíků, část schovat.', svg: svg(body) };
  } },
  rada: { name: 'Doplň číselnou řadu', skill: 'rada', gen(p, rng) {
    const max = p.max || 20; let body = '';
    for (let r = 0; r < 7; r++) { const start = rng.int(1, Math.max(1, max - 8)); const blanks = rng.sample([1, 2, 3, 4, 5, 6], 2); const y = 10 + r * 31; for (let k = 0; k < 8; k++) { const x = 2 + k * 22; body += box(x, y, 20, 18); if (!blanks.includes(k)) body += txt(x + (start + k > 9 ? 4 : 7), y + 13, start + k, 8); } }
    return { instr: 'Doplň čísla, která v řadě chybí.', parent: 'Zkuste i pozpátku: „co je před …?“', svg: svg(body) };
  } },
  porovnej: { name: 'Kde je víc', skill: 'porovnani', gen(p, rng) {
    const max = p.max || 6; let body = '';
    for (let r = 0; r < 6; r++) { let a = rng.int(1, max), b = rng.int(1, max); if (a === b) b = a === max ? a - 1 : a + 1; const y = 8 + r * 38; const ic = rng.pick(LINE_ICON_NAMES), ic2 = rng.pick(LINE_ICON_NAMES.filter(x => x !== ic)); [[a, ic, 0], [b, ic2, 92]].forEach(([n, ic, x0]) => { body += `<rect x="${x0 + 2}" y="${y}" width="84" height="34" rx="4" fill="none" stroke="#999" stroke-width=".4"/>`; for (let i = 0; i < n; i++) body += icon(ic, x0 + 5 + (i % 5) * 16, y + 2 + Math.floor(i / 5) * 16, 14); }); }
    return { instr: 'Zakroužkuj rámeček, kde je víc obrázků.', parent: 'Zeptejte se také „o kolik víc?“', svg: svg(body) };
  } },
  najdipismeno: { name: 'Najdi písmeno', skill: 'velka', gen(p, rng) {
    const target = rng.pick(ALPHABET.filter(l => l.length === 1 && !'ČŘŠŽ'.includes(l))); const lower = !!p.lower; let body = '';
    const cols = 9, rows = 9; const cells = cols * rows; const targetIdx = new Set(rng.sample(Array.from({ length: cells }, (_, i) => i), 9));
    body += txt(5, 12, `Hledej písmeno: ${lower ? target.toLowerCase() : target}`, 8);
    for (let i = 0; i < cells; i++) { const c = i % cols, r = Math.floor(i / cols); const l = targetIdx.has(i) ? target : rng.pick(ALPHABET.filter(x => x !== target)); body += txt(10 + c * 19, 32 + r * 22, lower ? l.toLowerCase() : l, 11, 'font-weight="400"'); }
    return { instr: `Najdi a zakroužkuj všechna písmena ${lower ? target.toLowerCase() : target}. Kolik jich je?`, parent: `Správně: 9. Trénuje zrakové vyhledávání a pozornost.`, svg: svg(body + box(130, 215, 40, 16) + txt(100, 227, 'Počet:', 7)) };
  } },
  obtah: { name: 'Obtahování číslic a písmen', skill: 'obtah', gen(p, rng) {
    const set = p.set === 'letters' ? rng.sample(ALPHABET.filter(l => !'ČŘŠŽ'.includes(l)), 7) : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].slice(0, 7); let body = '';
    set.forEach((ch, r) => { const y = 30 + r * 31; body += `<line x1="2" y1="${y + 2}" x2="178" y2="${y + 2}" stroke="#bbb" stroke-width=".3"/><line x1="2" y1="${y - 22}" x2="178" y2="${y - 22}" stroke="#bbb" stroke-width=".3" stroke-dasharray="1,1"/>`; body += txt(6, y, ch, 24); for (let k = 1; k <= 6; k++) body += `<text x="${6 + k * 26}" y="${y}" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="none" stroke="#777" stroke-width=".45" stroke-dasharray="1.2,1">${ch}</text>`; });
    return { instr: 'Obtáhni tečkované znaky. Začínej nahoře.', parent: 'Správný úchop tužky (tři prsty) je důležitější než přesnost. 5 minut stačí.', svg: svg(body) };
  } },
  prvnihlaska: { name: 'První hláska', skill: 'hlaska', gen(p, rng) {
    const cand = rng.shuffle(LINE_ICON_NAMES.filter(n => ICON_WORDS[n] && !'ČŠŽ'.includes(ICON_WORDS[n][0]))); const names = []; const used = new Set(); for (const n of cand) { const l = ICON_WORDS[n][0]; if (!used.has(l)) { used.add(l); names.push(n); } if (names.length === 6) break; } let body = '';
    const letters = rng.shuffle(names.map(n => ICON_WORDS[n][0]));
    names.forEach((n, i) => { const y = 10 + i * 37; body += icon(n, 10, y, 30) + txt(45, y + 20, ICON_WORDS[n], 5, 'fill="#777" font-weight="400"'); });
    letters.forEach((l, i) => { const y = 10 + i * 37; body += `<circle cx="150" cy="${y + 15}" r="12" fill="none" stroke="#000" stroke-width=".6"/>` + txt(l.length > 1 ? 142 : 145.5, y + 20, l, 13); });
    return { instr: 'Spoj čarou obrázek s písmenem, kterým začíná.', parent: 'Vyslovte slovo pomalu a protáhněte první hlásku: „Mmmíč“.', svg: svg(body) };
  } },
  vzory: { name: 'Pokračuj ve vzoru', skill: 'vzory', gen(p, rng) {
    const shapesAll = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond']; let body = '';
    for (let r = 0; r < 7; r++) { const y = 8 + r * 32; const t = r < 2 ? 'AB' : r < 4 ? 'AAB' : r < 6 ? 'ABC' : (p.type || 'ABC'); const sh = rng.sample(shapesAll, 3); const unit = t === 'AB' ? [0, 1] : t === 'AAB' ? (rng.chance(0.5) ? [0, 0, 1] : [0, 1, 1]) : [0, 1, 2]; for (let k = 0; k < 9; k++) { const x = 2 + k * 19.5; if (k < 6) body += shape(sh[unit[k % unit.length]], x, y, 17); else body += box(x + 1, y + 1, 15, 15, 'stroke-dasharray="1.5,1.5"'); } }
    return { instr: 'Podívej se, jak se tvary střídají, a do prázdných rámečků nakresli, co bude dál.', parent: 'Nechte dítě vzor nejdřív „přečíst“ nahlas: kruh, čtverec, kruh…', svg: svg(body) };
  } },
  labyrint: { name: 'Labyrint', skill: 'labyrint', gen(p, rng) {
    const n = p.size || 8; const cell = Math.min(160 / n, 20); const ox = (W - n * cell) / 2, oy = 12;
    const vis = Array.from({ length: n }, () => Array(n).fill(false)); const walls = Array.from({ length: n }, () => Array.from({ length: n }, () => ({ t: true, r: true, b: true, l: true })));
    const stack = [[0, 0]]; vis[0][0] = true;
    while (stack.length) { const [x, y] = stack[stack.length - 1]; const nb = [[x, y - 1, 't', 'b'], [x + 1, y, 'r', 'l'], [x, y + 1, 'b', 't'], [x - 1, y, 'l', 'r']].filter(([a, b]) => a >= 0 && b >= 0 && a < n && b < n && !vis[b][a]); if (!nb.length) { stack.pop(); continue; } const [nx, ny, w1, w2] = rng.pick(nb); walls[y][x][w1] = false; walls[ny][nx][w2] = false; vis[ny][nx] = true; stack.push([nx, ny]); }
    let body = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const w = walls[y][x], X = ox + x * cell, Y = oy + y * cell; if (w.t) body += `<line x1="${X}" y1="${Y}" x2="${X + cell}" y2="${Y}"/>`; if (w.l) body += `<line x1="${X}" y1="${Y}" x2="${X}" y2="${Y + cell}"/>`; if (w.r && x === n - 1) body += `<line x1="${X + cell}" y1="${Y}" x2="${X + cell}" y2="${Y + cell}"/>`; if (w.b && y === n - 1) body += `<line x1="${X}" y1="${Y + cell}" x2="${X + cell}" y2="${Y + cell}"/>`; }
    body = `<g stroke="#000" stroke-width="1" stroke-linecap="round">${body}</g>` + icon('cat', ox + 2, oy + 2, cell - 4) + icon('house', ox + (n - 1) * cell + 2, oy + (n - 1) * cell + 2, cell - 4);
    // vstup a výstup
    body += `<rect x="${ox - 1}" y="${oy + cell * 0.25}" width="2" height="${cell * 0.5}" fill="#fff"/><rect x="${ox + n * cell - 1}" y="${oy + (n - 1) * cell + cell * 0.25}" width="2" height="${cell * 0.5}" fill="#fff"/>`;
    return { instr: 'Pomoz kočce najít cestu domů. Kresli jednou čarou, nepřecházej přes zdi.', parent: 'Nejdřív nechte dítě cestu najít prstem, pak až tužkou.', svg: svg(body) };
  } },
  cary: { name: 'Čáry a vlnovky', skill: 'cary', gen(p, rng) {
    let body = ''; const kinds = p.kind === 'loops' ? ['loop', 'arch', 'zig', 'loop', 'wave', 'arch'] : ['line', 'wave', 'zig', 'line', 'wave', 'arch'];
    kinds.forEach((k, r) => { const y = 20 + r * 36; const a = rng.pick(LINE_ICON_NAMES), b = rng.pick(LINE_ICON_NAMES); body += icon(a, 2, y - 9, 18) + icon(b, 160, y - 9, 18);
      let d = `M24 ${y}`; const x1 = 158;
      if (k === 'line') d += ` L${x1} ${y}`;
      else if (k === 'wave') { for (let x = 24; x < x1; x += 16) d += ` q8 -14 16 0`; }
      else if (k === 'zig') { for (let x = 24; x < x1; x += 16) d += ` l8 -12 l8 12`; }
      else if (k === 'arch') { for (let x = 24; x < x1; x += 20) d += ` a10 10 0 0 1 20 0`; }
      else { for (let x = 24; x < x1; x += 14) d += ` c -6 -14 10 -14 4 0`; }
      body += `<path d="${d}" fill="none" stroke="#888" stroke-width=".6" stroke-dasharray="1.5,1.5"/>`; });
    return { instr: 'Jeď tužkou po tečkované čáře zleva doprava, od obrázku k obrázku. Nezastavuj.', parent: 'Uvolňovací cviky: nejdřív velké pohyby ve vzduchu, pak papír. Tužka drží volně.', svg: svg(body) };
  } },
  mrizka: { name: 'Dokresli zrcadlově', skill: 'mrizka', gen(p, rng) {
    const n = p.size || 4; const cell = 14; let body = '';
    for (let k = 0; k < 2; k++) { const oy = 10 + k * 112, ox = (W - 2 * n * cell) / 2; const left = Array.from({ length: n }, () => Array.from({ length: n }, () => rng.chance(0.45) ? 1 : 0)); left[0][n - 1] = 1;
      for (let r = 0; r < n; r++) for (let c = 0; c < 2 * n; c++) { const v = c < n ? left[r][c] : 0; body += `<rect x="${ox + c * cell}" y="${oy + r * cell}" width="${cell}" height="${cell}" fill="${v ? '#000' : 'none'}" stroke="#000" stroke-width=".4"/>`; }
      body += `<line x1="${ox + n * cell}" y1="${oy - 3}" x2="${ox + n * cell}" y2="${oy + n * cell + 3}" stroke="#000" stroke-width="1.2"/>`; }
    return { instr: 'Vybarvi políčka napravo tak, aby obrázek vypadal jako v zrcadle.', parent: 'Pomůže přiložit skutečné zrcátko k silné čáře.', svg: svg(body) };
  } },
  sudoku: { name: 'Obrázkové sudoku', skill: 'sudoku', gen(p, rng) {
    let body = ''; const base = [[0, 1, 2, 3], [2, 3, 0, 1], [1, 0, 3, 2], [3, 2, 1, 0]];
    for (let k = 0; k < 2; k++) { const syms = rng.sample(LINE_ICON_NAMES, 4); const perm = rng.shuffle([0, 1, 2, 3]); const rows = rng.shuffle([0, 1]).flatMap(b => rng.shuffle([2 * b, 2 * b + 1])); const cols = rng.shuffle([0, 1]).flatMap(b => rng.shuffle([2 * b, 2 * b + 1])); const grid = rows.map(r => cols.map(c => perm[base[r][c]])); const missing = new Set(rng.sample(Array.from({ length: 16 }, (_, i) => i), p.missing || 4)); const cell = 24, ox = (W - 4 * cell) / 2, oy = 8 + k * 118;
      for (let i = 0; i < 16; i++) { const r = Math.floor(i / 4), c = i % 4, X = ox + c * cell, Y = oy + r * cell; body += `<rect x="${X}" y="${Y}" width="${cell}" height="${cell}" fill="none" stroke="#000" stroke-width="${0.4}"/>`; if (!missing.has(i)) body += icon(syms[grid[r][c]], X + 3, Y + 3, cell - 6); }
      body += `<rect x="${ox}" y="${oy}" width="${4 * cell}" height="${4 * cell}" fill="none" stroke="#000" stroke-width="1.2"/><line x1="${ox + 2 * cell}" y1="${oy}" x2="${ox + 2 * cell}" y2="${oy + 4 * cell}" stroke="#000" stroke-width="1.2"/><line x1="${ox}" y1="${oy + 2 * cell}" x2="${ox + 4 * cell}" y2="${oy + 2 * cell}" stroke="#000" stroke-width="1.2"/>`;
      syms.forEach((s, i) => body += icon(s, ox + 4 * cell + 8, oy + i * 22, 16)); }
    return { instr: 'Dokresli obrázky tak, aby v každém řádku, sloupci i čtverci 2×2 byl každý obrázek jen jednou.', parent: 'Vpravo je nápověda, které čtyři obrázky patří do mřížky.', svg: svg(body) };
  } },
  conepatri: { name: 'Co nepatří', skill: 'slovnik', gen(p, rng) {
    let body = ''; const cats = Object.keys(ICON_CATS).filter(c => ICON_CATS[c].length >= 3);
    for (let r = 0; r < 6; r++) { const c = rng.pick(cats); const same = rng.sample(ICON_CATS[c], 3); const odd = rng.pick(ICON_CATS[rng.pick(cats.filter(x => x !== c))]); const items = rng.shuffle([...same, odd]); const y = 8 + r * 38; items.forEach((ic, i) => { body += `<rect x="${6 + i * 43}" y="${y}" width="36" height="34" rx="3" fill="none" stroke="#999" stroke-width=".3"/>` + icon(ic, 10 + i * 43, y + 2, 28); }); }
    return { instr: 'V každém řádku zakroužkuj obrázek, který mezi ostatní nepatří.', parent: 'Ptejte se „proč?“ – zdůvodnění je důležitější než správná odpověď.', svg: svg(body) };
  } },
};

export function buildWorksheet(type, params = {}, seed = Date.now(), child = '') {
  const def = WORKSHEETS[type]; if (!def) return null;
  const rng = makeRng(seed);
  const w = def.gen(params, rng);
  const date = new Date().toLocaleDateString('cs-CZ');
  return `<section class="page">
    <header class="ws-head"><div><h2>${def.name}</h2><p class="instr">${w.instr}</p></div><div class="meta"><div>Jméno: <b>${child || '____________'}</b></div><div>Datum: ${date}</div><div class="code">Školička · ${type} · #${String(seed).slice(-5)}</div></div></header>
    ${w.svg}
    <footer class="ws-foot"><span class="parent">Pro rodiče: ${w.parent}</span><span class="eval">☐ zvládl sám &nbsp; ☐ s pomocí &nbsp; ☐ bylo to těžké</span></footer>
  </section>`;
}
