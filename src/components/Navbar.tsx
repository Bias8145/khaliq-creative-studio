import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Home, Grid2X2, Palette, ArrowRight } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  scrollToSection: (id: string) => void;
}

export const Navbar = ({ lang, setLang, scrollToSection }: NavbarProps) => {
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
      icon: <Home size={24} strokeWidth={1.5} />, 
      color: 'text-vivid-blue',
      bg: 'bg-vivid-blue/10'
    },
    { 
      id: 'catalog', 
      label: t.catalog, 
      icon: <Grid2X2 size={24} strokeWidth={1.5} />, 
      color: 'text-vivid-pink',
      bg: 'bg-vivid-pink/10'
    },
    { 
      id: 'services', 
      label: t.services, 
      icon: <Palette size={24} strokeWidth={1.5} />, 
      color: 'text-vivid-purple',
      bg: 'bg-vivid-purple/10'
    },
  ];

  return (
    <>
      {/* Navbar - Z-Index 100 to stay ABOVE the menu */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled && !isMobileOpen
            ? 'bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm py-3' 
            : isMobileOpen 
                ? 'bg-transparent py-4' // Transparent when open so menu bg shows
                : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => { scrollToSection('home'); setIsMobileOpen(false); }}
            className={`text-2xl font-bold tracking-tighter transition-colors duration-300 relative z-[100] ${isMobileOpen ? 'text-gray-900' : 'text-gray-900'}`}
          >
            Khaliq<span className="text-vivid-blue">.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-white/50 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/60 shadow-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-6 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300 flex items-center gap-2"
                >
                  {/* Icon only visible on hover or active could be cool, but let's keep it clean text for desktop as per previous design, or add small icons? Keeping text for elegance on desktop, icons are for mobile expressiveness */}
                  {link.label}
                </button>
              ))}
            </div>

            {/* Minimalist Language Toggle */}
            <div className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
                <button
                    onClick={() => setLang('id')}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'id' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    ID
                </button>
                <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    EN
                </button>
            </div>
          </div>

          {/* Hamburger Button - High Z-Index & Distinct Styling */}
          <button 
            className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-full z-[100] transition-all duration-300 shadow-sm ${
              isMobileOpen 
                ? 'bg-gray-900 text-white shadow-lg scale-110' // Distinct active state
                : 'bg-white/80 backdrop-blur-md border border-white/60 text-gray-900'
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
      </motion.nav>

      {/* Mobile Menu Overlay - Z-Index 90 (Below Navbar) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-2xl flex flex-col pt-24 pb-8 px-6 overflow-hidden"
          >
            {/* Expressive Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                 <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-vivid-blue/20 rounded-full blur-[80px] animate-pulse-slow" />
                 <div className="absolute bottom-[10%] left-[-10%] w-[80vw] h-[80vw] bg-vivid-pink/20 rounded-full blur-[80px] animate-pulse-slow" />
            </div>

            <div className="relative z-10 flex flex-col h-full max-w-sm mx-auto w-full">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 ml-1"
              >
                {t.menu_title}
              </motion.div>

              {/* Expressive List - Icons & Labels */}
              <div className="flex flex-col gap-3">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.1, type: "spring", stiffness: 100 }}
                    onClick={() => {
                      scrollToSection(link.id);
                      setIsMobileOpen(false);
                    }}
                    className="group relative w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300"
                  >
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Aesthetic Icon Container */}
                      <div className={`p-3 rounded-xl transition-all duration-300 ${link.bg} ${link.color} group-hover:scale-110`}>
                        {link.icon}
                      </div>
                      <span className="text-lg font-bold text-gray-900 tracking-tight">
                        {link.label}
                      </span>
                    </div>
                    
                    <ArrowRight size={18} strokeWidth={1.5} className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300 relative z-10" />
                  </motion.button>
                ))}
              </div>

              {/* Mobile Language Toggle - Compact */}
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative z-10 w-full flex gap-3 mt-auto"
              >
                  <button
                      onClick={() => { setLang('id'); setIsMobileOpen(false); }}
                      className={`flex-1 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all ${lang === 'id' ? 'bg-gray-900 text-white border-gray-900 shadow-xl' : 'bg-white border-gray-200 text-gray-500 shadow-sm'}`}
                  >
                      Bahasa Indonesia
                  </button>
                  <button
                      onClick={() => { setLang('en'); setIsMobileOpen(false); }}
                      className={`flex-1 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all ${lang === 'en' ? 'bg-gray-900 text-white border-gray-900 shadow-xl' : 'bg-white border-gray-200 text-gray-500 shadow-sm'}`}
                  >
                      English
                  </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
