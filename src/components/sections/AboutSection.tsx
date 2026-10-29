import React, { useState } from 'react';
import type { AboutVision, AboutFounder, DoctrinePillar } from '../../types/church';

interface AboutSectionProps {
  vision: AboutVision;
  founder: AboutFounder;
  doctrinePillars: DoctrinePillar[];
}

type TabKey = 'vision' | 'founder' | 'doctrine';

export const AboutSection: React.FC<AboutSectionProps> = ({
  vision,
  founder,
  doctrinePillars,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('vision');

  return (
    <section id="about" className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Titre de Section Épuré */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-sky-600 font-medium">
            À Propos
          </span>
          <h2 className="mt-2 text-3xl font-light text-slate-900 tracking-tight">
            Fondements & Identité
          </h2>
        </div>

        {/* Sous-Onglets Dynamiques Minimalistes */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-2 p-1 border border-slate-100 rounded-full">
            {(['vision', 'founder', 'doctrine'] as TabKey[]).map((tab) => {
              const label =
                tab === 'vision' ? 'La Vision' : tab === 'founder' ? 'Le Fondateur' : 'La Doctrine';
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-light transition ${
                    isActive
                      ? 'bg-sky-500 text-white font-medium'
                      : 'text-slate-600 hover:text-sky-600'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu des Onglets sans fioritures */}
        <div className="min-h-[220px]">
          {/* 1. VISION */}
          {activeTab === 'vision' && (
            <div className="p-8 sm:p-12 border border-slate-100 rounded-2xl space-y-6 text-center animate-fade-in">
              <h3 className="text-xl font-normal text-slate-900">{vision.title}</h3>
              <p className="text-sm font-light text-slate-600 max-w-xl mx-auto leading-relaxed">
                {vision.statement}
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs font-light text-slate-500">
                {vision.pillars.map((p, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                    {p.title} {p.scriptureRef && `• ${p.scriptureRef}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 2. FONDATEUR */}
          {activeTab === 'founder' && (
            <div className="p-8 sm:p-12 border border-slate-100 rounded-2xl text-center space-y-4 animate-fade-in max-w-2xl mx-auto">
              <h3 className="text-xl font-normal text-slate-900">{founder.name}</h3>
              <p className="text-xs uppercase tracking-wider text-sky-600 font-medium">
                {founder.title}
              </p>
              <p className="text-sm font-light text-slate-600 leading-relaxed pt-2">
                {founder.biography}
              </p>
            </div>
          )}

          {/* 3. DOCTRINE */}
          {activeTab === 'doctrine' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center pb-2">
                <span className="text-xs font-normal text-slate-500">
                  Référence doctrinale principale : <strong className="font-medium text-sky-600">Jean 9:7</strong>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctrinePillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="p-6 border border-slate-100 rounded-2xl hover:border-sky-200 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-normal text-slate-900">{pillar.title}</h4>
                      <span className="text-xs font-light text-sky-600">{pillar.scriptureReference}</span>
                    </div>
                    <p className="text-xs font-light text-slate-500 leading-relaxed">
                      {pillar.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
