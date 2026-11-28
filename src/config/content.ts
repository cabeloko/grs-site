/**
 * Textos das seções da landing page.
 * Edite aqui para alterar o conteúdo sem mexer nos componentes.
 */

export const heroContent = {
  eyebrow: "Desenvolvimento web sob medida",
  title: "Sua presença digital começa com uma solução inteligente.",
  subtitle:
    "Desenvolvemos sites profissionais, modernos e personalizados para fortalecer sua marca, destacar seu negócio e transformar visitantes em oportunidades.",
  support: "Atendimento para todo o Brasil.",
  primaryCta: "Solicitar orçamento",
  secondaryCta: "Ver modelos de site",
};

export type ServiceIcon =
  | "monitor"
  | "target"
  | "message"
  | "map-pin"
  | "search"
  | "chart"
  | "globe";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
  /** Serviços principais recebem mais destaque visual. */
  featured?: boolean;
};

export const solutionsContent = {
  eyebrow: "Soluções digitais",
  title: "O que a GRS desenvolve para o seu negócio",
  subtitle:
    "Do site completo aos ajustes que ajudam sua empresa a ser encontrada e contatada.",
  scopeNote:
    "O escopo de cada projeto é definido no orçamento, de acordo com as necessidades do seu negócio.",
  complementsLabel: "Complementos",
  services: [
    {
      title: "Criação de sites profissionais",
      description:
        "Sites institucionais responsivos e personalizados para empresas e profissionais.",
      icon: "monitor",
      featured: true,
    },
    {
      title: "Landing pages",
      description:
        "Páginas estratégicas para apresentar ofertas, serviços e gerar contatos.",
      icon: "target",
      featured: true,
    },
    {
      title: "Integração com WhatsApp e redes sociais",
      description:
        "Facilita a comunicação e o contato com potenciais clientes.",
      icon: "message",
    },
    {
      title: "Perfil da Empresa no Google",
      description:
        "Configuração e organização inicial da presença comercial no Google.",
      icon: "map-pin",
    },
    {
      title: "SEO e Google Search Console",
      description:
        "Otimização técnica inicial para mecanismos de busca e preparação para acompanhamento de indexação.",
      icon: "search",
    },
    {
      title: "Google Analytics",
      description:
        "Configuração de acompanhamento de acessos e comportamento dos visitantes, respeitando os requisitos de privacidade aplicáveis.",
      icon: "chart",
    },
    {
      title: "Domínio e publicação",
      description:
        "Configuração de domínio próprio, hospedagem e publicação do site, conforme o escopo contratado.",
      icon: "globe",
    },
  ] satisfies Service[],
};

export type DifferentialIcon =
  | "smartphone"
  | "gauge"
  | "palette"
  | "code"
  | "compass"
  | "search"
  | "plug"
  | "handshake"
  | "globe";

export type Differential = {
  title: string;
  description: string;
  icon: DifferentialIcon;
  /** Tamanho no bento grid. */
  size: "lg" | "md" | "sm" | "wide";
  /** Ilustração opcional exibida no card. */
  visual?: "responsive" | "performance" | "remote";
};

export const differentialsContent = {
  eyebrow: "Diferenciais",
  title: "Atenção aos detalhes em cada etapa",
  subtitle:
    "Cada projeto é construído para representar bem o seu negócio e facilitar o contato com quem procura por você.",
  items: [
    {
      title: "Experiência adaptada ao celular",
      icon: "smartphone",
      description:
        "Layouts pensados primeiro para telas pequenas e ajustados para tablets e computadores.",
      size: "lg",
      visual: "responsive",
    },
    {
      title: "Boas práticas de desempenho",
      icon: "gauge",
      description:
        "Imagens otimizadas, código enxuto e carregamento rápido para não perder visitantes.",
      size: "md",
      visual: "performance",
    },
    {
      title: "Design moderno e profissional",
      icon: "palette",
      description: "Visual alinhado à identidade da sua marca.",
      size: "sm",
    },
    {
      title: "Desenvolvimento personalizado",
      icon: "code",
      description: "Estrutura criada a partir das necessidades do seu negócio.",
      size: "sm",
    },
    {
      title: "Navegação intuitiva",
      icon: "compass",
      description: "Informações organizadas para o visitante encontrar o que procura.",
      size: "sm",
    },
    {
      title: "Estrutura preparada para SEO",
      icon: "search",
      description:
        "Base técnica que ajuda os mecanismos de busca a entender seu site.",
      size: "sm",
    },
    {
      title: "Integração com canais de contato",
      icon: "plug",
      description: "WhatsApp, e-mail e redes sociais a um clique.",
      size: "sm",
    },
    {
      title: "Acompanhamento de cada projeto",
      icon: "handshake",
      description: "Comunicação próxima do primeiro contato à publicação.",
      size: "sm",
    },
    {
      title: "Atendimento remoto para todo o Brasil",
      icon: "globe",
      description:
        "Todo o processo acontece on-line, onde quer que sua empresa esteja.",
      size: "wide",
      visual: "remote",
    },
  ] satisfies Differential[],
};

