import React, { useState } from 'react';
import DNAAnalysisLoader from '@/components/DNAAnalysisLoader';
import DNAAnalysisLoaderSimple from '@/components/DNAAnalysisLoaderSimple';
import DNAAnalysisLoaderSVG from '@/components/DNAAnalysisLoaderSVG';

type LoaderVariant = 'framer' | 'css' | 'svg';

const DNALoaderExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<LoaderVariant>('svg');

  const startAnalysis = () => {
    setIsLoading(true);
  };

  const handleComplete = () => {
    setIsLoading(false);
    // Handle completion logic here
    console.log('DNA Analysis completed!');
  };

  const renderLoader = () => {
    switch (selectedVariant) {
      case 'framer':
        return (
          <DNAAnalysisLoader 
            isVisible={isLoading}
            onComplete={handleComplete}
          />
        );
      case 'css':
        return (
          <DNAAnalysisLoaderSimple 
            isVisible={isLoading}
            onComplete={handleComplete}
          />
        );
      case 'svg':
        return (
          <DNAAnalysisLoaderSVG 
            isVisible={isLoading}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            DNA Analysis Loader
          </h1>
          <p className="text-gray-400">
            Mobile-optimized creative DNA processing animation
          </p>
        </div>

        {/* Loader Variant Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Choose Animation Style:</h3>
          <div className="grid grid-cols-1 gap-3">
            
            <button
              onClick={() => setSelectedVariant('svg')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedVariant === 'svg'
                  ? 'border-primary bg-primary/10 text-white'
                  : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="text-left">
                <div className="font-medium">SVG Animation (Recommended)</div>
                <div className="text-sm opacity-75">
                  Best performance, smooth animations, mobile-optimized
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedVariant('css')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedVariant === 'css'
                  ? 'border-primary bg-primary/10 text-white'
                  : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="text-left">
                <div className="font-medium">CSS-Only Animation</div>
                <div className="text-sm opacity-75">
                  Pure CSS, lightweight, great for slower devices
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedVariant('framer')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedVariant === 'framer'
                  ? 'border-primary bg-primary/10 text-white'
                  : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="text-left">
                <div className="font-medium">Framer Motion</div>
                <div className="text-sm opacity-75">
                  Rich animations, requires framer-motion dependency
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Demo Button */}
        <div className="space-y-4">
          <button
            onClick={startAnalysis}
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analisando...' : 'Decodificar DNA dos Meus Criativos'}
          </button>

          {!isLoading && (
            <div className="text-center text-sm text-gray-400">
              Click the button to see the {selectedVariant.toUpperCase()} animation in action
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="bg-gray-800/30 rounded-lg p-6 space-y-3">
          <h4 className="font-semibold text-white mb-3">Animation Features:</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>DNA double helix with rotating base pairs</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span>Scanning beam effect for processing visualization</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Progressive status updates with step-by-step feedback</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Mobile-optimized for portrait orientation</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span>Minimal empty space with engaging content</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Accessibility-friendly with reduced motion support</span>
            </li>
          </ul>
        </div>

        {/* Technical Notes */}
        <div className="bg-gray-800/20 rounded-lg p-4 text-xs text-gray-400">
          <p>
            <strong>Performance:</strong> SVG version is recommended for production use. 
            All variants include reduced motion support for accessibility.
          </p>
        </div>
      </div>

      {/* Render Selected Loader */}
      {renderLoader()}
    </div>
  );
};

export default DNALoaderExample;