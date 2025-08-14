import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, CheckCircle, Mail, Phone, User, Loader2 } from "lucide-react";
import { useViewportSize, useIsTouchDevice } from "@/hooks/use-mobile";

const DemoSection = () => {
  const { category } = useViewportSize();
  const isTouch = useIsTouchDevice();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
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
    const requiredFields = ['name', 'email', 'company'];
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData].trim().length > 0);
    return (filledFields.length / requiredFields.length) * 100;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update progress
    const newProgress = calculateProgress();
    setFormProgress(newProgress);
    
    // Clear errors immediately when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-focus next field on mobile for better flow
    if (category?.includes('mobile') && value.trim().length > 0) {
      const fieldOrder = ['name', 'email', 'company', 'phone'];
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

      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: "", email: "", company: "", phone: "" });
        setIsSuccess(false);
      }, 3000);

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

  return (
    <section id="contact" className="py-20 relative">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`${category?.includes('mobile') ? 'space-y-6 text-center' : 'space-y-8'}`}>
            <div className="space-y-6">
              <div className={`inline-flex items-center justify-center p-3 rounded-full bg-accent/10 border border-accent/20 ${
                category?.includes('mobile') ? 'mx-auto' : ''
              }`}>
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              
              <h2 className={`font-bold text-foreground leading-tight ${
                category?.includes('mobile') ? 'text-2xl' : 'text-3xl sm:text-4xl md:text-5xl'
              }`}>
                Decodifique o DNA dos seus Criativos
              </h2>
              
              <p className={`text-muted-foreground leading-relaxed ${
                category?.includes('mobile') ? 'text-base' : 'text-lg sm:text-xl'
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
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Mobile: Simplified benefits */}
            {category?.includes('mobile') && (
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-primary font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Análise genética em até 2 horas</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-primary font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Desconto especial para primeiros usuários</span>
                </div>
              </div>
            )}

            {/* Pre-sale Focus - Simplified on mobile */}
            <div className={`rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 text-center ${
              category?.includes('mobile') ? 'p-4' : 'p-6'
            }`}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className={`text-primary font-bold ${category?.includes('mobile') ? 'text-xs' : 'text-sm'}`}>
                  🎆 ACESSO LIMITADO
                </span>
              </div>
              <p className={`text-foreground font-medium ${category?.includes('mobile') ? 'text-xs' : 'text-sm'}`}>
                Vagas limitadas! Acesso exclusivo + <span className="text-primary font-bold">desconto vitalício</span>.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className={`glass-card ${category?.includes('mobile') ? 'text-center' : ''}`}>
            <div className="mb-8">
              <h3 className={`font-bold text-foreground mb-2 ${
                category === 'mobile-small' ? 'text-xl' : 'text-2xl'
              }`}>
                🧬 Laboratório Genético Personalizado
              </h3>
              <p className={`text-muted-foreground ${
                category === 'mobile-small' ? 'text-sm' : 'text-base'
              }`}>
                Decodificação genética ao vivo em até 2 horas
              </p>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    Solicitação enviada com sucesso! A nossa equipe entrará em contato em até 2 horas.
                  </p>
                </div>
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

              <Button 
                type="submit" 
                className={`btn-primary w-full group touch-target transition-all duration-300
                  ${category === 'mobile-small' ? 'h-12 text-base' : 'h-12 text-base'}
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
                    {category === 'mobile-small' ? 'QUERO DECODIFICAR AGORA' : 'QUERO DECODIFICAR MEU DNA CRIATIVO'}
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-200
                      ${isTouch ? '' : 'group-hover:translate-x-1'}`} />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Ao enviar seus dados, você concorda com a nossa{" "}
                <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a>{" "}
                e os <a href="/termos" className="text-primary hover:underline">Termos de Uso</a>.
              </p>
            </form>

            <div className="mt-8 pt-6 border-t border-border/30">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Resposta garantida em
                </p>
                <p className="text-2xl font-bold text-primary">
                  &lt; 2 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;