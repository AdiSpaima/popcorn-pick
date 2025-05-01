import React from 'react';
import { Popcorn, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-darkNavy-800' : 'bg-cream-100'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Popcorn className="w-6 h-6 text-primary-500 mr-2" />
            <span className="text-lg font-semibold bg-gradient-to-r from-primary-500 to-accent-300 bg-clip-text text-transparent">
              PopCorn Pick
            </span>
          </div>
          
          <div className="text-sm text-navy-600 dark:text-cream-300">
            <div className="flex items-center justify-center md:justify-end">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-primary-500 fill-current" />
              <span>for movie-loving families</span>
            </div>
            <div className="mt-1 text-center md:text-right">
              <p>
                Movie data provided by{' '}
                <a 
                  href="https://www.themoviedb.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary-600 dark:text-secondary-400 hover:underline"
                >
                  TMDB
                </a>
              </p>
              <p className="mt-1">© 2025 PopCorn Pick</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;