/**
 * Types TypeScript pour la plateforme Siloam International Pentecostal Evangelical Church (S.I.P.E.C)
 * Architecture Offline-First & Supabase
 */

export interface ChurchInfo {
  name: string;
  acronym: string;
  tagline: string;
  welcomeVerse: {
    reference: string;
    text: string;
  };
  contact: {
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    mapsUrl: string;
  };
  socialLinks: {
    youtube?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface ServiceSchedule {
  id: string;
  day: string;
  title: string;
  timeRange: string;
  description: string;
  location: string;
  isMainService?: boolean;
}

export interface AboutVision {
  title: string;
  subtitle: string;
  statement: string;
  pillars: {
    title: string;
    description: string;
    scriptureRef?: string;
  }[];
}

export interface AboutFounder {
  name: string;
  title: string;
  biography: string;
  calling: string;
  quote: string;
  imageUrl?: string;
}

export interface DoctrinePillar {
  id: string;
  title: string;
  scriptureReference: string;
  explanation: string;
  iconName: 'book' | 'flame' | 'cross' | 'shield' | 'heart' | 'droplet';
}

export interface ChurchDepartment {
  id: string;
  name: string;
  subName?: string;
  description: string;
  leaderName: string;
  meetingSchedule: string;
  targetAudience: string;
  badge: string;
  iconName: 'mic' | 'music' | 'users' | 'baby' | 'video' | 'heart-handshake' | 'shield-check';
  coverImage?: string;
}

export type MediaType = 'video' | 'photo';
export type MediaCategory = 'evangelisation' | 'culte' | 'jeunesse' | 'social';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  category: MediaCategory;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration?: string; // For videos (e.g. "1h 24m")
  speaker?: string; // For sermons
  description?: string;
  isFeaturedLive?: boolean;
}

export interface LiveStreamStatus {
  isLive: boolean;
  title: string;
  preacher: string;
  viewerCount?: number;
  scheduledNext?: string;
  streamUrl?: string; // HLS / YouTube embed / Supabase Realtime stream
}

export interface ChurchDataPayload {
  churchInfo: ChurchInfo;
  services: ServiceSchedule[];
  about: {
    vision: AboutVision;
    founder: AboutFounder;
    doctrinePillars: DoctrinePillar[];
  };
  departments: ChurchDepartment[];
  media: MediaItem[];
  liveStatus: LiveStreamStatus;
  lastUpdated: string;
}

export interface FetchChurchDataState {
  data: ChurchDataPayload | null;
  loading: boolean;
  error: Error | null;
  isOffline: boolean;
  isFromCache: boolean;
  lastCachedAt: string | null;
  refresh: () => Promise<void>;
}

export interface PrayerRequest {
  id?: string;
  fullName: string;
  emailOrPhone: string;
  requestText: string;
  isUrgent: boolean;
  isPrivate: boolean;
  createdAt: string;
  syncedToCloud: boolean;
}
