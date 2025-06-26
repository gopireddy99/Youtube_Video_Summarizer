import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SummarizerPage from './components/SummarizerPage';

type Page = 'landing' | 'summarizer';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const navigateToSummarizer = () => {
    setCurrentPage('summarizer');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'landing' ? (
        <LandingPage onGetStarted={navigateToSummarizer} />
      ) : (
        <SummarizerPage onBackToHome={navigateToLanding} />
      )}
    </div>
  );
}

export default App;