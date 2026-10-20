// Export « hors ligne » : 1 fichier HTML autonome par page (CSS, JS, polices et photos intégrés).
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
const SRC = 'demo-sophie-b', OUT = 'sophie-b-hors-ligne';
const MIME = { webp: 'image/webp', png: 'image/png', svg: 'image/svg+xml', jpg: 'image/jpeg' };
rmSync(OUT, { recursive: true, force: true }); mkdirSync(OUT, { recursive: true });
const cache = new Map();
const uri = (p, base = SRC + '/') => {
  const f = base + p.split('?')[0];
  if (!existsSync(f)) { console.log('absent', f); return p; }
  if (!cache.has(f)) cache.set(f, `data:${MIME[f.split('.').pop()]};base64,${readFileSync(f).toString('base64')}`);
  return cache.get(f);
};
let css = readFileSync(SRC + '/assets/style.css', 'utf8');
css = css.replace(/url\(([^)'"]+\.(?:webp|png|svg|jpg))\)/g, (m, u) => `url(${uri('assets/' + u)})`);
const fonts = readFileSync('/tmp/fonts-inline.css', 'utf8');
const js = readFileSync(SRC + '/assets/main.js', 'utf8').replace(/<\/script/g, '<\\/script');
for (const name of ['index.html', 'a-propos.html', 'nos-partenaires.html']) {
  let h = readFileSync(`${SRC}/${name}`, 'utf8');
  h = h.replace(/<link rel="preconnect"[^>]*>\n?/g, '');
  h = h.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis[^>]*>\n?/, '');
  h = h.replace(/<link rel="stylesheet" href="assets\/style\.css[^>]*>/, () => `<style>${fonts}\n${css}</style>`);
  h = h.replace(/<script src="assets\/main\.js[^>]*><\/script>/, () => `<script>${js}</script>`);
  h = h.replace(/\s+srcset="[^"]*"/g, '').replace(/\s+sizes="[^"]*"/g, '');
  h = h.replace(/(<img[^>]*?\ssrc=")(assets\/[^"]+)(")/g, (m, a, u, z) => a + uri(u) + z);
  writeFileSync(`${OUT}/${name}`, h);
}
writeFileSync(`${OUT}/LISEZMOI.txt`, `MAQUETTE SOPHIE B — hors ligne\n\nChaque page est un fichier unique : le design, les polices et les photos sont à l'intérieur.\nOuvrir « index.html » dans un navigateur. Garder les trois fichiers dans le même dossier pour que les liens entre pages fonctionnent.\nPages : index.html (accueil), a-propos.html, nos-partenaires.html.\nLes autres liens du menu sont inactifs pour l'instant.\n`);
console.log('ok');
