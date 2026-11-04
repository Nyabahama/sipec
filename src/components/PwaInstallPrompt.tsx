import React, { useEffect, useState } from 'react';
import { Download, Share2, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setVisible(false);
    setInstallEvent(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-3 right-3 z-[80] mx-auto max-w-md rounded-2xl border border-white/20 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur sm:left-auto sm:right-5 sm:w-[380px]" role="dialog" aria-label="Installer l'application SIPEC">
      <button
        className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
        onClick={() => setVisible(false)}
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3 pr-8">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-600"><Download className="h-5 w-5" /></div>
        <div>
          <p className="font-bold">Installer S.I.P.E.C</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            Android, tablette ou ordinateur : utilisez le bouton ci-dessous.
            Sur iPhone/iPad, touchez <Share2 className="inline h-3.5 w-3.5" /> puis « Sur l’écran d’accueil ».
          </p>
        </div>
      </div>
      <button onClick={() => void install()} className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold hover:bg-blue-500">
        Installer l’application
      </button>
    </div>
  );
};
