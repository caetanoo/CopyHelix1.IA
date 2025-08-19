import { motion } from "framer-motion";
import { Calendar, User, Clock, Share2, ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BlogPost4 = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Case Study: Como uma Startup Aumentou 500% suas Vendas com DNA Criativo',
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
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Case Study</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Case Study: Como uma Startup Aumentou 500% suas Vendas com DNA Criativo
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              História real de uma startup brasileira que utilizou nossa metodologia para identificar e replicar elementos vencedores em seus criativos.
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Dr. Ana Silva</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>8 de Janeiro, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>12 min de leitura</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-border flex items-center justify-center mb-12">
            <TrendingUp className="w-16 h-16 text-primary" />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              <strong>EduTech Solutions</strong>, uma startup brasileira de educação online, enfrentava um problema comum: suas campanhas de aquisição tinham alto custo e baixa conversão. Em 6 meses, nossa metodologia de DNA Criativo transformou seus resultados.
            </p>

            <h2>O Desafio Inicial</h2>
            
            <p>
              Quando a EduTech nos procurou em junho de 2023, sua situação era crítica:
            </p>

            <ul>
              <li><strong>CAC (Custo de Aquisição):</strong> R$ 285 por cliente</li>
              <li><strong>Taxa de Conversão:</strong> 1.2% nos anúncios pagos</li>
              <li><strong>ROAS:</strong> 2.1x (abaixo do ideal)</li>
              <li><strong>Tempo de Payback:</strong> 8 meses</li>
            </ul>

            <h2>Nossa Metodologia DNA Criativo</h2>
            
            <p>
              Aplicamos nossa abordagem científica em três fases:
            </p>

            <h3>Fase 1: Análise Genética</h3>
            <p>
              Decompusemos os criativos com melhor performance da EduTech, identificando elementos-chave:
            </p>

            <blockquote>
              <p>
                "Descobrimos que criativos com depoimentos reais de alunos tinham 340% mais engajamento que materiais promocionais tradicionais."
              </p>
            </blockquote>

            <h3>Fase 2: Replicação Inteligente</h3>
            <p>
              Desenvolvemos múltiplas variações criativas mantendo o "DNA vencedor":
            </p>

            <ul>
              <li>Testemunhos autênticos como elemento principal</li>
              <li>Cores quentes (laranja/vermelho) para CTAs</li>
              <li>Linguagem conversacional vs. corporativa</li>
              <li>Elementos de urgência baseados em escassez</li>
            </ul>

            <h3>Fase 3: Otimização Contínua</h3>
            <p>
              Implementamos testes A/B sistemáticos, refinando os elementos de maior impacto semanalmente.
            </p>

            <h2>Resultados Extraordinários</h2>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 my-8">
              <h3 className="text-center mb-4">Resultados após 6 meses:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">↓ 68%</p>
                  <p className="text-sm">CAC (R$ 285 → R$ 91)</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">↑ 520%</p>
                  <p className="text-sm">Taxa de Conversão</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">8.7x</p>
                  <p className="text-sm">ROAS Final</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">2.1 meses</p>
                  <p className="text-sm">Payback</p>
                </div>
              </div>
            </div>

            <h2>Lições Aprendidas</h2>
            
            <p>
              Este caso demonstra três princípios fundamentais:
            </p>

            <ol>
              <li><strong>Autenticidade supera produção:</strong> Depoimentos reais &gt; vídeos produzidos</li>
              <li><strong>Teste sistemático:</strong> Pequenas melhorias compostas geram grandes resultados</li>
              <li><strong>DNA replicável:</strong> Elementos vencedores podem ser adaptados para diferentes campanhas</li>
            </ol>

            <h2>Próximos Passos</h2>
            
            <p>
              A EduTech agora aplica a metodologia DNA Criativo em todos os seus lançamentos, mantendo consistência nos resultados e escalando suas operações com confiança.
            </p>

            <p>
              <strong>Quer replicar esses resultados na sua empresa?</strong> Nossa metodologia DNA Criativo está disponível através da plataforma CopyHelix.ai.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {["Case Study", "Startup", "Vendas", "Metodologia"].map((tag, index) => (
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

export default BlogPost4;