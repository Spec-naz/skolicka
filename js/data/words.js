// Česká slovní banka. Pole: w = slovo, e = emoji, syl = počet slabik (null = nejednoznačné, do slabikování nepatří),
// cat = kategorie, first = první písmeno (null = nevhodné pro úkol s první hláskou, např. CH),
// last = poslední hláska tak, jak se vysloví (null = koncová spodoba znělosti nebo měkká souhláska → do úkolu nepatří),
// rh = skupina rýmu, zive = živé/neživé.
export const WORDS = [
  { w: 'AUTO', e: '🚗', syl: 2, cat: 'doprava', first: 'A', last: 'O' },
  { w: 'AUTOBUS', e: '🚌', syl: 3, cat: 'doprava', first: 'A', last: 'S' },
  { w: 'BALÓN', e: '🎈', syl: 2, cat: 'veci', first: 'B', last: 'N' },
  { w: 'BANÁN', e: '🍌', syl: 2, cat: 'jidlo', first: 'B', last: 'N' },
  { w: 'BOTA', e: '👟', syl: 2, cat: 'obleceni', first: 'B', last: 'A' },
  { w: 'BUBEN', e: '🥁', syl: 2, cat: 'veci', first: 'B', last: 'N' },
  { w: 'CIBULE', e: '🧅', syl: 3, cat: 'jidlo', first: 'C', last: 'E' },
  { w: 'CITRON', e: '🍋', syl: 2, cat: 'jidlo', first: 'C', last: 'N' },
  { w: 'ČEPICE', e: '🧢', syl: 3, cat: 'obleceni', first: 'Č', last: 'E' },
  { w: 'DÁREK', e: '🎁', syl: 2, cat: 'veci', first: 'D', last: 'K' },
  { w: 'DEŠTNÍK', e: '☂️', syl: 2, cat: 'veci', first: 'D', last: 'K' },
  { w: 'DORT', e: '🎂', syl: 1, cat: 'jidlo', first: 'D', last: 'T' },
  { w: 'DRAK', e: '🐉', syl: 1, cat: 'pohadka', first: 'D', last: 'K', rh: 'ak' },
  { w: 'DŮM', e: '🏠', syl: 1, cat: 'veci', first: 'D', last: 'M' },
  { w: 'DÝNĚ', e: '🎃', syl: 2, cat: 'jidlo', first: 'D', last: null },
  { w: 'FOTBAL', e: '⚽', syl: 2, cat: 'veci', first: 'F', last: 'L' },
  { w: 'HAD', e: '🐍', syl: 1, cat: 'zvire', first: 'H', last: null, rh: 'ad', zive: true },
  { w: 'HODINY', e: '⏰', syl: 3, cat: 'veci', first: 'H', last: 'Y' },
  { w: 'HOUBA', e: '🍄', syl: 2, cat: 'priroda', first: 'H', last: 'A', zive: true },
  { w: 'HRAD', e: '🏰', syl: 1, cat: 'veci', first: 'H', last: null, rh: 'ad' },
  { w: 'HRUŠKA', e: '🍐', syl: 2, cat: 'jidlo', first: 'H', last: 'A' },
  { w: 'HVĚZDA', e: '⭐', syl: 2, cat: 'priroda', first: 'H', last: 'A' },
  { w: 'JABLKO', e: '🍎', syl: 2, cat: 'jidlo', first: 'J', last: 'O' },
  { w: 'JAHODA', e: '🍓', syl: 3, cat: 'jidlo', first: 'J', last: 'A' },
  { w: 'KACHNA', e: '🦆', syl: 2, cat: 'zvire', first: 'K', last: 'A', zive: true },
  { w: 'KLÍČ', e: '🔑', syl: 1, cat: 'veci', first: 'K', last: 'Č', rh: 'ic' },
  { w: 'KNIHA', e: '📚', syl: 2, cat: 'veci', first: 'K', last: 'A' },
  { w: 'KOČKA', e: '🐱', syl: 2, cat: 'zvire', first: 'K', last: 'A', zive: true },
  { w: 'KOLO', e: '🚲', syl: 2, cat: 'doprava', first: 'K', last: 'O' },
  { w: 'KRÁL', e: '👑', syl: 1, cat: 'pohadka', first: 'K', last: 'L' },
  { w: 'KRÁVA', e: '🐄', syl: 2, cat: 'zvire', first: 'K', last: 'A', rh: 'ava', zive: true },
  { w: 'KUŘE', e: '🐥', syl: 2, cat: 'zvire', first: 'K', last: 'E', zive: true },
  { w: 'KVĚTINA', e: '🌸', syl: 3, cat: 'priroda', first: 'K', last: 'A', zive: true },
  { w: 'KYTARA', e: '🎸', syl: 3, cat: 'veci', first: 'K', last: 'A' },
  { w: 'LED', e: '🧊', syl: 1, cat: 'priroda', first: 'L', last: null, rh: 'ed' },
  { w: 'LES', e: '🌲', syl: 1, cat: 'priroda', first: 'L', last: 'S', rh: 'es', zive: true },
  { w: 'LETADLO', e: '✈️', syl: 3, cat: 'doprava', first: 'L', last: 'O' },
  { w: 'LEV', e: '🦁', syl: 1, cat: 'zvire', first: 'L', last: null, zive: true },
  { w: 'LIŠKA', e: '🦊', syl: 2, cat: 'zvire', first: 'L', last: 'A', zive: true },
  { w: 'LÍZÁTKO', e: '🍭', syl: 3, cat: 'jidlo', first: 'L', last: 'O' },
  { w: 'LOĎ', e: '⛵', syl: 1, cat: 'doprava', first: 'L', last: null },
  { w: 'MED', e: '🍯', syl: 1, cat: 'jidlo', first: 'M', last: null, rh: 'ed' },
  { w: 'MEDVĚD', e: '🐻', syl: 2, cat: 'zvire', first: 'M', last: null, zive: true },
  { w: 'MĚSÍC', e: '🌙', syl: 2, cat: 'priroda', first: 'M', last: 'C', rh: 'ic2' },
  { w: 'MÍČ', e: '🏀', syl: 1, cat: 'veci', first: 'M', last: 'Č', rh: 'ic' },
  { w: 'MOTÝL', e: '🦋', syl: 2, cat: 'zvire', first: 'M', last: 'L', zive: true },
  { w: 'MRAK', e: '☁️', syl: 1, cat: 'priroda', first: 'M', last: 'K', rh: 'ak' },
  { w: 'MRKEV', e: '🥕', syl: 2, cat: 'jidlo', first: 'M', last: null },
  { w: 'MYŠ', e: '🐭', syl: 1, cat: 'zvire', first: 'M', last: 'Š', zive: true },
  { w: 'NOS', e: '👃', syl: 1, cat: 'telo', first: 'N', last: 'S' },
  { w: 'NŮŽKY', e: '✂️', syl: 2, cat: 'veci', first: 'N', last: 'Y' },
  { w: 'OHEŇ', e: '🔥', syl: 2, cat: 'priroda', first: 'O', last: null },
  { w: 'OKO', e: '👁️', syl: 2, cat: 'telo', first: 'O', last: 'O' },
  { w: 'OKURKA', e: '🥒', syl: 3, cat: 'jidlo', first: 'O', last: 'A' },
  { w: 'OPICE', e: '🐵', syl: 3, cat: 'zvire', first: 'O', last: 'E', zive: true },
  { w: 'OVCE', e: '🐑', syl: 2, cat: 'zvire', first: 'O', last: 'E', zive: true },
  { w: 'PES', e: '🐶', syl: 1, cat: 'zvire', first: 'P', last: 'S', rh: 'es', zive: true },
  { w: 'PIZZA', e: '🍕', syl: 2, cat: 'jidlo', first: 'P', last: 'A' },
  { w: 'PRASE', e: '🐷', syl: 2, cat: 'zvire', first: 'P', last: 'E', zive: true },
  { w: 'PTÁK', e: '🐦', syl: 1, cat: 'zvire', first: 'P', last: 'K', rh: 'ak', zive: true },
  { w: 'RAJČE', e: '🍅', syl: 2, cat: 'jidlo', first: 'R', last: 'E' },
  { w: 'RAK', e: '🦞', syl: 1, cat: 'zvire', first: 'R', last: 'K', rh: 'ak', zive: true },
  { w: 'RAKETA', e: '🚀', syl: 3, cat: 'doprava', first: 'R', last: 'A' },
  { w: 'RUKA', e: '✋', syl: 2, cat: 'telo', first: 'R', last: 'A' },
  { w: 'RYBA', e: '🐟', syl: 2, cat: 'zvire', first: 'R', last: 'A', zive: true },
  { w: 'SLON', e: '🐘', syl: 1, cat: 'zvire', first: 'S', last: 'N', zive: true },
  { w: 'SLUNCE', e: '☀️', syl: 2, cat: 'priroda', first: 'S', last: 'E' },
  { w: 'SMÍCH', e: '😄', syl: 1, cat: 'ostatni', first: 'S', last: null, rh: 'ih' },
  { w: 'SNÍH', e: '❄️', syl: 1, cat: 'priroda', first: 'S', last: null, rh: 'ih' },
  { w: 'SOVA', e: '🦉', syl: 2, cat: 'zvire', first: 'S', last: 'A', zive: true },
  { w: 'SRDCE', e: '❤️', syl: null, cat: 'veci', first: 'S', last: 'E' },
  { w: 'STROM', e: '🌳', syl: 1, cat: 'priroda', first: 'S', last: 'M', zive: true },
  { w: 'SŮL', e: '🧂', syl: 1, cat: 'jidlo', first: 'S', last: 'L' },
  { w: 'SÝR', e: '🧀', syl: 1, cat: 'jidlo', first: 'S', last: 'R' },
  { w: 'ŠNEK', e: '🐌', syl: 1, cat: 'zvire', first: 'Š', last: 'K', zive: true },
  { w: 'TELEFON', e: '📱', syl: 3, cat: 'veci', first: 'T', last: 'N' },
  { w: 'TRAKTOR', e: '🚜', syl: 2, cat: 'doprava', first: 'T', last: 'R' },
  { w: 'TRÁVA', e: '🌱', syl: 2, cat: 'priroda', first: 'T', last: 'A', rh: 'ava', zive: true },
  { w: 'TYGR', e: '🐯', syl: null, cat: 'zvire', first: 'T', last: 'R', zive: true },
  { w: 'UCHO', e: '👂', syl: 2, cat: 'telo', first: 'U', last: 'O' },
  { w: 'VČELA', e: '🐝', syl: 2, cat: 'zvire', first: 'V', last: 'A', zive: true },
  { w: 'VEJCE', e: '🥚', syl: 2, cat: 'jidlo', first: 'V', last: 'E' },
  { w: 'VLAK', e: '🚂', syl: 1, cat: 'doprava', first: 'V', last: 'K', rh: 'ak' },
  { w: 'VLK', e: '🐺', syl: null, cat: 'zvire', first: 'V', last: 'K', zive: true },
  { w: 'VODA', e: '💧', syl: 2, cat: 'priroda', first: 'V', last: 'A' },
  { w: 'ZAJÍC', e: '🐰', syl: 2, cat: 'zvire', first: 'Z', last: 'C', rh: 'ic2', zive: true },
  { w: 'ZMRZLINA', e: '🍦', syl: null, cat: 'jidlo', first: 'Z', last: 'A' },
  { w: 'ZUB', e: '🦷', syl: 1, cat: 'telo', first: 'Z', last: null },
  { w: 'ŽÁBA', e: '🐸', syl: 2, cat: 'zvire', first: 'Ž', last: 'A', zive: true },
  { w: 'ŽELVA', e: '🐢', syl: 2, cat: 'zvire', first: 'Ž', last: 'A', zive: true },
  { w: 'ŽIRAFA', e: '🦒', syl: 3, cat: 'zvire', first: 'Ž', last: 'A', zive: true },
  { w: 'CHLEBA', e: '🍞', syl: 2, cat: 'jidlo', first: null, last: 'A' },
  { w: 'KOST', e: '🦴', syl: 1, cat: 'veci', first: 'K', last: 'T' },
  { w: 'HROCH', e: '🦛', syl: 1, cat: 'zvire', first: 'H', last: null, zive: true },
  { w: 'KOŠ', e: '🧺', syl: 1, cat: 'veci', first: 'K', last: 'Š' },
  { w: 'NOC', e: '🌃', syl: 1, cat: 'priroda', first: 'N', last: 'C' },
];

