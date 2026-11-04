import React, { useEffect, useState } from 'react';
import {
  CalendarDays,
  Clock3,
  Code2,
  ExternalLink,
  MapPin,
  MessageSquareText,
  Sparkles,
  UserRoundCheck,
  Users,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

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
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1877F2] dark:bg-blue-950/70 dark:text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          Vie de l&apos;église
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Actualités officielles de la semaine
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {weeklyEvents && (
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="bg-gradient-to-r from-[#1877F2] to-indigo-600 px-5 py-4 text-white">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                <h3 className="font-bold">{String(weeklyEvents.title)}</h3>
              </div>
              <p className="mt-1 text-xs text-blue-100">{String(weeklyEvents.payload.description || '')}</p>
            </div>
            <div className="p-4">
              {String(weeklyEvents.payload.image_url || '') && (
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={String(weeklyEvents.payload.image_url)}
                    alt="Événement communautaire S.I.P.E.C"
                    className="h-44 w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10">
                    <p className="text-sm font-bold text-white">{String(weeklyEvents.payload.event_title || '')}</p>
                    <p className="text-xs text-white/80">{String(weeklyEvents.payload.event_subtitle || '')}</p>
                  </div>
                </div>
              )}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { icon: Users, value: Number(weeklyEvents.payload.christians || 0), label: 'Chrétiens' },
                  { icon: UserRoundCheck, value: Number(weeklyEvents.payload.visitors || 0), label: 'Visiteurs' },
                  { icon: MessageSquareText, value: Number(weeklyEvents.payload.testimonies || 0), label: 'Témoignages' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="rounded-2xl bg-slate-50 px-2 py-3 text-center dark:bg-slate-800">
                    <Icon className="mx-auto mb-1 h-4 w-4 text-[#1877F2]" />
                    <strong className="block text-lg text-slate-900 dark:text-white">{value}</strong>
                    <span className="text-[10px] font-medium text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}

        {weeklyProgram && (
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 text-[#1877F2]">
                <Clock3 className="h-5 w-5" />
                <h3 className="font-bold text-slate-900 dark:text-white">{String(weeklyProgram.title)}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4">
              {[['preacher_image_url', 'preacher_label', 'Prédicateur principal'], ['moderator_image_url', 'moderator_label', 'Modérateur']].map(([imageKey, labelKey, fallback]) => (
                <div key={imageKey}>
                  {String(weeklyProgram.payload[imageKey] || '') && (
                    <img src={String(weeklyProgram.payload[imageKey])} alt={String(weeklyProgram.payload[labelKey] || fallback)} className="h-32 w-full rounded-2xl object-cover" />
                  )}
                  <p className="mt-2 text-center text-xs font-semibold text-slate-700 dark:text-slate-300">{String(weeklyProgram.payload[labelKey] || fallback)}</p>
                </div>
              ))}
            </div>
            <div className="m-4 rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/40">
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Prédicateur :</strong> {String(weeklyProgram.payload.preacher_name || '')}</p>
                <p><strong>Modérateur :</strong> {String(weeklyProgram.payload.moderator_name || '')}</p>
                <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#1877F2]" /> {String(weeklyProgram.payload.schedule || '')}</p>
                <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" /> {String(weeklyProgram.payload.address || '')}</p>
              </div>
            </div>
          </article>
        )}
      </div>

      {developerSignature && (
        <article className="mt-5 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-5 text-white shadow-lg sm:flex-row sm:items-center">
          {String(developerSignature.payload.photo_url || '') ? (
            <img src={String(developerSignature.payload.photo_url)} alt="Chrispin Nyabahama" className="h-16 w-16 rounded-full border-2 border-white/30 object-cover" />
          ) : (
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-white/30 bg-blue-600 text-xl font-bold">CN</div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-blue-300">
              <Code2 className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Designed by</span>
            </div>
            <h3 className="mt-0.5 font-bold">{String(developerSignature.payload.name || developerSignature.title)}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-300">{String(developerSignature.payload.description || '')}</p>
          </div>
          <a
            href={String(developerSignature.payload.portfolio_url || '#')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-slate-900"
          >
            Portfolio <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </article>
      )}
    </section>
  );
};
