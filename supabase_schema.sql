-- ====================================================================
-- SILOAM INTERNATIONAL PENTECOSTAL EVANGELICAL CHURCH (S.I.P.E.C)
-- Schéma PostgreSQL & Tables Supabase avec Row Level Security (RLS)
-- ====================================================================

-- 1. Table des Informations Générales de l'Église
CREATE TABLE IF NOT EXISTS public.church_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Siloam International Pentecostal Evangelical Church',
    acronym TEXT NOT NULL DEFAULT 'S.I.P.E.C',
    tagline TEXT,
    welcome_verse_ref TEXT DEFAULT 'Jean 9:7',
    welcome_verse_text TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    contact_address TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des Horaires de Cultes
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day TEXT NOT NULL,
    title TEXT NOT NULL,
    time_range TEXT NOT NULL,
    description TEXT,
    location TEXT DEFAULT 'Grand Tabernacle Siloam',
    is_main_service BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0
);

-- 3. Table des Départements
CREATE TABLE IF NOT EXISTS public.departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sub_name TEXT,
    description TEXT NOT NULL,
    leader_name TEXT NOT NULL,
    meeting_schedule TEXT NOT NULL,
    target_audience TEXT,
    badge TEXT,
    icon_name TEXT DEFAULT 'users',
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table des Médias (Photos d'évangélisation et Replays vidéos)
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('video', 'photo')),
    category TEXT NOT NULL CHECK (category IN ('evangelisation', 'culte', 'jeunesse', 'social')),
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    published_at TEXT DEFAULT 'Récemment',
    duration TEXT,
    speaker TEXT,
    description TEXT,
    is_featured_live BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table des Intentions de Prière (Soumises depuis le site vitrine)
CREATE TABLE IF NOT EXISTS public.prayer_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email_or_phone TEXT,
    request_text TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT false,
    is_private BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- SÉCURITÉ & ROW LEVEL SECURITY (RLS)
-- ====================================================================

ALTER TABLE public.church_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique (pour le site vitrine)
CREATE POLICY "Lecture publique pour tous - church_info" ON public.church_info FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - media" ON public.media FOR SELECT USING (true);

-- Politique d'insertion anonyme pour les intentions de prière
CREATE POLICY "Tout le monde peut déposer une prière" ON public.prayer_requests FOR INSERT WITH CHECK (true);
