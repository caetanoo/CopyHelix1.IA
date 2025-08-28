import { motion } from 'framer-motion';
import { Zap, TrendingDown, ArrowRight } from 'lucide-react';

const CircularPitchChart = () => {
  const metrics = [
    {
      label: "Tempo",
      before: "40h",
      after: "2h",
      reduction: "95%",
      color: "text-blue-400"
    },
    {
      label: "Custo",
      before: "R$ 8K",
      after: "R$ 200",
      reduction: "97%",
      color: "text-green-400"
    },
    {
      label: "Performance",
      before: "2.1%",
      after: "4.8%",
      reduction: "+128%",
      color: "text-primary"
    }
  ];

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Circular Background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900/80 to-black/60 border-2 border-primary/30 backdrop-blur-sm">
        
        {/* Central DNA Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
            <Zap className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div className="text-center mt-2">
            <div className="text-xs font-bold text-primary">CopyHelix</div>
            <div className="text-xs text-gray-400">DNA.ai</div>
          </div>
        </div>

        {/* Metrics positioned around circle */}
        {metrics.map((metric, index) => {
          const angle = (index * 120) - 90; // Distribute 3 items around circle
          const radius = 110;
          const x = Math.cos(angle * Math.PI / 180) * radius;
          const y = Math.sin(angle * Math.PI / 180) * radius;
          
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3 }}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Metric Container */}
              <div className="relative">
                {/* Connection line to center */}
                <div 
                  className="absolute w-16 h-0.5 bg-gradient-to-r from-primary/40 to-transparent"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'left center',
                    transform: `translate(-100%, -50%) rotate(${angle + 180}deg)`
                  }}
                />
                
                {/* Metric Card */}
                <div className="bg-gray-800/90 rounded-lg p-3 min-w-[100px] border border-gray-600/50 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-300 mb-1">
                      {metric.label}
                    </div>
                    
                    {/* Before/After Comparison */}
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <span className="text-sm text-red-400">{metric.before}</span>
                      <ArrowRight className="w-3 h-3 text-gray-500" />
                      <span className={`text-sm ${metric.color}`}>{metric.after}</span>
                    </div>
                    
                    {/* Improvement */}
                    <div className="flex items-center justify-center">
                      <TrendingDown className="w-3 h-3 text-green-400 mr-1" />
                      <span className="text-xs font-bold text-green-400">
                        {metric.reduction}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Bottom ROI Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-green-600/20 to-primary/20 rounded-full px-4 py-2 border border-green-500/40">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">ROI 4000%</div>
              <div className="text-xs text-gray-400">1º mês</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CircularPitchChart;