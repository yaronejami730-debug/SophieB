import { SITE, NAV, NAV_MORE, PH } from './data.mjs';
import { readFileSync } from 'node:fs';
export const BUILD = Date.now().toString(36);
const IM = JSON.parse(readFileSync(new URL('./images.json', import.meta.url)));
export const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
export const book = (campaign, label = 'Réserver', cls = '', extra = '') =>
  `<a class="btn ${cls}" href="${SITE.planity}?utm_source=sophiebparis.com&amp;utm_medium=site&amp;utm_campaign=${campaign}" target="_blank" rel="noopener" data-track="reserver" ${extra}>${label}</a>`;
export const photo = (name, alt, { sizes = '(min-width:900px) 33vw, 100vw', eager = false, cls = '', ratio = '' } = {}) => {
  const m = IM[name]; if (!m) throw new Error('image ' + name);
  const set = m.ws.map(w => `/assets/img/${name}-${w}.webp ${w}w`).join(', ');
  const big = m.ws[m.ws.length - 1];
  return `<img class="photo ${cls}" src="/assets/img/${name}-${m.ws[Math.min(1, m.ws.length - 1)]}.webp" srcset="${set}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} ${ratio ? `style="aspect-ratio:${ratio}"` : ''}>`;
};
export const eur = n => `${n} €`;
export const price = n => n == null ? PH : `${n} €`;
export const img = (alt, ratio = '') => `<div class="ph-img" role="img" aria-label="${esc(alt)}" ${ratio ? `style="aspect-ratio:${ratio}"` : ''}><span>[PHOTO À FOURNIR] ${esc(alt)}</span></div>`;
export const faq = items => items.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('');
export const faqLd = items => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q.replace(/<[^>]+>/g, ''), acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });

const salonLd = () => ({
  '@context': 'https://schema.org', '@type': 'BeautySalon', '@id': SITE.url + '/#salon',
  name: SITE.full, url: SITE.url, telephone: '+33698244366', email: SITE.mail, priceRange: '€€€',
  image: SITE.url + '/assets/og-default.png',
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, postalCode: SITE.zip, addressLocality: SITE.city, addressCountry: 'FR' },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:30', closes: '19:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:30', closes: '16:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '11:00', closes: '13:00' }],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: SITE.rating, reviewCount: SITE.reviews, bestRating: '5' },
  sameAs: [SITE.planity, ...Object.values(SITE.social).filter(v => v.startsWith('http'))]
});

