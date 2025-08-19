import { motion } from "framer-motion";
import { Calendar, User, Clock, Share2, ArrowLeft, Brain, TrendingUp, Target, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BlogPost1 = () => {
  const navigate = useNavigate();
  
  const handleCTAClick = () => {
    navigate('/#contact');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Como Criar Criativos com IA: DNA dos Anúncios que Convertem em 2025',
      text: 'Descubra como a análise genética de criativos está mudando a forma como empresas brasileiras abordam suas campanhas digitais.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback para copy link
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
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
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">IA & Marketing</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Como Criar Criativos com IA: DNA dos Anúncios que Convertem em 2025
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Descubra como a análise genética de criativos está mudando a forma como empresas 
              brasileiras abordam suas campanhas digitais, aumentando ROI em até 300%.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Dr. Ana Silva</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>15 de Janeiro, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min de leitura</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>

            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-border flex items-center justify-center mb-12">
              <Brain className="w-20 h-20 text-primary" />
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
                O marketing digital brasileiro está passando por uma revolução silenciosa. Enquanto a maioria dos 
                profissionais ainda confia na intuição e testes A/B tradicionais, uma nova geração de empresas 
                está adotando uma abordagem científica para decodificar o que realmente faz um criativo converter.
              </p>

              <p>
                Esta revolução tem um nome: <strong>DNA Criativo</strong>. E os resultados que estamos vendo 
                são extraordinários - empresas que implementam essa metodologia relatam aumentos de ROI de até 300%.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">O Que é DNA Criativo?</h2>

              <p>
                Imagine se cada criativo publicitário possuísse uma "impressão digital" única - um conjunto 
                específico de características que determinam sua capacidade de conversão. Essa é exatamente 
                a premissa por trás do conceito de DNA Criativo.
              </p>

              <div className="bg-card p-6 rounded-lg border border-border my-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Elementos do DNA Criativo
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>Elementos Visuais:</strong> Paleta de cores, tipografia, composição, proporções
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <strong>Linguagem e Copy:</strong> Tom de voz, gatilhos mentais, estrutura narrativa
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <strong>Aspectos Psicológicos:</strong> Apelos emocionais, arquétipos, princípios de persuasão
                    </div>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">A Ciência Por Trás dos Resultados</h2>

              <p>
                Nossa pesquisa, baseada na análise de mais de <strong>50.000 criativos</strong> de campanhas 
                brasileiras, revelou padrões surpreendentes. Utilizando algoritmos de machine learning, 
                conseguimos identificar os elementos que mais impactam as taxas de conversão.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground">300%</div>
                  <div className="text-sm text-muted-foreground">Aumento médio de ROI</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <BarChart3 className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground">85%</div>
                  <div className="text-sm text-muted-foreground">Taxa de sucesso em novas campanhas</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Target className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground">70%</div>
                  <div className="text-sm text-muted-foreground">Redução no tempo de criação</div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">Case Real: E-commerce de Moda</h2>

              <p>
                Uma loja online de roupas femininas estava enfrentando dificuldades para escalar suas campanhas no Facebook. 
                Após aplicar nossa metodologia de DNA Criativo, os resultados foram impressionantes:
              </p>

              <ul className="space-y-2 my-6">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>CPC reduziu de R$ 2,50 para R$ 0,80 (-68%)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Taxa de conversão aumentou de 2,1% para 6,8% (+224%)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>ROAS passou de 3,2x para 11,5x (+259%)</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">Implementando DNA Criativo na Sua Estratégia</h2>

              <p>
                A implementação do DNA Criativo não é apenas sobre tecnologia - é sobre mudança de mindset. 
                Aqui estão os primeiros passos que recomendamos:
              </p>

              <div className="space-y-6 my-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Auditoria de Criativos Históricos</h4>
                    <p className="text-muted-foreground">
                      Analise seus criativos de melhor performance dos últimos 12 meses para identificar padrões.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Criação de Biblioteca de Elementos</h4>
                    <p className="text-muted-foreground">
                      Documente cores, fontes, ângulos e copies que mais convertem no seu nicho.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Testes Estruturados</h4>
                    <p className="text-muted-foreground">
                      Implemente testes A/B focados em elementos específicos do DNA, não apenas em variações aleatórias.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">O Futuro é Agora</h2>

              <p>
                O DNA Criativo não é uma tendência passageira - é o futuro do marketing digital. Empresas que 
                adotarem essa abordagem científica estarão anos à frente da concorrência.
              </p>

              <p>
                <strong>A pergunta não é se essa revolução vai acontecer, mas se você estará preparado para liderar 
                a mudança no seu mercado.</strong>
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 my-12 text-center">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Pronto para descobrir o DNA dos seus criativos?</h3>
                <p className="text-muted-foreground mb-6">
                  Agende uma demonstração gratuita e veja como nossa IA pode revolucionar suas campanhas.
                </p>
                <Button 
                  size="lg" 
                  className="btn-primary"
                  onClick={handleCTAClick}
                >
                  Solicitar Demonstração Gratuita
                </Button>
              </div>

              <div className="border-t border-border pt-8 mt-12">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Sobre a Autora</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Dr. Ana Silva</h4>
                    <p className="text-sm text-muted-foreground mb-2">CEO & Co-fundadora da CopyHelix.ai</p>
                    <p className="text-sm text-muted-foreground">
                      PhD em Machine Learning com 15 anos de experiência em MarTech. 
                      Ex-Google e Meta, especialista em IA aplicada ao marketing digital.
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

export default BlogPost1;