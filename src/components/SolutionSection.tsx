import { Brain, Dna, Zap, ArrowRight, Mic, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useViewportSize } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const SolutionSection = () => {
  const { category } = useViewportSize();
  const [expandedStep, setExpandedStep] = useState(0);
  
  const steps = [
    {
      step: "01",
      icon: Brain,
      title: "Upload + Métricas de Performance",
      description: "Upload dos seus melhores criativos + inserção das métricas reais (CTR, CPC, ROI, conversões). Nossa IA cruza performance com elementos visuais para mapear o DNA do sucesso.",
      features: ["Upload de criativos vencedores", "Input de métricas (CTR, CPC, ROI)", "Correlação performance x elementos", "Mapeamento genético preciso"]
    },
    {
      step: "02", 
      icon: Dna,
      title: "Configuração do Engine",
      description: "Geramos Engine de Clonagem Criativa com seu DNA único - algoritmo especializado que replica seus padrões de sucesso.",
      features: ["Algoritmo treinado no seu DNA", "Replica código genético", "Hereditariedade preservada", "Evolução contínua"]
    },
    {
      step: "03",
      icon: Zap,
      title: "Replicação Infinita", 
      description: "Clone os seus sucessos infinitamente, mantendo a herança genética. Variações que preservam 100% do DNA original.",
      features: ["Clonagem ilimitada", "Herança genética", "DNA preservado 100%", "Mutações controladas"]
    },
    {
      step: "04",
      icon: ArrowRight,
      title: "Entrega e Testes",
      description: "Receba suas variações criativas (imagens e vídeos) otimizadas com o seu DNA de conversão. Teste múltiplas versões e identifique os melhores performers.",
      features: ["Variações em múltiplos formatos", "Testes A/B estruturados", "Métricas de performance", "Otimização contínua"]
    }
  ];

  return (
    <section id="features" className={`relative ${
      category === 'mobile-small' ? 'py-12' : category?.includes('mobile') ? 'py-16' : 'py-20'
    }`}>
      <div className={`container-wide ${
        category === 'mobile-small' ? 'px-3' : ''
      }`}>
        {/* Mobile: Simplified header */}
        {category?.includes('mobile') ? (
          <div className={`text-center ${
            category === 'mobile-small' ? 'mb-6 px-2' : 'mb-8'
          }`}>
            <div className={`inline-flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 ${
              category === 'mobile-small' ? 'p-2.5 mb-3' : 'p-3 mb-4'
            }`}>
              <Dna className={`text-primary ${
                category === 'mobile-small' ? 'w-5 h-5' : 'w-6 h-6'
              }`} />
            </div>
            <h2 className={`font-bold text-foreground leading-tight mx-auto ${
              category === 'mobile-small' 
                ? 'text-xl max-w-xs mb-3 px-1' 
                : 'text-2xl max-w-sm mb-4'
            }`}>
              Como Funciona o Laboratório Genético
            </h2>
            <p className={`text-muted-foreground mx-auto ${
              category === 'mobile-small' 
                ? 'text-xs max-w-64 px-2' 
                : 'text-sm max-w-xs'
            }`}>
              4 passos para clonar seus criativos vencedores
            </p>
          </div>
        ) : (
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Dna className="w-8 h-8 text-primary" />
            </div>
            <h2 className="section-heading max-w-4xl mx-auto">
              Laboratório Genético de Criativos: Sistema de Análise de DNA
            </h2>
            <p className="body-large max-w-3xl mx-auto">
              Nossa IA funciona como um <span className="text-primary font-semibold">laboratório genético</span>: analisa o DNA dos seus criativos vencedores, 
              isola os <span className="text-primary font-semibold">"genes de sucesso"</span> e replica com variações, mantendo a fórmula genética intacta.
            </p>
          </div>
        )}

        {/* Mobile: Accordion Steps */}
        {category?.includes('mobile') ? (
          <div className={`space-y-${category === 'mobile-small' ? '3' : '4'} ${
            category === 'mobile-small' ? 'px-2' : ''
          }`}>
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isExpanded = expandedStep === index;
              
              return (
                <div key={index} className="glass-card">
                  <button
                    onClick={() => setExpandedStep(isExpanded ? -1 : index)}
                    className={`w-full text-left flex items-center justify-between ${
                      category === 'mobile-small' ? 'p-3' : 'p-4'
                    }`}
                  >
                    <div className={`flex items-center ${
                      category === 'mobile-small' ? 'space-x-2.5' : 'space-x-3'
                    }`}>
                      <div className={`flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 ${
                        category === 'mobile-small' ? 'w-8 h-8' : 'w-10 h-10'
                      }`}>
                        <IconComponent className={`text-primary ${
                          category === 'mobile-small' ? 'w-4 h-4' : 'w-5 h-5'
                        }`} />
                      </div>
                      <div>
                        <div className={`text-primary font-semibold ${
                          category === 'mobile-small' ? 'text-xs' : 'text-xs'
                        }`}>PASSO {step.step}</div>
                        <div className={`font-semibold text-foreground ${
                          category === 'mobile-small' ? 'text-sm leading-tight' : 'text-sm'
                        }`}>{step.title}</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`pb-4 space-y-4 ${
                          category === 'mobile-small' ? 'px-3' : 'px-4'
                        }`}>
                          <p className={`text-muted-foreground leading-relaxed ${
                            category === 'mobile-small' ? 'text-xs' : 'text-sm'
                          }`}>
                            {step.description}
                          </p>
                          
                          <div className={`grid grid-cols-1 ${
                            category === 'mobile-small' ? 'gap-1.5' : 'gap-2'
                          }`}>
                            {step.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className={`flex items-center ${
                                category === 'mobile-small' ? 'space-x-1.5' : 'space-x-2'
                              }`}>
                                <div className={`rounded-full bg-primary ${
                                  category === 'mobile-small' ? 'w-1 h-1' : 'w-1.5 h-1.5'
                                }`} />
                                <span className={`text-muted-foreground ${
                                  category === 'mobile-small' ? 'text-xs leading-tight' : 'text-xs'
                                }`}>{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className={`w-full mt-3 ${
                              category === 'mobile-small' ? 'text-xs py-2 h-9' : 'text-xs'
                            }`}
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                          >
                            Ver Demonstração
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop: Original Layout */
          <div className="space-y-20">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 1;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`space-y-6 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-6xl font-bold text-primary/20">{step.step}</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`${isEven ? 'lg:order-1' : ''}`}>
                    <div className="glass-card">
                      <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10 flex items-center justify-center">
                        <div className="text-center">
                          <IconComponent className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground">Demonstração Interativa</p>
                          <p className="text-sm text-muted-foreground/60">Processo {step.step}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default SolutionSection;