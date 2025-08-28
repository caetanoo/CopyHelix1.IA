import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-wide py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Informações Gerais</h2>
              <p className="text-muted-foreground mb-4">
                A CopyHelix.ai ("nós", "nosso" ou "nossa") está comprometida em proteger e respeitar a sua privacidade. 
                Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos as suas informações 
                quando você utiliza nosso Sistema de Análise de DNA Criativo.
              </p>
              <p className="text-muted-foreground">
                Esta política se aplica a todos os usuários da plataforma CopyHelix.ai e está em conformidade com a 
                Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e demais regulamentações aplicáveis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Informações que Coletamos</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-3">2.1 Informações Fornecidas por Você</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Dados de cadastro: nome, e-mail, telefone, empresa</li>
                <li>Criativos e conteúdos enviados para análise genética</li>
                <li>Informações de pagamento (processadas por terceiros)</li>
                <li>Comunicações conosco (suporte, feedback)</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3">2.2 Informações Coletadas Automaticamente</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Dados de uso da plataforma (cliques, tempo de sessão)</li>
                <li>Informações do dispositivo (IP, navegador, sistema operacional)</li>
                <li>Cookies e tecnologias similares</li>
                <li>Logs de sistema e métricas de performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Como Utilizamos suas Informações</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fornecer e melhorar nossos serviços de IA genética criativa</li>
                <li>Processar e analisar o DNA dos seus criativos</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Comunicar atualizações, ofertas e informações relevantes</li>
                <li>Garantir a segurança e prevenir fraudes</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Realizar pesquisas e análises para desenvolvimento tecnológico</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Base Legal para Processamento</h2>
              <p className="text-muted-foreground mb-4">
                Processamos seus dados pessoais com base nas seguintes bases legais da LGPD:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Execução de contrato:</strong> Para fornecer os serviços contratados</li>
                <li><strong>Legítimo interesse:</strong> Para melhorar nossos serviços e comunicação</li>
                <li><strong>Consentimento:</strong> Para marketing e cookies não essenciais</li>
                <li><strong>Cumprimento de obrigação legal:</strong> Para atender regulamentações</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Compartilhamento de Informações</h2>
              <p className="text-muted-foreground mb-4">
                Não vendemos suas informações pessoais. Podemos compartilhar dados limitados com:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Prestadores de serviços:</strong> Para operação da plataforma (hospedagem, pagamentos)</li>
                <li><strong>Parceiros tecnológicos:</strong> Para funcionalidades de IA (sempre anonimizados)</li>
                <li><strong>Autoridades competentes:</strong> Quando exigido por lei</li>
                <li><strong>Sucessores comerciais:</strong> Em caso de fusão ou aquisição (com notificação prévia)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Seus Direitos</h2>
              <p className="text-muted-foreground mb-4">
                De acordo com a LGPD, você tem os seguintes direitos:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Acesso:</strong> Confirmar a existência e acessar seus dados</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos ou inexatos</li>
                <li><strong>Eliminação:</strong> Solicitar a exclusão de dados desnecessários</li>
                <li><strong>Portabilidade:</strong> Receber dados em formato estruturado</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento de dados</li>
                <li><strong>Revogação do consentimento:</strong> Retirar consentimento a qualquer momento</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Para exercer seus direitos, entre em contato conosco através do e-mail: <strong>privacidade@copyhelix.ai</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Segurança dos Dados</h2>
              <p className="text-muted-foreground mb-4">
                Implementamos medidas técnicas e organizacionais para proteger seus dados:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Criptografia ponta a ponta para dados sensíveis</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups seguros e redundantes</li>
                <li>Treinamento regular da equipe em segurança</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Retenção de Dados</h2>
              <p className="text-muted-foreground mb-4">
                Mantemos seus dados pelo tempo necessário para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fornecer nossos serviços durante a vigência do contrato</li>
                <li>Cumprir obrigações legais (até 5 anos após o término)</li>
                <li>Resolver disputas e fazer cumprir acordos</li>
                <li>Dados anonimizados podem ser retidos indefinidamente para pesquisa</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Transferência Internacional</h2>
              <p className="text-muted-foreground">
                Alguns de nossos fornecedores podem estar localizados fora do Brasil. Quando necessário, 
                garantimos que tais transferências sejam realizadas com adequado nível de proteção, 
                conforme exigido pela LGPD.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Menores de Idade</h2>
              <p className="text-muted-foreground">
                Nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente 
                dados de menores de idade. Se identificarmos tais dados, procederemos com a exclusão imediata.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Alterações nesta Política</h2>
              <p className="text-muted-foreground">
                Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas 
                através do e-mail cadastrado ou aviso na plataforma. O uso continuado após as alterações 
                constitui aceitação da nova política.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contato</h2>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-muted-foreground mb-4">
                  Para questões sobre esta política ou exercício de direitos:
                </p>
                <ul className="list-none text-muted-foreground space-y-2">
                  <li><strong>E-mail:</strong> privacidade@copyhelix.ai</li>
                  <li><strong>Telefone:</strong> +55 (19) 99186-8057</li>
                  <li><strong>Endereço:</strong> São Paulo, SP - Brasil</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  <strong>Data Protection Officer (DPO):</strong> dpo@copyhelix.ai
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;