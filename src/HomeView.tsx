import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useChurchSpaData } from './hooks/useChurchSpaData';
import { NavbarSpa } from './components/spa/NavbarSpa';
import { HeroSpa } from './components/spa/HeroSpa';
import { AboutSpa } from './components/spa/AboutSpa';
import { BioSpa } from './components/spa/BioSpa';
import { ServicesSpa } from './components/spa/ServicesSpa';
import { DepartmentsSpa } from './components/spa/DepartmentsSpa';
import { GallerySpa } from './components/spa/GallerySpa';
import { SermonsSpa } from './components/spa/SermonsSpa';
import { LiveSpa } from './components/spa/LiveSpa';
import { AddressSpa } from './components/spa/AddressSpa';
import { ContactSpa } from './components/spa/ContactSpa';
import { FooterSpa } from './components/spa/FooterSpa';
import { SpaSkeletons } from './components/spa/SpaSkeletons';
import { ArrowUp, WifiOff } from 'lucide-react';
import { useLanguage } from './lib/language';
import { localizeChurchSpaData } from './lib/localizeChurchSpaData';

/**
 * Single Page Application (SPA) - Église Siloam (S.I.P.E.C)
 * 
 * Architecture & Contraintes respectées :
 * 1. Zéro Image IA : Uniquement des icônes SVG (Lucide) et des espaces réservés structurés avec bordures fines.
 * 2. Palette & Mode Sombre :
 *    - Mode Clair : bg-slate-50, cartes bg-white, texte text-slate-900, accents bg-sky-500.
 *    - Mode Sombre : dark:bg-slate-950, cartes dark:bg-slate-900, texte dark:text-slate-100, accents text-sky-400.
 * 3. Navigation Moderne : Barre fixe avec emplacement du logo, burger mobile, toggle clair/sombre.
 * 4. Architecture Données : Récupération dynamique typée avec hooks et Skeletons de chargement.
 * 5. Les 10 Pages / Onglets modulaires intégrés avec fluidité.
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
    <div className="min-h-screen bg-sipec-light-alt text-sipec-text dark:bg-sipec-dark dark:text-sipec-text-dark font-sans tracking-tight antialiased selection:bg-sipec-secondary selection:text-white transition-colors duration-200 flex flex-col">
      {/* Alerte discrète hors-ligne */}
      {isOffline && (
        <aside aria-label="Statut réseau" className="bg-sky-500 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t('offline.message')}</span>
        </aside>
      )}

      {/* Barre de Navigation Fixe avec Logo et Sélecteur Clair/Sombre */}
      <NavbarSpa
        theme={theme}
        onToggleTheme={toggleTheme}
        isLive={localizedData.meta.liveStatus.isLive}
      />

      {/* Contenu Principal de la SPA */}
      <main className="flex-1">
        {loading ? (
          /* États de chargement progressifs (Skeletons) */
          <SpaSkeletons />
        ) : (
          /* Sections modulaires de la SPA */
          <>
            {/* 1. BIENVENUE (Hero) */}
            <HeroSpa
              meta={localizedData.meta}
              impact={{
                members: null,
                departments: localizedData.departments.length,
                nations: null,
                ministryYears: null,
              }}
            />

            {/* 2. À PROPOS DE NOUS */}
            <AboutSpa about={localizedData.about} />

            {/* 3. NOTRE BIOS (Pasteur Fondateur) */}
            <BioSpa founder={localizedData.founder} about={localizedData.about} />

            {/* 4. NOS SERVICES (Soutien Communautaire) */}
            <ServicesSpa services={localizedData.communityServices} />

            {/* NOS DÉPARTEMENTS */}
            <DepartmentsSpa departments={localizedData.departments} />

            {/* NOTRE GALERIE (Masonry Layout sans fausses images) */}
            <GallerySpa items={localizedData.gallery} />

            {/* LIVE & REDIFFUSIONS SIPEC */}
            <LiveSpa streams={localizedData.liveStreams} />

            {/* NOS PRÉDICATIONS (Sermons & Lecteur SVG Factice) */}
            <SermonsSpa sermons={localizedData.sermons} />

            {/* NOTRE ADRESSE (Emplacement Physique Textuel) */}
            <AddressSpa contact={localizedData.meta.contact} />

            {/* CONTACT (Formulaire Validé TypeScript) */}
            <ContactSpa />
          </>
        )}
      </main>

      {/* Pied de Page Officiel */}
      <FooterSpa meta={localizedData.meta} />

      {/* Bouton Flottant Retour en Haut */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
        aria-label="Retour en haut de page"
        title="Remonter"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
};

export default HomeView;
