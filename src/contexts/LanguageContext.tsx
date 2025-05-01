import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'fr' | 'en';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const enTranslations: Record<string, string> = {
  // Header
  'app.name': 'PopCorn Pick',
  'nav.recommend': 'Recommend',
  'nav.profiles': 'Profiles',
  'nav.history': 'History',
  
  // HomePage
  'home.title': 'Find Your Perfect Family Movie Night',
  'home.subtitle': 'Tell us who\'s watching, your mood, and what you\'re looking for. We\'ll find the perfect movie that everyone will love!',
  'home.getRecommendations': 'Get Movie Recommendations',
  'home.createProfiles': 'Create Family Profiles',
  'home.createProfilesDesc': 'Set up profiles for each family member with their ages, preferences, and sensitivities.',
  'home.answerQuestions': 'Answer Quick Questions',
  'home.answerQuestionsDesc': 'Tell us your mood, available time, and which streaming services you have access to.',
  'home.getPerfectMatches': 'Get Perfect Matches',
  'home.getPerfectMatchesDesc': 'Receive personalized movie recommendations that everyone in the family will enjoy.',
  'home.whyPopcornPick': 'Why PopCorn Pick?',
  'home.personalizedForEveryone': 'Personalized for Everyone',
  'home.personalizedForEveryoneDesc': 'Finds movies that match the whole family\'s preferences, not just one person\'s.',
  'home.ageAppropriate': 'Age-Appropriate Filtering',
  'home.ageAppropriateDesc': 'Automatically filters content based on the youngest viewer\'s age.',
  'home.moodBased': 'Mood-Based Recommendations',
  'home.moodBasedDesc': 'Suggests movies that match your current mood and available time.',
  'home.allPlatforms': 'All Your Platforms',
  'home.allPlatformsDesc': 'Only shows movies available on your streaming services.',
  'home.getStarted': 'Get Started',
  'home.createProfilesPrompt': 'Create profiles for your family members to get personalized recommendations.',
  'home.createFirstProfile': 'Create First Profile',
  'home.readyToFind': 'Ready to find your movie?',
  'home.findMoviesNow': 'Find Movies Now',
  
  // Profiles Page
  'profiles.title': 'Family Profiles',
  'profiles.subtitle': 'Create and manage profiles for everyone who watches movies together.',
  'profiles.createNew': 'Create New Profile',
  'profiles.noProfiles': 'No profiles yet. Create your first profile to get started!',
  'profiles.edit': 'Edit',
  'profiles.delete': 'Delete',
  'profiles.select': 'Select',
  'profiles.selected': 'Selected',
  'profiles.age': 'Age',
  'profiles.continue': 'Continue to Questionnaire',
  
  // Profile Form
  'profileForm.createTitle': 'Create New Profile',
  'profileForm.editTitle': 'Edit Profile',
  'profileForm.name': 'Name',
  'profileForm.namePlaceholder': 'Enter name',
  'profileForm.age': 'Age',
  'profileForm.agePlaceholder': 'Enter age',
  'profileForm.genres': 'Favorite Genres',
  'profileForm.selectGenres': 'Select favorite genres',
  'profileForm.save': 'Save Profile',
  'profileForm.cancel': 'Cancel',
  
  // Questionnaire
  'questionnaire.title': 'Movie Night Questionnaire',
  'questionnaire.subtitle': 'Tell us about your preferences for tonight',
  'questionnaire.mood': 'What mood are you in?',
  'questionnaire.duration': 'How much time do you have?',
  'questionnaire.streaming': 'Which streaming services do you have?',
  'questionnaire.findMovies': 'Find Movies',
  
  // Recommendations
  'recommendations.title': 'Your Movie Recommendations',
  'recommendations.subtitle': 'Based on your profiles and preferences',
  'recommendations.loading': 'Finding the perfect movies for you...',
  'recommendations.noResults': 'No movies found matching your criteria. Try adjusting your preferences.',
  'recommendations.watchedIt': 'Watched It',
  'recommendations.back': 'Back to Questionnaire',
  
  // History
  'history.title': 'Watch History',
  'history.subtitle': 'Movies your family has watched',
  'history.noHistory': 'No watch history yet. Mark movies as watched to see them here.',
  'history.watchedOn': 'Watched on',
  'history.clearHistory': 'Clear History',
  
  // Footer
  'footer.madeWith': 'Made with',
  'footer.forFamilies': 'for movie-loving families',
  'footer.movieData': 'Movie data provided by',
  'footer.copyright': '© 2025 PopCorn Pick',
  
  // Language toggle
  'language.en': 'English',
  'language.fr': 'French',
  'language.toggle': 'Language'
};

