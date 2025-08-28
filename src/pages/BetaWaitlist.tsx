import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useViewportSize } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  CheckCircle, 
  Users, 
  Crown, 
  Gift, 
  TrendingUp, 
  Calendar,
  MessageCircle,
  Star,
  ArrowRight,
  Copy,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EmailSequenceManager from "@/components/EmailSequenceManager";
import { trackWhatsAppContact, trackCTAClick } from "@/lib/analytics-tracking";

const BetaWaitlist = () => {
  const { category } = useViewportSize();
  const [currentWaitlistPosition] = useState(Math.floor(Math.random() * 50) + 23); // Simulated position 23-72
  const [totalWaitlist] = useState(150);
  const [referralCode] = useState(`HELIX${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  const [emailCopied, setEmailCopied] = useState(false);
  const [whatsappJoined, setWhatsappJoined] = useState(false);
  
  // SEO optimization
  useSEO({
    title: "Lista de Espera Beta - CopyHelix.ai | Acesso Prioritário Garantido",
    description: "Você está na lista de espera beta do CopyHelix.ai! Acesso prioritário, desconto especial e benefícios exclusivos para early adopters.",
    keywords: "copyhelix beta, lista espera, early access, desconto exclusivo, beta tester"
  });

  // Get user data from localStorage (if redirected from form)
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
    company?: string;
  }>({});

  useEffect(() => {
    // Try to get user data from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || localStorage.getItem('copyhelix_user_name') || '';
    const email = urlParams.get('email') || localStorage.getItem('copyhelix_user_email') || '';
    const company = urlParams.get('company') || localStorage.getItem('copyhelix_user_company') || '';
    
    setUserData({ name, email, company });
    
    // Clear URL params for cleaner experience
    if (urlParams.has('name') || urlParams.has('email') || urlParams.has('company')) {
      window.history.replaceState({}, '', '/beta-waitlist');
    }
  }, []);

  const copyReferralLink = () => {
    // Track referral link copy action
    trackCTAClick({
      button_text: 'Copy Referral Link',
      position: 'waitlist_referral',
      destination: 'clipboard'
    });
    
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const joinWhatsAppGroup = () => {
    // Track WhatsApp contact from waitlist page
    trackWhatsAppContact({
      source: 'waitlist_founder_contact',
      device_type: 'waitlist_page',
      user_segment: 'beta_user'
    });
    
    setWhatsappJoined(true);
    // Direct contact with founder
    window.open('https://wa.me/5519999856061?text=Gostaria%20de%20Saber%20mais%20sobre%20o%20Copyhelix.IA!', '_blank');
  };

  const developmentMilestones = [
    { phase: "Validação de Mercado", status: "current", date: "Agosto 2025" },
    { phase: "Core Feature MVP", status: "upcoming", date: "Setembro 2025" },
    { phase: "Beta Exclusivo", status: "upcoming", date: "Outubro 2025" },
    { phase: "Lançamento Oficial", status: "upcoming", date: "Novembro 2025" }
  ];

  const exclusiveBenefits = [
    {
      icon: Crown,
      title: "Acesso VIP Exclusivo",
      description: "50% de desconto especial + funcionalidades premium gratuitas",
      value: "R$ 2.400/ano de economia"
    },
    {
      icon: Users,
      title: "Comunidade Exclusiva",
      description: "Grupo privado no WhatsApp com outros early adopters e fundadores",
      value: "Networking premium"
    },
    {
      icon: Gift,
      title: "Análise Gratuita",
      description: "1 análise completa do DNA criativo do seu melhor ad",
      value: "Consultoria premium"
    },
    {
      icon: TrendingUp,
      title: "Influência no Produto",
      description: "Suas sugestões moldam o desenvolvimento da plataforma",
      value: "Produto personalizado"
    }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container-wide">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/30">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              
              <h1 className={`font-bold text-foreground mb-4 ${
                category?.includes('mobile') ? 'text-3xl' : 'text-5xl md:text-6xl'
              }`}>
                Você está na Lista VIP! 🧬
              </h1>
              
              {userData.name && (
                <p className={`text-primary font-semibold mb-4 ${
                  category?.includes('mobile') ? 'text-lg' : 'text-2xl'
                }`}>
                  {userData.name}, você garantiu acesso prioritário!
                </p>
              )}
              
              <p className={`text-muted-foreground max-w-2xl mx-auto ${
                category?.includes('mobile') ? 'text-base px-4' : 'text-xl'
              }`}>
                Você não apenas validou nossa proposta - você se tornou parte da história do CopyHelix.ai
              </p>
            </motion.div>

            {/* Position in Waitlist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              <Card className="glass-card border-primary/30">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="text-lg font-semibold text-foreground">Sua Posição na Fila</span>
                  </div>
                  
                  <div className="text-4xl font-bold text-primary mb-2">
                    #{currentWaitlistPosition}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    de {totalWaitlist} beta testers selecionados
                  </p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${((totalWaitlist - currentWaitlistPosition) / totalWaitlist) * 100}%` }}
                    />
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Quanto menor o número, maior a prioridade
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Development Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className={`font-bold text-foreground mb-4 ${
                category?.includes('mobile') ? 'text-2xl' : 'text-3xl'
              }`}>
                Timeline de Desenvolvimento
              </h2>
              <p className="text-muted-foreground">
                Atualmente em validação de mercado → Próximo mês iniciamos o desenvolvimento
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className={`grid gap-4 ${category?.includes('mobile') ? 'grid-cols-1' : 'grid-cols-4'}`}>
                {developmentMilestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Card className={`glass-card relative ${
                      milestone.status === 'complete' ? 'border-primary/50' :
                      milestone.status === 'current' ? 'border-secondary/50 bg-secondary/5' :
                      'border-border/50'
                    }`}>
                      <CardContent className="p-4 text-center">
                        <div className="mb-3">
                          {milestone.status === 'complete' && (
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto">
                              <CheckCircle className="w-5 h-5 text-background" />
                            </div>
                          )}
                          {milestone.status === 'current' && (
                            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mx-auto animate-pulse">
                              <div className="w-3 h-3 bg-background rounded-full" />
                            </div>
                          )}
                          {milestone.status === 'upcoming' && (
                            <div className="w-8 h-8 bg-muted rounded-full mx-auto" />
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {milestone.phase}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {milestone.date}
                        </p>
                        
                        {milestone.status === 'current' && (
                          <Badge className="mt-2 text-xs bg-secondary/20 text-secondary">
                            Em Andamento
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Exclusive Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className={`font-bold text-foreground mb-4 ${
                category?.includes('mobile') ? 'text-2xl' : 'text-3xl'
              }`}>
                Seus Benefícios de Fundador
              </h2>
              <p className="text-muted-foreground">
                Valor total estimado: <span className="text-primary font-bold">R$ 3.000+</span>
              </p>
            </div>

            <div className={`grid gap-6 max-w-5xl mx-auto ${
              category?.includes('mobile') ? 'grid-cols-1' : 'grid-cols-2'
            }`}>
              {exclusiveBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <Card className="glass-card border-accent/30 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {benefit.description}
                          </p>
                          <Badge className="text-xs bg-accent/20 text-accent">
                            {benefit.value}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Community Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className={`font-bold text-foreground mb-4 ${
                category?.includes('mobile') ? 'text-2xl' : 'text-3xl'
              }`}>
                Próximos Passos
              </h2>
              <p className="text-muted-foreground">
                Maximize seus benefícios e acelere o desenvolvimento
              </p>
            </div>

            <div className={`grid gap-6 max-w-4xl mx-auto ${
              category?.includes('mobile') ? 'grid-cols-1' : 'grid-cols-2'
            }`}>
              {/* WhatsApp Community */}
              <Card className="glass-card border-primary/30">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Grupo VIP WhatsApp
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Networking exclusivo + updates em primeira mão + influência direta no produto
                  </p>
                  <Button 
                    onClick={joinWhatsAppGroup}
                    className="btn-primary w-full"
                    disabled={whatsappJoined}
                  >
                    {whatsappJoined ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Participando!
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Falar com Founder
                      </>
                    )}
                  </Button>
                  {whatsappJoined && (
                    <p className="text-xs text-primary mt-2">
                      Bem-vindo(a) à elite beta! 🚀
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Referral Program */}
              <Card className="glass-card border-secondary/30">
                <CardContent className="p-6 text-center">
                  <Gift className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Programa de Indicações
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Cada indicação sobe 5 posições na fila + R$ 50 de crédito extra
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input 
                        value={`${window.location.origin}/?ref=${referralCode}`}
                        readOnly
                        className="text-xs"
                      />
                      <Button
                        onClick={copyReferralLink}
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                      >
                        {emailCopied ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Seu código: <span className="font-mono text-primary">{referralCode}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Email Sequence Manager */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className={`font-bold text-foreground mb-4 ${
                category?.includes('mobile') ? 'text-2xl' : 'text-3xl'
              }`}>
                Mantenha-se Atualizado
              </h2>
              <p className="text-muted-foreground">
                Acompanhe cada passo do desenvolvimento
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <EmailSequenceManager 
                userEmail={userData.email}
                userName={userData.name}
                position={currentWaitlistPosition}
              />
            </div>
          </motion.div>

          {/* Expectations Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <Card className="glass-card border-primary/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-4">
                  O que esperar nos próximos meses
                </h3>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-background font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Agosto 2025</p>
                      <p className="text-sm text-muted-foreground">Validação de mercado + pesquisa de features prioritárias</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-background font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Setembro 2025</p>
                      <p className="text-sm text-muted-foreground">Desenvolvimento da core feature + updates semanais</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-background font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Outubro 2025</p>
                      <p className="text-sm text-muted-foreground">Acesso beta exclusivo + onboarding personalizado</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    Tem dúvidas? Fale diretamente com o fundador:{" "}
                    <a href="mailto:caetano@copyhelix.ai" className="text-primary hover:underline">
                      caetano@copyhelix.ai
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default BetaWaitlist;