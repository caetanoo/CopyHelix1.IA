import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfUse = () => {
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
              Termos de Uso
            </h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground mb-4">
                Bem-vindo à CopyHelix.ai. Estes Termos de Uso ("Termos") regem o uso da nossa plataforma 
                de Análise de DNA Criativo e todos os serviços relacionados ("Serviços"). 
                Ao acessar ou usar nossos Serviços, você concorda em ficar vinculado a estes Termos.
              </p>
              <p className="text-muted-foreground">
                Se você não concordar com qualquer parte destes Termos, não poderá acessar ou usar nossos Serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descrição do Serviço</h2>
              <p className="text-muted-foreground mb-4">
                A CopyHelix.ai oferece uma plataforma de inteligência artificial que:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Analisa o "DNA genético" de criativos publicitários de alto desempenho</li>
                <li>Desenvolve um Sistema de Replicação Criativa baseado nos seus criativos vencedores</li>
                <li>Gera variações infinitas mantendo o DNA de sucesso original</li>
                <li>Fornece análises preditivas de performance</li>
                <li>Oferece ferramentas de otimização criativa</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Elegibilidade e Cadastro</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">3.1 Elegibilidade</h3>
              <p className="text-muted-foreground mb-4">
                Para usar nossos Serviços, você deve:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Ter pelo menos 18 anos de idade</li>
                <li>Ter capacidade legal para celebrar contratos</li>
                <li>Fornecer informações precisas e completas</li>
                <li>Manter suas informações atualizadas</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3">3.2 Conta de Usuário</h3>
              <p className="text-muted-foreground">
                Você é responsável por manter a confidencialidade de sua conta e senha, 
                e por todas as atividades que ocorram em sua conta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Uso Permitido</h2>
              <p className="text-muted-foreground mb-4">
                Você pode usar nossos Serviços apenas para fins legais e de acordo com estes Termos. 
                Especificamente, você concorda em:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Usar os Serviços apenas para seus próprios fins comerciais legítimos</li>
                <li>Fornecer apenas criativos próprios ou para os quais possui direitos</li>
                <li>Respeitar todos os direitos de propriedade intelectual</li>
                <li>Não violar leis aplicáveis ou regulamentações</li>
                <li>Não interferir na operação dos Serviços</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Uso Proibido</h2>
              <p className="text-muted-foreground mb-4">
                Você não pode:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Usar os Serviços para fins ilegais ou não autorizados</li>
                <li>Tentar obter acesso não autorizado aos Serviços</li>
                <li>Interferir ou prejudicar a integridade ou performance dos Serviços</li>
                <li>Criar contas falsas ou usar informações de terceiros sem autorização</li>
                <li>Transmitir vírus, malware ou código malicioso</li>
                <li>Fazer engenharia reversa ou tentar extrair código-fonte</li>
                <li>Revender ou redistribuir os Serviços sem autorização</li>
                <li>Usar os Serviços para criar conteúdo ofensivo, discriminatório ou ilegal</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Propriedade Intelectual</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">6.1 Conteúdo da CopyHelix.ai</h3>
              <p className="text-muted-foreground mb-4">
                Todos os direitos, títulos e interesses nos Serviços, incluindo software, 
                algoritmos, interface e documentação, são de propriedade exclusiva da CopyHelix.ai.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">6.2 Seu Conteúdo</h3>
              <p className="text-muted-foreground mb-4">
                Você mantém todos os direitos sobre os criativos que envia ("Seu Conteúdo"). 
                Ao usar nossos Serviços, você nos concede uma licença limitada para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Processar e analisar Seu Conteúdo</li>
                <li>Gerar variações baseadas no DNA criativo</li>
                <li>Armazenar e fazer backup de Seu Conteúdo</li>
                <li>Melhorar nossos algoritmos (apenas com dados anonimizados)</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3">6.3 Conteúdo Gerado</h3>
              <p className="text-muted-foreground">
                As variações criativas geradas pela nossa IA baseadas no Seu Conteúdo 
                pertencem a você, sujeitas aos nossos direitos sobre a tecnologia subjacente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Pagamentos e Reembolsos</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">7.1 Assinaturas</h3>
              <p className="text-muted-foreground mb-4">
                Os Serviços são oferecidos sob diferentes planos de assinatura. 
                Os preços estão sujeitos a alteração com aviso prévio de 30 dias.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">7.2 Política de Reembolso</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Oferecemos garantia de 30 dias para novos usuários</li>
                <li>Reembolsos são processados no método de pagamento original</li>
                <li>Após o cancelamento, o acesso permanece até o fim do período pago</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Privacidade e Segurança</h2>
              <p className="text-muted-foreground mb-4">
                Sua privacidade é importante para nós. Nossa coleta e uso de dados pessoais 
                é regida por nossa Política de Privacidade, que faz parte integrante destes Termos.
              </p>
              <p className="text-muted-foreground">
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                seus dados e conteúdo, mas não podemos garantir segurança absoluta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Disponibilidade e Modificações</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">9.1 Disponibilidade</h3>
              <p className="text-muted-foreground mb-4">
                Nos esforçamos para manter os Serviços disponíveis 24/7, mas podem ocorrer 
                interrupções para manutenção, atualizações ou por circunstâncias fora do nosso controle.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">9.2 Modificações</h3>
              <p className="text-muted-foreground">
                Reservamos o direito de modificar, suspender ou descontinuar qualquer aspecto 
                dos Serviços a qualquer tempo, com aviso prévio quando possível.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Limitação de Responsabilidade</h2>
              <p className="text-muted-foreground mb-4">
                NA MÁXIMA EXTENSÃO PERMITIDA POR LEI:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Os Serviços são fornecidos "como estão" sem garantias de qualquer tipo</li>
                <li>Nossa responsabilidade total não excederá o valor pago nos últimos 12 meses</li>
                <li>Não seremos responsáveis por danos indiretos, consequenciais ou punitivos</li>
                <li>Você é responsável pela precisão dos resultados gerados pela IA</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Rescisão</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">11.1 Por Você</h3>
              <p className="text-muted-foreground mb-4">
                Você pode cancelar sua conta a qualquer momento através das configurações 
                da plataforma ou entrando em contato conosco.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">11.2 Por Nós</h3>
              <p className="text-muted-foreground mb-4">
                Podemos suspender ou encerrar sua conta imediatamente se você violar estes Termos, 
                com aviso prévio quando apropriado.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">11.3 Efeitos da Rescisão</h3>
              <p className="text-muted-foreground">
                Após a rescisão, seu acesso aos Serviços cessará, mas suas obrigações 
                e nossas limitações de responsabilidade permanecerão em vigor.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Lei Aplicável e Resolução de Disputas</h2>
              <p className="text-muted-foreground mb-4">
                Estes Termos são regidos pelas leis do Brasil. Qualquer disputa será 
                resolvida preferencialmente por mediação, ou pelos tribunais competentes 
                de São Paulo, SP.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Disposições Gerais</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Se qualquer disposição for inválida, as demais permanecerão em vigor</li>
                <li>Nosso não exercício de direitos não constitui renúncia</li>
                <li>Estes Termos constituem o acordo completo entre as partes</li>
                <li>Podemos ceder nossos direitos; você não pode sem nosso consentimento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Alterações nos Termos</h2>
              <p className="text-muted-foreground">
                Podemos atualizar estes Termos periodicamente. Mudanças significativas serão 
                notificadas com pelo menos 30 dias de antecedência. O uso continuado após 
                as alterações constitui aceitação dos novos Termos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">15. Contato</h2>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-muted-foreground mb-4">
                  Para questões sobre estes Termos:
                </p>
                <ul className="list-none text-muted-foreground space-y-2">
                  <li><strong>E-mail:</strong> legal@copyhelix.ai</li>
                  <li><strong>Telefone:</strong> +55 (19) 99186-8057</li>
                  <li><strong>Endereço:</strong> São Paulo, SP - Brasil</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;