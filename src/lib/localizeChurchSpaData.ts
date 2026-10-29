import type { ChurchSpaData } from '../types/churchSpa';
import type { Language } from './language';

const content: Record<Exclude<Language, 'fr'>, Record<string, string>> = {
  en: {
    'Fondée sur le mandat d\'obéissance et de foi vivante révélé en Jean 9:7, la S.I.P.E.C est née d\'un réveil spirituel consacré à la souveraineté du Christ et à la démonstration de la puissance du Saint-Esprit.': 'Founded on the call to obedience and living faith revealed in John 9:7, S.I.P.E.C grew from a spiritual revival devoted to the sovereignty of Christ and the power of the Holy Spirit.',
    'Proclamer l\'Évangile sans compromis, conduire les âmes à la repentance et former des disciples affermis dans la sainteté.': 'To proclaim the Gospel without compromise, lead people to repentance, and form disciples grounded in holiness.',
    'Une église sans frontières, manifestant la gloire de Dieu et bâtissant des familles solides selon les Saintes Écritures.': 'A church without borders, revealing God’s glory and building strong families on the Holy Scriptures.',
    'Révérend Pasteur Fondateur': 'Reverend Founding Pastor',
    'Révérend Luka Ludunge': 'Reverend Luka Ludunge',
    'Conducteur Spirituel & Visionnaire de la S.I.P.E.C': 'Spiritual Leader & Visionary of S.I.P.E.C',
    '« Va, lave-toi à Siloé et proclame la délivrance. » (Jean 9:7)': '“Go, wash at Siloam and proclaim deliverance.” (John 9:7)',
    'Revêtu d\'un appel pastoral et prophétique consacré à l\'édification du Corps de Christ, le Pasteur Fondateur conduit la communauté avec intégrité, foi agissante et passion pour la gloire de Dieu. Son ministère est marqué par un enseignement christocentrique, le réveil spirituel et un dévouement paternel auprès des fidèles.': 'Called to pastoral and prophetic ministry for the edification of Christ’s body, the Founding Pastor leads the community with integrity, active faith, and a passion for God’s glory. His ministry is marked by Christ-centred teaching, spiritual revival, and devoted pastoral care.',
    'Intégrité pastorale & amour fraternel': 'Pastoral integrity & brotherly love',
    'Attachement inconditionnel aux Saintes Écritures': 'Unwavering commitment to the Holy Scriptures',
    'Intercession persévérante & foi en l\'action du Saint-Esprit': 'Persistent intercession & faith in the work of the Holy Spirit',
    'Écoute & Accompagnement Pastoral': 'Pastoral Listening & Care',
    'Conseils spirituels, entretiens confidentiels et orientation biblique pour les familles et individus.': 'Spiritual counsel, confidential conversations, and biblical guidance for individuals and families.',
    'Assistance Spirituelle': 'Spiritual Care',
    'Action Sociale & Solidarité': 'Social Action & Solidarity',
    'Secours d\'urgence, soutien aux veuves, orphelins et personnes vulnérables de notre communauté.': 'Emergency assistance and support for widows, orphans, and vulnerable people in our community.',
    'Entraide': 'Community Support',
    'Formation des Nouveaux Disciples': 'New Disciple Formation',
    'Classes de baptême, affermissement doctrinal et intégration fraternelle pour les nouveaux convertis.': 'Baptism classes, grounding in biblical teaching, and fellowship for new believers.',
    'Édification': 'Discipleship',
    'Cellules de Prière à Domicile': 'Home Prayer Groups',
    'Réseau de communion fraternelle et d\'intercession décentralisé dans les quartiers.': 'A neighbourhood network for fellowship and intercession.',
    'Communion': 'Fellowship',
    'Dimanche': 'Sunday', 'Mercredi': 'Wednesday', 'Vendredi': 'Friday',
    'Grand Culte d\'Adoration & Miracles': 'Great Worship & Miracles Service',
    'Étude Biblique & Enseignement Fondamental': 'Bible Study & Foundational Teaching',
    'Soirée d\'Intercession & Feu du Saint-Esprit': 'Intercession Night & Fire of the Holy Spirit',
    'Célébration dominicale, louange prophétique, proclamation de la Parole et ministère de délivrance.': 'Sunday celebration, prophetic praise, proclamation of the Word, and ministry of deliverance.',
    'Exposition approfondie des Écritures et affermissement de la doctrine chrétienne.': 'In-depth teaching of Scripture and a firm grounding in Christian doctrine.',
    'Combat spirituel, chaînes de jeûne, prière d\'autorité et manifestation des dons spirituels.': 'Spiritual warfare, fasting, authoritative prayer, and the gifts of the Spirit.',
    'Grand Tabernacle Siloam & Direct International': 'Siloam Grand Tabernacle & International Livestream',
    'Sanctuaire Siloam & Rebalancement Zoom': 'Siloam Sanctuary & Zoom Fellowship',
    'Grand Tabernacle Siloam': 'Siloam Grand Tabernacle',
    'Médias & Production': 'Media & Production', 'Chorale & Louange': 'Choir & Worship', 'Jeunesse Dynamique': 'Dynamic Youth', 'Collège d\'Intercession': 'Intercession Ministry', 'École du Dimanche': 'Sunday School',
    'Diffusion en direct, régie audiovisuelle, sonorisation et expansion de l\'Évangile en ligne.': 'Livestreaming, audiovisual production, sound, and sharing the Gospel online.',
    'Chœur consacré conduisant l\'assemblée dans une adoration intime et inspirée par l\'Esprit.': 'A dedicated choir leading the congregation in intimate, Spirit-inspired worship.',
    'Bâtir une génération de jeunes chrétiens zélés, intègres et victorieux dans la société.': 'Building a generation of passionate, principled, and thriving young Christians.',
    'Sentinelles consacrées à la prière continue pour l\'Église, la nation et les requêtes des fidèles.': 'Prayer watchmen devoted to continuous prayer for the church, the nation, and the needs of the congregation.',
    'Pédagogie biblique créative, mémorisation de versets et éveil de la foi pour les 3 à 14 ans.': 'Creative Bible teaching, Scripture memorisation, and faith formation for children aged 3 to 14.',
    'Dimanche & Réunions de culte': 'Sunday & worship gatherings', 'Répétitions : Jeudi 17h30 & Samedi 15h00': 'Rehearsals: Thursday 5:30 pm & Saturday 3:00 pm', 'Samedi : 16h30 – 19h00': 'Saturday: 4:30–7:00 pm', 'Chaque matin dès 05h30 & Veillées': 'Every morning from 5:30 am & prayer vigils', 'Dimanche matin pendant le culte': 'Sunday morning during worship',
    'Missions & Moissons': 'Missions & Harvest', 'Célébrations': 'Celebrations', 'Compassion & Entraide': 'Compassion & Support', 'Culte Dominical': 'Sunday Worship',
    'Grande Croisade d\'Évangélisation en Plein Air': 'Open-Air Evangelism Crusade', 'Baptêmes d\'Eau des Nouveaux Disciples': 'Water Baptisms for New Disciples', 'Distribution de Vivres et Assistance Sociale': 'Food Distribution & Social Support', 'Célébration et Adoration Communautaire': 'Community Celebration & Worship', 'Rassemblement Festif de la Jeunesse SIPEC Youth': 'SIPEC Youth Celebration', 'Veillée de Prière & Intercession Matinale': 'Prayer & Morning Intercession Vigil',
    'Photo : Croisade d\'Évangélisation (1200x800)': 'Photo: Evangelism Crusade (1200x800)', 'Photo : Baptêmes d\'Eau (800x1200)': 'Photo: Water Baptisms (800x1200)', 'Photo : Action Sociale (800x800)': 'Photo: Community Outreach (800x800)', 'Photo : Adoration au Sanctuaire (800x1200)': 'Photo: Worship at the Sanctuary (800x1200)', 'Photo : Convention Jeunesse (1200x800)': 'Photo: Youth Convention (1200x800)', 'Photo : Soirée de Prière (800x800)': 'Photo: Prayer Night (800x800)',
    'Pasteur Fondateur': 'Founding Pastor', 'Pasteur Invité': 'Guest Pastor', 'Le Réservoir de Siloé et la Fin de l\'Aveuglement Spirituel': 'The Pool of Siloam and the End of Spiritual Blindness', 'Revêtus de Puissance : La Promesse du Saint-Esprit': 'Clothed with Power: The Promise of the Holy Spirit', 'L\'Autorité du Croyant face aux Tempêtes de la Vie': 'The Believer’s Authority in Life’s Storms',
    'Une révélation claire sur la puissance de l\'obéissance divine. Quand Jésus envoie au réservoir de Siloé, la foi activée triomphe de toute impossibilité humaine.': 'A clear revelation of the power of obedience to God. When Jesus sends someone to the Pool of Siloam, active faith overcomes every human impossibility.',
    'Pourquoi le chrétien ne peut mener le combat moderne sans la plénitude du Saint-Esprit. Comprendre les armes spirituelles et la sanctification.': 'Why Christians cannot face today’s battles without the fullness of the Holy Spirit. Understanding spiritual weapons and sanctification.',
    'Exercer la foi parlée et la paix du Seigneur au milieu des épreuves familiales et professionnelles.': 'Practising spoken faith and the peace of the Lord amid family and workplace challenges.',
    'Sanctuaire Principal, Boulevard de la Foi': 'Main Sanctuary, Boulevard de la Foi', 'Kampala / International': 'Kampala / International', 'Du Mardi au Samedi : 09h00 – 16h30': 'Tuesday to Saturday: 9:00 am–4:30 pm',
    '12 Octobre 2026': 'October 12, 2026', '05 Octobre 2026': 'October 5, 2026', '28 Septembre 2026': 'September 28, 2026',
  },
  sw: {
    'Fondée sur le mandat d\'obéissance et de foi vivante révélé en Jean 9:7, la S.I.P.E.C est née d\'un réveil spirituel consacré à la souveraineté du Christ et à la démonstration de la puissance du Saint-Esprit.': 'S.I.P.E.C ilianzishwa kwa wito wa utii na imani hai unaofunuliwa katika Yohana 9:7, kutoka katika uamsho wa kiroho unaotangaza ukuu wa Kristo na nguvu ya Roho Mtakatifu.',
    'Proclamer l\'Évangile sans compromis, conduire les âmes à la repentance et former des disciples affermis dans la sainteté.': 'Kuhubiri Injili bila kuyumba, kuwaongoza watu katika toba na kuwajenga wanafunzi katika utakatifu.',
    'Une église sans frontières, manifestant la gloire de Dieu et bâtissant des familles solides selon les Saintes Écritures.': 'Kanisa lisilo na mipaka, linalodhihirisha utukufu wa Mungu na kujenga familia imara kwa msingi wa Maandiko Matakatifu.',
    'Révérend Pasteur Fondateur': 'Mchungaji Mwanzilishi', 'Révérend Luka Ludunge': 'Mchungaji Luka Ludunge', 'Conducteur Spirituel & Visionnaire de la S.I.P.E.C': 'Kiongozi wa Kiroho na Mwenye Maono wa S.I.P.E.C',
    '« Va, lave-toi à Siloé et proclame la délivrance. » (Jean 9:7)': '“Nenda ukanawe katika Siloamu na utangaze ukombozi.” (Yohana 9:7)',
    'Revêtu d\'un appel pastoral et prophétique consacré à l\'édification du Corps de Christ, le Pasteur Fondateur conduit la communauté avec intégrité, foi agissante et passion pour la gloire de Dieu. Son ministère est marqué par un enseignement christocentrique, le réveil spirituel et un dévouement paternel auprès des fidèles.': 'Akiwa na wito wa kichungaji na kinabii wa kulijenga Kanisa la Kristo, Mchungaji Mwanzilishi anaongoza jumuiya kwa uadilifu, imani tendaji na bidii kwa utukufu wa Mungu. Huduma yake ina sifa ya mafundisho yanayomweka Kristo katikati, uamsho wa kiroho na kuwajali waumini.',
    'Intégrité pastorale & amour fraternel': 'Uadilifu wa kichungaji na upendo wa kindugu', 'Attachement inconditionnel aux Saintes Écritures': 'Kujitoa kikamilifu kwa Maandiko Matakatifu', 'Intercession persévérante & foi en l\'action du Saint-Esprit': 'Maombezi ya kudumu na imani katika kazi ya Roho Mtakatifu',
    'Écoute & Accompagnement Pastoral': 'Usikivu na Ushauri wa Kichungaji', 'Conseils spirituels, entretiens confidentiels et orientation biblique pour les familles et individus.': 'Ushauri wa kiroho, mazungumzo ya faragha na mwongozo wa Biblia kwa watu na familia.', 'Assistance Spirituelle': 'Msaada wa Kiroho', 'Action Sociale & Solidarité': 'Huduma kwa Jamii na Mshikamano', 'Secours d\'urgence, soutien aux veuves, orphelins et personnes vulnérables de notre communauté.': 'Msaada wa dharura kwa wajane, yatima na watu walio katika mazingira magumu.', 'Entraide': 'Msaada wa Pamoja', 'Formation des Nouveaux Disciples': 'Mafunzo kwa Wanafunzi Wapya', 'Classes de baptême, affermissement doctrinal et intégration fraternelle pour les nouveaux convertis.': 'Mafunzo ya ubatizo, mafundisho ya imani na ushirika kwa waumini wapya.', 'Édification': 'Ukuaji wa Imani', 'Cellules de Prière à Domicile': 'Vikundi vya Maombi Nyumbani', 'Réseau de communion fraternelle et d\'intercession décentralisé dans les quartiers.': 'Mtandao wa ushirika na maombezi katika vitongoji.', 'Communion': 'Ushirika',
    'Dimanche': 'Jumapili', 'Mercredi': 'Jumatano', 'Vendredi': 'Ijumaa', 'Grand Culte d\'Adoration & Miracles': 'Ibada Kuu ya Sifa na Miujiza', 'Étude Biblique & Enseignement Fondamental': 'Mafunzo ya Biblia na Mafundisho ya Msingi', 'Soirée d\'Intercession & Feu du Saint-Esprit': 'Usiku wa Maombezi na Moto wa Roho Mtakatifu', 'Célébration dominicale, louange prophétique, proclamation de la Parole et ministère de délivrance.': 'Ibada ya Jumapili, sifa za kinabii, kutangaza Neno na huduma ya ukombozi.', 'Exposition approfondie des Écritures et affermissement de la doctrine chrétienne.': 'Kujifunza Maandiko kwa kina na kuimarishwa katika mafundisho ya Kikristo.', 'Combat spirituel, chaînes de jeûne, prière d\'autorité et manifestation des dons spirituels.': 'Vita vya kiroho, kufunga, maombi ya mamlaka na karama za Roho.', 'Grand Tabernacle Siloam & Direct International': 'Hema Kuu la Siloam na matangazo ya moja kwa moja', 'Sanctuaire Siloam & Rebalancement Zoom': 'Kanisa la Siloam na ushirika wa Zoom', 'Grand Tabernacle Siloam': 'Hema Kuu la Siloam',
    'Médias & Production': 'Vyombo vya Habari na Uzalishaji', 'Chorale & Louange': 'Kwaya na Sifa', 'Jeunesse Dynamique': 'Vijana Imara', 'Collège d\'Intercession': 'Huduma ya Maombezi', 'École du Dimanche': 'Shule ya Jumapili', 'Diffusion en direct, régie audiovisuelle, sonorisation et expansion de l\'Évangile en ligne.': 'Matangazo mubashara, uzalishaji wa sauti na picha na kueneza Injili mtandaoni.', 'Chœur consacré conduisant l\'assemblée dans une adoration intime et inspirée par l\'Esprit.': 'Kwaya iliyowekwa wakfu inayoongoza kanisa katika ibada inayoongozwa na Roho.', 'Bâtir une génération de jeunes chrétiens zélés, intègres et victorieux dans la société.': 'Kujenga kizazi cha vijana Wakristo wenye bidii, uadilifu na ushindi katika jamii.', 'Sentinelles consacrées à la prière continue pour l\'Église, la nation et les requêtes des fidèles.': 'Walinda-maombi wanaoliombea kanisa, taifa na mahitaji ya waumini bila kukoma.', 'Pédagogie biblique créative, mémorisation de versets et éveil de la foi pour les 3 à 14 ans.': 'Mafundisho bunifu ya Biblia, kukariri mistari na kukuza imani kwa watoto wa miaka 3 hadi 14.',
    'Dimanche & Réunions de culte': 'Jumapili na mikutano ya ibada', 'Répétitions : Jeudi 17h30 & Samedi 15h00': 'Mazoezi: Alhamisi saa 11:30 jioni na Jumamosi saa 9:00 alasiri', 'Samedi : 16h30 – 19h00': 'Jumamosi: saa 10:30 jioni – 1:00 usiku', 'Chaque matin dès 05h30 & Veillées': 'Kila asubuhi kuanzia saa 11:30 alfajiri na mikesha', 'Dimanche matin pendant le culte': 'Jumapili asubuhi wakati wa ibada',
    'Missions & Moissons': 'Misheni na mavuno', 'Célébrations': 'Sherehe', 'Compassion & Entraide': 'Huruma na msaada', 'Culte Dominical': 'Ibada ya Jumapili', 'Grande Croisade d\'Évangélisation en Plein Air': 'Kampeni Kuu ya Uinjilisti wa Wazi', 'Baptêmes d\'Eau des Nouveaux Disciples': 'Ubatizo wa maji kwa wanafunzi wapya', 'Distribution de Vivres et Assistance Sociale': 'Ugawaji wa chakula na msaada wa kijamii', 'Célébration et Adoration Communautaire': 'Sherehe na ibada ya jumuiya', 'Rassemblement Festif de la Jeunesse SIPEC Youth': 'Mkutano wa furaha wa vijana wa SIPEC', 'Veillée de Prière & Intercession Matinale': 'Mkesha wa maombi na maombezi ya asubuhi',
    'Photo : Croisade d\'Évangélisation (1200x800)': 'Picha: Kampeni ya uinjilisti (1200x800)', 'Photo : Baptêmes d\'Eau (800x1200)': 'Picha: Ubatizo wa maji (800x1200)', 'Photo : Action Sociale (800x800)': 'Picha: Huduma kwa jamii (800x800)', 'Photo : Adoration au Sanctuaire (800x1200)': 'Picha: Ibada kanisani (800x1200)', 'Photo : Convention Jeunesse (1200x800)': 'Picha: Mkutano wa vijana (1200x800)', 'Photo : Soirée de Prière (800x800)': 'Picha: Usiku wa maombi (800x800)',
    'Pasteur Fondateur': 'Mchungaji Mwanzilishi', 'Pasteur Invité': 'Mchungaji Mgeni', 'Le Réservoir de Siloé et la Fin de l\'Aveuglement Spirituel': 'Birika la Siloamu na mwisho wa upofu wa kiroho', 'Revêtus de Puissance : La Promesse du Saint-Esprit': 'Kuvaa nguvu: Ahadi ya Roho Mtakatifu', 'L\'Autorité du Croyant face aux Tempêtes de la Vie': 'Mamlaka ya mwamini wakati wa dhoruba za maisha', 'Une révélation claire sur la puissance de l\'obéissance divine. Quand Jésus envoie au réservoir de Siloé, la foi activée triomphe de toute impossibilité humaine.': 'Ufunuo kuhusu nguvu ya kumtii Mungu. Yesu anapotuma mtu kwenye birika la Siloamu, imani inayotenda hushinda hali zote zisizowezekana.', 'Pourquoi le chrétien ne peut mener le combat moderne sans la plénitude du Saint-Esprit. Comprendre les armes spirituelles et la sanctification.': 'Kwa nini Mkristo anahitaji utimilifu wa Roho Mtakatifu katika changamoto za leo; kuelewa silaha za kiroho na utakaso.', 'Exercer la foi parlée et la paix du Seigneur au milieu des épreuves familiales et professionnelles.': 'Kutumia imani na amani ya Bwana katikati ya changamoto za familia na kazi.',
    'Sanctuaire Principal, Boulevard de la Foi': 'Kanisa kuu, Kampala', 'Du Mardi au Samedi : 09h00 – 16h30': 'Jumanne hadi Jumamosi: saa 3:00 asubuhi – 10:30 jioni', '12 Octobre 2026': '12 Oktoba 2026', '05 Octobre 2026': '5 Oktoba 2026', '28 Septembre 2026': '28 Septemba 2026',
  },
};

