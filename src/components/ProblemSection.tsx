import { AlertTriangle, TrendingDown, DollarSign, Clock } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";

const ProblemSection = () => {
  const { category } = useViewportSize();
  
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
    <section className={`relative ${
      category === 'mobile-small' ? 'pt-6 pb-12' : category?.includes('mobile') ? 'pt-8 pb-16' : 'py-20'
    }`}>
      <div className={`max-w-7xl mx-auto ${
        category === 'mobile-small' ? 'px-3' : 'px-4 sm:px-6 lg:px-8'
      }`}>
        <div className={`text-center ${
          category === 'mobile-small' ? 'mb-10' : category?.includes('mobile') ? 'mb-12' : 'mb-16'
        }`}>
          <div className={`inline-flex items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 ${
            category === 'mobile-small' ? 'p-2.5 mb-4' : 'p-3 mb-6'
          }`}>
            <AlertTriangle className={`text-destructive ${
              category === 'mobile-small' ? 'w-6 h-6' : 'w-8 h-8'
            }`} />
          </div>
          <h2 className={`font-bold text-foreground mx-auto ${
            category === 'mobile-small' 
              ? 'text-2xl mb-4 max-w-xs leading-tight px-2' 
              : category?.includes('mobile') 
                ? 'text-3xl mb-5 max-w-sm leading-tight px-4' 
                : 'section-heading max-w-4xl'
          }`}>
            Suas Variações Não Performam Porque Você Cria do Zero
          </h2>
          <p className={`text-muted-foreground leading-relaxed mx-auto ${
            category === 'mobile-small' 
              ? 'text-sm max-w-xs px-2' 
              : category?.includes('mobile') 
                ? 'text-base max-w-sm px-4' 
                : 'body-large max-w-3xl'
          }`}>
            Enquanto você gasta <span className="text-destructive font-semibold">semanas criando do zero</span>, outros estão clonando sucessos comprovados. 
            Pare de reinventar a roda: <span className="text-primary font-semibold">replique o que já converteu</span>.
          </p>
        </div>

        <div className={`grid w-full ${
          category === 'mobile-small' 
            ? 'grid-cols-1 gap-6 px-2' 
            : category?.includes('mobile') 
              ? 'grid-cols-1 gap-6' 
              : 'grid-cols-1 md:grid-cols-3 gap-8'
        }`}>
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <div key={index} className={`bg-card/50 backdrop-blur-xl border border-border/50 text-center group hover:scale-105 transition-transform duration-300 shadow-[var(--shadow-elegant)] ${
                category === 'mobile-small' 
                  ? 'rounded-xl p-6' 
                  : category?.includes('mobile') 
                    ? 'rounded-2xl p-6' 
                    : 'rounded-2xl p-8'
              }`}>
                <div className={`flex items-center justify-center mx-auto rounded-full bg-destructive/10 border border-destructive/20 group-hover:border-destructive/40 transition-colors duration-300 ${
                  category === 'mobile-small' 
                    ? 'w-12 h-12 mb-4' 
                    : category?.includes('mobile') 
                      ? 'w-14 h-14 mb-5' 
                      : 'w-16 h-16 mb-6'
                }`}>
                  <IconComponent className={`text-destructive ${
                    category === 'mobile-small' ? 'w-6 h-6' : 'w-8 h-8'
                  }`} />
                </div>
                <div className={`font-bold text-destructive ${
                  category === 'mobile-small' 
                    ? 'text-2xl mb-1.5' 
                    : category?.includes('mobile') 
                      ? 'text-3xl mb-2' 
                      : 'text-4xl mb-2'
                }`}>
                  {problem.stat}
                </div>
                <h3 className={`font-semibold text-foreground ${
                  category === 'mobile-small' 
                    ? 'text-lg mb-2' 
                    : category?.includes('mobile') 
                      ? 'text-lg mb-2.5' 
                      : 'text-xl mb-3'
                }`}>
                  {problem.title}
                </h3>
                <p className={`text-muted-foreground leading-relaxed ${
                  category === 'mobile-small' ? 'text-sm' : 'text-base'
                }`}>
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;