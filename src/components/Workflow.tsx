import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code, Rocket } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface WorkflowProps {
  lang: Language;
}

export const Workflow = ({ lang }: WorkflowProps) => {
  const t = translations[lang].workflow;

  const steps = [
    { 
      icon: <MessageSquare size={24} />, 
      title: t.steps.consult.title, 
      desc: t.steps.consult.desc,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    { 
      icon: <PenTool size={24} />, 
      title: t.steps.design.title, 
      desc: t.steps.design.desc,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
    { 
      icon: <Code size={24} />, 
      title: t.steps.dev.title, 
      desc: t.steps.dev.desc,
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
    },
    { 
      icon: <Rocket size={24} />, 
      title: t.steps.launch.title, 
      desc: t.steps.launch.desc,
      color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400'
    },
  ];

  return (
    <section className="py-20 md:py-32 container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-vivid-blue mb-3 block">
          {t.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {t.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent -z-10" />

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${step.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {step.desc}
            </p>
            
            {/* Step Number */}
            <div className="absolute top-4 right-6 text-4xl font-bold text-gray-100 dark:text-gray-800 -z-10 select-none">
              0{idx + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
