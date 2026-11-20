/**
 * Geometria do símbolo da GRS: um "G" desenhado como trilha de circuito,
 * com dois nós de conexão nas extremidades.
 *
 * Fonte única usada pelo componente <Logo />, pelo favicon (icon.svg) e pelo
 * script de geração de ícones. Para trocar o símbolo, altere apenas aqui e
 * rode `npm run icons`.
 */

export const LOGO_VIEWBOX = "0 0 32 32";

/** Trilha principal do "G". */
export const LOGO_TRACE_PATH =
  "M23 9.5H13a4.5 4.5 0 0 0-4.5 4.5v4A4.5 4.5 0 0 0 13 22.5h6a4 4 0 0 0 4-4V16.5h-5.5";

/** Nós de conexão (círculos) nas extremidades da trilha. */
export const LOGO_NODES = [
  { cx: 23, cy: 9.5, r: 2.1 },
  { cx: 16.6, cy: 16.5, r: 2.1 },
] as const;

export const LOGO_STROKE_WIDTH = 2.4;

/** Cores oficiais do ícone. */
export const LOGO_COLORS = {
  background: "#070A12",
  border: "#1C2436",
  trace: "#5B8CFF",
  node: "#38D9F0",
} as const;

/**
 * SVG completo do ícone do app (fundo escuro + símbolo), em string.
 * Usado para gerar favicon e ícones PNG.
 */
export function buildAppIconSvg(size = 512): string {
  const { background, border, trace, node } = LOGO_COLORS;
  const nodes = LOGO_NODES.map(
    (n) => `<circle cx="${n.cx}" cy="${n.cy}" r="${n.r}" fill="${node}"/>`,
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${LOGO_VIEWBOX}"><rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="${background}" stroke="${border}"/><path d="${LOGO_TRACE_PATH}" fill="none" stroke="${trace}" stroke-width="${LOGO_STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round"/>${nodes}</svg>`;
}
