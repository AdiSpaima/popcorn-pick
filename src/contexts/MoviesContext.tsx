import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie, QuestionnaireAnswers, WatchedMovie } from '../types/movie';
import { fetchRecommendedMovies } from '../services/movieService';
import { useProfiles } from './ProfilesContext';

interface MoviesContextType {
  recommendedMovies: Movie[];
  loading: boolean;
  error: string | null;
  getRecommendations: (answers: QuestionnaireAnswers) => Promise<void>;
  watchedMovies: WatchedMovie[];
  addToWatched: (movie: Movie, rating?: number) => void;
  currentAnswers: QuestionnaireAnswers | null;
  setCurrentAnswers: (answers: QuestionnaireAnswers | null) => void;
}

const MoviesContext = createContext<MoviesContextType>({
  recommendedMovies: [],
  loading: false,
  error: null,
  getRecommendations: async () => {},
  watchedMovies: [],
  addToWatched: () => {},
  currentAnswers: null,
  setCurrentAnswers: () => {},
});

export const useMovies = () => useContext(MoviesContext);

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovie[]>(() => {
    const saved = localStorage.getItem('watchedMovies');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentAnswers, setCurrentAnswers] = useState<QuestionnaireAnswers | null>(null);
  
  const { profiles, selectedProfiles } = useProfiles();

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  const getRecommendations = async (answers: QuestionnaireAnswers) => {
    setLoading(true);
    setError(null);
    setCurrentAnswers(answers);
    
    try {
      const selectedProfilesData = profiles.filter(profile => 
        selectedProfiles.includes(profile.id)
      );
      
      const movies = await fetchRecommendedMovies(answers, selectedProfilesData);
      setRecommendedMovies(movies);
    } catch (err) {
      setError('Failed to fetch movie recommendations. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToWatched = (movie: Movie, rating?: number) => {
    const date = new Date().toISOString();
    const watchedMovie: WatchedMovie = {
      ...movie,
      watchedDate: date,
      rating: rating || 0,
      watchedWith: selectedProfiles,
    };
    
    setWatchedMovies(prev => [watchedMovie, ...prev]);
  };

  return (
    <MoviesContext.Provider
      value={{
        recommendedMovies,
        loading,
        error,
        getRecommendations,
        watchedMovies,
        addToWatched,
        currentAnswers,
        setCurrentAnswers,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};