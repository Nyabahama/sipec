import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Image, Save, UploadCloud, Video } from 'lucide-react';
import { AdminLayout, AdminPageHeader } from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';

interface CommunityBadgeRow {
  id: string;
  badge_key: 'weekly_events' | 'weekly_program' | 'developer_signature';
  title: string;
  payload: Record<string, string | number>;
  status: 'draft' | 'published';
  sort_order: number;
}

interface FieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'image' | 'video' | 'url';
  help?: string;
}

const BADGE_FIELDS: Record<CommunityBadgeRow['badge_key'], FieldDefinition[]> = {
  weekly_events: [
    { key: 'description', label: 'Description du badge', type: 'textarea' },
    { key: 'event_title', label: 'Titre de l’événement', type: 'text' },
    { key: 'event_subtitle', label: 'Date et lieu', type: 'text', help: 'Exemple : Vendredi dernier · Kirombe, Kampala' },
    { key: 'image_url', label: 'Photo de l’événement', type: 'image', help: 'Formats recommandés : JPG, PNG ou WebP' },
    { key: 'video_url', label: 'Vidéo de l’événement', type: 'video', help: 'La vidéo remplace l’image dans la carte lorsqu’elle est renseignée.' },
    { key: 'christians', label: 'Nombre de chrétiens', type: 'number' },
    { key: 'visitors', label: 'Nombre de visiteurs', type: 'number' },
    { key: 'testimonies', label: 'Nombre de témoignages', type: 'number' },
  ],
  weekly_program: [
    { key: 'preacher_name', label: 'Nom du prédicateur', type: 'text' },
    { key: 'preacher_image_url', label: 'Photo du prédicateur', type: 'image' },
    { key: 'moderator_name', label: 'Nom du modérateur', type: 'text' },
    { key: 'moderator_image_url', label: 'Photo du modérateur', type: 'image' },
    { key: 'schedule', label: 'Jour et horaires', type: 'text', help: 'Exemple : Dimanche · 08h00 - 12h00' },
    { key: 'address', label: 'Adresse complète', type: 'text' },
  ],
  developer_signature: [
    { key: 'name', label: 'Nom du concepteur', type: 'text' },
    { key: 'photo_url', label: 'Photo du concepteur', type: 'image' },
    { key: 'description', label: 'Description professionnelle', type: 'textarea' },
    { key: 'portfolio_url', label: 'Lien du portfolio', type: 'url' },
  ],
};

const BADGE_NAMES: Record<CommunityBadgeRow['badge_key'], string> = {
  weekly_events: 'Événements de la semaine',
  weekly_program: 'Programme de la semaine',
  developer_signature: 'Signature du concepteur',
};

