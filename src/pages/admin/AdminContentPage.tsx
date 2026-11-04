import React, { useEffect, useState } from 'react';
import { Image, Plus, Save, Trash2, UploadCloud, Video } from 'lucide-react';
import { AdminLayout, AdminPageHeader } from '../../components/admin/AdminLayout';
import { deleteAdminItem, getAdminCollection, saveAdminItem, uploadAdminMedia } from '../../services/adminService';

export interface ContentField {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'date' | 'datetime' | 'number' | 'boolean' | 'image' | 'video' | 'audio' | 'url';
  required?: boolean;
}

interface Props {
  table: string;
  title: string;
  description: string;
  fields: ContentField[];
}

const inputClass = 'mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2a7de1] focus:ring-4 focus:ring-[#2a7de1]/10 dark:border-white/10 dark:bg-white/[.04]';

const getMediaType = (field: ContentField): ContentField['type'] => {
  if (field.type) return field.type;
  const key = field.key.toLowerCase();
  if (key.includes('audio_url')) return 'audio';
  if (key.includes('video_url') || key.includes('youtube_url') || key.includes('facebook_url') || key.includes('tiktok_url') || key.includes('instagram_url')) return key.includes('_url') && !key.includes('thumbnail') ? 'url' : 'video';
  if (key.includes('image_url') || key.includes('photo_url') || key.includes('thumbnail_url') || key.includes('cover_image') || key === 'image') return 'image';
  if (key.includes('_url') || key.includes('maps_url')) return 'url';
  return 'text';
};

