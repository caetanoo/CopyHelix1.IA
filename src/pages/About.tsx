import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Award, ArrowRight, Dna } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  const handleCTAClick = () => {
    navigate('/#contact');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.5
      }
    }
  };

  const stats = [
    { number: "95%", label: "Taxa de sucesso em campanhas", icon: Target },
    { number: "500+", label: "Criativos analisados diariamente", icon: Lightbulb },
    { number: "50x", label: "Melhoria na performance", icon: Award },
    { number: "24/7", label: "Análise contínua de dados", icon: Dna }
  ];

  const values = [
    {
      title: "Inovação Científica",
      description: "Aplicamos metodologias científicas rigorosas para decodificar padrões de sucesso em marketing digital.",
      icon: Lightbulb
    },
    {
      title: "Resultados Comprovados",
      description: "Nossa IA já ajudou centenas de empresas a multiplicar suas conversões através da análise do DNA criativo.",
      icon: Award
    },
    {
      title: "Transparência Total",
      description: "Fornecemos insights claros e actionables sobre por que determinados criativos funcionam melhor.",
      icon: Target
    },
    {
      title: "Evolução Contínua",
      description: "Nossos algoritmos aprendem constantemente com novos dados para oferecer análises cada vez mais precisas.",
      icon: Users
    }
  ];

  return (
    <motion.div 
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="container-wide py-16">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Decodificando o
                <span className="text-primary"> DNA </span>
                do sucesso criativo
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Somos pioneiros em aplicar inteligência artificial para analisar e replicar 
                os padrões genéticos dos criativos mais bem-sucedidos do mercado digital.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container-wide py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-lg bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Mission Section */}
        <section className="container-wide py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Revolucionar o marketing digital brasileiro através da ciência aplicada à criatividade. 
                Acreditamos que por trás de cada criativo vencedor existe um código genético que pode 
                ser decodificado, analisado e replicado.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Nossa plataforma utiliza algoritmos avançados de machine learning para identificar 
                os elementos-chave que fazem um criativo converter, permitindo que infoprodutores 
                e e-commerces criem campanhas com performance previsível e escalável.
              </p>
              <Button 
                className="btn-primary"
                onClick={handleCTAClick}
              >
                Solicitar Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 border border-border">
                <Dna className="w-16 h-16 text-primary mb-6 mx-auto" />
                <h3 className="text-2xl font-bold text-center mb-4">DNA Criativo</h3>
                <p className="text-muted-foreground text-center">
                  Cada criativo possui uma "impressão digital" única composta por elementos visuais, 
                  textuais e psicológicos que determinam sua capacidade de conversão.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container-wide py-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Os princípios que guiam nossa missão de democratizar o acesso à performance marketing científica.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* CTA Section */}
        <section className="container-wide py-16">
          <motion.div
            className="text-center p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para decodificar seu sucesso?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já descobriram o DNA dos seus criativos vencedores.
            </p>
            <Button 
              size="lg"
              className="btn-primary"
              onClick={handleCTAClick}
            >
              Solicitar Demonstração Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default About;