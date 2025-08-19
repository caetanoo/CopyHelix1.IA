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
      title: "Análise do DNA Criativo",
      description: "Faça o upload dos seus melhores criativos. A nossa IA faz o sequenciamento genético, identificando cada elemento que gerou milhões.",
      features: ["Sequenciamento do DNA criativo", "Mapeia genes emocionais", "Identifica códigos vencedores", "Extrai fórmulas genéticas"]
    },
    {
      step: "02", 
      icon: Dna,
      title: "Criação da IA Genética",
      description: "Geramos uma Personal Creative Intelligence com seu DNA único - uma cópia genética que pensa e converte como você.",
      features: ["IA clonada do seu DNA", "Replica código genético", "Hereditariedade preservada", "Evolução contínua"]
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
      icon: Mic,
      title: "Voice Clone + Infinite Scripts",
      description: "Sua voz, infinitas mensagens. Grave um vídeo e gere múltiplas variações com scripts diferentes, mantendo sua personalidade e DNA de conversão.",
      features: ["Voice cloning avançado", "Lip sync realista", "Scripts personalizados", "Personalidade preservada"]
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container-wide">
        {/* Mobile: Simplified header */}
        {category?.includes('mobile') ? (
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Dna className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground leading-tight max-w-sm mx-auto mb-4">
              Como Funciona o Laboratório Genético
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              4 passos para clonar seus criativos vencedores
            </p>
          </div>
        ) : (
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Dna className="w-8 h-8 text-primary" />
            </div>
            <h2 className="section-heading max-w-4xl mx-auto">
              Laboratório Genético de Criativos: Personal Creative Intelligence
            </h2>
            <p className="body-large max-w-3xl mx-auto">
              A nossa IA funciona como um <span className="text-primary font-semibold">laboratório genético</span>: analisa o DNA dos seus criativos vencedores, 
              isola os <span className="text-primary font-semibold">"genes de sucesso"</span> e replica com variações, mantendo a fórmula genética intacta.
            </p>
          </div>
        )}

        {/* Mobile: Accordion Steps */}
        {category?.includes('mobile') ? (
          <div className="space-y-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isExpanded = expandedStep === index;
              
              return (
                <div key={index} className="glass-card">
                  <button
                    onClick={() => setExpandedStep(isExpanded ? -1 : index)}
                    className="w-full p-4 text-left flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-primary font-semibold">PASSO {step.step}</div>
                        <div className="text-sm font-semibold text-foreground">{step.title}</div>
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
                        <div className="px-4 pb-4 space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {step.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <span className="text-xs text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full mt-3 text-xs"
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

        <div className="mt-20 text-center">
          <div className="glass-card max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              O Seu DNA Criativo Já Converteu Milhões. Por Que Não Cloná-lo?
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Transforme os seus criativos vencedores em um <strong>laboratório genético</strong> que replica o DNA de sucesso infinitamente. 
              Personal Creative Intelligence com <span className="text-primary font-semibold">hereditariedade comprovada</span>.
            </p>
            <Button 
              className="btn-primary group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Clonar Meus Melhores Criativos
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;