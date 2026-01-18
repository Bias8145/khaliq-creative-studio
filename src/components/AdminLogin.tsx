import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, X } from 'lucide-react';
import { toast } from 'sonner';
import { translations, Language } from '../lib/translations';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  lang: Language;
}

export const AdminLogin = ({ isOpen, onClose, onLogin, lang }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const t = translations[lang].admin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '8145') {
      onLogin();
      onClose();
      setPassword('');
      toast.success(t.welcome);
    } else {
      toast.error(t.error);
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white dark:border-gray-800 rounded-3xl shadow-2xl p-8 overflow-hidden"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-pastel-pink/30 dark:bg-pastel-pink/10 rounded-full flex items-center justify-center mb-4 text-pastel-pink-dark">
                <Lock size={32} className="text-gray-700 dark:text-gray-200" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.login_title}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-2">
                {t.login_desc}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-white/50 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pastel-blue/50 transition-all text-center text-lg tracking-widest text-gray-900 dark:text-white"
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Unlock size={18} />
                Unlock
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
