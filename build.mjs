import { mkdirSync, writeFileSync, copyFileSync, rmSync, cpSync } from 'node:fs';
import { SITE, REDIRECTS } from './src/data.mjs';
import { page } from './src/layout.mjs';
import { PAGES } from './src/pages.mjs';
rmSync('dist', { recursive: true, force: true }); mkdirSync('dist/assets', { recursive: true });
for (const f of ['style.css', 'main.js', 'logo-360.webp', 'orlane-paris.webp', 'orlane-sophie-b-sceau.webp', 'sultane-de-saba.svg', 'logo-720.webp', 'favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest', 'og-default.png']) copyFileSync('src/assets/' + f, 'dist/assets/' + f);
cpSync('src/assets/img', 'dist/assets/img', { recursive: true });
cpSync('src/assets/video', 'dist/assets/video', { recursive: true });
cpSync('src/assets/brands', 'dist/assets/brands', { recursive: true });
for (const p of PAGES) {
  const out = p.file ? 'dist/' + p.file : 'dist' + p.path + 'index.html';
  if (!p.file) mkdirSync('dist' + p.path, { recursive: true });
  writeFileSync(out, page(p));
}
const idx = PAGES.filter(p => !p.noindex);
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${idx.map(p => `<url><loc>${SITE.url}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /lp/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
// vercel.json: redirects + headers + clean urls
const base = REDIRECTS.map(([id, to]) => ({ source: '/', has: [{ type: 'query', key: 'page_id', value: String(id) }], destination: to.split('#')[0] + (to.includes('#') ? to.slice(to.indexOf('#')) : ''), permanent: true }));
writeFileSync('vercel.json', JSON.stringify({ cleanUrls: false, trailingSlash: true, redirects: [...base, { source: '/:path*', has: [{ type: 'host', value: 'www.sophiebparis.com' }], destination: 'https://sophiebparis.com/:path*', permanent: true }],
  headers: [{ source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }, { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] }] }, null, 2));
writeFileSync('REDIRECTIONS.md', `# Redirections 301\n\n| Ancienne URL | Nouvelle URL | Page |\n|---|---|---|\n${REDIRECTS.map(([i, t, n]) => `| /?page_id=${i} | ${t} | ${n} |`).join('\n')}\n\nAppliquées dans vercel.json (match sur query \`page_id\`). Autres anciennes pages : à lister après crawl complet.\n`);
console.log('pages', PAGES.length);

// serveur de test local : jamais de cache navigateur
writeFileSync('dist/serve.json', JSON.stringify({ headers: [{ source: '**', headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }] }] }));
