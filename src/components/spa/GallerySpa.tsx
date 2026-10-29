import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft, ChevronRight, Download, Maximize2,
  Play, X, ZoomIn, ZoomOut,
} from 'lucide-react';
import type { GalleryAlbum, GalleryItem, GalleryMedia } from '../../types/churchSpa';

interface GallerySpaProps { items: GalleryItem[] }

const categories = ['Tous', 'Photos', 'Vidéos', 'Cultes', 'Jeunesse', 'Chorales', 'Conférences', 'Baptêmes', 'Évangélisation'];
const makePhoto = (id: number, category: string, seed = id): GalleryMedia => ({
  id: `mock-photo-${id}`,
  albumId: category.toLowerCase().replaceAll(' ', '-'),
  type: 'photo',
  title: `${category} — moment ${id}`,
  description: 'Une mémoire précieuse partagée avec la famille SIPEC.',
  thumbnail: `https://images.unsplash.com/photo-${1560000000000 + seed}?auto=format&fit=crop&w=900&q=82`,
  mediaUrl: `https://images.unsplash.com/photo-${1560000000000 + seed}?auto=format&fit=crop&w=2400&q=90`,
  createdAt: new Date(2026, 9, 28 - (id % 24)).toISOString(),
  category,
});

// Proxy de remplacement pour garantir des aperçus disponibles si la source d'origine n'est pas trouvée.
const fallbackImage = (seed: number) => `https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=82&sig=${seed}`;

const galleryPhotoCategories = ['Cultes', 'Jeunesse', 'Chorales', 'Conférences', 'Baptêmes', 'Évangélisation'];
const mockPhotos: GalleryMedia[] = galleryPhotoCategories.flatMap((category, g) =>
  Array.from({ length: 12 }, (_, i) => makePhoto(g * 12 + i + 1, category, 101 + g * 111 + i))
);

const albums: GalleryAlbum[] = [
  { id: 'cultes', title: 'Culte Dominical', description: 'Adoration, parole et communion fraternelle.', coverImage: fallbackImage(1) },
  { id: 'jeunesse', title: 'Jeunesse SIPEC', description: 'Une génération passionnée pour Christ.', coverImage: fallbackImage(2) },
  { id: 'chorales', title: 'Chorales', description: 'Les voix consacrées au service de Dieu.', coverImage: fallbackImage(3) },
  { id: 'conferences', title: 'Conférences', description: 'Enseignements et temps forts spirituels.', coverImage: fallbackImage(4) },
  { id: 'baptemes', title: 'Baptêmes', description: 'Des vies transformées qui témoignent.', coverImage: fallbackImage(5) },
  { id: 'veillees', title: 'Veillées de prière', description: 'Des nuits consacrées à l’intercession.', coverImage: fallbackImage(6) },
];

const mockVideos: GalleryMedia[] = Array.from({ length: 12 }, (_, i) => ({
  id: `mock-video-${i + 1}`, albumId: 'videos', type: 'video',
  title: ['Culte en direct', 'Louange prophétique', 'Temps de témoignage', 'Jeunesse en action', 'Conference spéciale'][i % 5],
  description: 'Redécouvrez ce moment fort de l’histoire de la communauté SIPEC.',
  thumbnail: fallbackImage(40 + i), mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  createdAt: new Date(2026, 9, 27 - i).toISOString(), duration: `${12 + (i % 18)}:${String(i * 7 % 60).padStart(2, '0')}`,
  category: ['Cultes', 'Chorales', 'Jeunesse', 'Conférences', 'Baptêmes', 'Évangélisation'][i % 6],
}));

const recentEvents = albums.slice(0, 5).map((album, i) => ({
  ...album, date: new Date(2026, 9, 25 - i * 3).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), photoCount: 84 + i * 36,
}));

const downloadMedia = (media: GalleryMedia) => {
  const link = document.createElement('a');
  link.href = media.mediaUrl;
  link.download = `${media.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.${media.type === 'video' ? 'mp4' : 'jpg'}`;
  link.target = '_blank';
  link.rel = 'noopener'; document.body.appendChild(link); link.click(); link.remove();
};