export function localizeChurchSpaData(data: ChurchSpaData, language: Language): ChurchSpaData {
  if (language === 'fr') return data;
  const dictionary = content[language];
  const tr = (value: string) => dictionary[value] ?? value;

  return {
    ...data,
    meta: {
      ...data.meta,
      contact: { ...data.meta.contact, address: tr(data.meta.contact.address), officeHours: tr(data.meta.contact.officeHours) },
      liveStatus: { ...data.meta.liveStatus, title: tr(data.meta.liveStatus.title), speaker: tr(data.meta.liveStatus.speaker) },
    },
    about: {
      history: tr(data.about.history),
      mission: tr(data.about.mission),
      vision: tr(data.about.vision),
    },
    founder: {
      ...data.founder,
      name: tr(data.founder.name),
      title: tr(data.founder.title),
      callingVerse: tr(data.founder.callingVerse),
      biography: tr(data.founder.biography),
      pillars: data.founder.pillars.map(tr),
    },
    communityServices: data.communityServices.map((item) => ({
      ...item,
      title: tr(item.title), description: tr(item.description), badge: tr(item.badge),
    })),
    servicesCalendar: data.servicesCalendar.map((item) => ({
      ...item,
      day: tr(item.day), title: tr(item.title), description: tr(item.description), location: tr(item.location),
    })),
    departments: data.departments.map((item) => ({
      ...item,
      name: tr(item.name), role: tr(item.role), schedule: tr(item.schedule), description: tr(item.description),
    })),
    gallery: data.gallery.map((item) => ({
      ...item,
      title: tr(item.title), category: tr(item.category), placeholderLabel: tr(item.placeholderLabel),
    })),
    sermons: data.sermons.map((item) => ({
      ...item,
      title: tr(item.title), preacher: tr(item.preacher), date: tr(item.date), summary: tr(item.summary),
    })),
    liveStreams: (data.liveStreams ?? []).map((item) => ({
      ...item,
      title: tr(item.title), description: tr(item.description),
    })),
  };
}