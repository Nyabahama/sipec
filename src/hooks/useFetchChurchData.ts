import { useState, useEffect, useCallback, useRef } from 'react';
import type { ChurchDataPayload, FetchChurchDataState } from '../types/church';
import { fetchChurchDataFromSupabase, DEFAULT_OFFICIAL_CHURCH_DATA } from '../lib/supabase';
import { offlineStorage } from '../lib/offlineStorage';
import { useNetworkStatus } from './useNetworkStatus';

/**
 * Hook personnalisé TypeScript Offline-First pour la S.I.P.E.C
 * 
 * Principes clés :
 * 1. Cache-First Hydration : Charge immédiatement le cache local (localStorage/IndexedDB) en < 50ms.
 * 2. Background Revalidation : Si connecté, interroge Supabase en arrière-plan pour rafraîchir les données.
 * 3. Graceful Offline Fallback : Si hors ligne ou réseau instable, sert les données en cache sans bloquer l'UI.
 * 4. Sync automatique : Rafraîchit les données dès que la connexion internet est rétablie.
 */
export function useFetchChurchData(): FetchChurchDataState {
  const { isOnline } = useNetworkStatus();
  const [data, setData] = useState<ChurchDataPayload | null>(() => {
    // Tentative d'initialisation synchrone depuis le cache local pour éviter tout flash blanc
    const cached = offlineStorage.getCachedChurchData();
    return cached || DEFAULT_OFFICIAL_CHURCH_DATA;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFromCache, setIsFromCache] = useState<boolean>(true);
  const [lastCachedAt, setLastCachedAt] = useState<string | null>(() => {
    return offlineStorage.getLastCachedTimestamp();
  });

  const isInitialMount = useRef(true);

  const loadData = useCallback(async (forceOnline = false) => {
    setLoading(true);
    setError(null);

    // 1. Vérification du cache local
    const cachedData = offlineStorage.getCachedChurchData();
    if (cachedData && !forceOnline) {
      setData(cachedData);
      setIsFromCache(true);
      setLastCachedAt(offlineStorage.getLastCachedTimestamp());
    }

    // 2. Si le client est hors ligne, on s'arrête ici avec les données en cache
    if (!isOnline) {
      setLoading(false);
      setIsFromCache(true);
      if (!cachedData) {
        // En l'absence totale de cache antérieur, injecter les données officielles
        offlineStorage.saveChurchData(DEFAULT_OFFICIAL_CHURCH_DATA);
        setData(DEFAULT_OFFICIAL_CHURCH_DATA);
      }
      return;
    }

    // 3. Réseau actif : Requête vers Supabase
    try {
      const freshData = await fetchChurchDataFromSupabase();
      setData(freshData);
      setIsFromCache(false);

      // Persistance immédiate dans le cache hors-ligne
      offlineStorage.saveChurchData(freshData);
      const nowStr = new Date().toISOString();
      setLastCachedAt(nowStr);
    } catch (err) {
      const errObj = err instanceof Error ? err : new Error('Erreur de synchronisation Supabase');
      console.warn('[useFetchChurchData] Rebond sur le cache local suite à erreur :', errObj);
      setError(errObj);
      
      // Fallback sur le cache local
      if (cachedData) {
        setData(cachedData);
        setIsFromCache(true);
      } else {
        setData(DEFAULT_OFFICIAL_CHURCH_DATA);
        setIsFromCache(true);
      }
    } finally {
      setLoading(false);
    }
  }, [isOnline]);

  // Chargement au montage et lors du rétablissement de la connexion
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadData();
    } else if (isOnline) {
      // Reconnexion détectée : rafraîchissement silencieux
      loadData(true);
    }
  }, [isOnline, loadData]);

  const refresh = useCallback(async () => {
    await loadData(true);
  }, [loadData]);

  return {
    data,
    loading,
    error,
    isOffline: !isOnline,
    isFromCache,
    lastCachedAt,
    refresh,
  };
}
