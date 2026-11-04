import React from 'react';
import { ArrowDown, MapPin, Calendar, HandHeart } from 'lucide-react';
import churchLogo from '../../assets/siloam.jpeg';
import type { ChurchMeta } from '../../types/churchSpa';
import { useLanguage } from '../../lib/language';
import { FacebookPostCard } from './FacebookPostCard';
import { useVitrineBadges } from '../../hooks/useVitrineBadges';

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

export const HeroSpa: React.FC<HeroSpaProps> = ({ meta, backgroundImage }) => {
  const { t } = useLanguage();
  const { getBadgesBySection } = useVitrineBadges();

  const impactBadges = getBadgesBySection('notre_impact');
  const weeklyBadges = getBadgesBySection('weekly_programmes');

  return (
    <>
      {/* SECTION 1 : HERO MODERNE, ÉPURÉ & ULTRA-PROFESSIONNEL */}
      <section
        id="bienvenue"
        className="relative isolate flex min-h-[82svh] scroll-mt-20 items-center justify-center overflow-hidden bg-[#0A0E17] px-4 py-20 pb-28 sm:px-6 lg:px-8"
      >
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
          />
        )}
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(24,119,242,0.18),transparent_60%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A0E17]/80 via-[#0A0E17]/70 to-[#0B1120]"
        />

        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center text-white">
          {/* Logo officiel en relief */}
          <div className="mb-6 h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-white/40 bg-slate-900 shadow-[0_10px_35px_rgba(24,119,242,0.3)] ring-4 ring-[#1877F2]/20 transition transform hover:scale-105">
            <img
              src={churchLogo}
              alt="Logo officiel S.I.P.E.C Siloam Kampala"
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* Badge Pilule de Titre */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-slate-100 shadow-md backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#1877F2] animate-pulse" />
            <span>S.I.P.E.C Siloam Kampala • Église Internationale</span>
          </div>

          {/* Titre Principal Structuré & Impactant */}
          <h1 className="mt-5 max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Bienvenue à la{' '}
            <span className="text-[#1877F2] drop-shadow-sm">S.I.P.E.C</span> SILOAM
          </h1>

          {/* Sous-titre Inspirant */}
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-normal">
            {meta.hero?.subtitle ||
              "Une famille chrétienne où la foi grandit, l'amour unit et l'espérance transforme les vies."}
          </p>

          {/* Boutons d'Action Principaux (Design System Facebook unifié) */}
          <div className="mt-8 flex w-full flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={meta.hero?.primaryButtonUrl || '#adresse'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1877F2] hover:bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MapPin className="h-4 w-4" />
              Nous rendre visite
            </a>
            <a
              href={meta.hero?.secondaryButtonUrl || '#predications'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Regarder en direct
            </a>
          </div>

          {/* 3 Badges Pilules Modernes & Bien Organisés */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-md shadow-xs transition hover:bg-white/15">
              <MapPin className="h-3.5 w-3.5 text-[#1877F2]" />
              <span>Kampala, Uganda</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-md shadow-xs transition hover:bg-white/15">
              <Calendar className="h-3.5 w-3.5 text-[#D4A017]" />
              <span>Culte chaque dimanche</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-md shadow-xs transition hover:bg-white/15">
              <HandHeart className="h-3.5 w-3.5 text-emerald-400" />
              <span>Tous sont les bienvenus</span>
            </div>
          </div>
        </div>

        {/* Défilement fluide vers le contenu */}
        <a
          href="#impact"
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white/60 transition hover:text-white"
          aria-label="Défiler vers Notre Impact"
        >
          <span>Découvrir</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </section>

      {/* SECTION 2 : S.I.P.E.C / NOTRE IMPACT (Badges Facebook 100% Dynamiques Supabase) */}
      <section
        id="impact"
        aria-labelledby="impact-title"
        className="scroll-mt-24 bg-[#F0F2F5] px-4 py-12 dark:bg-[#0B1120] sm:px-6 sm:py-16 lg:px-8 border-b border-slate-200/70 dark:border-slate-800/80"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1877F2]">
              S.I.P.E.C
            </p>
            <h2
              id="impact-title"
              className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Notre Impact
            </h2>
          </div>

          <div className="space-y-6">
            {impactBadges.map((badge) => (
              <FacebookPostCard
                key={badge.id}
                authorName={badge.author_name}
                authorAvatar={badge.author_avatar_url || undefined}
                metadata={badge.metadata_subtitle || undefined}
                content={badge.body_text}
                mediaUrl={badge.media_url || undefined}
                domain={badge.embed_domain || 'SILOAMKAMPALA.ORG'}
                cardTitle={badge.embed_title}
                cardSubtitle={badge.embed_subtitle || undefined}
                amenCount={badge.interaction_likes}
                commentsCount={badge.comment_count_simulated}
                actionLabel={badge.cta_button_text || 'En savoir plus'}
                actionHref={badge.cta_button_url || '#bios'}
                actionDetails={badge.cta_details_text || undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 : WEEKLY PROGRAMMES (Badges Facebook 100% Dynamiques Supabase) */}
      <section
        id="programmes"
        aria-labelledby="weekly-programs-title"
        className="border-b border-slate-200/70 bg-[#F0F2F5] px-4 py-12 dark:border-slate-800/80 dark:bg-[#0B1120] sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1877F2]">
              Horaires & Rendez-vous
            </p>
            <h2
              id="weekly-programs-title"
              className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              {t('programs.title')}
            </h2>
          </div>

          <div className="space-y-6">
            {weeklyBadges.map((badge) => (
              <FacebookPostCard
                key={badge.id}
                authorName={badge.author_name}
                authorAvatar={badge.author_avatar_url || undefined}
                metadata={badge.metadata_subtitle || undefined}
                content={badge.body_text}
                mediaUrl={badge.media_url || undefined}
                domain={badge.embed_domain || 'SILOAMKAMPALA.ORG'}
                cardTitle={badge.embed_title}
                cardSubtitle={badge.embed_subtitle || undefined}
                amenCount={badge.interaction_likes}
                commentsCount={badge.comment_count_simulated}
                actionLabel={badge.cta_button_text || 'Participer'}
                actionHref={badge.cta_button_url || '#adresse'}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
