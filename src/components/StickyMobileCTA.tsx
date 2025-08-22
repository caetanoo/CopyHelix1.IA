import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Dna, Target } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { trackCTAClick } from "@/lib/analytics-tracking";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ctaText, setCTAText] = useState("Ver Como Funciona");
  const [ctaIcon, setCTAIcon] = useState(ArrowRight);
  const { category } = useViewportSize();

  useEffect(() => {
    // Check for modals
    const checkForModals = () => {
      const hasModal = document.querySelector('[role="dialog"]') !== null;
      setIsModalOpen(hasModal);
    };

    // Initial check
    checkForModals();

    // Watch for DOM changes
    const observer = new MutationObserver(checkForModals);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

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
      
      // Update CTA text and icon based on scroll position - DNA themed
      if (scrollPercent < 0.2) {
        setCTAText("Iniciar Análise DNA");
        setCTAIcon(Dna);
      } else if (scrollPercent < 0.4) {
        setCTAText("Decodificar Criativos");
        setCTAIcon(Target);
      } else if (scrollPercent < 0.6) {
        setCTAText("Ver DNA em Ação");
        setCTAIcon(Zap);
      } else {
        setCTAText("Analisar Meus Criativos");
        setCTAIcon(ArrowRight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    // Track CTA click event
    trackCTAClick({
      button_text: ctaText,
      position: 'sticky_mobile',
      destination: 'contact_form',
      device_type: 'mobile'
    });
    
    const demoSection = document.getElementById('contact');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!category?.includes('mobile') || isModalOpen) return null;

  const IconComponent = ctaIcon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-4 right-4 z-60"
          style={{
            bottom: '24px',
            background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.9) 50%, transparent 100%)',
            paddingTop: '2rem'
          }}
        >
          {/* Visual separator to improve hierarchy */}
          <div className="absolute -bottom-6 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary/10 rounded-full" />
          <Button
            onClick={handleCTAClick}
            className="relative w-full py-4 px-6 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-black shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group overflow-hidden min-h-[56px] touch-manipulation"
            aria-label={`${ctaText} - Navegar para seção de contato`}
          >
            {/* DNA particle animation background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-4 w-1 h-1 bg-black/30 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-3 right-6 w-1 h-1 bg-black/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-2 left-8 w-1 h-1 bg-black/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-3 right-4 w-1 h-1 bg-black/30 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
            </div>
            <motion.span 
              className="relative z-10 flex items-center justify-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={ctaText}
            >
              <span className="font-bold">{ctaText}</span>
              <motion.div
                animate={{ rotate: ctaIcon === Dna ? 360 : 0 }}
                transition={{ duration: 2, repeat: ctaIcon === Dna ? Infinity : 0, ease: "linear" }}
              >
                <IconComponent className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-200" />
              </motion.div>
            </motion.span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;