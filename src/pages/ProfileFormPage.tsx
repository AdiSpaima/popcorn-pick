import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save, Trash } from 'lucide-react';
import { useProfiles } from '../contexts/ProfilesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Profile, GENRE_OPTIONS, LANGUAGE_OPTIONS } from '../types/profile';
import { v4 as uuidv4 } from 'uuid';

const ProfileFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const { addProfile, updateProfile, getProfileById } = useProfiles();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<Omit<Profile, 'id'>>({
    name: '',
    age: 10,
    language: 'en',
    favoriteGenres: [],
    dislikedGenres: [],
    likedMovies: [],
    dislikedMovies: [],
    sensitivityLevels: {
      violence: 3,
      language: 3,
      sexualContent: 3,
      frightening: 3
    },
    avatar: ''
  });
  
  useEffect(() => {
    if (isEditing && id) {
      const profile = getProfileById(id);
      if (profile) {
        setFormData({
          name: profile.name,
          age: profile.age,
          language: profile.language,
          favoriteGenres: profile.favoriteGenres,
          dislikedGenres: profile.dislikedGenres,
          likedMovies: profile.likedMovies,
          dislikedMovies: profile.dislikedMovies,
          sensitivityLevels: profile.sensitivityLevels,
          avatar: profile.avatar
        });
      } else {
        navigate('/profiles');
      }
    }
    
    document.title = isEditing
      ? `${t('profileForm.editTitle')} - ${t('app.name')}`
      : `${t('profileForm.createTitle')} - ${t('app.name')}`;
  }, [id, isEditing, getProfileById, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value
    }));
  };
  
  const handleGenreToggle = (genreId: string, type: 'favoriteGenres' | 'dislikedGenres') => {
    setFormData(prev => {
      const isSelected = prev[type].includes(genreId);
      
      // If toggling to favorite, remove from disliked if present
      let updatedDisliked = prev.dislikedGenres;
      let updatedFavorite = prev.favoriteGenres;
      
      if (type === 'favoriteGenres') {
        updatedFavorite = isSelected 
          ? prev.favoriteGenres.filter(id => id !== genreId)
          : [...prev.favoriteGenres, genreId];
        
        if (!isSelected) {
          updatedDisliked = prev.dislikedGenres.filter(id => id !== genreId);
        }
      } else {
        updatedDisliked = isSelected 
          ? prev.dislikedGenres.filter(id => id !== genreId)
          : [...prev.dislikedGenres, genreId];
          
        if (!isSelected) {
          updatedFavorite = prev.favoriteGenres.filter(id => id !== genreId);
        }
      }
      
      return {
        ...prev,
        favoriteGenres: updatedFavorite,
        dislikedGenres: updatedDisliked
      };
    });
  };
  
  const handleSensitivityChange = (type: keyof Profile['sensitivityLevels'], value: number) => {
    setFormData(prev => ({
      ...prev,
      sensitivityLevels: {
        ...prev.sensitivityLevels,
        [type]: value
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert(t('profileForm.namePlaceholder'));
      return;
    }
    
    const profileData: Profile = {
      ...formData,
      id: isEditing && id ? id : uuidv4()
    };
    
    if (isEditing && id) {
      updateProfile(id, profileData);
    } else {
      addProfile(profileData);
    }
    
    navigate('/profiles');
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/profiles')}
          className="mr-4 p-2 rounded-full hover:bg-cream-200 dark:hover:bg-darkNavy-700 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">
          {isEditing ? t('profileForm.editTitle') : t('profileForm.createTitle')}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-darkNavy-800 rounded-xl p-6 shadow-md">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy-700 dark:text-cream-300 mb-1">
              {t('profileForm.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('profileForm.namePlaceholder')}
              className="w-full px-4 py-2 border border-navy-300 dark:border-darkNavy-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-darkNavy-700 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-navy-700 dark:text-cream-300 mb-1">
              {t('profileForm.age')}
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="1"
              max="100"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-navy-300 dark:border-darkNavy-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-darkNavy-700 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-navy-700 dark:text-cream-300 mb-1">
              Preferred Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-navy-300 dark:border-darkNavy-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-darkNavy-700 dark:text-white"
            >
              {LANGUAGE_OPTIONS.map(language => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-cream-300 mb-3">
              {t('profileForm.genres')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GENRE_OPTIONS.map(genre => (
                <button
                  type="button"
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id, 'favoriteGenres')}
                  className={`px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                    formData.favoriteGenres.includes(genre.id)
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border border-primary-300 dark:border-primary-700'
                      : formData.dislikedGenres.includes(genre.id)
                        ? 'bg-cream-100 dark:bg-darkNavy-800 text-navy-400 dark:text-cream-500 border border-navy-300 dark:border-darkNavy-700'
                        : 'bg-cream-100 dark:bg-darkNavy-800 hover:bg-cream-200 dark:hover:bg-darkNavy-700 border border-navy-300 dark:border-darkNavy-700'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-navy-500 dark:text-cream-400">
              Click to select your favorite genres. Click again to deselect.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-cream-300 mb-3">
              Disliked Genres
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GENRE_OPTIONS.map(genre => (
                <button
                  type="button"
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id, 'dislikedGenres')}
                  className={`px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                    formData.dislikedGenres.includes(genre.id)
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border border-primary-300 dark:border-primary-700'
                      : formData.favoriteGenres.includes(genre.id)
                        ? 'bg-cream-100 dark:bg-darkNavy-800 text-navy-400 dark:text-cream-500 border border-navy-300 dark:border-darkNavy-700'
                        : 'bg-cream-100 dark:bg-darkNavy-800 hover:bg-cream-200 dark:hover:bg-darkNavy-700 border border-navy-300 dark:border-darkNavy-700'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-navy-500 dark:text-cream-400">
              Click to select genres you dislike. Click again to deselect.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-navy-700 dark:text-cream-300 mb-3">
              Content Sensitivity Levels
            </h3>
            <p className="text-xs text-navy-500 dark:text-cream-400 mb-4">
              Set how sensitive you are to different types of content (1 = very sensitive, 5 = not sensitive)
            </p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="violence" className="text-sm text-navy-700 dark:text-cream-300">
                    Violence
                  </label>
                  <span className="text-sm text-navy-500 dark:text-cream-400">
                    Level: {formData.sensitivityLevels.violence}
                  </span>
                </div>
                <input
                  type="range"
                  id="violence"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.sensitivityLevels.violence}
                  onChange={(e) => handleSensitivityChange('violence', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-navy-500 dark:text-cream-400">
                  <span>Very Sensitive</span>
                  <span>Not Sensitive</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="language" className="text-sm text-navy-700 dark:text-cream-300">
                    Strong Language
                  </label>
                  <span className="text-sm text-navy-500 dark:text-cream-400">
                    Level: {formData.sensitivityLevels.language}
                  </span>
                </div>
                <input
                  type="range"
                  id="language"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.sensitivityLevels.language}
                  onChange={(e) => handleSensitivityChange('language', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-navy-500 dark:text-cream-400">
                  <span>Very Sensitive</span>
                  <span>Not Sensitive</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="sexualContent" className="text-sm text-navy-700 dark:text-cream-300">
                    Sexual Content
                  </label>
                  <span className="text-sm text-navy-500 dark:text-cream-400">
                    Level: {formData.sensitivityLevels.sexualContent}
                  </span>
                </div>
                <input
                  type="range"
                  id="sexualContent"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.sensitivityLevels.sexualContent}
                  onChange={(e) => handleSensitivityChange('sexualContent', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-navy-500 dark:text-cream-400">
                  <span>Very Sensitive</span>
                  <span>Not Sensitive</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="frightening" className="text-sm text-navy-700 dark:text-cream-300">
                    Frightening Scenes
                  </label>
                  <span className="text-sm text-navy-500 dark:text-cream-400">
                    Level: {formData.sensitivityLevels.frightening}
                  </span>
                </div>
                <input
                  type="range"
                  id="frightening"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.sensitivityLevels.frightening}
                  onChange={(e) => handleSensitivityChange('frightening', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-navy-500 dark:text-cream-400">
                  <span>Very Sensitive</span>
                  <span>Not Sensitive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/profiles')}
            className="px-4 py-2 border border-navy-300 dark:border-darkNavy-600 rounded-lg text-navy-700 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-darkNavy-700 transition-colors"
          >
            {t('profileForm.cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? t('profileForm.editTitle') : t('profileForm.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileFormPage;