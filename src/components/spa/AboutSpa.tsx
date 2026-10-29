import React from 'react';
import { ArrowRight, Compass, History, Target } from 'lucide-react';
import { useLanguage } from '../../lib/language';

interface AboutSpaProps {
  about: {
    history: string;
    mission: string;
    vision: string;
  };
}

export const AboutSpa: React.FC<AboutSpaProps> = ({ about }) => {
  const { t } = useLanguage();

  const cards = [
    {
      title: t('about.history'),
      description: about.history,
      badge: t('about.origin'),
      statistic: t('about.stat.foundation'),
      href: '#bios',
      icon: History,
      theme: 'border-sky-200/80 from-sky-50/90 via-white to-white text-sky-700 dark:border-sky-900/70 dark:from-sky-950/50 dark:via-slate-900 dark:to-slate-900 dark:text-sky-300',
      iconTheme: 'bg-sky-100 text-sky-700 ring-sky-200 dark:bg-sky-900/60 dark:text-sky-300 dark:ring-sky-800',
      badgeTheme: 'border-sky-200 bg-sky-100/80 text-sky-800 dark:border-sky-900 dark:bg-sky-950/70 dark:text-sky-200',
      glow: 'bg-sky-400/15 group-hover:bg-sky-400/25',
    },
    {
      title: t('about.mission'),
      description: about.mission,
      badge: t('about.gospel'),
      statistic: t('about.stat.members'),
      href: '#services',
      icon: Target,
      theme: 'border-amber-200/80 from-amber-50/90 via-white to-white text-amber-700 dark:border-amber-900/70 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 dark:text-amber-300',
      iconTheme: 'bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800',
      badgeTheme: 'border-amber-200 bg-amber-100/80 text-amber-800 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-200',
      glow: 'bg-amber-400/15 group-hover:bg-amber-400/25',
    },
    {
      title: t('about.vision'),
      description: about.vision,
      badge: t('about.nations'),
      statistic: t('about.stat.nations'),
      href: '#departements',
      icon: Compass,
      theme: 'border-cyan-200/80 from-cyan-50/90 via-white to-white text-cyan-700 dark:border-cyan-900/70 dark:from-cyan-950/45 dark:via-slate-900 dark:to-slate-900 dark:text-cyan-300',
      iconTheme: 'bg-cyan-100 text-cyan-700 ring-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:ring-cyan-800',
      badgeTheme: 'border-cyan-200 bg-cyan-100/80 text-cyan-800 dark:border-cyan-900 dark:bg-cyan-950/60 dark:text-cyan-200',
      glow: 'bg-cyan-400/15 group-hover:bg-cyan-400/25',
    },
  ];

  return (
    <section id="a-propos" aria-labelledby="about-heading" className="relative isolate scroll-mt-24 overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-10 dark:border-slate-800/80 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 sm:py-12 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-center gap-3 sm:mb-8">
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-sky-500 sm:w-12" />
          <h2 id="about-heading" className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100 sm:text-xl">
            {t('about.title')}
          </h2>
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500 sm:w-12" />
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 xl:gap-8">
          {cards.map(({ title, description, badge, statistic, href, icon: Icon, theme, iconTheme, badgeTheme, glow }, index) => (
            <article
              key={title}
              className={`about-card group relative flex min-h-[500px] flex-col overflow-hidden rounded-3xl border bg-gradient-to-br p-7 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)] dark:shadow-black/20 dark:hover:shadow-black/40 sm:min-h-[540px] sm:p-9 ${theme}`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div aria-hidden="true" className={`pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full blur-3xl transition duration-500 ${glow}`} />
              <Icon aria-hidden="true" className="pointer-events-none absolute -bottom-5 -right-5 h-44 w-44 rotate-[-12deg] opacity-[0.055] transition duration-500 group-hover:scale-110 group-hover:opacity-[0.09]" />

              <div className="relative flex items-start justify-between gap-3">
                <span className={`inline-flex items-center rounded-full border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm backdrop-blur ${badgeTheme}`}>
                  {badge}
                </span>
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 shadow-lg transition duration-500 group-hover:rotate-[-5deg] group-hover:scale-110 ${iconTheme}`}>
                  <Icon className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" />
                </span>
              </div>

              <div className="relative mt-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">0{index + 1}</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                  {description}
                </p>
              </div>

              <div className="relative mt-auto pt-9">
                <div className="mb-6 flex items-end justify-between gap-3 border-t border-slate-200/80 pt-5 dark:border-slate-700/80">
                  <span className="text-xs font-semibold leading-5 text-slate-600 dark:text-slate-400">{statistic}</span>
                  <span className="text-4xl font-bold tabular-nums text-slate-800 dark:text-slate-100" aria-label={t('impact.unknownLabel')}>
                    —
                  </span>
                </div>
                <a href={href} className={`inline-flex min-h-12 w-full items-center justify-between rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm font-bold text-slate-900 shadow-sm backdrop-blur transition duration-300 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-white/10 dark:bg-slate-950/40 dark:text-white dark:hover:bg-slate-950/70 ${theme.split(' ')[0]}`}>
                  <span>{t('about.learnMore')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};