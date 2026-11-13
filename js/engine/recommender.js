// Plán sezení a doporučení pro rodiče.
import { SCREEN_SKILLS, SKILL_BY_ID, DOMAINS, DOMAIN_BY_ID, PRINT_SKILLS } from '../data/curriculum.js';
import { ensureSkill, prereqsMet, isSkillComplete, levelStats } from './progress.js';
import { makeRng } from './rng.js';

const DAY = 86400000;

// Kandidáti: hrana učení (aktivní úroveň), opakování (zvládnuté úrovně se splatným termínem), nové (nikdy nezkoušené).
export function candidates(state, now = Date.now()) {
  const edge = [], review = [], fresh = [];
  for (const def of SCREEN_SKILLS) {
    if (!prereqsMet(state, def.id)) continue;
    const s = state.skills[def.id];
    const started = !!s && Object.values(s.history).some(h => h.length) ;
    if (!started && !(s && s.mastered.length)) { fresh.push({ skill: def.id, level: 0, kind: 'fresh' }); continue; }
    if (!isSkillComplete(state, def.id)) edge.push({ skill: def.id, level: s.level, kind: 'edge', struggling: !!s.struggling });
    if (s && s.mastered.length && s.nextReview && s.nextReview <= now) {
      review.push({ skill: def.id, level: Math.max(...s.mastered), kind: 'review', overdueDays: (now - s.nextReview) / DAY });
    }
  }
  return { edge, review, fresh };
}

function domainCountsLast7(state, now) {
  const counts = Object.fromEntries(DOMAINS.map(d => [d.id, 0]));
  for (const l of state.log) if (now - l.t < 7 * DAY) counts[SKILL_BY_ID[l.skill]?.domain] = (counts[SKILL_BY_ID[l.skill]?.domain] || 0) + 1;
  return counts;
}

/**
 * Sestaví plán sezení: pole { skill, level, kind }.
 * Mix ≈ 60 % hrana / 25 % opakování / 15 % nové, prokládání oblastí, max 1 struggling.
 */
export function planSession(state, n = 10, now = Date.now(), seed = now) {
  const rng = makeRng(seed);
  const { edge, review, fresh } = candidates(state, now);
  const counts = domainCountsLast7(state, now);
  const maxCount = Math.max(1, ...Object.values(counts));

  const score = (c) => {
    const def = SKILL_BY_ID[c.skill];
    const s = state.skills[c.skill];
    let sc = 1;
    sc += (1 - (counts[def.domain] || 0) / maxCount) * 0.8;              // málo hraná oblast → výš
    if (s?.lastPracticed && now - s.lastPracticed < 3 * DAY) sc += 0.4;  // návaznost
    if (s?.lastPracticed && now - s.lastPracticed > 14 * DAY) sc += 0.3; // dlouho nehrané
    if (c.struggling) sc -= 0.6;
    if (c.kind === 'review') sc += Math.min(c.overdueDays, 5) * 0.1;
    return sc + rng.next() * 0.5;
  };
  const pickTop = (arr, k) => arr.map(c => ({ c, s: score(c) })).sort((a, b) => b.s - a.s).slice(0, k).map(x => x.c);

  let nEdge = Math.round(n * 0.6), nReview = Math.round(n * 0.25), nFresh = n - nEdge - nReview;
  if (review.length < nReview) { nEdge += nReview - review.length; nReview = review.length; }
  if (fresh.length < nFresh) { nEdge += nFresh - fresh.length; nFresh = fresh.length; }
  if (edge.length < nEdge) { const d = nEdge - edge.length; nEdge = edge.length; nFresh = Math.min(fresh.length, nFresh + d); }

  let chosen = [...pickTop(edge, nEdge), ...pickTop(review, nReview), ...pickTop(fresh, nFresh)];
  // max 1 struggling
  let seenStruggle = false;
  chosen = chosen.filter(c => { if (!c.struggling) return true; if (seenStruggle) return false; seenStruggle = true; return true; });
  // doplnit, pokud chybí (stejná dovednost může být i 2×)
  const pool = [...edge, ...review, ...fresh];
  let guard = 0;
  while (chosen.length < n && pool.length && guard++ < 50) chosen.push(rng.pick(pool));

  // prokládání: po sobě pokud možno jiná oblast
  const out = [];
  let rest = rng.shuffle(chosen);
  while (rest.length) {
    const lastDom = out.length ? SKILL_BY_ID[out[out.length - 1].skill].domain : null;
    let idx = rest.findIndex(c => SKILL_BY_ID[c.skill].domain !== lastDom);
    if (idx < 0) idx = 0;
    out.push(rest[idx]); rest.splice(idx, 1);
  }
  return out.slice(0, n);
}

