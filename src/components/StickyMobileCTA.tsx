import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ctaText, setCTAText] = useState("Ver Como Funciona");
  const [ctaIcon, setCTAIcon] = useState(ArrowRight);
  const { category } = useViewportSize();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Get section positions
      const heroSection = document.querySelector('section');
      const demoSection = document.getElementById('contact');
      
      if (!heroSection || !demoSection) return;
      
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const demoTop = demoSection.offsetTop;
      const scrollPercent = scrollY / (docHeight - windowHeight);
      
      // Show CTA after hero section, hide when demo section is visible
      const shouldShow = scrollY > heroBottom && scrollY < demoTop - 100;
      setIsVisible(shouldShow);
      
      // Update CTA text and icon based on scroll position
      if (scrollPercent < 0.2) {
        setCTAText("Ver Como Funciona");
        setCTAIcon(ArrowRight);
      } else if (scrollPercent < 0.4) {
        setCTAText("Conhecer a Solução");
        setCTAIcon(Zap);
      } else if (scrollPercent < 0.6) {
        setCTAText("Ver Demonstração");
        setCTAIcon(Zap);
      } else {
        setCTAText("Solicitar Demo Grátis");
        setCTAIcon(ArrowRight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    const demoSection = document.getElementById('contact');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!category?.includes('mobile')) return null;

  const IconComponent = ctaIcon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-16 left-4 right-4 z-40"
          style={{
            background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.9) 50%, transparent 100%)',
            paddingTop: '2rem'
          }}
        >
          <Button
            onClick={handleCTAClick}
            className="w-full py-4 text-base font-semibold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <motion.span 
              className="flex items-center justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={ctaText}
            >
              <span>{ctaText}</span>
              <IconComponent className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;