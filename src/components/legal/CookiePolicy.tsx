import { ArrowLeft, Cookie, Settings, BarChart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookiePolicy = () => {
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
              <Cookie className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Política de Cookies
              </h1>
            </div>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">O que são Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo 
                (computador, tablet ou celular) quando você visita um site. Eles são amplamente 
                utilizados para fazer os sites funcionarem de forma mais eficiente e fornecer 
                informações aos proprietários do site.
              </p>
              <p className="text-muted-foreground">
                Na CopyHelix.ai, utilizamos cookies para melhorar sua experiência, personalizar 
                conteúdo e analisar como nosso serviço é utilizado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Tipos de Cookies que Utilizamos</h2>
              
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-green-500 mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Cookies Essenciais</h3>
                    <span className="ml-auto px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Sempre Ativo
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Estes cookies são necessários para o funcionamento básico do site e não podem ser desativados.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Autenticação:</strong> Mantêm você logado na sua conta</li>
                    <li><strong>Segurança:</strong> Protegem contra ataques e fraudes</li>
                    <li><strong>Sessão:</strong> Lembram suas preferências durante a navegação</li>
                    <li><strong>Carrinho:</strong> Mantêm itens no seu carrinho de compras</li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <Settings className="w-6 h-6 text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Cookies de Funcionalidade</h3>
                    <span className="ml-auto px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Configurável
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Melhoram a funcionalidade e personalização do site baseando-se nas suas escolhas.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Preferências:</strong> Lembram idioma, região e outras configurações</li>
                    <li><strong>Interface:</strong> Salvam layout e personalizações da plataforma</li>
                    <li><strong>Assistente:</strong> Melhoram a experiência com nossa IA</li>
                    <li><strong>Histórico:</strong> Mantêm histórico de criativos analisados</li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <BarChart className="w-6 h-6 text-orange-500 mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Cookies de Análise</h3>
                    <span className="ml-auto px-3 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                      Configurável
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Nos ajudam a entender como os visitantes interagem com o site para melhorarmos nossos serviços.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Google Analytics:</strong> Analisa tráfego e comportamento dos usuários</li>
                    <li><strong>Heatmaps:</strong> Mostra como você interage com as páginas</li>
                    <li><strong>Performance:</strong> Monitora velocidade e erros do site</li>
                    <li><strong>A/B Testing:</strong> Testa diferentes versões para melhorar a experiência</li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <Cookie className="w-6 h-6 text-purple-500 mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Cookies de Marketing</h3>
                    <span className="ml-auto px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                      Configurável
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Usados para fornecer anúncios mais relevantes e medir a eficácia das campanhas publicitárias.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Facebook Pixel:</strong> Rastreia conversões de anúncios do Facebook</li>
                    <li><strong>Google Ads:</strong> Otimiza campanhas publicitárias do Google</li>
                    <li><strong>Remarketing:</strong> Mostra anúncios relevantes em outros sites</li>
                    <li><strong>Attribution:</strong> Rastreia origem dos leads e conversões</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies de Terceiros</h2>
              <p className="text-muted-foreground mb-4">
                Alguns cookies em nosso site são definidos por serviços de terceiros. Não temos controle 
                sobre esses cookies, que são regidos pelas políticas de privacidade dos respectivos terceiros:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Google Analytics & Google Ads</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Análise de tráfego e otimização de anúncios
                  </p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                     className="text-xs text-primary hover:underline">
                    Política de Privacidade do Google
                  </a>
                </div>
                
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Facebook Pixel</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Rastreamento de conversões e remarketing
                  </p>
                  <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-primary hover:underline">
                    Política de Privacidade do Facebook
                  </a>
                </div>
                
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Hotjar</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Análise de comportamento e heatmaps
                  </p>
                  <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-primary hover:underline">
                    Política de Privacidade do Hotjar
                  </a>
                </div>
                
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Stripe</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Processamento de pagamentos
                  </p>
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-primary hover:underline">
                    Política de Privacidade do Stripe
                  </a>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Duração dos Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Os cookies têm diferentes durações:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Cookies de Sessão
                  </h3>
                  <p className="text-muted-foreground">
                    São temporários e são excluídos quando você fecha o navegador. 
                    Usados para funcionalidades essenciais durante sua visita.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Cookies Persistentes
                  </h3>
                  <p className="text-muted-foreground">
                    Permanecem no seu dispositivo por um período determinado ou até você os excluir. 
                    Duração varia de dias a anos, dependendo da finalidade.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Como Gerenciar Cookies</h2>
              
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border-2 border-primary/20 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  🍪 Central de Preferências de Cookies
                </h3>
                <p className="text-muted-foreground mb-4">
                  Você pode gerenciar suas preferências de cookies a qualquer momento através da nossa central de privacidade:
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Gerenciar Preferências de Cookies
                </Button>
              </div>

              <h3 className="text-xl font-medium text-foreground mb-3">Configurações do Navegador</h3>
              <p className="text-muted-foreground mb-4">
                Você também pode gerenciar cookies através das configurações do seu navegador:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Google Chrome</h4>
                  <p className="text-sm text-muted-foreground">
                    Configurações → Privacidade e segurança → Cookies e outros dados do site
                  </p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Mozilla Firefox</h4>
                  <p className="text-sm text-muted-foreground">
                    Opções → Privacidade e Segurança → Cookies e Dados de Sites
                  </p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Safari</h4>
                  <p className="text-sm text-muted-foreground">
                    Preferências → Privacidade → Gerenciar Dados de Websites
                  </p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">Microsoft Edge</h4>
                  <p className="text-sm text-muted-foreground">
                    Configurações → Privacidade, pesquisa e serviços → Cookies
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Impacto da Desativação</h2>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  ⚠️ Importante
                </h3>
                <p className="text-muted-foreground mb-4">
                  A desativação de cookies pode afetar sua experiência no site:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Funcionalidades podem não funcionar corretamente</li>
                  <li>Suas preferências não serão salvas</li>
                  <li>Você pode precisar fazer login repetidamente</li>
                  <li>Conteúdo personalizado pode não ser exibido</li>
                  <li>Análises para melhorar o serviço serão limitadas</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Tecnologias Similares</h2>
              <p className="text-muted-foreground mb-4">
                Além de cookies, também utilizamos outras tecnologias similares:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Local Storage:</strong> Armazena dados localmente no seu navegador</li>
                <li><strong>Session Storage:</strong> Armazena dados temporariamente durante a sessão</li>
                <li><strong>Web Beacons:</strong> Pequenas imagens para rastrear interações</li>
                <li><strong>Fingerprinting:</strong> Identificação baseada em características do dispositivo</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Conformidade com a LGPD</h2>
              <p className="text-muted-foreground mb-4">
                Nossa política de cookies está em total conformidade com a Lei Geral de Proteção de Dados (LGPD):
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Obtemos consentimento explícito para cookies não essenciais</li>
                <li>Fornecemos informações claras sobre cada tipo de cookie</li>
                <li>Permitimos que você gerencie suas preferências facilmente</li>
                <li>Respeitamos sua decisão de recusar cookies não essenciais</li>
                <li>Mantemos registros de consentimento conforme exigido</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Atualizações nesta Política</h2>
              <p className="text-muted-foreground">
                Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças 
                em nossas práticas ou por razões operacionais, legais ou regulamentares. 
                Notificaremos sobre mudanças significativas através de aviso no site ou por e-mail.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contato</h2>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-muted-foreground mb-4">
                  Se você tiver dúvidas sobre nossa política de cookies:
                </p>
                <ul className="list-none text-muted-foreground space-y-2">
                  <li><strong>E-mail:</strong> cookies@copyhelix.ai</li>
                  <li><strong>Privacidade:</strong> privacidade@copyhelix.ai</li>
                  <li><strong>Telefone:</strong> +55 (19) 99186-8057</li>
                  <li><strong>DPO:</strong> dpo@copyhelix.ai</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;