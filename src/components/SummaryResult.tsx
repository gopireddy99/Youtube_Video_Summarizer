import React from 'react';
import { FileText, Clock, Type, Download, Share2 } from 'lucide-react';

interface SummaryData {
  title: string;
  summary: string;
  duration?: string;
  summaryType: 'abstractive' | 'extractive';
  wordCount?: number;
}

interface SummaryResultProps {
  summary: SummaryData;
  onReset: () => void;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ summary, onReset }) => {
  const handleDownload = () => {
    const content = `${summary.title}\n\n${summary.summary}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${summary.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: summary.title,
          text: summary.summary,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${summary.title}\n\n${summary.summary}`);
      alert('Summary copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Summary Generated</h2>
                <p className="text-gray-300 text-sm">
                  {summary.summaryType === 'abstractive' ? 'Abstractive' : 'Extractive'} summarization
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                title="Download summary"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                title="Share summary"
              >
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Type className="w-5 h-5" />
              <span>{summary.title}</span>
            </h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-200 leading-relaxed text-base">
                {summary.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center space-x-4">
              {summary.duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{summary.duration}</span>
                </div>
              )}
              {summary.wordCount && (
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{summary.wordCount} words</span>
                </div>
              )}
            </div>
            <button
              onClick={onReset}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Summarize Another Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryResult;