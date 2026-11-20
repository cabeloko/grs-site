import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a GRS – Soluções Tecnológicas trata os dados dos visitantes do site, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

/** Formata AAAA-MM-DD como "20 de novembro de 2026". */
function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-10">
      <h2 id={id} className="text-2xl font-semibold text-fg">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted [&_a]:text-accent-soft [&_a]:underline [&_a]:decoration-accent-soft/40 [&_a]:underline-offset-2 [&_a:hover]:decoration-accent-soft [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const { name, contact, legal } = siteConfig;
  const email = <a href={`mailto:${contact.email}`}>{contact.email}</a>;

  return (
    <main id="conteudo" tabIndex={-1} className="pt-header outline-none">
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-soft">Privacidade</p>
        <h1 className="mt-4 text-h2 font-semibold text-fg">Política de Privacidade</h1>
        <p className="mt-4 text-sm text-subtle">
          Última atualização: <time dateTime={legal.privacyPolicyUpdatedAt}>{formatDate(legal.privacyPolicyUpdatedAt)}</time>
        </p>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          Esta política explica como o site da {name} trata as informações dos visitantes, em
          conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD).
        </p>

        <div className="mt-12 space-y-10">
          <Block id="responsavel" title="1. Responsável pelo tratamento">
            <p>
              O responsável pelo tratamento dos dados é <strong>{name}</strong>
              {legal.document ? <>, inscrita sob o nº {legal.document}</> : null}. O atendimento é
              realizado de forma remota para todo o Brasil.
            </p>
            <p>Para qualquer assunto relacionado a esta política ou aos seus dados, entre em contato pelo e-mail {email}.</p>
          </Block>

          <Block id="formulario" title="2. Formulário de orçamento">
            <p>
              Os dados preenchidos no formulário (nome, empresa, telefone, tipo de projeto, segmento,
              objetivo e informações adicionais) <strong>não são armazenados nem enviados a nenhum
              servidor deste site</strong>. Eles são usados apenas no seu navegador para compor uma
              mensagem de texto.
            </p>
            <p>
              Ao clicar em “Enviar orçamento pelo WhatsApp”, o aplicativo ou site do WhatsApp é aberto
              com a mensagem pronta. O envio só acontece se você confirmar por lá. A partir desse
              momento, a comunicação passa a seguir os termos e a política de privacidade do próprio
              WhatsApp, e as mensagens recebidas são usadas apenas para responder à sua solicitação
              e elaborar o orçamento.
            </p>
            <p>
              O mesmo vale para os contatos feitos diretamente pelo WhatsApp ou por e-mail: os dados
              informados são usados somente para atender ao seu pedido.
            </p>
          </Block>

          <Block id="cookies" title="3. Cookies e Google Analytics">
            <p>
              Este site pode utilizar o <strong>Google Analytics 4</strong>, serviço do Google que ajuda
              a entender como o site é usado. Ele <strong>só é ativado depois que você clica em
              “Aceitar”</strong> no aviso de cookies. Se você recusar ou não responder, nenhum cookie de
              análise é instalado.
            </p>
            <p>Quando autorizado, o Google Analytics pode coletar, de forma estatística:</p>
            <ul>
              <li>páginas visitadas, tempo de permanência e origem do acesso (ex.: busca ou link);</li>
              <li>tipo de dispositivo, navegador, sistema operacional e resolução de tela;</li>
              <li>localização aproximada (cidade ou região), inferida a partir do endereço IP.</li>
            </ul>
            <p>
              <strong>Finalidade:</strong> medir o desempenho do site e melhorar seu conteúdo e
              navegação. Essas informações não são usadas para identificar você pessoalmente. A base
              legal é o seu consentimento (art. 7º, I, da LGPD). Os dados são tratados pelo Google,
              conforme a{" "}
              <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">
                Política de Privacidade do Google
              </a>
              , e podem ser armazenados em servidores fora do Brasil.
            </p>
            <p>
              <strong>Como revogar:</strong> você pode mudar sua escolha a qualquer momento pelo link
              “Preferências de cookies”, no rodapé do site. Ao recusar, o Analytics é desativado e os
              cookies dele são removidos. Também é possível apagar os cookies pelas configurações do
              seu navegador.
            </p>
            <p>
              A sua escolha sobre cookies é salva no armazenamento local do seu próprio navegador
              (localStorage), apenas para que o aviso não seja exibido a cada visita.
            </p>
          </Block>

          <Block id="direitos" title="4. Seus direitos">
            <p>Nos termos do art. 18 da LGPD, você pode solicitar, a qualquer momento:</p>
            <ul>
              <li>confirmação da existência de tratamento e acesso aos seus dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>portabilidade dos dados a outro fornecedor de serviço;</li>
              <li>eliminação dos dados tratados com base no seu consentimento;</li>
              <li>informação sobre com quem os dados foram compartilhados;</li>
              <li>revogação do consentimento.</li>
            </ul>
            <p>
              Para exercer esses direitos, envie um e-mail para {email}. A solicitação será respondida
              no menor prazo possível. Você também pode apresentar reclamação à Autoridade Nacional de
              Proteção de Dados (ANPD).
            </p>
          </Block>

          <Block id="seguranca" title="5. Segurança e retenção">
            <p>
              O site é servido por conexão segura (HTTPS). Como o formulário não armazena dados, não há
              banco de dados de visitantes neste site. Mensagens recebidas pelo WhatsApp ou por e-mail
              são mantidas apenas pelo tempo necessário para o atendimento e o relacionamento comercial,
              ou conforme exigido por lei.
            </p>
          </Block>

          <Block id="alteracoes" title="6. Alterações desta política">
            <p>
              Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data
              da última atualização fica sempre indicada no topo desta página.
            </p>
          </Block>
        </div>

        <p className="mt-16 border-t border-line pt-8">
          <Link href="/" className="text-sm text-accent-soft underline-offset-2 hover:underline">
            ← Voltar para a página inicial
          </Link>
        </p>
      </Container>
    </main>
  );
}
