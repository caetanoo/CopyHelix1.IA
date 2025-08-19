import { useEffect, useRef } from "react";
import { Play, Image, FileText, Video, Zap, Target, User, BarChart } from "lucide-react";
import creativeVideo from "@/assets/creative-video.jpg";
import creativeImage from "@/assets/creative-image.jpg";
import creativeSocial from "@/assets/creative-social.jpg";

const DNAHelix = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create enhanced particle effects
    const createParticle = () => {
      const particle = document.createElement("div");
      const isCode = Math.random() > 0.7;
      
      if (isCode) {
        // Matrix-style code particles
        particle.className = "absolute text-xs text-primary/40 font-mono pointer-events-none";
        particle.textContent = Math.random().toString(36).substring(2, 5).toUpperCase();
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = "-20px";
        particle.style.animationDelay = Math.random() * 8 + "s";
        particle.style.animation = "matrix-rain 12s linear infinite";
      } else {
        // Glowing particles
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 8 + "s";
        particle.style.background = Math.random() > 0.5 ? 
          "hsl(var(--primary))" : "hsl(var(--secondary))";
      }
      
      container.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, isCode ? 12000 : 8000);
    };

    // Create particles more frequently
    const particleInterval = setInterval(createParticle, 500);

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center" ref={containerRef} style={{ perspective: "1000px" }}>
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-secondary/10 animate-pulse" />
      
      {/* Particle container */}
      <div className="particles" />
      
      {/* DNA Helix Structure - Enhanced 3D */}
      <div className="dna-helix" style={{ 
        filter: "drop-shadow(0 0 40px hsl(var(--primary) / 0.8)) drop-shadow(0 0 80px hsl(var(--secondary) / 0.6))",
        transformStyle: "preserve-3d"
      }}>
        {/* Enhanced DNA Strands */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Enhanced gradients with neon effect */}
            <linearGradient id="dnaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 100% 50%)" />
              <stop offset="50%" stopColor="hsl(142 100% 70%)" />
              <stop offset="100%" stopColor="hsl(142 100% 60%)" />
            </linearGradient>
            <linearGradient id="dnaGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(217 100% 65%)" />
              <stop offset="50%" stopColor="hsl(217 100% 80%)" />
              <stop offset="100%" stopColor="hsl(217 100% 70%)" />
            </linearGradient>
            
            {/* Enhanced glow filter */}
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Connecting lines gradient */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(142 100% 50%)" />
              <stop offset="50%" stopColor="hsl(38 92% 50%)" />
              <stop offset="100%" stopColor="hsl(217 100% 65%)" />
            </linearGradient>
          </defs>
          
          {/* First Strand - Enhanced 3D appearance */}
          <path
            d="M 200 50 Q 280 100 200 150 Q 120 200 200 250 Q 280 300 200 350"
            stroke="url(#dnaGradient1)"
            strokeWidth="12"
            fill="none"
            filter="url(#neonGlow)"
            className="animate-glow-pulse"
            opacity="0.9"
          />
          
          {/* Second Strand - Enhanced 3D appearance */}
          <path
            d="M 200 50 Q 120 100 200 150 Q 280 200 200 250 Q 120 300 200 350"
            stroke="url(#dnaGradient2)"
            strokeWidth="12"
            fill="none"
            filter="url(#neonGlow)"
            className="animate-glow-pulse"
            style={{ animationDelay: "1.5s" }}
            opacity="0.9"
          />
          
          {/* Enhanced Connecting Lines */}
          {Array.from({ length: 12 }, (_, i) => {
            const y = 60 + i * 25;
            const offset = Math.sin((i * Math.PI) / 6) * 60;
            return (
              <line
                key={i}
                x1={200 - offset}
                y1={y}
                x2={200 + offset}
                y2={y}
                stroke="url(#connectionGradient)"
                strokeWidth="4"
                opacity="0.8"
                filter="url(#neonGlow)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            );
          })}
          
          {/* Central spine with nodes */}
          {Array.from({ length: 8 }, (_, i) => {
            const y = 80 + i * 35;
            return (
              <circle
                key={`node-${i}`}
                cx="200"
                cy={y}
                r="3"
                fill="hsl(38 92% 50%)"
                filter="url(#neonGlow)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            );
          })}
        </svg>
      </div>

      {/* Floating Creative Cards - matching reference design */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        {/* Creative Card 1 - Top Left */}
        <div className="absolute top-16 left-8 w-20 h-20 rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:scale-105 transition-transform duration-300" style={{
          animation: "float 6s ease-in-out infinite",
          animationDelay: "0s"
        }}>
          <img src={creativeVideo} alt="Creative" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
          <div className="absolute top-2 right-2 w-6 h-6 bg-primary/90 rounded-full flex items-center justify-center">
            <Play className="w-3 h-3 text-black" fill="currentColor" />
          </div>
          <div className="absolute bottom-2 left-2 text-xs text-white font-medium">Creative</div>
        </div>

        {/* Creative Card 2 - Top Right */}
        <div className="absolute top-24 right-12 w-18 h-18 rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-secondary/20 shadow-lg hover:scale-105 transition-transform duration-300" style={{
          animation: "float 5s ease-in-out infinite",
          animationDelay: "1s"
        }}>
          <img src={creativeImage} alt="Creative" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
          <div className="absolute top-1 right-1 w-5 h-5 bg-secondary/90 rounded-full flex items-center justify-center">
            <Image className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        {/* Creative Card 3 - Bottom Left */}
        <div className="absolute bottom-20 left-16 w-16 h-16 rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-accent/20 shadow-lg hover:scale-105 transition-transform duration-300" style={{
          animation: "float 7s ease-in-out infinite",
          animationDelay: "2s"
        }}>
          <img src={creativeSocial} alt="Creative" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/40 via-transparent to-transparent" />
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-accent/90 rounded-full flex items-center justify-center">
            <Target className="w-2 h-2 text-white" />
          </div>
        </div>

        {/* Creative Card 4 - Bottom Right */}
        <div className="absolute bottom-16 right-8 w-20 h-20 rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:scale-105 transition-transform duration-300" style={{
          animation: "float 4s ease-in-out infinite",
          animationDelay: "3s"
        }}>
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <BarChart className="w-8 h-8 text-primary" />
          </div>
          <div className="absolute bottom-2 left-2 text-xs text-white font-medium">Analytics</div>
        </div>

        {/* Creative Card 5 - Middle Right */}
        <div className="absolute top-1/2 right-4 w-14 h-14 rounded-xl bg-card/80 backdrop-blur-sm border border-secondary/20 shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center" style={{
          animation: "float 8s ease-in-out infinite",
          animationDelay: "4s"
        }}>
          <Zap className="w-6 h-6 text-secondary" />
        </div>

        {/* Creative Card 6 - Middle Left */}
        <div className="absolute top-1/3 left-2 w-16 h-12 rounded-xl bg-card/80 backdrop-blur-sm border border-accent/20 shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center" style={{
          animation: "float 6s ease-in-out infinite",
          animationDelay: "5s"
        }}>
          <User className="w-5 h-5 text-accent" />
        </div>
      </div>

      {/* Central Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl animate-pulse" />
      </div>
    </div>
  );
};

export default DNAHelix;