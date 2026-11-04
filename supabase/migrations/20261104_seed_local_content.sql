-- Import non destructif du contenu de secours déjà présent dans l'application.
-- Chaque insertion est exécutée seulement si la table concernée est vide.

insert into public.settings (
  church_name, slogan_fr, phone, whatsapp, email, address_fr, city, country,
  facebook_url, youtube_url, instagram_url, tiktok_url, twitter_url, status
)
select
  'Siloam International Pentecostal Evangelical Church',
  'Une église sans frontières, manifestant la gloire de Dieu.',
  '+243 81 234 5678',
  '+243 81 234 5678',
  'contact@sipec-church.org',
  'Sanctuaire Principal, Boulevard de la Foi',
  'Kampala',
  'Ouganda',
  'https://www.facebook.com/',
  'https://www.youtube.com/@SIPEC',
  'https://www.instagram.com/',
  'https://www.tiktok.com/',
  'https://twitter.com/',
  'published'
where not exists (select 1 from public.settings);

insert into public.hero (
  title_fr, title_en, title_sw, subtitle_fr, subtitle_en, subtitle_sw,
  scripture_reference, scripture_text_fr, scripture_text_en, scripture_text_sw,
  primary_button_url, secondary_button_url, status, sort_order
)
select
  'Siloam International Pentecostal Evangelical Church',
  'Siloam International Pentecostal Evangelical Church',
  'Kanisa la Siloam International Pentecostal Evangelical Church',
  'Proclamer Christ, former des disciples et transformer les nations.',
  'Proclaim Christ, disciple believers and transform nations.',
  'Kutangaza Kristo, kuwajenga wanafunzi na kuibadilisha mataifa.',
  'Jean 9:7',
  'Va, lave-toi au réservoir de Siloé.',
  'Go and wash in the pool of Siloam.',
  'Nenda ukajioshe katika bwawa la Siloam.',
  '#contact',
  '#departments',
  'published',
  0
where not exists (select 1 from public.hero);

insert into public.about (mission_fr, mission_en, mission_sw, vision_fr, vision_en, vision_sw, history_fr, history_en, history_sw, status)
select
  'Proclamer l’Évangile sans compromis, conduire les âmes à la repentance et former des disciples affermis dans la sainteté.',
  'Proclaim the Gospel uncompromisingly, lead souls to repentance and form disciples grounded in holiness.',
  'Kutangaza Injili bila maelewano, kuongoza nafsi kwenye toba na kuwaweka wanafunzi katika utakatifu.',
  'Une église sans frontières, manifestant la gloire de Dieu et bâtissant des familles solides selon les Saintes Écritures.',
  'A church without borders, manifesting the glory of God and building strong families according to Scripture.',
  'Kanisa lisilo na mipaka, likionyesha utukufu wa Mungu na kujenga familia imara kulingana na Maandiko.',
  'Fondée sur le mandat révélé en Jean 9:7, la S.I.P.E.C est née d’un réveil consacré à la souveraineté du Christ.',
  'Founded on the mandate revealed in John 9:7, S.I.P.E.C was born from a revival dedicated to Christ’s sovereignty.',
  'Ilianzishwa kwa agizo lililoonyeshwa katika Yohana 9:7, S.I.P.E.C ilizaliwa kutoka kwa uamsho wa enzi ya Kristo.',
  'published'
where not exists (select 1 from public.about);

