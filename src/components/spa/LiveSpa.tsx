import React, { useMemo, useState } from 'react';
import { CalendarDays, Camera, ChevronRight, Clock3, ExternalLink, LayoutDashboard, Play, Radio, Settings2, Share2, Tv, Users } from 'lucide-react';
import type { LiveStream } from '../../types/churchSpa';

interface LiveSpaProps { streams: LiveStream[]; }

const platformLinks = (stream: LiveStream) => [
  { name: 'YouTube', url: stream.youtubeUrl, icon: Tv, color: 'bg-[#ff0033]', hover: 'hover:bg-[#e6002e]' },
  { name: 'Facebook', url: stream.facebookUrl, icon: Users, color: 'bg-[#1877f2]', hover: 'hover:bg-[#0d65d9]' },
  { name: 'TikTok', url: stream.tiktokUrl, icon: Radio, color: 'bg-black dark:bg-white dark:text-black', hover: 'hover:opacity-80' },
  { name: 'Instagram', url: stream.instagramUrl, icon: Camera, color: 'bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]', hover: 'hover:brightness-110' },
];

const formatDate = (value: string) => new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(value));

export const LiveSpa: React.FC<LiveSpaProps> = ({ streams }) => {
  const liveStream = streams.find((stream) => stream.status === 'live') ?? streams[0];
  const upcoming = streams.filter((stream) => stream.status === 'offline');
  const replays = streams.filter((stream) => stream.status === 'replay');
  const [adminOpen, setAdminOpen] = useState(false);
  const [streamState, setStreamState] = useState(liveStream?.status ?? 'offline');
  const [simulatedViewers, setSimulatedViewers] = useState(liveStream?.viewers ?? 0);
  const statusLabel = useMemo(() => streamState === 'live' ? 'EN DIRECT' : streamState === 'replay' ? 'REDIFFUSION' : 'HORS LIGNE', [streamState]);

  if (!liveStream) return null;

  return (
    <section id="live" className="overflow-hidden bg-[#07090f] text-white">
      <div className="relative border-b border-white/5 px-5 pb-12 pt-16 sm:px-8 lg:pb-16 lg:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(14,165,233,.18),transparent_32%),radial-gradient(circle_at_15%_70%,rgba(37,99,235,.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.3em] text-sky-400"><Radio className="h-4 w-4" /> SIPEC Media</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Live &amp; Rediffusions SIPEC</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">La Parole, la louange et la communion en direct, depuis le sanctuaire jusqu’à votre foyer.</p>
            </div>
            <button onClick={() => setAdminOpen((open) => !open)} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-5 py-3 text-sm font-semibold backdrop-blur transition hover:border-sky-400/50 hover:bg-white/10">
              <LayoutDashboard className="h-4 w-4" /> Administration du live
            </button>
          </div>

          {adminOpen && (
            <div className="mb-8 rounded-[28px] border border-white/10 bg-slate-950/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4"><Settings2 className="h-5 w-5 text-sky-400" /><div><h2 className="font-bold">Console de diffusion</h2><p className="text-xs text-slate-400">Simulation locale · prêt pour OBS, Restream et API SIPEC</p></div></div>
              <div className="grid gap-4 pt-5 md:grid-cols-3">
                <label className="text-xs font-semibold text-slate-300">État de la diffusion<select value={streamState} onChange={(event) => setStreamState(event.target.value as typeof streamState)} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.06] px-4 py-3 text-white outline-none"><option className="bg-slate-950" value="live">En direct</option><option className="bg-slate-950" value="offline">Hors ligne</option><option className="bg-slate-950" value="replay">Rediffusion</option></select></label>
                <label className="text-xs font-semibold text-slate-300">Audience simulée<input type="number" value={simulatedViewers} onChange={(event) => setSimulatedViewers(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.06] px-4 py-3 outline-none" /></label>
                <div className="text-xs font-semibold text-slate-300">Plateformes connectées<div className="mt-2 flex flex-wrap gap-2"><span className="rounded-full bg-red-500/15 px-3 py-2 text-red-300">YouTube</span><span className="rounded-full bg-blue-500/15 px-3 py-2 text-blue-300">Facebook</span><span className="rounded-full bg-white/10 px-3 py-2">TikTok</span><span className="rounded-full bg-pink-500/15 px-3 py-2 text-pink-300">Instagram</span></div></div>
              </div>
            </div>
          )}

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className="group relative aspect-video overflow-hidden rounded-[28px] bg-black shadow-[0_30px_100px_rgba(0,0,0,.55)] ring-1 ring-white/10">
                {streamState === 'live' ? <iframe className="h-full w-full" src="https://www.youtube-nocookie.com/embed?controls=1&modestbranding=1&rel=0" title="Lecteur SIPEC Live" allow="autoplay; fullscreen; picture-in-picture" /> : <img src={liveStream.thumbnail} alt="" className="h-full w-full object-cover opacity-65" />}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                {streamState !== 'live' && <div className="absolute inset-0 grid place-items-center"><button className="pointer-events-auto grid h-20 w-20 place-items-center rounded-full bg-white text-slate-950 shadow-2xl transition group-hover:scale-105" aria-label="Lire"><Play fill="currentColor" className="ml-1 h-8 w-8" /></button></div>}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-[11px] font-bold tracking-[.12em] backdrop-blur-md"><span className={`h-2 w-2 rounded-full ${streamState === 'live' ? 'animate-pulse bg-red-500' : 'bg-slate-400'}`} />{statusLabel}</div>
              </div>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div><h2 className="text-2xl font-bold sm:text-3xl">{liveStream.title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{liveStream.description}</p></div>
                <div className="flex shrink-0 items-center gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300"><Users className="h-4 w-4 text-sky-400" /> {simulatedViewers.toLocaleString('fr-FR')}</span><button onClick={() => navigator.share?.({ title: liveStream.title, url: window.location.href })} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 hover:bg-white/10" aria-label="Partager"><Share2 className="h-4 w-4" /></button></div>
              </div>
            </div>
            <aside>
              <p className="text-sm font-bold uppercase tracking-[.16em] text-slate-300">Regarder aussi sur</p>
              <div className="mt-4 grid gap-3">
                {platformLinks(liveStream).map(({ name, url, icon: Icon, color, hover }) => <a key={name} href={url} target="_blank" rel="noreferrer" className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold text-white transition ${color} ${hover}`}><span className="flex items-center gap-3"><Icon className="h-5 w-5" />{name}</span><ExternalLink className="h-4 w-4 opacity-70" /></a>)}
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-semibold text-sky-400">SORTIE MULTI-PLATEFORME</p><p className="mt-2 text-sm leading-6 text-slate-400">OBS Studio → Restream → YouTube, Facebook, TikTok & Instagram</p></div>
            </aside>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="mb-7 flex items-center justify-between"><h2 className="text-2xl font-bold sm:text-3xl">Prochaines diffusions</h2><CalendarDays className="h-6 w-6 text-sky-400" /></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((stream) => <article key={stream.id} className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[.04] transition hover:-translate-y-1 hover:border-sky-400/40"><img src={stream.thumbnail} loading="lazy" alt="" className="aspect-video w-full object-cover" /><div className="p-5"><p className="mb-2 flex items-center gap-2 text-xs font-semibold text-sky-400"><Clock3 className="h-4 w-4" />{formatDate(stream.startTime)}</p><h3 className="text-lg font-bold">{stream.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{stream.description}</p><button className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">Ajouter un rappel <ChevronRight className="h-4 w-4" /></button></div></article>)}
        </div>
      </div>

      <div className="border-y border-white/5 bg-white/[.018]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <h2 className="mb-7 text-2xl font-bold sm:text-3xl">Dernières rediffusions</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{replays.map((stream) => <article key={stream.id} className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0e16]"><div className="relative aspect-video overflow-hidden"><img src={stream.thumbnail} loading="lazy" alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 grid place-items-center bg-black/20"><span className="grid h-14 w-14 place-items-center rounded-full bg-white text-slate-950 shadow-xl"><Play fill="currentColor" className="ml-1 h-5 w-5" /></span></div><span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-bold">2 h 04</span></div><div className="p-5"><p className="text-xs text-slate-500">{formatDate(stream.startTime)}</p><h3 className="mt-2 font-bold">{stream.title}</h3></div></article>)}</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-sky-950 to-slate-950 p-6 sm:p-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-300">Communauté SIPEC</p><div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><h2 className="text-3xl font-bold">Messages populaires & témoignages</h2><p className="mt-3 max-w-2xl text-slate-400">Cet espace sera bientôt connecté aux commentaires, prières et témoignages publiés pendant les diffusions.</p></div><button className="shrink-0 rounded-full border border-white/15 px-5 py-3 text-sm font-bold transition hover:bg-white hover:text-slate-950">Partager un témoignage</button></div></div>
      </div>
    </section>
  );
};
