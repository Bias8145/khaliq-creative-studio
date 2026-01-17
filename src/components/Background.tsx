import { motion } from 'framer-motion';

export const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[#f8f9fa]">
      {/* Noise Texture for organic feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      {/* Architectural Grid Overlay - More Subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Elegant Gradient Orbs - Slower Animation */}
      <motion.div 
        animate={{ 
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-pastel-blue/30 to-purple-100/20 rounded-full blur-[120px]"
      />
      
      <motion.div 
        animate={{ 
          x: [0, -30, 20, 0],
          y: [0, 40, -10, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-tl from-pastel-pink/30 to-orange-50/20 rounded-full blur-[120px]"
      />
    </div>
  );
};
