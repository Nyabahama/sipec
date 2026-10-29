import React from 'react';
import type { ChurchDepartment } from '../../types/church';

interface DepartmentsSectionProps {
  departments: ChurchDepartment[];
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({ departments }) => {
  return (
    <section id="departments" className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-5xl mx-auto">
        {/* Titre de Section Épuré */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-sky-600 font-medium">
            Départements
          </span>
          <h2 className="mt-2 text-3xl font-light text-slate-900 tracking-tight">
            Services & Ministères
          </h2>
        </div>

        {/* Grille Dynamique Épurée */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-sky-300 transition flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-sky-600">
                  {dept.badge}
                </span>
                <h3 className="mt-2 text-base font-normal text-slate-900">
                  {dept.name}
                </h3>
                {dept.subName && (
                  <p className="text-xs font-light text-slate-500 mt-0.5">
                    {dept.subName}
                  </p>
                )}
                <p className="mt-3 text-xs font-light text-slate-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-light text-slate-400">
                <span>{dept.meetingSchedule}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
