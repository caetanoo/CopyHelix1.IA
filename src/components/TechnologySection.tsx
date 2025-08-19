import { Brain, Database, Cpu, Shield, Zap, BarChart3 } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";

const TechnologySection = () => {
  const { category } = useViewportSize();
  
  // Hide complex technology section on mobile
  if (category?.includes('mobile')) {
    return (
      <section id="technology" className="py-10 relative">
        <div className="container-wide">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <Cpu className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-xl font-bold text-foreground leading-tight max-w-sm mx-auto mb-3">
              Tecnologia Diferencial
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              Nossa IA proprietária decodifica elementos genéticos de criativos vencedores, preserva seu DNA de sucesso e gera variações com 90% de precisão
            </p>
            
            <div className="glass-card max-w-md mx-auto p-6">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Brain className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-primary">DNA Engine™</div>
                  <div className="text-xs text-muted-foreground">IA Proprietária</div>
                </div>
              </div>
              
              <div className="mobile-tech-list mb-6 text-muted-foreground">
                <div className="mobile-tech-item">
                  <div className="mobile-tech-bullet bg-primary" />
                  <span className="mobile-tech-text">Primeiro do mercado com Voice Clone + Lip Sync</span>
                </div>
                <div className="mobile-tech-item">
                  <div className="mobile-tech-bullet bg-secondary" />
                  <span className="mobile-tech-text long-text">
                    <span className="hidden sm:inline">Clona criativos de vídeo e imagem de alta performance</span>
                    <span className="sm:hidden">Clona vídeos e imagens de alta performance</span>
                  </span>
                </div>
                <div className="mobile-tech-item">
                  <div className="mobile-tech-bullet bg-accent" />
                  <span className="mobile-tech-text">Mantém 100% do DNA vencedor original</span>
                </div>
                <div className="mobile-tech-item">
                  <div className="mobile-tech-bullet bg-primary" />
                  <span className="mobile-tech-text">Predição de performance antes de veicular</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="text-center p-2 bg-background/50 rounded-lg">
                  <div className="font-bold text-primary">5M+</div>
                  <div className="text-muted-foreground">Criativos</div>
                </div>
                <div className="text-center p-2 bg-background/50 rounded-lg">
                  <div className="font-bold text-primary">90%</div>
                  <div className="text-muted-foreground">Precisão</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  const technologies = [
    {
      icon: Brain,
      title: "Voice Clone + Lip Sync para Marketing",
      description: "PRIMEIRO do mercado a combinar clonagem de voz + sincronização labial para criativos. Grave um vídeo → gere múltiplas variações com sua voz.",
      features: ["Voice Cloning Avançado", "Lip Sync Realista", "Fluxo Automatizado"]
    },
    {
      icon: Database,
      title: "Clonagem Completa: Vídeo + Imagem → Variações Infinitas",
      description: "Único com clonagem de criativos completa. Replicamos seus vídeos e imagens de sucesso em múltiplas variações mantendo o DNA vencedor.",
      features: ["Clonagem de Vídeos", "Clonagem de Imagens", "ROI Maximizado"]
    },
    {
      icon: Cpu,
      title: "DNA Engine™",
      description: "A nossa tecnologia proprietária que decodifica elementos genéticos de criativos de alta performance.",
      features: ["Mapeamento Genético", "Extração de Elementos", "Correlação de Performance"]
    },
    {
      icon: Shield,
      title: "Segurança Empresarial",
      description: "Proteção de dados nível enterprise com criptografia ponta a ponta e compliance LGPD.",
      features: ["End-to-end Encryption", "LGPD Compliance"]
    },
    {
      icon: Zap,
      title: "Geração Instantânea",
      description: "Criação de variações em segundos, mantendo o DNA vencedor original.",
      features: ["Instant Generation", "DNA Preservation", "Infinite Variations"]
    },
    {
      icon: BarChart3,
      title: "Analytics Preditiva",
      description: "Previsão de performance antes mesmo de veicular, com precisão de 90% em conversões.",
      features: ["Performance Prediction", "Conversion Forecasting", "ROI Optimization"]
    }
  ];

  return (
    <section id="technology" className="py-20 relative">
      <div className="container-wide">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Cpu className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="section-heading max-w-4xl mx-auto">
            8 Vantagens Competitivas que Ninguém Mais Tem
          </h2>
          <p className="body-large max-w-3xl mx-auto">
            <span className="text-primary font-semibold">Primeiro do mercado</span> a combinar Voice Clone + Lip Sync para clonagem de criativos. 
            <span className="text-secondary font-semibold">Única plataforma</span> que clona tanto vídeos quanto imagens de alta performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            
            return (
              <div key={index} className="glass-card group hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 mb-6 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {tech.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {tech.description}
                </p>
                
                <div className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Showcase */}
        <div className="glass-card">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                DNA Engine™ em Ação
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A nossa tecnologia proprietária escaneia milhões de elementos visuais, textuais e estruturais 
                para identificar os <span className="text-primary font-semibold">genes do sucesso</span> em cada criativo.
              </p>
              
              <div className="space-y-4">
                {[
                  { label: "Elementos Visuais Analisados", value: "50M+" },
                  { label: "Padrões de Copy Mapeados", value: "2.3M+" },
                  { label: "Criativos Gerados", value: "5M+" },
                  { label: "Precisão em Previsões", value: "90%" },
                  { label: "Tempo de Processamento", value: "<60s" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="text-lg font-bold text-primary">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-12 h-12 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <Zap className="w-4 h-4 text-accent-foreground" />
                    </div>
                  </div>
                  <p className="text-muted-foreground font-medium">DNA Engine™</p>
                  <p className="text-sm text-muted-foreground/60">Processando padrões...</p>
                </div>
              </div>
              
              {/* Floating Elements - Desktop only for performance */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 md:animate-pulse" />
              <div className="absolute top-8 right-6 w-6 h-6 rounded-lg bg-secondary/20 border border-secondary/30 md:animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-6 left-8 w-10 h-6 rounded-lg bg-accent/20 border border-accent/30 md:animate-pulse" style={{ animationDelay: "2s" }} />
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 md:animate-pulse" style={{ animationDelay: "3s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;