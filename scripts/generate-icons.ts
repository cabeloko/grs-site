/**
 * Gera favicon e ícones do app a partir do símbolo em
 * src/components/brand/logo-mark.ts.
 *
 * Uso: npm run icons
 * Os arquivos gerados são versionados no repositório.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { buildAppIconSvg } from "../src/components/brand/logo-mark";

const root = path.resolve(import.meta.dirname, "..");

async function png(size: number, outFile: string) {
  const svg = Buffer.from(buildAppIconSvg(size));
  await sharp(svg).png().toFile(outFile);
  console.log(`✓ ${path.relative(root, outFile)} (${size}x${size})`);
}

async function main() {
  const appDir = path.join(root, "src/app");
  const iconsDir = path.join(root, "public/icons");
  await mkdir(iconsDir, { recursive: true });

  // Favicon vetorial (navegadores modernos)
  await writeFile(path.join(appDir, "icon.svg"), buildAppIconSvg(32));
  console.log("✓ src/app/icon.svg");

  // Ícone para iOS (tela inicial)
  await png(180, path.join(appDir, "apple-icon.png"));

  // Ícones do manifesto (Android / PWA)
  await png(192, path.join(iconsDir, "icon-192.png"));
  await png(512, path.join(iconsDir, "icon-512.png"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