export const CATEGORIES = {
  zvire: 'zvířata', jidlo: 'jídlo', doprava: 'dopravní prostředky', veci: 'věci', priroda: 'příroda', telo: 'části těla', obleceni: 'oblečení', pohadka: 'z pohádky',
};

// Jednoduchá slova ke skládání a čtení (jen písmena, která dítě zná jako velká tiskací; bez CH a bez měkčení DI/TI/NI).
export const SIMPLE_WORDS = ['PES', 'LES', 'LEV', 'SŮL', 'MED', 'LED', 'DŮM', 'NOS', 'OKO', 'KOLO', 'AUTO', 'RYBA', 'SOVA', 'RUKA', 'MYŠ', 'VLAK', 'DRAK', 'MRAK', 'HAD', 'KOST', 'KOŠ', 'NOC', 'SÝR', 'ZUB', 'SLON', 'PTÁK', 'VODA', 'BOTA', 'ŽÁBA', 'KRÁL', 'MÍČ', 'KLÍČ', 'HRAD', 'RAK', 'STROM', 'KOČKA', 'LIŠKA', 'MOTÝL', 'BANÁN', 'VEJCE', 'KNIHA', 'HOUBA', 'PRASE', 'OVCE', 'KRÁVA', 'JABLKO'];

export const ALPHABET = ['A', 'B', 'C', 'Č', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'Ř', 'S', 'Š', 'T', 'U', 'V', 'Y', 'Z', 'Ž'];
// Jak se písmeno čte nahlas (pro hlasovou syntézu): hláska, ne název písmene.
export const LETTER_SAY = { A: 'á', B: 'b', C: 'c', Č: 'č', D: 'd', E: 'é', F: 'f', G: 'g', H: 'h', I: 'í', J: 'j', K: 'k', L: 'l', M: 'm', N: 'n', O: 'ó', P: 'p', R: 'r', Ř: 'ř', S: 's', Š: 'š', T: 't', U: 'ú', V: 'v', Y: 'ypsilon', Z: 'z', Ž: 'ž' };
// Snadno zaměnitelná písmena (pro těžší úrovně).
export const CONFUSABLE = [['b', 'd', 'p'], ['m', 'n', 'u'], ['a', 'e', 'o'], ['i', 'j', 'l'], ['s', 'z', 'c'], ['v', 'y', 'w'], ['h', 'k', 'n'], ['f', 't', 'r']];

