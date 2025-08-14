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
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">BETA</span>
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
                    A única plataforma que transforma seus criativos vencedores em máquina infinita de variações.
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
                    A única plataforma que transforma seus criativos vencedores em máquina infinita de variações.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* CTA Button - Simplified mobile */}
            <motion.div 
              className="pt-6"
              variants={itemVariants}
            >
              <motion.div 
                whileHover={isTouch ? {} : { scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className={`bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 touch-target
                    ${isTouch ? 'active:scale-95' : 'cursor-hover'}
                    ${category?.includes('mobile') ? 'px-8 py-4 text-base w-full max-w-xs mx-auto' : 'px-8 py-4 text-lg'}`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {category?.includes('mobile') ? 'Decodificar DNA dos Meus Criativos' : 'Decodificar DNA dos Meus Criativos'}
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Mobile Creative Analysis - After CTA */}
            {category?.includes('mobile') && (
              <motion.div 
                className="pt-8"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center relative">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl" />
                  
                  {/* Main creative analysis container */}
                  <div className="relative w-64 h-64 rounded-2xl bg-gradient-to-br from-card/30 to-card/10 border border-primary/30 flex flex-col items-center justify-center backdrop-blur-sm p-6">
                    {/* Creative Analysis Header */}
                    <div className="text-center mb-4">
                      <div className="text-3xl mb-2">🎨</div>
                      <div className="text-primary font-bold text-sm">Análise Criativa</div>
                      <div className="text-secondary text-xs opacity-80">DNA Engine</div>
                    </div>
                    
                    {/* Mock Creative Elements */}
                    <div className="w-full space-y-2">
                      {/* Creative Element 1 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10">
                        <span className="text-xs text-muted-foreground">Hook Principal</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
                        </div>
                      </div>
                      
                      {/* Creative Element 2 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/10">
                        <span className="text-xs text-muted-foreground">CTA Conversão</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.1s'}} />
                          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.3s'}} />
                          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                        </div>
                      </div>
                      
                      {/* Creative Element 3 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-accent/10">
                        <span className="text-xs text-muted-foreground">Visual Impact</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.6s'}} />
                        </div>
                      </div>
                    </div>
                    
                    {/* DNA Analysis Status */}
                    <div className="mt-4 text-center">
                      <div className="text-xs text-primary font-medium">Analisando DNA...</div>
                      <div className="w-16 h-1 bg-background/30 rounded-full mt-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                      </div>
                    </div>
                    
                    {/* Corner tech indicators */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/50" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-secondary/50" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-accent/50" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/50" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Visual - Creative Analysis Animation */}
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
              
              {/* Desktop: Keep original FuturisticDNA */}
              {!category?.includes('mobile') && <FuturisticDNA />}
              
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