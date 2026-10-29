import React from 'react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import type { ChurchService } from '../../types/churchSpa';
import { useLanguage } from '../../lib/language';

interface CultesSpaProps {
  services: ChurchService[];
}

export const CultesSpa: React.FC<CultesSpaProps> = ({ services }) => {
  const { t } = useLanguage();
  return (
    <section id="cultes" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200/70 dark:border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-sky-600 dark:text-sky-400">
          {t('cults.eyebrow')}
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {t('cults.title')}
        </h2>
        <p className="mt-3 text-sm font-light text-slate-600 dark:text-slate-400 max-w-xl">
          {t('cults.intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white dark:bg-slate-900 p-8 rounded-3xl border shadow-sm flex flex-col justify-between transition-all duration-300 ${
              idx === 0
                ? 'border-sky-500/50 dark:border-sky-400/50 ring-1 ring-sky-500/20'
                : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div>
              {/* Jour et Heure */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.day}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-sky-500" />
                  <span>{item.timeRange}</span>
                </span>
              </div>

              {/* Titre */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Lieu */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bannière de rappel prière */}
      <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <Sparkles className="w-5 h-5 text-sky-500 shrink-0" />
          <span className="text-xs text-slate-700 dark:text-slate-300 font-light">
            {t('cults.prayerHelp')}
          </span>
        </div>
        <a
          href="#contact"
          className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-medium text-xs shrink-0 transition"
        >
          {t('cults.write')}
        </a>
      </div>
    </section>
  );
};
