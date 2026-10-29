import React from 'react';
import { ArrowRight, BookOpen, Compass, Flame, Globe2, HandHeart, HeartHandshake, Quote, Sparkles } from 'lucide-react';
import type { FounderBio } from '../../types/churchSpa';
import { useLanguage } from '../../lib/language';
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
    { title: t('bio.foundation.word'), description: t('bio.foundation.wordText'), icon: BookOpen, tone: 'from-sky-500/15 to-sky-500/0 text-sky-600 dark:text-sky-300' },
    { title: t('bio.foundation.prayer'), description: t('bio.foundation.prayerText'), icon: HandHeart, tone: 'from-amber-500/15 to-amber-500/0 text-amber-600 dark:text-amber-300' },
    { title: t('bio.foundation.spirit'), description: t('bio.foundation.spiritText'), icon: Flame, tone: 'from-orange-500/15 to-orange-500/0 text-orange-600 dark:text-orange-300' },
    { title: t('bio.foundation.evangelism'), description: t('bio.foundation.evangelismText'), icon: Globe2, tone: 'from-cyan-500/15 to-cyan-500/0 text-cyan-600 dark:text-cyan-300' },
    { title: t('bio.foundation.love'), description: t('bio.foundation.loveText'), icon: HeartHandshake, tone: 'from-rose-500/15 to-rose-500/0 text-rose-600 dark:text-rose-300' },
  ];

  const milestones = [
    { title: t('bio.timeline.call'), description: t('bio.timeline.callText') },
    { title: t('bio.timeline.ministry'), description: t('bio.timeline.ministryText') },
    { title: t('bio.timeline.church'), description: t('bio.timeline.churchText') },
    { title: t('bio.timeline.expansion'), description: about.vision },
  ];

  return (
    <section id="bios" aria-labelledby="bio-title" className="relative isolate scroll-mt-24 overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50 to-white px-4 py-16 dark:border-slate-800/80 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 sm:py-20 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 -z-10 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-3xl sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700 shadow-sm backdrop-blur dark:border-sky-900 dark:bg-slate-900/70 dark:text-sky-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {t('bio.eyebrow')}
          </span>
          <h2 id="bio-title" className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            {t('bio.title')}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t('bio.subtitle')}
          </p>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <figure className="relative mx-auto w-full max-w-md lg:mx-0">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-400/30 via-cyan-300/10 to-amber-300/25 blur-xl" />
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/80 bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10">
              <img src={founderPortrait} alt={founder.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/15 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-slate-950/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-200 shadow-lg backdrop-blur-md">
                  <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('bio.visionaryFounder')}
                </span>
                <p className="mt-3 text-2xl font-bold leading-tight text-white drop-shadow sm:text-3xl">{founder.name}</p>
                <p className="mt-1 text-xs font-medium leading-5 text-slate-200 sm:text-sm">{founder.title}</p>
              </div>
            </div>
          </figure>

          <div className="space-y-7">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">{t('bio.ministry')}</span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{t('bio.visionTitle')}</h3>
              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">{founder.biography}</p>
            </div>

            <blockquote className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-[0_18px_45px_rgba(14,165,233,0.12)] dark:border-sky-900/70 dark:from-sky-950/70 dark:via-slate-900 dark:to-cyan-950/50 sm:p-8">
              <Quote className="absolute right-5 top-5 h-10 w-10 text-sky-500/15" aria-hidden="true" />
              <span className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">{t('bio.calling')}</span>
              <p className="relative mt-4 max-w-2xl text-xl font-semibold leading-relaxed text-slate-900 dark:text-white sm:text-2xl">{founder.callingVerse}</p>
              <cite className="relative mt-4 block text-sm font-bold not-italic text-sky-700 dark:text-sky-300">Jean 9:7</cite>
            </blockquote>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-5 shadow-sm backdrop-blur dark:border-amber-900/60 dark:bg-amber-950/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">{t('bio.missionLabel')}</span>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{about.mission}</p>
              </article>
              <article className="rounded-2xl border border-cyan-200/80 bg-cyan-50/70 p-5 shadow-sm backdrop-blur dark:border-cyan-900/60 dark:bg-cyan-950/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">{t('bio.impactLabel')}</span>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{about.vision}</p>
              </article>
            </div>
          </div>
        </div>

        <section aria-labelledby="foundations-title" className="mt-20 sm:mt-24">
          <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">{t('bio.foundationEyebrow')}</span>
              <h3 id="foundations-title" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t('bio.foundationsTitle')}</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">{t('bio.foundationsIntro')}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {foundations.map(({ title, description, icon: Icon, tone }) => (
              <article key={title} className={`about-card group relative min-h-48 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 ${tone}`}>
                <Icon className="h-7 w-7 transition duration-300 group-hover:scale-110" strokeWidth={1.7} aria-hidden="true" />
                <h4 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="bio-timeline-title" className="mt-20 sm:mt-24">
          <div className="mb-8 text-center sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">{t('bio.timelineEyebrow')}</span>
            <h3 id="bio-timeline-title" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t('bio.timelineTitle')}</h3>
          </div>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map(({ title, description }, index) => (
              <li key={title} className="relative rounded-2xl border border-slate-200 bg-white/75 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/75">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sm font-bold text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300">0{index + 1}</span>
                <h4 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
                {index < milestones.length - 1 && <ArrowRight className="absolute -right-3 top-9 z-10 hidden h-5 w-5 text-sky-400 lg:block" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
};
