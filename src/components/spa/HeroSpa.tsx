import React, { useEffect, useState } from 'react';
import { ArrowDown, BookOpen, Calendar, CalendarDays, Church, Clock, Flame, Globe, HandHeart, LayoutGrid, MapPin, Users } from 'lucide-react';
import churchLogo from '../../assets/siloam.jpeg';
import type { ChurchMeta } from '../../types/churchSpa';
import { useLanguage } from '../../lib/language';

interface ChurchImpact {
  members: number | null;
  departments: number;
  nations: number | null;
  ministryYears: number | null;
}

interface HeroSpaProps {
  meta: ChurchMeta;
  impact: ChurchImpact;
  backgroundImage?: string;
}

const AnimatedValue: React.FC<{ value: number | null }> = ({ value }) => {
  const { language, t } = useLanguage();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    const startedAt = performance.now();
    let frameId = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / 900, 1);
      setDisplayValue(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [value]);

  const numberLocale = language === 'sw' ? 'sw-KE' : language === 'en' ? 'en-UG' : 'fr-FR';
  return value === null ? <span aria-label={t('impact.unknownLabel')}>—</span> : <span>{displayValue.toLocaleString(numberLocale)}</span>;
};

export const HeroSpa: React.FC<HeroSpaProps> = ({ meta, impact, backgroundImage }) => {
  const { t } = useLanguage();
  const schedule = [
    { day: t('program.sunday'), time: '10h00 – 12h00', title: t('program.main'), description: t('program.description.main'), icon: Church },
    { day: t('program.thursday'), time: '18h00', title: t('program.bible'), description: t('program.description.bible'), icon: BookOpen },
    { day: t('program.saturday'), time: '10h00 – 12h00', title: t('program.prayer'), description: t('program.description.prayer'), icon: HandHeart },
    { day: t('program.friday'), time: '23h00 – 03h00', title: t('program.intercession'), description: t('program.description.intercession'), icon: Flame },
    { day: t('program.weekdays'), time: '08h00 – 10h00', title: t('program.availability'), description: t('program.description.availability'), icon: Clock },
    { day: t('program.dayToConfirm'), time: '17h30 – 20h30', title: t('program.deliverance'), description: t('program.description.deliverance'), icon: HandHeart },
  ];

  const impactCards = [
    { value: impact.members, label: 'Membres', icon: Users },
    { value: impact.departments, label: 'Départements', icon: LayoutGrid },
    { value: impact.nations, label: 'Nations atteintes', icon: Globe },
    { value: impact.ministryYears, label: 'Années de ministère', icon: CalendarDays },
  ];

  return (
    <>
      <section id="bienvenue" className="relative isolate flex min-h-[78svh] scroll-mt-20 items-center justify-center overflow-hidden bg-slate-950 px-4 py-20 pb-28 sm:px-6 lg:px-8">
        {backgroundImage && (
          <img src={backgroundImage} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        )}
        <div aria-hidden="true" className="hero-atmosphere absolute inset-0 -z-20" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/75 via-slate-950/65 to-slate-950/90" />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center text-white">
          <div className="hero-fade-in mb-6 h-24 w-24 overflow-hidden rounded-full border border-white/70 bg-slate-950 shadow-[0_0_40px_rgba(14,165,233,0.35)] ring-4 ring-white/10 sm:mb-8 sm:h-28 sm:w-28">
            <img
              src={churchLogo}
              alt="Logo de l'Église Siloam International Pentecostal Evangelical Church"
              className="h-full w-full object-contain"
            />
          </div>

          <span className="hero-fade-in rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-slate-950/20 backdrop-blur-xl sm:text-sm">
            Bienvenue à {meta.acronym}
          </span>

          <h1 className="hero-slide-up mt-6 max-w-4xl text-4xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            Bienvenue à <span className="bg-gradient-to-r from-sky-300 via-sky-100 to-amber-300 bg-clip-text text-transparent">{meta.acronym} SILOAM</span>
          </h1>

          <p className="hero-fade-in mt-6 max-w-[44rem] text-lg leading-8 text-slate-100 sm:text-xl sm:leading-9">
            Une famille chrétienne où la foi grandit, l'amour unit et l'espérance transforme les vies.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href="#adresse"
              className="hero-cta-in inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
              style={{ animationDelay: '250ms' }}
            >
              Nous rendre visite
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#predications"
              className="hero-cta-in inline-flex min-h-12 items-center justify-center rounded-lg border border-white/60 bg-white/5 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              style={{ animationDelay: '400ms' }}
            >
              Regarder en direct
            </a>
          </div>

          <div className="hero-fade-in mt-8 flex flex-col items-center gap-3 text-xs font-medium text-slate-100 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5 sm:text-sm">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-amber-400" aria-hidden="true" />Kampala, Uganda</span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-amber-400" aria-hidden="true" />Culte chaque dimanche</span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2"><HandHeart className="h-4 w-4 text-amber-400" aria-hidden="true" />Tous sont les bienvenus</span>
          </div>
        </div>

        <a href="#impact" className="hero-scroll absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="Défiler vers Notre Impact">
          <span className="hero-mouse" aria-hidden="true"><span /></span>
          <span>Scroll Down</span>
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </section>

      <section id="impact" aria-labelledby="impact-title" className="scroll-mt-24 bg-slate-50 px-4 pb-6 pt-12 dark:bg-slate-950 sm:px-6 sm:pb-8 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">S.I.P.E.C</p>
            <h2 id="impact-title" className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Notre Impact</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactCards.map(({ value, label, icon: Icon }, index) => (
              <article key={label} className="impact-card group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:shadow-black/20" style={{ animationDelay: `${index * 100}ms` }}>
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition duration-300 group-hover:bg-sky-500 group-hover:text-white dark:bg-sky-950/70 dark:text-sky-300 dark:group-hover:bg-sky-500">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                  <AnimatedValue value={value} />
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</h3>
                {value === null && <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">À renseigner</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="h-7 overflow-hidden bg-slate-50 dark:bg-slate-950 sm:h-9">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0 24 C240 72 480 72 720 40 C960 8 1200 8 1440 40 L1440 80 L0 80 Z" className="fill-white dark:fill-slate-900" />
        </svg>
      </div>

      <section aria-labelledby="weekly-programs-title" className="border-b border-slate-200/70 bg-white px-4 pb-10 pt-5 dark:border-slate-800/80 dark:bg-slate-900 sm:px-6 sm:pb-12 sm:pt-7 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-7 max-w-2xl text-center">
            <h2 id="weekly-programs-title" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {t('programs.title')}
            </h2>
            <div aria-hidden="true" className="mx-auto mt-4 flex w-24 items-center justify-center gap-2">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-sky-500" />
              <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.45)]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-sky-500" />
            </div>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schedule.map(({ day, time, title, description, icon: Icon }) => (
              <article key={day} className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-sky-50/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-sky-300 hover:shadow-[0_18px_40px_rgba(14,165,233,0.16)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-sky-950/40 dark:hover:border-sky-800">
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-300/10 blur-2xl transition duration-300 group-hover:bg-sky-400/20" />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100/80 px-3 py-1.5 text-xs font-bold text-sky-800 shadow-sm dark:border-sky-800 dark:bg-sky-950/70 dark:text-sky-200">
                    <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {day}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-950/70 dark:text-slate-200">
                    <Clock className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                    {time}
                  </span>
                </div>
                <span className="relative mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-lg shadow-sky-900/15 transition duration-300 group-hover:scale-110 group-hover:shadow-sky-500/25">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold leading-snug text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
