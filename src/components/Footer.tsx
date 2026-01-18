import { Lock, LogOut } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface FooterProps {
  lang: Language;
  isAdmin: boolean;
  onAdminClick: () => void;
  onLogout: () => void;
}

export const Footer = ({ lang, isAdmin, onAdminClick, onLogout }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const t = translations[lang].admin;

  return (
    <footer className="m-4 rounded-[3rem] py-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-800/50 transition-colors shadow-sm">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-600 dark:text-gray-500 text-sm font-medium">
          &copy; {currentYear} Bias Fajar Khaliq. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          {/* Discreet Admin Trigger */}
          {isAdmin ? (
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider"
            >
              <LogOut size={12} /> {t.logout}
            </button>
          ) : (
            <button 
              onClick={onAdminClick}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400 transition-colors p-2"
              title="Admin Access"
            >
              <Lock size={14} />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
