import React, { useEffect, useState } from 'react';
import { Globe, MoreHorizontal, X, ThumbsUp, MessageSquare, Share2, Info } from 'lucide-react';
import churchLogo from '../../assets/siloam.jpeg';
import { supabase } from '../../lib/supabase';

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
  shareImageUrl?: string;
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
  actionDetails?: string;
}

export const FacebookPostCard: React.FC<FacebookPostCardProps> = ({
  authorName = 'S.I.P.E.C Siloam Kampala',
  authorAvatar = churchLogo,
  metadata = 'À l’instant',
  isVerified = true,
  content,
  mediaUrl,
  shareImageUrl,
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
  actionDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(amenCount);
  const [isVisible, setIsVisible] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = React.useRef<HTMLElement>(null);
  const [comments, setComments] = useState<Array<{ id: string; author_name: string; content: string }>>([]);
  const postKey = `${cardTitle}-${window.location.pathname}`;

  if (!isVisible) return null;

  const handleLike = () => {
    setHasLiked(!hasLiked);
    setLikes(hasLiked ? likes - 1 : likes + 1);
  };

  const shareTo = (network: 'facebook' | 'whatsapp' | 'tiktok' | 'copy') => {
    const url = new URL(window.location.href);
    url.hash = `publication-${cardTitle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)}`;
    const text = `${cardTitle}\n${content}`;
    const targets = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url.href)}&quote=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url.href}`)}`,
      tiktok: `https://www.tiktok.com/share?url=${encodeURIComponent(url.href)}`,
      copy: url.href,
    };
    if (network === 'copy') {
      void navigator.clipboard.writeText(`${text}\n${url.href}`);
      setShowShareMenu(false);
      return;
    }
    window.open(targets[network], '_blank', 'noopener,noreferrer,width=720,height=600');
    setShowShareMenu(false);
  };

  const shareNative = async () => {
    const slug = cardTitle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
    const url = `${window.location.origin}${window.location.pathname}#publication-${slug}`;

    const shareData: ShareData = {
      title: cardTitle,
      text: content,
      url,
    };

    try {
      const displayedImage = cardRef.current?.querySelector<HTMLImageElement>('[data-share-media] img')?.src;
      const imageUrl = shareImageUrl || displayedImage || mediaUrl;
      if (imageUrl && typeof navigator.canShare === 'function') {
        const response = await fetch(imageUrl);
        if (response.ok) {
          const blob = await response.blob();
          const extension = blob.type.split('/')[1]?.split(';')[0] || 'jpg';
          const file = new File([blob], `sipec-${Date.now()}.${extension}`, { type: blob.type || 'image/jpeg' });
          const fileShareData: ShareData = { ...shareData, files: [file] };
          if (navigator.canShare(fileShareData)) shareData.files = [file];
        }
      }

      if (typeof navigator.share === 'function' && (!shareData.files || navigator.canShare?.(shareData))) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${cardTitle}\n${content}\n${url}`);
        setShowShareMenu(true);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      await navigator.clipboard.writeText(`${cardTitle}\n${content}\n${url}`).catch(() => undefined);
      setShowShareMenu(true);
    }
  };

  useEffect(() => {
    let mounted = true;
    supabase.from('public_comments').select('id, author_name, content').eq('post_key', postKey).order('created_at', { ascending: true })
      .then(({ data }) => {
        if (mounted && data) setComments(data);
      });
    return () => { mounted = false; };
  }, [postKey]);

  const submitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const authorName = String(form.get('authorName') || '').trim();
    const comment = String(form.get('comment') || '').trim();
    if (!authorName || !comment) return;
    const { data, error } = await supabase.from('public_comments').insert({
      post_key: postKey,
      author_name: authorName,
      content: comment,
    }).select('id, author_name, content').single();
    if (!error && data) {
      setComments((current) => [...current, data]);
      event.currentTarget.reset();
    }
  };

  const shouldTruncate = content.length > 200;
  const displayedContent = shouldTruncate && !isExpanded ? content.slice(0, 200) + '...' : content;

  return (
    <article ref={cardRef} className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6 transition hover:shadow-md">
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
          data-share-media
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

      {showDetails && actionDetails && (
        <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-4 text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-950/40">
          {actionDetails}
        </div>
      )}

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
            onClick={() => setShowComments((value) => !value)}
            className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Commenter</span>
          </button>

          <div className="relative">
            <button
              onClick={() => {
                if (typeof navigator.share === 'function') void shareNative();
                else setShowShareMenu((value) => !value);
              }}
              className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Partager</span>
            </button>
            {showShareMenu && (
              <div className="absolute bottom-full left-0 z-20 mb-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <button onClick={() => void shareNative()} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Partager avec...</button>
                <button onClick={() => shareTo('facebook')} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Facebook</button>
                <button onClick={() => shareTo('whatsapp')} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">WhatsApp</button>
                <button onClick={() => shareTo('tiktok')} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">TikTok</button>
                <button onClick={() => shareTo('copy')} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Instagram / Copier le lien</button>
              </div>
            )}
          </div>
        </div>

        {/* Bouton d'action pilule à l'extrême droite */}
        {actionLabel && (
          <div>
            {actionHref && actionHref !== '#' ? (
              <a
                href={actionHref}
                target={actionHref.startsWith('http') ? '_blank' : undefined}
                rel={actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-white bg-[#1877F2] hover:bg-blue-600 font-medium text-sm transition shadow-sm"
              >
                {actionLabel}
              </a>
            ) : (
              <button
                onClick={actionDetails ? () => setShowDetails((value) => !value) : onActionClick}
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-white bg-[#1877F2] hover:bg-blue-600 font-medium text-sm transition shadow-sm"
              >
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </div>
      {showComments && (
        <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-4">
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
                <p className="text-xs font-bold">{comment.author_name}</p>
                <p className="mt-1 text-sm">{comment.content}</p>
              </div>
            ))}
            {comments.length === 0 && <p className="text-sm text-slate-500">Soyez le premier à commenter.</p>}
          </div>
          <form onSubmit={submitComment} className="mt-4 grid gap-2">
            <input required name="authorName" placeholder="Votre nom" className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
            <textarea required name="comment" rows={2} placeholder="Votre commentaire..." className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
            <button className="rounded-full bg-[#1877F2] px-4 py-2 text-sm font-bold text-white">Publier le commentaire</button>
          </form>
        </div>
      )}
    </article>
  );
};
