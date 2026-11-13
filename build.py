#!/usr/bin/env python3
"""Vyrobí jednosouborovou verzi Skolicka.html (otevře se dvojklikem, funguje offline, bez serveru).
Každý ES modul se vloží jako data: URL do import mapy; relativní importy se přepíší na pevné názvy."""
import re, base64, json, pathlib, posixpath
ROOT = pathlib.Path(__file__).parent
FILES = ['js/data/curriculum.js', 'js/data/words.js', 'js/engine/rng.js', 'js/engine/storage.js', 'js/engine/progress.js', 'js/engine/recommender.js', 'js/tasks/generators.js', 'js/ui/icons.js', 'js/ui/audio.js', 'js/ui/render.js', 'js/app.js']

def bare(path: str) -> str: return 'skolicka/' + path

imports = {}
for p in FILES:
    src = (ROOT / p).read_text(encoding='utf-8')
    d = posixpath.dirname(p)
    def repl(m):
        target = posixpath.normpath(posixpath.join(d, m.group(2)))
        return f"{m.group(1)}'{bare(target)}'"
    src = re.sub(r"(from\s+)'(\.{1,2}/[^']+)'", repl, src)
    imports[bare(p)] = 'data:text/javascript;base64,' + base64.b64encode(src.encode('utf-8')).decode('ascii')

css = (ROOT / 'css/style.css').read_text(encoding='utf-8')
html = (ROOT / 'index.html').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="css/style.css">', f'<style>\n{css}\n</style>')
html = html.replace('<script type="module" src="js/app.js"></script>',
    '<script type="importmap">' + json.dumps({'imports': imports}) + '</script>\n<script type="module">import \'skolicka/js/app.js\';</script>')
(ROOT / 'Skolicka.html').write_text(html, encoding='utf-8')
print('Skolicka.html:', round((ROOT / 'Skolicka.html').stat().st_size / 1024), 'kB')
