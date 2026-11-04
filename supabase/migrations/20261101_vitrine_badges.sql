-- ==============================================================================
-- MIGRATION SUPABASE : VITRINE BADGES (Architecture Miroir Absolue)
-- Synchronisation Champ par Champ avec le Design Facebook Premium / Radio Okapi
-- ==============================================================================

-- 1. CRÉATION DU STORAGE BUCKET 'church-media' POUR LES MÉDIAS
INSERT INTO storage.buckets (id, name, public)
VALUES ('church-media', 'church-media', true)
ON CONFLICT (id) DO NOTHING;

-- Politiques Storage : Lecture publique et Écriture Admin
CREATE POLICY "Médias accessibles publiquement"
ON storage.objects FOR SELECT
USING (bucket_id = 'church-media');

CREATE POLICY "Téléversement réservé aux administrateurs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'church-media');

CREATE POLICY "Suppression réservée aux administrateurs"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'church-media');

-- 2. CRÉATION DE LA TABLE public.vitrine_badges
CREATE TABLE IF NOT EXISTS public.vitrine_badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_target VARCHAR(100) NOT NULL, 
    -- Sections cibles :
    -- 'notre_impact', 'weekly_programmes', 'our_biography', 'church_foundations',
    -- 'ministry_milestones', 'predications', 'horaires_cultes', 'notre_equipe', 'contact_banner'
    
    -- Correspondance exacte avec le COMPOSANT HEADER
    author_name VARCHAR(150) DEFAULT 'S.I.P.E.C Siloam Kampala',
    author_avatar_url TEXT,
    metadata_subtitle VARCHAR(100), -- Ex: "Dimanche • 08h00 - 12h00", "Pasteur Fondateur • Visionnaire"
    
    -- Correspondance exacte avec le COMPOSANT BODY (Au-dessus de l'image)
    body_text TEXT NOT NULL, -- Paragraphe descriptif d'origine
    
    -- Correspondance exacte avec le COMPOSANT MEDIA
    media_url TEXT, -- URL du fichier physique téléversé dans 'church-media'
    media_type VARCHAR(20) DEFAULT 'image', -- 'image', 'video', 'podcast'
    
    -- Correspondance exacte avec le SOUS-BLOC ENCADRÉ (Style Radio Okapi)
    embed_domain VARCHAR(100) DEFAULT 'SILOAMKAMPALA.ORG',
    embed_title TEXT NOT NULL, -- Grand titre de la carte en gras
    embed_subtitle TEXT,       -- Sous-titre contextuel
    
    -- Correspondance exacte avec le COMPOSANT FOOTER
    interaction_likes INT DEFAULT 0,
    comment_count_simulated INT DEFAULT 0,
    cta_button_text VARCHAR(50) DEFAULT 'En savoir plus',
    cta_button_url TEXT,
    sort_order INT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE public.vitrine_badges
ADD COLUMN IF NOT EXISTS cta_details_text TEXT;

CREATE TABLE IF NOT EXISTS public.public_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_key TEXT NOT NULL,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE public.public_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lecture publique des commentaires" ON public.public_comments;
CREATE POLICY "Lecture publique des commentaires"
ON public.public_comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Insertion publique des commentaires" ON public.public_comments;
CREATE POLICY "Insertion publique des commentaires"
ON public.public_comments FOR INSERT WITH CHECK (
    length(trim(author_name)) > 0 AND length(trim(content)) > 0
);

-- Index pour accélérer les requêtes par section et ordre
CREATE INDEX IF NOT EXISTS idx_vitrine_badges_section ON public.vitrine_badges(section_target, sort_order);

-- 3. ACTIVATION DE LA SÉCURITÉ ROW LEVEL SECURITY (RLS)
ALTER TABLE public.vitrine_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique anonyme" 
ON public.vitrine_badges 
FOR SELECT 
USING (true);

CREATE POLICY "Contrôle total Admin authentifié" 
ON public.vitrine_badges 
FOR ALL 
TO authenticated 
USING (true);

CREATE TABLE IF NOT EXISTS public.community_badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    badge_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL DEFAULT '',
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE public.community_badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lecture publique des badges communautaires" ON public.community_badges;
CREATE POLICY "Lecture publique des badges communautaires"
ON public.community_badges FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS "Gestion admin des badges communautaires" ON public.community_badges;
CREATE POLICY "Gestion admin des badges communautaires"
ON public.community_badges FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

INSERT INTO public.community_badges (badge_key, title, payload, sort_order)
VALUES
(
  'weekly_events',
  'Nos événements de la semaine',
  '{
    "description": "Moments vécus et témoignages de la communauté",
    "event_title": "Grande nuit de louange",
    "event_subtitle": "Vendredi dernier · Kirombe, Kampala",
    "image_url": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=85",
    "christians": 320,
    "visitors": 48,
    "testimonies": 27
  }'::jsonb,
  1
),
(
  'weekly_program',
  'Programme de la semaine',
  '{
    "preacher_image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85",
    "moderator_image_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85",
    "preacher_label": "Prédicateur principal",
    "moderator_label": "Modérateur",
    "preacher_name": "Pasteur Fondateur",
    "moderator_name": "Sœur Rachel",
    "schedule": "Dimanche · 08h00 - 12h00",
    "address": "Kirombe, Sambya, Kampala, Ouganda"
  }'::jsonb,
  2
),
(
  'developer_signature',
  'Designed by Software Engineer Chrispin Nyabahama',
  '{
    "name": "Software Engineer Chrispin Nyabahama",
    "photo_url": "",
    "portfolio_url": "https://github.com/Nyabahama",
    "description": "Database manager, créateur de contenu média et designer — web, applications mobiles et desktop, IT manager, helpdesk et networking."
  }'::jsonb,
  3
)
ON CONFLICT (badge_key) DO NOTHING;

