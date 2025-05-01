import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Trash2, Plus, Film } from 'lucide-react';
import { useProfiles } from '../contexts/ProfilesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { GENRE_OPTIONS } from '../types/profile';

const ProfilesPage: React.FC = () => {
  const {
    profiles,
    deleteProfile,
    selectedProfiles,
    toggleProfileSelection,
    clearSelectedProfiles
  } = useProfiles();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    document.title = `${t('profiles.title')} - ${t('app.name')}`;
  }, []);
  
  const handleDeleteProfile = (id: string) => {
    if (confirm(`${t('profiles.delete')}?`)) {
      deleteProfile(id);
    }
  };
  
  const getGenreName = (id: string) => {
    const genre = GENRE_OPTIONS.find(genre => genre.id === id);
    return genre ? genre.name : '';
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{t('profiles.title')}</h1>
        <button
          onClick={() => navigate('/profiles/new')}
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('profiles.createNew')}
        </button>
      </div>
      
      {profiles.length === 0 ? (
        <div className="bg-white dark:bg-darkNavy-800 rounded-xl p-8 shadow-md text-center">
          <User className="w-16 h-16 mx-auto mb-4 text-navy-400" />
          <h2 className="text-xl font-semibold mb-2">{t('profiles.noProfiles')}</h2>
          <p className="text-navy-600 dark:text-cream-300 mb-6">
            {t('home.createProfilesPrompt')}
          </p>
          <button
            onClick={() => navigate('/profiles/new')}
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('home.createFirstProfile')}
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-darkNavy-800 rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Who's watching tonight?</h2>
            <p className="text-navy-600 dark:text-cream-300 mb-4">
              Select the family members who will be watching the movie to get personalized recommendations.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {profiles.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => toggleProfileSelection(profile.id)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                    selectedProfiles.includes(profile.id)
                      ? 'bg-primary-100 dark:bg-primary-900 ring-2 ring-primary-500'
                      : 'bg-cream-100 dark:bg-darkNavy-700 hover:bg-cream-200 dark:hover:bg-darkNavy-600'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center mb-2 text-white font-bold text-xl`}>
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{profile.name}</span>
                  <span className="text-sm text-navy-500 dark:text-cream-400">{profile.age} {t('profiles.age')}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearSelectedProfiles}
                className="text-sm text-navy-600 dark:text-cream-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t('profiles.select')}
              </button>
              {selectedProfiles.length > 0 && (
                <div className="space-x-3">
                  <button
                    onClick={() => navigate('/questionnaire')}
                    className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Film className="w-5 h-5 mr-2" />
                    {t('home.findMoviesNow')} ({selectedProfiles.length})
                  </button>
                  <button
                    onClick={() => navigate('/recommendations')}
                    className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                  >
                    {t('questionnaire.findMovies')}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">{t('profiles.title')}</h2>
          <div className="space-y-4">
            {profiles.map(profile => (
              <div 
                key={profile.id} 
                className="bg-white dark:bg-darkNavy-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full bg-primary-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg`}>
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{profile.name}</h3>
                        <p className="text-sm text-navy-600 dark:text-cream-300">{t('profiles.age')}: {profile.age}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/profiles/edit/${profile.id}`)}
                          className="p-1 text-navy-500 hover:text-primary-600 dark:text-cream-400 dark:hover:text-primary-400"
                          aria-label="Edit profile"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="p-1 text-navy-500 hover:text-primary-600 dark:text-cream-400 dark:hover:text-primary-400"
                          aria-label="Delete profile"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {profile.favoriteGenres.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">{t('profileForm.genres')}:</p>
                        <div className="flex flex-wrap gap-1">
                          {profile.favoriteGenres.slice(0, 4).map(genreId => (
                            <span 
                              key={genreId}
                              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs"
                            >
                              {getGenreName(genreId)}
                            </span>
                          ))}
                          {profile.favoriteGenres.length > 4 && (
                            <span className="px-2 py-1 bg-cream-100 dark:bg-darkNavy-700 text-navy-800 dark:text-cream-200 rounded text-xs">
                              +{profile.favoriteGenres.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-1">Content Sensitivity:</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-navy-600 dark:text-cream-300">Violence:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <span 
                                key={level}
                                className={`w-2 h-2 rounded-full mx-0.5 ${
                                  level <= profile.sensitivityLevels.violence
                                    ? 'bg-primary-500'
                                    : 'bg-cream-200 dark:bg-darkNavy-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-navy-600 dark:text-cream-300">Language:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <span 
                                key={level}
                                className={`w-2 h-2 rounded-full mx-0.5 ${
                                  level <= profile.sensitivityLevels.language
                                    ? 'bg-accent-500'
                                    : 'bg-cream-200 dark:bg-darkNavy-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilesPage;