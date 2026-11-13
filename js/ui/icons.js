// SVG tvary a čárové ikony. Sdílené aplikací i tiskem (tisk používá stroke bez výplně).

function polygonPoints(n, r = 44, cx = 50, cy = 50, rot = -Math.PI / 2) {
  return Array.from({ length: n }, (_, i) => { const a = rot + i * 2 * Math.PI / n; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ');
}
function starPoints() {
  const pts = [];
  for (let i = 0; i < 10; i++) { const r = i % 2 ? 20 : 46; const a = -Math.PI / 2 + i * Math.PI / 5; pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(52 + r * Math.sin(a)).toFixed(1)}`); }
  return pts.join(' ');
}
export const SHAPE_PATHS = {
  circle: () => `<circle cx="50" cy="50" r="44"/>`,
  square: () => `<rect x="8" y="8" width="84" height="84"/>`,
  rectangle: () => `<rect x="4" y="22" width="92" height="56"/>`,
  triangle: () => `<polygon points="50,8 94,90 6,90"/>`,
  oval: () => `<ellipse cx="50" cy="50" rx="46" ry="30"/>`,
  star: () => `<polygon points="${starPoints()}"/>`,
  heart: () => `<path d="M50 88 L14 52 C2 38 10 14 32 14 C42 14 48 20 50 26 C52 20 58 14 68 14 C90 14 98 38 86 52 Z"/>`,
  diamond: () => `<polygon points="50,6 90,50 50,94 10,50"/>`,
  hexagon: () => `<polygon points="${polygonPoints(6, 44, 50, 50, 0)}"/>`,
  pentagon: () => `<polygon points="${polygonPoints(5)}"/>`,
};

/** Barevný tvar pro obrazovku (fill) nebo obrysový pro tisk (stroke). */
export function shapeSVG(shape, { color = '#1e88e5', size = 90, rotate = 0, outline = false, cls = '' } = {}) {
  const body = (SHAPE_PATHS[shape] || SHAPE_PATHS.circle)();
  const style = outline ? `fill="none" stroke="#000" stroke-width="3"` : `fill="${color}" stroke="rgba(0,0,0,.18)" stroke-width="2"`;
  return `<svg class="shape ${cls}" viewBox="0 0 100 100" width="${size}" height="${size}" style="transform:rotate(${rotate}deg)"><g ${style} stroke-linejoin="round">${body}</g></svg>`;
}

/** Dílky pro skládání tvarů. */
const PARTS = {
  'tri-l': `<polygon points="6,6 6,94 94,94"/>`, 'tri-r': `<polygon points="94,6 94,94 6,6"/>`,
  'sq': `<rect x="20" y="20" width="60" height="60"/>`, 'rect-v': `<rect x="30" y="6" width="40" height="88"/>`,
  'semi-l': `<path d="M50 6 A44 44 0 0 0 50 94 Z"/>`, 'semi-r': `<path d="M50 6 A44 44 0 0 1 50 94 Z"/>`,
  'tri-s': `<polygon points="50,14 90,86 10,86"/>`, 'trap': `<polygon points="28,20 72,20 94,60 6,60"/>`,
};
export function partsSVG(parts, color, size = 60) {
  return `<span class="parts">${parts.map(p => `<svg viewBox="0 0 100 100" width="${size}" height="${size}"><g fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="2">${PARTS[p]}</g></svg>`).join('<span class="plus">+</span>')}</span>`;
}

/** Figurka pro „najdi stejný“: základ + detail vlevo/vpravo + tečka nahoře/dole; volitelně zrcadlo/rotace. */
export function figureSVG(f, size = 90) {
  const { shape, color, detail = 'l', dot = 't', mirror = false, rotate = 0 } = f;
  const dx = detail === 'l' ? 28 : 72, dy = dot === 't' ? 30 : 70;
  let body = '';
  if (shape === 'house') body = `<polygon points="50,8 92,42 8,42" fill="${color}"/><rect x="16" y="42" width="68" height="50" fill="${color}" opacity=".8"/><rect x="${dx - 9}" y="60" width="18" height="32" fill="#5d4037"/><circle cx="${detail === 'l' ? 70 : 30}" cy="${dy}" r="6" fill="#fff"/>`;
  else if (shape === 'flag') body = `<rect x="${detail === 'l' ? 14 : 82}" y="8" width="5" height="84" fill="#5d4037"/><polygon points="${detail === 'l' ? '19,10 80,30 19,50' : '82,10 20,30 82,50'}" fill="${color}"/><circle cx="50" cy="${dy}" r="6" fill="#fff" stroke="#000" stroke-width="1"/>`;
  else if (shape === 'cup') body = `<path d="M20 20 H70 V70 Q70 88 50 88 Q30 88 30 70 Z" fill="${color}" transform="${detail === 'l' ? 'translate(10,0)' : 'translate(-10,0)'}"/><path d="${detail === 'l' ? 'M80 34 Q98 34 98 50 Q98 66 80 66' : 'M20 34 Q2 34 2 50 Q2 66 20 66'}" fill="none" stroke="${color}" stroke-width="7"/><circle cx="50" cy="${dy}" r="6" fill="#fff"/>`;
  else body = `<polygon points="${detail === 'l' ? '10,50 50,15 50,35 90,35 90,65 50,65 50,85' : '90,50 50,15 50,35 10,35 10,65 50,65 50,85'}" fill="${color}"/><circle cx="50" cy="${dy}" r="6" fill="#fff"/>`;
  const t = `${mirror ? 'scaleX(-1) ' : ''}rotate(${rotate}deg)`;
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="transform:${t}">${body}</svg>`;
}

/** Polyomino z buněk. */
export function polySVG(cells, color, size = 90) {
  const mx = Math.max(...cells.map(c => c[0])) + 1, my = Math.max(...cells.map(c => c[1])) + 1;
  const m = Math.max(mx, my, 3), u = 100 / m, ox = (100 - mx * u) / 2, oy = (100 - my * u) / 2;
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">${cells.map(([x, y]) => `<rect x="${ox + x * u + 1}" y="${oy + y * u + 1}" width="${u - 2}" height="${u - 2}" rx="3" fill="${color}" stroke="rgba(0,0,0,.25)"/>`).join('')}</svg>`;
}

/** Mřížka buněk 0/1. */
export function gridSVG(cells, color, size = 90, { outline = false } = {}) {
  const n = cells.length, u = 100 / n;
  let s = '';
  cells.forEach((row, r) => row.forEach((v, c) => { s += `<rect x="${c * u}" y="${r * u}" width="${u}" height="${u}" fill="${v ? color : (outline ? 'none' : '#fff')}" stroke="${outline ? '#000' : '#90a4ae'}" stroke-width="${outline ? 1.2 : 1}"/>`; }));
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" shape-rendering="crispEdges">${s}</svg>`;
}

/** Tečky: náhodně, jako na kostce, desetirámeček. */
export function dotsSVG(n, layout = 'random', size = 160, rng = Math.random) {
  let pts = [];
  if (layout === 'dice' && n <= 6) {
    const D = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[25, 25], [50, 50], [75, 75]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]], 5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]], 6: [[28, 24], [72, 24], [28, 50], [72, 50], [28, 76], [72, 76]] };
    pts = D[n];
  } else {
    let guard = 0;
    while (pts.length < n && guard++ < 500) { const x = 14 + rng() * 72, y = 14 + rng() * 72; if (pts.every(([px, py]) => Math.hypot(px - x, py - y) > 18)) pts.push([x, y]); }
  }
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" class="dots"><rect x="2" y="2" width="96" height="96" rx="12" fill="#fff" stroke="#cfd8dc" stroke-width="2"/>${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.5" fill="#37474f"/>`).join('')}</svg>`;
}
export function tenFrameSVG(n, { total = 10, showMissing = false, size = 260 } = {}) {
  const cols = 5, rows = Math.ceil(total / cols), w = 100, h = 100 * rows / cols;
  let s = '';
  for (let i = 0; i < total; i++) { const c = i % cols, r = Math.floor(i / cols); s += `<rect x="${c * 20 + 1}" y="${r * 20 + 1}" width="18" height="18" fill="${i < n ? '#ef5350' : (showMissing ? '#ffe082' : '#fff')}" stroke="#37474f" stroke-width="1.2"/>`; if (i < n) s += `<circle cx="${c * 20 + 10}" cy="${r * 20 + 10}" r="6.5" fill="#b71c1c"/>`; else if (showMissing) s += `<text x="${c * 20 + 10}" y="${r * 20 + 14}" text-anchor="middle" font-size="11" fill="#8d6e63">?</text>`; }
  return `<svg viewBox="0 0 ${w} ${h}" width="${size}" height="${size * h / w}" class="tenframe">${s}</svg>`;
}
export function clockSVG(hour, minute = 0, size = 180, outline = false) {
  const nums = Array.from({ length: 12 }, (_, i) => { const a = (i + 1) * Math.PI / 6 - Math.PI / 2; return `<text x="${50 + 36 * Math.cos(a)}" y="${50 + 36 * Math.sin(a) + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#263238">${i + 1}</text>`; }).join('');
  const ha = (hour % 12 + minute / 60) * Math.PI / 6 - Math.PI / 2, ma = minute * Math.PI / 30 - Math.PI / 2;
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}"><circle cx="50" cy="50" r="47" fill="${outline ? 'none' : '#fff'}" stroke="#263238" stroke-width="3"/>${nums}<line x1="50" y1="50" x2="${50 + 22 * Math.cos(ha)}" y2="${50 + 22 * Math.sin(ha)}" stroke="#263238" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="50" x2="${50 + 32 * Math.cos(ma)}" y2="${50 + 32 * Math.sin(ma)}" stroke="#e53935" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="3" fill="#263238"/></svg>`;
}