-- 4. INSERTION DE TOUTES LES DONNÉES EXISTANTES DE LA VITRINE (SEED COMPLET)
INSERT INTO public.vitrine_badges 
(section_target, author_name, metadata_subtitle, body_text, media_url, media_type, embed_domain, embed_title, embed_subtitle, interaction_likes, comment_count_simulated, cta_button_text, cta_button_url, sort_order)
VALUES
-- === S.I.P.E.C / NOTRE IMPACT ===
(
  'notre_impact',
  'S.I.P.E.C Siloam Kampala',
  'Notre Impact • Kampala',
  'Une communauté chrétienne dynamique, fraternelle et fervente unie dans la prière et la foi vivante en Jésus-Christ à Kampala.',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  '1 200+ Membres',
  'Membres',
  620,
  84,
  'En savoir plus',
  '#bios',
  1
),
(
  'notre_impact',
  'S.I.P.E.C Siloam Kampala',
  'Notre Impact • Kampala',
  'Des ministères actifs au service de Dieu et du prochain : accueil, intercession, jeunesse, médias, louange et actions sociales.',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  '6 Départements',
  'Départements',
  410,
  52,
  'En savoir plus',
  '#departements',
  2
),
(
  'notre_impact',
  'S.I.P.E.C Siloam Kampala',
  'Notre Impact • Kampala',
  'Un rayonnement spirituel au-delà des frontières de l’Ouganda, touchant les cœurs à travers nos cultes en direct et nos programmes.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  '8 Nations atteintes',
  'Nations atteintes',
  580,
  76,
  'En savoir plus',
  '#predications',
  3
),
(
  'notre_impact',
  'S.I.P.E.C Siloam Kampala',
  'Notre Impact • Kampala',
  'Des années d’obéissance, de témoignage de la fidélité divine et de transformation des vies sous l’onction du Saint-Esprit.',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  '15 Années de ministère',
  'Années de ministère',
  730,
  98,
  'En savoir plus',
  '#bios',
  4
),

