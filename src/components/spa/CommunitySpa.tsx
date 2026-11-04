import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FacebookPostCard } from './FacebookPostCard';

interface CommunityBadge {
  badge_key: string;
  title: string;
  payload: Record<string, string | number>;
}

export const CommunitySpa: React.FC = () => {
  const [badges, setBadges] = useState<CommunityBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBadges = async () => {
      const { data, error } = await supabase
        .from('community_badges')
        .select('badge_key,title,payload')
        .eq('status', 'published')
        .order('sort_order');

      if (!error) setBadges((data || []) as CommunityBadge[]);
      setLoading(false);
    };

    void loadBadges();
  }, []);

  const weeklyEvents = badges.find((badge) => badge.badge_key === 'weekly_events');
  const weeklyProgram = badges.find((badge) => badge.badge_key === 'weekly_program');
  const developerSignature = badges.find((badge) => badge.badge_key === 'developer_signature');

  if (loading) return null;

  return (
    <section id="communaute" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="space-y-6">
        {weeklyEvents && (
          <FacebookPostCard
            metadata={String(weeklyEvents.payload.metadata || '')}
            content={String(weeklyEvents.payload.description || '')}
            mediaUrl={String(weeklyEvents.payload.image_url || '')}
            mediaNode={weeklyEvents.payload.video_url ? (
              <video
                src={String(weeklyEvents.payload.video_url)}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full bg-black object-contain"
              />
            ) : undefined}
            mediaAlt={String(weeklyEvents.payload.event_title || weeklyEvents.title)}
            domain={String(weeklyEvents.payload.domain || '')}
            cardTitle={String(weeklyEvents.payload.event_title || weeklyEvents.title)}
            cardSubtitle={`${weeklyEvents.payload.christians || 0} chrétiens • ${weeklyEvents.payload.visitors || 0} visiteurs • ${weeklyEvents.payload.testimonies || 0} témoignages`}
          />
        )}

        {weeklyProgram && (
          <FacebookPostCard
            metadata={String(weeklyProgram.payload.schedule || '')}
            content={`Prédicateur : ${String(weeklyProgram.payload.preacher_name || '')}\nModérateur : ${String(weeklyProgram.payload.moderator_name || '')}\n${String(weeklyProgram.payload.address || '')}`}
            mediaNode={
              <div className="grid h-full w-full grid-cols-2 gap-px bg-slate-200 dark:bg-slate-700">
                {String(weeklyProgram.payload.preacher_image_url || '') && (
                  <img
                    src={String(weeklyProgram.payload.preacher_image_url)}
                    alt={String(weeklyProgram.payload.preacher_label || 'Prédicateur principal')}
                    className="h-full w-full object-cover"
                  />
                )}
                {String(weeklyProgram.payload.moderator_image_url || '') && (
                  <img
                    src={String(weeklyProgram.payload.moderator_image_url)}
                    alt={String(weeklyProgram.payload.moderator_label || 'Modérateur')}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            }
            mediaAspectRatio="video"
            domain={String(weeklyProgram.payload.domain || '')}
            cardTitle={weeklyProgram.title}
            cardSubtitle={`${String(weeklyProgram.payload.preacher_label || 'Prédicateur principal')} • ${String(weeklyProgram.payload.moderator_label || 'Modérateur')}`}
          />
        )}

        {developerSignature && (
          <FacebookPostCard
            authorName={String(developerSignature.payload.name || '')}
            {...(developerSignature.payload.photo_url ? { authorAvatar: String(developerSignature.payload.photo_url) } : {})}
            metadata={String(developerSignature.payload.metadata || '')}
            content={String(developerSignature.payload.description || '')}
            mediaUrl={String(developerSignature.payload.photo_url || '')}
            mediaAlt={String(developerSignature.payload.name || developerSignature.title)}
            mediaAspectRatio="portrait"
            domain={String(developerSignature.payload.domain || '')}
            cardTitle={String(developerSignature.payload.name || developerSignature.title)}
            cardSubtitle="Designed by"
            actionLabel="Voir le portfolio"
            actionHref={String(developerSignature.payload.portfolio_url || '#')}
          />
        )}
      </div>
    </section>
  );
};
