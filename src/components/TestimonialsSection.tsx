import { Star, TrendingUp, Users, Zap } from "lucide-react";
import { useViewportSize } from "@/hooks/use-mobile";
import { useState } from "react";

const TestimonialsSection = () => {
  const { category } = useViewportSize();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Marcos Silva",
      role: "Infoprodutor",
      company: "Negócio Digital",
      image: "/placeholder.svg",
      quote: "Meu VSL que convertia 15% virou múltiplas variações com a mesma performance. O laboratório genético identificou os genes emocionais que eu nunca percebi sozinho.",
      metrics: {
        icon: TrendingUp,
        value: "Multi",
        label: "variações"
      }
    },
    {
      name: "Carla Mendes", 
      role: "Infoprodutora",
      company: "Digital Academy",
      image: "/placeholder.svg",
      quote: "Gravei um vídeo falando sobre meu curso e a IA gerou múltiplas variações com scripts diferentes, mantendo minha voz e personalidade. Primeiro do mercado com essa tecnologia!",
      metrics: {
        icon: Zap,
        value: "Multi",
        label: "variações"
      }
    },
    {
      name: "Felipe Costa",
      role: "Agency Owner", 
      company: "Digital Growth",
      image: "/placeholder.svg",
      quote: "A herança genética dos criativos dos meus clientes é preservada 100%. Consigo entregar muito mais variações, mantendo o DNA de sucesso.",
      metrics: {
        icon: Users,
        value: "Multi",
        label: "variações"
      }
    }
  ];

  const stats = [
    { value: "+27", label: "Infoprodutores & E-commerces", suffix: "" },
    { value: "89%", label: "Taxa de sucesso genético", suffix: "" },
    { value: "R$ 5M+", label: "Gerados pelos DNAs clonados", suffix: "" },
    { value: "99%", label: "Precisão na replicação", suffix: "" }
  ];

  return (
    <section className="py-20 relative">
      <div className="container-wide">
        {/* Mobile: Simplified Stats */}
        {category?.includes('mobile') ? (
          <div className="text-center">
            <h2 className="text-xl font-bold text-foreground leading-tight mb-3">
              Resultados Comprovados
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-8">
              Empresas que já clonaram seus criativos vencedores
            </p>
            
            <div className="glass-card max-w-sm mx-auto p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">+27</div>
                  <p className="text-xs text-muted-foreground">Empresas</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">89%</div>
                  <p className="text-xs text-muted-foreground">Sucesso</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">R$ 5M+</div>
                  <p className="text-xs text-muted-foreground">Gerados pelos DNAs clonados</p>
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
                Infoprodutores e E-commerces que clonaram o seu DNA criativo estão multiplicando resultados exponencialmente.
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

        {/* Desktop Only: Testimonials and Social Proof */}
        {!category?.includes('mobile') && (
          <>
            {/* Testimonials */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-foreground text-center mb-12">
                Mais de 27 Early Adopters do Laboratório Genético
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => {
                  const MetricIcon = testimonial.metrics.icon;
                  
                  return (
                    <div key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-muted-foreground mb-6 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      {/* Metric */}
                      <div className="flex items-center space-x-3 mb-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <MetricIcon className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {testimonial.metrics.value}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider">
                            {testimonial.metrics.label}
                          </div>
                        </div>
                      </div>
                      
                      {/* Author */}
                      <div className="flex items-center space-x-3 pt-4 border-t border-border/30">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-sm font-semibold text-foreground">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.role} • {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center">
              <div className="glass-card max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Junte-se a mais de 27 Early Adopters
                    </h3>
                    <p className="text-muted-foreground">
                      Infoprodutores e E-commerces que já possuem o seu laboratório genético exclusivo.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-background flex items-center justify-center">
                          <span className="text-xs font-semibold text-foreground">
                            {String.fromCharCode(65 + i)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      +26 outros
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;