import { supabase } from '../lib/supabase';
import type { ChurchSpaData, DepartmentItem, FounderBio, GalleryItem, SermonItem, LiveStream } from '../types/churchSpa';
import { EMPTY_SPA_DATA } from '../lib/churchSpaData';
import type { Language } from '../lib/language';

export const hasSupabaseBackend = Boolean(import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('mock-sipec'));
const field = (row: Record<string, unknown>, key: string, lang: Language) => String(row[`${key}_${lang}`] ?? row[`${key}_fr`] ?? row[key] ?? '');
const phone = (row: Record<string, unknown>, key: string) => String(row[key] ?? '');

export function subscribePublicContent(onChange: () => void): () => void {
  if (!hasSupabaseBackend) return () => undefined;
  const tables = ['settings', 'hero', 'about', 'founder', 'departments', 'choirs', 'gallery_albums', 'gallery_media', 'sermons', 'livestreams', 'events', 'contacts', 'community_badges'];
  const channel = supabase.channel('sipec-public-content');
  tables.forEach((table) => channel.on('postgres_changes', { event: '*', schema: 'public', table }, onChange));
  channel.subscribe();
  return () => { void supabase.removeChannel(channel); };
}

export async function fetchPublicContent(language: Language): Promise<ChurchSpaData | null> {
  if (!hasSupabaseBackend) return null;
  const [settings, hero, about, founder, departments, choirs, galleries, sermons, livestreams, events, contacts] = await Promise.all([
    supabase.from('settings').select('*').eq('status', 'published').limit(1).maybeSingle(),
    supabase.from('hero').select('*').eq('status', 'published').order('sort_order').limit(1).maybeSingle(),
    supabase.from('about').select('*').eq('status', 'published').limit(1).maybeSingle(),
    supabase.from('founder').select('*').eq('status', 'published').limit(1).maybeSingle(),
    supabase.from('departments').select('*').eq('status', 'published').order('sort_order'),
    supabase.from('choirs').select('*').eq('status', 'published').order('sort_order'),
    supabase.from('gallery_albums').select('*, gallery_media(*)').eq('status', 'published').order('sort_order'),
    supabase.from('sermons').select('*').eq('status', 'published').order('published_at', { ascending: false }),
    supabase.from('livestreams').select('*').order('start_time', { ascending: false }),
    supabase.from('events').select('*').eq('status', 'published').order('event_date', { ascending: true }),
    supabase.from('contacts').select('*').eq('status', 'published').limit(1).maybeSingle(),
  ]);
  const errors = [settings.error, hero.error, about.error, founder.error, departments.error, choirs.error, galleries.error, sermons.error, livestreams.error, events.error, contacts.error].filter(Boolean);
  if (errors.length) throw errors[0];

  const setting = settings.data as Record<string, unknown> | null;
  const heroRow = hero.data as Record<string, unknown> | null;
  const aboutRow = about.data as Record<string, unknown> | null;
  const founderRow = founder.data as Record<string, unknown> | null;
  const contactRow = contacts.data as Record<string, unknown> | null;
  const result: ChurchSpaData = structuredClone(EMPTY_SPA_DATA);

  if (setting) {
    result.meta.name = String(setting.church_name || result.meta.name);
    result.meta.socials = {
      facebook: String(setting.facebook_url || ''), youtube: String(setting.youtube_url || ''),
      instagram: String(setting.instagram_url || ''), tiktok: String(setting.tiktok_url || ''),
      whatsapp: String(setting.whatsapp || ''), twitter: String(setting.twitter_url || ''),
    };
  } else result.meta.name = EMPTY_SPA_DATA.meta.name;
  if (heroRow) result.meta.hero = {
    title: field(heroRow, 'title', language) || result.meta.name,
    subtitle: field(heroRow, 'subtitle', language) || result.meta.hero?.subtitle || '',
    imageUrl: String(heroRow.image_url || ''),
    primaryButtonUrl: String(heroRow.primary_button_url || ''),
    secondaryButtonUrl: String(heroRow.secondary_button_url || ''),
  };
  if (contactRow) result.meta.contact = { ...result.meta.contact, address: field(contactRow, 'address', language) || result.meta.contact.address, city: String(setting?.city || 'Kampala'), country: String(setting?.country || 'Ouganda'), phone: phone(contactRow, 'phone') || result.meta.contact.phone, email: phone(contactRow, 'email') || result.meta.contact.email };
  result.meta.scripture = heroRow ? { reference: String(heroRow.scripture_reference || result.meta.scripture.reference), text: field(heroRow, 'scripture_text', language) || result.meta.scripture.text } : result.meta.scripture;

  if (aboutRow) result.about = { mission: field(aboutRow, 'mission', language), vision: field(aboutRow, 'vision', language), history: field(aboutRow, 'history', language) };
  if (founderRow) result.founder = { ...result.founder, name: String(founderRow.name || result.founder.name), title: field(founderRow, 'title', language), biography: field(founderRow, 'biography', language), callingVerse: field(founderRow, 'vision', language), photoUrl: String(founderRow.photo_url || ''), quote: field(founderRow, 'quote', language), pillars: result.founder.pillars } as FounderBio;

  if (departments.data?.length) result.departments = departments.data.map((row, index): DepartmentItem => ({ id: String(row.id), name: field(row, 'name', language), role: field(row, 'badge', language) || `Ministère ${index + 1}`, schedule: field(row, 'schedule', language), description: field(row, 'description', language), iconName: index === 0 ? 'video' : index === 1 ? 'users' : 'flame', imageUrl: String(row.image_url || '') }));
  if (choirs.data?.length) {
    const choirIds = ['dep-shekinah', 'dep-new-light', 'dep-angels', 'dep-central'];
    const choirDepartments = choirs.data.map((row, index): DepartmentItem => ({
      id: choirIds[index] ?? `choir-${String(row.id)}`,
      name: field(row, 'name', language),
      role: 'Chorale',
      schedule: field(row, 'schedule', language),
      description: field(row, 'description', language),
      iconName: 'music', imageUrl: String(row.photo_url || ''),
    }));
    result.departments = [...result.departments, ...choirDepartments];
  }
    if (galleries.data?.length) result.gallery = galleries.data.flatMap((album) => ((album.gallery_media || []) as Record<string, unknown>[]).map((media): GalleryItem => ({ id: String(media.id), albumId: String(album.id), type: media.type === 'video' ? 'video' : 'photo', title: field(media, 'title', language) || field(album, 'title', language), category: field(album, 'title', language), aspectRatio: media.type === 'photo' ? 'wide' : 'square', placeholderLabel: field(media, 'description', language), thumbnailUrl: String(media.thumbnail_url || media.photo_url || ''), mediaUrl: String(media.video_url || media.photo_url || ''), createdAt: String(media.media_date || media.created_at || '') })));
  if (events.data?.length) result.servicesCalendar = events.data.map((row): import('../types/churchSpa').ChurchService => ({ id: String(row.id), day: row.event_date ? new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language === 'sw' ? 'sw-TZ' : 'fr-FR', { weekday: 'long' }).format(new Date(String(row.event_date))) : '', title: field(row, 'title', language), timeRange: row.event_date ? new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language === 'sw' ? 'sw-TZ' : 'fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date(String(row.event_date))) : '', description: field(row, 'description', language), category: 'culte', location: field(row, 'location', language) }));
  if (sermons.data?.length) result.sermons = sermons.data.map((row): SermonItem => ({ id: String(row.id), title: field(row, 'title', language), preacher: field(row, 'preacher', language), date: row.published_at ? new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language === 'sw' ? 'sw-TZ' : 'fr-FR', { day:'numeric', month:'long', year:'numeric' }).format(new Date(String(row.published_at))) : '', scriptureReference: String(row.bible_reference || ''), duration: String(row.duration || ''), audioDuration: String(row.duration || ''), summary: field(row, 'description', language), description: field(row, 'description', language), thumbnailUrl: String(row.thumbnail_url || ''), videoUrl: String(row.video_url || ''), category: field(row, 'category', language), downloads: Number(row.downloads || 0), featured: Boolean(row.featured) }));
  if (livestreams.data?.length) result.liveStreams = livestreams.data.map((row): LiveStream => ({ id:String(row.id), title:field(row,'title',language), description:field(row,'description',language), youtubeUrl:String(row.youtube_url||''), facebookUrl:String(row.facebook_url||''), tiktokUrl:String(row.tiktok_url||''), instagramUrl:String(row.instagram_url||''), startTime:String(row.start_time||''), endTime:String(row.end_time||''), thumbnail:String(row.thumbnail_url||''), isLive:Boolean(row.is_live), viewers:Number(row.viewers||0), status:row.status === 'live' ? 'live' : row.status === 'replay' ? 'replay' : 'offline' }));
  return result;
}
