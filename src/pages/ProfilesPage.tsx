import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Trash2, Plus, Film } from 'lucide-react';
import { useProfiles } from '../contexts/ProfilesContext';
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
  
  useEffect(() => {
    document.title = 'Manage Profiles - PopCorn Pick';
  }, []);
  
  const handleDeleteProfile = (id: string) => {
    if (confirm('Are you sure you want to delete this profile?')) {
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
        <h1 className="text-2xl md:text-3xl font-bold">Family Profiles</h1>
        <button
          onClick={() => navigate('/profiles/new')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Profile
        </button>
      </div>
      
      {profiles.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md text-center">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">No profiles yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create profiles for each family member to get personalized movie recommendations.
          </p>
          <button
            onClick={() => navigate('/profiles/new')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Profile
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Who's watching tonight?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select the family members who will be watching the movie to get personalized recommendations.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {profiles.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => toggleProfileSelection(profile.id)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                    selectedProfiles.includes(profile.id)
                      ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-2 text-white font-bold text-xl`}>
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{profile.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{profile.age} years</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearSelectedProfiles}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Clear selection
              </button>
              {selectedProfiles.length > 0 && (
                <div className="space-x-3">
                  <button
                    onClick={() => navigate('/questionnaire')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Film className="w-5 h-5 mr-2" />
                    Find Movies ({selectedProfiles.length})
                  </button>
                  <button
                    onClick={() => navigate('/recommendations')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Choose Movie
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Manage Profiles</h2>
          <div className="space-y-4">
            {profiles.map(profile => (
              <div 
                key={profile.id} 
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg`}>
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{profile.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Age: {profile.age}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/profiles/edit/${profile.id}`)}
                          className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                          aria-label="Edit profile"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                          aria-label="Delete profile"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {profile.favoriteGenres.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Favorite Genres:</p>
                        <div className="flex flex-wrap gap-1">
                          {profile.favoriteGenres.slice(0, 4).map(genreId => (
                            <span 
                              key={genreId}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                            >
                              {getGenreName(genreId)}
                            </span>
                          ))}
                          {profile.favoriteGenres.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">
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
                          <span className="text-xs text-gray-600 dark:text-gray-400">Violence:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <span 
                                key={level}
                                className={`w-2 h-2 rounded-full mx-0.5 ${
                                  level <= profile.sensitivityLevels.violence 
                                    ? 'bg-red-500' 
                                    : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Language:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <span 
                                key={level}
                                className={`w-2 h-2 rounded-full mx-0.5 ${
                                  level <= profile.sensitivityLevels.language 
                                    ? 'bg-orange-500' 
                                    : 'bg-gray-200 dark:bg-gray-700'
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