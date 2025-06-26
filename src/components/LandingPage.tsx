import React from 'react';
import { 
  Youtube, 
  Sparkles, 
  Zap, 
  Brain, 
  Clock, 
  Download, 
  Share2, 
  ArrowRight,
  Play,
  FileText,
  Globe,
  Shield
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Intelligence",
      description: "Advanced AI models including GPT-3.5 and BART for intelligent summarization"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get comprehensive summaries in seconds, not minutes"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Multiple Formats",
      description: "Choose between abstractive and extractive summarization methods"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export & Share",
      description: "Download summaries or share them instantly with others"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Universal Access",
      description: "Works with any public YouTube video with available captions"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your data is processed securely and never stored permanently"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Paste URL",
      description: "Simply paste any YouTube video URL"
    },
    {
      number: "02",
      title: "Choose Method",
      description: "Select abstractive or extractive summarization"
    },
    {
      number: "03",
      title: "Get Summary",
      description: "Receive your AI-generated summary instantly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  YouTube Summarizer
                </h1>
                <p className="text-gray-300 text-xs">AI-Powered Video Intelligence</p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <span>Try Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2">
                  <div className="flex items-center space-x-2 text-purple-300">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Powered by Advanced AI</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Transform
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> Videos </span>
                into
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Insights</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Instantly convert any YouTube video into concise, intelligent summaries using cutting-edge AI technology. 
                Save time, extract knowledge, and never miss key insights again.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Summarizing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-5 h-5" />
                <span>Takes less than 30 seconds</span>
              </div>
            </div>

            {/* Demo Preview */}
            <div className="mt-16">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-gray-300 text-sm">
                      youtube.com/watch?v=example...
                    </div>
                  </div>
                  <div className="text-left space-y-3">
                    <div className="text-white font-semibold">AI-Generated Summary:</div>
                    <div className="text-gray-300 leading-relaxed">
                      "This video explores the fundamentals of machine learning, covering key concepts like supervised learning, neural networks, and practical applications in modern technology..."
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>📊 156 words</span>
                      <span>⏱️ 12:34 video</span>
                      <span>🧠 Abstractive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to transform any YouTube video into actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center group">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to extract maximum value from video content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-purple-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already saving time and extracting insights from YouTube videos with AI-powered summarization.
            </p>
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 mx-auto shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
            >
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Start Summarizing Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-md border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

export default LandingPage;