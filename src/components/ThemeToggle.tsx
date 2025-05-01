import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        theme === 'dark'
          ? 'bg-darkNavy-700 hover:bg-darkNavy-600 text-accent-300'
          : 'bg-cream-100 hover:bg-cream-200 text-navy-700'
      }`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;