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
      
      {/* Animated Glowing orbs for depth */}
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
              data-aos="fade-right"
              data-aos-delay="100"
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
              data-aos="fade-up"
              data-aos-delay="200"
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
                  Ferramenta IA para
                </motion.span>
                <motion.span 
                  className="text-white block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Criar{" "}
                  <motion.span 
                    className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent drop-shadow-sm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Criativos
                  </motion.span>
                </motion.span>
                <motion.span 
                  className="text-white block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  que{" "}
                  <motion.span 
                    className="bg-gradient-to-r from-secondary via-primary to-primary-glow bg-clip-text text-transparent drop-shadow-sm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.8, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Convertem
                  </motion.span>
                </motion.span>
              </h1>
            </motion.div>

            {/* Main Value Proposition - Mobile-optimized */}
            <motion.div 
              className={category === 'mobile-small' ? 'max-w-full' : 'max-w-lg'}
              variants={itemVariants}
              data-aos="fade-up"
              data-aos-delay="350"
            >
              <h2 className={`font-bold text-primary leading-tight mb-4
                ${category === 'mobile-small' ? 'text-lg' : 
                  category === 'mobile-medium' ? 'text-xl' :
                  category === 'mobile-large' ? 'text-xl' :
                  'text-2xl md:text-3xl'}`}>
                Decodifique o DNA dos Criativos Vencedores com IA
              </h2>
              <p className={`text-muted-foreground/80 leading-relaxed
                ${category === 'mobile-small' ? 'text-sm' : 'text-base'}`}>
                Crie templates para infoprodutos e replique automaticamente os elementos que mais convertem. Ideal para infoprodutores brasileiros.
              </p>
            </motion.div>

            {/* CTA Button - Mobile-optimized */}
            <motion.div 
              className={category === 'mobile-small' ? 'pt-4' : 'pt-6'}
              variants={itemVariants}
              data-aos="fade-up"
              data-aos-delay="500"
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
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <motion.div 
              className={`relative w-full overflow-hidden
                ${category === 'mobile-small' ? 'h-[500px] max-w-sm mx-auto' :
                  category === 'mobile-medium' ? 'h-[550px] max-w-md mx-auto' :
                  category === 'mobile-large' ? 'h-[600px] max-w-lg mx-auto' :
                  'max-w-2xl h-[600px] lg:h-[700px]'}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Futuristic DNA Component */}
              <FuturisticDNA />
              
              {/* Additional tech overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/10 pointer-events-none" />
              
              {/* Scanning line effect */}
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
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;