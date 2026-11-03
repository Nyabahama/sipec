import React from 'react';
import { Sparkles } from 'lucide-react';
import type { FounderBio } from '../../types/churchSpa';
import { useLanguage } from '../../lib/language';
import { FacebookPostCard } from './FacebookPostCard';
import founderPortrait from '../../assets/apo.jpeg';

interface BioSpaProps {
  founder: FounderBio;
  about: {
    mission: string;
    vision: string;
  };
}

export const BioSpa: React.FC<BioSpaProps> = ({ founder, about }) => {
  const { t } = useLanguage();

  const foundations = [
    {
      title: t('bio.foundation.word'),
      description: t('bio.foundation.wordText'),
      mediaUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=85',
      likes: 312,
      comments: 42,
      shares: 19,
    },
    {
      title: t('bio.foundation.prayer'),
      description: t('bio.foundation.prayerText'),
      mediaUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
      likes: 428,
      comments: 65,
      shares: 34,
    },
    {
      title: t('bio.foundation.spirit'),
      description: t('bio.foundation.spiritText'),
      mediaUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=85',
      likes: 389,
      comments: 51,
      shares: 28,
    },
    {
      title: t('bio.foundation.evangelism'),
      description: t('bio.foundation.evangelismText'),
      mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
      likes: 275,
      comments: 38,
      shares: 22,
    },
    {
      title: t('bio.foundation.love'),
      description: t('bio.foundation.loveText'),
      mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
      likes: 490,
      comments: 73,
      shares: 45,
    },
  ];

  const milestones = [
    {
      title: t('bio.timeline.call'),
      description: t('bio.timeline.callText'),
      step: '01',
      mediaUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
      likes: 230,
      comments: 29,
      shares: 15,
    },
    {
      title: t('bio.timeline.ministry'),
      description: t('bio.timeline.ministryText'),
      step: '02',
      mediaUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=85',
      likes: 315,
      comments: 44,
      shares: 21,
    },
    {
      title: t('bio.timeline.church'),
      description: t('bio.timeline.churchText'),
      step: '03',
      mediaUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
      likes: 450,
      comments: 67,
      shares: 38,
    },
    {
      title: t('bio.timeline.expansion'),
      description: about.vision,
      step: '04',
      mediaUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=85',
      likes: 520,
      comments: 89,
      shares: 56,
    },
  ];

  return (
    <section
      id="bios"
      aria-labelledby="bio-title"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-slate-200/70 bg-[#F0F2F5] px-4 py-12 dark:border-slate-800/80 dark:bg-[#0B1120] sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        {/* En-tête de section */}
        <header className="mb-8 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1877F2] shadow-sm dark:border-blue-900/60 dark:bg-slate-900 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {t('bio.eyebrow')}
          </span>
          <h2 id="bio-title" className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {t('bio.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            {t('bio.subtitle')}
          </p>
        </header>

        {/* 1. Publication Facebook : Biographie du Pasteur Fondateur (Badges format Facebook) */}
        <div className="mb-12">
          <FacebookPostCard
            authorName={founder.name}
            authorAvatar={founder.photoUrl || founderPortrait}
            metadata={`${founder.title} • ${t('bio.visionaryFounder')}`}
            content={`${founder.biography}\n\n« ${founder.callingVerse} »\n— Jean 9:7\n\n📌 ${t('bio.missionLabel')} : ${about.mission}\n✨ ${t('bio.impactLabel')} : ${about.vision}`}
            mediaUrl={founder.photoUrl || founderPortrait}
            mediaAlt={founder.name}
            mediaAspectRatio="portrait"
            imageClassName="object-cover object-top"
            domain="SILOAMKAMPALA.ORG"
            cardTitle={`${founder.name} — ${t('bio.visionTitle')}`}
            cardSubtitle={`${t('bio.ministry')} • ${founder.title}`}
            amenCount={842}
            commentsCount={154}
            sharesCount={92}
            actionLabel="Planifier une visite"
            actionHref="#adresse"
          />
        </div>

        {/* 2. Section Church Foundations (Badges format Facebook) */}
        <div className="mt-14 mb-12">
          <div className="mb-6 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">
              {t('bio.foundationEyebrow')}
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              {t('bio.foundationsTitle')}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('bio.foundationsIntro')}
            </p>
          </div>

          <div className="space-y-6">
            {foundations.map((foundation) => (
              <FacebookPostCard
                key={foundation.title}
                authorName="S.I.P.E.C Siloam Kampala"
                metadata={`${t('bio.foundationEyebrow')} • Kampala`}
                content={foundation.description}
                mediaUrl={foundation.mediaUrl}
                domain="SILOAMKAMPALA.ORG"
                cardTitle={foundation.title}
                cardSubtitle={t('bio.foundationEyebrow')}
                amenCount={foundation.likes}
                commentsCount={foundation.comments}
                sharesCount={foundation.shares}
                actionLabel="En savoir plus"
                actionHref="#a-propos"
              />
            ))}
          </div>
        </div>

        {/* 3. Section Ministry Milestones (Badges format Facebook) */}
        <div className="mt-14">
          <div className="mb-6 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">
              {t('bio.timelineEyebrow')}
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              {t('bio.timelineTitle')}
            </h3>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone) => (
              <FacebookPostCard
                key={milestone.title}
                authorName="S.I.P.E.C Siloam Kampala"
                metadata={`Étape ${milestone.step} • ${t('bio.timelineEyebrow')}`}
                content={milestone.description}
                mediaUrl={milestone.mediaUrl}
                domain="SILOAMKAMPALA.ORG"
                cardTitle={`${milestone.step}. ${milestone.title}`}
                cardSubtitle={t('bio.timelineEyebrow')}
                amenCount={milestone.likes}
                commentsCount={milestone.comments}
                sharesCount={milestone.shares}
                actionLabel="Découvrir"
                actionHref="#bios"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
