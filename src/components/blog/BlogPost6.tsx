import { motion } from "framer-motion";
import { Calendar, User, Clock, Share2, ArrowLeft, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BlogPost6 = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'O Futuro do E-commerce: IA Gerativa para Criação de Anúncios',
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
        <article className="container-wide max-w-4xl py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/blog')}
              className="p-0 h-auto font-normal hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar ao Blog
            </Button>
          </div>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">E-commerce</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              O Futuro do E-commerce: IA Gerativa para Criação de Anúncios
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Como a inteligência artificial generativa está transformando a velocidade e eficiência na criação de criativos para e-commerce no Brasil.
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Carlos Rodriguez</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>3 de Janeiro, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>9 min de leitura</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-border flex items-center justify-center mb-12">
            <Target className="w-16 h-16 text-primary" />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              O e-commerce brasileiro está passando por uma revolução silenciosa. Enquanto gestores ainda criam anúncios manualmente, empresas pioneiras já utilizam IA generativa para produzir centenas de variações criativas em minutos.
            </p>

            <h2>A Revolução Já Começou</h2>
            
            <p>
              Em 2024, a IA generativa não é mais ficção científica - é uma realidade que está democratizando a criação de anúncios profissionais. Pequenas e médias empresas agora têm acesso a tecnologias que antes custavam milhões.
            </p>

            <blockquote>
              <p>
                "IA generativa reduziu nosso tempo de criação de 8 horas para 15 minutos por campanha, mantendo a mesma qualidade."
              </p>
              <cite>- Laura Santos, CMO da ModaBrasil</cite>
            </blockquote>

            <h2>Tecnologias que Estão Mudando o Jogo</h2>
            
            <h3>1. Geração Automática de Copy</h3>
            <p>
              Algoritmos especializados criam textos persuasivos baseados em:
            </p>
            <ul>
              <li>Análise do produto e categoria</li>
              <li>Histórico de conversões da marca</li>
              <li>Tendências de mercado em tempo real</li>
              <li>Comportamento do público-alvo</li>
            </ul>

            <h3>2. Criação Visual Automatizada</h3>
            <p>
              Sistemas de IA generativa produzem:
            </p>
            <ul>
              <li>Variações de produto em diferentes contextos</li>
              <li>Backgrounds otimizados por segmento</li>
              <li>Layouts responsivos para cada formato</li>
              <li>Elementos gráficos personalizados</li>
            </ul>

            <h3>3. Otimização Dinâmica</h3>
            <p>
              A IA não apenas cria - ela aprende e melhora continuamente:
            </p>
            <ul>
              <li>Ajustes automáticos baseados em performance</li>
              <li>A/B testing em escala exponencial</li>
              <li>Personalização por micro-segmentos</li>
              <li>Previsão de tendências emergentes</li>
            </ul>

            <h2>Casos de Sucesso no Brasil</h2>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 my-8">
              <h3>Casa & Decoração Online</h3>
              <p><strong>Desafio:</strong> Criar anúncios para 50.000+ produtos</p>
              <p><strong>Solução:</strong> IA generativa + DNA criativo</p>
              <p><strong>Resultado:</strong> 340% aumento na produtividade, 85% redução nos custos criativos</p>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 rounded-lg p-6 my-8">
              <h3>Fashion Week Store</h3>
              <p><strong>Desafio:</strong> Acompanhar tendências de moda rapidamente</p>
              <p><strong>Solução:</strong> Sistema de IA que monitora trends e gera criativos</p>
              <p><strong>Resultado:</strong> Time-to-market 75% mais rápido, 220% aumento nas vendas</p>
            </div>

            <h2>Implementação Prática</h2>
            
            <p>
              Para começar a usar IA generativa no seu e-commerce:
            </p>

            <h3>Nível Iniciante</h3>
            <ol>
              <li>Automatize a criação de copy para produtos similares</li>
              <li>Use templates inteligentes para diferentes categorias</li>
              <li>Implemente testes A/B automatizados</li>
            </ol>

            <h3>Nível Avançado</h3>
            <ol>
              <li>Integre IA com seu catálogo de produtos</li>
              <li>Personalize criativos por jornada do cliente</li>
              <li>Implemente otimização em tempo real</li>
            </ol>

            <h2>O Que Esperar em 2024</h2>
            
            <p>
              As tendências que definirão o futuro do e-commerce:
            </p>

            <ul>
              <li><strong>Vídeos gerados por IA:</strong> Produtos em ação sem necessidade de filmagem</li>
              <li><strong>Realidade aumentada:</strong> Clientes "experimentando" produtos virtualmente</li>
              <li><strong>Personalização extrema:</strong> Anúncios únicos para cada usuário</li>
              <li><strong>Voice commerce:</strong> Otimização para assistentes de voz</li>
            </ul>

            <h2>Desafios e Oportunidades</h2>
            
            <p>
              Apesar do potencial imenso, existem desafios:
            </p>

            <ul>
              <li><strong>Qualidade vs. Quantidade:</strong> Manter padrões elevados em escala</li>
              <li><strong>Autenticidade:</strong> Preservar a voz única da marca</li>
              <li><strong>Regulamentação:</strong> Adaptar-se às regras de IA em advertising</li>
              <li><strong>Competitividade:</strong> Diferenciação em um mercado democratizado</li>
            </ul>

            <h2>Conclusão: Adapte-se ou Fique para Trás</h2>
            
            <p>
              A IA generativa não é mais uma vantagem competitiva - está se tornando uma necessidade básica. E-commerces que não adotarem essas tecnologias rapidamente enfrentarão desvantagens crescentes em custo, velocidade e eficácia.
            </p>

            <p>
              O futuro chegou. A pergunta não é "se" você deve usar IA generativa, mas "quando" você vai começar.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {["E-commerce", "IA Generativa", "Anúncios", "Automação"].map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-card border border-border rounded-full text-sm text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
            <span className="text-sm font-medium">Compartilhar:</span>
            <Button size="sm" variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </motion.div>
  );
};

export default BlogPost6;