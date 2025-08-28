import { motion } from 'framer-motion';
import { Clock, DollarSign, TrendingUp, Zap } from 'lucide-react';

interface ImpactBar {
  label: string;
  icon: React.ComponentType<any>;
  improvement: number; // Percentage improvement
  color: string;
  beforeValue: string;
  afterValue: string;
  metric: string;
}

const ImpactBarsChart = () => {
  const impactData: ImpactBar[] = [
    {
      label: "Redução de Tempo",
      icon: Clock,
      improvement: 95,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      beforeValue: "40h",
      afterValue: "2h",
      metric: "por campanha"
    },
    {
      label: "Economia de Custo",
      icon: DollarSign,
      improvement: 97,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      beforeValue: "R$ 8K",
      afterValue: "R$ 200",
      metric: "por projeto"
    },
    {
      label: "Melhoria de Performance",
      icon: TrendingUp,
      improvement: 128,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      beforeValue: "2.1%",
      afterValue: "4.8%",
      metric: "conversão"
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-3">
          <Zap className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-2xl font-bold text-white">
            Impacto CopyHelix.ai
          </h2>
        </div>
        <p className="text-gray-400 text-sm">
          Dados reais • Mercado brasileiro • 50+ clientes
        </p>
      </div>

      {/* Impact Bars */}
      <div className="space-y-6">
        {impactData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            {/* Label and Values */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <item.icon className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-semibold text-white text-sm">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.metric}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">
                  {item.improvement > 100 ? '+' : ''}{item.improvement}%
                </div>
                <div className="text-xs text-gray-400">
                  {item.beforeValue} → {item.afterValue}
                </div>
              </div>
            </div>

            {/* Progress Bar Background */}
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              {/* Animated Progress Bar */}
              <motion.div
                className={`h-full ${item.color} rounded-full relative`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(item.improvement, 100)}%` }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.8, ease: "easeOut" }}
              >
                {/* Glowing effect for bars over 100% */}
                {item.improvement > 100 && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{
                      delay: index * 0.2 + 1.1,
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/30"
      >
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">
            Resultado Consolidado
          </div>
          <div className="text-xl font-bold text-primary mb-1">
            ROI 4000%
          </div>
          <div className="text-xs text-gray-500">
            Retorno no investimento • Primeiro mês
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImpactBarsChart;