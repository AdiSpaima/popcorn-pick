import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MoviesProvider } from './contexts/MoviesContext';
import { ProfilesProvider } from './contexts/ProfilesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilesPage from './pages/ProfilesPage';
import QuestionnairePage from './pages/QuestionnairePage';
import RecommendationsPage from './pages/RecommendationsPage';
import HistoryPage from './pages/HistoryPage';
import ProfileFormPage from './pages/ProfileFormPage';

function App() {
  return (
    <ThemeProvider>
      <ProfilesProvider>
        <MoviesProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="/profiles/new" element={<ProfileFormPage />} />
                <Route path="/profiles/edit/:id" element={<ProfileFormPage />} />
                <Route path="/questionnaire" element={<QuestionnairePage />} />
                <Route path="/recommendations" element={<RecommendationsPage />} />
                <Route path="/history" element={<HistoryPage />} />
              </Routes>
            </Layout>
          </Router>
        </MoviesProvider>
      </ProfilesProvider>
    </ThemeProvider>
  );
}

export default App;