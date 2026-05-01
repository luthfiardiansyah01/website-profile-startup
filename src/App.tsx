import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a1f] to-[#12122a] text-white overflow-hidden">
        <Header />
        <main>
          {currentPage === 'about' ? <AboutPage /> : <HomePage />}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;