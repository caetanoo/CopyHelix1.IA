import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TechnologySection from "@/components/TechnologySection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

const Index = () => {
  useSEO(); // Use default SEO for homepage
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header />
      <main>
        <HeroSection />
        <motion.div
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-offset="150"
          data-aos-easing="ease-out-cubic"
          className="scroll-animate"
        >
          <ProblemSection />
        </motion.div>
        <motion.div
          data-aos="slide-left"
          data-aos-duration="1200"
          data-aos-offset="150"
          data-aos-delay="100"
          className="scroll-animate"
        >
          <SolutionSection />
        </motion.div>
        <motion.div
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-offset="150"
          data-aos-delay="200"
          className="scroll-animate"
        >
          <TestimonialsSection />
        </motion.div>
        <motion.div
          data-aos="slide-right"
          data-aos-duration="1200"
          data-aos-offset="150"
          data-aos-delay="100"
          className="scroll-animate"
        >
          <TechnologySection />
        </motion.div>
        <motion.div
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-offset="150"
          data-aos-delay="200"
          className="scroll-animate"
        >
          <DemoSection />
        </motion.div>
      </main>
      <motion.div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="50"
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default Index;