export function page(p) {
  const url = SITE.url + p.path;
  const crumbs = p.crumbs || [];
  const bcLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url + '/' }, ...crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 2, name: Array.isArray(c) ? c[0] : c, item: i === crumbs.length - 1 ? url : (Array.isArray(c) ? SITE.url + c[1] : undefined) }))] };
  const ld = [salonLd(), ...(crumbs.length ? [bcLd] : []), ...(p.ld || [])];
  const og = SITE.url + '/assets/og-default.png';
  const lp = p.landing;
  const hasHero = p.body.includes('<section class="hero');
  return `<!doctype html>
<html lang="fr"${lp ? ' class="lp"' : ''}><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
${p.noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<meta property="og:type" content="website"><meta property="og:locale" content="fr_FR"><meta property="og:site_name" content="SOPHIE B">
<meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.desc)}"><meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#201812">
<meta name="color-scheme" content="dark">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="SOPHIE B"><link rel="manifest" href="/assets/manifest.webmanifest">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Jost:wght@400;500&display=swap&subset=latin">
<link rel="stylesheet" href="/assets/style.css?v=${BUILD}">
${ld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head><body class="${p.theme || 'warm'}">
<a class="skip" href="#main">Aller au contenu</a>
${!lp && SITE.announce ? `<div class="announce" data-id="a1"><span>${SITE.announce}</span><button type="button" aria-label="Fermer l’annonce">×</button></div>` : ''}
<header class="hdr${hasHero ? ' over' : ''}"><div class="wrap">
<nav class="nav l" aria-label="Navigation principale">${NAV.slice(0, 5).map(n => n.sub ? `<div class="has-sub"><a href="${n.u}"${p.path.startsWith(n.u) ? ' aria-current="page"' : ''} aria-haspopup="true">${n.short || n.t}</a><div class="sub"><ul>${n.sub.map(x => `<li><a href="${x.u}"${p.path === x.u ? ' aria-current="page"' : ''}>${x.t}</a></li>`).join('')}</ul></div></div>` : `<a href="${n.u}"${p.path === n.u ? ' aria-current="page"' : ''}${n.short ? ` aria-label="${n.t}"` : ''}>${n.short || n.t}</a>`).join('')}</nav>
<a class="logo" href="/" aria-label="SOPHIE B, accueil"><img class="logo-img" src="/assets/logo-360.webp" srcset="/assets/logo-360.webp 360w, /assets/logo-720.webp 720w" sizes="150px" width="150" height="50" alt="SOPHIE B"></a>
<nav class="nav r" aria-label="Navigation secondaire">${[{ t: 'Nos partenaires', u: '/nos-partenaires/' }, { t: 'À propos', u: '/a-propos/' }, NAV[5]].map(n => `<a href="${n.u}"${p.path === n.u ? ' aria-current="page"' : ''}>${n.t}</a>`).join('')}${book('header', 'Réserver', 'sm')}</nav>
<button class="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mm"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
</div></header>
<div class="mmenu" id="mm" role="dialog" aria-modal="true" aria-label="Menu"><button class="close" aria-label="Fermer le menu">×</button>
${[...NAV, ...NAV_MORE].map(n => `<a href="${n.u}">${n.t}</a>${n.sub ? n.sub.map(x => `<a class="msub" href="${x.u}">${x.t}</a>`).join('') : ''}`).join('')}<p style="margin-top:24px">${book('menu-mobile', 'Réserver un soin')}</p></div>
<main id="main"${hasHero ? '' : ' class="pt"'}>
${crumbs.length ? `<nav class="wrap crumbs${hasHero ? ' on-hero' : ''}" aria-label="Fil d’Ariane"><a href="/">Accueil</a>${crumbs.map((c, i) => `<span>/</span>${i === crumbs.length - 1 ? `<span aria-current="page" style="margin:0">${c}</span>` : (Array.isArray(c) ? `<a href="${c[1]}">${c[0]}</a>` : c)}`).join('')}</nav>` : ''}
${p.body}
</main>
${lp ? '' : footer()}
<button class="totop" aria-label="Retour en haut">↑</button>
<div class="cookie" role="dialog" aria-label="Cookies"><p><strong>Vos données, votre choix.</strong> Nous mesurons l’audience et les réservations uniquement avec votre accord.</p><div class="acts"><button class="btn ghost" data-consent="no">Tout refuser</button><button class="btn" data-consent="yes">Accepter</button></div></div>
<script>window.SB=${JSON.stringify({ hours: SITE.hours.map(h => ({ d: h.d, o: h.o, c: h.c })), ga4: SITE.ga4, pixel: SITE.metaPixel, mail: SITE.mail })}</script>
<script src="/assets/main.js?v=${BUILD}" defer></script>
<script>if(/[?&]debug/.test(location.search)){addEventListener("DOMContentLoaded",function(){var b=document.createElement("div");b.style.cssText="position:fixed;top:0;left:0;right:0;z-index:99999;background:#d4a52a;color:#111;font:12px/1.35 monospace;padding:6px 8px;white-space:pre-wrap";var css=[].slice.call(document.styleSheets).map(function(x){return x.href&&x.href.split("/").pop()}).filter(Boolean).join(",");b.textContent="build ${BUILD} | css "+css+" | "+innerWidth+"x"+innerHeight+" | dpr "+devicePixelRatio+" | masks "+(CSS.supports("-webkit-mask-image","linear-gradient(#000,#000)")||CSS.supports("mask-image","linear-gradient(#000,#000)"))+" | has "+CSS.supports("selector(:has(a))")+" | vt "+CSS.supports("view-transition-name","none")+" | "+navigator.userAgent;document.body.appendChild(b)})}</script>
</body></html>`;
}

