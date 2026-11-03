import React, { useEffect, useState } from 'react';
import { Play, Download, Share2, Heart, X } from 'lucide-react';
import type { SermonItem } from '../../types/churchSpa';
import { FacebookPostCard } from './FacebookPostCard';

interface SermonsSpaProps {
  sermons: SermonItem[];
}

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

const sliderRows = [
  'Dernières Prédications',
  'Série sur la Foi',
  'Puissance du Saint-Esprit',
  'Enseignements Bibliques',
  'Messages du Pasteur Fondateur',
];

const enrichSermons = (sermons: SermonItem[]): SermonItem[] =>
  sermons.map((sermon, index) => ({
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

export const SermonsSpa: React.FC<SermonsSpaProps> = ({ sermons }) => {
  const [media, setMedia] = useState<SermonItem[]>([]);
  const [active, setActive] = useState<SermonItem | null>(null);
  const [favorite, setFavorite] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  useEffect(() => {
    setMedia(enrichSermons(sermons));
  }, [sermons]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const share = async () => {
    if (!active) return;
    if (navigator.share) {
      await navigator.share({
        title: active.title,
        text: active.summary,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Lien de la prédication copié !');
    }
  };

  const categories = ['Tous', ...sliderRows];
  const filteredMedia =
    selectedCategory === 'Tous'
      ? media
      : media.filter((m) => m.category === selectedCategory);

  return (
    <section
      id="predications"
      className="scroll-mt-20 overflow-hidden border-b border-slate-200/70 bg-[#F0F2F5] px-4 py-12 dark:border-white/[.05] dark:bg-[#0B1120] sm:px-6 sm:py-16 lg:px-8 text-slate-900 dark:text-white"
    >
      <div className="mx-auto max-w-3xl">
        {/* En-tête de la section */}
        <header className="mb-8 text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-[#1877F2]">
            Messages & enseignements
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Prédications
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            Écoutez, regardez et méditez les derniers messages proclamés à la chaire de la S.I.P.E.C.
          </p>

          {/* Filtres par catégories de prédication (Style pills Facebook) */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-[#1877F2] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Liste des prédications en Badges Facebook Post Card */}
        <div className="space-y-6">
          {filteredMedia.map((sermon, index) => (
            <FacebookPostCard
              key={sermon.id || index}
              authorName="S.I.P.E.C Siloam Kampala"
              metadata={`${sermon.preacher} • ${sermon.date}`}
              content={`${sermon.description || sermon.summary}\n\n📖 Passage : ${sermon.scriptureReference}\n⏱ Durée : ${sermon.duration} • 📂 Série : ${sermon.category}`}
              mediaNode={
                <div
                  onClick={() => setActive(sermon)}
                  className="group relative aspect-video w-full cursor-pointer overflow-hidden bg-slate-950 flex items-center justify-center"
                >
                  <img
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
                  <div className="absolute grid h-14 w-14 place-items-center rounded-full bg-white/95 text-slate-950 shadow-2xl transition group-hover:scale-110">
                    <Play className="ml-1 fill-current" size={24} />
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/85 px-2.5 py-1 text-xs font-semibold text-white">
                    {sermon.duration}
                  </span>
                </div>
              }
              domain="SILOAMKAMPALA.ORG"
              cardTitle={sermon.title}
              cardSubtitle={`${sermon.scriptureReference} • ${sermon.preacher}`}
              amenCount={340 + index * 42}
              commentsCount={28 + index * 5}
              sharesCount={16 + index * 3}
              actionLabel="Regarder"
              onActionClick={() => setActive(sermon)}
            />
          ))}
        </div>
      </div>

      {/* Lecteur Vidéo Modal (Conserve toutes les fonctionnalités et métadonnées d'origine) */}
      {active && (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-0 backdrop-blur-xl sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActive(null);
          }}
        >
          <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-none bg-[#10131a] shadow-2xl sm:rounded-2xl border border-slate-800 text-white">
            <div className="relative">
              <video
                className="aspect-video w-full bg-black"
                controls
                autoPlay
                poster={active.thumbnailUrl}
                src={active.videoUrl}
              />
              <button
                aria-label="Fermer"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/65 text-white backdrop-blur-md hover:bg-black/85 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1877F2]">
                  {active.category}
                </p>
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl text-white">
                  {active.title}
                </h3>
                <p className="mt-2 font-medium text-slate-300">
                  {active.preacher} <span className="mx-2 text-slate-600">•</span> {active.scriptureReference}
                </p>
                <div className="mt-2 flex gap-4 text-xs text-slate-400">
                  <span>{active.date}</span>
                  <span>{active.duration}</span>
                  <span>{active.downloads} téléchargements</span>
                </div>
                <p className="mt-5 leading-relaxed text-slate-300 text-sm">
                  {active.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:w-44 lg:flex-col">
                <button
                  onClick={() => downloadSermon(active)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10 transition lg:flex-none"
                >
                  <Download size={17} /> Télécharger
                </button>
                <button
                  onClick={share}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10 transition lg:flex-none"
                >
                  <Share2 size={17} /> Partager
                </button>
                <button
                  onClick={() => setFavorite((value) => !value)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition lg:flex-none ${
                    favorite
                      ? 'border-rose-400 bg-rose-500/15 text-rose-300'
                      : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <Heart size={17} fill={favorite ? 'currentColor' : 'none'} /> Favoris
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
