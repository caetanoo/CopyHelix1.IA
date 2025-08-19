import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag, TrendingUp, Brain, Target, BarChart3, Loader2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const navigate = useNavigate();
  useSEO(); // Use SEO for blog page
  
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
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

  const blogPosts = [
    {
      id: 1,
      title: "Como Criar Criativos com IA: DNA dos Anúncios que Convertem em 2025",
      excerpt: "Descubra como a análise genética de criativos está mudando a forma como empresas brasileiras abordam suas campanhas digitais, aumentando ROI em até 300%.",
      author: "Dr. Ana Silva",
      date: "15 de Janeiro, 2025",
      readTime: "8 min",
      category: "IA & Marketing",
      image: "/api/placeholder/600/400",
      tags: ["DNA Criativo", "Performance Marketing", "IA", "ROI"],
      icon: Brain,
      featured: true,
      slug: "dna-criativo-performance-marketing-2025"
    },
    {
      id: 2,
      title: "Templates para Infoprodutos: 5 Padrões de Criativos que Convertem",
      excerpt: "Análise exclusiva dos elementos criativos que mais convertem no mercado de infoprodutos brasileiro, baseada em dados de mais de 10.000 campanhas.",
      author: "Carlos Rodriguez",
      date: "12 de Janeiro, 2025",
      readTime: "6 min",
      category: "Estratégia",
      image: "/api/placeholder/600/400",
      tags: ["Infoprodutos", "Conversão", "Padrões", "Brasil"],
      icon: Target,
      slug: "5-padroes-dna-infoprodutor-brasileiro"
    },
    {
      id: 3,
      title: "Machine Learning vs. Intuição: O Futuro da Criação Publicitária",
      excerpt: "Como algoritmos de IA estão superando a intuição humana na criação de anúncios que convertem, e o que isso significa para criadores de conteúdo.",
      author: "Marina Costa",
      date: "10 de Janeiro, 2025", 
      readTime: "10 min",
      category: "Tecnologia",
      image: "/api/placeholder/600/400",
      tags: ["Machine Learning", "IA", "Publicidade", "Criatividade"],
      icon: BarChart3,
      slug: "machine-learning-vs-intuicao-criacao-publicitaria"
    },
    {
      id: 4,
      title: "Case Study: Como uma Startup Aumentou 500% suas Vendas com DNA Criativo",
      excerpt: "História real de uma startup brasileira que utilizou nossa metodologia para identificar e replicar elementos vencedores em seus criativos.",
      author: "Dr. Ana Silva",
      date: "8 de Janeiro, 2025",
      readTime: "12 min",
      category: "Case Study",
      image: "/api/placeholder/600/400",
      tags: ["Case Study", "Startup", "Vendas", "Metodologia"],
      icon: TrendingUp,
      slug: "case-study-startup-500-vendas-dna-criativo"
    },
    {
      id: 5,
      title: "Psicologia das Cores no DNA Criativo: O que os Dados Revelam",
      excerpt: "Análise científica de como diferentes paletas de cores impactam conversões em criativos digitais, com insights baseados em milhões de impressões.",
      author: "Marina Costa",
      date: "5 de Janeiro, 2025",
      readTime: "7 min", 
      category: "Design & Psicologia",
      image: "/api/placeholder/600/400",
      tags: ["Psicologia", "Cores", "Design", "Conversão"],
      icon: Brain,
      slug: "psicologia-cores-dna-criativo-dados"
    },
    {
      id: 6,
      title: "O Futuro do E-commerce: IA Gerativa para Criação de Anúncios",
      excerpt: "Como a inteligência artificial generativa está transformando a velocidade e eficiência na criação de criativos para e-commerce no Brasil.",
      author: "Carlos Rodriguez", 
      date: "3 de Janeiro, 2025",
      readTime: "9 min",
      category: "E-commerce",
      image: "/api/placeholder/600/400",
      tags: ["E-commerce", "IA Generativa", "Anúncios", "Automação"],
      icon: Target,
      slug: "futuro-ecommerce-ia-gerativa-criacao-anuncios"
    }
  ];

  const categories = ["Todos", "IA & Marketing", "Estratégia", "Tecnologia", "Case Study", "Design & Psicologia", "E-commerce"];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email,
          subject: 'Newsletter Subscription',
          message: 'Subscribed to CopyHelix newsletter from blog page',
          priority: 'normal',
          source: 'newsletter_blog'
        }),
      });

      if (response.ok) {
        setSubscriptionSuccess(true);
        setEmail("");
        
        // Track newsletter subscription
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'newsletter_subscribe', {
            'event_category': 'engagement',
            'event_label': 'blog_newsletter',
            'value': 1
          });
        }

        // Reset success state after 3 seconds
        setTimeout(() => setSubscriptionSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

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
          <div className="text-center max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Blog
                <span className="text-primary"> CopyHelix</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Insights exclusivos sobre IA, performance marketing e o futuro da criatividade digital. 
                Baseado em dados reais de milhões de campanhas analisadas.
              </p>
            </motion.div>
          </div>

          {/* Search and Filter */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar artigos..."
                className="pl-10 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Featured Post */}
        <section className="container-wide pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Artigo em Destaque</h2>
            
            {filteredPosts.filter(post => post.featured).map((post) => {
              const Icon = post.icon;
              return (
                <div
                  key={post.id}
                  className="grid lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-primary">{post.category}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h3>
                    <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.readTime} de leitura</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Button 
                      className="btn-primary"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      Ler Artigo Completo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-border flex items-center justify-center">
                      <Icon className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container-wide pb-16">
          <motion.h2 
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Todos os Artigos
          </motion.h2>
          
          {filteredPosts.filter(post => !post.featured).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum artigo encontrado para "{searchQuery}" na categoria "{activeCategory}".
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Todos");
                }}
                className="mt-4"
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(post => !post.featured).map((post, index) => {
              const Icon = post.icon;
              return (
                <motion.article
                  key={post.id}
                  className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 border-b border-border flex items-center justify-center">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">{post.category}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-background border border-border rounded text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      Ler mais
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </motion.article>
              );
            })}
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="container-wide pb-16">
          <motion.div
            className="text-center p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Receba insights exclusivos
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Seja o primeiro a receber nossas análises mais recentes sobre DNA criativo, 
              tendências de IA e estratégias de performance marketing.
            </p>
            <form onSubmit={handleNewsletterSubscribe} className="max-w-md mx-auto flex gap-4">
              <Input 
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubscribing}
              />
              <Button 
                type="submit"
                className="btn-primary"
                disabled={isSubscribing || !email}
              >
                {isSubscribing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : subscriptionSuccess ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  "Assinar"
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              Sem spam. Cancele a qualquer momento.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Blog;