import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DNAAnalysisLoaderProps {
  isVisible: boolean;
  progress?: number;
  onComplete?: () => void;
}

const DNAAnalysisLoader: React.FC<DNAAnalysisLoaderProps> = ({ 
  isVisible, 
  progress = 0, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('scanning');

  const analysisSteps = [
    "Escaneando padrões criativos...",
    "Decodificando sequências DNA...",
    "Analisando estrutura genética...",
    "Mapeando traços únicos...",
    "Processando elementos criativos...",
    "Finalizando análise DNA..."
  ];

  const creativeElements = [
    "Inovação",
    "Criatividade", 
    "Estratégia",
    "Design",
    "Visão",
    "Execução"
  ];

  useEffect(() => {
    if (!isVisible) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          setAnimationPhase('complete');
          setTimeout(() => onComplete?.(), 1000);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(stepInterval);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* DNA Helix Animation Container */}
          <div className="relative w-full max-w-sm mx-auto px-6">
            
            {/* Main DNA Helix Structure */}
            <div className="relative h-80 mb-8">
              {/* DNA Backbone Lines */}
              <motion.div
                className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary rounded-full transform -translate-x-1/2"
                animate={{ 
                  rotateY: [0, 360],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* DNA Base Pairs */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 w-32 h-1 flex items-center justify-between transform -translate-x-1/2"
                  style={{ 
                    top: `${(i * 24) + 20}px`,
                  }}
                  animate={{
                    rotateZ: [i * 30, (i * 30) + 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                >
                  {/* Left Base */}
                  <motion.div
                    className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50"
                    animate={{
                      boxShadow: [
                        "0 0 10px hsl(142 100% 50% / 50%)",
                        "0 0 20px hsl(142 100% 50% / 80%)",
                        "0 0 10px hsl(142 100% 50% / 50%)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                  />
                  
                  {/* Connection Line */}
                  <motion.div
                    className="flex-1 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary mx-2 rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scaleX: [0.8, 1.1, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                  
                  {/* Right Base */}
                  <motion.div
                    className="w-4 h-4 rounded-full bg-secondary shadow-lg shadow-secondary/50"
                    animate={{
                      boxShadow: [
                        "0 0 10px hsl(217 100% 65% / 50%)",
                        "0 0 20px hsl(217 100% 65% / 80%)",
                        "0 0 10px hsl(217 100% 65% / 50%)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: (i * 0.15) + 0.5
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Scanning Beam Effect */}
              <motion.div
                className="absolute left-0 right-0 h-8 bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"
                animate={{
                  y: [0, 320, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating Data Particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-accent"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${10 + (i * 5)}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Análise DNA</span>
                <span>{Math.round((currentStep / (analysisSteps.length - 1)) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(currentStep / (analysisSteps.length - 1)) * 100}%`
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Analysis Status Text */}
            <motion.div
              className="text-center mb-8"
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {analysisSteps[currentStep]}
              </h3>
              <div className="flex justify-center space-x-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Creative Elements Being Analyzed */}
            <div className="grid grid-cols-3 gap-4">
              {creativeElements.map((element, i) => (
                <motion.div
                  key={element}
                  className="text-center p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: currentStep > i ? 1 : 0.3,
                    scale: currentStep > i ? 1 : 0.8,
                    borderColor: currentStep > i ? "hsl(142 100% 50%)" : "hsl(220 13% 18%)"
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: i * 0.1 
                  }}
                >
                  <div className="text-xs font-medium text-gray-300">
                    {element}
                  </div>
                  {currentStep > i && (
                    <motion.div
                      className="w-1 h-1 rounded-full bg-primary mx-auto mt-1"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Completion Animation */}
            {animationPhase === 'complete' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 rounded-full border-4 border-primary bg-primary/20 flex items-center justify-center mx-auto mb-4"
                    animate={{
                      boxShadow: [
                        "0 0 20px hsl(142 100% 50% / 50%)",
                        "0 0 40px hsl(142 100% 50% / 80%)",
                        "0 0 20px hsl(142 100% 50% / 50%)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    DNA Decodificado!
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Análise criativa completa
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DNAAnalysisLoader;