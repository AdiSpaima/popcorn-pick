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