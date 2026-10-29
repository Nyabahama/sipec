import React from 'react';
import { CalendarDays, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import type { ChurchMeta } from '../../types/churchSpa';
import churchLogo from '../../assets/siloam.jpeg';

interface FooterSpaProps { meta: ChurchMeta; }

const SocialIcon: React.FC<{ name: 'facebook' | 'youtube' | 'instagram' | 'tiktok' | 'whatsapp' | 'x' }> = ({ name }) => {
  if (name === 'facebook') return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#1877F2]" aria-hidden="true"><path d="M13.7 22v-9h3l.5-3.5h-3.5V7.2c0-1 .3-1.7 1.8-1.7H17V2.3c-.3 0-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8V9.5H6.4V13h3.1v9h4.2Z"/></svg>;
  if (name === 'youtube') return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="#FF0000" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"/><path fill="#fff" d="m9.6 15.6 6.3-3.6-6.3-3.6v7.2Z"/></svg>;
  if (name === 'instagram') return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><defs><linearGradient id="instagramGradient" x1="2" y1="22" x2="22" y2="2"><stop stopColor="#FFDC80"/><stop offset=".45" stopColor="#FD1D1D"/><stop offset=".75" stopColor="#C13584"/><stop offset="1" stopColor="#833AB4"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#instagramGradient)"/><circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/></svg>;
  if (name === 'tiktok') return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="#25F4EE" d="M14 3h2.7a4.5 4.5 0 0 0 3.3 3.3V9a7.3 7.3 0 0 1-3.3-.9V15a6 6 0 1 1-5-5.9v3a3 3 0 1 0 2.3 3V3Z"/><path fill="#FE2C55" d="M13.5 2.5h2.7a4.5 4.5 0 0 0 3.3 3.3v2.5a7.3 7.3 0 0 1-3.3-.9v6.6a6 6 0 1 1-5-5.9v3a3 3 0 1 0 2.3 3V2.5Z"/><path fill="#fff" d="M13.7 2.8h2.5a4.5 4.5 0 0 0 3.3 3.3v2.5a7.3 7.3 0 0 1-3.3-.9v6.3a6 6 0 1 1-5-5.9v2.9a3 3 0 1 0 2.5 3V2.8Z"/></svg>;
  if (name === 'whatsapp') return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]" aria-hidden="true"><path d="M20.5 3.5A11.6 11.6 0 0 0 12.1 0C5.7 0 .5 5.2.5 11.6c0 2.1.5 4 1.5 5.7L.4 23l5.8-1.5a11.5 11.5 0 0 0 5.9 1.6h.1c6.4 0 11.6-5.2 11.6-11.6a11.5 11.5 0 0 0-3.3-8Zm-8.4 18h-.1a9.6 9.6 0 0 1-4.9-1.4l-.4-.2-3.5.9.9-3.4-.2-.4a9.5 9.5 0 0 1-1.5-5.2A9.7 9.7 0 0 1 12 2.5a9.5 9.5 0 0 1 6.9 2.9A9.7 9.7 0 0 1 21.7 12c0 5.3-4.3 9.6-9.6 9.6Zm5.3-7.2c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1-.2.2-.4.2-.7.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.7 1 3.6.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4Z"/></svg>;
  return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true"><path d="M18.2 2H21l-6.2 7.1L22 22h-5.8l-4.5-5.9L6.3 22H3.5l6.6-7.6L2 2h6l4.1 5.4L18.2 2Zm-1 17.8h1.5L7 4h-1.7l11.9 15.8Z"/></svg>;
};

const navigation = [
  ['Accueil', 'bienvenue'], ['À propos', 'a-propos'], ['Fondateur', 'fondateur'],
  ['Départements', 'departements'], ['Galerie', 'galerie'], ['Prédications', 'predications'], ['Contact', 'contact'],
];

