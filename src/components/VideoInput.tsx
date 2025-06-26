import React, { useState } from 'react';
import { Search, Link, AlertCircle } from 'lucide-react';

interface VideoInputProps {
  onSubmit: (url: string, summaryType: 'abstractive' | 'extractive') => void;
  loading: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');
  const [summaryType, setSummaryType] = useState<'abstractive' | 'extractive'>('abstractive');
  const [error, setError] = useState('');

  const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    onSubmit(url.trim(), summaryType);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="youtube-url" className="block text-lg font-medium text-white mb-3">
                YouTube Video URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Link className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="youtube-url"
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="block w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                />
              </div>
              {error && (
                <div className="mt-3 flex items-center space-x-2 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-white mb-3">
                Summarization Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="summaryType"
                    value="abstractive"
                    checked={summaryType === 'abstractive'}
                    onChange={(e) => setSummaryType(e.target.value as 'abstractive' | 'extractive')}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    summaryType === 'abstractive'
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}>
                    <div className="text-white font-medium">Abstractive</div>
                    <div className="text-gray-300 text-sm mt-1">
                      AI generates new sentences with key insights
                    </div>
                  </div>
                </label>
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="summaryType"
                    value="extractive"
                    checked={summaryType === 'extractive'}
                    onChange={(e) => setSummaryType(e.target.value as 'abstractive' | 'extractive')}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    summaryType === 'extractive'
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}>
                    <div className="text-white font-medium">Extractive</div>
                    <div className="text-gray-300 text-sm mt-1">
                      Selects most important sentences from transcript
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Generate Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VideoInput;