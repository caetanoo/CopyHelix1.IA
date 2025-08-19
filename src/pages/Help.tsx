import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  ChevronDown, 
  ChevronRight,
  HelpCircle,
  BookOpen,
  Send,
  MapPin
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "normal"
  });

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
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

  const faqData = [
    {
      category: "Primeiros Passos",
      questions: [
        {
          question: "O que é o CopyHelix.ai e como funciona?",
          answer: "CopyHelix.ai é uma plataforma de inteligência artificial que analisa o 'DNA' dos criativos mais bem-sucedidos do mercado digital. Nossa IA identifica padrões visuais, textuais e psicológicos que fazem criativos converterem, permitindo replicar esse sucesso em suas campanhas."
        },
        {
          question: "Como posso começar a usar a plataforma?",
          answer: "Para começar, solicite uma demonstração gratuita através do nosso formulário. Nossa equipe irá configurar sua conta e fornecer treinamento personalizado sobre como usar todas as funcionalidades da plataforma."
        },
        {
          question: "Preciso ter conhecimento técnico para usar?",
          answer: "Não! CopyHelix.ai foi projetado para ser intuitivo. Nosso sistema fornece análises e recomendações claras em linguagem simples, permitindo que qualquer profissional de marketing aproveite o poder da IA."
        }
      ]
    },
    {
      category: "Funcionalidades",
      questions: [
        {
          question: "Que tipos de criativos posso analisar?",
          answer: "Nossa plataforma analisa imagens estáticas, vídeos, copy de anúncios, páginas de vendas e landing pages. Suportamos todos os principais formatos usados em Facebook Ads, Google Ads, Instagram, TikTok e outras plataformas."
        },
        {
          question: "Como a IA identifica padrões vencedores?",
          answer: "Utilizamos machine learning avançado para analisar milhares de criativos de alta performance. A IA identifica elementos como cores dominantes, posicionamento de texto, expressões faciais, estrutura de copy e outros fatores que correlacionam com altas taxas de conversão."
        },
        {
          question: "Posso gerar variações de criativos automaticamente?",
          answer: "Sim! Com base na análise do DNA criativo, nossa plataforma sugere e pode gerar variações otimizadas dos seus melhores criativos, mantendo os elementos que fazem eles converterem."
        }
      ]
    },
    {
      category: "Preços e Planos",
      questions: [
        {
          question: "Qual é o investimento para usar o CopyHelix.ai?",
          answer: "Oferecemos planos flexíveis adaptados ao tamanho da sua operação. Entre em contato conosco para uma proposta personalizada baseada no seu volume de criativos e necessidades específicas."
        },
        {
          question: "Existe período de teste gratuito?",
          answer: "Sim! Oferecemos uma demonstração gratuita completa onde você pode testar nossa plataforma com seus próprios criativos e ver os resultados em primeira mão."
        },
        {
          question: "Posso cancelar a qualquer momento?",
          answer: "Sim, nossos contratos são flexíveis e você pode cancelar ou ajustar seu plano conforme necessário. Nosso foco é no seu sucesso e satisfação."
        }
      ]
    },
    {
      category: "Suporte Técnico",
      questions: [
        {
          question: "Como posso integrar com minhas ferramentas atuais?",
          answer: "CopyHelix.ai oferece integrações com principais plataformas de ads e ferramentas de marketing. Nossa equipe técnica auxilia na configuração e integração com seu workflow atual."
        },
        {
          question: "Os dados dos meus criativos ficam seguros?",
          answer: "Absolutamente! Utilizamos criptografia de ponta e seguimos rigorosos protocolos de segurança. Seus dados ficam completamente privados e protegidos, com conformidade total com LGPD."
        },
        {
          question: "Que tipo de suporte vocês oferecem?",
          answer: "Oferecemos suporte completo incluindo chat ao vivo, suporte por email, treinamentos personalizados e account manager dedicado para clientes enterprise."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: "Email",
      description: "contato@copyhelix.ai",
      action: "Enviar Email",
      available: true,
      hours: "Resposta em até 2h"
    },
    {
      icon: Phone,
      title: "WhatsApp",
      description: "+55 (19) 99186-8057",
      action: "Chamar no WhatsApp",
      available: true,
      hours: "Seg-Sex: 9h-18h"
    }
  ];

  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formatar mensagem para WhatsApp
    const whatsappMessage = `
🔥 *Nova Mensagem - CopyHelix.ai*

👤 *Nome:* ${contactForm.name}
📧 *Email:* ${contactForm.email}
📋 *Assunto:* ${contactForm.subject}
🚨 *Prioridade:* ${getPriorityLabel(contactForm.priority)}

💬 *Mensagem:*
${contactForm.message}

⏰ *Enviado em:* ${new Date().toLocaleString('pt-BR')}
    `.trim();

    // Número do WhatsApp (substitua pelo seu número)
    const whatsappNumber = "5519991868057"; // Seu número sem espaços/símbolos
    
    // URL do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset do formulário após envio
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "normal"
    });
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return '🟢 Baixa';
      case 'normal': return '🟡 Normal';
      case 'high': return '🟠 Alta';
      case 'urgent': return '🔴 Urgente';
      default: return priority;
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
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center mb-6">
                <HelpCircle className="w-12 h-12 text-primary mr-4" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  Central de 
                  <span className="text-primary"> Ajuda</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8">
                Encontre respostas rápidas, entre em contato conosco ou explore nossos recursos de suporte
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Pesquisar na central de ajuda..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Options */}
        <section id="contato" className="container-wide py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">Fale Conosco</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Escolha a forma de contato que preferir. Nossa equipe está pronta para ajudar!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{option.title}</CardTitle>
                        <CardDescription className="text-base">
                          {option.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="flex items-center justify-center mb-4">
                          <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                          <span className="text-sm text-muted-foreground">{option.hours}</span>
                        </div>
                        <Button 
                          className="w-full btn-primary"
                          disabled={!option.available}
                          onClick={() => {
                            if (option.title === "WhatsApp") {
                              const message = "Olá! Gostaria de saber mais sobre o CopyHelix.ai 👋";
                              window.open(`https://wa.me/5519991868057?text=${encodeURIComponent(message)}`, '_blank');
                            } else if (option.title === "Email") {
                              window.open('mailto:contato@copyhelix.ai?subject=Contato - CopyHelix.ai', '_blank');
                            }
                          }}
                        >
                          {option.action}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="w-5 h-5 mr-2 text-primary" />
                    Envie uma Mensagem
                  </CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e retornaremos em breve
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nome *</label>
                        <Input
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Assunto *</label>
                      <Input
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        placeholder="Sobre o que você gostaria de falar?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Prioridade</label>
                      <select 
                        value={contactForm.priority}
                        onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      >
                        <option value="low">Baixa - Dúvida geral</option>
                        <option value="normal">Normal - Suporte</option>
                        <option value="high">Alta - Problema técnico</option>
                        <option value="urgent">Urgente - Sistema parado</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Mensagem *</label>
                      <Textarea
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Descreva detalhadamente sua dúvida ou problema..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full btn-primary">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="container-wide py-16 bg-card/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold">Perguntas Frequentes</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Respostas para as dúvidas mais comuns sobre o CopyHelix.ai
              </p>
            </div>

            {filteredFaq.length > 0 ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {filteredFaq.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="flex items-center mb-6">
                      <Badge variant="outline" className="text-sm font-medium">
                        {category.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        const isExpanded = expandedFaq === globalIndex;
                        
                        return (
                          <motion.div
                            key={globalIndex}
                            className="border border-border rounded-lg overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: faqIndex * 0.1 }}
                          >
                            <button
                              onClick={() => setExpandedFaq(isExpanded ? null : globalIndex)}
                              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-medium pr-4">{faq.question}</span>
                              {isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              )}
                            </button>
                            
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="px-6 pb-4"
                              >
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">Nenhum resultado encontrado</h3>
                <p className="text-muted-foreground">
                  Tente pesquisar por outros termos ou entre em contato conosco
                </p>
              </div>
            ) : null}
          </motion.div>
        </section>

        {/* Additional Resources */}
        <section className="container-wide py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">Recursos Adicionais</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Explore mais conteúdos para maximizar seu uso do CopyHelix.ai
            </p>
            
            <div className="max-w-md mx-auto">
              <Card className="text-center hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle>Blog & Estudos</CardTitle>
                  <CardDescription>
                    Cases de sucesso, insights sobre marketing digital e novidades da IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/blog'}
                  >
                    Ler Blog
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Contact Info */}
        <section className="container-wide py-16 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Informações de Contato</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">CopyHelix.ai</p>
                    <p className="text-muted-foreground">
                      São Paulo, SP<br />
                      Brasil
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Horário de Atendimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta:</span>
                    <span className="font-medium">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span className="font-medium">9h às 12h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span className="text-muted-foreground">Fechado</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      Suporte de emergência 24/7 para clientes enterprise
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Help;