import { useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import CustomCursor from "@/components/CustomCursor";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import MobileLoadingFallback from "@/components/MobileLoadingFallback";
import Index from "./pages/Index"; // Keep Index as direct import for critical path
import NotFound from "./pages/NotFound"; // Keep NotFound as direct import

// Direct imports (lazy loading removed for stability)
import About from "./pages/About";
import Blog from "./pages/Blog";
import Help from "./pages/Help";
import Dashboard from "./pages/Dashboard";
import BetaWaitlist from "./pages/BetaWaitlist";
import WaitlistDashboard from "./pages/WaitlistDashboard";
// import FunnelMetricsDashboard from "./components/FunnelMetricsDashboard";
import BlogPost1 from "./components/blog/BlogPost1";
import BlogPost2 from "./components/blog/BlogPost2";
import BlogPost3 from "./components/blog/BlogPost3";
import BlogPost4 from "./components/blog/BlogPost4";
import BlogPost5 from "./components/blog/BlogPost5";
import BlogPost6 from "./components/blog/BlogPost6";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import TermsOfUse from "./components/legal/TermsOfUse";
import LGPDCompliance from "./components/legal/LGPDCompliance";
import CookiePolicy from "./components/legal/CookiePolicy";
import ChartDemo from "./pages/ChartDemo";
// AOS disabled for mobile performance
// import AOS from 'aos';
// import 'aos/dist/aos.css';

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // AOS disabled for mobile performance
    // AOS.init({
    //   duration: 1000,
    //   once: true,
    //   offset: 100,
    //   easing: 'ease-out-cubic',
    // });

    // Hide default cursor disabled for performance
    // if (!isMobile) {
    //   document.body.style.cursor = 'none';
    // }

    // Preload disabled for stability
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
{/* Custom Cursor disabled for mobile performance */}
        {/* {!isMobile && <CustomCursor />} */}
        <ExitIntentPopup />
        <StickyMobileCTA />
        <BrowserRouter>
          <div>
            <Suspense fallback={<MobileLoadingFallback type="page" />}>
              <Routes>
                {/* Critical path - no lazy loading */}
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
                
                {/* Lazy loaded routes with mobile-optimized loading */}
                <Route path="/sobre" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <About />
                  </Suspense>
                } />
                <Route path="/blog" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <Blog />
                  </Suspense>
                } />
                <Route path="/ajuda" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <Help />
                  </Suspense>
                } />
                <Route path="/contato" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <Help />
                  </Suspense>
                } />
                <Route path="/dashboard" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <Dashboard />
                  </Suspense>
                } />
                <Route path="/beta-waitlist" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <BetaWaitlist />
                  </Suspense>
                } />
                <Route path="/waitlist-dashboard" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <WaitlistDashboard />
                  </Suspense>
                } />
                {/* <Route path="/funnel-metrics" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <FunnelMetricsDashboard />
                  </Suspense>
                } /> */}
                
                {/* Blog posts - lowest priority lazy loading */}
                <Route path="/blog/dna-criativo-performance-marketing-2025" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <BlogPost1 />
                  </Suspense>
                } />
                <Route path="/blog/5-padroes-dna-infoprodutor-brasileiro" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <BlogPost2 />
                  </Suspense>
                } />
                <Route path="/blog/machine-learning-vs-intuicao-criacao-publicitaria" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <BlogPost3 />
                  </Suspense>
                } />
                <Route path="/blog/case-study-startup-500-vendas-dna-criativo" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <BlogPost4 />
                  </Suspense>
                } />
                <Route path="/blog/psicologia-cores-dna-criativo-dados" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <BlogPost5 />
                  </Suspense>
                } />
                <Route path="/blog/futuro-ecommerce-ia-gerativa-criacao-anuncios" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <BlogPost6 />
                  </Suspense>
                } />
                
                {/* Legal pages - lazy loaded */}
                <Route path="/privacidade" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <PrivacyPolicy />
                  </Suspense>
                } />
                <Route path="/termos" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <TermsOfUse />
                  </Suspense>
                } />
                <Route path="/lgpd" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <LGPDCompliance />
                  </Suspense>
                } />
                <Route path="/cookies" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <CookiePolicy />
                  </Suspense>
                } />
                <Route path="/chart-demo" element={
                  <Suspense fallback={<MobileLoadingFallback type="page" />}>
                    <ChartDemo />
                  </Suspense>
                } />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;