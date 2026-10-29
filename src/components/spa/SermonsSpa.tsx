import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Download, Heart, Play, Share2, X } from 'lucide-react';
import type { SermonItem } from '../../types/churchSpa';

interface SermonsSpaProps { sermons: SermonItem[] }

const videoSources = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
];
const fallbackThumbnails = [
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1400&q=85',
];

const sliderRows = ['Dernières Prédications', 'Série sur la Foi', 'Puissance du Saint-Esprit', 'Enseignements Bibliques', 'Messages du Pasteur Fondateur'];

const enrichSermons = (sermons: SermonItem[]): SermonItem[] => sermons.map((sermon, index) => ({
  ...sermon,
  description: sermon.description || sermon.summary,
  thumbnailUrl: sermon.thumbnailUrl || fallbackThumbnails[index % fallbackThumbnails.length],
  videoUrl: sermon.videoUrl || videoSources[index % videoSources.length],
  category: sermon.category || sliderRows[index % sliderRows.length],
  downloads: sermon.downloads || 120 + index * 37,
  featured: sermon.featured || index === 0,
}));

const downloadSermon = (sermon: SermonItem) => {
  const link = document.createElement('a');
  link.href = sermon.videoUrl || '';
  link.download = sermon.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.mp4';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const MediaSlider: React.FC<{ title: string; items: SermonItem[]; onPlay: (sermon: SermonItem) => void }> = ({ title, items, onPlay }) => {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (amount: number) => rail.current?.scrollBy({ left: amount * Math.min(rail.current.clientWidth * .85, 900), behavior: 'smooth' });
  if (!items.length) return null;
  return <section className="mb-14">
    <div className="mb-5 flex items-center justify-between">
      <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h3>
      <div className="flex gap-2">
        <button aria-label="Précédent" onClick={() => scroll(-1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white transition hover:border-sky-400 hover:bg-sky-500"><ChevronLeft size={18}/></button>
        <button aria-label="Suivant" onClick={() => scroll(1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white transition hover:border-sky-400 hover:bg-sky-500"><ChevronRight size={18}/></button>
      </div>
    </div>
    <div ref={rail} className="flex gap-4 overflow-x-auto pb-5 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((sermon, index) => <article key={sermon.id} className="group w-[82vw] max-w-[390px] shrink-0">
        <button onClick={() => onPlay(sermon)} className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 text-left shadow-xl ring-1 ring-white/[.06] transition duration-500 group-hover:-translate-y-1 group-hover:ring-sky-400/40">
          <img src={sermon.thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={(event) => { event.currentTarget.src = fallbackThumbnails[index % fallbackThumbnails.length]; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100"><span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-slate-950 shadow-2xl"><Play className="ml-0.5 fill-current" size={23}/></span></span>
          <span className="absolute bottom-3 right-3 rounded-md bg-black/85 px-2 py-1 text-xs font-semibold text-white">{sermon.duration}</span>
        </button>
        <button onClick={() => onPlay(sermon)} className="mt-3 block w-full text-left">
          <h4 className="line-clamp-2 text-[15px] font-semibold leading-6 text-slate-100 transition group-hover:text-sky-300">{sermon.title}</h4>
          <p className="mt-1 text-sm text-slate-400">{sermon.preacher}</p>
          <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-slate-500"><span>{sermon.scriptureReference}</span><span>•</span><span>{sermon.date}</span></div>
        </button>
      </article>)}
    </div>
  </section>;
};

export const SermonsSpa: React.FC<SermonsSpaProps> = ({ sermons }) => {
  const [media, setMedia] = useState<SermonItem[]>([]);
  const [active, setActive] = useState<SermonItem | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [visible, setVisible] = useState(10);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMedia(enrichSermons(sermons)), [sermons]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setVisible(value => Math.min(value + 8, 100)); }, { rootMargin: '400px' });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const featured = media.find(sermon => sermon.featured) || media[0];
  const share = async () => {
    if (!active) return;
    if (navigator.share) await navigator.share({ title: active.title, text: active.summary, url: window.location.href });
    else await navigator.clipboard.writeText(window.location.href);
  };

  return <section id="predications" className="overflow-hidden border-b border-white/[.05] bg-[#07090d] text-white">
    <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-16 sm:px-6 lg:px-10">
      <header className="relative isolate mb-8 overflow-hidden rounded-b-[32px] py-16 text-center sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_-10%,rgba(14,165,233,.22),transparent_42%),linear-gradient(145deg,#080b12,#111827,#08090d)]" />
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:42px_42px]" />
        <p className="text-xs font-bold uppercase tracking-[.32em] text-sky-400">Messages & enseignements</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Prédications</h2>
        <p className="mx-auto mt-5 max-w-3xl px-4 text-base leading-7 text-slate-300 sm:text-lg">Écoutez, regardez et méditez les derniers messages proclamés à la chaire de la S.I.P.E.C.</p>
      </header>

      {featured && <section className="mx-auto mb-16 w-full lg:w-[78%]">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-[28px] bg-slate-900 shadow-[0_30px_90px_rgba(0,0,0,.55)] ring-1 ring-white/10 sm:aspect-[16/8.5]">
          <img src={featured.thumbnailUrl} alt={featured.title} className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070c]/95 via-[#05070c]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/5" />
          <div className="absolute bottom-0 left-0 max-w-3xl p-5 sm:p-8 lg:p-10">
            <span className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[.18em] backdrop-blur-md">À la une</span>
            <h3 className="max-w-2xl text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">{featured.title}</h3>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-200"><strong>{featured.preacher}</strong><span>{featured.scriptureReference}</span><span className="flex items-center gap-1"><Calendar size={14}/>{featured.date}</span><span className="flex items-center gap-1"><Clock size={14}/>{featured.duration}</span></div>
            <p className="mt-4 hidden max-w-xl text-sm leading-6 text-slate-300 sm:line-clamp-2 sm:block">{featured.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              <button onClick={() => setActive(featured)} className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-400"><Play size={18} className="fill-current"/> Regarder</button>
              <button onClick={() => downloadSermon(featured)} className="flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-5 py-3 text-sm font-semibold backdrop-blur-md transition hover:bg-white/15"><Download size={18}/> Télécharger</button>
              <button onClick={() => setSummaryOpen(value => !value)} className="hidden items-center gap-2 rounded-full border border-white/20 bg-black/25 px-5 py-3 text-sm font-semibold backdrop-blur-md sm:flex">Voir résumé</button>
            </div>
          </div>
        </div>
        {summaryOpen && <div className="mt-4 rounded-2xl border border-white/[.08] bg-white/[.04] p-5 text-sm leading-7 text-slate-300 backdrop-blur-xl">{featured.summary}</div>}
      </section>}

      <div>
        {sliderRows.map((row, rowIndex) => <MediaSlider key={row} title={row} items={media.filter((sermon, index) => (sermon.category === row || index % sliderRows.length === rowIndex)).slice(0, visible)} onPlay={setActive}/>) }
      </div>
      <div ref={loaderRef} className="h-8" />
    </div>

    {active && <div className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-0 backdrop-blur-xl sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-none bg-[#10131a] shadow-2xl sm:rounded-[28px]">
        <div className="relative">
          <video className="aspect-video w-full bg-black" controls autoPlay poster={active.thumbnailUrl} src={active.videoUrl} />
          <button aria-label="Fermer" onClick={() => setActive(null)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/65 backdrop-blur-md"><X/></button>
        </div>
        <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-sky-400">{active.category}</p>
            <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{active.title}</h3>
            <p className="mt-3 font-medium text-slate-300">{active.preacher} <span className="mx-2 text-slate-600">•</span> {active.scriptureReference}</p>
            <div className="mt-2 flex gap-4 text-xs text-slate-500"><span>{active.date}</span><span>{active.duration}</span><span>{active.downloads} téléchargements</span></div>
            <p className="mt-6 leading-7 text-slate-300">{active.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:w-44 lg:flex-col">
            <button onClick={() => setActive(active)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-bold lg:flex-none"><Play size={17} className="fill-current"/> Lire</button>
            <button onClick={() => downloadSermon(active)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold lg:flex-none"><Download size={17}/> Télécharger</button>
            <button onClick={share} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold lg:flex-none"><Share2 size={17}/> Partager</button>
            <button onClick={() => setFavorite(value => !value)} className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold lg:flex-none ${favorite ? 'border-rose-400 bg-rose-500/15 text-rose-300' : 'border-white/10'}`}><Heart size={17} fill={favorite ? 'currentColor' : 'none'}/> Favoris</button>
          </div>
        </div>
      </div>
    </div>}
  </section>;
};