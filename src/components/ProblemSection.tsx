import { AlertTriangle, TrendingDown, DollarSign, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useViewportSize } from "@/hooks/use-mobile";

const ProblemSection = () => {
  const { category } = useViewportSize();
  const [currentProblem, setCurrentProblem] = useState(0);
  
  const problems = [
    {
      icon: TrendingDown,
      stat: "89%",
      title: "das empresas falham",
      description: "porque ignoram o DNA dos criativos que já converteram R$ 10M+ e recriam tudo do zero."
    },
    {
      icon: DollarSign,
      stat: "R$ 100K+",
      title: "desperdiçados/mês",
      description: "testando criativos aleatórios, quando poderiam clonar sucessos comprovados."
    },
    {
      icon: Clock,
      stat: "45 dias",
      title: "perdidos criando",
      description: "o que você poderia clonar em 5 minutos com 99% de precisão usando IA."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container-wide">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="section-heading max-w-4xl mx-auto">
            Pare de Gastar Tempo Fazendo Variações que Não Performam
          </h2>
          <p className="body-large max-w-3xl mx-auto">
            Enquanto você gasta <span className="text-destructive font-semibold">semanas criando do zero</span>, outros estão clonando sucessos comprovados. 
            Pare de reinventar a roda: <span className="text-primary font-semibold">replique o que já converteu</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <div key={index} className="glass-card text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 border border-destructive/20 group-hover:border-destructive/40 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-destructive" />
                </div>
                <div className="text-4xl font-bold text-destructive mb-2">
                  {problem.stat}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-destructive mb-3">
                  🚨 Cada teste é uma roleta russa de R$ 10K
                </h3>
                <p className="text-muted-foreground text-lg">
                  Você gasta <span className="text-destructive font-semibold">semanas criando variações</span> que podem não performar, 
                  quando poderia ter <strong>90% de precisão</strong> clonando cientificamente o que já funcionou para você.
                </p>
              </div>
              <div className="w-px h-20 bg-border hidden md:block" />
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-primary mb-3">
                  ✅ A solução é científica
                </h3>
                <p className="text-muted-foreground text-lg">
                  Nossa <strong>Personal Creative Intelligence</strong> decodifica <span className="text-primary font-semibold">exatamente</span> por que seus criativos funcionaram 
                  e replica essa fórmula vencedora infinitamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;