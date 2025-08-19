import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  Target, 
  MessageCircle,
  Mail,
  Share2,
  Calendar,
  Award
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  description: string;
}

const MetricCard = ({ title, value, change, changeType, icon: Icon, description }: MetricCardProps) => {
  const changeColor = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-muted-foreground'
  }[changeType];

  return (
    <Card className="glass-card border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <span className={`text-sm font-medium ${changeColor}`}>
            {change}
          </span>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-3xl font-bold text-primary">{value}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const WaitlistMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalSignups: 147,
    activeInCommunity: 89,
    emailEngagement: 76,
    referralRate: 31,
    expectedLaunchReadiness: 85,
    avgWaitTime: 45,
    surveyCompletion: 68,
    premiumConversions: 23
  });

  // Simulate real-time updates (in production, this would come from your analytics API)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalSignups: prev.totalSignups + Math.floor(Math.random() * 3),
        activeInCommunity: Math.min(prev.totalSignups, prev.activeInCommunity + Math.floor(Math.random() * 2)),
        emailEngagement: Math.min(100, prev.emailEngagement + (Math.random() > 0.8 ? 1 : 0))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const metricsData = [
    {
      title: 'Total na Lista',
      value: metrics.totalSignups,
      change: '+12 hoje',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Beta testers registrados'
    },
    {
      title: 'Ativos na Comunidade',
      value: `${metrics.activeInCommunity}%`,
      change: '+5% semana',
      changeType: 'positive' as const,
      icon: MessageCircle,
      description: 'Participação no WhatsApp VIP'
    },
    {
      title: 'Engajamento Email',
      value: `${metrics.emailEngagement}%`,
      change: '+3% semana',
      changeType: 'positive' as const,
      icon: Mail,
      description: 'Taxa de abertura média'
    },
    {
      title: 'Taxa de Indicação',
      value: `${metrics.referralRate}%`,
      change: '+8% semana',
      changeType: 'positive' as const,
      icon: Share2,
      description: 'Usuários que indicaram outros'
    },
    {
      title: 'Prontidão para Beta',
      value: `${metrics.expectedLaunchReadiness}%`,
      change: 'No prazo',
      changeType: 'positive' as const,
      icon: Target,
      description: 'Desenvolvimento vs timeline'
    },
    {
      title: 'Tempo Médio na Lista',
      value: `${metrics.avgWaitTime}d`,
      change: 'Estável',
      changeType: 'neutral' as const,
      icon: Calendar,
      description: 'Desde registro até beta'
    },
    {
      title: 'Pesquisas Completas',
      value: `${metrics.surveyCompletion}%`,
      change: '+15% semana',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Taxa de resposta feedback'
    },
    {
      title: 'Conversões Premium',
      value: `${metrics.premiumConversions}%`,
      change: '+4% semana',
      changeType: 'positive' as const,
      icon: Award,
      description: 'Interest in paid features'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Métricas da Lista de Espera
        </h2>
        <p className="text-muted-foreground">
          Acompanhe o crescimento e engajamento da comunidade beta
        </p>
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-primary">Dados atualizados em tempo real</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>

      {/* Key Insights */}
      <Card className="glass-card border-secondary/20">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Insights da Semana
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-sm font-medium text-primary mb-1">🚀 Crescimento Acelerado</div>
              <div className="text-xs text-muted-foreground">
                Lista crescendo 40% mais rápido que semana passada
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
              <div className="text-sm font-medium text-secondary mb-1">💬 Comunidade Ativa</div>
              <div className="text-xs text-muted-foreground">
                89% dos membros participam ativamente no WhatsApp
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <div className="text-sm font-medium text-accent mb-1">🎯 Alta Conversão</div>
              <div className="text-xs text-muted-foreground">
                68% completam pesquisas de feedback - 3x acima da média
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Toward Launch */}
      <Card className="glass-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Progresso para Beta Launch</h3>
              <p className="text-sm text-muted-foreground">Meta: 150 beta testers qualificados</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso atual</span>
              <span className="font-medium text-foreground">{metrics.totalSignups}/150</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(metrics.totalSignups / 150) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span className="font-medium text-primary">{Math.round((metrics.totalSignups / 150) * 100)}% completo</span>
              <span>150</span>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                Estimativa de Beta Launch
              </p>
              <p className="text-lg font-bold text-primary">
                {metrics.totalSignups >= 150 ? 'Ready to Launch!' : '2-3 semanas'}
              </p>
              <p className="text-xs text-muted-foreground">
                Baseado no crescimento atual
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistMetrics;