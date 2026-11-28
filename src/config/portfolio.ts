/**
 * Modelos de site exibidos na seção "Modelos de site".
 *
 * Para adicionar um modelo:
 * 1. Prepare o HTML:  npm run modelo -- <arquivo.html> <slug>
 *    (copia para public/modelos/<slug>.html com aviso de demonstração e noindex)
 * 2. Inclua um item nesta lista com o mesmo `slug` e url "/modelos/<slug>.html".
 * 3. Rode `npm run capture` para gerar as capturas em `public/portfolio/`.
 *
 * `url` pode ser um caminho deste site ("/modelos/...") ou um endereço
 * externo ("https://..."), caso volte a exibir projetos publicados.
 *
 * Os caminhos das imagens são derivados do slug:
 *   /portfolio/<slug>-desktop.webp e /portfolio/<slug>-mobile.webp
 */

export type PortfolioProject = {
  slug: string;
  name: string;
  url: string;
  category: string;
  description: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "estudio-de-fotografia",
    name: "Site para estúdio de fotografia",
    url: "/modelos/estudio-de-fotografia.html",
    category: "Modelo · Fotografia",
    description:
      "Galeria em mosaico, pacotes com valores, etapas do ensaio, depoimentos e formulário que envia o pedido pelo WhatsApp.",
  },
  {
    slug: "nail-designer",
    name: "Site para nail designer",
    url: "/modelos/nail-designer.html",
    category: "Modelo · Beleza e estética",
    description:
      "Tabela de serviços organizada em abas, galeria de trabalhos, cuidados com higiene, horários e agendamento pelo WhatsApp.",
  },
  {
    slug: "escola-de-musica",
    name: "Site para escola de música",
    url: "/modelos/escola-de-musica.html",
    category: "Modelo · Educação",
    description:
      "Aulas por instrumento com mensalidades, trilha de evolução do aluno, galeria da escola e pedido de aula experimental.",
  },
  {
    slug: "nutricionista",
    name: "Site para nutricionista",
    url: "/modelos/nutricionista.html",
    category: "Modelo · Saúde e bem-estar",
    description:
      "Apresentação da profissional, passo a passo da consulta, especialidades, planos de acompanhamento, mapa e agendamento.",
  },
  {
    slug: "psicologa",
    name: "Site para psicóloga",
    url: "/modelos/psicologa.html",
    category: "Modelo · Saúde mental",
    description:
      "Temas atendidos, formação, abordagem explicada em linguagem simples e primeira sessão, seguindo as regras de divulgação do CFP.",
  },
  {
    slug: "confeitaria",
    name: "Site para confeitaria",
    url: "/modelos/confeitaria.html",
    category: "Modelo · Alimentação",
    description:
      "Vitrine de produtos com preços de referência, passo a passo da encomenda, datas especiais, depoimentos e mapa.",
  },
  {
    slug: "pet-shop",
    name: "Site para pet shop",
    url: "/modelos/pet-shop.html",
    category: "Modelo · Pet",
    description:
      "Serviços em destaque, tabela de banho e tosa por porte, veterinário e vacinas, leva e traz e pacotes mensais.",
  },
  {
    slug: "clinica-de-estetica",
    name: "Site para clínica de estética",
    url: "/modelos/clinica-de-estetica.html",
    category: "Modelo · Beleza e estética",
    description:
      "Tratamentos faciais e corporais organizados em abas, diferenciais, galeria do espaço e agendamento pelo WhatsApp.",
  },
  {
    slug: "clinica-odontologica",
    name: "Site para clínica odontológica",
    url: "/modelos/clinica-odontologica.html",
    category: "Modelo · Saúde",
    description:
      "Tratamentos com valores de referência, equipe com CRO, primeira consulta passo a passo, convênios e mapa.",
  },
];

/** Dimensões das capturas (usadas no script e no next/image). */
export const CAPTURE_VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

/** Dimensões de cada captura, gravadas pelo script em portfolio-captures.json. */
type Size = { width: number; height: number };
export type CaptureManifest = Record<
  string,
  { capturedAt: string; desktop: Size; mobile: Size }
>;

export function portfolioImagePath(
  slug: string,
  variant: keyof typeof CAPTURE_VIEWPORTS,
) {
  return `/portfolio/${slug}-${variant}.webp`;
}

/** true quando o item aponta para uma página deste próprio site. */
export function isInternalUrl(url: string) {
  return url.startsWith("/") && !url.startsWith("//");
}
