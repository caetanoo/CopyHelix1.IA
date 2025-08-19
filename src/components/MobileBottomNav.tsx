import { useState, useEffect } from "react";
import { Home, AlertTriangle, Zap, MessageSquare, ArrowUp, Dna } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const MobileBottomNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { category } = useViewportSize();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show scroll to top button when user scrolled down significantly
      setShowScrollTop(scrollY > windowHeight);
      
      // Determine active section based on scroll position
      const sections = ['hero', 'problem', 'solution', 'contact'];
      let currentSection = 'hero';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId === 'hero' ? '' : sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId === 'hero' ? '' : sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Add haptic feedback for Brazilian mobile users
      if (navigator.vibrate && category?.includes('mobile')) {
        navigator.vibrate(50);
      }
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (navigator.vibrate && category?.includes('mobile')) {
        navigator.vibrate(50);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!category?.includes('mobile')) return null;

  const navItems = [
    { id: 'hero', icon: Home, label: 'DNA Lab', glow: 'primary' },
    { id: 'problem', icon: AlertTriangle, label: 'Diagnóstico', glow: 'destructive' },
    { id: 'solution', icon: Dna, label: 'Decodificar', glow: 'secondary' },
    { id: 'contact', icon: MessageSquare, label: 'Analisar', glow: 'accent' }
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <motion.div 
          className="bg-gradient-to-t from-background/98 via-background/95 to-background/90 backdrop-blur-xl border-t border-primary/20 px-4 py-3 pb-safe shadow-2xl shadow-primary/10"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          {/* Swipe indicator */}
          <div className="flex justify-center mb-2">
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
          </div>
          
          <div className="flex items-center justify-around max-w-sm mx-auto">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const glowClass = {
                'primary': 'text-primary bg-primary/20 shadow-lg shadow-primary/25',
                'destructive': 'text-destructive bg-destructive/20 shadow-lg shadow-destructive/25', 
                'secondary': 'text-secondary bg-secondary/20 shadow-lg shadow-secondary/25',
                'accent': 'text-accent bg-accent/20 shadow-lg shadow-accent/25'
              };
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 min-w-[70px] min-h-[60px] active:scale-95 touch-manipulation ${
                    isActive 
                      ? glowClass[item.glow] + ' transform scale-105'
                      : 'text-muted-foreground hover:text-foreground active:bg-muted/30 hover:scale-102'
                  }`}
                  aria-label={`Navegar para ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className={`relative ${
                    isActive ? 'animate-glow-pulse' : ''
                  }`}>
                    <item.icon className={`w-5 h-5 ${isActive ? 'filter drop-shadow-sm' : ''}`} />
                    {isActive && (
                      <div className={`absolute inset-0 -m-1 rounded-full blur-sm opacity-50 bg-${item.glow}`}></div>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                  
                  {/* DNA-themed Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute inset-0 bg-${item.glow}/10 rounded-xl border border-${item.glow}/30`}
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* DNA Particle Effect for Active Item */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1">
                      <div className={`w-2 h-2 rounded-full bg-${item.glow} animate-ping`}></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed right-4 z-45 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{ 
              bottom: 'calc(env(safe-area-inset-bottom, 0px) + 104px)'
            }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileBottomNav;