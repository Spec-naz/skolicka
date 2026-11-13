# Oblast 5: Digitální učení, motivace a adaptivní hodnocení

> Rešerše k 13. 11. 2026. Každý zdroj byl ověřen webovým vyhledáváním a/nebo přímým načtením stránky (abstrakt, oficiální shrnutí, repozitář). Údaje, které se nepodařilo ověřit v primárním textu, jsou označeny „(neověřeno)“.

## Shrnutí oblasti (10–15 vět)

Evidence o digitálním učení předškoláků se dnes opírá o několik pevných bodů. Zaprvé, aplikace učí jen tehdy, když je dítě „minds-on“, nikoli jen „fingers-on“: rámec čtyř pilířů (aktivní, zaujaté bez rušivých prvků, smysluplné, sociálně interaktivní učení s jasným cílem) z Hirsh-Pasek et al. 2015 je dodnes nejcitovanější měřítko kvality a obsahová analýza 124 nejstahovanějších „vzdělávacích“ aplikací (Meyer et al. 2021) ukázala, že většina z nich tyto pilíře neplní – zejména zdarma dostupné aplikace kvůli rušivým prvkům. Zadruhé, odborné instituce (NAEYC & Fred Rogers Center 2012, AAP 2016 a nová politika AAP 2026, WHO 2019) se shodují, že u dětí 2–5 let má být sedavý čas u obrazovky krátký (WHO: max. 1 hodina denně, méně je lépe), obsah kvalitní a užívání společné s dospělým; AAP od roku 2026 přesouvá důraz z minutových limitů na design prostředí (žádné nekonečné scrollování, autoplay, manipulativní odměny). Zatřetí, malé děti trpí „transfer deficitem“ (Barr): z obrazovky se přenáší do reality výrazně méně než z živé interakce, ale deficit snižuje interaktivita, sociální kontingence a hlavně verbální scaffolding rodiče – proto je spoluužívání (joint media engagement, Takeuchi & Stevens 2011) a propojení s tiskovými listy klíčové. RCT studie (Berkowitz 2015 – Bedtime Math; Outhwaite 2019 – onebillion; Schacter & Jo – Math Shelf) prokazují, že krátké, pravidelné a kurikulárně zaměřené dávky (cca 10–30 min, několikrát týdně, 12–22 týdnů) přinášejí reálné matematické zisky i u 4–5letých, a to zvlášť u dětí, které startují níže nebo mají úzkostné rodiče. Ve sféře motivace je nejsilnější varování před očekávanými hmotnými odměnami: Lepper et al. 1973 (předškoláci) a meta-analýza Deci, Koestner & Ryan 1999 (128 studií) ukazují, že odměny podmíněné výkonem snižují vnitřní zájem; teorie sebeurčení (Deci & Ryan 2000) nabízí alternativu – podporovat autonomii, kompetenci a vztah. Chvála má mířit na proces a strategie, nikoli na „chytrost“ (Mueller & Dweck 1998; Gunderson et al. 2013 – procesní chvála v 1–3 letech predikuje růstové nastavení v 7–8 letech), a jako odměna funguje u předškoláků lépe zajímavá informace než samolepka (Alvarez & Booth 2014). Gamifikace má celkově malý pozitivní efekt na učení (Sailer & Homner 2020, g ≈ 0,25–0,5), ale motivační efekty jsou nestabilní a u dětí nedoložené. Kognitivní věda učení dodává principy „žádoucích obtíží“ (Bjork), rozloženého procvičování (Cepeda 2006) a vybavování z paměti, které funguje už u předškoláků, pokud je úsilné, ale úspěšné (Fazio & Marsh 2019). Formální model (Wilson et al. 2019) ukazuje nejrychlejší učení při ~85 % úspěšnosti – dobré výchozí nastavení adaptivního algoritmu, ovšem odvozené z binárních úloh, nikoli z dětí. Mastery learning (Bloom; Kulik 1990) a formativní hodnocení (Black & Wiliam 1998) poskytují rámec pro „počítání úspěšnosti na pozadí“: krátká diagnostika, okamžitá zpětná vazba k úkolu (ne k osobě), opakování do zvládnutí a návrh dalšího kroku. Konečně pozornost 4–5letého dítěte při volné hře trvá řádově jednotky minut (Ruff & Lawson 1990), což spolu s limity WHO vede k doporučení krátkých sezení (10–15 min), a sběr dat o dítěti podléhá zásadám COPPA/GDPR (čl. 8; v ČR hranice 15 let) – u osobní rodinné aplikace stačí ukládat data lokálně a bez třetích stran.

## Designová pravidla pro aplikaci odvozená z evidence

**Délka a rytmus sezení**
- Jedno sezení 10–15 minut, maximálně 2 sezení denně; celkový sedavý čas u obrazovky za den držet pod 1 hodinou (WHO 2019 – 5.05; AAP 2016 – 5.04). Pozornost při volné hře u 3–5letých trvá jen několik minut, takže úkoly střídat po 2–4 minutách (Ruff & Lawson 1990 – 5.24).
- Pravidelnost poráží délku: Bedtime Math zlepšil výsledky už při užívání ~1× týdně, efekt rostl s frekvencí (Berkowitz 2015 – 5.08); onebillion 30 min/den 4×/týden po 12 týdnů (Outhwaite 2019 – 5.09); Math Shelf 15–22 týdnů (Schacter & Jo – 5.10).
- Učení rozkládat v čase, ne nahromadit: rozložené opakování je jeden z nejrobustnějších efektů v psychologii (Cepeda et al. 2006 – 5.18).
- Aplikace sama sezení ukončí („dnes hotovo“), žádné „ještě jedno kolo“, autoplay ani nekonečný proud úkolů (AAP 2026 – 5.04).

**Obsah a interakce**
- Každý úkol vyžaduje přemýšlení, ne jen klepnutí; žádné zvuky, animace a „miniher“ nesouvisející s cílem učení (Hirsh-Pasek 2015 – 5.01; Meyer 2021 – 5.02).
- Obsah navazovat na život dítěte (jeho hračky, dům, zahrada, jména) – smysluplnost je samostatný pilíř (5.01).
- Každou obrazovkovou dovednost zrcadlit v reálném světě: tiskový list, předměty na stole, společné „najdi doma“ – přímo cílí na transfer deficit (Barr – 5.07; Alvarez & Booth – 5.16).
- Interaktivita musí být cílená: u dvouletých pomáhá, když aplikace řekne „kam klepnout“, starší děti profitují z vlastní volby; zbytečné „klepni kamkoli“ ruší (Kirkorian 2016 v 5.07).

