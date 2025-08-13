import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "@/components/CustomCursor";
import { ScrollProgress, ParallaxBackground } from "@/components/ScrollAnimations";
import FloatingElements from "@/components/FloatingElements";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import CookieConsent from "@/components/legal/CookieConsent";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Help from "./pages/Help";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import TermsOfUse from "@/components/legal/TermsOfUse";
import LGPDCompliance from "@/components/legal/LGPDCompliance";
import CookiePolicy from "@/components/legal/CookiePolicy";
import BlogPost1 from "@/components/blog/BlogPost1";
import BlogPost2 from "@/components/blog/BlogPost2";
import AOS from 'aos';
import 'aos/dist/aos.css';

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });

    // Hide default cursor only on desktop
    if (!isMobile) {
      document.body.style.cursor = 'none';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollProgress />
        <ParallaxBackground />
        <FloatingElements />
        {!isMobile && <CustomCursor />}
        <ExitIntentPopup />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/dna-criativo-performance-marketing-2024" element={<BlogPost1 />} />
            <Route path="/blog/5-padroes-dna-infoprodutor-brasileiro" element={<BlogPost2 />} />
            <Route path="/ajuda" element={<Help />} />
            <Route path="/contato" element={<Help />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos" element={<TermsOfUse />} />
            <Route path="/lgpd" element={<LGPDCompliance />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;