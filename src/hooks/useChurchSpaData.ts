import { useState, useEffect, useCallback } from 'react';
import type { ChurchSpaData } from '../types/churchSpa';
import { fetchChurchSpaData, EMPTY_SPA_DATA } from '../lib/churchSpaData';
import { useNetworkStatus } from './useNetworkStatus';
import { useLanguage } from '../lib/language';
import { subscribePublicContent } from '../services/supabaseContentService';

export interface UseChurchSpaDataReturn {
  data: ChurchSpaData;
  loading: boolean;
  error: Error | null;
  isOffline: boolean;
  refresh: () => Promise<void>;
}

/**
 * Hook personnalisé Offline-First simulant la récupération Supabase
 * Fournit les états de chargement (loading) pour afficher les skeletons
 */
export function useChurchSpaData(): UseChurchSpaDataReturn {
  const { isOnline } = useNetworkStatus();
  const { language } = useLanguage();
  const [data, setData] = useState<ChurchSpaData>(EMPTY_SPA_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchChurchSpaData(language);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erreur de chargement'));
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadData();
    const unsubscribe = subscribePublicContent(() => { void loadData(); });
    return unsubscribe;
  }, [loadData]);

  return {
    data,
    loading,
    error,
    isOffline: !isOnline,
    refresh: loadData,
  };
}
