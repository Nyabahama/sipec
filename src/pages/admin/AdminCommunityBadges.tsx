import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Save } from 'lucide-react';
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
  const [payloads, setPayloads] = useState<Record<string, string>>({});
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
    setPayloads(Object.fromEntries(badgeRows.map((row) => [row.id, JSON.stringify(row.payload, null, 2)])));
    setTitles(Object.fromEntries(badgeRows.map((row) => [row.id, row.title])));
  };

  useEffect(() => { void load(); }, []);

  const save = async (row: CommunityBadgeRow) => {
    setSaving(row.id);
    setMessage('');
    setError('');
    try {
      const payload = JSON.parse(payloads[row.id] || '{}') as Record<string, string | number>;
      const { error: saveError } = await supabase
        .from('community_badges')
        .update({ title: titles[row.id] || row.title, payload, updated_at: new Date().toISOString() })
        .eq('id', row.id);
      if (saveError) throw saveError;
      setMessage(`${titles[row.id] || row.title} mis à jour.`);
      await load();
    } catch (saveFailure) {
      setError(saveFailure instanceof Error ? saveFailure.message : 'JSON invalide ou erreur de sauvegarde.');
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
          <section key={row.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
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
            <label className="text-xs font-bold text-slate-500">Contenu JSON provenant de Supabase</label>
            <textarea
              value={payloads[row.id] || '{}'}
              onChange={(event) => setPayloads((current) => ({ ...current, [row.id]: event.target.value }))}
              rows={12}
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-slate-100 outline-none focus:border-blue-500 dark:border-slate-700"
            />
          </section>
        ))}
      </div>
    </AdminLayout>
  );
};
