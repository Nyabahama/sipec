import React from 'react';
import type { ChurchInfo } from '../../types/church';

interface FooterProps {
  churchInfo: ChurchInfo;
  onOpenPrayerModal: () => void;
  lastCachedAt: string | null;
}

export const Footer: React.FC<FooterProps> = ({
  churchInfo,
  onOpenPrayerModal,
  lastCachedAt,
}) => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 font-light">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-sm font-normal text-slate-900 tracking-tight">
            {churchInfo.name} ({churchInfo.acronym})
          </span>
          <p className="mt-1 text-slate-400">
            {churchInfo.welcomeVerse.reference} • {churchInfo.welcomeVerse.text}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenPrayerModal}
            className="text-slate-600 hover:text-sky-600 transition"
          >
            Prière
          </button>
          <a href="#services" className="text-slate-600 hover:text-sky-600 transition">
            Cultes
          </a>
          <a href="#media" className="text-slate-600 hover:text-sky-600 transition">
            Direct
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
        <p>© {new Date().getFullYear()} {churchInfo.acronym}. Tous droits réservés.</p>
        <span>
          Offline-First {lastCachedAt && '• Données en cache local'}
        </span>
      </div>
    </footer>
  );
};
