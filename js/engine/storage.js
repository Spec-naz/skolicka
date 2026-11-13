// Ukládání stavu do localStorage, export/import JSON.
const KEY = 'skolicka.v1';

export function defaultState() {
  return {
    version: 1,
    child: null,                       // { name, birthdate, avatar }
    settings: { speech: true, sound: true, tasksPerSession: 10, autoSpeak: true },
    skills: {},                        // skillId → { level, mastered:[], history:{}, lastPracticed, nextReview, intervalDays, struggling, demotions }
    sessions: [],
    worksheets: [],
    stickers: [],
    log: [],
    createdAt: new Date().toISOString(),
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    return { ...defaultState(), ...s, settings: { ...defaultState().settings, ...(s.settings || {}) } };
  } catch (e) {
    console.warn('Stav nejde načíst, začínám znovu', e);
    return defaultState();
  }
}

export function saveState(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('Uložení selhalo', e); }
}

export function exportState(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  const d = new Date().toISOString().slice(0, 10);
  a.download = `skolicka-${(state.child?.name || 'dite').toLowerCase()}-${d}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function importStateFromFile(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const s = JSON.parse(r.result);
        if (!s || typeof s !== 'object' || !('skills' in s)) throw new Error('Soubor nevypadá jako záloha Školičky.');
        resolve({ ...defaultState(), ...s });
      } catch (e) { reject(e); }
    };
    r.onerror = () => reject(r.error);
    r.readAsText(file);
  });
}

export function resetState() { localStorage.removeItem(KEY); }
