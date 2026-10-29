import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface OfflineBannerProps {
  isOffline: boolean;
  isFromCache: boolean;
  lastCachedAt: string | null;
  onRefresh: () => void;
  isSimulatedOffline: boolean;
  onToggleSimulatedOffline: () => void;
  loading: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOffline,
  lastCachedAt,
  onRefresh,
  isSimulatedOffline,
  onToggleSimulatedOffline,
  loading,
}) => {
  return (
    <aside aria-label="État de synchronisation" className="w-full bg-white border-b border-slate-100 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isOffline ? (
            <span className="flex items-center gap-1.5 text-sky-600 font-medium">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Hors-ligne (Cache local actif)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-600">
              <Wifi className="w-3.5 h-3.5 text-sky-500" />
              <span>En ligne</span>
            </span>
          )}
          {lastCachedAt && (
            <span className="hidden sm:inline text-slate-400">
              • Dernière synchro : {new Date(lastCachedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSimulatedOffline}
            className="text-[11px] px-2 py-0.5 rounded border border-slate-200 text-slate-600 hover:border-sky-500 hover:text-sky-600 transition"
          >
            {isSimulatedOffline ? 'Désactiver Simu' : 'Tester Hors-ligne'}
          </button>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
