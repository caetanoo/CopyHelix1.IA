import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import FuturisticDNA from "@/components/FuturisticDNA";
import DNATransition from "@/components/DNATransition";
import MobileDNAVisualization from "@/components/MobileDNAVisualization";
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
        staggerChildren: category === 'mobile-small' ? 0.08 : 0.12,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
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
            
            {/* Mobile: Integrated DNA Analysis Experience */}
            {category?.includes('mobile') && (
              <div className="w-full relative mt-6">
                {/* Mobile Hero DNA Footer - Replaces empty space */}
                <div className="relative overflow-hidden">
                  {/* Enhanced DNA Analysis Preview Cards */}
                  <motion.div 
                    className="flex justify-center space-x-3 px-4 mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {/* Enhanced DNA Card */}
                    <motion.div 
                      className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 backdrop-blur-lg border border-primary/30 rounded-2xl p-4 w-32 h-24 flex flex-col items-center justify-center shadow-lg"
                      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Animated background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl"
                        animate={{ 
                          opacity: [0.3, 0.7, 0.3],
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      {/* DNA Icon with better animation */}
                      <motion.div 
                        className="relative z-10 w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full mb-2 flex items-center justify-center"
                        animate={{ 
                          rotate: [0, 180, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="w-3 h-3 bg-white/90 rounded-full" />
                      </motion.div>
                      <span className="relative z-10 text-xs font-bold text-primary tracking-wider drop-shadow-sm">DNA</span>
                    </motion.div>
                    
                    {/* Enhanced Analysis Card */}
                    <motion.div 
                      className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-secondary/10 to-secondary/5 backdrop-blur-lg border border-secondary/30 rounded-2xl p-4 w-32 h-24 flex flex-col items-center justify-center shadow-lg"
                      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Scanning line effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent h-1"
                        animate={{ y: [-20, 80, -20] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Analysis Icon */}
                      <motion.div 
                        className="relative z-10 w-8 h-8 bg-gradient-to-br from-secondary to-secondary-glow rounded-lg mb-2 flex items-center justify-center"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            '0 0 10px hsl(217 100% 65% / 0.4)',
                            '0 0 20px hsl(217 100% 65% / 0.8)', 
                            '0 0 10px hsl(217 100% 65% / 0.4)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="w-2 h-2 bg-white/90 rounded-full" />
                        <div className="w-2 h-2 bg-white/70 rounded-full ml-0.5" />
                      </motion.div>
                      <span className="relative z-10 text-xs font-bold text-secondary tracking-wider drop-shadow-sm">ANÁLISE</span>
                    </motion.div>
                    
                    {/* Enhanced Clone Card */}
                    <motion.div 
                      className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 backdrop-blur-lg border border-accent/30 rounded-2xl p-4 w-32 h-24 flex flex-col items-center justify-center shadow-lg"
                      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Particle effect */}
                      <motion.div 
                        className="absolute top-2 left-3 w-1 h-1 bg-accent/60 rounded-full"
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.2, 0.5],
                          x: [0, 15, 30],
                          y: [0, -8, -16]
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <motion.div 
                        className="absolute bottom-3 right-4 w-1 h-1 bg-accent/60 rounded-full"
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.2, 0.5],
                          x: [0, -10, -20],
                          y: [0, 5, 10]
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                      />
                      {/* Clone Icon */}
                      <motion.div 
                        className="relative z-10 w-8 h-8 bg-gradient-to-br from-accent to-orange-400 rounded-xl mb-2 flex items-center justify-center"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="flex space-x-0.5">
                          <div className="w-1.5 h-1.5 bg-white/90 rounded-full" />
                          <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                        </div>
                      </motion.div>
                      <span className="relative z-10 text-xs font-bold text-accent tracking-wider drop-shadow-sm">CLONE</span>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Interactive DNA Visualization */}
                  <MobileDNAVisualization className="mx-4" />

                  {/* Unified Success Metrics Card */}
                  <motion.div 
                    className="mx-4 mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {/* Main Metrics Container */}
                    <motion.div 
                      className="relative overflow-hidden bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-xl border border-primary/20 rounded-3xl p-5 shadow-2xl"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
                      whileHover={{ scale: 1.02, boxShadow: "0 25px 50px hsl(var(--primary) / 0.15)" }}
                    >
                      {/* Animated background effects */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl"
                        animate={{ 
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Floating particles effect */}
                      <motion.div 
                        className="absolute top-4 right-6 w-2 h-2 bg-primary/40 rounded-full"
                        animate={{ 
                          y: [0, -10, 0],
                          opacity: [0.4, 0.8, 0.4],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.div 
                        className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-secondary/40 rounded-full"
                        animate={{ 
                          x: [0, 8, 0],
                          opacity: [0.3, 0.7, 0.3],
                          scale: [0.9, 1.1, 0.9]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1.2 }}
                      />
                      
                      {/* Header */}
                      <div className="relative z-10 text-center mb-4">
                        <motion.h3 
                          className="text-sm font-bold text-white/90 mb-1 tracking-wider"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.4 }}
                        >
                          RESULTADOS COMPROVADOS
                        </motion.h3>
                        <motion.div 
                          className="w-12 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto"
                          initial={{ width: 0 }}
                          animate={{ width: 48 }}
                          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      
                      {/* Metrics Grid - Optimized Proportional Layout */}
                      <div className="relative z-10 grid grid-cols-3 gap-3 px-1">
                        {/* ROI Metric */}
                        <motion.div 
                          className="text-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                        >
                          <motion.div 
                            className="text-lg sm:text-xl font-black bg-gradient-to-br from-primary via-primary-glow to-primary/80 bg-clip-text text-transparent mb-0.5 leading-none"
                            animate={{ 
                              scale: [1, 1.03, 1],
                              filter: [
                                'drop-shadow(0 0 6px hsl(142 100% 50% / 0.3))',
                                'drop-shadow(0 0 12px hsl(142 100% 50% / 0.5))',
                                'drop-shadow(0 0 6px hsl(142 100% 50% / 0.3))'
                              ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                          >
                            +247%
                          </motion.div>
                          <div className="text-[10px] text-primary/70 font-semibold uppercase tracking-wide leading-tight">
                            ROI Médio
                          </div>
                        </motion.div>
                        
                        {/* Precision Metric */}
                        <motion.div 
                          className="text-center border-x border-white/10"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0, duration: 0.5 }}
                        >
                          <motion.div 
                            className="text-lg sm:text-xl font-black bg-gradient-to-br from-secondary via-secondary-glow to-secondary/80 bg-clip-text text-transparent mb-0.5 leading-none"
                            animate={{ 
                              scale: [1, 1.03, 1],
                              filter: [
                                'drop-shadow(0 0 6px hsl(217 100% 65% / 0.3))',
                                'drop-shadow(0 0 12px hsl(217 100% 65% / 0.5))',
                                'drop-shadow(0 0 6px hsl(217 100% 65% / 0.3))'
                              ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1.3 }}
                          >
                            87%
                          </motion.div>
                          <div className="text-[10px] text-secondary/70 font-semibold uppercase tracking-wide leading-tight">
                            Precisão
                          </div>
                        </motion.div>
                        
                        {/* Conversion Metric */}
                        <motion.div 
                          className="text-center"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1, duration: 0.5 }}
                        >
                          <motion.div 
                            className="text-lg sm:text-xl font-black bg-gradient-to-br from-accent via-orange-400 to-accent/80 bg-clip-text text-transparent mb-0.5 leading-none"
                            animate={{ 
                              scale: [1, 1.03, 1],
                              filter: [
                                'drop-shadow(0 0 6px hsl(38 92% 50% / 0.3))',
                                'drop-shadow(0 0 12px hsl(38 92% 50% / 0.5))',
                                'drop-shadow(0 0 6px hsl(38 92% 50% / 0.3))'
                              ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 2.6 }}
                          >
                            2.4x
                          </motion.div>
                          <div className="text-[10px] text-accent/70 font-semibold uppercase tracking-wide leading-tight">
                            Conversão
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Bottom accent line */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                      />
                      
                      {/* Corner accent elements */}
                      <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-primary/30 rounded-tl-lg" />
                      <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-accent/30 rounded-br-lg" />
                    </motion.div>
                    
                    {/* Supporting text */}
                    <motion.p 
                      className="text-center text-xs text-muted-foreground/70 mt-4 px-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                    >
                      *Baseado em análise de +10.000 criativos validados
                    </motion.p>
                  </motion.div>

                  {/* Interactive Scroll Indicator */}
                  <motion.div 
                    className="flex flex-col items-center mt-6 pb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <motion.div 
                      className="text-xs text-muted-foreground mb-2 text-center px-4"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Descubra como funciona
                    </motion.div>
                    <motion.div 
                      className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        const nextSection = document.querySelector('main > section:nth-child(2)');
                        nextSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <motion.div 
                        className="w-1 h-3 bg-primary/50 rounded-full mt-2"
                        animate={{ 
                          y: [0, 8, 0],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Visual Transition to Next Section */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background/20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default HeroSection;