// Pro volný výběr dítěte: dovednosti oblasti s odemčenými prerekvizitami.
export function skillsForFreeChoice(state, domainId) {
  return SCREEN_SKILLS.filter(s => s.domain === domainId && prereqsMet(state, s.id)).map(def => {
    const s = state.skills[def.id];
    return { def, level: s ? s.level : 0, complete: isSkillComplete(state, def.id) };
  });
}

// Pracovní listy vhodné právě teď (podle úrovní dovedností na obrazovce).
export function suggestWorksheets(state) {
  const lvl = (id) => state.skills[id]?.level ?? 0;
  const mastered = (id) => state.skills[id]?.mastered.length ?? 0;
  const out = [];
  // Čísla
  if (mastered('cislice') >= 1) out.push({ type: 'spojovacka', params: { n: mastered('cislice') >= 3 ? 20 : 10 }, why: 'Procvičí číselnou řadu rukou.' });
  out.push({ type: 'pocitej', params: { max: mastered('pocitani') >= 2 ? 12 : 8 }, why: 'Počítání a zápis číslice.' });
  if (mastered('scitani') >= 1) out.push({ type: 'scitani', params: { max: mastered('scitani') >= 2 ? 10 : 5, pictures: mastered('scitani') < 3 }, why: 'Sčítání – stejná úroveň jako na obrazovce.' });
  if (mastered('rozklad') >= 1 || mastered('scitani') >= 3) out.push({ type: 'domecky', params: { totals: mastered('rozklad') >= 2 ? [7, 8, 9, 10] : [5, 6] }, why: 'Rozklady čísel („domečky“) jsou klíč ke sčítání zpaměti.' });
  if (mastered('rada') >= 1) out.push({ type: 'rada', params: { max: mastered('rada') >= 3 ? 50 : 20 }, why: 'Doplňování číselné řady.' });
  if (mastered('porovnani') >= 1) out.push({ type: 'porovnej', params: { max: mastered('porovnani') >= 2 ? 10 : 6 }, why: 'Více/méně – zakroužkuj větší skupinu.' });
  // Písmena
  out.push({ type: 'najdipismeno', params: { lower: mastered('velka') >= 2 }, why: 'Zrakové vyhledávání písmene v poli.' });
  out.push({ type: 'obtah', params: { set: mastered('velka') >= 2 ? 'letters' : 'digits' }, why: 'Správný tah při psaní číslic a písmen.' });
  if (mastered('hlaska') >= 1) out.push({ type: 'prvnihlaska', params: {}, why: 'Spoj obrázek s prvním písmenem.' });
  // Logika a ruka
  out.push({ type: 'vzory', params: { type: lvl('vzory') >= 2 ? 'ABC' : lvl('vzory') >= 1 ? 'AAB' : 'AB' }, why: 'Pokračování vzoru.' });
  out.push({ type: 'labyrint', params: { size: 6 + 3 * Math.min(2, lvl('labyrint')) }, why: 'Plánování cesty, vedení čáry.' });
  out.push({ type: 'cary', params: { kind: mastered('cary') >= 1 ? 'loops' : 'simple' }, why: 'Uvolnění ruky před psaním.' });
  if (mastered('symetrie') >= 1 || mastered('tvary') >= 1) out.push({ type: 'mrizka', params: { size: lvl('mrizka') >= 1 ? 6 : 4 }, why: 'Symetrie v mřížce.' });
  if (mastered('sudoku') >= 1) out.push({ type: 'sudoku', params: { missing: 4 }, why: 'Obrázkové sudoku na papír.' });
  if (mastered('slovnik') >= 1) out.push({ type: 'conepatri', params: {}, why: 'Co do řady nepatří.' });
  return out;
}

