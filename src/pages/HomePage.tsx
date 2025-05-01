import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Users, ArrowRight } from 'lucide-react';
import { useProfiles } from '../contexts/ProfilesContext';

const HomePage: React.FC = () => {
  const { profiles, selectedProfiles } = useProfiles();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set page title
    document.title = 'PopCorn Pick - Find Your Perfect Family Movie';
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
          Find Your Perfect Family Movie Night
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Tell us who's watching, your mood, and what you're looking for. 
          We'll find the perfect movie that everyone will love!
        </p>
        
        <button
          onClick={handleGetStarted}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg 
                   hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Film className="w-5 h-5 mr-2" />
          Get Movie Recommendations
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </section>
      
      <section className="w-full max-w-4xl grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Create Family Profiles</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Set up profiles for each family member with their ages, preferences, and sensitivities.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4">
            <Film className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Answer Quick Questions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us your mood, available time, and which streaming services you have access to.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Get Perfect Matches</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Receive personalized movie recommendations that everyone in the family will enjoy.
          </p>
        </div>
      </section>
      
      <section className="w-full max-w-4xl bg-gradient-to-r from-blue-600/10 to-yellow-500/10 dark:from-blue-900/30 dark:to-yellow-800/30 rounded-2xl p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Why PopCorn Pick?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl font-bold">✓</span>
            <div>
              <h3 className="font-semibold mb-1">Personalized for Everyone</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Finds movies that match the whole family's preferences, not just one person's.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl font-bold">✓</span>
            <div>
              <h3 className="font-semibold mb-1">Age-Appropriate Filtering</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Automatically filters content based on the youngest viewer's age.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl font-bold">✓</span>
            <div>
              <h3 className="font-semibold mb-1">Mood-Based Recommendations</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Suggests movies that match your current mood and available time.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl font-bold">✓</span>
            <div>
              <h3 className="font-semibold mb-1">All Your Platforms</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Only shows movies available on your streaming services.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {profiles.length === 0 ? (
        <div className="w-full max-w-4xl mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5 text-center">
            Create profiles for your family members to get personalized recommendations.
          </p>
          <button
            onClick={() => navigate('/profiles/new')}
            className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-medium rounded-lg 
                     hover:bg-blue-700 transition-all"
          >
            <Users className="w-5 h-5 mr-2" />
            Create First Profile
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to find your movie?</h2>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-medium rounded-lg 
                     hover:bg-blue-700 transition-all"
          >
            <Film className="w-5 h-5 mr-2" />
            Find Movies Now
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;