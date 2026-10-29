import React, { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Radio } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';
import churchLogo from '../../assets/siloam.jpeg';
import { useLanguage, type Language } from '../../lib/language';

interface NavbarSpaProps {
  theme: Theme;
  onToggleTheme: () => void;
  isLive?: boolean;
}

export const NavbarSpa: React.FC<NavbarSpaProps> = ({
  theme,
  onToggleTheme,
  isLive = true,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#bienvenue');

  const navLinks = [
    { label: t('nav.welcome'), href: '#bienvenue' },
    { label: t('nav.about'), href: '#a-propos' },
    { label: t('nav.bio'), href: '#bios' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.departments'), href: '#departements' },
    { label: t('nav.gallery'), href: '#galerie' },
    { label: t('nav.sermons'), href: '#predications' },
    { label: 'Live', href: '#live' },
    { label: t('nav.address'), href: '#adresse' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    const sections = navLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver((entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

      if (activeEntry) setActiveHref(`#${activeEntry.target.id}`);
    }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 text-white transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 shadow-lg shadow-slate-950/20 backdrop-blur-xl' : 'bg-slate-950/65 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo de l'église */}
          <a href="#bienvenue" onClick={() => setActiveHref('#bienvenue')} className="group flex items-center gap-3">
            <img
              src={churchLogo}
              alt="Logo de S.I.P.E.C"
              className="h-12 w-12 rounded-full object-cover ring-1 ring-white/30 transition group-hover:ring-sky-400"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-tight text-white">
                S.I.P.E.C
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-300">
                Siloam Church
              </span>
            </div>
          </a>

          {/* Navigation Desktop (10 Onglets compacts & fluides) */}
          <nav aria-label={t('nav.main')} className="hidden items-center gap-4 text-xs font-medium xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                aria-current={activeHref === link.href ? 'location' : undefined}
                className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-sky-400 after:transition-transform after:duration-300 ${activeHref === link.href ? 'text-white after:scale-x-100' : 'text-slate-300 after:scale-x-0 hover:text-white hover:after:scale-x-100'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions : Sélecteur Mode Clair/Sombre & Bouton Live */}
          <div className="flex items-center gap-3">
            {/* Toggle Clair / Sombre */}
            <button
              onClick={onToggleTheme}
              className="rounded-full border border-white/15 bg-white/10 p-2.5 text-slate-100 transition hover:border-sky-400/60 hover:bg-white/15 hover:text-sky-200"
              aria-label={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
              title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-300" />
              ) : (
                <Moon className="h-4 w-4 text-sky-200" />
              )}
            </button>

            <label htmlFor="language-select" className="sr-only">{t('language.label')}</label>
            <select
              id="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
              aria-label={t('language.label')}
              className="h-10 rounded-lg border border-white/15 bg-slate-900/80 px-2 text-xs font-semibold text-white outline-none transition hover:border-sky-400/60 focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
              <option value="sw">SW</option>
            </select>

            {/* Bouton Live Direct */}
            <a
              href="#live"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold tracking-wide transition shadow-sm active:scale-95"
            >
              {isLive && <Radio className="w-3.5 h-3.5 animate-pulse" />}
              <span>{t('nav.live')}</span>
            </a>

            {/* Menu Burger Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2.5 text-slate-100 transition hover:bg-white/10 xl:hidden"
              aria-label={t('nav.menuOpen')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Déroulant Mobile avec les 10 sections */}
      {mobileOpen && (
        <nav id="mobile-navigation" aria-label={t('nav.mobile')} className="xl:hidden max-h-[85vh] space-y-3 overflow-y-auto border-b border-white/10 bg-slate-950/95 px-6 py-6 shadow-xl backdrop-blur-xl animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { setMobileOpen(false); setActiveHref(link.href); }}
              aria-current={activeHref === link.href ? 'location' : undefined}
              className={`block border-l-2 py-2 pl-3 text-sm font-medium transition-colors ${activeHref === link.href ? 'border-sky-400 text-white' : 'border-transparent text-slate-300 hover:border-sky-400/60 hover:text-white'}`}
            >
              {link.label}
            </a>
          ))}

          <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
            <a
              href="#live"
              onClick={() => { setMobileOpen(false); setActiveHref('#live'); }}
              className="w-full rounded-lg bg-sky-500 py-3 text-center text-xs font-semibold text-white shadow-sm transition hover:bg-sky-400"
            >
              {t('nav.liveWatch')}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