export const FooterSpa: React.FC<FooterSpaProps> = ({ meta }) => {
  const schedule = [
    { day: 'Dimanche', time: '08h00 - 12h00', icon: CalendarDays },
    { day: 'Jeudi', time: '18h00 - 20h00', icon: CalendarDays },
    { day: 'Vendredi', time: '22h30', icon: CalendarDays },
  ];

  return <footer className="relative overflow-hidden bg-[#07101d] text-slate-400">
    <div className="absolute inset-0 opacity-[.025] [background-image:radial-gradient(rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:24px_24px]" />
    <div className="relative mx-auto max-w-[1500px] px-5 pt-10 sm:px-8">
      <div className="grid gap-8 border-b border-white/[.07] pb-9 md:grid-cols-2 lg:grid-cols-[1.1fr_.8fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3"><img src={churchLogo} alt="SIPEC" className="h-12 w-12 rounded-xl object-cover"/><div><p className="text-sm font-bold tracking-[.16em] text-white">S.I.P.E.C</p><p className="mt-1 max-w-[240px] text-[11px] leading-4 text-slate-500">{meta.name}</p></div></div>
          <p className="mt-4 max-w-xs text-xs leading-5 text-slate-500">Une famille chrétienne engagée à proclamer Jésus-Christ et former des disciples.</p>
        </div>

        <div><h3 className="text-xs font-bold uppercase tracking-[.18em] text-white">Navigation</h3><nav className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">{navigation.map(([label, id]) => <a key={id} href={`#${id}`} className="group flex items-center text-xs transition hover:text-sky-300"><ChevronRight size={13} className="mr-1 text-slate-600 group-hover:text-sky-400"/> {label}</a>)}</nav></div>

        <div><h3 className="text-xs font-bold uppercase tracking-[.18em] text-white">Horaires</h3><div className="mt-4 space-y-2">{schedule.map(({ day, time }) => <div key={day} className="flex items-center justify-between gap-3 border-b border-white/[.05] pb-2 text-xs last:border-0"><span className="text-slate-300">{day}</span><span className="text-sky-300">{time}</span></div>)}</div></div>

        <div><h3 className="text-xs font-bold uppercase tracking-[.18em] text-white">Contact rapide</h3><div className="mt-4 space-y-3"><a href={`tel:${meta.contact.phone}`} className="flex items-center gap-2 text-xs hover:text-white"><Phone size={15} className="text-sky-400"/><span>{meta.contact.phone}</span></a><a href="https://wa.me/243812345678" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs hover:text-white"><Phone size={15} className="text-emerald-400"/><span>WhatsApp</span></a><a href={`mailto:${meta.contact.email}`} className="flex items-center gap-2 text-xs hover:text-white"><Mail size={15} className="text-sky-400"/><span>{meta.contact.email}</span></a><a href="#adresse" className="flex items-center gap-2 text-xs hover:text-white"><MapPin size={15} className="text-sky-400"/><span>Adresse & itinéraire</span></a></div></div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-b border-white/[.07] py-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a href="https://www.google.com/maps/search/?api=1&query=Kirombe+Sambya+Kampala+Ouganda" target="_blank" rel="noreferrer" className="mx-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-950"><MapPin size={14}/> Planifier une visite</a>
          <span className="mr-1 hidden text-xs text-slate-500 sm:inline">Suivez SIPEC</span>
          <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-white/[.08] bg-white/[.04] transition hover:-translate-y-1 hover:border-[#1877F2]/60"><SocialIcon name="facebook"/></a>
          <a href="#predications" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border border-white/[.08] bg-white/[.04] transition hover:-translate-y-1 hover:border-red-500/60"><SocialIcon name="youtube"/></a>
          <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/[.08] bg-white/[.04] transition hover:-translate-y-1 hover:border-pink-400/60"><SocialIcon name="instagram"/></a>
          <a href="#" aria-label="TikTok" className="grid h-9 w-9 place-items-center rounded-full border border-white/[.08] bg-white/[.04] transition hover:-translate-y-1 hover:border-cyan-300/60"><SocialIcon name="tiktok"/></a>
          <a href="https://wa.me/243812345678" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-white/[.08] bg-white/[.04] transition hover:-translate-y-1 hover:border-emerald-400/60"><SocialIcon name="whatsapp"/></a>
          <a href="#" aria-label="X" className="grid h-9 w-9 place-items-center rounded-full border border-white/[.08] bg-white/[.04] transition hover:-translate-y-1 hover:border-white/50"><SocialIcon name="x"/></a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 py-5 text-center text-[11px] text-slate-600 sm:flex-row sm:text-left"><p>© 2026 {meta.acronym}. Tous droits réservés.</p><p>Développé pour la gloire de Dieu ✝️</p><div className="flex gap-4"><a href="#" className="hover:text-slate-300">Confidentialité</a><a href="#" className="hover:text-slate-300">Mentions légales</a></div></div>
    </div>
  </footer>;
};