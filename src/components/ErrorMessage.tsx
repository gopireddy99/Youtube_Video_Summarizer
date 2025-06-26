import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-red-500/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 shadow-xl">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-red-500/20 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-300 mb-6">
              {error}
            </p>
            <button
              onClick={onRetry}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;