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
 *   4. Redireciona todos os links e formulários de WhatsApp do modelo para o
 *      WhatsApp da GRS (src/config/site.ts), com uma mensagem que cita o
 *      modelo. O título vem de src/config/portfolio.ts (pelo slug) ou do
 *      3º argumento opcional:  npm run modelo -- arquivo.html padaria "padaria"
 *   5. Troca os telefones do modelo pelo da GRS: links tel:, números escritos
 *      na página no formato (00) 0000-0000 / (00) 00000-0000 e o campo
 *      "telephone" dos dados estruturados (JSON-LD)
 *
 * Pode ser executado de novo sobre o mesmo arquivo: os trechos inseridos
 * ficam entre marcadores e são substituídos, nunca duplicados.
 *
 * Depois: cadastre o modelo em src/config/portfolio.ts e rode `npm run capture`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { portfolioProjects } from "../src/config/portfolio";
import { siteConfig } from "../src/config/site";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/modelos");

const HEAD_START = "<!-- grs:modelo:head -->";
const HEAD_END = "<!-- /grs:modelo:head -->";
const BODY_START = "<!-- grs:modelo:selo -->";
const BODY_END = "<!-- /grs:modelo:selo -->";

const HEAD_SNIPPET = `${HEAD_START}
<meta name="robots" content="noindex, nofollow">
${HEAD_END}`;

/** Mensagem enviada à GRS a partir de um modelo. */
function whatsappMessage(label?: string) {
  return label
    ? `Olá! Vi o modelo de site para ${label} no site da GRS e quero um site parecido para o meu negócio.`
    : "Olá! Vi um modelo de site no site da GRS e quero um site parecido para o meu negócio.";
}

/**
 * Script inserido depois dos scripts do modelo: troca o destino de todos os
 * links de WhatsApp (wa.me / api.whatsapp.com) e intercepta window.open dos
 * formulários, apontando para o WhatsApp da GRS com a mensagem do modelo.
 * Links de telefone (tel:) e textos do modelo não são alterados.
 */
function whatsappSnippet(label?: string) {
  const { whatsappNumber, whatsappDisplay } = siteConfig.contact;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage(label))}`;
  return `<script>
(function () {
  var GRS = ${JSON.stringify(url)};
  var TEL = ${JSON.stringify(`tel:+${whatsappNumber}`)};
  var FONE = ${JSON.stringify(whatsappDisplay)};
  var WA = /^https?:\\/\\/(wa\\.me|api\\.whatsapp\\.com|web\\.whatsapp\\.com)\\//i;
  var NUMERO = /\\(\\d{2}\\)\\s?\\d{4,5}-\\d{4}/g;
  function trocar() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      if (WA.test(a.href)) { a.href = GRS; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      else if (/^tel:/i.test(a.getAttribute('href'))) { a.href = TEL; }
    });
    // Telefones escritos na página (fora de <script> e <style>)
    var andar = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        return p === 'SCRIPT' || p === 'STYLE' ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    for (var n = andar.nextNode(); n; n = andar.nextNode()) {
      if (NUMERO.test(n.nodeValue)) { NUMERO.lastIndex = 0; n.nodeValue = n.nodeValue.replace(NUMERO, FONE); }
      NUMERO.lastIndex = 0;
    }
  }
  trocar();
  document.addEventListener('DOMContentLoaded', trocar);
  var abrir = window.open;
  window.open = function (u) {
    var args = Array.prototype.slice.call(arguments);
    if (typeof u === 'string' && WA.test(u)) args[0] = GRS;
    return abrir.apply(window, args);
  };
})();
</script>`;
}

// Selo fixo no canto inferior esquerdo (o botão de WhatsApp dos modelos fica
// à direita). Estilos isolados com prefixo "grs-" para não conflitar.
const bodySnippet = (label?: string) => `${BODY_START}
${whatsappSnippet(label)}
<style>
/* Evita rolagem lateral no celular (ex.: menu escondido fora da tela) */
html{overflow-x:clip}
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
  const [input, slug, labelArg] = process.argv.slice(2);
  if (!input || !slug || !/^[a-z0-9-]+$/.test(slug)) {
    console.error('Uso: npm run modelo -- <arquivo.html> <slug> ["título"]   (slug: letras minúsculas, números e hífens)');
    process.exit(1);
  }

  // Título para a mensagem do WhatsApp: argumento > cadastro em portfolio.ts
  const fromConfig = portfolioProjects.find((p) => p.slug === slug)?.name.replace(/^Site para\s+/i, "");
  const label = labelArg?.trim() || fromConfig;
  if (!label) {
    console.warn(`! "${slug}" ainda não está em portfolio.ts: usando mensagem genérica no WhatsApp.`);
  }

  let html = await readFile(path.resolve(input), "utf8");

  html = stripBlock(html, HEAD_START, HEAD_END);
  html = stripBlock(html, BODY_START, BODY_END);

  // Telefone dos dados estruturados (JSON-LD) → telefone da GRS
  html = html.replace(/("telephone"\s*:\s*")[^"]*(")/g, `$1${siteConfig.contact.whatsappE164}$2`);

  // <head> real (não <header>, nem citações dentro de comentários)
  const head = findTagOutsideComments(html, /<head(?:\s[^>]*)?>/gi, "first");
  const bodyEnd = findTagOutsideComments(html, /<\/body\s*>/gi, "last");
  if (!head || !bodyEnd) {
    throw new Error("O arquivo não parece ser uma página HTML completa (faltam <head> ou </body>).");
  }

  // Insere antes do </body> primeiro (posição maior), depois após o <head>
  html = `${html.slice(0, bodyEnd.index)}${bodySnippet(label)}\n${html.slice(bodyEnd.index)}`;
  const afterHead = head.index + head.length;
  html = `${html.slice(0, afterHead)}\n${HEAD_SNIPPET}${html.slice(afterHead)}`;

  await mkdir(outDir, { recursive: true });
  const out = path.join(outDir, `${slug}.html`);
  await writeFile(out, html);
  console.log(`✓ ${path.relative(root, out)}  →  /modelos/${slug}.html  (WhatsApp: "${whatsappMessage(label)}")`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
