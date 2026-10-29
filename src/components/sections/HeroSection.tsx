import React from 'react';
import { ArrowRight, Radio } from 'lucide-react';
import type { ChurchInfo, ServiceSchedule, LiveStreamStatus } from '../../types/church';

interface HeroSectionProps {
  churchInfo: ChurchInfo;
  services: ServiceSchedule[];
  liveStatus: LiveStreamStatus;
  onOpenPrayerModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  churchInfo,
  services,
  liveStatus,
  onOpenPrayerModal,
}) => {
  return (
    <section id="hero" className="bg-white pt-24 pb-20 sm:pt-32 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        {/* Acronyme épuré */}
        <span className="text-xs uppercase tracking-widest text-sky-600 font-medium">
          {churchInfo.acronym} • Jean 9:7
        </span>

        {/* Titre Principal Élégant */}
        <h1 className="mt-4 text-4xl sm:text-6xl font-light text-slate-900 tracking-tight leading-tight">
          Siloam International <br />
          <span className="font-normal text-slate-900">Pentecostal Evangelical Church</span>
        </h1>

        {/* Message d'accueil / Verset Jean 9:7 */}
        <blockquote className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl font-light text-slate-600 italic leading-relaxed">
          {churchInfo.welcomeVerse.text}
          <span className="block mt-2 text-xs font-normal not-italic text-sky-600 tracking-wider uppercase">
            — {churchInfo.welcomeVerse.reference}
          </span>
        </blockquote>

        {/* Actions Principales (CTA) */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#media"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium tracking-wide transition shadow-sm"
          >
            {liveStatus.isLive && <Radio className="w-4 h-4 animate-pulse" />}
            <span>Accéder au Direct</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenPrayerModal}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-200 hover:border-sky-500 text-slate-700 hover:text-sky-600 text-sm font-light transition"
          >
            Déposer une prière
          </button>
        </div>

        {/* Horaires des Cultes Épurés */}
        <div id="services" className="mt-20 pt-12 border-t border-slate-100 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-8">
            Horaires des Cultes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-sky-200 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-sky-600 uppercase tracking-wider">
                    {service.day}
                  </span>
                  <span className="text-xs font-light text-slate-500">
                    {service.timeRange}
                  </span>
                </div>
                <h3 className="text-base font-normal text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs font-light text-slate-500">
                  {service.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