/** Čárové ikony pro černobílý tisk (viewBox 0 0 100 100, jen stroke). */
export const LINE_ICONS = {
  apple: `<path d="M50 30 C30 18 12 34 16 58 C20 80 34 92 50 86 C66 92 80 80 84 58 C88 34 70 18 50 30 Z"/><path d="M50 30 C52 20 58 14 66 12"/><path d="M50 30 C44 26 40 22 40 16"/>`,
  star: `<polygon points="${starPoints()}"/>`,
  heart: SHAPE_PATHS.heart(),
  fish: `<path d="M14 50 C30 24 60 22 80 50 C60 78 30 76 14 50 Z"/><path d="M80 50 L96 34 L94 66 Z"/><circle cx="30" cy="46" r="3"/><path d="M50 32 L58 50 L50 68"/>`,
  car: `<path d="M8 62 L8 50 L24 46 L36 30 L68 30 L82 46 L92 50 L92 62 Z"/><circle cx="28" cy="66" r="9"/><circle cx="72" cy="66" r="9"/><path d="M40 32 L40 46 M62 32 L62 46"/>`,
  house: `<polygon points="50,10 90,44 10,44"/><rect x="18" y="44" width="64" height="46"/><rect x="42" y="62" width="16" height="28"/><rect x="24" y="52" width="12" height="12"/><rect x="64" y="52" width="12" height="12"/>`,
  tree: `<path d="M50 8 L74 42 L62 42 L82 70 L18 70 L38 42 L26 42 Z"/><rect x="44" y="70" width="12" height="20"/>`,
  sun: `<circle cx="50" cy="50" r="20"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<line x1="${50 + 28 * Math.cos(a)}" y1="${50 + 28 * Math.sin(a)}" x2="${50 + 42 * Math.cos(a)}" y2="${50 + 42 * Math.sin(a)}"/>`; }).join('')}`,
  flower: `<circle cx="50" cy="40" r="9"/>${Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return `<ellipse cx="${50 + 18 * Math.cos(a)}" cy="${40 + 18 * Math.sin(a)}" rx="8" ry="12" transform="rotate(${i * 60 + 90} ${50 + 18 * Math.cos(a)} ${40 + 18 * Math.sin(a)})"/>`; }).join('')}<path d="M50 60 L50 92"/><path d="M50 78 C40 72 36 76 34 84 M50 70 C60 64 64 68 66 76"/>`,
  balloon: `<ellipse cx="50" cy="38" rx="26" ry="32"/><path d="M50 70 L46 76 L54 76 Z"/><path d="M50 76 C44 86 56 90 50 96"/>`,
  boat: `<path d="M10 62 L90 62 L78 82 L22 82 Z"/><path d="M50 10 L50 62 M50 14 L80 50 L50 50 Z M50 20 L26 50 L50 50 Z"/>`,
  cup: `<path d="M22 24 H70 V66 Q70 86 46 86 Q22 86 22 66 Z"/><path d="M70 36 Q92 36 92 50 Q92 64 70 64"/>`,
  ball: `<circle cx="50" cy="50" r="42"/><path d="M50 8 C30 30 30 70 50 92 M50 8 C70 30 70 70 50 92 M8 50 H92"/>`,
  umbrella: `<path d="M8 52 C8 26 30 10 50 10 C70 10 92 26 92 52 Q82 42 72 52 Q61 42 50 52 Q39 42 28 52 Q18 42 8 52 Z"/><path d="M50 52 L50 86 Q50 94 58 94"/>`,
  cat: `<circle cx="50" cy="56" r="30"/><path d="M28 36 L22 10 L44 28 M72 36 L78 10 L56 28"/><circle cx="40" cy="52" r="3"/><circle cx="60" cy="52" r="3"/><path d="M46 64 L50 68 L54 64 M50 68 L50 74 M30 66 L14 62 M30 70 L14 72 M70 66 L86 62 M70 70 L86 72"/>`,
  key: `<circle cx="30" cy="50" r="16"/><path d="M46 50 H92 M78 50 V62 M66 50 V60"/>`,
  mushroom: `<path d="M12 50 C12 24 30 10 50 10 C70 10 88 24 88 50 Z"/><path d="M38 50 L36 86 Q50 92 64 86 L62 50"/><circle cx="34" cy="32" r="5"/><circle cx="56" cy="24" r="5"/><circle cx="70" cy="40" r="4"/>`,
  butterfly: `<path d="M50 30 C30 6 6 18 14 40 C6 60 26 74 50 56 C74 74 94 60 86 40 C94 18 70 6 50 30 Z"/><path d="M50 26 L50 64 M50 26 L40 12 M50 26 L60 12"/>`,
  snail: `<circle cx="40" cy="56" r="22"/><circle cx="40" cy="56" r="12"/><path d="M18 78 H88 C94 78 94 68 88 66 L72 66 L78 40 M72 66 L62 36"/>`,
};
export const LINE_ICON_NAMES = Object.keys(LINE_ICONS);
export function lineIconSVG(name, size = 40, stroke = 2.5) {
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" class="licon"><g fill="none" stroke="#000" stroke-width="${stroke}" stroke-linejoin="round" stroke-linecap="round">${LINE_ICONS[name] || LINE_ICONS.star}</g></svg>`;
}