export const AdminCommunityBadges: React.FC = () => {
  const [rows, setRows] = useState<CommunityBadgeRow[]>([]);
  const [payloads, setPayloads] = useState<Record<string, Record<string, string>>>({});
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [statuses, setStatuses] = useState<Record<string, 'draft' | 'published'>>({});
  const [sortOrders, setSortOrders] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    const { data, error: loadError } = await supabase
      .from('community_badges')
      .select('*')
      .order('sort_order');
    if (loadError) {
      setError(loadError.message);
      return;
    }
    const badgeRows = (data || []) as CommunityBadgeRow[];
    setRows(badgeRows);
    setPayloads(Object.fromEntries(badgeRows.map((row) => [
      row.id,
      Object.fromEntries(Object.entries(row.payload).map(([key, value]) => [key, String(value ?? '')])),
    ])));
    setTitles(Object.fromEntries(badgeRows.map((row) => [row.id, row.title])));
    setStatuses(Object.fromEntries(badgeRows.map((row) => [row.id, row.status])));
    setSortOrders(Object.fromEntries(badgeRows.map((row) => [row.id, row.sort_order])));
  };

  useEffect(() => { void load(); }, []);

  const updatePayload = (rowId: string, key: string, value: string) => {
    setPayloads((current) => ({
      ...current,
      [rowId]: { ...(current[rowId] || {}), [key]: value },
    }));
  };

  const uploadMedia = async (row: CommunityBadgeRow, field: FieldDefinition, file: File) => {
    const uploadKey = `${row.id}-${field.key}`;
    setUploading(uploadKey);
    setMessage('');
    setError('');
    try {
      if (field.type === 'image' && !file.type.startsWith('image/')) throw new Error('Veuillez sélectionner une image.');
      if (field.type === 'video' && !file.type.startsWith('video/')) throw new Error('Veuillez sélectionner une vidéo.');

      const extension = file.name.split('.').pop()?.toLowerCase() || (field.type === 'video' ? 'mp4' : 'jpg');
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '-');
      const filePath = `community/${row.badge_key}/${Date.now()}-${baseName}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from('church-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('church-media').getPublicUrl(filePath);
      updatePayload(row.id, field.key, data.publicUrl);
      setMessage(`${field.label} téléversé.`);
    } catch (uploadFailure) {
      setError(uploadFailure instanceof Error ? uploadFailure.message : 'Erreur lors du téléversement.');
    } finally {
      setUploading(null);
    }
  };

  const save = async (row: CommunityBadgeRow) => {
    setSaving(row.id);
    setMessage('');
    setError('');
    try {
      const payload: Record<string, string | number> = {};
      for (const field of BADGE_FIELDS[row.badge_key]) {
        const value = payloads[row.id]?.[field.key] ?? '';
        if (field.type === 'number') {
          payload[field.key] = value === '' ? 0 : Number(value);
          if (!Number.isFinite(payload[field.key])) throw new Error(`Le nombre « ${field.label} » est invalide.`);
        } else {
          payload[field.key] = value;
        }
      }
      const { error: saveError } = await supabase
        .from('community_badges')
        .update({
          title: titles[row.id] || row.title,
          payload,
          status: statuses[row.id] || row.status,
          sort_order: Number(sortOrders[row.id] || row.sort_order),
          updated_at: new Date().toISOString(),
        })
        .eq('id', row.id);
      if (saveError) throw saveError;
      setMessage(`${BADGE_NAMES[row.badge_key]} mis à jour dans Supabase.`);
      await load();
    } catch (saveFailure) {
      setError(saveFailure instanceof Error ? saveFailure.message : 'Erreur de sauvegarde.');
    } finally {
      setSaving(null);
    }
  };

  const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800';

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Administration des badges communautaires"
        description="Modifiez les contenus, photos et vidéos de trois badges identiques aux publications officielles du site."
      />
      {message && <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><CheckCircle2 className="h-5 w-5" />{message}</div>}
      {error && <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-5 w-5" />{error}</div>}

      <div className="grid gap-6">
        {rows.map((row) => (
          <section key={row.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-5 border-b border-slate-200 p-5 lg:flex-row lg:items-end lg:justify-between dark:border-slate-700">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{BADGE_NAMES[row.badge_key]}</p>
                <label className="mt-3 block text-xs font-bold text-slate-500">Titre de la publication</label>
                <input value={titles[row.id] || ''} onChange={(event) => setTitles((current) => ({ ...current, [row.id]: event.target.value }))} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-bold text-slate-500">
                  Position
                  <input type="number" value={sortOrders[row.id] ?? row.sort_order} onChange={(event) => setSortOrders((current) => ({ ...current, [row.id]: Number(event.target.value) }))} className={inputClass} />
                </label>
                <label className="text-xs font-bold text-slate-500">
                  Publication
                  <select value={statuses[row.id] || row.status} onChange={(event) => setStatuses((current) => ({ ...current, [row.id]: event.target.value as 'draft' | 'published' }))} className={inputClass}>
                    <option value="published">Publiée</option>
                    <option value="draft">Brouillon</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              {BADGE_FIELDS[row.badge_key].map((field) => {
                const value = payloads[row.id]?.[field.key] || '';
                const isMedia = field.type === 'image' || field.type === 'video';
                return (
                  <label key={field.key} className={`block text-sm font-bold text-slate-700 dark:text-slate-200 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                    <span>{field.label}</span>
                    {field.help && <span className="mt-1 block text-xs font-normal text-slate-500">{field.help}</span>}
                    {field.type === 'textarea' ? (
                      <textarea value={value} rows={4} onChange={(event) => updatePayload(row.id, field.key, event.target.value)} className={inputClass} />
                    ) : isMedia ? (
                      <div className="mt-2 rounded-xl border border-dashed border-slate-300 p-3 dark:border-slate-700">
                        {value && field.type === 'image' && <img src={value} alt="" className="mb-3 max-h-48 w-full rounded-lg object-cover" />}
                        {value && field.type === 'video' && <video src={value} controls className="mb-3 max-h-48 w-full rounded-lg bg-black" />}
                        <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                          <input value={value} onChange={(event) => updatePayload(row.id, field.key, event.target.value)} placeholder="URL Supabase ou lien externe" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-normal outline-none dark:border-slate-700 dark:bg-slate-800" />
                          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs text-white">
                            {uploading === `${row.id}-${field.key}` ? <UploadCloud className="h-4 w-4 animate-pulse" /> : field.type === 'video' ? <Video className="h-4 w-4" /> : <Image className="h-4 w-4" />}
                            {uploading === `${row.id}-${field.key}` ? 'Téléversement…' : 'Téléverser'}
                            <input type="file" accept={field.type === 'video' ? 'video/*' : 'image/*'} className="hidden" onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) void uploadMedia(row, field, file);
                            }} />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <input type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'} value={value} onChange={(event) => updatePayload(row.id, field.key, event.target.value)} className={inputClass} />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="flex justify-end border-t border-slate-200 p-5 dark:border-slate-700">
              <button type="button" onClick={() => void save(row)} disabled={saving === row.id || uploading !== null} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60">
                <Save className="h-4 w-4" /> {saving === row.id ? 'Enregistrement…' : 'Enregistrer dans Supabase'}
              </button>
            </div>
          </section>
        ))}
      </div>
    </AdminLayout>
  );
};