insert into public.founder (name, title_fr, title_en, title_sw, biography_fr, biography_en, biography_sw, vision_fr, vision_en, vision_sw, quote_fr, quote_en, quote_sw, status)
select
  'Révérend Luka Ludunge',
  'Conducteur Spirituel et Visionnaire de la S.I.P.E.C',
  'Spiritual Leader and Visionary of S.I.P.E.C',
  'Mkuu wa Kiroho na Maono wa S.I.P.E.C',
  'Revêtu d’un appel pastoral et prophétique, le Pasteur Fondateur conduit la communauté avec intégrité, foi et passion pour la gloire de Dieu.',
  'Clothed with a pastoral and prophetic calling, the Founding Pastor leads the community with integrity, faith and passion for God’s glory.',
  'Akiwa na wito wa kichungaji na kinabii, Mchungaji Mwanzilishi anaongoza jamii kwa uaminifu, imani na mapenzi ya utukufu wa Mungu.',
  'Bâtir une Église sans frontières, consacrée à la gloire de Dieu et à la formation de disciples.',
  'Build a church without borders, consecrated to God’s glory and the formation of disciples.',
  'Jenga kanisa lisilo na mipaka, lililowekwa utukufu wa Mungu na malezi ya wanafunzi.',
  'Va, lave-toi à Siloé et proclame la délivrance.',
  'Go, wash in Siloam and proclaim deliverance.',
  'Nenda, ujioge katika Siloam na utangaze ukombozi.',
  'published'
where not exists (select 1 from public.founder);

insert into public.departments (name_fr, name_en, name_sw, badge_fr, badge_en, badge_sw, description_fr, description_en, description_sw, schedule_fr, schedule_en, schedule_sw, status, sort_order)
select v.name_fr, v.name_en, v.name_sw, v.badge_fr, v.badge_en, v.badge_sw, v.description_fr, v.description_en, v.description_sw, v.schedule_fr, v.schedule_en, v.schedule_sw, 'published', v.sort_order
from (
  values
    ('SILOAM MÉDIA', 'SILOAM MEDIA', 'SILOAM MEDIA', 'Médias et Techniques', 'Media and Technical', 'Vyombo vya Habari na Ufundi', 'Production audiovisuelle, diffusion des cultes, sonorisation et communication digitale.', 'Audiovisual production, service broadcasts, sound engineering and digital communication.', 'Uzalishaji wa sauti na picha, utangazaji wa ibada, sauti na mawasiliano ya kidijitali.', 'Service selon le calendrier des cultes.', 'Service according to the worship calendar.', 'Huduma kulingana na kalenda ya ibada.', 1),
    ('JEUNESSE SIPEC', 'SIPEC YOUTH', 'VIJANA SIPEC', 'Jeunesse Dynamique', 'Dynamic Youth', 'Vijana Hai', 'Former une génération de jeunes chrétiens passionnés, intègres et responsables.', 'Training a generation of passionate, upright and responsible Christian youth.', 'Kuunda kizazi cha vijana wa Kikristo wenye shauku, uadilifu na wajibu.', 'Chaque samedi de 18h00 à 19h30.', 'Every Saturday from 18:00 to 19:30.', 'Kila Jumamosi kuanzia saa 18:00 hadi 19:30.', 2),
    ('MINISTÈRE D’INTERCESSION', 'INTERCESSION MINISTRY', 'HUDUMA YA MAOMBI', 'Veilleurs de Prière', 'Prayer Watchmen', 'Walinda Sala', 'Prière continue pour l’Église, les familles, la nation et la communauté.', 'Continuous prayer for the Church, families, the nation and the community.', 'Sala endelevu kwa Kanisa, familia, taifa na jamii.', 'Vendredi à partir de 22h30.', 'Friday from 22:30.', 'Ijumaa kuanzia saa 22:30.', 3),
    ('ÉCOLE DU DIMANCHE', 'SUNDAY SCHOOL', 'SHULE YA JUMAPILI', 'Ministère des Enfants', 'Children’s Ministry', 'Huduma ya Watoto', 'Enseignement biblique adapté aux enfants dans un environnement joyeux.', 'Bible teaching adapted to children in a joyful environment.', 'Mafundisho ya Biblia yanayowafaa watoto katika mazingira ya furaha.', 'Dimanche de 09h00 à 10h00.', 'Sunday from 09:00 to 10:00.', 'Jumapili kuanzia saa 09:00 hadi 10:00.', 4),
    ('DÉPARTEMENT DES PAPAS', 'MEN’S DEPARTMENT', 'IDARA YA WANAUME', 'Hommes de Foi', 'Men of Faith', 'Wanaume wa Imani', 'Croissance spirituelle, leadership chrétien et responsabilité familiale.', 'Spiritual growth, Christian leadership and family responsibility.', 'Ukuaji wa kiroho, uongozi wa Kikristo na wajibu wa familia.', 'Réunions mensuelles.', 'Monthly meetings.', 'Mikutano ya kila mwezi.', 5),
    ('DÉPARTEMENT DES MAMANS', 'WOMEN’S DEPARTMENT', 'IDARA YA WANAWAKE', 'Femmes Vertueuses', 'Virtuous Women', 'Wanawake Wenye Heshima', 'Édification des femmes comme piliers spirituels des familles et de l’Église.', 'Building women as spiritual pillars of families and the Church.', 'Kuwajenga wanawake kama nguzo za kiroho za familia na Kanisa.', 'Réunions mensuelles.', 'Monthly meetings.', 'Mikutano ya kila mwezi.', 6),
    ('COMITÉ DE SOUTIEN', 'SUPPORT COMMITTEE', 'KAMATI YA USAIDIZI', 'Support et Assistance', 'Support and Assistance', 'Msaada na Usaidizi', 'Organisation, accueil, logistique et assistance aux activités de l’Église.', 'Organization, welcome, logistics and assistance for church activities.', 'Utengenezaji, ukarimu, vifaa na msaada kwa shughuli za Kanisa.', 'Selon les événements.', 'According to events.', 'Kulingana na matukio.', 7),
    ('DÉPARTEMENT DU PROTOCOLE', 'PROTOCOL DEPARTMENT', 'IDARA YA PROTOKALI', 'Accueil et Protocole', 'Reception and Protocol', 'Kukubalika na Protokali', 'Accueil des visiteurs et accompagnement du bon déroulement des cultes.', 'Reception of visitors and support for the smooth conduct of services.', 'Kupokea wageni na kusaidia utendaji mzuri wa ibada.', 'Pendant tous les cultes.', 'During all services.', 'Wakati wa ibada zote.', 8),
    ('COLLÈGE DES ANCIENS', 'COUNCIL OF ELDERS', 'BARAZA LA WAZEE', 'Leadership Spirituel', 'Spiritual Leadership', 'Uongozi wa Kiroho', 'Accompagnement pastoral, doctrine, vision et croissance spirituelle de l’Église.', 'Pastoral care, doctrine, vision and spiritual growth of the Church.', 'Uangalizi wa kichungaji, mafundisho, maono na ukuaji wa kiroho wa Kanisa.', 'Réunions de conseil régulières.', 'Regular council meetings.', 'Mikutano ya mara kwa mara ya baraza.', 9)
) as v(name_fr, name_en, name_sw, badge_fr, badge_en, badge_sw, description_fr, description_en, description_sw, schedule_fr, schedule_en, schedule_sw, sort_order)
where not exists (select 1 from public.departments);

