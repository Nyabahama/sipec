import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useChurchSpaData } from './hooks/useChurchSpaData';
import { NavbarSpa } from './components/spa/NavbarSpa';
import { HeroSpa } from './components/spa/HeroSpa';
import { AboutSpa } from './components/spa/AboutSpa';
import { BioSpa } from './components/spa/BioSpa';
import { DepartmentsSpa } from './components/spa/DepartmentsSpa';
import { GallerySpa } from './components/spa/GallerySpa';
import { SermonsSpa } from './components/spa/SermonsSpa';
import { LiveSpa } from './components/spa/LiveSpa';
import { CultesSpa } from './components/spa/CultesSpa';
import { CommunitySpa } from './components/spa/CommunitySpa';
import { AddressSpa } from './components/spa/AddressSpa';
import { ContactSpa } from './components/spa/ContactSpa';
import { FooterSpa } from './components/spa/FooterSpa';
import { SpaSkeletons } from './components/spa/SpaSkeletons';
import { ArrowUp, WifiOff } from 'lucide-react';
import { useLanguage } from './lib/language';
import { localizeChurchSpaData } from './lib/localizeChurchSpaData';

/**
 * S.I.P.E.C Siloam Kampala
 * Arrière-plan général de site gris très clair (#F0F2F5) avec badges blancs épurés style Facebook
 */
export const HomeView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, t } = useLanguage();
  const { data, loading, isOffline } = useChurchSpaData();
  const localizedData = localizeChurchSpaData(data, language);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 dark:bg-[#0B1120] dark:text-white font-sans antialiased selection:bg-[#1877F2] selection:text-white transition-colors duration-200 flex flex-col">
      {/* Alerte discrète hors-ligne */}
      {isOffline && (
        <aside aria-label="Statut réseau" className="bg-[#1877F2] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t('offline.message')}</span>
        </aside>
      )}

      {/* 1. NAVBAR FACEBOOK UNIFIÉE (Barre fixe, recherche ovale, 5 onglets, cloche 20+, profil) */}
      <NavbarSpa
        theme={theme}
        onToggleTheme={toggleTheme}
        isLive={localizedData.meta.liveStatus.isLive}
      />

      {/* Contenu Principal de la Plateforme (Conserve l'intégralité des données textuelles) */}
      <main className="flex-1">
        {loading ? (
          <SpaSkeletons />
        ) : (
          <>
            {/* 1. BIENVENUE (Hero) */}
            <HeroSpa
              meta={localizedData.meta}
              backgroundImage={localizedData.meta.hero?.imageUrl}
              impact={{
                members: null,
                departments: localizedData.departments.length,
                nations: null,
                ministryYears: null,
              }}
            />

            {/* 2. STATISTIQUES / IMPACT */}
            <AboutSpa about={localizedData.about} />

            {/* 3. NOTRE BIOS (Pasteur Fondateur & Vision Jean 9:7) */}
            <BioSpa founder={localizedData.founder} about={localizedData.about} />

            {/* 5. NOS DÉPARTEMENTS ET CHORALES */}
            <DepartmentsSpa departments={localizedData.departments} />

            {/* 6. NOS PRÉDICATIONS */}
            <SermonsSpa sermons={localizedData.sermons} />

            {/* 7. LIVE TV SIPEC */}
            <LiveSpa streams={localizedData.liveStreams} />

            {/* 8. GALERIE */}
            <GallerySpa items={localizedData.gallery} />

            {/* 9. ÉVÉNEMENTS / HORAIRES DES CULTES */}
            <CultesSpa services={localizedData.servicesCalendar} />

            {/* 11. ADRESSE */}
            <AddressSpa contact={localizedData.meta.contact} />

            {/* 12. CONTACT */}
            <ContactSpa />
          </>
        )}
        {/* La communauté se charge indépendamment du reste du contenu Supabase. */}
        <CommunitySpa />
      </main>

      {/* 11. PIED DE PAGE OFFICIEL */}
      <FooterSpa meta={localizedData.meta} />

      {/* Bouton Flottant Retour en Haut */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#1877F2] dark:hover:text-[#1877F2] border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition transform hover:-translate-y-0.5 active:translate-y-0"
        aria-label="Retour en haut de page"
        title="Remonter"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
};

export default HomeView;