// Analogie: a je k b jako c je k d. say = jak to říct dítěti.
export const ANALOGIES = [
  { a: '🐶', b: '🦴', c: '🐱', d: '🐟', say: 'Pes má rád kost. Co má ráda kočka?' },
  { a: '🐝', b: '🍯', c: '🐔', d: '🥚', say: 'Včela dělá med. Co dělá slepice?' },
  { a: '🌧️', b: '☂️', c: '☀️', d: '🕶️', say: 'Když prší, vezmeme deštník. Co si vezmeme, když svítí slunce?' },
  { a: '🦶', b: '👟', c: '✋', d: '🧤', say: 'Na nohu si bereme botu. Co si bereme na ruku?' },
  { a: '🐟', b: '🌊', c: '🐦', d: '🌳', say: 'Ryba žije ve vodě. Kde žije pták?' },
  { a: '🔑', b: '🔒', c: '✏️', d: '📄', say: 'Klíč patří k zámku. K čemu patří tužka?' },
  { a: '🪥', b: '🦷', c: '🧴', d: '🖐️', say: 'Kartáčkem si čistíme zuby. Čím si myjeme ruce? Mýdlem.' },
  { a: '🐮', b: '🥛', c: '🐑', d: '🧶', say: 'Od krávy máme mléko. Co máme od ovce?' },
  { a: '🌱', b: '🌳', c: '🐣', d: '🐓', say: 'Ze semínka vyroste strom. Co vyroste z kuřátka?' },
  { a: '🚗', b: '🛣️', c: '⛵', d: '🌊', say: 'Auto jezdí po silnici. Kde pluje loď?' },
  { a: '🥶', b: '🧥', c: '🥵', d: '🍦', say: 'Když je zima, oblékneme bundu. Co si dáme, když je horko?' },
  { a: '🐰', b: '🥕', c: '🐵', d: '🍌', say: 'Zajíc má rád mrkev. Co má ráda opice?' },
  { a: '🌙', b: '🛏️', c: '☀️', d: '🏃', say: 'V noci spíme. Co děláme ve dne?' },
  { a: '🎸', b: '🎵', c: '📚', d: '📖', say: 'Na kytaru hrajeme. Co děláme s knihou? Čteme.' },
  { a: '🐦', b: '🪶', c: '🐟', d: '🐠', say: 'Pták má peří. Kdo má šupiny jako ryba? Ještě jedna ryba.' },
];
export const ANALOGY_POOL = ['🍎', '🚲', '🎈', '🧸', '🍕', '⚽', '🧩', '🪑', '🎩', '🧦', '🌵', '🍓', '🚂', '🪁', '🪜'];

