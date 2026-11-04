import React, { useEffect, useState } from 'react';
import {
  CalendarDays,
  Clock3,
  Code2,
  ExternalLink,
  MapPin,
  MessageSquareText,
  Plus,
  Sparkles,
  UserRoundCheck,
  Users,
} from 'lucide-react';
import churchLogo from '../../assets/siloam.jpeg';
import founderPortrait from '../../assets/apo.jpeg';
import { FacebookPostCard } from './FacebookPostCard';
import { supabase } from '../../lib/supabase';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    verified?: boolean;
  };
  date: string;
  category: 'priere' | 'temoignage' | 'annonce' | 'culte';
  title: string;
  content: string;
  mediaUrl: string;
  amenCount: number;
  commentsCount: number;
  sharesCount: number;
  actionButtonLabel: string;
  actionButtonUrl: string;
}

interface CommunityBadge {
  badge_key: string;
  title: string;
  payload: Record<string, string | number>;
}

export const CommunitySpa: React.FC = () => {
  const [filter, setFilter] = useState<'tous' | 'priere' | 'temoignage' | 'annonce'>('tous');
  const [communityBadges, setCommunityBadges] = useState<CommunityBadge[]>([]);
  const [communityLoading, setCommunityLoading] = useState(true);

  useEffect(() => {
    const loadCommunityBadges = async () => {
      const { data, error } = await supabase
        .from('community_badges')
        .select('badge_key,title,payload')
        .eq('status', 'published')
        .order('sort_order');
      if (!error) setCommunityBadges((data || []) as CommunityBadge[]);
      setCommunityLoading(false);
    };
    void loadCommunityBadges();
  }, []);

  // Stories Spirituelles (Facebook / Instagram Stories)
  const stories = [
    { id: '1', title: 'Votre Histoire', subtitle: 'Témoigner', isAdd: true, image: '' },
    { id: '2', title: 'Verset du Jour', subtitle: 'Jean 9:7', isAdd: false, image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=400&q=80' },
    { id: '3', title: 'Prière Matinale', subtitle: 'Intercession', isAdd: false, image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80' },
    { id: '4', title: 'Chorale Shekinah', subtitle: 'Répétition', isAdd: false, image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80' },
    { id: '5', title: 'Jeunesse Siloam', subtitle: 'Impact Kampala', isAdd: false, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
  ];

  const initialPosts: CommunityPost[] = [
    {
      id: 'post-1',
      author: {
        name: 'Pasteur Fondateur',
        role: 'Visionnaire S.I.P.E.C',
        avatar: founderPortrait,
        verified: true,
      },
      date: 'Aujourd’hui à 09:30 • Kampala',
      category: 'annonce',
      title: 'Message d’encouragement pour notre assemblée',
      content:
        'Bien-aimés de Dieu, que la grâce et la paix de notre Seigneur Jésus-Christ reposent sur vos familles. En cette saison, souvenez-vous de Jean 9:7 : allez, lavez-vous au réservoir de Siloé, et revenez voyant ! Ce que Dieu a commencé dans votre vie, Il l’achèvera avec puissance. Rendez-vous ce dimanche dès 08h00 pour célébrer sa fidélité.',
      mediaUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1400&q=85',
      amenCount: 348,
      commentsCount: 42,
      sharesCount: 19,
      actionButtonLabel: 'Regarder',
      actionButtonUrl: '#live',
    },
    {
      id: 'post-2',
      author: {
        name: 'Chaîne d’Intercession Siloam',
        role: 'Ministère de Prière',
        avatar: churchLogo,
        verified: true,
      },
      date: 'Hier à 21:00 • Nuit de Veillée',
      category: 'priere',
      title: 'Portons ensemble nos frères et sœurs dans la prière',
      content:
        'Nous prions aujourd’hui pour tous ceux qui traversent une vallée d’épreuves, de maladie ou de doute. Dieu n’abandonne jamais ses enfants. Déposez votre « Amen » en commentaire pour sceller cette prière d’autorité et de délivrance.',
      mediaUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1400&q=85',
      amenCount: 512,
      commentsCount: 88,
      sharesCount: 34,
      actionButtonLabel: 'Déposer une prière',
      actionButtonUrl: '#contact',
    },
    {
      id: 'post-3',
      author: {
        name: 'Sœur Rachel K.',
        role: 'Membre de la Communauté',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verified: false,
      },
      date: 'Il y a 2 jours • Témoignage de Guérison',
      category: 'temoignage',
      title: 'Témoignage : Le Seigneur m’a guérie lors du culte de dimanche',
      content:
        'Je rends toute la gloire à Dieu pour la prière d’imposition des mains de dimanche dernier. Après trois semaines d’angoisse et de douleurs, les examens médicaux ont confirmé ma guérison complète. Dieu est vivant à Siloam !',
      mediaUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85',
      amenCount: 279,
      commentsCount: 31,
      sharesCount: 12,
      actionButtonLabel: 'Témoigner',
      actionButtonUrl: '#contact',
    },
  ];

  const filteredPosts =
    filter === 'tous'
      ? initialPosts
      : initialPosts.filter((post) => post.category === filter);

  const weeklyEvents = communityBadges.find((badge) => badge.badge_key === 'weekly_events');
  const weeklyProgram = communityBadges.find((badge) => badge.badge_key === 'weekly_program');
  const developerSignature = communityBadges.find((badge) => badge.badge_key === 'developer_signature');

  return (
    <section id="communaute" className="py-10 max-w-3xl mx-auto px-4 sm:px-6">
      {/* En-tête de section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#1877F2] dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            La Famille S.I.P.E.C
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fil Communautaire & Témoignages
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Partagez la vie de l'église, priez les uns pour les autres et proclamez les victoires.
          </p>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium text-sm shadow-sm transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Partager un témoignage</span>
        </a>
      </div>

      {!communityLoading && <div className="mb-6 grid gap-4 lg:grid-cols-2">
        {weeklyEvents && (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-gradient-to-r from-[#1877F2] to-indigo-600 px-5 py-4 text-white">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <h3 className="font-bold">{String(weeklyEvents.title)}</h3>
            </div>
            <p className="mt-1 text-xs text-blue-100">{String(weeklyEvents.payload.description || '')}</p>
          </div>
          <div className="p-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={String(weeklyEvents.payload.image_url || '')}
                alt="Événement communautaire S.I.P.E.C"
                className="h-36 w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-8">
                <p className="text-sm font-bold text-white">{String(weeklyEvents.payload.event_title || '')}</p>
                <p className="text-xs text-white/80">{String(weeklyEvents.payload.event_subtitle || '')}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: Users, value: Number(weeklyEvents.payload.christians || 0), label: 'Chrétiens' },
                { icon: UserRoundCheck, value: Number(weeklyEvents.payload.visitors || 0), label: 'Visiteurs' },
                { icon: MessageSquareText, value: Number(weeklyEvents.payload.testimonies || 0), label: 'Témoignages' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-xl bg-slate-50 px-2 py-3 text-center dark:bg-slate-800">
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
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 text-[#1877F2]">
              <Clock3 className="h-5 w-5" />
              <h3 className="font-bold text-slate-900 dark:text-white">{String(weeklyProgram.title)}</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 px-4">
            <div>
              <img
                src={String(weeklyProgram.payload.preacher_image_url || '')}
                alt="Prédicateur principal"
                className="h-28 w-full rounded-l-xl object-cover"
              />
              <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">{String(weeklyProgram.payload.preacher_label || '')}</p>
            </div>
            <div>
              <img
                src={String(weeklyProgram.payload.moderator_image_url || '')}
                alt="Modérateur du culte"
                className="h-28 w-full rounded-r-xl object-cover"
              />
              <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">{String(weeklyProgram.payload.moderator_label || '')}</p>
            </div>
          </div>
          <div className="m-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/40">
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p><strong>Prédicateur :</strong> {String(weeklyProgram.payload.preacher_name || '')}</p>
              <p><strong>Modérateur :</strong> {String(weeklyProgram.payload.moderator_name || '')}</p>
              <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#1877F2]" /> {String(weeklyProgram.payload.schedule || '')}</p>
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" /> {String(weeklyProgram.payload.address || '')}</p>
            </div>
          </div>
        </article>
        )}
      </div>}

      {developerSignature && <aside className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-4 text-white shadow-lg dark:border-slate-700">
        <div className="flex items-center gap-3">
          {String(developerSignature.payload.photo_url || '') ? (
            <img
              src={String(developerSignature.payload.photo_url)}
              alt="Chrispin Nyabahama"
              className="h-16 w-16 rounded-full border-2 border-white/30 object-cover shadow-md"
            />
          ) : (
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-white/30 bg-blue-600 text-xl font-bold shadow-md">
              CN
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-blue-300">
              <Code2 className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Designed by</span>
            </div>
            <h3 className="mt-0.5 font-bold">{String(developerSignature.payload.name || developerSignature.title)}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              {String(developerSignature.payload.description || '')}
            </p>
          </div>
          <a
            href={String(developerSignature.payload.portfolio_url || '#')}
            target="_blank"
            rel="noreferrer"
            className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-900 transition hover:bg-blue-50 sm:inline-flex"
          >
            Portfolio <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <a
          href={String(developerSignature.payload.portfolio_url || '#')}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-900 sm:hidden"
        >
          Voir mon portfolio <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </aside>}

      {/* Stories Spirituelles (Facebook Stories) */}
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stories.map((story) => (
          <div
            key={story.id}
            className="group relative h-40 w-24 sm:h-44 sm:w-28 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:scale-105"
          >
            {story.isAdd ? (
              <div className="flex h-full w-full flex-col items-center justify-between p-3 bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 text-center">
                <div className="mt-3 grid h-9 w-9 place-items-center rounded-full bg-[#1877F2] text-white shadow-md">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Votre Histoire</p>
                  <p className="text-[10px] text-slate-500">Témoigner</p>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute inset-x-2 bottom-2">
                  <p className="text-xs font-bold text-white leading-tight drop-shadow">
                    {story.title}
                  </p>
                  <p className="text-[10px] text-slate-300 drop-shadow">
                    {story.subtitle}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Filtres thématiques sous forme de Pills rounded-full */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[
          { key: 'tous', label: 'Toutes les publications' },
          { key: 'priere', label: 'Demandes de prière' },
          { key: 'temoignage', label: 'Témoignages vivants' },
          { key: 'annonce', label: 'Annonces officielles' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
              filter === f.key
                ? 'bg-[#1877F2] text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Publications utilisant la stricte anatomie de la maquette Radio Okapi */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <FacebookPostCard
            key={post.id}
            authorName={post.author.name}
            authorAvatar={post.author.avatar}
            metadata={post.date}
            isVerified={post.author.verified}
            content={post.content}
            mediaUrl={post.mediaUrl}
            domain="SILOAMKAMPALA.ORG"
            cardTitle={post.title}
            cardSubtitle={post.author.role}
            amenCount={post.amenCount}
            commentsCount={post.commentsCount}
            sharesCount={post.sharesCount}
            actionLabel={post.actionButtonLabel}
            actionHref={post.actionButtonUrl}
          />
        ))}
      </div>
    </section>
  );
};
