import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark' ? 'bg-darkNavy-900 text-white' : 'bg-cream-50 text-navy-800'
    }`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;