**Zapojení rodiče**
- Navrhovat na spoluužívání: aplikace klade otázky rodiči i dítěti („zeptej se tatínka…“), nabízí „co říct“ – verbální scaffolding rodiče je nejsilnější známý zmírňovač transfer deficitu (Barr 2019 – 5.07; Takeuchi & Stevens 2011 – 5.06; NAEYC 2012 – 5.03).
- Rodičovský panel ukazovat jako nástroj pro společnou řeč o učení, ne jako „žebříček“ (Black & Wiliam – 5.22).

**Zpětná vazba a chvála**
- Okamžitá, konkrétní, zaměřená na úkol a strategii („spočítal jsi to po jednom a vyšlo to“), nikdy na osobu („jsi chytrý“) a bez srovnávání s ostatními (Mueller & Dweck 1998 – 5.14; Gunderson 2013 – 5.15; Black & Wiliam 1998 – 5.22).
- Při chybě: neutrální tón, nápověda a druhý pokus, nikoli trest ani „smutný zvuk“; chyba je součást učení (Bjork – 5.18; Black & Wiliam – 5.22).

**Odměny a gamifikace**
- Žádné očekávané hmotné odměny „za splnění“ (hvězdy za každý úkol, virtuální mince, nákupy) – u předškoláků prokazatelně snižují vnitřní zájem (Lepper 1973 – 5.12; Deci, Koestner & Ryan 1999 – 5.13).
- Místo toho: překvapivá informace nebo zajímavost jako „odměna“ (Alvarez & Booth 2014 – 5.16), slovní zpětná vazba k procesu, volba dalšího úkolu dítětem (autonomie), viditelný vlastní pokrok (kompetence), společná činnost s rodičem (vztah) – SDT (Deci & Ryan 2000 – 5.11).
- Pokud gamifikace, pak příběh/avatar/sběratelské prvky vázané na obsah učení; odznaky a body mají nestabilní efekt a u 4–5letých chybí evidence (Sailer & Homner 2020 – 5.17).

**Adaptace obtížnosti a hodnocení na pozadí**
- Cílová úspěšnost ~80–85 % na úkol/sekvenci: pod ~70 % snížit obtížnost či dát scaffolding, nad ~90 % posunout výš (Wilson et al. 2019 – 5.20; Fazio & Marsh: vybavování má být úsilné, ale úspěšné – 5.19).
- Mastery přístup: dovednost označit za zvládnutou po stabilním výkonu (např. 4 z 5 správně v několika sezeních, ne v jednom), teprve pak posun; nezvládnuté dovednosti vracet s odstupem dní (Bloom/Kulik – 5.21; Cepeda – 5.18).
- Po několika týdnech zařazovat „staré“ dovednosti jako krátké opakování z paměti (retrieval practice), ne jen nové učení (Fazio & Marsh – 5.19).
- Formativní logika: krátké diagnostické položky → okamžitá zpětná vazba → návrh dalšího kroku pro dítě i rodiče; data slouží k úpravě výuky, ne ke známkování (Black & Wiliam – 5.22).

**Data a soukromí**
- Žádné SDK třetích stran, reklamy ani analytika odesílaná ven; data o výkonu dítěte ukládat lokálně/na vlastním účtu rodiče, minimalizovat, umožnit smazání (Reyes et al. 2018 – 5.23; GDPR čl. 8, zákon č. 110/2019 Sb. § 7 – 5.23).

## Zdroje

### 5.01 Čtyři pilíře vzdělávací aplikace (Hirsh-Pasek et al.)
- **Autoři / instituce, rok:** Hirsh-Pasek, K., Zosh, J. M., Golinkoff, R. M., Gray, J. H., Robb, M. B., Kaufman, J., 2015. *Psychological Science in the Public Interest*, 16(1), 3–34.
- **Typ:** přehledová studie (syntéza vědy o učení)
- **Odkaz:** https://doi.org/10.1177/1529100615569721 ; shrnutí APS: https://www.psychologicalscience.org/index.php/publications/educational-apps.html
- **Klíčová zjištění:** Aplikace pro děti 0–8 let je vzdělávací, když podporuje učení (1) aktivní („minds-on“ – mentální úsilí, ne jen swipování), (2) zaujaté bez rušivých prvků (zvuky, pohyb a vedlejší hry nesouvisející s cílem odvádějí pozornost), (3) smysluplné (navazuje na život a znalosti dítěte) a (4) sociálně interaktivní (s rodičem, vrstevníkem nebo reagující postavou) – a to vždy v rámci jasného učebního cíle. E-knihy „s mnoha zvonky a píšťalkami“ odvádějí malé děti od příběhu. Autoři zdůrazňují, že v App Storu bylo již v roce 2015 přes 80 000 netestovaných „vzdělávacích“ aplikací.
- **Důsledek pro aplikaci (dítě 4–5 let):** Každý úkol projít kontrolním seznamem čtyř pilířů + explicitní cíl; vyškrtat ozdobné animace a zvuky, které nenesou informaci; ke každému tématu přidat „otázku pro tatínka“ a propojení s domácím prostředím.
- **Síla důkazu:** vysoká (autoritativní syntéza, extrémně citovaná), ale jde o rámec, ne o jednu empirickou studii.

### 5.02 Jak vzdělávací jsou „vzdělávací“ aplikace (Meyer et al.)
- **Autoři / instituce, rok:** Meyer, M., Zosh, J. M., McLaren, C., Robb, M., McCafferty, H., Golinkoff, R. M., Hirsh-Pasek, K., Radesky, J., 2021. *Journal of Children and Media*, 15(4), 526–548.
- **Typ:** obsahová analýza (průřezová studie)
- **Odkaz:** https://doi.org/10.1080/17482798.2021.1882516 ; PMC8916741
- **Klíčová zjištění:** Autoři převedli čtyři pilíře na kódovací schéma (0–3 body za pilíř) a ohodnotili 100 nejstahovanějších dětských vzdělávacích aplikací (Google Play + App Store) a 24 aplikací nejčastěji hraných předškoláky v longitudinální kohortě. Skóre byla nízká ve všech pilířích. Bezplatné aplikace měly významně nižší skóre v pilíři „zaujetí“ (p < .0001) i celkově (p < .0047) kvůli rušivým prvkům (reklamy, vyskakovací okna, odměny nesouvisející s učením).
- **Důsledek pro aplikaci (dítě 4–5 let):** Nekopírovat vzory z populárních aplikací; typické „engagement“ mechaniky (odměnové animace, sběr mincí, autoplay) jsou právě to, co skóre srazilo. Navrhnout si vlastní čtyřpilířový audit a každou novou aktivitu jím projít.
- **Síla důkazu:** střední (deskriptivní studie, ale velký vzorek a transparentní metodika).

