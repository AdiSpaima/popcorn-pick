import { Movie, QuestionnaireAnswers } from '../types/movie';
import { Profile } from '../types/profile';

const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "The Incredibles",
    overview: "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.",
    poster_path: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    backdrop_path: "https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg",
    release_date: "2004-11-05",
    vote_average: 8.0,
    genre_ids: [16, 10751, 28, 12],
    runtime: 115,
    providers: {
      disney: true
    },
    contentRatings: {
      violence: 2,
      language: 1,
      sexualContent: 1,
      frightening: 2
    }
  },
  {
    id: 2,
    title: "Finding Nemo",
    overview: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    poster_path: "https://images.pexels.com/photos/3374937/pexels-photo-3374937.jpeg",
    backdrop_path: "https://images.pexels.com/photos/3374946/pexels-photo-3374946.jpeg",
    release_date: "2003-05-30",
    vote_average: 8.1,
    genre_ids: [16, 10751, 12],
    runtime: 100,
    providers: {
      disney: true,
      netflix: true
    },
    contentRatings: {
      violence: 1,
      language: 1,
      sexualContent: 1,
      frightening: 2
    }
  },
  {
    id: 3,
    title: "Toy Story",
    overview: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    poster_path: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg",
    backdrop_path: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg",
    release_date: "1995-11-22",
    vote_average: 8.3,
    genre_ids: [16, 10751, 35],
    runtime: 81,
    providers: {
      disney: true
    },
    contentRatings: {
      violence: 1,
      language: 1,
      sexualContent: 1,
      frightening: 2
    }
  },
  {
    id: 4,
    title: "How to Train Your Dragon",
    overview: "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself.",
    poster_path: "https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg",
    backdrop_path: "https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg",
    release_date: "2010-03-26",
    vote_average: 7.8,
    genre_ids: [16, 10751, 12, 14],
    runtime: 98,
    providers: {
      netflix: true
    },
    contentRatings: {
      violence: 2,
      language: 1,
      sexualContent: 1,
      frightening: 2
    }
  },
  {
    id: 5,
    title: "The Princess Bride",
    overview: "While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles on the quest to be reunited with his true love.",
    poster_path: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg",
    backdrop_path: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg",
    release_date: "1987-09-25",
    vote_average: 7.7,
    genre_ids: [12, 35, 10749, 14],
    runtime: 98,
    providers: {
      netflix: true,
      amazon: true
    },
    contentRatings: {
      violence: 2,
      language: 1,
      sexualContent: 1,
      frightening: 2
    }
  },
  {
    id: 6,
    title: "The Lego Movie",
    overview: "An ordinary LEGO construction worker is recruited to join a quest to stop an evil tyrant from gluing the LEGO universe into eternal stasis.",
    poster_path: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg",
    backdrop_path: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg",
    release_date: "2014-02-07",
    vote_average: 7.7,
    genre_ids: [16, 10751, 35, 12],
    runtime: 100,
    providers: {
      hbo: true
    },
    contentRatings: {
      violence: 1,
      language: 1,
      sexualContent: 1,
      frightening: 1
    }
  },
  {
    id: 7,
    title: "Night at the Museum",
    overview: "A newly recruited night security guard at the Museum of Natural History discovers that an ancient curse causes the animals and exhibits on display to come to life and wreak havoc.",
    poster_path: "https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg",
    backdrop_path: "https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg",
    release_date: "2006-12-22",
    vote_average: 6.7,
    genre_ids: [35, 12, 14, 10751],
    runtime: 108,
    providers: {
      disney: true
    },
    contentRatings: {
      violence: 2,
      language: 1,
      sexualContent: 1,
      frightening: 2
    }
  },
  {
    id: 8,
    title: "The Neverending Story",
    overview: "A troubled boy dives into a wondrous fantasy world through the pages of a mysterious book.",
    poster_path: "https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg",
    backdrop_path: "https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg",
    release_date: "1984-07-20",
    vote_average: 7.4,
    genre_ids: [12, 14, 10751],
    runtime: 102,
    providers: {
      netflix: true,
      hbo: true
    },
    contentRatings: {
      violence: 2,
      language: 1,
      sexualContent: 1,
      frightening: 3
    }
  },
  {
    id: 9,
    title: "The Iron Giant",
    overview: "A young boy befriends a giant robot from outer space that a paranoid government agent wants to destroy.",
    poster_path: "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg",
    backdrop_path: "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg",
    release_date: "1999-08-06",
    vote_average: 8.0,
    genre_ids: [16, 10751, 878],
    runtime: 86,
    providers: {
      hbo: true
    },
    contentRatings: {
      violence: 2,
      language: 1,
      sexualContent: 1,
      frightening: 2
    }
  },
  {
    id: 10,
    title: "The Wizard of Oz",
    overview: "Dorothy Gale is swept away from a farm in Kansas to a magical land of Oz in a tornado and embarks on a quest with her new friends to see the Wizard.",
    poster_path: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg",
    backdrop_path: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg",
    release_date: "1939-08-25",
    vote_average: 7.6,
    genre_ids: [12, 14, 10751],
    runtime: 102,
    providers: {
      hbo: true,
      amazon: true
    },
    contentRatings: {
      violence: 1,
      language: 1,
      sexualContent: 1,
      frightening: 2
    }
  }
];

