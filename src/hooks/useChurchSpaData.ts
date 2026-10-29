import { useState, useEffect, useCallback } from 'react';
import type { ChurchSpaData } from '../types/churchSpa';
import { fetchChurchSpaData, DEFAULT_SPA_DATA } from '../lib/churchSpaData';
import { useNetworkStatus } from './useNetworkStatus';

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
  const [data, setData] = useState<ChurchSpaData>(DEFAULT_SPA_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchChurchSpaData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erreur de chargement'));
      setData(DEFAULT_SPA_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    isOffline: !isOnline,
    refresh: loadData,
  };
}