// French translations
const frTranslations: Record<string, string> = {
  // Header
  'app.name': 'PopCorn Pick',
  'nav.recommend': 'Recommander',
  'nav.profiles': 'Profils',
  'nav.history': 'Historique',
  
  // HomePage
  'home.title': 'Trouvez Votre Soirée Cinéma Familiale Parfaite',
  'home.subtitle': 'Dites-nous qui regarde, votre humeur et ce que vous recherchez. Nous trouverons le film parfait que tout le monde adorera !',
  'home.getRecommendations': 'Obtenir des Recommandations',
  'home.createProfiles': 'Créer des Profils Familiaux',
  'home.createProfilesDesc': 'Configurez des profils pour chaque membre de la famille avec leurs âges, préférences et sensibilités.',
  'home.answerQuestions': 'Répondre à des Questions Rapides',
  'home.answerQuestionsDesc': 'Dites-nous votre humeur, le temps disponible et les services de streaming auxquels vous avez accès.',
  'home.getPerfectMatches': 'Obtenez des Correspondances Parfaites',
  'home.getPerfectMatchesDesc': 'Recevez des recommandations de films personnalisées que toute la famille appréciera.',
  'home.whyPopcornPick': 'Pourquoi PopCorn Pick ?',
  'home.personalizedForEveryone': 'Personnalisé pour Tous',
  'home.personalizedForEveryoneDesc': 'Trouve des films qui correspondent aux préférences de toute la famille, pas seulement d\'une personne.',
  'home.ageAppropriate': 'Filtrage Adapté à l\'Âge',
  'home.ageAppropriateDesc': 'Filtre automatiquement le contenu en fonction de l\'âge du plus jeune spectateur.',
  'home.moodBased': 'Recommandations Basées sur l\'Humeur',
  'home.moodBasedDesc': 'Suggère des films qui correspondent à votre humeur actuelle et au temps disponible.',
  'home.allPlatforms': 'Toutes Vos Plateformes',
  'home.allPlatformsDesc': 'Affiche uniquement les films disponibles sur vos services de streaming.',
  'home.getStarted': 'Commencer',
  'home.createProfilesPrompt': 'Créez des profils pour les membres de votre famille pour obtenir des recommandations personnalisées.',
  'home.createFirstProfile': 'Créer le Premier Profil',
  'home.readyToFind': 'Prêt à trouver votre film ?',
  'home.findMoviesNow': 'Trouver des Films Maintenant',
  
  // Profiles Page
  'profiles.title': 'Profils Familiaux',
  'profiles.subtitle': 'Créez et gérez des profils pour tous ceux qui regardent des films ensemble.',
  'profiles.createNew': 'Créer un Nouveau Profil',
  'profiles.noProfiles': 'Pas encore de profils. Créez votre premier profil pour commencer !',
  'profiles.edit': 'Modifier',
  'profiles.delete': 'Supprimer',
  'profiles.select': 'Sélectionner',
  'profiles.selected': 'Sélectionné',
  'profiles.age': 'Âge',
  'profiles.continue': 'Continuer au Questionnaire',
  
  // Profile Form
  'profileForm.createTitle': 'Créer un Nouveau Profil',
  'profileForm.editTitle': 'Modifier le Profil',
  'profileForm.name': 'Nom',
  'profileForm.namePlaceholder': 'Entrez le nom',
  'profileForm.age': 'Âge',
  'profileForm.agePlaceholder': 'Entrez l\'âge',
  'profileForm.genres': 'Genres Préférés',
  'profileForm.selectGenres': 'Sélectionnez les genres préférés',
  'profileForm.save': 'Enregistrer le Profil',
  'profileForm.cancel': 'Annuler',
  
  // Questionnaire
  'questionnaire.title': 'Questionnaire de Soirée Cinéma',
  'questionnaire.subtitle': 'Dites-nous vos préférences pour ce soir',
  'questionnaire.mood': 'Dans quelle humeur êtes-vous ?',
  'questionnaire.duration': 'Combien de temps avez-vous ?',
  'questionnaire.streaming': 'Quels services de streaming avez-vous ?',
  'questionnaire.findMovies': 'Trouver des Films',
  
  // Recommendations
  'recommendations.title': 'Vos Recommandations de Films',
  'recommendations.subtitle': 'Basées sur vos profils et préférences',
  'recommendations.loading': 'Recherche des films parfaits pour vous...',
  'recommendations.noResults': 'Aucun film trouvé correspondant à vos critères. Essayez d\'ajuster vos préférences.',
  'recommendations.watchedIt': 'Je l\'ai Vu',
  'recommendations.back': 'Retour au Questionnaire',
  
  // History
  'history.title': 'Historique de Visionnage',
  'history.subtitle': 'Films que votre famille a regardés',
  'history.noHistory': 'Pas encore d\'historique de visionnage. Marquez les films comme vus pour les voir ici.',
  'history.watchedOn': 'Vu le',
  'history.clearHistory': 'Effacer l\'Historique',
  
  // Footer
  'footer.madeWith': 'Fait avec',
  'footer.forFamilies': 'pour les familles qui aiment le cinéma',
  'footer.movieData': 'Données de films fournies par',
  'footer.copyright': '© 2025 PopCorn Pick',
  
  // Language toggle
  'language.en': 'Anglais',
  'language.fr': 'Français',
  'language.toggle': 'Langue'
};

// Map of all translations
const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  fr: frTranslations
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Set default language to French
  const [language, setLanguage] = useState<Language>('fr');

  // Load language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};