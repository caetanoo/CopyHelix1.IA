import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 left-10 w-32 h-32 border-2 border-primary/20 rounded-full"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rotate-45"
      />
      <motion.div
        style={{ 
          y: y1, 
          rotate: useTransform(rotate, r => -r),
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
        }}
        className="absolute bottom-40 left-20 w-24 h-24 border border-accent/30"
      />
      
      {/* Grid overlay */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-5"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,149,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,149,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </motion.div>
    </div>
  );
};

export const ScrollTriggerAnimations = ({ children }: { children: React.ReactNode }) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
};