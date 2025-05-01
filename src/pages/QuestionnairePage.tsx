import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Film } from 'lucide-react';
import { useProfiles } from '../contexts/ProfilesContext';
import { useMovies } from '../contexts/MoviesContext';
import { QuestionnaireAnswers, PLATFORM_OPTIONS, MOOD_OPTIONS, DURATION_OPTIONS } from '../types/movie';

const QuestionnairePage: React.FC = () => {
  const { selectedProfiles, profiles } = useProfiles();
  const { getRecommendations, currentAnswers, loading } = useMovies();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    mood: currentAnswers?.mood || 'happy',
    duration: currentAnswers?.duration || 120,
    platforms: currentAnswers?.platforms || [],
    includeWatched: currentAnswers?.includeWatched || false,
    maxResults: currentAnswers?.maxResults || 3
  });
  
  useEffect(() => {
    document.title = 'Movie Questionnaire - PopCorn Pick';
    
    // Redirect if no profiles are selected
    if (selectedProfiles.length === 0) {
      navigate('/profiles');
    }
  }, [selectedProfiles, navigate]);
  
  const handleMoodSelect = (mood: string) => {
    setAnswers(prev => ({ ...prev, mood }));
  };
  
  const handleDurationSelect = (duration: number) => {
    setAnswers(prev => ({ ...prev, duration }));
  };
  
  const handlePlatformToggle = (platformId: string) => {
    setAnswers(prev => {
      const platforms = prev.platforms.includes(platformId)
        ? prev.platforms.filter(id => id !== platformId)
        : [...prev.platforms, platformId];
      return { ...prev, platforms };
    });
  };
  
  const handleIncludeWatchedToggle = () => {
    setAnswers(prev => ({ ...prev, includeWatched: !prev.includeWatched }));
  };
  
  const handleMaxResultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setAnswers(prev => ({ ...prev, maxResults: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await getRecommendations(answers);
    navigate('/recommendations');
  };
  
  // Get names of selected profiles
  const selectedProfileNames = selectedProfiles.map(id => {
    const profile = profiles.find(p => p.id === id);
    return profile ? profile.name : '';
  }).filter(Boolean);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/profiles')}
          className="mr-4 p-2 rounded-full hover:bg-cream-200 dark:hover:bg-darkNavy-700 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Movie Questionnaire</h1>
      </div>
      
      {selectedProfileNames.length > 0 && (
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4 mb-6">
          <p className="text-primary-800 dark:text-primary-200">
            Finding movies for: <span className="font-semibold">{selectedProfileNames.join(', ')}</span>
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-darkNavy-800 rounded-xl p-6 shadow-md">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-2">1</span>
              What's your mood today?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MOOD_OPTIONS.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleMoodSelect(option.id)}
                  className={`py-3 px-4 rounded-lg text-center transition-all ${
                    answers.mood === option.id 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 ring-2 ring-primary-500'
                      : 'bg-cream-100 dark:bg-darkNavy-700 hover:bg-cream-200 dark:hover:bg-darkNavy-600'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-2">2</span>
              How much time do you have?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {DURATION_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleDurationSelect(option.value)}
                  className={`py-3 px-4 rounded-lg text-center transition-all flex items-center justify-center ${
                    answers.duration === option.value 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 ring-2 ring-primary-500'
                      : 'bg-cream-100 dark:bg-darkNavy-700 hover:bg-cream-200 dark:hover:bg-darkNavy-600'
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-2">3</span>
              Which streaming platforms do you have?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PLATFORM_OPTIONS.map(platform => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`py-3 px-2 rounded-lg text-center transition-all ${
                    answers.platforms.includes(platform.id) 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 ring-2 ring-primary-500'
                      : 'bg-cream-100 dark:bg-darkNavy-700 hover:bg-cream-200 dark:hover:bg-darkNavy-600'
                  }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
            {answers.platforms.length === 0 && (
              <p className="mt-2 text-sm text-accent-600 dark:text-accent-400">
                No platforms selected. We'll show movies regardless of availability.
              </p>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-2">4</span>
              Additional Options
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeWatched"
                  checked={answers.includeWatched}
                  onChange={handleIncludeWatchedToggle}
                  className="w-4 h-4 text-primary-600 border-navy-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="includeWatched" className="ml-2 text-sm text-navy-700 dark:text-cream-300">
                  Include previously watched movies
                </label>
              </div>
              
              <div>
                <label htmlFor="maxResults" className="block text-sm text-navy-700 dark:text-cream-300 mb-1">
                  Number of movie suggestions (1-5):
                </label>
                <input
                  type="number"
                  id="maxResults"
                  min="1"
                  max="5"
                  value={answers.maxResults}
                  onChange={handleMaxResultsChange}
                  className="w-20 px-3 py-2 border border-navy-300 dark:border-darkNavy-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-darkNavy-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg
                     hover:bg-primary-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding Movies...
              </>
            ) : (
              <>
                <Film className="w-5 h-5 mr-2" />
                Find Perfect Movies
                <ChevronRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionnairePage;