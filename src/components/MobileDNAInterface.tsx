import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Sparkles, ChevronDown, ChevronUp, Play } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";
import MobileDNAScore from "./MobileDNAScore";

interface MobileDNAInterfaceProps {
  isActive?: boolean;
  onAnalyze?: () => void;
}

const MobileDNAInterface = ({ isActive = true, onAnalyze }: MobileDNAInterfaceProps) => {
  const { category } = useViewportSize();
  const [isScanning, setIsScanning] = useState(false);
  const [showDNAScore, setShowDNAScore] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [primaryScore] = useState(94); // Main focus metric

  // Simplified single key insight
  const keyInsight = {
    title: "DNA Criativo Detectado",
    score: primaryScore,
    status: "Pronto para replicar",
    confidence: "Alta precisão"
  };

  // Hidden detailed metrics (shown only when expanded)
  const detailedMetrics = [
    { name: "Cores", score: 92, icon: "🎨" },
    { name: "Layout", score: 88, icon: "📐" },
    { name: "Copy", score: 99, icon: "✍️" },
    { name: "CTA", score: 87, icon: "🎯" },
    { name: "Visual", score: 91, icon: "🖼️" },
    { name: "Hook", score: 94, icon: "🎣" }
  ];


  if (!category?.includes('mobile')) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
      className="w-full max-w-sm mx-auto"
    >
      {/* SIMPLIFIED: Single Hero Card - DNA Analysis Result */}
      <div className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-md border border-primary/30 rounded-3xl p-6 space-y-6">
        
        {/* Hero DNA Visualization - Central Focus */}
        <div className="relative flex flex-col items-center">
          
          {/* DNA Helix - Main Visual Element */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-glow-pulse scale-110"></div>
            <svg width="80" height="80" viewBox="0 0 80 80" className="relative z-10 text-primary animate-dna-rotate">
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(142 100% 50%)" />
                  <stop offset="50%" stopColor="hsl(217 100% 65%)" />
                  <stop offset="100%" stopColor="hsl(38 92% 50%)" />
                </linearGradient>
              </defs>
              <path
                d="M30 12 Q40 28 30 44 Q20 60 30 76 M50 12 Q40 28 50 44 Q60 60 50 76 M30 28 L50 28 M30 44 L50 44 M30 60 L50 60"
                stroke="url(#heroGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="30" cy="28" r="3" fill="hsl(142 100% 50%)" />
              <circle cx="50" cy="28" r="3" fill="hsl(217 100% 65%)" />
              <circle cx="30" cy="44" r="3" fill="hsl(38 92% 50%)" />
              <circle cx="50" cy="44" r="3" fill="hsl(142 100% 50%)" />
              <circle cx="30" cy="60" r="3" fill="hsl(217 100% 65%)" />
              <circle cx="50" cy="60" r="3" fill="hsl(38 92% 50%)" />
            </svg>
          </div>

          {/* Single Key Metric - The Main Focus */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
              <span className="text-sm font-medium text-primary">{keyInsight.title}</span>
            </div>
            
            {/* Hero Score */}
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">{keyInsight.score}%</div>
              <div className="text-sm text-muted-foreground">{keyInsight.status}</div>
              
              {/* Single Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
                <motion.div 
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${keyInsight.score}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
              
              <div className="flex items-center justify-center space-x-1 mt-2">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-medium">{keyInsight.confidence}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progressive Disclosure - Details Toggle */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between py-3 px-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-primary/30"
        >
          <span className="text-sm text-muted-foreground">Ver detalhes da análise</span>
          <motion.div
            animate={{ rotate: showDetails ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.button>

        {/* Collapsible Details Section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-2">
                {detailedMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-800/50 border border-accent/20 rounded-lg p-2 text-center"
                  >
                    <div className="text-sm mb-1">{metric.icon}</div>
                    <div className="text-xs font-medium text-white">{metric.name}</div>
                    <div className="text-xs text-accent font-semibold">{metric.score}%</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Single Primary CTA */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsScanning(true);
            setTimeout(() => {
              setIsScanning(false);
              setShowDNAScore(true);
              setTimeout(() => onAnalyze?.(), 1000);
            }, 2000);
          }}
          className="w-full bg-gradient-to-r from-primary to-primary-glow text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center space-x-2"
        >
          {isScanning ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              <span>Analisando...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Replicar Este DNA</span>
            </>
          )}
        </motion.button>
      </div>
      
      {/* DNA Score Modal */}
      <MobileDNAScore 
        isVisible={showDNAScore}
        onClose={() => setShowDNAScore(false)}
        score={keyInsight.score}
      />
    </motion.div>
  );
};

export default MobileDNAInterface;