-- === WEEKLY PROGRAMMES ===
(
  'weekly_programmes',
  'S.I.P.E.C Siloam Kampala',
  'Dimanche • 10h00 – 12h00',
  'Célébration dominicale, louange, adoration et proclamation de la parole.',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Culte d''adoration — Dimanche',
  'Horaire officiel : 10h00 – 12h00',
  540,
  68,
  'Participer',
  '#adresse',
  1
),
(
  'weekly_programmes',
  'S.I.P.E.C Siloam Kampala',
  'Jeudi • 18h00',
  'Enseignement biblique approfondi et édification spirituelle.',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Étude biblique — Jeudi',
  'Horaire officiel : 18h00',
  310,
  42,
  'Participer',
  '#adresse',
  2
),
(
  'weekly_programmes',
  'S.I.P.E.C Siloam Kampala',
  'Samedi • 10h00 – 12h00',
  'Temps d''intercession, de requêtes et de combat spirituel.',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Prière d''intercession — Samedi',
  'Horaire officiel : 10h00 – 12h00',
  280,
  35,
  'Participer',
  '#adresse',
  3
),
(
  'weekly_programmes',
  'S.I.P.E.C Siloam Kampala',
  'Vendredi • 23h00 – 03h00',
  'Nuit de prière, jeûne et supplication devant la face de Dieu.',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Veillée de prière — Vendredi',
  'Horaire officiel : 23h00 – 03h00',
  420,
  53,
  'Participer',
  '#adresse',
  4
),
(
  'weekly_programmes',
  'S.I.P.E.C Siloam Kampala',
  'En semaine • 08h00 – 10h00',
  'Disponibilité pastorale, écoute et entretiens spirituels.',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Matinées pastorales — En semaine',
  'Horaire officiel : 08h00 – 10h00',
  195,
  24,
  'Participer',
  '#adresse',
  5
),
(
  'weekly_programmes',
  'S.I.P.E.C Siloam Kampala',
  'Jour à confirmer • 17h30 – 20h30',
  'Prière pour les malades, guérison divine et libération.',
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Guérison & délivrance — Jour à confirmer',
  'Horaire officiel : 17h30 – 20h30',
  470,
  61,
  'Participer',
  '#adresse',
  6
),

-- === OUR BIOGRAPHY (PASTEUR FONDATEUR) ===
(
  'our_biography',
  'Pasteur Fondateur',
  'Pasteur Fondateur • Visionnaire & Fondateur',
  'Consacré au ministère pastoral depuis plus de deux décennies, le Pasteur Fondateur a reçu l’appel divin pour implanter l’Église Siloam (S.I.P.E.C) à Kampala, Ouganda. Porteur d’une vision apostolique et d’un ministère prophétique fort, il enseigne la saine doctrine avec ferveur, compassion et rigueur théologique.

« Va, et lave-toi au réservoir de Siloé (ce qui signifie Envoyé). » — Jean 9:7

📌 Notre Mission : Proclamer l’Évangile intégral, manifester la puissance de Dieu et bâtir des vies solides dans la foi.
✨ Notre Vision : Être un phare spirituel à Kampala et pour les nations, où les âmes recouvrent la vue spirituelle.',
  '/assets/apo.jpeg',
  'image',
  'SILOAMKAMPALA.ORG',
  'Pasteur Fondateur — Vision Apostolique',
  'Ministère Pastoral • Jean 9:7',
  842,
  154,
  'Planifier une visite',
  '#adresse',
  1
),

