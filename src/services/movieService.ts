import { Movie, QuestionnaireAnswers } from '../types/movie';
import { Profile } from '../types/profile';
import { discoverMovies, getMovieDetails, getMovieWatchProviders, getMovieRuntime } from './tmdbApi';

// Keep the MOCK_MOVIES as a fallback in case the API fails
const MOCK_MOVIES: Movie[] = [
  // ... existing mock movies
];

// Map provider IDs to our provider keys
const providerIdMap: Record<number, string> = {
  8: 'netflix',    // Netflix
  9: 'amazon',     // Amazon Prime
  337: 'disney',   // Disney+
  2: 'apple',      // Apple TV
  384: 'hbo',      // HBO Max
  // 15: 'hulu',      // Hulu
  // 531: 'paramount', // Paramount+
  // 386: 'peacock'   // Peacock
};

// Transform TMDB movie to our Movie type
function transformTMDBMovie(tmdbMovie: any): Movie {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    overview: tmdbMovie.overview,
    poster_path: tmdbMovie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
      : 'https://via.placeholder.com/500x750',
    backdrop_path: tmdbMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${tmdbMovie.backdrop_path}`
      : 'https://via.placeholder.com/1920x1080',
    release_date: tmdbMovie.release_date,
    vote_average: tmdbMovie.vote_average,
    genre_ids: tmdbMovie.genre_ids || [],
    runtime: tmdbMovie.runtime || 120, // Default runtime if not available
    providers: {}, // Will be populated later
    contentRatings: {
      violence: 3, // Default values
      language: 3,
      sexualContent: 3,
      frightening: 3
    }
  };
}

// Map certification to content ratings
function mapCertificationToContentRatings(certification: string): { 
  violence: number; 
  language: number; 
  sexualContent: number; 
  frightening: number; 
} {
  // Default moderate ratings
  const defaultRatings = {
    violence: 3,
    language: 3,
    sexualContent: 3,
    frightening: 3
  };

  // Map certifications to approximate content ratings
  switch (certification) {
    case 'G':
      return {
        violence: 1,
        language: 1,
        sexualContent: 1,
        frightening: 1
      };
    case 'PG':
      return {
        violence: 2,
        language: 2,
        sexualContent: 1,
        frightening: 2
      };
    case 'PG-13':
      return {
        violence: 3,
        language: 3,
        sexualContent: 2,
        frightening: 3
      };
    case 'R':
      return {
        violence: 4,
        language: 4,
        sexualContent: 4,
        frightening: 4
      };
    case 'NC-17':
      return {
        violence: 5,
        language: 5,
        sexualContent: 5,
        frightening: 5
      };
    default:
      return defaultRatings;
  }
}

export const fetchRecommendedMovies = async (
  answers: QuestionnaireAnswers,
  profiles: Profile[]
): Promise<Movie[]> => {
  console.log('[Movie Service] Starting fetchRecommendedMovies with answers:', answers);
  console.log('[Movie Service] Selected profiles:', profiles.map(p => ({ id: p.id, name: p.name })));
  
  try {
    // Calculate common genres across all profiles
    const favoriteGenreIds = new Set<string>();
    const dislikedGenreIds = new Set<string>();
    
    profiles.forEach(profile => {
      profile.favoriteGenres.forEach(genreId => favoriteGenreIds.add(genreId));
      profile.dislikedGenres.forEach(genreId => dislikedGenreIds.add(genreId));
    });
    
    console.log('[Movie Service] Favorite genres:', Array.from(favoriteGenreIds));
    console.log('[Movie Service] Disliked genres:', Array.from(dislikedGenreIds));
    
    // Remove genres that are disliked by any family member
    const filteredGenres = Array.from(favoriteGenreIds)
      .filter(genreId => !dislikedGenreIds.has(genreId));
    
    console.log('[Movie Service] Filtered genres (after removing disliked):', filteredGenres);
    
    // Get the age range to determine appropriate content
    const ages = profiles.map(profile => profile.age);
    const minAge = Math.min(...ages);
    
    console.log('[Movie Service] Age range - Min age:', minAge);
    
    // Find sensitivity thresholds
    const sensitivityThresholds = {
      violence: 5,
      language: 5,
      sexualContent: 5,
      frightening: 5
    };
    
    profiles.forEach(profile => {
      const { sensitivityLevels } = profile;
      sensitivityThresholds.violence = Math.min(sensitivityThresholds.violence, sensitivityLevels.violence);
      sensitivityThresholds.language = Math.min(sensitivityThresholds.language, sensitivityLevels.language);
      sensitivityThresholds.sexualContent = Math.min(sensitivityThresholds.sexualContent, sensitivityLevels.sexualContent);
      sensitivityThresholds.frightening = Math.min(sensitivityThresholds.frightening, sensitivityLevels.frightening);
    });
    
    console.log('[Movie Service] Sensitivity thresholds:', sensitivityThresholds);
    
    // Build TMDB API parameters
    const params: Record<string, any> = {
      sort_by: 'popularity.desc',
      include_adult: false,
      'vote_average.gte': answers.minRating > 0 ? answers.minRating : undefined,
    };
    
    // Add certification filter if specified
    if (answers.certification) {
      params.certification_country = 'US';
      params.certification = answers.certification;
    }
    
    // Add duration filter if specified
    if (answers.duration < 999) {
      params['with_runtime.lte'] = answers.duration;
    }
    
    // Add genres if available
    if (filteredGenres.length > 0) {
      params.with_genres = filteredGenres.join('|');
    }
    
    console.log('[Movie Service] TMDB API parameters:', params);
    
    // Fetch movies from TMDB
    console.log('[Movie Service] Fetching movies from TMDB API...');
    const response = await discoverMovies(params);
    
    if (!response.results || response.results.length === 0) {
      console.warn('No results from TMDB API, using mock data');
      return MOCK_MOVIES.slice(0, answers.maxResults);
    }
    
    console.log('[Movie Service] Received', response.results.length, 'movies from TMDB API');
    
    // Transform TMDB movies to our Movie type
    let movies = await Promise.all(
      response.results.map(async (movie: any) => {
        const transformedMovie = transformTMDBMovie(movie);
        
        // Fetch runtime for each movie if not available
        if (!movie.runtime) {
          try {
            transformedMovie.runtime = await getMovieRuntime(movie.id);
          } catch (error) {
            console.error(`Error fetching runtime for movie ${movie.id}:`, error);
          }
        }
        
        return transformedMovie;
      })
    );
    
    // Filter by duration if needed
    if (answers.duration < 999) {
      movies = movies.filter(movie => movie.runtime <= answers.duration);
    }
    
    const moviesWithProviders = movies;
    // // Fetch watch providers for each movie (only for displayed results)
    // const moviesWithProviders = await Promise.all(
    //   movies.slice(0, answers.maxResults).map(async (movie) => {
    //     try {
    //       const providersResponse = await getMovieWatchProviders(movie.id);
    //       const results = providersResponse.results || {};
          
    //       // Get providers for user's region (default to US if not available)
    //       const regionProviders = results.US || results.GB || Object.values(results)[0] || {};
    //       const flatrate = regionProviders.flatrate || [];
          
    //       // Map provider IDs to our provider keys
    //       const providers: Record<string, boolean> = {};
    //       flatrate.forEach((provider: any) => {
    //         const providerKey = providerIdMap[provider.provider_id];
    //         if (providerKey) {
    //           providers[providerKey] = true;
    //         }
    //       });
          
    //       return {
    //         ...movie,
    //         providers
    //       };
    //     } catch (error) {
    //       console.error(`Error fetching providers for movie ${movie.id}:`, error);
    //       return movie;
    //     }
    //   })
    // );
    
    // Filter by platforms if specified
    let filteredMovies = moviesWithProviders;
    if (answers.platforms.length > 0) {
      filteredMovies = filteredMovies.filter(movie => {
        if (!movie.providers) return false;
        return answers.platforms.some(platform => movie.providers?.[platform]);
      });
    }
    
    // Calculate match score and reason
    filteredMovies = filteredMovies.map(movie => {
      const genreOverlap = movie.genre_ids
        .filter((id: number) => filteredGenres.includes(id.toString()))
        .length;
      
      const matchScore = Math.min(100, Math.round((genreOverlap / Math.max(1, movie.genre_ids.length)) * 100));
      
      let matchReason = "This movie matches your family's preferences";
      if (genreOverlap > 0) {
        matchReason += " for " + genreOverlap + " favorite genres";
      }
      if (answers.mood) {
        matchReason += ` and fits your ${answers.mood} mood`;
      }
      if (answers.minRating > 0) {
        matchReason += ` with a rating of ${movie.vote_average.toFixed(1)}+`;
      }
      if (answers.platforms && answers.platforms.length > 0 && movie.providers) {
        const availablePlatforms = answers.platforms
          .filter(platform => movie.providers?.[platform])
          .map(platform => {
            const platformMap: {[key: string]: string} = {
              netflix: 'Netflix',
              disney: 'Disney+',
              amazon: 'Amazon Prime',
              hbo: 'HBO Max',
              hulu: 'Hulu',
              apple: 'Apple TV+',
              paramount: 'Paramount+',
              peacock: 'Peacock'
            };
            return platformMap[platform];
          });
        
        if (availablePlatforms.length > 0) {
          matchReason += `. Available on ${availablePlatforms.join(', ')}`;
        }
      }
      
      return {
        ...movie,
        matchReason,
        matchScore
      };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    
    // Return requested number of results
    const finalResults = filteredMovies.slice(0, answers.maxResults);
    console.log('[Movie Service] Final results:', finalResults.map(m => ({
      id: m.id,
      title: m.title,
      score: m.matchScore
    })));
    
    return finalResults;
  } catch (error) {
    console.error('[Movie Service] Error fetching recommended movies:', error);
    // Fallback to mock data in case of API failure
    console.log('[Movie Service] Falling back to mock data');
    return MOCK_MOVIES.slice(0, answers.maxResults);
  }
};