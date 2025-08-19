import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Calendar, 
  Bell, 
  Settings, 
  CheckCircle,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

interface EmailSequenceManagerProps {
  userEmail?: string;
  userName?: string;
  position?: number;
}

const EmailSequenceManager = ({ userEmail, userName, position }: EmailSequenceManagerProps) => {
  const [emailPreferences, setEmailPreferences] = useState({
    weeklyUpdates: true,
    developmentNews: true,
    exclusiveOffers: true,
    communityDigest: true
  });
  const [customEmail, setCustomEmail] = useState(userEmail || '');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const emailSequence = [
    {
      day: 1,
      subject: `${userName ? `${userName}, ` : ''}Bem-vindo(a) à Elite Beta do CopyHelix! 🚀`,
      preview: 'Sua jornada como fundador começa agora...',
      status: 'sent',
      content: [
        'Agradecimento personalizado',
        'Explicação dos próximos passos',
        'Link para grupo VIP WhatsApp',
        'Pesquisa de prioridades de features'
      ]
    },
    {
      day: 3,
      subject: 'Bastidores: Como estamos construindo o CopyHelix',
      preview: 'Transparência total sobre nosso processo de desenvolvimento...',
      status: 'scheduled',
      content: [
        'Timeline detalhado de desenvolvimento',
        'Desafios técnicos que estamos resolvendo',
        'Feedback da primeira turma de beta testers',
        'Sneak peek das funcionalidades core'
      ]
    },
    {
      day: 7,
      subject: 'Sua opinião moldará o CopyHelix',
      preview: 'Pesquisa exclusiva para founders...',
      status: 'scheduled',
      content: [
        'Pesquisa de validação de features',
        'Priorização baseada no seu perfil',
        'Oportunidade de call 1:1 com founder',
        'Preview das primeiras análises de DNA'
      ]
    },
    {
      day: 14,
      subject: 'Update de Desenvolvimento + Surpresa Especial',
      preview: 'Progresso surpreendente + benefício extra...',
      status: 'scheduled',
      content: [
        'Progresso das últimas 2 semanas',
        'Demonstração ao vivo das funcionalidades',
        'Benefício extra para early adopters',
        'Refinamento do timeline de lançamento'
      ]
    },
    {
      day: 30,
      subject: 'Quase lá! Acesso Beta em breve',
      preview: 'Últimos preparativos para seu acesso...',
      status: 'scheduled',
      content: [
        'Cronograma final do beta privado',
        'Instruções de acesso antecipado',
        'Sessão de onboarding personalizada',
        'Desconto especial confirmado'
      ]
    }
  ];

  const preferences = [
    {
      key: 'weeklyUpdates',
      title: 'Updates Semanais',
      description: 'Progresso de desenvolvimento e novidades',
      icon: Calendar
    },
    {
      key: 'developmentNews',
      title: 'Bastidores Técnicos',
      description: 'Como estamos construindo o produto',
      icon: Settings
    },
    {
      key: 'exclusiveOffers',
      title: 'Ofertas Exclusivas',
      description: 'Benefícios e promoções para founders',
      icon: TrendingUp
    },
    {
      key: 'communityDigest',
      title: 'Digest da Comunidade',
      description: 'Highlights do grupo VIP e networking',
      icon: Users
    }
  ];

  const handlePreferenceChange = (key: string) => {
    setEmailPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const subscribeToSequence = async () => {
    if (!customEmail) return;
    
    try {
      // In real implementation, this would call your email service API
      await fetch('/api/email-sequence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customEmail,
          name: userName,
          position,
          preferences: emailPreferences,
          source: 'beta_waitlist'
        })
      });
      
      setIsSubscribed(true);
    } catch (error) {
      console.error('Error subscribing to email sequence:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Sequence Preview */}
      <Card className="glass-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Sequência de Emails VIP</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe todo o desenvolvimento em primeira mão
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {emailSequence.map((email, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all ${
                  email.status === 'sent' 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-background/50 border-border/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={email.status === 'sent' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        Dia {email.day}
                      </Badge>
                      {email.status === 'sent' ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {email.subject}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {email.preview}
                    </p>
                    
                    <div className="space-y-1">
                      {email.content.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span className="text-xs text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Preferences */}
      <Card className="glass-card border-secondary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Preferências de Email</h3>
              <p className="text-sm text-muted-foreground">
                Customize o que você quer receber
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {preferences.map((pref) => (
              <div key={pref.key} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <pref.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{pref.title}</h4>
                    <p className="text-xs text-muted-foreground">{pref.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handlePreferenceChange(pref.key)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    emailPreferences[pref.key as keyof typeof emailPreferences]
                      ? 'bg-primary'
                      : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    emailPreferences[pref.key as keyof typeof emailPreferences]
                      ? 'translate-x-6'
                      : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>

          {/* Alternative Email */}
          {!isSubscribed && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Confirmar/Alterar Email para Sequência VIP
              </label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="flex-1"
                />
                <Button
                  onClick={subscribeToSequence}
                  disabled={!customEmail || isSubscribed}
                  className="btn-secondary"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          )}

          {isSubscribed && (
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-primary">
                Email sequence ativada! 🎉
              </p>
              <p className="text-xs text-muted-foreground">
                Primeiro email chegará em algumas horas
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSequenceManager;