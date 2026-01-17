import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Home, Grid2X2, Briefcase } from 'lucide-react';
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
      icon: <Home size={20} strokeWidth={1.5} />, 
      color: 'text-vivid-blue',
      bg: 'bg-vivid-blue/10'
    },
    { 
      id: 'catalog', 
      label: t.catalog, 
      icon: <Grid2X2 size={20} strokeWidth={1.5} />, 
      color: 'text-vivid-pink',
      bg: 'bg-vivid-pink/10'
    },
    { 
      id: 'services', 
      label: t.services, 
      icon: <Briefcase size={20} strokeWidth={1.5} />, 
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
                ? 'bg-transparent py-2' 
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

          {/* Hamburger Button */}
          <button 
            className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-full z-[100] transition-all duration-300 shadow-sm ${
              isMobileOpen 
                ? 'bg-gray-900 text-white shadow-lg scale-105' 
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
                className="fixed inset-0 z-[80] bg-black/20 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-x-0 top-0 z-[90] bg-white/95 backdrop-blur-2xl rounded-b-[2rem] shadow-2xl overflow-hidden"
            >
                <div className="pt-20 pb-6 px-6 flex flex-col gap-3">
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
                    className="w-full flex items-center gap-4 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-all active:scale-95"
                    >
                    <div className={`p-2 rounded-lg ${link.bg} ${link.color}`}>
                        {link.icon}
                    </div>
                    <span className="text-sm font-bold text-gray-800 tracking-wide">
                        {link.label}
                    </span>
                    </motion.button>
                ))}

                {/* Compact Language Toggle */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-2 mt-2 pt-3 border-t border-gray-100"
                >
                    <button
                        onClick={() => { setLang('id'); setIsMobileOpen(false); }}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${lang === 'id' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-500'}`}
                    >
                        Indonesia
                    </button>
                    <button
                        onClick={() => { setLang('en'); setIsMobileOpen(false); }}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${lang === 'en' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-500'}`}
                    >
                        English
                    </button>
                </motion.div>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