const SliderRow: React.FC<{ title?: string; items: GalleryMedia[]; onPhoto: (item: GalleryMedia, list: GalleryMedia[]) => void; onVideo: (item: GalleryMedia) => void }> = ({ title, items, onPhoto, onVideo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const move = (direction: number) => ref.current?.scrollBy({ left: direction * Math.min(ref.current.clientWidth * 0.8, 900), behavior: 'smooth' });
  return <div className="mb-12">
    {title && <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3><div className="flex gap-2"><button aria-label="Précédent" onClick={() => move(-1)} className="rounded-full border border-slate-200 dark:border-white/10 p-2 hover:bg-sky-500 hover:text-white"><ChevronLeft size={18}/></button><button aria-label="Suivant" onClick={() => move(1)} className="rounded-full border border-slate-200 dark:border-white/10 p-2 hover:bg-sky-500 hover:text-white"><ChevronRight size={18}/></button></div></div>}
    <div ref={ref} className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map(item => item.type === 'video' ? (
        <button key={item.id} onClick={() => onVideo(item)} className="group relative aspect-video w-[78vw] max-w-[390px] shrink-0 overflow-hidden rounded-2xl bg-slate-900 text-left shadow-lg">
          <img src={item.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={e => { e.currentTarget.src = fallbackImage(Number(item.id.slice(-1)) || 7); }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"/><div className="absolute inset-0 grid place-items-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-slate-900 shadow-xl transition group-hover:scale-110"><Play fill="currentColor" size={22}/></span></div><span className="absolute right-3 top-3 rounded-md bg-black/75 px-2 py-1 text-xs font-semibold text-white">{item.duration}</span><div className="absolute inset-x-0 bottom-0 p-4"><p className="font-semibold text-white">{item.title}</p><p className="mt-1 text-xs text-white/65">{new Date(item.createdAt).toLocaleDateString('fr-FR')}</p></div>
        </button>
      ) : (
        <button key={item.id} onClick={() => onPhoto(item, items)} className="group relative aspect-[4/3] w-[72vw] max-w-[330px] shrink-0 overflow-hidden rounded-2xl bg-slate-200 text-left shadow-md dark:bg-slate-800">
          <img src={item.thumbnail} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" onError={e => { e.currentTarget.src = fallbackImage(mockPhotos.indexOf(item) + 20); }} /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"/><span className="absolute bottom-4 left-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">Voir la photo</span>
        </button>
      ))}
    </div>
  </div>;
};

export const GallerySpa: React.FC<GallerySpaProps> = () => {
  const [filter, setFilter] = useState('Tous');
  const [lightbox, setLightbox] = useState<{ list: GalleryMedia[]; index: number } | null>(null);
  const [video, setVideo] = useState<GalleryMedia | null>(null);
  const [zoom, setZoom] = useState(1);
  const [visiblePhotos, setVisiblePhotos] = useState(24);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setVisiblePhotos(v => Math.min(v + 12, mockPhotos.length)); }, { rootMargin: '400px' });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') { setLightbox(null); setVideo(null); } }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, []);

  const photoMatches = filter === 'Tous' || filter === 'Photos'
    ? mockPhotos
    : mockPhotos.filter(media => media.category === filter);
  const visiblePhotoMatches = photoMatches.slice(0, visiblePhotos);
  const videoMatches = filter === 'Tous' || filter === 'Vidéos'
    ? mockVideos
    : mockVideos.filter(media => media.category === filter);
  const showVideos = filter === 'Tous' || filter === 'Vidéos' || mockVideos.some(media => media.category === filter);

  return <section id="galerie" className="overflow-hidden border-b border-slate-200/70 bg-[#f7f8fb] py-12 dark:border-white/5 dark:bg-[#080a0f]">
    <div className="mx-auto max-w-[1500px] px-4 pt-0 sm:px-6 lg:px-10">
      <div className="mb-5 flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-sky-500/70 sm:w-20" />
        <h2 className="bg-gradient-to-r from-sky-600 via-slate-800 to-sky-600 bg-clip-text text-xl font-semibold tracking-[0.18em] text-transparent dark:from-sky-400 dark:via-white dark:to-sky-400 sm:text-2xl">
          Galeries
        </h2>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-sky-500/70 sm:w-20" />
      </div>

      <nav className="mb-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filtres de la galerie">
        {categories.map(cat => <button key={cat} onClick={() => setFilter(cat)} className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${filter === cat ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25' : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600 dark:border-white/10 dark:bg-white/[.03] dark:text-slate-300'}`}>{cat}</button>)}
      </nav>

      {(filter === 'Tous' || filter === 'Photos') && <>
        <section className="mb-8">
          <div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-500">À découvrir</p><h3 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Événements récents</h3></div><span className="hidden text-sm text-slate-400 sm:block">Notre histoire en images</span></div>
          <div className="grid snap-x auto-cols-[82%] grid-flow-col gap-5 overflow-x-auto pb-5 sm:auto-cols-[48%] lg:auto-cols-[31%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {recentEvents.map((event, i) => <button key={event.id} onClick={() => setLightbox({ list: mockPhotos.filter(p => p.category !== 'Jeunesse').slice(i * 4, i * 4 + 4), index: 0 })} className="group snap-start overflow-hidden rounded-[24px] bg-slate-900 text-left shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden"><img src={event.coverImage} alt={event.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/><div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"/><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5"><div><h4 className="text-xl font-bold text-white">{event.title}</h4><p className="mt-1 text-xs text-white/70">{event.date}</p></div><span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur-md">{event.photoCount} photos</span></div></div>
            </button>)}
          </div>
        </section>
      </>}

      

      {(filter === 'Tous' || filter === 'Photos') && visiblePhotoMatches.length > 0 && <section className="mb-10"><div className="mb-5"><h3 className="text-xl font-bold text-slate-950 dark:text-white">{filter === 'Photos' ? 'Photos' : 'Photos récentes'}</h3></div><SliderRow items={visiblePhotoMatches} onPhoto={(item, list) => setLightbox({ list, index: list.findIndex(x => x.id === item.id) })} onVideo={setVideo}/></section>}
      {!['Tous', 'Photos', 'Vidéos'].includes(filter) && visiblePhotoMatches.length > 0 && <section className="mb-10"><div className="mb-5"><h3 className="text-xl font-bold text-slate-950 dark:text-white">{filter}</h3></div><SliderRow items={visiblePhotoMatches} onPhoto={(item, list) => setLightbox({ list, index: list.findIndex(x => x.id === item.id) })} onVideo={setVideo}/></section>}

      {showVideos && <section className="mb-16"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-500">À regarder</p><h3 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">{filter === 'Tous' || filter === 'Vidéos' ? 'Vidéos' : `Vidéos — ${filter}`}</h3></div><SliderRow items={videoMatches} onPhoto={() => undefined} onVideo={setVideo}/></section>}

      <div ref={loaderRef} className="flex justify-center py-6">
        <button
          onClick={() => setVisiblePhotos(v => Math.min(v + 12, photoMatches.length))}
          disabled={visiblePhotos >= photoMatches.length}
          className="rounded-full border border-sky-500/20 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500 hover:text-sky-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
        >
          Afficher plus de souvenirs
        </button>
      </div>
    </div>

    {lightbox && (() => { const current = lightbox.list[lightbox.index]; const move = (d: number) => setLightbox(s => s ? { ...s, index: (s.index + d + s.list.length) % s.list.length } : s); return <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"><div className="flex items-center justify-between px-4 py-4 text-white sm:px-7"><span className="text-sm font-medium">{lightbox.index + 1} / {lightbox.list.length}</span><button aria-label="Fermer" onClick={() => { setLightbox(null); setZoom(1); }} className="rounded-full p-2 hover:bg-white/10"><X/></button></div><div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3"><button aria-label="Photo précédente" onClick={() => move(-1)} className="absolute left-4 z-10 rounded-full bg-black/40 p-3 backdrop-blur-md"><ChevronLeft size={28}/></button><img src={current.mediaUrl} alt={current.title} className="max-h-full max-w-full object-contain transition-transform duration-300" style={{ transform: `scale(${zoom})` }}/><button aria-label="Photo suivante" onClick={() => move(1)} className="absolute right-4 z-10 rounded-full bg-black/40 p-3 backdrop-blur-md"><ChevronRight size={28}/></button></div><div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold">{current.title}</h3><p className="text-sm text-white/60">{current.description}</p></div><div className="flex items-center gap-1"><button aria-label="Réduire" onClick={() => setZoom(z => Math.max(.7, z - .2))} className="rounded-full p-2 hover:bg-white/10"><ZoomOut/></button><button aria-label="Agrandir" onClick={() => setZoom(z => Math.min(2.5, z + .2))} className="rounded-full p-2 hover:bg-white/10"><ZoomIn/></button><button aria-label="Télécharger" onClick={() => downloadMedia(current)} className="rounded-full p-2 hover:bg-white/10"><Download/></button><button aria-label="Plein écran" onClick={() => document.documentElement.requestFullscreen()} className="rounded-full p-2 hover:bg-white/10"><Maximize2/></button></div></div></div>; })()}

    {video && <div className="fixed inset-0 z-[110] grid place-items-center bg-black/80 p-3 backdrop-blur-xl" onMouseDown={e => { if (e.target === e.currentTarget) setVideo(null); }}><div className="w-full max-w-5xl overflow-hidden rounded-[28px] bg-[#11131a] shadow-2xl"><div className="flex items-center justify-end p-3 text-white"><button aria-label="Fermer la vidéo" onClick={() => setVideo(null)} className="rounded-full p-2 hover:bg-white/10"><X/></button></div><video className="aspect-video w-full bg-black" controls autoPlay poster={video.thumbnail} src={video.mediaUrl}/><div className="flex flex-col gap-5 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7"><div><p className="text-xs uppercase tracking-widest text-sky-400">{video.category}</p><h3 className="mt-2 text-xl font-bold">{video.title}</h3><p className="mt-2 max-w-2xl text-sm text-white/60">{video.description}</p><p className="mt-3 text-xs text-white/40">{new Date(video.createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p></div><button onClick={() => downloadMedia(video)} className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900"><Download size={17}/> Télécharger</button></div></div></div>}
  </section>;
};