export const fetchRecommendedMovies = async (
  answers: QuestionnaireAnswers,
  profiles: Profile[]
): Promise<Movie[]> => {
  try {
    // Calculate common genres across all profiles
    const favoriteGenreIds = new Set<string>();
    const dislikedGenreIds = new Set<string>();
    
    profiles.forEach(profile => {
      profile.favoriteGenres.forEach(genreId => favoriteGenreIds.add(genreId));
      profile.dislikedGenres.forEach(genreId => dislikedGenreIds.add(genreId));
    });
    
    // Remove genres that are disliked by any family member
    const filteredGenres = Array.from(favoriteGenreIds)
      .filter(genreId => !dislikedGenreIds.has(genreId));
    
    // Get the age range to determine appropriate content
    const ages = profiles.map(profile => profile.age);
    const minAge = Math.min(...ages);
    
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
    
    // Filter movies based on criteria
    let filteredMovies = MOCK_MOVIES.filter(movie => {
      // Check content ratings
      if (movie.contentRatings) {
        if (movie.contentRatings.violence > sensitivityThresholds.violence) return false;
        if (movie.contentRatings.language > sensitivityThresholds.language) return false;
        if (movie.contentRatings.sexualContent > sensitivityThresholds.sexualContent) return false;
        if (movie.contentRatings.frightening > sensitivityThresholds.frightening) return false;
      }
      
      // Check duration
      if (answers.duration < 999 && movie.runtime > answers.duration) return false;
      
      // Check platforms
      if (answers.platforms.length > 0) {
        if (!movie.providers) return false;
        const hasMatchingPlatform = answers.platforms.some(platform => movie.providers?.[platform]);
        if (!hasMatchingPlatform) return false;
      }
      
      return true;
    });
    
    // Sort by match score
    filteredMovies = filteredMovies.map(movie => {
      const genreOverlap = movie.genre_ids
        .filter(id => filteredGenres.includes(id.toString()))
        .length;
      
      const matchScore = Math.min(100, Math.round((genreOverlap / Math.max(1, movie.genre_ids.length)) * 100));
      
      let matchReason = "This movie matches your family's preferences";
      if (genreOverlap > 0) {
        matchReason += " for " + genreOverlap + " favorite genres";
      }
      if (answers.mood) {
        matchReason += ` and fits your ${answers.mood} mood`;
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
    return filteredMovies.slice(0, answers.maxResults);
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    throw error;
  }
};