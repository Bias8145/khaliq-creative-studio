import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Home, Layers, Sparkles } from 'lucide-react';
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
    { id: 'home', label: t.home, num: '01', icon: <Home size={18} /> },
    { id: 'catalog', label: t.catalog, num: '02', icon: <Layers size={18} /> },
    { id: 'services', label: t.services, num: '03', icon: <Sparkles size={18} /> },
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
                  className="px-6 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300"
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
                  className={`absolute transition-all duration-300 ${isMobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
                />
                <Menu 
                  size={20} 
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-xl flex flex-col pt-24 pb-8 px-6 overflow-hidden"
          >
            {/* Expressive Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                 <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-vivid-blue/20 rounded-full blur-[60px]" />
                 <div className="absolute bottom-[10%] left-[-10%] w-[60vw] h-[60vw] bg-vivid-pink/20 rounded-full blur-[60px]" />
            </div>

            <div className="relative z-10 flex flex-col h-full max-w-sm mx-auto w-full">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1"
              >
                {t.menu_title}
              </motion.div>

              {/* Compact List */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={() => {
                      scrollToSection(link.id);
                      setIsMobileOpen(false);
                    }}
                    className="group relative w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50/80 border border-gray-100 overflow-hidden hover:bg-gray-900 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-gray-500 transition-colors">{link.num}</span>
                      <span className={`text-lg font-bold text-gray-900 group-hover:text-white transition-colors duration-300`}>
                        {link.label}
                      </span>
                    </div>
                    
                    {/* Replaced Arrow with Relevant Icon */}
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-white/20 group-hover:border-transparent transition-all duration-300 text-gray-900 group-hover:text-white">
                      {link.icon}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Mobile Language Toggle - Compact */}
              <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10 w-full flex gap-2 mt-auto"
              >
                  <button
                      onClick={() => { setLang('id'); setIsMobileOpen(false); }}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${lang === 'id' ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white border-gray-200 text-gray-500'}`}
                  >
                      Bahasa
                  </button>
                  <button
                      onClick={() => { setLang('en'); setIsMobileOpen(false); }}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${lang === 'en' ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white border-gray-200 text-gray-500'}`}
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
