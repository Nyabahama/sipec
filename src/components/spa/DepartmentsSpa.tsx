import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { DepartmentItem } from '../../types/churchSpa';
import { FacebookPostCard } from './FacebookPostCard';

interface DepartmentsSpaProps {
  departments: DepartmentItem[];
}

export const DepartmentsSpa: React.FC<DepartmentsSpaProps> = ({ departments }) => {
  const defaultDepartments = [
    {
      id: 'dep-jeunesse',
      name: 'Jeunesse Siloam Émergence',
      category: 'jeunesse',
      role: 'Ministère des Jeunes',
      schedule: 'Samedi dès 15h00',
      description: 'Former une génération de disciples fervents, brillants dans leurs études et carrières, et enracinés dans l’Évangile de Christ.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'dep-chorale',
      name: 'Chorale Shekinah & Adoration',
      category: 'louange',
      role: 'Pôle Musical & Chant',
      schedule: 'Répétitions : Samedi 10h00',
      description: 'Conduire le peuple de Dieu dans une adoration prophétique et profonde, où les cœurs s’élèvent et les jougs se brisent.',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'dep-media',
      name: 'Département Médias & Diffusion',
      category: 'media',
      role: 'Diffusion Internationale',
      schedule: 'Actif 7j/7 & Cultes',
      description: 'Propulser l’Évangile aux extrémités de la terre par la vidéo HD, les podcasts, le son haute fidélité et les réseaux sociaux.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce09?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'dep-intercession',
      name: 'Chaîne d’Intercession & Prière',
      category: 'priere',
      role: 'Sentinelles Spirituelles',
      schedule: 'Vendredi 22h30 – Aube',
      description: 'Veiller jour et nuit pour l’Église, les serviteurs de Dieu, les familles de l’assemblée et le réveil en Ouganda.',
      image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'dep-ecole',
      name: 'École du Dimanche (Enfants)',
      category: 'enfants',
      role: 'Nouvelle Génération',
      schedule: 'Chaque Dimanche 08h30',
      description: 'Enseigner la Parole de Dieu aux enfants dès le plus jeune âge avec amour, créativité et des activités adaptées.',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'dep-social',
      name: 'Compassion & Entraide Familiale',
      category: 'social',
      role: 'Accompagnement Social',
      schedule: 'Permanence sur RDV',
      description: 'Secourir les veuves, soutenir les orphelins et entourer les familles vulnérables selon les préceptes du Seigneur.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const deptList =
    departments && departments.length > 0
      ? departments.map((d, i) => ({
          id: d.id,
          name: d.name,
          role: d.role,
          schedule: d.schedule,
          description: d.description,
          image: d.imageUrl || defaultDepartments[i % defaultDepartments.length].image,
        }))
      : defaultDepartments;

  return (
    <section id="departements" className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#1877F2] dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Servir le Seigneur
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Nos Départements & Ministères
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Chaque membre a un don à mettre au service du Corps de Christ.
          </p>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium text-sm shadow-sm transition self-start sm:self-auto"
        >
          <span>Rejoindre un ministère</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="space-y-6">
        {deptList.map((dept, index) => (
          <FacebookPostCard
            key={dept.id}
            authorName="S.I.P.E.C Siloam Kampala"
            metadata={`${dept.role} • Kampala`}
            content={dept.description}
            mediaUrl={dept.image}
            domain="SILOAMKAMPALA.ORG"
            cardTitle={dept.name}
            cardSubtitle={`Horaires : ${dept.schedule}`}
            amenCount={180 + index * 34}
            commentsCount={24 + index * 5}
            sharesCount={9 + index * 2}
            actionLabel="S’impliquer"
            actionHref="#contact"
          />
        ))}
      </div>
    </section>
  );
};