// Posloupnosti dějů (správné pořadí).
export const STORIES = [
  { seq: ['🥚', '🐣', '🐥', '🐓'], say: 'Jak vyroste slepička?' },
  { seq: ['🌱', '🌿', '🌳', '🍎'], say: 'Jak vyroste jabloň?' },
  { seq: ['🌑', '🌓', '🌕'], say: 'Jak se mění měsíc?' },
  { seq: ['☁️', '🌧️', '🌈'], say: 'Co se děje, když prší?' },
  { seq: ['🥚', '🐛', '🦋'], say: 'Jak vyroste motýl?' },
  { seq: ['❄️', '⛄', '☀️', '💧'], say: 'Co se stane se sněhulákem?' },
  { seq: ['👶', '🧒', '🧑', '👴'], say: 'Jak člověk roste?' },
  { seq: ['🌾', '🍞', '🥪'], say: 'Jak vznikne svačina?' },
  { seq: ['🛏️', '🌅', '🪥', '🏫'], say: 'Jak vypadá ráno?' },
  { seq: ['🧱', '🏗️', '🏠'], say: 'Jak se staví dům?' },
  { seq: ['🎃', '🔪', '🕯️'], say: 'Jak vznikne lampion z dýně?' },
  { seq: ['🌰', '🐿️', '🌳'], say: 'Co udělá veverka s oříškem?' },
];

