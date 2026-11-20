/**
 * Configuração central da marca GRS.
 * Todo dado institucional editável fica aqui. Campos vazios ("") não são
 * renderizados no site.
 */

export const siteConfig = {
  name: "GRS – Soluções Tecnológicas",
  shortName: "GRS",
  tagline: "Tecnologia que conecta sua empresa a novas oportunidades.",
  description:
    "Criação de sites profissionais, landing pages e soluções de presença digital para empresas, profissionais autônomos e liberais. Atendimento remoto para todo o Brasil.",
  institutional:
    "Desenvolvemos sites profissionais e soluções digitais para empresas, profissionais autônomos, profissionais liberais e prestadores de serviços, com atendimento remoto para todo o Brasil.",
  serviceArea: "Atendimento para todo o Brasil",
  locale: "pt_BR",

  contact: {
    /** Número no formato internacional, somente dígitos (usado no wa.me). */
    whatsappNumber: "5512981085504",
    /** Número formatado para exibição. */
    whatsappDisplay: "(12) 98108-5504",
    /** Número no formato E.164 (usado em dados estruturados). */
    whatsappE164: "+55-12-98108-5504",
    email: "guirodolfo2304@gmail.com",
    /** Mensagem padrão do botão flutuante e dos links diretos de WhatsApp. */
    whatsappDefaultMessage:
      "Olá! Conheci a GRS pelo site e gostaria de saber mais sobre as soluções disponíveis.",
  },

  /**
   * Redes sociais. TODO: preencher quando as redes forem definidas.
   * Ícones só são exibidos para links preenchidos.
   */
  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
    github: "",
  },

  legal: {
    /** TODO: preencher (opcional). CNPJ ou CPF do responsável. Não é exibido enquanto vazio. */
    document: "",
    /** Data da última atualização da Política de Privacidade (AAAA-MM-DD). */
    privacyPolicyUpdatedAt: "2026-11-20",
  },
} as const;

export type SocialNetwork = keyof typeof siteConfig.social;

/** Links do menu principal (âncoras das seções da landing page). */
export const navItems = [
  { id: "inicio", label: "Início" },
  { id: "solucoes", label: "Soluções" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "portfolio", label: "Portfólio" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "contato", label: "Contato" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

/** Âncora do formulário de orçamento. */
export const QUOTE_ANCHOR = "orcamento";
