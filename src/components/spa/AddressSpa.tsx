import React from 'react';
import { CalendarDays, Clock3, Radio } from 'lucide-react';
import type { ChurchMeta } from '../../types/churchSpa';
import { FacebookPostCard } from './FacebookPostCard';

interface AddressSpaProps {
  contact: ChurchMeta['contact'];
}

const services = [
  {
    day: 'Dimanche',
    time: '8h00 - 12h00',
    title: 'Culte Principal',
    icon: CalendarDays,
    description:
      'Le grand rassemblement dominical de toute la communauté S.I.P.E.C : louange vivante, adoration prophétique, proclamation puissante de la Parole de Dieu et ministère de prière pour les familles.',
    mediaUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
    likes: 640,
    comments: 82,
    shares: 45,
  },
  {
    day: 'Jeudi',
    time: '18h00 - 20h00',
    title: 'Étude Biblique',
    icon: Clock3,
    description:
      'Un rendez-vous hebdomadaire d’enseignement biblique et de sanctification pour approfondir la saine doctrine, méditer les Écritures et bâtir une foi chrétienne inébranlable.',
    mediaUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=85',
    likes: 380,
    comments: 44,
    shares: 21,
  },
  {
    day: 'Vendredi',
    time: '22h30 - Fin',
    title: 'Veillée de Prière',
    icon: Radio,
    description:
      'Une nuit d’intercession stratégique, de louange et de combat spirituel pour briser les liens, intercéder pour l’Église, les nations et voir la puissance divine se déployer.',
    mediaUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=85',
    likes: 510,
    comments: 67,
    shares: 39,
  },
];

const leaders = [
  {
    name: 'Pasteur Fondateur',
    role: 'Responsable principal',
    initials: 'PF',
    description:
      'Visionnaire et berger principal de la S.I.P.E.C Siloam Kampala, portant la vision apostolique selon Jean 9:7 et guidant le peuple de Dieu avec amour, vérité et autorité spirituelle.',
    mediaUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
    likes: 720,
    comments: 94,
    shares: 58,
  },
  {
    name: 'Responsable accueil',
    role: 'Bienvenue & visites',
    initials: 'RA',
    description:
      'Dédié à l’accueil chaleureux de chaque membre et visiteur, veillant à ce que chacun se sente aimé, attendu et intégré dès ses premiers pas à l’église Siloam.',
    mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
    likes: 390,
    comments: 48,
    shares: 22,
  },
  {
    name: 'Responsable jeunesse',
    role: 'Ministère des jeunes',
    initials: 'RJ',
    description:
      'Mobilise, encadre et inspire la nouvelle génération à vivre pleinement sa foi, développer ses talents et impacter son environnement avec l’Évangile de Jésus-Christ.',
    mediaUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
    likes: 460,
    comments: 57,
    shares: 31,
  },
  {
    name: 'Responsable intercession',
    role: 'Prières & veille',
    initials: 'RI',
    description:
      'Coordonne les sentinelles de la prière et les chaînes d’intercession continues pour soutenir spirituellement l’assemblée, les requêtes et les programmes d’évangélisation.',
    mediaUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
    likes: 430,
    comments: 53,
    shares: 27,
  },
];

export const AddressSpa: React.FC<AddressSpaProps> = () => {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Kirombe+Sambya+Kampala+Ouganda';

  return (
    <section id="adresse" className="overflow-hidden bg-[#F0F2F5] text-slate-900 dark:bg-[#0B1120] dark:text-white">
      {/* 1. Badge d'Accueil & Contact (Standardisé Facebook) */}
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="mb-6 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1877F2] shadow-sm dark:border-blue-900/60 dark:bg-slate-900 dark:text-blue-400">
            SIPEC vous accueille
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Nous Contacter
          </h2>
        </div>

        <FacebookPostCard
          authorName="S.I.P.E.C Siloam Kampala"
          metadata="SIPEC vous accueille • Kampala"
          content={`Nous serons heureux de vous accueillir, de répondre à vos questions et de prier avec vous.\n\n📍 Nous sommes à Kirombe / Sambya, Kampala, Ouganda.\n\nVenez célébrer avec nous chaque semaine ou contactez notre pastorale pour toute demande de prière.`}
          mediaUrl="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=85"
          mediaAlt="Sanctuaire SIPEC Kampala"
          domain="SILOAMKAMPALA.ORG"
          cardTitle="Nous Contacter — SIPEC vous accueille"
          cardSubtitle="Kirombe / Sambya, Kampala, Ouganda"
          amenCount={560}
          commentsCount={64}
          sharesCount={38}
          actionLabel="Planifier une visite"
          actionHref={mapsUrl}
        />
      </div>

      {/* 2. Section Horaires des cultes (Badges Facebook standardisés) */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1877F2]">
            Rendez-vous spirituels
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Horaires des cultes
          </h2>
        </div>

        <div className="space-y-6">
          {services.map((service) => (
            <FacebookPostCard
              key={service.day}
              authorName="S.I.P.E.C Siloam Kampala"
              metadata={`${service.day} • ${service.time}`}
              content={service.description}
              mediaUrl={service.mediaUrl}
              domain="SILOAMKAMPALA.ORG"
              cardTitle={`${service.title} — ${service.day}`}
              cardSubtitle={`Horaire officiel : ${service.time}`}
              amenCount={service.likes}
              commentsCount={service.comments}
              sharesCount={service.shares}
              actionLabel="Planifier une visite"
              actionHref={mapsUrl}
            />
          ))}
        </div>
      </div>

      {/* 3. Section Notre équipe / Responsables SIPEC (Badges Facebook standardisés) */}
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1877F2]">
            Notre équipe
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Responsables SIPEC
          </h2>
        </div>

        <div className="space-y-6">
          {leaders.map((leader) => (
            <FacebookPostCard
              key={leader.name}
              authorName={leader.name}
              metadata={`${leader.role} • Responsables SIPEC`}
              content={leader.description}
              mediaUrl={leader.mediaUrl}
              domain="SILOAMKAMPALA.ORG"
              cardTitle={leader.name}
              cardSubtitle={leader.role}
              amenCount={leader.likes}
              commentsCount={leader.comments}
              sharesCount={leader.shares}
              actionLabel="Contacter"
              actionHref="mailto:contact@sipec-church.org"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
