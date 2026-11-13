// Seedovatelný generátor náhody (mulberry32) + pomocné funkce.
export function makeRng(seed = Date.now()) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rng = {
    next,
    int: (min, max) => Math.floor(next() * (max - min + 1)) + min,           // včetně obou krajů
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    shuffle: (arr) => { const a2 = arr.slice(); for (let i = a2.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a2[i], a2[j]] = [a2[j], a2[i]]; } return a2; },
    sample: (arr, n) => rng.shuffle(arr).slice(0, n),
    chance: (p) => next() < p,
  };
  return rng;
}
// Rozdílné možnosti kolem správné odpovědi (čísla), v rozsahu [lo, hi].
export function numberDistractors(rng, correct, count, lo, hi, near = 3) {
  const set = new Set([correct]);
  let tries = 0;
  while (set.size < count + 1 && tries < 200) {
    tries++;
    const d = rng.chance(0.7) ? correct + rng.int(-near, near) : rng.int(lo, hi);
    if (d >= lo && d <= hi) set.add(d);
  }
  for (let d = lo; set.size < count + 1 && d <= hi; d++) set.add(d);
  return rng.shuffle([...set].filter(x => x !== correct)).slice(0, count);
}
