import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 p-2 rounded-full hover:bg-cream-100 dark:hover:bg-darkNavy-700 transition-colors"
      aria-label={t('language.toggle')}
      title={t('language.toggle')}
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'FR'}</span>
    </button>
  );
};

export default LanguageToggle;