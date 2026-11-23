/**
 * Projetos do portfólio.
 *
 * Para adicionar um projeto:
 * 1. Inclua um novo item nesta lista com um `slug` único.
 * 2. Rode `npm run capture` para gerar as capturas em `public/portfolio/`.
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
    slug: "escritorio-de-advocacia",
    // Título genérico: não exibir o nome do cliente
    name: "Site para escritório de advocacia",
    url: "https://fabiolaoliveiraadv.vercel.app",
    category: "Site institucional / Advocacia",
    description:
      "Desenvolvimento de presença digital profissional para serviços jurídicos, com apresentação das áreas de atuação e facilidade de contato.",
  },
  {
    slug: "personal-trainer",
    name: "Site para personal trainer",
    url: "https://v0-viniciusgoulart.vercel.app",
    category: "Site profissional / Saúde e bem-estar",
    description:
      "Site para apresentação de serviços de treinamento personalizado, com informações sobre modalidades de atendimento e contato integrado.",
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