### 5.03 Stanovisko NAEYC & Fred Rogers Center k technologiím (2012)
- **Autoři / instituce, rok:** National Association for the Education of Young Children & Fred Rogers Center for Early Learning and Children's Media, 2012: *Technology and Interactive Media as Tools in Early Childhood Programs Serving Children from Birth through Age 8*.
- **Typ:** oficiální doporučení / pozice odborné organizace
- **Odkaz:** https://www.naeyc.org/resources/position-statements/technology-and-media ; klíčové zprávy: https://www.fredrogersinstitute.org/resources/key-messages-of-the-naeyc/fred-rogers-center-position-statement-on-technology-and-interactive-media-in-early-childhood-programs
- **Klíčová zjištění:** Technologie a interaktivní média jsou při záměrném a vývojově přiměřeném užití účinným nástrojem učení; mají doplňovat, ne nahrazovat hru, pohyb, tvoření a interakci s lidmi. Pasivní neinteraktivní média (TV, video) nemají místo u dětí do 2 let a mají být omezena u starších; dospělý má být aktivním spoluúčastníkem a vybírat obsah podle cílů dítěte. Stanovisko zdůrazňuje rovnost přístupu, vyvažování s ostatními činnostmi a to, že samotná „interaktivita“ nestačí – rozhoduje kvalita obsahu a kontext.
- **Důsledek pro aplikaci (dítě 4–5 let):** Aplikace je jeden z nástrojů v mixu (tiskové listy, stavebnice, pohyb venku) – ne hlavní kanál učení; návrh má počítat s dospělým vedle dítěte, nikoli s dítětem o samotě.
- **Síla důkazu:** střední (konsenzuální stanovisko, nikoli primární data; stále citované, ale z roku 2012).

### 5.04 Doporučení AAP: „Media and Young Minds“ (2016) a „Digital Ecosystems, Children, and Adolescents“ (2026)
- **Autoři / instituce, rok:** American Academy of Pediatrics, Council on Communications and Media. 2016: *Media and Young Minds*, *Pediatrics* 138(5), e20162591. 2026: *Digital Ecosystems, Children, and Adolescents* (politické stanovisko + technická zpráva), *Pediatrics*, únor 2026 (online 20. 1. 2026).
- **Typ:** oficiální doporučení
- **Odkaz:** 2016: https://doi.org/10.1542/peds.2016-2591 ; 2026: https://publications.aap.org/pediatrics/article/157/2/e2025074064/202648/Digital-Ecosystems-Children-and-Adolescents ; shrnutí: https://www.healthychildren.org/English/news/Pages/creating-a-child-friendly-digital-world-AAP-releases-new-media-recommendations.aspx
- **Klíčová zjištění:** 2016: děti 2–5 let max. 1 hodina denně kvalitního obsahu, pokud možno společně s rodičem (co-viewing), aby mu rodič pomohl pochopit a přenést obsah do světa; žádné obrazovky u jídla, v ložnici a hodinu před spaním; do 18 měsíců jen videohovory. 2026: nová politika nahrazuje předchozí doporučení, odstupuje od čistě časových limitů a klade důraz na „digitální ekosystém“ – design platforem (nekonečné scrollování, autoplay, engagement mechaniky), rodinný mediální plán, mediálně volné časy a místa, spánek, rámec „5 C“ (child, content, calm, crowding out, communication). Konkrétní znění doporučení pro 0–5 let v plném textu 2026 se nepodařilo načíst (neověřeno).
- **Důsledek pro aplikaci (dítě 4–5 let):** Zabudovat tvrdý denní limit (např. 2 × 15 min) a „konec sezení“ bez návnad; nepoužívat žádné mechaniky navržené k prodlužování užívání; preferovat režim „s rodičem“; nikdy nenabízet aplikaci večer před spaním.
- **Síla důkazu:** vysoká jako autoritativní doporučení (opřené o technické zprávy), střední co do kauzální evidence (sami autoři uvádějí, že kauzální závěry zůstávají omezené).

### 5.05 WHO: pohyb, sedavé chování a spánek dětí do 5 let (2019)
- **Autoři / instituce, rok:** World Health Organization, 2019: *Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age*.
- **Typ:** oficiální doporučení (guideline založený na systematických přehledech)
- **Odkaz:** https://www.who.int/publications/i/item/9789241550536 ; tisková zpráva: https://www.who.int/news/item/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more
- **Klíčová zjištění:** Děti 3–4 roky: nejméně 180 minut pohybové aktivity denně, z toho nejméně 60 minut střední až vysoké intenzity; sedavý čas u obrazovky nejvýše 1 hodina denně („méně je lépe“); 10–13 hodin kvalitního spánku; nebýt připoután/usazen déle než 1 hodinu v kuse. Při sezení WHO výslovně doporučuje interaktivní neobrazovkové činnosti s pečující osobou – čtení, vyprávění, zpěv, hádanky. Děti 1 rok: žádný sedavý čas u obrazovky; 2 roky: max. 1 hodina.
- **Důsledek pro aplikaci (dítě 4–5 let):** Celkový rozpočet 60 minut/den sdílí aplikace s pohádkami a vším ostatním – aplikace má tedy mířit na 10–15 minut; tiskové listy a „úkoly do pohybu“ (najdi 5 červených věcí v bytě) jsou v souladu s WHO a měly by tvořit většinu obsahu.
- **Síla důkazu:** vysoká (globální guideline), i když samotné důkazy pro obrazovkový limit WHO hodnotí jako nízké až velmi nízké kvality – limit je zčásti opatrnostní.

### 5.06 Společné užívání médií – „The New Coviewing“ (Takeuchi & Stevens)
- **Autoři / instituce, rok:** Takeuchi, L., Stevens, R., 2011. *The New Coviewing: Designing for Learning through Joint Media Engagement*. Joan Ganz Cooney Center at Sesame Workshop & LIFE Center.
- **Typ:** přehledová studie / designový rámec
- **Odkaz:** https://joanganzcooneycenter.org/publication/the-new-coviewing-designing-for-learning-through-joint-media-engagement/ (PDF: https://joanganzcooneycenter.org/wp-content/uploads/2011/12/jgc_coviewing_desktop.pdf)
- **Klíčová zjištění:** Pojem „joint media engagement“ (JME) rozšiřuje společné sledování TV na všechny platformy: učení z médií je nejsilnější, když dítě a dospělý (nebo sourozenec) média užívají spolu, mluví o nich a propojují je s realitou. Zpráva formuluje designové podmínky JME: společná pozornost, vzájemnost, vlastní smysluplnost pro oba, obsah „na dosah“ dítěte a navazování na známé. Doporučuje podporovat více uspořádání (dítě samo, se sourozencem, s rodičem) – žádné jediné nebylo prokázáno jako nejlepší.
- **Důsledek pro aplikaci (dítě 4–5 let):** Zabudovat „rodičovské repliky“ (co se zeptat, co pochválit), střídání tahů rodič–dítě, úkoly, kde rodič je „asistent“ (drží kartičky, čte zadání). Panel pro rodiče má generovat podněty k rozhovoru, ne jen statistiky.
- **Síla důkazu:** střední (syntéza a případové studie, nikoli RCT; silně citovaný rámec).

