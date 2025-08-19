import { motion } from "framer-motion";
import { Calendar, User, Clock, Share2, ArrowLeft, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BlogPost3 = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Machine Learning vs. Intuição: O Futuro da Criação Publicitária',
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
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Tecnologia</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Machine Learning vs. Intuição: O Futuro da Criação Publicitária
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Como algoritmos de IA estão superando a intuição humana na criação de anúncios que convertem, e o que isso significa para criadores de conteúdo.
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Marina Costa</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>10 de Janeiro, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>10 min de leitura</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-border flex items-center justify-center mb-12">
            <BarChart3 className="w-16 h-16 text-primary" />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              A revolução da inteligência artificial na criação publicitária não é mais uma promessa do futuro – é uma realidade presente que está transformando fundamentalmente como criamos, testamos e otimizamos campanhas digitais.
            </p>

            <h2>O Confronto: Dados vs. Criatividade</h2>
            
            <p>
              Por décadas, a criação publicitária dependeu da experiência, intuição e talento criativo de profissionais experientes. Hoje, algoritmos de machine learning podem analisar milhões de variações criativas em segundos, identificando padrões que escapam ao olho humano.
            </p>

            <blockquote>
              <p>
                "A IA não substitui a criatividade humana - ela amplifica nossa capacidade de criar campanhas que realmente conectam com o público certo."
              </p>
              <cite>- Marina Costa, Especialista em IA Marketing</cite>
            </blockquote>

            <h2>O Poder da Análise Preditiva</h2>
            
            <p>
              Machine learning permite que analisemos não apenas o que funcionou no passado, mas prevejamos quais elementos criativos terão melhor performance antes mesmo de lançar a campanha.
            </p>

            <ul>
              <li><strong>Análise de Sentimento:</strong> Compreensão emocional do público</li>
              <li><strong>Segmentação Comportamental:</strong> Personalização em escala</li>
              <li><strong>Otimização Dinâmica:</strong> Ajustes automáticos baseados em performance</li>
            </ul>

            <h2>Casos Práticos de Sucesso</h2>
            
            <p>
              Empresas que adotaram IA na criação publicitária relatam aumentos de 40-60% nas taxas de conversão, demonstrando que a tecnologia não é apenas uma tendência, mas uma necessidade competitiva.
            </p>

            <h2>O Futuro da Criação</h2>
            
            <p>
              O profissional do futuro será aquele que conseguir combinar intuição criativa com insights baseados em dados, utilizando IA como ferramenta de amplificação da criatividade humana.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {["Machine Learning", "IA", "Publicidade", "Criatividade"].map((tag, index) => (
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

export default BlogPost3;