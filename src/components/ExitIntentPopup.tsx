import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useViewportSize, useIsTouchDevice } from "@/hooks/use-mobile";

const ExitIntentPopup = () => {
  const { category } = useViewportSize();
  const isTouch = useIsTouchDevice();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: ""
  });

  useEffect(() => {
    let hasTriggered = false;
    
    // Check if user has already seen popup in this session
    // For testing: uncomment the line below to reset exit intent
    // sessionStorage.removeItem('exitIntentShown');
    
    if (sessionStorage.getItem('exitIntentShown')) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top (desktop only)
      if (e.clientY <= 0 && !hasTriggered && !category?.includes('mobile')) {
        hasTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // End of site trigger - when user reaches the bottom area
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Trigger when user is near the end of the page (85% scrolled)
      const scrollPercent = (scrollTop + windowHeight) / documentHeight;
      
      if (scrollPercent >= 0.85 && !hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Time-based trigger - appears after user spends time on site
    const timeDelay = category?.includes('mobile') ? 30000 : 45000; // 30s mobile, 45s desktop
    const timeoutTrigger = setTimeout(() => {
      if (!hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    }, timeDelay);

    // Only add mouse leave on desktop
    if (!category?.includes('mobile')) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (!category?.includes('mobile')) {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutTrigger);
    };
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track popup conversion
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/POPUP_CONVERSION',
        'event_category': 'popup_engagement',
        'event_label': 'lead_magnet_download',
        'value': 1
      });
    }

    try {
      // Save to database via API
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Lead Magnet - Exit Intent Popup',
          message: 'Usuário interessado em receber o guia gratuito sobre criativos vencedores',
          priority: 'normal',
          source: 'exit_intent_popup'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting exit intent form:', error);
      // Still show success to user to avoid frustration
      setIsSubmitted(true);
    }
    
    // Close popup after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full mx-auto
              ${category === 'mobile-small' ? 'max-w-sm px-3' : 
                category === 'mobile-medium' || category === 'mobile-large' ? 'max-w-md px-4' :
                'max-w-lg px-4'}`}
          >
            <div className={`glass-card relative overflow-hidden ${
              category === 'mobile-small' ? 'p-4' :
              category === 'mobile-medium' || category === 'mobile-large' ? 'p-6' :
              'p-8'
            }`}>
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center rounded-full bg-primary/20 border border-primary/30 mb-3 ${
                      category === 'mobile-small' ? 'w-12 h-12' : 'w-16 h-16'
                    }`}>
                      <Gift className={`text-primary ${
                        category === 'mobile-small' ? 'w-6 h-6' : 'w-8 h-8'
                      }`} />
                    </div>
                    
                    <h3 className={`font-bold text-foreground mb-2 ${
                      category === 'mobile-small' ? 'text-lg' : 'text-xl'
                    }`}>
                      🚀 Análise GRATUITA dos Seus Criativos
                    </h3>
                    
                    <p className={`text-muted-foreground ${
                      category === 'mobile-small' ? 'text-sm' : 'text-base'
                    }`}>
                      Descubra o DNA dos seus criativos vencedores antes de sair.
                    </p>
                  </div>

                  {/* Benefits - Reduced for mobile */}
                  <div className="space-y-2 mb-6">
                    {[
                      "🧬 Análise do DNA dos seus criativos",
                      "📊 Report com padrões de sucesso", 
                      "🎯 Estratégias personalizadas"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <span className={`text-foreground ${
                          category === 'mobile-small' ? 'text-xs' : 'text-sm'
                        }`}>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className={`${
                    category === 'mobile-small' ? 'space-y-3' : 'space-y-4'
                  }`}>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`bg-background border-border focus:border-primary ${
                        category === 'mobile-small' ? 'h-10 text-sm' : 'h-12'
                      }`}
                      required
                    />
                    
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email (para enviar a análise)"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`bg-background border-border focus:border-primary ${
                        category === 'mobile-small' ? 'h-10 text-sm' : 'h-12'
                      }`}
                      required
                    />
                    
                    <Input
                      type="text"
                      name="company"
                      placeholder="Empresa/Nicho"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`bg-background border-border focus:border-primary ${
                        category === 'mobile-small' ? 'h-10 text-sm' : 'h-12'
                      }`}
                      required
                    />

                    <Button
                      type="submit"
                      className={`w-full btn-primary font-semibold group ${
                        category === 'mobile-small' ? 'h-10 text-sm' : 'h-12 text-base'
                      }`}
                    >
                      {category === 'mobile-small' ? 'QUERO MINHA ANÁLISE GRÁTIS' : 'QUERO REVOLUCIONAR MEUS CRIATIVOS AGORA'}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </form>

                  {/* Trust Elements - Simplified */}
                  <div className={`pt-3 border-t border-border/30 ${
                    category === 'mobile-small' ? 'mt-4' : 'mt-6'
                  }`}>
                    <div className="text-center">
                      <p className={`text-primary font-semibold ${
                        category === 'mobile-small' ? 'text-xs' : 'text-sm'
                      }`}>
                        ⚡ Resposta em 2h • 🔒 100% Seguro
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    🚀 Sua Análise Está a Caminho!
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    Nossa equipe vai analisar seus criativos e enviar um relatório completo em até 2 horas para: <strong className="text-primary">{formData.email}</strong>
                  </p>
                  
                  <p className="text-sm text-muted-foreground">
                    Em breve você terá o DNA dos seus criativos vencedores decodificado! 🧬
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;