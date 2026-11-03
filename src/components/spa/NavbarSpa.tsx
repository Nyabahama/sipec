import React, { useEffect, useState } from 'react';
import {
  Home,
  Church,
  Users,
  PlaySquare,
  MapPin,
  Search,
  LayoutGrid,
  MessageCircle,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';
import churchLogo from '../../assets/siloam.jpeg';
import founderPortrait from '../../assets/apo.jpeg';
import { useLanguage, type Language } from '../../lib/language';

interface NavbarSpaProps {
  theme: Theme;
  onToggleTheme: () => void;
  isLive?: boolean;
}

export const NavbarSpa: React.FC<NavbarSpaProps> = ({
  theme,
  onToggleTheme,
}) => {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('#bienvenue');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { label: 'Accueil', href: '#bienvenue', icon: Home },
    { label: "L'Église", href: '#eglise', icon: Church },
    { label: 'Communauté', href: '#communaute', icon: Users },
    { label: 'Médias', href: '#medias', icon: PlaySquare },
    { label: 'Nous Rejoindre', href: '#rejoindre', icon: MapPin },
  ];

  useEffect(() => {
    const sections = tabs
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((s): s is HTMLElement => s !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveTab(`#${visible.target.id}`);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full h-14 sm:h-16 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 shadow-xs px-3 sm:px-4 flex items-center justify-between transition-colors">

      {/* 1. ZONE GAUCHE : Logo officiel + Barre de recherche ovale Facebook */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <a
          href="#bienvenue"
          onClick={() => setActiveTab('#bienvenue')}
          className="flex items-center gap-2"
          aria-label="Accueil Siloam"
        >
          <img
            src={churchLogo}
            alt="Logo officiel S.I.P.E.C Siloam Kampala"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm"
          />
        </a>

        {/* Barre de recherche ovale stylisée (Référence Facebook) */}
        <div className="relative hidden md:flex items-center">
          <div className="flex items-center gap-2 bg-[#F0F2F5] dark:bg-slate-800/90 rounded-full py-2 px-3.5 text-slate-500 dark:text-slate-400 w-52 xl:w-64 transition focus-within:w-72 focus-within:ring-2 focus-within:ring-[#1877F2]/30">
            <Search className="w-4 h-4 shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher sur Siloam..."
              className="bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* 2. ZONE CENTRALE : Les 5 Onglets Stratégiques Facebook */}
      <nav
        aria-label="Navigation principale Facebook"
        className="hidden md:flex items-center h-full max-w-2xl flex-1 justify-center px-2"
      >
        <div className="flex items-center h-full gap-1 lg:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.href;

            return (
              <a
                key={tab.href}
                href={tab.href}
                onClick={() => setActiveTab(tab.href)}
                title={tab.label}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
                className={`relative h-full flex items-center justify-center px-6 lg:px-9 transition-colors group cursor-pointer ${isActive
                  ? 'text-[#1877F2]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
              >
                <div className="p-2 rounded-xl group-hover:bg-slate-100 dark:group-hover:bg-slate-800/60 transition">
                  <Icon
                    className={`w-6 h-6 transition-transform group-hover:scale-105 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                      }`}
                  />
                </div>

                {/* Ligne bleue épaisse de 3px en dessous (Référence Facebook active tab) */}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#1877F2] rounded-t-full" />
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* 3. ZONE DROITE : Menu applications, Messenger, Notifications 20+, Profil */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Toggle Mode Sombre discret */}
        <button
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F0F2F5] dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-[#D4A017]" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Sélecteur de Langue */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          aria-label="Sélection de la langue"
          className="h-9 sm:h-10 px-2 rounded-full bg-[#F0F2F5] dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold border-none outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="sw">SW</option>
        </select>

        {/* Icône Grille d'applications */}
        <button
          aria-label="Menu des applications"
          title="Applications Siloam"
          className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F0F2F5] dark:bg-slate-800 text-slate-700 dark:text-slate-200 items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Icône Messenger */}
        <a
          href="#contact"
          aria-label="Messagerie & Prière"
          title="Messages & Intercession"
          className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F0F2F5] dark:bg-slate-800 text-slate-700 dark:text-slate-200 items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

        {/* Cloche des notifications avec badge "20+" (Référence Facebook) */}
        <div className="relative">
          <button
            aria-label="Notifications Siloam"
            title="20+ nouvelles annonces et prières"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F0F2F5] dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.2 shadow-sm pointer-events-none">
            20+
          </span>
        </div>

        {/* Avatar circulaire du profil utilisateur */}
        <a
          href="#bios"
          title="Profil pasteur & membre"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700 ml-1 hover:opacity-90 transition shrink-0"
        >
          <img
            src={founderPortrait}
            alt="Profil utilisateur"
            className="w-full h-full object-cover"
          />
        </a>

        {/* Burger Mobile pour les écrans étroits */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          className="md:hidden w-9 h-9 rounded-full bg-[#F0F2F5] dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu Mobile Déroulant */}
      {mobileMenuOpen && (
        <div className="absolute top-14 sm:top-16 inset-x-0 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 p-4 shadow-xl flex flex-col gap-2 md:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.href;
            return (
              <a
                key={tab.href}
                href={tab.href}
                onClick={() => {
                  setActiveTab(tab.href);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${isActive
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1877F2]'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
