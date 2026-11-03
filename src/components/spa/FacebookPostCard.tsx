import React, { useState } from 'react';
import { Globe, MoreHorizontal, X, ThumbsUp, MessageSquare, Share2, Info } from 'lucide-react';
import churchLogo from '../../assets/siloam.jpeg';

export interface FacebookPostCardProps {
  // En-tête
  authorName?: string;
  authorAvatar?: string;
  metadata?: string;
  isVerified?: boolean;
  // Contenu principal (AU-DESSUS du média)
  content: string;
  // Média & Bloc de lien
  mediaUrl?: string;
  mediaAlt?: string;
  mediaNode?: React.ReactNode;
  mediaAspectRatio?: 'video' | 'portrait' | 'square' | 'auto';
  imageClassName?: string;
  domain?: string;
  cardTitle: string;
  cardSubtitle?: string;
  infoHref?: string;
  // Footer & Compteurs
  amenCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  // Action principale à droite du footer
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export const FacebookPostCard: React.FC<FacebookPostCardProps> = ({
  authorName = 'S.I.P.E.C Siloam Kampala',
  authorAvatar = churchLogo,
  metadata = 'À l’instant',
  isVerified = true,
  content,
  mediaUrl,
  mediaAlt = '',
  mediaNode,
  mediaAspectRatio = 'video',
  imageClassName = 'object-center',
  domain = 'SILOAMKAMPALA.ORG',
  cardTitle,
  cardSubtitle,
  infoHref,
  amenCount = 12,
  commentsCount = 4,
  sharesCount = 2,
  actionLabel,
  actionHref,
  onActionClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(amenCount);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleLike = () => {
    setHasLiked(!hasLiked);
    setLikes(hasLiked ? likes - 1 : likes + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: cardTitle, text: content, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien de la publication copié !');
    }
  };

  const shouldTruncate = content.length > 200;
  const displayedContent = shouldTruncate && !isExpanded ? content.slice(0, 200) + '...' : content;

  return (
    <article className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6 transition hover:shadow-md">
      {/* 1. HEADER (En-tête de la publication) */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover object-top ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-base text-[#1E3A5F] dark:text-white leading-tight">
                {authorName}
              </span>
              {isVerified && (
                <svg className="w-4 h-4 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              <span>{metadata}</span>
              <span>•</span>
              <Globe className="w-3.5 h-3.5" aria-label="Public" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <button
            aria-label="Options"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Masquer la publication"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. BODY (Texte principal obligatoirement AU-DESSUS du média) */}
      <div className="px-4 pb-3">
        <p className="text-slate-900 dark:text-slate-100 text-base leading-relaxed whitespace-pre-line">
          {displayedContent}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1.5 text-slate-500 hover:text-[#1877F2] font-semibold text-sm cursor-pointer"
            >
              {isExpanded ? 'Réduire' : 'En voir plus'}
            </button>
          )}
        </p>
      </div>

      {/* 3. MEDIA & ENCADRÉ ENRICHI (Widget de lien style Facebook) */}
      <div className="w-full border-t border-slate-100 dark:border-slate-800/80">
        {/* Section Image */}
        <div
          className={`relative ${
            mediaAspectRatio === 'portrait'
              ? 'aspect-[4/5] max-h-[580px]'
              : mediaAspectRatio === 'square'
              ? 'aspect-square'
              : mediaAspectRatio === 'auto'
              ? 'max-h-[580px]'
              : 'aspect-video'
          } w-full overflow-hidden bg-slate-950 flex items-center justify-center`}
        >
          {mediaNode ? (
            mediaNode
          ) : mediaUrl ? (
            <img
              src={mediaUrl}
              alt={mediaAlt || cardTitle}
              loading="lazy"
              className={`w-full h-full object-cover transition duration-300 hover:opacity-95 ${imageClassName}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400">
              <span className="text-sm font-semibold">{cardTitle}</span>
            </div>
          )}
        </div>

        {/* Section Sous-bloc d'information (Juste sous l'image) */}
        <div className="bg-[#F0F2F5] dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/80 p-4 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <span className="text-xs uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400 block truncate">
              {domain}
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-snug line-clamp-2">
              {cardTitle}
            </h4>
            {cardSubtitle && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                {cardSubtitle}
              </p>
            )}
          </div>

          <a
            href={infoHref || actionHref || '#'}
            aria-label="Informations sur la publication"
            className="shrink-0 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Info className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* 4. FOOTER (Barre d'actions basse) */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#1877F2] grid place-items-center text-white text-[9px] shadow-sm">
            👍
          </span>
          <span className="font-medium">{likes}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{commentsCount} commentaires</span>
          <span>{sharesCount} partages</span>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-between gap-2">
        {/* Actions Gauche (J'aime, Commenter, Partager) */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition ${
              hasLiked
                ? 'text-[#1877F2] bg-blue-50 dark:bg-blue-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span>J’aime</span>
          </button>

          <button
            onClick={() => alert('Les commentaires sont ouverts durant les créneaux d’édification.')}
            className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Commenter</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Partager</span>
          </button>
        </div>

        {/* Bouton d'action pilule à l'extrême droite */}
        {actionLabel && (
          <div>
            {actionHref ? (
              <a
                href={actionHref}
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-white bg-[#1877F2] hover:bg-blue-600 font-medium text-sm transition shadow-sm"
              >
                {actionLabel}
              </a>
            ) : (
              <button
                onClick={onActionClick}
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-white bg-[#1877F2] hover:bg-blue-600 font-medium text-sm transition shadow-sm"
              >
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

