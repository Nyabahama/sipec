import type { ChurchSpaData } from '../types/churchSpa';

/**
 * Jeu de données officiel pour la SPA de l'église (S.I.P.E.C)
 * Zéro image IA ou stock photo générique : uniquement des placeholders structurés.
 */
export const DEFAULT_SPA_DATA: ChurchSpaData = {
  meta: {
    name: 'Siloam International Pentecostal Evangelical Church',
    acronym: 'S.I.P.E.C',
    scripture: {
      reference: 'Jean 9:7',
      text: '« Va, et lave-toi au réservoir de Siloé (nom qui signifie Envoyé). »',
    },
    contact: {
      address: 'Sanctuaire Principal, Boulevard de la Foi',
      city: 'Kampala / International',
      country: 'Ouganda & Diaspora',
      phone: '+243 81 234 5678',
      email: 'contact@sipec-church.org',
      officeHours: 'Du Mardi au Samedi : 09h00 – 16h30',
    },
    liveStatus: {
      isLive: true,
      title: 'Grand Culte d\'Adoration & Miracles en Direct',
      speaker: 'Pasteur Fondateur',
    },
  },
  about: {
    history:
      'Fondée sur le mandat d\'obéissance et de foi vivante révélé en Jean 9:7, la S.I.P.E.C est née d\'un réveil spirituel consacré à la souveraineté du Christ et à la démonstration de la puissance du Saint-Esprit.',
    mission:
      'Proclamer l\'Évangile sans compromis, conduire les âmes à la repentance et former des disciples affermis dans la sainteté.',
    vision:
      'Une église sans frontières, manifestant la gloire de Dieu et bâtissant des familles solides selon les Saintes Écritures.',
  },
  founder: {
    name: 'Révérend Luka Ludunge',
    title: 'Conducteur Spirituel & Visionnaire de la S.I.P.E.C',
    callingVerse: '« Va, lave-toi à Siloé et proclame la délivrance. » (Jean 9:7)',
    biography:
      'Revêtu d\'un appel pastoral et prophétique consacré à l\'édification du Corps de Christ, le Pasteur Fondateur conduit la communauté avec intégrité, foi agissante et passion pour la gloire de Dieu. Son ministère est marqué par un enseignement christocentrique, le réveil spirituel et un dévouement paternel auprès des fidèles.',
    pillars: [
      'Intégrité pastorale & amour fraternel',
      'Attachement inconditionnel aux Saintes Écritures',
      'Intercession persévérante & foi en l\'action du Saint-Esprit',
    ],
  },
  communityServices: [
    {
      id: 'srv-1',
      title: 'Écoute & Accompagnement Pastoral',
      description: 'Conseils spirituels, entretiens confidentiels et orientation biblique pour les familles et individus.',
      badge: 'Assistance Spirituelle',
      iconName: 'heart',
    },
    {
      id: 'srv-2',
      title: 'Action Sociale & Solidarité',
      description: 'Secours d\'urgence, soutien aux veuves, orphelins et personnes vulnérables de notre communauté.',
      badge: 'Entraide',
      iconName: 'shield',
    },
    {
      id: 'srv-3',
      title: 'Formation des Nouveaux Disciples',
      description: 'Classes de baptême, affermissement doctrinal et intégration fraternelle pour les nouveaux convertis.',
      badge: 'Édification',
      iconName: 'book-open',
    },
    {
      id: 'srv-4',
      title: 'Cellules de Prière à Domicile',
      description: 'Réseau de communion fraternelle et d\'intercession décentralisé dans les quartiers.',
      badge: 'Communion',
      iconName: 'users',
    },
  ],
  servicesCalendar: [
    {
      id: 'culte-1',
      day: 'Dimanche',
      title: 'Grand Culte d\'Adoration & Miracles',
      timeRange: '09h00 – 12h00',
      description: 'Célébration dominicale, louange prophétique, proclamation de la Parole et ministère de délivrance.',
      category: 'culte',
      location: 'Grand Tabernacle Siloam & Direct International',
    },
    {
      id: 'culte-2',
      day: 'Mercredi',
      title: 'Étude Biblique & Enseignement Fondamental',
      timeRange: '18h00 – 20h00',
      description: 'Exposition approfondie des Écritures et affermissement de la doctrine chrétienne.',
      category: 'etude',
      location: 'Sanctuaire Siloam & Rebalancement Zoom',
    },
    {
      id: 'culte-3',
      day: 'Vendredi',
      title: 'Soirée d\'Intercession & Feu du Saint-Esprit',
      timeRange: '18h00 – 20h30',
      description: 'Combat spirituel, chaînes de jeûne, prière d\'autorité et manifestation des dons spirituels.',
      category: 'intercession',
      location: 'Grand Tabernacle Siloam',
    },
  ],
  departments: [
    {
      id: 'dep-media',
      name: 'SILOAM MÉDIA',
      role: 'Médias & Techniques',
      schedule: 'Réunions les dimanches et pendant les grands cultes.',
      description: 'Notre équipe technique assure la diffusion en direct des cultes, la production audiovisuelle, la sonorisation ainsi que la diffusion de l\'Évangile à travers les plateformes numériques.',
      iconName: 'video',
    },
    {
      id: 'dep-shekinah',
      name: 'CHORALE SHEKINAH',
      role: 'Louange & Adoration',
      schedule: 'Jeudi : 14h00 – 16h00\nSamedi : 14h00 – 16h00',
      description: 'Une équipe de serviteurs passionnés conduisant le peuple de Dieu dans une adoration profonde et inspirée par le Saint-Esprit.',
      iconName: 'music',
    },
    {
      id: 'dep-new-light',
      name: 'CHORALE NEW LIGHT',
      role: 'Louange & Adoration',
      schedule: 'Lundi : 08h00 – 10h00\nVendredi : 08h00 – 10h00',
      description: 'Une chorale dynamique dédiée à transmettre l\'Évangile à travers le chant et à conduire l\'assemblée dans la présence de Dieu.',
      iconName: 'music',
    },
    {
      id: 'dep-angels',
      name: 'CHORALE VOIX DES ANGES',
      role: 'Louange Inspirée',
      schedule: 'Mercredi : 16h00 – 17h00\nSamedi : 14h00 – 15h00',
      description: 'Des voix consacrées au service de Dieu afin d\'encourager l\'Église à travers des chants inspirants et spirituels.',
      iconName: 'music',
    },
    {
      id: 'dep-central',
      name: 'CHORALE CENTRALE',
      role: 'Chorale Principale',
      schedule: 'Jeudi : 08h00 – 10h00\nSamedi : 08h00 – 10h00',
      description: 'Le chœur principal de l\'église accompagne les cultes majeurs et les célébrations spéciales avec excellence.',
      iconName: 'music',
    },
    {
      id: 'dep-youth',
      name: 'JEUNESSE SIPEC',
      role: 'Jeunesse Dynamique',
      schedule: 'Chaque samedi\n18h00 – 19h30',
      description: 'Former une génération de jeunes chrétiens passionnés, intègres, responsables et influents dans leur génération pour la gloire de Dieu.',
      iconName: 'users',
    },
    {
      id: 'dep-intercession',
      name: 'MINISTÈRE D\'INTERCESSION',
      role: 'Veilleurs de Prière',
      schedule: 'Chaque vendredi à partir de 22h30\nVeillées de prière régulières.',
      description: 'Des hommes et des femmes engagés dans la prière continue pour l\'Église, les familles, la nation et les différents besoins de la communauté chrétienne.',
      iconName: 'flame',
    },
    {
      id: 'dep-sunday-school',
      name: 'ÉCOLE DU DIMANCHE',
      role: 'Ministère des Enfants',
      schedule: 'Chaque dimanche\n09h00 – 10h00',
      description: 'Un enseignement biblique adapté aux enfants afin de leur transmettre les fondements de la foi chrétienne dans un environnement joyeux et éducatif.',
      iconName: 'baby',
    },
    {
      id: 'dep-men',
      name: 'DÉPARTEMENT DES PAPAS',
      role: 'Hommes de Foi',
      schedule: 'Réunions mensuelles.\nSéminaires et rencontres spéciales pour les hommes.',
      description: 'Un espace de croissance spirituelle destiné aux hommes afin de développer le leadership chrétien, l\'intégrité et la responsabilité familiale.',
      iconName: 'users',
    },
    {
      id: 'dep-women',
      name: 'DÉPARTEMENT DES MAMANS',
      role: 'Femmes Vertueuses',
      schedule: 'Réunions mensuelles.\nTemps de prière et d\'enseignement biblique.',
      description: 'Un ministère dédié à l\'édification des femmes afin qu\'elles deviennent des piliers spirituels dans leurs familles, dans l\'Église et dans la société.',
      iconName: 'users',
    },
    {
      id: 'dep-support',
      name: 'COMITÉ DE SOUTIEN',
      role: 'Support & Assistance',
      schedule: 'Participation à tous les grands événements et réunions importantes de l\'église.',
      description: 'Une équipe engagée dans l\'organisation, l\'accueil, la logistique et l\'assistance aux différentes activités de l\'église.',
      iconName: 'users',
    },
    {
      id: 'dep-protocol',
      name: 'DÉPARTEMENT DU PROTOCOLE',
      role: 'Accueil & Protocole',
      schedule: 'Service actif lors de tous les cultes et événements spéciaux.',
      description: 'Chargé de l\'accueil, de l\'orientation des visiteurs et du bon déroulement des activités afin d\'offrir une expérience chaleureuse à chacun.',
      iconName: 'users',
    },
    {
      id: 'dep-elders',
      name: 'COLLÈGE DES ANCIENS',
      role: 'Leadership Spirituel',
      schedule: 'Réunions de conseil régulières et accompagnement spirituel continu.',
      description: 'Des serviteurs expérimentés veillant sur la vision, la doctrine, la croissance spirituelle et l\'accompagnement pastoral de l\'Église.',
      iconName: 'flame',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Grande Croisade d\'Évangélisation en Plein Air',
      category: 'Missions & Moissons',
      aspectRatio: 'wide',
      placeholderLabel: 'Photo : Croisade d\'Évangélisation (1200x800)',
    },
    {
      id: 'gal-2',
      title: 'Baptêmes d\'Eau des Nouveaux Disciples',
      category: 'Célébrations',
      aspectRatio: 'tall',
      placeholderLabel: 'Photo : Baptêmes d\'Eau (800x1200)',
    },
    {
      id: 'gal-3',
      title: 'Distribution de Vivres et Assistance Sociale',
      category: 'Compassion & Entraide',
      aspectRatio: 'square',
      placeholderLabel: 'Photo : Action Sociale (800x800)',
    },
    {
      id: 'gal-4',
      title: 'Célébration et Adoration Communautaire',
      category: 'Culte Dominical',
      aspectRatio: 'tall',
      placeholderLabel: 'Photo : Adoration au Sanctuaire (800x1200)',
    },
    {
      id: 'gal-5',
      title: 'Rassemblement Festif de la Jeunesse SIPEC Youth',
      category: 'Jeunesse',
      aspectRatio: 'wide',
      placeholderLabel: 'Photo : Convention Jeunesse (1200x800)',
    },
    {
      id: 'gal-6',
      title: 'Veillée de Prière & Intercession Matinale',
      category: 'Intercession',
      aspectRatio: 'square',
      placeholderLabel: 'Photo : Soirée de Prière (800x800)',
    },
  ],
  liveStreams: [
    {
      id: 'live-1',
      title: 'Culte d’Adoration & Parole — SIPEC Live',
      description: 'Rejoignez la communauté SIPEC pour un temps de louange, de prière et de proclamation de la Parole de Dieu.',
      youtubeUrl: 'https://www.youtube.com/@SIPEC',
      facebookUrl: 'https://www.facebook.com/',
      tiktokUrl: 'https://www.tiktok.com/',
      instagramUrl: 'https://www.instagram.com/',
      startTime: '2026-10-29T09:00:00+03:00',
      endTime: '2026-10-29T12:00:00+03:00',
      thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=85',
      isLive: true,
      viewers: 1248,
      status: 'live',
    },
    {
      id: 'live-2',
      title: 'Étude Biblique — La fidélité de Dieu',
      description: 'Un enseignement biblique profond pour affermir votre foi au quotidien.',
      youtubeUrl: 'https://www.youtube.com/@SIPEC',
      facebookUrl: 'https://www.facebook.com/',
      tiktokUrl: 'https://www.tiktok.com/',
      instagramUrl: 'https://www.instagram.com/',
      startTime: '2026-10-30T18:00:00+03:00',
      endTime: '2026-10-30T20:00:00+03:00',
      thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1600&q=85',
      isLive: false,
      viewers: 0,
      status: 'offline',
    },
    {
      id: 'live-3',
      title: 'Culte spécial — La puissance du Saint-Esprit',
      description: 'Redécouvrez le ministère du Saint-Esprit à travers ce culte enregistré au sanctuaire SIPEC.',
      youtubeUrl: 'https://www.youtube.com/@SIPEC',
      facebookUrl: 'https://www.facebook.com/',
      tiktokUrl: 'https://www.tiktok.com/',
      instagramUrl: 'https://www.instagram.com/',
      startTime: '2026-10-18T09:00:00+03:00',
      endTime: '2026-10-18T12:00:00+03:00',
      thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=85',
      isLive: false,
      viewers: 3240,
      status: 'replay',
    },
  ],
  sermons: [
    {
      id: 'sermon-1',
      title: 'Le Réservoir de Siloé et la Fin de l\'Aveuglement Spirituel',
      preacher: 'Pasteur Fondateur',
      date: '12 Octobre 2026',
      scriptureReference: 'Jean 9:1-7',
      duration: '52 min',
      audioDuration: '52:14',
      summary:
        'Une révélation claire sur la puissance de l\'obéissance divine. Quand Jésus envoie au réservoir de Siloé, la foi activée triomphe de toute impossibilité humaine.',
    },
    {
      id: 'sermon-2',
      title: 'Revêtus de Puissance : La Promesse du Saint-Esprit',
      preacher: 'Pasteur Fondateur',
      date: '05 Octobre 2026',
      scriptureReference: 'Actes 1:8 & Luc 24:49',
      duration: '48 min',
      audioDuration: '48:30',
      summary:
        'Pourquoi le chrétien ne peut mener le combat moderne sans la plénitude du Saint-Esprit. Comprendre les armes spirituelles et la sanctification.',
    },
    {
      id: 'sermon-3',
      title: 'L\'Autorité du Croyant face aux Tempêtes de la Vie',
      preacher: 'Pasteur Invité',
      date: '28 Septembre 2026',
      scriptureReference: 'Marc 4:35-41',
      duration: '44 min',
      audioDuration: '44:10',
      summary:
        'Exercer la foi parlée et la paix du Seigneur au milieu des épreuves familiales et professionnelles.',
    },
  ],
};

const SPA_CACHE_KEY = 'sipec_spa_departments_cache_v4';

export async function fetchChurchSpaData(): Promise<ChurchSpaData> {
  // Simule une requête réseau asynchrone (Supabase API) avec délai
  await new Promise((resolve) => setTimeout(resolve, 350));

  try {
    const cached = localStorage.getItem(SPA_CACHE_KEY);
    if (cached) {
      const cachedData = JSON.parse(cached) as Partial<ChurchSpaData>;
      return {
        ...DEFAULT_SPA_DATA,
        ...cachedData,
        liveStreams: cachedData.liveStreams ?? DEFAULT_SPA_DATA.liveStreams,
      };
    }
  } catch {}

  try {
    localStorage.setItem(SPA_CACHE_KEY, JSON.stringify(DEFAULT_SPA_DATA));
  } catch {}

  return DEFAULT_SPA_DATA;
}
