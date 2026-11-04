import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Plus, Save, Trash2 } from 'lucide-react';
import { AdminLayout, AdminPageHeader } from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';

interface CommunityBadgeRow {
  id: string;
  badge_key: string;
  title: string;
  payload: Record<string, string | number>;
  status: 'draft' | 'published';
  sort_order: number;
}

export const AdminCommunityBadges: React.FC = () => {
  const [rows, setRows] = useState<CommunityBadgeRow[]>([]);
  const [payloads, setPayloads] = useState<Record<string, Array<{ key: string; value: string }>>>({});
  const [payloadTypes, setPayloadTypes] = useState<Record<string, Record<string, 'string' | 'number'>>>({});
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
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
      Object.entries(row.payload).map(([key, value]) => ({ key, value: String(value ?? '') })),
    ])));
    setPayloadTypes(Object.fromEntries(badgeRows.map((row) => [
      row.id,
      Object.fromEntries(Object.entries(row.payload).map(([key, value]) => [key, typeof value === 'number' ? 'number' as const : 'string' as const])),
    ])));
    setTitles(Object.fromEntries(badgeRows.map((row) => [row.id, row.title])));
  };

  useEffect(() => { void load(); }, []);

  const save = async (row: CommunityBadgeRow) => {
    setSaving(row.id);
    setMessage('');
    setError('');
    try {
      const payload: Record<string, string | number> = {};
      for (const entry of payloads[row.id] || []) {
        const key = entry.key.trim();
        if (!key) throw new Error('Une clé de contenu ne peut pas être vide.');
          if ((payloads[row.id] || []).filter((entry) => entry.key.trim() === key).length > 1) {
            throw new Error(`La clé « ${key} » est utilisée plusieurs fois.`);
          }
          if (payloadTypes[row.id]?.[key] === 'number') {
          const value = Number(entry.value);
          if (!Number.isFinite(value)) throw new Error(`La valeur numérique « ${key} » est invalide.`);
          payload[key] = value;
        } else {
          payload[key] = entry.value;
        }
      }
      const { error: saveError } = await supabase
        .from('community_badges')
        .update({ title: titles[row.id] || row.title, payload, updated_at: new Date().toISOString() })
        .eq('id', row.id);
      if (saveError) throw saveError;
      setMessage(`${titles[row.id] || row.title} mis à jour.`);
      await load();
    } catch (saveFailure) {
      setError(saveFailure instanceof Error ? saveFailure.message : 'Erreur de sauvegarde.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader title="Badges de la communauté" description="Gérez entièrement depuis Supabase les événements, le programme hebdomadaire et la signature développeur." />
      {message && <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><CheckCircle2 className="h-5 w-5" />{message}</div>}
      {error && <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-5 w-5" />{error}</div>}
      <div className="grid gap-6">
        {rows.map((row) => (
          <section key={row.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-700">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{row.badge_key}</p>
                <input
                  value={titles[row.id] || ''}
                  onChange={(event) => setTitles((current) => ({ ...current, [row.id]: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-lg font-bold outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <button
                onClick={() => void save(row)}
                disabled={saving === row.id}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                <Save className="h-4 w-4" /> Enregistrer
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-700">Champ</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-700">Valeur</th>
                    <th className="w-24 border-b border-slate-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-700">Type</th>
                    <th className="w-16 border-b border-slate-200 px-4 py-3 dark:border-slate-700" />
                  </tr>
                </thead>
                <tbody>
                  {(payloads[row.id] || []).map((entry, index) => (
                    <tr key={`${row.id}-${index}`} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="px-4 py-3 align-top">
                        <input
                          value={entry.key}
                          onChange={(event) => {
                            const oldKey = entry.key;
                            const newKey = event.target.value;
                            setPayloads((current) => ({
                              ...current,
                              [row.id]: (current[row.id] || []).map((item, itemIndex) => itemIndex === index ? { ...item, key: newKey } : item),
                            }));
                            setPayloadTypes((current) => {
                              const types = { ...current[row.id] };
                              if (oldKey !== newKey && types[oldKey]) types[newKey] = types[oldKey];
                              return { ...current, [row.id]: types };
                            });
                          }}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                        />
                      </td>
                      <td className="px-4 py-3 align-top">
                        {entry.value.length > 100 || entry.key.includes('description') ? (
                          <textarea
                            value={entry.value}
                            rows={3}
                            onChange={(event) => setPayloads((current) => ({
                              ...current,
                              [row.id]: (current[row.id] || []).map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item),
                            }))}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                          />
                        ) : (
                          <input
                            type={payloadTypes[row.id]?.[entry.key] === 'number' ? 'number' : 'text'}
                            value={entry.value}
                            onChange={(event) => setPayloads((current) => ({
                              ...current,
                              [row.id]: (current[row.id] || []).map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item),
                            }))}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <select
                          value={payloadTypes[row.id]?.[entry.key] || 'string'}
                          onChange={(event) => setPayloadTypes((current) => ({
                            ...current,
                            [row.id]: { ...current[row.id], [entry.key]: event.target.value as 'string' | 'number' },
                          }))}
                          className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                        >
                          <option value="string">Texte</option>
                          <option value="number">Nombre</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <button
                          type="button"
                          aria-label={`Supprimer ${entry.key}`}
                          onClick={() => setPayloads((current) => ({
                            ...current,
                            [row.id]: (current[row.id] || []).filter((_, itemIndex) => itemIndex !== index),
                          }))}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => setPayloads((current) => ({
                ...current,
                [row.id]: [...(current[row.id] || []), { key: '', value: '' }],
              }))}
              className="m-4 inline-flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:hover:bg-blue-950/40"
            >
              <Plus className="h-4 w-4" /> Ajouter un champ
            </button>
          </section>
        ))}
      </div>
    </AdminLayout>
  );
};
