import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Building, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MeetingForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  preferred_date: string;
  preferred_time: string;
}

const MeetingScheduler = () => {
  const [form, setForm] = useState<MeetingForm>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    preferred_date: "",
    preferred_time: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

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
        setIsSuccess(true);
        // Reset form
        setForm({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          preferred_date: "",
          preferred_time: ""
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-700 mb-4">
          Reunião Agendada com Sucesso! 🎉
        </h3>
        <p className="text-muted-foreground mb-6">
          Recebemos seu agendamento e entraremos em contato em breve para confirmar a reunião.
          Também enviamos os detalhes via WhatsApp para agilizar o processo.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)}
          variant="outline"
        >
          Agendar Nova Reunião
        </Button>
      </motion.div>
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

          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <MessageCircle className="w-4 h-4 mr-2 text-primary" />
              Mensagem (Opcional)
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
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Agendando...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Reunião
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