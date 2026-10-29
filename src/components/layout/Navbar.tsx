import React, { useState } from 'react';
import { Menu, X, Radio } from 'lucide-react';

interface NavbarProps {
  onOpenPrayerModal: () => void;
  isLiveActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPrayerModal,
  isLiveActive = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Cultes', href: '#services' },
    { label: 'Vision & Doctrine', href: '#about' },
    { label: 'Départements', href: '#departments' },
    { label: 'Médias', href: '#media' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Minimaliste */}
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl font-light tracking-tight text-slate-900">
              S.I.P.E.C
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 font-medium">
              Jean 9:7
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light text-slate-600 hover:text-sky-600 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions : Prière & Direct */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenPrayerModal}
              className="text-sm font-light text-slate-600 hover:text-sky-600 transition px-3 py-2"
            >
              Prière
            </button>

            <a
              href="#media"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium tracking-wide transition shadow-sm"
            >
              {isLiveActive && <Radio className="w-3.5 h-3.5 animate-pulse" />}
              <span>Direct</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-sky-600 transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-light text-slate-700 hover:text-sky-600 py-1 transition"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrayerModal();
              }}
              className="w-full py-2.5 text-center text-sm font-light text-slate-700 border border-slate-200 rounded-full hover:border-sky-500 hover:text-sky-600 transition"
            >
              Déposer une prière
            </button>
            <a
              href="#media"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-full transition"
            >
              Accéder au Direct
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
