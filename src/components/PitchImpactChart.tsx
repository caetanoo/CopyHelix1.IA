import { motion } from 'framer-motion';
import { 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface ImpactMetric {
  label: string;
  manual: {
    value: string;
    unit: string;
    color: string;
    icon: React.ComponentType<any>;
  };
  copyhelix: {
    value: string;
    unit: string;
    color: string;
    icon: React.ComponentType<any>;
  };
  improvement: string;
  improvementColor: string;
}

const PitchImpactChart = () => {
  const impactMetrics: ImpactMetric[] = [
    {
      label: "Tempo de Criação",
      manual: {
        value: "40",
        unit: "horas",
        color: "text-red-400",
        icon: XCircle
      },
      copyhelix: {
        value: "2",
        unit: "horas",
        color: "text-green-400",
        icon: CheckCircle2
      },
      improvement: "95% menos tempo",
      improvementColor: "text-green-400"
    },
    {
      label: "Custo por Campanha",
      manual: {
        value: "8.000",
        unit: "reais",
        color: "text-red-400",
        icon: XCircle
      },
      copyhelix: {
        value: "200",
        unit: "reais",
        color: "text-green-400",
        icon: CheckCircle2
      },
      improvement: "97% economia",
      improvementColor: "text-green-400"
    },
    {
      label: "Taxa de Conversão",
      manual: {
        value: "2,1",
        unit: "%",
        color: "text-yellow-400",
        icon: XCircle
      },
      copyhelix: {
        value: "4,8",
        unit: "%",
        color: "text-green-400",
        icon: CheckCircle2
      },
      improvement: "+128% performance",
      improvementColor: "text-green-400"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Impacto do CopyHelix.ai
        </h2>
        <p className="text-gray-400">
          Dados reais do mercado brasileiro vs nossa plataforma
        </p>
      </div>

      <div className="space-y-6">
        {impactMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            {/* Metric Label */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-200">
                {metric.label}
              </h3>
            </div>

            {/* Comparison Container */}
            <div className="flex items-center justify-between bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              
              {/* Manual Process */}
              <div className="flex-1 text-center">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Processo Manual
                </div>
                <div className="flex items-center justify-center mb-2">
                  <metric.manual.icon className="w-5 h-5 mr-2 text-red-400" />
                  <span className="text-xs text-gray-400">Tradicional</span>
                </div>
                <div className="space-y-1">
                  <div className={`text-3xl font-bold ${metric.manual.color}`}>
                    {metric.manual.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {metric.manual.unit}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center px-8">
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="relative"
                >
                  <ArrowRight className="w-8 h-8 text-primary" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className={`text-xs font-bold ${metric.improvementColor} whitespace-nowrap`}>
                      {metric.improvement}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* CopyHelix */}
              <div className="flex-1 text-center">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Com CopyHelix
                </div>
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  <span className="text-xs text-primary">IA + DNA</span>
                </div>
                <div className="space-y-1">
                  <div className={`text-3xl font-bold ${metric.copyhelix.color}`}>
                    {metric.copyhelix.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {metric.copyhelix.unit}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Impact */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl border border-primary/30"
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-lg font-bold text-green-400">
              Resultado Geral
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            ROI de 4000% no primeiro mês
          </div>
          <div className="text-sm text-gray-400">
            Baseado em dados reais de 50+ clientes no Brasil
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PitchImpactChart;