import type { ChurchDataPayload, PrayerRequest } from '../types/church';

const CACHE_KEY = 'sipec_church_cache_v1';
const CACHE_TIMESTAMP_KEY = 'sipec_church_cache_timestamp_v1';
const PRAYER_OFFLINE_QUEUE_KEY = 'sipec_prayer_offline_queue_v1';

/**
 * Gestionnaire du cache local (Offline-First)
 * Permet l'affichage instantané de l'église même sans réseau
 */
export const offlineStorage = {
  /**
   * Sauvegarde les données de l'église dans le stockage local
   */
  saveChurchData(data: ChurchDataPayload): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().toISOString());
    } catch (err) {
      console.warn('[OfflineStorage] Impossible de sauvegarder les données locales :', err);
    }
  },

  /**
   * Récupère les données depuis le stockage local
   */
  getCachedChurchData(): ChurchDataPayload | null {
    try {
      const serialized = localStorage.getItem(CACHE_KEY);
      if (!serialized) return null;
      return JSON.parse(serialized) as ChurchDataPayload;
    } catch (err) {
      console.warn('[OfflineStorage] Données locales corrompues ou inaccessibles :', err);
      return null;
    }
  },

  /**
   * Récupère la date et l'heure du dernier cache
   */
  getLastCachedTimestamp(): string | null {
    try {
      return localStorage.getItem(CACHE_TIMESTAMP_KEY);
    } catch {
      return null;
    }
  },

  /**
   * Enregistre une intention de prière dans la file d'attente hors-ligne
   */
  enqueuePrayerRequest(request: PrayerRequest): void {
    try {
      const queue = this.getOfflinePrayerQueue();
      queue.push({ ...request, syncedToCloud: false });
      localStorage.setItem(PRAYER_OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    } catch (err) {
      console.warn('[OfflineStorage] Échec d\'enregistrement hors-ligne de la prière :', err);
    }
  },

  /**
   * Récupère la file d'attente des prières hors-ligne
   */
  getOfflinePrayerQueue(): PrayerRequest[] {
    try {
      const raw = localStorage.getItem(PRAYER_OFFLINE_QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Vide la file d'attente après synchronisation réussie
   */
  clearPrayerQueue(): void {
    try {
      localStorage.removeItem(PRAYER_OFFLINE_QUEUE_KEY);
    } catch {}
  },
};
