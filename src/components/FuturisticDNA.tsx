import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Target, BarChart, Cpu, Database, Network, Brain, Code, Atom } from "lucide-react";

const FuturisticDNA = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Disable heavy particle animations on mobile for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Create floating particles (desktop only)
    const createParticle = () => {
      const particle = document.createElement("div");
      const particleType = Math.random();
      
      if (particleType > 0.8) {
        // Code particles
        particle.className = "absolute text-xs text-primary/40 font-mono pointer-events-none animate-pulse";
        const codes = ["01", "11", "DNA", "AI", "GEN", "SEQ"];
        particle.textContent = codes[Math.floor(Math.random() * codes.length)];
      } else if (particleType > 0.6) {
        // Geometric particles
        particle.className = "absolute w-1 h-1 bg-secondary/60 pointer-events-none";
        particle.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
      } else {
        // Glowing dots
        particle.className = "absolute w-0.5 h-0.5 bg-primary rounded-full pointer-events-none";
        particle.style.boxShadow = "0 0 10px hsl(var(--primary))";
      }
      
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 2 + "s";
      particle.style.animation = `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`;
      
      container.appendChild(particle);

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 6000); // Reduced from 8000 to 6000
    };

    const interval = setInterval(createParticle, 800); // Reduced frequency from 400 to 800
    return () => clearInterval(interval);
  }, []);

  const techElements = [
    { icon: Brain, color: "primary", position: { top: "15%", left: "20%" }, delay: 0 },
    { icon: Cpu, color: "secondary", position: { top: "25%", right: "15%" }, delay: 0.5 },
    { icon: Database, color: "accent", position: { bottom: "30%", left: "10%" }, delay: 1 },
    { icon: Network, color: "primary", position: { bottom: "20%", right: "20%" }, delay: 1.5 },
    { icon: Code, color: "secondary", position: { top: "45%", left: "5%" }, delay: 2 },
    { icon: Atom, color: "accent", position: { top: "60%", right: "8%" }, delay: 2.5 },
    { icon: Zap, color: "primary", position: { bottom: "45%", right: "5%" }, delay: 3 },
    { icon: Target, color: "secondary", position: { top: "75%", left: "15%" }, delay: 3.5 },
  ];

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      ref={containerRef}
      style={{ maxWidth: '100%', contain: 'layout style paint' }}
    >
      {/* Background tech grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,149,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,149,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Central DNA Helix */}
      <motion.div 
        className="relative w-96 h-96 flex items-center justify-center"
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* DNA Strands */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dnaStrand1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 100% 50%)" />
              <stop offset="50%" stopColor="hsl(142 100% 70%)" />
              <stop offset="100%" stopColor="hsl(142 100% 50%)" />
            </linearGradient>
            <linearGradient id="dnaStrand2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(217 100% 65%)" />
              <stop offset="50%" stopColor="hsl(217 100% 85%)" />
              <stop offset="100%" stopColor="hsl(217 100% 65%)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main DNA strands */}
          <motion.path
            d="M 200 50 Q 280 100 200 150 Q 120 200 200 250 Q 280 300 200 350"
            stroke="url(#dnaStrand1)"
            strokeWidth="8"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M 200 50 Q 120 100 200 150 Q 280 200 200 250 Q 120 300 200 350"
            stroke="url(#dnaStrand2)"
            strokeWidth="8"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Connecting base pairs */}
          {Array.from({ length: 15 }, (_, i) => {
            const y = 60 + i * 20;
            const offset = Math.sin((i * Math.PI) / 7) * 60;
            return (
              <motion.line
                key={i}
                x1={200 - offset}
                y1={y}
                x2={200 + offset}
                y2={y}
                stroke={i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
                strokeWidth="3"
                opacity="0.8"
                filter="url(#glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: i * 0.1 + 1, duration: 0.5 }}
              />
            );
          })}

          {/* Central data nodes */}
          {Array.from({ length: 8 }, (_, i) => {
            const y = 80 + i * 35;
            return (
              <motion.circle
                key={`node-${i}`}
                cx="200"
                cy={y}
                r="4"
                fill="hsl(38 92% 50%)"
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: i * 0.2 + 2, duration: 0.6 }}
              />
            );
          })}
        </svg>

        {/* Orbiting energy rings */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ filter: "blur(1px)" }}
        />
        
        <motion.div
          className="absolute inset-4 border border-secondary/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ filter: "blur(0.5px)" }}
        />
      </motion.div>

      {/* Floating Tech Elements */}
      {techElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <motion.div
            key={index}
            className="absolute"
            style={element.position}
            initial={{ opacity: 0, scale: 0, rotateY: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              y: [0, -10, 0],
            }}
            transition={{ 
              delay: element.delay,
              duration: 0.8,
              y: {
                duration: 2 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.2, rotateZ: 10 }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${element.color}/20 to-${element.color}/40 border-2 border-${element.color}/50 backdrop-blur-sm flex items-center justify-center shadow-lg hover:shadow-${element.color}/50 transition-all duration-300`}>
              <IconComponent className={`w-8 h-8 text-${element.color}`} />
              <div className={`absolute inset-0 rounded-2xl bg-${element.color}/10 blur-xl`} />
            </div>
          </motion.div>
        );
      })}

      {/* Data streams - contained within viewport */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-1 bg-gradient-to-r from-primary/60 to-transparent"
        animate={{ 
          scaleX: [0, 1, 0],
          x: [0, 50, 100]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ maxWidth: 'calc(100% - 5rem)' }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-20 h-1 bg-gradient-to-l from-secondary/60 to-transparent"
        animate={{ 
          scaleX: [0, 1, 0],
          x: [0, -40, -80]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ maxWidth: 'calc(100% - 5rem)' }}
      />

      {/* Holographic scanning lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-8"
        animate={{ y: [0, 400, 0] }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Central glow pulse */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-40 h-40 rounded-full bg-gradient-radial from-primary/20 via-primary/10 to-transparent blur-2xl" />
      </motion.div>
    </div>
  );
};

export default FuturisticDNA;