insert into public.choirs (name_fr, name_en, name_sw, description_fr, description_en, description_sw, schedule_fr, schedule_en, schedule_sw, status, sort_order)
select
  v.name_fr, v.name_en, v.name_sw, v.description_fr, v.description_en, v.description_sw,
  v.schedule_fr, v.schedule_en, v.schedule_sw, 'published'::publish_status, v.sort_order
from (
  values
    ('CHORALE SHEKINAH', 'SHEKINAH CHOIR', 'KWAYA SHEKINAH', 'Conduire le peuple de Dieu dans une adoration profonde.', 'Lead the people of God into deep worship.', 'Kuongoza watu wa Mungu katika ibada ya kina.', 'Jeudi et samedi de 14h00 à 16h00.', 'Thursday and Saturday from 14:00 to 16:00.', 'Alhamisi na Jumamosi kuanzia saa 14:00 hadi 16:00.', 1),
    ('CHORALE NEW LIGHT', 'NEW LIGHT CHOIR', 'KWAYA NEW LIGHT', 'Transmettre l’Évangile à travers le chant et l’excellence.', 'Transmit the Gospel through singing and excellence.', 'Kutangaza Injili kupitia uimbaji na ubora.', 'Lundi et vendredi de 08h00 à 10h00.', 'Monday and Friday from 08:00 to 10:00.', 'Jumatatu na Ijumaa kuanzia saa 08:00 hadi 10:00.', 2),
    ('CHORALE VOIX DES ANGES', 'VOICE OF ANGELS CHOIR', 'KWAYA SAUTI YA MALAIKA', 'Encourager l’Église à travers des chants inspirants.', 'Encourage the Church through inspiring songs.', 'Kuhimiza Kanisa kupitia nyimbo za kuhamasisha.', 'Mercredi de 16h00 à 17h00 et samedi de 14h00 à 15h00.', 'Wednesday from 16:00 to 17:00 and Saturday from 14:00 to 15:00.', 'Jumatano kuanzia saa 16:00 hadi 17:00 na Jumamosi kuanzia saa 14:00 hadi 15:00.', 3),
    ('CHORALE CENTRALE', 'CENTRAL CHOIR', 'KWAYA KUU', 'Accompagner les cultes majeurs et les célébrations spéciales.', 'Accompany major services and special celebrations.', 'Kuandamana na ibada kubwa na sherehe maalum.', 'Jeudi et samedi de 08h00 à 10h00.', 'Thursday and Saturday from 08:00 to 10:00.', 'Alhamisi na Jumamosi kuanzia saa 08:00 hadi 10:00.', 4)
) as v(name_fr, name_en, name_sw, description_fr, description_en, description_sw, schedule_fr, schedule_en, schedule_sw, sort_order)
where not exists (select 1 from public.choirs);

