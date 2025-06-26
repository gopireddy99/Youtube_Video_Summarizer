import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from './Header';
import VideoInput from './VideoInput';
import SummaryResult from './SummaryResult';
import ErrorMessage from './ErrorMessage';
import { summarizeVideo } from '../services/api';

interface SummaryData {
  title: string;
  summary: string;
  duration?: string;
  summaryType: 'abstractive' | 'extractive';
  wordCount?: number;
}

interface SummarizerPageProps {
  onBackToHome: () => void;
}

const SummarizerPage: React.FC<SummarizerPageProps> = ({ onBackToHome }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (url: string, summaryType: 'abstractive' | 'extractive') => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const result = await summarizeVideo({
        video_url: url,
        summary_type: summaryType,
      });

      setSummary({
        title: result.title,
        summary: result.summary,
        duration: result.duration,
        summaryType: result.summary_type,
        wordCount: result.word_count,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSummary(null);
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation Header */}
      <div className="w-full bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {!summary && !error && (
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Transform Videos into Insights
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Paste any YouTube video URL and get an AI-powered summary in seconds. 
                Choose between abstractive and extractive summarization methods.
              </p>
            </div>
          )}

          {error ? (
            <ErrorMessage error={error} onRetry={handleRetry} />
          ) : summary ? (
            <SummaryResult summary={summary} onReset={handleReset} />
          ) : (
            <VideoInput onSubmit={handleSubmit} loading={loading} />
          )}
        </div>
      </main>

      <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              Powered by advanced AI technology for intelligent video summarization
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Built with React, TypeScript, and Python FastAPI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SummarizerPage;