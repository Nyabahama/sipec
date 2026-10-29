import { supabase } from '../lib/supabase';
import type { AdminDepartment } from '../pages/admin/types';

const hasSupabase = Boolean(import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('mock-sipec'));

const mocks = {
  departments: [
    { id: 'dep-1', name: 'Siloam Média', leader: 'Équipe Média', members: 18, active: true },
    { id: 'dep-2', name: 'Jeunesse SIPEC', leader: 'Responsable Jeunesse', members: 42, active: true },
  ] as AdminDepartment[],
  gallery: [{ id: 'gal-1', title: 'Grand Culte', album: 'Cultes 2026', type: 'photo' as const, url: '', createdAt: '2026-10-29' }],
  sermons: [{ id: 'ser-1', title: 'Le Réservoir de Siloé', preacher: 'Pasteur Fondateur', date: '2026-10-12', published: true }],
  live: [{ id: 'live-1', title: 'Culte Dominical', platform: 'YouTube + Facebook + TikTok', status: 'live' as const, startAt: '2026-10-29 09:00' }],
  events: [{ id: 'evt-1', title: 'Convention Jeunesse', date: '2026-11-14', location: 'Kirombe / Sambya', status: 'published' as const }],
  users: [{ id: 'usr-1', name: 'Administrateur SIPEC', email: 'admin@sipec.org', role: 'Super Admin' as const, active: true }],
};

export async function signInAdmin(email: string, password: string) {
  if (!hasSupabase) return { error: null, user: { email, id: 'mock-admin' } };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { error, user: data.user };
}

export async function signOutAdmin() {
  if (hasSupabase) await supabase.auth.signOut();
}

export async function getAdminCollection<T>(table: string): Promise<T[]> {
  if (!hasSupabase) return ((mocks as Record<string, unknown[]>)[table] ?? []) as T[];
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function deleteAdminItem(table: string, id: string) {
  if (hasSupabase) {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
  }
}

export async function uploadAdminMedia(file: File, folder = 'gallery') {
  if (!hasSupabase) return URL.createObjectURL(file);
  const path = `${folder}/${crypto.randomUUID()}-${file.name}`;
  const { data, error } = await supabase.storage.from('sipec-media').upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data: publicUrl } = supabase.storage.from('sipec-media').getPublicUrl(data.path);
  return publicUrl.publicUrl;
}

export const adminMocks = mocks;
