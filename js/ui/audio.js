// Zvuky (Web Audio, syntéza) a řeč (SpeechSynthesis cs-CZ).
let ctx = null;
let enabled = { sound: true, speech: true };
export function configureAudio(settings) { enabled = { sound: settings.sound !== false, speech: settings.speech !== false }; }

function ac() { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { ctx = null; } } if (ctx && ctx.state === 'suspended') ctx.resume(); return ctx; }
function tone(freq, t0, dur, type = 'sine', gain = 0.18) {
  const c = ac(); if (!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(gain, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.05);
}
export const sfx = {
  click() { if (!enabled.sound) return; const c = ac(); if (!c) return; tone(660, c.currentTime, 0.08, 'triangle', 0.08); },
  correct() { if (!enabled.sound) return; const c = ac(); if (!c) return; const t = c.currentTime; tone(523, t, 0.15); tone(659, t + 0.12, 0.15); tone(784, t + 0.24, 0.25); },
  wrong() { if (!enabled.sound) return; const c = ac(); if (!c) return; const t = c.currentTime; tone(330, t, 0.18, 'sine', 0.12); tone(294, t + 0.15, 0.25, 'sine', 0.12); },
  flip() { if (!enabled.sound) return; const c = ac(); if (!c) return; tone(880, c.currentTime, 0.06, 'triangle', 0.06); },
  fanfare() { if (!enabled.sound) return; const c = ac(); if (!c) return; const t = c.currentTime; [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.13, 0.3, 'triangle', 0.16)); tone(1319, t + 0.55, 0.6, 'triangle', 0.14); },
  note(i) { if (!enabled.sound) return; const c = ac(); if (!c) return; tone([392, 494, 587, 698][i % 4], c.currentTime, 0.35, 'triangle', 0.16); },
  tick() { if (!enabled.sound) return; const c = ac(); if (!c) return; tone(1200, c.currentTime, 0.03, 'square', 0.03); },
};

// ─── řeč ───
let voice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return null;
  const vs = speechSynthesis.getVoices();
  const cs = vs.filter(v => /^cs/i.test(v.lang));
  const pref = cs.find(v => /zuzana|iveta|premium|enhanced/i.test(v.name)) || cs[0] || null;
  return pref;
}
if ('speechSynthesis' in window) { speechSynthesis.onvoiceschanged = () => { voice = pickVoice(); }; voice = pickVoice(); }

export function speak(text, { rate = 0.92, interrupt = true, onend } = {}) {
  if (!enabled.speech || !('speechSynthesis' in window) || !text) { onend && onend(); return; }
  if (!voice) voice = pickVoice();
  if (interrupt) speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'cs-CZ'; if (voice) u.voice = voice; u.rate = rate; u.pitch = 1.05;
  if (onend) u.onend = onend;
  speechSynthesis.speak(u);
}
export function stopSpeech() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
export function hasCzechVoice() { return !!(voice || pickVoice()); }

export const PRAISE = ['Správně!', 'Přesně tak!', 'Výborně!', 'To je ono!', 'Ano, máš to!', 'Jo! Trefa!', 'Paráda, povedlo se!'];
export const PRAISE_RETRY = ['Teď už to je! Zkoušel jsi to znovu a přišel na to.', 'Ano! Druhý pokus vyšel.', 'Tak je to správně. Nevzdal jsi to.'];
export const ENCOURAGE = ['Ještě ne. Zkus to znovu.', 'To není ono. Podívej se ještě jednou.', 'Skoro. Zkus jinou možnost.'];
export const REVEAL = ['Nevadí. Správně to bylo tady.', 'Tohle byla správná odpověď. Příště to půjde.', 'Podívej, správně je toto. Jdeme dál.'];