### 5.07 Transfer deficit – učení z obrazovky vs. z reality (Barr; Kirkorian)
- **Autoři / instituce, rok:** Barr, R., 2013: *Memory constraints on infant learning from picture books, television, and touchscreens*, *Child Development Perspectives*, 7(4), 205–210. Barr, R., 2019: *Growing up in the digital age: Early learning and family media ecology*, *Current Directions in Psychological Science*, 28(4), 341–346. Kirkorian, H. L., Choi, K., Pempek, T. A., 2016: *Toddlers' word learning from contingent and noncontingent video on touch screens*, *Child Development*, 87(2), 405–413.
- **Typ:** přehledová studie (Barr) + experiment (Kirkorian)
- **Odkaz:** https://doi.org/10.1111/cdep.12041 ; https://doi.org/10.1177/0963721419838245 (PMC6697422) ; https://doi.org/10.1111/cdev.12508
- **Klíčová zjištění:** Malé děti se z obrazovky (TV, tablet, obrázková kniha) naučí méně než z živé demonstrace – „transfer deficit“, který může činit až ~50 % (údaj z Barr 2019; přesná velikost závisí na složitosti úkolu, paměťové zátěži a počtu opakování). Mechanismy: nezralá flexibilita paměti (potíže s vybavením při změně kontextu), slabé symbolické chápání vztahu 2D–3D a chybějící sociální kontingence. Deficit zmírňují: interaktivita s cílem (u 2letých pomáhá, když aplikace říká „kam klepnout“; u 2,5letých volba vlastní), sociálně kontingentní partner a především verbální scaffolding rodiče během užívání. Kirkorian 2016 (116 dětí 24–36 měs.) ukázala, že nejmladší se slovo naučily z kontingentního videa, ale nutnost „klepnout kamkoli“ starší děti rušila.
- **Důsledek pro aplikaci (dítě 4–5 let):** Nepředpokládat, že co dítě zvládne na obrazovce, umí i s předměty – každou dovednost ověřit tiskovým listem / reálnými předměty a vést rodiče, aby pojmenovával („to je stejný trojúhelník jako na obrazovce“). Interakce má být účelná (přetáhni správný počet), ne „klepni pro pokračování“.
- **Síla důkazu:** vysoká pro existenci deficitu (desítky experimentů, 1–3 roky), střední pro věk 4–5 let (deficit s věkem slábne, přesná velikost u 4–5letých neověřena).

### 5.08 Bedtime Math – RCT domácí matematické aplikace (Berkowitz et al.)
- **Autoři / instituce, rok:** Berkowitz, T., Schaeffer, M. W., Maloney, E. A., Peterson, L., Gregor, C., Levine, S. C., Beilock, S. L., 2015. *Science*, 350(6257), 196–198.
- **Typ:** RCT (terénní randomizovaný experiment)
- **Odkaz:** https://doi.org/10.1126/science.aac7427 ; PMID 26450209 ; shrnutí: https://www.sciencedaily.com/releases/2015/10/151008152222.htm
- **Klíčová zjištění:** 587 prvňáčků a rodičů dostalo iPad s aplikací Bedtime Math (krátký příběh + matematické otázky, které rodič řeší s dítětem) nebo s kontrolní čtenářskou aplikací. Čím častěji rodina aplikaci používala, tím větší byl roční zisk v matematice; častí uživatelé předstihli kontrolu o ~3 měsíce matematického učení a i užití ~1× týdně mělo efekt. Největší přínos měly děti matematicky úzkostných rodičů – aplikace přerušila přenos úzkosti na výkon dítěte. Komentář Franka (2016) zpochybnil část statistiky; autoři trvají na závěrech při mírně odlišné interpretaci.
- **Důsledek pro aplikaci (dítě 4–5 let):** Formát „příběh + 2–3 otázky, které rodič řeší s dítětem“ je ověřený; dávkování několik minut před spaním / večer několikrát týdně stačí. Dát rodiči hotové otázky i správné odpovědi, aby se nebál „udělat chybu“.
- **Síla důkazu:** vysoká (velké RCT v Science), s výhradou, že děti byly o 1–2 roky starší než cílová skupina.

### 5.09 onebillion – RCT matematických aplikací u 4–5letých (Outhwaite et al.)
- **Autoři / instituce, rok:** Outhwaite, L. A., Faulder, M., Gulliford, A., Pitchford, N. J., 2019 (online 2018). *Raising early achievement in math with interactive apps: A randomized control trial*. *Journal of Educational Psychology*, 111(2), 284–298.
- **Typ:** RCT
- **Odkaz:** https://doi.org/10.1037/edu0000286 ; repozitář: https://research.birmingham.ac.uk/en/publications/raising-early-achievement-in-math-with-interactive-apps-a-randomi
- **Klíčová zjištění:** 389 dětí ve věku 4–5 let v britských reception třídách, 12 týdnů, tři podmínky: aplikace navíc k běžné výuce, aplikace místo jedné běžné skupinové matematické aktivity (časově ekvivalentní), kontrola (běžná výuka). Obě aplikační skupiny dosáhly významně větších zisků než kontrola, včetně přenosu do vyšších forem uvažování a řešení problémů; mezi oběma aplikačními skupinami nebyl rozdíl. Aplikace onebillion vedou dítě malými kroky s okamžitou zpětnou vazbou a vyžadují zvládnutí před postupem. Dávkování v souvisejících evaluacích (EEF): 30 min denně, 4 dny v týdnu (údaj z stránek vývojáře).
- **Důsledek pro aplikaci (dítě 4–5 let):** Přesně cílová věková skupina: krátké strukturované bloky s okamžitou zpětnou vazbou a mastery postupem fungují u 4–5letých, i když nahradí část jiné výuky. Lineární kurikulum s malými kroky + opakování do zvládnutí je bezpečná volba.
- **Síla důkazu:** vysoká (RCT na úrovni žáka, publikováno v APA časopise; spoluautorství vývojářů – nezávislé replikace existují jen částečně).

