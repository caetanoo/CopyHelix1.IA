import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useViewportSize, useIsTouchDevice } from "@/hooks/use-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { category } = useViewportSize();
  const isTouch = useIsTouchDevice();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Link interno - verifica se está na home
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Link externo ou página
      navigate(href);
    }
  };

  // Enhanced mobile menu management
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && 
          menuRef.current && 
          buttonRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    // Close menu on screen size change
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-wide">
        <div className={`flex items-center justify-between ${
          category === 'mobile-small' ? 'py-3 px-2' : 'py-4'
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleNavigation('/')}
            />
            <div className="hidden sm:inline-flex items-center px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 text-xs font-medium text-amber-800 dark:text-amber-200">
              EM DESENVOLVIMENTO
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Sobre', href: '/sobre' },
              { name: 'Blog', href: '/blog' },
              { name: 'Features', href: '#features' },
              { name: 'Contato', href: '/ajuda' }
            ].map((item, index) => (
              <motion.button 
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-hover"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <motion.div 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-card border border-border cursor-hover"
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">PT</span>
            </motion.div>

            {/* Demo Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="btn-primary cursor-hover"
                onClick={() => {
                  if (location.pathname !== '/') {
                    navigate('/#contact');
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Decodificar DNA
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            ref={buttonRef}
            onClick={toggleMobileMenu}
            className={`md:hidden rounded-lg transition-colors duration-200 flex items-center justify-center touch-target
              ${category === 'mobile-small' 
                ? 'min-h-[48px] min-w-[48px] p-2.5' 
                : 'min-h-[44px] min-w-[44px] p-3'
              }
              ${isMobileMenuOpen ? 'bg-primary/10' : 'hover:bg-card'}
              ${isTouch ? '' : 'cursor-hover'}`}
            whileHover={{ scale: isTouch ? 1 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              ref={menuRef}
              id="mobile-menu"
              className={`md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl
                ${category === 'mobile-small' ? 'py-3 mx-2' : 'py-4'}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              role="navigation"
              aria-label="Menu de navegação móvel"
            >
              <nav className={`flex flex-col ${category === 'mobile-small' ? 'space-y-2.5' : 'space-y-4'}`}>
                {[
                  { name: 'Sobre', href: '/sobre' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Features', href: '#features' },
                  { name: 'Contato', href: '/ajuda' }
                ].map((item, index) => (
                  <motion.button 
                    key={item.name}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavigation(item.href);
                    }}
                    className={`text-muted-foreground hover:text-foreground transition-colors duration-200 text-left
                      ${category === 'mobile-small' ? 'py-2 text-base px-2' : 'py-2 text-lg'}
                      ${isTouch ? 'active:text-primary' : 'cursor-hover'}
                      touch-target flex items-center`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    whileHover={isTouch ? {} : { x: 10, color: "hsl(var(--primary))" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.div 
                  className={`border-t border-border/50 ${
                    category === 'mobile-small' ? 'pt-3 mt-2' : 'pt-4 mt-4'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <div className={`flex items-center justify-between ${
                    category === 'mobile-small' ? 'px-2' : ''
                  }`}>
                    <div className={`flex items-center space-x-2 rounded-lg bg-card border border-border cursor-hover ${
                      category === 'mobile-small' ? 'px-2 py-1.5' : 'px-3 py-2'
                    }`}>
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">PT</span>
                    </div>
                    <Button 
                      className={`btn-primary cursor-hover ${
                        category === 'mobile-small' ? 'text-sm px-4 py-2 h-10' : ''
                      }`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (location.pathname !== '/') {
                          navigate('/#contact');
                          setTimeout(() => {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        } else {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Decodificar DNA
                    </Button>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;