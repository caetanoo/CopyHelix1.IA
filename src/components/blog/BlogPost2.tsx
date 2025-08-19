import { motion } from "framer-motion";
import { Calendar, User, Clock, Share2, ArrowLeft, Target, TrendingUp, Users, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BlogPost2 = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Templates para Infoprodutos: 5 Padrões de Criativos que Convertem',
        url: window.location.href
      }).catch(console.log);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => alert('Link copiado!'));
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Header />
      
      <main className="pt-24">
        {/* Article Header */}
        <section className="container-wide py-16">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>

            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Estratégia</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Templates para Infoprodutos: 5 Padrões de Criativos que Convertem
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Análise exclusiva dos elementos criativos que mais convertem no mercado de infoprodutos 
              brasileiro, baseada em dados de mais de 10.000 campanhas analisadas.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Carlos Rodriguez</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>12 de Janeiro, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>6 min de leitura</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>

            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-border flex items-center justify-center mb-12">
              <Target className="w-20 h-20 text-primary" />
            </div>
          </motion.div>
        </section>

        {/* Article Content */}
        <section className="container-wide pb-16">
          <motion.article
            className="max-w-4xl mx-auto prose prose-lg prose-gray dark:prose-invert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-foreground space-y-8">
              <p className="text-lg leading-relaxed">
                O mercado de infoprodutos no Brasil movimenta bilhões de reais anualmente. Mas você sabia que 
                apenas <strong>5% dos criativos</strong> publicitários são responsáveis por 80% das vendas? 
                Nossa análise de mais de 10.000 campanhas revelou os padrões que separam os vencedores dos perdedores.
              </p>

              <p>
                Estes são os 5 padrões de DNA criativo que todo infoprodutor brasileiro precisa dominar para 
                aumentar suas conversões exponencialmente.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Padrão #1: O "Antes e Depois" Científico
              </h2>

              <p>
                O padrão mais poderoso no DNA dos infoprodutos brasileiros não é o antes e depois comum - 
                é o que chamamos de "Transformação Científica".
              </p>

              <div className="bg-card p-6 rounded-lg border border-border my-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Elementos Essenciais
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Números específicos:</strong> "De R$ 2.000 para R$ 47.000 em 90 dias"
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <strong>Timeframe claro:</strong> Sempre incluir prazo específico
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong>Prova social:</strong> Screenshots, depoimentos, certificados
                    </div>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-3">❌ Erro Comum</h4>
                  <p className="text-sm text-muted-foreground">
                    "Aprenda a ganhar dinheiro online"
                  </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-3">✅ DNA Vencedor</h4>
                  <p className="text-sm text-muted-foreground">
                    "Como sair de R$ 0 para R$ 30k/mês em 120 dias (método cientificamente comprovado)"
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Padrão #2: Urgência Psicológica Inteligente
              </h2>

              <p>
                Criativos com urgência bem aplicada convertem <strong>340% mais</strong> que os sem urgência. 
                Mas não é qualquer urgência - é urgência psicológica baseada em escassez real.
              </p>

              <div className="space-y-4 my-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Escassez de Tempo</h4>
                    <p className="text-muted-foreground">
                      "Últimas 48h para garantir o bônus de R$ 2.500"
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Escassez de Quantidade</h4>
                    <p className="text-muted-foreground">
                      "Vagas limitadas disponíveis"
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Escassez de Oportunidade</h4>
                    <p className="text-muted-foreground">
                      "Próxima turma apenas em setembro de 2025"
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Padrão #3: Prova Social Estratificada
              </h2>

              <p>
                A prova social no Brasil precisa ser estratificada por região e classe social. 
                Nossos dados mostram que criativos com depoimentos segmentados convertem 180% mais.
              </p>

              <div className="bg-card p-6 rounded-lg border border-border my-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Estratificação Eficaz
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
                    <span className="text-sm">Depoimentos por região</span>
                    <span className="text-sm text-primary font-semibold">+45% conversão</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
                    <span className="text-sm">Resultados por faixa etária</span>
                    <span className="text-sm text-secondary font-semibold">+38% conversão</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
                    <span className="text-sm">Cases por profissão</span>
                    <span className="text-sm text-accent font-semibold">+52% conversão</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Padrão #4: Garantia Reversa com Twist
              </h2>

              <p>
                A garantia tradicional de 7 dias está saturada. O padrão vencedor usa o que chamamos de 
                "Garantia Reversa com Twist" - uma abordagem contraintuitiva que aumenta a confiança.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">30</span>
                  </div>
                  <div className="text-sm font-medium">Garantia Estendida</div>
                  <div className="text-xs text-muted-foreground mt-1">30 dias completos</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-sm font-medium">Riscos da Empresa</div>
                  <div className="text-xs text-muted-foreground mt-1">"O risco é nosso"</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-accent font-bold">+</span>
                  </div>
                  <div className="text-sm font-medium">Bônus na Devolução</div>
                  <div className="text-xs text-muted-foreground mt-1">Incentivo extra</div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Padrão #5: Call-to-Action Psicológico
              </h2>

              <p>
                O CTA "Comprar Agora" está morto. Os criativos vencedores usam CTAs que ativam gatilhos 
                psicológicos específicos do público brasileiro.
              </p>

              <div className="space-y-6 my-8">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <strong className="text-foreground">Para Empreendedores:</strong>
                  </div>
                  <p className="text-muted-foreground pl-6">"Quero Construir Meu Império Digital"</p>
                </div>
                
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <strong className="text-foreground">Para Profissionais Liberais:</strong>
                  </div>
                  <p className="text-muted-foreground pl-6">"Quero Multiplicar Minha Renda Profissional"</p>
                </div>
                
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <strong className="text-foreground">Para Iniciantes:</strong>
                  </div>
                  <p className="text-muted-foreground pl-6">"Quero Começar Minha Transformação Financeira"</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">Resultados Comprovados</h2>

              <p>
                Infoprodutores que aplicaram todos os 5 padrões simultaneamente reportaram resultados médios de:
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl font-bold text-primary">+425%</div>
                  <div className="text-sm text-muted-foreground">Taxa de Conversão</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl font-bold text-secondary">-67%</div>
                  <div className="text-sm text-muted-foreground">Custo de Aquisição</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl font-bold text-accent">+890%</div>
                  <div className="text-sm text-muted-foreground">ROI Total</div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">Próximos Passos</h2>

              <p>
                Implementar estes 5 padrões pode parecer complexo, mas a recompensa vale o esforço. 
                Comece testando um padrão por vez em suas campanhas atuais e meça os resultados.
              </p>

              <p>
                <strong>Lembre-se:</strong> No mercado de infoprodutos brasileiro, quem domina estes padrões 
                de DNA criativo não compete por atenção - domina o mercado.
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 my-12 text-center">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Quer descobrir mais padrões exclusivos?</h3>
                <p className="text-muted-foreground mb-6">
                  Nossa IA já identificou mais de 47 padrões específicos para o mercado brasileiro. 
                  Veja como aplicá-los nas suas campanhas.
                </p>
                <Button size="lg" className="btn-primary">
                  Agendar Análise Gratuita
                </Button>
              </div>

              <div className="border-t border-border pt-8 mt-12">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Sobre o Autor</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Carlos Rodriguez</h4>
                    <p className="text-sm text-muted-foreground mb-2">CTO & Co-fundador da CopyHelix.ai</p>
                    <p className="text-sm text-muted-foreground">
                      Especialista em sistemas de alto desempenho com mais de 12 anos analisando 
                      padrões de conversão no mercado digital brasileiro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default BlogPost2;