### 5.10 Math Shelf – tabletové kurikulum číselného smyslu pro předškoláky (Schacter & Jo)
- **Autoři / instituce, rok:** Schacter, J., Jo, B., 2016: *Improving low-income preschoolers' mathematics achievement with Math Shelf, a preschool tablet computer curriculum*, *Computers in Human Behavior*, 55, 223–229. Schacter, J., Jo, B., 2017: *Improving preschoolers' mathematics achievement with tablets: a randomized controlled trial*, *Mathematics Education Research Journal*, 29(3), 313–327. Schacter, J. et al., 2016: *Math Shelf: A randomized trial of a prekindergarten tablet number sense curriculum*, *Early Education and Development*, 27(1), 74–88.
- **Typ:** RCT (série)
- **Odkaz:** https://doi.org/10.1016/j.chb.2015.09.013 ; https://doi.org/10.1007/s13394-017-0203-9 ; https://doi.org/10.1080/10409289.2015.1057462
- **Klíčová zjištění:** Math Shelf (hry podle Montessori principů, adaptivní postup od subitizace a počítání k operacím) testovaný v Head Start a nízkopříjmových předškolních třídách: 100 dětí vs. „nejlépe hodnocené matematické aplikace“ po stejnou dobu → d = 0,57; 273 dětí, 15 týdnů vs. běžné kurikulum → d = 1,09; 433 dětí, 22 týdnů vs. kvalitní manipulativní výuka učitelem → d = 0,94, u nízko výkonných d = 1,27. Efekty byly největší u dětí s nejnižším startem. (Údaje z abstraktů; plný text 2017 byl za paywallem – minuty na sezení neověřeno.)
- **Důsledek pro aplikaci (dítě 4–5 let):** Sekvence „subitizace → počítání → porovnávání množství → číslice → sčítání“ s adaptivním postupem a mnoha krátkými opakováními je u 4letých účinná; výběr aplikace podle hodnocení v obchodě (kontrolní skupina) neučí – rozhoduje kurikulární struktura.
- **Síla důkazu:** střední až vysoká (opakované RCT, velké efekty, ale vše od tvůrce programu; nezávislá replikace chybí).

### 5.11 Teorie sebeurčení – autonomie, kompetence, vztah (Deci & Ryan)
- **Autoři / instituce, rok:** Deci, E. L., Ryan, R. M., 2000. *The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior*. *Psychological Inquiry*, 11(4), 227–268.
- **Typ:** teoretická přehledová studie
- **Odkaz:** https://doi.org/10.1207/S15327965PLI1104_01 ; PDF: https://www.selfdeterminationtheory.org/SDT/documents/2000_DeciRyan_PIWhatWhy.pdf
- **Klíčová zjištění:** Tři vrozené psychologické potřeby – kompetence, autonomie a vztahovost (relatedness) – podmiňují vnitřní motivaci a internalizaci. Prostředí, které je podporuje (volba, optimální výzva, informační – nikoli kontrolující – zpětná vazba, vřelý vztah), zvyšuje vnitřní motivaci a kvalitu učení; kontrolující prostředí (tlak, dohled, odměny podmíněné výkonem, hodnocení) ji snižuje. Článek má přes 20 000 citací a je základem pro motivační design.
- **Důsledek pro aplikaci (dítě 4–5 let):** Nabízet volbu (které téma/postava dnes), optimální výzvu (adaptivní obtížnost), informační zpětnou vazbu („teď už umíš počítat do 7“) místo kontrolní („musíš splnit“), a společnou činnost s rodičem jako naplnění potřeby vztahu.
- **Síla důkazu:** vysoká (teorie s rozsáhlou empirickou podporou včetně meta-analýz).

### 5.12 Overjustification efekt u předškoláků (Lepper, Greene & Nisbett)
- **Autoři / instituce, rok:** Lepper, M. R., Greene, D., Nisbett, R. E., 1973. *Undermining children's intrinsic interest with extrinsic reward: A test of the "overjustification" hypothesis*. *Journal of Personality and Social Psychology*, 28(1), 129–137.
- **Typ:** experiment (terénní, s předškoláky)
- **Odkaz:** https://doi.org/10.1037/h0035519
- **Klíčová zjištění:** Předškoláci (Bing Nursery School, Stanford; 40–64 měsíců), kteří rádi kreslili fixy, byli rozděleni do skupin: očekávaná odměna („Good Player“ certifikát), neočekávaná odměna, bez odměny. Děti, které kreslily s příslibem odměny, se poté ve volné hře kreslení věnovaly výrazně méně než děti z ostatních skupin; neočekávaná odměna zájem nesnížila. Vysvětlení: dítě přisoudí činnost odměně a sníží její vnitřní hodnotu. (Sekundární zdroje se liší v uváděné velikosti vzorku – 51 vs. 69 dětí; neověřeno v originálu.)
- **Důsledek pro aplikaci (dítě 4–5 let):** Nikdy nevázat úkol na předem slíbenou odměnu („až to splníš, dostaneš hvězdu“). Pokud něco oslavit, pak nečekaně a slovně; aktivity, které dítě baví samy (kreslení, příběhy), nechat bez jakéhokoli odměnového systému.
- **Síla důkazu:** střední (klasický experiment s malým vzorkem; efekt potvrzen meta-analýzou 5.13, ale diskutován Cameronem & Piercem).

### 5.13 Meta-analýza: vnější odměny podrývají vnitřní motivaci (Deci, Koestner & Ryan)
- **Autoři / instituce, rok:** Deci, E. L., Koestner, R., Ryan, R. M., 1999. *A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation*. *Psychological Bulletin*, 125(6), 627–668.
- **Typ:** meta-analýza (128 studií)
- **Odkaz:** https://doi.org/10.1037/0033-2909.125.6.627 ; PDF: https://www.selfdeterminationtheory.org/SDT/documents/2001_DeciKoestnerRyan.pdf
- **Klíčová zjištění:** Hmotné odměny snižují vnitřní motivaci měřenou volným výběrem činnosti: odměny za zapojení d = −0,40, za dokončení d = −0,36, za výkon d = −0,28; efekt byl silnější u dětí než u studentů. Slovní odměny (pozitivní zpětná vazba) vnitřní motivaci zvyšují (u dospělých; u dětí byl efekt slabší/nejistý). Neočekávané odměny a odměny nepodmíněné úkolem motivaci nesnižují. Kritika Cameron & Pierce a Lepper et al. (tamtéž) upozorňuje na meze meta-analytického slučování.
- **Důsledek pro aplikaci (dítě 4–5 let):** Z odměnového designu vyškrtnout vše hmotné a očekávané (body, mince, nálepky za úkol); používat informační slovní zpětnou vazbu a případně nečekané „překvapení“ nevázané na výkon.
- **Síla důkazu:** vysoká (rozsáhlá meta-analýza), s vědomím trvající odborné debaty o velikosti efektu v aplikovaných podmínkách.

