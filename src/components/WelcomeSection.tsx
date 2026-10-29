import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Upload,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  BookOpen,
  Phone,
  Mail,
  Quote,
  Share2
} from 'lucide-react';

interface ChurchEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

interface DailyVerse {
  id: string;
  content: string;
  scriptureReference: string;
  date: string;
}

export const WelcomeSection: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sipec_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [verseOfTheDay, setVerseOfTheDay] = useState<DailyVerse | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('sipec_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('sipec_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchDynamicData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setEvents([
        {
          id: 'ev-1',
          name: 'Croisade d’Évangélisation & Réveil',
          date: 'Vendredi 24 Octobre 2026',
          location: 'Sanctuaire Principal Siloam',
          description: 'Soirée de prière, proclamation de la Parole et manifestation de la puissance divine.'
        },
        {
          id: 'ev-2',
          name: 'Séminaire des Couples & Familles',
          date: 'Samedi 07 Novembre 2026',
          location: 'Salle Polyvalente',
          description: 'Enseignements bibliques pratiques pour bâtir des foyers chrétiens équilibrés.'
        },
        {
          id: 'ev-3',
          name: 'Convention Annuelle de la Jeunesse',
          date: 'Dimanche 22 Novembre 2026',
          location: 'Grand Tabernacle',
          description: 'Rassemblement de la jeunesse pour une vie d’intégrité et de consécration.'
        }
      ]);

      setVerseOfTheDay({
        id: 'verse-today',
        content: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique.",
        scriptureReference: 'Jean 3:16',
        date: new Date().toISOString().split('T')[0]
      });

      setLoading(false);
    };

    fetchDynamicData();
  }, []);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-200 selection:bg-sky-500 selection:text-white">
      {/* 1. HEADER (STICKY NAVBAR) */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Church logo placeholder + Church name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border-2 border-dashed border-sky-500/70 dark:border-sky-400/70 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-sky-600 dark:text-sky-400">
                <Upload className="w-4 h-4 text-sky-500" />
                <span className="text-[7px] font-bold uppercase tracking-tight text-slate-900 dark:text-slate-100">
                  Logo
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                SILOAM SIPEC
              </span>
            </div>

            {/* Center: Navigation menu with smooth click-activated dropdown submenu */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-900 dark:text-slate-100">
              <a href="#hero" className="hover:text-sky-600 dark:hover:text-sky-400 transition">
                Accueil
              </a>

              {/* Click-activated Dropdown Submenu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-sky-400 transition focus:outline-none"
                  aria-expanded={dropdownOpen}
                >
                  <span>Navigation</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180 text-sky-500' : ''
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-52 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-fade-in">
                    <a
                      href="#pastor-message"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400 transition"
                    >
                      Mot du Pasteur
                    </a>
                    <a
                      href="#schedules"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400 transition"
                    >
                      Horaires
                    </a>
                    <a
                      href="#announcements"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400 transition"
                    >
                      Annonces
                    </a>
                  </div>
                )}
              </div>

              <a href="#testimonials" className="hover:text-sky-600 dark:hover:text-sky-400 transition">
                Témoignages
              </a>
              <a href="#footer" className="hover:text-sky-600 dark:hover:text-sky-400 transition">
                Contact
              </a>
            </nav>

            {/* Right: Light/Dark mode toggle + Mobile burger button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500 bg-white dark:bg-slate-900 transition"
                aria-label="Basculer le thème clair/sombre"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-sky-400" /> : <Moon className="w-4 h-4 text-slate-900" />}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 md:hidden bg-white dark:bg-slate-900 transition"
                aria-label="Menu de navigation mobile"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 shadow-lg animate-fade-in">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Accueil
            </a>
            <a
              href="#pastor-message"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Mot du Pasteur
            </a>
            <a
              href="#schedules"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Horaires
            </a>
            <a
              href="#announcements"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Annonces
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Témoignages
            </a>
            <a
              href="#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      <main className="space-y-24 py-12 md:py-20">
        {/* 2. HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {/* Top Area: Clean transparent placeholder structure with upload icon for congregation image */}
            <div className="relative aspect-[16/7] sm:aspect-[21/9] w-full rounded-2xl border-2 border-dashed border-sky-400 dark:border-sky-600 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs flex flex-col items-center justify-center p-8 text-center group shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4 group-hover:scale-105 transition">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                [ Image inspirante de l'église ou de la congrégation ]
              </h3>
              <p className="text-xs text-slate-900 dark:text-slate-100 font-normal mt-1 max-w-md">
                Espace réservé au téléversement de la photo haute définition du sanctuaire et de l'assemblée réunie.
              </p>
              <span className="mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                Emplacement Fichier Haute Résolution Prêt
              </span>
            </div>

            {/* Typography & Headers */}
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.12]">
                Bienvenue à l'Église Grâce et Vérité
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-100 leading-snug">
                Un lieu où la foi grandit, l'amour unit et l'espérance transforme les vies.
              </p>

              <p className="text-sm sm:text-base font-normal text-slate-900 dark:text-slate-100 leading-relaxed max-w-3xl mx-auto">
                Nous sommes heureux de vous accueillir sur notre plateforme. Que vous soyez membre ou visiteur, nous espérons que vous trouverez ici des ressources spirituelles, des enseignements bibliques et une communauté prête à vous accompagner dans votre marche avec Dieu.
              </p>

              {/* Action Buttons: Two modern rounded-lg Call-to-Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#schedules"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-sm transition active:scale-95"
                >
                  <span>Rejoindre un culte</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#sermons"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-sky-500 text-slate-900 dark:text-slate-100 hover:bg-sky-50 dark:hover:bg-slate-900 font-semibold text-sm transition active:scale-95"
                >
                  Regarder les sermons
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="sermons" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-56 max-w-4xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-sky-400 bg-white/60 p-8 text-center dark:border-sky-600 dark:bg-slate-900/60">
            <Upload className="mb-3 h-7 w-7 text-sky-500" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Sermons</h2>
            <p className="mt-1 text-sm text-slate-900 dark:text-slate-100">Espace réservé aux vidéos des enseignements.</p>
          </div>
        </section>

        {/* 6. VERSE OF THE DAY BANNER (DAILY DATABASE BANNER) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-sky-400 dark:border-sky-500/60 shadow-sm p-8 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Verset du Jour</span>
            </div>

            {loading ? (
              <div className="space-y-3 py-2 animate-pulse">
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
              </div>
            ) : (
              <div>
                <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 italic leading-snug">
                  « {verseOfTheDay?.content} »
                </blockquote>
                <cite className="block mt-2 text-sm font-bold text-sky-600 dark:text-sky-400 not-italic uppercase tracking-wider">
                  — {verseOfTheDay?.scriptureReference}
                </cite>
              </div>
            )}
          </div>
        </section>

        {/* 3. PASTOR'S MESSAGE */}
        <section id="pastor-message" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              {/* Distinct placeholder box with upload icon for the "Photo du pasteur" */}
              <div className="shrink-0">
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-sky-400 dark:border-sky-500 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-3 text-center shadow-inner group">
                  <Upload className="w-7 h-7 text-sky-500 mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase">
                    Photo du pasteur
                  </span>
                  <span className="text-[8px] text-slate-900 dark:text-slate-100 font-normal">
                    Format Portrait
                  </span>
                </div>
              </div>

              {/* Accompanying text strictly styled in italic */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Mot du Pasteur</span>
                </div>
                <p className="text-base sm:text-lg italic font-normal text-slate-900 dark:text-slate-100 leading-relaxed">
                  « Nous sommes heureux de vous accueillir. Que cette plateforme vous aide à grandir spirituellement et à rester connecté avec notre famille chrétienne. »
                </p>
                <div className="pt-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                    Direction Pastorale
                  </span>
                  <span className="text-xs font-normal text-slate-900 dark:text-slate-100">
                    Église Grâce et Vérité
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CULT SCHEDULES (MODERN BADGES) */}
        <section id="schedules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-sky-600 dark:text-sky-400">
              Rassemblements
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Nos Horaires Hebdomadaires
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Badge 1: Dimanche : 10h00 - 13h00 (Culte principal) */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:border-sky-500 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Dimanche</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>10h00 - 13h00</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Culte principal
                </h3>
                <p className="text-xs font-normal text-slate-900 dark:text-slate-100 leading-relaxed">
                  Célébration dominicale, louange inspirée, adoration, enseignement de la Parole et bénédictions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>Sanctuaire Central</span>
              </div>
            </div>

            {/* Badge 2: Jeudi : Étude biblique 18h00 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:border-sky-500 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Jeudi</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>18h00</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Étude biblique
                </h3>
                <p className="text-xs font-normal text-slate-900 dark:text-slate-100 leading-relaxed">
                  Approfondissement des vérités bibliques, affermissement de la doctrine chrétienne et échange fraternel.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>Salle d'Enseignement</span>
              </div>
            </div>

            {/* Badge 3: Samedi : Prière et adoration 10h00 - 13h00 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:border-sky-500 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Samedi</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>10h00 - 13h00</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Prière et adoration
                </h3>
                <p className="text-xs font-normal text-slate-900 dark:text-slate-100 leading-relaxed">
                  Temps d'intercession, supplication, louange libre et communion spirituelle pour la communauté.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>Chapelle d'Intercession</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. APOSTLE'S AVAILABILITY BADGE */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 block">
                Disponibilité de l'Apôtre
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Permanence Pastorale & Entretiens
              </h3>
              <p className="text-sm font-normal text-slate-900 dark:text-slate-100">
                Accueil et écoute sur rendez-vous pour les membres et visiteurs :
              </p>
            </div>

            <div className="shrink-0 px-6 py-3 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-700/80 text-sky-600 dark:text-sky-400 font-bold text-sm tracking-wide">
              Du lundi au vendredi de 7h00 à 10h00
            </div>
          </div>
        </section>

        {/* 5. UPCOMING EVENTS (NEWS & ANNOUNCEMENTS AREA) */}
        <section id="announcements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-sky-600 dark:text-sky-400 block mb-1">
                Espace Réservé
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Annonces & Prochains Événements
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Mise à jour en temps réel
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                  <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:border-sky-500 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {event.name}
                    </h3>

                    {expandedEventId === event.id && (
                      <p id={`event-description-${event.id}`} className="text-xs font-normal text-slate-900 dark:text-slate-100 leading-relaxed">
                        {event.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-500" />
                      <span>{event.location}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setExpandedEventId((currentId) => currentId === event.id ? null : event.id)}
                      aria-expanded={expandedEventId === event.id}
                      aria-controls={`event-description-${event.id}`}
                      className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>{expandedEventId === event.id ? 'Réduire' : 'En savoir plus'}</span>
                      <ArrowRight className={`w-3 h-3 transition-transform ${expandedEventId === event.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 8. TESTIMONIALS SECTION */}
        <section id="testimonials" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
              Témoignage
            </span>

            <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 italic leading-snug max-w-2xl mx-auto">
              « Ma vie a été transformée grâce à l'amour de Dieu manifesté dans cette église. »
            </blockquote>

            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              — Fidèle de l'Assemblée
            </p>
          </div>
        </section>
      </main>

      {/* 9. COMPREHENSIVE FOOTER */}
      <footer id="footer" className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-100 dark:border-slate-800 text-center md:text-left">
            {/* Column 1: Physical Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Adresse Physique
              </h4>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                Sanctuaire Siloam SIPEC<br />
                Avenue de la Réconciliation, Quartier Sanctuaire<br />
                Kampala, Ouganda
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-900 dark:text-slate-100 font-normal">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>Repère : Près du Rond-Point de la Foi</span>
              </div>
            </div>

            {/* Column 2: Phone & Email */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Contact & Secrétariat
              </h4>
              <ul className="space-y-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>+243 81 234 5678 / +243 99 876 5432</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>contact@siloam-sipec.org</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>pastorale@siloam-sipec.org</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Social Media Placeholders */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Canaux Numériques
              </h4>
              <p className="text-xs font-normal text-slate-900 dark:text-slate-100">
                Emplacements réservés pour les plateformes de rediffusion et réseaux sociaux officiels :
              </p>

              <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
                {['YouTube', 'Facebook', 'Audio Stream'].map((social) => (
                  <div
                    key={social}
                    className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Share2 className="w-3 h-3 text-sky-500" />
                    <span>[{social}]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic local-year Copyright notice */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-slate-900 dark:text-slate-100">
            <p>
              © {new Date().getFullYear()} SILOAM SIPEC — Église Grâce et Vérité. Tous droits réservés.
            </p>
            <p className="font-semibold text-sky-600 dark:text-sky-400">
              Composant Unique WelcomeSection • Framework Antigravity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeSection;
