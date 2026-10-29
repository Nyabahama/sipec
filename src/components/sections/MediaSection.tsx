import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import type { MediaItem, LiveStreamStatus } from '../../types/church';

interface MediaSectionProps {
  media: MediaItem[];
  liveStatus: LiveStreamStatus;
  isOffline: boolean;
}

export const MediaSection: React.FC<MediaSectionProps> = ({
  media,
  liveStatus,
  isOffline,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const photos = media.filter((m) => m.type === 'photo');

  return (
    <section id="media" className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de Section */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-sky-600 font-medium">
            Médias & Diffusion
          </span>
          <h2 className="mt-2 text-3xl font-light text-slate-900 tracking-tight">
            Direct & Rediffusions
          </h2>
        </div>

        {/* 1. LECTEUR VIDÉO FACTICE PRÊT POUR L'API STREAMING */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm mb-16">
          <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="font-normal text-slate-900">
                {liveStatus.isLive ? 'Flux en Direct' : 'Rediffusion'}
              </span>
              {isOffline && (
                <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                  (Mode Hors-ligne)
                </span>
              )}
            </div>
            <span className="text-slate-500 font-light">{liveStatus.preacher}</span>
          </div>

          {/* Écran Vidéo Épuré */}
          <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
              alt="Live preview"
              className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-40' : 'opacity-80'}`}
            />

            {isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Radio className="w-10 h-10 text-sky-400 animate-pulse mb-3" />
                <p className="text-sm font-light text-white">
                  Lecture en cours • Prêt pour API streaming
                </p>
              </div>
            ) : (
              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-10 w-16 h-16 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95"
                aria-label="Lancer la lecture"
              >
                <Play className="w-7 h-7 ml-1 fill-current" />
              </button>
            )}

            {/* Contrôles du Lecteur */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded hover:text-sky-300 transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded hover:text-sky-300 transition"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-sky-300" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[11px] font-mono text-slate-300">
                {isPlaying ? '00:15:30' : '00:00:00'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. PHOTOS DES ŒUVRES & ÉVANGÉLISATION (Épuré) */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-6 text-center">
            Œuvres & Évangélisation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {photos.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-100 overflow-hidden bg-white hover:border-sky-300 transition group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h4 className="text-xs font-normal text-slate-800">{item.title}</h4>
                  <span className="text-[10px] uppercase tracking-wider text-sky-600 font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