### 5.14 Chvála za inteligenci vs. za úsilí (Mueller & Dweck)
- **Autoři / instituce, rok:** Mueller, C. M., Dweck, C. S., 1998. *Praise for intelligence can undermine children's motivation and performance*. *Journal of Personality and Social Psychology*, 75(1), 33–52.
- **Typ:** série 6 experimentů
- **Odkaz:** https://doi.org/10.1037/0022-3514.75.1.33 ; PDF: https://www.columbia.edu/cu/psychology/courses/3615/Readings/Mueller_Dweck.pdf
- **Klíčová zjištění:** Děti 5. tříd (10–12 let) po úspěchu pochválené za inteligenci („jsi na to chytrý“) si následně volily snadnější úkoly, po neúspěchu ztrácely vytrvalost i radost, výkon jim klesl a častěji o výsledcích lhaly; děti chválené za úsilí/proces volily výzvy a po neúspěchu se zlepšily. Chvála za osobu vede k výkonovým cílům a fixnímu pojetí schopností.
- **Důsledek pro aplikaci (dítě 4–5 let):** Všechny hlášky úspěchu formulovat o procesu („zkoušel jsi to, až ti to vyšlo“, „dobře jsi je spočítal po jednom“), nikdy o osobě („jsi šikovný/chytrý“); po chybě nabídnout výzvu místo útěchy.
- **Síla důkazu:** vysoká pro děti školního věku (replikovaný paradigmatický výzkum), střední pro přenos na 4–5leté (viz 5.15).

### 5.15 Procesní chvála rodičů v 1–3 letech a růstové nastavení v 7–8 letech (Gunderson et al.)
- **Autoři / instituce, rok:** Gunderson, E. A., Gripshover, S. J., Romero, C., Dweck, C. S., Goldin-Meadow, S., Levine, S. C., 2013. *Parent praise to 1- to 3-year-olds predicts children's motivational frameworks 5 years later*. *Child Development*, 84(5), 1526–1541.
- **Typ:** longitudinální studie
- **Odkaz:** https://doi.org/10.1111/cdev.12064
- **Klíčová zjištění:** 53 rodin z Chicaga natáčených doma, když bylo dítěti 14, 26 a 38 měsíců; o 5 let později (7–8 let) měřeny motivační rámce. Podíl procesní chvály (úsilí, strategie, činnosti) v raném věku predikoval, že dítě bude věřit ve zlepšitelnost schopností, preferovat výzvy a mít strategie při neúspěchu. Chvála za osobu („hodná holčička“, „jsi chytrý“) ani celkové množství chvály nic nepredikovaly. Chlapci dostávali významně více procesní chvály než děvčata.
- **Důsledek pro aplikaci (dítě 4–5 let):** Potvrzuje relevanci procesní chvály právě u batolat a předškoláků; aplikace může rodiči nabízet vzorové procesní formulace a sama je používat; sledovat, aby „kladné hlášky“ byly o tom, co dítě dělalo, ne jaké je.
- **Síla důkazu:** střední (malý vzorek, korelační design, ale longitudinální a předregistrovaná hypotéza).

### 5.16 Znalost jako odměna – „Motivated by Meaning“ (Alvarez & Booth)
- **Autoři / instituce, rok:** Alvarez, A. L., Booth, A. E., 2014. *Motivated by meaning: Testing the effect of knowledge-infused rewards on preschoolers' persistence*. *Child Development*, 85(2), 783–791.
- **Typ:** experiment
- **Odkaz:** https://doi.org/10.1111/cdev.12151
- **Klíčová zjištění:** 56 dětí ve věku 3–4 let opakovaně plnilo motorický úkol (zasouvání 25 kolíčků) tak dlouho, jak chtěly. Děti odměňované „kauzálně bohatou“ informací (zajímavý fakt o novém zvířátku/předmětu – k čemu slouží, proč) vydržely významně déle než děti dostávající kauzálně chudou informaci nebo žádnou odměnu, a trend ukazoval i delší vytrvalost než u hmotné odměny (samolepky). Předškoláci jsou výrazně motivováni kauzálním vysvětlením.
- **Důsledek pro aplikaci (dítě 4–5 let):** Místo hvězd po úkolu odkrývat „proč“ a zajímavosti (obrázek + jedna věta o zvířeti/stroji/jevu); téma zajímavostí lze vázat na oblast úkolu, čímž odměna zároveň učí.
- **Síla důkazu:** střední (jeden experiment, malý vzorek, ale přímo věk 3–4 roky a publikováno v Child Development).

### 5.17 Gamifikace učení – meta-analýza (Sailer & Homner)
- **Autoři / instituce, rok:** Sailer, M., Homner, L., 2020. *The gamification of learning: a meta-analysis*. *Educational Psychology Review*, 32(1), 77–112.
- **Typ:** meta-analýza
- **Odkaz:** https://doi.org/10.1007/s10648-019-09498-w ; PDF: https://opus.bibliothek.uni-augsburg.de/opus4/files/109056/109056.pdf
- **Klíčová zjištění:** Gamifikace (body, odznaky, žebříčky, příběh, avatary) má malý až střední pozitivní efekt na kognitivní výsledky (g ≈ 0,49), motivační (g ≈ 0,36) a behaviorální (g ≈ 0,25) výsledky; kognitivní efekt obstál i v metodologicky přísných studiích, motivační a behaviorální nikoli (nestabilní). Prvky příběhu/fikce a soutěž kombinovaná se spoluprací vycházejí lépe než samotné body/odznaky. Studie pokrývají převážně školní a univerzitní populaci; evidence pro předškoláky prakticky chybí. Nezávislé hledání (listopad 2026) nenašlo žádné peer-reviewed RCT izolující odznaky/body u 4–5letých – jen pilotní práce a vendorské zprávy.
- **Důsledek pro aplikaci (dítě 4–5 let):** Pokud gamifikovat, volit příběh, postavy a „mapu cesty“ vázanou na obsah; vyhnout se žebříčkům, odpočtům a bodům za rychlost; odznaky za „zvládnutí dovednosti“ (mastery) jsou méně rizikové než za „splnění úkolu“, ale ani ty nejsou u předškoláků doloženy – testovat na vlastním dítěti a sledovat, zda hraje „pro odznak“.
- **Síla důkazu:** střední (meta-analýza s malým počtem rigorózních studií; nízká přenositelnost na 4–5 let).

