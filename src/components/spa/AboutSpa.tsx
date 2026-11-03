import React from 'react';
import { FacebookPostCard } from './FacebookPostCard';

interface AboutSpaProps {
  about: {
    history: string;
    mission: string;
    vision: string;
  };
}

export const AboutSpa: React.FC<AboutSpaProps> = ({ about }) => {
  const pillars = [
    {
      title: 'Notre Histoire & Origine',
      badge: 'Depuis la Fondation',
      metric: 'Un Appel Apostolique Confirmé',
      description:
        about.history ||
        'Née de l’obéissance à la vision donnée au Pasteur Fondateur, l’église S.I.P.E.C s’est déployée pour proclamer le salut en Jésus-Christ et former des disciples affermis dans la saine doctrine.',
      mediaUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
      href: '#bios',
      likes: 245,
      comments: 32,
      shares: 14,
    },
    {
      title: 'Notre Mission',
      badge: 'Évangélisation & Amour',
      metric: 'Bâtir des Vies Solides',
      description:
        about.mission ||
        'Proclamer l’Évangile intégral, manifester l’amour chrétien par des actions concrètes envers les familles et préparer l’Église au retour glorieux de notre Seigneur.',
      mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
      href: '#services',
      likes: 310,
      comments: 48,
      shares: 21,
    },
    {
      title: 'Notre Vision',
      badge: 'Nations & Gloire',
      metric: 'Rayonner depuis Kampala',
      description:
        about.vision ||
        'Être un phare spirituel à Kampala et pour les nations, où les aveugles spirituels recouvrent la vue selon Jean 9:7 et où les captifs sont délivrés par la puissance du Saint-Esprit.',
      mediaUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=85',
      href: '#departements',
      likes: 420,
      comments: 56,
      shares: 38,
    },
  ];

  return (
    <section id="a-propos" className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          À Propos de la S.I.P.E.C
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Une communauté apostolique fondée sur la vérité biblique, la communion fraternelle et l'intercession.
        </p>
      </div>

      <div className="space-y-6">
        {pillars.map((item) => (
          <FacebookPostCard
            key={item.title}
            authorName="S.I.P.E.C Siloam Kampala"
            metadata={`${item.badge} • Kampala`}
            content={item.description}
            mediaUrl={item.mediaUrl}
            domain="SILOAMKAMPALA.ORG"
            cardTitle={item.title}
            cardSubtitle={item.metric}
            amenCount={item.likes}
            commentsCount={item.comments}
            sharesCount={item.shares}
            actionLabel="En savoir plus"
            actionHref={item.href}
          />
        ))}
      </div>
    </section>
  );
};
