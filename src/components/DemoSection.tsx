import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Calendar, CheckCircle, Mail, Phone, User, Loader2, Briefcase, Target, DollarSign } from "lucide-react";
import { useViewportSize, useIsTouchDevice } from "@/hooks/use-mobile";
import TransparencyNotice from "@/components/TransparencyNotice";

const DemoSection = () => {
  const { category } = useViewportSize();
  const isTouch = useIsTouchDevice();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    company_size: "",
    main_challenge: "",
    monthly_investment: "",
    pricing_expectation: "",
    current_solution: "",
    acquisition_channel: "",
    urgency: "",
    feedback: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(0);
  const [nextFieldToFocus, setNextFieldToFocus] = useState<string | null>(null);

  const validateField = (name: string, value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : '';
      case 'email':
        return !emailRegex.test(value) ? 'Email inválido' : '';
      case 'company':
        return value.length < 2 ? 'Nome da empresa é obrigatório' : '';
      default:
        return '';
    }
  };

  const calculateProgress = () => {
    const requiredFields = ['name', 'email', 'company', 'role', 'company_size', 'main_challenge', 'monthly_investment', 'pricing_expectation'];
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData].trim().length > 0);
    return (filledFields.length / requiredFields.length) * 100;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update progress
    setTimeout(() => {
      const newProgress = calculateProgress();
      setFormProgress(newProgress);
    }, 100);
    
    // Clear errors immediately when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-focus next field on mobile for better flow
    if (category?.includes('mobile') && value.trim().length > 0) {
      const fieldOrder = ['name', 'email', 'company', 'role', 'company_size', 'main_challenge', 'monthly_investment', 'pricing_expectation', 'phone'];
      const currentIndex = fieldOrder.indexOf(name);
      if (currentIndex >= 0 && currentIndex < fieldOrder.length - 1) {
        // Validate current field before auto-advancing
        const error = validateField(name, value);
        if (!error) {
          setNextFieldToFocus(fieldOrder[currentIndex + 1]);
        }
      }
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusedField(null);
    
    // Validate on blur for better mobile performance
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Auto-focus next field after slight delay
    if (nextFieldToFocus && category?.includes('mobile')) {
      setTimeout(() => {
        const nextField = document.getElementById(nextFieldToFocus);
        if (nextField) {
          nextField.focus();
          // Add haptic feedback for smooth progression
          if (navigator.vibrate) {
            navigator.vibrate(30);
          }
        }
        setNextFieldToFocus(null);
      }, 100);
    }
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
          company: formData.company,
          phone: formData.phone,
          role: formData.role,
          company_size: formData.company_size,
          main_challenge: formData.main_challenge,
          monthly_investment: formData.monthly_investment,
          pricing_expectation: formData.pricing_expectation,
          current_solution: formData.current_solution,
          feedback: formData.feedback,
          subject: `Solicitação de Decodificação DNA - ${formData.company}`,
          message: `Empresa: ${formData.company}\nTelefone: ${formData.phone || 'Não informado'}`,
          priority: 'high',
          source: 'dna_form'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar solicitação');
      }

      // Track conversion
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'event_category': 'engagement',
          'event_label': 'dna_request',
          'value': 1
        });
      }

      // Facebook Pixel
      if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {
          content_name: 'DNA Decoding Request',
          content_category: 'form_submission'
        });
      }

      // Store user data for waitlist page
      localStorage.setItem('copyhelix_user_name', formData.name);
      localStorage.setItem('copyhelix_user_email', formData.email);
      localStorage.setItem('copyhelix_user_company', formData.company);
      
      setIsSuccess(true);
      
      // Redirect to beta waitlist page after brief delay
      setTimeout(() => {
        window.location.href = `/beta-waitlist?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&company=${encodeURIComponent(formData.company)}`;
      }, 1500);

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
    "Desconto especial vitalício para os primeiros usuários"
  ];

  // Form options
  const roleOptions = [
    { value: "", label: "Selecione sua função" },
    { value: "gestor-trafego", label: "Gestor de Tráfego/Performance" },
    { value: "social-media", label: "Social Media/Content Creator" },
    { value: "diretor-marketing", label: "Diretor de Marketing" },
    { value: "ceo-founder", label: "CEO/Founder" },
    { value: "infoprodutor", label: "Infoprodutor" },
    { value: "freelancer", label: "Freelancer de Marketing" },
    { value: "analista", label: "Analista de Marketing" },
    { value: "designer", label: "Designer/Creative" },
    { value: "outro", label: "Outro" }
  ];

  const companySizeOptions = [
    { value: "", label: "Selecione o tamanho" },
    { value: "freelancer", label: "Freelancer/Autônomo" },
    { value: "agencia-pequena", label: "Agência pequena (até 10 clientes)" },
    { value: "agencia-media", label: "Agência média (11-50 clientes)" },
    { value: "agencia-grande", label: "Agência grande (50+ clientes)" },
    { value: "empresa", label: "Empresa/E-commerce" },
    { value: "startup", label: "Startup" }
  ];

  const challengeOptions = [
    { value: "", label: "Selecione seu maior desafio" },
    { value: "falta-ideias", label: "Falta de ideias para variações" },
    { value: "tempo-gasto", label: "Tempo gasto criando múltiplas versões" },
    { value: "elementos-funcionam", label: "Não sei quais elementos funcionam melhor" },
    { value: "criativos-queimam", label: "Criativos que 'queimam' muito rápido" },
    { value: "insights-dados", label: "Falta de insights baseados em dados" },
    { value: "custo-alto", label: "Custo alto de produção criativa" },
    { value: "outro", label: "Outro" }
  ];

  const investmentOptions = [
    { value: "", label: "Selecione a faixa de investimento" },
    { value: "ate-5k", label: "Até R$ 5.000" },
    { value: "5k-15k", label: "R$ 5.001 - R$ 15.000" },
    { value: "15k-50k", label: "R$ 15.001 - R$ 50.000" },
    { value: "50k-100k", label: "R$ 50.001 - R$ 100.000" },
    { value: "mais-100k", label: "Mais de R$ 100.000" },
    { value: "nao-informar", label: "Prefiro não informar" }
  ];

  const pricingOptions = [
    { value: "", label: "Qual seria um preço justo?" },
    { value: "ate-97", label: "Até R$ 97/mês" },
    { value: "97-297", label: "R$ 97 - R$ 297/mês" },
    { value: "297-597", label: "R$ 297 - R$ 597/mês" },
    { value: "597-997", label: "R$ 597 - R$ 997/mês" },
    { value: "mais-997", label: "Mais de R$ 997/mês" },
    { value: "nao-pagaria", label: "Não pagaria por isso" }
  ];

  const currentSolutionOptions = [
    { value: "", label: "Como resolve hoje?" },
    { value: "manual", label: "Criação manual/do zero" },
    { value: "canva-figma", label: "Canva/Figma + tentativa e erro" },
    { value: "banco-referencias", label: "Banco de referências/swipe files" },
    { value: "agencia-externa", label: "Agência externa" },
    { value: "ia-tools", label: "Ferramentas de IA (ChatGPT, Midjourney)" },
    { value: "sem-processo", label: "Não tenho processo estruturado" },
    { value: "outro", label: "Outro" }
  ];

  return (
    <section id="contact" className="py-16 md:py-20 relative overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          {/* Left Content */}
          <div className={`${category?.includes('mobile') ? 'space-y-4 text-center px-2' : 'space-y-8'} w-full`}>
            <div className={`space-y-4 ${category?.includes('mobile') ? 'px-1' : 'space-y-6'}`}>
              <div className={`inline-flex items-center justify-center p-3 rounded-full bg-accent/10 border border-accent/20 ${
                category?.includes('mobile') ? 'mx-auto' : ''
              }`}>
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              
              <h2 className={`font-bold text-foreground leading-tight ${
                category?.includes('mobile') ? 'text-2xl px-2' : 'text-3xl sm:text-4xl md:text-5xl'
              }`}>
                Decodifique o DNA dos seus Criativos
              </h2>
              
              <p className={`text-muted-foreground leading-relaxed ${
                category?.includes('mobile') ? 'text-base px-2' : 'text-lg sm:text-xl'
              }`}>
                Transforme seus melhores criativos em fórmulas replicáveis de sucesso
              </p>
            </div>

            {/* Benefits - Reduced on mobile */}
            {!category?.includes('mobile') && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  O que acontece no seu laboratório genético exclusivo:
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm md:text-base leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Mobile: Simplified benefits */}
            {category?.includes('mobile') && (
              <div className="space-y-3 px-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-primary font-semibold">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-center">Acesso prioritário ao beta privado</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-primary font-semibold">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-center">Desconto vitalício de 50% garantido</span>
                </div>
              </div>
            )}

            {/* Pre-sale Focus - Simplified on mobile */}
            <div className={`rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 text-center mx-auto ${
              category?.includes('mobile') ? 'p-4 max-w-sm' : 'p-6 max-w-md'
            }`}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className={`text-primary font-bold ${category?.includes('mobile') ? 'text-sm' : 'text-sm'}`}>
                  🎆 ACESSO LIMITADO
                </span>
              </div>
              <p className={`text-foreground font-medium leading-relaxed ${category?.includes('mobile') ? 'text-sm' : 'text-sm'}`}>
                Primeiros 150 usuários ganham <span className="text-primary font-bold">acesso vitalício com 50% OFF</span>.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className={`glass-card w-full max-w-full ${category?.includes('mobile') ? 'text-center mx-2' : ''}`}>
            <div className={`mb-6 ${category?.includes('mobile') ? 'px-2' : 'mb-8'}`}>
              <h3 className={`font-bold text-foreground mb-2 ${
                category === 'mobile-small' ? 'text-lg' : category?.includes('mobile') ? 'text-xl' : 'text-2xl'
              }`}>
                🧬 Laboratório Genético Personalizado
              </h3>
              <p className={`text-muted-foreground ${
                category === 'mobile-small' ? 'text-sm' : 'text-base'
              }`}>
                Garantir acesso prioritário ao beta + desconto vitalício
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

            {/* Progress Bar - Mobile Only */}
            {category?.includes('mobile') && formProgress > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Progresso do formulário</span>
                  <span>{Math.round(formProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${formProgress}%` }}
                  />
                </div>
              </div>
            )}

            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className={`mobile-form ${category === 'mobile-small' ? 'space-y-4' : 'space-y-6'} ${
                category?.includes('mobile') ? 'text-left' : ''
              }`}
            >
              <div className="grid grid-cols-1 gap-4">
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
                      ${category === 'mobile-small' ? 'h-12 text-base' : 'h-12 text-base'}
                      ${fieldErrors.name ? 'border-red-500' : ''}
                      ${focusedField === 'name' ? 'ring-2 ring-primary/20' : ''}`}
                    required
                    autoComplete="name"
                    autoCapitalize="words"
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

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
                      ${category === 'mobile-small' ? 'h-12 text-base' : 'h-12 text-base'}
                      ${fieldErrors.email ? 'border-red-500' : ''}
                      ${focusedField === 'email' ? 'ring-2 ring-primary/20' : ''}`}
                    required
                    autoComplete="email"
                    autoCapitalize="none"
                    inputMode="email"
                    spellCheck="false"
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Empresa"
                    value={formData.company}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('company')}
                    onBlur={handleBlur}
                    className={`h-12 bg-background border-border focus:border-primary transition-all duration-200
                      ${fieldErrors.company ? 'border-red-500' : ''}
                      ${focusedField === 'company' ? 'ring-2 ring-primary/20' : ''}`}
                    required
                    autoComplete="organization"
                    autoCapitalize="words"
                    aria-describedby={fieldErrors.company ? 'company-error' : undefined}
                  />
                  {fieldErrors.company && (
                    <p id="company-error" className="text-red-500 text-sm mt-1" role="alert">
                      {fieldErrors.company}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="(11) 99999-9999 (opcional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={`pl-10 h-12 bg-background border-border focus:border-primary transition-all duration-200
                      ${focusedField === 'phone' ? 'ring-2 ring-primary/20' : ''}`}
                    autoComplete="tel-national"
                    inputMode="tel"
                    pattern="[0-9\s\(\)\-\+]*"
                  />
                </div>
              </div>

              {/* Section 2: Professional Profile */}
              <div className={`${category === 'mobile-small' ? 'space-y-4' : 'space-y-4'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Seu Perfil Profissional</h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-2">
                      Qual sua função principal? *
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('role')}
                      onBlur={handleBlur}
                      className={`w-full h-12 px-3 bg-background border border-border rounded-md focus:border-primary transition-all duration-200
                        ${focusedField === 'role' ? 'ring-2 ring-primary/20' : ''}
                        ${!formData.role ? 'text-muted-foreground' : 'text-foreground'}`}
                      required
                    >
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label htmlFor="company_size" className="block text-sm font-medium text-muted-foreground mb-2">
                      Tamanho da sua operação *
                    </label>
                    <select
                      id="company_size"
                      name="company_size"
                      value={formData.company_size}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('company_size')}
                      onBlur={handleBlur}
                      className={`w-full h-12 px-3 bg-background border border-border rounded-md focus:border-primary transition-all duration-200
                        ${focusedField === 'company_size' ? 'ring-2 ring-primary/20' : ''}
                        ${!formData.company_size ? 'text-muted-foreground' : 'text-foreground'}`}
                      required
                    >
                      {companySizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Current Challenges */}
              <div className={`${category === 'mobile-small' ? 'space-y-4' : 'space-y-4'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-secondary" />
                  <h4 className="font-semibold text-foreground">Seus Desafios Atuais</h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <label htmlFor="main_challenge" className="block text-sm font-medium text-muted-foreground mb-2">
                      Qual seu maior desafio com criativos hoje? *
                    </label>
                    <select
                      id="main_challenge"
                      name="main_challenge"
                      value={formData.main_challenge}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('main_challenge')}
                      onBlur={handleBlur}
                      className={`w-full h-12 px-3 bg-background border border-border rounded-md focus:border-primary transition-all duration-200
                        ${focusedField === 'main_challenge' ? 'ring-2 ring-primary/20' : ''}
                        ${!formData.main_challenge ? 'text-muted-foreground' : 'text-foreground'}`}
                      required
                    >
                      {challengeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label htmlFor="current_solution" className="block text-sm font-medium text-muted-foreground mb-2">
                      Como resolve isso hoje? (opcional)
                    </label>
                    <select
                      id="current_solution"
                      name="current_solution"
                      value={formData.current_solution}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('current_solution')}
                      onBlur={handleBlur}
                      className={`w-full h-12 px-3 bg-background border border-border rounded-md focus:border-primary transition-all duration-200
                        ${focusedField === 'current_solution' ? 'ring-2 ring-primary/20' : ''}
                        ${!formData.current_solution ? 'text-muted-foreground' : 'text-foreground'}`}
                    >
                      {currentSolutionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Investment and Pricing */}
              <div className={`${category === 'mobile-small' ? 'space-y-4' : 'space-y-4'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <h4 className="font-semibold text-foreground">Investimento e Valor</h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <label htmlFor="monthly_investment" className="block text-sm font-medium text-muted-foreground mb-2">
                      Quanto investe mensalmente em criativos + tráfego? *
                    </label>
                    <select
                      id="monthly_investment"
                      name="monthly_investment"
                      value={formData.monthly_investment}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('monthly_investment')}
                      onBlur={handleBlur}
                      className={`w-full h-12 px-3 bg-background border border-border rounded-md focus:border-primary transition-all duration-200
                        ${focusedField === 'monthly_investment' ? 'ring-2 ring-primary/20' : ''}
                        ${!formData.monthly_investment ? 'text-muted-foreground' : 'text-foreground'}`}
                      required
                    >
                      {investmentOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label htmlFor="pricing_expectation" className="block text-sm font-medium text-muted-foreground mb-2">
                      Quanto pagaria por uma ferramenta que analisa criativos vencedores e gera variações automaticamente? *
                    </label>
                    <select
                      id="pricing_expectation"
                      name="pricing_expectation"
                      value={formData.pricing_expectation}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('pricing_expectation')}
                      onBlur={handleBlur}
                      className={`w-full h-12 px-3 bg-background border border-border rounded-md focus:border-primary transition-all duration-200
                        ${focusedField === 'pricing_expectation' ? 'ring-2 ring-primary/20' : ''}
                        ${!formData.pricing_expectation ? 'text-muted-foreground' : 'text-foreground'}`}
                      required
                    >
                      {pricingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 5: Additional Feedback */}
              <div className={`${category === 'mobile-small' ? 'space-y-3' : 'space-y-4'}`}>
                <div className="relative">
                  <label htmlFor="feedback" className="block text-sm font-medium text-muted-foreground mb-2">
                    O que mais te animou na proposta do CopyHelix? (opcional)
                  </label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Descreva em poucas palavras..."
                    value={formData.feedback}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('feedback')}
                    onBlur={handleBlur}
                    className={`bg-background border-border focus:border-primary transition-all duration-200
                      ${focusedField === 'feedback' ? 'ring-2 ring-primary/20' : ''}`}
                    rows={3}
                    maxLength={200}
                  />
                  {formData.feedback && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.feedback.length}/200 caracteres
                    </p>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className={`btn-primary w-full group touch-target transition-all duration-300 whitespace-nowrap
                  ${category === 'mobile-small' ? 'h-12 text-sm px-3' : category?.includes('mobile') ? 'h-12 text-sm px-4' : 'h-12 text-base px-6'}
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
                    {category === 'mobile-small' ? 'GARANTIR ACESSO' : category?.includes('mobile') ? 'GARANTIR ACESSO VIP' : 'GARANTIR ACESSO PRIORITÁRIO COM DESCONTO'}
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-200
                      ${isTouch ? '' : 'group-hover:translate-x-1'}`} />
                  </>
                )}
              </Button>

              <p className={`text-muted-foreground text-center leading-relaxed ${
                category?.includes('mobile') ? 'text-xs px-2' : 'text-xs'
              }`}>
                Ao enviar seus dados, você concorda com a nossa{" "}
                <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a>{" "}
                e os <a href="/termos" className="text-primary hover:underline">Termos de Uso</a>.
              </p>
            </form>

            <div className={`pt-6 border-t border-border/30 ${
              category?.includes('mobile') ? 'mt-6' : 'mt-8'
            }`}>
              <div className="text-center space-y-3">
                <p className={`text-muted-foreground ${
                  category === 'mobile-small' ? 'text-xs' : 'text-sm'
                }`}>
                  Beta disponível em
                </p>
                <div className={`${
                  category === 'mobile-small' ? 'py-2' : 'py-3'
                } px-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20`}>
                  <p className={`font-bold text-primary ${
                    category === 'mobile-small' ? 'text-xl' : 'text-2xl'
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