// Textová doporučení pro rodiče (pravidla + evidence-based tipy).
export function recommend(state, now = Date.now()) {
  const recs = [];
  const sk = (id) => state.skills[id];
  const name = state.child?.name || 'dítě';
  for (const def of SCREEN_SKILLS) {
    const s = sk(def.id);
    if (!s) continue;
    const dom = DOMAIN_BY_ID[def.domain];
    if (s.struggling) {
      recs.push({ prio: 1, icon: '🧡', title: `${def.name}: zatím příliš těžké`, text: `Na obrazovce to ${name} nebaví ani na nejnižší úrovni. Nechte to pár dní být a zkuste to v reálném světě: ${offlineTip(def.id)}`, skill: def.id });
    } else if (s.mastered.length >= def.levels.length) {
      // hotovo – nic
    } else if (s.mastered.length && s.lastPracticed && now - s.lastPracticed < 3 * DAY) {
      const st = levelStats(s, s.level);
      if (st.n >= 4 && st.acc >= 0.75) recs.push({ prio: 3, icon: '🚀', title: `${def.name}: jde to dobře`, text: `Aktuální úroveň „${def.levels[s.level].label}“ zvládá na ${Math.round(st.acc * 100)} %. Brzy se posune na „${def.levels[Math.min(s.level + 1, def.levels.length - 1)].label}“.`, skill: def.id });
      if (st.n >= 4 && st.acc < 0.5) recs.push({ prio: 2, icon: '🤔', title: `${def.name}: aktuální úroveň drhne`, text: `„${def.levels[s.level].label}“ zatím na ${Math.round(st.acc * 100)} %. Aplikace úroveň sníží sama, pokud to nepůjde; pomůže i offline: ${offlineTip(def.id)}`, skill: def.id });
    }
    if ((s.demotions || 0) >= 2) recs.push({ prio: 2, icon: '🪜', title: `${def.name}: úroveň už 2× klesla`, text: `Zkuste dovednost na čas vynechat a vrátit se k ní za 2–3 týdny; mezitím ji procvičujte hrou mimo obrazovku.`, skill: def.id });
  }
  // Oblasti dlouho nehrané
  const counts = {};
  for (const l of state.log) if (now - l.t < 10 * DAY) counts[SKILL_BY_ID[l.skill]?.domain] = 1;
  for (const d of DOMAINS) if (!d.printOnly && !counts[d.id] && state.log.length > 30) recs.push({ prio: 4, icon: d.emoji, title: `Oblast „${d.name}“ 10 dní nehraná`, text: `Plán sezení ji sám zařadí častěji. Pokud ji ${name} odmítá, zkuste ji nabídnout jako společnou hru s vámi.` });
  // Pracovní listy
  const ws = state.worksheets.filter(w => now - new Date(w.date).getTime() < 14 * DAY);
  const hard = ws.filter(w => w.result === 'tezke');
  if (hard.length >= 2) recs.push({ prio: 2, icon: '✏️', title: 'Pracovní listy vycházejí „těžké“', text: `${hard.length} z posledních listů bylo těžkých. Zkraťte je (polovina stránky stačí) a vyberte lehčí variantu; tužka nemá být dřina.` });
  if (!ws.length && state.log.length > 20) recs.push({ prio: 4, icon: '🖨️', title: 'Vytiskněte pracovní list', text: 'Obrazovka netrénuje ruku. Jeden list týdně (spojovačka, labyrint, čáry) rozvíjí grafomotoriku, která je silným prediktorem školní úspěšnosti.' });
  // Čas u obrazovky
  const today = state.sessions.filter(s => now - s.start < DAY);
  const minutesToday = today.reduce((a, s) => a + ((s.end || now) - s.start), 0) / 60000;
  if (minutesToday > 30) recs.push({ prio: 1, icon: '⏱️', title: 'Dnes už přes 30 minut', text: 'Doporučení pro předškoláky je do 1 hodiny kvalitního obsahu denně, ideálně ve společnosti rodiče. Zbytek dne patří pohybu a volné hře.' });
  // Obecné tipy – rotují podle dne
  const tips = GENERAL_TIPS;
  const dayIdx = Math.floor(now / DAY) % tips.length;
  recs.push({ prio: 5, icon: '💡', title: tips[dayIdx].title, text: tips[dayIdx].text });
  recs.sort((a, b) => a.prio - b.prio);
  return recs;
}

export function offlineTip(skillId) {
  return OFFLINE_TIPS[skillId] || 'hrajte si s tím v běžném dni – při vaření, na procházce, u stolu.';
}

