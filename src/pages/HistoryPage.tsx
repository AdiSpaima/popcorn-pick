import React, { useEffect, useState } from 'react';
import { ChevronLeft, Star, ExternalLink, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MoviesContext';
import { useProfiles } from '../contexts/ProfilesContext';

const HistoryPage: React.FC = () => {
  const { watchedMovies } = useMovies();
  const { profiles } = useProfiles();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  useEffect(() => {
    document.title = 'Watch History - PopCorn Pick';
  }, []);
  
  // Extract unique years from watched movies
  const years = Array.from(
    new Set(
      watchedMovies.map(movie => 
        new Date(movie.watchedDate).getFullYear().toString()
      )
    )
  ).sort((a, b) => parseInt(b) - parseInt(a));
  
  // Filter movies by selected year
  const filteredMovies = selectedYear === 'all'
    ? watchedMovies
    : watchedMovies.filter(movie => 
        new Date(movie.watchedDate).getFullYear().toString() === selectedYear
      );
  
  // Group movies by month
  const groupedMovies = filteredMovies.reduce((acc, movie) => {
    const date = new Date(movie.watchedDate);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    
    if (!acc[key]) {
      acc[key] = [];
    }
    
    acc[key].push(movie);
    return acc;
  }, {} as Record<string, typeof watchedMovies>);
  
  // Get profile names by IDs
  const getProfileNames = (profileIds: string[]) => {
    return profileIds
      .map(id => {
        const profile = profiles.find(p => p.id === id);
        return profile ? profile.name : '';
      })
      .filter(Boolean)
      .join(', ');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Watch History</h1>
      </div>
      
      {watchedMovies.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No watch history yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            When you mark movies as watched, they'll appear here.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Find Movies to Watch
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <label htmlFor="yearFilter" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                Filter by year:
              </label>
              <select
                id="yearFilter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total movies watched: <span className="font-semibold">{watchedMovies.length}</span>
            </p>
          </div>
          
          <div className="space-y-8">
            {Object.entries(groupedMovies).map(([monthYear, movies]) => (
              <div key={monthYear}>
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                  {monthYear}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movies.map(movie => (
                    <div 
                      key={`${movie.id}-${movie.watchedDate}`}
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex h-full">
                        <img 
                          src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                          alt={movie.title}
                          className="w-24 h-full object-cover"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg mb-1 leading-tight">{movie.title}</h3>
                            <div className="flex items-center text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="ml-1 text-sm">{movie.vote_average.toFixed(1)}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            Watched on {new Date(movie.watchedDate).toLocaleDateString()}
                          </p>
                          
                          {movie.watchedWith && movie.watchedWith.length > 0 && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              Watched with: {getProfileNames(movie.watchedWith)}
                            </p>
                          )}
                          
                          <div className="mt-auto pt-2 flex justify-between items-center">
                            <a 
                              href={`https://www.themoviedb.org/movie/${movie.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                            >
                              More Info
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                            
                            <button
                              aria-label="Delete from history"
                              className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPage;