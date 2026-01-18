import { motion } from 'framer-motion';
import { 
  Code2, 
  Figma, 
  Database, 
  Zap, 
  LayoutTemplate, 
  Cpu, 
  CloudLightning, 
  GitBranch, 
  Wind, 
  FileCode, 
  Smartphone, 
  Search, 
  Globe
} from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface TechStackProps {
  lang: Language;
}

export const TechStack = ({ lang }: TechStackProps) => {
  const t = translations[lang].toolkit;

  const technologies = [
    { name: 'React 19', icon: <Code2 size={20} /> },
    { name: 'TypeScript', icon: <FileCode size={20} /> },
    { name: 'Tailwind CSS', icon: <Wind size={20} /> },
    { name: 'Framer Motion', icon: <Zap size={20} /> },
    { name: 'Supabase', icon: <Database size={20} /> },
    { name: 'Cloudflare', icon: <CloudLightning size={20} /> },
    { name: 'Figma', icon: <Figma size={20} /> },
    { name: 'Git & GitHub', icon: <GitBranch size={20} /> },
    { name: 'Vite', icon: <Cpu size={20} /> },
    { name: 'Responsive UI', icon: <Smartphone size={20} /> },
    { name: 'SEO', icon: <Search size={20} /> },
    { name: 'Modern Web', icon: <Globe size={20} /> },
  ];

  // Duplicate for seamless loop (triple for smoothness)
  const marqueeItems = [...technologies, ...technologies, ...technologies];

  return (
    <section className="py-8 md:py-10 border-y border-gray-100 dark:border-white/5 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-6 mb-6 md:mb-8 text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
          {t.title}
        </span>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        {/* Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40, // Slower for better readability
              ease: "linear",
            },
          }}
          className="flex gap-8 md:gap-16 px-6"
        >
          {marqueeItems.map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 md:gap-3 text-gray-400 dark:text-gray-500 hover:text-vivid-blue dark:hover:text-white transition-colors whitespace-nowrap group-hover:pause cursor-default"
            >
              <div className="p-1.5 rounded-lg bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/5">
                {tech.icon}
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wide">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
