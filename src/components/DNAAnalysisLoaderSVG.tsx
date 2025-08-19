import React, { useEffect, useState } from 'react';

interface DNAAnalysisLoaderSVGProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const DNAAnalysisLoaderSVG: React.FC<DNAAnalysisLoaderSVGProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisSteps = [
    "Processando elementos criativos...",
    "Decodificando sequências DNA...",
    "Analisando padrões únicos...",
    "Mapeando criatividade...",
    "Finalizando análise..."
  ];

  useEffect(() => {
    if (!isVisible) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          setTimeout(() => onComplete?.(), 800);
          return prev;
        }
      });
    }, 1800);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return Math.min(prev + 2, 100);
        }
        return prev;
      });
    }, 90);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* DNA Helix SVG Animation */}
      <div className="relative w-full max-w-xs mx-auto mb-8">
        <svg 
          viewBox="0 0 200 300" 
          className="w-full h-72 mx-auto"
          style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))' }}
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 100% 50%)" />
              <stop offset="50%" stopColor="hsl(217 100% 65%)" />
              <stop offset="100%" stopColor="hsl(38 92% 50%)" />
            </linearGradient>
            
            <linearGradient id="baseGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(142 100% 50%)" />
              <stop offset="100%" stopColor="hsl(217 100% 65%)" />
            </linearGradient>

            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(142 100% 50%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(142 100% 50%)" stopOpacity="0.1" />
            </radialGradient>

            {/* Scanning Line Gradient */}
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="hsl(38 92% 50%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Main DNA Helix Structure */}
          <g className="dna-helix">
            {/* Left Helix Strand */}
            <path
              d="M60,20 Q80,80 60,140 Q40,200 60,260 Q80,320 60,380"
              fill="none"
              stroke="url(#helixGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="helix-strand-1"
            />
            
            {/* Right Helix Strand */}
            <path
              d="M140,20 Q120,80 140,140 Q160,200 140,260 Q120,320 140,380"
              fill="none"
              stroke="url(#helixGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="helix-strand-2"
            />

            {/* DNA Base Pairs */}
            {Array.from({ length: 12 }).map((_, i) => {
              const y = 30 + (i * 20);
              const angle = (i * 30) % 360;
              const leftX = 60 + Math.sin(angle * Math.PI / 180) * 20;
              const rightX = 140 + Math.sin((angle + 180) * Math.PI / 180) * 20;
              
              return (
                <g key={i} className="base-pair">
                  {/* Connection Line */}
                  <line
                    x1={leftX}
                    y1={y}
                    x2={rightX}
                    y2={y}
                    stroke="url(#baseGradient1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="base-connection"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                  
                  {/* Left Base */}
                  <circle
                    cx={leftX}
                    cy={y}
                    r="4"
                    fill="hsl(142 100% 50%)"
                    className="base-nucleotide left-base"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                  
                  {/* Right Base */}
                  <circle
                    cx={rightX}
                    cy={y}
                    r="4"
                    fill="hsl(217 100% 65%)"
                    className="base-nucleotide right-base"
                    style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
                  />
                </g>
              );
            })}
          </g>

          {/* Scanning Effect */}
          <rect
            x="0"
            y="0"
            width="200"
            height="15"
            fill="url(#scanGradient)"
            className="scan-beam"
          />

          {/* Data Particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={`particle-${i}`}
              cx={30 + (i * 28)}
              cy={50 + (i * 15)}
              r="2"
              fill="hsl(38 92% 50%)"
              className="data-particle"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}

          {/* Glow Effect */}
          <circle
            cx="100"
            cy="150"
            r="80"
            fill="url(#glowGradient)"
            className="background-glow"
          />
        </svg>
      </div>

      {/* Progress Section */}
      <div className="w-full max-w-xs mx-auto space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Análise DNA</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center">
          <h3 className="text-base font-medium text-white mb-3 h-6 transition-all duration-500">
            {analysisSteps[currentStep]}
          </h3>
          <div className="flex justify-center space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Creative Elements Status */}
        <div className="grid grid-cols-2 gap-2">
          {['Criatividade', 'Inovação', 'Estratégia', 'Design'].map((element, i) => (
            <div 
              key={element}
              className={`text-center p-2 rounded-md border text-xs transition-all duration-700 ${
                currentStep > i 
                  ? 'bg-gray-800/60 border-primary/50 text-white' 
                  : 'bg-gray-800/30 border-gray-700 text-gray-500'
              }`}
            >
              <div className="font-medium">{element}</div>
              {currentStep > i && (
                <div className="w-1 h-1 rounded-full bg-primary mx-auto mt-1 animate-ping"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .dna-helix {
          animation: dna-rotate 8s linear infinite;
          transform-origin: 100px 150px;
        }

        .helix-strand-1,
        .helix-strand-2 {
          animation: strand-glow 3s ease-in-out infinite;
        }

        .helix-strand-2 {
          animation-delay: 1.5s;
        }

        .base-connection {
          animation: connection-pulse 2s ease-in-out infinite;
        }

        .base-nucleotide {
          animation: nucleotide-pulse 2.5s ease-in-out infinite;
        }

        .left-base {
          filter: drop-shadow(0 0 5px hsl(142 100% 50%));
        }

        .right-base {
          filter: drop-shadow(0 0 5px hsl(217 100% 65%));
        }

        .scan-beam {
          animation: scan-vertical 4s ease-in-out infinite;
        }

        .data-particle {
          animation: particle-float 3s ease-in-out infinite;
        }

        .background-glow {
          animation: glow-pulse 4s ease-in-out infinite;
        }

        @keyframes dna-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes strand-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px hsl(142 100% 50% / 50%));
          }
          50% { 
            filter: drop-shadow(0 0 15px hsl(142 100% 50% / 80%));
          }
        }

        @keyframes connection-pulse {
          0%, 100% { 
            stroke-opacity: 0.6;
            stroke-width: 2;
          }
          50% { 
            stroke-opacity: 1;
            stroke-width: 3;
          }
        }

        @keyframes nucleotide-pulse {
          0%, 100% { 
            r: 4;
            fill-opacity: 0.8;
          }
          50% { 
            r: 5;
            fill-opacity: 1;
          }
        }

        @keyframes scan-vertical {
          0%, 100% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(320px); opacity: 0; }
        }

        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-15px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dna-helix,
          .scan-beam,
          .data-particle,
          .background-glow {
            animation: none;
          }
          
          .helix-strand-1,
          .helix-strand-2,
          .base-connection,
          .base-nucleotide {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default DNAAnalysisLoaderSVG;