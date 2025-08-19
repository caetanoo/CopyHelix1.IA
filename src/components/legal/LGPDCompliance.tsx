import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const LGPDCompliance = () => {
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
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Conformidade com a LGPD
              </h1>
            </div>
            <p className="text-muted-foreground">
              Como a CopyHelix.ai garante a proteção dos seus dados pessoais
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">O que é a LGPD?</h2>
              <p className="text-muted-foreground mb-4">
                A Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) é a legislação brasileira 
                que regula o tratamento de dados pessoais por pessoas físicas e jurídicas, 
                garantindo maior controle aos titulares sobre suas informações pessoais.
              </p>
              <p className="text-muted-foreground">
                Na CopyHelix.ai, levamos a proteção de dados muito a sério e implementamos 
                todas as medidas necessárias para estar em total conformidade com a LGPD.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Nosso Compromisso</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <Eye className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">Transparência Total</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Informamos claramente quais dados coletamos, como os utilizamos 
                    e com quem os compartilhamos.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <Lock className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">Segurança Máxima</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Implementamos as melhores práticas de segurança para proteger 
                    seus dados contra acessos não autorizados.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <UserCheck className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">Seus Direitos</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Garantimos o pleno exercício de todos os seus direitos 
                    como titular de dados pessoais.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">Conformidade</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Nossa operação está 100% em conformidade com todos 
                    os requisitos da LGPD.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Seus Direitos sob a LGPD</h2>
              <p className="text-muted-foreground mb-6">
                A LGPD garante a você os seguintes direitos em relação aos seus dados pessoais:
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    1. Confirmação da Existência de Tratamento
                  </h3>
                  <p className="text-muted-foreground">
                    Você pode solicitar confirmação sobre a existência de tratamento de dados pessoais sobre você.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    2. Acesso aos Dados
                  </h3>
                  <p className="text-muted-foreground">
                    Direito de acessar os seus dados pessoais que tratamos, incluindo informações sobre 
                    as fontes dos dados e os critérios utilizados.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    3. Correção de Dados Incompletos ou Inexatos
                  </h3>
                  <p className="text-muted-foreground">
                    Você pode solicitar a correção de dados incompletos, inexatos ou desatualizados.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    4. Anonimização, Bloqueio ou Eliminação
                  </h3>
                  <p className="text-muted-foreground">
                    Direito de solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, 
                    excessivos ou tratados em desconformidade com a LGPD.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    5. Portabilidade dos Dados
                  </h3>
                  <p className="text-muted-foreground">
                    Você pode solicitar a portabilidade dos seus dados pessoais a outro fornecedor 
                    de serviço ou produto, mediante requisição expressa.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    6. Eliminação dos Dados Tratados com Consentimento
                  </h3>
                  <p className="text-muted-foreground">
                    Direito de solicitar a eliminação dos dados pessoais tratados com base no seu consentimento, 
                    exceto nas hipóteses previstas na LGPD.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    7. Informação sobre Compartilhamento
                  </h3>
                  <p className="text-muted-foreground">
                    Você pode obter informações sobre as entidades públicas e privadas com as quais 
                    compartilhamos seus dados.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    8. Informação sobre a Possibilidade de Não Fornecer Consentimento
                  </h3>
                  <p className="text-muted-foreground">
                    Direito de ser informado sobre a possibilidade de não fornecer consentimento 
                    e sobre as consequências da negativa.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    9. Revogação do Consentimento
                  </h3>
                  <p className="text-muted-foreground">
                    Você pode revogar o consentimento a qualquer momento, mediante manifestação expressa, 
                    por procedimento gratuito e facilitado.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Como Exercer Seus Direitos</h2>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border-2 border-primary/20">
                <p className="text-muted-foreground mb-4">
                  Para exercer qualquer um dos seus direitos sob a LGPD, você pode:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Enviar um e-mail para: <strong>lgpd@copyhelix.ai</strong></li>
                  <li>Acessar as configurações de privacidade na sua conta</li>
                  <li>Entrar em contato com nosso DPO: <strong>dpo@copyhelix.ai</strong></li>
                  <li>Ligar para: <strong>+55 (19) 99186-8057</strong></li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Tempo de resposta:</strong> Respondemos a todas as solicitações em até 15 dias úteis, 
                  conforme estabelecido pela LGPD.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Bases Legais para Tratamento</h2>
              <p className="text-muted-foreground mb-4">
                Tratamos seus dados pessoais com base nas seguintes hipóteses legais da LGPD:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Execução de Contrato</h4>
                  <p className="text-sm text-muted-foreground">
                    Para fornecer os serviços de IA genética criativa contratados por você.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Legítimo Interesse</h4>
                  <p className="text-sm text-muted-foreground">
                    Para melhorar nossos serviços e comunicar atualizações relevantes.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Consentimento</h4>
                  <p className="text-sm text-muted-foreground">
                    Para atividades de marketing e cookies não essenciais.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Obrigação Legal</h4>
                  <p className="text-sm text-muted-foreground">
                    Para cumprir obrigações fiscais, contábeis e regulatórias.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Medidas de Segurança</h2>
              <p className="text-muted-foreground mb-4">
                Implementamos as seguintes medidas técnicas e organizacionais para proteger seus dados:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Criptografia:</strong> Todos os dados são criptografados em trânsito e em repouso</li>
                <li><strong>Controle de Acesso:</strong> Acesso restrito baseado no princípio da necessidade</li>
                <li><strong>Monitoramento:</strong> Monitoramento contínuo de segurança 24/7</li>
                <li><strong>Backups Seguros:</strong> Backups criptografados e redundantes</li>
                <li><strong>Treinamento:</strong> Equipe treinada regularmente em proteção de dados</li>
                <li><strong>Auditoria:</strong> Auditorias regulares de segurança e conformidade</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Incidentes de Segurança</h2>
              <p className="text-muted-foreground mb-4">
                Em caso de incidente de segurança que possa acarretar risco ou dano relevante 
                aos titulares de dados pessoais:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Notificaremos a ANPD em até 72 horas após tomar conhecimento</li>
                <li>Comunicaremos os titulares afetados quando o risco for alto</li>
                <li>Tomaremos todas as medidas necessárias para mitigar os danos</li>
                <li>Forneceremos informações sobre medidas preventivas adotadas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Protection Officer (DPO)</h2>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-muted-foreground mb-4">
                  Nosso Encarregado de Proteção de Dados (DPO) é responsável por:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                  <li>Orientar funcionários sobre práticas de proteção de dados</li>
                  <li>Atuar como canal de comunicação com a ANPD</li>
                  <li>Receber e processar solicitações dos titulares</li>
                  <li>Realizar análises de impacto à proteção de dados</li>
                </ul>
                <p className="text-muted-foreground">
                  <strong>Contato do DPO:</strong> dpo@copyhelix.ai
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Autoridade de Controle</h2>
              <p className="text-muted-foreground mb-4">
                Se você não ficar satisfeito com nossa resposta ou tratamento dos seus dados, 
                você pode registrar uma reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD):
              </p>
              <div className="bg-card p-4 rounded-lg border">
                <ul className="list-none text-muted-foreground space-y-2">
                  <li><strong>Website:</strong> www.gov.br/anpd</li>
                  <li><strong>E-mail:</strong> comunicacao@anpd.gov.br</li>
                  <li><strong>Endereço:</strong> Eixo Monumental, Brasília - DF</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Atualizações</h2>
              <p className="text-muted-foreground">
                Esta página é atualizada regularmente para refletir melhorias em nossos 
                processos de proteção de dados e mudanças na legislação. 
                Recomendamos que você a consulte periodicamente.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGPDCompliance;