/**
 * Prepara um modelo de site (arquivo HTML único) para a seção "Modelos de site".
 *
 * Uso:
 *   npm run modelo -- <arquivo.html> <slug>
 *   ex.: npm run modelo -- ~/Downloads/site-padaria.html padaria
 *
 * O que faz:
 *   1. Copia o arquivo para public/modelos/<slug>.html
 *   2. Adiciona <meta name="robots" content="noindex"> (os modelos têm nomes,
 *      endereços e números fictícios e não devem aparecer no Google)
 *   3. Adiciona um selo fixo "Modelo de demonstração · dados fictícios" com
 *      link de volta para o site da GRS
 *
 * Pode ser executado de novo sobre o mesmo arquivo: os trechos inseridos
 * ficam entre marcadores e são substituídos, nunca duplicados.
 *
 * Depois: cadastre o modelo em src/config/portfolio.ts e rode `npm run capture`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/modelos");

const HEAD_START = "<!-- grs:modelo:head -->";
const HEAD_END = "<!-- /grs:modelo:head -->";
const BODY_START = "<!-- grs:modelo:selo -->";
const BODY_END = "<!-- /grs:modelo:selo -->";

const HEAD_SNIPPET = `${HEAD_START}
<meta name="robots" content="noindex, nofollow">
${HEAD_END}`;

// Selo fixo no canto inferior esquerdo (o botão de WhatsApp dos modelos fica
// à direita). Estilos isolados com prefixo "grs-" para não conflitar.
const BODY_SNIPPET = `${BODY_START}
<style>
.grs-selo{position:fixed;left:12px;bottom:12px;z-index:2147483000;display:flex;align-items:center;gap:10px;max-width:calc(100vw - 108px);padding:8px 8px 8px 14px;border-radius:999px;background:rgba(7,10,18,.92);color:#e9edf5;font:500 12.5px/1.3 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 10px 30px -10px rgba(0,0,0,.6);border:1px solid rgba(148,163,184,.25)}
.grs-selo span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.grs-selo a{flex:none;display:inline-flex;align-items:center;min-height:32px;padding:0 12px;border-radius:999px;background:#2e62f5;color:#fff;text-decoration:none;font-weight:600}
.grs-selo a:hover{background:#2759ec}
.grs-selo a:focus-visible{outline:2px solid #38d9f0;outline-offset:2px}
@media print{.grs-selo{display:none}}
</style>
<div class="grs-selo" role="note" aria-label="Aviso: modelo de demonstração">
  <span>Modelo de demonstração · dados fictícios</span>
  <a href="/#modelos">Voltar à GRS</a>
</div>
${BODY_END}`;

/** Remove um bloco entre marcadores (para reaplicar sem duplicar). */
function stripBlock(html: string, start: string, end: string) {
  const re = new RegExp(`\\s*${escape(start)}[\\s\\S]*?${escape(end)}`, "g");
  return html.replace(re, "");
}

function escape(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Posição de uma tag fora de comentários HTML. Os guias de edição dos
 * modelos ficam em comentários que citam "<head>"; inserir algo ali
 * fecharia o comentário e exporia o texto na página.
 */
function findTagOutsideComments(html: string, tag: RegExp, which: "first" | "last") {
  const comments = [...html.matchAll(/<!--[\s\S]*?-->/g)].map((m) => [m.index!, m.index! + m[0].length]);
  const inComment = (i: number) => comments.some(([a, b]) => i >= a && i < b);
  const hits = [...html.matchAll(tag)].filter((m) => !inComment(m.index!));
  const hit = which === "first" ? hits[0] : hits[hits.length - 1];
  return hit ? { index: hit.index!, length: hit[0].length } : null;
}

async function main() {
  const [input, slug] = process.argv.slice(2);
  if (!input || !slug || !/^[a-z0-9-]+$/.test(slug)) {
    console.error("Uso: npm run modelo -- <arquivo.html> <slug>   (slug: letras minúsculas, números e hífens)");
    process.exit(1);
  }

  let html = await readFile(path.resolve(input), "utf8");

  html = stripBlock(html, HEAD_START, HEAD_END);
  html = stripBlock(html, BODY_START, BODY_END);

  // <head> real (não <header>, nem citações dentro de comentários)
  const head = findTagOutsideComments(html, /<head(?:\s[^>]*)?>/gi, "first");
  const bodyEnd = findTagOutsideComments(html, /<\/body\s*>/gi, "last");
  if (!head || !bodyEnd) {
    throw new Error("O arquivo não parece ser uma página HTML completa (faltam <head> ou </body>).");
  }

  // Insere antes do </body> primeiro (posição maior), depois após o <head>
  html = `${html.slice(0, bodyEnd.index)}${BODY_SNIPPET}\n${html.slice(bodyEnd.index)}`;
  const afterHead = head.index + head.length;
  html = `${html.slice(0, afterHead)}\n${HEAD_SNIPPET}${html.slice(afterHead)}`;

  await mkdir(outDir, { recursive: true });
  const out = path.join(outDir, `${slug}.html`);
  await writeFile(out, html);
  console.log(`✓ ${path.relative(root, out)}  →  publicado em /modelos/${slug}.html`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
