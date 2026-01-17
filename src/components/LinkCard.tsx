import { motion } from 'framer-motion';
import { Trash2, FileText, Globe, FolderGit2, ArrowUpRight, PenTool } from 'lucide-react';
import { Link } from '../lib/supabase';

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => void;
  isAdmin: boolean;
  viewText: string;
}

export const LinkCard = ({ link, onDelete, isAdmin, viewText }: LinkCardProps) => {
  
  const getIcon = () => {
    switch (link.category) {
      case 'Resume': return <FileText size={24} className="text-gray-700" />;
      case 'Project': return <FolderGit2 size={24} className="text-gray-700" />;
      case 'Blog': return <PenTool size={24} className="text-gray-700" />;
      default: return <Globe size={24} className="text-gray-700" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        {link.image_url ? (
          <img 
            src={link.image_url} 
            alt={link.title || 'Project preview'} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50">
             <div className="p-5 bg-white rounded-2xl shadow-sm mb-3">
                {getIcon()}
             </div>
             <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">{link.category}</span>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-white/90 backdrop-blur-md rounded-full text-gray-800 shadow-sm">
            {link.category}
          </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-7 flex-1 flex flex-col relative">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-gray-700 transition-colors">
          {link.title || 'Untitled Work'}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-3 mb-8 flex-1 font-light leading-relaxed tracking-wide">
          {link.description || 'A curated piece of work.'}
        </p>

        {/* Action Button */}
        <a 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative overflow-hidden w-full py-4 bg-gray-900 text-white rounded-2xl font-medium transition-all duration-300 group/btn flex items-center justify-between px-6 hover:bg-black"
        >
          <span className="relative z-10 text-sm tracking-wide font-medium">
            {viewText}
          </span>
          <div className="relative z-10 bg-white/20 p-1.5 rounded-full group-hover/btn:bg-white group-hover/btn:text-black transition-colors duration-300">
            <ArrowUpRight size={14} />
          </div>
        </a>
      </div>
      
      {/* Admin Delete Button */}
      {isAdmin && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            onDelete(link.id);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm z-20 opacity-0 group-hover:opacity-100"
          title="Delete project"
        >
          <Trash2 size={16} />
        </button>
      )}
    </motion.div>
  );
};