export const RIDDLES = [
  { e: '🦒', w: 'žirafa', clues: ['Je to zvíře.', 'Má moc dlouhý krk.', 'Je žlutá s hnědými fleky.'] },
  { e: '🐘', w: 'slon', clues: ['Je to velké zvíře.', 'Má dlouhý chobot.', 'Je šedý.'] },
  { e: '🐸', w: 'žába', clues: ['Je zelená.', 'Skáče.', 'Žije u rybníka a kváká.'] },
  { e: '🍌', w: 'banán', clues: ['Je to ovoce.', 'Je žlutý a zahnutý.', 'Mají ho rády opice.'] },
  { e: '🚂', w: 'vlak', clues: ['Jezdí po kolejích.', 'Má mnoho vagónů.', 'Houká.'] },
  { e: '☂️', w: 'deštník', clues: ['Bereme ho, když prší.', 'Držíme ho nad hlavou.', 'Dá se složit.'] },
  { e: '🐝', w: 'včela', clues: ['Je to malé zvíře.', 'Bzučí a létá.', 'Dělá med.'] },
  { e: '🌙', w: 'měsíc', clues: ['Svítí na nebi.', 'Vidíme ho v noci.', 'Někdy je kulatý, někdy jako srpek.'] },
  { e: '🍎', w: 'jablko', clues: ['Je to ovoce.', 'Roste na stromě.', 'Je kulaté, červené nebo zelené.'] },
  { e: '🐌', w: 'šnek', clues: ['Je to malé zvíře.', 'Leze velmi pomalu.', 'Nosí na zádech ulitu.'] },
  { e: '🔑', w: 'klíč', clues: ['Je malý a z kovu.', 'Odemyká dveře.'] },
  { e: '🎂', w: 'dort', clues: ['Je to sladké jídlo.', 'Jíme ho na narozeniny.', 'Jsou na něm svíčky.'] },
  { e: '🦉', w: 'sova', clues: ['Je to pták.', 'Má velké oči.', 'Létá v noci a houká.'] },
  { e: '⛄', w: 'sněhulák', clues: ['Stavíme ho v zimě.', 'Má místo nosu mrkev.', 'Na jaře roztaje.'] },
  { e: '🚀', w: 'raketa', clues: ['Letí vysoko do vesmíru.', 'Má na začátku velký oheň.'] },
  { e: '🐢', w: 'želva', clues: ['Je to zvíře.', 'Má na zádech tvrdý krunýř.', 'Chodí pomalu.'] },
];
export const RIDDLE_POOL = ['🐶', '🐱', '🚗', '🍓', '⭐', '🏠', '🐟', '🌳', '🎈', '🧸', '🍕', '🚲'];

