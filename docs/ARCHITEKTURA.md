# ŠKOLIČKA – architektura

## Zásady
- **Bez build kroku, bez závislostí.** Čisté HTML + CSS + ES moduly. Spustit přes lokální HTTP server (`python3 -m http.server`) nebo z GitHub Pages. `build.py` navíc vyrobí jednosouborovou `Skolicka.html` (otevře se dvojklikem, funguje offline).
- **Dítě nečte.** Obrazovka pro dítě je téměř bez textu: ikony, obrázky, hlas (Web Speech API, cs-CZ). Každé zadání se přečte nahlas a jde zopakovat tlačítkem 🔊.
- **Rodič řídí, aplikace radí.** Rodičovská sekce (ozubené kolo) ukazuje mapu dovedností, trendy, doporučení a nabízí pracovní listy k tisku.
- **Data zůstávají doma.** Vše v `localStorage`, export/import do JSON. Žádný server, žádná telemetrie.

## Složky
```
index.html            – aplikace (dítě + rodič)
print/index.html      – generátor pracovních listů (A4, černobílé, SVG)
css/style.css
js/app.js             – stav obrazovek, orchestrace sezení
js/data/curriculum.js – oblasti → dovednosti → úrovně (learning trajectories), prerekvizity, odkazy na zdroje
js/data/words.js      – česká slovní banka (slovo, emoji, první hláska, slabiky, kategorie, rýmy)
js/engine/storage.js  – načtení/uložení/export stavu
js/engine/progress.js – model zvládnutí: okno posledních pokusů, postup/ústup úrovně, rozložené opakování
js/engine/recommender.js – plán sezení (hrana učení / opakování / nové), doporučení pro rodiče
js/engine/rng.js      – seedovatelný generátor náhody
js/tasks/*.js         – generátory úkolů podle dovednosti a úrovně → datový popis úkolu
js/ui/render.js       – vykreslení úkolu (mechaniky: výběr, více výběrů, přetažení, řazení, pexeso, pořadí, go/no-go, posloupnost)
js/ui/icons.js        – čárové SVG ikony (sdílené s tiskem)
js/ui/audio.js        – zvuky (Web Audio) a řeč (SpeechSynthesis)
print/worksheets.js   – generátory pracovních listů (SVG) parametrizované aktuální úrovní dítěte
research/             – rešerše (raw/ po oblastech, RESEARCH.md souhrn, KONCEPT.md pedagogický koncept)
```

## Model dat (localStorage klíč `skolicka.v1`)
```js
{
  version: 1,
  child: { name, birthdate, avatar },
  settings: { speech, sound, tasksPerSession },
  skills: { [skillId]: { level, mastered: [levelIdx…], history: { [levelIdx]: [{t, ok, ms}] }, lastPracticed, nextReview, intervalDays, struggling } },
  sessions: [{ start, end, tasks, correct, byDomain }],
  worksheets: [{ id, type, skill, level, date, result: 'sam'|'pomoc'|'tezke' }],
  stickers: ['🦊', …],
  log: [{ t, skill, level, ok, ms }]   // posledních 3000 pokusů
}
```

## Model zvládnutí (progress.js)
- Pro každou dovednost je aktivní **úroveň**. Pokusy na úrovni se ukládají do okna posledních 12.
- **Zvládnuto**: ≥ 8 pokusů a úspěšnost ≥ 80 %, nebo 5 správně po sobě s rychlou odpovědí (rychlá kalibrace u toho, co dítě už umí). Úroveň se posune výš.
- **Příliš těžké**: z posledních 6 pokusů ≤ 2 správně → úroveň o jednu dolů (na nejnižší zůstane a dovednost se označí `struggling` – rodič dostane tip na offline aktivitu).
- **Opakování**: zvládnuté úrovně se vrací v rozšiřujících se intervalech (2 → 4 → 8 → 16 → 30 dní). Neúspěšné opakování interval zkrátí na 1 den.
- Cílová úspěšnost sezení ~ 75–85 % (zóna přiměřené obtížnosti).

## Plán sezení (recommender.js)
- Výchozí délka 10 úkolů (~ 8–12 min). Složení: ~60 % „hrana učení“ (aktivní úrovně), ~25 % opakování zvládnutého, ~15 % nové dovednosti s odemčenými prerekvizitami.
- Prokládání oblastí (po sobě pokud možno ne stejná oblast), vyvážení oblastí podle posledních 7 dní, max. 1 „struggling“ dovednost na sezení.
- Dítě má i volný výběr („Chci si vybrat“), ten se do modelu počítá stejně.

## Zpětná vazba
- Okamžitá, informativní: po chybě se zvýrazní správná odpověď, dítě dostane druhý pokus; po druhé chybě se ukáže řešení a jde se dál.
- Chvála procesu, ne osoby („Zkoušel jsi to znovu, to je ono!“), žádné trestající zvuky, žádné skóre proti ostatním.
- Jemná odměna: za každé sezení samolepka zvířátka do sbírky (bez vazby na počet chyb).
