import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Users, ArrowRight } from 'lucide-react';
import { useProfiles } from '../contexts/ProfilesContext';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { profiles, selectedProfiles } = useProfiles();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    // Set page title
    document.title = `${t('app.name')} - ${t('home.title')}`;
  }, []);
  
  const handleGetStarted = () => {
    if (profiles.length === 0) {
      navigate('/profiles');
    } else if (selectedProfiles.length === 0) {
      navigate('/profiles');
    } else {
      navigate('/questionnaire');
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <section className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-accent-300 bg-clip-text text-transparent">
          {t('home.title')}
        </h1>
        <p className="text-lg md:text-xl text-navy-700 dark:text-cream-200 mb-8">
          {t('home.subtitle')}
        </p>
        
        <button
          onClick={handleGetStarted}
          className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg
                   hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Film className="w-5 h-5 mr-2" />
          {t('home.getRecommendations')}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </section>
      
      <section className="w-full max-w-4xl grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-darkNavy-800 rounded-xl p-6 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{t('home.createProfiles')}</h2>
          <p className="text-navy-600 dark:text-cream-300">
            {t('home.createProfilesDesc')}
          </p>
        </div>
        
        <div className="bg-white dark:bg-darkNavy-800 rounded-xl p-6 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
          <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mb-4">
            <Film className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{t('home.answerQuestions')}</h2>
          <p className="text-navy-600 dark:text-cream-300">
            {t('home.answerQuestionsDesc')}
          </p>
        </div>
        
        <div className="bg-white dark:bg-darkNavy-800 rounded-xl p-6 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
          <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">{t('home.getPerfectMatches')}</h2>
          <p className="text-navy-600 dark:text-cream-300">
            {t('home.getPerfectMatchesDesc')}
          </p>
        </div>
      </section>
      
      <section className="w-full max-w-4xl bg-gradient-to-r from-primary-500/10 to-accent-300/10 dark:from-primary-900/30 dark:to-accent-800/30 rounded-2xl p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">{t('home.whyPopcornPick')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <span className="text-primary-600 dark:text-primary-400 mr-3 text-xl font-bold">✓</span>
            <div>
              <h3 className="font-semibold mb-1">{t('home.personalizedForEveryone')}</h3>
              <p className="text-navy-700 dark:text-cream-200">
                {t('home.personalizedForEveryoneDesc')}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-primary-600 dark:text-primary-400 mr-3 text-xl font-bold">✓</span>
            <div>
              <h3 className="font-semibold mb-1">{t('home.ageAppropriate')}</h3>
              <p className="text-navy-700 dark:text-cream-200">
                {t('home.ageAppropriateDesc')}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-primary-600 dark:text-primary-400 mr-3 text-xl font-bold">✓</span>
            <div>
              <h3 className="font-semibold mb-1">{t('home.moodBased')}</h3>
              <p className="text-navy-700 dark:text-cream-200">
                {t('home.moodBasedDesc')}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-primary-600 dark:text-primary-400 mr-3 text-xl font-bold">✓</span>
            <div>
              <h3 className="font-semibold mb-1">{t('home.allPlatforms')}</h3>
              <p className="text-navy-700 dark:text-cream-200">
                {t('home.allPlatformsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {profiles.length === 0 ? (
        <div className="w-full max-w-4xl mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">{t('home.getStarted')}</h2>
          <p className="text-navy-700 dark:text-cream-200 mb-5 text-center">
            {t('home.createProfilesPrompt')}
          </p>
          <button
            onClick={() => navigate('/profiles/new')}
            className="inline-flex items-center px-5 py-2 bg-primary-500 text-white font-medium rounded-lg
                     hover:bg-primary-600 transition-all"
          >
            <Users className="w-5 h-5 mr-2" />
            {t('home.createFirstProfile')}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">{t('home.readyToFind')}</h2>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-5 py-2 bg-primary-500 text-white font-medium rounded-lg
                     hover:bg-primary-600 transition-all"
          >
            <Film className="w-5 h-5 mr-2" />
            {t('home.findMoviesNow')}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;