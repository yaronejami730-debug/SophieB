# Recette — état réel (2026-10-02)
Choix techno : **site statique** (Node `build.mjs` → `dist/`), déployable Vercel. Pas de thème WordPress (non testable ici). Port WP possible ensuite.
Légende : ✅ fait et vérifié · 🟡 fait, dépend d'un contenu [À FOURNIR] · ⛔ non fait / hors code

Preuve Lighthouse mobile (local) : Accueil perf 94 / a11y 100 / BP 100 / SEO 100, LCP 2,4 s ; Laser 100/100/100/100, LCP 1,4 s ; Tarifs 95/98/100/100, **CLS 0,131 (à corriger, cible 0,05)**.
Liens internes cassés : 0. Un seul H1 par page : ✅.

| Bloc | Statut |
|---|---|
| A 1–20 DA (palette, polices, motion, reduced-motion, wordmark SVG, favicon) | ✅ (10–11 photos : 🟡 placeholders ; 3 contraste bronze #7A5C33 assombri pour AA, #A8865A en fond seulement) |
| B 21–35 structure | ✅ sauf 26 méga-menu ⛔ (menu simple), 24 ✅, 28 ✅, 35 ✅ bandeau fermable (texte 🟡) |
| C 36–55 accueil | ✅ structure ; 44/45/46 🟡 contenu + lightbox ⛔ (aucune photo réelle) ; 37 vidéo 🟡 ; 52 texte ~400 mots ✅ |
| D 56–75 laser | ✅ ; 59/60/68/70 🟡 ; 75 texte ≈ 1 100 mots (légèrement sous 1 200) ; 74 lien catégorie Planity ⛔ (URL de catégorie inconnue) |
| E 76–90 visage | ✅ filtre + quiz ; 85/86 🟡 |
| F 91–100 minceur | ✅ ; 94/95 🟡 prix/séances |
| G 101–108 corps | ✅ ; 🟡 prix |
| H 109–118 jacuzzi | ✅ ; 112 vidéo 🟡 ; 113 prix 🟡 |
| I 119–124 regard/mariée | ✅ ; formulaire = mailto (⛔ envoi serveur à brancher) |
| J 125–130 tarifs | ✅ accordéons, recherche, impression PDF ; Offer pour 4 prix connus |
| K 131–138 | ✅ ; 135 carte = lien (façade iframe ⛔) ; 134 WhatsApp 🟡 |
| L 139–146 | ✅ UTM, tracking après consentement, bandeau CNIL, LP sans menu ; IDs GA4/Pixel 🟡 ; 144 rappel 45 s ⛔ ; 146 mentions 🟡 |
| M 147–155 | ✅ robots, sitemap, canonical, schema BeautySalon+Breadcrumb+FAQ+Service/Offer, OG/Twitter ; 147 : décocher « ne pas indexer » dans WP ancien ⛔ ; 155 GBP/NAP ⛔ hors code ; sameAs 🟡 |
| N 156–165 | ✅ perf mesurée ; test multi-largeurs et poids/page ⛔ non mesurés ; images WebP ⛔ (aucune image) |

Redirections : voir REDIRECTIONS.md (35 IDs réels relevés sur l'ancien menu).
Écarts : nom techno « EMS I-Motion » (ancien site) vs « i-Model » (brief) → à trancher. Titre accueil du brief faisait 77 car. : raccourci à ≤60.