export const OFFLINE_TIPS = {
  pocitani: 'počítejte schody, knoflíky, auta na parkovišti; při prostírání „kolik vidliček potřebujeme?“.',
  subitizace: 'hrajte s hrací kostkou – kdo rychleji řekne, co padlo, bez počítání.',
  cislice: 'hledejte čísla kolem sebe: na domech, v autobuse, na výtahu.',
  rada: 'lineární deskové hry (Člověče, nezlob se, hra s číslovanými políčky 1–100) – podle výzkumu nejúčinnější domácí nástroj.',
  porovnani: 'dvě misky bonbónů/kostek: kde je víc? O kolik?',
  scitani: 'sčítejte s prsty a předměty při hře: „máš 3 autíčka, přidám 2, kolik máš?“',
  odcitani: 'ujídání: „bylo 5 sušenek, 2 sníš, kolik zbyde?“',
  rozklad: 'schovávačka s 5 knoflíky pod dlaní: „ukazuji 2, kolik je pod rukou?“',
  velka: 'písmenkové magnety na ledničce, hledání písmen na obalech.',
  hlaska: 'hra „Ve městě bylo…“ nebo „slovo na M“ v autě; vyhledávat věci začínající stejnou hláskou.',
  slabiky: 'vytleskávání jmen rodiny a zvířat, rýmovačky a říkadla.',
  slova: 'skládat jména z magnetek; psát krátká slova velkými písmeny na nákupní seznam.',
  slovnik: 'třídit nákup do skupin, hra „co nepatří“ s předměty na stole.',
  vzory: 'korálky, lego, prostírání ve vzoru: červená, modrá, červená…',
  trideni: 'třídění ponožek, příborů, lega podle barvy a tvaru.',
  razeni: 'řadit tyčky, klacíky, lžíce od nejmenší po největší.',
  analogie: 'hádanky „pták má hnízdo, pes má…“ při cestě.',
  posloupnost: 'vyprávět, co bylo dřív a potom, při čtení knížky; fotky z dne seřadit.',
  sudoku: 'papírové obrázkové sudoku 4×4, nebo lego ve čtverci 2×2 bez opakování barev.',
  hadanky: 'hádanky při cestě: „je to zvíře, má dlouhé uši…“',
  pexeso: 'opravdové pexeso s méně kartami; hrajte proti sobě.',
  sekvence: 'Opakuj po mně: tleskni, dupni, zamávej… postupně prodlužovat.',
  pozornost: 'hra „Kuba řekl“ nebo „Den/noc“ (na „den“ dřepnout, na „noc“ stoupnout) – trénuje inhibici.',
  cochybi: 'na stůl 5 věcí, zavřít oči, jednu schovat – co zmizelo?',
  rozdily: 'hledání rozdílů v časopisech, „najdi dvě stejné ponožky“.',
  tvary: 'hledání tvarů v místnosti; vystřihování tvarů z papíru.',
  symetrie: 'skládání papíru a vystřihování srdce, zrcadlo u obrázku.',
  orientace: 'pokyny při uklízení: „dej medvídka vlevo od polštáře“.',
  rotace: 'puzzle, tangram, skládání lega podle obrázku.',
  skladani: 'tangram, dřevěné skládačky tvarů.',
  cas: 'povídat si o dni: co bylo ráno, co bude večer; kalendář s dny v týdnu.',
  priroda: 'pozorování v přírodě, knížky o zvířatech, krmení ptáků.',
  hodiny: 'skutečné hodiny s ručičkami doma: „až bude malá ručička na 6, bude večeře“.',
};

export const GENERAL_TIPS = [
  { title: 'Chvalte proces, ne chytrost', text: '„Zkoušel jsi to znovu a přišel na to“ funguje dlouhodobě lépe než „jsi chytrý“. Chvála schopnosti vede děti k vyhýbání se těžkým úkolům.' },
  { title: 'Deset minut stačí', text: 'U pětiletého dítěte je 8–12 minut soustředěné práce ideál. Skončit o minutu dřív, než se dítě začne nudit, je výhra.' },
  { title: 'Hrajte u obrazovky spolu', text: 'Učení z obrazovky se u předškoláků přenáší do reality mnohem lépe, když rodič sedí vedle, komentuje a propojuje úkoly s běžným životem.' },
  { title: 'Matematická řeč', text: 'Nejsilnější domácí vliv na matematiku je množství „matematické řeči“: „kolik?“, „o kolik víc?“, „polovina“, „první, druhý, třetí“.' },
  { title: 'Deskové hry s čísly', text: 'Hra s lineárním herním plánem (políčka 1–10 nebo 1–100) výrazně zlepšuje odhad velikosti čísel – stačí 4× 15 minut.' },
  { title: 'Dialogické čtení', text: 'Při čtení se ptejte otevřenými otázkami („co myslíš, že udělá?“), rozšiřujte odpovědi dítěte, nechte ho vyprávět. Rozvíjí slovní zásobu i porozumění.' },
  { title: 'Chyba je informace', text: 'Když dítě odpoví špatně, neopravujte hned – zeptejte se „jak jsi na to přišel?“. Děti, které vysvětlují svůj postup, se učí rychleji.' },
  { title: 'Pohyb a spánek', text: 'Pro předškoláka WHO doporučuje alespoň 3 hodiny pohybu denně a 10–13 hodin spánku. Bez toho se učení nedaří ani s nejlepší aplikací.' },
  { title: 'Následujte zájem', text: 'U nadaných dětí je nejdůležitějším „palivem“ vlastní zájem. Pokud dnes chce jen čísla, nechte ho; vyváženost řeší aplikace v dalších dnech.' },
  { title: 'Ruka před písmem', text: 'Jemná motorika (stříhání, modelování, navlékání) v 5 letech předpovídá školní úspěch podobně silně jako znalost čísel. Nepodceňujte ji.' },
];