insert into public.gallery_albums (title_fr, title_en, title_sw, description_fr, description_en, description_sw, status, sort_order)
select v.*
from (
  values
    ('Grande Croisade d’Évangélisation', 'Great Evangelism Crusade', 'Mkusanyiko Mkuu wa Uinjilisti', 'Mission et moisson en plein air.', 'Open-air mission and harvest.', 'Ujumbe na mavuno ya nje.', 'published'::publish_status, 1),
    ('Baptêmes des nouveaux disciples', 'New disciples baptism', 'Ubatizo wa wanafunzi wapya', 'Célébration des baptêmes par immersion.', 'Celebration of water baptisms.', 'Sherehe ya ubatizo wa maji.', 'published'::publish_status, 2),
    ('Action sociale et compassion', 'Social outreach and compassion', 'Huduma ya Jamii na Huruma', 'Distribution de vivres et assistance communautaire.', 'Food distribution and community assistance.', 'Usambazaji wa vyakula na msaada wa jamii.', 'published'::publish_status, 3),
    ('Culte dominical', 'Sunday service', 'Ibada ya Jumapili', 'Louange, adoration et proclamation de la Parole.', 'Praise, worship and proclamation of the Word.', 'Sifa, ibada na utangazaji wa Neno.', 'published'::publish_status, 4),
    ('Convention jeunesse SIPEC', 'SIPEC youth convention', 'Mkutano wa Vijana SIPEC', 'Rassemblement et formation de la jeunesse.', 'Gathering and training of young people.', 'Mkusanyiko na mafunzo ya vijana.', 'published'::publish_status, 5),
    ('Veillée de prière', 'Prayer vigil', 'Usiku wa Maombi', 'Intercession et moments de prière communautaire.', 'Intercession and community prayer moments.', 'Maombezi na nyakati za sala za jamii.', 'published'::publish_status, 6)
) as v(title_fr, title_en, title_sw, description_fr, description_en, description_sw, status, sort_order)
where not exists (select 1 from public.gallery_albums);

