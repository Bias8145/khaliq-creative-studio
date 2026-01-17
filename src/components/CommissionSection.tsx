import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layout, PenTool, MessageCircle, Mail, ChevronLeft, Info } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface CommissionSectionProps {
  lang: Language;
}

export const CommissionSection = ({ lang }: CommissionSectionProps) => {
  const t = translations[lang].services;
  const [showContact, setShowContact] = useState(false);
  const [selectedService, setSelectedService] = useState<'web' | 'sketch' | null>(null);

  const features = [
    { 
      id: 'web',
      icon: <Layout className="w-5 h-5 md:w-6 md:h-6" />, 
      title: t.features.web.title,
      desc: t.features.web.desc,
      color: 'text-vivid-blue',
      bg: 'bg-vivid-blue/10'
    },
    { 
      id: 'sketch',
      icon: <PenTool className="w-5 h-5 md:w-6 md:h-6" />, 
      title: t.features.sketch.title,
      desc: t.features.sketch.desc,
      color: 'text-vivid-pink',
      bg: 'bg-vivid-pink/10'
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      {/* Expressive Background */}
      <div className="absolute inset-0 bg-gray-900 rounded-[2rem] md:rounded-[3rem] mx-0 md:mx-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-vivid-blue/20 blur-[100px] md:blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-vivid-pink/20 blur-[100px] md:blur-[150px] rounded-full animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-white/90 rounded-full border border-white/10 backdrop-blur-md">
              {t.subtitle}
            </span>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
              {t.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-md font-light">
              {t.desc}
            </p>

            {/* Interactive Services List */}
            <div className="flex flex-col gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature.id} className="relative">
                    <button
                        onClick={() => setSelectedService(selectedService === feature.id as any ? null : feature.id as any)}
                        className={`w-full flex items-center justify-between p-4 md:p-6 rounded-2xl border transition-all duration-300 text-left group ${
                            selectedService === feature.id 
                            ? 'bg-white text-gray-900 border-white shadow-xl shadow-white/10' 
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                        }`}
                    >
                        <div className="flex items-center gap-5">
                            <div className={`p-3 rounded-xl transition-colors ${selectedService === feature.id ? `${feature.bg} ${feature.color}` : 'bg-white/10 text-white'}`}>
                                {feature.icon}
                            </div>
                            <span className="font-bold tracking-wide text-sm md:text-xl">{feature.title}</span>
                        </div>
                        <Info size={20} className={`transition-transform duration-300 ${selectedService === feature.id ? 'rotate-180 opacity-100 text-gray-900' : 'opacity-50 group-hover:opacity-100'}`} />
                    </button>
                    
                    <AnimatePresence>
                        {selectedService === feature.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 bg-white/5 border-l-2 border-white/20 rounded-r-2xl text-gray-300 text-sm md:text-base leading-relaxed font-light backdrop-blur-sm">
                                    {feature.desc}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="relative h-[120px]">
                <AnimatePresence mode="wait">
                    {!showContact ? (
                        <motion.div
                            key="cta-button"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col gap-4 items-start absolute inset-0"
                        >
                            <button 
                                onClick={() => setShowContact(true)}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-vivid-blue hover:text-white transition-all duration-300 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] group text-sm md:text-base"
                            >
                                {t.cta}
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-xs text-gray-400 ml-2 italic flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <span className="w-1.5 h-1.5 rounded-full bg-vivid-teal animate-pulse"></span>
                                {t.consult_hint}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="contact-options"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white/10 border border-white/20 p-5 rounded-3xl backdrop-blur-md w-full max-w-md absolute inset-0 z-20 h-auto"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-vivid-teal"></span>
                                    {t.contact_options_title}
                                </h4>
                                <button 
                                    onClick={() => setShowContact(false)}
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                            </div>
                            
                            <div className="flex gap-3">
                                <a 
                                    href="https://wa.me/6282258901971"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-green-500/20 transition-all text-sm group"
                                >
                                    <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                                    WhatsApp
                                </a>
                                <a 
                                    href="mailto:biasfajar3@gmail.com"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20 transition-all text-sm group"
                                >
                                    <Mail size={18} className="group-hover:scale-110 transition-transform" />
                                    Email
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </motion.div>

          {/* Visual Element - Expressive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0 hidden md:block"
          >
            {/* Abstract UI Representation */}
            <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 group">
              <div className="flex gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-vivid-pink" />
                <div className="w-3 h-3 rounded-full bg-vivid-orange" />
                <div className="w-3 h-3 rounded-full bg-vivid-teal" />
              </div>
              <div className="space-y-6">
                <div className="h-40 w-full bg-gradient-to-r from-vivid-blue/20 to-vivid-purple/20 rounded-2xl animate-pulse border border-white/5" />
                <div className="flex gap-4">
                  <div className="h-24 w-1/3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-vivid-pink/10 transition-colors duration-500" />
                  <div className="h-24 w-1/3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-vivid-blue/10 transition-colors duration-500 delay-100" />
                  <div className="h-24 w-1/3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-vivid-teal/10 transition-colors duration-500 delay-200" />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 px-6 py-3 rounded-full shadow-xl shadow-vivid-blue/20 border border-white/50 text-xs font-bold uppercase tracking-wider">
                Premium Quality
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-vivid-teal/20 rounded-full blur-[60px]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-vivid-purple/20 rounded-full blur-[60px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
