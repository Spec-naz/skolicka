# ŠKOLIČKA – vzdělávací aplikace pro předškoláka

**ID projektu:** skolicka · **Oblast:** APP LAB · **Stav:** v0.1 funkční prototyp, veřejně na GitHub Pages (2026-11-13)

## Cíl
Osobní, vědecky podložená vzdělávací aplikace pro syna (4,5 roku): interaktivní úkoly s hezkou grafikou na počítači + pracovní listy k černobílému tisku, sledování pokroku na pozadí a návrhy dalších rozvojových kroků. Oblasti: čísla, písmena, logika, paměť/pozornost, tvary a prostor, svět kolem nás, grafomotorika.

## Co je hotovo (v0.1, 2026-11-13)
- **Rešerše**: 124 anotovaných zdrojů v 6 oblastech (`research/raw/01–06`), sjednocený `research/RESEARCH.md` (klíčová zjištění, designová pravidla, co evidence nepodporuje, mapování dovednost → zdroje) a pedagogický koncept `research/KONCEPT.md`.
- **Aplikace** (čisté HTML/JS, bez závislostí): 38 dovedností / 110+ úrovní, 10 herních mechanik, český hlas, rychlá kalibrace při prvním spuštění, adaptivní model zvládnutí s rozloženým opakováním, plánovač sezení, samolepky, rodičovská sekce (přehled, dovednosti, doporučení, listy, nastavení, export/import).
- **Pracovní listy**: 15 generátorů (SVG, A4, černobílé), parametrizované úrovní dítěte, s polem pro hodnocení rodičem; zápis výsledku v aplikaci.
- GitHub: veřejný repozitář Spec-naz/skolicka, aplikace běží na <https://spec-naz.github.io/skolicka/>.
- `build.py` → jednosouborová `Skolicka.html`; `dev/playground.html` pro náhled úkolů.
- Ověřeno v prohlížeči: 3 300 vygenerovaných úkolů bez chyby, simulace 30 dní sezení, všechny mechaniky a listy vizuálně zkontrolovány.

## Další kroky
- Pozorovat syna při prvních 5 sezeních a upravit: délku zadání, rychlost hlasu, obtížnost kalibrace.
- Přidat zvukové nahrávky zadání (ElevenLabs) jako náhradu syntézy, pokud bude hlas rušit.
- Více obsahu: další příběhy/hádanky/analogie, slovní banka 150+ slov, vícečetné tvary pro spojovačky.
- Dotykové testy na iPadu (Pages už běží).
- Rozšíření „Svět kolem nás“ (badatelské mini-úkoly s rodičem mimo obrazovku) a sociálně-emoční oblast podle RESEARCH.md.

## Rozhodnutí
- 2026-11-13: Repozitář zveřejněn kvůli GitHub Pages (v repu nejsou žádná data dítěte, vše je jen v localStorage).
- 2026-11-13: Čisté HTML/JS bez build kroku (stejně jako VLÁČKY) – přenositelnost, offline, žádný server; data jen v localStorage + JSON záloha (soukromí dítěte, GDPR-K).
- 2026-11-13: Obrazovka bez textu pro dítě, zadání čte Web Speech API cs-CZ; rodičovská část za jednoduchou početní bránou.
- 2026-11-13: Žádné body/žebříčky/hmotné odměny; samolepka za dokončené sezení bez vazby na výkon (Lepper, Deci; Dweck).
- 2026-11-13: Kritérium zvládnutí 8 pokusů / 80 %, cílová úspěšnost sezení 75–85 % (Wilson 2019, Fazio & Marsh), opakování 2-4-8-16-30 dní (Cepeda).