insert into public.gallery_media (album_id, type, photo_url, title_fr, title_en, title_sw, description_fr, description_en, description_sw, status, sort_order)
select a.id, 'photo'::media_type, null, a.title_fr, a.title_en, a.title_sw, a.description_fr, a.description_en, a.description_sw, 'published'::publish_status, a.sort_order
from public.gallery_albums a
where not exists (select 1 from public.gallery_media);

insert into public.sermons (title_fr, title_en, title_sw, bible_reference, preacher_fr, preacher_en, preacher_sw, description_fr, description_en, description_sw, duration, published_at, category_fr, category_en, category_sw, downloads, featured, status)
select v.*
from (
  values
    ('Le Réservoir de Siloé et la Fin de l’Aveuglement Spirituel', 'The Pool of Siloam and the End of Spiritual Blindness', 'Bwawa la Siloam na Mwisho wa Upofu wa Kiroho', 'Jean 9:1-7', 'Pasteur Fondateur', 'Founding Pastor', 'Mchungaji Mwanzilishi', 'Une révélation sur la puissance de l’obéissance divine.', 'A revelation about the power of obedience to God.', 'Ufunuo kuhusu nguvu ya utiifu kwa Mungu.', '52 min', timestamptz '2026-10-12 09:00:00+03', 'Enseignement', 'Teaching', 'Mafundisho', 0, true, 'published'::publish_status),
    ('Revêtus de Puissance : La Promesse du Saint-Esprit', 'Clothed with Power: The Promise of the Holy Spirit', 'Wakiwa na Nguvu: Ahadi ya Roho Mtakatifu', 'Actes 1:8 & Luc 24:49', 'Pasteur Fondateur', 'Founding Pastor', 'Mchungaji Mwanzilishi', 'Comprendre la puissance du Saint-Esprit pour le service chrétien.', 'Understanding the power of the Holy Spirit for Christian service.', 'Kuelewa nguvu ya Roho Mtakatifu kwa huduma ya Kikristo.', '48 min', timestamptz '2026-10-05 09:00:00+03', 'Enseignement', 'Teaching', 'Mafundisho', 0, false, 'published'::publish_status),
    ('L’Autorité du Croyant face aux Tempêtes de la Vie', 'The Believer’s Authority in Life’s Storms', 'Mamlaka ya Muumini Katika Dhoruba za Maisha', 'Marc 4:35-41', 'Pasteur Invité', 'Guest Pastor', 'Mchungaji Mgeni', 'Exercer la foi et la paix du Seigneur au milieu des épreuves.', 'Exercise faith and the peace of the Lord in the midst of trials.', 'Tumia imani na amani ya Bwana katikati ya majaribu.', '44 min', timestamptz '2026-09-28 09:00:00+03', 'Enseignement', 'Teaching', 'Mafundisho', 0, false, 'published'::publish_status)
) as v(title_fr, title_en, title_sw, bible_reference, preacher_fr, preacher_en, preacher_sw, description_fr, description_en, description_sw, duration, published_at, category_fr, category_en, category_sw, downloads, featured, status)
where not exists (select 1 from public.sermons);

