import React, { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { AdminLayout, AdminPageHeader } from '../../components/admin/AdminLayout';
import { deleteAdminItem, getAdminCollection, saveAdminItem } from '../../services/adminService';

export interface ContentField { key: string; label: string; type?: 'text' | 'textarea' | 'date' | 'datetime' | 'number' | 'boolean'; required?: boolean }
interface Props { table: string; title: string; description: string; bucket?: string; fields: ContentField[] }

const inputClass = 'mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2a7de1] focus:ring-4 focus:ring-[#2a7de1]/10 dark:border-white/10 dark:bg-white/[.04]';

export const AdminContentPage: React.FC<Props> = ({ table, title, description, fields }) => {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const refresh = () => getAdminCollection<Record<string, unknown>>(table).then(setRows).catch(() => setRows([]));
  useEffect(() => { void refresh(); }, [table]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values: Record<string, unknown> = {};
    fields.forEach((field) => {
      const raw = form.get(field.key);
      if (field.type === 'boolean') values[field.key] = raw === 'on';
      else if (field.type === 'number') values[field.key] = raw === '' ? null : Number(raw);
      else if (raw !== null) values[field.key] = String(raw).trim() || null;
    });
    if (table !== 'profiles') {
      values.status = form.get('status') || (table === 'livestreams' ? 'offline' : 'draft');
    }
    setSaving(true); setError('');
    try { await saveAdminItem(table, values, editing?.id ? String(editing.id) : undefined); setEditing(null); refresh(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Enregistrement impossible.'); }
    finally { setSaving(false); }
  };

  const remove = async (id: string) => { if (!window.confirm('Supprimer cet élément ?')) return; await deleteAdminItem(table, id); refresh(); };
  const displayValue = (value: unknown) => typeof value === 'boolean' ? (value ? 'Oui' : 'Non') : String(value ?? '—');

  return <AdminLayout>
    <AdminPageHeader title={title} description={description} action={!editing && <button onClick={() => setEditing({})} className="inline-flex items-center gap-2 rounded-full bg-[#2a7de1] px-5 py-3 text-sm font-bold text-white"><Plus className="h-4 w-4" />Ajouter</button>} />
    {editing && <form onSubmit={submit} className="mb-7 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1e293b] sm:p-8">
      <h2 className="mb-6 font-heading text-xl font-bold">{editing.id ? 'Modifier' : 'Ajouter'} — {title}</h2>
      <div className="grid gap-5 md:grid-cols-2">{fields.map((field) => <label key={field.key} className={`text-sm font-semibold ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>{field.label}{field.type === 'textarea' ? <textarea required={field.required} name={field.key} defaultValue={displayValue(editing[field.key]) === '—' ? '' : String(editing[field.key] ?? '')} rows={4} className={`${inputClass} resize-y`} /> : field.type === 'boolean' ? <input name={field.key} type="checkbox" defaultChecked={Boolean(editing[field.key])} className="ml-3 h-4 w-4 accent-[#2a7de1]" /> : <input required={field.required} name={field.key} type={field.type === 'datetime' ? 'datetime-local' : field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'} defaultValue={String(editing[field.key] ?? '')} className={inputClass} />}</label>)}</div>
      {table !== 'profiles' && <label className="mt-5 block text-sm font-semibold">{table === 'livestreams' ? 'Statut du direct' : 'Publication'}<select name="status" defaultValue={String(editing.status ?? (table === 'livestreams' ? 'offline' : 'draft'))} className={inputClass}>{table === 'livestreams' ? <><option value="live">En direct</option><option value="offline">Hors ligne</option><option value="replay">Rediffusion</option><option value="scheduled">Programmé</option></> : <><option value="draft">Brouillon</option><option value="published">Publié</option><option value="archived">Archivé</option></>}</select></label>}
      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <div className="mt-6 flex gap-3"><button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#2a7de1] px-5 py-3 text-sm font-bold text-white"><Save className="h-4 w-4" />{saving ? 'Enregistrement…' : 'Enregistrer'}</button><button type="button" onClick={() => setEditing(null)} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold">Annuler</button></div>
    </form>}
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#1e293b]"> <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead className="border-b bg-slate-50 text-xs uppercase text-slate-500"><tr>{fields.slice(0, 3).map(field => <th key={field.key} className="px-5 py-4">{field.label}</th>)}<th className="px-5 py-4">Statut</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y">{rows.map(row => <tr key={String(row.id)}>{fields.slice(0, 3).map(field => <td key={field.key} className="px-5 py-4 text-sm">{displayValue(row[field.key])}</td>)}<td className="px-5 py-4 text-sm">{table === 'profiles' ? (row.active ? 'Actif' : 'Inactif') : displayValue(row.status)}</td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => setEditing(row)} className="rounded-lg border px-3 py-2 text-sm">Modifier</button><button aria-label="Supprimer" onClick={() => remove(String(row.id))} className="rounded-lg border px-3 py-2 text-red-500"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div>{rows.length === 0 && <p className="p-10 text-center text-sm text-slate-400">Aucune donnée à afficher.</p>}</div>
  </AdminLayout>;
};
