import React from 'react';
import { Sparkles } from 'lucide-react';
import type { CommunityServiceItem } from '../../types/churchSpa';
import { useLanguage } from '../../lib/language';
import { FacebookPostCard } from './FacebookPostCard';

interface ServicesSpaProps {
  services: CommunityServiceItem[];
}

export const ServicesSpa: React.FC<ServicesSpaProps> = ({ services }) => {
  const { t } = useLanguage();

  const serviceImages: Record<string, string> = {
    heart: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
    shield: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    'book-open': 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80',
    users: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <section id="services" className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#1877F2] dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          {t('services.eyebrow')}
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('services.title')}
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t('services.intro')}
        </p>
      </div>

      <div className="space-y-6">
        {services.map((item, index) => (
          <FacebookPostCard
            key={item.id}
            authorName="S.I.P.E.C Siloam Kampala"
            metadata={`${item.badge} • ${t('services.ministry')} 0${index + 1}`}
            content={item.description}
            mediaUrl={serviceImages[item.iconName] || serviceImages.heart}
            domain="SILOAMKAMPALA.ORG"
            cardTitle={item.title}
            cardSubtitle={`Service communautaire : ${item.badge}`}
            amenCount={140 + index * 25}
            commentsCount={18 + index * 4}
            sharesCount={7 + index * 2}
            actionLabel={t('services.get')}
            actionHref="#contact"
          />
        ))}
      </div>
    </section>
  );
};
