import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Play,
  X,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from 'lucide-react';
import type { GalleryAlbum, GalleryItem, GalleryMedia } from '../../types/churchSpa';
import { FacebookPostCard } from './FacebookPostCard';

interface GallerySpaProps {
  items: GalleryItem[];
}

const categories = [
  'Tous',
  'Photos',
  'Vidéos',
  'Cultes',
  'Jeunesse',
  'Chorales',
  'Conférences',
  'Baptêmes',
  'Évangélisation',
];

const fallbackImage = (seed: number) =>
  `https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=82&sig=${seed}`;

const galleryPhotoCategories = ['Cultes', 'Jeunesse', 'Chorales', 'Conférences', 'Baptêmes', 'Évangélisation'];

const makePhoto = (id: number, category: string, seed = id): GalleryMedia => ({
  id: `mock-photo-${id}`,
  albumId: category.toLowerCase().replaceAll(' ', '-'),
  type: 'photo',
  title: `${category} — Célébration & Foi`,
  description: 'Une mémoire précieuse partagée avec la famille SIPEC lors de nos rassemblements spirituels.',
  thumbnail: `https://images.unsplash.com/photo-${1560000000000 + seed}?auto=format&fit=crop&w=1200&q=85`,
  mediaUrl: `https://images.unsplash.com/photo-${1560000000000 + seed}?auto=format&fit=crop&w=2400&q=90`,
  createdAt: new Date(2026, 9, 28 - (id % 24)).toISOString(),
  category,
});

const mockPhotos: GalleryMedia[] = galleryPhotoCategories.flatMap((category, g) =>
  Array.from({ length: 6 }, (_, i) => makePhoto(g * 6 + i + 1, category, 101 + g * 111 + i))
);

const albums: GalleryAlbum[] = [
  { id: 'cultes', title: 'Culte Dominical', description: 'Adoration, parole et communion fraternelle au sanctuaire.', coverImage: fallbackImage(1) },
  { id: 'jeunesse', title: 'Jeunesse SIPEC', description: 'Une génération passionnée pour Christ et engagée dans l’Évangile.', coverImage: fallbackImage(2) },
  { id: 'chorales', title: 'Chorales', description: 'Les voix consacrées au service de Dieu pour conduire la louange.', coverImage: fallbackImage(3) },
  { id: 'conferences', title: 'Conférences', description: 'Enseignements et temps forts spirituels avec les ministères invités.', coverImage: fallbackImage(4) },
  { id: 'baptemes', title: 'Baptêmes', description: 'Des vies transformées qui témoignent publiquement de leur foi.', coverImage: fallbackImage(5) },
  { id: 'veillees', title: 'Veillées de prière', description: 'Des nuits consacrées à l’intercession et à la visitation divine.', coverImage: fallbackImage(6) },
];

const mockVideos: GalleryMedia[] = Array.from({ length: 6 }, (_, i) => ({
  id: `mock-video-${i + 1}`,
  albumId: 'videos',
  type: 'video',
  title: ['Culte en direct', 'Louange prophétique', 'Temps de témoignage', 'Jeunesse en action', 'Conférence spéciale'][i % 5],
  description: 'Redécouvrez ce moment fort de l’histoire et de la communion de la communauté SIPEC.',
  thumbnail: fallbackImage(40 + i),
  mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  createdAt: new Date(2026, 9, 27 - i).toISOString(),
  duration: `${12 + (i % 18)}:${String((i * 7) % 60).padStart(2, '0')}`,
  category: ['Cultes', 'Chorales', 'Jeunesse', 'Conférences', 'Baptêmes', 'Évangélisation'][i % 6],
}));

