// Export « maquette client » : 3 pages autonomes (double-clic), autres liens inactifs.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, statSync } from 'node:fs';
const OUT = 'demo-sophie-b';
const PAGES = { '/': 'index.html', '/a-propos/': 'a-propos.html', '/nos-partenaires/': 'nos-partenaires.html' };
const SRC = { 'index.html': 'dist/index.html', 'a-propos.html': 'dist/a-propos/index.html', 'nos-partenaires.html': 'dist/nos-partenaires/index.html' };
rmSync(OUT, { recursive: true, force: true }); mkdirSync(OUT + '/assets', { recursive: true });
const used = new Set();
const rel = u => { // chemin /assets/... -> assets/...
  used.add(u.split('?')[0].split('#')[0]); return u.replace(/^\/assets\//, 'assets/').replace(/\?v=[a-z0-9]+/, '');
};
for (const [name, file] of Object.entries(SRC)) {
  let h = readFileSync(file, 'utf8');
  // liens internes
  h = h.replace(/href="(\/[^"]*)"/g, (m, u) => {
    if (u.startsWith('/assets/')) return `href="${rel(u)}"`;
    const [path, hash = ''] = u.split('#');
    const clean = path.split('?')[0];
    if (PAGES[clean]) return `href="${PAGES[clean]}${hash ? '#' + hash : ''}"`;
    return `href="#" data-off="1" aria-disabled="true" tabindex="-1" title="Bientôt disponible"`;
  });
  // ressources
  h = h.replace(/(src|poster)="(\/assets\/[^"]*)"/g, (m, a, u) => `${a}="${rel(u)}"`);
  h = h.replace(/srcset="([^"]*)"/g, (m, s) => `srcset="${s.split(',').map(p => { const t = p.trim().split(' '); t[0] = rel(t[0]); return t.join(' '); }).join(', ')}"`);
  h = h.replace(/<link rel="(?:manifest|apple-touch-icon|icon)"[^>]*>/g, '');
  h = h.replace(/<link rel="canonical"[^>]*>/g, '');
  h = h.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex,nofollow">');
  h = h.replace(/<script>if\(\/\[\?&\]debug\/[\s\S]*?<\/script>/, '');
  h = h.replace(/<meta property="og:[^>]*>|<meta name="twitter:[^>]*>/g, '');
  h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, '');
  h = h.replace(/<\/body>/, '<div class="demo-tag" aria-hidden="true">Maquette de présentation</div></body>');
  writeFileSync(`${OUT}/${name}`, h);
}
// CSS : url() relatifs + liens inactifs
let css = readFileSync('dist/assets/style.css', 'utf8');
css = css.replace(/url\((\/assets\/[^)]+)\)/g, (m, u) => { used.add(u); return `url(${u.replace(/^\/assets\//, '')})`; });
css += `\n/* maquette */\n[data-off]{pointer-events:none;cursor:default;opacity:.5}\n.cookie,[data-cookies]{display:none!important}\n.demo-tag{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:9998;background:rgba(32,24,18,.92);color:#e8c77a;border:1px solid rgba(232,199,122,.5);padding:6px 14px;font:500 .62rem/1 "Jost",sans-serif;letter-spacing:.24em;text-transform:uppercase;pointer-events:none}\n`;
writeFileSync(`${OUT}/assets/style.css`, css);
writeFileSync(`${OUT}/assets/main.js`, readFileSync('dist/assets/main.js', 'utf8'));
// fichiers : uniquement ceux référencés
const refs = new Set(['/assets/logo-360.webp', '/assets/logo-720.webp']);
for (const f of Object.keys(SRC)) for (const m of readFileSync(`${OUT}/${f}`, 'utf8').matchAll(/assets\/[A-Za-z0-9_\-./]+\.(?:webp|png|svg|jpg)/g)) refs.add('/' + m[0]);
for (const m of css.matchAll(/url\(([^)]+\.(?:webp|png|svg|jpg))\)/g)) refs.add('/assets/' + m[1]);
for (const u of refs) { const s = 'dist' + u, d = OUT + u; if (!existsSync(s)) { console.log('absent:', u); continue; } mkdirSync(d.slice(0, d.lastIndexOf('/')), { recursive: true }); cpSync(s, d); }
writeFileSync(`${OUT}/LISEZMOI.txt`, `MAQUETTE SOPHIE B — Institut de beauté Paris 12\n\nOuvrir « index.html » dans un navigateur (double-clic).\nPages disponibles : Accueil, À propos, Nos partenaires.\nLes autres liens du menu sont volontairement inactifs.\nLes boutons Réserver ouvrent Planity ; une connexion internet est nécessaire pour les polices.\nLes mentions [À FOURNIR] sont des contenus en attente.\n`);
console.log('ok', refs.size, 'fichiers référencés');
