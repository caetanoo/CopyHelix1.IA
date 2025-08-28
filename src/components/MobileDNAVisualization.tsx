import { motion } from "framer-motion";

interface MobileDNAVisualizationProps {
  className?: string;
}

const MobileDNAVisualization = ({ className = "" }: MobileDNAVisualizationProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Enhanced Interactive DNA Visualization */}
      <motion.div 
        className="relative h-40 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-800/60 backdrop-blur-lg border border-primary/25 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* Ambient background glow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Enhanced DNA Helix Animation */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            rotateY: [0, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-80 drop-shadow-lg">
            <defs>
              <linearGradient id="mobileHelixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(142 100% 60%)" />
                <stop offset="30%" stopColor="hsl(217 100% 70%)" />
                <stop offset="60%" stopColor="hsl(38 92% 60%)" />
                <stop offset="100%" stopColor="hsl(142 100% 50%)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
            
            {/* Enhanced DNA Double Helix */}
            <path
              d="M25 15 Q50 25 25 50 Q0 75 25 85 M75 15 Q50 25 75 50 Q100 75 75 85"
              stroke="url(#mobileHelixGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            
            {/* Animated Base Pairs */}
            <motion.line 
              x1="25" y1="25" x2="75" y2="25" 
              stroke="url(#mobileHelixGradient)" 
              strokeWidth="2" 
              opacity="0.8"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.line 
              x1="25" y1="50" x2="75" y2="50" 
              stroke="url(#mobileHelixGradient)" 
              strokeWidth="2" 
              opacity="0.8"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
            />
            <motion.line 
              x1="25" y1="75" x2="75" y2="75" 
              stroke="url(#mobileHelixGradient)" 
              strokeWidth="2" 
              opacity="0.8"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
            />
            
            {/* Central energy core */}
            <circle cx="50" cy="50" r="8" fill="url(#mobileHelixGradient)" opacity="0.6">
              <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </motion.div>

        {/* Advanced Scanning Effects */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/12 to-transparent h-2 rounded-full"
          animate={{
            y: [-10, 140, -10]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Horizontal scan line */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/8 to-transparent w-2 h-full"
          animate={{
            x: [-10, 280, -10]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />

        {/* Enhanced Data Points with trails */}
        <motion.div 
          className="absolute top-6 left-6 w-3 h-3 bg-primary rounded-full shadow-lg"
          animate={{
            scale: [1, 1.4, 1],
            boxShadow: [
              '0 0 10px hsl(142 100% 50% / 0.4)',
              '0 0 20px hsl(142 100% 50% / 0.8)',
              '0 0 10px hsl(142 100% 50% / 0.4)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0
          }}
        />
        <motion.div 
          className="absolute top-12 right-8 w-2 h-2 bg-secondary rounded-full shadow-lg"
          animate={{
            scale: [1, 1.5, 1],
            boxShadow: [
              '0 0 8px hsl(217 100% 65% / 0.4)',
              '0 0 16px hsl(217 100% 65% / 0.8)',
              '0 0 8px hsl(217 100% 65% / 0.4)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-8 left-12 w-2.5 h-2.5 bg-accent rounded-full shadow-lg"
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              '0 0 8px hsl(38 92% 50% / 0.4)',
              '0 0 18px hsl(38 92% 50% / 0.8)',
              '0 0 8px hsl(38 92% 50% / 0.4)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 2
          }}
        />
        
        {/* Corner accent elements */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-secondary/60 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-accent/60 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/60 rounded-br-lg" />
      </motion.div>
    </div>
  );
};

export default MobileDNAVisualization;