export const AdminContentPage: React.FC<Props> = ({ table, title, description, fields }) => {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState('');
  const [error, setError] = useState('');
  const [adminLanguage, setAdminLanguage] = useState<'fr' | 'en' | 'sw'>('fr');

  const refresh = () => getAdminCollection<Record<string, unknown>>(table).then(setRows).catch(() => setRows([]));
  useEffect(() => { void refresh(); }, [table]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = { ...(editing || {}) };
    delete values.id;
    delete values.created_at;
    delete values.updated_at;
    fields.forEach((field) => {
      const value = values[field.key];
      if (field.type === 'boolean') values[field.key] = Boolean(value);
      else if (field.type === 'number') values[field.key] = value === '' || value == null ? null : Number(value);
      else if (typeof value === 'string') values[field.key] = value.trim() || null;
    });
    if (table !== 'profiles') {
      values.status = values.status || (table === 'livestreams' ? 'offline' : 'draft');
    }
    setSaving(true);
    setError('');
    try {
      await saveAdminItem(table, values, editing?.id ? String(editing.id) : undefined);
      setEditing(null);
      void refresh();
    } catch (saveFailure) {
      setError(saveFailure instanceof Error ? saveFailure.message : 'Enregistrement impossible.');
    } finally {
      setSaving(false);
    }
  };

  const uploadMedia = async (field: ContentField, file: File) => {
    const mediaType = getMediaType(field);
    const accepted = mediaType === 'video' ? file.type.startsWith('video/') : mediaType === 'audio' ? file.type.startsWith('audio/') : file.type.startsWith('image/');
    if (!accepted) {
      setError(`Le champ « ${field.label} » attend un fichier ${mediaType === 'video' ? 'vidéo' : mediaType === 'audio' ? 'audio' : 'image'}.`);
      return;
    }
    setUploading(field.key);
    setError('');
    try {
      const url = await uploadAdminMedia(file, `${table}/${field.key}`);
      setEditing((current) => ({ ...(current || {}), [field.key]: url }));
    } catch (uploadFailure) {
      setError(uploadFailure instanceof Error ? uploadFailure.message : 'Téléversement impossible.');
    } finally {
      setUploading('');
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm('Supprimer cet élément ?')) return;
    await deleteAdminItem(table, id);
    void refresh();
  };

  const displayValue = (value: unknown) => typeof value === 'boolean' ? (value ? 'Oui' : 'Non') : String(value ?? '—');
  const updateField = (key: string, value: unknown) => setEditing((current) => ({ ...(current || {}), [key]: value }));
  const localizedSuffix = (key: string) => /_(fr|en|sw)$/.exec(key)?.[1] as 'fr' | 'en' | 'sw' | undefined;
  const cleanLabel = (label: string) => label.replace(/\s*\((français|anglais|swahili)\)\s*/gi, '').replace(/\s*(FR|EN|SW)$/i, '').trim();
  const visibleFields = fields.filter((field) => {
    const suffix = localizedSuffix(field.key);
    return !suffix || suffix === adminLanguage;
  });

  return <AdminLayout>
    <AdminPageHeader title={title} description={description} action={!editing && <button onClick={() => setEditing({})} className="inline-flex items-center gap-2 rounded-full bg-[#2a7de1] px-5 py-3 text-sm font-bold text-white"><Plus className="h-4 w-4" />Ajouter</button>} />
    {editing && <form onSubmit={submit} className="mb-7 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1e293b] sm:p-8">
      <h2 className="mb-6 font-heading text-xl font-bold">{editing.id ? 'Modifier' : 'Ajouter'} — {title}</h2>
      {fields.some((field) => localizedSuffix(field.key)) && (
        <label className="mb-6 block max-w-sm text-sm font-semibold">
          Langue du contenu à modifier
          <select value={adminLanguage} onChange={(event) => setAdminLanguage(event.target.value as 'fr' | 'en' | 'sw')} className={inputClass}>
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="sw">Swahili</option>
          </select>
        </label>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {visibleFields.map((field) => {
          const mediaType = getMediaType(field);
          const value = editing[field.key];
          return <label key={field.key} className={`text-sm font-semibold ${field.type === 'textarea' || mediaType === 'image' || mediaType === 'video' || mediaType === 'audio' ? 'md:col-span-2' : ''}`}>
            {cleanLabel(field.label)}
            {mediaType === 'textarea' ? (
              <textarea required={field.required} value={value == null ? '' : String(value)} onChange={(event) => updateField(field.key, event.target.value)} rows={4} className={`${inputClass} resize-y`} />
            ) : mediaType === 'boolean' ? (
              <input type="checkbox" checked={Boolean(value)} onChange={(event) => updateField(field.key, event.target.checked)} className="ml-3 h-4 w-4 accent-[#2a7de1]" />
            ) : mediaType === 'image' || mediaType === 'video' || mediaType === 'audio' ? (
              <div className="mt-2 rounded-xl border border-dashed border-slate-300 p-3 dark:border-slate-700">
                {typeof value === 'string' && mediaType === 'image' && value && <img src={value} alt="" className="mb-3 max-h-64 w-full rounded-lg object-cover" />}
                {typeof value === 'string' && mediaType === 'video' && value && <video src={value} controls className="mb-3 max-h-64 w-full rounded-lg bg-black" />}
                {typeof value === 'string' && mediaType === 'audio' && value && <audio src={value} controls className="mb-3 w-full" />}
                <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                  <input type="url" value={typeof value === 'string' ? value : ''} onChange={(event) => updateField(field.key, event.target.value)} placeholder="URL Supabase ou lien externe" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-normal outline-none dark:border-slate-700 dark:bg-slate-800" />
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs text-white">
                    {uploading === field.key ? <UploadCloud className="h-4 w-4 animate-pulse" /> : mediaType === 'video' ? <Video className="h-4 w-4" /> : <Image className="h-4 w-4" />}
                    {uploading === field.key ? 'Téléversement…' : `Téléverser ${mediaType === 'video' ? 'la vidéo' : mediaType === 'audio' ? 'l’audio' : 'la photo'}`}
                    <input type="file" accept={mediaType === 'video' ? 'video/*' : mediaType === 'audio' ? 'audio/*' : 'image/*'} className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadMedia(field, file); }} />
                  </label>
                </div>
              </div>
            ) : (
              <input required={field.required} type={mediaType === 'datetime' ? 'datetime-local' : mediaType === 'date' ? 'date' : mediaType === 'number' ? 'number' : mediaType === 'url' ? 'url' : 'text'} value={value == null ? '' : String(value)} onChange={(event) => updateField(field.key, event.target.value)} className={inputClass} />
            )}
          </label>;
        })}
      </div>
      {table !== 'profiles' && <label className="mt-5 block text-sm font-semibold">{table === 'livestreams' ? 'Statut du direct' : 'Statut de publication'}<select value={String(editing.status ?? (table === 'livestreams' ? 'offline' : 'draft'))} onChange={(event) => updateField('status', event.target.value)} className={inputClass}>{table === 'livestreams' ? <><option value="live">En direct</option><option value="offline">Hors ligne</option><option value="replay">Rediffusion</option><option value="scheduled">Programmé</option></> : <><option value="draft">Brouillon</option><option value="published">Publié</option><option value="archived">Archivé</option></>}</select></label>}
      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <div className="mt-6 flex gap-3"><button disabled={saving || uploading !== ''} className="inline-flex items-center gap-2 rounded-full bg-[#2a7de1] px-5 py-3 text-sm font-bold text-white"><Save className="h-4 w-4" />{saving ? 'Enregistrement…' : 'Enregistrer dans Supabase'}</button><button type="button" onClick={() => setEditing(null)} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold">Annuler</button></div>
    </form>}
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#1e293b]">
      <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead className="border-b bg-slate-50 text-xs uppercase text-slate-500"><tr>{visibleFields.slice(0, 3).map(field => <th key={field.key} className="px-5 py-4">{cleanLabel(field.label)}</th>)}<th className="px-5 py-4">Statut</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y">{rows.map(row => <tr key={String(row.id)}>{visibleFields.slice(0, 3).map(field => <td key={field.key} className="max-w-64 truncate px-5 py-4 text-sm">{displayValue(row[field.key])}</td>)}<td className="px-5 py-4 text-sm">{table === 'profiles' ? (row.active ? 'Actif' : 'Inactif') : displayValue(row.status)}</td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => setEditing(row)} className="rounded-lg border px-3 py-2 text-sm">Modifier</button><button aria-label="Supprimer" onClick={() => void remove(String(row.id))} className="rounded-lg border px-3 py-2 text-red-500"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div>
      {rows.length === 0 && <p className="p-10 text-center text-sm text-slate-400">Aucune donnée à afficher.</p>}
    </div>
  </AdminLayout>;
};
