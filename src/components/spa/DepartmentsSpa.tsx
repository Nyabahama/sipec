import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { DepartmentItem } from '../../types/churchSpa';
import { FacebookPostCard } from './FacebookPostCard';

interface DepartmentsSpaProps {
  departments: DepartmentItem[];
}

export const DepartmentsSpa: React.FC<DepartmentsSpaProps> = ({ departments }) => {
  const deptList = departments.map((department) => ({
    id: department.id,
    name: department.name,
    role: department.role,
    schedule: department.schedule,
    description: department.description,
    image: department.imageUrl || '',
  }));

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
