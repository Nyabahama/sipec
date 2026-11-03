import React, { useEffect, useState } from 'react';
import {
  Plus,
  Save,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { AdminLayout, AdminPageHeader } from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import type { VitrineBadge, VitrineSectionTarget } from '../../types/vitrineBadge';
import { FacebookPostCard } from '../../components/spa/FacebookPostCard';

const SECTION_OPTIONS: { value: VitrineSectionTarget; label: string }[] = [
  { value: 'notre_impact', label: 'S.I.P.E.C / Notre Impact' },
  { value: 'weekly_programmes', label: 'Weekly programmes' },
  { value: 'our_biography', label: 'Our biography (Pasteur Fondateur)' },
  { value: 'church_foundations', label: 'Church Foundations (Fondements)' },
  { value: 'ministry_milestones', label: 'Ministry milestones (Jalons)' },
  { value: 'predications', label: 'Messages & enseignements / Prédications' },
  { value: 'horaires_cultes', label: 'Horaires des cultes' },
  { value: 'notre_equipe', label: 'Notre équipe / Responsables SIPEC' },
];

export const AdminVitrineManager: React.FC = () => {
  const [badges, setBadges] = useState<VitrineBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [editingBadge, setEditingBadge] = useState<Partial<VitrineBadge> | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchBadges = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vitrine_badges')
        .select('*')
        .order('section_target', { ascending: true })
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setBadges(data || []);
    } catch (err) {
      console.error('Erreur chargement badges:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchBadges();
  }, []);

  const handleFileUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `vitrine/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('church-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('church-media')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      let finalMediaUrl = editingBadge?.media_url || '';

      // 1. Upload du fichier physique si sélectionné
      if (selectedFile) {
        finalMediaUrl = await handleFileUpload(selectedFile);
      }

      const payload = {
        section_target: editingBadge?.section_target || 'notre_impact',
        author_name: editingBadge?.author_name || 'S.I.P.E.C Siloam Kampala',
        author_avatar_url: editingBadge?.author_avatar_url || null,
        metadata_subtitle: editingBadge?.metadata_subtitle || null,
        body_text: editingBadge?.body_text || '',
        media_url: finalMediaUrl || null,
        media_type: editingBadge?.media_type || 'image',
        embed_domain: editingBadge?.embed_domain || 'SILOAMKAMPALA.ORG',
        embed_title: editingBadge?.embed_title || '',
        embed_subtitle: editingBadge?.embed_subtitle || null,
        interaction_likes: Number(editingBadge?.interaction_likes) || 0,
        comment_count_simulated: Number(editingBadge?.comment_count_simulated) || 0,
        cta_button_text: editingBadge?.cta_button_text || 'En savoir plus',
        cta_button_url: editingBadge?.cta_button_url || null,
        sort_order: Number(editingBadge?.sort_order) || 0,
        updated_at: new Date().toISOString(),
      };

      if (editingBadge?.id) {
        // Mise à jour
        const { error } = await supabase
          .from('vitrine_badges')
          .update(payload)
          .eq('id', editingBadge.id);
        if (error) throw error;
        setStatusMessage({ type: 'success', text: 'Badge mis à jour avec succès !' });
      } else {
        // Nouvelle insertion
        const { error } = await supabase
          .from('vitrine_badges')
          .insert({ ...payload, created_at: new Date().toISOString() });
        if (error) throw error;
        setStatusMessage({ type: 'success', text: 'Nouveau badge enregistré dans Supabase !' });
      }

      setEditingBadge(null);
      setSelectedFile(null);
      void fetchBadges();
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      setStatusMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Erreur lors de l’enregistrement.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer définitivement ce badge de la vitrine ?')) return;
    try {
      const { error } = await supabase.from('vitrine_badges').delete().eq('id', id);
      if (error) throw error;
      setBadges((prev) => prev.filter((b) => b.id !== id));
      setStatusMessage({ type: 'success', text: 'Badge supprimé avec succès.' });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur de suppression.');
    }
  };

  const filteredBadges =
    selectedSection === 'all'
      ? badges
      : badges.filter((b) => b.section_target === selectedSection);

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F0F2F5] px-4 py-2.5 text-sm outline-none transition focus:bg-white focus:border-[#1877F2] focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900';

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gestionnaire des Badges Vitrine"
        description="Configuration en miroir direct champ par champ de tous les badges du site (Style Facebook / Radio Okapi)."
        action={
          !editingBadge && (
            <button
              onClick={() =>
                setEditingBadge({
                  section_target: 'notre_impact',
                  author_name: 'S.I.P.E.C Siloam Kampala',
                  embed_domain: 'SILOAMKAMPALA.ORG',
                  embed_title: '',
                  body_text: '',
                  metadata_subtitle: 'Kampala • 🌐 Public',
                  cta_button_text: 'En savoir plus',
                  interaction_likes: 120,
                  comment_count_simulated: 15,
                  sort_order: 1,
                })
              }
              className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] hover:bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition"
            >
              <Plus className="h-4 w-4" />
              Nouveau Badge
            </button>
          )
        }
      />

      {/* Message d'état */}
      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* FORMULAIRE D'ÉDITION / CRÉATION EN MIROIR */}
      {editingBadge && (
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingBadge.id ? 'Modifier le Badge' : 'Créer un Nouveau Badge'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Chaque champ ci-dessous est synchronisé directement avec l'encadré visuel Facebook.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingBadge(null);
                setSelectedFile(null);
              }}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
            >
              Fermer
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* SECTION CIBLE */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Section Cible sur le Site Vitrine *
                </label>
                <select
                  required
                  value={editingBadge.section_target || 'notre_impact'}
                  onChange={(e) =>
                    setEditingBadge({ ...editingBadge, section_target: e.target.value as VitrineSectionTarget })
                  }
                  className={inputClass}
                >
                  {SECTION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* AUTEUR (HEADER) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Nom de l'Auteur (Header) *
                </label>
                <input
                  required
                  value={editingBadge.author_name || ''}
                  onChange={(e) => setEditingBadge({ ...editingBadge, author_name: e.target.value })}
                  placeholder="S.I.P.E.C Siloam Kampala"
                  className={inputClass}
                />
              </div>

              {/* MÉTADONNÉES SUBTITLE */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Métadonnées / Horaires / Sous-titre *
                </label>
                <input
                  required
                  value={editingBadge.metadata_subtitle || ''}
                  onChange={(e) => setEditingBadge({ ...editingBadge, metadata_subtitle: e.target.value })}
                  placeholder="Ex : Dimanche • 08h00 - 12h00 ou Kampala"
                  className={inputClass}
                />
              </div>

              {/* GRAND TITRE ENCADRÉ (Style Radio Okapi) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Grand Titre en Gras (Sous-bloc Radio Okapi) *
                </label>
                <input
                  required
                  value={editingBadge.embed_title || ''}
                  onChange={(e) => setEditingBadge({ ...editingBadge, embed_title: e.target.value })}
                  placeholder="Ex : Culte Principal — Dimanche ou 1 200+ Membres"
                  className={inputClass}
                />
              </div>

              {/* SOUS-TITRE ENCADRÉ */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Sous-titre Contextuel de l'Encadré
                </label>
                <input
                  value={editingBadge.embed_subtitle || ''}
                  onChange={(e) => setEditingBadge({ ...editingBadge, embed_subtitle: e.target.value })}
                  placeholder="Ex : Horaire officiel : 08h00 - 12h00"
                  className={inputClass}
                />
              </div>

              {/* NOM DE DOMAINE */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Nom de Domaine Affiché
                </label>
                <input
                  value={editingBadge.embed_domain || 'SILOAMKAMPALA.ORG'}
                  onChange={(e) => setEditingBadge({ ...editingBadge, embed_domain: e.target.value })}
                  placeholder="SILOAMKAMPALA.ORG"
                  className={inputClass}
                />
              </div>
            </div>

            {/* DESCRIPTION AU-DESSUS DE L'IMAGE (BODY_TEXT) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Paragraphe Descriptif Principal (Body - Au-dessus du média) *
              </label>
              <textarea
                required
                rows={4}
                value={editingBadge.body_text || ''}
                onChange={(e) => setEditingBadge({ ...editingBadge, body_text: e.target.value })}
                placeholder="Rédigez le texte complet qui apparaîtra obligatoirement au-dessus de l'image..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* GESTIONNAIRE D'UPLOAD DU FICHIER SUPABASE (Bucket 'church-media') */}
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Fichier Média (Photo ou Vidéo de culte) — Storage Supabase
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setSelectedFile(file);
                  }}
                  className="text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#1877F2] file:text-white hover:file:bg-blue-600 cursor-pointer"
                />
                <span className="text-xs text-slate-500">ou saisissez une URL directe :</span>
                <input
                  type="text"
                  value={editingBadge.media_url || ''}
                  onChange={(e) => setEditingBadge({ ...editingBadge, media_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              {selectedFile && (
                <p className="mt-3 text-xs text-[#1877F2] font-semibold flex items-center gap-1.5">
                  <Upload className="h-4 w-4" />
                  Prêt au téléversement vers le bucket 'church-media' : {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} Ko)
                </p>
              )}
            </div>

            {/* PARAMÈTRES FOOTER (BOUTON & INTERACTIONS) */}
            <div className="grid gap-6 sm:grid-cols-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Libellé du Bouton
                </label>
                <input
                  value={editingBadge.cta_button_text || 'En savoir plus'}
                  onChange={(e) => setEditingBadge({ ...editingBadge, cta_button_text: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Lien de Redirection
                </label>
                <input
                  value={editingBadge.cta_button_url || ''}
                  onChange={(e) => setEditingBadge({ ...editingBadge, cta_button_url: e.target.value })}
                  placeholder="#adresse ou https://..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Likes / Amen (Simulés)
                </label>
                <input
                  type="number"
                  value={editingBadge.interaction_likes || 0}
                  onChange={(e) =>
                    setEditingBadge({ ...editingBadge, interaction_likes: Number(e.target.value) })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Ordre d'Affichage
                </label>
                <input
                  type="number"
                  value={editingBadge.sort_order || 1}
                  onChange={(e) =>
                    setEditingBadge({ ...editingBadge, sort_order: Number(e.target.value) })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            {/* APERÇU TEMPS RÉEL DU BADGE FACEBOOK */}
            <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1877F2] mb-3 flex items-center gap-1.5">
                <Eye className="h-4 w-4" /> Aperçu Visuel Direct (Reflet Exact de la Vitrine)
              </p>
              <div className="max-w-xl mx-auto p-4 bg-[#F0F2F5] dark:bg-[#0B1120] rounded-2xl">
                <FacebookPostCard
                  authorName={editingBadge.author_name || 'S.I.P.E.C Siloam Kampala'}
                  metadata={editingBadge.metadata_subtitle || 'À l’instant'}
                  content={editingBadge.body_text || 'Texte d’exemple descriptif du badge...'}
                  mediaUrl={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : editingBadge.media_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85'
                  }
                  domain={editingBadge.embed_domain || 'SILOAMKAMPALA.ORG'}
                  cardTitle={editingBadge.embed_title || 'Titre de l’encadré'}
                  cardSubtitle={editingBadge.embed_subtitle || undefined}
                  amenCount={editingBadge.interaction_likes || 42}
                  commentsCount={editingBadge.comment_count_simulated || 8}
                  actionLabel={editingBadge.cta_button_text || 'En savoir plus'}
                  actionHref={editingBadge.cta_button_url || '#'}
                />
              </div>
            </div>

            {/* BOUTONS DE VALIDATION */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                disabled={saving || uploading}
                className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] hover:bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {uploading ? 'Téléversement du fichier…' : saving ? 'Enregistrement en cours…' : 'Enregistrer dans Supabase'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingBadge(null);
                  setSelectedFile(null);
                }}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FILTRES PAR SECTION ET LISTING */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedSection('all')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedSection === 'all'
                ? 'bg-[#1877F2] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            Toutes les Sections ({badges.length})
          </button>
          {SECTION_OPTIONS.map((opt) => {
            const count = badges.filter((b) => b.section_target === opt.value).length;
            return (
              <button
                key={opt.value}
                onClick={() => setSelectedSection(opt.value)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedSection === opt.value
                    ? 'bg-[#1877F2] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {opt.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* TABLEAU DES BADGES ACTUELS */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
              <tr>
                <th className="px-5 py-4">Média</th>
                <th className="px-5 py-4">Grand Titre (Radio Okapi)</th>
                <th className="px-5 py-4">Section Cible</th>
                <th className="px-5 py-4">Métadonnées</th>
                <th className="px-5 py-4">Likes</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Chargement des badges depuis Supabase...
                  </td>
                </tr>
              ) : filteredBadges.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Aucun badge configuré dans cette section.
                  </td>
                </tr>
              ) : (
                filteredBadges.map((badge) => (
                  <tr key={badge.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-5 py-4">
                      {badge.media_url ? (
                        <img
                          src={badge.media_url}
                          alt=""
                          className="h-12 w-20 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                      ) : (
                        <div className="grid h-12 w-20 place-items-center rounded-lg bg-slate-100 text-slate-400">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                        {badge.embed_title}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{badge.body_text}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#1877F2] dark:bg-blue-950/60">
                        {SECTION_OPTIONS.find((s) => s.value === badge.section_target)?.label || badge.section_target}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-600 dark:text-slate-400">
                      {badge.metadata_subtitle || '—'}
                    </td>
                    <td className="px-5 py-4 font-semibold text-xs text-slate-700 dark:text-slate-300">
                      👍 {badge.interaction_likes || 0}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingBadge(badge)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(badge.id)}
                          className="rounded-lg border border-rose-200 p-1.5 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

