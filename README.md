# 🏫 Školička

Osobní vzdělávací aplikace pro předškoláka (4–6 let): hravé interaktivní úkoly na počítači + pracovní listy k černobílému tisku. Na pozadí sleduje, jak se dítěti daří, přizpůsobuje obtížnost a navrhuje rodičům další kroky. Postaveno na rešerši 120+ zdrojů (viz [research/RESEARCH.md](research/RESEARCH.md) a [research/KONCEPT.md](research/KONCEPT.md)).

## Co umí
- **7 oblastí, 38 dovedností, 110+ úrovní**: čísla (počítání, subitizace, číslice, číselná řada, porovnávání, sčítání, odčítání, rozklady), písmena a slova (písmena, hlásky, slabiky a rýmy, skládání a čtení slov, slovní zásoba), logika (vzory, třídění, řazení, analogie, posloupnosti, sudoku, hádanky), paměť a pozornost (pexeso, Simon, go/no-go, co zmizelo, najdi stejný), tvary a prostor (tvary, symetrie, orientace, rotace, skládání), svět kolem nás (čas, příroda, hodiny), ruka a tužka (jen tisk).
- **Dítě nemusí umět číst**: zadání se čtou nahlas českým hlasem (Web Speech API), ovládání je obrázkové.
- **Adaptivní obtížnost**: zvládnuto = ≥ 8 pokusů s úspěšností ≥ 80 % (nebo 5 správně po sobě), příliš těžké = ≤ 2 správně z posledních 6 → o úroveň níž. Zvládnuté úrovně se vracejí po 2, 4, 8, 16, 30 dnech.
- **Plán sezení** ~10 úkolů (8–12 min): 60 % hrana učení, 25 % opakování, 15 % nové dovednosti, prokládání oblastí.
- **Rodičovská sekce**: přehled a graf, mapa dovedností s ručním posunem úrovní, doporučení (co dál, offline tipy), pracovní listy, nastavení, export/import dat.
- **15 typů pracovních listů** generovaných podle aktuální úrovně dítěte (spojovačky, počítání, sčítání, domečky, číselná řada, porovnávání, hledání písmen, obtahování, první hláska, vzory, labyrint, čáry, zrcadlo, sudoku, co nepatří).
- **Soukromí**: žádný server, žádná telemetrie. Vše v `localStorage` prohlížeče, záloha do JSON.

## Spuštění
```bash
python3 -m http.server 8791
```
a otevřít <http://localhost:8791/>. Pracovní listy: <http://localhost:8791/print/>. Náhled jednotlivých úkolů: <http://localhost:8791/dev/playground.html>.

Nebo `python3 build.py` → `Skolicka.html` (jeden soubor, otevře se dvojklikem; pracovní listy vyžadují složku `print/`).

Český hlas: v macOS *Nastavení → Přístupnost → Předčítaný obsah → Hlasy systému* stáhnout češtinu (Zuzana). Bez něj aplikace funguje, ale nečte nahlas.

## Struktura
Viz [docs/ARCHITEKTURA.md](docs/ARCHITEKTURA.md). Krátce: `index.html` + `css/` + `js/` (data → engine → tasks → ui → app), `print/` (generátor listů), `research/` (rešerše), `dev/` (hřiště).

## Pedagogické zásady (zkráceně)
1. Vedená hra, ne drilování – krátká sezení, zájem dítěte vede.
2. Chyba je informace: druhý pokus, pak ukázat řešení, jít dál. Žádné trestání, žádné skóre proti jiným.
3. Chvála procesu („zkoušel jsi to znovu“), ne osoby („jsi chytrý“).
4. Odměna jen symbolická (samolepka za sezení, ne za výkon).
5. Obrazovka je doplněk: ruka, tužka, deskové hry, matematická řeč a čtení s rodičem dělají většinu práce.

## Licence
MIT. Emoji jsou systémové; čárové ikony a kód jsou vlastní.
