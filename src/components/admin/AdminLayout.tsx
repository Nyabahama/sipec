import React, { useState } from 'react';
import { BookOpen, CalendarDays, ChevronRight, GalleryHorizontalEnd, LayoutDashboard, LogOut, Menu, Radio, Settings, Building2, Users, X } from 'lucide-react';
import { signOutAdmin } from '../../services/adminService';

const links = [
  ['dashboard', 'Tableau de bord', LayoutDashboard], ['departments', 'Départements', Building2], ['gallery', 'Galerie', GalleryHorizontalEnd],
  ['sermons', 'Prédications', BookOpen], ['live', 'Live TV', Radio], ['events', 'Événements', CalendarDays], ['users', 'Utilisateurs', Users], ['settings', 'Paramètres', Settings],
] as const;

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const path = window.location.pathname;
  const logout = async () => { await signOutAdmin(); localStorage.removeItem('sipec_admin_session'); window.location.href = '/admin/login'; };
  return <div className="min-h-screen bg-[#f1f5f9] text-slate-800 dark:bg-[#0b1120] dark:text-slate-100">
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col bg-[#1e3a5f] text-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6"><a href="/" className="font-heading text-lg font-bold">S.I.P.E.C <span className="block text-[10px] font-medium tracking-[.24em] text-sky-300">ADMINISTRATION</span></a><button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fermer"><X /></button></div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map(([slug, label, Icon]) => <a key={slug} href={`/admin/${slug}`} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${path === `/admin/${slug}` ? 'bg-[#2a7de1] text-white shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><Icon className="h-5 w-5" /><span>{label}</span></a>)}
      </nav>
      <button onClick={logout} className="m-4 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"><LogOut className="h-5 w-5" /> Déconnexion</button>
    </aside>
    {open && <button aria-label="Fermer le menu" className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" onClick={() => setOpen(false)} />}
    <div className="lg:pl-[272px]">
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1120]/90 sm:px-8"><button className="rounded-xl border border-slate-200 p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Ouvrir le menu"><Menu /></button><div><p className="text-xs font-semibold text-slate-400">SILOAM INTERNATIONAL</p><p className="text-sm font-bold text-[#1e293b] dark:text-white">Centre de gestion</p></div><div className="grid h-10 w-10 place-items-center rounded-full bg-[#2a7de1] text-sm font-bold text-white">AS</div></header>
      <main className="mx-auto max-w-[1600px] p-5 sm:p-8">{children}</main>
    </div>
  </div>;
};

export const AdminPageHeader: React.FC<{ title: string; description?: string; action?: React.ReactNode }> = ({ title, description, action }) => <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-[.18em] text-[#2a7de1]">Administration <ChevronRight className="h-3 w-3" /></p><h1 className="font-heading text-3xl font-bold text-[#1e293b] dark:text-white sm:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{description}</p>}</div>{action}</div>;
