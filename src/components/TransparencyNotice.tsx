import { motion } from "framer-motion";
import { Info, Calendar, Clock, Gift, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TransparencyNoticeProps {
  type?: 'meeting' | 'demo' | 'contact';
  userName?: string;
}

const TransparencyNotice = ({ type = 'demo', userName }: TransparencyNoticeProps) => {
  const getNoticeContent = () => {
    switch (type) {
      case 'meeting':
        return {
          title: "Obrigado pelo interesse!",
          subtitle: "CopyHelix.ai está sendo finalizado",
          message: `${userName ? `${userName}, você` : 'Você'} garantiu acesso prioritário com desconto de fundador!`,
          timeline: "Previsão de lançamento: Q4 2025",
          benefits: [
            "Acesso antecipado à plataforma",
            "50% de desconto exclusivo",
            "Sessão de onboarding personalizada",
            "Suporte prioritário"
          ]
        };
      
      case 'demo':
        return {
          title: "Solicitação recebida!",
          subtitle: "CopyHelix.ai está em desenvolvimento",
          message: `${userName ? `${userName}, você` : 'Você'} garantiu acesso prioritário com desconto especial de fundador!`,
          timeline: "Beta disponível: Outubro 2025",
          benefits: [
            "Primeira turma de beta testers",
            "Desconto exclusivo de 50%",
            "Análise gratuita de 1 criativo completa",
            "Acesso direto ao time de desenvolvimento"
          ]
        };
      
      default:
        return {
          title: "Mensagem enviada!",
          subtitle: "CopyHelix.ai está quase pronto",
          message: `${userName ? `${userName}, você` : 'Você'} será notificado(a) assim que lançarmos!`,
          timeline: "Lançamento previsto: Q4 2025",
          benefits: [
            "Notificação em primeira mão",
            "Acesso exclusivo ao preview",
            "Desconto especial de lançamento",
            "Prioridade no suporte"
          ]
        };
    }
  };

  const content = getNoticeContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="glass-card border-primary/20">
        <CardContent className="p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {content.title}
            </h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 mb-4">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                {content.subtitle}
              </span>
            </div>
            <p className="text-lg text-primary font-semibold">
              {content.message}
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-8 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-secondary" />
              <span className="font-medium text-foreground">Timeline de Desenvolvimento</span>
            </div>
            <p className="text-secondary font-semibold">{content.timeline}</p>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-accent" />
              <span className="font-semibold text-foreground">Seus Benefícios Exclusivos</span>
            </div>
            <div className="grid gap-3">
              {content.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground text-left">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Próximos Passos</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Nossa equipe entrará em contato em até 48 horas para confirmar seus dados 
              e garantir seu acesso prioritário com desconto especial.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              Tem dúvidas? Entre em contato:{" "}
              <a href="mailto:contato@copyhelix.ai" className="text-primary hover:underline">
                contato@copyhelix.ai
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransparencyNotice;