import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Home, Grid2X2, Briefcase, Moon, Sun } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  scrollToSection: (id: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar = ({ lang, setLang, scrollToSection, theme, toggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  const navLinks = [
    { 
      id: 'home', 
      label: t.home, 
      icon: <Home size={20} strokeWidth={1.5} />, 
      color: 'text-vivid-blue',
      bg: 'bg-vivid-blue/10 dark:bg-vivid-blue/20'
    },
    { 
      id: 'catalog', 
      label: t.catalog, 
      icon: <Grid2X2 size={20} strokeWidth={1.5} />, 
      color: 'text-vivid-pink',
      bg: 'bg-vivid-pink/10 dark:bg-vivid-pink/20'
    },
    { 
      id: 'services', 
      label: t.services, 
      icon: <Briefcase size={20} strokeWidth={1.5} />, 
      color: 'text-vivid-purple',
      bg: 'bg-vivid-purple/10 dark:bg-vivid-purple/20'
    },
  ];

  return (
    <>
      {/* Navbar - Floating Island Design */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed z-[100] transition-all duration-500 ease-in-out ${
          isScrolled && !isMobileOpen
            ? 'top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-5xl rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-lg py-2 px-6' 
            : isMobileOpen 
                ? 'top-0 left-0 right-0 bg-transparent py-2 px-6' 
                : 'top-0 left-0 right-0 bg-transparent py-6 px-6'
        }`}
      >
        <div className={`flex items-center justify-between ${isScrolled && !isMobileOpen ? 'w-full md:w-[600px] lg:w-[800px]' : 'container mx-auto'}`}>
          {/* Logo */}
          <button 
            onClick={() => { scrollToSection('home'); setIsMobileOpen(false); }}
            className={`text-2xl font-bold tracking-tighter transition-colors duration-300 relative z-[100] ${isMobileOpen ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}
          >
            Khaliq<span className="text-vivid-blue">.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className={`flex items-center gap-1 ${!isScrolled ? 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/60 dark:border-gray-700 shadow-sm' : ''} transition-colors`}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isScrolled 
                      ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all border border-gray-200/50 dark:border-gray-700"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Minimalist Language Toggle */}
              <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full border border-gray-200/50 dark:border-gray-700">
                  <button
                      onClick={() => setLang('id')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'id' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                      ID
                  </button>
                  <button
                      onClick={() => setLang('en')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                      EN
                  </button>
              </div>
            </div>
          </div>

          {/* Mobile Actions (Visible on Mobile) */}
          <div className="md:hidden flex items-center gap-2 z-[100]">
            {/* Theme Toggle (Mobile) */}
            <button
                onClick={toggleTheme}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isMobileOpen 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                }`}
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Toggle (Mobile - Outside Menu) */}
            <button
                onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                className={`h-9 px-3 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isMobileOpen 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                }`}
            >
                {lang.toUpperCase()}
            </button>

            {/* Hamburger Button */}
            <button 
                className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm ${
                isMobileOpen 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105' 
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                }`}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
                <div className="relative w-5 h-5 flex items-center justify-center">
                    <X 
                    size={20} 
                    strokeWidth={2}
                    className={`absolute transition-all duration-300 ${isMobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
                    />
                    <Menu 
                    size={20} 
                    strokeWidth={2}
                    className={`absolute transition-all duration-300 ${isMobileOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
                    />
                </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu & Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Elegant Blur Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 z-[80] bg-black/20 dark:bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-x-0 top-0 z-[90] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-b-[2.5rem] shadow-2xl overflow-hidden border-b border-gray-100 dark:border-gray-800"
            >
                <div className="pt-24 pb-6 px-6 flex flex-col gap-3">
                {/* Compact List */}
                {navLinks.map((link, idx) => (
                    <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={() => {
                        scrollToSection(link.id);
                        setIsMobileOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95 border border-gray-100 dark:border-transparent"
                    >
                    <div className={`p-2 rounded-xl ${link.bg} ${link.color}`}>
                        {link.icon}
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide">
                        {link.label}
                    </span>
                    </motion.button>
                ))}
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
