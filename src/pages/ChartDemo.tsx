import { useState } from 'react';
import { motion } from 'framer-motion';
import PitchImpactChart from '@/components/PitchImpactChart';
import CircularPitchChart from '@/components/CircularPitchChart';
import ImpactBarsChart from '@/components/ImpactBarsChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type ChartType = 'cards' | 'circular' | 'bars';

const ChartDemo = () => {
  const [activeChart, setActiveChart] = useState<ChartType>('cards');

  const chartOptions = [
    {
      id: 'cards' as ChartType,
      name: 'Cards Comparativos',
      description: 'Layout horizontal com comparação antes/depois',
      pros: ['Muito claro e legível', 'Mostra valores exatos', 'Boa para dados detalhados'],
      best: 'Apresentações detalhadas e relatórios'
    },
    {
      id: 'circular' as ChartType,
      name: 'Layout Circular',
      description: 'Design compacto perfeito para slides',
      pros: ['Economiza espaço', 'Visualmente atrativo', 'Ideal para pitch decks'],
      best: 'Slides de apresentação e espaços circulares'
    },
    {
      id: 'bars' as ChartType,
      name: 'Barras de Impacto',
      description: 'Barras horizontais mostrando % de melhoria',
      pros: ['Fácil de entender', 'Enfatiza melhorias', 'Visualmente impactante'],
      best: 'Demonstrações rápidas e pitch de vendas'
    }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'cards':
        return <PitchImpactChart />;
      case 'circular':
        return <CircularPitchChart />;
      case 'bars':
        return <ImpactBarsChart />;
      default:
        return <PitchImpactChart />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Opções de Visualização - CopyHelix Impact
          </h1>
          <p className="text-gray-400">
            Escolha o formato mais adequado para seu pitch deck
          </p>
        </div>

        {/* Chart Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {chartOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-300 ${
                activeChart === option.id
                  ? 'ring-2 ring-primary bg-primary/10'
                  : 'bg-gray-800/50 hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveChart(option.id)}
            >
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-white mb-1">
                    {option.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {option.description}
                  </p>
                  <div className="text-xs text-primary font-medium">
                    Melhor para: {option.best}
                  </div>
                </div>
                
                <div className="space-y-1">
                  {option.pros.map((pro, index) => (
                    <div key={index} className="text-xs text-green-400">
                      ✓ {pro}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Display */}
        <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700 mb-6">
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderChart()}
          </motion.div>
        </div>

        {/* Analysis and Recommendations */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Análise UX e Recomendações
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-3">
                  Problemas Resolvidos
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✅ Escalas normalizadas (percentuais de melhoria)</li>
                  <li>✅ Comparação clara antes/depois</li>
                  <li>✅ Dados realistas do mercado brasileiro</li>
                  <li>✅ Visual impactante para investidores</li>
                  <li>✅ Foco no ROI e benefícios tangíveis</li>
                  <li>✅ Adequado para espaço circular do slide</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-secondary mb-3">
                  Recomendação para Pitch
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <strong className="text-yellow-400">Para slide circular:</strong> Use o layout circular
                  </p>
                  <p>
                    <strong className="text-yellow-400">Para apresentação detalhada:</strong> Use os cards comparativos
                  </p>
                  <p>
                    <strong className="text-yellow-400">Para pitch rápido:</strong> Use as barras de impacto
                  </p>
                  <div className="mt-4 p-3 bg-primary/10 rounded border border-primary/30">
                    <p className="text-primary font-medium">
                      💡 Dica: O layout circular é perfeito para o espaço mostrado na imagem anterior
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartDemo;