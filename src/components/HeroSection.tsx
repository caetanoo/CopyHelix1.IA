import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import FuturisticDNA from "./FuturisticDNA";
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
          <div className={`lg:pr-8 ${
            category?.includes('mobile') 
              ? 'space-y-6 px-2' 
              : 'space-y-8'
          }`}>
            
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
                className="space-y-5 text-center"
                variants={itemVariants}
              >
                <h1 className={`font-bold leading-tight ${
                  category === 'mobile-small' 
                    ? 'text-2xl px-3 leading-[1.25]' 
                    : 'text-3xl sm:text-4xl px-4 leading-[1.2]'
                }`}>
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
                
                <div className={`mx-auto ${
                  category === 'mobile-small' 
                    ? 'space-y-4 max-w-xs px-2' 
                    : 'space-y-5 max-w-md'
                }`}>
                  <h2 className={`font-bold text-primary ${
                    category === 'mobile-small' 
                      ? 'text-base leading-snug px-1' 
                      : 'text-lg leading-relaxed'
                  }`}>
                    Primeira Plataforma que Aprende com Criativos Validados
                  </h2>
                  <p className={`text-muted-foreground/90 ${
                    category === 'mobile-small' 
                      ? 'text-sm leading-relaxed px-1' 
                      : 'text-base leading-relaxed'
                  }`}>
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
              className={`${category?.includes('mobile') ? 'flex justify-center pt-6' : 'pt-6'}`}
              variants={itemVariants}
            >
              <motion.div 
                whileHover={isTouch ? {} : { scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className={category?.includes('mobile') ? 'w-full max-w-sm px-2' : ''}
              >
                <Button 
                  className={`bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    ${isTouch ? 'active:scale-95 active:bg-primary/95' : 'cursor-hover'}
                    ${category === 'mobile-small' 
                      ? 'mobile-cta-primary text-sm leading-tight px-4 py-3.5 min-h-[52px]' 
                      : category?.includes('mobile') 
                        ? 'mobile-cta-primary text-sm leading-tight px-6 py-4 min-h-[52px]' 
                        : 'px-8 py-4 text-lg'
                    }`}
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
            
            {/* Mobile DNA Interface - Two Cards Layout */}
            {category?.includes('mobile') && (
              <div className="w-full space-y-4 px-4">
                {/* Left Card - Sistema Pronto */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-md border border-primary/30 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                    <span className="text-sm font-medium text-primary">Sistema Pronto</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* DNA Animation Left */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-glow-pulse scale-110"></div>
                      <svg width="40" height="40" viewBox="0 0 40 40" className="relative z-10 text-primary animate-dna-rotate">
                        <defs>
                          <linearGradient id="leftCardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(142 100% 50%)" />
                            <stop offset="50%" stopColor="hsl(217 100% 65%)" />
                            <stop offset="100%" stopColor="hsl(38 92% 50%)" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 6 Q20 14 12 22 Q4 30 12 38 M28 6 Q20 14 28 22 Q36 30 28 38 M12 14 L28 14 M12 22 L28 22 M12 30 L28 30"
                          stroke="url(#leftCardGradient)"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="14" r="1.5" fill="hsl(142 100% 50%)" />
                        <circle cx="28" cy="14" r="1.5" fill="hsl(217 100% 65%)" />
                        <circle cx="12" cy="22" r="1.5" fill="hsl(38 92% 50%)" />
                        <circle cx="28" cy="22" r="1.5" fill="hsl(142 100% 50%)" />
                        <circle cx="12" cy="30" r="1.5" fill="hsl(217 100% 65%)" />
                        <circle cx="28" cy="30" r="1.5" fill="hsl(38 92% 50%)" />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white mb-1">DNA Criativo Detectado</div>
                      <button className="text-xs text-primary hover:text-primary-glow transition-colors">
                        Toque para iniciar replicação
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Right Card - DNA Analysis Result */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-md border border-secondary/30 rounded-2xl p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full animate-ping"></div>
                      <span className="text-sm font-medium text-secondary">DNA Criativo Detectado</span>
                    </div>
                    
                    {/* DNA Animation Right */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-lg animate-glow-pulse scale-110"></div>
                      <svg width="30" height="30" viewBox="0 0 30 30" className="relative z-10 text-secondary animate-dna-rotate">
                        <defs>
                          <linearGradient id="rightCardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(217 100% 65%)" />
                            <stop offset="50%" stopColor="hsl(38 92% 50%)" />
                            <stop offset="100%" stopColor="hsl(142 100% 50%)" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M9 4 Q15 10 9 16 Q3 22 9 28 M21 4 Q15 10 21 16 Q27 22 21 28 M9 10 L21 10 M9 16 L21 16 M9 22 L21 22"
                          stroke="url(#rightCardGradient)"
                          strokeWidth="1.2"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <circle cx="9" cy="10" r="1" fill="hsl(217 100% 65%)" />
                        <circle cx="21" cy="10" r="1" fill="hsl(38 92% 50%)" />
                        <circle cx="9" cy="16" r="1" fill="hsl(142 100% 50%)" />
                        <circle cx="21" cy="16" r="1" fill="hsl(217 100% 65%)" />
                        <circle cx="9" cy="22" r="1" fill="hsl(38 92% 50%)" />
                        <circle cx="21" cy="22" r="1" fill="hsl(142 100% 50%)" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Main Score */}
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-white">94%</div>
                    <div className="text-sm text-muted-foreground">Pronto para replicar</div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                      <motion.div 
                        className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.7 }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      <Sparkles className="w-3 h-3 text-secondary" />
                      <span className="text-xs text-secondary font-medium">Alta precisão</span>
                    </div>
                  </div>
                  
                  {/* Details Button */}
                  <button className="w-full text-xs text-muted-foreground hover:text-secondary transition-colors py-2 border-t border-gray-700/50">
                    Ver detalhes da análise
                  </button>
                </motion.div>
                
                {/* Central CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex justify-center pt-4"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-gradient-to-r from-primary to-primary-glow text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>Replicar Este DNA</span>
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default HeroSection;