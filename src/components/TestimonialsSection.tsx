import { useViewportSize } from "@/hooks/use-mobile";

const TestimonialsSection = () => {
  const { category } = useViewportSize();

  const stats = [
    { value: "5", label: "Early Adopters exclusivos", suffix: "" },
    { value: "100%", label: "Taxa de sucesso inicial", suffix: "" },
    { value: "R$ 2.3M+", label: "Testado em campanhas reais", suffix: "" },
    { value: "Beta", label: "Acesso antecipado disponível", suffix: "" }
  ];

  return (
    <section className={`relative ${
      category === 'mobile-small' ? 'py-8' : category?.includes('mobile') ? 'py-10' : 'py-12'
    }`}>
      <div className={`container-wide ${
        category === 'mobile-small' ? 'px-3' : ''
      }`}>
        {/* Mobile: Simplified Stats */}
        {category?.includes('mobile') ? (
          <div className={`text-center ${
            category === 'mobile-small' ? 'px-2' : ''
          }`}>
            <h2 className={`font-bold text-foreground leading-tight ${
              category === 'mobile-small' ? 'text-lg mb-2 px-1' : 'text-xl mb-2'
            }`}>
              Resultados Comprovados
            </h2>
            <p className={`text-muted-foreground mx-auto ${
              category === 'mobile-small' 
                ? 'text-xs max-w-64 mb-5 px-2' 
                : 'text-sm max-w-xs mb-6'
            }`}>
              Validado por 5 Early Adopters exclusivos
            </p>
            
            <div className={`glass-card mx-auto ${
              category === 'mobile-small' 
                ? 'max-w-xs p-3' 
                : 'max-w-sm p-4'
            }`}>
              <div className={`grid grid-cols-2 ${
                category === 'mobile-small' ? 'gap-3' : 'gap-4'
              }`}>
                <div className="text-center">
                  <div className={`font-bold text-primary ${
                    category === 'mobile-small' ? 'text-xl mb-0.5' : 'text-2xl mb-0.5'
                  }`}>5</div>
                  <p className={`text-muted-foreground ${
                    category === 'mobile-small' ? 'text-xs leading-tight' : 'text-xs'
                  }`}>Early Adopters</p>
                </div>
                <div className="text-center">
                  <div className={`font-bold text-primary ${
                    category === 'mobile-small' ? 'text-xl mb-0.5' : 'text-2xl mb-0.5'
                  }`}>100%</div>
                  <p className={`text-muted-foreground ${
                    category === 'mobile-small' ? 'text-xs leading-tight' : 'text-xs'
                  }`}>Sucesso</p>
                </div>
              </div>
              
              <div className={`border-t border-border/30 ${
                category === 'mobile-small' ? 'mt-3 pt-2.5' : 'mt-4 pt-3'
              }`}>
                <div className="text-center">
                  <div className={`font-bold text-primary ${
                    category === 'mobile-small' ? 'text-lg mb-0.5' : 'text-xl mb-0.5'
                  }`}>R$ 2.3M+</div>
                  <p className={`text-muted-foreground ${
                    category === 'mobile-small' ? 'text-xs leading-tight' : 'text-xs'
                  }`}>Testado em campanhas reais</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop: Full Stats Section */
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-heading max-w-4xl mx-auto">
                Laboratório Genético Comprovado
              </h2>
              <p className="body-large max-w-3xl mx-auto">
                Testado com 5 Early Adopters exclusivos. Resultados validados em campanhas reais antes do lançamento público.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.suffix === "+" && "+"}
                    {stat.value}
                    {stat.suffix === "-" && ""}
                  </div>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;