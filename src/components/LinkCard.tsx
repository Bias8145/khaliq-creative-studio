import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Trash2, Globe, FolderGit2, ArrowUpRight, PenTool, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Edit2, FileText, Video } from 'lucide-react';
import { Link } from '../lib/supabase';

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => void;
  onEdit: (link: Link) => void;
  isAdmin: boolean;
  viewText: string;
}

export const LinkCard = ({ link, onDelete, onEdit, isAdmin, viewText }: LinkCardProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    const xPct = mouseXVal / width - 0.5;
    const yPct = mouseYVal / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getIcon = () => {
    switch (link.category) {
      case 'Resume': return <ImageIcon size={24} className="text-gray-700 dark:text-gray-300" />;
      case 'Project': return <FolderGit2 size={24} className="text-gray-700 dark:text-gray-300" />;
      case 'Blog': return <PenTool size={24} className="text-gray-700 dark:text-gray-300" />;
      default: return <Globe size={24} className="text-gray-700 dark:text-gray-300" />;
    }
  };

  const getImages = (imgString: string | null): string[] => {
    if (!imgString) return [];
    try {
        const parsed = JSON.parse(imgString);
        if (Array.isArray(parsed)) return parsed;
        return [imgString];
    } catch {
        return [imgString];
    }
  };

  const images = getImages(link.image_url);
  const coverImage = images.length > 0 ? images[0] : null;
  const hasLink = !!link.url;
  const isGallery = !hasLink && images.length > 0;

  const isPdf = (url: string) => url?.toLowerCase().includes('.pdf');
  const isVideo = (url: string) => url?.toLowerCase().match(/\.(mp4|webm|ogg)$/i);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleVideoHover = (play: boolean) => {
    if (videoRef.current) {
        if (play) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-shadow duration-500 flex flex-col h-full perspective-1000"
      >
        {/* Image/Media Section */}
        <div 
            className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer border-b border-gray-100 dark:border-gray-800 rounded-t-[2rem]"
            onClick={() => isGallery && setIsGalleryOpen(true)}
            onMouseEnter={() => handleVideoHover(true)}
            onMouseLeave={() => handleVideoHover(false)}
            style={{ transform: "translateZ(20px)" }}
        >
          {coverImage ? (
            isPdf(coverImage) ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    <FileText size={48} strokeWidth={1} />
                    <span className="text-xs font-bold uppercase mt-2 tracking-wider">PDF Document</span>
                </div>
            ) : isVideo(coverImage) ? (
                <div className="w-full h-full relative bg-black">
                    <video 
                        ref={videoRef}
                        src={coverImage} 
                        muted 
                        loop 
                        playsInline 
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <Video size={20} className="text-white fill-white" />
                        </div>
                    </div>
                </div>
            ) : (
                <img 
                src={coverImage} 
                alt={link.title || 'Project preview'} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-900">
               <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-3 border border-gray-100 dark:border-gray-700">
                  {getIcon()}
               </div>
               <span className="text-sm text-gray-400 dark:text-gray-500 font-medium tracking-wide uppercase">{link.category}</span>
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Floating Category Badge */}
          <div className="absolute top-4 left-4 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
            <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-gray-800 dark:text-gray-200 shadow-sm border border-white/20 dark:border-white/10">
              {link.category}
            </span>
          </div>

          {/* Multi-image indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg text-white text-[10px] font-bold flex items-center gap-1 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                <ImageIcon size={10} />
                {images.length}
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-7 flex-1 flex flex-col relative" style={{ transform: "translateZ(10px)" }}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {link.title || 'Untitled Work'}
          </h3>
          
          <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3 mb-8 flex-1 font-normal leading-relaxed tracking-wide">
            {link.description || 'A curated piece of work.'}
          </p>

          {/* Action Button */}
          {hasLink ? (
              <a 
              href={link.url!} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative overflow-hidden w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-medium transition-all duration-300 group/btn flex items-center justify-between px-6 hover:bg-black dark:hover:bg-gray-200 shadow-md hover:shadow-lg"
              style={{ transform: "translateZ(20px)" }}
              >
              <span className="relative z-10 text-sm tracking-wide font-medium">
                  {viewText}
              </span>
              <div className="relative z-10 bg-white/20 dark:bg-black/10 p-1.5 rounded-full group-hover/btn:bg-white dark:group-hover/btn:bg-black group-hover/btn:text-black dark:group-hover/btn:text-white transition-colors duration-300">
                  <ArrowUpRight size={14} />
              </div>
              </a>
          ) : (
              <button 
                onClick={() => setIsGalleryOpen(true)}
                className="w-full py-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl font-medium flex items-center justify-between px-6 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all group/btn shadow-sm"
                style={{ transform: "translateZ(20px)" }}
              >
                  <span className="text-sm tracking-wide font-medium">View Gallery</span>
                  <div className="bg-white dark:bg-gray-700 p-1.5 rounded-full group-hover/btn:bg-gray-200 dark:group-hover/btn:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                    <Maximize2 size={14} />
                  </div>
              </button>
          )}
        </div>
        
        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" style={{ transform: "translateZ(40px)" }}>
             <button 
                onClick={(e) => {
                    e.preventDefault();
                    onEdit(link);
                }}
                className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 shadow-sm border border-gray-200 dark:border-gray-700"
                title="Edit project"
            >
                <Edit2 size={16} />
            </button>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    onDelete(link.id);
                }}
                className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 shadow-sm border border-gray-200 dark:border-gray-700"
                title="Delete project"
            >
                <Trash2 size={16} />
            </button>
          </div>
        )}
      </motion.div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[150] bg-white/95 dark:bg-black/95 backdrop-blur-xl flex items-center justify-center"
                onClick={() => setIsGalleryOpen(false)}
            >
                <button 
                    className="absolute top-6 right-6 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    onClick={() => setIsGalleryOpen(false)}
                >
                    <X size={32} />
                </button>

                <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
                    {images.length > 1 && (
                        <button 
                            onClick={prevImage}
                            className="absolute left-4 md:left-0 p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white backdrop-blur-md transition-all z-10 shadow-lg"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    {isPdf(images[currentImageIndex]) ? (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                             <FileText size={80} className="mb-4 opacity-50" />
                             <p className="text-xl font-bold mb-4">PDF Document</p>
                             <a 
                                href={images[currentImageIndex]} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                            >
                                Open PDF
                             </a>
                        </div>
                    ) : isVideo(images[currentImageIndex]) ? (
                        <video 
                            src={images[currentImageIndex]} 
                            controls 
                            autoPlay 
                            className="max-h-full max-w-full rounded-lg shadow-2xl"
                        />
                    ) : (
                        <motion.img 
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            alt={`Gallery ${currentImageIndex}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                        />
                    )}

                    {images.length > 1 && (
                        <button 
                            onClick={nextImage}
                            className="absolute right-4 md:right-0 p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white backdrop-blur-md transition-all z-10 shadow-lg"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                    {/* Counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-gray-500 dark:text-white/50 text-sm font-medium tracking-widest">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
