import React, { useEffect, useState } from 'react';

interface DNAAnalysisLoaderSimpleProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const DNAAnalysisLoaderSimple: React.FC<DNAAnalysisLoaderSimpleProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    "Escaneando padrões criativos...",
    "Decodificando sequências DNA...",
    "Analisando estrutura genética...",
    "Processando elementos criativos...",
    "Finalizando análise DNA..."
  ];

  useEffect(() => {
    if (!isVisible) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          setTimeout(() => onComplete?.(), 1000);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(stepInterval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* DNA Helix CSS Animation */}
      <div className="relative w-full max-w-sm mx-auto px-6 mb-8">
        <div className="dna-helix-container">
          <div className="dna-helix">
            {/* DNA Strands */}
            <div className="dna-strand strand-1"></div>
            <div className="dna-strand strand-2"></div>
            
            {/* DNA Base Pairs */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className="dna-base-pair"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  top: `${i * 10}%`
                }}
              >
                <div className="base base-left"></div>
                <div className="base-connection"></div>
                <div className="base base-right"></div>
              </div>
            ))}
          </div>
          
          {/* Scanning Effect */}
          <div className="dna-scanner"></div>
        </div>
      </div>

      {/* Progress and Status */}
      <div className="w-full max-w-sm mx-auto px-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Análise DNA</span>
            <span>{Math.round((currentStep / (analysisSteps.length - 1)) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(currentStep / (analysisSteps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-white mb-3 transition-all duration-500">
            {analysisSteps[currentStep]}
          </h3>
          <div className="flex justify-center space-x-1">
            <div className="loading-dot"></div>
            <div className="loading-dot" style={{ animationDelay: '0.2s' }}></div>
            <div className="loading-dot" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Creative Elements Grid */}
        <div className="grid grid-cols-2 gap-3">
          {['Inovação', 'Criatividade', 'Estratégia', 'Design'].map((element, i) => (
            <div 
              key={element}
              className={`text-center p-3 rounded-lg border transition-all duration-500 ${
                currentStep > i 
                  ? 'bg-gray-800/70 border-primary text-white' 
                  : 'bg-gray-800/30 border-gray-700 text-gray-500'
              }`}
            >
              <div className="text-sm font-medium">{element}</div>
              {currentStep > i && (
                <div className="w-1 h-1 rounded-full bg-primary mx-auto mt-2 pulse-dot"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .dna-helix-container {
          position: relative;
          height: 300px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dna-helix {
          position: relative;
          width: 120px;
          height: 280px;
          animation: dna-rotate 6s linear infinite;
        }

        .dna-strand {
          position: absolute;
          width: 4px;
          height: 100%;
          border-radius: 2px;
          background: linear-gradient(to bottom, 
            hsl(142 100% 50%), 
            hsl(217 100% 65%), 
            hsl(142 100% 50%)
          );
          box-shadow: 0 0 10px hsl(142 100% 50% / 50%);
        }

        .strand-1 {
          left: 20px;
          animation: dna-wave-1 3s ease-in-out infinite;
        }

        .strand-2 {
          right: 20px;
          animation: dna-wave-2 3s ease-in-out infinite;
        }

        .dna-base-pair {
          position: absolute;
          width: 100%;
          height: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: base-rotate 4s linear infinite;
        }

        .base {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .base-left {
          background-color: hsl(142 100% 50%);
          color: hsl(142 100% 50%);
        }

        .base-right {
          background-color: hsl(217 100% 65%);
          color: hsl(217 100% 65%);
        }

        .base-connection {
          flex: 1;
          height: 2px;
          margin: 0 4px;
          background: linear-gradient(to right, 
            hsl(142 100% 50%), 
            hsl(217 100% 65%)
          );
          border-radius: 1px;
          animation: connection-pulse 2s ease-in-out infinite;
        }

        .dna-scanner {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to right, 
            transparent, 
            hsl(38 92% 50% / 60%), 
            transparent
          );
          animation: scan-vertical 4s ease-in-out infinite;
        }

        .loading-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: hsl(142 100% 50%);
          animation: dot-pulse 1.4s ease-in-out infinite;
        }

        .pulse-dot {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        @keyframes dna-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes dna-wave-1 {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(8px); }
        }

        @keyframes dna-wave-2 {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-8px); }
        }

        @keyframes base-rotate {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }

        @keyframes connection-pulse {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.1); }
        }

        @keyframes scan-vertical {
          0%, 100% { top: -20px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 5px hsl(142 100% 50% / 50%);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 15px hsl(142 100% 50% / 80%);
            transform: scale(1.2);
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .dna-helix,
          .dna-base-pair,
          .dna-scanner,
          .loading-dot,
          .pulse-dot {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DNAAnalysisLoaderSimple;