### 5.18 Žádoucí obtíže a rozložené učení (Bjork & Bjork; Cepeda et al.)
- **Autoři / instituce, rok:** Bjork, E. L., Bjork, R. A., 2011. *Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning*. In *Psychology and the Real World*, 56–64. Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., Rohrer, D., 2006. *Distributed practice in verbal recall tasks: A review and quantitative synthesis*. *Psychological Bulletin*, 132(3), 354–380.
- **Typ:** přehledová studie (Bjork) + meta-analýza (Cepeda: 839 hodnocení ze 317 experimentů)
- **Odkaz:** https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/04/EBjork_RBjork_2011.pdf ; https://doi.org/10.1037/0033-2909.132.3.354
- **Klíčová zjištění:** Podmínky, které učení krátkodobě zpomalí (rozložení v čase, prokládání témat, vybavování místo opakovaného čtení, variabilita kontextu), dlouhodobě zlepšují uchování a přenos – jsou „žádoucí“, pokud má učící se dost znalostí na to, aby je zvládl; jinak jsou nežádoucí. Cepeda et al. potvrzují robustní efekt rozloženého procvičování: delší rozestupy mezi opakováními prospívají dlouhodobé paměti a optimální rozestup roste s požadovanou dobou uchování.
- **Důsledek pro aplikaci (dítě 4–5 let):** Plánovač na pozadí má dovednost vracet po 1, 3, 7 a 14+ dnech místo „drilu“ v jednom sezení; v jednom sezení prokládat 2–3 oblasti (počty, tvary, písmena) místo bloku jedné; obtíže zavádět jen tam, kde dítě má základ (viz 5.20).
- **Síla důkazu:** vysoká pro spacing (jedna z nejreplikovanějších zákonitostí), střední pro přenos konkrétních „obtíží“ na předškoláky.

### 5.19 Vybavování z paměti (retrieval practice) u dětí (Fazio & Marsh)
- **Autoři / instituce, rok:** Fazio, L. K., Marsh, E. J., 2019. *Retrieval-based learning in children*. *Current Directions in Psychological Science*, 28(2), 111–116.
- **Typ:** přehledová studie
- **Odkaz:** https://doi.org/10.1177/0963721418806673
- **Klíčová zjištění:** Přehled dosavadních studií s předškoláky a dětmi základních škol (plus kojenecký výzkum) ukazuje jasné přínosy učení založeného na vybavování (kvízování, „řekni mi, co to je“, učení druhého) již od raného věku, včetně učení slov u předškoláků; vývojová trajektorie je však málo prozkoumaná. Přínos je největší, když je vybavování úsilné, ale úspěšné – u malých dětí to znamená dostatečnou oporu (nápovědy, zpětnou vazbu), aby vybavení neselhávalo příliš často.
- **Důsledek pro aplikaci (dítě 4–5 let):** Po naučení (ukázka + pojmenování) rychle přejít do režimu „vybav si“ (ukaž/řekni bez nápovědy) s okamžitou zpětnou vazbou a stupňovanou nápovědou; podíl úspěšných vybavení držet vysoko (viz 5.20) a opakovat s odstupem (5.18).
- **Síla důkazu:** střední (přehled s omezeným počtem studií u předškoláků; efekt u starších dětí a dospělých velmi silný).

### 5.20 Pravidlo 85 % – optimální obtížnost pro učení (Wilson et al.)
- **Autoři / instituce, rok:** Wilson, R. C., Shenhav, A., Straccia, M., Cohen, J. D., 2019. *The Eighty Five Percent Rule for optimal learning*. *Nature Communications*, 10, 4646.
- **Typ:** teoretická/výpočetní studie (modelování)
- **Odkaz:** https://doi.org/10.1038/s41467-019-12552-4 ; PMC6831579
- **Klíčová zjištění:** Pro binární klasifikační úlohy učené gradientním sestupem (perceptron, dvouvrstvá síť na MNIST, biologicky věrohodný model učení opic) je rychlost učení maximální, když chybovost při tréninku činí ~15,87 % (přesnost ~85 %); při Gaussově šumu; pro jiné rozdělení šumu se optimum posouvá (~82 %, ~75 %). Autoři sami uvádějí, že přenos na lidské učení a složité školní úlohy je hypotéza k otestování, nikoli výsledek; u učícího se s dokonalou pamětí pořadí úloh nehraje roli.
- **Důsledek pro aplikaci (dítě 4–5 let):** Použít 80–85 % jako výchozí cílovou úspěšnost adaptivního algoritmu (zjednodušit pod ~70 %, ztížit nad ~90 % po stabilní sérii), ale považovat to za heuristiku a ladit podle chování dítěte (frustrace, nuda), nikoli za vědecký fakt o předškolácích.
- **Síla důkazu:** nízká pro přímou aplikaci na děti (model), střední jako konvergentní podpora principu „optimální výzvy“ (shoda se SDT, Vygotským a Fazio & Marsh).

### 5.21 Mastery learning (Bloom; Kulik, Kulik & Bangert-Drowns)
- **Autoři / instituce, rok:** Bloom, B. S., 1968: *Learning for mastery*, *Evaluation Comment*, 1(2). Kulik, C.-L. C., Kulik, J. A., Bangert-Drowns, R. L., 1990: *Effectiveness of mastery learning programs: A meta-analysis*, *Review of Educational Research*, 60(2), 265–299.
- **Typ:** koncepční článek + meta-analýza (108 kontrolovaných evaluací)
- **Odkaz:** https://doi.org/10.3102/00346543060002265 ; Bloom 1968: https://eric.ed.gov/?id=ED053419
- **Klíčová zjištění:** Bloom navrhl rozdělit učivo na jednotky, po každé provést formativní test, poskytnout korektivní zpětnou vazbu a postupovat dál až po zvládnutí (např. 80–90 %). Meta-analýza Kulikových: pozitivní efekty na výsledky zkoušek v programech od vyšších ročníků ZŠ po VŠ, průměrný efekt ~0,5 SD (přesná hodnota 0,52 neověřena v originálu), největší u slabších žáků (sekundární zdroje: posun z 50. na ~70. percentil – neověřeno), pozitivní vliv na postoje k předmětu, menší efekt na dlouhodobé uchování; cenou je více času u pomalejších žáků. Slavin (1987) došel k podstatně skeptičtějšímu závěru (spor o výběr studií).
- **Důsledek pro aplikaci (dítě 4–5 let):** Postup odemykat podle zvládnutí (např. 4/5 správně ve 2 různých sezeních), ne podle kalendáře či počtu odehraných úkolů; po nezvládnutí nabídnout jinou formu téže dovednosti (jiný kontext, tiskový list), ne stejný úkol znovu.
- **Síla důkazu:** střední až vysoká (velká meta-analýza, ale populace starší; pro předškoláky je hlavním dokladem fungování mastery postupů RCT onebillion a Math Shelf – 5.09, 5.10).