function footer() {
  return `<footer class="ftr"><div class="wrap grid g4">
<div><img class="logo-img" src="/assets/logo-360.webp" srcset="/assets/logo-360.webp 360w, /assets/logo-720.webp 720w" sizes="150px" loading="lazy" width="150" height="50" alt="SOPHIE B"><p style="margin-top:14px">Institut de beauté haut de gamme<br>Paris 12 — Nation</p></div>
<div><h3>Adresse</h3><p>${SITE.street}<br>${SITE.zip} ${SITE.city}<br>À 3 minutes de la place de la Nation</p><p><a href="tel:${SITE.telHref}" data-track="appeler">${SITE.tel}</a><br><a href="mailto:${SITE.mail}">${SITE.mail}</a></p></div>
<div><h3>Horaires</h3><p class="meta">[À CONFIRMER]</p>${SITE.hours.filter(h => h.o).map(h => `<div>${h.d} ${h.o.replace(':', 'h')}–${h.c.replace(':', 'h')}</div>`).join('')}<p><span class="open-now"></span></p></div>
<div><h3>Newsletter</h3><form data-mail="Inscription newsletter"><div class="hp" aria-hidden="true"><input name="website" tabindex="-1" autocomplete="off"></div><div class="field"><label for="nl">Votre e-mail</label><input id="nl" name="email" type="email" required autocomplete="email"></div><button class="btn sm light" type="submit">Je m’inscris</button><p class="meta" style="margin-top:10px">Avantage 1er soin : [À CONFIRMER]. Désinscription à tout moment.</p></form></div>
</div><div class="wrap" style="margin-top:48px"><hr class="rule"><p style="margin-top:24px;font-size:.88rem">Instagram ${SITE.social.instagram} · Facebook ${SITE.social.facebook} · TikTok ${SITE.social.tiktok}</p>
<p style="font-size:.88rem"><a href="/a-propos/">À propos</a> · <a href="/nos-partenaires/">Nos partenaires</a> · <a href="/mentions-legales/">Mentions légales</a> · <a href="/confidentialite/">Confidentialité</a> · <a href="/carte-cadeau/">Carte cadeau</a> · <a href="/plan-du-site/">Plan du site</a> · <button class="chip" data-cookies style="color:#fff;border-color:#fff;min-height:44px">Gérer les cookies</button></p></div></footer>`;
}

export const hero = ({ eyebrow, h1, sub, acts, cls = '', bg, card, video }) => `<section class="hero ${cls}${video ? ' vid' : ''}">${video ? `<video class="hero-video" autoplay muted loop playsinline preload="auto" poster="${video.poster}" aria-hidden="true" tabindex="-1"><source src="${video.src}" type="video/mp4"></video>` : ''}${bg ? photo(bg[0], bg[1], { sizes: '100vw', eager: true, cls: 'hero-img' }) : ''}<div class="wrap"><p class="eyebrow">${eyebrow}</p><h1>${h1}</h1><p>${sub}</p><div class="acts">${acts}</div></div>${card ? heroCard() : ''}</section>`;
const heroCard = () => `<aside class="hero-card"><p>Laissez-nous vous recevoir.</p><div class="tiles"><a href="${SITE.planity}?utm_source=sophiebparis.com&amp;utm_medium=site&amp;utm_campaign=hero-card" target="_blank" rel="noopener" data-track="reserver">Réserver</a><a href="tel:${SITE.telHref}" data-track="appeler">Appeler</a><a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.street + ' 75012 Paris')}" target="_blank" rel="noopener" data-track="itineraire">Itinéraire</a></div></aside>`;
export const finalCta = (campaign, t = 'Votre premier rendez-vous commence par un diagnostic.', sub = 'Sophie vous reçoit au 53 bis boulevard de Picpus, à 3 minutes de Nation.', label = 'Réserver un soin') => `<section class="cta-final"><div class="wrap rv"><h2>${t}</h2><p>${sub}</p>${book(campaign, label, 'light')}</div></section>`;

export const heroSplit = ({ eyebrow, h1, sub, acts, pic }) => `<section class="hsplit"><div class="htxt"><p class="eyebrow">${eyebrow}</p><h1>${h1}</h1>${sub.startsWith('<') ? sub : `<p>${sub}</p>`}${acts ? `<div class="acts">${acts}</div>` : ''}</div><div class="hpic">${pic}</div></section>`;
