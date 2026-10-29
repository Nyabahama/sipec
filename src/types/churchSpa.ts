/**
 * Types TypeScript pour la SPA de la grande église Siloam (S.I.P.E.C)
 * 10 Sections complètes, architecture dynamique et Offline-First.
 */

export interface ChurchMeta {
  name: string;
  acronym: string;
  scripture: {
    reference: string;
    text: string;
  };
  contact: {
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    officeHours: string;
  };
  liveStatus: {
    isLive: boolean;
    title: string;
    speaker: string;
  };
}

export interface ChurchService {
  id: string;
  day: string;
  title: string;
  timeRange: string;
  description: string;
  category: 'culte' | 'intercession' | 'etude';
  location: string;
}

export interface CommunityServiceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: 'heart' | 'book-open' | 'users' | 'shield';
}

export interface FounderBio {
  name: string;
  title: string;
  callingVerse: string;
  biography: string;
  pillars: string[];
}

export interface DepartmentItem {
  id: string;
  name: string;
  role: string;
  schedule: string;
  description: string;
  iconName: 'video' | 'music' | 'users' | 'flame' | 'baby';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  aspectRatio: 'square' | 'tall' | 'wide';
  placeholderLabel: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
}

export interface GalleryMedia {
  id: string;
  albumId: string;
  type: 'photo' | 'video';
  title: string;
  description: string;
  thumbnail: string;
  mediaUrl: string;
  createdAt: string;
  duration?: string;
  category?: string;
}

export interface SermonItem {
  id: string;
  title: string;
  preacher: string;
  date: string;
  scriptureReference: string;
  duration: string;
  summary: string;
  audioDuration: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  category?: string;
  downloads?: number;
  featured?: boolean;
}

export interface LiveStream {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  instagramUrl: string;
  startTime: string;
  endTime: string;
  thumbnail: string;
  isLive: boolean;
  viewers: number;
  status: 'live' | 'offline' | 'replay';
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChurchSpaData {
  meta: ChurchMeta;
  about: {
    history: string;
    mission: string;
    vision: string;
  };
  founder: FounderBio;
  communityServices: CommunityServiceItem[];
  servicesCalendar: ChurchService[];
  departments: DepartmentItem[];
  gallery: GalleryItem[];
  sermons: SermonItem[];
  liveStreams: LiveStream[];
}
