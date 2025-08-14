import { useState, useEffect } from "react";
import { Home, AlertTriangle, Zap, MessageSquare, ArrowUp } from "lucide-react";
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
    { id: 'hero', icon: Home, label: 'Início' },
    { id: 'problem', icon: AlertTriangle, label: 'Problema' },
    { id: 'solution', icon: Zap, label: 'Solução' },
    { id: 'contact', icon: MessageSquare, label: 'Demo' }
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <motion.div 
          className="bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-3 shadow-lg"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          {/* Swipe indicator */}
          <div className="flex justify-center mb-2">
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
          </div>
          
          <div className="flex items-center justify-around max-w-sm mx-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200 min-w-[70px] min-h-[60px] active:scale-95 ${
                  activeSection === item.id 
                    ? 'text-primary bg-primary/20 shadow-md' 
                    : 'text-muted-foreground hover:text-foreground active:bg-muted/30'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'drop-shadow-sm' : ''}`} />
                <span className={`text-xs font-medium ${activeSection === item.id ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/30"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
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
            className="fixed bottom-24 right-4 z-40 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileBottomNav;