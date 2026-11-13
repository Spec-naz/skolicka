// Model zvládnutí dovedností. Čistě funkční nad `state.skills`.
import { SKILL_BY_ID, SCREEN_SKILLS } from '../data/curriculum.js';

export const WINDOW = 12;          // kolik posledních pokusů na úrovni si pamatujeme
export const MASTER_MIN = 8;       // minimální počet pokusů pro zvládnutí
export const MASTER_ACC = 0.8;     // úspěšnost pro zvládnutí
export const FAST_STREAK = 5;      // 5 správně po sobě (rychlá kalibrace)
export const STRUGGLE_WINDOW = 6;  // posledních 6 pokusů
export const STRUGGLE_MAX_OK = 2;  // ≤ 2 správně → úroveň dolů
export const REVIEW_INTERVALS = [2, 4, 8, 16, 30];
const DAY = 86400000;

export function ensureSkill(state, skillId) {
  if (!state.skills[skillId]) {
    state.skills[skillId] = { level: 0, mastered: [], history: {}, lastPracticed: null, nextReview: null, intervalIdx: 0, struggling: false, demotions: 0 };
  }
  return state.skills[skillId];
}

export function levelCount(skillId) { return SKILL_BY_ID[skillId].levels.length; }
export function isSkillComplete(state, skillId) {
  const s = state.skills[skillId];
  return !!s && s.mastered.length >= levelCount(skillId);
}
export function prereqsMet(state, skillId) {
  const def = SKILL_BY_ID[skillId];
  if (!def.prereq) return true;
  return Object.entries(def.prereq).every(([pid, lvl]) => {
    const p = state.skills[pid];
    return p && p.mastered.length >= lvl;
  });
}

// Statistiky okna pokusů na úrovni.
export function levelStats(skill, level) {
  const h = (skill.history[level] || []);
  const n = h.length;
  const ok = h.filter(x => x.ok).length;
  let streak = 0;
  for (let i = h.length - 1; i >= 0 && h[i].ok; i--) streak++;
  const times = h.filter(x => x.ok).map(x => x.ms).sort((a, b) => a - b);
  const medianMs = times.length ? times[Math.floor(times.length / 2)] : null;
  return { n, ok, acc: n ? ok / n : null, streak, medianMs };
}

/**
 * Zapíše pokus a vrátí událost: { type: 'none'|'mastered'|'demoted'|'struggling'|'review-ok'|'review-fail', level, newLevel }.
 * @param isReview – úkol byl opakováním už zvládnuté úrovně
 */
export function recordAttempt(state, skillId, level, ok, ms, isReview = false, now = Date.now()) {
  const skill = ensureSkill(state, skillId);
  const def = SKILL_BY_ID[skillId];
  skill.history[level] = skill.history[level] || [];
  skill.history[level].push({ t: now, ok: !!ok, ms: Math.round(ms || 0) });
  if (skill.history[level].length > WINDOW) skill.history[level].shift();
  skill.lastPracticed = now;
  state.log.push({ t: now, skill: skillId, level, ok: !!ok, ms: Math.round(ms || 0), review: isReview });
  if (state.log.length > 3000) state.log.splice(0, state.log.length - 3000);

  if (isReview) {
    // Opakování zvládnuté úrovně: úspěch prodlužuje interval, neúspěch ho zkrátí a nejvyšší zvládnutou úroveň znovu otevře.
    if (ok) {
      skill.intervalIdx = Math.min((skill.intervalIdx || 0) + 1, REVIEW_INTERVALS.length - 1);
      skill.nextReview = now + REVIEW_INTERVALS[skill.intervalIdx] * DAY;
      return { type: 'review-ok', level };
    }
    skill.intervalIdx = 0;
    skill.nextReview = now + 1 * DAY;
    if (skill.mastered.includes(level) && level === Math.max(...skill.mastered)) {
      skill.mastered = skill.mastered.filter(l => l !== level);
      skill.level = level;
      skill.history[level] = [];
      return { type: 'review-fail', level, newLevel: level };
    }
    return { type: 'review-fail', level };
  }

  const st = levelStats(skill, level);
  const fast = st.streak >= FAST_STREAK && (st.medianMs === null || st.medianMs < 6000);
  if (!skill.mastered.includes(level) && ((st.n >= MASTER_MIN && st.acc >= MASTER_ACC) || fast)) {
    skill.mastered.push(level);
    skill.mastered.sort((a, b) => a - b);
    skill.struggling = false;
    skill.intervalIdx = 0;
    skill.nextReview = now + REVIEW_INTERVALS[0] * DAY;
    const newLevel = Math.min(level + 1, def.levels.length - 1);
    if (!skill.mastered.includes(newLevel)) skill.level = newLevel;
    else skill.level = firstUnmastered(skill, def);
    return { type: 'mastered', level, newLevel: skill.level, complete: skill.mastered.length >= def.levels.length };
  }
  // Příliš těžké?
  const last6 = (skill.history[level] || []).slice(-STRUGGLE_WINDOW);
  if (last6.length >= STRUGGLE_WINDOW && last6.filter(x => x.ok).length <= STRUGGLE_MAX_OK) {
    skill.history[level] = []; // nový začátek na nižší úrovni, aby se rozhodnutí neopakovalo hned
    if (level > 0) {
      skill.level = level - 1;
      skill.mastered = skill.mastered.filter(l => l !== level - 1); // nižší úroveň znovu procvičit
      skill.demotions = (skill.demotions || 0) + 1;
      return { type: 'demoted', level, newLevel: skill.level };
    }
    skill.struggling = true;
    return { type: 'struggling', level };
  }
  return { type: 'none', level };
}

