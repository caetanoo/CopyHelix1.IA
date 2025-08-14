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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
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
            
            {/* Beta Badge - positioned above headline, icon hidden on mobile */}
            <motion.div 
              className="inline-flex"
              variants={itemVariants}
            >
              <motion.div 
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                whileHover={!isTouch ? { scale: 1.05, boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" } : {}}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hide icon on mobile, show on desktop */}
                {!category?.includes('mobile') && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  </motion.div>
                )}
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">BETA</span>
              </motion.div>
            </motion.div>

            {/* Main Headline - Mobile-optimized typography */}
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h1 className={`font-bold tracking-tight
                ${category === 'mobile-small' ? 'text-3xl leading-[1.2]' : 
                  category === 'mobile-medium' ? 'text-4xl leading-[1.15]' :
                  category === 'mobile-large' ? 'text-5xl leading-[1.1]' :
                  'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]'}`}>
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
            </motion.div>

            {/* Main Value Proposition - Mobile-optimized */}
            <motion.div 
              className={category === 'mobile-small' ? 'max-w-full' : 'max-w-lg'}
              variants={itemVariants}
            >
              <h2 className={`font-bold text-primary leading-tight mb-4
                ${category === 'mobile-small' ? 'text-lg' : 
                  category === 'mobile-medium' ? 'text-xl' :
                  category === 'mobile-large' ? 'text-xl' :
                  'text-xl md:text-2xl'}`}>
                Primeira Plataforma que Aprende com Criativos Validados
              </h2>
              <p className={`text-muted-foreground/80 leading-relaxed
                ${category === 'mobile-small' ? 'text-sm' : 'text-base'}`}>
                A única plataforma que transforma seus criativos vencedores em máquina infinita de variações.
              </p>
            </motion.div>

            {/* CTA Button - Mobile-optimized */}
            <motion.div 
              className={category === 'mobile-small' ? 'pt-4' : 'pt-6'}
              variants={itemVariants}
            >
              <motion.div 
                whileHover={isTouch ? {} : { scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className={`bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 touch-target
                    ${isTouch ? 'active:scale-95' : 'cursor-hover'}
                    ${category === 'mobile-small' ? 'px-6 py-3 text-base w-full' : 
                      category === 'mobile-medium' || category === 'mobile-large' ? 'px-7 py-3.5 text-base w-full sm:w-auto' :
                      'px-8 py-4 text-lg'}`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {category === 'mobile-small' ? 'Criar Criativos com IA' : 'Decodificar DNA dos Meus Criativos'}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Visual - Futuristic DNA Animation */}
          <motion.div 
            className="relative flex items-center justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div 
              className={`relative w-full overflow-hidden
                ${category === 'mobile-small' ? 'h-[400px] max-w-sm mx-auto' :
                  category === 'mobile-medium' ? 'h-[450px] max-w-md mx-auto' :
                  category === 'mobile-large' ? 'h-[500px] max-w-lg mx-auto' :
                  'max-w-2xl h-[600px] lg:h-[700px]'}`}
            >
              {/* Futuristic DNA Component - Desktop only for performance */}
              {!category?.includes('mobile') && <FuturisticDNA />}
              
              {/* Mobile: Enhanced visual with light animations */}
              {category?.includes('mobile') && (
                <div className="flex items-center justify-center h-full relative">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl" />
                  
                  {/* Main visual container */}
                  <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 border border-primary/40 flex items-center justify-center backdrop-blur-sm">
                    {/* Inner circle with animated border */}
                    <div className="w-48 h-48 rounded-full border-2 border-primary/30 bg-gradient-to-br from-background/20 to-background/10 flex items-center justify-center relative">
                      {/* DNA Helix visual */}
                      <div className="text-center relative z-10">
                        <div className="text-5xl mb-3 animate-pulse">🧬</div>
                        <div className="text-primary font-bold text-lg">DNA Engine</div>
                        <div className="text-secondary text-sm opacity-80">Powered by AI</div>
                      </div>
                      
                      {/* Rotating elements */}
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                        <div className="absolute top-2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2" />
                        <div className="absolute bottom-2 left-1/2 w-2 h-2 bg-secondary rounded-full transform -translate-x-1/2" />
                        <div className="absolute left-2 top-1/2 w-2 h-2 bg-accent rounded-full transform -translate-y-1/2" />
                        <div className="absolute right-2 top-1/2 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2" />
                      </div>
                    </div>
                    
                    {/* Corner indicators */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary/50 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-secondary/50 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-accent/50 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary/50 rounded-br-lg" />
                  </div>
                </div>
              )}
              
              {/* Desktop: Additional tech overlay effects */}
              {!category?.includes('mobile') && (
                <>
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
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;