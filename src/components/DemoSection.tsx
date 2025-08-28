import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, CheckCircle, Mail, Phone, User, Loader2 } from "lucide-react";
import { useViewportSize, useIsTouchDevice } from "@/hooks/use-mobile";
import { trackWaitlistSignup } from "@/lib/analytics-tracking";

const DemoSection = () => {
  const { category } = useViewportSize();
  const isTouch = useIsTouchDevice();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    main_challenge: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Salvar no banco de dados via API
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          main_challenge: formData.main_challenge,
          subject: `Acesso Beta CopyHelix - ${formData.name}`,
          message: `Nome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone || 'Não informado'}\nFunção: ${formData.role}\nDesafio: ${formData.main_challenge}`,
          priority: 'high',
          source: 'beta_form'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar solicitação');
      }

      // Track waitlist signup with simplified data
      trackWaitlistSignup({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        main_challenge: formData.main_challenge,
        phone: formData.phone
      });

      // Store user data for waitlist page
      localStorage.setItem('copyhelix_user_name', formData.name);
      localStorage.setItem('copyhelix_user_email', formData.email);
      
      setIsSuccess(true);
      
      // Redirect to waitlist page after brief delay
      setTimeout(() => {
        window.location.href = `/beta-waitlist?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
      }, 2000);

    } catch (error) {
      setErrorMessage("Erro ao enviar solicitação. Tente novamente ou entre em contato diretamente.");
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Sequenciamento genético do seu criativo vencedor",
    "Análise genética completa do seu criativo em tempo real",
    "Mapeamento completo do DNA de sucesso", 
    "Desconto especial exclusivo para os primeiros usuários"
  ];

  // Form options - Simplified
  const roleOptions = [
    { value: "", label: "Selecione sua função" },
    { value: "gestor-trafego", label: "Gestor de Tráfego" },
    { value: "social-media", label: "Social Media/Creator" },
    { value: "diretor-marketing", label: "Diretor de Marketing" },
    { value: "ceo-founder", label: "CEO/Founder" },
    { value: "infoprodutor", label: "Infoprodutor" },
    { value: "freelancer", label: "Freelancer" }
  ];

  const challengeOptions = [
    { value: "", label: "Selecione seu maior desafio" },
    { value: "falta-variacoes", label: "Falta de variações criativas" },
    { value: "criativos-queimam", label: "Criativos queimam rápido" },
    { value: "elementos-funcionam", label: "Não sei quais elementos funcionam" },
    { value: "tempo-versoes", label: "Tempo gasto criando versões" },
    { value: "custo-alto", label: "Custo alto de produção" }
  ];

  return (
    <section id="contact" className={`relative overflow-hidden ${
      category === 'mobile-small' ? 'py-12' : category?.includes('mobile') ? 'py-14' : 'py-16 md:py-20'
    }`}>
      <div className={`container-wide ${
        category === 'mobile-small' ? 'px-3' : ''
      }`}>
        <div className={`grid items-start ${
          category?.includes('mobile') ? 'grid-cols-1 gap-6' : 'lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center'
        }`}>
          {/* Left Content */}
          <div className={`w-full ${
            category?.includes('mobile') 
              ? `text-center ${
                  category === 'mobile-small' ? 'space-y-3 px-3' : 'space-y-4 px-2'
                }` 
              : 'space-y-8'
          }`}>
            <div className={`${
              category === 'mobile-small' 
                ? 'space-y-3 px-1' 
                : category?.includes('mobile') 
                  ? 'space-y-4 px-1' 
                  : 'space-y-6'
            }`}>
              <div className={`inline-flex items-center justify-center rounded-full bg-accent/10 border border-accent/20 ${
                category === 'mobile-small' 
                  ? 'p-2.5 mx-auto' 
                  : category?.includes('mobile') 
                    ? 'p-3 mx-auto' 
                    : 'p-3'
              }`}>
                <Calendar className={`text-accent ${
                  category === 'mobile-small' ? 'w-6 h-6' : 'w-8 h-8'
                }`} />
              </div>
              
              <h2 className={`font-bold text-foreground leading-tight ${
                category === 'mobile-small' 
                  ? 'text-xl px-2 leading-[1.2]' 
                  : category?.includes('mobile') 
                    ? 'text-2xl px-2' 
                    : 'text-3xl sm:text-4xl md:text-5xl'
              }`}>
                Decodifique o DNA dos seus Criativos
              </h2>
              
              <p className={`text-muted-foreground leading-relaxed ${
                category === 'mobile-small' 
                  ? 'text-sm px-2' 
                  : category?.includes('mobile') 
                    ? 'text-base px-2' 
                    : 'text-lg sm:text-xl'
              }`}>
                Transforme seus melhores criativos em fórmulas replicáveis de sucesso
              </p>
            </div>

            {/* Benefits - Simplified */}
            <div className={`space-y-3 ${
              category === 'mobile-small' ? 'px-3' : category?.includes('mobile') ? 'px-4' : ''
            }`}>
              <div className="flex items-center justify-center space-x-2 text-sm text-primary font-semibold">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-center">Acesso prioritário ao beta privado</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-primary font-semibold">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-center">Desconto exclusivo de 50% garantido</span>
              </div>
            </div>

            {/* Pre-sale Focus - Simplified on mobile */}
            <div className={`rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 text-center mx-auto ${
              category === 'mobile-small' 
                ? 'p-3 max-w-xs' 
                : category?.includes('mobile') 
                  ? 'p-4 max-w-sm' 
                  : 'p-6 max-w-md'
            }`}>
              <div className={`flex items-center justify-center space-x-2 ${
                category === 'mobile-small' ? 'mb-1.5' : 'mb-2'
              }`}>
                <span className={`text-primary font-bold ${
                  category === 'mobile-small' ? 'text-xs' : 'text-sm'
                }`}>
                  🎆 ACESSO LIMITADO
                </span>
              </div>
              <p className={`text-foreground font-medium leading-relaxed ${
                category === 'mobile-small' ? 'text-xs' : 'text-sm'
              }`}>
                Primeiros 150 usuários ganham <span className="text-primary font-bold">acesso prioritário com 50% OFF</span>.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className={`glass-card w-full max-w-full ${
            category === 'mobile-small' 
              ? 'text-center mx-1' 
              : category?.includes('mobile') 
                ? 'text-center mx-2' 
                : ''
          }`}>
            <div className={`${
              category === 'mobile-small' 
                ? 'mb-5 px-1' 
                : category?.includes('mobile') 
                  ? 'mb-6 px-2' 
                  : 'mb-8'
            }`}>
              <h3 className={`font-bold text-foreground ${
                category === 'mobile-small' 
                  ? 'text-base mb-1.5' 
                  : category?.includes('mobile') 
                    ? 'text-lg mb-2' 
                    : 'text-2xl mb-2'
              }`}>
                🧬 Laboratório Genético Personalizado
              </h3>
              <p className={`text-muted-foreground ${
                category === 'mobile-small' ? 'text-xs' : 'text-base'
              }`}>
                Garantir acesso prioritário ao beta + desconto exclusivo
              </p>
            </div>

            {/* Success Message - Redirects to waitlist */}
            {isSuccess && (
              <div className="mb-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Redirecionando para sua área VIP...</p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-800 dark:text-red-200">{errorMessage}</p>
              </div>
            )}

            <form 
              onSubmit={handleSubmit} 
              className={`${
                category === 'mobile-small' ? 'space-y-3' : 'space-y-5'
              } ${
                category?.includes('mobile') ? 'text-left' : ''
              }`}
            >
              <div className={`grid grid-cols-1 ${
                category === 'mobile-small' ? 'gap-3' : 'gap-4'
              }`}>
                {/* Campo 1: Nome completo */}
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground
                    ${focusedField === 'name' ? 'text-primary' : ''}`} />
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`pl-10 bg-background border-border focus:border-primary transition-all duration-200
                      ${focusedField === 'name' ? 'ring-2 ring-primary/20' : ''}
                      ${category === 'mobile-small' ? 'h-11 text-sm' : 'h-12'}`}
                    required
                    autoComplete="name"
                    autoCapitalize="words"
                  />
                </div>

                {/* Campo 2: Email corporativo */}
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground
                    ${focusedField === 'email' ? 'text-primary' : ''}`} />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email corporativo"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`pl-10 bg-background border-border focus:border-primary transition-all duration-200
                      ${focusedField === 'email' ? 'ring-2 ring-primary/20' : ''}
                      ${category === 'mobile-small' ? 'h-11 text-sm' : 'h-12'}`}
                    required
                    autoComplete="email"
                    autoCapitalize="none"
                    inputMode="email"
                    spellCheck="false"
                  />
                </div>

                {/* Campo 3: WhatsApp/Telefone (opcional) */}
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground
                    ${focusedField === 'phone' ? 'text-primary' : ''}`} />
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="(11) 99999-9999 - WhatsApp preferencial"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={`pl-10 bg-background border-border focus:border-primary transition-all duration-200
                      ${focusedField === 'phone' ? 'ring-2 ring-primary/20' : ''}
                      ${category === 'mobile-small' ? 'h-11 text-sm' : 'h-12'}`}
                    autoComplete="tel-national"
                    inputMode="tel"
                    pattern="[0-9\s\(\)\-\+]*"
                  />
                </div>

                {/* Campo 4: Função principal (select) */}
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('role')}
                    onBlur={handleBlur}
                    className={`w-full px-3 bg-background border border-border rounded-md focus:border-primary transition-all duration-200
                      ${focusedField === 'role' ? 'ring-2 ring-primary/20' : ''}
                      ${!formData.role ? 'text-muted-foreground' : 'text-foreground'}
                      ${category === 'mobile-small' ? 'h-11 text-sm' : 'h-12'}`}
                    required
                  >
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campo 5: Maior desafio (select) */}
                <div className="relative">
                  <select
                    id="main_challenge"
                    name="main_challenge"
                    value={formData.main_challenge}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('main_challenge')}
                    onBlur={handleBlur}
                    className={`w-full px-3 bg-background border border-border rounded-md focus:border-primary transition-all duration-200
                      ${focusedField === 'main_challenge' ? 'ring-2 ring-primary/20' : ''}
                      ${!formData.main_challenge ? 'text-muted-foreground' : 'text-foreground'}
                      ${category === 'mobile-small' ? 'h-11 text-sm' : 'h-12'}`}
                    required
                  >
                    {challengeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button 
                type="submit" 
                className={`btn-primary w-full group touch-target transition-all duration-300 whitespace-nowrap
                  ${category === 'mobile-small' 
                    ? 'h-11 text-sm px-3 min-h-[44px]' 
                    : category?.includes('mobile') 
                      ? 'h-12 text-sm px-4 min-h-[48px]' 
                      : 'h-12 text-base px-6'
                  }
                  ${isTouch ? 'active:scale-95' : ''}
                  ${isLoading ? 'opacity-80' : ''}`}
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {category === 'mobile-small' ? 'Enviando...' : 'Enviando solicitação...'}
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {category === 'mobile-small' ? 'Enviado!' : 'Enviado com Sucesso!'}
                  </>
                ) : (
                  <>
                    🚀 GARANTIR ACESSO BETA
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-200
                      ${isTouch ? '' : 'group-hover:translate-x-1'}`} />
                  </>
                )}
              </Button>

              <p className={`text-muted-foreground text-center leading-relaxed ${
                category === 'mobile-small' ? 'text-xs px-1' : category?.includes('mobile') ? 'text-xs px-2' : 'text-xs'
              }`}>
                Ao enviar seus dados, você concorda com a nossa{" "}
                <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a>{" "}
                e os <a href="/termos" className="text-primary hover:underline">Termos de Uso</a>.
              </p>
            </form>

            <div className={`border-t border-border/30 ${
              category === 'mobile-small' 
                ? 'pt-4 mt-5' 
                : category?.includes('mobile') 
                  ? 'pt-6 mt-6' 
                  : 'pt-6 mt-8'
            }`}>
              <div className={`text-center ${
                category === 'mobile-small' ? 'space-y-2' : 'space-y-3'
              }`}>
                <p className={`text-muted-foreground ${
                  category === 'mobile-small' ? 'text-xs' : 'text-sm'
                }`}>
                  Beta disponível em
                </p>
                <div className={`px-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 ${
                  category === 'mobile-small' ? 'py-2' : 'py-3'
                }`}>
                  <p className={`font-bold text-primary ${
                    category === 'mobile-small' ? 'text-lg' : 'text-2xl'
                  }`}>
                    Outubro 2025
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Acesso prioritário garantido
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;