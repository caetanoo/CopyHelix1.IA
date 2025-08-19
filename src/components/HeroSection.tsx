import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import FuturisticDNA from "./FuturisticDNA";
import MobileDNAInterface from "./MobileDNAInterface";
import { motion } from "framer-motion";
import { useViewportSize, useIsTouchDevice } from "@/hooks/use-mobile";

const HeroSection = () => {
  const { category } = useViewportSize();
  const isTouch = useIsTouchDevice();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: category === 'mobile-small' ? 0.15 : 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-12">
      {/* Enhanced Dark Background Effects - matching reference */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      
      {/* Animated Glowing orbs for depth - Disabled on mobile for performance */}
      {!category?.includes('mobile') && (
        <>
          <motion.div 
            className="absolute top-1/3 left-1/5 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"
            variants={glowVariants}
            animate="animate"
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-secondary/15 rounded-full blur-[120px]"
            variants={glowVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-primary/10 via-transparent to-secondary/10 blur-3xl"
            variants={glowVariants}
            animate="animate"
            style={{ animationDelay: "4s" }}
          />
        </>
      )}
      
      <div className="container-wide relative z-10">
        <motion.div 
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content - matching reference layout */}
          <div className="space-y-8 lg:pr-8">
            
            {/* Beta Badge - now shows on mobile too */}
            <motion.div 
              className={`${category?.includes('mobile') ? 'flex justify-center' : 'inline-flex'}`}
              variants={itemVariants}
            >
              <motion.div 
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                whileHover={!isTouch ? { scale: 1.05, boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" } : {}}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-3 h-3 mr-1.5 text-primary" />
                </motion.div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">ACESSO ANTECIPADO</span>
              </motion.div>
            </motion.div>

            {/* Mobile: Beautiful Desktop-like Message */}
            {category?.includes('mobile') ? (
              <motion.div 
                className="space-y-4 text-center"
                variants={itemVariants}
              >
                <h1 className="text-3xl sm:text-4xl font-bold leading-normal px-4">
                  <span className="text-white">
                    Pare de Criar do{" "}
                    <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent font-black">
                      Zero
                    </span>
                    ,{" "}
                  </span>
                  <span className="text-white">
                    Clone os Que{" "}
                    <span className="bg-gradient-to-r from-secondary via-primary to-primary-glow bg-clip-text text-transparent font-black">
                      Converteram
                    </span>
                  </span>
                </h1>
                
                <div className="space-y-5 max-w-md mx-auto">
                  <h2 className="text-lg font-bold text-primary leading-relaxed">
                    Primeira Plataforma que Aprende com Criativos Validados
                  </h2>
                  <p className="text-base text-muted-foreground/90 leading-relaxed">
                    A única plataforma que clona seus criativos vencedores criando variações infinitas que mantêm o DNA de sucesso.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Desktop: Full Animated Headlines */
              <motion.div 
                className="space-y-4"
                variants={itemVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                  <motion.span 
                    className="text-white block"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    Pare de Criar Criativos
                  </motion.span>
                  <motion.span 
                    className="text-white block"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    do{" "}
                    <motion.span 
                      className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent drop-shadow-sm"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Zero
                    </motion.span>
                  </motion.span>
                  <motion.span 
                    className="text-white block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  >
                    Clone os Que{" "}
                    <motion.span 
                      className="bg-gradient-to-r from-secondary via-primary to-primary-glow bg-clip-text text-transparent drop-shadow-sm"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3, duration: 0.8, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Converteram
                    </motion.span>
                  </motion.span>
                </h1>

                <motion.div 
                  className="max-w-lg"
                  variants={itemVariants}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-4">
                    Primeira Plataforma que Aprende com Criativos Validados
                  </h2>
                  <p className="text-base text-muted-foreground/80 leading-relaxed">
                    A única plataforma que clona seus criativos vencedores criando variações infinitas que mantêm o DNA de sucesso.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* CTA Button - Enhanced mobile styling and interactions */}
            <motion.div 
              className={`pt-6 ${category?.includes('mobile') ? 'flex justify-center' : ''}`}
              variants={itemVariants}
            >
              <motion.div 
                whileHover={isTouch ? {} : { scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className={category?.includes('mobile') ? 'w-full max-w-sm' : ''}
              >
                <Button 
                  className={`bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    ${isTouch ? 'active:scale-95 active:bg-primary/95' : 'cursor-hover'}
                    ${category?.includes('mobile') ? 'mobile-cta-primary text-sm leading-tight px-6 py-4' : 'px-8 py-4 text-lg'}`}
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Decodificar DNA dos Meus Criativos
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Visual - Creative Analysis Animation */}
          <motion.div 
            className="relative flex items-center justify-center lg:justify-end"
            variants={itemVariants}
          >
            {/* Desktop DNA Animation */}
            {!category?.includes('mobile') && (
              <div 
                className="relative w-full overflow-hidden max-w-2xl h-[600px] lg:h-[700px]"
              >
                <FuturisticDNA />
                
                {/* Desktop: Additional tech overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/10 pointer-events-none" />
                
                {/* Scanning line effect - Desktop only */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-2"
                  animate={{
                    y: [0, 600, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Corner tech elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-secondary/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/40" />
              </div>
            )}
            
            {/* SIMPLIFIED Mobile DNA Preview */}
            {category?.includes('mobile') && (
              <div className="relative w-full max-w-sm mx-auto">
                {/* Simplified Single Card */}
                <div className="bg-gradient-to-b from-gray-900/60 to-black/80 backdrop-blur-sm border border-primary/30 rounded-3xl p-6">
                  
                  {/* Central Hero Element - DNA Visualization Only */}
                  <div className="relative flex flex-col items-center space-y-4">
                    
                    {/* Simplified DNA Helix - Main Focus */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-glow-pulse scale-125"></div>
                      <svg width="64" height="64" viewBox="0 0 64 64" className="relative z-10 text-primary animate-dna-rotate">
                        <defs>
                          <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(142 100% 50%)" />
                            <stop offset="50%" stopColor="hsl(217 100% 65%)" />
                            <stop offset="100%" stopColor="hsl(38 92% 50%)" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M24 12 Q32 20 24 28 Q16 36 24 44 Q32 52 24 60 M40 12 Q32 20 40 28 Q48 36 40 44 Q32 52 40 60 M24 20 L40 20 M24 28 L40 28 M24 36 L40 36 M24 44 L40 44 M24 52 L40 52"
                          stroke="url(#mobileGradient)"
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <circle cx="24" cy="20" r="2.5" fill="hsl(142 100% 50%)" />
                        <circle cx="40" cy="20" r="2.5" fill="hsl(217 100% 65%)" />
                        <circle cx="24" cy="36" r="2.5" fill="hsl(38 92% 50%)" />
                        <circle cx="40" cy="36" r="2.5" fill="hsl(142 100% 50%)" />
                        <circle cx="24" cy="52" r="2.5" fill="hsl(217 100% 65%)" />
                        <circle cx="40" cy="52" r="2.5" fill="hsl(38 92% 50%)" />
                      </svg>
                    </div>
                    
                    {/* Single Key Message */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                        <span className="text-sm font-medium text-primary">Sistema Pronto</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">DNA Criativo Detectado</h3>
                      <p className="text-sm text-muted-foreground">Toque para iniciar replicação</p>
                    </div>
                  </div>
                </div>
                
                {/* Subtle Ambient Effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3 rounded-3xl blur-3xl"></div>
              </div>
            )}
            
            {/* Simplified Additional Interface */}
            {category?.includes('mobile') && (
              <div className="mt-8">
                <MobileDNAInterface 
                  isActive={true}
                  onAnalyze={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default HeroSection;