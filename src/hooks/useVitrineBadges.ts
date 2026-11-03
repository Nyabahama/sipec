import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { VitrineBadge } from '../types/vitrineBadge';
import { DEFAULT_VITRINE_BADGES } from '../lib/defaultVitrineBadges';

export function useVitrineBadges() {
  const [badges, setBadges] = useState<VitrineBadge[]>(DEFAULT_VITRINE_BADGES);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBadges = useCallback(async () => {
    try {
      const hasSupabase = Boolean(
        import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('mock-sipec')
      );

      if (!hasSupabase) {
        setBadges(DEFAULT_VITRINE_BADGES);
        setLoading(false);
        return;
      }

      const { data, error: sbError } = await supabase
        .from('vitrine_badges')
        .select('*')
        .order('sort_order', { ascending: true });

      if (sbError) {
        throw sbError;
      }

      if (data && data.length > 0) {
        setBadges(data as VitrineBadge[]);
      } else {
        setBadges(DEFAULT_VITRINE_BADGES);
      }
    } catch (err) {
      console.warn('Chargement des badges Supabase échoué, utilisation du fallback local :', err);
      setError(err instanceof Error ? err : new Error('Erreur de chargement'));
      setBadges(DEFAULT_VITRINE_BADGES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBadges();

    // Abonnement en temps réel aux modifications de l'administration
    const channel = supabase
      .channel('vitrine_badges_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vitrine_badges' },
        () => {
          void fetchBadges();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [fetchBadges]);

  const getBadgesBySection = useCallback(
    (sectionTarget: string): VitrineBadge[] => {
      return badges.filter((badge) => badge.section_target === sectionTarget);
    },
    [badges]
  );

  return {
    badges,
    loading,
    error,
    refresh: fetchBadges,
    getBadgesBySection,
  };
}

