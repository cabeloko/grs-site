/**
 * Captura as telas dos projetos do portfólio com Playwright.
 *
 * Uso: npm run capture
 *   - Lê os projetos de src/config/portfolio.ts
 *   - Captura cada site em desktop (1440x900) e mobile (390x844)
 *   - Salva em public/portfolio/<slug>-desktop.webp e <slug>-mobile.webp
 *
 * Opcional: npm run capture -- <slug>  (captura só um projeto)
 *
 * IMPORTANTE: roda manualmente e nunca durante o build da Vercel.
 * Se uma captura falhar, o script encerra com erro e NÃO gera imagem
 * substituta.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, devices, type Browser } from "playwright";
import sharp from "sharp";
import {
  CAPTURE_VIEWPORTS,
  portfolioProjects,
  type CaptureManifest,
  type PortfolioProject,
} from "../src/config/portfolio";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/portfolio");
/** Manifesto com as dimensões reais de cada captura (lido pelo site). */
const manifestFile = path.join(root, "src/config/portfolio-captures.json");

/**
 * Altura total capturada (em px CSS). A captura é mais alta que a viewport
 * para permitir a rolagem suave da imagem no hover dos cards.
 */
const CAPTURE_HEIGHT = {
  desktop: 2400,
  mobile: 2400,
} as const;

/** Executável do Chromium: variável de ambiente ou o padrão do Playwright. */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;

async function captureVariant(
  browser: Browser,
  project: PortfolioProject,
  variant: keyof typeof CAPTURE_VIEWPORTS,
) {
  const viewport = CAPTURE_VIEWPORTS[variant];
  const context = await browser.newContext({
    ...(variant === "mobile" ? devices["iPhone 13"] : {}),
    viewport,
    deviceScaleFactor: variant === "mobile" ? 2 : 1,
    locale: "pt-BR",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  // Registra recursos que falharam (ex.: imagens ou fontes bloqueadas pela
  // rede). Uma captura incompleta não representaria o site real.
  const failed: string[] = [];
  page.on("requestfailed", (req) => {
    const type = req.resourceType();
    if (["document", "stylesheet", "image", "font", "script"].includes(type)) {
      failed.push(`${type} ${req.url()} (${req.failure()?.errorText ?? "erro"})`);
    }
  });
  page.on("response", (res) => {
    const type = res.request().resourceType();
    if (res.status() >= 400 && ["stylesheet", "image", "font", "script"].includes(type)) {
      failed.push(`${type} ${res.url()} (HTTP ${res.status()})`);
    }
  });

  try {
    const response = await page.goto(project.url, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });
    if (!response || !response.ok()) {
      throw new Error(
        `Resposta inválida (${response?.status() ?? "sem resposta"}) em ${project.url}`,
      );
    }

    // Rola a página para disparar lazy-load e animações de entrada
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);

    if (failed.length > 0) {
      throw new Error(
        `Recursos não carregaram em ${project.url} (${variant}):\n    - ${failed.join("\n    - ")}`,
      );
    }

    const fullHeight = await page.evaluate(() => document.body.scrollHeight);
    const height = Math.min(fullHeight, CAPTURE_HEIGHT[variant]);

    const png = await page.screenshot({
      fullPage: true,
      clip: { x: 0, y: 0, width: viewport.width, height },
      animations: "disabled",
    });

    const file = path.join(outDir, `${project.slug}-${variant}.webp`);
    // Desktop em 1x (1440px); mobile em 2x reduzido para 780px de largura
    const info = await sharp(png)
      .resize({ width: variant === "mobile" ? 780 : viewport.width })
      .webp({ quality: 80, effort: 6 })
      .toFile(file);

    console.log(`  ✓ ${variant}: ${path.relative(root, file)} (${viewport.width}x${height})`);
    return { width: info.width, height: info.height };
  } finally {
    await context.close();
  }
}

async function main() {
  const onlySlug = process.argv[2];
  const projects = onlySlug
    ? portfolioProjects.filter((p) => p.slug === onlySlug)
    : portfolioProjects;

  if (projects.length === 0) {
    throw new Error(`Nenhum projeto encontrado${onlySlug ? ` com slug "${onlySlug}"` : ""}.`);
  }

  await mkdir(outDir, { recursive: true });

  // Mantém entradas de projetos não recapturados nesta execução
  let manifest: CaptureManifest = {};
  try {
    manifest = JSON.parse(await readFile(manifestFile, "utf8"));
  } catch {
    manifest = {};
  }

  const browser = await chromium.launch({ executablePath });

  try {
    for (const project of projects) {
      console.log(`→ ${project.name} (${project.url})`);
      const desktop = await captureVariant(browser, project, "desktop");
      const mobile = await captureVariant(browser, project, "mobile");
      manifest[project.slug] = {
        capturedAt: new Date().toISOString().slice(0, 10),
        desktop,
        mobile,
      };
    }
  } finally {
    await browser.close();
  }

  // Remove do manifesto projetos que saíram da configuração
  const slugs = new Set(portfolioProjects.map((p) => p.slug));
  for (const slug of Object.keys(manifest)) {
    if (!slugs.has(slug)) delete manifest[slug];
  }
  await writeFile(manifestFile, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`  ✓ manifesto: ${path.relative(root, manifestFile)}`);

  console.log("\nCapturas concluídas. Revise as imagens e faça commit de public/portfolio/.");
}

main().catch((error) => {
  console.error("\n✗ Falha na captura. Nenhuma imagem substituta foi gerada.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
