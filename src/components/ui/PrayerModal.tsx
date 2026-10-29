import React, { useState } from 'react';
import { X, Send, Check } from 'lucide-react';
import { submitPrayerRequestToSupabase } from '../../lib/supabase';
import { offlineStorage } from '../../lib/offlineStorage';
import type { PrayerRequest } from '../../types/church';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOffline: boolean;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose, isOffline }) => {
  const [fullName, setFullName] = useState('');
  const [requestText, setRequestText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    setSubmitting(true);
    const prayer: PrayerRequest = {
      fullName: fullName.trim() || 'Anonyme',
      emailOrPhone: '',
      requestText: requestText.trim(),
      isUrgent: false,
      isPrivate: true,
      createdAt: new Date().toISOString(),
      syncedToCloud: !isOffline,
    };

    if (isOffline) {
      offlineStorage.enqueuePrayerRequest(prayer);
      setSubmitted(true);
      setSubmitting(false);
    } else {
      await submitPrayerRequestToSupabase(prayer);
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setRequestText('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-normal text-slate-900">Requête de Prière</h3>
          <button
            onClick={handleReset}
            className="p-1 rounded text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-base font-normal text-slate-900">
              {isOffline ? 'Enregistré hors-ligne' : 'Prière transmise'}
            </h4>
            <p className="text-xs font-light text-slate-500 max-w-xs mx-auto">
              {isOffline
                ? 'Votre requête est sauvegardée localement et sera envoyée dès le retour du réseau.'
                : 'Votre intention a été enregistrée avec succès.'}
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 rounded-full bg-sky-500 text-white text-xs font-medium hover:bg-sky-600 transition"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-light text-slate-500 mb-1">
                Nom ou Anonyme
              </label>
              <input
                type="text"
                placeholder="Votre nom"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:border-sky-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-light text-slate-500 mb-1">
                Intention de prière *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Votre sujet de prière..."
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:border-sky-500 outline-none transition resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-light text-slate-500 hover:text-slate-800 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting || !requestText.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Envoi...' : 'Envoyer'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