const downloadMedia = (media: GalleryMedia) => {
  const link = document.createElement('a');
  link.href = media.mediaUrl;
  link.download = `${media.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.${media.type === 'video' ? 'mp4' : 'jpg'}`;
  link.target = '_blank';
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const GallerySpa: React.FC<GallerySpaProps> = ({ items }) => {
  const [filter, setFilter] = useState('Tous');
  const [lightbox, setLightbox] = useState<{ list: GalleryMedia[]; index: number } | null>(null);
  const [video, setVideo] = useState<GalleryMedia | null>(null);
  const [zoom, setZoom] = useState(1);
  const [visiblePhotos, setVisiblePhotos] = useState(12);
  const loaderRef = useRef<HTMLDivElement>(null);

  const suppliedPhotos = items
    .filter((item) => item.type !== 'video')
    .map(
      (item): GalleryMedia => ({
        id: item.id,
        albumId: item.albumId || item.category,
        type: 'photo',
        title: item.title,
        description: item.placeholderLabel || 'Moment fort de communion et de louange à la S.I.P.E.C Siloam Kampala.',
        thumbnail: item.thumbnailUrl || item.mediaUrl || '',
        mediaUrl: item.mediaUrl || item.thumbnailUrl || '',
        createdAt: item.createdAt || new Date().toISOString(),
        category: item.category,
      })
    );

  const suppliedVideos = items
    .filter((item) => item.type === 'video')
    .map(
      (item): GalleryMedia => ({
        id: item.id,
        albumId: item.albumId || item.category,
        type: 'video',
        title: item.title,
        description: item.placeholderLabel || 'Enregistrement vidéo d’un temps de visitation spirituelle à Siloam.',
        thumbnail: item.thumbnailUrl || '',
        mediaUrl: item.mediaUrl || '',
        createdAt: item.createdAt || new Date().toISOString(),
        duration: item.duration || '0:00',
        category: item.category,
      })
    );

  const photoSource = suppliedPhotos.length ? suppliedPhotos : mockPhotos;
  const videoSource = suppliedVideos.length ? suppliedVideos : mockVideos;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisiblePhotos((v) => Math.min(v + 8, photoSource.length));
        }
      },
      { rootMargin: '400px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [photoSource.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
        setVideo(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const photoMatches =
    filter === 'Tous' || filter === 'Photos'
      ? photoSource
      : photoSource.filter((media) => media.category === filter);

  const visiblePhotoMatches = photoMatches.slice(0, visiblePhotos);

  const videoMatches =
    filter === 'Tous' || filter === 'Vidéos'
      ? videoSource
      : videoSource.filter((media) => media.category === filter);

  return (
    <section
      id="galerie"
      className="scroll-mt-20 overflow-hidden border-b border-slate-200/70 bg-[#F0F2F5] px-4 py-12 dark:border-white/5 dark:bg-[#0B1120] sm:px-6 sm:py-16 lg:px-8 text-slate-900 dark:text-white"
    >
      <div className="mx-auto max-w-3xl">
        {/* En-tête de la Galerie */}
        <header className="mb-8 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1877F2] shadow-sm dark:border-blue-900/60 dark:bg-slate-900 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            Mémoires & Célébrations
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Galeries
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            Notre histoire en images : cultes, baptêmes, chorales, veillées et événements majeurs de la S.I.P.E.C.
          </p>

          {/* Filtres style Facebook Pills */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  filter === cat
                    ? 'bg-[#1877F2] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* 1. SECTION ALBUMS / ÉVÉNEMENTS RÉCENTS (Badges Facebook) */}
        {(filter === 'Tous' || filter === 'Photos') && (
          <div className="mb-10">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">
                À découvrir
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Événements récents
              </h3>
            </div>

            <div className="space-y-6">
              {albums.slice(0, 3).map((album, i) => (
                <FacebookPostCard
                  key={album.id}
                  authorName="S.I.P.E.C Siloam Kampala"
                  metadata={`Album Officiel • ${album.title}`}
                  content={`${album.description}\n\nRevivez les moments inoubliables de communion et de ferveur spirituelle enregistrés dans cet album.`}
                  mediaUrl={album.coverImage}
                  domain="SILOAMKAMPALA.ORG"
                  cardTitle={album.title}
                  cardSubtitle="Album photo officiel de la communauté"
                  amenCount={540 + i * 85}
                  commentsCount={62 + i * 14}
                  sharesCount={35 + i * 8}
                  actionLabel="Voir l’album"
                  onActionClick={() =>
                    setLightbox({
                      list: photoSource.slice(i * 4, i * 4 + 4),
                      index: 0,
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. PHOTOS RÉCENTES (Badges Facebook) */}
        {visiblePhotoMatches.length > 0 && (
          <div className="mb-10">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">
                Photothèque
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {filter === 'Photos' ? 'Photos' : 'Photos récentes'}
              </h3>
            </div>

            <div className="space-y-6">
              {visiblePhotoMatches.map((photo, index) => (
                <FacebookPostCard
                  key={photo.id}
                  authorName="S.I.P.E.C Siloam Kampala"
                  metadata={`${photo.category} • ${new Date(photo.createdAt).toLocaleDateString('fr-FR')}`}
                  content={photo.description}
                  mediaUrl={photo.thumbnail}
                  domain="SILOAMKAMPALA.ORG"
                  cardTitle={photo.title}
                  cardSubtitle={`${photo.category} • S.I.P.E.C Siloam Kampala`}
                  amenCount={240 + index * 18}
                  commentsCount={18 + index * 3}
                  sharesCount={9 + index * 2}
                  actionLabel="Agrandir"
                  onActionClick={() =>
                    setLightbox({
                      list: visiblePhotoMatches,
                      index,
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. VIDÉOS (Badges Facebook) */}
        {videoMatches.length > 0 && (
          <div className="mb-10">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">
                Vidéothèque
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {filter === 'Tous' || filter === 'Vidéos' ? 'Vidéos' : `Vidéos — ${filter}`}
              </h3>
            </div>

            <div className="space-y-6">
              {videoMatches.map((v, index) => (
                <FacebookPostCard
                  key={v.id}
                  authorName="S.I.P.E.C Siloam Kampala"
                  metadata={`${v.category} • ${new Date(v.createdAt).toLocaleDateString('fr-FR')}`}
                  content={v.description}
                  mediaNode={
                    <div
                      onClick={() => setVideo(v)}
                      className="group relative aspect-video w-full cursor-pointer overflow-hidden bg-slate-950 flex items-center justify-center"
                    >
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition" />
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-slate-950 shadow-2xl transition group-hover:scale-110">
                        <Play fill="currentColor" className="ml-1 h-6 w-6" />
                      </span>
                      <span className="absolute bottom-3 right-3 rounded-md bg-black/85 px-2.5 py-1 text-xs font-semibold text-white">
                        {v.duration}
                      </span>
                    </div>
                  }
                  domain="SILOAMKAMPALA.ORG"
                  cardTitle={v.title}
                  cardSubtitle={`${v.category} • Durée : ${v.duration}`}
                  amenCount={380 + index * 24}
                  commentsCount={32 + index * 4}
                  sharesCount={19 + index * 2}
                  actionLabel="Regarder"
                  onActionClick={() => setVideo(v)}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={loaderRef} className="flex justify-center py-6">
          <button
            onClick={() => setVisiblePhotos((v) => Math.min(v + 8, photoMatches.length))}
            disabled={visiblePhotos >= photoMatches.length}
            className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            Afficher plus de souvenirs
          </button>
        </div>
      </div>

      {/* Lightbox Modal pour visionnage photo plein écran */}
      {lightbox &&
        (() => {
          const current = lightbox.list[lightbox.index];
          const move = (d: number) =>
            setLightbox((s) => (s ? { ...s, index: (s.index + d + s.list.length) % s.list.length } : s));
          return (
            <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl">
              <div className="flex items-center justify-between px-4 py-4 text-white sm:px-7">
                <span className="text-sm font-medium">
                  {lightbox.index + 1} / {lightbox.list.length}
                </span>
                <button
                  aria-label="Fermer"
                  onClick={() => {
                    setLightbox(null);
                    setZoom(1);
                  }}
                  className="rounded-full p-2 hover:bg-white/10"
                >
                  <X />
                </button>
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3">
                <button
                  aria-label="Photo précédente"
                  onClick={() => move(-1)}
                  className="absolute left-4 z-10 rounded-full bg-black/40 p-3 backdrop-blur-md"
                >
                  <ChevronLeft size={28} />
                </button>
                <img
                  src={current.mediaUrl}
                  alt={current.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300"
                  style={{ transform: `scale(${zoom})` }}
                />
                <button
                  aria-label="Photo suivante"
                  onClick={() => move(1)}
                  className="absolute right-4 z-10 rounded-full bg-black/40 p-3 backdrop-blur-md"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold">{current.title}</h3>
                  <p className="text-sm text-white/60">{current.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    aria-label="Réduire"
                    onClick={() => setZoom((z) => Math.max(0.7, z - 0.2))}
                    className="rounded-full p-2 hover:bg-white/10"
                  >
                    <ZoomOut />
                  </button>
                  <button
                    aria-label="Agrandir"
                    onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
                    className="rounded-full p-2 hover:bg-white/10"
                  >
                    <ZoomIn />
                  </button>
                  <button
                    aria-label="Télécharger"
                    onClick={() => downloadMedia(current)}
                    className="rounded-full p-2 hover:bg-white/10"
                  >
                    <Download />
                  </button>
                  <button
                    aria-label="Plein écran"
                    onClick={() => document.documentElement.requestFullscreen()}
                    className="rounded-full p-2 hover:bg-white/10"
                  >
                    <Maximize2 />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Video Modal Player */}
      {video && (
        <div
          className="fixed inset-0 z-[110] grid place-items-center bg-black/80 p-3 backdrop-blur-xl"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setVideo(null);
          }}
        >
          <div className="w-full max-w-5xl overflow-hidden rounded-[28px] bg-[#11131a] shadow-2xl border border-slate-800">
            <div className="flex items-center justify-end p-3 text-white">
              <button
                aria-label="Fermer la vidéo"
                onClick={() => setVideo(null)}
                className="rounded-full p-2 hover:bg-white/10"
              >
                <X />
              </button>
            </div>
            <video className="aspect-video w-full bg-black" controls autoPlay poster={video.thumbnail} src={video.mediaUrl} />
            <div className="flex flex-col gap-5 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#1877F2] font-semibold">{video.category}</p>
                <h3 className="mt-2 text-xl font-bold">{video.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-white/60">{video.description}</p>
                <p className="mt-3 text-xs text-white/40">
                  {new Date(video.createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                </p>
              </div>
              <button
                onClick={() => downloadMedia(video)}
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100 transition"
              >
                <Download size={17} /> Télécharger
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
