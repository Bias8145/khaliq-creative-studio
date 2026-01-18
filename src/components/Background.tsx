import { motion } from 'framer-motion';

interface BackgroundProps {
  theme: 'light' | 'dark';
}

export const Background = ({ theme }: BackgroundProps) => {
  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden -z-10 transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      {/* Architectural Grid - Darker in Light Mode for visibility */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] ${theme === 'dark' ? 'opacity-10' : 'opacity-100'}`}></div>

      {/* Gradients - More saturated in Light Mode to not look washed out */}
      <motion.div 
        animate={{ 
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
          opacity: theme === 'dark' ? [0.1, 0.2, 0.1] : [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-10%] left-[-10%] w-[900px] h-[900px] rounded-full blur-[120px] transition-colors duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-200/40 to-purple-200/40'}`}
      />
      
      <motion.div 
        animate={{ 
          x: [0, -30, 20, 0],
          y: [0, 40, -10, 0],
          opacity: theme === 'dark' ? [0.1, 0.2, 0.1] : [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[120px] transition-colors duration-500 ${theme === 'dark' ? 'bg-gradient-to-tl from-pink-900/20 to-orange-900/20' : 'bg-gradient-to-tl from-pink-200/40 to-orange-200/40'}`}
      />
    </div>
  );
};
