import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo = ({ className = "", onClick }: LogoProps) => {
  return (
    <motion.div 
      className={`inline-flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <button 
        onClick={onClick}
        className="cursor-hover flex items-center focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 rounded-lg px-2 py-1"
        aria-label="CopyHelix.ai - Home"
      >
        <span className="text-2xl md:text-3xl font-bold tracking-tight">
          <span className="text-foreground">CopyHelix</span>
          <span className="text-primary">.ai</span>
        </span>
      </button>
    </motion.div>
  );
};

export default Logo;