export const OPPOSITES = [
  { a: '🐘', an: 'velký', b: '🐭', bn: 'malý' },
  { a: '🔥', an: 'horký', b: '🧊', bn: 'studený' },
  { a: '☀️', an: 'den', b: '🌙', bn: 'noc' },
  { a: '🐆', an: 'rychlý', b: '🐌', bn: 'pomalý' },
  { a: '😀', an: 'veselý', b: '😢', bn: 'smutný' },
  { a: '📖', an: 'otevřená kniha', b: '📕', bn: 'zavřená kniha' },
  { a: '⬆️', an: 'nahoře', b: '⬇️', bn: 'dole' },
  { a: '🌧️', an: 'mokro', b: '🏜️', bn: 'sucho' },
  { a: '🧸', an: 'měkký', b: '🪨', bn: 'tvrdý' },
  { a: '🌞', an: 'světlo', b: '🌑', bn: 'tma' },
];

export const ANIMAL_HOMES = [
  { a: '🐟', h: '🌊', hn: 've vodě' }, { a: '🐻', h: '🌲', hn: 'v lese' }, { a: '🐧', h: '❄️', hn: 'na ledu' },
  { a: '🐪', h: '🏜️', hn: 'v poušti' }, { a: '🐒', h: '🌴', hn: 'v džungli' }, { a: '🐄', h: '🚜', hn: 'na statku' },
  { a: '🦅', h: '⛰️', hn: 'v horách' }, { a: '🐸', h: '🪷', hn: 'u rybníka' },
];
export const ANIMAL_FOOD = [
  { a: '🐰', f: '🥕', fn: 'mrkev' }, { a: '🐵', f: '🍌', fn: 'banán' }, { a: '🐱', f: '🐟', fn: 'rybu' }, { a: '🐶', f: '🦴', fn: 'kost' },
  { a: '🐮', f: '🌿', fn: 'trávu' }, { a: '🐝', f: '🌸', fn: 'nektar z květin' }, { a: '🐿️', f: '🌰', fn: 'oříšky' }, { a: '🐼', f: '🎍', fn: 'bambus' },
];

export const DAY_PARTS = [
  { id: 'rano', e: '🌅', n: 'ráno', acts: [{ e: '🪥', say: 'čistíme si zuby a snídáme' }, { e: '🥣', say: 'snídáme' }, { e: '🌅', say: 'vstáváme z postele' }] },
  { id: 'poledne', e: '☀️', n: 'v poledne', acts: [{ e: '🍽️', say: 'obědváme' }, { e: '🏫', say: 'jsme ve školce' }] },
  { id: 'vecer', e: '🌆', n: 'večer', acts: [{ e: '🛁', say: 'koupeme se' }, { e: '📖', say: 'čteme pohádku před spaním' }] },
  { id: 'noc', e: '🌙', n: 'v noci', acts: [{ e: '😴', say: 'spíme' }, { e: '🦉', say: 'létá sova' }] },
];
export const SEASONS = [
  { id: 'jaro', e: '🌷', n: 'jaro', items: [{ e: '🌷', say: 'kvetou první kytičky' }, { e: '🐣', say: 'líhnou se kuřátka' }] },
  { id: 'leto', e: '🌞', n: 'léto', items: [{ e: '🏖️', say: 'koupeme se u moře' }, { e: '🍓', say: 'zrají jahody' }, { e: '🍦', say: 'jíme zmrzlinu na sluníčku' }] },
  { id: 'podzim', e: '🍁', n: 'podzim', items: [{ e: '🍂', say: 'padá listí' }, { e: '🪁', say: 'pouštíme draka' }, { e: '🍄', say: 'sbíráme houby' }] },
  { id: 'zima', e: '❄️', n: 'zima', items: [{ e: '⛄', say: 'stavíme sněhuláka' }, { e: '🎄', say: 'máme Vánoce' }, { e: '🧣', say: 'nosíme šálu a čepici' }] },
];
export const WEEKDAYS = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];

// Pomocné výběry
export function wordsWhere(pred) { return WORDS.filter(pred); }
export function byWord(w) { return WORDS.find(x => x.w === w); }
