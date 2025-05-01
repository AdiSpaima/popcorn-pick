import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ThumbsUp, ThumbsDown, Star, Clock, Calendar, Info, ArrowUpRight } from 'lucide-react';
import { useMovies } from '../contexts/MoviesContext';
import { useProfiles } from '../contexts/ProfilesContext';
import { PLATFORM_OPTIONS } from '../types/movie';
import { GENRE_OPTIONS } from '../types/profile';

const RecommendationsPage: React.FC = () => {
  const { recommendedMovies, currentAnswers, addToWatched, loading, error } = useMovies();
  const { selectedProfiles, profiles } = useProfiles();
  const navigate = useNavigate();
  
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(0);
  const [showVoteResults, setShowVoteResults] = useState<boolean>(false);
  const [votes, setVotes] = useState<{[key: number]: {up: number, down: number}}>({});
  
  useEffect(() => {
    document.title = 'Movie Recommendations - PopCorn Pick';
    
    if (recommendedMovies.length === 0 && !loading && !error) {
      navigate('/questionnaire');
    }
    
    // Initialize votes object
    const initialVotes: {[key: number]: {up: number, down: number}} = {};
    recommendedMovies.forEach(movie => {
      initialVotes[movie.id] = { up: 0, down: 0 };
    });
    setVotes(initialVotes);
  }, [recommendedMovies, loading, error, navigate]);
  
  const handleVote = (movieId: number, voteType: 'up' | 'down') => {
    setVotes(prev => {
      const currentVotes = { ...prev };
      if (voteType === 'up') {
        currentVotes[movieId].up += 1;
      } else {
        currentVotes[movieId].down += 1;
      }
      return currentVotes;
    });
  };
  
  const handleMarkAsWatched = (movieIndex: number) => {
    const movie = recommendedMovies[movieIndex];
    addToWatched(movie);
    navigate('/history');
  };
  
  const handleShowResults = () => {
    setShowVoteResults(true);
  };
  
  const getWinner = () => {
    let winnerIndex = 0;
    let maxNetVotes = -Infinity;
    
    recommendedMovies.forEach((movie, index) => {
      const movieVotes = votes[movie.id];
      if (movieVotes) {
        const netVotes = movieVotes.up - movieVotes.down;
        if (netVotes > maxNetVotes) {
          maxNetVotes = netVotes;
          winnerIndex = index;
        }
      }
    });
    
    return winnerIndex;
  };
  
  const currentMovie = recommendedMovies[selectedMovieIndex];
  
  // Get selected profile names
  const selectedProfileNames = selectedProfiles.map(id => {
    const profile = profiles.find(p => p.id === id);
    return profile ? profile.name : '';
  }).filter(Boolean);
  
  // Function to get genre names from IDs
  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map(id => {
      const genre = GENRE_OPTIONS.find(g => g.id === id.toString());
      return genre ? genre.name : '';
    }).filter(Boolean);
  };
  
  // Function to get platform names
  const getPlatformNames = (platforms: {[key: string]: boolean} | undefined) => {
    if (!platforms) return [];
    
    return Object.keys(platforms)
      .filter(key => platforms[key])
      .map(key => {
        const platform = PLATFORM_OPTIONS.find(p => p.id === key);
        return platform ? platform.name : '';
      })
      .filter(Boolean);
  };
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Finding perfect movies for your family...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/questionnaire')}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (recommendedMovies.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">No Movies Found</h2>
          <p className="text-yellow-600 dark:text-yellow-400 mb-6">
            We couldn't find any movies matching your criteria. Try adjusting your preferences.
          </p>
          <button
            onClick={() => navigate('/questionnaire')}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Adjust Preferences
          </button>
        </div>
      </div>
    );
  }
  
  if (showVoteResults) {
    const winnerIndex = getWinner();
    const winnerMovie = recommendedMovies[winnerIndex];
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setShowVoteResults(false)}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">Voting Results</h1>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="relative">
            <img 
              src={`https://image.tmdb.org/t/p/w1280${winnerMovie.backdrop_path || winnerMovie.poster_path}`}
              alt={winnerMovie.title}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 sm:p-6 text-white">
                <h2 className="text-2xl font-bold leading-tight mb-1">{winnerMovie.title}</h2>
                <div className="flex items-center text-yellow-400 mb-1">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1">{winnerMovie.vote_average.toFixed(1)}/10</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-4">
              <div className="text-center">
                <p className="text-blue-700 dark:text-blue-300 font-medium mb-1">Your Family's Winner</p>
                <div className="text-blue-800 dark:text-blue-200 font-bold text-xl mb-1">
                  {winnerMovie.title}
                </div>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  with {votes[winnerMovie.id]?.up || 0} votes
                </p>
              </div>
            </div>
            
            <p className="mb-4">{winnerMovie.overview}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span>{formatRuntime(winnerMovie.runtime)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span>{new Date(winnerMovie.release_date).getFullYear()}</span>
              </div>
            </div>
            
            {winnerMovie.providers && Object.keys(winnerMovie.providers).length > 0 && (
              <div className="mb-4">
                <p className="font-medium mb-1">Available on:</p>
                <div className="flex flex-wrap gap-2">
                  {getPlatformNames(winnerMovie.providers).map(platform => (
                    <span 
                      key={platform}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => handleMarkAsWatched(winnerIndex)}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mark as Watched
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">All Voting Results</h2>
          <div className="space-y-4">
            {recommendedMovies.map((movie, index) => {
              const upVotes = votes[movie.id]?.up || 0;
              const downVotes = votes[movie.id]?.down || 0;
              const totalVotes = upVotes + downVotes;
              const upPercentage = totalVotes > 0 ? (upVotes / totalVotes) * 100 : 0;
              
              return (
                <div 
                  key={movie.id}
                  className={`p-4 rounded-lg border ${
                    index === winnerIndex 
                      ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{movie.title}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span>{upVotes}</span>
                      </div>
                      <div className="flex items-center text-red-600 dark:text-red-400">
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        <span>{downVotes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${upPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/questionnaire')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/questionnaire')}
          className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Movie Recommendations</h1>
      </div>
      
      {selectedProfileNames.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200">
            Movies for: <span className="font-semibold">{selectedProfileNames.join(', ')}</span>
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
            {currentMovie ? (
              <>
                <div className="relative">
                  <img 
                    src={`https://image.tmdb.org/t/p/w780${currentMovie.backdrop_path || currentMovie.poster_path}`}
                    alt={currentMovie.title}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <h2 className="text-2xl font-bold leading-tight mb-1">{currentMovie.title}</h2>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="ml-1">{currentMovie.vote_average.toFixed(1)}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 flex-grow">
                  {currentMovie.matchReason && (
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex">
                        <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          {currentMovie.matchReason}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <p className="mb-4">{currentMovie.overview}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span>{formatRuntime(currentMovie.runtime)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span>{new Date(currentMovie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-medium mb-2">Genres:</p>
                    <div className="flex flex-wrap gap-2">
                      {getGenreNames(currentMovie.genre_ids).map(genre => (
                        <span 
                          key={genre}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {currentMovie.providers && Object.keys(currentMovie.providers).length > 0 && (
                    <div className="mb-4">
                      <p className="font-medium mb-2">Available on:</p>
                      <div className="flex flex-wrap gap-2">
                        {getPlatformNames(currentMovie.providers).map(platform => (
                          <span 
                            key={platform}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-4">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleVote(currentMovie.id, 'down')}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <ThumbsDown className="w-5 h-5 mr-2 text-red-500" />
                        Not interested
                      </button>
                      
                      <button
                        onClick={() => handleVote(currentMovie.id, 'up')}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ThumbsUp className="w-5 h-5 mr-2" />
                        Interested
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 flex items-center justify-center h-full">
                <p>No movie selected</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4">All Recommendations</h2>
            <div className="space-y-3 flex-grow">
              {recommendedMovies.map((movie, index) => (
                <button
                  key={movie.id}
                  onClick={() => setSelectedMovieIndex(index)}
                  className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                    index === selectedMovieIndex 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <img 
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="ml-3 text-left">
                    <p className={`font-medium ${index === selectedMovieIndex ? 'text-blue-800 dark:text-blue-200' : ''}`}>
                      {movie.title}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                      <span className="mx-1">•</span>
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                    {movie.matchScore && (
                      <div className="flex items-center mt-1">
                        <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div 
                            className="h-1.5 bg-blue-600 rounded-full" 
                            style={{ width: `${movie.matchScore}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
                          {movie.matchScore}% match
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="pt-4 mt-auto">
              <button
                onClick={handleShowResults}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Show Voting Results
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
              <div className="mt-3 text-center">
                <button
                  onClick={() => handleMarkAsWatched(selectedMovieIndex)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Mark current movie as watched
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/questionnaire')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default RecommendationsPage;