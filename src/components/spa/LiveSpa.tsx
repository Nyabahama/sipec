import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  Camera,
  ExternalLink,
  LayoutDashboard,
  Play,
  Radio,
  Settings2,
  Tv,
  Users,
} from 'lucide-react';
import type { LiveStream } from '../../types/churchSpa';
import { FacebookPostCard } from './FacebookPostCard';

interface LiveSpaProps {
  streams: LiveStream[];
}

const platformLinks = (stream: LiveStream) => [
  { name: 'YouTube', url: stream.youtubeUrl, icon: Tv, color: 'bg-[#ff0033]', hover: 'hover:bg-[#e6002e]' },
  { name: 'Facebook', url: stream.facebookUrl, icon: Users, color: 'bg-[#1877f2]', hover: 'hover:bg-[#0d65d9]' },
  { name: 'TikTok', url: stream.tiktokUrl, icon: Radio, color: 'bg-black dark:bg-white dark:text-black', hover: 'hover:opacity-80' },
  {
    name: 'Instagram',
    url: stream.instagramUrl,
    icon: Camera,
    color: 'bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
    hover: 'hover:brightness-110',
  },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

export const LiveSpa: React.FC<LiveSpaProps> = ({ streams }) => {
  const liveStream = streams.find((stream) => stream.status === 'live') ?? streams[0];
  const upcoming = streams.filter((stream) => stream.status === 'offline');
  const replays = streams.filter((stream) => stream.status === 'replay');
  const [adminOpen, setAdminOpen] = useState(false);
  const [streamState, setStreamState] = useState(liveStream?.status ?? 'offline');
  const [simulatedViewers, setSimulatedViewers] = useState(liveStream?.viewers ?? 1250);
  const statusLabel = useMemo(
    () => (streamState === 'live' ? 'EN DIRECT' : streamState === 'replay' ? 'REDIFFUSION' : 'HORS LIGNE'),
    [streamState]
  );

  if (!liveStream) return null;

  return (
    <section id="live" className="scroll-mt-20 overflow-hidden border-b border-slate-200/70 bg-[#F0F2F5] px-4 py-12 dark:border-white/5 dark:bg-[#0B1120] sm:px-6 sm:py-16 lg:px-8 text-slate-900 dark:text-white">
      <div className="mx-auto max-w-3xl">
        {/* En-tête de section */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1877F2] shadow-sm dark:border-blue-900/60 dark:bg-slate-900 dark:text-blue-400">
              <Radio className="h-3.5 w-3.5" />
              SIPEC Media
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Live &amp; Rediffusions SIPEC
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              La Parole, la louange et la communion en direct, depuis le sanctuaire jusqu’à votre foyer.
            </p>
          </div>

          <button
            onClick={() => setAdminOpen((open) => !open)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <LayoutDashboard className="h-3.5 w-3.5" /> Administration du live
          </button>
        </header>

        {/* Console d'Administration (Optionnelle) */}
        {adminOpen && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
              <Settings2 className="h-5 w-5 text-[#1877F2]" />
              <div>
                <h3 className="font-bold text-sm">Console de diffusion</h3>
                <p className="text-xs text-slate-500">Simulation locale · prêt pour OBS, Restream et API SIPEC</p>
              </div>
            </div>
            <div className="grid gap-4 pt-4 md:grid-cols-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                État de la diffusion
                <select
                  value={streamState}
                  onChange={(event) => setStreamState(event.target.value as typeof streamState)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="live">En direct</option>
                  <option value="offline">Hors ligne</option>
                  <option value="replay">Rediffusion</option>
                </select>
              </label>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Audience simulée
                <input
                  type="number"
                  value={simulatedViewers}
                  onChange={(event) => setSimulatedViewers(Number(event.target.value))}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                />
              </label>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Plateformes connectées
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-300">YouTube</span>
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">Facebook</span>
                  <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">TikTok</span>
                  <span className="rounded-full bg-pink-100 px-2.5 py-1 text-[11px] font-bold text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">Instagram</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. BADGE FACEBOOK PRINCIPAL : LE LIVE STREAMING */}
        <div className="mb-8">
          <FacebookPostCard
            authorName="S.I.P.E.C Siloam Kampala"
            metadata={`${streamState === 'live' ? '🔴 EN DIRECT' : statusLabel} • ${simulatedViewers.toLocaleString('fr-FR')} spectateurs`}
            content={`${liveStream.title}\n\n${liveStream.description}\n\nRejoignez la grande assemblée réunie en communion fraternelle. Proclamez vos prières et suivez nos temps d'édification en direct.`}
            mediaNode={
              <div className="group relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                {streamState === 'live' ? (
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube-nocookie.com/embed?controls=1&modestbranding=1&rel=0"
                    title="Lecteur SIPEC Live"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={liveStream.thumbnail} alt="" className="h-full w-full object-cover opacity-75" />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-slate-900 shadow-2xl transition group-hover:scale-110">
                        <Play fill="currentColor" className="ml-1 h-7 w-7" />
                      </span>
                    </div>
                  </>
                )}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      streamState === 'live' ? 'animate-pulse bg-red-500' : 'bg-slate-400'
                    }`}
                  />
                  {statusLabel}
                </div>
              </div>
            }
            domain="SILOAMKAMPALA.ORG"
            cardTitle={liveStream.title}
            cardSubtitle={`Multi-diffusion : YouTube, Facebook, TikTok & Instagram`}
            amenCount={940}
            commentsCount={182}
            sharesCount={74}
            actionLabel="Suivre le Live"
            actionHref={liveStream.youtubeUrl || '#'}
          />
        </div>

        {/* Canaux de Diffusion Externes (Badges Pills) */}
        <div className="mb-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Regarder aussi sur nos plateformes officielles
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {platformLinks(liveStream).map(({ name, url, icon: Icon, color, hover }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold text-white transition ${color} ${hover}`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {name}
                </span>
                <ExternalLink className="h-3 w-3 opacity-80" />
              </a>
            ))}
          </div>
        </div>

        {/* 2. PROCHAINES DIFFUSIONS (Badges Facebook) */}
        {upcoming.length > 0 && (
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">
                  Agenda Médias
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Prochaines diffusions
                </h3>
              </div>
              <CalendarDays className="h-5 w-5 text-[#1877F2]" />
            </div>

            <div className="space-y-6">
              {upcoming.map((stream) => (
                <FacebookPostCard
                  key={stream.id}
                  authorName="S.I.P.E.C Siloam Kampala"
                  metadata={`À venir • ${formatDate(stream.startTime)}`}
                  content={`${stream.description}\n\nDéfinissez un rappel pour ne rien manquer de ce culte en direct.`}
                  mediaUrl={stream.thumbnail}
                  domain="SILOAMKAMPALA.ORG"
                  cardTitle={stream.title}
                  cardSubtitle={formatDate(stream.startTime)}
                  amenCount={320}
                  commentsCount={34}
                  sharesCount={18}
                  actionLabel="Ajouter un rappel"
                  onActionClick={() => alert(`Rappel activé pour : ${stream.title}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. DERNIÈRES REDIFFUSIONS (Badges Facebook) */}
        {replays.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">
                Archives Vidéo
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Dernières rediffusions
              </h3>
            </div>

            <div className="space-y-6">
              {replays.map((stream) => (
                <FacebookPostCard
                  key={stream.id}
                  authorName="S.I.P.E.C Siloam Kampala"
                  metadata={`Rediffusion • ${formatDate(stream.startTime)}`}
                  content={`${stream.title}\n\nRevivez ce moment d'adoration, de visitation divine et de parole puissante.`}
                  mediaNode={
                    <div className="group relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                      <img src={stream.thumbnail} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition" />
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-slate-900 shadow-xl transition group-hover:scale-110">
                        <Play fill="currentColor" className="ml-1 h-6 w-6" />
                      </span>
                      <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-bold text-white">
                        2 h 04
                      </span>
                    </div>
                  }
                  domain="SILOAMKAMPALA.ORG"
                  cardTitle={stream.title}
                  cardSubtitle={formatDate(stream.startTime)}
                  amenCount={460}
                  commentsCount={58}
                  sharesCount={29}
                  actionLabel="Revoir"
                  actionHref={stream.youtubeUrl || '#'}
                />
              ))}
            </div>
          </div>
        )}

        {/* 4. COMMUNAUTÉ SIPEC / MESSAGES POPULAIRES */}
        <FacebookPostCard
          authorName="S.I.P.E.C Siloam Kampala"
          metadata="Communauté SIPEC • Kampala"
          content={`Messages populaires & témoignages\n\nCet espace sera bientôt connecté aux commentaires, prières et témoignages publiés pendant les diffusions.\n\nVous avez vécu une bénédiction, une guérison ou une percée lors d'un culte ? Partagez ce que le Seigneur a fait pour vous.`}
          mediaUrl="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85"
          domain="SILOAMKAMPALA.ORG"
          cardTitle="Communauté SIPEC — Témoignages & Récits de Foi"
          cardSubtitle="Partagez vos victoires avec l'assemblée"
          amenCount={780}
          commentsCount={112}
          sharesCount={63}
          actionLabel="Partager un témoignage"
          actionHref="#contact"
        />
      </div>
    </section>
  );
};
