import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CookieConsentProps {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onCustomize?: () => void;
}

const CookieConsent = ({ onAcceptAll, onRejectAll, onCustomize }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be changed
    functional: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookieConsent');
    
    // For testing: uncomment the line below to reset cookie consent
    // localStorage.removeItem('cookieConsent');
    
    if (!hasConsent) {
      let hasTriggered = false;
      
      const handleScroll = () => {
        // Trigger when reaching "Laboratório Genético ao Vivo" section (contact)
        const contactSection = document.getElementById('contact');
        if (contactSection && !hasTriggered) {
          const rect = contactSection.getBoundingClientRect();
          const triggerPoint = window.innerHeight * 0.8; // Trigger when 80% of section is visible
          
          if (rect.top <= triggerPoint) {
            hasTriggered = true;
            setIsVisible(true);
          }
        }
      };

      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Fallback timer (5 seconds for testing - will show cookie consent quickly)
      const fallbackTimer = setTimeout(() => {
        if (!hasTriggered) {
          hasTriggered = true;
          setIsVisible(true);
        }
      }, 5000);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    }));
    setIsVisible(false);
    onAcceptAll?.();
    
    // Enable all tracking
    enableTracking();
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    }));
    setIsVisible(false);
    onRejectAll?.();
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'customized');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsVisible(false);
    onCustomize?.();
    
    // Enable tracking based on preferences
    enableTrackingWithPreferences(preferences);
  };

  const enableTracking = () => {
    // Enable Google Analytics
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }

    // Enable Facebook Pixel
    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('consent', 'grant');
    }
  };

  const enableTrackingWithPreferences = (prefs: typeof preferences) => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied'
      });
    }

    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      if (prefs.marketing) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('consent', 'grant');
      } else {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('consent', 'revoke');
      }
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Cannot toggle essential cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
          />
          
          {/* Cookie Banner - Mobile Optimized */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4"
          >
            <div className="container-wide">
              <div className="glass-card border-2 border-primary/20 max-h-[80vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Cookie className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Este site utiliza cookies
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVisible(false)}
                    className="ml-4 p-1 h-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Utilizamos cookies essenciais e outras tecnologias para garantir o funcionamento adequado do site, 
                  personalizar conteúdo, analisar o tráfego e melhorar sua experiência. Alguns cookies são necessários 
                  para funcionalidades básicas e não podem ser desativados.
                </p>

                {/* Cookie Details */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/50 pt-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Essential Cookies */}
                          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                            <div>
                              <h4 className="font-medium text-foreground text-sm">Cookies Essenciais</h4>
                              <p className="text-xs text-muted-foreground">Necessários para funcionamento básico</p>
                            </div>
                            <div className="flex items-center">
                              <div className="w-8 h-4 bg-green-500 rounded-full relative">
                                <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                              </div>
                            </div>
                          </div>

                          {/* Functional Cookies */}
                          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                            <div>
                              <h4 className="font-medium text-foreground text-sm">Cookies de Funcionalidade</h4>
                              <p className="text-xs text-muted-foreground">Melhoram a experiência do usuário</p>
                            </div>
                            <button
                              onClick={() => togglePreference('functional')}
                              className="flex items-center"
                            >
                              <div className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${
                                preferences.functional ? 'bg-primary' : 'bg-gray-300'
                              }`}>
                                <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                                  preferences.functional ? 'right-0.5' : 'left-0.5'
                                }`}></div>
                              </div>
                            </button>
                          </div>

                          {/* Analytics Cookies */}
                          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                            <div>
                              <h4 className="font-medium text-foreground text-sm">Cookies de Análise</h4>
                              <p className="text-xs text-muted-foreground">Ajudam a melhorar nossos serviços</p>
                            </div>
                            <button
                              onClick={() => togglePreference('analytics')}
                              className="flex items-center"
                            >
                              <div className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${
                                preferences.analytics ? 'bg-primary' : 'bg-gray-300'
                              }`}>
                                <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                                  preferences.analytics ? 'right-0.5' : 'left-0.5'
                                }`}></div>
                              </div>
                            </button>
                          </div>

                          {/* Marketing Cookies */}
                          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                            <div>
                              <h4 className="font-medium text-foreground text-sm">Cookies de Marketing</h4>
                              <p className="text-xs text-muted-foreground">Para anúncios mais relevantes</p>
                            </div>
                            <button
                              onClick={() => togglePreference('marketing')}
                              className="flex items-center"
                            >
                              <div className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${
                                preferences.marketing ? 'bg-primary' : 'bg-gray-300'
                              }`}>
                                <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                                  preferences.marketing ? 'right-0.5' : 'left-0.5'
                                }`}></div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Links */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
                  <a href="/privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </a>
                  <a href="/cookies" className="text-primary hover:underline">
                    Política de Cookies
                  </a>
                  <a href="/termos" className="text-primary hover:underline">
                    Termos de Uso
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex gap-2 flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      {showDetails ? 'Ocultar' : 'Personalizar'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRejectAll}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Rejeitar Todos
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    {showDetails && (
                      <Button
                        size="sm"
                        onClick={handleSavePreferences}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        Salvar Preferências
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      className="bg-primary hover:bg-primary/90 text-white font-medium"
                    >
                      Aceitar Todos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;