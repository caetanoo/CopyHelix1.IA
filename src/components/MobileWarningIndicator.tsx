import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingDown, Timer, DollarSign, Zap } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";

const MobileWarningIndicator = () => {
  const { category } = useViewportSize();
  const [currentWarning, setCurrentWarning] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const warnings = [
    {
      icon: TrendingDown,
      message: "89% das empresas desperdiçam R$ 100k+ testando criativos aleatórios",
      severity: "high",
      color: "destructive"
    },
    {
      icon: Timer,
      message: "45 dias perdidos criando o que você poderia clonar em 5 minutos",
      severity: "medium", 
      color: "amber-500"
    },
    {
      icon: DollarSign,
      message: "Cada teste é uma roleta russa de R$ 10K sem garantia",
      severity: "high",
      color: "destructive"
    },
    {
      icon: Zap,
      message: "DNA científico entrega 90% de precisão vs 10% do achismo",
      severity: "info",
      color: "primary"
    }
  ];

  useEffect(() => {
    if (!category?.includes('mobile')) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollY / (docHeight - windowHeight);
      
      // Show warning indicator after user scrolls past 30% of content
      setIsVisible(scrollPercent > 0.3 && scrollPercent < 0.8);
    };

    // Cycle through warnings
    const warningInterval = setInterval(() => {
      setCurrentWarning((prev) => (prev + 1) % warnings.length);
    }, 4000);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(warningInterval);
    };
  }, [category, warnings.length]);

  if (!category?.includes('mobile') || !isVisible) return null;

  const currentWarningData = warnings[currentWarning];
  const IconComponent = currentWarningData.icon;

  const severityStyles = {
    high: "bg-destructive/10 border-destructive/30 text-destructive",
    medium: "bg-amber-500/10 border-amber-500/30 text-amber-400", 
    info: "bg-primary/10 border-primary/30 text-primary"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-20 left-4 right-4 z-30 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`
              relative backdrop-blur-xl border rounded-2xl p-4 shadow-2xl
              ${severityStyles[currentWarningData.severity]}
            `}
            style={{
              background: `linear-gradient(135deg, 
                hsl(var(--background) / 0.95) 0%, 
                hsl(var(--background) / 0.85) 100%)`
            }}
          >
            {/* DNA-themed Background Pattern */}
            <div className="absolute inset-0 opacity-5 overflow-hidden rounded-2xl">
              <svg className="w-full h-full" viewBox="0 0 400 100">
                <path
                  d="M0,50 Q100,20 200,50 Q300,80 400,50 Q500,20 600,50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M0,50 Q100,80 200,50 Q300,20 400,50 Q500,80 600,50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </svg>
            </div>

            <div className="relative z-10 flex items-start space-x-3">
              {/* Warning Icon with Pulse */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: currentWarningData.severity === 'high' ? [0, -3, 3, 0] : 0
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 mt-0.5"
              >
                <div className={`
                  p-2 rounded-full border
                  ${currentWarningData.severity === 'high' 
                    ? 'bg-destructive/20 border-destructive/50' 
                    : currentWarningData.severity === 'medium'
                    ? 'bg-amber-500/20 border-amber-500/50'
                    : 'bg-primary/20 border-primary/50'
                  }
                `}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </motion.div>

              {/* Warning Content */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentWarning}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium leading-tight"
                  >
                    {currentWarningData.message}
                  </motion.p>
                </AnimatePresence>
                
                {/* Progress Indicator */}
                <div className="flex space-x-1 mt-3">
                  {warnings.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentWarning 
                          ? 'bg-current w-6' 
                          : 'bg-current/30 w-2'
                      }`}
                      animate={{ 
                        width: index === currentWarning ? 24 : 8,
                        opacity: index === currentWarning ? 1 : 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Severity Pulse Effect */}
            {currentWarningData.severity === 'high' && (
              <motion.div
                className="absolute -inset-1 rounded-2xl border-2 border-destructive/50"
                animate={{ 
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileWarningIndicator;