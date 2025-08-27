import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface DNATransitionProps {
  variant?: 'separator' | 'hero-background';
  className?: string;
}

const DNATransition = ({ variant = 'separator', className = '' }: DNATransitionProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 1024px)");
      setIsMobile(mediaQuery.matches);
    };

    checkIsMobile();
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    mediaQuery.addEventListener('change', checkIsMobile);
    
    return () => mediaQuery.removeEventListener('change', checkIsMobile);
  }, []);

  // Return null for desktop - mobile-only rendering
  if (!isMobile) return null;

  const floatingParticleVariants = {
    float: {
      y: [-12, 12, -12],
      x: [-8, 8, -8],
      opacity: [0.2, 0.5, 0.2],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  const gentleFloatVariants = {
    float: {
      y: [-6, 6, -6],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  if (variant === 'hero-background') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Ultra-subtle gradient backdrop */}
        <motion.div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(142 100% 50% / 0.15) 0%, hsl(217 100% 65% / 0.08) 40%, transparent 70%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        {/* Floating DNA particles - very subtle */}
        <motion.div
          variants={floatingParticleVariants}
          animate="float"
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary/20 rounded-full blur-[2px]"
          style={{ animationDelay: '0s' }}
        />
        <motion.div
          variants={floatingParticleVariants}
          animate="float"
          className="absolute top-3/4 right-1/4 w-2 h-2 bg-secondary/15 rounded-full blur-[2px]"
          style={{ animationDelay: '3s' }}
        />
        <motion.div
          variants={floatingParticleVariants}
          animate="float"
          className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-accent/10 rounded-full blur-[2px]"
          style={{ animationDelay: '6s' }}
        />
        
        {/* Gentle pulsing orbs */}
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-primary/[0.03] rounded-full blur-xl"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-secondary/[0.02] rounded-full blur-2xl"
          style={{ animationDelay: '4s' }}
        />
        
        {/* Ultra-subtle scanning line */}
        <motion.div
          className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary/[0.05] to-transparent"
          animate={{
            y: ['0%', '100%', '0%'],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  // Default separator variant
  return (
    <section className={`relative py-8 overflow-hidden ${className}`}>
      {/* Subtle Gradient Background */}
      <motion.div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'linear-gradient(135deg, hsl(142 100% 50% / 0.08) 0%, hsl(217 100% 65% / 0.04) 50%, hsl(38 92% 50% / 0.08) 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Elegant Central Separator */}
      <div className="relative z-10 flex items-center justify-center py-6">
        {/* DNA Separator Line */}
        <div className="relative w-full max-w-sm">
          {/* Main gradient line */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          {/* Central DNA icon */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary/8 via-secondary/4 to-accent/8 rounded-full border border-primary/25 backdrop-blur-sm"
            variants={pulseVariants}
            animate="pulse"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" className="opacity-60">
              <defs>
                <linearGradient id="miniDnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(142 100% 50%)" />
                  <stop offset="50%" stopColor="hsl(217 100% 65%)" />
                  <stop offset="100%" stopColor="hsl(38 92% 50%)" />
                </linearGradient>
              </defs>
              
              {/* Minimal DNA Structure */}
              <path
                d="M4 2 Q8 4 4 8 Q0 12 4 14 M12 2 Q8 4 12 8 Q16 12 12 14 M4 4 L12 4 M4 8 L12 8 M4 12 L12 12"
                stroke="url(#miniDnaGradient)"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles - More subtle */}
      <motion.div
        variants={gentleFloatVariants}
        animate="float"
        className="absolute top-1/2 left-8 w-1.5 h-1.5 bg-primary/30 rounded-full blur-sm"
        style={{ animationDelay: '0s' }}
      />
      <motion.div
        variants={gentleFloatVariants}
        animate="float"
        className="absolute top-1/2 right-8 w-1 h-1 bg-secondary/30 rounded-full blur-sm"
        style={{ animationDelay: '2s' }}
      />
    </section>
  );
};

export default DNATransition;