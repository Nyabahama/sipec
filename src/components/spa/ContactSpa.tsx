import React, { useState } from 'react';
import { Send, HeartHandshake, Mail, Globe, MoreHorizontal, X, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import churchLogo from '../../assets/siloam.jpeg';

export const ContactSpa: React.FC = () => {
  const [prayerLikes, setPrayerLikes] = useState(380);
  const [hasLikedPrayer, setHasLikedPrayer] = useState(false);
  const [contactLikes, setContactLikes] = useState(290);
  const [hasLikedContact, setHasLikedContact] = useState(false);

  const submitPrayer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get('prayerName') || '');
    const phone = String(form.get('prayerPhone') || '');
    const subject = String(form.get('prayerSubject') || '');
    const messageText = String(form.get('prayerMessage') || '');

    const { supabase } = await import('../../lib/supabase');
    const hasSupabase = Boolean(
      import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('mock-sipec')
    );
    if (hasSupabase) {
      try {
        await supabase.from('prayer_requests').insert({
          full_name: fullName,
          email_or_phone: phone,
          request_text: `[${subject}] ${messageText}`,
          is_urgent: false,
          is_private: true,
          status: 'pending',
        });
      } catch (err) {
        console.warn('Erreur enregistrement intention de prière Supabase:', err);
      }
    }

    const message = [
      'Bonjour SIPEC, je souhaite soumettre une demande de prière.',
      `Nom : ${fullName}`,
      `Téléphone : ${phone}`,
      `Sujet : ${subject}`,
      `Message : ${messageText}`,
    ].join('\n');
    window.open(`https://wa.me/256700000000?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    event.currentTarget.reset();
  };

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Votre message a bien été envoyé à l’équipe pastorale de la S.I.P.E.C Siloam Kampala.');
    event.currentTarget.reset();
  };

  const field =
    'mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F0F2F5] px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:border-[#1877F2] focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900';

  return (
    <section id="contact" className="bg-[#F0F2F5] py-12 dark:bg-[#0B1120] sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1877F2] shadow-sm dark:border-blue-900/60 dark:bg-slate-900 dark:text-blue-400">
            Formulaires & Requêtes
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contact & Intercession
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Une équipe pastorale et des sentinelles de la prière sont à votre écoute.
          </p>
        </div>

        <div className="space-y-8">
          {/* BADGE 1 : FORMULAIRE DE PRIÈRE */}
          <article
            id="priere"
            className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition hover:shadow-md"
          >
            {/* Header Facebook */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src={churchLogo}
                  alt="S.I.P.E.C Siloam Kampala"
                  className="w-10 h-10 rounded-full object-cover object-top ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-base text-[#1E3A5F] dark:text-white leading-tight">
                      S.I.P.E.C Siloam Kampala
                    </span>
                    <svg className="w-4 h-4 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                    <span>Nous prions pour vous • Intercession</span>
                    <span>•</span>
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body Facebook */}
            <div className="px-4 pb-3">
              <p className="text-slate-900 dark:text-slate-100 text-base leading-relaxed">
                Confiez-nous votre besoin. Une personne de notre équipe recevra votre demande avec attention et confidentialité.
              </p>
            </div>

            {/* Zone Formulaire encadrée */}
            <div className="border-t border-slate-100 dark:border-slate-800 p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40">
              <form onSubmit={submitPrayer} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Nom
                    </label>
                    <input required name="prayerName" className={field} placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Téléphone
                    </label>
                    <input required name="prayerPhone" className={field} placeholder="Votre numéro" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Sujet de prière
                  </label>
                  <input required name="prayerSubject" className={field} placeholder="Ex. Santé, famille, direction..." />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    required
                    name="prayerMessage"
                    rows={3}
                    className={`${field} resize-none`}
                    placeholder="Partagez votre besoin..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1877F2] hover:bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition shadow-sm"
                >
                  <Send size={16} /> Envoyer ma demande
                </button>
              </form>
            </div>

            {/* Sous-bloc d'information style Radio Okapi */}
            <div className="bg-[#F0F2F5] dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/80 p-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="text-xs uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400 block truncate">
                  SILOAMKAMPALA.ORG
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                  Besoin de Prière ? — Intercession SIPEC
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                  Chaîne d’intercession et suivi pastoral continu
                </p>
              </div>
              <div className="shrink-0 p-2 text-slate-400">
                <HeartHandshake className="w-5 h-5 text-[#1877F2]" />
              </div>
            </div>

            {/* Footer Facebook */}
            <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#1877F2] grid place-items-center text-white text-[9px]">
                  👍
                </span>
                <span className="font-medium">{prayerLikes}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>42 intercessions partagées</span>
                <span>19 témoignages</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setHasLikedPrayer(!hasLikedPrayer);
                    setPrayerLikes(hasLikedPrayer ? prayerLikes - 1 : prayerLikes + 1);
                  }}
                  className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition ${
                    hasLikedPrayer
                      ? 'text-[#1877F2] bg-blue-50 dark:bg-blue-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasLikedPrayer ? 'fill-current' : ''}`} />
                  <span>Amen</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Une équipe de veille spirituelle intercède pour chaque intention déposée.')}
                  className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Prier</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) navigator.share({ title: 'Besoin de Prière ?', url: window.location.href });
                  }}
                  className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Partager</span>
                </button>
              </div>
              <span className="text-xs font-semibold text-[#1877F2]">Confidentiel</span>
            </div>
          </article>

          {/* BADGE 2 : FORMULAIRE NOUS ÉCRIRE */}
          <article className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition hover:shadow-md">
            {/* Header Facebook */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src={churchLogo}
                  alt="S.I.P.E.C Siloam Kampala"
                  className="w-10 h-10 rounded-full object-cover object-top ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-base text-[#1E3A5F] dark:text-white leading-tight">
                      S.I.P.E.C Siloam Kampala
                    </span>
                    <svg className="w-4 h-4 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                    <span>Écrivez-nous • Secrétariat pastoral</span>
                    <span>•</span>
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body Facebook */}
            <div className="px-4 pb-3">
              <p className="text-slate-900 dark:text-slate-100 text-base leading-relaxed">
                Une question, une invitation ou une demande particulière ? Notre équipe vous répondra rapidement.
              </p>
            </div>

            {/* Zone Formulaire encadrée */}
            <div className="border-t border-slate-100 dark:border-slate-800 p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40">
              <form onSubmit={submitContact} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Nom
                    </label>
                    <input required className={field} placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Email
                    </label>
                    <input required type="email" className={field} placeholder="vous@email.com" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Téléphone
                    </label>
                    <input className={field} placeholder="Votre numéro" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Sujet
                    </label>
                    <input required className={field} placeholder="Objet du message" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className={`${field} resize-none`}
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1877F2] hover:bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition shadow-sm sm:w-auto"
                >
                  <Send size={16} /> Envoyer
                </button>
              </form>
            </div>

            {/* Sous-bloc d'information style Radio Okapi */}
            <div className="bg-[#F0F2F5] dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/80 p-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="text-xs uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400 block truncate">
                  SILOAMKAMPALA.ORG
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                  Nous écrire — S.I.P.E.C Siloam Kampala
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                  Kirombe / Sambya, Kampala, Ouganda • Réponse rapide
                </p>
              </div>
              <div className="shrink-0 p-2 text-slate-400">
                <Mail className="w-5 h-5 text-[#1877F2]" />
              </div>
            </div>

            {/* Footer Facebook */}
            <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#1877F2] grid place-items-center text-white text-[9px]">
                  👍
                </span>
                <span className="font-medium">{contactLikes}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Secrétariat ouvert 7j/7</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setHasLikedContact(!hasLikedContact);
                    setContactLikes(hasLikedContact ? contactLikes - 1 : contactLikes + 1);
                  }}
                  className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition ${
                    hasLikedContact
                      ? 'text-[#1877F2] bg-blue-50 dark:bg-blue-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasLikedContact ? 'fill-current' : ''}`} />
                  <span>J’aime</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Pour un contact direct, écrivez à contact@sipec-church.org')}
                  className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Commenter</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) navigator.share({ title: 'Nous écrire', url: window.location.href });
                  }}
                  className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Partager</span>
                </button>
              </div>
              <a
                href="mailto:contact@sipec-church.org"
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-white bg-[#1877F2] hover:bg-blue-600 font-medium text-sm transition shadow-sm"
              >
                Écrire
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
