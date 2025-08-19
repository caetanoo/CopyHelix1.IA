import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Zap, Target, Cpu, Database, Network } from 'lucide-react';

const FloatingElements = () => {
  const { scrollY } = useScroll();
  
  // Different scroll speeds for parallax effect
  const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 2000], [0, -450]);
  const rotate1 = useTransform(scrollY, [0, 2000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 2000], [0, -360]);

  // Fix: Use explicit class mappings instead of dynamic classes
  const getBackgroundClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/20 backdrop-blur-sm';
      case 'secondary':
        return 'p-3 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 border border-secondary/20 backdrop-blur-sm';
      case 'accent':
        return 'p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 border border-accent/20 backdrop-blur-sm';
      default:
        return 'p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/20 backdrop-blur-sm';
    }
  };

  const getIconClasses = (size: string, color: string) => {
    const colorClass = color === 'primary' ? 'text-primary' : color === 'secondary' ? 'text-secondary' : 'text-accent';
    return `${size} ${colorClass}`;
  };

  const floatingIcons = [
    { icon: Code2, color: 'primary', size: 'w-8 h-8', position: { top: '20%', left: '5%' }, motion: y1, rotate: rotate1 },
    { icon: Zap, color: 'secondary', size: 'w-6 h-6', position: { top: '40%', right: '8%' }, motion: y2, rotate: rotate2 },
    { icon: Target, color: 'accent', size: 'w-7 h-7', position: { top: '60%', left: '3%' }, motion: y3, rotate: rotate1 },
    { icon: Cpu, color: 'primary', size: 'w-9 h-9', position: { top: '80%', right: '5%' }, motion: y1, rotate: rotate2 },
    { icon: Database, color: 'secondary', size: 'w-5 h-5', position: { top: '35%', left: '8%' }, motion: y2, rotate: rotate1 },
    { icon: Network, color: 'accent', size: 'w-6 h-6', position: { top: '75%', left: '6%' }, motion: y3, rotate: rotate2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {floatingIcons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={index}
            className="absolute opacity-20"
            style={{
              ...item.position,
              y: item.motion,
              rotate: item.rotate,
            }}
          >
            <motion.div
              className={getBackgroundClasses(item.color)}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <IconComponent className={getIconClasses(item.size, item.color)} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-32 h-32 border border-primary/10 rounded-full"
        style={{ y: y1, rotate: rotate1 }}
        animate={{
          scale: [1, 1.05, 1],
          borderColor: ['hsl(var(--primary) / 0.1)', 'hsl(var(--primary) / 0.3)', 'hsl(var(--primary) / 0.1)'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-secondary/5 to-accent/5 rotate-45"
        style={{ y: y2, rotate: rotate2 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [45, 90, 45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-2/3 left-1/6 w-24 h-24 opacity-10"
        style={{ 
          y: y3, 
          rotate: rotate1,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          background: "linear-gradient(45deg, hsl(var(--accent) / 0.2), hsl(var(--primary) / 0.1))"
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Data flow lines */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};

export default FloatingElements;