insert into public.livestreams (title_fr, title_en, title_sw, description_fr, description_en, description_sw, youtube_url, facebook_url, tiktok_url, instagram_url, is_live, start_time, end_time, thumbnail_url, status, viewers)
select v.*
from (
  values
    ('Culte d’Adoration & Parole — SIPEC Live', 'Worship and Word Service — SIPEC Live', 'Ibada ya Sifa na Neno — SIPEC Live', 'Louange, prière et proclamation de la Parole de Dieu.', 'Praise, prayer and proclamation of God’s Word.', 'Sifa, sala na utangazaji wa Neno la Mungu.', 'https://www.youtube.com/@SIPEC', 'https://www.facebook.com/', 'https://www.tiktok.com/', 'https://www.instagram.com/', true, timestamptz '2026-10-29 09:00:00+03', timestamptz '2026-10-29 12:00:00+03', null, 'live'::stream_status, 1248),
    ('Étude Biblique — La fidélité de Dieu', 'Bible Study — God’s Faithfulness', 'Funzo la Biblia — Uaminifu wa Mungu', 'Un enseignement biblique pour affermir la foi quotidienne.', 'Bible teaching to strengthen daily faith.', 'Mafundisho ya Biblia ili kuimarisha imani ya kila siku.', 'https://www.youtube.com/@SIPEC', 'https://www.facebook.com/', 'https://www.tiktok.com/', 'https://www.instagram.com/', false, timestamptz '2026-10-30 18:00:00+03', timestamptz '2026-10-30 20:00:00+03', null, 'offline'::stream_status, 0),
    ('Culte spécial — La puissance du Saint-Esprit', 'Special Service — The Power of the Holy Spirit', 'Ibada Maalum — Nguvu ya Roho Mtakatifu', 'Redécouvrez le ministère du Saint-Esprit.', 'Rediscover the ministry of the Holy Spirit.', 'Gundua tena huduma ya Roho Mtakatifu.', 'https://www.youtube.com/@SIPEC', 'https://www.facebook.com/', 'https://www.tiktok.com/', 'https://www.instagram.com/', false, timestamptz '2026-10-25 09:00:00+03', timestamptz '2026-10-25 12:00:00+03', null, 'replay'::stream_status, 3240)
) as v(title_fr, title_en, title_sw, description_fr, description_en, description_sw, youtube_url, facebook_url, tiktok_url, instagram_url, is_live, start_time, end_time, thumbnail_url, status, viewers)
where not exists (select 1 from public.livestreams);

insert into public.events (title_fr, title_en, title_sw, description_fr, description_en, description_sw, event_date, location_fr, location_en, location_sw, status)
select v.*
from (
  values
    ('Grand Culte d’Adoration et de Miracles', 'Great Worship and Miracle Service', 'Ibada Kuu ya Sifa na Miujiza', 'Célébration dominicale, louange et proclamation de la Parole.', 'Sunday celebration, praise and proclamation of the Word.', 'Sherehe ya Jumapili, sifa na utangazaji wa Neno.', timestamptz '2026-11-08 09:00:00+03', 'Grand Tabernacle Siloam', 'Siloam Main Tabernacle', 'Hekalu Kuu la Siloam', 'published'::publish_status),
    ('Étude Biblique et Enseignement Fondamental', 'Bible Study and Foundational Teaching', 'Funzo la Biblia na Mafundisho ya Msingi', 'Exposition approfondie des Écritures.', 'In-depth exposition of Scripture.', 'Ufafanuzi wa kina wa Maandiko.', timestamptz '2026-11-11 18:00:00+03', 'Sanctuaire Siloam', 'Siloam Sanctuary', 'Patakatifu pa Siloam', 'published'::publish_status),
    ('Soirée d’Intercession et Feu du Saint-Esprit', 'Intercession Night and Fire of the Holy Spirit', 'Usiku wa Maombezi na Moto wa Roho Mtakatifu', 'Intercession, prière d’autorité et adoration.', 'Intercession, authoritative prayer and worship.', 'Maombezi, sala ya mamlaka na ibada.', timestamptz '2026-11-13 18:00:00+03', 'Grand Tabernacle Siloam', 'Siloam Main Tabernacle', 'Hekalu Kuu la Siloam', 'published'::publish_status)
) as v(title_fr, title_en, title_sw, description_fr, description_en, description_sw, event_date, location_fr, location_en, location_sw, status)
where not exists (select 1 from public.events);

insert into public.contacts (address_fr, address_en, address_sw, phone, whatsapp, email, status)
select
  'Sanctuaire Principal, Kirombe, Sambya, Kampala, Ouganda',
  'Main Sanctuary, Kirombe, Sambya, Kampala, Uganda',
  'Patakatifu Kuu, Kirombe, Sambya, Kampala, Uganda',
  '+243 81 234 5678',
  '+243 81 234 5678',
  'contact@sipec-church.org',
  'published'
where not exists (select 1 from public.contacts);
