import React from 'react';
import { ArrowUpRight, BookOpen, Heart, Shield, Sparkles, Users, type LucideIcon } from 'lucide-react';
import type { CommunityServiceItem } from '../../types/churchSpa';
import { useLanguage } from '../../lib/language';

interface ServicesSpaProps {
  services: CommunityServiceItem[];
}

const serviceProfiles: Record<string, { impact: string; label: string; highlights: string[]; glow: string; outline: string }> = {
  'srv-1': {
    impact: '24/7',
    label: 'Care',
    highlights: ['Conseils confidentiels', 'Visites pastorales', 'Accompagnement familial'],
    glow: 'shadow-rose-500/20',
    outline: 'border-rose-200/80 bg-rose-500/5',
  },
  'srv-2': {
    impact: '96%',
    label: 'Support',
    highlights: ['Secours d’urgence', 'Aide aux familles', 'Solidarité locale'],
    glow: 'shadow-amber-500/20',
    outline: 'border-amber-200/80 bg-amber-500/5',
  },
  'srv-3': {
    impact: '1:1',
    label: 'Growth',
    highlights: ['Classes de baptême', 'Doctrine claire', 'Disciple-making'],
    glow: 'shadow-sky-500/20',
    outline: 'border-sky-200/80 bg-sky-500/5',
  },
  'srv-4': {
    impact: '18h',
    label: 'Prayer',
    highlights: ['Cellules à domicile', 'Intercession locale', 'Communion fraternelle'],
    glow: 'shadow-violet-500/20',
    outline: 'border-violet-200/80 bg-violet-500/5',
  },
};

export const ServicesSpa: React.FC<ServicesSpaProps> = ({ services }) => {
  const { t } = useLanguage();

  const visualByIcon: Record<CommunityServiceItem['iconName'], { icon: LucideIcon; tone: string; iconTone: string; badgeTone: string; glow: string }> = {
    heart: {
      icon: Heart,
      tone: 'from-rose-50 via-white to-red-50/80 dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900',
      iconTone: 'bg-rose-100 text-rose-700 ring-rose-200 shadow-rose-200/70 dark:bg-rose-950/70 dark:text-rose-300 dark:ring-rose-900 dark:shadow-rose-950/30',
      badgeTone: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200',
      glow: 'group-hover:shadow-[0_28px_55px_rgba(244,63,94,0.18)]',
    },
    shield: {
      icon: Shield,
      tone: 'from-amber-50 via-white to-yellow-50/80 dark:from-amber-950/35 dark:via-slate-900 dark:to-slate-900',
      iconTone: 'bg-amber-100 text-amber-700 ring-amber-200 shadow-amber-200/70 dark:bg-amber-950/70 dark:text-amber-300 dark:ring-amber-900 dark:shadow-amber-950/30',
      badgeTone: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
      glow: 'group-hover:shadow-[0_28px_55px_rgba(245,158,11,0.18)]',
    },
    'book-open': {
      icon: BookOpen,
      tone: 'from-sky-50 via-white to-cyan-50/80 dark:from-sky-950/35 dark:via-slate-900 dark:to-slate-900',
      iconTone: 'bg-sky-100 text-sky-700 ring-sky-200 shadow-sky-200/70 dark:bg-sky-950/70 dark:text-sky-300 dark:ring-sky-900 dark:shadow-sky-950/30',
      badgeTone: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-200',
      glow: 'group-hover:shadow-[0_28px_55px_rgba(14,165,233,0.18)]',
    },
    users: {
      icon: Users,
      tone: 'from-violet-50 via-white to-fuchsia-50/80 dark:from-violet-950/35 dark:via-slate-900 dark:to-slate-900',
      iconTone: 'bg-violet-100 text-violet-700 ring-violet-200 shadow-violet-200/70 dark:bg-violet-950/70 dark:text-violet-300 dark:ring-violet-900 dark:shadow-violet-950/30',
      badgeTone: 'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-200',
      glow: 'group-hover:shadow-[0_28px_55px_rgba(168,85,247,0.18)]',
    },
  };

  return (
    <section id="services" className="relative isolate scroll-mt-24 overflow-hidden border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(186,230,253,0.35),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(196,181,253,0.22),transparent_30%),linear-gradient(135deg,#f8fbff_0%,#f5f7ff_35%,#f8fafc_100%)] px-4 py-16 dark:border-slate-800/80 dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.2),transparent_25%),linear-gradient(135deg,#020817_0%,#0f172a_38%,#111827_100%)] sm:px-6 sm:py-20 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-sky-100/60 via-white/20 to-transparent dark:from-sky-950/35" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-8 -z-10 h-52 w-52 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-10 -z-10 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-500/10" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700 shadow-sm backdrop-blur-sm dark:border-sky-900/70 dark:bg-slate-900/70 dark:text-sky-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {t('services.eyebrow')}
          </span>
          <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl lg:text-6xl">
            {t('services.title')}
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base lg:text-lg">
            {t('services.intro')}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {services.length} {t('services.active')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
              <span className="h-2 w-2 rounded-full bg-sky-500" aria-hidden="true" />
              Ministère vivant
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item, index) => {
            const visual = visualByIcon[item.iconName];
            const Icon = visual.icon;
            const profile = serviceProfiles[item.id] ?? {
              impact: 'Care',
              label: item.badge,
              highlights: ['Support spirituel', 'Accompagnement', 'Proximité'],
              glow: 'shadow-slate-500/20',
              outline: 'border-slate-200/80 bg-slate-500/5',
            };

            return (
              <article
                key={item.id}
                className={`services-card group relative flex min-h-[450px] flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-gradient-to-br p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-slate-300/90 ${visual.tone} ${visual.glow} dark:border-slate-800 dark:hover:border-slate-700 md:p-7`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.82),transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.45),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(148,163,184,0.14),transparent_20%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.05),transparent_35%)]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-9 -right-8 opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-90">
                  <Icon className="h-32 w-32 text-slate-900/5 dark:text-white/5" strokeWidth={1.1} />
                </div>

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <span className={`flex h-16 w-16 items-center justify-center rounded-[22px] ring-1 shadow-lg transition duration-500 group-hover:scale-110 group-hover:-rotate-3 ${visual.iconTone}`}>
                    <Icon className="h-8 w-8" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className={`rounded-full border px-3 py-1.5 text-right text-[10px] font-bold uppercase tracking-[0.12em] shadow-sm ${visual.badgeTone}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="relative z-10 mt-7">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {t('services.ministry')} 0{index + 1}
                    </p>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${profile.outline}`}>
                      {profile.label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] text-slate-950 dark:text-white sm:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[0.96rem]">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 rounded-2xl border border-slate-200/80 bg-white/75 p-3.5 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/40">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Impact</p>
                      <p className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">{profile.impact}</p>
                    </div>
                    <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                      Active
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-6">
                  <ul className="space-y-2.5">
                    {profile.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                        <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-auto pt-6">
                  <a href="#contact" className="group/cta flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-3.5 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all duration-300 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 dark:border-slate-700 dark:bg-slate-950/45 dark:text-slate-100 dark:hover:border-sky-600 dark:hover:bg-sky-950/30 dark:hover:text-sky-200">
                    <span>{t('services.get')}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover/cta:border-sky-300 group-hover/cta:bg-sky-500 group-hover/cta:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:group-hover/cta:border-sky-500 dark:group-hover/cta:bg-sky-500">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
