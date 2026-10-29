import React, { useState } from 'react';
import { ArrowRight, Baby, CalendarDays, Flame, Music2, Users, Video, type LucideIcon } from 'lucide-react';
import type { DepartmentItem } from '../../types/churchSpa';

interface DepartmentsSpaProps {
  departments: DepartmentItem[];
}

const icons: Record<DepartmentItem['iconName'], LucideIcon> = {
  video: Video,
  music: Music2,
  users: Users,
  flame: Flame,
  baby: Baby,
};

const images = [
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce09?auto=format&fit=crop&w=2200&q=90',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=90',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=2000&q=90',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=90',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=90',
];

const badgeTheme = (id: string) => {
  if (id === 'dep-media') return 'border-cyan-300/40 bg-cyan-300/15 text-cyan-100';
  if (id === 'dep-youth') return 'border-orange-300/40 bg-orange-300/15 text-orange-100';
  if (id === 'dep-intercession') return 'border-amber-300/40 bg-amber-300/15 text-amber-100';
  if (id === 'dep-sunday-school') return 'border-emerald-300/40 bg-emerald-300/15 text-emerald-100';
  if (id === 'dep-men') return 'border-blue-300/40 bg-blue-300/15 text-blue-100';
  if (id === 'dep-women') return 'border-pink-300/40 bg-pink-300/15 text-pink-100';
  if (id === 'dep-protocol') return 'border-indigo-300/40 bg-indigo-300/15 text-indigo-100';
  if (id === 'dep-elders') return 'border-yellow-300/40 bg-yellow-300/15 text-yellow-100';
  return 'border-violet-300/40 bg-violet-300/15 text-violet-100';
};

export const DepartmentsSpa: React.FC<DepartmentsSpaProps> = ({ departments }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const byId = new Map(departments.map((department) => [department.id, department]));
  const media = byId.get('dep-media');
  const choirs = departments.filter((department) => ['dep-shekinah', 'dep-new-light', 'dep-angels', 'dep-central'].includes(department.id));
  const youth = byId.get('dep-youth');
  const intercession = byId.get('dep-intercession');
  const ministries = departments.filter((department) => ['dep-sunday-school', 'dep-men', 'dep-women', 'dep-support', 'dep-protocol', 'dep-elders'].includes(department.id));

  const Poster: React.FC<{ department: DepartmentItem; index: number; className?: string; feature?: boolean }> = ({ department, index, className = '', feature = false }) => {
    const Icon = icons[department.iconName];
    const isExpanded = expanded === department.id;
    return (
      <article className={`department-card group relative isolate min-h-[550px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_30px_100px_rgba(0,0,0,.42)] transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_38px_120px_rgba(14,165,233,.18)] ${feature ? 'lg:min-h-[760px]' : 'lg:min-h-[620px]'} ${className}`}>
        <img src={images[index]} alt={`Activité du département ${department.name}`} loading="lazy" className="absolute inset-0 -z-30 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.09]" />
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-950/30 via-transparent to-slate-950/10" />
        <div className="flex h-full min-h-[inherit] flex-col justify-end p-5 sm:p-7">
          <span className={`absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-xl sm:left-7 sm:top-7 ${badgeTheme(department.id)}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />{department.role}
          </span>
          <div className="rounded-[1.5rem] border border-white/15 bg-slate-950/45 p-5 shadow-2xl backdrop-blur-xl transition-all duration-700 group-hover:bg-slate-950/65 sm:p-7">
            <h3 className={`${feature ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'} font-black leading-tight tracking-[-0.035em] text-white`}>{department.name}</h3>
            {department.id === 'dep-youth' && <p className="mt-3 text-lg font-semibold text-orange-100">Former une génération qui influence le monde pour Christ.</p>}
            <p className={`mt-3 text-sm leading-7 text-slate-200 sm:text-base ${isExpanded ? '' : 'line-clamp-3'}`}>{department.description}</p>
            <div className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
              <p className="whitespace-pre-line text-xs leading-5 text-slate-100 sm:text-sm">{department.schedule}</p>
            </div>
            <button type="button" onClick={() => setExpanded(isExpanded ? null : department.id)} aria-expanded={isExpanded} className="mt-5 inline-flex translate-y-1 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-slate-950 shadow-xl transition-all duration-700 group-hover:translate-y-0 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100">
              {department.id === 'dep-youth' ? 'Rejoindre la jeunesse' : 'Découvrir'}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="departements" className="relative isolate scroll-mt-24 overflow-hidden border-y border-slate-800 bg-[#06111f] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[900px] bg-[radial-gradient(circle_at_12%_10%,rgba(14,165,233,.24),transparent_24%),radial-gradient(circle_at_88%_25%,rgba(245,158,11,.09),transparent_22%),linear-gradient(150deg,#071426,#06111f)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="mx-auto max-w-[90rem]">
        <header className="mb-10 flex items-center justify-center gap-5 sm:mb-14">
          <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/70 sm:w-20" />
          <div className="relative text-center">
            <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
            <h2 className="pb-3 text-2xl font-bold tracking-[0.08em] text-white sm:text-3xl">
              Nos départements
            </h2>
          </div>
          <span aria-hidden="true" className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/70 sm:w-20" />
        </header>

        {media && <Poster department={media} index={0} feature />}

        {choirs.length > 0 && (
          <section className="mt-24" aria-labelledby="choirs-title">
            <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-6">
              <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">La voix de la maison</p><h3 id="choirs-title" className="mt-2 text-4xl font-black tracking-tight text-white">Nos Chorales</h3></div>
              <span className="hidden text-sm text-slate-400 sm:block">4 expressions. Une même adoration.</span>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {choirs.map((department, localIndex) => <Poster key={department.id} department={department} index={localIndex + 1} />)}
            </div>
          </section>
        )}

        {(youth || intercession) && (
          <section className="mt-24 grid grid-cols-1 gap-5 lg:grid-cols-12" aria-label="Jeunesse et intercession">
            {youth && <Poster department={youth} index={5} feature className="lg:col-span-7" />}
            {intercession && <Poster department={intercession} index={6} feature className="lg:col-span-5" />}
          </section>
        )}

        {ministries.length > 0 && (
          <section className="mt-24" aria-labelledby="ministries-title">
            <div className="mb-8 border-b border-white/10 pb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Au cœur de la communauté</p><h3 id="ministries-title" className="mt-2 text-4xl font-black tracking-tight text-white">Ministères & Familles</h3></div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {ministries.map((department) => {
                const sourceIndex = departments.findIndex((item) => item.id === department.id);
                return <Poster key={department.id} department={department} index={sourceIndex} />;
              })}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};
