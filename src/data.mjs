export const SITE = {
  name: 'SOPHIE B',
  full: 'SOPHIE B — Institut de beauté Paris 12',
  url: 'https://sophiebparis.com',
  street: '53 bis boulevard de Picpus',
  zip: '75012', city: 'Paris',
  tel: '06 98 24 43 66', telHref: '+33698244366',
  mail: 'sophieparis12@gmail.com',
  planity: 'https://www.planity.com/sophie-b-specialiste-de-la-peau-de-la-beaute-75012-paris',
  rating: '5', reviews: '13',
  // [À CONFIRMER] source Mappy. Samedi non communiqué.
  hours: [
    { d: 'Lundi', o: '09:30', c: '19:30' }, { d: 'Mardi', o: '09:30', c: '19:30' },
    { d: 'Mercredi', o: '09:30', c: '19:30' }, { d: 'Jeudi', o: '09:30', c: '19:30' },
    { d: 'Vendredi', o: '09:30', c: '16:00' }, { d: 'Samedi', o: null, c: null },
    { d: 'Dimanche', o: '11:00', c: '13:00' }
  ],
  geo: { lat: 48.8467, lng: 2.3993 }, // [À VÉRIFIER] approximatif, confirmer via Google Maps
  social: { instagram: '[À FOURNIR]', facebook: '[À FOURNIR]', tiktok: '[À FOURNIR]' },
  announce: '', // texte du bandeau fermable (vide = masqué)
  ga4: '', metaPixel: '' // [À FOURNIR] IDs
};
export const PH = '<span class="ph">[À FOURNIR]</span>';

// Prix repérés sur plateforme tierce — À VALIDER avec Sophie
export const PRICES = {
  hydrastar: 170, californien: 89, laserJambes: 240, mains: 49
};

export const NAV = [
  { t: 'Épilation laser', s: 'Keros Alpha Line', u: '/epilation-laser-paris-12/' },
  { t: 'Soins visage', s: 'Orlane · Hydrastar', u: '/soins-visage-paris-12/', sub: [{ t: 'Soins Orlane', u: '/soins-visage-paris-12/orlane/' }, { t: 'Hydrastar', u: '/soins-visage-paris-12/hydrastar/' }, { t: 'La Sultane de Saba', u: '/soins-visage-paris-12/la-sultane-de-saba/' }] },
  { t: 'Minceur & technologies', short: 'Minceur', s: 'EMS · Lipocavitation', u: '/minceur-technologies-paris-12/' },
  { t: 'Corps & rituels', s: 'Massages · Sultane de Saba', u: '/massage-paris-12/' },
  { t: 'Jacuzzi privatif', s: 'Spa privé, solo ou duo', u: '/jacuzzi-privatif-paris/' },
  { t: 'Tarifs', s: 'Carte des soins', u: '/tarifs/' }
];
export const NAV_MORE = [
  { t: 'Regard & mariée', u: '/regard-maquillage-mariee-paris/' },
  { t: 'À propos', u: '/a-propos/' },
  { t: 'Contact', u: '/contact/' },
  { t: 'Carte cadeau', u: '/carte-cadeau/' }
];

// Redirections 301 : ancien ?page_id=XX -> nouvelle URL
export const REDIRECTS = [
  [19, '/epilation-laser-paris-12/', 'Épilation laser'],
  [42, '/soins-visage-paris-12/orlane/#orlane-b21', 'Soin Anti-âge Premium Jet Peel'],
  [1176, '/soins-visage-paris-12/orlane/#orlane-b21', 'Soin signature B21 Orlane & RF'],
  [68, '/soins-visage-paris-12/hydrastar/#eclat-express', 'Éclat express'],
  [40, '/soins-visage-paris-12/hydrastar/', 'Hydrastar'],
  [1522, '/soins-visage-paris-12/orlane/#soins-orlane', 'Peau de velours'],
  [1291, '/minceur-technologies-paris-12/#radiofrequence', 'Hydratant RF + contour des yeux'],
  [1635, '/soins-visage-paris-12/hydrastar/#soin-expert', 'Soin expert personnalisé'],
  [1303, '/soins-visage-paris-12/orlane/#anti-imperfections', 'Anti-imperfections'],
  [54, '/minceur-technologies-paris-12/#alpha-lift', 'Tâches pigmentaires'],
  [17, '/soins-visage-paris-12/hydrastar/#points-noirs', 'Points noirs'],
  [1036, '/massage-paris-12/#sultane-de-saba', 'Sultane de Saba'],
  [191, '/soins-visage-paris-12/la-sultane-de-saba/', 'Sultane de Saba visage'],
  [2897, '/massage-paris-12/#sultane-de-saba', 'Sultane de Saba corps'],
  [1091, '/massage-paris-12/#formules', 'Nos formules'],
  [1935, '/massage-paris-12/#gommages', 'Gommage du corps'],
  [1097, '/massage-paris-12/#rituels', 'Rituels'],
  [1101, '/massage-paris-12/#massages', 'Massages'],
  [3042, '/massage-paris-12/#head-spa', 'Head Spa'],
  [1099, '/massage-paris-12/#soins-du-dos', 'Soins du dos'],
  [2805, '/massage-paris-12/#mains-pieds', 'Mains & pieds'],
  [1111, '/minceur-technologies-paris-12/#radiofrequence', 'Radiofréquence'],
  [1117, '/minceur-technologies-paris-12/#lipocavitation', 'Lipocavitation'],
  [1115, '/minceur-technologies-paris-12/#electrostimulation', 'Électrostimulation'],
  [3349, '/minceur-technologies-paris-12/#alpha-lift', 'Alpha Lift'],
  [3307, '/minceur-technologies-paris-12/#luminotherapie', 'Luminothérapie'],
  [23, '/minceur-technologies-paris-12/#ems', 'EMS'],
  [737, '/regard-maquillage-mariee-paris/', 'Beauté du regard'],
  [78, '/regard-maquillage-mariee-paris/#maquillage', 'Maquillage'],
  [1360, '/regard-maquillage-mariee-paris/#cils-sourcils', 'Cils & sourcils'],
  [3468, '/beaute-mariee-paris/', 'Beauté de la mariée'],
  [2942, '/jacuzzi-privatif-paris/', 'Jacuzzi balnéothérapie'],
  [3979, '/tarifs/', 'Tarifs & réservations'],
  [25, '/contact/', 'Contact'],
  [1690, '/a-propos/', 'Notre histoire (ancien) → À propos'],
  [1586, '/nos-partenaires/', 'Nos partenaires']
];