-- === CHURCH FOUNDATIONS ===
(
  'church_foundations',
  'S.I.P.E.C Siloam Kampala',
  'Fondements de l''Église • Kampala',
  'La Bible comme autorité souveraine et nourriture quotidienne de l''âme.',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Parole de Dieu',
  'Fondements de l''Église',
  312,
  42,
  'En savoir plus',
  '#a-propos',
  1
),
(
  'church_foundations',
  'S.I.P.E.C Siloam Kampala',
  'Fondements de l''Église • Kampala',
  'La respiration spirituelle de l''Église, source de puissance et d''intimité avec Dieu.',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Prière continue',
  'Fondements de l''Église',
  428,
  65,
  'En savoir plus',
  '#a-propos',
  2
),
(
  'church_foundations',
  'S.I.P.E.C Siloam Kampala',
  'Fondements de l''Église • Kampala',
  'L''onction qui brise le joug et conduit dans toute la vérité.',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Saint-Esprit',
  'Fondements de l''Église',
  389,
  51,
  'En savoir plus',
  '#a-propos',
  3
),
(
  'church_foundations',
  'S.I.P.E.C Siloam Kampala',
  'Fondements de l''Église • Kampala',
  'Gagner des âmes et faire de toutes les nations des disciples fidèles.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Évangélisation',
  'Fondements de l''Église',
  275,
  38,
  'En savoir plus',
  '#a-propos',
  4
),
(
  'church_foundations',
  'S.I.P.E.C Siloam Kampala',
  'Fondements de l''Église • Kampala',
  'Le lien de la perfection manifesté par l''entraide et l''accueil chaleureux.',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Amour fraternel',
  'Fondements de l''Église',
  490,
  73,
  'En savoir plus',
  '#a-propos',
  5
),

-- === MINISTRY MILESTONES ===
(
  'ministry_milestones',
  'S.I.P.E.C Siloam Kampala',
  'Étape 01 • Jalons du Ministère',
  'La révélation initiale reçue dans la prière et confirmée par l''Écriture sainte.',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  '01. L''Appel Divin',
  'Jalons du Ministère',
  230,
  29,
  'Découvrir',
  '#bios',
  1
),
(
  'ministry_milestones',
  'S.I.P.E.C Siloam Kampala',
  'Étape 02 • Jalons du Ministère',
  'Les premiers pas d''évangélisation, d''affermissement et de formation des disciples.',
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  '02. Début du Ministère',
  'Jalons du Ministère',
  315,
  44,
  'Découvrir',
  '#bios',
  2
),
(
  'ministry_milestones',
  'S.I.P.E.C Siloam Kampala',
  'Étape 03 • Jalons du Ministère',
  'L''établissement du sanctuaire à Kirombe / Sambya, Kampala.',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  '03. Implantation Siloam',
  'Jalons du Ministère',
  450,
  67,
  'Découvrir',
  '#bios',
  3
),
(
  'ministry_milestones',
  'S.I.P.E.C Siloam Kampala',
  'Étape 04 • Jalons du Ministère',
  'Rayonner depuis Kampala vers les nations par la puissance du Saint-Esprit.',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  '04. Expansion aux Nations',
  'Jalons du Ministère',
  520,
  89,
  'Découvrir',
  '#bios',
  4
),

