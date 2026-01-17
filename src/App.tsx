import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Background } from './components/Background';
import { LinkCard } from './components/LinkCard';
import { AddLink } from './components/AddLink';
import { AdminLogin } from './components/AdminLogin';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommissionSection } from './components/CommissionSection';
import { supabase, type Link } from './lib/supabase';
import { Loader2, LayoutGrid, ArrowRight, BookOpen, FileUser } from 'lucide-react';
import { translations, type Language } from './lib/translations';

function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [lang, setLang] = useState<Language>('id'); 
  
  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const t = translations[lang];

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase.from('links').delete().eq('id', id);
      if (error) throw error;
      setLinks(links.filter(l => l.id !== id));
      toast.success('Project removed successfully');
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('Failed to delete project');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const categories = ['All', ...new Set(links.map(l => l.category))];
  const filteredLinks = filter === 'All' ? links : links.filter(l => l.category === filter);

  return (
    <div className="min-h-screen text-gray-800 font-sans selection:bg-pastel-pink selection:text-gray-900 flex flex-col text-[12px] md:text-[18px]">
      <Background />
      <Toaster position="top-center" richColors theme="light" />
      
      <Navbar lang={lang} setLang={setLang} scrollToSection={scrollToSection} />

      <AdminLogin 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={() => setIsAdmin(true)}
        lang={lang}
      />

      <main className="flex-grow container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 relative z-10">
        {/* Simplified Hero Section */}
        <header id="home" className="mb-12 md:mb-24 mt-6 md:mt-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-6 md:mb-8 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-gray-900 text-white rounded-full">
              {t.hero.badge}
            </span>
            <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter text-gray-900 mb-4 md:mb-6 leading-[0.9]">
              {t.hero.title}
            </h1>
            
            <h2 className="text-xl md:text-4xl font-light text-gray-800 mb-4 md:mb-6 tracking-tight">
              {t.hero.subtitle}
            </h2>
            
            <p className="text-sm md:text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 px-4">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
              <button 
                onClick={() => scrollToSection('catalog')}
                className="px-6 py-3 md:px-8 md:py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl w-full sm:w-auto text-xs md:text-base"
              >
                {t.hero.cta_catalog}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="px-6 py-3 md:px-8 md:py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all w-full sm:w-auto text-xs md:text-base"
              >
                {t.hero.cta_services}
              </button>
            </div>
          </motion.div>
        </header>

        {/* FEATURED STATIC SECTION (Compact Horizontal on Mobile) */}
        <section className="mb-20 md:mb-32 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {/* Card 1: Khaliq Repos */}
            <motion.a 
              href="https://khaliq-repos.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative bg-gray-900 rounded-[1.5rem] p-5 md:p-8 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-[180px] md:h-[220px]"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-[8px] md:text-[10px] font-bold tracking-wider uppercase mb-2 border border-white/10">
                  {t.featured.repo_badge}
                </div>
                <h3 className="text-sm md:text-2xl font-bold text-white leading-tight mb-2">
                  {t.featured.repo_title}
                </h3>
                {/* Added Description - Compact Font */}
                <p className="text-[9px] md:text-sm text-gray-400 font-light leading-tight max-w-[90%] md:max-w-[85%] line-clamp-3">
                  {t.featured.repo_desc}
                </p>
              </div>
              
              <div className="relative z-10 flex items-center gap-1.5 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform mt-auto">
                <span>{t.featured.repo_cta}</span>
                <ArrowRight size={12} className="md:w-4 md:h-4" />
              </div>
              
              {/* Decorative Icon - ADJUSTED POSITION (Moved UP and LEFT) & SIZE INCREASED */}
              <div className="absolute right-[-10px] bottom-[-10px] md:right-[-20px] md:bottom-[-20px] opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 pointer-events-none">
                 <BookOpen size={80} className="text-white md:w-40 md:h-40" />
              </div>
            </motion.a>

            {/* Card 2: Bias Resume */}
            <motion.a 
              href="https://bias-resume.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group relative bg-white border border-gray-100 rounded-[1.5rem] p-5 md:p-8 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-[180px] md:h-[220px]"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[8px] md:text-[10px] font-bold tracking-wider uppercase mb-2">
                  {t.featured.resume_badge}
                </div>
                <h3 className="text-sm md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                  {t.featured.resume_title}
                </h3>
                {/* Added Description - Compact Font */}
                <p className="text-[9px] md:text-sm text-gray-500 font-light leading-tight max-w-[90%] md:max-w-[85%] line-clamp-3">
                  {t.featured.resume_desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-1.5 text-gray-900 text-[10px] md:text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform mt-auto">
                <span>{t.featured.resume_cta}</span>
                <ArrowRight size={12} className="md:w-4 md:h-4" />
              </div>

              {/* Decorative Icon - ADJUSTED POSITION (Moved UP and LEFT) & SIZE INCREASED */}
              <div className="absolute right-[-10px] bottom-[-10px] md:right-[-20px] md:bottom-[-20px] opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-500 transform group-hover:scale-110 pointer-events-none">
                 <FileUser size={80} className="text-gray-900 md:w-40 md:h-40" />
              </div>
            </motion.a>
          </div>
        </section>

        {/* DYNAMIC GALLERY SECTION */}
        <section id="catalog" className="mb-20 md:mb-32 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-4 md:gap-6 border-b border-gray-100 pb-4 md:pb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">{t.catalog.title}</h3>
            
            {/* Filter Navigation */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-[10px] md:text-xs font-bold tracking-wide transition-all duration-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full ${
                      filter === cat 
                        ? 'bg-gray-900 text-white shadow-md' 
                        : 'bg-white text-gray-400 hover:text-gray-900 border border-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-gray-300 w-8 h-8" />
            </div>
          ) : links.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredLinks.map((link) => (
                <LinkCard 
                  key={link.id} 
                  link={link} 
                  onDelete={deleteLink} 
                  isAdmin={isAdmin}
                  viewText={link.category === 'Resume' ? t.catalog.view_resume : t.catalog.view_project}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 md:py-24 text-gray-400 border border-dashed border-gray-200 rounded-[2rem] bg-white/30">
              <LayoutGrid size={32} className="mb-3 opacity-50 md:w-10 md:h-10" />
              <p className="text-sm md:text-base font-light">{t.catalog.empty}</p>
              {isAdmin && <p className="text-xs mt-2 text-gray-500">{t.catalog.empty_admin}</p>}
            </div>
          )}
        </section>

        {/* COMMISSION SECTION */}
        <CommissionSection lang={lang} />
      </main>

      <Footer 
        lang={lang} 
        isAdmin={isAdmin} 
        onAdminClick={() => setIsLoginOpen(true)}
        onLogout={() => {
          setIsAdmin(false);
          toast.info('Logged out');
        }}
      />

      <AddLink onAdd={fetchLinks} isAdmin={isAdmin} />
    </div>
  );
}

export default App;