export const processContent = {
  eyebrow: "Como funciona",
  title: "Um processo claro, do primeiro contato à publicação",
  steps: [
    {
      number: "01",
      title: "Entendimento do projeto",
      description: "Conversamos sobre seu negócio, objetivos e necessidades.",
    },
    {
      number: "02",
      title: "Planejamento",
      description: "Definimos estrutura, conteúdo e direção visual.",
    },
    {
      number: "03",
      title: "Desenvolvimento",
      description:
        "Construímos a solução com foco em design, usabilidade e funcionamento.",
    },
    {
      number: "04",
      title: "Revisão e publicação",
      description:
        "Realizamos os ajustes finais e preparamos o site para publicação.",
    },
  ],
  ctaTitle: "Vamos conversar sobre o seu projeto?",
  ctaButton: "Solicitar orçamento",
};

export const portfolioContent = {
  eyebrow: "Modelos",
  title: "Modelos de site",
  subtitle:
    "Exemplos de layout que podem ser personalizados com a identidade, os textos e as fotos do seu negócio.",
  /** Aviso obrigatório: os modelos usam conteúdo de demonstração. */
  disclaimer:
    "Os nomes, endereços, números, depoimentos e fotos dos modelos são fictícios ou de banco de imagens, apenas para demonstração.",
  visitLabel: "Ver modelo",
};

export const contactContent = {
  eyebrow: "Contato",
  title: "Solicite seu orçamento",
  subtitle:
    "Preencha os campos abaixo e sua mensagem chega pronta no nosso WhatsApp.",
  alternativesTitle: "Prefere falar diretamente?",
  submitLabel: "Enviar orçamento pelo WhatsApp",
  submitHint:
    "Ao clicar, o WhatsApp será aberto com sua mensagem pronta. Basta revisar e confirmar o envio.",
  privacyNotice:
    "Os dados preenchidos são usados apenas para compor sua mensagem e não ficam armazenados neste site. O envio acontece pelo WhatsApp.",
};

export type FaqItem = { question: string; answer: string };

/** TODO: revisar textos. Respostas sem preços, prazos fixos ou garantias. */
export const faqContent = {
  eyebrow: "Dúvidas frequentes",
  title: "Perguntas frequentes",
  items: [
    {
      question: "Quanto custa desenvolver um site?",
      answer:
        "O valor depende do tipo de site, da quantidade de páginas, das funcionalidades e dos serviços complementares escolhidos. Por isso, cada orçamento é feito sob medida, depois de entendermos as necessidades do seu negócio. Preencha o formulário e enviaremos uma proposta personalizada.",
    },
    {
      question: "Quanto tempo leva para criar meu site?",
      answer:
        "O prazo varia conforme o escopo do projeto e a disponibilidade dos conteúdos, como textos, imagens e logotipo. Uma estimativa de prazo é apresentada junto com o orçamento.",
    },
    {
      question: "Meu site funcionará no celular?",
      answer:
        "Sim. Todos os sites são desenvolvidos de forma responsiva, com o layout adaptado para celulares, tablets e computadores.",
    },
    {
      question: "Posso utilizar meu próprio domínio?",
      answer:
        "Sim. Se você já tem um domínio, ele pode ser configurado no novo site. Se ainda não tem, podemos orientar no registro e na configuração, conforme o escopo contratado.",
    },
    {
      question: "Meu site poderá aparecer no Google?",
      answer:
        "O site é desenvolvido com boas práticas técnicas de SEO e pode ser cadastrado no Google Search Console para acompanhar a indexação. O posicionamento nos resultados de busca depende de vários fatores externos, como concorrência e conteúdo, então não é possível garantir uma posição específica.",
    },
    {
      question: "Como funciona o processo de contratação?",
      answer:
        "Você envia sua solicitação pelo formulário ou pelo WhatsApp, conversamos para entender o projeto e enviamos uma proposta com escopo, prazo estimado e valores. Com a proposta aprovada, iniciamos o planejamento e o desenvolvimento.",
    },
    {
      question: "Posso solicitar alterações ou novas funcionalidades posteriormente?",
      answer:
        "Sim. Depois da publicação, ajustes e novas funcionalidades podem ser solicitados e serão avaliados e orçados de acordo com cada necessidade.",
    },
    {
      question: "Vocês atendem a minha cidade?",
      answer:
        "Sim. O atendimento é remoto para todo o Brasil. Todas as etapas, da conversa inicial à publicação, acontecem on-line.",
    },
  ] satisfies FaqItem[],
};