-- === HORAIRES DES CULTES & NOTRE ÉQUIPE ===
(
  'horaires_cultes',
  'S.I.P.E.C Siloam Kampala',
  'Dimanche • 8h00 - 12h00',
  'Le grand rassemblement dominical de toute la communauté S.I.P.E.C : louange vivante, adoration prophétique, proclamation puissante de la Parole de Dieu et ministère de prière pour les familles.',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Culte Principal — Dimanche',
  'Horaire officiel : 8h00 - 12h00',
  640,
  82,
  'Planifier une visite',
  'https://www.google.com/maps/search/?api=1&query=Kirombe+Sambya+Kampala+Ouganda',
  1
),
(
  'horaires_cultes',
  'S.I.P.E.C Siloam Kampala',
  'Jeudi • 18h00 - 20h00',
  'Un rendez-vous hebdomadaire d’enseignement biblique et de sanctification pour approfondir la saine doctrine, méditer les Écritures et bâtir une foi chrétienne inébranlable.',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Étude Biblique — Jeudi',
  'Horaire officiel : 18h00 - 20h00',
  380,
  44,
  'Planifier une visite',
  'https://www.google.com/maps/search/?api=1&query=Kirombe+Sambya+Kampala+Ouganda',
  2
),
(
  'horaires_cultes',
  'S.I.P.E.C Siloam Kampala',
  'Vendredi • 22h30 - Fin',
  'Une nuit d’intercession stratégique, de louange et de combat spirituel pour briser les liens, intercéder pour l’Église, les nations et voir la puissance divine se déployer.',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Veillée de Prière — Vendredi',
  'Horaire officiel : 22h30 - Fin',
  510,
  67,
  'Planifier une visite',
  'https://www.google.com/maps/search/?api=1&query=Kirombe+Sambya+Kampala+Ouganda',
  3
),
(
  'notre_equipe',
  'Pasteur Fondateur',
  'Responsable principal • Responsables SIPEC',
  'Visionnaire et berger principal de la S.I.P.E.C Siloam Kampala, portant la vision apostolique selon Jean 9:7 et guidant le peuple de Dieu avec amour, vérité et autorité spirituelle.',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Pasteur Fondateur',
  'Responsable principal',
  720,
  94,
  'Contacter',
  'mailto:contact@sipec-church.org',
  1
),
(
  'notre_equipe',
  'Responsable accueil',
  'Bienvenue & visites • Responsables SIPEC',
  'Dédié à l’accueil chaleureux de chaque membre et visiteur, veillant à ce que chacun se sente aimé, attendu et intégré dès ses premiers pas à l’église Siloam.',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Responsable accueil',
  'Bienvenue & visites',
  390,
  48,
  'Contacter',
  'mailto:contact@sipec-church.org',
  2
),
(
  'notre_equipe',
  'Responsable jeunesse',
  'Ministère des jeunes • Responsables SIPEC',
  'Mobilise, encadre et inspire la nouvelle génération à vivre pleinement sa foi, développer ses talents et impacter son environnement avec l’Évangile de Jésus-Christ.',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Responsable jeunesse',
  'Ministère des jeunes',
  460,
  57,
  'Contacter',
  'mailto:contact@sipec-church.org',
  3
),
(
  'notre_equipe',
  'Responsable intercession',
  'Prières & veille • Responsables SIPEC',
  'Coordonne les sentinelles de la prière et les chaînes d’intercession continues pour soutenir spirituellement l’assemblée, les requêtes et les programmes d’évangélisation.',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
  'image',
  'SILOAMKAMPALA.ORG',
  'Responsable intercession',
  'Prières & veille',
  430,
  53,
  'Contacter',
  'mailto:contact@sipec-church.org',
  4
),

-- === MESSAGES & ENSEIGNEMENTS / PRÉDICATIONS ===
(
  'predications',
  'S.I.P.E.C Siloam Kampala',
  'Pasteur Fondateur • 2026-10-12',
  'Le Mystère du réservoir de Siloé : quand l''obéissance à la parole libère la guérison et la vision divine selon Jean 9:7.',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1400&q=85',
  'video',
  'SILOAMKAMPALA.ORG',
  'Le Réservoir de Siloé : Foi & Obéissance',
  'Jean 9:7 • Durée : 58:30',
  680,
  74,
  'Regarder',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  1
),
(
  'predications',
  'S.I.P.E.C Siloam Kampala',
  'Pasteur Fondateur • 2026-10-05',
  'Comment persévérer dans la prière d''intercession jusqu''à ce que la pluie de la bénédiction descende sur votre maison.',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=85',
  'video',
  'SILOAMKAMPALA.ORG',
  'La Puissance de l''Intercession Fervente',
  'Jacques 5:16 • Durée : 45:10',
  530,
  62,
  'Regarder',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  2
),
(
  'predications',
  'S.I.P.E.C Siloam Kampala',
  'Pasteur Invité • 2026-09-28',
  'Marcher sous la conduite du Saint-Esprit dans un monde en mutation : principes bibliques pour demeurer inébranlable.',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1400&q=85',
  'video',
  'SILOAMKAMPALA.ORG',
  'L''Onction qui Brise les Chaînes',
  'Ésaïe 10:27 • Durée : 52:45',
  490,
  48,
  'Regarder',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  3
);
