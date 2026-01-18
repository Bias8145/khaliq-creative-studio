import { motion } from 'framer-motion';
import { 
  Code2, 
  Figma, 
  Database, 
  Zap, 
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
    { name: 'React 19', icon: <Code2 size={16} /> },
    { name: 'TypeScript', icon: <FileCode size={16} /> },
    { name: 'Tailwind', icon: <Wind size={16} /> },
    { name: 'Motion', icon: <Zap size={16} /> },
    { name: 'Supabase', icon: <Database size={16} /> },
    { name: 'Cloudflare', icon: <CloudLightning size={16} /> },
    { name: 'Figma', icon: <Figma size={16} /> },
    { name: 'Git', icon: <GitBranch size={16} /> },
    { name: 'Vite', icon: <Cpu size={16} /> },
    { name: 'Responsive', icon: <Smartphone size={16} /> },
    { name: 'SEO', icon: <Search size={16} /> },
    { name: 'Modern Web', icon: <Globe size={16} /> },
  ];

  // Duplicate for seamless loop
  const marqueeItems = [...technologies, ...technologies, ...technologies];

  return (
    <section className="mx-auto max-w-5xl px-4">
      {/* Title Outside the Panel */}
      <div className="flex justify-center mb-4">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">
          {t.title}
        </span>
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-4 py-4 px-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-sm">
        
        {/* Marquee Container */}
        <div className="relative flex-1 overflow-hidden w-full mask-linear-fade">
          {/* Fade Gradients for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/0 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/0 to-transparent z-10" />
          
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, 
                ease: "linear",
              },
            }}
            className="flex gap-8 items-center"
          >
            {marqueeItems.map((tech, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap cursor-default group"
              >
                <div className="transition-transform group-hover:scale-110 group-hover:text-vivid-blue">
                  {tech.icon}
                </div>
                <span className="text-xs font-semibold tracking-wide opacity-80 group-hover:opacity-100">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