function firstUnmastered(skill, def) {
  for (let i = 0; i < def.levels.length; i++) if (!skill.mastered.includes(i)) return i;
  return def.levels.length - 1;
}

// Souhrn pro rodiče: pro každou obrazovkovou dovednost stav.
export function skillOverview(state) {
  return SCREEN_SKILLS.map(def => {
    const s = state.skills[def.id];
    const total = def.levels.length;
    const mastered = s ? s.mastered.length : 0;
    const level = s ? s.level : 0;
    const st = s ? levelStats(s, level) : { n: 0, ok: 0, acc: null };
    const attempts = s ? Object.values(s.history).reduce((a, h) => a + h.length, 0) : 0;
    const totalAttempts = state.log.filter(l => l.skill === def.id).length;
    return {
      id: def.id, domain: def.domain, name: def.name, total, mastered, level, levelLabel: def.levels[level]?.label,
      acc: st.acc, windowN: st.n, attempts: totalAttempts, lastPracticed: s?.lastPracticed || null,
      struggling: !!s?.struggling, unlocked: prereqsMet(state, def.id), started: totalAttempts > 0, complete: mastered >= total,
      nextReview: s?.nextReview || null,
    };
  });
}

// Denní agregace pro graf.
export function dailyStats(state, days = 14, now = Date.now()) {
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d0 = new Date(now); d0.setHours(0, 0, 0, 0); d0.setDate(d0.getDate() - i);
    const d1 = new Date(d0); d1.setDate(d1.getDate() + 1);
    const rows = state.log.filter(l => l.t >= d0.getTime() && l.t < d1.getTime());
    out.push({ date: d0.toISOString().slice(0, 10), n: rows.length, ok: rows.filter(r => r.ok).length });
  }
  return out;
}

// Rychlá kalibrace podle toho, co rodič zadá při prvním spuštění.
export function applyCalibration(state, cal, now = Date.now()) {
  const set = (id, masteredUpTo) => {
    const s = ensureSkill(state, id);
    const n = Math.min(masteredUpTo, levelCount(id));
    s.mastered = Array.from({ length: n }, (_, i) => i);
    s.level = Math.min(n, levelCount(id) - 1);
    s.nextReview = n ? now + REVIEW_INTERVALS[0] * DAY : null;
    s.calibrated = true;
  };
  // cal.count: 10 | 20 | 50 | 100 ; cal.letters: 'nekolik' | 'velka' | 'vsechna' ; cal.add: 'ne' | 'do5' | 'do10'
  if (cal.count >= 10) { set('pocitani', 1); set('cislice', 1); set('subitizace', 1); }
  if (cal.count >= 20) { set('pocitani', 2); set('cislice', 3); set('rada', 2); set('porovnani', 1); }
  if (cal.count >= 50) { set('cislice', 4); set('rada', 3); set('porovnani', 2); }
  if (cal.count >= 100) { set('cislice', 5); set('rada', 5); }
  if (cal.letters === 'velka') { set('velka', 2); }
  if (cal.letters === 'vsechna') { set('velka', 3); }
  if (cal.add === 'do5') { set('scitani', 1); }
  if (cal.add === 'do10') { set('scitani', 2); set('odcitani', 1); }
  state.calibration = { ...cal, at: now };
}
