import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Building, Phone, MessageCircle, CheckCircle, Briefcase, Target, DollarSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TransparencyNotice from "@/components/TransparencyNotice";
import { 
  trackMeetingScheduled, 
  trackFormStart, 
  trackWhatsAppContact,
  setUserProperties 
} from "@/lib/analytics-tracking";

interface MeetingForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  preferred_date: string;
  preferred_time: string;
  role: string;
  company_size: string;
  main_challenge: string;
  monthly_investment: string;
  pricing_expectation: string;
  current_solution: string;
}

const MeetingScheduler = () => {
  const [form, setForm] = useState<MeetingForm>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    preferred_date: "",
    preferred_time: "",
    role: "",
    company_size: "",
    main_challenge: "",
    monthly_investment: "",
    pricing_expectation: "",
    current_solution: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        // Track meeting scheduled conversion
        trackMeetingScheduled({
          name: form.name,
          email: form.email,
          company: form.company,
          role: form.role,
          company_size: form.company_size,
          main_challenge: form.main_challenge,
          monthly_investment: form.monthly_investment,
          pricing_expectation: form.pricing_expectation,
          preferred_date: form.preferred_date,
          preferred_time: form.preferred_time,
          phone: form.phone
        });
        
        // Set user properties
        setUserProperties({
          user_segment: form.role,
          company_size: form.company_size,
          monthly_investment: form.monthly_investment,
          main_challenge: form.main_challenge
        });
        
        setIsSuccess(true);
        // Reset form
        setForm({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          preferred_date: "",
          preferred_time: "",
          role: "",
          company_size: "",
          main_challenge: "",
          monthly_investment: "",
          pricing_expectation: "",
          current_solution: ""
        });

        // Track WhatsApp contact for meeting notification
        trackWhatsAppContact({
          source: 'meeting_scheduled',
          device_type: 'auto_notification',
          user_segment: form.role
        });
        
        // También enviar por WhatsApp como backup
        const whatsappMessage = `
🗓️ *Nova Reunião Agendada - CopyHelix.ai*

👤 *Nome:* ${form.name}
📧 *Email:* ${form.email}
🏢 *Empresa:* ${form.company || 'Não informado'}
📱 *Telefone:* ${form.phone || 'Não informado'}

📅 *Data Preferida:* ${form.preferred_date}
🕐 *Horário Preferido:* ${form.preferred_time}

💬 *Mensagem:*
${form.message || 'Nenhuma mensagem adicional'}

⏰ *Agendado em:* ${new Date().toLocaleString('pt-BR')}
🎯 *Status:* Pendente confirmação
        `.trim();

        // Abrir WhatsApp como notificação
        const whatsappUrl = `https://wa.me/5519991868057?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Reset success message após 5 segundos
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(data.message || 'Erro ao agendar reunião');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      console.error('Erro:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // Track form start on first interaction
    if (!hasTrackedFormStart) {
      trackFormStart('meeting');
      setHasTrackedFormStart(true);
    }
    
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Gerar datas disponíveis (próximos 30 dias úteis)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + 1); // Começar amanhã

    for (let i = 0; i < 45; i++) {
      const dayOfWeek = currentDate.getDay();
      // Apenas dias úteis (1-5 = Segunda-Sexta)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
      
      if (dates.length >= 30) break; // Máximo 30 datas
    }
    
    return dates;
  };

  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  // Form options (same as DemoSection)
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

  if (isSuccess) {
    return (
      <div className="space-y-6">
        <TransparencyNotice type="meeting" userName={form.name} />
        <div className="text-center">
          <Button 
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="mt-4"
          >
            Agendar Nova Reunião
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Agende sua Reunião</CardTitle>
        <CardDescription>
          Vamos conversar sobre como o CopyHelix.ai pode revolucionar seus resultados
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <User className="w-4 h-4 mr-2 text-primary" />
                Nome Completo *
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                Email *
              </label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Building className="w-4 h-4 mr-2 text-primary" />
                Empresa
              </label>
              <Input
                name="company"
                value={form.company}
                onChange={handleInputChange}
                placeholder="Nome da sua empresa"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                Telefone/WhatsApp
              </label>
              <Input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                Data Preferida *
              </label>
              <select
                name="preferred_date"
                value={form.preferred_date}
                onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                required
              >
                <option value="">Selecione uma data</option>
                {getAvailableDates().map((date, index) => (
                  <option key={index} value={date.toISOString().split('T')[0]}>
                    {date.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long'
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                Horário Preferido *
              </label>
              <select
                name="preferred_time"
                value={form.preferred_time}
                onChange={(e) => setForm({ ...form, preferred_time: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                required
              >
                <option value="">Selecione um horário</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Professional Profile Section */}
          <div className="space-y-4 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground">Perfil Profissional</h4>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium mb-2">
                  <User className="w-4 h-4 mr-2 text-primary" />
                  Sua função principal *
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  required
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-2">
                  <Building className="w-4 h-4 mr-2 text-primary" />
                  Tamanho da operação *
                </label>
                <select
                  name="company_size"
                  value={form.company_size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
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

          {/* Current Challenges Section */}
          <div className="space-y-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-secondary" />
              <h4 className="font-semibold text-foreground">Desafios Atuais</h4>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium mb-2">
                  <Target className="w-4 h-4 mr-2 text-secondary" />
                  Maior desafio com criativos *
                </label>
                <select
                  name="main_challenge"
                  value={form.main_challenge}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  required
                >
                  {challengeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-2">
                  <MessageCircle className="w-4 h-4 mr-2 text-secondary" />
                  Como resolve hoje?
                </label>
                <select
                  name="current_solution"
                  value={form.current_solution}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
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

          {/* Investment and Pricing Section */}
          <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-accent" />
              <h4 className="font-semibold text-foreground">Investimento e Valor</h4>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium mb-2">
                  <DollarSign className="w-4 h-4 mr-2 text-accent" />
                  Investimento mensal *
                </label>
                <select
                  name="monthly_investment"
                  value={form.monthly_investment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  required
                >
                  {investmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-2">
                  <DollarSign className="w-4 h-4 mr-2 text-accent" />
                  Preço justo para a solução *
                </label>
                <select
                  name="pricing_expectation"
                  value={form.pricing_expectation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
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

          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <MessageCircle className="w-4 h-4 mr-2 text-primary" />
              Mensagem Adicional (Opcional)
            </label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="Conte-nos um pouco sobre seus desafios ou objetivos com marketing digital..."
            />
          </div>

          <Button
            type="submit"
            className="w-full btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Agendando...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Garantir Acesso Prioritário
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Ao agendar, você receberá uma confirmação por email e WhatsApp.
            Reuniões são realizadas via Google Meet ou presencialmente em São Paulo.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default MeetingScheduler;