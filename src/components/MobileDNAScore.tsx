import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Target, TrendingUp, Zap, Award, X } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";

interface MobileDNAScoreProps {
  isVisible: boolean;
  onClose: () => void;
  score?: number;
}

const MobileDNAScore = ({ isVisible, onClose, score = 87 }: MobileDNAScoreProps) => {
  const { category } = useViewportSize();
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const scoreBreakdown = [
    { name: "Composição Visual", score: 92, icon: Star, color: "primary" },
    { name: "Psicologia das Cores", score: 88, icon: Target, color: "secondary" },
    { name: "Hierarquia Visual", score: 85, icon: TrendingUp, color: "accent" },
    { name: "Elementos de Conversão", score: 89, icon: Zap, color: "primary" },
  ];

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-green-400", desc: "Excepcional" };
    if (score >= 80) return { grade: "A", color: "text-primary", desc: "Excelente" };
    if (score >= 70) return { grade: "B+", color: "text-secondary", desc: "Muito Bom" };
    if (score >= 60) return { grade: "B", color: "text-accent", desc: "Bom" };
    return { grade: "C", color: "text-amber-400", desc: "Regular" };
  };

  useEffect(() => {
    if (isVisible) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      // Animate score counting up
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev < score) {
            return Math.min(prev + 2, score);
          }
          return prev;
        });
      }, 50);

      const breakdownTimer = setTimeout(() => {
        setShowBreakdown(true);
      }, 1500);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
        clearInterval(interval);
        clearTimeout(breakdownTimer);
      };
    } else {
      document.body.style.overflow = '';
      setAnimatedScore(0);
      setShowBreakdown(false);
    }
  }, [isVisible, score, onClose]);

  if (!category?.includes('mobile') || !isVisible) return null;

  const scoreData = getScoreGrade(score);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-80 flex items-start justify-center p-4 pt-8 pb-20"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-gradient-to-br from-gray-900/95 to-black/90 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h3 id="modal-title" className="text-lg font-bold text-white">DNA Score</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Main Score Circle */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-32 h-32">
                {/* Background Circle */}
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="8"
                  />
                  {/* Progress Circle */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: animatedScore / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{
                      strokeDasharray: "314.16",
                      strokeDashoffset: 314.16 * (1 - animatedScore / 100),
                    }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(142 100% 50%)" />
                      <stop offset="50%" stopColor="hsl(217 100% 65%)" />
                      <stop offset="100%" stopColor="hsl(38 92% 50%)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                    className="text-3xl font-bold text-white"
                  >
                    {animatedScore}
                  </motion.div>
                  <div className={`text-sm font-semibold ${scoreData.color}`}>
                    {scoreData.grade}
                  </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Score Description */}
            <div className="text-center" id="modal-description">
              <p className="text-white font-medium mb-1">
                Potencial DNA: <span className={scoreData.color}>{scoreData.desc}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Isso é o que você poderia alcançar com seus criativos
              </p>
            </div>

            {/* Score Breakdown */}
            <AnimatePresence>
              {showBreakdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div className="text-sm font-semibold text-center text-muted-foreground">
                    Potencial Desbloqueado
                  </div>
                  {scoreBreakdown.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-gray-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-${item.color}/20 border border-${item.color}/30 rounded-lg flex items-center justify-center`}>
                          <item.icon className={`w-4 h-4 text-${item.color}`} />
                        </div>
                        <span className="text-sm font-medium text-white">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            className={`h-full bg-${item.color} rounded-full`}
                          />
                        </div>
                        <span className="text-sm font-semibold text-white w-8">
                          {item.score}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warning Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-accent/10 border border-accent/30 rounded-2xl p-4 text-center"
            >
              <p className="text-sm text-accent font-medium leading-tight">
                🚀 Desbloqueie este potencial analisando seus criativos reais
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-glow text-black font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Desbloquear Meu DNA
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 bg-gradient-to-r from-secondary to-secondary/80 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25 border border-secondary/30"
              >
                Ver Como Funciona
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileDNAScore;