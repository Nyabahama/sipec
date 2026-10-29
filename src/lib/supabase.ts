import { createClient } from '@supabase/supabase-js';
import type { ChurchDataPayload, PrayerRequest } from '../types/church';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-sipec.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.mock_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Données officielles minimalistes pour la S.I.P.E.C
 * Contenu épuré sans récits fictifs, avec balises concises
 */
export const DEFAULT_OFFICIAL_CHURCH_DATA: ChurchDataPayload = {
  churchInfo: {
    name: 'Siloam International Pentecostal Evangelical Church',
    acronym: 'S.I.P.E.C',
    tagline: 'Une communauté d\'adoration et de foi.',
    welcomeVerse: {
      reference: 'Jean 9:7',
      text: '« Va, et lave-toi au réservoir de Siloé. »',
    },
    contact: {
      address: 'Sanctuaire Siloam',
      city: 'Kampala / International',
      country: 'Ouganda',
      phone: '+243 81 234 5678',
      email: 'contact@sipec-church.org',
      mapsUrl: '#',
    },
    socialLinks: {
      youtube: '#',
      facebook: '#',
      instagram: '#',
    },
  },
  services: [
    {
      id: 'srv-1',
      day: 'Dimanche',
      title: 'Culte d\'Adoration',
      timeRange: '09h00 – 12h00',
      description: 'Célébration dominicale et proclamation de la Parole.',
      location: 'Sanctuaire Siloam',
      isMainService: true,
    },
    {
      id: 'srv-2',
      day: 'Mercredi',
      title: 'Enseignement & Intercession',
      timeRange: '18h00 – 20h00',
      description: 'Étude biblique et prière.',
      location: 'Sanctuaire Siloam',
    },
  ],
  about: {
    vision: {
      title: 'La Vision',
      subtitle: '{text_vision}',
      statement: '{text_vision}',
      pillars: [
        {
          title: 'Guérison Divine',
          description: 'Jean 9:7',
          scriptureRef: 'Jean 9:7',
        },
        {
          title: 'Puissance de l\'Esprit',
          description: 'Actes 1:8',
          scriptureRef: 'Actes 1:8',
        },
        {
          title: 'Évangélisation',
          description: 'Marc 16:15',
          scriptureRef: 'Marc 16:15',
        },
      ],
    },
    founder: {
      name: 'Pasteur Fondateur',
      title: 'Conducteur de la S.I.P.E.C',
      biography: '{text_fondateur}',
      calling: 'Jean 9:7',
      quote: '{text_citation_fondateur}',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    },
    doctrinePillars: [
      {
        id: 'doc-1',
        title: 'Autorité des Écritures',
        scriptureReference: '2 Timothée 3:16',
        explanation: 'La Parole de Dieu comme unique fondement de foi et de vie.',
        iconName: 'book',
      },
      {
        id: 'doc-2',
        title: 'Baptême du Saint-Esprit',
        scriptureReference: 'Actes 2:4',
        explanation: 'L\'effusion du Saint-Esprit pour le témoignage et la sanctification.',
        iconName: 'flame',
      },
      {
        id: 'doc-3',
        title: 'Réservoir de Siloé & Guérison',
        scriptureReference: 'Jean 9:7',
        explanation: 'La foi agissante et l\'obéissance à la Parole de Jésus-Christ.',
        iconName: 'droplet',
      },
      {
        id: 'doc-4',
        title: 'Sanctification',
        scriptureReference: 'Hébreux 12:14',
        explanation: 'Une vie consacrée et intègre au service de Dieu.',
        iconName: 'shield',
      },
    ],
  },
  departments: [
    {
      id: 'dep-media',
      name: 'Médias',
      subName: 'Communication & Diffusion',
      description: 'Diffusion en direct, technique et couverture numérique.',
      leaderName: 'Équipe Médias',
      meetingSchedule: 'Dimanche & Réunions de culte',
      targetAudience: 'Tous',
      badge: 'Technique',
      iconName: 'video',
    },
    {
      id: 'dep-chorale',
      name: 'Chorale',
      subName: 'La Voix de Siloé',
      description: 'Conduite de l\'adoration et chants de louange.',
      leaderName: 'Responsable Louange',
      meetingSchedule: 'Samedi & Dimanche',
      targetAudience: 'Tous',
      badge: 'Louange',
      iconName: 'music',
    },
    {
      id: 'dep-jeunesse',
      name: 'Jeunesse',
      subName: 'SIPEC Youth',
      description: 'Rassemblement et affermissement des jeunes.',
      leaderName: 'Comité Jeunesse',
      meetingSchedule: 'Samedi après-midi',
      targetAudience: 'Jeunes',
      badge: 'Jeunesse',
      iconName: 'users',
    },
    {
      id: 'dep-dimanche',
      name: 'École du Dimanche',
      subName: 'Ministère des Enfants',
      description: 'Enseignement biblique adapté pour les enfants.',
      leaderName: 'Moniteurs',
      meetingSchedule: 'Dimanche matin',
      targetAudience: 'Enfants',
      badge: 'Enfance',
      iconName: 'baby',
    },
  ],
  media: [
    {
      id: 'med-vid-1',
      title: 'Culte d\'Adoration en Direct',
      type: 'video',
      category: 'culte',
      url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      publishedAt: 'Dimanche',
      duration: 'En direct',
      speaker: 'Pasteur Fondateur',
      description: 'Diffusion du culte de la S.I.P.E.C.',
      isFeaturedLive: true,
    },
    {
      id: 'med-img-1',
      title: 'Évangélisation & Missions',
      type: 'photo',
      category: 'evangelisation',
      url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=600&q=80',
      publishedAt: 'Récemment',
      description: 'Mission d\'évangélisation.',
    },
    {
      id: 'med-img-2',
      title: 'Culte Communautaire',
      type: 'photo',
      category: 'culte',
      url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80',
      publishedAt: 'Dimanche',
      description: 'Adoration et rassemblement.',
    },
  ],
  liveStatus: {
    isLive: true,
    title: 'Culte en Direct',
    preacher: 'Pasteur Fondateur',
    viewerCount: 150,
    scheduledNext: 'Mercredi 18h00',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  lastUpdated: new Date().toISOString(),
};

export async function fetchChurchDataFromSupabase(): Promise<ChurchDataPayload> {
  const isCustomSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('mock-sipec');

  if (isCustomSupabase) {
    try {
      const [mediaRes, departmentsRes] = await Promise.allSettled([
        supabase.from('media').select('*').order('created_at', { ascending: false }),
        supabase.from('departments').select('*'),
      ]);

      const clone = { ...DEFAULT_OFFICIAL_CHURCH_DATA };
      if (mediaRes.status === 'fulfilled' && mediaRes.value.data && mediaRes.value.data.length > 0) {
        clone.media = mediaRes.value.data as any;
      }
      if (departmentsRes.status === 'fulfilled' && departmentsRes.value.data && departmentsRes.value.data.length > 0) {
        clone.departments = departmentsRes.value.data as any;
      }
      clone.lastUpdated = new Date().toISOString();
      return clone;
    } catch {
      return DEFAULT_OFFICIAL_CHURCH_DATA;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  return DEFAULT_OFFICIAL_CHURCH_DATA;
}

export async function submitPrayerRequestToSupabase(request: PrayerRequest): Promise<boolean> {
  try {
    const isCustomSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('mock-sipec');
    if (isCustomSupabase) {
      const { error } = await supabase.from('prayer_requests').insert([{
        full_name: request.fullName,
        email_or_phone: request.emailOrPhone,
        request_text: request.requestText,
        is_urgent: request.isUrgent,
        is_private: request.isPrivate,
      }]);
      if (error) throw error;
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  } catch {
    return false;
  }
}