### 5.22 Formativní hodnocení – „Inside the Black Box“ (Black & Wiliam)
- **Autoři / instituce, rok:** Black, P., Wiliam, D., 1998. *Assessment and classroom learning*. *Assessment in Education: Principles, Policy & Practice*, 5(1), 7–74; praktická verze *Inside the Black Box: Raising Standards Through Classroom Assessment*, *Phi Delta Kappan*, 80(2), 139–148.
- **Typ:** přehledová studie (syntéza ~250 studií)
- **Odkaz:** https://doi.org/10.1080/0969595980050102 ; Kappan PDF: https://www.michigan.gov/documents/mde/Inside_The_Black_Box_-_Black_and_William_601104_7.pdf
- **Klíčová zjištění:** Posílení formativního hodnocení (průběžné zjišťování, kde dítě je, a úprava výuky) přináší typické efekty 0,4–0,7 SD, větší než většina vzdělávacích intervencí, a nejvíce pomáhá slabším žákům. Zpětná vazba má říkat, co je správně/špatně a jak se zlepšit, nikoli srovnávat s ostatními nebo známkovat; „kultura úspěchu“ (každý se může zlepšit) a sebehodnocení žáka jsou klíčové; srovnávací a ego-orientovaná zpětná vazba (známky, pořadí) učení poškozuje. Pozdější meta-analýza (Kingston & Nash 2011) odhaduje nižší efekt 0,2–0,3.
- **Důsledek pro aplikaci (dítě 4–5 let):** „Počítání úspěšnosti na pozadí“ pojmout jako formativní smyčku: každý úkol = diagnostická položka → okamžitá zpětná vazba k úkolu → úprava dalšího kroku. Rodiči zobrazovat „co umí / na čem pracujeme / co vyzkoušet doma“, nikdy procenta, známky nebo porovnání s normou.
- **Síla důkazu:** vysoká pro princip (konsenzus), střední pro velikost efektu (sporná).

### 5.23 Soukromí dat dětí: COPPA v praxi, GDPR čl. 8, český zákon
- **Autoři / instituce, rok:** Reyes, I., Wijesekera, P., Reardon, J., Elazari Bar On, A., Razaghpanah, A., Vallina-Rodriguez, N., Egelman, S., 2018: *"Won't Somebody Think of the Children?" Examining COPPA Compliance at Scale*, *Proceedings on Privacy Enhancing Technologies*, 2018(3), 63–83. Nařízení (EU) 2016/679 (GDPR), čl. 8. Zákon č. 110/2019 Sb., o zpracování osobních údajů, § 7.
- **Typ:** empirická studie (velkoplošná analýza) + právní předpisy
- **Odkaz:** https://petsymposium.org/popets/2018/popets-2018-0021.php ; https://gdpr-text.com/cs/read/article-8/ ; https://www.zakonyprolidi.cz/cs/2019-110
- **Klíčová zjištění:** Automatizovaná analýza ~5 800 bezplatných dětských aplikací v programu Google „Designed for Families“ (2016–2018) zjistila, že většina potenciálně porušuje COPPA, hlavně kvůli SDK třetích stran: 19 % sdílelo citlivé údaje se službami, jejichž podmínky použití v dětských aplikacích zakazují; mnoho SDK má „COPPA režim“, ale vývojáři ho nezapínají; certifikace „Safe Harbor“ neznamenala lepší chování. GDPR čl. 8: pro informační služby nabízené přímo dítěti je souhlas platný od 16 let, členské státy mohou snížit až na 13; ČR stanovila 15 let (§ 7 zákona 110/2019 Sb.). Pro mladší děti dává souhlas rodič; platí zásady minimalizace, účelového omezení a práva na výmaz.
- **Důsledek pro aplikaci (dítě 4–5 let):** Nepoužívat analytické/reklamní SDK ani cloudové služby třetích stran, které vidí data dítěte; ukládat záznamy o výkonu lokálně (nebo šifrovaně v úložišti pod kontrolou rodiče), používat pseudonym místo jména, umožnit jedním tlačítkem vše smazat. Pokud by se aplikace někdy sdílela dál, bude třeba řešit rodičovský souhlas a informování podle GDPR.
- **Síla důkazu:** vysoká (velkoplošná empirická studie + platná legislativa).

### 5.24 Trvání zaměřené pozornosti předškoláků (Ruff & Lawson)
- **Autoři / instituce, rok:** Ruff, H. A., Lawson, K. R., 1990. *Development of sustained, focused attention in young children during free play*. *Developmental Psychology*, 26(1), 85–93. Navazující: Ruff, H. A., Capozzoli, M., Weissberg, R., 1998, *Developmental Psychology*, 34(3), 454–464; Sarid, M., Breznitz, Z., 1997, *Early Child Development and Care*, 129(1), 29–39.
- **Typ:** průřezové observační studie
- **Odkaz:** https://doi.org/10.1037/0012-1649.26.1.85 ; https://doi.org/10.1037/0012-1649.34.3.454
- **Klíčová zjištění:** Dvě průřezové studie (věk 1, 2 a 3,5 roku; 2,5, 3,5 a 4,5 roku) měřily zaměřenou pozornost při volné hře s hračkami: trvání i podíl zaměřené pozornosti rostl s věkem a závisel na kontextu (náročnost úkolu, konkurenční podněty). Pozdější práce uvádějí, že epizody zaměřené volné hry trvají v průměru ~4 minuty u 2–3letých a přes 9 minut u 5–6letých (údaj ze sekundárních přehledů citujících Ruff & Lawson a Sarid & Breznitz – neověřeno v originálu) a že nárůst mezi 2,5 a 3,5 roky je výrazný, poté se do 4,5 let zpomaluje (Ruff et al. 1998). Zaměřená pozornost u dětí 3–4 let je podstatně delší u strukturovaných, zajímavých úkolů než u pasivního sledování.
- **Důsledek pro aplikaci (dítě 4–5 let):** Jedna aktivita 2–5 minut, 3–4 aktivity v sezení, celkem 10–15 minut; střídat typ činnosti (klepání, přetahování, mluvení, úkol mimo obrazovku); při známkách odvrácení pozornosti (dlouhé prodlevy, náhodné klepání) sezení ukončit a nabídnout tiskový list nebo pohyb.
- **Síla důkazu:** střední (klasické observační studie s malými vzorky; přesné minuty pro 4–5 let nejsou z primárního textu ověřeny).

---

### Poznámky k ověření
- Plně ověřeno načtením primární/oficiální stránky: 5.01, 5.05, 5.07 (Barr 2019), 5.09 (abstrakt), 5.19 (abstrakt), 5.20, 5.22 (Kappan), 5.23 (zákon 110/2019 Sb. § 7; PoPETs), 5.08 (shrnutí U. Chicago).
- Ověřeno z více nezávislých sekundárních zdrojů/abstraktů ve vyhledávání: 5.02, 5.03, 5.04 (2016), 5.06, 5.10, 5.11–5.18, 5.21, 5.24.
- Částečně neověřeno (označeno v textu): detailní doporučení AAP 2026 pro 0–5 let (plný text nedostupný – HTTP 403), přesný efekt 0,52 u Kulik 1990, přesné minuty pozornosti u Ruff & Lawson, velikost vzorku Lepper 1973.
