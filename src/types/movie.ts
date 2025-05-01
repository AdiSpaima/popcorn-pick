export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  runtime: number;
  providers?: {
    [key: string]: boolean;
  };
  contentRatings?: {
    violence: number;
    language: number;
    sexualContent: number;
    frightening: number;
  };
  matchReason?: string;
  matchScore?: number;
}

export interface WatchedMovie extends Movie {
  watchedDate: string;
  rating: number;
  watchedWith: string[]; // Profile IDs
}

export interface QuestionnaireAnswers {
  mood: string;
  duration: number;
  platforms: string[];
  includeWatched: boolean;
  maxResults: number;
  minRating: number; // New field
  certification: string; // New field
}

export const PLATFORM_OPTIONS = [
  { id: 'netflix', name: 'Netflix' },
  { id: 'disney', name: 'Disney+' },
  { id: 'amazon', name: 'Amazon Prime' },
  { id: 'hbo', name: 'HBO Max' },
  { id: 'hulu', name: 'Hulu' },
  { id: 'apple', name: 'Apple TV+' },
  { id: 'paramount', name: 'Paramount+' },
  { id: 'peacock', name: 'Peacock' }
];

export const MOOD_OPTIONS = [
  { id: 'happy', name: 'Happy/Fun' },
  { id: 'relaxed', name: 'Relaxed/Chill' },
  { id: 'excited', name: 'Excited/Adventurous' },
  { id: 'thoughtful', name: 'Thoughtful/Dramatic' },
  { id: 'nostalgic', name: 'Nostalgic' },
  { id: 'inspired', name: 'Inspired/Motivated' },
  { id: 'surprised', name: 'Surprised/Unexpected' },
  { id: 'scared', name: 'Scary/Thrilling' }
];

export const DURATION_OPTIONS = [
  { value: 90, label: 'Less than 90 minutes' },
  { value: 120, label: 'Less than 2 hours' },
  { value: 150, label: 'Less than 2.5 hours' },
  { value: 999, label: 'Any length' }
];

// Rating filter options
export const RATING_OPTIONS = [
  { value: 7.5, label: '7.5+' },
  { value: 8, label: '8+' },
  { value: 8.5, label: '8.5+' },
  { value: 9, label: '9+' },
  { value: 0, label: 'Any rating' }
];

// Certification options (US ratings)
export const CERTIFICATION_OPTIONS = [
  { value: 'G', label: 'G - General Audiences' },
  { value: 'PG', label: 'PG - Parental Guidance Suggested' },
  { value: 'PG-13', label: 'PG-13 - Parents Strongly Cautioned' },
  { value: 'R', label: 'R - Restricted' },
  { value: 'NC-17', label: 'NC-17 - Adults Only' },
  { value: '', label: 'Any certification' }
];