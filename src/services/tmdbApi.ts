const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Base fetch function with error handling
async function fetchFromTMDB(endpoint: string, params: Record<string, any> = {}) {
  // For debugging: log the API request details
  console.log(`[TMDB API Request] Endpoint: ${endpoint}`, { params });
  
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params
  });
  
  const url = `${BASE_URL}${endpoint}?${queryParams}`;
  console.log(`[TMDB API URL] ${url.replace(API_KEY, 'API_KEY_HIDDEN')}`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`[TMDB API Error] Status: ${response.status}, Text: ${response.statusText}`);
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`[TMDB API Response] Endpoint: ${endpoint}`, {
      resultCount: data.results?.length || 0,
      totalResults: data.total_results || 0,
      totalPages: data.total_pages || 0
    });
    
    return data;
  } catch (error) {
    console.error('[TMDB API Error]', error);
    throw error;
  }
}

// Discover movies with filters
export async function discoverMovies(params: Record<string, any> = {}) {
  return fetchFromTMDB('/discover/movie', params);
}

// Get movie details
export async function getMovieDetails(movieId: number) {
  return fetchFromTMDB(`/movie/${movieId}`);
}

// Get movie watch providers
export async function getMovieWatchProviders(movieId: number) {
  return fetchFromTMDB(`/movie/${movieId}/watch/providers`);
}

// Get movie certifications
export async function getMovieCertifications() {
  return fetchFromTMDB('/certification/movie/list');
}

// Get movie runtime
export async function getMovieRuntime(movieId: number) {
  const details = await getMovieDetails(movieId);
  return details.runtime || 0;
}