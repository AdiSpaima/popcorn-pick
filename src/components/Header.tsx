import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Popcorn, Film, Users, History, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className={`sticky top-0 z-10 shadow-md transition-colors duration-300 ${
      theme === 'dark' ? 'bg-darkNavy-800' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Popcorn className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-300 bg-clip-text text-transparent">
              PopCorn Pick
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-navy-700 dark:text-cream-200 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <Film className="w-5 h-5" />
              <span>Recommend</span>
            </Link>
            <Link 
              to="/profiles" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/profiles')
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-navy-700 dark:text-cream-200 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Profiles</span>
            </Link>
            <Link 
              to="/history" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/history')
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-navy-700 dark:text-cream-200 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <History className="w-5 h-5" />
              <span>History</span>
            </Link>
            <ThemeToggle />
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="ml-2 p-2 rounded-full hover:bg-cream-100 dark:hover:bg-darkNavy-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center space-x-2 py-2 ${
                    isActive('/')
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-navy-700 dark:text-cream-200'
                  }`}
                  onClick={closeMenu}
                >
                  <Film className="w-5 h-5" />
                  <span>Recommend</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/profiles" 
                  className={`flex items-center space-x-2 py-2 ${
                    isActive('/profiles')
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-navy-700 dark:text-cream-200'
                  }`}
                  onClick={closeMenu}
                >
                  <Users className="w-5 h-5" />
                  <span>Profiles</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/history" 
                  className={`flex items-center space-x-2 py-2 ${
                    isActive('/history')
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-navy-700 dark:text-cream-200'
                  }`}
                  onClick={closeMenu}
                >
                  <History className="w-5 h-5" />
                  <span>History</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;