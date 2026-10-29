import React from 'react';
import { HeartHandshake, Mail, Send } from 'lucide-react';

export const ContactSpa: React.FC = () => {
 const submitPrayer=(event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
   'Bonjour SIPEC, je souhaite soumettre une demande de prière.',
   `Nom : ${form.get('prayerName') || ''}`,
   `Téléphone : ${form.get('prayerPhone') || ''}`,
   `Sujet : ${form.get('prayerSubject') || ''}`,
   `Message : ${form.get('prayerMessage') || ''}`,
  ].join('\n');
  window.open(`https://wa.me/243812345678?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  event.currentTarget.reset();
 };
 const submitContact=(event:React.FormEvent<HTMLFormElement>)=>{event.preventDefault();};
 const field='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/[.04]';
 return <section id="contact" className="bg-white dark:bg-[#080b12]">
  <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
   <div className="grid gap-6 lg:grid-cols-2">
    <section id="priere" className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950 p-7 text-white shadow-2xl sm:p-10"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl"/><div className="relative"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15"><HeartHandshake/></div><p className="mt-7 text-xs font-bold uppercase tracking-[.22em] text-sky-300">Nous prions pour vous</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Besoin de Prière ?</h2><p className="mt-4 max-w-md leading-7 text-slate-300">Confiez-nous votre besoin. Une personne de notre équipe recevra votre demande avec attention et confidentialité.</p><form onSubmit={submitPrayer} className="mt-8 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm text-slate-300">Nom</label><input required name="prayerName" className={field+" dark:text-white"} placeholder="Votre nom"/></div><div><label className="text-sm text-slate-300">Téléphone</label><input required name="prayerPhone" className={field+" dark:text-white"} placeholder="Votre numéro"/></div></div><div><label className="text-sm text-slate-300">Sujet de prière</label><input required name="prayerSubject" className={field+" dark:text-white"} placeholder="Ex. Santé, famille, direction..."/></div><div><label className="text-sm text-slate-300">Message</label><textarea required name="prayerMessage" rows={4} className={field+" resize-none dark:text-white"} placeholder="Partagez votre besoin..."/></div><button className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-slate-950"><Send size={17}/> Envoyer ma demande</button></form>
     </div></section>
    <section className="rounded-[32px] border border-slate-200 bg-[#f8fafc] p-7 shadow-sm dark:border-white/[.08] dark:bg-white/[.03] sm:p-10"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-500 text-white shadow-lg"><Mail/></div><p className="mt-7 text-xs font-bold uppercase tracking-[.22em] text-sky-600 dark:text-sky-400">Écrivez-nous</p><h2 className="mt-3 text-3xl font-bold dark:text-white">Nous écrire</h2><p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">Une question, une invitation ou une demande particulière ? Notre équipe vous répondra rapidement.</p><form onSubmit={submitContact} className="mt-8 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm font-medium dark:text-slate-300">Nom</label><input required className={field} placeholder="Votre nom"/></div><div><label className="text-sm font-medium dark:text-slate-300">Email</label><input required type="email" className={field} placeholder="vous@email.com"/></div></div><div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm font-medium dark:text-slate-300">Téléphone</label><input className={field} placeholder="Votre numéro"/></div><div><label className="text-sm font-medium dark:text-slate-300">Sujet</label><input required className={field} placeholder="Objet du message"/></div></div><div><label className="text-sm font-medium dark:text-slate-300">Message</label><textarea required rows={5} className={field+" resize-none"} placeholder="Comment pouvons-nous vous aider ?"/></div><button className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-sky-600 sm:w-auto"><Send size={17}/> Envoyer</button></form></section>
   </div>
  </div>
 </section>;
};